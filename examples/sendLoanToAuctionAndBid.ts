import { Gondi } from "gondi";
import { Address, isAddress } from "viem";

import {
  sleep,
  testCollectionOfferInput,
  testSingleNftOfferInput,
  testTokenId,
  users,
} from "./common";

const emitLoanThenAuctionAndBid = async (owner: Gondi, lender: Gondi, refinancer: Gondi, contract?: Address) => {
  const signedOffer = await lender._makeSingleNftOffer({
    ...testSingleNftOfferInput,
    duration: 3n,
  }, contract);
  const contractVersionString = `msl: ${signedOffer.contractAddress}`;
  console.log(`offer placed successfully: ${contractVersionString}`);

  const emitLoan = await owner.emitLoan({
    offer: signedOffer,
    tokenId: testTokenId,
  });
  const { loan } = await emitLoan.waitTxInBlock();
  console.log(`loan emitted: ${contractVersionString}`);

  const renegotiationOffer = await refinancer.makeRefinanceOffer({
    renegotiation: {
      loanId: loan.id,
      feeAmount: 0n,
      aprBps: signedOffer.aprBps / 2n,
      duration: 0n,
      expirationTime: signedOffer.expirationTime,
      principalAmount: signedOffer.principalAmount / 2n,
      strictImprovement: true,
      requiresLiquidation: signedOffer.requiresLiquidation,
      targetPrincipal: loan.source.map((source) => source.principalAmount / 2n),
    },
    contractAddress: loan.contractAddress,
    skipSignature: true,
  });
  console.log(`refinance offer placed successfully: ${contractVersionString}`);

  const refinancePartialLoan = await refinancer.refinancePartialLoan({
    offer: renegotiationOffer,
    loan,
  });
  const { loan: refinancedLoanResult } = await refinancePartialLoan.waitTxInBlock();
  console.log(`loan partially refinanced: ${contractVersionString}`);

  await sleep(5000);

  // We need to push a new block into the blockchain
  const collectionOfferToCancel = await lender._makeCollectionOffer(
    testCollectionOfferInput, contract
  );
  await lender.cancelOffer({
    id: collectionOfferToCancel.offerId,
    contractAddress: collectionOfferToCancel.contractAddress,
  });
  console.log(`loan defaulted: ${contractVersionString}`);

  await sleep(3000);

  const sendLoanToAuction = await lender.liquidateLoan(refinancedLoanResult);
  await sendLoanToAuction.waitTxInBlock();
  console.log(`loan sent to auction: ${contractVersionString}`);

  // TODO: Place bid
}

async function main() {
  try {
    const MULTI_SOURCE_LOAN_CONTRACT_V4 = process.env.MULTI_SOURCE_LOAN_CONTRACT_V4 ?? "";
    const useV4 = false; // Change to use v4 contracts

    if (useV4 && isAddress(MULTI_SOURCE_LOAN_CONTRACT_V4)) {
      await emitLoanThenAuctionAndBid(users[1], users[0], users[2], MULTI_SOURCE_LOAN_CONTRACT_V4);
    } else {
      await emitLoanThenAuctionAndBid(users[1], users[0], users[2]);
    }
  } catch (e) {
    console.log("Error:");
    console.log(e);
  }
}

main();
