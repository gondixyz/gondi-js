import * as dotenv from 'dotenv';
import { Gondi, LoanStatusType, OfferStatus } from 'gondi';

import { approveNFT, approveToken, sleep, testCurrency, users, wallets } from './common';

dotenv.config();

export const TICK = 600;
export const LOAN_DURATIONS = [
  60n * 60n * 3n,
  60n * 60n * 24n,
  60n * 60n * 24n * 7n,
  60n * 60n * 24n * 30n,
  60n * 60n * 24n * 365n,
];
export const RISK_MARGIN = 10_00n;
export const NUMBER_OF_LOANS_PER_OFFER = 10n;
export const LOAN_EFFECTIVE_DURATION = 0.99;
export const APR_BASE = 10_00n;
export const APR_PREMIUM = 1_00n;
const principalMargin = 1 - Number(RISK_MARGIN + APR_BASE) / 10000;

export const main = async () => {
  while (true) {
    for (const user of users) {
      const collections = (await user.collections({ statsCurrency: testCurrency })).collections;
      console.log('making offers');
      await makeOffers(user, collections);
      await lend(user, collections);
      await repay(user, collections);
    }
    console.log(`waiting ${TICK} seconds`);
    await sleep(TICK * 1000);
  }
};

await main();

interface Collection {
  __typename?: 'Collection' | undefined;
  id: string;
  name?: string | null | undefined;
  slug?: string | null | undefined;
  description?: string | null | undefined;
  discordUrl?: string | null | undefined;
  twitterUsername?: string | null | undefined;
  externalUrl?: string | null | undefined;
  collectionUrl?: string | null | undefined;
  verified: boolean;
  royalties: {
    __typename?: 'Royalty' | undefined;
    percentage: number;
    beneficiary: string;
  }[];
  image?:
    | {
        __typename?: 'Asset' | undefined;
        cacheUrl?: string | null | undefined;
      }
    | null
    | undefined;
  bannerImage?:
    | {
        __typename?: 'Asset' | undefined;
        cacheUrl?: string | null | undefined;
      }
    | null
    | undefined;
  contractData?:
    | {
        __typename?: 'ContractData' | undefined;
        blockchain: string;
        contractAddress: `0x${string}`;
        createdDate: Date;
        creatorAddress?: `0x${string}` | null | undefined;
      }
    | null
    | undefined;
  statistics: {
    __typename?: 'CollectionStatistics' | undefined;
    floorPrice7d?: number | null | undefined;
    floorPrice30d?: number | null | undefined;
    totalVolume?: number | null | undefined;
    totalVolume1y?: number | null | undefined;
    totalVolume3m?: number | null | undefined;
    totalVolume1m?: number | null | undefined;
    totalVolume1w?: number | null | undefined;
    totalLoanVolume: bigint;
    totalLoanVolume1w: bigint;
    totalLoanVolume1m: bigint;
    totalLoanVolume3m: bigint;
    totalLoanVolume1y: bigint;
    numberOfPricedNfts: number;
    nftsCount?: number | null | undefined;
    percentageInOutstandingLoans: number;
    repaymentRate: number;
    numberOfOffers: number;
    floorPrice?:
      | {
          __typename?: 'CurrencyAmount' | undefined;
          amount: number;
          currency: {
            __typename?: 'Currency' | undefined;
            address: `0x${string}`;
            decimals: number;
          };
        }
      | null
      | undefined;
    bestOffer?:
      | {
          __typename?: 'CurrencyAmount' | undefined;
          amount: number;
          currency: {
            __typename?: 'Currency' | undefined;
            address: `0x${string}`;
            decimals: number;
          };
        }
      | null
      | undefined;
  };
}

async function makeOffers(gondi: Gondi, collections: Collection[]) {
  for (const collection of collections) {
    if (collection.statistics.floorPrice) {
      const rand_apr = BigInt(Math.floor(Math.random() * 5_00));
      for (const duration of LOAN_DURATIONS) {
        const floor = collection.statistics.floorPrice;
        const principalAmount = BigInt(
          principalMargin * floor.amount * 10 ** floor.currency.decimals,
        );
        const apr =
          APR_BASE + APR_PREMIUM * BigInt(Math.round(Math.log2(Number(duration)))) + rand_apr;
        await gondi.makeCollectionOffer({
          aprBps: apr,
          capacity: NUMBER_OF_LOANS_PER_OFFER * principalAmount,
          collectionId: Number(collection.id),
          duration: duration,
          expirationTime: BigInt(Math.floor(new Date().getTime() / 1000)) + BigInt(TICK),
          fee: BigInt(Math.floor((Number(principalAmount) * Math.random()) / 1_00)),
          principalAddress: testCurrency,
          principalAmount: principalAmount,
        });
      }
    }
  }
}

async function lend(gondi: Gondi, collections: Collection[]) {
  const nfts = (await gondi.ownedNfts()).ownedNfts;
  if (nfts.length == 0) {
    return;
  }
  const desiredDuration = LOAN_DURATIONS[Math.floor(LOAN_DURATIONS.length * Math.random())];
  const nft = nfts[Math.floor(Math.random() * nfts.length)];
  const { offers } = await gondi.offers({
    filterBy: { nft: Number(nft.id), status: [OfferStatus.Active] },
  });
  for (const offer of offers) {
    const collection = collections.find((collection) => collection.id == nft.collection?.id);
    const floor = collection?.statistics.floorPrice ?? {
      amount: Number.POSITIVE_INFINITY,
      currency: { decimals: 1 },
    };
    const desiredPrincipal = BigInt(
      floor.amount * 10 ** floor.currency.decimals * principalMargin ** 2,
    );
    if (offer.principalAmount > desiredPrincipal && offer.duration == desiredDuration) {
      console.log('emitting loan ', nft.collection?.id, nft.tokenId);
      await approveNFT(gondi, offer.contractAddress, offer.nftCollateralAddress);
      await approveToken(gondi, offer.contractAddress);
      await gondi.emitLoan({ offer, tokenId: nft.tokenId, amount: offer.principalAmount });
      break;
    }
  }
}
async function repay(gondi: Gondi, collections: Collection[]) {
  const { loans } = await gondi.loans({
    borrowerAddress: gondi.wallet.account.address,
    statuses: [LoanStatusType.LoanInitiated],
  });
  for (const loan of loans) {
    const repayment = (loan.principalAmount * BigInt(1_00_00 + loan.blendedAprBps)) / 1_00_00n;
    const collection = collections.find((collection) => loan.nft.collection?.id == collection.id);
    const floor = collection?.statistics.floorPrice ?? { amount: 0, currency: { decimals: 1 } };
    const acceptableRepayment = BigInt(floor.amount * 10 ** floor.currency.decimals);
    const isAcceptableRepayment = repayment < acceptableRepayment;
    const remainingTime =
      (BigInt(Math.floor(loan.startTime.getTime() - new Date().getTime())) / 1_000n +
        loan.duration) /
      loan.duration;
    const isTimeToRepay = remainingTime < 1 - LOAN_EFFECTIVE_DURATION;
    if (isTimeToRepay && isAcceptableRepayment) {
      console.log('repaying loan ', loan.id);
      await gondi.repayLoan({ loan, loanId: loan.loanId });
    }
  }
}
