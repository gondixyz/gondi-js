export declare const toInteger: (bn: bigint | number) => number;
export declare const bpsToPercentage: (bps: bigint | number) => number;
type ObjectT<T extends string> = {
    [k in T]: number | bigint;
};
type ObjectValue<T extends string, O extends ObjectT<T>> = O extends {
    [k in T]: infer R;
} ? R | undefined : undefined;
export declare const sumBy: <T extends string, O extends ObjectT<T>>(array: readonly O[], key: T) => ObjectValue<T, O>;
export declare const maxBy: <T extends string, O extends ObjectT<T>>(array: readonly O[], key: T) => ObjectValue<T, O>;
type MinFunction = {
    <T extends number | bigint>(a: T, b: T): T;
    <T extends number | bigint>(a: T, b?: T): T;
    <T extends number | bigint>(a?: T, b?: T): T | undefined;
};
export declare const min: MinFunction;
export {};
