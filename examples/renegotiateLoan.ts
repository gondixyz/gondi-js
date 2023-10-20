import { Gondi } from "gondi";
import { Address, isAddress } from "viem";

import { sleep, testSingleNftOfferInput, testTokenId, users } from "./common";

const emitRenegotiateAndRepayLoan = async (lender: Gondi, borrower: Gondi, contract?: Address) => {
  const signedOffer = await lender._makeSingleNftOffer(
    testSingleNftOfferInput, contract,
  );
  const contractVersionString = `msl: ${signedOffer.contractAddress}`;
  console.log(`offer placed successfully: ${contractVersionString}`);

  const emitLoan = await borrower.emitLoan({
    offer: signedOffer,
    tokenId: testTokenId,
  });
  const { loan } = await emitLoan.waitTxInBlock();
  console.log(`loan emitted: ${contractVersionString}`);

  await sleep(3000);

  const renegotiationOffer = await lender.makeRefinanceOffer({
    renegotiation: {
      loanId: loan.id,
      feeAmount: 0n,
      aprBps: signedOffer.aprBps * 2n,
      duration: signedOffer.duration,
      expirationTime: signedOffer.expirationTime,
      principalAmount: signedOffer.principalAmount,
      strictImprovement: false,
      requiresLiquidation: signedOffer.requiresLiquidation,
      targetPrincipal: loan.source.map((_) => 0n),
    },
    contractAddress: signedOffer.contractAddress,
    skipSignature: false,
  });
  console.log(`renegotiation offer placed successfully: ${contractVersionString}`);

  let renegotiatedLoan = loan;
  try {
    const renegotiation = await borrower.refinanceFullLoan({
      offer: renegotiationOffer,
      loan,
    });
    const { loan: renegotiatedLoanResult } = await renegotiation.waitTxInBlock();
    renegotiatedLoan = renegotiatedLoanResult;
    console.log(`loan renegotiation accepted by the borrower: ${contractVersionString}`);
  } catch(e) {
    console.log('Error while renegotiating loan:');
    console.log(e);
  } finally {
    const repayLoan = await borrower.repayLoan({ loan: renegotiatedLoan });
    await repayLoan.waitTxInBlock();
    console.log(`loan repaid: ${contractVersionString}`);
  }
};

async function main() {
  try {
    await emitRenegotiateAndRepayLoan(users[0], users[1]);

    const MULTI_SOURCE_LOAN_CONTRACT_V4 = process.env.MULTI_SOURCE_LOAN_CONTRACT_V4 ?? "";

    if (isAddress(MULTI_SOURCE_LOAN_CONTRACT_V4)) {
      await emitRenegotiateAndRepayLoan(users[0], users[1], MULTI_SOURCE_LOAN_CONTRACT_V4);
    }
  } catch (e) {
    console.log("Error:");
    console.log(e);
  }
}

main();
