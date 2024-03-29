import { Gondi } from 'gondi';
import { Address, isAddress } from 'viem';

import { generateBlock, sleep, testSingleNftOfferInput, testTokenId, users } from './common';

const emitAndLiquidateLoan = async (owner: Gondi, lender: Gondi, contract?: Address) => {
  const signedOffer = await lender._makeSingleNftOffer(
    {
      ...testSingleNftOfferInput,
      duration: 1n,
    },
    contract,
  );
  const contractVersionString = `msl: ${signedOffer.contractAddress}`;
  console.log(`offer placed successfully: ${contractVersionString}`);

  const emitLoan = await owner.emitLoan({
    offer: signedOffer,
    tokenId: testTokenId,
  });
  const { loan } = await emitLoan.waitTxInBlock();
  console.log(`loan emitted: ${contractVersionString}`);

  await sleep(3000);

  await generateBlock(); // We need to push a new block into the blockchain [anvil issue]
  console.log(`loan defaulted: ${contractVersionString}`);

  await sleep(3000);

  const liquidatedLoan = await lender.liquidateLoan({
    loan,
    loanId: loan.source[0].loanId,
  });

  await liquidatedLoan.waitTxInBlock();
  console.log(`loan liquidated: ${contractVersionString}`);
};

async function main() {
  try {
    await emitAndLiquidateLoan(users[1], users[0]);

    const MULTI_SOURCE_LOAN_CONTRACT_V4 = process.env.MULTI_SOURCE_LOAN_CONTRACT_V4 ?? '';

    if (isAddress(MULTI_SOURCE_LOAN_CONTRACT_V4)) {
      await emitAndLiquidateLoan(users[0], users[1], MULTI_SOURCE_LOAN_CONTRACT_V4);
    }
  } catch (e) {
    console.log('Error:');
    console.log(e);
  }
}

main();
