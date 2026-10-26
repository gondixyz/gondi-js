import { describe, expect, it, mock } from 'bun:test';
import { zeroAddress, zeroHash } from 'viem';
import { getContracts } from '../src/deploys';
import {
  gondiWith,
  RENEGOTIATION,
  RENEGOTIATION_OFFER_HASH,
  SINGLE_NFT_OFFER_HASH,
} from './utils/gondiStub';

const SINGLE_NFT_OFFER = {
  nftId: 6,
  principalAmount: 100n,
  aprBps: 2400n,
  duration: 2592000n,
  expirationTime: 9000000000n,
  fee: 0n,
  capacity: 0n,
  principalAddress: zeroAddress,
  maxSeniorRepayment: 0n,
};

/** A `Gondi` that previews, hashes and saves single-NFT offers successfully. */
const singleNftGondi = () => {
  const signOffer = mock(async () => '0x1234');
  const saveSingleNftOffer = mock(async (..._arguments: unknown[]) => ({ id: 'saved' }));
  const gondi = gondiWith({
    contracts: { Msl: () => ({ address: zeroAddress, signOffer }) },
    apiClient: {
      generateSingleNftOfferHash: async () => SINGLE_NFT_OFFER_HASH,
      previewSingleNftPublication: async () => ({ complete: true, qualifies: true }),
      saveSingleNftOffer,
    },
  });
  return { gondi, signOffer, saveSingleNftOffer };
};

