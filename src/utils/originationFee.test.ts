import { describe, expect, test } from 'bun:test';

import { product } from '@/utils/array';
import { SECONDS_IN_DAY, SECONDS_IN_YEAR } from '@/utils/dates';
import { BPS } from '@/utils/loan';
import { bpsToPer, floatToBigInt, perToBps } from '@/utils/number';
import { calculateProratedOriginationFee } from '@/utils/originationFee';

const WETH = { decimals: 18 };
const USDC = { decimals: 6 };

// Same code as in backend
const getEaprBps = ({
  principal,
  aprBps,
  duration,
  fee,
}: {
  principal: bigint;
  aprBps: bigint;
  duration: bigint;
  fee: bigint;
}) => {
  const adjustedPrincipal = principal - fee;
  return (
    (aprBps * principal + (fee * BigInt(SECONDS_IN_YEAR) * BPS) / duration) / adjustedPrincipal
  );
};

describe('test calculateProratedOriginationFee', () => {
  test.each([[WETH], [USDC]])(
    'handles %s correctly',
    (currency) => {
      const principalTestCases = [
        1, 10, 100, 1000, 10000, 41000, 100000, 1.1, 1.11, 1.111, 1.23, 1.234, 3.14, 3.141, 6.28,
        6.281, 42.42, 7.5,
      ].map((n) => floatToBigInt(n, currency.decimals));

      const aprBpsTestCases = new Array(20).fill(0).map((_, i) => BigInt(i + 1) * 100n);

      const durationTestCases = new Array(20)
        .fill(0)
        .map((_, i) => BigInt((i + 1) * 5) * BigInt(SECONDS_IN_DAY));

      const origFeePerTestCases = new Array(20).fill(0).map((_, i) => i + 1); // 1, 2, 3, ..., 20% more than the apr

      for (const [principal, aprBps, duration, origFeePer] of product(
        principalTestCases,
        aprBpsTestCases,
        durationTestCases,
        origFeePerTestCases,
      )) {
        const { fee } = calculateProratedOriginationFee({
          principal,
          aprBps,
          duration,
          effectiveApr: Math.floor(bpsToPer(aprBps)) + origFeePer,
          currency,
        });
        const expected = aprBps + BigInt(perToBps(origFeePer));
        expect(getEaprBps({ principal, aprBps, duration, fee })).toEqual(expected);
        // Check that this fee is the smallest fee that yields the target eAPR
        if (fee > 0n) {
          expect(getEaprBps({ principal, aprBps, duration, fee: fee - 1n })).toBeLessThan(expected);
        }
      }
    },
    60000,
  );
});
