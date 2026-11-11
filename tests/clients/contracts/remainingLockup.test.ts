import { afterAll, beforeAll, describe, expect, setSystemTime, test } from 'bun:test';

import { LoanV5, LoanV6 } from '@/blockchain';
import { MslV5 } from '@/clients/contracts/MslV5';
import { MslV6 } from '@/clients/contracts/MslV6';

const NOW = 1_800_000_000n;
const LENDER = '0x0000000000000000000000000000000000000003';
const MIN_LOCK_PERIOD_BPS = 1000n;

/** A contract wrapper whose only on-chain read is a 10% minimum lock period. */
const withMinLockPeriod = <T extends object>(prototype: T) =>
  Object.assign(Object.create(prototype), {
    contract: { read: { getMinLockPeriod: async () => MIN_LOCK_PERIOD_BPS } },
  }) as T;

const tranche = (startTime: bigint) => ({
  loanId: 1n,
  floor: 0n,
  principalAmount: 100n,
  lender: LENDER,
  accruedInterest: 0n,
  startTime,
  aprBps: 1000n,
});

const source = (startTime: bigint) => ({
  loanId: 1n,
  lender: LENDER,
  principalAmount: 100n,
  accruedInterest: 0n,
  startTime,
  aprBps: 1000n,
});

const loanFields = {
  contractAddress: LENDER,
  borrower: LENDER,
  nftCollateralTokenId: 1n,
  nftCollateralAddress: LENDER,
  principalAddress: LENDER,
  principalAmount: 200n,
  startTime: NOW - 1000n,
  duration: 10_000n,
};

/**
 * A partial refinance replaced one tranche ten seconds ago, so the newest tranche is not
 * the one at the end of the array. Its lock is 10% of the 9,010 seconds it has left to the
 * loan's end (901 seconds), of which 10 have passed.
 */
const remainingAfterPartialRefinance = 891;

describe('getRemainingLockupSeconds', () => {
  beforeAll(() => setSystemTime(new Date(Number(NOW) * 1000)));
  afterAll(() => setSystemTime());

  test('v6 locks on the newest tranche wherever refinancePartial left it', async () => {
    const loan = {
      ...loanFields,
      contractStartTime: NOW - 1000n,
      protocolFee: 0n,
      tranche: [tranche(NOW - 10n), tranche(NOW - 1000n)],
    } as LoanV6;

    expect(await withMinLockPeriod(MslV6.prototype).getRemainingLockupSeconds({ loan })).toBe(
      remainingAfterPartialRefinance,
    );
  });

  test('v5 locks on the newest source wherever refinancePartial left it', async () => {
    const loan = {
      ...loanFields,
      protocolFee: 0n,
      source: [source(NOW - 1000n), source(NOW - 10n)],
    } as unknown as LoanV5;

    expect(await withMinLockPeriod(MslV5.prototype).getRemainingLockupSeconds({ loan })).toBe(
      remainingAfterPartialRefinance,
    );
  });
});
