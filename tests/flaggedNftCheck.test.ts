import { beforeEach, expect, mock, test } from 'bun:test';
import { zeroAddress } from 'viem';

mock.module('@/clients/api/client', () => ({ apolloClient: () => ({}) }));
const { Gondi } = await import('@/gondi');
import { FlaggedNftError } from '@/errors';
import { EmitLoanArgs } from '@/gondi';

const nftCollateralAddress = '0x0000000000000000000000000000000000000002';
const args = {
  offerExecution: [{ offer: { contractAddress: zeroAddress }, lenderOfferSignature: '0x' }],
  nftCollateralAddress,
  tokenId: 7n,
  duration: 1n,
} as unknown as EmitLoanArgs;

const emitLoan = mock(async () => ({ txHash: '0xtx' }));
const Msl = mock(() => ({ emitLoan }));
const nftFlaggedByContractAddressAndTokenId = mock(async () => ({
  nft: { id: '1', isFlagged: false, wrapsNfts: null } as unknown,
}));

const createGondi = ({ skipFlaggedNftCheck = false } = {}) =>
  Object.assign(Object.create(Gondi.prototype) as InstanceType<typeof Gondi>, {
    skipFlaggedNftCheck,
    apiClient: { nftFlaggedByContractAddressAndTokenId },
    contracts: { Msl },
  });

beforeEach(() => {
  emitLoan.mockClear();
  Msl.mockClear();
  nftFlaggedByContractAddressAndTokenId.mockClear();
});

test('emitLoan refuses a flagged NFT before sending', async () => {
  nftFlaggedByContractAddressAndTokenId.mockImplementationOnce(async () => ({
    nft: { id: '1', isFlagged: true, wrapsNfts: null },
  }));

  await expect(createGondi().emitLoan(args)).rejects.toBeInstanceOf(FlaggedNftError);
  expect(emitLoan).not.toHaveBeenCalled();
  expect(nftFlaggedByContractAddressAndTokenId).toHaveBeenCalledWith({
    contractAddress: nftCollateralAddress,
    tokenId: 7n,
  });
});

test('emitLoan refuses a wrapper holding a flagged NFT', async () => {
  nftFlaggedByContractAddressAndTokenId.mockImplementationOnce(async () => ({
    nft: { id: '1', isFlagged: false, wrapsNfts: [{ id: '2', isFlagged: true }] },
  }));

  await expect(createGondi().emitLoan(args)).rejects.toBeInstanceOf(FlaggedNftError);
  expect(emitLoan).not.toHaveBeenCalled();
});

test('emitLoan sends for an NFT that is not flagged', async () => {
  await createGondi().emitLoan(args);

  expect(emitLoan).toHaveBeenCalledWith(args);
});

test('emitLoan refuses an NFT the API does not know', async () => {
  nftFlaggedByContractAddressAndTokenId.mockImplementationOnce(async () => {
    throw new Error('[{"message":"NOT_FOUND","path":["nft"]}]');
  });

  await expect(createGondi().emitLoan(args)).rejects.toThrow('NOT_FOUND');
  expect(emitLoan).not.toHaveBeenCalled();
});

test('skipFlaggedNftCheck sends without asking the API', async () => {
  await createGondi({ skipFlaggedNftCheck: true }).emitLoan(args);

  expect(nftFlaggedByContractAddressAndTokenId).not.toHaveBeenCalled();
  expect(emitLoan).toHaveBeenCalledWith(args);
});

test('crossCurrencyRenegotiation refuses a flagged NFT before reaching a contract', async () => {
  nftFlaggedByContractAddressAndTokenId.mockImplementationOnce(async () => ({
    nft: { id: '1', isFlagged: true, wrapsNfts: null },
  }));
  const input = {
    loan: { contractAddress: zeroAddress },
    loanId: 1n,
    executionData: args,
    quote: {},
  } as unknown as Parameters<InstanceType<typeof Gondi>['crossCurrencyRenegotiation']>[0];

  await expect(createGondi().crossCurrencyRenegotiation(input)).rejects.toBeInstanceOf(
    FlaggedNftError,
  );
  expect(Msl).not.toHaveBeenCalled();
});
