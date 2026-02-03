import { Address, createPublicClient, createTransport } from 'viem';

import { Wallet } from '@/clients/contracts';
import { type OnStepChange } from '@/gondi';

export const addStepCallback = (props: { wallet: Wallet; onStepChange: OnStepChange }) => {
  const { wallet, onStepChange } = props;
  const bcClient = createPublicClient({
    chain: wallet.chain,
    transport: () => createTransport(wallet.transport),
  });

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

  const sendPendingTransactionStep = (to: Address, functionNameOrSelector: string) => {
    return onStepChange({
      type: 'transaction',
      status: 'broadcasted',
      to,
      functionNameOrSelector,
    });
  };

  const sendSuccessTransactionStep = (to: Address, functionNameOrSelector: string) => {
    return onStepChange({
      type: 'transaction',
      status: 'success',
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
    await sendPendingTransactionStep(to, functionName);
    await bcClient.waitForTransactionReceipt({ hash: txHash });
    await sendSuccessTransactionStep(to, functionName);
    return txHash;
  };

  const sendTransaction: Wallet['sendTransaction'] = async (params) => {
    const { to, data } = params;
    if (!to || !data) throw new Error('to and data are required');
    const selector = data.slice(0, 10);
    await sendWaitingTransactionStep(to, selector);
    const txHash = await originalSendTransaction(params);
    await sendPendingTransactionStep(to, selector);
    await bcClient.waitForTransactionReceipt({ hash: txHash });
    await sendSuccessTransactionStep(to, selector);
    return txHash;
  };

  return { ...wallet, signTypedData, writeContract, sendTransaction };
};
