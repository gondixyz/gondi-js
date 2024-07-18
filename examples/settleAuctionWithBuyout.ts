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

const settleAuctionWithBuyout = async (
  owner: Gondi,
  lender: Gondi,
  mslContract?: Address,
  liquidatorContract?: Address,
) => {
  if (!isAddress(liquidatorContract ?? '')) {
    throw new Error(`invalid liquidator contract address: ${liquidatorContract}`);
  }
  const signableOffer = {
    ...offer,
    maxSeniorRepayment: offer.principalAmount,
    duration: 30n,
  };
  const signedOffer = await lender._makeSingleNftOffer(signableOffer, mslContract);
  const secondSignedOffer = await lender._makeSingleNftOffer(signableOffer, mslContract);
  const contractVersionString = `msl: ${signedOffer.contractAddress}`;
  console.log(`offer placed successfully: ${contractVersionString}`);

  const amount = signedOffer.principalAmount / 3n;
  const emitLoan = await owner.emitLoan({
    offerExecution: owner.offerExecutionFromOffers(
      [signedOffer, secondSignedOffer],
      [amount, amount],
    ),
    duration: signedOffer.duration,
    tokenId: testTokenId,
  });
  const { loan, loanId } = await emitLoan.waitTxInBlock();
  console.log(`loan emitted: ${contractVersionString}`);

  await sleep(Number(signedOffer.duration * 1000n));

  await generateBlock(); // We need to push a new block into the blockchain [anvil issue]
  console.log(`loan defaulted: ${contractVersionString}`);

  await sleep(3000);

  const sendLoanToAuction = await lender.liquidateLoan({
    loanId,
    loan: {
      ...loan,
      contractStartTime: loan.startTime,
    },
  });
  const { blockNumber, loanId: liquidatedLoanId } = await sendLoanToAuction.waitTxInBlock();
  console.log(`loan sent to auction: ${contractVersionString}`);

  const block = await lender.bcClient.getBlock({ blockNumber, includeTransactions: false });
  const originator = (await lender.wallet.getAddresses())[0];

  const approveToken = await lender.approveToken({
    tokenAddress: loan.principalAddress,
    to: liquidatorContract,
  });
  await approveToken.waitTxInBlock();
  console.log(`approved liquidator to move erc20: ${contractVersionString}`);

  const MIN_BID_LIQUIDATION = 50n;
  const BPS = 10000n;
  const settleAuctionWithBuyout = await lender.settleAuctionWithBuyout({
    loan: {
      ...loan,
      contractStartTime: loan.startTime,
    },
    auction: {
      loanAddress: loan.contractAddress,
      loanId: liquidatedLoanId,
      triggerFee: 100n, // Assuming trigger fee, but should be taken from event or API
      highestBid: 0n, // Auction has just started
      highestBidder: zeroAddress, // Auction has just started
      duration: AUCTION_DEFAULT_DURATION,
      asset: loan.principalAddress,
      startTime: block.timestamp,
      originator: originator,
      lastBidTime: block.timestamp, // Auction has just started
      minBid: (loan.principalAmount * MIN_BID_LIQUIDATION) / BPS, // This value should be taken from event
    },
  });
  await settleAuctionWithBuyout.waitTxInBlock();
  console.log(`settled auction with buyout successfully: ${contractVersionString}`);
};

async function main() {
  try {
    await setAllowances();
    await settleAuctionWithBuyout(
      users[1],
      users[0],
      process.env.MULTI_SOURCE_LOAN_CONTRACT_V6 as Address,
      process.env.AUCTION_LIQUIDATOR_CONTRACT_V6 as Address,
    );
  } catch (e) {
    console.log('Error:');
    console.log(e);
  }
}

main();
