import { describe, expect, it, mock } from 'bun:test';
import { zeroAddress, zeroHash } from 'viem';
import { getContracts } from '../src/deploys';

mock.module('@/clients/api/client', () => ({ apolloClient: () => ({}) }));
const { Gondi } = await import('../src/gondi');

const contractAddress = getContracts({ id: 1 }).MultiSourceLoan['3'];

const renegotiation = {
  loanId: 'loan',
  principalAmount: 100n,
  feeAmount: 0n,
  aprBps: 2400n,
  duration: 2592000n,
  expirationTime: 9000000000n,
};

/** A Gondi whose contract and API calls are mocks, for the refinance offer flow. */
const gondiWithMocks = () => {
  const signRenegotiationOffer = mock(async (..._arguments: unknown[]) => '0x5678');
  const generateRenegotiationOfferHash = mock(async (..._arguments: unknown[]) => ({
    offer: { renegotiationId: 2n, offerHash: zeroHash, loanId: 1n },
  }));
  const saveRefinanceOffer = mock(async (..._arguments: unknown[]) => ({ id: 'saved' }));
  const gondi = Object.create(Gondi.prototype);
  Object.assign(gondi, {
    pendingSingleNftPublications: new Map(),
    pendingCollectionPublications: new Map(),
    pendingRenegotiationPublications: new Map(),
    wallet: { chain: { id: 1 } },
    account: { address: zeroAddress },
    contracts: { Msl: () => ({ address: contractAddress, signRenegotiationOffer }) },
    apiClient: { generateRenegotiationOfferHash, saveRefinanceOffer },
  });
  return { gondi, signRenegotiationOffer, generateRenegotiationOfferHash, saveRefinanceOffer };
};

describe('makeRefinanceOffer private', () => {
  it('saves the offer as private', async () => {
    const { gondi, saveRefinanceOffer } = gondiWithMocks();
    await gondi.makeRefinanceOffer({ renegotiation, contractAddress, private: true });
    expect(saveRefinanceOffer.mock.calls[0]?.[0]).toMatchObject({ private: true });
  });

  it('saves the offer as public by default', async () => {
    const { gondi, saveRefinanceOffer } = gondiWithMocks();
    await gondi.makeRefinanceOffer({ renegotiation, contractAddress });
    expect(saveRefinanceOffer.mock.calls[0]?.[0]).toMatchObject({ private: false });
  });

  it('leaves private out of the hash request', async () => {
    const { gondi, generateRenegotiationOfferHash } = gondiWithMocks();
    await gondi.makeRefinanceOffer({ renegotiation, contractAddress, private: true });
    expect(
      (generateRenegotiationOfferHash.mock.calls[0]?.[0] as { renegotiationInput: object })
        .renegotiationInput,
    ).not.toHaveProperty('private');
  });

  it('leaves private out of the signed struct', async () => {
    const { gondi, signRenegotiationOffer } = gondiWithMocks();
    await gondi.makeRefinanceOffer({ renegotiation, contractAddress, private: true });
    expect(
      (signRenegotiationOffer.mock.calls[0]?.[0] as { structToSign: object }).structToSign,
    ).not.toHaveProperty('private');
  });

  it('refuses a private offer with a fallback before signing', async () => {
    const { gondi, signRenegotiationOffer } = gondiWithMocks();
    await expect(
      gondi.makeRefinanceOffer({
        renegotiation,
        contractAddress,
        private: true,
        withFallbackOffer: true,
        principalAddress: zeroAddress,
        nftId: 1,
      }),
    ).rejects.toThrow('private and withFallbackOffer cannot be true at the same time');
    expect(signRenegotiationOffer).not.toHaveBeenCalled();
  });
});
