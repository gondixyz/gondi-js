import {
  Account,
  Address,
  Chain,
  encodeAbiParameters,
  Transport,
  WalletClient,
} from "viem";

import { filterLogs } from "@/blockchain";
import { getContracts } from "@/deploys";
import { auctionLoanLiquidatorABI as auctionLoanLiquidatorABIV5 } from "@/generated/blockchain/v5";
import * as model from "@/model";

import { Contract } from "./Contract";

export type Wallet = WalletClient<Transport, Chain, Account>;

export class AllV5 extends Contract<typeof auctionLoanLiquidatorABIV5> {
  static LOAN_SETTLEMENT_ENCODE_TYPES = [
    {
      name: "",
      type: "tuple",
      components: [
        { name: "borrower", type: "address" },
        { name: "nftCollateralTokenId", type: "uint256" },
        { name: "nftCollateralAddress", type: "address" },
        { name: "principalAddress", type: "address" },
        { name: "principalAmount", type: "uint256" },
        { name: "startTime", type: "uint256" },
        { name: "duration", type: "uint256" },
        {
          name: "source",
          type: "tuple[]",
          components: [
            { name: "loanId", internalType: "uint256", type: "uint256" },
            { name: "lender", internalType: "address", type: "address" },
            {
              name: "principalAmount",
              internalType: "uint256",
              type: "uint256",
            },
            {
              name: "accruedInterest",
              internalType: "uint256",
              type: "uint256",
            },
            { name: "startTime", internalType: "uint256", type: "uint256" },
            { name: "aprBps", internalType: "uint256", type: "uint256" },
          ],
        },
        // TODO: we probably need refinance proceeds here
      ],
    },
  ];

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
        if (events.length == 0) throw new Error("Bid not placed");
        return { ...events[0].args, ...receipt };
      },
    };
  }

  async settleAuction({
    collectionContractAddress,
    tokenId,
    loan,
    auction,
  }: {
    collectionContractAddress: Address;
    tokenId: bigint;
    loan: model.Loan;
    auction: model.Auction;
  }) {
    const loanStruct = {
      ...loan,
      source: loan.source.map((source) => [
        source.loanId,
        source.lender,
        source.principalAmount,
        source.accruedInterest,
        source.startTime,
        source.aprBps,
      ]),
    };

    const txHash = await this.safeContractWrite.settleAuction([
      collectionContractAddress,
      tokenId,
      auction,
      encodeAbiParameters(AllV5.LOAN_SETTLEMENT_ENCODE_TYPES, [loanStruct]),
    ]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });

        const filter = await this.contract.createEventFilter.AuctionSettled();
        const events = filterLogs(receipt, filter);
        if (events.length == 0) throw new Error("Auction not settled");
        return { ...events[0].args, ...receipt };
      },
    };
  }
}
