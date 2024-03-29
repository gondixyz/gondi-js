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

const emitAddTrancheAndRepay = async (lender: Gondi, borrower: Gondi, contract?: Address) => {
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

  let repayLoan = loan;
  let repayLoanId = loanId;

  try {
    const remainingLockup = await lender.getRemainingLockupSeconds({ loan });
    await sleep(remainingLockup * 1_000 + SLEEP_BUFFER);

    const addTrancheOffer = await lender.makeRefinanceOffer({
      renegotiation: {
        loanId: loan.id,
        feeAmount: 100n,
        aprBps: signedOffer.aprBps * 2n,
        duration: signedOffer.duration,
        expirationTime: signedOffer.expirationTime,
        principalAmount: 1000n,
        strictImprovement: false,
        requiresLiquidation: signedOffer.requiresLiquidation,
        trancheIndex: [0n],
      },
      contractAddress: signedOffer.contractAddress,
      skipSignature: false,
    });
    console.log(`renegotiation offer to add tranche placed successfully: ${contractVersionString}`);

    await generateBlock(); // We need to push a new block into the blockchain [anvil issue]
    const addTranche = await borrower.addTranche({
      offer: addTrancheOffer,
      loan,
      loanId,
    });
    const { loan: loanWithAddedTranche, loanId: newLoanId } = await addTranche.waitTxInBlock();
    repayLoan = loanWithAddedTranche;
    repayLoanId = newLoanId;
    console.log(`tranche added successfully: ${contractVersionString}`);
  } catch (e) {
    console.log('Error while renegotiating loan:');
    console.log(e);
  } finally {
    const repaidLoan = await borrower.repayLoan({
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

    const contracts = [process.env.MULTI_SOURCE_LOAN_CONTRACT_V6 ?? ''];
    for (const contract of contracts) {
      if (isAddress(contract)) {
        await emitAddTrancheAndRepay(users[0], users[1], contract);
      }
    }
  } catch (e) {
    console.log('Error:');
    console.log(e);
  }
}

main();
