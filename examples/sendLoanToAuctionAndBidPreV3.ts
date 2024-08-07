import { Gondi } from 'gondi';
import { Address, isAddress, zeroAddress } from 'viem';

import {
  AUCTION_DEFAULT_DURATION,
  generateBlock,
  setAllowances,
  sleep,
  testSingleNftOfferInput as offer,
  testTokenId,
  users,
} from './common';

const emitLoanThenAuctionAndBid = async (
  owner: Gondi,
  lender: Gondi,
  refinancer: Gondi,
  mslContract?: Address,
  liquidatorContract?: Address,
) => {
  if (!isAddress(liquidatorContract ?? '')) {
    throw new Error(`invalid liquidator contract address: ${liquidatorContract}`);
  }

  const signedOffer = await lender._makeSingleNftOffer({ ...offer, duration: 15n }, mslContract);
  const contractVersionString = `msl: ${signedOffer.contractAddress}`;
  console.log(`offer placed successfully: ${contractVersionString}`);

  const emitLoan = await owner.emitLoan({
    offerExecution: owner.offerExecutionFromOffers([signedOffer]),
    duration: signedOffer.duration,
    tokenId: testTokenId,
  });
  const { loan, loanId } = await emitLoan.waitTxInBlock();
  console.log(`loan emitted: ${contractVersionString}`);

  const renegotiationChanges =
    'source' in loan
      ? { targetPrincipal: loan.source.map((s) => s.principalAmount / 2n) }
      : { trancheIndex: [0n] };
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
      ...renegotiationChanges,
    },
    contractAddress: loan.contractAddress,
    skipSignature: true,
  });
  console.log(`refinance offer placed successfully: ${contractVersionString}`);

  const remainingLockup = await users[0].getRemainingLockupSeconds({
    loan: {
      ...loan,
      contractStartTime: loan.startTime,
    },
  });
  await sleep(remainingLockup * 1_000);
  await generateBlock(); // We need to push a new block into the blockchain [anvil issue]

  const refinancePartialLoan = await refinancer.refinancePartialLoan({
    offer: renegotiationOffer,
    loan: {
      ...loan,
      contractStartTime: loan.startTime,
    },
    loanId,
  });
  const { loan: refinancedLoanResult, loanId: refinancedLoanId } =
    await refinancePartialLoan.waitTxInBlock();
  console.log(`loan partially refinanced: ${contractVersionString}`);

  await sleep(Number(signedOffer.duration * 1000n));

  await generateBlock(); // We need to push a new block into the blockchain [anvil issue]
  console.log(`loan defaulted: ${contractVersionString}`);

  await sleep(3000);

  const sendLoanToAuction = await lender.liquidateLoan({
    loan: {
      ...refinancedLoanResult,
      contractStartTime: refinancedLoanResult.startTime,
    },
    loanId: refinancedLoanId,
  });
  const { blockNumber, loanId: liquidatedLoanId } = await sendLoanToAuction.waitTxInBlock();
  console.log(`loan sent to auction: ${contractVersionString}`);

  const block = await lender.bcClient.getBlock({ blockNumber, includeTransactions: false });
  const originator = (await lender.wallet.getAddresses())[0];

  const approveToken = await lender.approveToken({
    tokenAddress: refinancedLoanResult.principalAddress,
    to: liquidatorContract,
  });
  await approveToken.waitTxInBlock();
  console.log(`approved liquidator to move erc20: ${contractVersionString}`);

  const placeBid = await lender.placeBid({
    collectionContractAddress: signedOffer.nftCollateralAddress,
    tokenId: signedOffer.nftCollateralTokenId,
    bid: signedOffer.principalAmount,
    auction: {
      loanAddress: refinancedLoanResult.contractAddress,
      loanId: liquidatedLoanId,
      triggerFee: 100n, // Assuming trigger fee, but should be taken from event or API
      highestBid: 0n, // Auction has just started
      highestBidder: zeroAddress, // Auction has just started
      duration: AUCTION_DEFAULT_DURATION,
      asset: refinancedLoanResult.principalAddress,
      startTime: block.timestamp,
      originator: originator,
      lastBidTime: block.timestamp, // Auction has just started
    },
  });
  await placeBid.waitTxInBlock();
  console.log(`bid placed successfully: ${contractVersionString}`);
};

async function main() {
  try {
    await setAllowances();
    const MULTI_SOURCE_LOAN_CONTRACT_V4 = process.env.MULTI_SOURCE_LOAN_CONTRACT_V4 ?? '';
    const useV4 = false; // Change to use v4 contracts

    if (useV4 && isAddress(MULTI_SOURCE_LOAN_CONTRACT_V4)) {
      await emitLoanThenAuctionAndBid(
        users[1],
        users[0],
        users[2],
        MULTI_SOURCE_LOAN_CONTRACT_V4,
        process.env.AUCTION_LIQUIDATOR_CONTRACT_V4 as Address,
      );
    } else {
      await emitLoanThenAuctionAndBid(
        users[1],
        users[0],
        users[2],
        process.env.MULTI_SOURCE_LOAN_CONTRACT_V5 as Address,
        process.env.AUCTION_LIQUIDATOR_CONTRACT_V5 as Address,
      );
    }
  } catch (e) {
    console.log('Error:');
    console.log(e);
  }
}

main();
