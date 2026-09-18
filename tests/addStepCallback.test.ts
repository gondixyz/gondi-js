import { describe, expect, mock, test } from 'bun:test';
import { zeroAddress } from 'viem';

import { addStepCallback } from '@/addStepCallback';

const TX_HASH = `0x${'ab'.repeat(32)}` as const;
const CONTRACT = '0x0000000000000000000000000000000000000005';
const CALLDATA = '0xa9059cbb';

/** A wallet over stub clients whose mined receipt has the given status. */
const setup = (status: 'success' | 'reverted') => {
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
      waitForTransactionReceipt: async () => ({ status, transactionHash: TX_HASH }),
    } as unknown as Parameters<typeof addStepCallback>[0]['publicClient'],
  });
  const reportedStatuses = () =>
    onStepChange.mock.calls.map((call) => (call as unknown as [{ status: string }])[0].status);
  return { wallet, reportedStatuses };
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
