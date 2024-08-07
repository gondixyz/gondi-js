import { Gondi } from 'gondi';
import { Address, isAddress } from 'viem';

import {
  generateBlock,
  setAllowances,
  sleep,
  testSingleNftOfferInput,
  testTokenId,
  users,
} from './common';

const SLEEP_BUFFER = 3000;

const emitRenegotiateAndRepayLoan = async (lender: Gondi, borrower: Gondi, contract?: Address) => {
  const offer = {
    ...testSingleNftOfferInput,
    duration: 30n,
  };
  const signedOffer = await lender._makeSingleNftOffer(offer, contract);
  const contractVersionString = `msl: ${signedOffer.contractAddress}`;
  console.log(`offer placed successfully: ${contractVersionString}`);

  const emitLoan = await borrower.emitLoan({
    offerExecution: borrower.offerExecutionFromOffers([signedOffer]),
    duration: signedOffer.duration,
    tokenId: testTokenId,
  });
  const { loan, loanId } = await emitLoan.waitTxInBlock();
  console.log(`loan emitted: ${contractVersionString}`);

  const remainingLockup = await lender.getRemainingLockupSeconds({
    loan: {
      ...loan,
      contractStartTime: loan.startTime,
    },
  });
  await sleep(remainingLockup * 1_000 + SLEEP_BUFFER);

  const renegotiationChanges =
    'source' in loan ? { targetPrincipal: loan.source.map((_) => 0n) } : { trancheIndex: [0n] };
  const renegotiationOffer = await lender.makeRefinanceOffer({
    renegotiation: {
      loanId: loan.id,
      feeAmount: 100n,
      aprBps: signedOffer.aprBps * 2n,
      duration: signedOffer.duration,
      expirationTime: signedOffer.expirationTime,
      principalAmount: signedOffer.principalAmount,
      strictImprovement: false,
      requiresLiquidation: signedOffer.requiresLiquidation,
      ...renegotiationChanges,
    },
    contractAddress: signedOffer.contractAddress,
    skipSignature: false,
  });
  console.log(`renegotiation offer placed successfully: ${contractVersionString}`);

  let repayLoan = loan;
  let repayLoanId = loanId;
  try {
    await generateBlock(); // We need to push a new block into the blockchain [anvil issue]
    const renegotiation = await borrower.refinanceFullLoan({
      offer: renegotiationOffer,
      loan: {
        ...loan,
        contractStartTime: loan.startTime,
      },
      loanId,
    });
    const { loan: renegotiatedLoanResult, loanId: newLoanId } = await renegotiation.waitTxInBlock();
    repayLoan = renegotiatedLoanResult;
    repayLoanId = newLoanId;
    console.log(`loan renegotiation accepted by the borrower: ${contractVersionString}`);
  } catch (e) {
    console.log('Error while renegotiating loan:');
    console.log(e);
  } finally {
    const repaidLoan = await borrower.repayLoan({
      loan: {
        ...repayLoan,
        contractStartTime: repayLoan.startTime,
      },
      loanId: repayLoanId,
    });
    await repaidLoan.waitTxInBlock();
    console.log(`loan repaid: ${contractVersionString}`);
  }
};

async function main() {
  try {
    await setAllowances();

    const contracts = [
      process.env.MULTI_SOURCE_LOAN_CONTRACT_V6 ?? '',
      process.env.MULTI_SOURCE_LOAN_CONTRACT_V5 ?? '',
      process.env.MULTI_SOURCE_LOAN_CONTRACT_V4 ?? '',
    ];
    for (const contract of contracts) {
      if (isAddress(contract)) {
        await emitRenegotiateAndRepayLoan(users[0], users[1], contract);
      }
    }
  } catch (e) {
    console.log('Error:');
    console.log(e);
  }
}

main();
