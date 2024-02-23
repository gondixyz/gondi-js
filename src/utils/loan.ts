import { Loan, zeroAddress } from '@/blockchain';
import * as model from '@/model';

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

export const loanToMslLoan = (loan: Loan) => {
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
    source,
    tranche: source,
    protocolFee,
  };
};
