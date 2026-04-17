import { lowerBound } from '@/utils/algorithm';
import { SECONDS_IN_YEAR } from '@/utils/dates';
import { BPS } from '@/utils/loan';
import { max, perToBps } from '@/utils/number';

export const calculateProratedOriginationFee = ({
  principal,
  aprBps,
  duration,
  effectiveApr,
}: {
  principal: bigint;
  aprBps: bigint;
  duration: bigint;
  effectiveApr: number;
}) => {
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

  const getFeeBasedOnExtraAprBps = (extraAprBps: bigint) => {
    return (
      (extraAprBps * principal * duration) / (BigInt(SECONDS_IN_YEAR) * BPS + eaprBps * duration)
    );
  };

  const lft = max(0n, getFeeBasedOnExtraAprBps(eaprBps - aprBps - 10n));
  const rht = getFeeBasedOnExtraAprBps(eaprBps - aprBps + 10n);

  const fee = lowerBound(lft, rht, (f) => backendGetEaprBps(f) >= eaprBps);
  return { fee, actualEaprBps: backendGetEaprBps(fee) };
};
