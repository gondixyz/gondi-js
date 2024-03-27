import { isAddress } from 'viem';

import { LoanV4, LoanV5, LoanV6, zeroAddress } from '@/blockchain';
import * as model from '@/model';
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
  return {
    ...loan,
    nftCollateralAddress,
    source,
    tranche: source,
    protocolFee,
  };
};
