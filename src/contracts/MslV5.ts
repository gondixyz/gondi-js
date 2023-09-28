import {
  Account,
  Address,
  Chain,
  createPublicClient,
  createTransport,
  getContract,
  GetContractReturnType,
  Hash,
  PublicClient,
  Transport,
  WalletClient,
} from "viem";

import { filterLogs } from "@/blockchain";
import { getContracts } from "@/deploys";
import { multiSourceLoanABI as multiSourceLoanABIV5 } from "@/generated/blockchain/v5";
import * as model from "@/model";

export type Wallet = WalletClient<Transport, Chain, Account>;

export class MslV5 {
  address: Address;
  wallet: Wallet;
  bcClient: PublicClient<Transport, Chain>;
  contract: GetContractReturnType<
    typeof multiSourceLoanABIV5,
    PublicClient,
    Wallet,
    Address
  >;

  constructor({
    publicClient,
    walletClient,
  }: {
    publicClient: PublicClient;
    walletClient: Wallet;
  }) {
    const { MultiSourceLoanV5Address } = getContracts(walletClient.chain);

    this.wallet = walletClient;
    this.bcClient = createPublicClient({
      transport: ({ chain: _chain }: { chain?: Chain }) =>
        createTransport(walletClient.transport),
    });
    this.address = MultiSourceLoanV5Address;
    this.contract = getContract({
      address: MultiSourceLoanV5Address,
      abi: multiSourceLoanABIV5,
      walletClient,
      publicClient,
    });
  }

