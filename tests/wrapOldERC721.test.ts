import { beforeEach, describe, expect, mock, test } from 'bun:test';
import { Address, getAddress } from 'viem';

import { stubGondi } from './utils/gondiStub';

const TX_HASH = `0x${'ab'.repeat(32)}` as const;
const WALLET = `0x${'aa'.repeat(20)}` as const;
const STASH = `0x${'bb'.repeat(20)}` as const;
const STRANGER = '0x0000000000000000000000000000000000000009';
const COLLECTION = '0x0000000000000000000000000000000000000c01';
const TOKEN_ID = 7n;

const ownerOf = mock(async (): Promise<Address> => WALLET);
const transfer = mock(async () => TX_HASH);
const wrapOldERC721 = mock(async () => ({ txHash: TX_HASH }));
const waitForTransactionReceipt = mock(async () => ({
  status: 'success',
  transactionHash: TX_HASH,
}));

const gondi = stubGondi({
  wallet: { chain: { id: 1 }, account: { address: WALLET } },
  bcClient: { waitForTransactionReceipt },
  apiClient: { getWrapperAddress: async () => STRANGER },
  contracts: {
    OldERC721Wrapper: () => ({
      contract: { read: { stashAddress: async () => STASH } },
      wrapOldERC721,
    }),
    OldERC721: () => ({
      contract: { read: { ownerOf } },
      safeContractWrite: { transfer },
    }),
  },
});

const wrap = () =>
  gondi.wrapOldERC721({
    collection: { contractData: { contractAddress: COLLECTION } },
    tokenId: TOKEN_ID,
  } as Parameters<typeof gondi.wrapOldERC721>[0]);

beforeEach(() => {
  [transfer, wrapOldERC721, waitForTransactionReceipt].forEach((write) => write.mockClear());
  ownerOf.mockImplementation(async () => WALLET);
});

describe('wrapOldERC721', () => {
  test('moves an NFT the wallet holds into its Stash, then wraps it', async () => {
    await wrap();

    expect(transfer).toHaveBeenCalledWith([STASH, TOKEN_ID]);
    expect(wrapOldERC721).toHaveBeenCalledWith({ tokenId: TOKEN_ID });
  });

  test('does not wrap when the transfer to the Stash reverts', async () => {
    waitForTransactionReceipt.mockImplementationOnce(async () => ({
      status: 'reverted',
      transactionHash: TX_HASH,
    }));

    await expect(wrap()).rejects.toThrow(TX_HASH);
    expect(wrapOldERC721).not.toHaveBeenCalled();
  });

  test('wraps an NFT already in the Stash without transferring it', async () => {
    ownerOf.mockImplementation(async () => getAddress(STASH));

    await wrap();

    expect(transfer).not.toHaveBeenCalled();
    expect(wrapOldERC721).toHaveBeenCalledWith({ tokenId: TOKEN_ID });
  });

  test('transfers an NFT the wallet holds whatever the case of its address', async () => {
    ownerOf.mockImplementation(async () => getAddress(WALLET));

    await wrap();

    expect(transfer).toHaveBeenCalledWith([STASH, TOKEN_ID]);
  });

  test('refuses an NFT held by someone else', async () => {
    ownerOf.mockImplementation(async () => STRANGER);

    await expect(wrap()).rejects.toThrow('NFT not owned');
    expect(wrapOldERC721).not.toHaveBeenCalled();
  });
});
