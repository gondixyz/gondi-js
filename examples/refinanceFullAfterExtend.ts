import { Address, isAddress } from 'viem';

import {
  generateBlock,
  setAllowances,
  sleep,
  testSingleNftOfferInput,
  testTokenId,
  users,
} from './common';

const SLEEP_BUFFER = 500;

const emitExtendRefinaceFullAndRepayLoan = async (contract?: Address) => {
  const offer = {
    ...testSingleNftOfferInput,
    duration: 30n,
  };
  const signedOffer = await users[0]._makeSingleNftOffer(offer, contract);
  const contractVersionString = `msl: ${signedOffer.contractAddress}`;
  console.log(`offer placed successfully: ${contractVersionString}`);

  const emitLoan = await users[1].emitLoan({
    offerExecution: users[1].offerExecutionFromOffers([signedOffer]),
    duration: signedOffer.duration,
    tokenId: testTokenId,
  });
  const { loan, loanId } = await emitLoan.waitTxInBlock();
  console.log(`loan emitted: ${contractVersionString}`);

  const remainingLockup = await users[0].getRemainingLockupSeconds({ loan });
  console.log(`remaining lockup: ${remainingLockup}`);
  await sleep(remainingLockup * 1_000 + SLEEP_BUFFER);

  let repayLoan = loan;
  let repayLoanId = loanId;

  try {
    await generateBlock(); // We need to push a new block into the blockchain [anvil issue]
    const { waitTxInBlock } = await users[0].extendLoan({
      loan,
      newDuration: 120n,
      loanId,
    });

    const receipt = await waitTxInBlock();

    console.log(`loan extended: ${contractVersionString}`);

    repayLoan = receipt.loan;
    repayLoanId = receipt.newLoanId;

    const isV6 =
      signedOffer.contractAddress === process.env.MULTI_SOURCE_LOAN_CONTRACT_V6 ||
      !('source' in loan);
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
        ...(isV6
          ? { trancheIndex: [0n], targetPrincipal: undefined }
          : { trancheIndex: undefined, targetPrincipal: loan.source.map((_) => 0n) }),
      },
      contractAddress: signedOffer.contractAddress,
      skipSignature: true,
    });
    console.log(`refinance offer placed successfully: ${contractVersionString}`);

    const remainingLockup = await users[2].getRemainingLockupSeconds({ loan });
    console.log(`remaining lockup after extend: ${remainingLockup}`);
    await sleep(remainingLockup * 1_000 + SLEEP_BUFFER);

    await generateBlock(); // We need to push a new block into the blockchain [anvil issue]
    const refinanceFullLoan = await users[2].refinanceFullLoan({
      offer: renegotiationOffer,
      loan: repayLoan,
      loanId: repayLoanId,
    });
    const { loan: refinancedLoanResult, loanId: newLoanId } =
      await refinanceFullLoan.waitTxInBlock();

    repayLoan = refinancedLoanResult;
    repayLoanId = newLoanId;
    console.log(`loan fully refinanced: ${contractVersionString}`);
  } catch (e) {
    console.log('Error while extending or refinancing loan:');
    console.log(e);
  } finally {
    const repaidLoan = await users[1].repayLoan({
      loan: repayLoan,
      loanId: repayLoanId,
    });
    await repaidLoan.waitTxInBlock();
    console.log(`loan repaid: ${contractVersionString}`);
  }
};

async function main() {
  try {
    await setAllowances();
    // v5 has extend loan feature only
    const oldContracts = [process.env.MULTI_SOURCE_LOAN_CONTRACT_V5 ?? ''];
    for (const contract of oldContracts) {
      if (isAddress(contract)) {
        await emitExtendRefinaceFullAndRepayLoan(contract);
      }
    }
    await emitExtendRefinaceFullAndRepayLoan();
  } catch (e) {
    console.log('Error:');
    console.log(e);
  }
}

main();
