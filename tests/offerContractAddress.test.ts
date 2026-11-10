import { describe, expect, it, mock } from 'bun:test';
import type { Address } from 'viem';
import { zeroAddress } from 'viem';
import { hyperliquid, mainnet, robinhood } from 'viem/chains';
import { getContracts } from '../src/deploys';
import { gondiWith, SINGLE_NFT_OFFER_HASH } from './utils/gondiStub';

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

describe('offerContractAddress', () => {
  it.each([mainnet, hyperliquid, robinhood])(
    'is the MultiSourceLoan 3.1 that makeSingleNftOffer signs for on $name',
    async (chain) => {
      const signedFor: Address[] = [];
      const gondi = gondiWith({
        contracts: {
          Msl: (address: Address) => {
            signedFor.push(address);
            return { address, signOffer: async () => '0x1234' };
          },
        },
        apiClient: {
          generateSingleNftOfferHash: async () => SINGLE_NFT_OFFER_HASH,
          saveSingleNftOffer: mock(async () => ({ id: 'saved' })),
        },
      });
      Object.assign(gondi, { wallet: { chain, account: { address: zeroAddress } } });

      await gondi.makeSingleNftOffer(SINGLE_NFT_OFFER);

      expect(gondi.offerContractAddress()).toBe(getContracts(chain).MultiSourceLoan['3.1']);
      expect(signedFor).toEqual([gondi.offerContractAddress()]);
    },
  );
});
