import { Account, Address, Chain, Hash, Transport, WalletClient } from "viem";

import { filterLogs, LoanV5, OfferV5, RenegotiationV5 } from "@/blockchain";
import { getContracts } from "@/deploys";
import { multiSourceLoanABI as multiSourceLoanABIV5 } from "@/generated/blockchain/v5";
import { getDomain } from "@/utils";

import { Contract } from "./Contract";

export type Wallet = WalletClient<Transport, Chain, Account>;

export class MslV5 extends Contract<typeof multiSourceLoanABIV5> {
  constructor({ walletClient }: { walletClient: Wallet }) {
    const { MultiSourceLoanV5Address } = getContracts(walletClient.chain);

    super({
      walletClient,
      address: MultiSourceLoanV5Address,
      abi: multiSourceLoanABIV5,
    });
  }

  async signOffer({
    verifyingContract,
    structToSign,
  }: {
    verifyingContract: Address;
    structToSign: OfferV5;
  }) {
    return this.wallet.signTypedData({
      domain: getDomain(this.wallet.chain.id, verifyingContract),
      primaryType: "LoanOffer",
      types: {
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
      },
      message: structToSign,
    });
  }

  async signRenegotiationOffer({
    verifyingContract,
    structToSign,
  }: {
    verifyingContract: Address;
    structToSign: RenegotiationV5;
  }) {
    return this.wallet.signTypedData({
      domain: getDomain(this.wallet.chain.id, verifyingContract),
      primaryType: "RenegotiationOffer",
      types: {
        RenegotiationOffer: [
          { name: "renegotiationId", type: "uint256" },
          { name: "loanId", type: "uint256" },
          { name: "lender", type: "address" },
          { name: "fee", type: "uint256" },
          { name: "targetPrincipal", type: "uint256[]" },
          { name: "principalAmount", type: "uint256" },
          { name: "aprBps", type: "uint256" },
          { name: "expirationTime", type: "uint256" },
          { name: "duration", type: "uint256" },
        ],
      },
      message: structToSign,
    });
  }

  async cancelOffer({ id }: { id: bigint }) {
    const txHash = await this.safeContractWrite.cancelOffer([id]);
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
    const txHash = await this.safeContractWrite.cancelAllOffers([minId]);

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
    const txHash = await this.safeContractWrite.cancelRenegotiationOffer([id]);
    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const filter =
          await this.contract.createEventFilter.RenegotiationOfferCancelled();
        const events = filterLogs(receipt, filter);
        if (events.length == 0)
          throw new Error("Renegotiation offer not cancelled");
        return { ...events[0].args, ...receipt };
      },
    };
  }

  async cancelAllRenegotiations({ minId }: { minId: bigint }) {
    const txHash = await this.safeContractWrite.cancelAllRenegotiationOffers([
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
        if (events.length == 0)
          throw new Error("Renegotiation offers not cancelled");
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
    offer: OfferV5;
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

    const txHash = await this.safeContractWrite.emitLoan([
      {
        executionData,
        borrower: this.wallet.account.address,
        lenderOfferSignature: signature,
        borrowerOfferSignature: "0x", // No signature data is expected here, only for BNPL [Levearage call]
        lender: offer.lender,
        callbackData: "0x", // No callback data is expected here, only for BNPL [Levearage call]
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

  async repayLoan({ loan }: { loan: LoanV5 }) {
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
    const txHash = await this.safeContractWrite.repayLoan([
      {
        loanId: loan.source[0].loanId,
        loan,
        borrowerLoanSignature: "0x", // No signature data is expected here, only for BNPL [Levearage call]
        shouldDelegate: false, // No need to delegate
        callbackData: "0x", // No callback data is expected here, only for BNPL [Levearage call]
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
    offer: RenegotiationV5;
    signature: Hash;
    loan: LoanV5;
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
    offer: RenegotiationV5;
    loan: LoanV5;
  }) {
    const txHash = await this.safeContractWrite.refinancePartial([offer, loan]);
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

  async liquidateLoan({ loan }: { loan: LoanV5 }) {
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
