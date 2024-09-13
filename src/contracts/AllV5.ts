import { Address } from 'viem';

import { Auction, LoanV5 } from '@/blockchain';
import { Wallet } from '@/contracts';
import { getContracts } from '@/deploys';
import { auctionLoanLiquidatorABI as auctionLoanLiquidatorABIV5 } from '@/generated/blockchain/v5';

import { AllV6 } from './AllV6';
import { BaseContract } from './BaseContract';

export class AllV5 extends BaseContract<typeof auctionLoanLiquidatorABIV5> {
  constructor({ walletClient }: { walletClient: Wallet }) {
    const {
      AuctionLoanLiquidator: { v5 },
    } = getContracts(walletClient.chain);

    super({
      walletClient,
      address: v5,
      abi: auctionLoanLiquidatorABIV5,
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
      auction,
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

  getRemainingLockupSeconds() {
    return 0;
  }

  async settleAuctionWithBuyout(): ReturnType<AllV6['settleAuctionWithBuyout']> {
    throw new Error('Not implemented for V2');
  }

  async settleAuction({ auction, loan }: { auction: Auction; loan: LoanV5 }) {
    const txHash = await this.safeContractWrite.settleAuction([auction, loan]);

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
}
