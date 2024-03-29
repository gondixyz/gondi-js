import { Account, Address, Chain, Transport, WalletClient } from 'viem';

import { filterLogs, LoanV5 } from '@/blockchain';
import { getContracts } from '@/deploys';
import { auctionLoanLiquidatorABI as auctionLoanLiquidatorABIV5 } from '@/generated/blockchain/v5';
import * as model from '@/model';

import { Contract } from './Contract';

export type Wallet = WalletClient<Transport, Chain, Account>;

export class AllV5 extends Contract<typeof auctionLoanLiquidatorABIV5> {
  constructor({ walletClient }: { walletClient: Wallet }) {
    const { AuctionLoanLiquidatorV5Address } = getContracts(walletClient.chain);

    super({
      walletClient,
      address: AuctionLoanLiquidatorV5Address,
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
    auction: model.Auction;
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

        const filter = await this.contract.createEventFilter.BidPlaced();
        const events = filterLogs(receipt, filter);
        if (events.length === 0) throw new Error('Bid not placed');
        return { ...events[0].args, ...receipt };
      },
    };
  }

  async settleAuction({ auction, loan }: { auction: model.Auction; loan: LoanV5 }) {
    const txHash = await this.safeContractWrite.settleAuction([auction, loan]);

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
}
