import { afterAll, beforeAll, describe, expect, setSystemTime, test } from 'bun:test';

import { remainingLockupSeconds } from '@/utils/loan';

const NOW = 1_800_000_000n;

describe('remainingLockupSeconds', () => {
  beforeAll(() => setSystemTime(new Date(Number(NOW) * 1000)));
  afterAll(() => setSystemTime());

  test('counts down 10% of the time from the newest tranche to the loan end', () => {
    expect(
      remainingLockupSeconds({
        loanEndTime: NOW + 9000n,
        newestStartTime: NOW - 10n,
        lockPeriodBps: 1000n,
      }),
    ).toBe(891);
  });

  test('is zero once the lock has elapsed, never negative', () => {
    expect(
      remainingLockupSeconds({
        loanEndTime: NOW + 9000n,
        newestStartTime: NOW - 1000n,
        lockPeriodBps: 1000n,
      }),
    ).toBe(0);
  });
});
