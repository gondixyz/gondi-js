export const SECONDS_IN_DAY = 60 * 60 * 24;

const toInteger = (bn: bigint | number): number => Number(bn.valueOf());
export const millisToSeconds = (millis: number | bigint) => Math.ceil(toInteger(millis) / 1_000);
export const bpsToPercentage = (bps: bigint | number) => toInteger(bps) / 10000;
