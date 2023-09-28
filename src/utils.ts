import { Address } from "abitype";

export const areSameAddress = (
  adr1: Address | null | undefined,
  adr2: Address | null | undefined
) => {
  return adr1 && adr2 && adr1.toLowerCase() === adr2.toLowerCase();
};

export const getDomain = (chainId: number, verifyingContract: Address) => ({
  name: "GONDI_MULTI_SOURCE_LOAN",
  version: "1",
  chainId,
  verifyingContract,
});

const toInteger = (bn: bigint | number): number => Number(bn.valueOf());

export const millisToSeconds = (millis: number | bigint) => Math.ceil(toInteger(millis) / 1_000);
export const SECONDS_IN_DAY = 60 * 60 * 24;
