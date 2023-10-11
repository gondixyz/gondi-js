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

  const emitLoan = await users[1].emitLoan({
    offer: signedOffer,
    tokenId: testTokenId,
  });
  const { loan } = await emitLoan.waitTxInBlock();
  console.log("loan emitted");

  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const refinanceOffer = await users[0].makeRefinanceOffer({
      renegotiation: {
        loanId: loan.id,
        feeAmount: 0n,
        aprBps: signedOffer.aprBps,
        duration: signedOffer.duration,
        expirationTime: signedOffer.expirationTime,
        principalAmount: signedOffer.principalAmount,
        strictImprovement: false,
        requiresLiquidation: signedOffer.requiresLiquidation,
        targetPrincipal: loan.source.map((_) => 0n),
      },
      contractAddress: signedOffer.contractAddress,
    });

    const { waitTxInBlock } = await users[0].cancelRefinanceOffer({
      id: refinanceOffer.renegotiationId,
      contractAddress: signedOffer.contractAddress,
    });
    await waitTxInBlock();
    console.log("renegotiation cancelled");
  } finally {
    const repayLoan = await users[1].repayLoan({ loan });
    await repayLoan.waitTxInBlock();
    console.log("loan repaid");
  }
}

main();
