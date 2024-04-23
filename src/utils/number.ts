export const SECONDS_IN_DAY = 60 * 60 * 24;

const toInteger = (bn: bigint | number): number => Number(bn.valueOf());
export const millisToSeconds = (millis: number | bigint) => Math.ceil(toInteger(millis) / 1_000);
export const bpsToPercentage = (bps: bigint | number) => toInteger(bps) / 10000;

type ObjectT<T extends string> = { [k in T]: number | bigint };
type ObjectValue<T extends string, O extends ObjectT<T>> = O extends { [k in T]: infer R }
  ? R | undefined
  : undefined;

export const sumBy = <T extends string, O extends ObjectT<T>>(
  array: readonly O[],
  key: T,
): ObjectValue<T, O> => {
  if (!array.length) return undefined as ObjectValue<T, O>;
  if (typeof array[0]?.[key] === 'bigint')
    return array.reduce((acc, item) => acc + BigInt(item[key]), 0n) as ObjectValue<T, O>;
  return array.reduce((acc, item) => acc + Number(item[key]), 0) as ObjectValue<T, O>;
};

export const maxBy = <T extends string, O extends ObjectT<T>>(
  array: readonly O[],
  key: T,
): ObjectValue<T, O> => {
  if (!array.length) return undefined as ObjectValue<T, O>;
  if (typeof array[0]?.[key] === 'bigint')
    return array.reduce(
      (acc, item) => (BigInt(item[key]) > acc ? BigInt(item[key]) : acc),
      0n,
    ) as ObjectValue<T, O>;
  return array.reduce(
    (acc, item) => (Number(item[key]) > acc ? Number(item[key]) : acc),
    0,
  ) as ObjectValue<T, O>;
};

type MinFunction = {
  <T extends number | bigint>(a: T, b: T): T;
  <T extends number | bigint>(a: T, b?: T): T;
  <T extends number | bigint>(a?: T, b?: T): T | undefined;
};
export const min: MinFunction = <T extends number | bigint>(a?: T, b?: T) => {
  if (a === undefined) return b;
  if (b === undefined) return a;
  return a < b ? a : b;
};
