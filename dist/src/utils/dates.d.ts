export declare const SECONDS_IN_MIN = 60;
export declare const SECONDS_IN_DAY: number;
export declare const millisToSeconds: (millis: number | bigint) => number;
export declare const secondsToMillis: (seconds: number | bigint) => number;
export declare const daysToSeconds: (days: number | bigint) => number;
export declare const secondsToDays: (seconds: number | bigint) => number;
type Seconds = bigint;
export declare const toDate: (date: Seconds | Date) => Date;
export {};
