import { testSingleNftOfferInput, testTokenId, users } from "./common";

async function main() {
  const offerInput = testSingleNftOfferInput;
  const signedOffer = await users[0].makeSingleNftOffer(
    offerInput
  );
  console.log("offer placed successfully");

  for (const user of users) {
    const approveToken = await user.approveToken(signedOffer.principalAddress);
    await approveToken.waitTxInBlock();
    const approveNFT = await user.approveNFTForAll(
      signedOffer.nftCollateralAddress
    );
    await approveNFT.waitTxInBlock();
  }

  const emitLoan = await users[1].emitLoan({
    offer: signedOffer,
    tokenId: testTokenId,
  });
  const { loan } = await emitLoan.waitTxInBlock();
  console.log("loan emitted");

  await new Promise((resolve) => setTimeout(resolve, 5000));

  const repayLoan = await users[1].repayLoan({
    loan: {
      ...loan,
      refinanceProceeds: [],
    },
  });
  await repayLoan.waitTxInBlock();
  console.log("loan repaid");
}

main();
