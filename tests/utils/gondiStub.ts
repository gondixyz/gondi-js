import { mock } from 'bun:test';
import { zeroAddress, zeroHash } from 'viem';

mock.module('@/clients/api/client', () => ({ apolloClient: () => ({}) }));
const { Gondi } = await import('../../src/gondi');

export const SINGLE_NFT_OFFER_HASH = {
  offer: {
    offerHash: zeroHash,
    offerId: 1n,
    validators: [],
    fee: 0n,
    collateralAddress: zeroAddress,
    nft: { tokenId: 6n },
  },
};

export const RENEGOTIATION_OFFER_HASH = {
  offer: { renegotiationId: 2n, offerHash: zeroHash, loanId: 1n },
};

export const RENEGOTIATION = {
  loanId: 'loan',
  principalAmount: 100n,
  feeAmount: 0n,
  aprBps: 2400n,
  duration: 2592000n,
  expirationTime: 9000000000n,
};

/**
 * Builds a `Gondi` without running its constructor, holding only `fields`.
 */
export const stubGondi = (fields: object) =>
  Object.assign(Object.create(Gondi.prototype) as InstanceType<typeof Gondi>, fields);

/**
 * Builds a `Gondi` without running its constructor: empty pending-publication
 * maps, a zero-address account and wallet, plus the test's own `contracts` and
 * `apiClient` stubs.
 */
export const gondiWith = (overrides: { contracts: object; apiClient: object }) =>
  stubGondi({
    pendingSingleNftPublications: new Map(),
    pendingCollectionPublications: new Map(),
    pendingRenegotiationPublications: new Map(),
    wallet: { chain: { id: 1 }, account: { address: zeroAddress } },
    account: { address: zeroAddress },
    ...overrides,
  });

/**
 * The `nftFlaggedByContractAddressAndTokenId` response for an NFT that is not
 * flagged and wraps nothing.
 */
export const notFlaggedNft = async () => ({
  nft: { id: '1', isFlagged: false, wrapsNfts: null } as unknown,
});

/**
 * Builds the stubs for a test of the flagged-NFT check that runs before a
 * loan is emitted: an `nftFlaggedByContractAddressAndTokenId` mock answering
 * `notFlaggedNft`, and a `createGondi` factory wiring it next to `contracts`,
 * with the check on unless `skipFlaggedNftCheck` is passed.
 */
export const flaggedNftCheckStub = (contracts: object) => {
  const nftFlaggedByContractAddressAndTokenId = mock(notFlaggedNft);
  const createGondi = ({ skipFlaggedNftCheck = false } = {}) =>
    stubGondi({
      skipFlaggedNftCheck,
      apiClient: { nftFlaggedByContractAddressAndTokenId },
      contracts,
    });
  return { nftFlaggedByContractAddressAndTokenId, createGondi };
};
