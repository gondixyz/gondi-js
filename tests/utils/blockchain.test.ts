import { describe, expect, test } from 'bun:test';
import { TransactionReceiptNotFoundError, WaitForTransactionReceiptTimeoutError } from 'viem';

import { getBlockNumberAtOrBefore, withRetriedReceiptWait } from '@/utils/blockchain';

const HASH = `0x${'ab'.repeat(32)}` as const;

type WaitArgs = { hash: `0x${string}`; timeout?: number };

const clientFrom = (waitImpl: (args: WaitArgs) => Promise<unknown>) =>
  withRetriedReceiptWait(
    { waitForTransactionReceipt: waitImpl } as unknown as Parameters<
      typeof withRetriedReceiptWait
    >[0],
    { timeoutMillis: 200, retryDelayMillis: 10 },
  );

describe('withRetriedReceiptWait', () => {
  test('retries pending-receipt rejections until the receipt arrives', async () => {
    let attempts = 0;
    const client = clientFrom(async () => {
      attempts += 1;
      if (attempts < 3) throw new TransactionReceiptNotFoundError({ hash: HASH });
      return { status: 'success' };
    });

    const receipt = await client.waitForTransactionReceipt({ hash: HASH });

    expect(attempts).toBe(3);
    expect(receipt).toEqual({ status: 'success' });
  });

  test('gives up with a timeout error carrying the hash once the deadline passes', async () => {
    const client = clientFrom(async () => {
      throw new TransactionReceiptNotFoundError({ hash: HASH });
    });

    const wait = client.waitForTransactionReceipt({ hash: HASH });

    await expect(wait).rejects.toBeInstanceOf(WaitForTransactionReceiptTimeoutError);
    await expect(wait).rejects.toThrow(HASH);
  });

  test('propagates non-pending errors immediately', async () => {
    let attempts = 0;
    const client = clientFrom(async () => {
      attempts += 1;
      throw new Error('execution reverted');
    });

    await expect(client.waitForTransactionReceipt({ hash: HASH })).rejects.toThrow(
      'execution reverted',
    );
    expect(attempts).toBe(1);
  });

  test('caps each attempt to the remaining time before the deadline', async () => {
    const timeouts: (number | undefined)[] = [];
    const client = clientFrom(async (args) => {
      timeouts.push(args.timeout);
      throw new TransactionReceiptNotFoundError({ hash: HASH });
    });

    await expect(client.waitForTransactionReceipt({ hash: HASH })).rejects.toBeInstanceOf(
      WaitForTransactionReceiptTimeoutError,
    );

    expect(timeouts.length).toBeGreaterThan(1);
    const [firstTimeout, ...laterTimeouts] = timeouts;
    expect(firstTimeout).toBeLessThanOrEqual(200);
    laterTimeouts.forEach((timeout) => expect(timeout).toBeLessThan(firstTimeout ?? 0));
  });
});

describe('getBlockNumberAtOrBefore', () => {
  const latest = { number: 1_000n, timestamp: 50_000n };

  const chain = (chainId: number) =>
    ({
      chain: undefined,
      getChainId: async () => chainId,
      getBlock: async () => latest,
    }) as unknown as Parameters<typeof getBlockNumberAtOrBefore>[0];

  test('steps back one block per 12 seconds on mainnet', async () => {
    expect(await getBlockNumberAtOrBefore(chain(1), 50_000n - 1_200n)).toBe(900n);
  });

  test('steps back four blocks per second on any other chain', async () => {
    expect(await getBlockNumberAtOrBefore(chain(999), 50_000n - 100n)).toBe(600n);
  });

  test('stops at the first block', async () => {
    expect(await getBlockNumberAtOrBefore(chain(999), 0n)).toBe(0n);
  });
});
