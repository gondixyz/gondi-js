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
      this.wallet.account.address,
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
      this.wallet.account.address,
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
      this.wallet.account.address,
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
        if (events.length == 0) throw new Error("Offer not cancelled");
        return { ...events[0].args, ...receipt };
      },
    };
  }

  async cancelAllRenegotiations({ minId }: { minId: bigint }) {
    const txHash = await this.contract.write.cancelAllRenegotiationOffers([
      this.wallet.account.address,
      minId,
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
        if (events.length == 0) throw new Error("Offer not cancelled");
        return { ...events[0].args, ...receipt };
      },
    };
  }

  async emitLoan({
    offer,
    signature,
    tokenId,
  }: {
    offer: model.BlockchainOffer;
    signature: Hash;
    tokenId: bigint;
  }) {
    const txHash = await this.contract.write.emitLoan([
      {
        offer,
        tokenId,
        amount: 0n, // TODO: fix this
        borrower: offer.borrower,
        lenderOfferSignature: signature,
        borrowerOfferSignature: "0x0", // TODO: fix this
        callbackData: "0x0", // TODO: fix this
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
    const txHash = await this.contract.write.repayLoan([
      {
        loanId: loan.source[0].loanId,
        loan,
        borrowerLoanSignature: "0x0", // TODO: fix this
        callbackData: "0x0", // TODO: fix this,
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
