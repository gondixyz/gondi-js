import { Address, Hash } from "viem";

import {
  CollectionOfferInput as ApiCollectionOfferInput,
  CollectionSignedOfferInput,
  OffersSortInput,
  OfferStatus,
  RenegotiationOfferInput as ApiRenegotiationInput,
  SignedRenegotiationOfferInput,
  SingleNftOfferInput as ApiSingleNftOfferInput,
  SingleNftSignedOfferInput,
  MarketplaceEnum,
  UserFilter,
} from "@graphql-generated";

import { Loan as BlockchainLoan, Signature } from "@/blockchain";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type SingleNftOfferInput = Optional<
  Omit<
    ApiSingleNftOfferInput,
    "lenderAddress" | "signerAddress" | "offerValidators" | "contractAddress"
  >,
  "borrowerAddress"
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
  Omit<
    ApiCollectionOfferInput,
    "lenderAddress" | "signerAddress" | "offerValidators" | "contractAddress"
  >,
  "borrowerAddress"
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

export type RenegotiationInput = Omit<
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

export const MAX_NUMBER =
  115792089237316195423570985008687907853269984665640564039457584007913129639935n;

export type Loan = BlockchainLoan;

export type ListOffersProps = {
  limit?: number;
  cursor?: string;
  sortBy?: OffersSortInput;
  filterBy?: (
    | {
        nft: number;
      }
    | {
        collection: number;
      }
    | { borrower: Address }
    | { lender: Address }
    | { status: OfferStatus[] }
    | { onlyCollectionOffers: boolean }
    | {
        onlySingleNftOffers: boolean;
      }
  )[];
};

export type ListListingsProps = {
  collections?: number[];
  user?: UserFilter;
  marketPlaces?: MarketplaceEnum[];
  limit?: number;
  cursor?: string;
};
