import { Address } from "viem";

import {
  generateBlock,
  sleep,
  testSingleNftOfferInput,
  testTokenId,
  users,
} from "./common";

const SLEEP_BUFFER = 3000;

const emitRefinaceFullAndRepayLoan = async (contract?: Address) => {
  const offer = {
    ...testSingleNftOfferInput,
    duration: 30n,
  };
  const signedOffer = await users[0]._makeSingleNftOffer(offer, contract);
  const contractVersionString = `msl: ${signedOffer.contractAddress}`;
  console.log(`offer placed successfully: ${contractVersionString}`);

  const emitLoan = await users[1].emitLoan({
    offer: signedOffer,
    tokenId: testTokenId,
  });
  const { loan } = await emitLoan.waitTxInBlock();
  console.log(`loan emitted: ${contractVersionString}`);

  const remainingLockup = await users[0].getRemainingLockupSeconds({ loan });
  console.log(`remaining lockup: ${remainingLockup}`);
  await sleep(remainingLockup * 1_000 + SLEEP_BUFFER);

  let extendedLoan = loan;
  let extendedLoanId = 0n;

  try {
    await generateBlock(); // We need to push a new block into the blockchain [anvil issue]
    const { waitTxInBlock } = await users[0].extendLoan({
      loan,
      newDuration: 120n,
      loanId: loan.source[0].loanId,
    });

    const receipt = await waitTxInBlock();
    extendedLoan = receipt.loan;
    extendedLoanId = receipt.newLoanId;

    console.log(`loan extended: ${contractVersionString}`);
  } catch (e) {
    console.log("Error while extending loan:");
    console.log(e);
  } finally {
    const repayLoan = await users[1].repayLoan({
      loan: extendedLoan,
      loanId: extendedLoanId,
    });
    await repayLoan.waitTxInBlock();
    console.log(`loan repaid: ${contractVersionString}`);
  }
};

async function main() {
  try {
    await emitRefinaceFullAndRepayLoan();
  } catch (e) {
    console.log("Error:");
    console.log(e);
  }
}

main();
