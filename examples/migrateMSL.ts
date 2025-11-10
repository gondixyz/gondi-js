import { getAddress } from 'viem';

import {
  setAllowances,
  sleep,
  testNftCollateralAddress,
  testSingleNftOfferInput,
  testTokenId,
  users,
} from './common';

const MSL_V3 = getAddress(process.env.MULTI_SOURCE_LOAN_CONTRACT_V6 ?? '');
const MSL_V3_1 = getAddress(process.env.MULTI_SOURCE_LOAN_CONTRACT_V7 ?? '');
const MIGRATOR = getAddress(process.env.MIGRATOR_CONTRACT ?? '');

const migrateMSL = async () => {
  const signedOfferV3 = await users[0]._makeSingleNftOffer(testSingleNftOfferInput, MSL_V3);
  const contractVersionString = `msl: ${signedOfferV3.contractAddress}`;
  console.log(`offer placed successfully: ${contractVersionString}`);

  const emitLoan = await users[1].emitLoan({
    offerExecution: users[1].offerExecutionFromOffers([signedOfferV3]),
    duration: signedOfferV3.duration,
    nftCollateralAddress: testNftCollateralAddress,
    tokenId: testTokenId,
  });
  const { loan, loanId } = await emitLoan.waitTxInBlock();
  console.log(`loan emitted: ${contractVersionString}`);

  await sleep(3000);

  try {
    const signedOfferV3_1 = await users[0]._makeSingleNftOffer(testSingleNftOfferInput, MSL_V3_1);
    const newLoan = await users[1].efficientRefinanceFromOffers({
      executionData: {
        offerExecution: users[1].offerExecutionFromOffers([signedOfferV3_1]),
        duration: signedOfferV3_1.duration,
        nftCollateralAddress: testNftCollateralAddress,
        tokenId: testTokenId,
      },
      loan: {
        ...loan,
        contractStartTime: loan.startTime,
      },
      loanId,
      contractAddress: MIGRATOR,
    });
    await newLoan.waitTxInBlock();
    console.log(`loan migrated successfully`);
  } catch {
    const repayLoan = await users[1].repayLoan({
      loanId,
      loan: {
        ...loan,
        contractStartTime: loan.startTime,
      },
    });
    await repayLoan.waitTxInBlock();
    console.log(`loan repaid: ${contractVersionString}`);
  }
};

async function main() {
  try {
    await setAllowances();
    await migrateMSL();
  } catch (e) {
    console.log('Error:');
    console.log(e);
  }
}

main();