describe('loan offer publication metadata', () => {
  it('forwards publication to saving, not into the signed struct', async () => {
    const { gondi, signOffer, saveSingleNftOffer } = singleNftGondi();
    const publication = { replacementIds: ['previous'] };
    await gondi._makeSingleNftOffer(SINGLE_NFT_OFFER, zeroAddress, false, publication);
    expect(saveSingleNftOffer.mock.calls[0]?.[1]).toEqual(publication);
    expect(signOffer.mock.calls[0]?.[0].structToSign).not.toHaveProperty('publication');
  });

  it('signs again after a successful save', async () => {
    const { gondi, signOffer, saveSingleNftOffer } = singleNftGondi();
    const publication = { replacementIds: ['previous'] };
    await gondi._makeSingleNftOffer(SINGLE_NFT_OFFER, zeroAddress, false, publication);
    await gondi._makeSingleNftOffer(SINGLE_NFT_OFFER, zeroAddress, false, publication);
    expect(signOffer).toHaveBeenCalledTimes(2);
    expect(saveSingleNftOffer.mock.calls[1]?.[0]).not.toBe(saveSingleNftOffer.mock.calls[0]?.[0]);
  });

  it('does not ask for a signature when the pre-sign preview rejects the quote', async () => {
    const signOffer = mock(async () => '0x1234');
    const gondi = gondiWith({
      contracts: { Msl: () => ({ address: zeroAddress, signOffer }) },
      apiClient: {
        previewSingleNftPublication: async () => {
          throw new Error('INSUFFICIENT_IMPROVEMENT');
        },
      },
    });
    await expect(
      gondi._makeSingleNftOffer(SINGLE_NFT_OFFER, zeroAddress, false, { replacementIds: [] }),
    ).rejects.toThrow('INSUFFICIENT_IMPROVEMENT');
    expect(signOffer).not.toHaveBeenCalled();
  });

  it('reuses both signed payloads when retrying a failed full replacement save', async () => {
    const contractAddress = getContracts({ id: 1 }).MultiSourceLoan['3'];
    const signOffer = mock(async () => '0x1234');
    const signRenegotiationOffer = mock(async () => '0x5678');
    const saveRefinanceOffer = mock(async (..._arguments: unknown[]) => ({ id: 'saved' }));
    const gondi = gondiWith({
      contracts: { Msl: () => ({ address: contractAddress, signOffer, signRenegotiationOffer }) },
      apiClient: {
        previewRenegotiationPublication: async () => ({ complete: true, qualifies: true }),
        generateRenegotiationOfferHash: async () => RENEGOTIATION_OFFER_HASH,
        generateSingleNftOfferHash: async () => SINGLE_NFT_OFFER_HASH,
        saveRefinanceOffer,
      },
    });
    const input = {
      renegotiation: {
        ...RENEGOTIATION,
        lenderAddress: zeroAddress,
        trancheIndex: [0n],
        targetPrincipal: [],
      },
      contractAddress,
      withFallbackOffer: true,
      nftId: 6,
      principalAddress: zeroAddress,
      publication: { replacementIds: ['old'] },
    };
    saveRefinanceOffer.mockImplementationOnce(async () => {
      throw new Error('save failed');
    });
    await expect(gondi.makeRefinanceOffer(input)).rejects.toThrow('save failed');
    await gondi.makeRefinanceOffer(input);
    expect(signRenegotiationOffer).toHaveBeenCalledTimes(1);
    expect(signOffer).toHaveBeenCalledTimes(1);
    expect(saveRefinanceOffer.mock.calls[1]?.[0]).toBe(saveRefinanceOffer.mock.calls[0]?.[0]);
    expect(saveRefinanceOffer.mock.calls[1]?.[1]).toBe(saveRefinanceOffer.mock.calls[0]?.[1]);
    expect(saveRefinanceOffer.mock.calls[1]?.[2]).toEqual(input.publication);
    await gondi.makeRefinanceOffer(input);
    expect(signRenegotiationOffer).toHaveBeenCalledTimes(2);
    expect(signOffer).toHaveBeenCalledTimes(2);
  });

  it('retains a collection signature only until its failed save succeeds', async () => {
    const signOffer = mock(async () => '0x1234');
    const saveCollectionOffer = mock(async (..._arguments: unknown[]) => ({ id: 'saved' }));
    const gondi = gondiWith({
      contracts: { Msl: () => ({ address: zeroAddress, signOffer }) },
      apiClient: {
        generateCollectionOfferHash: async () => ({
          offer: {
            offerHash: zeroHash,
            offerId: 1n,
            validators: [],
            fee: 0n,
            collateralAddress: zeroAddress,
          },
        }),
        saveCollectionOffer,
      },
    });
    const { nftId: _nftId, ...offerTerms } = SINGLE_NFT_OFFER;
    const offer = { ...offerTerms, collectionId: 6 };
    const publication = { replacementIds: [] };
    saveCollectionOffer.mockImplementationOnce(async () => {
      throw new Error('save failed');
    });
    await expect(gondi._makeCollectionOffer(offer, zeroAddress, publication)).rejects.toThrow(
      'save failed',
    );
    await gondi._makeCollectionOffer(offer, zeroAddress, publication);
    expect(saveCollectionOffer.mock.calls[1]?.[0]).toBe(saveCollectionOffer.mock.calls[0]?.[0]);
    await gondi._makeCollectionOffer(offer, zeroAddress, publication);
    expect(signOffer).toHaveBeenCalledTimes(2);
  });

  it('signs a fresh replacement after a successful save without a fallback', async () => {
    const contractAddress = getContracts({ id: 1 }).MultiSourceLoan['3'];
    const signRenegotiationOffer = mock(async () => '0x5678');
    const gondi = gondiWith({
      contracts: { Msl: () => ({ address: contractAddress, signRenegotiationOffer }) },
      apiClient: {
        previewRenegotiationPublication: async () => ({ complete: true, qualifies: true }),
        generateRenegotiationOfferHash: async () => RENEGOTIATION_OFFER_HASH,
        saveRefinanceOffer: async () => ({ id: 'saved' }),
      },
    });
    const input = {
      renegotiation: RENEGOTIATION,
      contractAddress,
      publication: { replacementIds: [] },
    };
    await gondi.makeRefinanceOffer(input);
    await gondi.makeRefinanceOffer(input);
    expect(signRenegotiationOffer).toHaveBeenCalledTimes(2);
  });
});
