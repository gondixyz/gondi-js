import { describe, expect, it, mock } from 'bun:test';
import { zeroAddress } from 'viem';
import { getContracts } from '../src/deploys';
import {
  gondiWith,
  RENEGOTIATION,
  RENEGOTIATION_OFFER_HASH,
  SINGLE_NFT_OFFER_HASH,
} from './utils/gondiStub';

const contractAddress = getContracts({ id: 1 }).MultiSourceLoan['3'];
const borrower = '0x00000000000000000000000000000000000000b0';

/** A Gondi whose contract and API calls are mocks, for the refinance offer flow. */
const gondiWithMocks = () => {
  const signRenegotiationOffer = mock(async (..._arguments: unknown[]) => '0x5678');
  const generateRenegotiationOfferHash = mock(
    async (..._arguments: unknown[]) => RENEGOTIATION_OFFER_HASH,
  );
  const saveRefinanceOffer = mock(async (..._arguments: unknown[]) => ({ id: 'saved' }));
  const signOffer = mock(async (..._arguments: unknown[]) => '0x1234');
  const gondi = gondiWith({
    contracts: { Msl: () => ({ address: contractAddress, signRenegotiationOffer, signOffer }) },
    apiClient: {
      generateRenegotiationOfferHash,
      generateSingleNftOfferHash: async () => SINGLE_NFT_OFFER_HASH,
      saveRefinanceOffer,
    },
  });
  return {
    gondi,
    signRenegotiationOffer,
    signOffer,
    generateRenegotiationOfferHash,
    saveRefinanceOffer,
  };
};

describe('makeRefinanceOffer private', () => {
  it('saves the offer as private', async () => {
    const { gondi, saveRefinanceOffer } = gondiWithMocks();
    await gondi.makeRefinanceOffer({
      renegotiation: RENEGOTIATION,
      contractAddress,
      private: true,
    });
    expect(saveRefinanceOffer.mock.calls[0]?.[0]).toMatchObject({ private: true });
  });

  it('saves the offer as public by default', async () => {
    const { gondi, saveRefinanceOffer } = gondiWithMocks();
    await gondi.makeRefinanceOffer({ renegotiation: RENEGOTIATION, contractAddress });
    expect(saveRefinanceOffer.mock.calls[0]?.[0]).toMatchObject({ private: false });
  });

  it('leaves private out of the hash request', async () => {
    const { gondi, generateRenegotiationOfferHash } = gondiWithMocks();
    await gondi.makeRefinanceOffer({
      renegotiation: RENEGOTIATION,
      contractAddress,
      private: true,
    });
    expect(
      (generateRenegotiationOfferHash.mock.calls[0]?.[0] as { renegotiationInput: object })
        .renegotiationInput,
    ).not.toHaveProperty('private');
  });

  it('leaves private out of the signed struct', async () => {
    const { gondi, signRenegotiationOffer } = gondiWithMocks();
    await gondi.makeRefinanceOffer({
      renegotiation: RENEGOTIATION,
      contractAddress,
      private: true,
    });
    expect(
      (signRenegotiationOffer.mock.calls[0]?.[0] as { structToSign: object }).structToSign,
    ).not.toHaveProperty('private');
  });

  it("signs a private offer's fallback for the borrower", async () => {
    const { gondi, signOffer } = gondiWithMocks();
    await gondi.makeRefinanceOffer({
      renegotiation: RENEGOTIATION,
      contractAddress,
      private: true,
      withFallbackOffer: true,
      principalAddress: zeroAddress,
      nftId: 1,
      borrowerAddress: borrower,
    });
    expect(
      (signOffer.mock.calls[0]?.[0] as { structToSign: { borrower: string } }).structToSign
        .borrower,
    ).toBe(borrower);
  });

  it("signs a public offer's fallback for anyone", async () => {
    const { gondi, saveRefinanceOffer } = gondiWithMocks();
    await gondi.makeRefinanceOffer({
      renegotiation: RENEGOTIATION,
      contractAddress,
      withFallbackOffer: true,
      principalAddress: zeroAddress,
      nftId: 1,
    });
    expect(saveRefinanceOffer.mock.calls[0]?.[1]).toMatchObject({ borrowerAddress: zeroAddress });
  });

  it('refuses a private offer with a fallback but no borrower before signing', async () => {
    const { gondi, signRenegotiationOffer } = gondiWithMocks();
    await expect(
      gondi.makeRefinanceOffer({
        renegotiation: RENEGOTIATION,
        contractAddress,
        private: true,
        withFallbackOffer: true,
        principalAddress: zeroAddress,
        nftId: 1,
      }),
    ).rejects.toThrow('A private offer with withFallbackOffer needs the borrowerAddress');
    expect(signRenegotiationOffer).not.toHaveBeenCalled();
  });
});
