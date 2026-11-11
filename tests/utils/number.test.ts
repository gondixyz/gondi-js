import { describe, expect, test } from 'bun:test';
import { mulDivUp, perToBps } from '@/utils/number';

test.each([
  [0n, 90n, 90n, 0n],
  [5n, 0n, 90n, 0n],
  [1n, 90n, 90n, 1n],
  [1n, 1n, 90n, 1n],
])('rounds a nonnegative fee product correctly', (fee, amount, principal, expected) => {
  expect(mulDivUp(fee, amount, principal)).toBe(expected);
});

describe('perToBps', () => {
  test('keeps the whole basis point a two-decimal percentage names', () => {
    expect(perToBps(1.15)).toBe(115);
    expect(perToBps(9.03)).toBe(903);
  });

  test('converts every two-decimal percentage up to 100% to its exact basis points', () => {
    const basisPoints = Array.from({ length: 10_000 }, (_, index) => index + 1);
    expect(basisPoints.map((bps) => perToBps(Number((bps / 100).toFixed(2))))).toEqual(basisPoints);
  });

  test('still drops the fraction of a basis point below the whole one', () => {
    expect(perToBps(10.0599)).toBe(1005);
  });
});
