import { setAllowances, testCollectionOfferInput, users } from './common';

async function main() {
  await setAllowances();
  // Remember to set the env collection address to wpunks
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
          collectionContractAddress: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
          tokenId: 503n, // change this for listed in cryptopunks
          price: 78000000000000000000n,
          orderSource: 'cryptopunks.app',
        },
      },
    ],
  });

  await waitTxInBlock();

  console.log('BNPL executed');
}

main();
