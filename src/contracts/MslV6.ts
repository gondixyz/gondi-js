import { Address, encodeFunctionData, Hash } from 'viem';

import { filterLogs, LoanV6, OfferV6, RenegotiationV6, zeroHash } from '@/blockchain';
import { Wallet } from '@/contracts';
import { getContracts } from '@/deploys';
import { multiSourceLoanAbi as multiSourceLoanAbiV6 } from '@/generated/blockchain/v6';
import { EmitLoanArgs } from '@/gondi';
import { bpsToPercentage, millisToSeconds, SECONDS_IN_DAY } from '@/utils/number';
import { CONTRACT_DOMAIN_NAME } from '@/utils/string';

import { BaseContract } from './BaseContract';
import { MslV5 } from './MslV5';

export class MslV6 extends BaseContract<typeof multiSourceLoanAbiV6> {
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

  private getDomain() {
    return {
      name: CONTRACT_DOMAIN_NAME,
      version: '3',
      chainId: this.wallet.chain.id,
      verifyingContract: this.address,
    };
  }

  async signOffer({ structToSign }: { structToSign: OfferV6 }) {
    return this.wallet.signTypedData({
      domain: this.getDomain(),
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
          { name: 'maxSeniorRepayment', type: 'uint256' },
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

  async signRenegotiationOffer({ structToSign }: { structToSign: RenegotiationV6 }) {
    return this.wallet.signTypedData({
      domain: this.getDomain(),
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

  async cancelAllRenegotiations(_: { minId: bigint }) {
    throw new Error('Not implemented for V3');
  }

  private mapEmitLoanToMslEmitLoanArgs({
    offerExecution,
    tokenId,
    duration,
    principalReceiver,
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
      principalReceiver: principalReceiver ?? this.wallet.account.address,
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

  async extendLoan(): ReturnType<MslV5['extendLoan']> {
    throw new Error('Not implemented for V3');
  }

  async mergeTranches({
    loan,
    loanId,
    minTranche,
    maxTranche,
  }: {
    loan: LoanV6;
    loanId: bigint;
    minTranche: bigint;
    maxTranche: bigint;
  }) {
    const txHash = await this.safeContractWrite.mergeTranches([
      loanId,
      loan,
      minTranche,
      maxTranche,
    ]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const filter = await this.contract.createEventFilter.TranchesMerged();
        const events = filterLogs(receipt, filter);
        if (events.length === 0) throw new Error('Loan tranches not merged');
        const args = events[0].args;
        const newLoanId = args.loan.tranche.reduce(
          (newestLoanId, { loanId: trancheLoanId }) =>
            trancheLoanId > newestLoanId ? trancheLoanId : newestLoanId,
          loanId,
        );
        return {
          loan: {
            id: `${this.contract.address.toLowerCase()}.${newLoanId}`,
            ...args.loan,
            contractAddress: this.contract.address,
          },
          newLoanId,
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
    const newestSource = loan.tranche[loan.tranche.length - 1];
    const loanEndDate = loan.startTime + loan.duration;
    const newestSourceDuration = loanEndDate - newestSource.startTime;

    const lockPeriodBps = await this.contract.read.getMinLockPeriod();
    const lockPercentage = bpsToPercentage(lockPeriodBps);

    const lockupTimeSeconds = Math.ceil(Number(newestSourceDuration) * lockPercentage);

    const ellapsedSeconds = Math.ceil(millisToSeconds(Date.now()) - Number(newestSource.startTime));

    if (ellapsedSeconds >= lockupTimeSeconds) return 0;
    return lockupTimeSeconds - ellapsedSeconds;
  }

  async refinanceBatch({
    renegotiationId,
    refinancings,
  }: {
    renegotiationId: number;
    refinancings: {
      loan: LoanV6;
      newAprBps: bigint;
      sources: {
        source: LoanV6['tranche'][number] & { loanIndex: number };
        refinancingPrincipal: bigint;
      }[];
    }[];
  }) {
    // Generate multicall encoded function data for (renegotiation offer, loan) pairs
    const data = refinancings.map(({ loan, sources, newAprBps }, index) => {
      const trancheIndex = sources.map(({ source }) => BigInt(source.loanIndex));

      const refinancingPrincipalAmount = sources.reduce(
        (acc, { refinancingPrincipal }) => acc + refinancingPrincipal,
        0n,
      );

      const offer = {
        renegotiationId: BigInt(renegotiationId + index),
        loanId: BigInt(Math.max(...loan.tranche.map(({ loanId }) => Number(loanId)))),
        lender: this.wallet.account.address,
        fee: 0n,
        trancheIndex,
        principalAmount: refinancingPrincipalAmount,
        aprBps: newAprBps,
        expirationTime: 0n,
        duration: 0n,
      };

      const isFullRefinance = refinancingPrincipalAmount === loan.principalAmount;
      if (isFullRefinance) {
        return encodeFunctionData({
          abi: multiSourceLoanAbiV6,
          functionName: 'refinanceFull',
          args: [offer, loan, zeroHash],
        });
      }
      return encodeFunctionData({
        abi: multiSourceLoanAbiV6,
        functionName: 'refinancePartial',
        args: [offer, loan],
      });
    });

    const txHash = await this.safeContractWrite.multicall([data]);
    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const filter = await this.contract.createEventFilter.LoanRefinanced();
        const events = filterLogs(receipt, filter);
        if (events.length !== refinancings.length) throw new Error('Loan not refinanced');

        const results = events.map(({ args }) => args);
        return { results, ...receipt };
      },
    };
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
    return this.executeRenegotiation({
      offer,
      executeRenegotiationTxn: () => this.safeContractWrite.refinanceFull([offer, loan, signature]),
    });
  }

  async refinancePartialLoan({ offer, loan }: { offer: RenegotiationV6; loan: LoanV6 }) {
    return this.executeRenegotiation({
      offer,
      executeRenegotiationTxn: () => this.safeContractWrite.refinancePartial([offer, loan]),
    });
  }

  async addTranche({
    offer,
    signature,
    loan,
  }: {
    offer: RenegotiationV6;
    signature: Hash;
    loan: LoanV6;
  }) {
    return this.executeRenegotiation({
      offer,
      executeRenegotiationTxn: () => this.safeContractWrite.addNewTranche([offer, loan, signature]),
    });
  }

  async refinanceFromOffers({
    loan,
    loanId,
    executionData,
  }: {
    loan: LoanV6;
    loanId: bigint;
    executionData: EmitLoanArgs;
  }) {
    const mslEmitArgs = this.mapEmitLoanToMslEmitLoanArgs(executionData);
    const txHash = await this.safeContractWrite.refinanceFromLoanExecutionData([
      loanId,
      loan,
      mslEmitArgs,
    ]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const filter = await this.contract.createEventFilter.LoanRefinancedFromNewOffers();
        const events = filterLogs(receipt, filter);
        if (events.length === 0) throw new Error('LoanRefinancedFromNewOffers not emitted');
        const args = events[0].args;
        return {
          loan: {
            id: `${this.contract.address.toLowerCase()}.${args.newLoanId}`,
            ...args.loan,
            contractAddress: this.contract.address,
          },
          loanId: args.newLoanId,
          offerIds: mslEmitArgs.executionData.offerExecution.map(
            ({ offer }) =>
              `${this.contract.address.toLowerCase()}.${offer.lender.toLowerCase()}.${offer.offerId}`,
          ),
          ...receipt,
        };
      },
    };
  }

  private async executeRenegotiation({
    offer,
    executeRenegotiationTxn,
  }: {
    offer: RenegotiationV6;
    executeRenegotiationTxn: () => Promise<Hash>;
  }) {
    const txHash = await executeRenegotiationTxn();
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
