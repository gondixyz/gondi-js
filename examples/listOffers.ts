import { testCollectionOfferInput, users } from "./common";

async function main() {
  await users[0].makeCollectionOffer(testCollectionOfferInput);
  console.log("offer placed successfully");

  const { offers } = await users[0].offers({});
  console.log("offers placed");
  for (const offer of offers) {
    console.log(offer);
  }
}

main();
