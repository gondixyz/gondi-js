import { Address, createPublicClient, createTransport } from 'viem';

import { Wallet } from '@/clients/contracts';
import { type OnStepChange } from '@/gondi';

export const addStepCallback = (props: {
  wallet: Wallet;
  onStepChange: OnStepChange;
  executionId?: number | null;
}) => {
  const { wallet, onStepChange, executionId } = props;
  const bcClient = createPublicClient({
    chain: wallet.chain,
    transport: () => createTransport(wallet.transport),
  });

  let id = executionId ?? 0;

  const originalSignTypedData = wallet.signTypedData.bind(wallet);
  const originalWriteContract = wallet.writeContract.bind(wallet);
  const originalSendTransaction = wallet.sendTransaction.bind(wallet);

  const sendWaitingSignatureStep = (id: number, primaryType: string) => {
    return onStepChange({
      id,
      type: 'signature',
      status: 'waiting',
      primaryType,
    });
  };

  const sendSuccessSignatureStep = (id: number, primaryType: string) => {
    return onStepChange({
      id,
      type: 'signature',
      status: 'success',
      primaryType,
    });
  };

  const sendWaitingTransactionStep = (id: number, to: Address, functionNameOrSelector: string) => {
    return onStepChange({
      id,
      type: 'transaction',
      status: 'waiting',
      to,
      functionNameOrSelector,
    });
  };

  const sendPendingTransactionStep = (id: number, to: Address, functionNameOrSelector: string) => {
    return onStepChange({
      id,
      type: 'transaction',
      status: 'broadcasted',
      to,
      functionNameOrSelector,
    });
  };

  const sendSuccessTransactionStep = (id: number, to: Address, functionNameOrSelector: string) => {
    return onStepChange({
      id,
      type: 'transaction',
      status: 'success',
      to,
      functionNameOrSelector,
    });
  };

  const signTypedData: Wallet['signTypedData'] = async (typedData) => {
    const primaryType = String(typedData.primaryType);
    await sendWaitingSignatureStep(id, primaryType);
    const signature = await originalSignTypedData(typedData);
    await sendSuccessSignatureStep(id, primaryType);
    id++;
    return signature;
  };

  const writeContract: Wallet['writeContract'] = async (params) => {
    const { address: to, functionName } = params;
    await sendWaitingTransactionStep(id, to, functionName);
    const txHash = await originalWriteContract(params);
    await sendPendingTransactionStep(id, to, functionName);
    await bcClient.waitForTransactionReceipt({ hash: txHash });
    await sendSuccessTransactionStep(id, to, functionName);
    id++;
    return txHash;
  };

  const sendTransaction: Wallet['sendTransaction'] = async (params) => {
    const { to, data } = params;
    if (!to || !data) throw new Error('to and data are required');
    const selector = data.slice(0, 10);
    await sendWaitingTransactionStep(id, to, selector);
    const txHash = await originalSendTransaction(params);
    await sendPendingTransactionStep(id, to, selector);
    await bcClient.waitForTransactionReceipt({ hash: txHash });
    await sendSuccessTransactionStep(id, to, selector);
    id++;
    return txHash;
  };

  return { ...wallet, signTypedData, writeContract, sendTransaction };
};
