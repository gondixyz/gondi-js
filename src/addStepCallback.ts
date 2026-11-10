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
import { withStepError } from '@/utils/steps';

export const addStepCallback = (props: {
  wallet: Wallet;
  onStepChange: OnStepChange;
  publicClient?: PublicClient;
}): Wallet => {
  const { wallet, onStepChange } = props;
  const publicClient = withRetriedReceiptWait(
    props.publicClient ??
      createPublicClient({
        chain: wallet.chain,
        transport: () => createTransport(wallet.transport),
      }),
  );

  const originalSignTypedData = wallet.signTypedData.bind(wallet);
  const originalWriteContract = wallet.writeContract.bind(wallet);
  const originalSendTransaction = wallet.sendTransaction.bind(wallet);

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
    const receipt = await publicClient.waitForTransactionReceipt({
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

  /** Reports a signature to `onStepChange` as waiting, then success or error. */
  const signTypedData: Wallet['signTypedData'] = async (typedData) => {
    const step = { type: 'signature', primaryType: String(typedData.primaryType) } as const;
    await onStepChange({ ...step, status: 'waiting' });
    const signature = await withStepError(
      () => originalSignTypedData(typedData),
      (error) => onStepChange({ ...step, status: 'error', error }),
    );
    await onStepChange({ ...step, status: 'success' });
    return signature;
  };

  /**
   * Broadcasts a contract call through `broadcast` and reports it to `onStepChange`
   * as waiting, broadcasted and, once its receipt mined the call, success. A
   * refused broadcast or a failed receipt is reported as error, with the hash
   * once there is one, before rethrowing; an error thrown by a callback is not a
   * failed step and rejects as is. Returns the hash of the broadcast transaction.
   */
  const trackTransaction = async (
    to: Address,
    functionNameOrSelector: string,
    broadcast: () => Promise<Hash>,
  ) => {
    const call = { type: 'transaction', to, functionNameOrSelector } as const;
    const chainId = wallet.chain?.id;
    await onStepChange({ ...call, status: 'waiting' });
    const transactionHash = await withStepError(broadcast, (error) =>
      onStepChange({ ...call, status: 'error', error, chainId }),
    );
    await onStepChange({ ...call, status: 'broadcasted', transactionHash, chainId });
    const receipt = await withStepError(
      () => waitForSentCallReceipt(transactionHash),
      (error) => onStepChange({ ...call, status: 'error', error, chainId, transactionHash }),
    );
    await onStepChange({
      ...call,
      status: 'success',
      transactionHash: receipt.transactionHash,
      originalTransactionHash: transactionHash,
      chainId,
    });
    return transactionHash;
  };

  const writeContract: Wallet['writeContract'] = async (params) =>
    trackTransaction(params.address, params.functionName, () => originalWriteContract(params));

  const sendTransaction: Wallet['sendTransaction'] = async (params) => {
    const { to, data } = params;
    if (!to || !data) throw new Error('to and data are required');
    return trackTransaction(to, data.slice(0, 10), () => originalSendTransaction(params));
  };

  return { ...wallet, signTypedData, writeContract, sendTransaction };
};
