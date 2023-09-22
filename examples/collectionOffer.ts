import { testCollectionOfferInput, testTokenId, users } from "./common";

async function main() {
  const signedOffer = await users[0].makeCollectionOffer(
    testCollectionOfferInput
  );
  console.log("offer placed successfully");

  const emitLoan = await users[1].emitLoan({
    offer: {
      ...signedOffer,
      nftId: Number(signedOffer.nftCollateralTokenId.valueOf()),
    },
    tokenId: testTokenId,
  });
  const { loan } = await emitLoan.waitTxInBlock();
  console.log("loan emitted");

  const repayLoan = await users[1].repayLoan({ loan });
  await repayLoan.waitTxInBlock();
  console.log("loan repaid");
}

main();
