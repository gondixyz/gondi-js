import { describe, expect, it, mock } from 'bun:test';
import { zeroAddress, zeroHash } from 'viem';
import { getContracts } from '../src/deploys';

mock.module('@/clients/api/client', () => ({ apolloClient: () => ({}) }));
const { Gondi } = await import('../src/gondi');

describe('loan offer publication metadata', () => {
  it('forwards metadata to saving without adding it to the signed offer', async () => {
    const signOffer = mock(async () => '0x1234');
    const saveSingleNftOffer = mock(async () => ({ id: 'saved' }));
    const gondi = Object.create(Gondi.prototype);
    Object.assign(gondi, {
      pendingSingleNftPublications: new Map(),
      pendingCollectionPublications: new Map(),
      pendingRenegotiationPublications: new Map(),
      wallet: { account: { address: zeroAddress } },
      account: { address: zeroAddress },
      contracts: { Msl: () => ({ address: zeroAddress, signOffer }) },
      apiClient: {
        generateSingleNftOfferHash: async () => ({
          offer: {
            offerHash: zeroHash,
            offerId: 1n,
            validators: [],
            fee: 0n,
            collateralAddress: zeroAddress,
            nft: { tokenId: 6n },
          },
        }),
        previewSingleNftPublication: async () => ({ complete: true, qualifies: true }),
        saveSingleNftOffer,
      },
    });
    const publication = { replacementIds: ['previous'] };
    await gondi._makeSingleNftOffer(
      {
        nftId: 6,
        principalAmount: 100n,
        aprBps: 2400n,
        duration: 2592000n,
        expirationTime: 9000000000n,
        fee: 0n,
        capacity: 0n,
        principalAddress: zeroAddress,
        maxSeniorRepayment: 0n,
      },
      zeroAddress,
      false,
      publication,
    );
    expect(saveSingleNftOffer.mock.calls[0]?.[1]).toEqual(publication);
    expect(signOffer.mock.calls[0]?.[0].structToSign).not.toHaveProperty('publication');
    const signed = saveSingleNftOffer.mock.calls[0]?.[0];
    await gondi._makeSingleNftOffer(
      {
        nftId: 6,
        principalAmount: 100n,
        aprBps: 2400n,
        duration: 2592000n,
        expirationTime: 9000000000n,
        fee: 0n,
        capacity: 0n,
        principalAddress: zeroAddress,
        maxSeniorRepayment: 0n,
      },
      zeroAddress,
      false,
      publication,
    );
    expect(signOffer).toHaveBeenCalledTimes(2);
    expect(saveSingleNftOffer.mock.calls[1]?.[0]).not.toBe(signed);
  });
});

it('does not ask for a signature when the pre-sign preview rejects the quote', async () => {
  const signOffer = mock(async () => '0x1234');
  const gondi = Object.create(Gondi.prototype);
  Object.assign(gondi, {
    pendingSingleNftPublications: new Map(),
    pendingCollectionPublications: new Map(),
    pendingRenegotiationPublications: new Map(),
    account: { address: zeroAddress },
    contracts: { Msl: () => ({ address: zeroAddress, signOffer }) },
    apiClient: {
      previewSingleNftPublication: async () => {
        throw new Error('INSUFFICIENT_IMPROVEMENT');
      },
    },
  });
  await expect(
    gondi._makeSingleNftOffer(
      {
        nftId: 6,
        principalAmount: 100n,
        aprBps: 2400n,
        duration: 2592000n,
        expirationTime: 9000000000n,
        fee: 0n,
        capacity: 0n,
        principalAddress: zeroAddress,
        maxSeniorRepayment: 0n,
      },
      zeroAddress,
      false,
      { replacementIds: [] },
    ),
  ).rejects.toThrow('INSUFFICIENT_IMPROVEMENT');
  expect(signOffer).not.toHaveBeenCalled();
});

it('reuses both signed payloads when retrying a failed full replacement save', async () => {
  const contractAddress = getContracts({ id: 1 }).MultiSourceLoan['3'];
  const signOffer = mock(async () => '0x1234');
  const signRenegotiationOffer = mock(async () => '0x5678');
  const saveRefinanceOffer = mock(async (..._args: unknown[]) => ({ id: 'saved' }));
  const gondi = Object.create(Gondi.prototype);
  Object.assign(gondi, {
    pendingSingleNftPublications: new Map(),
    pendingCollectionPublications: new Map(),
    pendingRenegotiationPublications: new Map(),
    wallet: { chain: { id: 1 }, account: { address: zeroAddress } },
    account: { address: zeroAddress },
    contracts: { Msl: () => ({ address: contractAddress, signOffer, signRenegotiationOffer }) },
    apiClient: {
      previewRenegotiationPublication: async () => ({ complete: true, qualifies: true }),
      generateRenegotiationOfferHash: async () => ({
        offer: { renegotiationId: 2n, offerHash: zeroHash, loanId: 1n },
      }),
      generateSingleNftOfferHash: async () => ({
        offer: {
          offerHash: zeroHash,
          offerId: 1n,
          validators: [],
          fee: 0n,
          collateralAddress: zeroAddress,
          nft: { tokenId: 6n },
        },
      }),
      saveRefinanceOffer,
    },
  });
  const input = {
    renegotiation: {
      loanId: 'loan',
      lenderAddress: zeroAddress,
      principalAmount: 100n,
      feeAmount: 0n,
      aprBps: 2400n,
      duration: 2592000n,
      expirationTime: 9000000000n,
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
  const gondi = Object.create(Gondi.prototype);
  Object.assign(gondi, {
    pendingSingleNftPublications: new Map(),
    pendingCollectionPublications: new Map(),
    pendingRenegotiationPublications: new Map(),
    account: { address: zeroAddress },
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
  const offer = {
    collectionId: 6,
    principalAmount: 100n,
    aprBps: 2400n,
    duration: 2592000n,
    expirationTime: 9000000000n,
    fee: 0n,
    capacity: 0n,
    principalAddress: zeroAddress,
    maxSeniorRepayment: 0n,
  };
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
  const gondi = Object.create(Gondi.prototype);
  Object.assign(gondi, {
    pendingSingleNftPublications: new Map(),
    pendingCollectionPublications: new Map(),
    pendingRenegotiationPublications: new Map(),
    wallet: { chain: { id: 1 } },
    account: { address: zeroAddress },
    contracts: { Msl: () => ({ address: contractAddress, signRenegotiationOffer }) },
    apiClient: {
      previewRenegotiationPublication: async () => ({ complete: true, qualifies: true }),
      generateRenegotiationOfferHash: async () => ({
        offer: { renegotiationId: 2n, offerHash: zeroHash, loanId: 1n },
      }),
      saveRefinanceOffer: async () => ({ id: 'saved' }),
    },
  });
  const input = {
    renegotiation: {
      loanId: 'loan',
      principalAmount: 100n,
      feeAmount: 0n,
      aprBps: 2400n,
      duration: 2592000n,
      expirationTime: 9000000000n,
    },
    contractAddress,
    publication: { replacementIds: [] },
  };
  await gondi.makeRefinanceOffer(input);
  await gondi.makeRefinanceOffer(input);
  expect(signRenegotiationOffer).toHaveBeenCalledTimes(2);
});
