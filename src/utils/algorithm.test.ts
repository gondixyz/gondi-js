import { describe, expect, test } from 'bun:test';

import { lowerBound } from '@/utils/algorithm';

describe('lowerBound', () => {
  test('finds smallest x where predicate flips true', () => {
    expect(lowerBound(0n, 100n, (x) => x >= 42n)).toBe(42n);
  });

  test('returns lo when predicate is true at lo', () => {
    expect(lowerBound(10n, 100n, (x) => x >= 5n)).toBe(10n);
  });

  test('returns hi when predicate never becomes true in range', () => {
    expect(lowerBound(0n, 100n, (x) => x >= 200n)).toBe(100n);
  });

  test('returns lo when lo === hi', () => {
    expect(lowerBound(50n, 50n, () => true)).toBe(50n);
    expect(lowerBound(50n, 50n, () => false)).toBe(50n);
  });

  test('flip at lo boundary', () => {
    expect(lowerBound(5n, 100n, (x) => x >= 5n)).toBe(5n);
  });

  test('flip at hi boundary', () => {
    expect(lowerBound(0n, 100n, (x) => x >= 100n)).toBe(100n);
  });

  test('handles negative ranges', () => {
    expect(lowerBound(-100n, 100n, (x) => x >= -42n)).toBe(-42n);
    expect(lowerBound(-100n, -50n, (x) => x >= -75n)).toBe(-75n);
  });

  test('calls predicate O(log n) times', () => {
    let calls = 0;
    const hi = 1n << 30n;
    lowerBound(0n, hi, (x) => {
      calls++;
      return x >= hi / 2n;
    });
    // log2(2^30) = 30; allow a small margin.
    expect(calls).toBeLessThanOrEqual(32);
  });
});
