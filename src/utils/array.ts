type Falsy = false | 0 | '' | null | undefined | typeof NaN | 0n;

export const filterFalsy = <T>(array: (T | Falsy)[]): T[] =>
  array.filter((item) => Boolean(item)) as T[];

type ArrayElements<T> = { [K in keyof T]: T[K] extends readonly (infer U)[] ? U : never };

// Cartesian product — yields every combination of one element from each array.
export function* product<T extends readonly (readonly unknown[])[]>(
  ...arrays: T
): Generator<ArrayElements<T>> {
  if (arrays.length === 0) {
    yield [] as unknown as ArrayElements<T>;
    return;
  }
  const [first, ...rest] = arrays;
  for (const item of first) {
    for (const combo of product(...rest)) {
      yield [item, ...combo] as unknown as ArrayElements<T>;
    }
  }
}
