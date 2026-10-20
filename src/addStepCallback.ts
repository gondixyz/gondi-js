import {
  Address,
  createPublicClient,
  createTransport,
  Hash,
  PublicClient,
  ReplacementReason,
} from 'viem';

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

  /**
   * Waits for the receipt of a broadcast transaction and throws unless it mined
   * the call that was sent: a revert, or a replacement by a different call.
   *
   * IMPLEMENTATION NOTE: when the wallet replaces a pending transaction, viem's
   * `waitForTransactionReceipt` resolves with the replacement's receipt and
   * reports why only through `onReplaced`, whose `reason` is `repriced` (same
   * call at a higher fee), `cancelled` (a 0-value transfer to the sender with
   * the same nonce) or `replaced` (any other transaction)
   * (https://viem.sh/docs/actions/public/waitForTransactionReceipt#onreplaced-optional).
   * A cancellation mines a successful receipt, so its status alone reads as success.
   */
  const waitForSentCallReceipt = async (transactionHash: Hash) => {
    let replacementReason: ReplacementReason | undefined;
    const receipt = await bcClient.waitForTransactionReceipt({
      hash: transactionHash,
      onReplaced: ({ reason }) => {
        replacementReason = reason;
      },
    });
    if (replacementReason === 'cancelled' || replacementReason === 'replaced') {
      throw new Error(
        `Transaction ${replacementReason}: ${transactionHash} by ${receipt.transactionHash}`,
      );
    }
    return assertTransactionSucceeded(receipt);
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
    const receipt = await waitForSentCallReceipt(txHash);
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
    const receipt = await waitForSentCallReceipt(txHash);
    await sendSuccessTransactionStep(to, selector, receipt.transactionHash, txHash);
    return txHash;
  };

  return { ...wallet, signTypedData, writeContract, sendTransaction };
};
