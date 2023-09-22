import { OfferStatus } from "gondi";

import {
  sleep,
  testCollectionOfferInput,
  testSingleNftOfferInput,
  users,
} from "./common";

async function main() {
  const offers = [
    await users[0].makeCollectionOffer(testCollectionOfferInput),
    await users[0].makeSingleNftOffer(testSingleNftOfferInput),
  ];
  console.log("offers placed successfully");
  for (const offer of offers) {
    await users[0].hideOffer(offer);
  }
  await sleep(10000);
  const { offers: listedOffers } = await users[1].offers({
    filterBy: { status: [OfferStatus.Active] },
  });
  console.log(listedOffers);
  for (const offer of offers) {
    const { waitTxInBlock } = await users[0].cancelOffer({
      id: offer.offerId,
      contractAddress: offer.contractAddress,
    });
    await waitTxInBlock();
  }
}

main();
