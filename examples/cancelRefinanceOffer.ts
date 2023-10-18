import { Address, isAddress } from "viem";

import { testSingleNftOfferInput, testTokenId, users } from "./common";


const emitCancelRefiOfferAndRepayLoan = async (contract?: Address) => {
  const signedOffer = await users[0]._makeSingleNftOffer(
    testSingleNftOfferInput, contract,
  );
  const contractVersionString = `msl: ${signedOffer.contractAddress}`;
  console.log(`offer placed successfully: ${contractVersionString}`);

  const emitLoan = await users[1].emitLoan({
    offer: signedOffer,
    tokenId: testTokenId,
  });
  const { loan } = await emitLoan.waitTxInBlock();
  console.log(`loan emitted: ${contractVersionString}`);

  await new Promise((resolve) => setTimeout(resolve, 3000));

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
  console.log(`renegotiation offer cancelled: ${contractVersionString}`);

  const repayLoan = await users[1].repayLoan({
    loan: {
      ...loan,
      refinanceProceeds: [],
    },
  });
  await repayLoan.waitTxInBlock();
  console.log(`loan repaid: ${contractVersionString}`);
};

async function main() {
  try {
    await emitCancelRefiOfferAndRepayLoan();

    const MULTI_SOURCE_LOAN_CONTRACT_V4 = process.env.MULTI_SOURCE_LOAN_CONTRACT_V4 ?? "";

    if (isAddress(MULTI_SOURCE_LOAN_CONTRACT_V4)) {
      await emitCancelRefiOfferAndRepayLoan(MULTI_SOURCE_LOAN_CONTRACT_V4);
    }
  } catch (e) {
    console.log("Error:");
    console.log(e);
  }
}

main();
