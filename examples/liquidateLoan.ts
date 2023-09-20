import {
  testCollectionOfferInput,
  testSingleNftOfferInput,
  testTokenId,
  users,
} from "./common";

async function main() {
  const signedOffer = await users[0].makeSingleNftOffer({
    ...testSingleNftOfferInput,
    duration: 1n,
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
  const { loan } = await emitLoan.waitTxInBlock();
  console.log("loan emitted");

  await new Promise((resolve) => setTimeout(resolve, 5000));

  // We need to push a new block into the blockchain
  const collectionOfferToCancel = await users[0].makeCollectionOffer(
    testCollectionOfferInput
  );
  await users[0].cancelOffer(collectionOfferToCancel);
  console.log("loan defaulted");

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const liquidatedLoan = await users[0].liquidateLoan({
    ...loan,
    loanId: BigInt(loan.id.split(".").at(-1) ?? "0"),
  });

  await liquidatedLoan.waitTxInBlock();
  console.log("loan liquidated");
}

main();
