import { toInteger } from '@/utils/number';

export const SECONDS_IN_MIN = 60;
export const SECONDS_IN_DAY = SECONDS_IN_MIN * 60 * 24;

export const millisToSeconds = (millis: number | bigint) => Math.ceil(toInteger(millis) / 1_000);
export const secondsToMillis = (seconds: number | bigint) => toInteger(seconds) * 1_000;
export const daysToSeconds = (days: number | bigint) => toInteger(days) * SECONDS_IN_DAY;
export const secondsToDays = (seconds: number | bigint) =>
  toInteger(Number(seconds) / SECONDS_IN_DAY);
