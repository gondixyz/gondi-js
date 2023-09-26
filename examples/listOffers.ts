import { OffersSortField, OfferStatus, Ordering } from "gondi";

import {
  testCollectionOfferInput,
  testSingleNftOfferInput,
  users,
} from "./common";

async function main() {
  await users[0].makeCollectionOffer(testCollectionOfferInput);
  await users[0].makeSingleNftOffer(testSingleNftOfferInput);
  console.log("offer placed successfully");

  let cursor;
  while (true) {
    const response = await users[0].offers({
      limit: 1,
      cursor,
      sortBy: { field: OffersSortField.CreatedDate, order: Ordering.Asc },
      filterBy: { status: [OfferStatus.Active] },
    });
    if (cursor == response.cursor || response.cursor === null) break;
    cursor = response.cursor;
    console.log(response.offers);
  }
}

main();
