import { Address, encodeFunctionData, Hash } from 'viem';

import { filterLogs, LoanV6, OfferV6, RenegotiationV6, Wallet, zeroHash } from '@/blockchain';
import { getContracts } from '@/deploys';
import { multiSourceLoanAbi as multiSourceLoanAbiV6 } from '@/generated/blockchain/v6';
import { EmitLoanArgs } from '@/gondi';
import { bpsToPercentage, getDomain, millisToSeconds, SECONDS_IN_DAY } from '@/utils';

import { Contract } from './Contract';
import { MslV5 } from './MslV5';

export class MslV6 extends Contract<typeof multiSourceLoanAbiV6> {
  constructor({ walletClient }: { walletClient: Wallet }) {
    const {
      MultiSourceLoan: { v6 },
    } = getContracts(walletClient.chain);

    super({
      walletClient,
      address: v6,
      abi: multiSourceLoanAbiV6,
    });
  }

  // TODO: Add new methods: Merge tranches and Add tranche
  async extendLoan(): ReturnType<MslV5['extendLoan']> {
    throw new Error('Not implemented for V6');
  }

  async signOffer({
    verifyingContract,
    structToSign,
  }: {
    verifyingContract: Address;
    structToSign: OfferV6;
  }) {
    return this.wallet.signTypedData({
      domain: getDomain(this.wallet.chain.id, verifyingContract),
      primaryType: 'LoanOffer',
      types: {
        LoanOffer: [
          { name: 'offerId', type: 'uint256' },
          { name: 'lender', type: 'address' },
          { name: 'fee', type: 'uint256' },
          { name: 'capacity', type: 'uint256' },
          { name: 'nftCollateralAddress', type: 'address' },
          { name: 'nftCollateralTokenId', type: 'uint256' },
          { name: 'principalAddress', type: 'address' },
          { name: 'principalAmount', type: 'uint256' },
          { name: 'aprBps', type: 'uint256' },
          { name: 'expirationTime', type: 'uint256' },
          { name: 'duration', type: 'uint256' },
          { name: 'maxTrancheFloor', type: 'uint256' },
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

  async signRenegotiationOffer({
    verifyingContract,
    structToSign,
  }: {
    verifyingContract: Address;
    structToSign: RenegotiationV6;
  }) {
    return this.wallet.signTypedData({
      domain: getDomain(this.wallet.chain.id, verifyingContract),
      primaryType: 'RenegotiationOffer',
      types: {
        RenegotiationOffer: [
          { name: 'renegotiationId', type: 'uint256' },
          { name: 'loanId', type: 'uint256' },
          { name: 'lender', type: 'address' },
          { name: 'fee', type: 'uint256' },
          { name: 'trancheIndex', type: 'uint256[]' },
          { name: 'principalAmount', type: 'uint256' },
          { name: 'aprBps', type: 'uint256' },
          { name: 'expirationTime', type: 'uint256' },
          { name: 'duration', type: 'uint256' },
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
        if (events.length === 0) throw new Error('Offer not cancelled');
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
        const filter = await this.contract.createEventFilter.AllOffersCancelled();
        const events = filterLogs(receipt, filter);
        if (events.length === 0) throw new Error('Offers not cancelled');
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
        const filter = await this.contract.createEventFilter.RenegotiationOfferCancelled();
        const events = filterLogs(receipt, filter);
        if (events.length === 0) throw new Error('Renegotiation offer not cancelled');
        return { ...events[0].args, ...receipt };
      },
    };
  }

  async cancelAllRenegotiations({ minId }: { minId: bigint }) {
    const txHash = await this.safeContractWrite.cancelAllRenegotiationOffers([minId]);
    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const filter = await this.contract.createEventFilter.AllRenegotiationOffersCancelled();
        const events = filterLogs(receipt, filter);
        if (events.length === 0) throw new Error('Renegotiation offers not cancelled');
        return { ...events[0].args, ...receipt };
      },
    };
  }

  private mapEmitLoanToMslEmitLoanArgs({
    offerExecution,
    tokenId,
    duration,
    expirationTime,
  }: EmitLoanArgs) {
    const executionData = {
      offerExecution: offerExecution.map(({ offer, amount, ...rest }) => ({
        ...rest,
        amount: amount ?? offer.principalAmount,
        offer: {
          ...offer,
          lender: offer.lenderAddress,
          validators: offer.offerValidators,
        },
      })),
      tokenId,
      duration,
      expirationTime: expirationTime ?? BigInt(millisToSeconds(Date.now()) + SECONDS_IN_DAY),
      principalReceiver: this.wallet.account.address,
      callbackData: '0x' as Hash, // No callback data is expected here, only for BNPL [Levearage call]
    };

    return {
      executionData,
      borrower: this.wallet.account.address,
      borrowerOfferSignature: '0x' as Hash, // No signature data is expected here, only for BNPL [Levearage call]
    };
  }

  async emitLoan(emitArgs: EmitLoanArgs) {
    const mslEmitArgs = this.mapEmitLoanToMslEmitLoanArgs(emitArgs);
    const txHash = await this.safeContractWrite.emitLoan([mslEmitArgs]);

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
          offerIds: mslEmitArgs.executionData.offerExecution.map(
            ({ offer }) =>
              `${this.contract.address.toLowerCase()}.${offer.lender.toLowerCase()}.${offer.offerId}`,
          ),
          ...receipt,
        };
      },
    };
  }

  async revokeDelegationsAndEmitLoan({
    delegations,
    emit,
  }: {
    delegations: Address[];
    emit: EmitLoanArgs;
  }) {
    if (delegations.length === 0) throw new Error('At least one delegation must be revoked');

    const mslEmitArgs = this.mapEmitLoanToMslEmitLoanArgs(emit);
    const { tokenId, offerExecution } = mslEmitArgs.executionData;
    const encodedRevokeDelegations = delegations.map((delegation) =>
      encodeFunctionData({
        abi: multiSourceLoanAbiV6,
        functionName: 'revokeDelegate',
        args: [delegation, offerExecution[0].offer.nftCollateralAddress, tokenId],
      }),
    );

    const encodedEmitLoan = encodeFunctionData({
      abi: multiSourceLoanAbiV6,
      functionName: 'emitLoan',
      args: [mslEmitArgs],
    });

    const txHash = await this.safeContractWrite.multicall([
      [...encodedRevokeDelegations, encodedEmitLoan],
    ]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });

        const revokeFilter = await this.contract.createEventFilter.RevokeDelegate();
        const revokeEvents = filterLogs(receipt, revokeFilter);
        if (revokeEvents.length !== delegations.length)
          throw new Error('Revoke delegations failed');

        const emitFilter = await this.contract.createEventFilter.LoanEmitted();
        const emitEvents = filterLogs(receipt, emitFilter);
        if (emitEvents.length === 0) throw new Error('Loan not emitted');

        const results = [
          ...revokeEvents.map(({ args }) => args),
          ...emitEvents.map(({ args }) => args),
        ];
        const emitLoanArgs = emitEvents[0].args;
        return {
          loan: {
            id: `${this.contract.address.toLowerCase()}.${emitLoanArgs.loanId}`,
            ...emitLoanArgs.loan,
            contractAddress: this.contract.address,
          },
          loanId: emitLoanArgs.loanId,
          ...receipt,
          results,
        };
      },
    };
  }

  async repayLoan({ loan, loanId }: { loan: LoanV6; loanId: bigint }) {
    const signableRepaymentData = {
      loanId,
      callbackData: '0x' as Hash, // No callback data is expected here, only for BNPL [Levearage call]
      shouldDelegate: false, // No need to delegate
    };
    const txHash = await this.safeContractWrite.repayLoan([
      {
        data: signableRepaymentData,
        loan,
        borrowerSignature: '0x', // No signature data is expected here, only for BNPL [Levearage call]
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
        if (events.length === 0) throw new Error('Loan not repaid');
        return { ...events[0].args, ...receipt };
      },
    };
  }

  async getRemainingLockupSeconds({ loan }: { loan: LoanV6 }) {
    const newestSource = loan.tranche[0];
    const loanEndDate = loan.startTime + loan.duration;
    const newestSourceDuration = loanEndDate - newestSource.startTime;

    const lockPeriodBps = await this.contract.read.getMinLockPeriod();
    const lockPercentage = bpsToPercentage(lockPeriodBps);

    const lockupTimeSeconds = Math.ceil(Number(newestSourceDuration) * lockPercentage);

    const ellapsedSeconds = Math.ceil(millisToSeconds(Date.now()) - Number(newestSource.startTime));

    if (ellapsedSeconds >= lockupTimeSeconds) return 0;
    return lockupTimeSeconds - ellapsedSeconds;
  }

  async refinanceFullLoan({
    offer,
    signature,
    loan,
  }: {
    offer: RenegotiationV6;
    signature: Hash;
    loan: LoanV6;
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

  async refinancePartialLoan({ offer, loan }: { offer: RenegotiationV6; loan: LoanV6 }) {
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
          renegotiationId: `${this.contract.address.toLowerCase()}.${offer.lender.toLowerCase()}.${
            args.renegotiationId
          }`,
          ...receipt,
        };
      },
    };
  }

  async delegateMulticall(delegations: Parameters<MslV6['delegate']>[0][]) {
    if (delegations.length === 0) throw new Error('At least one delegation must be revoked');

    const txHash = await this.safeContractWrite.multicall([
      delegations.map((delegation) =>
        encodeFunctionData({
          abi: multiSourceLoanAbiV6,
          functionName: 'delegate',
          args: [
            delegation.loanId,
            delegation.loan,
            delegation.to,
            delegation.rights ?? zeroHash,
            delegation.enable,
          ],
        }),
      ),
    ]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const filter = await this.contract.createEventFilter.Delegated();
        const events = filterLogs(receipt, filter);

        if (events.length !== delegations.length) throw new Error('Delegate multicall failed');

        return {
          ...receipt,
          results: events.map(({ args }) => args),
        };
      },
    };
  }

  async delegate({
    loan,
    loanId,
    to,
    rights = zeroHash,
    enable,
  }: {
    loan: LoanV6;
    loanId: bigint;
    to: Address;
    rights?: Hash;
    enable: boolean;
  }) {
    const txHash = await this.safeContractWrite.delegate([loanId, loan, to, rights, enable]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const filter = await this.contract.createEventFilter.Delegated();
        const events = filterLogs(receipt, filter);
        if (events.length === 0) throw new Error('Token not delegated');
        const args = events[0].args;
        return {
          loan: {
            ...loan,
            loanId,
            contractAddress: this.contract.address,
          },
          value: args.value,
          ...receipt,
        };
      },
    };
  }

  async revokeDelegate({
    to,
    collection,
    tokenId,
  }: {
    to: Address;
    collection: Address;
    tokenId: bigint;
  }) {
    const txHash = await this.safeContractWrite.revokeDelegate([to, collection, tokenId]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const filter = await this.contract.createEventFilter.RevokeDelegate();
        const events = filterLogs(receipt, filter);
        if (events.length === 0) throw new Error('Token delegation not revoked');
        const args = events[0].args;
        return { ...args, ...receipt };
      },
    };
  }

  async liquidateLoan({ loan, loanId }: { loan: LoanV6; loanId: bigint }) {
    const txHash = await this.safeContractWrite.liquidateLoan([loanId, loan]);
    return {
      txHash,
      waitTxInBlock: async () => await this.bcClient.waitForTransactionReceipt({ hash: txHash }),
    };
  }
}
