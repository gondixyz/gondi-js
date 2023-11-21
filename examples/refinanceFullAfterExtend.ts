import { Address } from "viem";

import {
  generateBlock,
  sleep,
  testSingleNftOfferInput,
  testTokenId,
  users,
} from "./common";

const SLEEP_BUFFER = 500;

const emitRefinaceFullAndRepayLoan = async (contract?: Address) => {
  const offer = {
    ...testSingleNftOfferInput,
    duration: 30n,
  };
  const signedOffer = await users[0]._makeSingleNftOffer(offer, contract);
  const contractVersionString = `msl: ${signedOffer.contractAddress}`;
  console.log(`offer placed successfully: ${contractVersionString}`);

  const emitLoan = await users[1].emitLoan({
    offer: signedOffer,
    tokenId: testTokenId,
  });
  const { loan } = await emitLoan.waitTxInBlock();
  console.log(`loan emitted: ${contractVersionString}`);

  const remainingLockup = await users[0].getRemainingLockupSeconds({ loan });
  console.log(`remaining lockup: ${remainingLockup}`);
  await sleep(remainingLockup * 1_000 + SLEEP_BUFFER);

  let refinancedLoan = loan;
  let refinancedLoanId = 0n;

  try {
    await generateBlock(); // We need to push a new block into the blockchain [anvil issue]
    const { waitTxInBlock } = await users[0].extendLoan({
      loan,
      newDuration: 120n,
      loanId: loan.source[0].loanId,
    });

    const receipt = await waitTxInBlock();

    console.log(`loan extended: ${contractVersionString}`);

    refinancedLoan = receipt.loan;
    refinancedLoanId = receipt.newLoanId;

    const renegotiationOffer = await users[2].makeRefinanceOffer({
      renegotiation: {
        loanId: loan.id,
        feeAmount: 0n,
        aprBps: signedOffer.aprBps - signedOffer.aprBps / 2n,
        duration: 250n,
        expirationTime: signedOffer.expirationTime,
        principalAmount: signedOffer.principalAmount,
        strictImprovement: true,
        requiresLiquidation: signedOffer.requiresLiquidation,
        targetPrincipal: loan.source.map((_) => 0n),
      },
      contractAddress: signedOffer.contractAddress,
      skipSignature: true,
    });
    console.log(
      `refinance offer placed successfully: ${contractVersionString}`
    );

    const remainingLockup = await users[2].getRemainingLockupSeconds({ loan });
    console.log(`remaining lockup after extend: ${remainingLockup}`);
    await sleep(remainingLockup * 1_000 + SLEEP_BUFFER);

    await generateBlock(); // We need to push a new block into the blockchain [anvil issue]
    const refinanceFullLoan = await users[2].refinanceFullLoan({
      offer: renegotiationOffer,
      loan: receipt.loan,
      loanId: receipt.newLoanId,
    });
    const { loan: refinancedLoanResult } =
      await refinanceFullLoan.waitTxInBlock();

    refinancedLoan = refinancedLoanResult;
    refinancedLoanId = refinancedLoanResult.source[0].loanId;
    console.log(`loan fully refinanced: ${contractVersionString}`);
  } catch (e) {
    console.log("Error while extending or refinancing loan:");
    console.log(e);
  } finally {
    const repayLoan = await users[1].repayLoan({
      loan: refinancedLoan,
      loanId: refinancedLoanId,
    });
    await repayLoan.waitTxInBlock();
    console.log(`loan repaid: ${contractVersionString}`);
  }
};

async function main() {
  try {
    await emitRefinaceFullAndRepayLoan();
  } catch (e) {
    console.log("Error:");
    console.log(e);
  }
}

main();
