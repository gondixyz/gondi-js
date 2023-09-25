import {
  testCollectionOfferInput,
  testSingleNftOfferInput,
  testTokenId,
  users,
} from "./common";

async function main() {
  const signedOffer = await users[0].makeSingleNftOffer({
    ...testSingleNftOfferInput,
    duration: 3n,
  });
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
  let { loan } = await emitLoan.waitTxInBlock();
  console.log("loan emitted");

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const renegotiationOffer = await users[2].makeRefinanceOffer(
    {
      loanId: loan.id,
      feeAmount: 0n,
      aprBps: signedOffer.aprBps / 2n,
      duration: 0n,
      expirationTime: signedOffer.expirationTime,
      principalAmount: signedOffer.principalAmount / 2n,
      strictImprovement: true,
      requiresLiquidation: false,
      targetPrincipal: loan.source.map((source) => source.principalAmount / 2n),
    },
    true
  );
  console.log("refinance offer placed successfully");

  const refinanceFullLoan = await users[2].refinancePartialLoan(
    renegotiationOffer,
    loan
  );
  loan = (await refinanceFullLoan.waitTxInBlock()).loan;
  console.log("loan refinanced partially");

  await new Promise((resolve) => setTimeout(resolve, 6000));

  // We need to push a new block into the blockchain
  const collectionOfferToCancel = await users[0].makeCollectionOffer(
    testCollectionOfferInput
  );
  await users[0].cancelOffer(collectionOfferToCancel);
  console.log("loan defaulted");

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const liquidatedLoan = await users[0].liquidateLoan({
    ...loan,
    loanId: BigInt(loan.id.split(".").at(-1) ?? "0"),
  });

  await liquidatedLoan.waitTxInBlock();
  console.log("loan liquidated");
}

main();
