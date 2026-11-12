import { Address, PublicClient, zeroHash } from 'viem';

import { Auction, AuctionV8, LoanV8 } from '@/blockchain';
import { Wallet } from '@/clients/contracts';
import { auctionWithBuyoutLoanLiquidatorAbi as auctionWithBuyoutLoanLiquidatorABIV8 } from '@/generated/blockchain/v8';
import { AuctionIdentity, readAuction, writeWithCurrentAuction } from '@/utils/auction';
import { waitForSucceededReceipt } from '@/utils/blockchain';
import { millisToSeconds } from '@/utils/dates';

import { BaseContract } from './BaseContract';

/** Buyout windows by `liquidator:loanAddress:loanId:startTime`, lowercased. */
export type BuyoutWindows = Map<string, Promise<bigint>>;

/**
 * The AuctionLoanLiquidator of contract version 3.2. Its `Auction` struct carries `loanHash` and
 * `buyoutWindow` on top of the version 3 struct, and an outbid bidder whose refund transfer failed
 * claims it with `claimRefund`.
 */
export class AllV8 extends BaseContract<typeof auctionWithBuyoutLoanLiquidatorABIV8> {
  /**
   * The `buyoutWindow` each auction recorded when it started, read once per auction. `Contracts`
   * passes the one it keeps for the whole `Gondi`, since it builds a new liquidator on every call.
   */
  private buyoutWindows: BuyoutWindows;

  constructor({
    walletClient,
    address,
    publicClient,
    buyoutWindows = new Map(),
  }: {
    walletClient: Wallet;
    address: Address;
    publicClient?: PublicClient;
    buyoutWindows?: BuyoutWindows;
  }) {
    super({
      walletClient,
      address,
      abi: auctionWithBuyoutLoanLiquidatorABIV8,
      publicClient,
    });
    this.buyoutWindows = buyoutWindows;
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

  /**
   * Reads the auction's current struct from the chain, with the NFT it auctions (see
   * `readAuction`), including the `loanHash` and `buyoutWindow` only its start event carries.
   */
  async getAuction({ auction }: { auction: AuctionIdentity }) {
    const current = await readAuction({
      client: this.bcClient,
      address: this.address,
      abi: this.abi,
      auction,
    });
    return { ...current, auction: this.mapAuctionToAuctionArgs(current.auction) };
  }

  /**
   * Bids on the auction, rebuilding it from the chain when the caller's struct lacks the v3.2
   * fields or a bid placed since the caller read it makes the liquidator reject it.
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
      held: this.heldAuction({ collectionContractAddress, tokenId, auction }),
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
   * out. v3.2 snapshots that window into each auction when it starts, and it is 0 when the main
   * lender is a pool, so the liquidator's current setting does not apply. The window comes from
   * the caller's struct when it has one, and from the chain once per auction otherwise.
   */
  async getRemainingLockupSeconds({
    auction,
  }: {
    auction: AuctionIdentity & Partial<Pick<AuctionV8, 'buyoutWindow'>>;
  }) {
    const buyoutWindow = auction.buyoutWindow ?? (await this.readBuyoutWindow(auction));
    const remainingSeconds =
      Number(auction.startTime) + Number(buyoutWindow) - Math.ceil(millisToSeconds(Date.now()));
    return Math.max(remainingSeconds, 0);
  }

  private readBuyoutWindow(auction: AuctionIdentity) {
    const key = [this.address, auction.loanAddress, auction.loanId, auction.startTime]
      .join(':')
      .toLowerCase();
    const cached = this.buyoutWindows.get(key);
    if (cached) return cached;
    const read = this.getAuction({ auction }).then((current) => current.auction.buyoutWindow);
    read.catch(() => this.buyoutWindows.delete(key));
    this.buyoutWindows.set(key, read);
    return read;
  }

  async settleAuctionWithBuyout({ auction, loan }: { auction: Auction; loan: LoanV8 }) {
    const txHash = await writeWithCurrentAuction({
      held: this.heldAuction({
        collectionContractAddress: loan.nftCollateralAddress,
        tokenId: loan.nftCollateralTokenId,
        auction,
      }),
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

  async settleAuction({ auction, loan }: { auction: Auction; loan: LoanV8 }) {
    const txHash = await writeWithCurrentAuction({
      held: this.heldAuction({
        collectionContractAddress: loan.nftCollateralAddress,
        tokenId: loan.nftCollateralTokenId,
        auction,
      }),
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

  /** The caller's auction with its NFT, or undefined when the struct is not a v3.2 one. */
  private heldAuction({
    collectionContractAddress,
    tokenId,
    auction,
  }: {
    collectionContractAddress: Address;
    tokenId: bigint;
    auction: Auction;
  }) {
    return 'loanHash' in auction ? { collectionContractAddress, tokenId, auction } : undefined;
  }

  private mapAuctionToAuctionArgs(auction: Auction): AuctionV8 {
    if ('loanHash' in auction) {
      return auction;
    }
    throw new Error('loanHash and buyoutWindow are required for v3.2 auctions');
  }
}