  async cancelOffer({ id }: { id: bigint }) {
    const txHash = await this.contract.write.cancelOffer([
      id,
    ]);
    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });

        const filter = await this.contract.createEventFilter.OfferCancelled();
        const events = filterLogs(receipt, filter);
        if (events.length == 0) throw new Error("Offer not cancelled");
        return { ...events[0].args, ...receipt };
      },
    };
  }

  async cancelAllOffers({ minId }: { minId: bigint }) {
    const txHash = await this.contract.write.cancelAllOffers([
      minId,
    ]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const filter =
          await this.contract.createEventFilter.AllOffersCancelled();
        const events = filterLogs(receipt, filter);
        if (events.length == 0) throw new Error("Offers not cancelled");
        return { ...events[0].args, ...receipt };
      },
    };
  }

  async cancelRefinanceOffer({ id }: { id: bigint }) {
    const txHash = await this.contract.write.cancelRenegotiationOffer([
      id,
    ]);
    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const filter =
          await this.contract.createEventFilter.RenegotiationOfferCancelled();
        const events = filterLogs(receipt, filter);
        if (events.length == 0) throw new Error("Renegotiation offer not cancelled");
        return { ...events[0].args, ...receipt };
      },
    };
  }

  async cancelAllRenegotiations({ minId }: { minId: bigint }) {
    const txHash = await this.contract.write.cancelAllRenegotiationOffers([
      minId,
    ]);
    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const filter =
          await this.contract.createEventFilter.AllRenegotiationOffersCancelled();
        const events = filterLogs(receipt, filter);
        if (events.length == 0) throw new Error("Renegotiation offers not cancelled");
        return { ...events[0].args, ...receipt };
      },
    };
  }

  async emitLoan({
    offer,
    signature,
    tokenId,
    amount,
    expirationTime,
  }: {
    offer: model.BlockchainOffer;
    signature: Hash;
    tokenId: bigint;
    amount: bigint;
    expirationTime: bigint;
  }) {
    const executionData = {
      offer,
      tokenId,
      amount,
      expirationTime,
    };
    // const borrowerOfferSignature = await this.wallet.signTypedData({
    //   domain: getDomain(this.wallet.chain.id, this.address),
    //   primaryType: "ExecutionData",
    //   types: {
    //     ExecutionData: [
    //       { name: "offer", type: "LoanOffer" },
    //       { name: "tokenId", type: "uint256" },
    //       { name: "amount", type: "uint256" },
    //       { name: "expirationTime", type: "uint256" },
    //     ],
    //     LoanOffer: [
    //       { name: "offerId", type: "uint256" },
    //       { name: "lender", type: "address" },
    //       { name: "fee", type: "uint256" },
    //       { name: "borrower", type: "address" },
    //       { name: "capacity", type: "uint256" },
    //       { name: "nftCollateralAddress", type: "address" },
    //       { name: "nftCollateralTokenId", type: "uint256" },
    //       { name: "principalAddress", type: "address" },
    //       { name: "principalAmount", type: "uint256" },
    //       { name: "aprBps", type: "uint256" },
    //       { name: "expirationTime", type: "uint256" },
    //       { name: "duration", type: "uint256" },
    //       { name: "validators", type: "OfferValidator[]" },
    //     ],
    //     OfferValidator: [
    //       { name: "validator", type: "address" },
    //       { name: "arguments", type: "bytes" },
    //     ],
    //   },
    //   message: executionData,
    // });

    const txHash = await this.contract.write.emitLoan([
      {
        executionData,
        borrower: offer.borrower,
        lenderOfferSignature: signature,
        borrowerOfferSignature: "0x0", // No signature data is expected here, only for BNPL [Levearage call]
        callbackData: "0x0", // No callback data is expected here, only for BNPL [Levearage call]
      },
    ]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const filter = await this.contract.createEventFilter.LoanEmitted();
        const events = filterLogs(receipt, filter);
        if (events.length == 0) throw new Error("Loan not emitted");
        const args = events[0].args;
        return {
          loan: {
            id: `${this.contract.address.toLowerCase()}.${args.loanId}`,
            ...args.loan,
            contractAddress: this.contract.address,
          },
          offerId: `${this.contract.address.toLowerCase()}.${offer.lender.toLowerCase()}.${
            args.offerId
          }`,
          ...receipt,
        };
      },
    };
  }

  async repayLoan({ loan }: { loan: model.Loan }) {
    // const borrowerLoanSignature = await this.wallet.signTypedData({
    //   domain: getDomain(this.wallet.chain.id, this.address),
    //   primaryType: "Loan",
    //   types: {
    //     Loan: [
    //       { name: 'borrower', type: 'address' },
    //       { name: 'nftCollateralTokenId', type: 'uint256' },
    //       { name: 'nftCollateralAddress', type: 'address' },
    //       { name: 'principalAddress', type: 'address' },
    //       { name: 'principalAmount', type: 'uint256' },
    //       { name: 'startTime', type: 'uint256' },
    //       { name: 'duration', type: 'uint256' },
    //       { name: "source", type: "Source[]" },
    //     ],
    //     Source: [
    //       { name: 'loanId', type: 'uint256' },
    //       { name: 'lender', type: 'address' },
    //       { name: 'principalAmount', type: 'uint256' },
    //       { name: 'accruedInterest', type: 'uint256' },
    //       { name: 'startTime', type: 'uint256' },
    //       { name: 'aprBps', type: 'uint256' },
    //     ],
    //   },
    //   message: loan,
    // });
    const txHash = await this.contract.write.repayLoan([
      {
        loanId: loan.source[0].loanId,
        loan,
        borrowerLoanSignature: "0x0", // No signature data is expected here, only for BNPL [Levearage call]
        callbackData: "0x0", // No callback data is expected here, only for BNPL [Levearage call]
      },
    ]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const filter = await this.contract.createEventFilter.LoanRepaid();
        const events = filterLogs(receipt, filter);
        if (events.length == 0) throw new Error("Loan not repaid");
        return { ...events[0].args, ...receipt };
      },
    };
  }

  async refinanceFullLoan({
    offer,
    signature,
    loan,
  }: {
    offer: model.BlockchainRenegotiation;
    signature: Hash;
    loan: model.Loan;
  }) {
    const txHash = await this.contract.write.refinanceFull([
      offer,
      loan,
      signature,
    ]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const filter = await this.contract.createEventFilter.LoanRefinanced();
        const events = filterLogs(receipt, filter);
        if (events.length == 0) throw new Error("Loan not refinanced");
        const args = events[0].args;
        return {
          loan: {
            id: `${this.contract.address.toLowerCase()}.${args.newLoanId}`,
            ...args.loan,
            contractAddress: this.contract.address,
          },
          renegotiationId: `${this.contract.address.toLowerCase()}.${offer.lender.toLowerCase()}.${
            args.renegotiationId
          }`,
          ...receipt,
        };
      },
    };
  }

  async refinancePartialLoan({
    offer,
    loan,
  }: {
    offer: model.BlockchainRenegotiation;
    loan: model.Loan;
  }) {
    const txHash = await this.contract.write.refinancePartial([offer, loan]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const filter = await this.contract.createEventFilter.LoanRefinanced();
        const events = filterLogs(receipt, filter);
        if (events.length == 0) throw new Error("Loan not refinanced");
        const args = events[0].args;
        return {
          loan: {
            id: `${this.contract.address.toLowerCase()}.${args.newLoanId}`,
            ...args.loan,
            contractAddress: this.contract.address,
          },
          renegotiationId: `${this.contract.address.toLowerCase()}.${offer.lender.toLowerCase()}.${
            args.renegotiationId
          }`,
          ...receipt,
        };
      },
    };
  }

  async liquidateLoan({ loan }: { loan: model.Loan }) {
    const txHash = await this.contract.write.liquidateLoan([
      loan.source[0].loanId,
      loan,
    ]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const filterForeclosed =
          await this.contract.createEventFilter.LoanForeclosed();
        const filterSentToLiquidator =
          await this.contract.createEventFilter.LoanSentToLiquidator();
        const foreclosedEvents = filterLogs(receipt, filterForeclosed);
        const sentToLiquidatorEvents = filterLogs(
          receipt,
          filterSentToLiquidator
        );
        if (
          foreclosedEvents.length === 0 &&
          sentToLiquidatorEvents.length === 0
        )
          throw new Error("Loan not liquidated");
        return {
          ...(foreclosedEvents?.[0]?.args ?? sentToLiquidatorEvents?.[0]?.args),
          ...receipt,
        };
      },
    };
  }
}
