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
 * Builds a `Gondi` without running its constructor: empty pending-publication
 * maps, a zero-address account and wallet, plus the test's own `contracts` and
 * `apiClient` stubs.
 */
export const gondiWith = (overrides: { contracts: object; apiClient: object }) =>
  Object.assign(Object.create(Gondi.prototype), {
    pendingSingleNftPublications: new Map(),
    pendingCollectionPublications: new Map(),
    pendingRenegotiationPublications: new Map(),
    wallet: { chain: { id: 1 }, account: { address: zeroAddress } },
    account: { address: zeroAddress },
    ...overrides,
  });
