import { isAddress } from 'viem';

import { LoanV4, LoanV5, LoanV6, zeroAddress } from '@/blockchain';
import { getContracts } from '@/deploys';
import * as model from '@/model';
import { millisToSeconds, secondsToMillis, toDate } from '@/utils/dates';
import { maxBy } from '@/utils/number';
import { areSameAddress } from '@/utils/string';
import { Optional } from '@/utils/types';

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

export const isLoanVersion = (contractAddress: string, chainId: number) => {
  const {
    MultiSourceLoan: { v4, v5, v6, v7 },
  } = getContracts({ id: chainId });
  return {
    isV4: areSameAddress(contractAddress, v4),
    isV5: areSameAddress(contractAddress, v5),
    isV6: areSameAddress(contractAddress, v6),
    isV7: areSameAddress(contractAddress, v7),
  };
};
