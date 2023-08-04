import { testCollectionOfferInput, users } from "./common";
import { OfferStatus } from "@gondi/sdk/";

async function main() {
  await users[0].makeCollectionOffer(testCollectionOfferInput);
  console.log("offer placed successfully");

  const { offers } = await users[0].offers({
    filterBy: [{ status: [OfferStatus.Active] }],
  });
  console.log("offers placed");
  for (const offer of offers) {
    console.log(offer);
  }
}

main();
