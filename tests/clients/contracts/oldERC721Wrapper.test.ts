import { describe, expect, test } from 'bun:test';
import { zeroAddress } from 'viem';

import { OldERC721Wrapper } from '@/clients/contracts/OldERC721Wrapper';

const TX_HASH = `0x${'cd'.repeat(32)}` as const;
const CONTRACT = '0x0000000000000000000000000000000000000006';

/** A wrapper over stub clients whose mined receipt has the given status. */
const setup = (status: 'success' | 'reverted') =>
  new OldERC721Wrapper({
    walletClient: {
      chain: { id: 1 },
      account: { address: zeroAddress },
      transport: { key: 'stub', name: 'stub', request: async () => null, type: 'stub' },
      writeContract: async () => TX_HASH,
    } as unknown as ConstructorParameters<typeof OldERC721Wrapper>[0]['walletClient'],
    publicClient: {
      simulateContract: async (parameters: unknown) => ({ request: parameters }),
      waitForTransactionReceipt: async () => ({ status, transactionHash: TX_HASH }),
    } as unknown as ConstructorParameters<typeof OldERC721Wrapper>[0]['publicClient'],
    contractAddress: CONTRACT,
  });

describe('OldERC721Wrapper', () => {
  test.each([
    ['wrapOldERC721', (wrapper: OldERC721Wrapper) => wrapper.wrapOldERC721({ tokenId: 1n })],
    ['unwrap', (wrapper: OldERC721Wrapper) => wrapper.unwrap(1n)],
  ])('%s waitMined rejects with the hash when the transaction reverts', async (_name, send) => {
    const { waitMined } = await send(setup('reverted'));

    await expect(waitMined()).rejects.toThrow(TX_HASH);
  });

  test.each([
    ['wrapOldERC721', (wrapper: OldERC721Wrapper) => wrapper.wrapOldERC721({ tokenId: 1n })],
    ['unwrap', (wrapper: OldERC721Wrapper) => wrapper.unwrap(1n)],
  ])('%s waitMined returns the receipt when the transaction succeeds', async (_name, send) => {
    const { waitMined } = await send(setup('success'));

    expect((await waitMined()).status).toBe('success');
  });
});
