import { Address, decodeFunctionData, encodeFunctionData, Hash, Hex } from 'viem';

import { LoanV5, OfferV5, RenegotiationV5, REORG_SAFETY_BUFFER, zeroHash } from '@/blockchain';
import { Wallet } from '@/clients/contracts';
import { getContracts } from '@/deploys';
import { multiSourceLoanABI as multiSourceLoanABIV5 } from '@/generated/blockchain/v5';
import { EmitLoanArgs } from '@/gondi';
import { millisToSeconds, SECONDS_IN_DAY } from '@/utils/dates';
import { getMslLoanId, getRemainingSeconds } from '@/utils/loan';
import { bpsToPercentage, sumBy } from '@/utils/number';
import { CONTRACT_DOMAIN_NAME } from '@/utils/string';

import { BaseContract } from './BaseContract';
import { MslV6 } from './MslV6';

export class MslV5 extends BaseContract<typeof multiSourceLoanABIV5> {
  constructor({ walletClient }: { walletClient: Wallet }) {
    const {
      MultiSourceLoan: { v5 },
    } = getContracts(walletClient.chain);

    super({
      walletClient,
      address: v5,
      abi: multiSourceLoanABIV5,
    });
  }

  private getDomain() {
    return {
      name: CONTRACT_DOMAIN_NAME,
      version: '2',
      chainId: this.wallet.chain.id,
      verifyingContract: this.address,
    };
  }

