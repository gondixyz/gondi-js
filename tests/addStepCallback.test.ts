import { describe, expect, mock, test } from 'bun:test';
import {
  ReplacementReason,
  ReplacementReturnType,
  WaitForTransactionReceiptParameters,
  zeroAddress,
} from 'viem';

import { addStepCallback } from '@/addStepCallback';

const TX_HASH = `0x${'ab'.repeat(32)}` as const;
const REPLACEMENT_HASH = `0x${'cd'.repeat(32)}` as const;
const CONTRACT = '0x0000000000000000000000000000000000000005';
const CALLDATA = '0xa9059cbb';

/** A wallet over stub clients whose mined receipt has the given status. */
const setup = (
  status: 'success' | 'reverted',
  receiptHash: `0x${string}` = TX_HASH,
  replacementReason?: ReplacementReason,
) => {
  const onStepChange = mock(async () => undefined);
  const wallet = addStepCallback({
    wallet: {
      chain: { id: 1 },
      account: { address: zeroAddress },
      transport: { key: 'stub', name: 'stub', request: async () => null, type: 'stub' },
      writeContract: async () => TX_HASH,
      sendTransaction: async () => TX_HASH,
      signTypedData: async () => '0x',
    } as unknown as Parameters<typeof addStepCallback>[0]['wallet'],
    onStepChange,
    publicClient: {
      waitForTransactionReceipt: async ({ onReplaced }: WaitForTransactionReceiptParameters) => {
        const transactionReceipt = { status, transactionHash: receiptHash };
        if (replacementReason) {
          onReplaced?.({
            reason: replacementReason,
            transactionReceipt,
          } as unknown as ReplacementReturnType);
        }
        return transactionReceipt;
      },
    } as unknown as Parameters<typeof addStepCallback>[0]['publicClient'],
  });
  const reportedStatuses = () =>
    onStepChange.mock.calls.map((call) => (call as unknown as [{ status: string }])[0].status);
  return { wallet, reportedStatuses, onStepChange };
};

const writeContract = (wallet: ReturnType<typeof setup>['wallet']) =>
  wallet.writeContract({
    address: CONTRACT,
    abi: [],
    functionName: 'transfer',
  } as unknown as Parameters<typeof wallet.writeContract>[0]);

const sendTransaction = (wallet: ReturnType<typeof setup>['wallet']) =>
  wallet.sendTransaction({
    to: CONTRACT,
    data: CALLDATA,
  } as unknown as Parameters<typeof wallet.sendTransaction>[0]);

describe('addStepCallback', () => {
  test.each([
    ['writeContract', writeContract],
    ['sendTransaction', sendTransaction],
  ])('%s rejects with the hash when the transaction reverts', async (_name, send) => {
    const { wallet } = setup('reverted');

    await expect(send(wallet)).rejects.toThrow(TX_HASH);
  });

  test.each([
    ['writeContract', writeContract],
    ['sendTransaction', sendTransaction],
  ])('%s never reports success for a reverted transaction', async (_name, send) => {
    const { wallet, reportedStatuses } = setup('reverted');

    await send(wallet).catch(() => undefined);

    expect(reportedStatuses()).toEqual(['waiting', 'broadcasted']);
  });

  test.each([
    ['writeContract', writeContract],
    ['sendTransaction', sendTransaction],
  ])('%s reports success once the transaction succeeds', async (_name, send) => {
    const { wallet, reportedStatuses } = setup('success');

    await send(wallet);

    expect(reportedStatuses()).toEqual(['waiting', 'broadcasted', 'success']);
  });
});

test.each([
  ['writeContract', writeContract],
  ['sendTransaction', sendTransaction],
])('%s exposes transaction identity at broadcast and confirmation', async (_name, send) => {
  const { wallet, onStepChange } = setup('success');
  await send(wallet);
  expect(onStepChange.mock.calls).toEqual([
    [expect.objectContaining({ status: 'waiting' })],
    [expect.objectContaining({ status: 'broadcasted', transactionHash: TX_HASH, chainId: 1 })],
    [expect.objectContaining({ status: 'success', transactionHash: TX_HASH, chainId: 1 })],
  ]);
});

test.each([
  ['writeContract', writeContract],
  ['sendTransaction', sendTransaction],
])('%s distinguishes a replacement receipt from the broadcast', async (_name, send) => {
  const replacementHash = `0x${'cd'.repeat(32)}` as const;
  const { wallet, onStepChange } = setup('success', replacementHash);
  expect(await send(wallet)).toBe(TX_HASH);
  expect(onStepChange.mock.calls.at(-1)).toEqual([
    expect.objectContaining({
      status: 'success',
      transactionHash: replacementHash,
      originalTransactionHash: TX_HASH,
    }),
  ]);
});

describe.each([
  ['writeContract', writeContract],
  ['sendTransaction', sendTransaction],
])('%s', (_name, send) => {
  test.each(['cancelled', 'replaced'] as const)(
    'rejects with the reason and both hashes when the transaction is %s',
    async (reason) => {
      const { wallet, reportedStatuses } = setup('success', REPLACEMENT_HASH, reason);

      const error = await send(wallet).catch((rejection: Error) => rejection);

      expect(String(error)).toContain(`Transaction ${reason}: ${TX_HASH} by ${REPLACEMENT_HASH}`);
      expect(reportedStatuses()).toEqual(['waiting', 'broadcasted']);
    },
  );

  test('reports success for a repriced transaction', async () => {
    const { wallet, reportedStatuses } = setup('success', REPLACEMENT_HASH, 'repriced');

    expect(await send(wallet)).toBe(TX_HASH);
    expect(reportedStatuses()).toEqual(['waiting', 'broadcasted', 'success']);
  });
});
