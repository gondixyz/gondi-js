import { Address, isAddress } from "viem";

import {
  MULTI_SOURCE_LOAN_CONTRACT_V4,
  MULTI_SOURCE_LOAN_CONTRACT_V5,
  testSingleNftOfferInput,
  testTokenId,
  users,
} from "./common";

const emitCancelRefiOfferAndRepayLoan = async (contract?: Address) => {
  const signedOffer = await users[0]._makeSingleNftOffer(
    testSingleNftOfferInput,
    contract
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
    console.log(`renegotiation offer cancelled: ${contractVersionString}`);
  } catch (e) {
    console.log("Error while cancelling:");
    console.log(e);
  } finally {
    const repayLoan = await users[1].repayLoan({
      loan,
      loanId: loan.source[0].loanId,
    });
    await repayLoan.waitTxInBlock();
    console.log(`loan repaid: ${contractVersionString}`);
  }
};

async function main() {
  try {
    await emitCancelRefiOfferAndRepayLoan();

    if (isAddress(MULTI_SOURCE_LOAN_CONTRACT_V4)) {
      await emitCancelRefiOfferAndRepayLoan(MULTI_SOURCE_LOAN_CONTRACT_V4);
    }

    if (isAddress(MULTI_SOURCE_LOAN_CONTRACT_V5)) {
      await emitCancelRefiOfferAndRepayLoan(MULTI_SOURCE_LOAN_CONTRACT_V5);
    }
  } catch (e) {
    console.log("Error:");
    console.log(e);
  }
}

main();
