// Smallest x in [lo, hi] with predicate(x) true, assuming predicate flips
// from false to true monotonically. Returns hi if no x in range satisfies it.
export const lowerBound = (lo: bigint, hi: bigint, predicate: (x: bigint) => boolean): bigint => {
  while (lo < hi) {
    const mid = (lo + hi) / 2n;
    if (predicate(mid)) {
      hi = mid;
    } else {
      lo = mid + 1n;
    }
  }
  return lo;
};
