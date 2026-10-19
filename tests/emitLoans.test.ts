import { beforeEach, expect, mock, test } from 'bun:test';
import { Address } from 'viem';

mock.module('@/clients/api/client', () => ({ apolloClient: () => ({}) }));
const { Gondi } = await import('@/gondi');
import { MslV6 } from '@/clients/contracts/MslV6';
import { FlaggedNftError } from '@/errors';
import { EmitLoanArgs } from '@/gondi';

const MSL_ADDRESS = '0x00000000000000000000000000000000000000Aa';
const OTHER_MSL_ADDRESS = '0x00000000000000000000000000000000000000Bb';
const COLLECTION = '0x0000000000000000000000000000000000000002';

const loanFor = (tokenId: bigint, contractAddress: Address = MSL_ADDRESS) =>
  ({
    offerExecution: [{ offer: { contractAddress }, lenderOfferSignature: '0x' }],
    nftCollateralAddress: COLLECTION,
    tokenId,
    duration: 1n,
  }) as unknown as EmitLoanArgs;

const emitLoans = mock(async () => ({ txHash: '0xtx' }));
const mslV6 = Object.assign(Object.create(MslV6.prototype), { emitLoans });
const Msl = mock((_address: Address): unknown => mslV6);
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
  emitLoans.mockClear();
  Msl.mockClear();
  nftFlaggedByContractAddressAndTokenId.mockClear();
});

test('emitLoans sends every loan to the contract of their offers', async () => {
  const loans = [loanFor(1n), loanFor(2n, MSL_ADDRESS.toLowerCase() as Address)];

  await createGondi().emitLoans(loans);

  expect(Msl).toHaveBeenCalledWith(MSL_ADDRESS);
  expect(emitLoans).toHaveBeenCalledWith(loans);
  expect(nftFlaggedByContractAddressAndTokenId.mock.calls).toEqual([
    [{ contractAddress: COLLECTION, tokenId: 1n }],
    [{ contractAddress: COLLECTION, tokenId: 2n }],
  ] as unknown as typeof nftFlaggedByContractAddressAndTokenId.mock.calls);
});

test('emitLoans refuses an empty list', async () => {
  await expect(createGondi().emitLoans([])).rejects.toThrow('At least one loan');
  expect(Msl).not.toHaveBeenCalled();
});

test('emitLoans refuses loans whose offers are on different contracts', async () => {
  await expect(
    createGondi().emitLoans([loanFor(1n), loanFor(2n, OTHER_MSL_ADDRESS)]),
  ).rejects.toThrow('same MultiSourceLoan contract');
  expect(Msl).not.toHaveBeenCalled();
  expect(emitLoans).not.toHaveBeenCalled();
});

test('emitLoans refuses a MultiSourceLoan contract older than version 3', async () => {
  Msl.mockImplementationOnce(() => ({ emitLoan: mock() }));

  await expect(createGondi().emitLoans([loanFor(1n)])).rejects.toThrow('version 3 or later');
  expect(nftFlaggedByContractAddressAndTokenId).not.toHaveBeenCalled();
});

test('emitLoans sends nothing when one of the NFTs is flagged', async () => {
  nftFlaggedByContractAddressAndTokenId
    .mockImplementationOnce(async () => ({ nft: { id: '1', isFlagged: false, wrapsNfts: null } }))
    .mockImplementationOnce(async () => ({ nft: { id: '2', isFlagged: true, wrapsNfts: null } }));

  await expect(createGondi().emitLoans([loanFor(1n), loanFor(2n)])).rejects.toBeInstanceOf(
    FlaggedNftError,
  );
  expect(emitLoans).not.toHaveBeenCalled();
});

test('emitLoans with skipFlaggedNftCheck sends without asking the API', async () => {
  const loans = [loanFor(1n), loanFor(2n)];

  await createGondi({ skipFlaggedNftCheck: true }).emitLoans(loans);

  expect(nftFlaggedByContractAddressAndTokenId).not.toHaveBeenCalled();
  expect(emitLoans).toHaveBeenCalledWith(loans);
});
