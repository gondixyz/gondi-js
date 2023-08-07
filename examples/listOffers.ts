import { testCollectionOfferInput, users } from "./common";
import { OfferStatus } from "gondi";

async function main() {
  await users[0].makeCollectionOffer(testCollectionOfferInput);
  console.log("offer placed successfully");

  const { offers } = await users[0].offers({
    filterBy: { status: [OfferStatus.Active] },
  });
  console.log("offers placed");
  console.log(offers);
}

main();
