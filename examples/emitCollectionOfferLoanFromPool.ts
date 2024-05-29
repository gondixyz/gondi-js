import { isAddress } from 'viem';

import {
  POOL_ADDRESS,
  setAllowances,
  sleep,
  testCollectionOfferInput,
  testTokenId,
  users,
} from './common';

const emitAndRepayLoan = async (contract: string) => {
  if (!isAddress(POOL_ADDRESS)) {
    throw new Error(`Invalid pool address: ${POOL_ADDRESS}`);
  }

  const deposit = await users[0].poolMintOrDeposit({
    address: POOL_ADDRESS,
    assetAmount: testCollectionOfferInput.principalAmount,
  });

  await deposit.waitTxInBlock();

  const contractVersionString = `pool: ${POOL_ADDRESS}, msl: ${contract}`;
  console.log(`successfull deposit: ${contractVersionString}`);

  const { offers } = await users[1].offers({
    filterBy: { collection: testCollectionOfferInput.collectionId, lenders: [POOL_ADDRESS] },
  });

  if (offers.length === 0) {
    throw new Error(`No offers from ${POOL_ADDRESS} found`);
  }

  const offer = offers[0];

  const emitLoan = await users[1].emitLoan({
    offerExecution: users[1].offerExecutionFromOffers([offer]),
    duration: offer.duration,
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
    await setAllowances();

    const contracts = [process.env.MULTI_SOURCE_LOAN_CONTRACT_V6 ?? ''];
    for (const contract of contracts) {
      if (isAddress(contract)) {
        await emitAndRepayLoan(contract);
      }
    }
  } catch (e) {
    console.log('Error:');
    console.log(e);
  }
}

main();
