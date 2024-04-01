import { Address, Hash, zeroAddress } from 'viem';

import { filterLogs, LoanV4, OfferV4, RenegotiationV4 } from '@/blockchain';
import { Wallet } from '@/contracts';
import { getContracts } from '@/deploys';
import { multiSourceLoanABI as multiSourceLoanABIV4 } from '@/generated/blockchain/v4';
import { EmitLoanArgs } from '@/gondi';
import { CONTRACT_DOMAIN_NAME } from '@/utils/string';

import { BaseContract } from './BaseContract';
import { MslV5 } from './MslV5';
import { MslV6 } from './MslV6';

export class MslV4 extends BaseContract<typeof multiSourceLoanABIV4> {
  constructor({ walletClient }: { walletClient: Wallet }) {
    const {
      MultiSourceLoan: { v4 },
    } = getContracts(walletClient.chain);

    super({
      walletClient,
      address: v4,
      abi: multiSourceLoanABIV4,
    });
  }

  private getDomain() {
    return {
      name: CONTRACT_DOMAIN_NAME,
      version: '1',
      chainId: this.wallet.chain.id,
      verifyingContract: this.address,
    };
  }

  async signOffer({ structToSign }: { structToSign: OfferV4 }) {
    return this.wallet.signTypedData({
      domain: this.getDomain(),
      primaryType: 'LoanOffer',
      types: {
        LoanOffer: [
          { name: 'offerId', type: 'uint256' },
          { name: 'lender', type: 'address' },
          { name: 'fee', type: 'uint256' },
          { name: 'borrower', type: 'address' },
          { name: 'capacity', type: 'uint256' },
          { name: 'signer', type: 'address' },
          { name: 'requiresLiquidation', type: 'bool' },
          { name: 'nftCollateralAddress', type: 'address' },
          { name: 'nftCollateralTokenId', type: 'uint256' },
          { name: 'principalAddress', type: 'address' },
          { name: 'principalAmount', type: 'uint256' },
          { name: 'aprBps', type: 'uint256' },
          { name: 'expirationTime', type: 'uint256' },
          { name: 'duration', type: 'uint256' },
          { name: 'validators', type: 'OfferValidator[]' },
        ],
        OfferValidator: [
          { name: 'validator', type: 'address' },
          { name: 'arguments', type: 'bytes' },
        ],
      },
      message: structToSign,
    });
  }

  async signRenegotiationOffer({ structToSign }: { structToSign: RenegotiationV4 }) {
    return this.wallet.signTypedData({
      domain: this.getDomain(),
      primaryType: 'RenegotiationOffer',
      types: {
        RenegotiationOffer: [
          { name: 'renegotiationId', type: 'uint256' },
          { name: 'loanId', type: 'uint256' },
          { name: 'lender', type: 'address' },
          { name: 'fee', type: 'uint256' },
          { name: 'signer', type: 'address' },
          { name: 'targetPrincipal', type: 'uint256[]' },
          { name: 'principalAmount', type: 'uint256' },
          { name: 'aprBps', type: 'uint256' },
          { name: 'expirationTime', type: 'uint256' },
          { name: 'duration', type: 'uint256' },
          { name: 'strictImprovement', type: 'bool' },
        ],
      },
      message: structToSign,
    });
  }

