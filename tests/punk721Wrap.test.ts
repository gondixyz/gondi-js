import { beforeEach, describe, expect, mock, test } from 'bun:test';
import { Address, zeroAddress } from 'viem';
import { hyperliquid } from 'viem/chains';

import { stubGondi } from './utils/gondiStub';
import { getContracts } from '@/deploys';

const TX_HASH = `0x${'ab'.repeat(32)}` as const;
const WALLET = '0x0000000000000000000000000000000000000001';
const STASH = '0x0000000000000000000000000000000000000005';
const STRANGER = '0x0000000000000000000000000000000000000009';
const TOKEN_ID = 7n;
const { Cryptopunks721: WRAPPER } = getContracts({ id: 1 });

const punkIndexToAddress = mock(async (): Promise<Address> => WALLET);
const ownerOf = mock(async (): Promise<Address> => WALLET);
const transferPunk = mock(async () => TX_HASH);
const wrapPunk = mock(async () => TX_HASH);
const waitForTransactionReceipt = mock(async () => ({
  status: 'success',
  transactionHash: TX_HASH,
}));

const gondi = stubGondi({
  wallet: { chain: { id: 1 }, account: { address: WALLET } },
  bcClient: { waitForTransactionReceipt },
  contracts: {
    Cryptopunks: () => ({
      contract: { read: { punkIndexToAddress } },
      safeContractWrite: { transferPunk },
    }),
    Cryptopunks721: () => ({
      contract: { read: { punkProxyForUser: async () => STASH, ownerOf } },
      safeContractWrite: { wrapPunk },
    }),
  },
});

/** Makes the punks market report `holder` as the punk's owner. */
const heldBy = (holder: Address) => punkIndexToAddress.mockImplementation(async () => holder);

beforeEach(() => {
  [transferPunk, wrapPunk, waitForTransactionReceipt].forEach((write) => write.mockClear());
  ownerOf.mockImplementation(async () => WALLET);
  heldBy(WALLET);
});

describe('punk721WrapState', () => {
  test.each([
    ['wallet', 'the wallet', WALLET],
    ['stash', 'its Stash', STASH],
    ['wrapped', 'the 721 contract', WRAPPER],
    ['other', 'a stranger', STRANGER],
  ] as const)('is %s when %s holds the punk', async (state, _holderName, holder) => {
    heldBy(holder);

    expect(await gondi.punk721WrapState({ tokenId: TOKEN_ID })).toBe(state);
  });

  test('is other when the 721 token of a wrapped punk belongs to someone else', async () => {
    heldBy(WRAPPER);
    ownerOf.mockImplementation(async () => STRANGER);

    expect(await gondi.punk721WrapState({ tokenId: TOKEN_ID })).toBe('other');
  });
});

describe('transferPunkToStash721', () => {
  test('moves a punk the wallet holds into its Stash', async () => {
    await gondi.transferPunkToStash721({ tokenId: TOKEN_ID });

    expect(transferPunk).toHaveBeenCalledWith([STASH, TOKEN_ID]);
  });

  test('refuses a punk already in the Stash', async () => {
    heldBy(STASH);

    await expect(gondi.transferPunkToStash721({ tokenId: TOKEN_ID })).rejects.toThrow('stash');
  });
});

describe('wrapPunk721', () => {
  test('wraps a punk waiting in the Stash', async () => {
    heldBy(STASH);

    await gondi.wrapPunk721({ tokenId: TOKEN_ID });

    expect(wrapPunk).toHaveBeenCalledWith([TOKEN_ID]);
  });

  test('refuses a punk the wallet still holds', async () => {
    await expect(gondi.wrapPunk721({ tokenId: TOKEN_ID })).rejects.toThrow('wallet');
  });

  test('waitTxInBlock rejects with the hash when the wrap reverts', async () => {
    heldBy(STASH);
    waitForTransactionReceipt.mockImplementationOnce(async () => ({
      status: 'reverted',
      transactionHash: TX_HASH,
    }));

    const { waitTxInBlock } = await gondi.wrapPunk721({ tokenId: TOKEN_ID });

    await expect(waitTxInBlock()).rejects.toThrow(TX_HASH);
  });
});

test('the 721 wrapper has no address on a chain without punks', () => {
  expect(getContracts(hyperliquid).Cryptopunks721).toBe(zeroAddress);
});
