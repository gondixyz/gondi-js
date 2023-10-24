import { Address } from 'viem';

import { Auction, filterLogs, LoanV6 } from '@/blockchain';
import { Wallet } from '@/contracts';
import { getContracts } from '@/deploys';
import { auctionWithBuyoutLoanLiquidatorAbi as auctionWithBuyoutLoanLiquidatorABIV6 } from '@/generated/blockchain/v6';
import { millisToSeconds } from '@/utils/dates';

import { BaseContract } from './BaseContract';

export class AllV6 extends BaseContract<typeof auctionWithBuyoutLoanLiquidatorABIV6> {
  constructor({ walletClient }: { walletClient: Wallet }) {
    const {
      AuctionLoanLiquidator: { v6 },
    } = getContracts(walletClient.chain);

    super({
      walletClient,
      address: v6,
      abi: auctionWithBuyoutLoanLiquidatorABIV6,
    });
  }

  async placeBid({
    collectionContractAddress,
    tokenId,
    bid,
    auction,
  }: {
    collectionContractAddress: Address;
    tokenId: bigint;
    bid: bigint;
    auction: Auction;
  }) {
    const txHash = await this.safeContractWrite.placeBid([
      collectionContractAddress,
      tokenId,
      this.mapAuctionToAuctionArgs(auction),
      bid,
    ]);
    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });

        const filter = await this.contract.createEventFilter.BidPlaced();
        const events = filterLogs(receipt, filter);
        if (events.length === 0) throw new Error('Bid not placed');
        const args = events[0].args;
        console.log(`SAMPLE
          MutableAttributeDict(
            {
                "args": MutableAttributeDict(
                    {
                      "collection": "${args.collection}",
                      "tokenId": ${args.tokenId},
                      "newBidder": "${args.newBidder}",
                      "bid": ${args.bid},
                      "loanAddress": MULTI_SOURCE_LOAN_CONTRACT_V6,
                      "loanId": ${args.loanId},
                    }
                ),
                "event": "${events[0].eventName}",
                "logIndex": 1,
                "transactionIndex": ${receipt.transactionIndex},
                "transactionHash": HexBytes(
                    "${receipt.transactionHash}"
                ),
                "address": AUCTION_LOAN_LIQUIDATOR_CONTRACT_V6,
                "blockHash": HexBytes(
                    "${receipt.blockHash}"
                ),
                "blockNumber": ${receipt.blockNumber},
                "topics": [
                    ${events[0].topics?.map((topic) => `HexBytes("${topic}")`).join(',')},
                ],
            }
        )
        `);
        return { ...events[0].args, ...receipt };
      },
    };
  }

  async getRemainingLockupSeconds({ auction }: { auction: Auction }) {
    const lockupTimeSeconds = await this.contract.read.getTimeForMainLenderToBuy();
    const lockupSeconds = Number(lockupTimeSeconds);
    const ellapsedSeconds = Math.ceil(millisToSeconds(Date.now()) - Number(auction.startTime));

    if (ellapsedSeconds >= lockupSeconds) return 0;
    return lockupSeconds - ellapsedSeconds;
  }

  async settleAuctionWithBuyout({ auction, loan }: { auction: Auction; loan: LoanV6 }) {
    const txHash = await this.safeContractWrite.settleWithBuyout([
      loan.nftCollateralAddress,
      loan.nftCollateralTokenId,
      this.mapAuctionToAuctionArgs(auction),
      loan,
    ]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });

        const filter = await this.contract.createEventFilter.AuctionSettledWithBuyout();
        const events = filterLogs(receipt, filter);
        if (events.length === 0) throw new Error('Auction not settled');
        const args = events[0].args;
        console.log(`SAMPLE
          MutableAttributeDict(
            {
                "args": MutableAttributeDict(
                    {
                      "largestTrancheIdx": "${args.largestTrancheIdx}",
                      "loanAddress": MULTI_SOURCE_LOAN_CONTRACT_V6,
                      "loanId": ${args.loanId},
                      "nftAddress": "${args.nftAddress}",
                      "tokenId": ${args.tokenId},
                    }
                ),
                "event": "${events[0].eventName}",
                "logIndex": 1,
                "transactionIndex": ${receipt.transactionIndex},
                "transactionHash": HexBytes(
                    "${receipt.transactionHash}"
                ),
                "address": AUCTION_LOAN_LIQUIDATOR_CONTRACT_V6,
                "blockHash": HexBytes(
                    "${receipt.blockHash}"
                ),
                "blockNumber": ${receipt.blockNumber},
                "topics": [
                    ${events[0].topics?.map((topic) => `HexBytes("${topic}")`).join(',')},
                ],
            }
        )
        `);
        return { ...events[0].args, ...receipt };
      },
    };
  }

  async settleAuction({ auction, loan }: { auction: Auction; loan: LoanV6 }) {
    const txHash = await this.safeContractWrite.settleAuction([
      this.mapAuctionToAuctionArgs(auction),
      loan,
    ]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });

        const filter = await this.contract.createEventFilter.AuctionSettled();
        const events = filterLogs(receipt, filter);
        if (events.length === 0) throw new Error('Auction not settled');
        const args = events[0].args;
        console.log(`SAMPLE
          MutableAttributeDict(
            {
                "args": MutableAttributeDict(
                    {
                      "asset": "${args.asset}",
                      "collection": "${args.collection}",
                      "loanContract": MULTI_SOURCE_LOAN_CONTRACT_V6,
                      "loanId": ${args.loanId},
                      "proceeds": ${args.proceeds},
                      "settler": "${args.settler}",
                      "tokenId": ${args.tokenId},
                      "triggerFee": ${args.triggerFee},
                    }
                ),
                "event": "${events[0].eventName}",
                "logIndex": 1,
                "transactionIndex": ${receipt.transactionIndex},
                "transactionHash": HexBytes(
                    "${receipt.transactionHash}"
                ),
                "address": AUCTION_LOAN_LIQUIDATOR_CONTRACT_V6,
                "blockHash": HexBytes(
                    "${receipt.blockHash}"
                ),
                "blockNumber": ${receipt.blockNumber},
                "topics": [
                    ${events[0].topics?.map((topic) => `HexBytes("${topic}")`).join(',')},
                ],
            }
        )
        `);
        return { ...events[0].args, ...receipt };
      },
    };
  }

  private mapAuctionToAuctionArgs(auction: Auction) {
    if ('minBid' in auction) {
      return auction;
    }
    throw new Error('minBid is required for v6 auctions');
  }
}
