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

const emitMergeTranchesAndRepay = async (contract?: Address) => {
  const offer = {
    ...testSingleNftOfferInput,
    duration: 30n,
    maxSeniorRepayment: testSingleNftOfferInput.principalAmount,
  };
  const signedOffer = await users[0]._makeSingleNftOffer(offer, contract);
  const secondSignedOffer = await users[0]._makeSingleNftOffer(offer, contract);
  const thirdSignedOffer = await users[0]._makeSingleNftOffer(offer, contract);
  const contractVersionString = `msl: ${signedOffer.contractAddress}`;
  console.log(`offers placed successfully: ${contractVersionString}`);

  const offers = [signedOffer, secondSignedOffer, thirdSignedOffer];
  const amount = signedOffer.principalAmount / 4n;
  const emitLoan = await users[1].emitLoan({
    offerExecution: users[1].offerExecutionFromOffers(offers, [amount, amount, amount]),
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
    const mergeTranchesLoan = await users[0].mergeTranches({
      loan,
      loanId,
      minTranche: 0n,
      maxTranche: BigInt(offers.length),
    });
    const { loan: newLoan, newLoanId } = await mergeTranchesLoan.waitTxInBlock();
    repayLoan = newLoan;
    repayLoanId = newLoanId;
    console.log(`loan tranches have been merged: ${contractVersionString}`);
  } catch (e) {
    console.log('Error while merging tranches:');
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

    const contracts = [process.env.MULTI_SOURCE_LOAN_CONTRACT_V6 ?? ''];
    for (const contract of contracts) {
      if (isAddress(contract)) {
        await emitMergeTranchesAndRepay(contract);
      }
    }
  } catch (e) {
    console.log('Error:');
    console.log(e);
  }
}

main();
