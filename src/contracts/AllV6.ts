import { Address } from 'viem';

import { Auction, filterLogs, LoanV6 } from '@/blockchain';
import { Wallet } from '@/contracts';
import { getContracts } from '@/deploys';
import { auctionWithBuyoutLoanLiquidatorAbi as auctionWithBuyoutLoanLiquidatorABIV6 } from '@/generated/blockchain/v6';

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
        return { ...events[0].args, ...receipt };
      },
    };
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

        const filter = await this.contract.createEventFilter.AuctionSettled();
        const events = filterLogs(receipt, filter);
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

        const filter = await this.contract.createEventFilter.AuctionSettled();
        const events = filterLogs(receipt, filter);
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
