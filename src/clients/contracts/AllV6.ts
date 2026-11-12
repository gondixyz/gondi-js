import { Address, PublicClient, zeroHash } from 'viem';

import { Auction, LoanV6 } from '@/blockchain';
import { Wallet } from '@/clients/contracts';
import { auctionWithBuyoutLoanLiquidatorAbi as auctionWithBuyoutLoanLiquidatorABIV6 } from '@/generated/blockchain/v6';
import { AuctionIdentity, readAuction, writeWithCurrentAuction } from '@/utils/auction';
import { waitForSucceededReceipt } from '@/utils/blockchain';
import { millisToSeconds } from '@/utils/dates';

import { BaseContract } from './BaseContract';

export class AllV6 extends BaseContract<typeof auctionWithBuyoutLoanLiquidatorABIV6> {
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
      abi: auctionWithBuyoutLoanLiquidatorABIV6,
      publicClient,
    });
  }

  /** Reads the auction's current struct from the chain, with the NFT it auctions (`readAuction`). */
  async getAuction({ auction }: { auction: AuctionIdentity }) {
    return readAuction({ client: this.bcClient, address: this.address, abi: this.abi, auction });
  }

  /** Whether this liquidator records an auction on the collateral; settling clears the record. */
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

  /**
   * Bids on the auction, rebuilding it from the chain when a bid placed since the caller read it
   * makes the liquidator reject the caller's struct.
   */
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
    const txHash = await writeWithCurrentAuction({
      held: { collectionContractAddress, tokenId, auction: this.mapAuctionToAuctionArgs(auction) },
      readCurrent: () => this.getAuction({ auction }),
      write: (current) =>
        this.safeContractWrite.placeBid([
          current.collectionContractAddress,
          current.tokenId,
          current.auction,
          bid,
        ]),
    });
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

  /**
   * Seconds left before bids open, while the loan's main lender may still buy the other lenders
   * out. Before v3.2 that window is the liquidator's current setting, for every auction.
   */
  async getRemainingLockupSeconds({ auction }: { auction: Pick<Auction, 'startTime'> }) {
    const lockupTimeSeconds = await this.contract.read.getTimeForMainLenderToBuy();
    const lockupSeconds = Number(lockupTimeSeconds);
    const ellapsedSeconds = Math.ceil(millisToSeconds(Date.now()) - Number(auction.startTime));

    if (ellapsedSeconds >= lockupSeconds) return 0;
    return lockupSeconds - ellapsedSeconds;
  }

  async settleAuctionWithBuyout({ auction, loan }: { auction: Auction; loan: LoanV6 }) {
    const txHash = await writeWithCurrentAuction({
      held: {
        collectionContractAddress: loan.nftCollateralAddress,
        tokenId: loan.nftCollateralTokenId,
        auction: this.mapAuctionToAuctionArgs(auction),
      },
      readCurrent: () => this.getAuction({ auction }),
      write: (current) =>
        this.safeContractWrite.settleWithBuyout([
          current.collectionContractAddress,
          current.tokenId,
          current.auction,
          loan,
        ]),
    });

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

  async settleAuction({ auction, loan }: { auction: Auction; loan: LoanV6 }) {
    const txHash = await writeWithCurrentAuction({
      held: {
        collectionContractAddress: loan.nftCollateralAddress,
        tokenId: loan.nftCollateralTokenId,
        auction: this.mapAuctionToAuctionArgs(auction),
      },
      readCurrent: () => this.getAuction({ auction }),
      write: (current) => this.safeContractWrite.settleAuction([current.auction, loan]),
    });

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

  private mapAuctionToAuctionArgs(auction: Auction) {
    if ('minBid' in auction) {
      return auction;
    }
    throw new Error('minBid is required for v6 auctions');
  }
}
