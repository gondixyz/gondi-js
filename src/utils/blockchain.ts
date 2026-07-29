import {
  PublicClient,
  TransactionNotFoundError,
  TransactionReceiptNotFoundError,
  WaitForTransactionReceiptTimeoutError,
} from 'viem';

import { HexString } from '@/blockchain';

export const isEmptyCalldata = (calldata: HexString) => calldata === '0x';

/**
 * Total time a receipt wait keeps trying before giving up on a broadcast
 * transaction. Slow-to-mine transactions usually confirm well within this
 * window; viem's own default gives up after 180s.
 */
export const WAIT_FOR_RECEIPT_TIMEOUT_MILLIS = 360_000;

const RECEIPT_RETRY_DELAY_MILLIS = 5_000;

type ReceiptWaiter = Pick<PublicClient, 'waitForTransactionReceipt'>;

interface ReceiptWaitOptions {
  timeoutMillis?: number;
  retryDelayMillis?: number;
}

/**
 * Wraps a public client so `waitForTransactionReceipt` stays patient for
 * {@link WAIT_FOR_RECEIPT_TIMEOUT_MILLIS} instead of viem's 180s default.
 *
 * viem's wait also rejects with `TransactionReceiptNotFoundError` /
 * `TransactionNotFoundError` long before its timeout when the RPC node lags
 * behind the mempool (its internal lookups exhaust their retries). Those
 * rejections mean the transaction is still pending, so the wrapper retries
 * the wait until the deadline and only then throws
 * `WaitForTransactionReceiptTimeoutError` with the transaction hash.
 */
export const withRetriedReceiptWait = <TClient extends ReceiptWaiter>(
  client: TClient,
  options: ReceiptWaitOptions = {},
): TClient => {
  const {
    timeoutMillis = WAIT_FOR_RECEIPT_TIMEOUT_MILLIS,
    retryDelayMillis = RECEIPT_RETRY_DELAY_MILLIS,
  } = options;
  const waitForTransactionReceipt: TClient['waitForTransactionReceipt'] = async (args) => {
    const deadline = Date.now() + timeoutMillis;
    for (;;) {
      try {
        return await client.waitForTransactionReceipt({
          ...args,
          timeout: Math.max(deadline - Date.now(), 1),
        });
      } catch (error) {
        const transactionStillPending =
          error instanceof TransactionReceiptNotFoundError ||
          error instanceof TransactionNotFoundError;
        if (!transactionStillPending) throw error;
        if (deadline - Date.now() <= retryDelayMillis) {
          throw new WaitForTransactionReceiptTimeoutError({ hash: args.hash });
        }
        await new Promise((resolve) => setTimeout(resolve, retryDelayMillis));
      }
    }
  };
  return { ...client, waitForTransactionReceipt };
};
