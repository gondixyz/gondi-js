import { Gondi, OfferStatus } from 'gondi';

import {
  setAllowances,
  sleep,
  testCollectionOfferInput,
  testSingleNftOfferInput,
  wallets,
} from './common';

const users = wallets.map((wallet) =>
  Gondi.create({ wallet, onStepChange: async (step) => console.log(step) }),
);

async function main() {
  await setAllowances();
  const offers = [
    await users[0].makeCollectionOffer(testCollectionOfferInput),
    await users[0].makeSingleNftOffer(testSingleNftOfferInput),
  ];
  // console.log('offers placed successfully');
  for (const offer of offers) {
    await users[0].hideOffer({
      id: offer.offerId,
      contractAddress: offer.contractAddress,
    });
  }
  await sleep(10000);
  const { offers: listedOffers } = await users[1].offers({
    filterBy: { status: [OfferStatus.Active] },
  });
  // console.log(listedOffers);
  for (const offer of offers) {
    const { waitTxInBlock } = await users[0].cancelOffer({
      id: offer.offerId,
      contractAddress: offer.contractAddress,
    });
    await waitTxInBlock();
  }
}

main();
