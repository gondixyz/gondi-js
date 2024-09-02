export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export type OptionalNullable<T, K extends keyof T> = Omit<T, K> & {
    [P in K]?: T[P] | null | undefined;
};
export declare const isDefined: <T>(value: T | null | undefined) => value is T;
