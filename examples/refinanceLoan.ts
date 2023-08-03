import { testSingleNftOfferInput, testTokenId, users } from "./common";

async function main() {
  const signedOffer = await users[0].makeSingleNftOffer(
    testSingleNftOfferInput
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

  const emitLoan = await users[1].emitLoan(signedOffer, testTokenId);
  const { loan } = await emitLoan.waitTxInBlock();
  console.log("loan emitted");

  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const renegotiationOffer = await users[0].makeRefinanceOffer({
      loanId: loan.source[0].loanId.toString(),
      feeAmount: 0n,
      aprBps: signedOffer.aprBps,
      duration: signedOffer.duration,
      expirationTime: signedOffer.expirationTime,
      principalAmount: signedOffer.principalAmount,
      strictImprovement: false,
      requiresLiquidation: signedOffer.requiresLiquidation,
      targetPrincipal: [0n],
    });
    console.log("refinance offer placed successfully");

    const refinanceFullLoan = await users[1].refinanceFullLoan(
      renegotiationOffer,
      loan
    );
    await refinanceFullLoan.waitTxInBlock();
    console.log("loan refinanced");
  } finally {
    const repayLoan = await users[1].repayLoan(loan);
    await repayLoan.waitTxInBlock();
    console.log("loan repaid");
  }
}

main();
