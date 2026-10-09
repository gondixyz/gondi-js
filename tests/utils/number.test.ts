import { expect, test } from 'bun:test';
import { mulDivUp } from '@/utils/number';

test.each([
  [0n, 90n, 90n, 0n],
  [5n, 0n, 90n, 0n],
  [1n, 90n, 90n, 1n],
  [1n, 1n, 90n, 1n],
])('rounds a nonnegative fee product correctly', (fee, amount, principal, expected) => {
  expect(mulDivUp(fee, amount, principal)).toBe(expected);
});
