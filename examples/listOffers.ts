import {
  testCollectionOfferInput,
  testSingleNftOfferInput,
  users,
} from "./common";
import { OfferStatus, OffersSortField, Ordering } from "gondi";

async function main() {
  await users[0].makeCollectionOffer(testCollectionOfferInput);
  await users[0].makeSingleNftOffer(testSingleNftOfferInput);
  console.log("offer placed successfully");

  let cursor;
  while (true) {
    let response = await users[0].offers({
      limit: 1,
      cursor,
      sortBy: { field: OffersSortField.CreatedDate, order: Ordering.Asc },
      filterBy: { status: [OfferStatus.Active] },
    });
    if (cursor == response.cursor) break;
    cursor = response.cursor;
    console.log(response.offers);
  }
}

main();
