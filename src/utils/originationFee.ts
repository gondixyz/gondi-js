import { SECONDS_IN_YEAR } from '@/utils/dates';
import { BPS } from '@/utils/loan';
import { floatToBigInt, max, perToBps, toFloat } from '@/utils/number';

export const calculateProratedOriginationFee = ({
  principal,
  aprBps,
  duration,
  effectiveApr,
  currency,
}: {
  principal: bigint;
  aprBps: bigint;
  duration: bigint;
  effectiveApr: number;
  currency: { decimals: number };
}): { fee: bigint; actualEaprBps: bigint } => {
  // eAPR_BPS = (APR_BPS * principal + fee * 1_YEAR * BPS / duration) / (principal - fee)
  // eAPR is monotonically increasing in fee, so we binary search for the smallest fee
  // that yields the target eAPR. Upper bound corresponds to +10 bps extra eAPR.
  // Callers detect unreachable targets by comparing actualEaprBps to the expected value.

  if (principal <= 0n || aprBps < 0n || duration <= 0n || effectiveApr <= 0) {
    return { fee: 0n, actualEaprBps: 0n };
  }

  // This is the formula used in the backend to calculate the effectiveApr
  const backendGetEaprBps = (fee: bigint) => {
    const adjustedPrincipal = principal - fee;
    if (adjustedPrincipal <= 0) return 0n;
    return (
      (aprBps * principal + (fee * BigInt(SECONDS_IN_YEAR) * BPS) / duration) / adjustedPrincipal
    );
  };

  const eaprBps = BigInt(perToBps(effectiveApr));
  if (eaprBps <= aprBps) return { fee: 0n, actualEaprBps: aprBps };

  const principalFloat = toFloat(principal, currency.decimals);

  const getFeeBasedOnExtraAprBps = (extraAprBps: number) => {
    const fee =
      (extraAprBps * principalFloat) /
      ((SECONDS_IN_YEAR * Number(BPS)) / Number(duration) + Number(eaprBps));
    return floatToBigInt(fee, currency.decimals);
  };

  const lowerEstimate = getFeeBasedOnExtraAprBps(Number(eaprBps - aprBps - 10n));
  let lft = max(0n, lowerEstimate);
  let rht = getFeeBasedOnExtraAprBps(Number(eaprBps - aprBps + 10n));

  while (lft < rht) {
    const midFee = (lft + rht) / 2n;
    if (backendGetEaprBps(midFee) < eaprBps) {
      lft = midFee + 1n;
    } else {
      rht = midFee;
    }
  }

  return { fee: lft, actualEaprBps: backendGetEaprBps(lft) };
};
