import { Address, isAddress } from 'viem';

import { LoanV4, LoanV5, LoanV6, zeroAddress } from '@/blockchain';
import { getVersionFromMslAddress } from '@/deploys';
import * as model from '@/model';
import { millisToSeconds, SECONDS_IN_YEAR, secondsToMillis, toDate } from '@/utils/dates';
import { maxBy, mulDivUp, sumBigInt } from '@/utils/number';
import { areSameAddress } from '@/utils/string';
import { Optional } from '@/utils/types';

export const BPS = 10000n;

export const renegotiationToMslRenegotiation = (
  renegotiation: model.RenegotiationOffer,
  loanId: bigint,
) => ({
  ...renegotiation,
  loanId,
  strictImprovement: renegotiation.strictImprovement ?? false,
  lender: renegotiation.lenderAddress,
  signer: renegotiation.signerAddress ?? zeroAddress,
  fee: renegotiation.feeAmount,
  trancheIndex: renegotiation.trancheIndex ?? [],
  targetPrincipal: renegotiation.targetPrincipal ?? [],
});

export type LoanToMslLoanType =
  | Optional<LoanV4, 'nftCollateralAddress'>
  | Optional<LoanV5, 'nftCollateralAddress'>
  | Optional<LoanV6, 'nftCollateralAddress'>;

export const loanToMslLoan = (loan: LoanToMslLoanType) => {
  const nftCollateralAddress = loan.nftCollateralAddress ?? zeroAddress;
  if (areSameAddress(zeroAddress, nftCollateralAddress) || !isAddress(nftCollateralAddress)) {
    throw new Error('nftCollateralAddress is required');
  }
  let source;
  if ('source' in loan) {
    // Filling floor in sources to match types, but it's unused by V1/V2
    source = loan.source.map((s) => ({
      ...s,
      floor: 0n,
    }));
  } else {
    source = loan.tranche;
  }

  let protocolFee;
  if ('protocolFee' in loan) {
    protocolFee = loan.protocolFee;
  } else {
    protocolFee = 0n;
  }

  // Patch start and duration to match contract values
  const dateStartTime = toDate(loan.startTime);
  const dateContractStartTime =
    'contractStartTime' in loan ? toDate(loan.contractStartTime) : dateStartTime;
  const millisDelta = dateContractStartTime.getTime() - dateStartTime.getTime();
  const duration = loan.duration - BigInt(millisToSeconds(millisDelta));
  const startTime = BigInt(millisToSeconds(dateContractStartTime.getTime()));

  return {
    ...loan,
    startTime,
    contractStartTime: startTime,
    duration,
    nftCollateralAddress,
    source,
    tranche: source,
    protocolFee,
    // Required to encode Loan structs from contract version 3.2; older loans ignore it.
    lenderRefinanceDisabled:
      'lenderRefinanceDisabled' in loan ? loan.lenderRefinanceDisabled : false,
  };
};

export const getMslLoanId = (loan: LoanToMslLoanType) => {
  const mslLoan = loanToMslLoan(loan);
  return maxBy(mslLoan.source, 'loanId') ?? 0n;
};

export const getRemainingSeconds = (loan: Pick<LoanToMslLoanType, 'startTime' | 'duration'>) => {
  const now = new Date();
  const finishDate = new Date(secondsToMillis(loan.startTime) + secondsToMillis(loan.duration));
  if (finishDate.getTime() < now.getTime()) return 0;
  return millisToSeconds(finishDate.getTime() - now.getTime());
};

export const isLoanVersion = (address: Address, chainId: number) => {
  const version = getVersionFromMslAddress({ id: chainId }, address);
  return {
    isV1: version === '1',
    isV2: version === '2',
    isV3: version === '3',
    isV3_1: version === '3.1',
    isV3_2: version === '3.2',
  };
};

interface TrancheOwed {
  principalAmount: bigint;
  accruedInterest: bigint;
  aprBps: bigint;
  startTime: bigint;
}

export const getTotalOwed = (
  loan: { tranche: readonly TrancheOwed[] } | { source: readonly TrancheOwed[] },
  bufferSeconds: bigint,
) => {
  return getTotalOwedAt(loan, BigInt(millisToSeconds(Date.now())) + bufferSeconds);
};

/** Computes total repayment at a block timestamp, rounding interest up for each tranche. */
export const getTotalOwedAt = (
  loan: { tranche: readonly TrancheOwed[] } | { source: readonly TrancheOwed[] },
  timestamp: bigint,
) => {
  return sumBigInt(
    ...('tranche' in loan ? loan.tranche : loan.source).map(
      (source) => source.principalAmount + source.accruedInterest + getInterest(source, timestamp),
    ),
  );
};

/** Rounds each tranche's interest up, with no accrual before its start time. */
const getInterest = (source: TrancheOwed, timestamp: bigint) =>
  mulDivUp(
    source.principalAmount * source.aprBps,
    timestamp > source.startTime ? timestamp - source.startTime : 0n,
    BPS * BigInt(SECONDS_IN_YEAR),
  );
