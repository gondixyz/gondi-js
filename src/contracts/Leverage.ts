import { Account, Address, Chain, Hash, Transport, WalletClient } from "viem";

import { filterLogs, LoanV5, OfferV5 } from "@/blockchain";
import { getContracts } from "@/deploys";
import { leverageABI } from "@/generated/blockchain/v5";
import { getDomain } from "@/utils";

import { Contract } from "./Contract";

export type Wallet = WalletClient<Transport, Chain, Account>;

export class Leverage extends Contract<typeof leverageABI> {
  mslAddress: Address;

  constructor({
    walletClient,
    mslAddress,
  }: {
    walletClient: Wallet;
    mslAddress: Address;
  }) {
    const { LeverageAddress } = getContracts(walletClient.chain);

    super({
      walletClient,
      address: LeverageAddress,
      abi: leverageABI,
    });

    this.mslAddress = mslAddress;
  }

  async signExecutionData(executionData: {
    offer: OfferV5 & { signature: Hash };
    tokenId: bigint;
    amount: bigint;
    expirationTime: bigint;
    callbackData: Hash;
  }) {
    return this.wallet.signTypedData({
      domain: getDomain(this.wallet.chain.id, this.mslAddress),
      primaryType: "ExecutionData",
      types: {
        ExecutionData: [
          { name: "offer", type: "LoanOffer" },
          { name: "tokenId", type: "uint256" },
          { name: "amount", type: "uint256" },
          { name: "expirationTime", type: "uint256" },
          { name: "callbackData", type: "bytes" },
        ],
        LoanOffer: [
          { name: "offerId", type: "uint256" },
          { name: "lender", type: "address" },
          { name: "fee", type: "uint256" },
          { name: "borrower", type: "address" },
          { name: "capacity", type: "uint256" },
          { name: "nftCollateralAddress", type: "address" },
          { name: "nftCollateralTokenId", type: "uint256" },
          { name: "principalAddress", type: "address" },
          { name: "principalAmount", type: "uint256" },
          { name: "aprBps", type: "uint256" },
          { name: "expirationTime", type: "uint256" },
          { name: "duration", type: "uint256" },
          { name: "validators", type: "OfferValidator[]" },
        ],
        OfferValidator: [
          { name: "validator", type: "address" },
          { name: "arguments", type: "bytes" },
        ],
      } as const,
      message: executionData,
    });
  }

  async signLoan(loan: LoanV5) {
    return this.wallet.signTypedData({
      domain: getDomain(this.wallet.chain.id, this.mslAddress),
      primaryType: "Loan",
      types: {
        Loan: [
          { name: "borrower", type: "address" },
          { name: "nftCollateralTokenId", type: "uint256" },
          { name: "nftCollateralAddress", type: "address" },
          { name: "principalAddress", type: "address" },
          { name: "principalAmount", type: "uint256" },
          { name: "startTime", type: "uint256" },
          { name: "duration", type: "uint256" },
          { name: "source", type: "Source[]" },
        ],
        Source: [
          { name: "loanId", type: "uint256" },
          { name: "lender", type: "address" },
          { name: "principalAmount", type: "uint256" },
          { name: "accruedInterest", type: "uint256" },
          { name: "startTime", type: "uint256" },
          { name: "aprBps", type: "uint256" },
        ],
        RefinanceProceeds: [
          { name: "principalAmount", type: "uint256" },
          { name: "startTime", type: "uint256" },
          { name: "aprBps", type: "uint256" },
          { name: "lender", type: "address" },
        ],
      } as const,
      message: loan,
    });
  }

  async buy({
    leverageBuyData,
    ethToSend,
  }: {
    leverageBuyData: {
      offer: OfferV5 & { signature: Hash };
      expirationTime: bigint;
      amount: bigint;
      nft: {
        collectionContractAddress: Address;
        tokenId: bigint;
        price: bigint;
      };
      callbackData: Hash;
    }[];
    ethToSend: bigint;
  }) {
    const txHash = await this.safeContractWrite.buy(
      [
        await Promise.all(
          leverageBuyData.map(async (data) => ({
            executionData: {
              offer: data.offer,
              tokenId: data.nft.tokenId,
              amount: data.amount,
              expirationTime: data.expirationTime,
              callbackData: data.callbackData,
            },
            lender: data.offer.lender,
            borrower: this.wallet.account.address,
            lenderOfferSignature: data.offer.signature,
            borrowerOfferSignature: await this.signExecutionData({
              offer: data.offer,
              tokenId: data.nft.tokenId,
              amount: data.amount,
              expirationTime: data.expirationTime,
              callbackData: data.callbackData,
            }),
          }))
        ),
      ],
      {
        value: ethToSend,
      }
    );

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
    loan: LoanV5;
    callbackData: Hash;
    shouldDelegate: boolean;
  }) {
    const txHash = await this.safeContractWrite.sell([
      [
        {
          data: {
            loanId: loan.source[0].loanId,
            callbackData,
            shouldDelegate,
          },
          loan,
          borrowerSignature: await this.signLoan(loan),
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
