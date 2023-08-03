import { testTokenId, users, testCollectionOfferInput } from './common';

async function main() {
  const signedOffer = await users[0].makeCollectionOffer(testCollectionOfferInput);
  console.log('offer placed successfully');


  const emitLoan = await users[1].emitLoan(
    { ...signedOffer, nftId: Number(signedOffer.nftCollateralTokenId.valueOf()) },
    testTokenId
  );
  const { loan } = await emitLoan.waitTxInBlock();
  console.log('loan emitted');

  const repayLoan = await users[1].repayLoan(loan);
  await repayLoan.waitTxInBlock();
  console.log('loan repaid');
}

main();
