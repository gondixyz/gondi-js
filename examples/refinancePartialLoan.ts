import { Address, isAddress } from "viem";

import { generateBlock, sleep, testSingleNftOfferInput, testTokenId, users } from "./common";

const SLEEP_BUFFER = 3000;

const emitRefinacePartialAndRepayLoan = async (contract?: Address) => {
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

  const renegotiationOffer = await users[2].makeRefinanceOffer({
    renegotiation: {
      loanId: loan.id,
      feeAmount: 0n,
      aprBps: signedOffer.aprBps / 2n,
      duration: 0n,
      expirationTime: signedOffer.expirationTime,
      principalAmount: signedOffer.principalAmount / 2n,
      strictImprovement: true,
      requiresLiquidation: signedOffer.requiresLiquidation,
      targetPrincipal: loan.source.map((source) => source.principalAmount / 2n),
    },
    contractAddress: signedOffer.contractAddress,
    skipSignature: true,
  });
  console.log(`refinance offer placed successfully: ${contractVersionString}`);

  let refinancedLoan = loan;
  try {
    await generateBlock(); // We need to push a new block into the blockchain [anvil issue]
    const refinancePartialLoan = await users[2].refinancePartialLoan({
      offer: renegotiationOffer,
      loan,
    });
    const { loan: refinancedLoanResult } = await refinancePartialLoan.waitTxInBlock();
    refinancedLoan = refinancedLoanResult;
    console.log(`loan partially refinanced: ${contractVersionString}`);
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
    await emitRefinacePartialAndRepayLoan();

    const MULTI_SOURCE_LOAN_CONTRACT_V4 = process.env.MULTI_SOURCE_LOAN_CONTRACT_V4 ?? "";

    if (isAddress(MULTI_SOURCE_LOAN_CONTRACT_V4)) {
      await emitRefinacePartialAndRepayLoan(MULTI_SOURCE_LOAN_CONTRACT_V4);
    }
  } catch (e) {
    console.log("Error:");
    console.log(e);
  }
}

main();
