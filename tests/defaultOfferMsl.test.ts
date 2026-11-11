import { describe, expect, it, mock } from 'bun:test';
import { Address, zeroAddress } from 'viem';
import { hyperliquid, mainnet } from 'viem/chains';

import { getContracts } from '../src/deploys';
import { SINGLE_NFT_OFFER_HASH, stubGondi } from './utils/gondiStub';

const TERMS = {
  principalAmount: 100n,
  aprBps: 2400n,
  duration: 2592000n,
  expirationTime: 9000000000n,
  fee: 0n,
  capacity: 0n,
  principalAddress: zeroAddress,
  maxSeniorRepayment: 0n,
};

const COLLECTION_OFFER_HASH = {
  offer: {
    ...SINGLE_NFT_OFFER_HASH.offer,
    collateralAddress: '0x0000000000000000000000000000000000000003',
  },
};

/** A `Gondi` on `chain` whose `Msl` stub records the address every offer signs for. */
const gondiOn = (chain: { id: number }) => {
  const Msl = mock((address: Address) => ({ address, signOffer: async () => '0x1234' }));
  const gondi = stubGondi({
    pendingSingleNftPublications: new Map(),
    pendingCollectionPublications: new Map(),
    wallet: { chain, account: { address: zeroAddress } },
    account: { address: zeroAddress },
    contracts: { Msl },
    apiClient: {
      generateSingleNftOfferHash: async () => SINGLE_NFT_OFFER_HASH,
      saveSingleNftOffer: async (offer: unknown) => offer,
      generateCollectionOfferHash: async () => COLLECTION_OFFER_HASH,
      saveCollectionOffer: async (offer: unknown) => offer,
      generateTraitOfferHash: async () => COLLECTION_OFFER_HASH,
      saveTraitOffer: async (offer: unknown) => offer,
    },
  });
  return { gondi, Msl };
};

const { MultiSourceLoan } = getContracts(mainnet);

describe('the contract an offer signs for by default', () => {
  it('signs a lenderRefinanceDisabled offer for v3.2, the only version that signs the flag', async () => {
    const { gondi } = gondiOn(mainnet);

    const single = await gondi.makeSingleNftOffer({
      ...TERMS,
      nftId: 6,
      lenderRefinanceDisabled: true,
    });
    const collection = await gondi.makeCollectionOffer({
      ...TERMS,
      collectionId: 1,
      lenderRefinanceDisabled: true,
    });
    const trait = await gondi.makeTraitOffer({
      ...TERMS,
      traitIds: [1],
      lenderRefinanceDisabled: true,
    });

    for (const saved of [single, collection, trait]) {
      expect(saved).toMatchObject({
        contractAddress: MultiSourceLoan['3.2'],
        lenderRefinanceDisabled: true,
      });
    }
    expect(gondi.offerContractAddress({ lenderRefinanceDisabled: true })).toBe(
      MultiSourceLoan['3.2'],
    );
  });

  it('keeps an ordinary offer on v3.1', async () => {
    const { gondi } = gondiOn(mainnet);

    const saved = await gondi.makeSingleNftOffer({ ...TERMS, nftId: 6 });

    expect(saved).toMatchObject({ contractAddress: MultiSourceLoan['3.1'] });
  });

  it('refuses a lenderRefinanceDisabled offer on a chain without v3.2 before anything is signed', async () => {
    const { gondi, Msl } = gondiOn(hyperliquid);

    await expect(
      gondi.makeCollectionOffer({ ...TERMS, collectionId: 1, lenderRefinanceDisabled: true }),
    ).rejects.toThrow('lenderRefinanceDisabled offers need MultiSourceLoan v3.2');
    expect(Msl).not.toHaveBeenCalled();
  });
});
