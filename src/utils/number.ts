export const SECONDS_IN_DAY = 60 * 60 * 24;

const toInteger = (bn: bigint | number): number => Number(bn.valueOf());
export const millisToSeconds = (millis: number | bigint) => Math.ceil(toInteger(millis) / 1_000);
export const bpsToPercentage = (bps: bigint | number) => toInteger(bps) / 10000;

type ObjectT<T extends string> = { [k in T]: number | bigint };
type ObjectValue<T extends string, O extends ObjectT<T>> = O extends { [k in T]: infer R }
  ? R | undefined
  : undefined;

export const sumBy = <T extends string, O extends ObjectT<T>>(
  array: O[],
  key: T,
): ObjectValue<T, O> => {
  if (!array.length) return undefined as ObjectValue<T, O>;
  if (typeof array[0]?.[key] === 'bigint')
    return array.reduce((acc, item) => acc + BigInt(item[key]), 0n) as ObjectValue<T, O>;
  return array.reduce((acc, item) => acc + Number(item[key]), 0) as ObjectValue<T, O>;
};
