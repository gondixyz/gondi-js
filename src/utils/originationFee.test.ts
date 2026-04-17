import { describe, expect, test } from 'bun:test';

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
        floatToBigInt(1, currency.decimals),
        floatToBigInt(10, currency.decimals),
        floatToBigInt(100, currency.decimals),
        floatToBigInt(1000, currency.decimals),
        floatToBigInt(10000, currency.decimals),
        floatToBigInt(41000, currency.decimals),
        floatToBigInt(100000, currency.decimals),
        floatToBigInt(1.1, currency.decimals),
        floatToBigInt(1.11, currency.decimals),
        floatToBigInt(1.111, currency.decimals),
        floatToBigInt(1.23, currency.decimals),
        floatToBigInt(1.234, currency.decimals),
        floatToBigInt(3.14, currency.decimals),
        floatToBigInt(3.141, currency.decimals),
        floatToBigInt(6.28, currency.decimals),
        floatToBigInt(6.281, currency.decimals),
        floatToBigInt(42.42, currency.decimals),
        floatToBigInt(7.5, currency.decimals),
      ];

      const aprBpsTestCases = new Array(20).fill(0).map((_, i) => BigInt(i + 1) * 100n);

      const durationTestCases = new Array(20)
        .fill(0)
        .map((_, i) => BigInt((i + 1) * 5) * BigInt(SECONDS_IN_DAY));

      const origFeePerTestCases = new Array(20).fill(0).map((_, i) => i + 1); // 1, 2, 3, ..., 20% more than the apr

      for (const principal of principalTestCases) {
        for (const aprBps of aprBpsTestCases) {
          for (const duration of durationTestCases) {
            for (const origFeePer of origFeePerTestCases) {
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
                expect(getEaprBps({ principal, aprBps, duration, fee: fee - 1n })).toBeLessThan(
                  expected,
                );
              }
            }
          }
        }
      }
    },
    60000,
  );
});