  async signOffer({ structToSign }: { structToSign: OfferV5 }) {
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

  async signRenegotiationOffer({ structToSign }: { structToSign: RenegotiationV5 }) {
    return this.wallet.signTypedData({
      domain: this.getDomain(),
      primaryType: 'RenegotiationOffer',
      types: {
        RenegotiationOffer: [
          { name: 'renegotiationId', type: 'uint256' },
          { name: 'loanId', type: 'uint256' },
          { name: 'lender', type: 'address' },
          { name: 'fee', type: 'uint256' },
          { name: 'targetPrincipal', type: 'uint256[]' },
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

        const events = this.parseEventLogs('OfferCancelled', receipt.logs);
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
        const events = this.parseEventLogs('AllOffersCancelled', receipt.logs);
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
        const events = this.parseEventLogs('RenegotiationOfferCancelled', receipt.logs);
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
        const events = this.parseEventLogs('AllRenegotiationOffersCancelled', receipt.logs);
        if (events.length === 0) throw new Error('Renegotiation offers not cancelled');
        return { ...events[0].args, ...receipt };
      },
    };
  }

  private mapEmitLoanToMslEmitLoanArgs({ offerExecution, tokenId, expirationTime }: EmitLoanArgs) {
    const { offer, amount, lenderOfferSignature } = offerExecution[0];
    const executionData = {
      offer: {
        ...offer,
        lender: offer.lenderAddress,
        borrower: offer.borrowerAddress,
        validators: offer.offerValidators,
      },
      tokenId,
      amount: amount ?? offer.principalAmount,
      expirationTime: expirationTime ?? BigInt(millisToSeconds(Date.now()) + SECONDS_IN_DAY),
      callbackData: '0x' as Hash, // No callback data is expected here, only for BNPL [Levearage call]
    };

    return {
      executionData,
      lender: offer.lenderAddress,
      borrower: this.wallet.account.address,
      lenderOfferSignature,
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
        const events = this.parseEventLogs('LoanEmitted', receipt.logs);
        if (events.length === 0) throw new Error('Loan not emitted');
        const args = events[0].args;
        return {
          loan: {
            id: `${this.contract.address.toLowerCase()}.${args.loanId}`,
            ...args.loan,
            contractAddress: this.contract.address,
          },
          loanId: args.loanId,
          offerId: `${this.contract.address.toLowerCase()}.${mslEmitArgs.lender.toLowerCase()}.${
            args.offerId
          }`,
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
    const { tokenId, offer } = mslEmitArgs.executionData;
    const encodedRevokeDelegations = delegations.map((delegation) =>
      encodeFunctionData({
        abi: multiSourceLoanABIV5,
        functionName: 'revokeDelegate',
        args: [delegation, offer.nftCollateralAddress, tokenId],
      }),
    );

    const encodedEmitLoan = encodeFunctionData({
      abi: multiSourceLoanABIV5,
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

        const revokeEvents = this.parseEventLogs('RevokeDelegate', receipt.logs);
        if (revokeEvents.length !== delegations.length)
          throw new Error('Revoke delegations failed');

        const emitEvents = this.parseEventLogs('LoanEmitted', receipt.logs);
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

  async repayLoan({ loan, loanId }: { loan: LoanV5; loanId: bigint }) {
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
        const events = this.parseEventLogs('LoanRepaid', receipt.logs);
        if (events.length === 0) throw new Error('Loan not repaid');
        return { ...events[0].args, ...receipt };
      },
    };
  }

  async getRemainingLockupSeconds({ loan }: { loan: LoanV5 }) {
    const newestSource = loan.source[0];
    const loanEndDate = loan.startTime + loan.duration;
    const newestSourceDuration = loanEndDate - newestSource.startTime;

    const lockPeriodBps = await this.contract.read.getMinLockPeriod();
    const lockPercentage = bpsToPercentage(lockPeriodBps);

    const lockupTimeSeconds = Math.ceil(Number(newestSourceDuration) * lockPercentage);

    const ellapsedSeconds = Math.ceil(millisToSeconds(Date.now()) - Number(newestSource.startTime));

    if (ellapsedSeconds >= lockupTimeSeconds) return 0;
    return lockupTimeSeconds - ellapsedSeconds;
  }

  isEndLockedUp() {
    return false;
  }

  async refinanceBatch({
    renegotiationId,
    refinancings,
  }: {
    renegotiationId: bigint;
    refinancings: {
      loan: LoanV5;
      newAprBps: bigint;
      sources: {
        source: LoanV5['source'][number];
        refinancingPrincipal: bigint;
      }[];
    }[];
  }) {
    // Generate multicall encoded function data for (renegotiation offer, loan) pairs
    const data = refinancings.map(({ loan, sources, newAprBps }, index) => {
      const targetPrincipal = loan.source.map(({ principalAmount, loanId }) => {
        const refinancingSource = sources.find(({ source }) => source.loanId === loanId);
        return principalAmount - (refinancingSource?.refinancingPrincipal ?? 0n);
      });
      const refinancingPrincipalAmount = sumBy(sources, 'refinancingPrincipal') ?? 0n;

      const offer = {
        renegotiationId: renegotiationId + BigInt(index),
        loanId: getMslLoanId(loan),
        lender: this.wallet.account.address,
        fee: 0n,
        targetPrincipal,
        principalAmount: refinancingPrincipalAmount,
        aprBps: newAprBps,
        expirationTime: BigInt(millisToSeconds(Date.now())) + REORG_SAFETY_BUFFER,
        duration: BigInt(getRemainingSeconds(loan)) + REORG_SAFETY_BUFFER,
      };

      const isFullRefinance = refinancingPrincipalAmount === loan.principalAmount;
      if (isFullRefinance) {
        return encodeFunctionData({
          abi: multiSourceLoanABIV5,
          functionName: 'refinanceFull',
          args: [offer, loan, zeroHash],
        });
      }
      return encodeFunctionData({
        abi: multiSourceLoanABIV5,
        functionName: 'refinancePartial',
        args: [{ ...offer, duration: 0n }, loan],
      });
    });

    const txHash = await this.safeContractWrite.multicall([data]);
    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const events = this.parseEventLogs('LoanRefinanced', receipt.logs);
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
    offer: RenegotiationV5;
    signature: Hash;
    loan: LoanV5;
  }) {
    return this.executeRenegotiation({
      offer,
      executeRenegotiationTxn: () => this.safeContractWrite.refinanceFull([offer, loan, signature]),
    });
  }

  async refinancePartialLoan({ offer, loan }: { offer: RenegotiationV5; loan: LoanV5 }) {
    return this.executeRenegotiation({
      offer,
      executeRenegotiationTxn: () => this.safeContractWrite.refinancePartial([offer, loan]),
    });
  }

  private async executeRenegotiation({
    offer,
    executeRenegotiationTxn,
  }: {
    offer: RenegotiationV5;
    executeRenegotiationTxn: () => Promise<Hash>;
  }) {
    const txHash = await executeRenegotiationTxn();
    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const events = this.parseEventLogs('LoanRefinanced', receipt.logs);
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

  async addTranche(): ReturnType<MslV6['addTranche']> {
    throw new Error('Not implemented for V2');
  }

  async refinanceFromOffers(): ReturnType<MslV6['refinanceFromOffers']> {
    throw new Error('Not implemented for V2');
  }

  async delegateMulticall(delegations: Parameters<MslV5['delegate']>[0][]) {
    if (delegations.length === 0) throw new Error('At least one delegation must be revoked');

    const txHash = await this.safeContractWrite.multicall([
      delegations.map((delegation) =>
        encodeFunctionData({
          abi: multiSourceLoanABIV5,
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
        const events = this.parseEventLogs('Delegated', receipt.logs);
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
    loan: LoanV5;
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
        const events = this.parseEventLogs('Delegated', receipt.logs);
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
        const events = this.parseEventLogs('RevokeDelegate', receipt.logs);
        if (events.length === 0) throw new Error('Token delegation not revoked');
        const args = events[0].args;
        return { ...args, ...receipt };
      },
    };
  }

  async liquidateLoan({ loan, loanId }: { loan: LoanV5; loanId: bigint }) {
    const txHash = await this.safeContractWrite.liquidateLoan([loanId, loan]);
    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const foreclosedEvents = this.parseEventLogs('LoanForeclosed', receipt.logs);
        const sentToLiquidatorEvents = this.parseEventLogs('LoanSentToLiquidator', receipt.logs);
        if (foreclosedEvents.length === 0 && sentToLiquidatorEvents.length === 0)
          throw new Error('Loan not liquidated');
        return {
          ...(foreclosedEvents?.[0]?.args ?? sentToLiquidatorEvents?.[0]?.args),
          ...receipt,
        };
      },
    };
  }

  decodeRepaymentCalldata(calldata: Hex) {
    const decoded = decodeFunctionData({
      abi: this.abi,
      data: calldata,
    });
    if (decoded.functionName !== 'repayLoan') {
      throw new Error('Wrong calldata');
    }
    return decoded.args[0];
  }

  async getProtocolFee(): ReturnType<MslV6['getProtocolFee']> {
    throw new Error('Not implemented for V2');
  }
}
