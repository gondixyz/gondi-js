import { Address, isAddress } from 'viem';

import { setAllowances, sleep, testSingleNftOfferInput, testTokenId, users } from './common';

const emitAndRepayLoan = async (contract?: Address) => {
  const signedOffer = await users[0]._makeSingleNftOffer(testSingleNftOfferInput, contract);
  const anotherOfferInput = {
    ...testSingleNftOfferInput,
    maxSeniorRepayment: testSingleNftOfferInput.principalAmount,
  };
  const anotherSignedOffer = await users[0]._makeSingleNftOffer(anotherOfferInput, contract);
  const contractVersionString = `msl: ${signedOffer.contractAddress}`;
  console.log(`offers placed successfully: ${contractVersionString}`);

  const emitLoan = await users[1].emitLoan({
    offerExecution: users[1].offerExecutionFromOffers(
      [signedOffer, anotherSignedOffer],
      [signedOffer, anotherSignedOffer].map((offer) => offer.principalAmount / 2n),
    ),
    duration: signedOffer.duration,
    tokenId: testTokenId,
  });

  const { loan, loanId } = await emitLoan.waitTxInBlock();
  console.log(`loan emitted: ${contractVersionString}`);

  await sleep(3000);

  const repayLoan = await users[1].repayLoan({ loan, loanId });
  await repayLoan.waitTxInBlock();
  console.log(`loan repaid: ${contractVersionString}`);
};

async function main() {
  try {
    const contract = process.env.MULTI_SOURCE_LOAN_CONTRACT_V6 ?? '';
    if (isAddress(contract)) {
      await setAllowances();
      await emitAndRepayLoan(contract);
    }
  } catch (e) {
    console.log('Error:');
    console.log(e);
  }
}

main();
