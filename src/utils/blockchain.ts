import {
  Hash,
  PublicClient,
  TransactionNotFoundError,
  TransactionReceipt,
  TransactionReceiptNotFoundError,
  WaitForTransactionReceiptTimeoutError,
} from 'viem';
import { mainnet } from 'viem/chains';

import { HexString } from '@/blockchain';

export const isEmptyCalldata = (calldata: HexString) => calldata === '0x';

/**
 * Returns the receipt of a mined transaction, or throws when it reverted.
 *
 * IMPLEMENTATION NOTE: viem's `waitForTransactionReceipt` resolves with the
 * receipt whatever its outcome and reports a revert only through
 * `receipt.status === 'reverted'`
 * (https://viem.sh/docs/actions/public/waitForTransactionReceipt#returns), so a
 * caller that awaits the receipt alone treats a reverted transaction as mined.
 */
export const assertTransactionSucceeded = (receipt: TransactionReceipt) => {
  if (receipt.status === 'reverted') {
    throw new Error(`Transaction reverted: ${receipt.transactionHash}`);
  }
  return receipt;
};

type ReceiptWaiter = Pick<PublicClient, 'waitForTransactionReceipt'>;

/** Waits for the transaction's receipt and returns it, or throws when the transaction reverted. */
export const waitForSucceededReceipt = async (client: ReceiptWaiter, txHash: Hash) =>
  assertTransactionSucceeded(await client.waitForTransactionReceipt({ hash: txHash }));

/** A sent transaction whose `waitTxInBlock` resolves with its receipt once it succeeds. */
export const minedTransaction = (client: ReceiptWaiter, txHash: Hash) => ({
  txHash,
  waitTxInBlock: () => waitForSucceededReceipt(client, txHash),
});

/**
 * Total time a receipt wait keeps trying before giving up on a broadcast
 * transaction. Slow-to-mine transactions usually confirm well within this
 * window; viem's own default gives up after 180s.
 */
export const WAIT_FOR_RECEIPT_TIMEOUT_MILLIS = 360_000;

const RECEIPT_RETRY_DELAY_MILLIS = 5_000;

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

type BlockReader = Pick<PublicClient, 'chain' | 'getBlock' | 'getChainId'>;

/** The shortest time between two blocks of a chain, where it is known; mainnet slots are 12 s. */
const MINIMUM_BLOCK_MILLISECONDS: Partial<Record<number, bigint>> = { [mainnet.id]: 12_000n };

/** The shortest block time assumed on any other chain: Arbitrum Nitro's 250 ms sequencer tick. */
const DEFAULT_MINIMUM_BLOCK_MILLISECONDS = 250n;

/**
 * Returns a block number at or before the block a call that recorded `block.timestamp` as
 * `timestamp` (seconds) was mined in, in one read of the latest block.
 *
 * No more blocks than the elapsed time over the chain's shortest block time can have been mined
 * since `timestamp`, so stepping back that many blocks from the latest one never lands after it.
 * The block is not exact: on a chain whose blocks are slower than that floor it lands earlier,
 * which only widens the range a caller scans from it.
 *
 * IMPLEMENTATION NOTE: viem's `getBlock` reads the latest block when called without a block
 * number, and its `timestamp` is the block's Unix time in seconds as a `bigint`
 * (https://viem.sh/docs/actions/public/getBlock#returns). `client.chain` is unset on a client
 * built without one, so the chain id then comes from `getChainId`
 * (https://viem.sh/docs/actions/public/getChainId).
 */
export const getBlockNumberAtOrBefore = async (client: BlockReader, timestamp: bigint) => {
  const chainId = client.chain?.id ?? (await client.getChainId());
  const latest = await client.getBlock();
  const minimumBlockMilliseconds =
    MINIMUM_BLOCK_MILLISECONDS[chainId] ?? DEFAULT_MINIMUM_BLOCK_MILLISECONDS;
  const elapsedMilliseconds = (latest.timestamp - timestamp) * 1_000n;
  const blockNumber = latest.number - elapsedMilliseconds / minimumBlockMilliseconds;
  return blockNumber > 0n ? blockNumber : 0n;
};