  async cancelOffer({ id }: { id: bigint }) {
    const txHash = await this.safeContractWrite.cancelOffer([this.wallet.account.address, id]);
    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });

        const filter = await this.contract.createEventFilter.OfferCancelled();
        const events = filterLogs(receipt, filter);
        if (events.length === 0) throw new Error('Offer not cancelled');
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
        const filter = await this.contract.createEventFilter.AllOffersCancelled();
        const events = filterLogs(receipt, filter);
        if (events.length === 0) throw new Error('Offers not cancelled');
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
        const filter = await this.contract.createEventFilter.RenegotiationOfferCancelled();
        const events = filterLogs(receipt, filter);
        if (events.length === 0) throw new Error('Offer not cancelled');
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
        const filter = await this.contract.createEventFilter.RenegotiationOfferCancelled();
        const events = filterLogs(receipt, filter);
        if (events.length === 0) throw new Error('Offer not cancelled');
        return { ...events[0].args, ...receipt };
      },
    };
  }

  private mapEmitLoanToMslEmitLoanArgs({ offerExecution, tokenId }: EmitLoanArgs) {
    const { offer, lenderOfferSignature } = offerExecution[0];
    const mappedOffer = {
      ...offer,
      signer: offer.signerAddress ?? zeroAddress,
      lender: offer.lenderAddress,
      borrower: offer.borrowerAddress,
      validators: offer.offerValidators,
      requiresLiquidation: !!offer.requiresLiquidation,
    };
    return [mappedOffer, tokenId, lenderOfferSignature, false] as const;
  }

  async emitLoan(emitArgs: EmitLoanArgs) {
    const mslEmitArgs = this.mapEmitLoanToMslEmitLoanArgs(emitArgs);
    const txHash = await this.safeContractWrite.emitLoan(mslEmitArgs);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const filter = await this.contract.createEventFilter.LoanEmitted();
        const events = filterLogs(receipt, filter);
        if (events.length === 0) throw new Error('Loan not emitted');
        const args = events[0].args;
        return {
          loan: {
            id: `${this.contract.address.toLowerCase()}.${args.loanId}`,
            ...args.loan,
            contractAddress: this.contract.address,
          },
          loanId: args.loanId,
          offerId: `${this.contract.address.toLowerCase()}.${mslEmitArgs[0].lender.toLowerCase()}.${
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
    loanId,
  }: {
    loan: LoanV4;
    loanId: bigint;
    nftReceiver?: Address;
  }) {
    const receiver = nftReceiver ?? this.wallet.account.address;

    const txHash = await this.safeContractWrite.repayLoan([receiver, loanId, loan, false]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const filter = await this.contract.createEventFilter.LoanRepaid();
        const events = filterLogs(receipt, filter);
        if (events.length === 0) throw new Error('Loan not repaid');
        return { ...events[0].args, ...receipt };
      },
    };
  }

  getRemainingLockupSeconds() {
    return 0;
  }

  async refinanceFullLoan({
    offer,
    signature,
    loan,
  }: {
    offer: RenegotiationV4;
    signature: Hash;
    loan: LoanV4;
  }) {
    const txHash = await this.safeContractWrite.refinanceFull([offer, loan, signature]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const filter = await this.contract.createEventFilter.LoanRefinanced();
        const events = filterLogs(receipt, filter);
        if (events.length === 0) throw new Error('Loan not refinanced');
        const args = events[0].args;
        return {
          loan: {
            id: `${this.contract.address.toLowerCase()}.${args.newLoanId}`,
            ...args.loan,
            contractAddress: this.address,
          },
          loanId: args.newLoanId,
          renegotiationId: `${this.contract.address.toLowerCase()}.${offer.lender.toLowerCase()}.${
            args.renegotiationId
          }`,
          ...receipt,
        };
      },
    };
  }

  async refinancePartialLoan({ offer, loan }: { offer: RenegotiationV4; loan: LoanV4 }) {
    const txHash = await this.safeContractWrite.refinancePartial([offer, loan]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const filter = await this.contract.createEventFilter.LoanRefinanced();
        const events = filterLogs(receipt, filter);
        if (events.length === 0) throw new Error('Loan not refinanced');
        const args = events[0].args;
        return {
          loan: {
            id: `${this.contract.address.toLowerCase()}.${args.newLoanId}`,
            ...args.loan,
            contractAddress: this.contract.address,
          },
          loanId: args.newLoanId,
          renegotiationId: `${this.contract.address.toLowerCase()}.${offer.lender.toLowerCase()}.${
            args.renegotiationId
          }`,
          ...receipt,
        };
      },
    };
  }

  async extendLoan(): ReturnType<MslV5['extendLoan']> {
    throw new Error('Not implemented for V1');
  }

  async mergeTranches(): ReturnType<MslV6['mergeTranches']> {
    throw new Error('Not implemented for V1');
  }

  async addTranche(): ReturnType<MslV6['addTranche']> {
    throw new Error('Not implemented for V1');
  }

  async refinanceFromOffers(): ReturnType<MslV6['refinanceFromOffers']> {
    throw new Error('Not implemented for V1');
  }

  async delegateMulticall(): ReturnType<MslV5['delegateMulticall']> {
    throw new Error('Not implemented for V1');
  }

  async delegate(): ReturnType<MslV5['delegate']> {
    throw new Error('Not implemented for V1');
  }

  async revokeDelegate(): ReturnType<MslV5['revokeDelegate']> {
    throw new Error('Not implemented for V1');
  }

  async revokeDelegationsAndEmitLoan(): ReturnType<MslV5['revokeDelegationsAndEmitLoan']> {
    throw new Error('Not implemented for V1');
  }
  async liquidateLoan({ loan, loanId }: { loan: LoanV4; loanId: bigint }) {
    const txHash = await this.safeContractWrite.liquidateLoan([loanId, loan]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const filterForeclosed = await this.contract.createEventFilter.LoanForeclosed();
        const filterSentToLiquidator = await this.contract.createEventFilter.LoanSentToLiquidator();
        const foreclosedEvents = filterLogs(receipt, filterForeclosed);
        const sentToLiquidatorEvents = filterLogs(receipt, filterSentToLiquidator);
        if (foreclosedEvents.length === 0 && sentToLiquidatorEvents.length === 0)
          throw new Error('Loan not liquidated');
        return {
          ...(foreclosedEvents?.[0]?.args ?? sentToLiquidatorEvents?.[0]?.args),
          ...receipt,
        };
      },
    };
  }
}
