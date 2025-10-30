type Falsy = false | 0 | '' | null | undefined | typeof NaN | 0n;

export const filterFalsy = <T>(array: (T | Falsy)[]): T[] =>
  array.filter((item) => Boolean(item)) as T[];
