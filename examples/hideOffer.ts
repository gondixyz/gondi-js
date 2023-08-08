import {
  testCollectionOfferInput,
  testSingleNftOfferInput,
  users,
} from "./common";
import { OfferStatus } from "gondi";

async function main() {
  const offers = [
    await users[0].makeCollectionOffer(testCollectionOfferInput),
    await users[0].makeSingleNftOffer(testSingleNftOfferInput),
  ];
  console.log("offers placed successfully");
  for (const offer of offers) {
    await users[0].hideOffer(offer);
  }
  new Promise((resolve) => setTimeout(resolve, 10000));
  const { offers: listedOffers } = await users[1].offers({
    filterBy: { status: [OfferStatus.Active] },
  });
  console.log(listedOffers);
  for (const offer of offers) {
    let { waitTxInBlock } = await users[0].cancelOffer(offer);
    await waitTxInBlock();
  }
}

main();
