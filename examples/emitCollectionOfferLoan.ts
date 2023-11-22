import { Address, isAddress } from "viem";

import { sleep, testCollectionOfferInput, testTokenId, users } from "./common";

const emitAndRepayLoan = async (contract?: Address) => {
  const signedOffer = await users[0]._makeCollectionOffer(
    testCollectionOfferInput, contract,
  );
  const contractVersionString = `msl: ${signedOffer.contractAddress}`;
  console.log(`offer placed successfully: ${contractVersionString}`);

  const emitLoan = await users[1].emitLoan({
    offer: {
      ...signedOffer,
      nftId: Number(signedOffer.nftCollateralTokenId.valueOf()),
    },
    tokenId: testTokenId,
  });
  const { loan } = await emitLoan.waitTxInBlock();
  console.log(`loan emitted: ${contractVersionString}`);

  await sleep(3000);

  const repayLoan = await users[1].repayLoan({
    loan,
    loanId: loan.source[0].loanId,
  });
  await repayLoan.waitTxInBlock();
  console.log(`loan repaid: ${contractVersionString}`);
};

async function main() {
  try {
    await emitAndRepayLoan();

    const MULTI_SOURCE_LOAN_CONTRACT_V4 = process.env.MULTI_SOURCE_LOAN_CONTRACT_V4 ?? "";

    if (isAddress(MULTI_SOURCE_LOAN_CONTRACT_V4)) {
      await emitAndRepayLoan(MULTI_SOURCE_LOAN_CONTRACT_V4);
    }
  } catch (e) {
    console.log("Error:");
    console.log(e);
  }
}

main();
