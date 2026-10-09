import { describe, expect, test } from 'bun:test';
import { decodeAbiParameters, decodeFunctionData, encodePacked, parseAbi } from 'viem';

import {
  buildCrossCurrencySwap,
  calculateCrossCurrencyBudget,
  crossCurrencyDeadline,
} from '@/utils/crossCurrencyRenegotiation';
import { getTotalOwedAt } from '@/utils/loan';

const borrower = '0x0000000000000000000000000000000000001234';
const oldCurrency = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
const newCurrency = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
const router = '0x66a9893cC07D91D95644AEDD05D03f95e1dBA8Af';

describe('cross-currency settlement', () => {
  test('funds the router before swapping and refunds unused input to the borrower', () => {
    const data = buildCrossCurrencySwap({
      borrower,
      oldCurrency,
      newCurrency,
      router,
      repaymentAmount: 1000_000000n,
      maximumInput: 400000000000000000n,
      deadline: 200n,
    });
    const { args } = decodeFunctionData({
      abi: parseAbi(['function execute(bytes commands, bytes[] inputs, uint256 deadline) payable']),
      data,
    });
    const transfer = decodeAbiParameters(
      [{ type: 'address' }, { type: 'address' }, { type: 'uint160' }],
      args[1][0],
    );
    const swap = decodeAbiParameters(
      [
        { type: 'address' },
        { type: 'uint256' },
        { type: 'uint256' },
        { type: 'bytes' },
        { type: 'bool' },
      ],
      args[1][1],
    );
    const sweep = decodeAbiParameters(
      [{ type: 'address' }, { type: 'address' }, { type: 'uint256' }],
      args[1][2],
    );
    expect({ commands: args[0], transfer, swap, sweep, deadline: args[2] }).toEqual({
      commands: '0x020104',
      transfer: [newCurrency, router, 400000000000000000n],
      swap: [
        borrower,
        1000_000000n,
        400000000000000000n,
        encodePacked(['address', 'uint24', 'address'], [oldCurrency, 500, newCurrency]),
        false,
      ],
      sweep: [newCurrency, borrower, 0n],
      deadline: 200n,
    });
  });

  test('rounds input and flash premium upward without adding currencies together', () => {
    expect(
      calculateCrossCurrencyBudget({
        quotedInput: 101n,
        slippageBps: 100n,
        premiumBps: 5n,
        netNewPrincipal: 200n,
      }),
    ).toEqual({
      maximumInput: 103n,
      premium: 1n,
      maximumFlashRepayment: 104n,
      maximumTopUp: 0n,
      minimumSurplus: 96n,
    });
  });

  test('reports a borrower top-up when net new proceeds are insufficient', () => {
    expect(
      calculateCrossCurrencyBudget({
        quotedInput: 1000000n,
        slippageBps: 100n,
        premiumBps: 5n,
        netNewPrincipal: 500000n,
      }).maximumTopUp,
    ).toBe(510505n);
  });

  test('ends a quote before loan maturity or offer expiry', () => {
    expect(crossCurrencyDeadline({ now: 100n, maturity: 200n, expirations: [170n, 190n] })).toBe(
      170n,
    );
  });

  test('refuses an expired loan', () => {
    expect(() =>
      crossCurrencyDeadline({ now: 100n, maturity: 100n, expirations: [200n] }),
    ).toThrow();
  });

  test('does not charge a rounding unit for a zero-interest tranche', () => {
    expect(
      getTotalOwedAt(
        {
          tranche: [
            { principalAmount: 1000000n, accruedInterest: 0n, startTime: 100n, aprBps: 0n },
          ],
        },
        220n,
      ),
    ).toBe(1000000n);
  });

  test('includes accrued interest and rounds separately for every tranche', () => {
    expect(
      getTotalOwedAt(
        {
          tranche: [
            { principalAmount: 1000000n, accruedInterest: 3n, startTime: 100n, aprBps: 1000n },
            { principalAmount: 500000n, accruedInterest: 7n, startTime: 100n, aprBps: 2000n },
          ],
        },
        220n,
      ),
    ).toBe(1500012n);
  });

  test.each([-1n, 10001n])('rejects invalid slippage %s', (slippageBps) => {
    expect(() =>
      calculateCrossCurrencyBudget({
        quotedInput: 100n,
        slippageBps,
        premiumBps: 5n,
        netNewPrincipal: 200n,
      }),
    ).toThrow();
  });
});
