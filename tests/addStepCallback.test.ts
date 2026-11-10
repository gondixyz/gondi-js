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
  walletRejection?: Error,
) => {
  const onStepChange = mock(async () => undefined);
  const answer = async <T>(value: T) => {
    if (walletRejection) throw walletRejection;
    return value;
  };
  const wallet = addStepCallback({
    wallet: {
      chain: { id: 1 },
      account: { address: zeroAddress },
      transport: { key: 'stub', name: 'stub', request: async () => null, type: 'stub' },
      writeContract: () => answer(TX_HASH),
      sendTransaction: () => answer(TX_HASH),
      signTypedData: () => answer('0x'),
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

describe.each([
  ['writeContract', writeContract],
  ['sendTransaction', sendTransaction],
])('addStepCallback %s', (_name, send) => {
  test('rejects with the hash when the transaction reverts', async () => {
    const { wallet } = setup('reverted');

    await expect(send(wallet)).rejects.toThrow(TX_HASH);
  });

  test('reports an error with the hash for a reverted transaction', async () => {
    const { wallet, reportedStatuses, onStepChange } = setup('reverted');

    const error = await send(wallet).catch((rejection: Error) => rejection);

    expect(reportedStatuses()).toEqual(['waiting', 'broadcasted', 'error']);
    expect(onStepChange.mock.calls.at(-1)).toEqual([
      expect.objectContaining({ status: 'error', transactionHash: TX_HASH, chainId: 1, error }),
    ]);
  });

  test('reports an error without a hash when the wallet rejects the transaction', async () => {
    const rejection = new Error('User rejected the request.');
    const { wallet, reportedStatuses, onStepChange } = setup(
      'success',
      TX_HASH,
      undefined,
      rejection,
    );

    await expect(send(wallet)).rejects.toBe(rejection);
    expect(reportedStatuses()).toEqual(['waiting', 'error']);
    expect(onStepChange.mock.calls.at(-1)).toEqual([
      expect.objectContaining({ status: 'error', error: rejection }),
    ]);
    expect(onStepChange.mock.calls.at(-1)?.[0]).not.toHaveProperty('transactionHash');
  });

  test('exposes transaction identity at broadcast and confirmation', async () => {
    const { wallet, onStepChange } = setup('success');

    await send(wallet);

    expect(onStepChange.mock.calls).toEqual([
      [expect.objectContaining({ status: 'waiting' })],
      [expect.objectContaining({ status: 'broadcasted', transactionHash: TX_HASH, chainId: 1 })],
      [expect.objectContaining({ status: 'success', transactionHash: TX_HASH, chainId: 1 })],
    ]);
  });

  test.each(['broadcasted', 'success'])(
    'rejects with the callback error and reports no error step when the %s callback throws',
    async (throwingStatus) => {
      const callbackError = new Error('callback bug');
      const { wallet, reportedStatuses, onStepChange } = setup('success');
      onStepChange.mockImplementation((async (step: { status: string }) => {
        if (step.status === throwingStatus) throw callbackError;
      }) as never);

      await expect(send(wallet)).rejects.toBe(callbackError);
      expect(reportedStatuses()).not.toContain('error');
    },
  );

  test('rejects with the wallet error when the error callback throws', async () => {
    const rejection = new Error('User rejected the request.');
    const { wallet, onStepChange } = setup('success', TX_HASH, undefined, rejection);
    onStepChange.mockImplementation((async (step: { status: string }) => {
      if (step.status === 'error') throw new Error('callback bug');
    }) as never);

    await expect(send(wallet)).rejects.toBe(rejection);
  });

  test.each(['cancelled', 'replaced'] as const)(
    'rejects with the reason and both hashes when the transaction is %s',
    async (reason) => {
      const { wallet, reportedStatuses } = setup('success', REPLACEMENT_HASH, reason);

      const error = await send(wallet).catch((rejection: Error) => rejection);

      expect(String(error)).toContain(`Transaction ${reason}: ${TX_HASH} by ${REPLACEMENT_HASH}`);
      expect(reportedStatuses()).toEqual(['waiting', 'broadcasted', 'error']);
    },
  );

  test('reports success with both hashes for a repriced transaction', async () => {
    const { wallet, reportedStatuses, onStepChange } = setup(
      'success',
      REPLACEMENT_HASH,
      'repriced',
    );

    expect(await send(wallet)).toBe(TX_HASH);
    expect(reportedStatuses()).toEqual(['waiting', 'broadcasted', 'success']);
    expect(onStepChange.mock.calls.at(-1)).toEqual([
      expect.objectContaining({
        status: 'success',
        transactionHash: REPLACEMENT_HASH,
        originalTransactionHash: TX_HASH,
      }),
    ]);
  });
});

describe('addStepCallback signTypedData', () => {
  const sign = (wallet: ReturnType<typeof setup>['wallet']) =>
    wallet.signTypedData({ primaryType: 'Offer' } as unknown as Parameters<
      typeof wallet.signTypedData
    >[0]);

  test('reports waiting then success for a signature', async () => {
    const { wallet, reportedStatuses } = setup('success');

    await sign(wallet);

    expect(reportedStatuses()).toEqual(['waiting', 'success']);
  });

  test('reports an error when the wallet rejects the signature', async () => {
    const rejection = new Error('User rejected the request.');
    const { wallet, reportedStatuses, onStepChange } = setup(
      'success',
      TX_HASH,
      undefined,
      rejection,
    );

    await expect(sign(wallet)).rejects.toBe(rejection);
    expect(reportedStatuses()).toEqual(['waiting', 'error']);
    expect(onStepChange.mock.calls.at(-1)).toEqual([
      { type: 'signature', primaryType: 'Offer', status: 'error', error: rejection },
    ]);
  });

  test('rejects with the callback error and reports no error step when the success callback throws', async () => {
    const callbackError = new Error('callback bug');
    const { wallet, reportedStatuses, onStepChange } = setup('success');
    onStepChange.mockImplementation((async (step: { status: string }) => {
      if (step.status === 'success') throw callbackError;
    }) as never);

    await expect(sign(wallet)).rejects.toBe(callbackError);
    expect(reportedStatuses()).toEqual(['waiting', 'success']);
  });
});
