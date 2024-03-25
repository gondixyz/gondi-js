import { Gondi } from 'gondi';
import { Address, isAddress } from 'viem';

import {
  generateBlock,
  setAllowances,
  sleep,
  testSingleNftOfferInput as offer,
  testTokenId,
  users,
} from './common';

const emitAndLiquidateLoan = async (owner: Gondi, lender: Gondi, contract?: Address) => {
  const signedOffer = await lender._makeSingleNftOffer({ ...offer, duration: 1n }, contract);
  const contractVersionString = `msl: ${signedOffer.contractAddress}`;
  console.log(`offer placed successfully: ${contractVersionString}`);

  const emitLoan = await owner.emitLoan({
    offerExecution: owner.offerExecutionFromOffers([signedOffer]),
    duration: signedOffer.duration,
    tokenId: testTokenId,
  });
  const { loan, loanId } = await emitLoan.waitTxInBlock();
  console.log(`loan emitted: ${contractVersionString}`);

  await sleep(3000);

  await generateBlock(); // We need to push a new block into the blockchain [anvil issue]
  console.log(`loan defaulted: ${contractVersionString}`);

  await sleep(3000);

  const liquidatedLoan = await lender.liquidateLoan({ loan, loanId });
  await liquidatedLoan.waitTxInBlock();
  console.log(`loan liquidated: ${contractVersionString}`);
};

async function main() {
  try {
    await setAllowances();
    await emitAndLiquidateLoan(users[1], users[0]);

    const MULTI_SOURCE_LOAN_CONTRACT_V5 = process.env.MULTI_SOURCE_LOAN_CONTRACT_V5 ?? '';
    if (isAddress(MULTI_SOURCE_LOAN_CONTRACT_V5)) {
      await emitAndLiquidateLoan(users[0], users[1], MULTI_SOURCE_LOAN_CONTRACT_V5);
    }

    const MULTI_SOURCE_LOAN_CONTRACT_V4 = process.env.MULTI_SOURCE_LOAN_CONTRACT_V4 ?? '';
    if (isAddress(MULTI_SOURCE_LOAN_CONTRACT_V4)) {
      await emitAndLiquidateLoan(users[1], users[0], MULTI_SOURCE_LOAN_CONTRACT_V4);
    }

    // execute liquidation one more time to return the item to the original owner
    await emitAndLiquidateLoan(users[0], users[1]);
  } catch (e) {
    console.log('Error:');
    console.log(e);
  }
}

main();
