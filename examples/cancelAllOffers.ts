import { OfferStatus } from 'gondi';

import { sleep, testSingleNftOfferInput, users } from './common';

async function main() {
  const user = users[0];
  const offers = [
    await user.makeSingleNftOffer(testSingleNftOfferInput),
    await user.makeSingleNftOffer(testSingleNftOfferInput),
  ];
  console.log('offers placed successfully');
  const lastOffer = offers[1];
  const { txHash, waitTxInBlock } = await user.cancelAllOffers({
    minId: lastOffer.offerId,
    contractAddress: lastOffer.contractAddress,
  });
  console.log('sent transaction', txHash);
  await waitTxInBlock();
  await sleep(1000);
  const { offers: listedOffers } = await user.offers({
    filterBy: { status: [OfferStatus.Active] },
  });
  console.log(listedOffers);
}

main();
