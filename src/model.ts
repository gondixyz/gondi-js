import { Address, Hash } from 'viem';

import { Signature } from '@/blockchain';
import {
  CollectionOfferInput as ApiCollectionOfferInput,
  CollectionOrderType,
  CollectionSignedOfferInput,
  LoanSortInput,
  LoanStatusType,
  MarketplaceEnum,
  OffersSortInput,
  OfferStatus,
  OrderForNft,
  OrderMatchMode,
  OrderSide,
  OrderSortInput,
  OrderStatusType,
  RenegotiationOfferInput as ApiRenegotiationInput,
  SignedRenegotiationOfferInput,
  SingleNftOfferInput as ApiSingleNftOfferInput,
  SingleNftSignedOfferInput,
  TermsFilter,
  TraitOfferInput as ApiTraitOfferInput,
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

/** Terms of a loan offer on the NFTs of a collection carrying every one of `traitIds`; the API fills the validator. */
export type TraitOfferInput = Optional<
  ApiTraitOfferInput,
  'borrowerAddress' | 'lenderAddress' | 'signerAddress' | 'offerValidators' | 'contractAddress'
> &
  MaxSeniorRepaymentArg;

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
    contractAddresses?: Address[];
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

export type ListOrdersProps = {
  side?: OrderSide;
  collections?: number[];
  traits?: number[];
  nfts?: OrderForNft[];
  makers?: Address[];
  excludeMakers?: Address[];
  currencies?: Address[];
  /** Defaults to active orders only. */
  statuses?: OrderStatusType[];
  /**
   * `ANY` lists every bid that can fill with an item of `collections` (or of `traits`' collection):
   * item, trait, set and collection bids alike. Needs `side: BID`. Defaults to `ALL`.
   */
  matchMode?: OrderMatchMode;
  /** Narrows `collections` (or `traits` under `ANY`) to these bid types, e.g. only collection bids. */
  orderTypes?: CollectionOrderType[];
  sortBy?: OrderSortInput[];
  limit?: number;
  cursor?: string | null;
};

export type NftStandard = 'ERC721' | 'ERC1155';

export type TransferNftStandard = NftStandard | 'CryptoPunks' | 'OldERC721';
