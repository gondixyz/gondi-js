import { Address } from "abitype";

export const areSameAddress = (
  adr1: Address | null | undefined,
  adr2: Address | null | undefined
) => {
  return adr1 && adr2 && adr1.toLowerCase() === adr2.toLowerCase();
};
