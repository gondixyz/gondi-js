import { users } from './common';

async function main() {
  const user = users[0];

  const { ownedNfts } = await user.ownedNfts({ standards: 'OLD_ERC721', includeInStash: true });
  if (ownedNfts.length == 0) throw new Error('Address has no old erc721 to test');
  const nft = ownedNfts[0];
  await user.wrapOldERC721(nft);
}

main();
