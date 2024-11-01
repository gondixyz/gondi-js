import { TokenStandardType } from 'gondi';
import { users } from './common';

async function main() {
  const user = users[0];

  const { ownedNfts } = await user.ownedNfts({
    standards: [TokenStandardType.OldErc721],
    includeInStash: true,
  });
  if (ownedNfts.length == 0) throw new Error('Address has no old erc721 to test');
  const nft = ownedNfts[0];
  const { waitMined: waitWrapped } = await user.wrapOldERC721(nft);
  await waitWrapped();
  console.log('wrapped');
  const { waitMined: waitUnwrapped } = await user.unwrapOldERC721(nft);
  await waitUnwrapped();
  console.log('unwrapped');
}

main();
