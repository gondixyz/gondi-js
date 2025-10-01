/** overloaded version of Object.fromEntries that allows correct type inference */
export const fromEntries = <T extends string | number, S>(entries: [T, S][]): Record<T, S> =>
  entries.reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as Record<T, S>);

/** overloaded version of Object.entries that allows correct type inference */
export const entries = <T extends string | number, S>(obj: Record<T, S>): [T, S][] =>
  Object.entries(obj) as [T, S][];
