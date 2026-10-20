import { Address, createPublicClient, createTransport, Hash, PublicClient } from 'viem';

import { Wallet } from '@/clients/contracts';
import { type OnStepChange } from '@/gondi';
import { assertTransactionSucceeded, withRetriedReceiptWait } from '@/utils/blockchain';

export const addStepCallback = (props: {
  wallet: Wallet;
  onStepChange: OnStepChange;
  publicClient?: PublicClient;
}): Wallet => {
  const { wallet, onStepChange, publicClient } = props;
  const bcClient = withRetriedReceiptWait(
    publicClient ??
      createPublicClient({
        chain: wallet.chain,
        transport: () => createTransport(wallet.transport),
      }),
  );

  const originalSignTypedData = wallet.signTypedData.bind(wallet);
  const originalWriteContract = wallet.writeContract.bind(wallet);
  const originalSendTransaction = wallet.sendTransaction.bind(wallet);

  const sendWaitingSignatureStep = (primaryType: string) => {
    return onStepChange({
      type: 'signature',
      status: 'waiting',
      primaryType,
    });
  };

  const sendSuccessSignatureStep = (primaryType: string) => {
    return onStepChange({
      type: 'signature',
      status: 'success',
      primaryType,
    });
  };

  const sendWaitingTransactionStep = (to: Address, functionNameOrSelector: string) => {
    return onStepChange({
      type: 'transaction',
      status: 'waiting',
      to,
      functionNameOrSelector,
    });
  };

  const sendPendingTransactionStep = (
    to: Address,
    functionNameOrSelector: string,
    transactionHash: Hash,
  ) => {
    return onStepChange({
      type: 'transaction',
      status: 'broadcasted',
      transactionHash,
      chainId: wallet.chain?.id,
      to,
      functionNameOrSelector,
    });
  };

  const sendSuccessTransactionStep = (
    to: Address,
    functionNameOrSelector: string,
    transactionHash: Hash,
    originalTransactionHash: Hash,
  ) => {
    return onStepChange({
      type: 'transaction',
      status: 'success',
      transactionHash,
      originalTransactionHash,
      chainId: wallet.chain?.id,
      to,
      functionNameOrSelector,
    });
  };

  const signTypedData: Wallet['signTypedData'] = async (typedData) => {
    const primaryType = String(typedData.primaryType);
    await sendWaitingSignatureStep(primaryType);
    const signature = await originalSignTypedData(typedData);
    await sendSuccessSignatureStep(primaryType);
    return signature;
  };

  const writeContract: Wallet['writeContract'] = async (params) => {
    const { address: to, functionName } = params;
    await sendWaitingTransactionStep(to, functionName);
    const txHash = await originalWriteContract(params);
    await sendPendingTransactionStep(to, functionName, txHash);
    const receipt = await bcClient.waitForTransactionReceipt({ hash: txHash });
    assertTransactionSucceeded(receipt);
    await sendSuccessTransactionStep(to, functionName, receipt.transactionHash, txHash);
    return txHash;
  };

  const sendTransaction: Wallet['sendTransaction'] = async (params) => {
    const { to, data } = params;
    if (!to || !data) throw new Error('to and data are required');
    const selector = data.slice(0, 10);
    await sendWaitingTransactionStep(to, selector);
    const txHash = await originalSendTransaction(params);
    await sendPendingTransactionStep(to, selector, txHash);
    const receipt = await bcClient.waitForTransactionReceipt({ hash: txHash });
    assertTransactionSucceeded(receipt);
    await sendSuccessTransactionStep(to, selector, receipt.transactionHash, txHash);
    return txHash;
  };

  return { ...wallet, signTypedData, writeContract, sendTransaction };
};
