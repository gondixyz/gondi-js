import { Address, Hash } from 'viem';

import { Signature } from '@/blockchain';
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
import { Optional } from '@/utils/types';

type MaxSeniorRepaymentArg = {
  maxSeniorRepayment: Exclude<ApiSingleNftOfferInput['maxSeniorRepayment'], null | undefined>;
};

export type SingleNftOfferInput = Optional<
  ApiSingleNftOfferInput,
  'borrowerAddress' | 'lenderAddress' | 'signerAddress' | 'offerValidators' | 'contractAddress'
> &
  MaxSeniorRepaymentArg;

export type UnsignedSingleNftOffer = Omit<SingleNftSignedOfferInput, 'signature'> & {
  nftCollateralAddress: Address;
  nftCollateralTokenId: bigint;
};

export type SingleNftOffer = UnsignedSingleNftOffer &
  SingleNftSignedOfferInput & {
    signature: Hash;
  } & MaxSeniorRepaymentArg;

export type CollectionOfferInput = Optional<
  ApiCollectionOfferInput,
  'borrowerAddress' | 'lenderAddress' | 'signerAddress' | 'offerValidators' | 'contractAddress'
> &
  MaxSeniorRepaymentArg;

export type UnsignedCollectionOffer = Omit<
  CollectionSignedOfferInput,
  'signature' | 'collectionId'
> & {
  nftCollateralAddress: Address;
};

export type CollectionOffer = UnsignedCollectionOffer & {
  signature: Hash;
  nftCollateralTokenId: 0n;
} & MaxSeniorRepaymentArg;

export type RenegotiationInput = Optional<
  ApiRenegotiationInput,
  'lenderAddress' | 'signerAddress'
> &
  (
    | {
        trancheIndex: Exclude<ApiRenegotiationInput['trancheIndex'], null | undefined>;
        targetPrincipal?: undefined;
      }
    | {
        trancheIndex?: undefined;
        targetPrincipal: Exclude<ApiRenegotiationInput['targetPrincipal'], null | undefined>;
      }
  );

export type UnsignedRenegotiationOffer = Omit<SignedRenegotiationOfferInput, 'signature'>;

export type RenegotiationOffer = UnsignedRenegotiationOffer & {
  signature: Signature;
};

/** @ignore */
export const MAX_NUMBER =
  115792089237316195423570985008687907853269984665640564039457584007913129639935n;

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
    lenders?: Address[];
    status?: OfferStatus[];
  };
};

export interface ListLoansProps {
  limit?: number;
  cursor?: string | null;
  borrowers?: Address[];
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
