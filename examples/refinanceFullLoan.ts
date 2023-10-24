import { Address, isAddress } from "viem";

import { sleep, testSingleNftOfferInput, testTokenId, users } from "./common";

const SLEEP_BUFFER = 3000;

const emitRefinaceFullAndRepayLoan = async (contract?: Address) => {
  const offer = {
    ...testSingleNftOfferInput,
    duration: 30n
  };
  const signedOffer = await users[0]._makeSingleNftOffer(
    offer, contract,
  );
  const contractVersionString = `msl: ${signedOffer.contractAddress}`;
  console.log(`offer placed successfully: ${contractVersionString}`);

  const emitLoan = await users[1].emitLoan({
    offer: signedOffer,
    tokenId: testTokenId,
  });
  const { loan } = await emitLoan.waitTxInBlock();
  console.log(`loan emitted: ${contractVersionString}`);

  const remainingLockup = await users[0].getRemainingLockupSeconds({ loan });
  await sleep(remainingLockup * 1_000 + SLEEP_BUFFER);

  const renegotiationOffer = await users[0].makeRefinanceOffer({
    renegotiation: {
      loanId: loan.id,
      feeAmount: 0n,
      aprBps: signedOffer.aprBps - (signedOffer.aprBps / 2n),
      duration: signedOffer.duration,
      expirationTime: signedOffer.expirationTime,
      principalAmount: signedOffer.principalAmount,
      strictImprovement: true,
      requiresLiquidation: signedOffer.requiresLiquidation,
      targetPrincipal: loan.source.map((_) => 0n),
    },
    contractAddress: signedOffer.contractAddress,
    skipSignature: true,
  });
  console.log(`refinance offer placed successfully: ${contractVersionString}`);

  let refinancedLoan = loan;
  try {
    const refinanceFullLoan = await users[0].refinanceFullLoan({
      offer: renegotiationOffer,
      loan,
    });
    const { loan: refinancedLoanResult } = await refinanceFullLoan.waitTxInBlock();
    refinancedLoan = refinancedLoanResult;
    console.log(`loan fully refinanced: ${contractVersionString}`);
  } catch(e) {
    console.log('Error while refinancing loan:');
    console.log(e);
  } finally {
    const repayLoan = await users[1].repayLoan({ loan: refinancedLoan });
    await repayLoan.waitTxInBlock();
    console.log(`loan repaid: ${contractVersionString}`);
  }
};

async function main() {
  try {
    await emitRefinaceFullAndRepayLoan();

    const MULTI_SOURCE_LOAN_CONTRACT_V4 = process.env.MULTI_SOURCE_LOAN_CONTRACT_V4 ?? "";

    if (isAddress(MULTI_SOURCE_LOAN_CONTRACT_V4)) {
      await emitRefinaceFullAndRepayLoan(MULTI_SOURCE_LOAN_CONTRACT_V4);
    }
  } catch (e) {
    console.log("Error:");
    console.log(e);
  }
}

main();
