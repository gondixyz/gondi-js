export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
export type OptionalNullable<T, K extends keyof T> = Omit<T, K> & {
  [P in K]?: T[P] | null | undefined;
};
export const isDefined = <T>(value: T | null | undefined): value is T =>
  value !== null && value !== undefined;

export type ObjectValues<T> = T[keyof T];
