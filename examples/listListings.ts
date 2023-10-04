import { testNftId, users } from "./common";

const logListings = async () => {
  const { listings } = await users[0].listings({});
  console.log(listings);
};

async function main() {
  await users[1].list({ nft: testNftId });
  console.log('listed succesfully');
  await logListings();

  await users[1].unlist({ nft: testNftId });
  console.log('unlisted succesfully');
  await logListings();
}

main();
