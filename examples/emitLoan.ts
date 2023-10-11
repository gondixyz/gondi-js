import { Address, isAddress } from "viem";

import { testSingleNftOfferInput, testTokenId, users } from "./common";

const emitAndRepayLoan = async (contract?: Address) => {
  const signedOffer = await users[0]._makeSingleNftOffer(
    testSingleNftOfferInput, contract,
  );
  const contractVersionString = `msl: ${signedOffer.contractAddress}`;
  console.log(`offer placed successfully: ${contractVersionString}`);
  let loan;
  try {
    const emitLoan = await users[1].emitLoan({
      offer: signedOffer,
      tokenId: testTokenId,
    });
    loan = await emitLoan.waitTxInBlock();
    console.log(`loan emitted: ${contractVersionString}`);
  } catch (e) {
    debugger;
    return;
  }

  await new Promise((resolve) => setTimeout(resolve, 3000));

  const repayLoan = await users[1].repayLoan({
    loan: {
      ...loan,
      refinanceProceeds: [],
    },
  });
  await repayLoan.waitTxInBlock();
  console.log(`loan repaid: ${contractVersionString}`);
};

async function main() {
  await emitAndRepayLoan();

  const MULTI_SOURCE_LOAN_CONTRACT_V4 = process.env.MULTI_SOURCE_LOAN_CONTRACT_V4 ?? "";

  if (isAddress(MULTI_SOURCE_LOAN_CONTRACT_V4)) {
    await emitAndRepayLoan(MULTI_SOURCE_LOAN_CONTRACT_V4);
  }
}

main();
