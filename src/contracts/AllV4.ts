import {
  Account,
  Address,
  Chain,
  encodeAbiParameters,
  Transport,
  WalletClient,
} from "viem";

import { filterLogs, LoanV4 } from "@/blockchain";
import { getContracts } from "@/deploys";
import { auctionLoanLiquidatorABI as auctionLoanLiquidatorABIV4 } from "@/generated/blockchain/v4";

import { Contract } from "./Contract";

export type Wallet = WalletClient<Transport, Chain, Account>;

export class AllV4 extends Contract<typeof auctionLoanLiquidatorABIV4> {
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
      ],
    },
  ];

  constructor({ walletClient }: { walletClient: Wallet }) {
    const { AuctionLoanLiquidatorV4Address } = getContracts(walletClient.chain);

    super({
      walletClient,
      address: AuctionLoanLiquidatorV4Address,
      abi: auctionLoanLiquidatorABIV4,
    });
  }

  async placeBid({
    collectionContractAddress,
    tokenId,
    bid,
  }: {
    collectionContractAddress: Address;
    tokenId: bigint;
    bid: bigint;
  }) {
    const txHash = await this.safeContractWrite.placeBid([
      collectionContractAddress,
      tokenId,
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
  }: {
    collectionContractAddress: Address;
    tokenId: bigint;
    loan: LoanV4;
  }) {
    const loanStruct = {
      ...loan,
      source: loan.source.map((source) => [
        Number(source.loanId),
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
      encodeAbiParameters(AllV4.LOAN_SETTLEMENT_ENCODE_TYPES, [loanStruct]),
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
