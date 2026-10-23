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
const notFlaggedNft = async () => ({
  nft: { id: '1', isFlagged: false, wrapsNfts: null } as unknown,
});
const nftFlaggedByContractAddressAndTokenId = mock(notFlaggedNft);

const createGondi = ({ skipFlaggedNftCheck = false } = {}) =>
  Object.assign(Object.create(Gondi.prototype) as InstanceType<typeof Gondi>, {
    skipFlaggedNftCheck,
    apiClient: { nftFlaggedByContractAddressAndTokenId },
    contracts: { Msl },
  });

beforeEach(() => {
  emitLoan.mockClear();
  Msl.mockClear();
  nftFlaggedByContractAddressAndTokenId.mockReset().mockImplementation(notFlaggedNft);
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

test('emitLoan refuses an NFT the API returns as null', async () => {
  nftFlaggedByContractAddressAndTokenId.mockImplementationOnce(async () => ({ nft: null }));

  await expect(createGondi().emitLoan(args)).rejects.toThrow('not found');
  expect(emitLoan).not.toHaveBeenCalled();
});

test('skipFlaggedNftCheck sends without asking the API', async () => {
  await createGondi({ skipFlaggedNftCheck: true }).emitLoan(args);

  expect(nftFlaggedByContractAddressAndTokenId).not.toHaveBeenCalled();
  expect(emitLoan).toHaveBeenCalledWith(args);
});

type GondiInstance = InstanceType<typeof Gondi>;
const loan = { contractAddress: zeroAddress };

const guardedEntryPoints: [string, (gondi: GondiInstance) => Promise<unknown>][] = [
  ['emitLoan', (gondi) => gondi.emitLoan(args)],
  [
    'refinanceFromOffers',
    (gondi) =>
      gondi.refinanceFromOffers({
        loanId: 1n,
        executionData: args,
        loan,
      } as unknown as Parameters<GondiInstance['refinanceFromOffers']>[0]),
  ],
  [
    'efficientRefinanceFromOffers',
    (gondi) =>
      gondi.efficientRefinanceFromOffers({
        contractAddress: zeroAddress,
        loanId: 1n,
        executionData: args,
        loan,
      } as unknown as Parameters<GondiInstance['efficientRefinanceFromOffers']>[0]),
  ],
  [
    'crossCurrencyRenegotiation',
    (gondi) =>
      gondi.crossCurrencyRenegotiation({
        loanId: 1n,
        executionData: args,
        quote: {},
        loan,
      } as unknown as Parameters<GondiInstance['crossCurrencyRenegotiation']>[0]),
  ],
  [
    'revokeDelegationsAndEmitLoan',
    (gondi) => gondi.revokeDelegationsAndEmitLoan({ delegations: [], emit: args }),
  ],
];

test.each(guardedEntryPoints)(
  '%s refuses a flagged NFT before reaching a contract',
  async (_, call) => {
    nftFlaggedByContractAddressAndTokenId.mockImplementationOnce(async () => ({
      nft: { id: '1', isFlagged: true, wrapsNfts: null },
    }));

    await expect(call(createGondi())).rejects.toBeInstanceOf(FlaggedNftError);
    expect(Msl).not.toHaveBeenCalled();
    expect(nftFlaggedByContractAddressAndTokenId).toHaveBeenCalledWith({
      contractAddress: nftCollateralAddress,
      tokenId: 7n,
    });
  },
);
