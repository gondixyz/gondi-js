import { testCollectionId, users } from "./common";

const main = async () => {
  const loans = await users[0].loans({
    borrowerAddress: users[0].wallet.account.address,
    collections: [testCollectionId],
  });
  console.log(loans);
};

main();
