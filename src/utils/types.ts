export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export const isDefined = <T>(value: T | null | undefined): value is T =>
  value !== null && value !== undefined;
