import { Address } from "abitype";

import { zeroAddress } from "./blockchain";
import { getContracts } from "./deploys";
import * as model from "./model";

export const areSameAddress = (
  adr1: Address | null | undefined,
  adr2: Address | null | undefined
) => {
  return adr1 && adr2 && adr1.toLowerCase() === adr2.toLowerCase();
};

export const getDomain = (chainId: number, verifyingContract: Address) => {
  const {
    MultiSourceLoanV4Address,
    MultiSourceLoanV5Address,
    MultiSourceLoanV5_1Address,
  } = getContracts({ id: chainId });

  let version = "";

  if (areSameAddress(verifyingContract, MultiSourceLoanV4Address)) {
    version = "1";
  } else if (areSameAddress(verifyingContract, MultiSourceLoanV5Address)) {
    version = "2";
  } else if (areSameAddress(verifyingContract, MultiSourceLoanV5_1Address)) {
    version = "2"; // We deployed the new contract with the same version, but address differentiates it
  } else {
    throw new Error(`Invalid verifying contract address ${verifyingContract}`);
  }

  return {
    name: "GONDI_MULTI_SOURCE_LOAN",
    version,
    chainId,
    verifyingContract,
  };
};

const toInteger = (bn: bigint | number): number => Number(bn.valueOf());

export const millisToSeconds = (millis: number | bigint) =>
  Math.ceil(toInteger(millis) / 1_000);
export const SECONDS_IN_DAY = 60 * 60 * 24;

export const bpsToPercentage = (bps: bigint | number) => toInteger(bps) / 10000;

export const NATIVE_MARKETPLACE = "MarketPlace.Native";

export const emitLoanArgsToMslArgs = ({
  offer,
  tokenId,
  amount,
  expirationTime,
}: {
  offer: model.SingleNftOffer | model.CollectionOffer;
  tokenId: bigint;
  amount?: bigint;
  expirationTime?: bigint;
}) => {
  const contractOffer = {
    ...offer,
    lender: offer.lenderAddress,
    borrower: offer.borrowerAddress,
    signer: offer.signerAddress ?? zeroAddress,
    validators: offer.offerValidators,
    requiresLiquidation: !!offer.requiresLiquidation,
  };

  return {
    offer: contractOffer,
    signature: contractOffer.signature,
    tokenId,
    amount: amount ?? contractOffer.principalAmount,
    expirationTime:
      expirationTime ?? BigInt(millisToSeconds(Date.now()) + SECONDS_IN_DAY),
  };
};
