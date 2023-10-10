import { Account, Address, Chain, Hash, Transport, WalletClient } from "viem";

import { filterLogs, OfferV5 as BlockchainOfferV5 } from "@/blockchain";
import { getContracts } from "@/deploys";
import { leverageABI } from "@/generated/blockchain/v5";
import * as model from "@/model";

import { Contract } from "./Contract";

export type Wallet = WalletClient<Transport, Chain, Account>;

export class Leverage extends Contract<typeof leverageABI> {
  constructor({ walletClient }: { walletClient: Wallet }) {
    const { LeverageAddress } = getContracts(walletClient.chain);

    super({
      walletClient,
      address: LeverageAddress,
      abi: leverageABI,
    });
  }

  async buy({
    leverageBuyData,
  }: {
    leverageBuyData: {
      offer: BlockchainOfferV5 & { signature: Hash };
      expirationTime: bigint;
      amount: bigint;
      nft: {
        collectionContractAddress: Address;
        tokenId: bigint;
        price: bigint;
      };
      callbackData: Hash;
    }[];
  }) {
    const txHash = await this.safeContractWrite.buy([
      leverageBuyData.map((data) => ({
        executionData: {
          offer: data.offer,
          tokenId: data.nft.tokenId,
          amount: data.amount,
          expirationTime: data.expirationTime,
        },
        lender: data.offer.lender,
        borrower: this.wallet.account.address,
        lenderOfferSignature: data.offer.signature,
        borrowerOfferSignature: "0x0", // TODO: fix this
        callbackData: data.callbackData,
      })),
    ]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });

        const filter = await this.contract.createEventFilter.BNPLLoansStarted();
        const events = filterLogs(receipt, filter);
        if (events.length == 0) throw new Error("BNPL Loans not started");
        return { ...events[0].args, ...receipt };
      },
    };
  }

  async sell({
    loan,
    callbackData,
    shouldDelegate,
  }: {
    loan: model.Loan;
    callbackData: Hash;
    shouldDelegate: boolean;
  }) {
    const txHash = await this.safeContractWrite.sell([
      [
        {
          loanId: loan.source[0].loanId,
          loan,
          callbackData,
          shouldDelegate,
          borrowerLoanSignature: "0x0", // TODO: fix this
        },
      ],
    ]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });

        const filter =
          await this.contract.createEventFilter.SellAndRepayExecuted();
        const events = filterLogs(receipt, filter);
        if (events.length == 0) throw new Error("Sell and repay not executed");
        return { ...events[0].args, ...receipt };
      },
    };
  }
}
