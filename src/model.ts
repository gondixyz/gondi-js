import { Address, Hash } from 'viem';

import { Auction as BlockchainAuction, Signature } from '@/blockchain';
import {
  CollectionOfferInput as ApiCollectionOfferInput,
  CollectionSignedOfferInput,
  LoanSortInput,
  LoanStatusType,
  MarketplaceEnum,
  OffersSortInput,
  OfferStatus,
  RenegotiationOfferInput as ApiRenegotiationInput,
  SignedRenegotiationOfferInput,
  SingleNftOfferInput as ApiSingleNftOfferInput,
  SingleNftSignedOfferInput,
  TermsFilter,
  UserFilter,
} from '@/generated/graphql';

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type SingleNftOfferInput = Optional<
  ApiSingleNftOfferInput,
  'borrowerAddress' | 'lenderAddress' | 'signerAddress' | 'offerValidators' | 'contractAddress'
>;

export type UnsignedSingleNftOffer = Omit<SingleNftSignedOfferInput, 'signature'> & {
  nftCollateralAddress: Address;
  nftCollateralTokenId: bigint;
};

export type SingleNftOffer = UnsignedSingleNftOffer &
  SingleNftSignedOfferInput & {
    signature: Hash;
  };

export type CollectionOfferInput = Optional<
  ApiCollectionOfferInput,
  'borrowerAddress' | 'lenderAddress' | 'signerAddress' | 'offerValidators' | 'contractAddress'
>;

export type UnsignedCollectionOffer = Omit<CollectionSignedOfferInput, 'signature'> & {
  nftCollateralAddress: Address;
};

export type CollectionOffer = UnsignedCollectionOffer & {
  signature: Hash;
  nftCollateralTokenId: 0n;
};

export type RenegotiationInput = Optional<ApiRenegotiationInput, 'lenderAddress' | 'signerAddress'>;

export type UnsignedRenegotiationOffer = Omit<SignedRenegotiationOfferInput, 'signature'>;

export type RenegotiationOffer = UnsignedRenegotiationOffer & {
  signature: Signature;
};

/** @ignore */
export const MAX_NUMBER =
  115792089237316195423570985008687907853269984665640564039457584007913129639935n;

export type Auction = BlockchainAuction;

export type ListOffersProps = {
  limit?: number;
  cursor?: string | null;
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

export interface ListLoansProps {
  limit?: number;
  cursor?: string | null;
  borrowerAddress?: Address;
  collections?: number[];
  nfts?: number[];
  statuses?: LoanStatusType[];
  sortBy?: LoanSortInput;
  terms?: TermsFilter;
  orderByStatuses?: boolean;
  loansCurrencyAddress?: Address;
}

export type ListListingsProps = {
  collections?: number[];
  user?: UserFilter;
  marketPlaces?: MarketplaceEnum[];
  limit?: number;
  cursor?: string | null;
};
