import { Address } from 'viem';

import { Auction, LoanV6 } from '@/blockchain';
import { Wallet } from '@/clients/contracts';
import { auctionWithBuyoutLoanLiquidatorAbi as auctionWithBuyoutLoanLiquidatorABIV6 } from '@/generated/blockchain/v6';
import { millisToSeconds } from '@/utils/dates';

import { BaseContract } from './BaseContract';

export class AllV6 extends BaseContract<typeof auctionWithBuyoutLoanLiquidatorABIV6> {
  constructor({ walletClient, address }: { walletClient: Wallet; address: Address }) {
    super({
      walletClient,
      address,
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
        const events = this.parseEventLogs('BidPlaced', receipt.logs);
        if (events.length === 0) throw new Error('Bid not placed');
        return { ...events[0].args, ...receipt };
      },
    };
  }

  async getRemainingLockupSeconds({ auction }: { auction: Pick<Auction, 'startTime'> }) {
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
        const events = this.parseEventLogs('AuctionSettledWithBuyout', receipt.logs);
        if (events.length === 0) throw new Error('Auction not settled');
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
        const events = this.parseEventLogs('AuctionSettled', receipt.logs);
        if (events.length === 0) throw new Error('Auction not settled');
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
