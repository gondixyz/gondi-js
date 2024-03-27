import * as dotenv from 'dotenv';
import { Gondi, LoanStatusType, OfferStatus } from 'gondi';

import { approveNFT, approveToken, sleep, testCurrency, users } from './common';

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

type Collection = Awaited<ReturnType<Gondi['collections']>>['collections'][number];

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
          maxSeniorRepayment: 0n,
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
      await users[1].emitLoan({
        offerExecution: users[1].offerExecutionFromOffers([offer]),
        duration: offer.duration,
        tokenId: nft.tokenId,
      });
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
    const remainingTime = loan.startTime + loan.duration - BigInt(new Date().getTime()) / 1_000n;
    const isTimeToRepay = remainingTime < 1 - LOAN_EFFECTIVE_DURATION;
    if (isTimeToRepay && isAcceptableRepayment) {
      console.log('repaying loan ', loan.id);
      await gondi.repayLoan({ loan, loanId: BigInt(loan.loanId) });
    }
  }
}
