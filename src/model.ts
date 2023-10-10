import { Address, Hash } from "viem";

import { Loan as BlockchainLoan, Signature } from "@/blockchain";
import {
  CollectionOfferInput as ApiCollectionOfferInput,
  CollectionSignedOfferInput,
  MarketplaceEnum,
  OffersSortInput,
  OfferStatus,
  RenegotiationOfferInput as ApiRenegotiationInput,
  SignedRenegotiationOfferInput,
  SingleNftOfferInput as ApiSingleNftOfferInput,
  SingleNftSignedOfferInput,
  UserFilter,
} from "@/generated/graphql";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type SingleNftOfferInput = Optional<
  ApiSingleNftOfferInput,
  | "borrowerAddress"
  | "lenderAddress"
  | "signerAddress"
  | "offerValidators"
  | "contractAddress"
>;

export type UnsignedSingleNftOffer = Omit<
  SingleNftSignedOfferInput,
  "signature"
> & {
  nftCollateralAddress: Address;
  nftCollateralTokenId: bigint;
};

export type SingleNftOffer = UnsignedSingleNftOffer &
  SingleNftSignedOfferInput & {
    signature: Hash;
  };

export type CollectionOfferInput = Optional<
  ApiCollectionOfferInput,
  | "borrowerAddress"
  | "lenderAddress"
  | "signerAddress"
  | "offerValidators"
  | "contractAddress"
>;

export type UnsignedCollectionOffer = Omit<
  CollectionSignedOfferInput,
  "signature"
> & {
  nftCollateralAddress: Address;
};

export type CollectionOffer = UnsignedCollectionOffer & {
  signature: Hash;
  nftCollateralTokenId: 0n;
};

export type RenegotiationInput = Optional<
  ApiRenegotiationInput,
  "lenderAddress" | "signerAddress"
>;

export type UnsignedRenegotiationOffer = Omit<
  SignedRenegotiationOfferInput,
  "signature"
>;

export type RenegotiationOffer = UnsignedRenegotiationOffer & {
  signature: Signature;
};

/** @ignore */
export const MAX_NUMBER =
  115792089237316195423570985008687907853269984665640564039457584007913129639935n;

export type Loan = BlockchainLoan & { contractAddress: Address };

export type ListOffersProps = {
  limit?: number;
  cursor?: string;
  sortBy?: OffersSortInput;
  filterBy?: {
    nft?: number;
    onlySingleNftOffers?: boolean;
    collection?: number;
    onlyCollectionOffers?: boolean;
    borrower?: Address;
    lender?: Address;
    status?: OfferStatus[];
  };
};

export type ListListingsProps = {
  collections?: number[];
  user?: UserFilter;
  marketPlaces?: MarketplaceEnum[];
  limit?: number;
  cursor?: string;
};

export type {
  OfferV4 as BlockchainOffer,
  Renegotiation as BlockchainRenegotiation,
} from "@/blockchain";
