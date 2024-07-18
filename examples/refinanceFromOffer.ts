import { Gondi } from 'gondi';
import { Address, isAddress } from 'viem';

import {
  generateBlock,
  setAllowances,
  testSingleNftOfferInput as offer,
  testTokenId,
  users,
} from './common';

const emitRefiFromOfferAndRepay = async (lender: Gondi, borrower: Gondi, contract?: Address) => {
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
    const signedOfferForRefi = await lender._makeSingleNftOffer(offer, contract);
    const refinanceFromOffers = await borrower.refinanceFromOffers({
      loanId,
      loan: {
        ...loan,
        contractStartTime: loan.startTime,
      },
      executionData: {
        offerExecution: borrower.offerExecutionFromOffers([signedOfferForRefi]),
        duration: signedOffer.duration,
        tokenId: testTokenId,
      },
    });
    const { loan: refinancedFromOffersLoan, loanId: newLoanId } =
      await refinanceFromOffers.waitTxInBlock();
    repayLoan = refinancedFromOffersLoan;
    repayLoanId = newLoanId;
    console.log(`refinanced loan from offers successfully: ${contractVersionString}`);
    await generateBlock(); // We need to push a new block into the blockchain [anvil issue]
  } catch (e) {
    console.log('Error while refinancing loan from offers:');
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

    const contracts = [process.env.MULTI_SOURCE_LOAN_CONTRACT_V6 ?? ''];
    for (const contract of contracts) {
      if (isAddress(contract)) {
        await emitRefiFromOfferAndRepay(users[0], users[1], contract);
      }
    }
  } catch (e) {
    console.log('Error:');
    console.log(e);
  }
}

main();
