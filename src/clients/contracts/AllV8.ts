import { Address, PublicClient, zeroHash } from 'viem';

import { Auction, AuctionV8, LoanV8 } from '@/blockchain';
import { Wallet } from '@/clients/contracts';
import { auctionWithBuyoutLoanLiquidatorAbi as auctionWithBuyoutLoanLiquidatorABIV8 } from '@/generated/blockchain/v8';
import { waitForSucceededReceipt } from '@/utils/blockchain';
import { millisToSeconds } from '@/utils/dates';

import { BaseContract } from './BaseContract';

/**
 * The AuctionLoanLiquidator of contract version 3.2. Its `Auction` struct carries `loanHash` and
 * `buyoutWindow` on top of the version 3 struct, and an outbid bidder whose refund transfer failed
 * claims it with `claimRefund`.
 */
export class AllV8 extends BaseContract<typeof auctionWithBuyoutLoanLiquidatorABIV8> {
  constructor({
    walletClient,
    address,
    publicClient,
  }: {
    walletClient: Wallet;
    address: Address;
    publicClient?: PublicClient;
  }) {
    super({
      walletClient,
      address,
      abi: auctionWithBuyoutLoanLiquidatorABIV8,
      publicClient,
    });
  }

  async hasAuction({
    collectionContractAddress,
    tokenId,
  }: {
    collectionContractAddress: Address;
    tokenId: bigint;
  }) {
    const auctionHash = await this.contract.read.getAuctionHash([
      collectionContractAddress,
      tokenId,
    ]);
    return auctionHash !== zeroHash;
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
        const receipt = await waitForSucceededReceipt(this.bcClient, txHash);
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

  async settleAuctionWithBuyout({ auction, loan }: { auction: Auction; loan: LoanV8 }) {
    const txHash = await this.safeContractWrite.settleWithBuyout([
      loan.nftCollateralAddress,
      loan.nftCollateralTokenId,
      this.mapAuctionToAuctionArgs(auction),
      loan,
    ]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await waitForSucceededReceipt(this.bcClient, txHash);
        const events = this.parseEventLogs('AuctionSettledWithBuyout', receipt.logs);
        if (events.length === 0) throw new Error('Auction not settled');
        return { ...events[0].args, ...receipt };
      },
    };
  }

  async settleAuction({ auction, loan }: { auction: Auction; loan: LoanV8 }) {
    const txHash = await this.safeContractWrite.settleAuction([
      this.mapAuctionToAuctionArgs(auction),
      loan,
    ]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await waitForSucceededReceipt(this.bcClient, txHash);
        const events = this.parseEventLogs('AuctionSettled', receipt.logs);
        if (events.length === 0) throw new Error('Auction not settled');
        return { ...events[0].args, ...receipt };
      },
    };
  }

  /** The bid refund in `token` that the liquidator holds for `bidder` because its transfer failed. */
  async getPendingRefund({ bidder, token }: { bidder: Address; token: Address }) {
    return this.contract.read.getPendingRefunds([bidder, token]);
  }

  /** Sends the wallet the bid refund in `token` the liquidator holds for it. */
  async claimRefund({ token }: { token: Address }) {
    const txHash = await this.safeContractWrite.claimRefund([token]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await waitForSucceededReceipt(this.bcClient, txHash);
        const events = this.parseEventLogs('BidRefundWithdrawn', receipt.logs);
        if (events.length === 0) throw new Error('Refund not claimed');
        return { ...events[0].args, ...receipt };
      },
    };
  }

  private mapAuctionToAuctionArgs(auction: Auction): AuctionV8 {
    if ('loanHash' in auction) {
      return auction;
    }
    throw new Error('loanHash and buyoutWindow are required for v3.2 auctions');
  }
}
