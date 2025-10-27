import { Address, isAddress } from 'viem';

import { LoanV4, LoanV5, LoanV6, zeroAddress } from '@/blockchain';
import { getVersionFromMslAddress } from '@/deploys';
import * as model from '@/model';
import { millisToSeconds, SECONDS_PER_YEAR, secondsToMillis, toDate } from '@/utils/dates';
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
  };
};

interface TrancheOwed {
  principalAmount: bigint;
  accruedInterest: bigint;
  aprBps: bigint;
  startTime: bigint;
}

const getInterest = (amount: bigint, aprBps: bigint, duration: bigint) => {
  return mulDivUp(amount, aprBps * duration, BPS * BigInt(SECONDS_PER_YEAR));
};

export const getTotalOwed = (
  loan: { tranche: readonly TrancheOwed[] } | { source: readonly TrancheOwed[] },
  bufferSeconds: bigint,
) => {
  const now = BigInt(millisToSeconds(Date.now()));
  return sumBigInt(
    ...('tranche' in loan ? loan.tranche : loan.source).map(
      (source) =>
        source.principalAmount +
        source.accruedInterest +
        getInterest(source.principalAmount, source.aprBps, now - source.startTime + bufferSeconds),
    ),
  );
};
