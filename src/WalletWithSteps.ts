import { Address, createPublicClient, createTransport } from 'viem';

import { Wallet } from '@/clients/contracts';
import { type OnStepChange } from '@/gondi';

export class WalletWithSteps {
  static create(props: {
    wallet: Wallet;
    onStepChange?: OnStepChange;
    transactionSuccessDelay?: number;
    signatureSuccessDelay?: number;
  }) {
    const { wallet, onStepChange, transactionSuccessDelay = 0, signatureSuccessDelay = 0 } = props;
    const bcClient = createPublicClient({
      chain: wallet.chain,
      transport: () => createTransport(wallet.transport),
    });

    const originalSignTypedData = wallet.signTypedData.bind(wallet);
    const originalWriteContract = wallet.writeContract.bind(wallet);
    const originalSendTransaction = wallet.sendTransaction.bind(wallet);

    const sendWaitingSignatureStep = <T>(promise: Promise<T>, primaryType: string) => {
      onStepChange?.({
        type: 'signature',
        status: 'waiting',
        primaryType,
      });
      return promise;
    };

    const sendSuccessSignatureStep = (primaryType: string) => {
      const promise = new Promise((resolve) => setTimeout(resolve, signatureSuccessDelay));
      onStepChange?.({
        type: 'signature',
        status: 'success',
        primaryType,
      });
      return promise;
    };

    const sendWaitingTransactionStep = <T>(
      promise: Promise<T>,
      to: Address,
      functionNameOrSelector: string,
    ) => {
      onStepChange?.({
        type: 'transaction',
        status: 'waiting',
        to,
        functionNameOrSelector,
      });
      return promise;
    };

    const sendPendingTransactionStep = <T>(
      promise: Promise<T>,
      to: Address,
      functionNameOrSelector: string,
    ) => {
      onStepChange?.({
        type: 'transaction',
        status: 'pending',
        to,
        functionNameOrSelector,
      });
      return promise;
    };

    const sendSuccessTransactionStep = (to: Address, functionNameOrSelector: string) => {
      const promise = new Promise((resolve) => setTimeout(resolve, transactionSuccessDelay));
      onStepChange?.({
        type: 'transaction',
        status: 'success',
        to,
        functionNameOrSelector,
      });
      return promise;
    };

    const signTypedData: Wallet['signTypedData'] = async (typedData) => {
      const primaryType = String(typedData.primaryType);
      const signature = await sendWaitingSignatureStep(
        originalSignTypedData(typedData),
        primaryType,
      );
      await sendSuccessSignatureStep(primaryType);
      return signature;
    };

    const writeContract: Wallet['writeContract'] = async (params) => {
      const { address: to, functionName } = params;
      const txHash = await sendWaitingTransactionStep(
        originalWriteContract(params),
        to,
        functionName,
      );
      await sendPendingTransactionStep(
        bcClient.waitForTransactionReceipt({ hash: txHash }),
        to,
        functionName,
      );
      await sendSuccessTransactionStep(to, functionName);
      return txHash;
    };

    const sendTransaction: Wallet['sendTransaction'] = async (params) => {
      const { to, data } = params;
      if (!to || !data) throw new Error('to and data are required');
      const selector = data.slice(0, 10);
      const txHash = await sendWaitingTransactionStep(
        originalSendTransaction(params),
        to,
        selector,
      );
      await sendPendingTransactionStep(
        bcClient.waitForTransactionReceipt({ hash: txHash }),
        to,
        selector,
      );
      await sendSuccessTransactionStep(to, selector);
      return txHash;
    };

    return { ...wallet, signTypedData, writeContract, sendTransaction } as Wallet;
  }
}
