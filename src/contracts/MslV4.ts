import { Account, Address, Chain, Hash, Transport, WalletClient } from "viem";

import { filterLogs } from "@/blockchain";
import { getContracts } from "@/deploys";
import { multiSourceLoanABI as multiSourceLoanABIV4 } from "@/generated/blockchain/v4";
import * as model from "@/model";

import { Contract } from "./Contract";

export type Wallet = WalletClient<Transport, Chain, Account>;

export class MslV4 extends Contract<typeof multiSourceLoanABIV4> {
  constructor({ walletClient }: { walletClient: Wallet }) {
    const { MultiSourceLoanV4Address } = getContracts(walletClient.chain);

    super({
      walletClient,
      address: MultiSourceLoanV4Address,
      abi: multiSourceLoanABIV4,
    });
  }

  async cancelOffer({ id }: { id: bigint }) {
    const txHash = await this.safeContractWrite.cancelOffer([
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
    const txHash = await this.safeContractWrite.cancelAllOffers([
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
    const txHash = await this.safeContractWrite.cancelRenegotiationOffer([
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
    const txHash = await this.safeContractWrite.cancelAllRenegotiationOffers([
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
    const txHash = await this.safeContractWrite.emitLoan([
      offer,
      tokenId,
      signature,
      false,
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

  async repayLoan({
    loan,
    nftReceiver,
  }: {
    loan: model.Loan;
    nftReceiver?: Address;
  }) {
    const receiver = nftReceiver ?? this.wallet.account.address;

    const txHash = await this.safeContractWrite.repayLoan([
      receiver,
      loan.source[0].loanId,
      loan,
      false,
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
    const txHash = await this.safeContractWrite.refinanceFull([
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
            contractAddress: this.address,
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
    const txHash = await this.safeContractWrite.refinancePartial([
      offer,
      loan,
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

  async liquidateLoan({ loan }: { loan: model.Loan }) {
    const txHash = await this.safeContractWrite.liquidateLoan([
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
