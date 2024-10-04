import { users } from './common';

async function main() {
  const user = users[0];
  console.log('offer placed successfully');

  const { ownedNfts } = await user.ownedNfts({});
  if (ownedNfts.length == 0) throw new Error('');
  const nft = ownedNfts[0];
  user.wrapOldERC721(nft);
}

main();
