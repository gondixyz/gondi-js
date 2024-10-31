import { setAllowances, test721Collection } from './common';
import { testCollectionOfferInput, users } from './common';

async function main() {
  await setAllowances();
  const signedOffer = await users[1].makeCollectionOffer(testCollectionOfferInput);
  const contractVersionString = `msl: ${signedOffer.contractAddress}`;
  console.log(`offer placed successfully: ${contractVersionString}`);

  const { waitTxInBlock } = await users[0].leverageBuy({
    leverageBuyData: [
      {
        offer: {
          ...signedOffer,
          lender: signedOffer.lenderAddress,
          borrower: signedOffer.borrowerAddress,
          validators: signedOffer.offerValidators,
        },
        expirationTime: signedOffer.expirationTime,
        amount: signedOffer.principalAmount,
        nft: {
          collectionContractAddress: test721Collection.contractAddress,
          tokenId: 7607n, // change this for listed nft in opensea
          price: 78000000000000000000n,
          orderSource: 'opensea.io',
        },
      },
    ],
  });

  await waitTxInBlock();

  console.log('BNPL executed');
}

main();
