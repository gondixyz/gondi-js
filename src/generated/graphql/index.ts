/* eslint-disable */
//@ts-nocheck
import { Address, Hash, Hex } from 'viem'
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Address: Address;
  BigInt: bigint;
  DateTime: Date;
  Hash: Hash;
  Hex: Hex;
  JSON: object;
  Signature: Hex;
  Void: any;
};

export type ActiveOfferNotification = Node & Notification & {
  __typename?: 'ActiveOfferNotification';
  createdOn: Scalars['DateTime'];
  id: Scalars['String'];
  notificationType: Scalars['String'];
  offer: Offer;
  offerId: Scalars['String'];
  readOn?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type Activity = {
  id: Scalars['String'];
  timestamp: Scalars['DateTime'];
  txHash?: Maybe<Scalars['Hash']>;
};

export type Asset = Node & {
  __typename?: 'Asset';
  accessTypeName: Scalars['String'];
  cacheUrl?: Maybe<Scalars['String']>;
  contentTypeMime: Scalars['String'];
  data: Scalars['String'];
  id: Scalars['String'];
};

export type Auction = Node & {
  __typename?: 'Auction';
  duration?: Maybe<Scalars['BigInt']>;
  endTime?: Maybe<Scalars['DateTime']>;
  highestBid?: Maybe<Bid>;
  id: Scalars['String'];
  loan: MultiSourceLoan;
  minBid: Scalars['BigInt'];
  originator?: Maybe<Scalars['Address']>;
  settler?: Maybe<Scalars['Address']>;
  startTime?: Maybe<Scalars['DateTime']>;
  status: Scalars['String'];
  triggerFee?: Maybe<Scalars['BigInt']>;
};

export type AuctionBidConfirmationNotification = Node & Notification & {
  __typename?: 'AuctionBidConfirmationNotification';
  auction: Auction;
  auctionId: Scalars['String'];
  bid: Bid;
  bidId: Scalars['Int'];
  createdOn: Scalars['DateTime'];
  id: Scalars['String'];
  loan: MultiSourceLoan;
  loanId: Scalars['String'];
  notificationType: Scalars['String'];
  readOn?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type AuctionConnection = {
  __typename?: 'AuctionConnection';
  edges: Array<AuctionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type AuctionEdge = {
  __typename?: 'AuctionEdge';
  cursor: Scalars['String'];
  node: Auction;
};

export type AuctionEndedNotification = Node & Notification & {
  __typename?: 'AuctionEndedNotification';
  auction: Auction;
  auctionId: Scalars['String'];
  createdOn: Scalars['DateTime'];
  id: Scalars['String'];
  loan: MultiSourceLoan;
  loanId: Scalars['String'];
  notificationType: Scalars['String'];
  readOn?: Maybe<Scalars['DateTime']>;
  user: User;
};

export enum AuctionSortField {
  EndTime = 'END_TIME'
}

export type AuctionSortInput = {
  field: AuctionSortField;
  order: Ordering;
};

export type AuctionStartedNotification = Node & Notification & {
  __typename?: 'AuctionStartedNotification';
  auction: Auction;
  auctionId: Scalars['String'];
  createdOn: Scalars['DateTime'];
  id: Scalars['String'];
  loan: MultiSourceLoan;
  loanId: Scalars['String'];
  notificationType: Scalars['String'];
  readOn?: Maybe<Scalars['DateTime']>;
  user: User;
};

export enum AuctionStatus {
  Ended = 'ENDED',
  Live = 'LIVE',
  Past = 'PAST',
  Upcoming = 'UPCOMING'
}

export type AuctionWonNotification = Node & Notification & {
  __typename?: 'AuctionWonNotification';
  auction: Auction;
  auctionId: Scalars['String'];
  createdOn: Scalars['DateTime'];
  id: Scalars['String'];
  loan: MultiSourceLoan;
  loanId: Scalars['String'];
  notificationType: Scalars['String'];
  readOn?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type BnplOrderInput = {
  amounts: Array<Scalars['BigInt']>;
  contractAddress: Scalars['Address'];
  emitSignature?: InputMaybe<Scalars['Signature']>;
  loanDuration: Scalars['BigInt'];
  offerIds: Array<Scalars['String']>;
  signature?: InputMaybe<Scalars['Signature']>;
  tokenId: Scalars['BigInt'];
};

export type Bid = Node & {
  __typename?: 'Bid';
  amount: Scalars['BigInt'];
  auction: Auction;
  auctionId: Scalars['String'];
  bidder: Scalars['Address'];
  id: Scalars['String'];
  indexInBlock: Scalars['Int'];
  timestamp: Scalars['DateTime'];
  txHash: Scalars['Hash'];
};

export type BidConnection = {
  __typename?: 'BidConnection';
  edges: Array<BidEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type BidEdge = {
  __typename?: 'BidEdge';
  cursor: Scalars['String'];
  node: Bid;
};

export enum BidSortField {
  Bid = 'BID',
  HighestBid = 'HIGHEST_BID'
}

export type BidSortInput = {
  field: BidSortField;
  order: Ordering;
};

export type BigIntCurrencyAmount = {
  __typename?: 'BigIntCurrencyAmount';
  amount: Scalars['BigInt'];
  currency: Currency;
};

export type BigIntInterval = {
  max?: InputMaybe<Scalars['BigInt']>;
  min?: InputMaybe<Scalars['BigInt']>;
};

export type BuyNowPayLaterOrder = Activity & Node & Order & {
  __typename?: 'BuyNowPayLaterOrder';
  createdDate: Scalars['DateTime'];
  currency: Currency;
  currencyAddress: Scalars['Address'];
  emitCalldata: Scalars['Hex'];
  evmOrder?: Maybe<Scalars['JSON']>;
  expiration: Scalars['DateTime'];
  fees: Scalars['BigInt'];
  hidden: Scalars['Boolean'];
  id: Scalars['String'];
  isAsk: Scalars['Boolean'];
  isPrivate: Scalars['Boolean'];
  maker: Scalars['Address'];
  marketPlace: Scalars['String'];
  marketPlaceAddress: Scalars['Address'];
  netAmount: Scalars['BigInt'];
  nft: Nft;
  nftId: Scalars['Int'];
  nonce: Scalars['BigInt'];
  orderType: Scalars['String'];
  originalId: Scalars['Hash'];
  price: Scalars['BigInt'];
  signature: Scalars['Signature'];
  startTime: Scalars['DateTime'];
  status: Scalars['String'];
  taker: Scalars['Address'];
  timestamp: Scalars['DateTime'];
  txHash?: Maybe<Scalars['Hash']>;
};

export type BuyNowPayLaterOrderSignatureRequest = BuyNowPayLaterOrder | SignatureRequest;

/** An NFT collection. */
export type Collection = Node & {
  __typename?: 'Collection';
  bannerImage?: Maybe<Asset>;
  collectionUrl?: Maybe<Scalars['String']>;
  contractData: ContractData;
  description?: Maybe<Scalars['String']>;
  discordUrl?: Maybe<Scalars['String']>;
  externalUrl?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  image?: Maybe<Asset>;
  imageId?: Maybe<Scalars['String']>;
  maxNetPrincipalOffer?: Maybe<CollectionOffer>;
  name?: Maybe<Scalars['String']>;
  nftsCount?: Maybe<Scalars['Int']>;
  slug: Scalars['String'];
  statistics: CollectionStatistics;
  twitterUsername?: Maybe<Scalars['String']>;
  verified: Scalars['Boolean'];
  wrappedCollection?: Maybe<Collection>;
  wrappedCollectionId?: Maybe<Scalars['Int']>;
  wrapperCollections: Array<Collection>;
};


/** An NFT collection. */
export type CollectionMaxNetPrincipalOfferArgs = {
  currencyAddress: Scalars['Address'];
};

export type CollectionConnection = {
  __typename?: 'CollectionConnection';
  edges: Array<CollectionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CollectionEdge = {
  __typename?: 'CollectionEdge';
  cursor: Scalars['String'];
  node: Collection;
};

export type CollectionEventsCountByDayAndCurrency = {
  __typename?: 'CollectionEventsCountByDayAndCurrency';
  auctions: Scalars['BigInt'];
  buyouts: Scalars['BigInt'];
  defaults: Scalars['BigInt'];
  foreclosings: Scalars['BigInt'];
  originations: Scalars['BigInt'];
  refinancings: Scalars['BigInt'];
  renegotiations: Scalars['BigInt'];
  repayments: Scalars['BigInt'];
  topUps: Scalars['BigInt'];
};

export type CollectionLoansData = {
  __typename?: 'CollectionLoansData';
  maxAprBps: Scalars['Float'];
  maxPrincipalAmount: Scalars['BigInt'];
  maxRemainingTime: Scalars['BigInt'];
  minAprBps: Scalars['Float'];
  minPrincipalAmount: Scalars['BigInt'];
  minRemainingTime: Scalars['BigInt'];
};

export type CollectionOffer = Node & Offer & {
  __typename?: 'CollectionOffer';
  aprBps: Scalars['BigInt'];
  availablePrincipalAmount: Scalars['BigInt'];
  borrowerAddress?: Maybe<Scalars['Address']>;
  capacity: Scalars['BigInt'];
  collection: Collection;
  consumedCapacity: Scalars['BigInt'];
  contractAddress: Scalars['Address'];
  createdDate?: Maybe<Scalars['DateTime']>;
  currency: Currency;
  duration: Scalars['BigInt'];
  expirationTime: Scalars['BigInt'];
  fee: Scalars['BigInt'];
  hidden?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  lenderAddress?: Maybe<Scalars['Address']>;
  lenderAvailableBalance?: Maybe<Scalars['BigInt']>;
  maxPrincipal: Scalars['BigInt'];
  maxSeniorRepayment: Scalars['BigInt'];
  /**
   * Deprecated field: use maxSeniorRepayment instead.
   * @deprecated Use maxSeniorRepayment instead.
   */
  maxTrancheFloor: Scalars['BigInt'];
  netPrincipal: Scalars['BigInt'];
  offerHash?: Maybe<Scalars['Hash']>;
  offerId: Scalars['BigInt'];
  principalAddress: Scalars['Address'];
  principalAmount: Scalars['BigInt'];
  repayment: Scalars['BigInt'];
  requiresLiquidation?: Maybe<Scalars['Boolean']>;
  signature?: Maybe<Scalars['Signature']>;
  signerAddress?: Maybe<Scalars['Address']>;
  statistics: CollectionOfferStatistics;
  status: Scalars['String'];
  validators: Array<OfferValidator>;
};

export type CollectionOfferInput = {
  aprBps: Scalars['BigInt'];
  borrowerAddress: Scalars['Address'];
  capacity: Scalars['BigInt'];
  collectionId: Scalars['Int'];
  contractAddress: Scalars['Address'];
  duration: Scalars['BigInt'];
  expirationTime: Scalars['BigInt'];
  fee: Scalars['BigInt'];
  lenderAddress: Scalars['Address'];
  maxSeniorRepayment?: InputMaybe<Scalars['BigInt']>;
  maxTrancheFloor?: InputMaybe<Scalars['BigInt']>;
  offerValidators: Array<OfferValidatorInput>;
  principalAddress: Scalars['Address'];
  principalAmount: Scalars['BigInt'];
  requiresLiquidation?: InputMaybe<Scalars['Boolean']>;
  signerAddress?: InputMaybe<Scalars['Address']>;
};

export type CollectionOfferStatistics = {
  __typename?: 'CollectionOfferStatistics';
  acceptedLoans: Scalars['Int'];
  consumedCapacity: Scalars['BigInt'];
};

export type CollectionOrder = Activity & Node & Order & {
  __typename?: 'CollectionOrder';
  collection: Collection;
  collectionId: Scalars['Int'];
  createdDate: Scalars['DateTime'];
  currency: Currency;
  currencyAddress: Scalars['Address'];
  evmOrder?: Maybe<Scalars['JSON']>;
  executions: Scalars['Int'];
  expiration: Scalars['DateTime'];
  fees: Scalars['BigInt'];
  hidden: Scalars['Boolean'];
  id: Scalars['String'];
  isAsk: Scalars['Boolean'];
  isPrivate: Scalars['Boolean'];
  maker: Scalars['Address'];
  marketPlace: Scalars['String'];
  marketPlaceAddress: Scalars['Address'];
  maxExecutions: Scalars['Int'];
  netAmount: Scalars['BigInt'];
  nonce: Scalars['BigInt'];
  orderType: Scalars['String'];
  originalId: Scalars['Hash'];
  price: Scalars['BigInt'];
  signature: Scalars['Signature'];
  startTime: Scalars['DateTime'];
  status: Scalars['String'];
  taker: Scalars['Address'];
  timestamp: Scalars['DateTime'];
  txHash?: Maybe<Scalars['Hash']>;
};

export type CollectionOrderInput = {
  amount: Scalars['BigInt'];
  collectionId: Scalars['Int'];
  currencyAddress: Scalars['Address'];
  expirationTime: Scalars['BigInt'];
  isAsk?: InputMaybe<Scalars['Boolean']>;
  maxExecutions?: InputMaybe<Scalars['BigInt']>;
  signature?: InputMaybe<Scalars['Signature']>;
  startTime: Scalars['BigInt'];
  taker?: InputMaybe<Scalars['Address']>;
};

export type CollectionOrderSignatureRequest = CollectionOrder | SignatureRequest;

export type CollectionSignedOfferInput = {
  aprBps: Scalars['BigInt'];
  borrowerAddress: Scalars['Address'];
  capacity: Scalars['BigInt'];
  collectionId: Scalars['Int'];
  contractAddress: Scalars['Address'];
  duration: Scalars['BigInt'];
  expirationTime: Scalars['BigInt'];
  fee: Scalars['BigInt'];
  lenderAddress: Scalars['Address'];
  maxSeniorRepayment?: InputMaybe<Scalars['BigInt']>;
  maxTrancheFloor?: InputMaybe<Scalars['BigInt']>;
  offerHash: Scalars['Hash'];
  offerId: Scalars['BigInt'];
  offerValidators: Array<OfferValidatorInput>;
  principalAddress: Scalars['Address'];
  principalAmount: Scalars['BigInt'];
  requiresLiquidation?: InputMaybe<Scalars['Boolean']>;
  signature: Scalars['Signature'];
  signerAddress?: InputMaybe<Scalars['Address']>;
};

export enum CollectionSortField {
  ListingCount = 'LISTING_COUNT',
  LoanCount = 'LOAN_COUNT',
  OfferCount = 'OFFER_COUNT',
  OutstandingPrincipal = 'OUTSTANDING_PRINCIPAL',
  TotalLoanVolume = 'TOTAL_LOAN_VOLUME',
  TotalOutstandingPrincipal = 'TOTAL_OUTSTANDING_PRINCIPAL',
  TotalVolume = 'TOTAL_VOLUME',
  TrendingVolume = 'TRENDING_VOLUME'
}

export type CollectionSortInput = {
  field: CollectionSortField;
  order: Ordering;
  principalAddress?: InputMaybe<Scalars['Address']>;
};

export type CollectionStatistics = {
  __typename?: 'CollectionStatistics';
  bestOffer?: Maybe<CurrencyAmount>;
  floorPrice?: Maybe<CurrencyAmount>;
  floorPrice7d?: Maybe<Scalars['Float']>;
  floorPrice30d?: Maybe<Scalars['Float']>;
  maxAskPrice?: Maybe<BigIntCurrencyAmount>;
  minAskPrice?: Maybe<BigIntCurrencyAmount>;
  nftsCount?: Maybe<Scalars['Float']>;
  numberOfOffers: Scalars['Float'];
  numberOfPricedNfts: Scalars['Int'];
  outstandingLoanCount: Scalars['Int'];
  outstandingNftsCount: Scalars['BigInt'];
  outstandingPrincipal: Scalars['BigInt'];
  percentageInOutstandingLoans: Scalars['Float'];
  repaymentRate: Scalars['Float'];
  totalLoanVolume: Scalars['BigInt'];
  totalLoanVolume1d: Scalars['BigInt'];
  totalLoanVolume1m: Scalars['BigInt'];
  totalLoanVolume1w: Scalars['BigInt'];
  totalLoanVolume1y: Scalars['BigInt'];
  totalLoanVolume2m: Scalars['BigInt'];
  totalLoanVolume3m: Scalars['BigInt'];
  totalLoanVolume4m: Scalars['BigInt'];
  totalOutstandingPrincipal: Scalars['BigInt'];
  totalVolume?: Maybe<Scalars['Float']>;
  totalVolume1d?: Maybe<Scalars['Float']>;
  totalVolume1m?: Maybe<Scalars['Float']>;
  totalVolume1w?: Maybe<Scalars['Float']>;
  totalVolume1y?: Maybe<Scalars['Float']>;
  totalVolume2m?: Maybe<Scalars['Float']>;
  totalVolume3m?: Maybe<Scalars['Float']>;
  totalVolume4m?: Maybe<Scalars['Float']>;
};


export type CollectionStatisticsMaxAskPriceArgs = {
  currencyAddresses?: InputMaybe<Array<Scalars['Address']>>;
};


export type CollectionStatisticsMinAskPriceArgs = {
  currencyAddresses?: InputMaybe<Array<Scalars['Address']>>;
};


export type CollectionStatisticsNumberOfOffersArgs = {
  currencyAddress: Scalars['Address'];
};


export type CollectionStatisticsOutstandingPrincipalArgs = {
  currencyAddress: Scalars['Address'];
};


export type CollectionStatisticsTotalLoanVolumeArgs = {
  currencyAddress: Scalars['Address'];
};


export type CollectionStatisticsTotalLoanVolume1dArgs = {
  currencyAddress: Scalars['Address'];
};


export type CollectionStatisticsTotalLoanVolume1mArgs = {
  currencyAddress: Scalars['Address'];
};


export type CollectionStatisticsTotalLoanVolume1wArgs = {
  currencyAddress: Scalars['Address'];
};


export type CollectionStatisticsTotalLoanVolume1yArgs = {
  currencyAddress: Scalars['Address'];
};


export type CollectionStatisticsTotalLoanVolume2mArgs = {
  currencyAddress: Scalars['Address'];
};


export type CollectionStatisticsTotalLoanVolume3mArgs = {
  currencyAddress: Scalars['Address'];
};


export type CollectionStatisticsTotalLoanVolume4mArgs = {
  currencyAddress: Scalars['Address'];
};

export type ContractData = Node & {
  __typename?: 'ContractData';
  blockchain: Scalars['String'];
  contractAddress: Scalars['Address'];
  createdDate: Scalars['DateTime'];
  creatorAddress?: Maybe<Scalars['Address']>;
  id: Scalars['String'];
  standard: Scalars['String'];
};

export type Currency = Node & {
  __typename?: 'Currency';
  address: Scalars['Address'];
  currentEthRate?: Maybe<Scalars['Float']>;
  currentUsdcPrice?: Maybe<Scalars['Float']>;
  decimals: Scalars['Int'];
  id: Scalars['String'];
  symbol: Scalars['String'];
};

export type CurrencyAmount = {
  __typename?: 'CurrencyAmount';
  amount: Scalars['Float'];
  currency: Currency;
};

export type CurrencyConnection = {
  __typename?: 'CurrencyConnection';
  edges: Array<CurrencyEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CurrencyEdge = {
  __typename?: 'CurrencyEdge';
  cursor: Scalars['String'];
  node: Currency;
};

export type Delegation = Node & {
  __typename?: 'Delegation';
  contractAddress: Scalars['String'];
  delegateTo: Scalars['Address'];
  id: Scalars['String'];
  nft: Nft;
  timestamp: Scalars['DateTime'];
};

export type DelegationConnection = {
  __typename?: 'DelegationConnection';
  edges: Array<DelegationEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type DelegationEdge = {
  __typename?: 'DelegationEdge';
  cursor: Scalars['String'];
  node: Delegation;
};

export type Erc4626Deposit = Node & PoolActivity & {
  __typename?: 'ERC4626Deposit';
  assets: Scalars['BigInt'];
  caller: Scalars['Address'];
  id: Scalars['String'];
  indexInBlock: Scalars['Int'];
  owner: Scalars['Address'];
  pool: Pool;
  poolAddress: Scalars['Address'];
  shares: Scalars['BigInt'];
  timestamp: Scalars['DateTime'];
  txHash: Scalars['Hash'];
};

export type Erc4626Withdraw = Node & PoolActivity & {
  __typename?: 'ERC4626Withdraw';
  assets: Scalars['BigInt'];
  caller: Scalars['Address'];
  id: Scalars['String'];
  indexInBlock: Scalars['Int'];
  owner: Scalars['Address'];
  pool: Pool;
  poolAddress: Scalars['Address'];
  receiver: Scalars['Address'];
  shares: Scalars['BigInt'];
  timestamp: Scalars['DateTime'];
  txHash: Scalars['Hash'];
};

export type Interval = {
  max?: InputMaybe<Scalars['Float']>;
  min?: InputMaybe<Scalars['Float']>;
};

export type LinkedWallets = Node & {
  __typename?: 'LinkedWallets';
  id: Scalars['String'];
  pending: Scalars['Boolean'];
  shouldAccept: Scalars['Boolean'];
  walletAddress: Scalars['String'];
};

export type Listing = Node & {
  __typename?: 'Listing';
  createdDate: Scalars['DateTime'];
  desiredDuration?: Maybe<Scalars['Int']>;
  desiredPrincipalAddress?: Maybe<Scalars['Address']>;
  expirationDate: Scalars['DateTime'];
  id: Scalars['String'];
  marketplaceName: MarketplaceEnum;
  nft: Nft;
  user: User;
};

export type ListingConnection = {
  __typename?: 'ListingConnection';
  edges: Array<ListingEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ListingEdge = {
  __typename?: 'ListingEdge';
  cursor: Scalars['String'];
  node: Listing;
};

export type Loan = {
  activities: Array<LoanActivity>;
  address: Scalars['Address'];
  borrowerAddress: Scalars['Address'];
  contractStartTime: Scalars['DateTime'];
  currency: Currency;
  duration: Scalars['BigInt'];
  id: Scalars['String'];
  indexInBlock: Scalars['Int'];
  loanId: Scalars['Int'];
  /**
   * Deprecated field. Use offerIds to return loan offer ids instead.
   * @deprecated Use offerIds to return loan offer ids instead.
   */
  offer: Offer;
  offerIds: Array<Scalars['String']>;
  principalAddress: Scalars['Address'];
  protocolFee: Scalars['BigInt'];
  repaidActivity?: Maybe<LoanRepaid>;
  repaymentTime?: Maybe<Scalars['DateTime']>;
  startTime: Scalars['DateTime'];
  status: Scalars['String'];
  timestamp: Scalars['DateTime'];
  txHash: Scalars['Hash'];
};

export type LoanActivitiesStatisticsByMonth = {
  __typename?: 'LoanActivitiesStatisticsByMonth';
  count: Array<Scalars['Int']>;
  outstanding: Array<Scalars['BigInt']>;
};

export type LoanActivity = {
  activityType: Scalars['String'];
  eventType: Scalars['String'];
  id: Scalars['String'];
  indexInBlock: Scalars['Int'];
  loan: Loan;
  loanId: Scalars['String'];
  multiSourceLoanHistory: MultiSourceLoanHistory;
  nextActivity?: Maybe<LoanActivity>;
  prevActivity?: Maybe<LoanActivity>;
  timestamp: Scalars['DateTime'];
  txHash: Scalars['Hash'];
};

export type LoanActivityConnection = {
  __typename?: 'LoanActivityConnection';
  edges: Array<LoanActivityEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type LoanActivityEdge = {
  __typename?: 'LoanActivityEdge';
  cursor: Scalars['String'];
  node: LoanActivity;
};

export enum LoanActivitySortField {
  Timestamp = 'TIMESTAMP'
}

export type LoanActivitySortInput = {
  field: LoanActivitySortField;
  order: Ordering;
};

export enum LoanActivityType {
  LoanAuctioned = 'LOAN_AUCTIONED',
  LoanExtended = 'LOAN_EXTENDED',
  LoanForeclosed = 'LOAN_FORECLOSED',
  LoanInitiated = 'LOAN_INITIATED',
  LoanRefinanced = 'LOAN_REFINANCED',
  LoanRefinancedFromOffers = 'LOAN_REFINANCED_FROM_OFFERS',
  LoanRepaid = 'LOAN_REPAID',
  LoanSentToAuction = 'LOAN_SENT_TO_AUCTION'
}

export type LoanAuctioned = LoanActivity & LoanEvent & Node & {
  __typename?: 'LoanAuctioned';
  activityType: Scalars['String'];
  eventType: Scalars['String'];
  id: Scalars['String'];
  indexInBlock: Scalars['Int'];
  loan: Loan;
  loanId: Scalars['String'];
  loanPayments: Array<LoanPayment>;
  multiSourceLoanHistory: MultiSourceLoanHistory;
  nextActivity?: Maybe<LoanActivity>;
  prevActivity?: Maybe<LoanActivity>;
  timestamp: Scalars['DateTime'];
  totalAuctioned: Scalars['BigInt'];
  txHash: Scalars['Hash'];
  withBuyout: Scalars['Boolean'];
};

export type LoanAuctionedNotification = Node & Notification & {
  __typename?: 'LoanAuctionedNotification';
  auction: Auction;
  auctionId: Scalars['String'];
  createdOn: Scalars['DateTime'];
  id: Scalars['String'];
  loan: MultiSourceLoan;
  loanId: Scalars['String'];
  notificationType: Scalars['String'];
  readOn?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type LoanDefaultReminderNotification = Node & Notification & {
  __typename?: 'LoanDefaultReminderNotification';
  createdOn: Scalars['DateTime'];
  defaultsInHours: Scalars['Int'];
  id: Scalars['String'];
  loan: MultiSourceLoan;
  loanId: Scalars['String'];
  notificationType: Scalars['String'];
  readOn?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type LoanDefaulted = LoanEvent & Node & {
  __typename?: 'LoanDefaulted';
  eventType: Scalars['String'];
  id: Scalars['String'];
  loan: Loan;
  loanId: Scalars['String'];
  timestamp: Scalars['DateTime'];
};

export type LoanDefaultedNotification = Node & Notification & {
  __typename?: 'LoanDefaultedNotification';
  createdOn: Scalars['DateTime'];
  id: Scalars['String'];
  loan: MultiSourceLoan;
  loanId: Scalars['String'];
  notificationType: Scalars['String'];
  readOn?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type LoanEvent = {
  eventType: Scalars['String'];
  id: Scalars['String'];
  loan: Loan;
  loanId: Scalars['String'];
  timestamp: Scalars['DateTime'];
};

export type LoanEventConnection = {
  __typename?: 'LoanEventConnection';
  edges: Array<LoanEventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type LoanEventEdge = {
  __typename?: 'LoanEventEdge';
  cursor: Scalars['String'];
  node: LoanEvent;
};

export enum LoanEventSortField {
  Timestamp = 'TIMESTAMP'
}

export type LoanEventSortInput = {
  field: LoanEventSortField;
  order: Ordering;
};

export enum LoanEventType {
  LoanAuctioned = 'LOAN_AUCTIONED',
  LoanBoughtOut = 'LOAN_BOUGHT_OUT',
  LoanDefaulted = 'LOAN_DEFAULTED',
  LoanExtended = 'LOAN_EXTENDED',
  LoanForeclosed = 'LOAN_FORECLOSED',
  LoanInitiated = 'LOAN_INITIATED',
  LoanRefinanced = 'LOAN_REFINANCED',
  LoanRenegotiated = 'LOAN_RENEGOTIATED',
  LoanRepaid = 'LOAN_REPAID',
  LoanSentToAuction = 'LOAN_SENT_TO_AUCTION',
  LoanTopedUp = 'LOAN_TOPED_UP'
}

export type LoanExtended = LoanActivity & LoanEvent & Node & {
  __typename?: 'LoanExtended';
  activityType: Scalars['String'];
  eventType: Scalars['String'];
  id: Scalars['String'];
  indexInBlock: Scalars['Int'];
  loan: Loan;
  loanId: Scalars['String'];
  multiSourceLoanHistory: MultiSourceLoanHistory;
  nextActivity?: Maybe<LoanActivity>;
  prevActivity?: Maybe<LoanActivity>;
  timestamp: Scalars['DateTime'];
  txHash: Scalars['Hash'];
};

export type LoanExtendedNotification = Node & Notification & {
  __typename?: 'LoanExtendedNotification';
  createdOn: Scalars['DateTime'];
  id: Scalars['String'];
  newHistory: MultiSourceLoanHistory;
  newHistoryId: Scalars['String'];
  notificationType: Scalars['String'];
  previousHistory: MultiSourceLoanHistory;
  previousHistoryId: Scalars['String'];
  readOn?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type LoanForeclosed = LoanActivity & LoanEvent & Node & {
  __typename?: 'LoanForeclosed';
  activityType: Scalars['String'];
  eventType: Scalars['String'];
  id: Scalars['String'];
  indexInBlock: Scalars['Int'];
  loan: Loan;
  loanId: Scalars['String'];
  multiSourceLoanHistory: MultiSourceLoanHistory;
  nextActivity?: Maybe<LoanActivity>;
  prevActivity?: Maybe<LoanActivity>;
  timestamp: Scalars['DateTime'];
  txHash: Scalars['Hash'];
};

export type LoanInitiated = LoanActivity & LoanEvent & Node & {
  __typename?: 'LoanInitiated';
  activityType: Scalars['String'];
  eventType: Scalars['String'];
  id: Scalars['String'];
  indexInBlock: Scalars['Int'];
  loan: Loan;
  loanId: Scalars['String'];
  multiSourceLoanHistory: MultiSourceLoanHistory;
  nextActivity?: Maybe<LoanActivity>;
  prevActivity?: Maybe<LoanActivity>;
  timestamp: Scalars['DateTime'];
  txHash: Scalars['Hash'];
};

export type LoanPayment = Node & {
  __typename?: 'LoanPayment';
  accruedInterest: Scalars['BigInt'];
  activityId: Scalars['String'];
  destination: Scalars['Address'];
  id: Scalars['String'];
  pendingInterest: Scalars['BigInt'];
  principalAddress: Scalars['Address'];
  principalAmount: Scalars['BigInt'];
  protocolFee: Scalars['BigInt'];
  source: Scalars['Address'];
};

export type LoanRefinanced = LoanActivity & LoanEvent & Node & {
  __typename?: 'LoanRefinanced';
  activityType: Scalars['String'];
  addedNewTranche: Scalars['Boolean'];
  eventType: Scalars['String'];
  id: Scalars['String'];
  indexInBlock: Scalars['Int'];
  isRenegotiation: Scalars['Boolean'];
  loan: Loan;
  loanId: Scalars['String'];
  multiSourceLoanHistory: MultiSourceLoanHistory;
  nextActivity?: Maybe<LoanActivity>;
  prevActivity?: Maybe<LoanActivity>;
  timestamp: Scalars['DateTime'];
  txHash: Scalars['Hash'];
};

export type LoanRefinancedFromOffers = LoanActivity & LoanEvent & Node & {
  __typename?: 'LoanRefinancedFromOffers';
  activityType: Scalars['String'];
  eventType: Scalars['String'];
  id: Scalars['String'];
  indexInBlock: Scalars['Int'];
  loan: Loan;
  loanId: Scalars['String'];
  multiSourceLoanHistory: MultiSourceLoanHistory;
  nextActivity?: Maybe<LoanActivity>;
  prevActivity?: Maybe<LoanActivity>;
  timestamp: Scalars['DateTime'];
  txHash: Scalars['Hash'];
};

export type LoanRefinancedNotification = Node & Notification & {
  __typename?: 'LoanRefinancedNotification';
  createdOn: Scalars['DateTime'];
  id: Scalars['String'];
  newHistory: MultiSourceLoanHistory;
  newHistoryId: Scalars['String'];
  notificationType: Scalars['String'];
  previousHistory: MultiSourceLoanHistory;
  previousHistoryId: Scalars['String'];
  readOn?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type LoanRepaid = LoanActivity & LoanEvent & Node & {
  __typename?: 'LoanRepaid';
  activityType: Scalars['String'];
  eventType: Scalars['String'];
  id: Scalars['String'];
  indexInBlock: Scalars['Int'];
  loan: Loan;
  loanId: Scalars['String'];
  multiSourceLoanHistory: MultiSourceLoanHistory;
  nextActivity?: Maybe<LoanActivity>;
  prevActivity?: Maybe<LoanActivity>;
  timestamp: Scalars['DateTime'];
  totalInterest: Scalars['BigInt'];
  txHash: Scalars['Hash'];
};

export type LoanRepaidNotification = Node & Notification & {
  __typename?: 'LoanRepaidNotification';
  createdOn: Scalars['DateTime'];
  id: Scalars['String'];
  loan: MultiSourceLoan;
  loanId: Scalars['String'];
  notificationType: Scalars['String'];
  readOn?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type LoanSentToAuction = LoanActivity & LoanEvent & Node & {
  __typename?: 'LoanSentToAuction';
  activityType: Scalars['String'];
  eventType: Scalars['String'];
  id: Scalars['String'];
  indexInBlock: Scalars['Int'];
  liquidatorAddress: Scalars['String'];
  loan: Loan;
  loanId: Scalars['String'];
  multiSourceLoanHistory: MultiSourceLoanHistory;
  nextActivity?: Maybe<LoanActivity>;
  prevActivity?: Maybe<LoanActivity>;
  timestamp: Scalars['DateTime'];
  txHash: Scalars['Hash'];
};

export enum LoanSortField {
  AprBps = 'APR_BPS',
  Duration = 'DURATION',
  EffectiveAprBps = 'EFFECTIVE_APR_BPS',
  EndDate = 'END_DATE',
  ExpectedInterest = 'EXPECTED_INTEREST',
  ExpirationDate = 'EXPIRATION_DATE',
  OriginationFee = 'ORIGINATION_FEE',
  PaidInterest = 'PAID_INTEREST',
  PrincipalAmount = 'PRINCIPAL_AMOUNT',
  RenegotiationRequested = 'RENEGOTIATION_REQUESTED',
  StartTime = 'START_TIME',
  TotalInterest = 'TOTAL_INTEREST'
}

export type LoanSortInput = {
  field: LoanSortField;
  order: Ordering;
};

export enum LoanStatusType {
  LoanAuctioned = 'LOAN_AUCTIONED',
  LoanAuctionedWithBuyout = 'LOAN_AUCTIONED_WITH_BUYOUT',
  LoanDefaulted = 'LOAN_DEFAULTED',
  LoanForeclosed = 'LOAN_FORECLOSED',
  LoanInitiated = 'LOAN_INITIATED',
  LoanRepaid = 'LOAN_REPAID',
  LoanSentToAuction = 'LOAN_SENT_TO_AUCTION'
}

export type LoansData = {
  __typename?: 'LoansData';
  maxAprBps: Scalars['Float'];
  maxPrincipalAmount: Scalars['BigInt'];
  maxRemainingTime: Scalars['BigInt'];
  minAprBps: Scalars['Float'];
  minPrincipalAmount: Scalars['BigInt'];
  minRemainingTime: Scalars['BigInt'];
};

/** This is the definition of a lost source. Lost sources are the lender/s that have lost a loan because of renegotiation or refinance.  */
export type LostSource = Node & {
  __typename?: 'LostSource';
  accruedInterest: Scalars['BigInt'];
  activity: LoanActivity;
  activityId: Scalars['String'];
  aprBps: Scalars['BigInt'];
  duration: Scalars['BigInt'];
  earnedInterest: Scalars['BigInt'];
  endDate: Scalars['DateTime'];
  expectedInterestLeft: Scalars['BigInt'];
  id: Scalars['String'];
  lenderAddress: Scalars['String'];
  lenderEaprBps: Scalars['BigInt'];
  loan: MultiSourceLoan;
  originationFee: Scalars['BigInt'];
  principalAmount: Scalars['BigInt'];
  profit: Scalars['BigInt'];
  repaidInterest: Scalars['BigInt'];
  startTime: Scalars['DateTime'];
};

export type LostSourceNotification = Node & Notification & {
  __typename?: 'LostSourceNotification';
  createdOn: Scalars['DateTime'];
  id: Scalars['String'];
  lostSource: LostSource;
  lostSourceId: Scalars['String'];
  notificationType: Scalars['String'];
  readOn?: Maybe<Scalars['DateTime']>;
  user: User;
};

export enum MarketPlaceType {
  Blur = 'BLUR',
  Cryptopunks = 'CRYPTOPUNKS',
  Foundation = 'FOUNDATION',
  LarvaLabs = 'LARVA_LABS',
  LooksRare = 'LOOKS_RARE',
  Native = 'NATIVE',
  Nftx = 'NFTX',
  OpenSea = 'OPEN_SEA',
  X2Y2 = 'X2Y2'
}

export enum MarketplaceEnum {
  Gondi = 'GONDI',
  Nftfi = 'NFTFI'
}

/** This is the definition of a loan. In sources you can find the tranches of the loan.Take into account that the loan fields can change if renegotiation or refinance happens.You can use listLoanEvents to get the history of the loan. */
export type MultiSourceLoan = Loan & Node & {
  __typename?: 'MultiSourceLoan';
  activities: Array<LoanActivity>;
  address: Scalars['Address'];
  auction?: Maybe<Auction>;
  blendedAprBps: Scalars['Float'];
  borrowerAddress: Scalars['Address'];
  contractStartTime: Scalars['DateTime'];
  currency: Currency;
  duration: Scalars['BigInt'];
  durationFromRenegotiationOrStart: Scalars['BigInt'];
  endDate: Scalars['DateTime'];
  id: Scalars['String'];
  indexInBlock: Scalars['Int'];
  lastOriginationFee: Scalars['BigInt'];
  lastRenegotiationDate?: Maybe<Scalars['DateTime']>;
  loanId: Scalars['Int'];
  nft: Nft;
  /**
   * Deprecated field. Use offerIds to return loan offer ids instead.
   * @deprecated Use offerIds to return loan offer ids instead.
   */
  offer: Offer;
  offerIds: Array<Scalars['String']>;
  principalAddress: Scalars['Address'];
  principalAmount: Scalars['BigInt'];
  protocolFee: Scalars['BigInt'];
  renegotiationCount: Scalars['Int'];
  renegotiationRequest?: Maybe<RenegotiationRequest>;
  repaidActivity?: Maybe<LoanRepaid>;
  repaymentTime?: Maybe<Scalars['DateTime']>;
  sources: Array<Source>;
  startTime: Scalars['DateTime'];
  status: Scalars['String'];
  timestamp: Scalars['DateTime'];
  topUpRequest?: Maybe<TopUpRequest>;
  totalOriginationFee: Scalars['BigInt'];
  txHash: Scalars['Hash'];
};

export type MultiSourceLoanConnection = {
  __typename?: 'MultiSourceLoanConnection';
  edges: Array<MultiSourceLoanEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type MultiSourceLoanEdge = {
  __typename?: 'MultiSourceLoanEdge';
  cursor: Scalars['String'];
  node: MultiSourceLoan;
};

/** A snapshot in time of a loan. */
export type MultiSourceLoanHistory = Node & {
  __typename?: 'MultiSourceLoanHistory';
  activity: LoanActivity;
  activityId: Scalars['String'];
  borrowerAddress: Scalars['String'];
  currency: Currency;
  duration: Scalars['BigInt'];
  id: Scalars['String'];
  loanId: Scalars['Int'];
  nft: Nft;
  offerIds: Array<Scalars['String']>;
  principalAddress: Scalars['Address'];
  principalAmount: Scalars['BigInt'];
  sources: Array<SourceHistory>;
  startTime: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Lists all NFTs from a user to start receiving loan offers. Can be filtered to only match certain criteria. */
  addListingsOfNftsFromUser?: Maybe<Scalars['Void']>;
  /** Adds or updates a listing to start receiving loan offers. */
  addOrUpdateListing: Listing;
  /** Adds or updates a renegotiation request.A renegotiation request is only a suggestion for potential lenders to show your intentions and the terms you want. */
  addOrUpdateRenegotiationRequest: RenegotiationRequest;
  /** Adds or updates a top-up request.A top-up request is only a suggestion for potential lenders to show your intentions and the terms you want. */
  addOrUpdateTopUpRequest: TopUpRequest;
  /** This is the first step of the collection offer flow. This step populates some fields of the offer. You then have to sign the offer and save it using the method save_signed_collection_offer. Refer to gondi-js examples for more details. */
  generateCollectionOfferToBeSigned: CollectionOffer;
  /** This is the first step of the renegotiation offer flow. This step populates some fields of the offer. You then have to sign the offer and save it using the method save_renegotiation_signed_offer. Refer to gondi-js examples for more details. */
  generateRenegotiationOfferToBeSigned: Renegotiation;
  /** This is the first step of the single NFT offer flow. This step populates some fields of the offer. You then have to sign the offer and save it using the method save_signed_single_nft_offer. Refer to gondi-js examples for more details. */
  generateSingleNftOfferToBeSigned: SingleNftOffer;
  /** Hides all offers from a user for a given contract address.  */
  hideAllOffers: Array<Offer>;
  /** Hides an offer. */
  hideOffer: Offer;
  /** Hides an order. */
  hideOrder: Order;
  /** Hides a renegotiation offer.  */
  hideRenegotiation: Renegotiation;
  markNotificationIdsAsRead?: Maybe<Scalars['Void']>;
  markNotificationsAsRead?: Maybe<Scalars['Void']>;
  /** Creates a buy now pay later order. Buy now pay later orders are orders which use a loan offer principal to buy and NFT and start a loan making the borrower the creator of the order. This method could return a SignatureRequest in __typename in which case you have to use this method again with the same input but you have to sign the 'typedData' response attribute and store it in the 'key' response attribute. You will have to do this process two times since multiple signatures are required. You should receive an BuyNowPayLaterOrder if everything went well. Refer to gondi-js examples for more details on how to sign it and pay the order. */
  publishBuyNowPayLaterOrder: BuyNowPayLaterOrderSignatureRequest;
  /** Creates a collection order. This method could return a SignatureRequest in __typename in which case you have to use this method again with the same input but you have to sign the 'typedData' response attribute and store it in the 'key' response attribute. You should receive an CollectionOrder if everything went well. An order can only be a BID. Refer to gondi-js examples for more details. */
  publishOrderForCollection: CollectionOrderSignatureRequest;
  /** Creates a single NFT order. This method could return a SignatureRequest in __typename in which case you have to use this method again with the same input but you have to sign the 'typedData' response attribute and store it in the 'key' response attribute. You should receive an SingleNFTOrder if everything went well. An order can be an ASK or a BID. Refer to gondi-js examples for more details. */
  publishOrderForNft: SingleNftOrderSignatureRequest;
  /** Creates a sell and repay order. Sell and repay orders are orders to sell an NFT and use that money to repay a loan leaving the rest for the borrower. This method could return a SignatureRequest in __typename in which case you have to use this method again with the same input but you have to sign the 'typedData' response attribute and store it in the 'key' response attribute. You will have to do this process two times since multiple signatures are required. You should receive an SellAndRepayOrder if everything went well. Refer to gondi-js examples for more details on how to sign it and pay the order. */
  publishSellAndRepayOrder: SellAndRepayOrderSignatureRequest;
  /** Removes a listing from a user. */
  removeListing: Listing;
  /** Removes all the listings from a user. Can be filtered. */
  removeListingsOfNftsFromUser?: Maybe<Scalars['Void']>;
  /** Removes a renegotiation request. */
  removeRenegotiationRequest: RenegotiationRequest;
  /** Removes a top-up request. */
  removeTopUpRequest: TopUpRequest;
  /** This is the second step of the renegotiation offer flow after generate_renegotiation_offer_to_be_signed. It saves the signed offer. Refer to gondi-js examples for more details. */
  saveRenegotiationSignedOffer: Renegotiation;
  /** This is the second step of the collection offer flow after generate_collection_offer_to_be_signed. It saves the signed offer. Refer to gondi-js examples for more details. */
  saveSignedCollectionOffer: CollectionOffer;
  /** This is the second step of the single NFT offer flow after generate_single_nft_offer_to_be_signed. It saves the signed offer. Refer to gondi-js examples for more details. */
  saveSignedSingleNftOffer: SingleNftOffer;
  setReferral?: Maybe<Scalars['Void']>;
  /** Unhides an offer. */
  showOffer: Offer;
  /** Unhides an order. */
  showOrder: Order;
  /** Unhides a renegotiation offer.  */
  showRenegotiation: Renegotiation;
};


export type MutationAddListingsOfNftsFromUserArgs = {
  desiredDuration?: InputMaybe<Scalars['Int']>;
  desiredPrincipalAddress?: InputMaybe<Scalars['Address']>;
  excludeCollections?: InputMaybe<Array<Scalars['String']>>;
  onlyCollections?: InputMaybe<Array<Scalars['String']>>;
  searchTerm?: InputMaybe<Scalars['String']>;
};


export type MutationAddOrUpdateListingArgs = {
  desiredDuration?: InputMaybe<Scalars['Int']>;
  desiredPrincipalAddress?: InputMaybe<Scalars['Address']>;
  nftId: Scalars['Int'];
};


export type MutationAddOrUpdateRenegotiationRequestArgs = {
  desiredAprBps?: InputMaybe<Scalars['BigInt']>;
  desiredDuration?: InputMaybe<Scalars['BigInt']>;
  desiredPrincipalAmount?: InputMaybe<Scalars['BigInt']>;
  loanId: Scalars['String'];
};


export type MutationAddOrUpdateTopUpRequestArgs = {
  desiredAprBps?: InputMaybe<Scalars['BigInt']>;
  desiredTopUp?: InputMaybe<Scalars['BigInt']>;
  loanId: Scalars['String'];
};


export type MutationGenerateCollectionOfferToBeSignedArgs = {
  offerInput: CollectionOfferInput;
};


export type MutationGenerateRenegotiationOfferToBeSignedArgs = {
  renegotiationInput: RenegotiationOfferInput;
};


export type MutationGenerateSingleNftOfferToBeSignedArgs = {
  offerInput: SingleNftOfferInput;
};


export type MutationHideAllOffersArgs = {
  contractAddress: Scalars['Address'];
  minOfferId: Scalars['String'];
};


export type MutationHideOfferArgs = {
  contractAddress: Scalars['Address'];
  offerId: Scalars['String'];
};


export type MutationHideOrderArgs = {
  orderId: Scalars['Int'];
};


export type MutationHideRenegotiationArgs = {
  contractAddress?: InputMaybe<Scalars['Address']>;
  renegotiationId: Scalars['String'];
};


export type MutationMarkNotificationIdsAsReadArgs = {
  ids?: InputMaybe<Array<Scalars['Int']>>;
};


export type MutationPublishBuyNowPayLaterOrderArgs = {
  orderInput: BnplOrderInput;
};


export type MutationPublishOrderForCollectionArgs = {
  orderInput: CollectionOrderInput;
};


export type MutationPublishOrderForNftArgs = {
  orderInput: SingleNftOrderInput;
};


export type MutationPublishSellAndRepayOrderArgs = {
  orderInput: NftOrderInput;
};


export type MutationRemoveListingArgs = {
  nftId: Scalars['Int'];
};


export type MutationRemoveListingsOfNftsFromUserArgs = {
  excludeCollections?: InputMaybe<Array<Scalars['String']>>;
  onlyCollections?: InputMaybe<Array<Scalars['String']>>;
  searchTerm?: InputMaybe<Scalars['String']>;
};


export type MutationRemoveRenegotiationRequestArgs = {
  loanId: Scalars['String'];
};


export type MutationRemoveTopUpRequestArgs = {
  loanId: Scalars['String'];
};


export type MutationSaveRenegotiationSignedOfferArgs = {
  fallbackOfferInput?: InputMaybe<SingleNftSignedOfferInput>;
  signedRenegotiationInput: SignedRenegotiationOfferInput;
};


export type MutationSaveSignedCollectionOfferArgs = {
  signedOfferInput: CollectionSignedOfferInput;
};


export type MutationSaveSignedSingleNftOfferArgs = {
  signedOfferInput: SingleNftSignedOfferInput;
};


export type MutationSetReferralArgs = {
  referrerId: Scalars['Int'];
};


export type MutationShowOfferArgs = {
  contractAddress: Scalars['Address'];
  offerId: Scalars['String'];
};


export type MutationShowOrderArgs = {
  orderId: Scalars['Int'];
};


export type MutationShowRenegotiationArgs = {
  contractAddress?: InputMaybe<Scalars['Address']>;
  renegotiationId: Scalars['String'];
};

export type Nft = Node & {
  __typename?: 'NFT';
  activeLoan?: Maybe<Loan>;
  collection?: Maybe<Collection>;
  collectionId?: Maybe<Scalars['Int']>;
  createdDate: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  image?: Maybe<Asset>;
  isFlagged?: Maybe<Scalars['Boolean']>;
  listed?: Maybe<Listing>;
  /**
   * Deprecated.
   * @deprecated Get it from nftPriceSample
   */
  marketPlaceOfPrice?: Maybe<Scalars['String']>;
  maxNetPrincipalOffer?: Maybe<Offer>;
  name?: Maybe<Scalars['String']>;
  nftId: Scalars['String'];
  nftPriceSample?: Maybe<NftPriceSample>;
  owner?: Maybe<Scalars['Address']>;
  /**
   * Deprecated.
   * @deprecated Get it from nftPriceSample
   */
  price?: Maybe<Scalars['BigInt']>;
  /**
   * Deprecated.
   * @deprecated Get it from nftPriceSample
   */
  priceCurrencyAddress?: Maybe<Scalars['Address']>;
  rarityRank?: Maybe<Scalars['Int']>;
  rarityScore?: Maybe<Scalars['Float']>;
  statistics: NftStatistics;
  tokenId: Scalars['BigInt'];
  traits: Array<Trait>;
  url?: Maybe<Scalars['String']>;
  wrappedCount: Array<Scalars['Int']>;
  wrapsNfts?: Maybe<Array<Nft>>;
};


export type NftMaxNetPrincipalOfferArgs = {
  currencyAddress: Scalars['Address'];
};


export type NftNftPriceSampleArgs = {
  currencyAddresses?: InputMaybe<Array<Scalars['Address']>>;
};

export type NftConnection = {
  __typename?: 'NFTConnection';
  edges: Array<NftEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type NftEdge = {
  __typename?: 'NFTEdge';
  cursor: Scalars['String'];
  node: Nft;
};

export type NftOrderInput = {
  amount: Scalars['BigInt'];
  contractAddress: Scalars['Address'];
  currencyAddress: Scalars['Address'];
  expirationTime: Scalars['BigInt'];
  isAsk: Scalars['Boolean'];
  orderToFill?: InputMaybe<Scalars['Int']>;
  repaymentSignature?: InputMaybe<Scalars['Signature']>;
  replaceOrderId?: InputMaybe<Scalars['Int']>;
  signature?: InputMaybe<Scalars['Signature']>;
  startTime: Scalars['BigInt'];
  taker?: InputMaybe<Scalars['Address']>;
  tokenId: Scalars['BigInt'];
};

export type NftPriceSample = Node & {
  __typename?: 'NFTPriceSample';
  currencyAddress: Scalars['Address'];
  id: Scalars['String'];
  order: Order;
  orderId: Scalars['Int'];
  surveyedId: Scalars['Int'];
  taker: Scalars['Address'];
  timestamp: Scalars['Int'];
  value: Scalars['BigInt'];
};

export type NewCollectionUnlistedOfferNotification = Node & Notification & {
  __typename?: 'NewCollectionUnlistedOfferNotification';
  createdOn: Scalars['DateTime'];
  id: Scalars['String'];
  notificationType: Scalars['String'];
  readOn?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type NewOfferNotification = Node & Notification & {
  __typename?: 'NewOfferNotification';
  createdOn: Scalars['DateTime'];
  id: Scalars['String'];
  notificationType: Scalars['String'];
  offer: Offer;
  offerId: Scalars['String'];
  readOn?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type NewRenegotiationOfferNotification = Node & Notification & {
  __typename?: 'NewRenegotiationOfferNotification';
  createdOn: Scalars['DateTime'];
  id: Scalars['String'];
  loan: MultiSourceLoan;
  loanId: Scalars['String'];
  notificationType: Scalars['String'];
  readOn?: Maybe<Scalars['DateTime']>;
  renegotiation: Renegotiation;
  renegotiationId: Scalars['String'];
  user: User;
};

export enum NftSortField {
  Collection = 'COLLECTION',
  LastSaleDate = 'LAST_SALE_DATE',
  LastSalePrice = 'LAST_SALE_PRICE',
  Name = 'NAME',
  OffersCount = 'OFFERS_COUNT',
  Price = 'PRICE',
  Status = 'STATUS'
}

export type NftSortInput = {
  field: NftSortField;
  order: Ordering;
  principalAddress?: InputMaybe<Scalars['Address']>;
};

export type NftStatistics = {
  __typename?: 'NftStatistics';
  highestBid?: Maybe<Order>;
  lastSale?: Maybe<Sale>;
  loansTotalVolume: Scalars['BigInt'];
  numberOfOffers: Scalars['Float'];
  /** @deprecated Trait floor price is not available */
  topTraitFloorPrice?: Maybe<CurrencyAmount>;
};


export type NftStatisticsHighestBidArgs = {
  currencyAddresses?: InputMaybe<Array<Scalars['Address']>>;
};


export type NftStatisticsLoansTotalVolumeArgs = {
  currencyAddress: Scalars['Address'];
};


export type NftStatisticsNumberOfOffersArgs = {
  currencyAddress: Scalars['Address'];
};

export type NftTermsFilter = {
  price?: InputMaybe<BigIntInterval>;
};

export type Node = {
  id: Scalars['String'];
};

export type Notification = {
  createdOn: Scalars['DateTime'];
  id: Scalars['String'];
  notificationType: Scalars['String'];
  readOn?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type NotificationConnection = {
  __typename?: 'NotificationConnection';
  edges: Array<NotificationEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type NotificationEdge = {
  __typename?: 'NotificationEdge';
  cursor: Scalars['String'];
  node: Notification;
};

export enum NotificationType {
  AuctionWonNotification = 'AUCTION_WON_NOTIFICATION',
  LoanDefaultedNotification = 'LOAN_DEFAULTED_NOTIFICATION',
  LoanDefaultReminderNotification = 'LOAN_DEFAULT_REMINDER_NOTIFICATION',
  LoanRepaidNotification = 'LOAN_REPAID_NOTIFICATION',
  LostSourceNotification = 'LOST_SOURCE_NOTIFICATION',
  NewOfferNotification = 'NEW_OFFER_NOTIFICATION',
  NewRenegotiationOfferNotification = 'NEW_RENEGOTIATION_OFFER_NOTIFICATION',
  OfferAcceptedNotification = 'OFFER_ACCEPTED_NOTIFICATION',
  OutbidNotification = 'OUTBID_NOTIFICATION',
  SetNftNotification = 'SET_NFT_NOTIFICATION'
}

export type Offer = {
  aprBps: Scalars['BigInt'];
  availablePrincipalAmount: Scalars['BigInt'];
  borrowerAddress?: Maybe<Scalars['Address']>;
  capacity: Scalars['BigInt'];
  consumedCapacity: Scalars['BigInt'];
  contractAddress: Scalars['Address'];
  createdDate?: Maybe<Scalars['DateTime']>;
  currency: Currency;
  duration: Scalars['BigInt'];
  expirationTime: Scalars['BigInt'];
  fee: Scalars['BigInt'];
  hidden?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  lenderAddress?: Maybe<Scalars['Address']>;
  lenderAvailableBalance?: Maybe<Scalars['BigInt']>;
  maxPrincipal: Scalars['BigInt'];
  maxSeniorRepayment: Scalars['BigInt'];
  /**
   * Deprecated field: use maxSeniorRepayment instead.
   * @deprecated Use maxSeniorRepayment instead.
   */
  maxTrancheFloor: Scalars['BigInt'];
  netPrincipal: Scalars['BigInt'];
  offerHash?: Maybe<Scalars['Hash']>;
  offerId: Scalars['BigInt'];
  principalAddress: Scalars['Address'];
  principalAmount: Scalars['BigInt'];
  repayment: Scalars['BigInt'];
  requiresLiquidation?: Maybe<Scalars['Boolean']>;
  signature?: Maybe<Scalars['Signature']>;
  signerAddress?: Maybe<Scalars['Address']>;
  status: Scalars['String'];
  validators: Array<OfferValidator>;
};

export type OfferAcceptedNotification = Node & Notification & {
  __typename?: 'OfferAcceptedNotification';
  createdOn: Scalars['DateTime'];
  id: Scalars['String'];
  loan: MultiSourceLoan;
  loanId: Scalars['String'];
  notificationType: Scalars['String'];
  offer: Offer;
  offerId: Scalars['String'];
  readOn?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type OfferConnection = {
  __typename?: 'OfferConnection';
  edges: Array<OfferEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type OfferEdge = {
  __typename?: 'OfferEdge';
  cursor: Scalars['String'];
  node: Offer;
};

export type OfferStatistics = {
  __typename?: 'OfferStatistics';
  consumedCapacity: Scalars['BigInt'];
};

export enum OfferStatus {
  Active = 'ACTIVE',
  Cancelled = 'CANCELLED',
  Executed = 'EXECUTED',
  Expired = 'EXPIRED',
  Inactive = 'INACTIVE',
  Outperformed = 'OUTPERFORMED'
}

export type OfferValidator = Node & {
  __typename?: 'OfferValidator';
  arguments: Scalars['Hex'];
  id: Scalars['String'];
  offerId: Scalars['String'];
  validator: Scalars['Address'];
};

export type OfferValidatorInput = {
  arguments: Scalars['Hex'];
  validator: Scalars['Address'];
};

export enum OffersSortField {
  AprBps = 'APR_BPS',
  AvailablePrincipalAmount = 'AVAILABLE_PRINCIPAL_AMOUNT',
  CreatedDate = 'CREATED_DATE',
  DailyInterest = 'DAILY_INTEREST',
  Duration = 'DURATION',
  EffectiveAprBps = 'EFFECTIVE_APR_BPS',
  Expiration = 'EXPIRATION',
  Fee = 'FEE',
  MaxPrincipal = 'MAX_PRINCIPAL',
  NetInterest = 'NET_INTEREST',
  NetPrincipal = 'NET_PRINCIPAL',
  PrincipalAmount = 'PRINCIPAL_AMOUNT',
  Repayment = 'REPAYMENT',
  Status = 'STATUS',
  TotalInterest = 'TOTAL_INTEREST'
}

export type OffersSortInput = {
  durationOfInterest?: InputMaybe<Scalars['Int']>;
  field: OffersSortField;
  order: Ordering;
  principalOfInterest?: InputMaybe<Scalars['BigInt']>;
};

export type Order = {
  createdDate: Scalars['DateTime'];
  currency: Currency;
  currencyAddress: Scalars['Address'];
  evmOrder?: Maybe<Scalars['JSON']>;
  expiration: Scalars['DateTime'];
  fees: Scalars['BigInt'];
  hidden: Scalars['Boolean'];
  id: Scalars['String'];
  isAsk: Scalars['Boolean'];
  isPrivate: Scalars['Boolean'];
  maker: Scalars['Address'];
  marketPlace: Scalars['String'];
  marketPlaceAddress: Scalars['Address'];
  netAmount: Scalars['BigInt'];
  nonce: Scalars['BigInt'];
  orderType: Scalars['String'];
  originalId: Scalars['Hash'];
  price: Scalars['BigInt'];
  signature: Scalars['Signature'];
  startTime: Scalars['DateTime'];
  status: Scalars['String'];
  taker: Scalars['Address'];
  timestamp: Scalars['DateTime'];
  txHash?: Maybe<Scalars['Hash']>;
};

export type OrderConnection = {
  __typename?: 'OrderConnection';
  edges: Array<OrderEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type OrderEdge = {
  __typename?: 'OrderEdge';
  cursor: Scalars['String'];
  node: Order;
};

export enum OrderSortField {
  CreatedDate = 'CREATED_DATE',
  Expiration = 'EXPIRATION',
  Fee = 'FEE',
  FeeRatio = 'FEE_RATIO',
  NetAmount = 'NET_AMOUNT',
  Price = 'PRICE'
}

export type OrderSortInput = {
  field: OrderSortField;
  order: Ordering;
};

export enum OrderStatusType {
  Active = 'Active',
  Cancelled = 'Cancelled',
  Executed = 'Executed',
  Expired = 'Expired',
  Inactive = 'Inactive',
  Outperformed = 'Outperformed'
}

export type OrderTermsFilter = {
  netAmount?: InputMaybe<BigIntInterval>;
};

export enum OrderType {
  Ask = 'ASK',
  Bid = 'BID'
}

export enum Ordering {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type OutbidNotification = Node & Notification & {
  __typename?: 'OutbidNotification';
  auction: Auction;
  auctionId: Scalars['String'];
  createdOn: Scalars['DateTime'];
  id: Scalars['String'];
  loan: MultiSourceLoan;
  loanId: Scalars['String'];
  newBid: Bid;
  newBidId: Scalars['Int'];
  notificationType: Scalars['String'];
  readOn?: Maybe<Scalars['DateTime']>;
  user: User;
  userBid: Bid;
  userBidId: Scalars['Int'];
};

export type OutstandingLoanStatistics = {
  __typename?: 'OutstandingLoanStatistics';
  loansData: LoansData;
  outstandingLoanCount: Scalars['Int'];
  outstandingNftsCount: Scalars['BigInt'];
  outstandingPrincipal: Scalars['BigInt'];
  totalOutstandingPrincipal: Scalars['BigInt'];
};


export type OutstandingLoanStatisticsLoansDataArgs = {
  currencyAddress?: InputMaybe<Scalars['Address']>;
};


export type OutstandingLoanStatisticsOutstandingPrincipalArgs = {
  currencyAddress: Scalars['Address'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type PointActivity = Node & {
  __typename?: 'PointActivity';
  id: Scalars['String'];
  loanActivity: LoanActivity;
  points: Scalars['BigInt'];
  reason: Scalars['String'];
  timestamp: Scalars['DateTime'];
  userId: Scalars['Int'];
};

export type PointActivityConnection = {
  __typename?: 'PointActivityConnection';
  edges: Array<PointActivityEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type PointActivityEdge = {
  __typename?: 'PointActivityEdge';
  cursor: Scalars['String'];
  node: PointActivity;
};

export type Pool = Node & {
  __typename?: 'Pool';
  address: Scalars['Address'];
  asset: Currency;
  baseRateAllocator: PoolBaseRateAllocator;
  collectionFactors: Array<PoolCollectionFactors>;
  currency: Currency;
  description: Scalars['String'];
  id: Scalars['String'];
  poolActivities: Array<PoolActivity>;
  statistics: PoolStatistics;
};

export type PoolActivity = {
  id: Scalars['String'];
  indexInBlock: Scalars['Int'];
  pool: Pool;
  poolAddress: Scalars['Address'];
  timestamp: Scalars['DateTime'];
  txHash: Scalars['Hash'];
};

export type PoolActivityConnection = {
  __typename?: 'PoolActivityConnection';
  edges: Array<PoolActivityEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type PoolActivityEdge = {
  __typename?: 'PoolActivityEdge';
  cursor: Scalars['String'];
  node: PoolActivity;
};

export enum PoolActivityType {
  Erc4626Deposit = 'ERC4626_DEPOSIT',
  Erc4626Withdraw = 'ERC4626_WITHDRAW',
  PoolAprFactorSet = 'POOL_APR_FACTOR_SET',
  PoolAprPremiumSet = 'POOL_APR_PREMIUM_SET',
  PoolBaseInterestAllocatorSet = 'POOL_BASE_INTEREST_ALLOCATOR_SET',
  PoolCollectionFactorsSet = 'POOL_COLLECTION_FACTORS_SET',
  PoolReallocated = 'POOL_REALLOCATED',
  QueueDeployed = 'QUEUE_DEPLOYED',
  WithdrawalPositionLocked = 'WITHDRAWAL_POSITION_LOCKED',
  WithdrawalPositionMinted = 'WITHDRAWAL_POSITION_MINTED',
  WithdrawnFromQueue = 'WITHDRAWN_FROM_QUEUE'
}

export type PoolAprFactorSet = Node & PoolActivity & {
  __typename?: 'PoolAprFactorSet';
  id: Scalars['String'];
  indexInBlock: Scalars['Int'];
  pool: Pool;
  poolAddress: Scalars['Address'];
  timestamp: Scalars['DateTime'];
  txHash: Scalars['Hash'];
};

export type PoolAprPremiumSet = Node & PoolActivity & {
  __typename?: 'PoolAprPremiumSet';
  aprPremium: Scalars['BigInt'];
  id: Scalars['String'];
  indexInBlock: Scalars['Int'];
  pool: Pool;
  poolAddress: Scalars['Address'];
  timestamp: Scalars['DateTime'];
  txHash: Scalars['Hash'];
};

export type PoolBaseInterestAllocatorSet = Node & PoolActivity & {
  __typename?: 'PoolBaseInterestAllocatorSet';
  id: Scalars['String'];
  indexInBlock: Scalars['Int'];
  pool: Pool;
  poolAddress: Scalars['Address'];
  timestamp: Scalars['DateTime'];
  txHash: Scalars['Hash'];
};

export type PoolBaseRateAllocator = Node & {
  __typename?: 'PoolBaseRateAllocator';
  address: Scalars['Address'];
  currency: Currency;
  description: Scalars['String'];
  id: Scalars['String'];
  stakeCurrency: Currency;
};

export type PoolCollectionFactors = Node & {
  __typename?: 'PoolCollectionFactors';
  collection: Collection;
  collectionId: Scalars['Int'];
  duration: Scalars['BigInt'];
  id: Scalars['String'];
  offerId: Scalars['String'];
  pool: Pool;
  poolAddress: Scalars['String'];
  principalCurrentFactor: Scalars['BigInt'];
  principalHistoricalFactor: Scalars['BigInt'];
};

export type PoolCollectionFactorsSet = Node & PoolActivity & {
  __typename?: 'PoolCollectionFactorsSet';
  id: Scalars['String'];
  indexInBlock: Scalars['Int'];
  pool: Pool;
  poolAddress: Scalars['Address'];
  timestamp: Scalars['DateTime'];
  txHash: Scalars['Hash'];
};

export type PoolConnection = {
  __typename?: 'PoolConnection';
  edges: Array<PoolEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type PoolEdge = {
  __typename?: 'PoolEdge';
  cursor: Scalars['String'];
  node: Pool;
};

export type PoolReallocated = Node & PoolActivity & {
  __typename?: 'PoolReallocated';
  id: Scalars['String'];
  indexInBlock: Scalars['Int'];
  pool: Pool;
  poolAddress: Scalars['Address'];
  timestamp: Scalars['DateTime'];
  txHash: Scalars['Hash'];
};

export type PoolStatistics = {
  __typename?: 'PoolStatistics';
  activeLoansCount: Scalars['Int'];
  activeOffersCount: Scalars['Int'];
  balanceAllocatedBaseRate: Scalars['BigInt'];
  liquid: Scalars['BigInt'];
  outstandingApr: Scalars['Float'];
  outstandingPrincipal: Scalars['BigInt'];
  realizedApr: Scalars['Float'];
  totalDeposits: Scalars['BigInt'];
  totalLoanVolume: Scalars['BigInt'];
};

/** Query for the lending module */
export type Query = {
  __typename?: 'Query';
  /** Get some general loan stats about the activities for a collection. */
  getCollectionActivitiesCount: CollectionEventsCountByDayAndCurrency;
  /** Get a collection by its slug. Slugs are unique identifiers for collections.  */
  getCollectionBySlug?: Maybe<Collection>;
  /** Get some general loans stats from a collection. */
  getCollectionLoansData: CollectionLoansData;
  getCollectionsByContractAddress: Array<Collection>;
  getListingById?: Maybe<Listing>;
  getLoanActivitiesStatisticsByMonth: LoanActivitiesStatisticsByMonth;
  /** Get a loan by the contract address and loan id used in the contract on-chain.Unless specified as in this case, loan id is the internal gondi id of the loan and not the id used inside the contract.Internal gondi id is unique between all loans.Note that contract loan id is only unique within a contract version and that Gondi has multiple versions of the MSL (MultiSourceLoan) contract. */
  getLoanById?: Maybe<Loan>;
  getNftByContractAddressAndTokenId?: Maybe<Nft>;
  getNftBySlugAndTokenId?: Maybe<Nft>;
  getOrderCancelCalldata: Scalars['Hex'];
  getOrderSaleCalldata: Scalars['Hex'];
  getOutstandingLoanStatistics: OutstandingLoanStatistics;
  getPointsFromReferrals: Scalars['Int'];
  getPoolByShareSymbol?: Maybe<Pool>;
  getReferredWallets: Scalars['Int'];
  getSourcesStatistics: SourcesStatistics;
  getSourcesStatisticsByCollection: Array<SourceStatisticsFromCollection>;
  getUserPointActivities: PointActivityConnection;
  getUserPoints: Scalars['Int'];
  listAuctions: AuctionConnection;
  listBids: BidConnection;
  listCollectionTraitTypes: TraitTypeConnection;
  listCollectionTraitValues: TraitValueConnection;
  listCollections: CollectionConnection;
  /** List NFT collections that have at least one listing. Listing an NFT is marking the NFT as available for taking loans and this can only be done by the owner of the NFT. */
  listCollectionsWithListings: CollectionConnection;
  /** List NFT collections that have at least one loan. */
  listCollectionsWithLoans: CollectionConnection;
  listCurrencies: CurrencyConnection;
  listListings: ListingConnection;
  listListingsForSale: OrderConnection;
  /**
   * Deprecated.
   * @deprecated Use list_loan_events instead.
   */
  listLoanActivities: LoanActivityConnection;
  /** List all events related to a loan. Useful to track the status changes of a loan. */
  listLoanEvents: LoanEventConnection;
  /** Lists all loans from gondi. */
  listLoans: MultiSourceLoanConnection;
  listNftDelegations: DelegationConnection;
  listNftOffersAndRenegotiations: SingleNftOfferCollectionOfferRenegotiationConnection;
  listNftsFromCollections: NftConnection;
  listNftsFromUser: NftConnection;
  listNotifications: NotificationConnection;
  listOffers: OfferConnection;
  listOrders: OrderConnection;
  listPoolActivities: PoolActivityConnection;
  listPools: PoolConnection;
  listRenegotiations: RenegotiationConnection;
  /** List all sources. Sources are the lender/s of a loan. Lost sources on the other hand are the lender/s that have lost a loan because of renegotiation or refinance. When a renegotiation or refinance happens, the sources compromised turn into lost sources and new sources appear. */
  listSources: SourceLostSourceConnection;
  listWithdrawalPositions: WithdrawalPositionConnection;
  listWithdrawalQueues: WithdrawalQueueConnection;
  me?: Maybe<User>;
};


/** Query for the lending module */
export type QueryGetCollectionActivitiesCountArgs = {
  collectionId?: InputMaybe<Scalars['Int']>;
  currencyAddress?: InputMaybe<Scalars['Address']>;
  fromTimestamp: Scalars['Int'];
  slug?: InputMaybe<Scalars['String']>;
};


/** Query for the lending module */
export type QueryGetCollectionBySlugArgs = {
  slug: Scalars['String'];
};


/** Query for the lending module */
export type QueryGetCollectionLoansDataArgs = {
  collectionId: Scalars['Int'];
  currencyAddress?: InputMaybe<Scalars['Address']>;
};


/** Query for the lending module */
export type QueryGetCollectionsByContractAddressArgs = {
  contractAddress: Scalars['Address'];
};


/** Query for the lending module */
export type QueryGetListingByIdArgs = {
  listingId: Scalars['Int'];
};


/** Query for the lending module */
export type QueryGetLoanActivitiesStatisticsByMonthArgs = {
  activities: Array<LoanActivityType>;
  currencyAddress: Scalars['Address'];
  lenders: Array<Scalars['Address']>;
};


/** Query for the lending module */
export type QueryGetLoanByIdArgs = {
  address: Scalars['String'];
  loanId: Scalars['Int'];
};


/** Query for the lending module */
export type QueryGetNftByContractAddressAndTokenIdArgs = {
  contractAddress: Scalars['Address'];
  tokenId: Scalars['BigInt'];
};


/** Query for the lending module */
export type QueryGetNftBySlugAndTokenIdArgs = {
  slug: Scalars['String'];
  tokenId: Scalars['BigInt'];
};


/** Query for the lending module */
export type QueryGetOrderCancelCalldataArgs = {
  orderId: Scalars['Int'];
};


/** Query for the lending module */
export type QueryGetOrderSaleCalldataArgs = {
  nftId?: InputMaybe<Scalars['Int']>;
  orderId: Scalars['Int'];
};


/** Query for the lending module */
export type QueryGetPoolByShareSymbolArgs = {
  symbol: Scalars['String'];
};


/** Query for the lending module */
export type QueryGetSourcesStatisticsArgs = {
  currencyAddress: Scalars['Address'];
  lenders: Array<Scalars['Address']>;
  statuses: Array<LoanStatusType>;
};


/** Query for the lending module */
export type QueryGetSourcesStatisticsByCollectionArgs = {
  currencyAddress: Scalars['Address'];
  lenders: Array<Scalars['Address']>;
  statuses: Array<LoanStatusType>;
};


/** Query for the lending module */
export type QueryGetUserPointActivitiesArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};


/** Query for the lending module */
export type QueryListAuctionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  currencyAddress?: InputMaybe<Scalars['Address']>;
  first?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<Array<AuctionSortInput>>;
  statuses?: InputMaybe<Array<AuctionStatus>>;
};


/** Query for the lending module */
export type QueryListBidsArgs = {
  after?: InputMaybe<Scalars['String']>;
  auctionId?: InputMaybe<Scalars['String']>;
  bidders?: InputMaybe<Array<Scalars['String']>>;
  currencyAddress?: InputMaybe<Scalars['Address']>;
  first?: InputMaybe<Scalars['Int']>;
  onlyLatest?: Scalars['Boolean'];
  sortBy?: InputMaybe<Array<BidSortInput>>;
};


/** Query for the lending module */
export type QueryListCollectionTraitTypesArgs = {
  after?: InputMaybe<Scalars['String']>;
  collectionId: Scalars['Int'];
  first?: Scalars['Int'];
};


/** Query for the lending module */
export type QueryListCollectionTraitValuesArgs = {
  after?: InputMaybe<Scalars['String']>;
  collectionId: Scalars['Int'];
  first?: Scalars['Int'];
  key?: InputMaybe<Array<Scalars['String']>>;
  onlyEnums?: InputMaybe<Scalars['Boolean']>;
  searchTerm?: InputMaybe<Scalars['String']>;
  sortBy?: InputMaybe<Array<TraitValueSortInput>>;
};


/** Query for the lending module */
export type QueryListCollectionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  collections?: InputMaybe<Array<Scalars['Int']>>;
  excludeCollections?: InputMaybe<Array<Scalars['Int']>>;
  excludeGondiUserVault?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  searchTerm?: InputMaybe<Scalars['String']>;
  sortBy?: InputMaybe<Array<CollectionSortInput>>;
  standards?: InputMaybe<Array<TokenStandardType>>;
  withAsks?: InputMaybe<WithAsksInput>;
  withListings?: InputMaybe<Scalars['Boolean']>;
  withLoans?: InputMaybe<Scalars['Boolean']>;
  wrappers?: InputMaybe<Scalars['Boolean']>;
};


/** Query for the lending module */
export type QueryListCollectionsWithListingsArgs = {
  after?: InputMaybe<Scalars['String']>;
  collections?: InputMaybe<Array<Scalars['Int']>>;
  first?: Scalars['Int'];
  searchTerm?: InputMaybe<Scalars['String']>;
};


/** Query for the lending module */
export type QueryListCollectionsWithLoansArgs = {
  after?: InputMaybe<Scalars['String']>;
  collections?: InputMaybe<Array<Scalars['Int']>>;
  first?: Scalars['Int'];
  searchTerm?: InputMaybe<Scalars['String']>;
};


/** Query for the lending module */
export type QueryListCurrenciesArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};


/** Query for the lending module */
export type QueryListListingsArgs = {
  after?: InputMaybe<Scalars['String']>;
  collectionIds?: InputMaybe<Array<Scalars['Int']>>;
  currencyAddress?: InputMaybe<Scalars['Address']>;
  first?: InputMaybe<Scalars['Int']>;
  marketplaceNames?: InputMaybe<Array<MarketplaceEnum>>;
  searchTerm?: InputMaybe<Scalars['String']>;
  userFilter?: InputMaybe<UserFilter>;
  withLoans?: InputMaybe<Scalars['Boolean']>;
};


/** Query for the lending module */
export type QueryListListingsForSaleArgs = {
  after?: InputMaybe<Scalars['String']>;
  collectionId?: InputMaybe<Scalars['Int']>;
  currencyAddress?: InputMaybe<Scalars['Address']>;
  first?: InputMaybe<Scalars['Int']>;
  forTaker?: InputMaybe<Scalars['Address']>;
  hidden?: InputMaybe<Scalars['Boolean']>;
  maker?: InputMaybe<Scalars['Address']>;
  nftId?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<Array<OrderSortInput>>;
  statuses?: InputMaybe<Array<OrderStatusType>>;
};


/** Query for the lending module */
export type QueryListLoanActivitiesArgs = {
  after?: InputMaybe<Scalars['String']>;
  collections?: InputMaybe<Array<Scalars['Int']>>;
  currencyAddress?: InputMaybe<Scalars['Address']>;
  first?: Scalars['Int'];
  fromTimestamp?: InputMaybe<Scalars['Int']>;
  loanId?: InputMaybe<Scalars['String']>;
  sortBy?: InputMaybe<Array<LoanActivitySortInput>>;
  types?: InputMaybe<Array<LoanActivityType>>;
};


/** Query for the lending module */
export type QueryListLoanEventsArgs = {
  after?: InputMaybe<Scalars['String']>;
  collections?: InputMaybe<Array<Scalars['Int']>>;
  currencyAddress?: InputMaybe<Scalars['Address']>;
  first?: Scalars['Int'];
  fromTimestamp?: InputMaybe<Scalars['Int']>;
  loanId?: InputMaybe<Scalars['String']>;
  slugs?: InputMaybe<Array<Scalars['String']>>;
  sortBy?: InputMaybe<Array<LoanEventSortInput>>;
  types?: InputMaybe<Array<LoanEventType>>;
};


/** Query for the lending module */
export type QueryListLoansArgs = {
  after?: InputMaybe<Scalars['String']>;
  borrowers?: InputMaybe<Array<Scalars['String']>>;
  collections?: InputMaybe<Array<Scalars['Int']>>;
  contractAddresses?: InputMaybe<Array<Scalars['Address']>>;
  currencyAddress?: InputMaybe<Scalars['Address']>;
  excludeAddresses?: InputMaybe<Array<Scalars['Address']>>;
  first?: Scalars['Int'];
  hideEndLocked?: InputMaybe<Scalars['Boolean']>;
  hideLocked?: InputMaybe<Scalars['Boolean']>;
  nfts?: InputMaybe<Array<Scalars['Int']>>;
  orderByStatuses?: InputMaybe<Scalars['Boolean']>;
  sluggedTokens?: InputMaybe<Array<SluggedTokenInput>>;
  sortBy?: InputMaybe<Array<LoanSortInput>>;
  statuses?: InputMaybe<Array<LoanStatusType>>;
  terms?: InputMaybe<TermsFilter>;
  withRenegRequestOnly?: Scalars['Boolean'];
  withTopUpRequestOnly?: Scalars['Boolean'];
};


/** Query for the lending module */
export type QueryListNftDelegationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  contractAddress?: InputMaybe<Scalars['Address']>;
  first?: Scalars['Int'];
  nftId: Scalars['Int'];
};


/** Query for the lending module */
export type QueryListNftOffersAndRenegotiationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  collections?: InputMaybe<Array<Scalars['Int']>>;
  contractAddress?: InputMaybe<Scalars['Address']>;
  currencyAddress?: InputMaybe<Scalars['Address']>;
  first?: InputMaybe<Scalars['Int']>;
  hidden?: InputMaybe<Scalars['Boolean']>;
  isAddNewTranche?: InputMaybe<Scalars['Boolean']>;
  lenders?: InputMaybe<Array<Scalars['String']>>;
  loanId?: InputMaybe<Scalars['String']>;
  nfts?: InputMaybe<Array<Scalars['Int']>>;
  onlyCollectionOffers?: Scalars['Boolean'];
  onlyInvalid?: Scalars['Boolean'];
  onlySingleNftOffers?: Scalars['Boolean'];
  sortBy?: InputMaybe<OffersSortInput>;
  statuses?: InputMaybe<Array<OfferStatus>>;
  terms?: InputMaybe<TermsFilter>;
};


/** Query for the lending module */
export type QueryListNftsFromCollectionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  collections?: InputMaybe<Array<Scalars['Int']>>;
  currencyAddresses?: InputMaybe<Array<Scalars['Address']>>;
  first?: InputMaybe<Scalars['Int']>;
  marketplaces?: InputMaybe<Array<MarketPlaceType>>;
  onlyListed?: InputMaybe<Scalars['Boolean']>;
  searchTerm?: InputMaybe<Scalars['String']>;
  sortBy?: InputMaybe<Array<NftSortInput>>;
  terms?: InputMaybe<NftTermsFilter>;
  traitRanges?: InputMaybe<Array<TraitRangeOptionsInput>>;
  traits?: InputMaybe<Array<TraitKeyValueOptionsInput>>;
};


/** Query for the lending module */
export type QueryListNftsFromUserArgs = {
  after?: InputMaybe<Scalars['String']>;
  collectionAddresses?: InputMaybe<Array<Scalars['Address']>>;
  first?: InputMaybe<Scalars['Int']>;
  includeInStash?: Scalars['Boolean'];
  searchTerm?: InputMaybe<Scalars['String']>;
  sortBy?: InputMaybe<Array<NftSortInput>>;
  standards?: InputMaybe<Array<TokenStandardType>>;
  withLoans?: InputMaybe<Scalars['Boolean']>;
  withNoWraps?: InputMaybe<Scalars['Boolean']>;
};


/** Query for the lending module */
export type QueryListNotificationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  notificationTypes?: InputMaybe<Array<NotificationType>>;
  onlyRead?: Scalars['Boolean'];
  onlyUnread?: Scalars['Boolean'];
};


/** Query for the lending module */
export type QueryListOffersArgs = {
  after?: InputMaybe<Scalars['String']>;
  borrowerAddress?: InputMaybe<Scalars['String']>;
  collections?: InputMaybe<Array<Scalars['Int']>>;
  contractAddress?: InputMaybe<Scalars['Address']>;
  currencyAddress?: InputMaybe<Scalars['Address']>;
  first?: InputMaybe<Scalars['Int']>;
  hidden?: InputMaybe<Scalars['Boolean']>;
  lenders?: InputMaybe<Array<Scalars['String']>>;
  nfts?: InputMaybe<Array<Scalars['Int']>>;
  onlyCollectionOffers?: InputMaybe<Scalars['Boolean']>;
  onlySingleNftOffers?: InputMaybe<Scalars['Boolean']>;
  sluggedTokens?: InputMaybe<Array<SluggedTokenInput>>;
  slugs?: InputMaybe<Array<Scalars['String']>>;
  sortBy?: InputMaybe<Array<OffersSortInput>>;
  statuses?: InputMaybe<Array<OfferStatus>>;
  terms?: InputMaybe<TermsFilter>;
  worseOffers?: InputMaybe<Scalars['Boolean']>;
};


/** Query for the lending module */
export type QueryListOrdersArgs = {
  after?: InputMaybe<Scalars['String']>;
  currencyAddresses?: InputMaybe<Array<Scalars['Address']>>;
  first?: InputMaybe<Scalars['Int']>;
  hidden?: InputMaybe<Scalars['Boolean']>;
  ids?: InputMaybe<Array<Scalars['Int']>>;
  maker?: InputMaybe<Array<Scalars['Address']>>;
  marketplaceIds?: InputMaybe<Array<Scalars['String']>>;
  marketplaces?: InputMaybe<Array<MarketPlaceType>>;
  nftIds?: InputMaybe<Array<Scalars['Int']>>;
  onlyInvalid?: InputMaybe<Scalars['Boolean']>;
  orderType?: InputMaybe<OrderType>;
  sortBy?: InputMaybe<Array<OrderSortInput>>;
  statuses?: InputMaybe<Array<OrderStatusType>>;
  taker?: InputMaybe<Scalars['Address']>;
  terms?: InputMaybe<OrderTermsFilter>;
};


/** Query for the lending module */
export type QueryListPoolActivitiesArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
  ownerAddresses?: InputMaybe<Array<Scalars['Address']>>;
  poolAddresses?: InputMaybe<Array<Scalars['Address']>>;
  types?: InputMaybe<Array<PoolActivityType>>;
};


/** Query for the lending module */
export type QueryListPoolsArgs = {
  addresses?: InputMaybe<Array<Scalars['String']>>;
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};


/** Query for the lending module */
export type QueryListRenegotiationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  collections?: InputMaybe<Array<Scalars['Int']>>;
  first?: InputMaybe<Scalars['Int']>;
  hidden?: InputMaybe<Scalars['Boolean']>;
  isAddNewTranche?: InputMaybe<Scalars['Boolean']>;
  loanId?: InputMaybe<Scalars['String']>;
  sortBy?: InputMaybe<Array<OffersSortInput>>;
  statuses?: InputMaybe<Array<OfferStatus>>;
  terms?: InputMaybe<RefinanceTermsFilter>;
};


/** Query for the lending module */
export type QueryListSourcesArgs = {
  after?: InputMaybe<Scalars['String']>;
  collections?: InputMaybe<Array<Scalars['Int']>>;
  contractAddresses?: InputMaybe<Array<Scalars['Address']>>;
  currencyAddress?: InputMaybe<Scalars['Address']>;
  excludeAddresses?: InputMaybe<Array<Scalars['Address']>>;
  first?: Scalars['Int'];
  hideEndLocked?: InputMaybe<Scalars['Boolean']>;
  hideLocked?: InputMaybe<Scalars['Boolean']>;
  includeLost?: InputMaybe<Scalars['Boolean']>;
  lenders?: InputMaybe<Array<Scalars['String']>>;
  loanPrincipal?: InputMaybe<Interval>;
  sortBy?: InputMaybe<Array<SourceSortInput>>;
  statuses?: InputMaybe<Array<LoanStatusType>>;
  terms?: InputMaybe<TermsFilter>;
  withdrawalQueues?: InputMaybe<Array<Scalars['Int']>>;
};


/** Query for the lending module */
export type QueryListWithdrawalPositionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
  owner?: InputMaybe<Scalars['Address']>;
  poolAddresses?: InputMaybe<Array<Scalars['Address']>>;
};


/** Query for the lending module */
export type QueryListWithdrawalQueuesArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
  poolAddresses?: InputMaybe<Array<Scalars['Address']>>;
};

export type QueueDeployed = Node & PoolActivity & {
  __typename?: 'QueueDeployed';
  id: Scalars['String'];
  index: Scalars['Int'];
  indexInBlock: Scalars['Int'];
  pool: Pool;
  poolAddress: Scalars['Address'];
  queueAddress: Scalars['Address'];
  timestamp: Scalars['DateTime'];
  txHash: Scalars['Hash'];
};

export type RangeInput = {
  max: Scalars['Int'];
  min: Scalars['Int'];
};

export type RefinanceTermsFilter = {
  aprBps?: InputMaybe<Interval>;
  duration?: InputMaybe<Interval>;
  fee?: InputMaybe<Interval>;
  maxPrincipal?: InputMaybe<Interval>;
  netPrincipal?: InputMaybe<Interval>;
  principal?: InputMaybe<Interval>;
  remainingTime?: InputMaybe<Interval>;
};

/** A renegotiation when the loan terms change and the borrower accepted. The difference with refinance is that renegotiation does not mean better terms for the borrower, because of that the borrower needs to accept the renegotiation. Also the renegotiation can be made by the same previous lender.Renegotiation can be top ups. A top up is when someone adds more principal to the loan. */
export type Renegotiation = Node & {
  __typename?: 'Renegotiation';
  aprBps: Scalars['BigInt'];
  availablePrincipalAmount: Scalars['BigInt'];
  createdDate?: Maybe<Scalars['DateTime']>;
  duration: Scalars['BigInt'];
  expirationTime: Scalars['BigInt'];
  fallbackOfferId?: Maybe<Scalars['String']>;
  feeAmount: Scalars['BigInt'];
  hidden?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  isAddNewTranche: Scalars['Boolean'];
  lenderAddress?: Maybe<Scalars['Address']>;
  loan: Loan;
  loanAddress: Scalars['Address'];
  loanId: Scalars['BigInt'];
  loanReferenceId: Scalars['String'];
  nft: Nft;
  offerHash?: Maybe<Scalars['Hash']>;
  principalAmount: Scalars['BigInt'];
  renegotiationId: Scalars['BigInt'];
  repayment: Scalars['BigInt'];
  requiresLiquidation: Scalars['Boolean'];
  signature?: Maybe<Scalars['Signature']>;
  signerAddress?: Maybe<Scalars['Address']>;
  status: Scalars['String'];
  strictImprovement: Scalars['Boolean'];
};

export type RenegotiationConnection = {
  __typename?: 'RenegotiationConnection';
  edges: Array<RenegotiationEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type RenegotiationEdge = {
  __typename?: 'RenegotiationEdge';
  cursor: Scalars['String'];
  node: Renegotiation;
};

export type RenegotiationOfferInput = {
  aprBps: Scalars['BigInt'];
  duration: Scalars['BigInt'];
  expirationTime: Scalars['BigInt'];
  feeAmount: Scalars['BigInt'];
  isAddNewTranche?: InputMaybe<Scalars['Boolean']>;
  lenderAddress: Scalars['Address'];
  loanId: Scalars['String'];
  principalAmount: Scalars['BigInt'];
  requiresLiquidation?: InputMaybe<Scalars['Boolean']>;
  signerAddress?: InputMaybe<Scalars['Address']>;
  strictImprovement?: InputMaybe<Scalars['Boolean']>;
  targetPrincipal?: InputMaybe<Array<Scalars['BigInt']>>;
  trancheIndex?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type RenegotiationRequest = Node & {
  __typename?: 'RenegotiationRequest';
  createdDate: Scalars['DateTime'];
  desiredAprBps?: Maybe<Scalars['BigInt']>;
  desiredDuration?: Maybe<Scalars['BigInt']>;
  desiredPrincipalAmount?: Maybe<Scalars['BigInt']>;
  expirationDate: Scalars['DateTime'];
  id: Scalars['String'];
  loanId: Scalars['String'];
};

export type RenegotiationRequestedNotification = Node & Notification & {
  __typename?: 'RenegotiationRequestedNotification';
  aprBps?: Maybe<Scalars['BigInt']>;
  createdOn: Scalars['DateTime'];
  duration?: Maybe<Scalars['BigInt']>;
  id: Scalars['String'];
  loan: MultiSourceLoan;
  loanId: Scalars['String'];
  notificationType: Scalars['String'];
  principalAmount?: Maybe<Scalars['BigInt']>;
  readOn?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type Sale = Activity & Node & {
  __typename?: 'Sale';
  id: Scalars['String'];
  nft: Nft;
  order: Order;
  orderId: Scalars['String'];
  taker: Scalars['String'];
  timestamp: Scalars['DateTime'];
  txHash?: Maybe<Scalars['Hash']>;
};

export type SellAndRepayOrder = Activity & Node & Order & {
  __typename?: 'SellAndRepayOrder';
  createdDate: Scalars['DateTime'];
  currency: Currency;
  currencyAddress: Scalars['Address'];
  evmOrder?: Maybe<Scalars['JSON']>;
  expiration: Scalars['DateTime'];
  fees: Scalars['BigInt'];
  hidden: Scalars['Boolean'];
  id: Scalars['String'];
  isAsk: Scalars['Boolean'];
  isPrivate: Scalars['Boolean'];
  loan: MultiSourceLoan;
  loanId: Scalars['String'];
  maker: Scalars['Address'];
  marketPlace: Scalars['String'];
  marketPlaceAddress: Scalars['Address'];
  netAmount: Scalars['BigInt'];
  nft: Nft;
  nftId: Scalars['Int'];
  nonce: Scalars['BigInt'];
  orderType: Scalars['String'];
  originalId: Scalars['Hash'];
  price: Scalars['BigInt'];
  repaymentCalldata: Scalars['Hex'];
  signature: Scalars['Signature'];
  startTime: Scalars['DateTime'];
  status: Scalars['String'];
  taker: Scalars['Address'];
  timestamp: Scalars['DateTime'];
  txHash?: Maybe<Scalars['Hash']>;
};

export type SellAndRepayOrderSignatureRequest = SellAndRepayOrder | SignatureRequest;

export type SignatureRequest = {
  __typename?: 'SignatureRequest';
  key: Scalars['String'];
  typedData: TypedData;
};

export type SignedRenegotiationOfferInput = {
  aprBps: Scalars['BigInt'];
  duration: Scalars['BigInt'];
  expirationTime: Scalars['BigInt'];
  feeAmount: Scalars['BigInt'];
  isAddNewTranche?: InputMaybe<Scalars['Boolean']>;
  lenderAddress: Scalars['Address'];
  loanId: Scalars['String'];
  offerHash: Scalars['Hash'];
  principalAmount: Scalars['BigInt'];
  renegotiationId: Scalars['BigInt'];
  requiresLiquidation?: InputMaybe<Scalars['Boolean']>;
  signature: Scalars['Signature'];
  signerAddress?: InputMaybe<Scalars['Address']>;
  strictImprovement?: InputMaybe<Scalars['Boolean']>;
  targetPrincipal?: InputMaybe<Array<Scalars['BigInt']>>;
  trancheIndex?: InputMaybe<Array<Scalars['BigInt']>>;
};

export type SingleNftOffer = Node & Offer & {
  __typename?: 'SingleNFTOffer';
  aprBps: Scalars['BigInt'];
  availablePrincipalAmount: Scalars['BigInt'];
  borrowerAddress?: Maybe<Scalars['Address']>;
  capacity: Scalars['BigInt'];
  consumedCapacity: Scalars['BigInt'];
  contractAddress: Scalars['Address'];
  createdDate?: Maybe<Scalars['DateTime']>;
  currency: Currency;
  duration: Scalars['BigInt'];
  expirationTime: Scalars['BigInt'];
  fee: Scalars['BigInt'];
  hidden?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  lenderAddress?: Maybe<Scalars['Address']>;
  lenderAvailableBalance?: Maybe<Scalars['BigInt']>;
  maxPrincipal: Scalars['BigInt'];
  maxSeniorRepayment: Scalars['BigInt'];
  /**
   * Deprecated field: use maxSeniorRepayment instead.
   * @deprecated Use maxSeniorRepayment instead.
   */
  maxTrancheFloor: Scalars['BigInt'];
  netPrincipal: Scalars['BigInt'];
  nft: Nft;
  offerHash?: Maybe<Scalars['Hash']>;
  offerId: Scalars['BigInt'];
  principalAddress: Scalars['Address'];
  principalAmount: Scalars['BigInt'];
  repayment: Scalars['BigInt'];
  requiresLiquidation?: Maybe<Scalars['Boolean']>;
  signature?: Maybe<Scalars['Signature']>;
  signerAddress?: Maybe<Scalars['Address']>;
  statistics: OfferStatistics;
  status: Scalars['String'];
  validators: Array<OfferValidator>;
};

export type SingleNftOfferCollectionOfferRenegotiation = CollectionOffer | Renegotiation | SingleNftOffer;

export type SingleNftOfferCollectionOfferRenegotiationConnection = {
  __typename?: 'SingleNFTOfferCollectionOfferRenegotiationConnection';
  edges: Array<SingleNftOfferCollectionOfferRenegotiationEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type SingleNftOfferCollectionOfferRenegotiationEdge = {
  __typename?: 'SingleNFTOfferCollectionOfferRenegotiationEdge';
  cursor: Scalars['String'];
  node: SingleNftOfferCollectionOfferRenegotiation;
};

export type SingleNftOfferInput = {
  aprBps: Scalars['BigInt'];
  borrowerAddress: Scalars['Address'];
  capacity: Scalars['BigInt'];
  contractAddress: Scalars['Address'];
  duration: Scalars['BigInt'];
  expirationTime: Scalars['BigInt'];
  fee: Scalars['BigInt'];
  lenderAddress: Scalars['Address'];
  maxSeniorRepayment?: InputMaybe<Scalars['BigInt']>;
  maxTrancheFloor?: InputMaybe<Scalars['BigInt']>;
  nftId: Scalars['Int'];
  offerValidators: Array<OfferValidatorInput>;
  principalAddress: Scalars['Address'];
  principalAmount: Scalars['BigInt'];
  requiresLiquidation?: InputMaybe<Scalars['Boolean']>;
  signerAddress?: InputMaybe<Scalars['Address']>;
};

export type SingleNftOrder = Activity & Node & Order & {
  __typename?: 'SingleNFTOrder';
  createdDate: Scalars['DateTime'];
  currency: Currency;
  currencyAddress: Scalars['Address'];
  evmOrder?: Maybe<Scalars['JSON']>;
  expiration: Scalars['DateTime'];
  fees: Scalars['BigInt'];
  hidden: Scalars['Boolean'];
  id: Scalars['String'];
  isAsk: Scalars['Boolean'];
  isPrivate: Scalars['Boolean'];
  maker: Scalars['Address'];
  marketPlace: Scalars['String'];
  marketPlaceAddress: Scalars['Address'];
  netAmount: Scalars['BigInt'];
  nft: Nft;
  nftId: Scalars['Int'];
  nonce: Scalars['BigInt'];
  orderType: Scalars['String'];
  originalId: Scalars['Hash'];
  price: Scalars['BigInt'];
  signature: Scalars['Signature'];
  startTime: Scalars['DateTime'];
  status: Scalars['String'];
  taker: Scalars['Address'];
  timestamp: Scalars['DateTime'];
  txHash?: Maybe<Scalars['Hash']>;
};

export type SingleNftOrderInput = {
  amount: Scalars['BigInt'];
  contractAddress: Scalars['Address'];
  currencyAddress: Scalars['Address'];
  expirationTime: Scalars['BigInt'];
  isAsk?: InputMaybe<Scalars['Boolean']>;
  signature?: InputMaybe<Scalars['Signature']>;
  startTime: Scalars['BigInt'];
  taker?: InputMaybe<Scalars['Address']>;
  tokenId: Scalars['BigInt'];
};

export type SingleNftOrderSignatureRequest = SignatureRequest | SingleNftOrder;

export type SingleNftSignedOfferInput = {
  aprBps: Scalars['BigInt'];
  borrowerAddress: Scalars['Address'];
  capacity: Scalars['BigInt'];
  contractAddress: Scalars['Address'];
  duration: Scalars['BigInt'];
  expirationTime: Scalars['BigInt'];
  fee: Scalars['BigInt'];
  lenderAddress: Scalars['Address'];
  maxSeniorRepayment?: InputMaybe<Scalars['BigInt']>;
  maxTrancheFloor?: InputMaybe<Scalars['BigInt']>;
  nftId: Scalars['Int'];
  offerHash: Scalars['Hash'];
  offerId: Scalars['BigInt'];
  offerValidators: Array<OfferValidatorInput>;
  principalAddress: Scalars['Address'];
  principalAmount: Scalars['BigInt'];
  requiresLiquidation?: InputMaybe<Scalars['Boolean']>;
  signature: Scalars['Signature'];
  signerAddress?: InputMaybe<Scalars['Address']>;
};

export type SluggedTokenInput = {
  slug: Scalars['String'];
  tokenId: Scalars['BigInt'];
};

/** This is the definition of a source. Sources are the lender/s of a loan. Take into account that the loan fields can change if renegotiation or refinance happens.If a renegotiation or refinance happens on a loan, the sources compromised turn into LostSource's. */
export type Source = Node & {
  __typename?: 'Source';
  accruedInterest: Scalars['BigInt'];
  aprBps: Scalars['BigInt'];
  borrowerEaprBps: Scalars['BigInt'];
  earnedInterest: Scalars['BigInt'];
  effectiveDuration: Scalars['BigInt'];
  endDate: Scalars['DateTime'];
  expectedInterestLeft: Scalars['BigInt'];
  id: Scalars['String'];
  lenderAddress: Scalars['String'];
  lenderEaprBps: Scalars['BigInt'];
  loan: MultiSourceLoan;
  loanId: Scalars['String'];
  loanIndex?: Maybe<Scalars['Int']>;
  loanReferenceId: Scalars['String'];
  originationFee: Scalars['BigInt'];
  principalAmount: Scalars['BigInt'];
  profit: Scalars['BigInt'];
  refinanceNetAprBps: Scalars['BigInt'];
  repaidInterest: Scalars['BigInt'];
  seniorPrincipalAmount?: Maybe<Scalars['BigInt']>;
  startTime: Scalars['DateTime'];
};

export type SourceHistory = Node & {
  __typename?: 'SourceHistory';
  accruedInterest: Scalars['BigInt'];
  aprBps: Scalars['BigInt'];
  id: Scalars['String'];
  lenderAddress: Scalars['String'];
  loanId: Scalars['String'];
  loanIndex?: Maybe<Scalars['Int']>;
  originationFee: Scalars['BigInt'];
  principalAmount: Scalars['BigInt'];
  seniorPrincipalAmount?: Maybe<Scalars['BigInt']>;
  startTime: Scalars['DateTime'];
};

export type SourceLostSource = LostSource | Source;

export type SourceLostSourceConnection = {
  __typename?: 'SourceLostSourceConnection';
  edges: Array<SourceLostSourceEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type SourceLostSourceEdge = {
  __typename?: 'SourceLostSourceEdge';
  cursor: Scalars['String'];
  node: SourceLostSource;
};

export enum SourceSortField {
  AccruedInterest = 'ACCRUED_INTEREST',
  AprBps = 'APR_BPS',
  DueDate = 'DUE_DATE',
  Duration = 'DURATION',
  EarnedInterest = 'EARNED_INTEREST',
  EndDate = 'END_DATE',
  OriginationFee = 'ORIGINATION_FEE',
  PrincipalAmount = 'PRINCIPAL_AMOUNT',
  RefinanceNetAprBps = 'REFINANCE_NET_APR_BPS',
  RepaidInterest = 'REPAID_INTEREST',
  StartTime = 'START_TIME'
}

export type SourceSortInput = {
  field: SourceSortField;
  order: Ordering;
};

export type SourceStatisticsFromCollection = {
  __typename?: 'SourceStatisticsFromCollection';
  collection: Collection;
  collectionId: Scalars['String'];
  stats: SourcesStatistics;
};

export type SourcesStatistics = {
  __typename?: 'SourcesStatistics';
  count: Scalars['Int'];
  earnedInterest: Scalars['BigInt'];
  expectedInterestLeft: Scalars['BigInt'];
  originationFee: Scalars['BigInt'];
  outstanding: Scalars['BigInt'];
  principal: Scalars['BigInt'];
  profit: Scalars['BigInt'];
  repaidInterest: Scalars['BigInt'];
  wavgAprBps: Scalars['BigInt'];
  wavgLenderEaprBps: Scalars['BigInt'];
};

export type StatByCollection = {
  __typename?: 'StatByCollection';
  collection: Collection;
  value: Scalars['BigInt'];
};

export type TermsFilter = {
  aprBps?: InputMaybe<Interval>;
  duration?: InputMaybe<Interval>;
  fee?: InputMaybe<Interval>;
  maxPrincipal?: InputMaybe<Interval>;
  netPrincipal?: InputMaybe<Interval>;
  principal?: InputMaybe<Interval>;
  remainingTime?: InputMaybe<Interval>;
};

export enum TokenStandardType {
  Cryptopunks = 'CRYPTOPUNKS',
  Erc721 = 'ERC721',
  Erc1155 = 'ERC1155',
  OldErc721 = 'OLD_ERC721'
}

export type TopUpRequest = Node & {
  __typename?: 'TopUpRequest';
  createdDate: Scalars['DateTime'];
  desiredAprBps?: Maybe<Scalars['BigInt']>;
  desiredTopUp?: Maybe<Scalars['BigInt']>;
  expirationDate: Scalars['DateTime'];
  id: Scalars['String'];
  loanId: Scalars['String'];
};

export type TopUpRequestedNotification = Node & Notification & {
  __typename?: 'TopUpRequestedNotification';
  aprBps: Scalars['BigInt'];
  createdOn: Scalars['DateTime'];
  id: Scalars['String'];
  loan: MultiSourceLoan;
  loanId: Scalars['String'];
  notificationType: Scalars['String'];
  readOn?: Maybe<Scalars['DateTime']>;
  topUp: Scalars['BigInt'];
  user: User;
};

export type Trait = Node & {
  __typename?: 'Trait';
  collectionId: Scalars['String'];
  id: Scalars['String'];
  key: Scalars['String'];
  /** @deprecated Trait statistics are not available */
  statistics: CollectionStatistics;
  type: Scalars['String'];
  value: Scalars['String'];
};

export type TraitKeyValueOptionsInput = {
  key: Scalars['String'];
  values: Array<Scalars['String']>;
};

export type TraitOrder = Activity & Node & Order & {
  __typename?: 'TraitOrder';
  collectionId: Scalars['Int'];
  createdDate: Scalars['DateTime'];
  currency: Currency;
  currencyAddress: Scalars['Address'];
  evmOrder?: Maybe<Scalars['JSON']>;
  expiration: Scalars['DateTime'];
  fees: Scalars['BigInt'];
  hidden: Scalars['Boolean'];
  id: Scalars['String'];
  isAsk: Scalars['Boolean'];
  isPrivate: Scalars['Boolean'];
  maker: Scalars['Address'];
  marketPlace: Scalars['String'];
  marketPlaceAddress: Scalars['Address'];
  netAmount: Scalars['BigInt'];
  nonce: Scalars['BigInt'];
  orderType: Scalars['String'];
  originalId: Scalars['Hash'];
  price: Scalars['BigInt'];
  signature: Scalars['Signature'];
  startTime: Scalars['DateTime'];
  status: Scalars['String'];
  taker: Scalars['Address'];
  timestamp: Scalars['DateTime'];
  traitId: Scalars['Int'];
  txHash?: Maybe<Scalars['Hash']>;
};

export type TraitRangeOptionsInput = {
  key: Scalars['String'];
  range: RangeInput;
};

export type TraitType = Node & {
  __typename?: 'TraitType';
  collectionId: Scalars['Int'];
  count: Scalars['Int'];
  id: Scalars['String'];
  key: Scalars['String'];
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  valueType: Scalars['String'];
};

export type TraitTypeConnection = {
  __typename?: 'TraitTypeConnection';
  edges: Array<TraitTypeEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type TraitTypeEdge = {
  __typename?: 'TraitTypeEdge';
  cursor: Scalars['String'];
  node: TraitType;
};

export type TraitValue = Node & {
  __typename?: 'TraitValue';
  collectionId: Scalars['Int'];
  id: Scalars['String'];
  key: Scalars['String'];
  rarity: Scalars['Int'];
  sampleAsset?: Maybe<Asset>;
  sampleAssetId?: Maybe<Scalars['Int']>;
  value: Scalars['String'];
};

export type TraitValueConnection = {
  __typename?: 'TraitValueConnection';
  edges: Array<TraitValueEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type TraitValueEdge = {
  __typename?: 'TraitValueEdge';
  cursor: Scalars['String'];
  node: TraitValue;
};

export enum TraitValueSortField {
  Alphabetical = 'ALPHABETICAL',
  Rarity = 'RARITY'
}

export type TraitValueSortInput = {
  field: TraitValueSortField;
  order: Ordering;
};

export type TypedData = {
  __typename?: 'TypedData';
  domain: Scalars['JSON'];
  message: Scalars['JSON'];
  primaryType: Scalars['String'];
  types: Scalars['JSON'];
};

export type UnderfundedOfferNotification = Node & Notification & {
  __typename?: 'UnderfundedOfferNotification';
  createdOn: Scalars['DateTime'];
  id: Scalars['String'];
  notificationType: Scalars['String'];
  offer: Offer;
  offerId: Scalars['String'];
  readOn?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type User = Node & {
  __typename?: 'User';
  about?: Maybe<Scalars['String']>;
  beta: Scalars['Boolean'];
  blockchain: Scalars['String'];
  createdDate: Scalars['DateTime'];
  id: Scalars['String'];
  linkedWallets: Array<LinkedWallets>;
  mail?: Maybe<Scalars['String']>;
  mailValidationDate?: Maybe<Scalars['DateTime']>;
  originalProfilePicture?: Maybe<Scalars['String']>;
  profilePictureId?: Maybe<Scalars['Int']>;
  size64ProfilePicture?: Maybe<Scalars['String']>;
  size128ProfilePicture?: Maybe<Scalars['String']>;
  size256ProfilePicture?: Maybe<Scalars['String']>;
  size512ProfilePicture?: Maybe<Scalars['String']>;
  statistics: UserStatistics;
  twitterHandle?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  usedProduct: Scalars['Boolean'];
  username?: Maybe<Scalars['String']>;
  walletAddress: Scalars['Address'];
};

export type UserFilter = {
  onlyOrExclude: Scalars['Boolean'];
  userId: Scalars['Int'];
};

export type UserStatistics = {
  __typename?: 'UserStatistics';
  /**
   * Deprecated field. Stat will be removed
   * @deprecated Stat will be removed
   */
  defaultedPrincipal: Scalars['BigInt'];
  /**
   * Deprecated field. Use get_sources_statistics_by_collection instead.
   * @deprecated Use get_sources_statistics_by_collection instead.
   */
  interestEarnedByCollection: Array<StatByCollection>;
  /**
   * Deprecated field. Use get_sources_statistics to get source stats.
   * @deprecated Use get_sources_statistics to get source stats.
   */
  loanCount: Scalars['BigInt'];
  /**
   * Deprecated field. Use get_sources_statistics_by_collection instead.
   * @deprecated Use get_sources_statistics_by_collection instead.
   */
  loanCountByCollection: Array<StatByCollection>;
  /**
   * Deprecated field. Use get_sources_statistics_by_collection instead.
   * @deprecated Use get_sources_statistics_by_collection instead.
   */
  loanPrincipalByCollection: Array<StatByCollection>;
  /**
   * Deprecated field. Use get_loan_activities_statistics_by_month instead.
   * @deprecated Use get_loan_activities_statistics_by_month instead.
   */
  originationCountAndPrincipalByMonth: Array<Array<Scalars['BigInt']>>;
  /**
   * Deprecated field. Use get_sources_statistics to get source stats.
   * @deprecated Use get_sources_statistics to get source stats.
   */
  outstandingAccruedInterest: Scalars['BigInt'];
  /**
   * Deprecated field. Use get_sources_statistics to get source stats.
   * @deprecated Use get_sources_statistics to get source stats.
   */
  outstandingPrincipal: Scalars['BigInt'];
  /**
   * Deprecated field. Use get_sources_statistics to get source stats.
   * @deprecated Use get_sources_statistics to get source stats.
   */
  realizedProfits: Scalars['BigInt'];
  /**
   * Deprecated field. Use get_loan_activities_statistics_by_month instead.
   * @deprecated Use get_loan_activities_statistics_by_month instead.
   */
  renegotiationCountAndPrincipalByMonth: Array<Array<Scalars['BigInt']>>;
  /**
   * Deprecated field. Use get_sources_statistics to get source stats.
   * @deprecated Use get_sources_statistics to get source stats.
   */
  totalLentPrincipal: Scalars['BigInt'];
  /**
   * Deprecated field. Use get_sources_statistics to get source stats.
   * @deprecated Use get_sources_statistics to get source stats.
   */
  totalLoanCount: Scalars['BigInt'];
  /**
   * Deprecated field. Use get_sources_statistics to get source stats.
   * @deprecated Use get_sources_statistics to get source stats.
   */
  wavgOutstandingApr: Scalars['BigInt'];
  /**
   * Deprecated field. Use get_sources_statistics_by_collection instead.
   * @deprecated Use get_sources_statistics_by_collection instead.
   */
  wavgOutstandingAprByCollection: Array<StatByCollection>;
  /**
   * Deprecated field. Use get_sources_statistics to get source stats.
   * @deprecated Use get_sources_statistics to get source stats.
   */
  wavgRepaidApr: Scalars['BigInt'];
  /**
   * Deprecated field. Use get_sources_statistics_by_collection instead.
   * @deprecated Use get_sources_statistics_by_collection instead.
   */
  wavgRepaidAprByCollection: Array<StatByCollection>;
};


export type UserStatisticsDefaultedPrincipalArgs = {
  currencyAddress: Scalars['Address'];
  walletsAddresses: Array<Scalars['Address']>;
};


export type UserStatisticsInterestEarnedByCollectionArgs = {
  currencyAddress: Scalars['Address'];
  walletsAddresses: Array<Scalars['Address']>;
};


export type UserStatisticsLoanCountArgs = {
  currencyAddress: Scalars['Address'];
  walletsAddresses: Array<Scalars['Address']>;
};


export type UserStatisticsLoanCountByCollectionArgs = {
  currencyAddress: Scalars['Address'];
  walletsAddresses: Array<Scalars['Address']>;
};


export type UserStatisticsLoanPrincipalByCollectionArgs = {
  currencyAddress: Scalars['Address'];
  walletsAddresses: Array<Scalars['Address']>;
};


export type UserStatisticsOriginationCountAndPrincipalByMonthArgs = {
  currencyAddress: Scalars['Address'];
  walletsAddresses: Array<Scalars['Address']>;
};


export type UserStatisticsOutstandingAccruedInterestArgs = {
  currencyAddress: Scalars['Address'];
  walletsAddresses: Array<Scalars['Address']>;
};


export type UserStatisticsOutstandingPrincipalArgs = {
  currencyAddress: Scalars['Address'];
  walletsAddresses: Array<Scalars['Address']>;
};


export type UserStatisticsRealizedProfitsArgs = {
  currencyAddress: Scalars['Address'];
  walletsAddresses: Array<Scalars['Address']>;
};


export type UserStatisticsRenegotiationCountAndPrincipalByMonthArgs = {
  currencyAddress: Scalars['Address'];
  walletsAddresses: Array<Scalars['Address']>;
};


export type UserStatisticsTotalLentPrincipalArgs = {
  currencyAddress: Scalars['Address'];
  walletsAddresses: Array<Scalars['Address']>;
};


export type UserStatisticsTotalLoanCountArgs = {
  currencyAddress: Scalars['Address'];
  walletsAddresses: Array<Scalars['Address']>;
};


export type UserStatisticsWavgOutstandingAprArgs = {
  currencyAddress: Scalars['Address'];
  walletsAddresses: Array<Scalars['Address']>;
};


export type UserStatisticsWavgOutstandingAprByCollectionArgs = {
  currencyAddress: Scalars['Address'];
  walletsAddresses: Array<Scalars['Address']>;
};


export type UserStatisticsWavgRepaidAprArgs = {
  currencyAddress: Scalars['Address'];
  walletsAddresses: Array<Scalars['Address']>;
};


export type UserStatisticsWavgRepaidAprByCollectionArgs = {
  currencyAddress: Scalars['Address'];
  walletsAddresses: Array<Scalars['Address']>;
};

export type WithAsksInput = {
  enabled?: InputMaybe<Scalars['Boolean']>;
  marketplaces?: InputMaybe<Array<MarketPlaceType>>;
};

export type WithdrawalPosition = Node & {
  __typename?: 'WithdrawalPosition';
  available: Scalars['BigInt'];
  id: Scalars['String'];
  nft: Nft;
  nftId: Scalars['Int'];
  pending: Scalars['BigInt'];
  requested: Scalars['BigInt'];
  shares: Scalars['BigInt'];
  unlockTime?: Maybe<Scalars['DateTime']>;
  withdrawalQueue: WithdrawalQueue;
  withdrawalQueueId: Scalars['Int'];
  withdrawn: Scalars['BigInt'];
};

export type WithdrawalPositionConnection = {
  __typename?: 'WithdrawalPositionConnection';
  edges: Array<WithdrawalPositionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type WithdrawalPositionEdge = {
  __typename?: 'WithdrawalPositionEdge';
  cursor: Scalars['String'];
  node: WithdrawalPosition;
};

export type WithdrawalPositionLocked = Node & PoolActivity & {
  __typename?: 'WithdrawalPositionLocked';
  contract: Scalars['Address'];
  id: Scalars['String'];
  indexInBlock: Scalars['Int'];
  pool: Pool;
  poolAddress: Scalars['Address'];
  timestamp: Scalars['DateTime'];
  txHash: Scalars['Hash'];
  unlockTime: Scalars['DateTime'];
};

export type WithdrawalPositionMinted = Node & PoolActivity & {
  __typename?: 'WithdrawalPositionMinted';
  contract: Scalars['Address'];
  id: Scalars['String'];
  indexInBlock: Scalars['Int'];
  pool: Pool;
  poolAddress: Scalars['Address'];
  receiver: Scalars['Address'];
  shares: Scalars['BigInt'];
  timestamp: Scalars['DateTime'];
  txHash: Scalars['Hash'];
};

export type WithdrawalQueue = Node & {
  __typename?: 'WithdrawalQueue';
  balance: Scalars['BigInt'];
  collection: Collection;
  collectionId: Scalars['Int'];
  id: Scalars['String'];
  index: Scalars['Int'];
  pending: Scalars['BigInt'];
  pool: Pool;
  poolAddress: Scalars['Address'];
  requested: Scalars['BigInt'];
  requesters: Scalars['Int'];
  startTime: Scalars['DateTime'];
  status: Scalars['String'];
  totalShares: Scalars['BigInt'];
  totalWithdrawn: Scalars['BigInt'];
};

export type WithdrawalQueueConnection = {
  __typename?: 'WithdrawalQueueConnection';
  edges: Array<WithdrawalQueueEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type WithdrawalQueueEdge = {
  __typename?: 'WithdrawalQueueEdge';
  cursor: Scalars['String'];
  node: WithdrawalQueue;
};

export type WithdrawnFromQueue = Node & PoolActivity & {
  __typename?: 'WithdrawnFromQueue';
  available: Scalars['BigInt'];
  contract: Scalars['Address'];
  id: Scalars['String'];
  indexInBlock: Scalars['Int'];
  pool: Pool;
  poolAddress: Scalars['Address'];
  receiver: Scalars['Address'];
  timestamp: Scalars['DateTime'];
  txHash: Scalars['Hash'];
};

export type CurrencyAmountInfoFragment = { __typename?: 'CurrencyAmount', amount: number, currency: { __typename?: 'Currency', address: Address, decimals: number } };

export type CurrencyInfoFragment = { __typename?: 'Currency', address: Address, decimals: number };

export type SaleOfferInfoFragment = { __typename?: 'SingleNFTOrder', id: string, netAmount: bigint, status: string, marketPlace: string, fees: bigint, maker: Address, expiration: Date, createdDate: Date, startTime: Date, hidden: boolean, signature: Hex, currencyAddress: Address, nonce: bigint };

export type ListNftMutationVariables = Exact<{
  nftId: Scalars['Int'];
}>;


export type ListNftMutation = { __typename?: 'Mutation', addOrUpdateListing: { __typename?: 'Listing', id: string } };

export type UnlistNftMutationVariables = Exact<{
  nftId: Scalars['Int'];
}>;


export type UnlistNftMutation = { __typename?: 'Mutation', removeListing: { __typename?: 'Listing', id: string } };

export type GenerateCollectionOfferHashMutationVariables = Exact<{
  offerInput: CollectionOfferInput;
}>;


export type GenerateCollectionOfferHashMutation = { __typename?: 'Mutation', offer: { __typename?: 'CollectionOffer', offerHash?: Hash | null, offerId: bigint, lenderAddress?: Address | null, signerAddress?: Address | null, borrowerAddress?: Address | null, validators: Array<{ __typename?: 'OfferValidator', validator: Address, arguments: Hex }>, collection: { __typename?: 'Collection', contractData: { __typename?: 'ContractData', contractAddress: Address } } } };

export type SaveCollectionOfferMutationVariables = Exact<{
  offer: CollectionSignedOfferInput;
}>;


export type SaveCollectionOfferMutation = { __typename?: 'Mutation', offer: { __typename?: 'CollectionOffer', id: string, status: string, collection: { __typename?: 'Collection', contractData: { __typename?: 'ContractData', contractAddress: Address } } } };

export type HideOfferMutationVariables = Exact<{
  contract: Scalars['Address'];
  id: Scalars['String'];
}>;


export type HideOfferMutation = { __typename?: 'Mutation', hideOffer: { __typename?: 'CollectionOffer', id: string } | { __typename?: 'SingleNFTOffer', id: string } };

export type GenerateSingleNftOfferHashMutationVariables = Exact<{
  offerInput: SingleNftOfferInput;
}>;


export type GenerateSingleNftOfferHashMutation = { __typename?: 'Mutation', offer: { __typename?: 'SingleNFTOffer', offerHash?: Hash | null, offerId: bigint, lenderAddress?: Address | null, signerAddress?: Address | null, borrowerAddress?: Address | null, validators: Array<{ __typename?: 'OfferValidator', validator: Address, arguments: Hex }>, nft: { __typename?: 'NFT', tokenId: bigint, collection?: { __typename?: 'Collection', contractData: { __typename?: 'ContractData', contractAddress: Address } } | null } } };

export type SaveSingleNftOfferMutationVariables = Exact<{
  offer: SingleNftSignedOfferInput;
}>;


export type SaveSingleNftOfferMutation = { __typename?: 'Mutation', offer: { __typename?: 'SingleNFTOffer', id: string, status: string, nft: { __typename?: 'NFT', tokenId: bigint, collection?: { __typename?: 'Collection', contractData: { __typename?: 'ContractData', contractAddress: Address } } | null } } };

export type UnhideOfferMutationVariables = Exact<{
  contract: Scalars['Address'];
  id: Scalars['String'];
}>;


export type UnhideOfferMutation = { __typename?: 'Mutation', showOffer: { __typename?: 'CollectionOffer', id: string } | { __typename?: 'SingleNFTOffer', id: string } };

export type HideOrderMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type HideOrderMutation = { __typename?: 'Mutation', hideOrder: { __typename?: 'BuyNowPayLaterOrder', id: string } | { __typename?: 'CollectionOrder', id: string } | { __typename?: 'SellAndRepayOrder', id: string } | { __typename?: 'SingleNFTOrder', id: string } | { __typename?: 'TraitOrder', id: string } };

export type PublishOrderForCollectionMutationVariables = Exact<{
  orderInput: CollectionOrderInput;
}>;


export type PublishOrderForCollectionMutation = { __typename?: 'Mutation', result: { __typename?: 'CollectionOrder', id: string, status: string, signature: Hex, marketPlaceAddress: Address } | { __typename?: 'SignatureRequest', key: string, typedData: { __typename?: 'TypedData', types: object, primaryType: string, domain: object, message: object } } };

export type PublishOrderForNftMutationVariables = Exact<{
  orderInput: SingleNftOrderInput;
}>;


export type PublishOrderForNftMutation = { __typename?: 'Mutation', result: { __typename?: 'SignatureRequest', key: string, typedData: { __typename?: 'TypedData', types: object, primaryType: string, domain: object, message: object } } | { __typename?: 'SingleNFTOrder', id: string, status: string, signature: Hex, marketPlaceAddress: Address } };

export type PublishSellAndRepayOrderMutationVariables = Exact<{
  orderInput: NftOrderInput;
}>;


export type PublishSellAndRepayOrderMutation = { __typename?: 'Mutation', result: { __typename?: 'SellAndRepayOrder', id: string, status: string, signature: Hex, repaymentCalldata: Hex, marketPlaceAddress: Address } | { __typename?: 'SignatureRequest', key: string, typedData: { __typename?: 'TypedData', types: object, primaryType: string, domain: object, message: object } } };

export type ShowOrderMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ShowOrderMutation = { __typename?: 'Mutation', showOrder: { __typename?: 'BuyNowPayLaterOrder', id: string } | { __typename?: 'CollectionOrder', id: string } | { __typename?: 'SellAndRepayOrder', id: string } | { __typename?: 'SingleNFTOrder', id: string } | { __typename?: 'TraitOrder', id: string } };

export type GenerateRenegotiationOfferHashMutationVariables = Exact<{
  renegotiationInput: RenegotiationOfferInput;
}>;


export type GenerateRenegotiationOfferHashMutation = { __typename?: 'Mutation', offer: { __typename?: 'Renegotiation', loanId: bigint, renegotiationId: bigint, offerHash?: Hash | null, lenderAddress?: Address | null, signerAddress?: Address | null, nft: { __typename?: 'NFT', tokenId: bigint, collection?: { __typename?: 'Collection', contractData: { __typename?: 'ContractData', contractAddress: Address } } | null } } };

export type HideRenegotiationOfferMutationVariables = Exact<{
  id: Scalars['String'];
  contractAddress: Scalars['Address'];
}>;


export type HideRenegotiationOfferMutation = { __typename?: 'Mutation', hideRenegotiation: { __typename?: 'Renegotiation', id: string } };

export type SaveRenegotiationOfferMutationVariables = Exact<{
  renegotiation: SignedRenegotiationOfferInput;
  fallbackOffer?: InputMaybe<SingleNftSignedOfferInput>;
}>;


export type SaveRenegotiationOfferMutation = { __typename?: 'Mutation', renegotiation: { __typename?: 'Renegotiation', id: string, status: string } };

export type UnhideRenegotiationOfferMutationVariables = Exact<{
  id: Scalars['String'];
  contractAddress: Scalars['Address'];
}>;


export type UnhideRenegotiationOfferMutation = { __typename?: 'Mutation', showRenegotiation: { __typename?: 'Renegotiation', id: string } };

export type CollectionsQueryVariables = Exact<{
  currency: Scalars['Address'];
  collections?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
  standards?: InputMaybe<Array<TokenStandardType> | TokenStandardType>;
  after?: InputMaybe<Scalars['String']>;
}>;


export type CollectionsQuery = { __typename?: 'Query', collections: { __typename?: 'CollectionConnection', pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean }, edges: Array<{ __typename?: 'CollectionEdge', node: { __typename?: 'Collection', id: string, name?: string | null, slug: string, description?: string | null, discordUrl?: string | null, twitterUsername?: string | null, externalUrl?: string | null, collectionUrl?: string | null, verified: boolean, wrapperCollections: Array<{ __typename?: 'Collection', contractData: { __typename?: 'ContractData', contractAddress: Address } }>, image?: { __typename?: 'Asset', cacheUrl?: string | null } | null, bannerImage?: { __typename?: 'Asset', cacheUrl?: string | null } | null, contractData: { __typename?: 'ContractData', blockchain: string, contractAddress: Address, createdDate: Date, creatorAddress?: Address | null }, statistics: { __typename?: 'CollectionStatistics', floorPrice7d?: number | null, floorPrice30d?: number | null, totalVolume?: number | null, totalVolume1y?: number | null, totalVolume3m?: number | null, totalVolume1m?: number | null, totalVolume1w?: number | null, totalLoanVolume: bigint, totalLoanVolume1w: bigint, totalLoanVolume1m: bigint, totalLoanVolume3m: bigint, totalLoanVolume1y: bigint, numberOfPricedNfts: number, nftsCount?: number | null, percentageInOutstandingLoans: number, repaymentRate: number, numberOfOffers: number, floorPrice?: { __typename?: 'CurrencyAmount', amount: number, currency: { __typename?: 'Currency', address: Address, decimals: number } } | null, bestOffer?: { __typename?: 'CurrencyAmount', amount: number, currency: { __typename?: 'Currency', address: Address, decimals: number } } | null } } }> } };

export type CollectionByContractAddressQueryVariables = Exact<{
  contractAddress: Scalars['Address'];
}>;


export type CollectionByContractAddressQuery = { __typename?: 'Query', collection: Array<{ __typename?: 'Collection', contractData: { __typename?: 'ContractData', contractAddress: Address }, wrapperCollections: Array<{ __typename?: 'Collection', contractData: { __typename?: 'ContractData', contractAddress: Address } }> }> };

export type CollectionsIdByContractAddressQueryVariables = Exact<{
  contractAddress: Scalars['Address'];
}>;


export type CollectionsIdByContractAddressQuery = { __typename?: 'Query', collections: Array<{ __typename?: 'Collection', id: string }> };

export type CollectionIdBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type CollectionIdBySlugQuery = { __typename?: 'Query', collection?: { __typename?: 'Collection', id: string } | null };

export type ListListingsQueryVariables = Exact<{
  collections?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
  userFilter?: InputMaybe<UserFilter>;
  marketplaceNames?: InputMaybe<Array<MarketplaceEnum> | MarketplaceEnum>;
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
}>;


export type ListListingsQuery = { __typename?: 'Query', result: { __typename?: 'ListingConnection', pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean }, edges: Array<{ __typename?: 'ListingEdge', node: { __typename?: 'Listing', id: string, marketplaceName: MarketplaceEnum, createdDate: Date, desiredDuration?: number | null, desiredPrincipalAddress?: Address | null, user: { __typename?: 'User', walletAddress: Address }, nft: { __typename?: 'NFT', id: string, tokenId: bigint, collection?: { __typename?: 'Collection', id: string, slug: string, contractData: { __typename?: 'ContractData', contractAddress: Address } } | null } } }> } };

export type ListLoansQueryVariables = Exact<{
  borrowers?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  collections?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
  nfts?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
  statuses?: InputMaybe<Array<LoanStatusType> | LoanStatusType>;
  sortBy?: InputMaybe<Array<LoanSortInput> | LoanSortInput>;
  terms?: InputMaybe<TermsFilter>;
  orderByStatuses?: InputMaybe<Scalars['Boolean']>;
  loansCurrencyAddress?: InputMaybe<Scalars['Address']>;
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
}>;


export type ListLoansQuery = { __typename?: 'Query', loans: { __typename?: 'MultiSourceLoanConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean }, edges: Array<{ __typename?: 'MultiSourceLoanEdge', node: { __typename?: 'MultiSourceLoan', id: string, address: Address, loanId: number, timestamp: Date, txHash: Hash, indexInBlock: number, borrowerAddress: Address, principalAddress: Address, startTime: Date, duration: bigint, status: string, principalAmount: bigint, blendedAprBps: number, totalOriginationFee: bigint, protocolFee: bigint, offer: { __typename?: 'CollectionOffer', offerId: bigint, signerAddress?: Address | null } | { __typename?: 'SingleNFTOffer', offerId: bigint, signerAddress?: Address | null }, currency: { __typename?: 'Currency', symbol: string, decimals: number, address: Address }, repaidActivity?: { __typename?: 'LoanRepaid', totalInterest: bigint, timestamp: Date } | null, nft: { __typename?: 'NFT', id: string, name?: string | null, tokenId: bigint, nftId: string, owner?: Address | null, image?: { __typename?: 'Asset', data: string, cacheUrl?: string | null, contentTypeMime: string, accessTypeName: string } | null, collection?: { __typename?: 'Collection', id: string, slug: string, name?: string | null, nftsCount?: number | null, contractData: { __typename?: 'ContractData', contractAddress: Address } } | null }, sources: Array<{ __typename?: 'Source', id: string, loanId: string, originationFee: bigint, principalAmount: bigint, lenderAddress: string, accruedInterest: bigint, aprBps: bigint, startTime: Date }> } }> } };

export type NftIdByContractAddressAndTokenIdQueryVariables = Exact<{
  contractAddress: Scalars['Address'];
  tokenId: Scalars['BigInt'];
}>;


export type NftIdByContractAddressAndTokenIdQuery = { __typename?: 'Query', nft?: { __typename?: 'NFT', id: string } | null };

export type NftIdBySlugTokenIdQueryVariables = Exact<{
  slug: Scalars['String'];
  tokenId: Scalars['BigInt'];
}>;


export type NftIdBySlugTokenIdQuery = { __typename?: 'Query', nft?: { __typename?: 'NFT', id: string } | null };

export type OwnedNftsQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  includeInLoans?: InputMaybe<Scalars['Boolean']>;
  includeInStash?: InputMaybe<Scalars['Boolean']>;
  standards?: InputMaybe<Array<TokenStandardType> | TokenStandardType>;
}>;


export type OwnedNftsQuery = { __typename?: 'Query', ownedNfts: { __typename?: 'NFTConnection', pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean }, edges: Array<{ __typename?: 'NFTEdge', node: { __typename?: 'NFT', id: string, tokenId: bigint, collection?: { __typename?: 'Collection', id: string, contractData: { __typename?: 'ContractData', contractAddress: Address }, wrapperCollections: Array<{ __typename?: 'Collection', contractData: { __typename?: 'ContractData', contractAddress: Address } }> } | null, activeLoan?: { __typename?: 'MultiSourceLoan', id: string } | null, statistics: { __typename?: 'NftStatistics', lastSale?: { __typename?: 'Sale', order: { __typename?: 'BuyNowPayLaterOrder', price: bigint, currency: { __typename?: 'Currency', address: Address, decimals: number } } | { __typename?: 'CollectionOrder', price: bigint, currency: { __typename?: 'Currency', address: Address, decimals: number } } | { __typename?: 'SellAndRepayOrder', price: bigint, currency: { __typename?: 'Currency', address: Address, decimals: number } } | { __typename?: 'SingleNFTOrder', price: bigint, currency: { __typename?: 'Currency', address: Address, decimals: number } } | { __typename?: 'TraitOrder', price: bigint, currency: { __typename?: 'Currency', address: Address, decimals: number } } } | null, topTraitFloorPrice?: { __typename?: 'CurrencyAmount', amount: number, currency: { __typename?: 'Currency', address: Address, decimals: number } } | null } } }> } };

export type ListOffersQueryVariables = Exact<{
  borrowerAddress?: InputMaybe<Scalars['String']>;
  lenders?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  sortBy: OffersSortInput;
  terms?: InputMaybe<TermsFilter>;
  statuses?: InputMaybe<Array<OfferStatus> | OfferStatus>;
  nfts?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
  collections?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
  onlySingleNftOffers?: InputMaybe<Scalars['Boolean']>;
  onlyCollectionOffers?: InputMaybe<Scalars['Boolean']>;
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
}>;


export type ListOffersQuery = { __typename?: 'Query', result: { __typename?: 'OfferConnection', pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean }, edges: Array<{ __typename?: 'OfferEdge', node: { __typename?: 'CollectionOffer', id: string, offerId: bigint, lenderAddress?: Address | null, borrowerAddress?: Address | null, signerAddress?: Address | null, contractAddress: Address, requiresLiquidation?: boolean | null, principalAddress: Address, principalAmount: bigint, aprBps: bigint, fee: bigint, capacity: bigint, expirationTime: bigint, duration: bigint, status: string, offerHash?: Hash | null, signature?: Hex | null, createdDate?: Date | null, repayment: bigint, hidden?: boolean | null, maxSeniorRepayment: bigint, collection: { __typename?: 'Collection', id: string, slug: string, contractData: { __typename?: 'ContractData', contractAddress: Address } }, currency: { __typename?: 'Currency', symbol: string, decimals: number, address: Address }, validators: Array<{ __typename?: 'OfferValidator', arguments: Hex, validator: Address }> } | { __typename?: 'SingleNFTOffer', id: string, offerId: bigint, lenderAddress?: Address | null, borrowerAddress?: Address | null, signerAddress?: Address | null, contractAddress: Address, requiresLiquidation?: boolean | null, principalAddress: Address, principalAmount: bigint, aprBps: bigint, fee: bigint, capacity: bigint, expirationTime: bigint, duration: bigint, status: string, offerHash?: Hash | null, signature?: Hex | null, createdDate?: Date | null, repayment: bigint, hidden?: boolean | null, maxSeniorRepayment: bigint, nft: { __typename?: 'NFT', id: string, tokenId: bigint, collection?: { __typename?: 'Collection', id: string, slug: string, contractData: { __typename?: 'ContractData', contractAddress: Address } } | null }, currency: { __typename?: 'Currency', symbol: string, decimals: number, address: Address }, validators: Array<{ __typename?: 'OfferValidator', arguments: Hex, validator: Address }> } }> } };

export type GetSaleCalldataQueryVariables = Exact<{
  orderId: Scalars['Int'];
  nftId?: InputMaybe<Scalars['Int']>;
}>;


export type GetSaleCalldataQuery = { __typename?: 'Query', saleCalldata: Hex };

export type ActiveOfferNotificationKeySpecifier = ('createdOn' | 'id' | 'notificationType' | 'offer' | 'offerId' | 'readOn' | 'user' | ActiveOfferNotificationKeySpecifier)[];
export type ActiveOfferNotificationFieldPolicy = {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	offer?: FieldPolicy<any> | FieldReadFunction<any>,
	offerId?: FieldPolicy<any> | FieldReadFunction<any>,
	readOn?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ActivityKeySpecifier = ('id' | 'timestamp' | 'txHash' | ActivityKeySpecifier)[];
export type ActivityFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AssetKeySpecifier = ('accessTypeName' | 'cacheUrl' | 'contentTypeMime' | 'data' | 'id' | AssetKeySpecifier)[];
export type AssetFieldPolicy = {
	accessTypeName?: FieldPolicy<any> | FieldReadFunction<any>,
	cacheUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	contentTypeMime?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AuctionKeySpecifier = ('duration' | 'endTime' | 'highestBid' | 'id' | 'loan' | 'minBid' | 'originator' | 'settler' | 'startTime' | 'status' | 'triggerFee' | AuctionKeySpecifier)[];
export type AuctionFieldPolicy = {
	duration?: FieldPolicy<any> | FieldReadFunction<any>,
	endTime?: FieldPolicy<any> | FieldReadFunction<any>,
	highestBid?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	minBid?: FieldPolicy<any> | FieldReadFunction<any>,
	originator?: FieldPolicy<any> | FieldReadFunction<any>,
	settler?: FieldPolicy<any> | FieldReadFunction<any>,
	startTime?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	triggerFee?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AuctionBidConfirmationNotificationKeySpecifier = ('auction' | 'auctionId' | 'bid' | 'bidId' | 'createdOn' | 'id' | 'loan' | 'loanId' | 'notificationType' | 'readOn' | 'user' | AuctionBidConfirmationNotificationKeySpecifier)[];
export type AuctionBidConfirmationNotificationFieldPolicy = {
	auction?: FieldPolicy<any> | FieldReadFunction<any>,
	auctionId?: FieldPolicy<any> | FieldReadFunction<any>,
	bid?: FieldPolicy<any> | FieldReadFunction<any>,
	bidId?: FieldPolicy<any> | FieldReadFunction<any>,
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	readOn?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AuctionConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | AuctionConnectionKeySpecifier)[];
export type AuctionConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AuctionEdgeKeySpecifier = ('cursor' | 'node' | AuctionEdgeKeySpecifier)[];
export type AuctionEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AuctionEndedNotificationKeySpecifier = ('auction' | 'auctionId' | 'createdOn' | 'id' | 'loan' | 'loanId' | 'notificationType' | 'readOn' | 'user' | AuctionEndedNotificationKeySpecifier)[];
export type AuctionEndedNotificationFieldPolicy = {
	auction?: FieldPolicy<any> | FieldReadFunction<any>,
	auctionId?: FieldPolicy<any> | FieldReadFunction<any>,
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	readOn?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AuctionStartedNotificationKeySpecifier = ('auction' | 'auctionId' | 'createdOn' | 'id' | 'loan' | 'loanId' | 'notificationType' | 'readOn' | 'user' | AuctionStartedNotificationKeySpecifier)[];
export type AuctionStartedNotificationFieldPolicy = {
	auction?: FieldPolicy<any> | FieldReadFunction<any>,
	auctionId?: FieldPolicy<any> | FieldReadFunction<any>,
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	readOn?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AuctionWonNotificationKeySpecifier = ('auction' | 'auctionId' | 'createdOn' | 'id' | 'loan' | 'loanId' | 'notificationType' | 'readOn' | 'user' | AuctionWonNotificationKeySpecifier)[];
export type AuctionWonNotificationFieldPolicy = {
	auction?: FieldPolicy<any> | FieldReadFunction<any>,
	auctionId?: FieldPolicy<any> | FieldReadFunction<any>,
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	readOn?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BidKeySpecifier = ('amount' | 'auction' | 'auctionId' | 'bidder' | 'id' | 'indexInBlock' | 'timestamp' | 'txHash' | BidKeySpecifier)[];
export type BidFieldPolicy = {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	auction?: FieldPolicy<any> | FieldReadFunction<any>,
	auctionId?: FieldPolicy<any> | FieldReadFunction<any>,
	bidder?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BidConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | BidConnectionKeySpecifier)[];
export type BidConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BidEdgeKeySpecifier = ('cursor' | 'node' | BidEdgeKeySpecifier)[];
export type BidEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BigIntCurrencyAmountKeySpecifier = ('amount' | 'currency' | BigIntCurrencyAmountKeySpecifier)[];
export type BigIntCurrencyAmountFieldPolicy = {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BuyNowPayLaterOrderKeySpecifier = ('createdDate' | 'currency' | 'currencyAddress' | 'emitCalldata' | 'evmOrder' | 'expiration' | 'fees' | 'hidden' | 'id' | 'isAsk' | 'isPrivate' | 'maker' | 'marketPlace' | 'marketPlaceAddress' | 'netAmount' | 'nft' | 'nftId' | 'nonce' | 'orderType' | 'originalId' | 'price' | 'signature' | 'startTime' | 'status' | 'taker' | 'timestamp' | 'txHash' | BuyNowPayLaterOrderKeySpecifier)[];
export type BuyNowPayLaterOrderFieldPolicy = {
	createdDate?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	currencyAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	emitCalldata?: FieldPolicy<any> | FieldReadFunction<any>,
	evmOrder?: FieldPolicy<any> | FieldReadFunction<any>,
	expiration?: FieldPolicy<any> | FieldReadFunction<any>,
	fees?: FieldPolicy<any> | FieldReadFunction<any>,
	hidden?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isAsk?: FieldPolicy<any> | FieldReadFunction<any>,
	isPrivate?: FieldPolicy<any> | FieldReadFunction<any>,
	maker?: FieldPolicy<any> | FieldReadFunction<any>,
	marketPlace?: FieldPolicy<any> | FieldReadFunction<any>,
	marketPlaceAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	netAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	nft?: FieldPolicy<any> | FieldReadFunction<any>,
	nftId?: FieldPolicy<any> | FieldReadFunction<any>,
	nonce?: FieldPolicy<any> | FieldReadFunction<any>,
	orderType?: FieldPolicy<any> | FieldReadFunction<any>,
	originalId?: FieldPolicy<any> | FieldReadFunction<any>,
	price?: FieldPolicy<any> | FieldReadFunction<any>,
	signature?: FieldPolicy<any> | FieldReadFunction<any>,
	startTime?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	taker?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CollectionKeySpecifier = ('bannerImage' | 'collectionUrl' | 'contractData' | 'description' | 'discordUrl' | 'externalUrl' | 'id' | 'image' | 'imageId' | 'maxNetPrincipalOffer' | 'name' | 'nftsCount' | 'slug' | 'statistics' | 'twitterUsername' | 'verified' | 'wrappedCollection' | 'wrappedCollectionId' | 'wrapperCollections' | CollectionKeySpecifier)[];
export type CollectionFieldPolicy = {
	bannerImage?: FieldPolicy<any> | FieldReadFunction<any>,
	collectionUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	contractData?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	discordUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	externalUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	image?: FieldPolicy<any> | FieldReadFunction<any>,
	imageId?: FieldPolicy<any> | FieldReadFunction<any>,
	maxNetPrincipalOffer?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	nftsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	slug?: FieldPolicy<any> | FieldReadFunction<any>,
	statistics?: FieldPolicy<any> | FieldReadFunction<any>,
	twitterUsername?: FieldPolicy<any> | FieldReadFunction<any>,
	verified?: FieldPolicy<any> | FieldReadFunction<any>,
	wrappedCollection?: FieldPolicy<any> | FieldReadFunction<any>,
	wrappedCollectionId?: FieldPolicy<any> | FieldReadFunction<any>,
	wrapperCollections?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CollectionConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | CollectionConnectionKeySpecifier)[];
export type CollectionConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CollectionEdgeKeySpecifier = ('cursor' | 'node' | CollectionEdgeKeySpecifier)[];
export type CollectionEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CollectionEventsCountByDayAndCurrencyKeySpecifier = ('auctions' | 'buyouts' | 'defaults' | 'foreclosings' | 'originations' | 'refinancings' | 'renegotiations' | 'repayments' | 'topUps' | CollectionEventsCountByDayAndCurrencyKeySpecifier)[];
export type CollectionEventsCountByDayAndCurrencyFieldPolicy = {
	auctions?: FieldPolicy<any> | FieldReadFunction<any>,
	buyouts?: FieldPolicy<any> | FieldReadFunction<any>,
	defaults?: FieldPolicy<any> | FieldReadFunction<any>,
	foreclosings?: FieldPolicy<any> | FieldReadFunction<any>,
	originations?: FieldPolicy<any> | FieldReadFunction<any>,
	refinancings?: FieldPolicy<any> | FieldReadFunction<any>,
	renegotiations?: FieldPolicy<any> | FieldReadFunction<any>,
	repayments?: FieldPolicy<any> | FieldReadFunction<any>,
	topUps?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CollectionLoansDataKeySpecifier = ('maxAprBps' | 'maxPrincipalAmount' | 'maxRemainingTime' | 'minAprBps' | 'minPrincipalAmount' | 'minRemainingTime' | CollectionLoansDataKeySpecifier)[];
export type CollectionLoansDataFieldPolicy = {
	maxAprBps?: FieldPolicy<any> | FieldReadFunction<any>,
	maxPrincipalAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	maxRemainingTime?: FieldPolicy<any> | FieldReadFunction<any>,
	minAprBps?: FieldPolicy<any> | FieldReadFunction<any>,
	minPrincipalAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	minRemainingTime?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CollectionOfferKeySpecifier = ('aprBps' | 'availablePrincipalAmount' | 'borrowerAddress' | 'capacity' | 'collection' | 'consumedCapacity' | 'contractAddress' | 'createdDate' | 'currency' | 'duration' | 'expirationTime' | 'fee' | 'hidden' | 'id' | 'lenderAddress' | 'lenderAvailableBalance' | 'maxPrincipal' | 'maxSeniorRepayment' | 'maxTrancheFloor' | 'netPrincipal' | 'offerHash' | 'offerId' | 'principalAddress' | 'principalAmount' | 'repayment' | 'requiresLiquidation' | 'signature' | 'signerAddress' | 'statistics' | 'status' | 'validators' | CollectionOfferKeySpecifier)[];
export type CollectionOfferFieldPolicy = {
	aprBps?: FieldPolicy<any> | FieldReadFunction<any>,
	availablePrincipalAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	borrowerAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	capacity?: FieldPolicy<any> | FieldReadFunction<any>,
	collection?: FieldPolicy<any> | FieldReadFunction<any>,
	consumedCapacity?: FieldPolicy<any> | FieldReadFunction<any>,
	contractAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	createdDate?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	duration?: FieldPolicy<any> | FieldReadFunction<any>,
	expirationTime?: FieldPolicy<any> | FieldReadFunction<any>,
	fee?: FieldPolicy<any> | FieldReadFunction<any>,
	hidden?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	lenderAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	lenderAvailableBalance?: FieldPolicy<any> | FieldReadFunction<any>,
	maxPrincipal?: FieldPolicy<any> | FieldReadFunction<any>,
	maxSeniorRepayment?: FieldPolicy<any> | FieldReadFunction<any>,
	maxTrancheFloor?: FieldPolicy<any> | FieldReadFunction<any>,
	netPrincipal?: FieldPolicy<any> | FieldReadFunction<any>,
	offerHash?: FieldPolicy<any> | FieldReadFunction<any>,
	offerId?: FieldPolicy<any> | FieldReadFunction<any>,
	principalAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	principalAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	repayment?: FieldPolicy<any> | FieldReadFunction<any>,
	requiresLiquidation?: FieldPolicy<any> | FieldReadFunction<any>,
	signature?: FieldPolicy<any> | FieldReadFunction<any>,
	signerAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	statistics?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	validators?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CollectionOfferStatisticsKeySpecifier = ('acceptedLoans' | 'consumedCapacity' | CollectionOfferStatisticsKeySpecifier)[];
export type CollectionOfferStatisticsFieldPolicy = {
	acceptedLoans?: FieldPolicy<any> | FieldReadFunction<any>,
	consumedCapacity?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CollectionOrderKeySpecifier = ('collection' | 'collectionId' | 'createdDate' | 'currency' | 'currencyAddress' | 'evmOrder' | 'executions' | 'expiration' | 'fees' | 'hidden' | 'id' | 'isAsk' | 'isPrivate' | 'maker' | 'marketPlace' | 'marketPlaceAddress' | 'maxExecutions' | 'netAmount' | 'nonce' | 'orderType' | 'originalId' | 'price' | 'signature' | 'startTime' | 'status' | 'taker' | 'timestamp' | 'txHash' | CollectionOrderKeySpecifier)[];
export type CollectionOrderFieldPolicy = {
	collection?: FieldPolicy<any> | FieldReadFunction<any>,
	collectionId?: FieldPolicy<any> | FieldReadFunction<any>,
	createdDate?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	currencyAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	evmOrder?: FieldPolicy<any> | FieldReadFunction<any>,
	executions?: FieldPolicy<any> | FieldReadFunction<any>,
	expiration?: FieldPolicy<any> | FieldReadFunction<any>,
	fees?: FieldPolicy<any> | FieldReadFunction<any>,
	hidden?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isAsk?: FieldPolicy<any> | FieldReadFunction<any>,
	isPrivate?: FieldPolicy<any> | FieldReadFunction<any>,
	maker?: FieldPolicy<any> | FieldReadFunction<any>,
	marketPlace?: FieldPolicy<any> | FieldReadFunction<any>,
	marketPlaceAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	maxExecutions?: FieldPolicy<any> | FieldReadFunction<any>,
	netAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	nonce?: FieldPolicy<any> | FieldReadFunction<any>,
	orderType?: FieldPolicy<any> | FieldReadFunction<any>,
	originalId?: FieldPolicy<any> | FieldReadFunction<any>,
	price?: FieldPolicy<any> | FieldReadFunction<any>,
	signature?: FieldPolicy<any> | FieldReadFunction<any>,
	startTime?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	taker?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CollectionStatisticsKeySpecifier = ('bestOffer' | 'floorPrice' | 'floorPrice7d' | 'floorPrice30d' | 'maxAskPrice' | 'minAskPrice' | 'nftsCount' | 'numberOfOffers' | 'numberOfPricedNfts' | 'outstandingLoanCount' | 'outstandingNftsCount' | 'outstandingPrincipal' | 'percentageInOutstandingLoans' | 'repaymentRate' | 'totalLoanVolume' | 'totalLoanVolume1d' | 'totalLoanVolume1m' | 'totalLoanVolume1w' | 'totalLoanVolume1y' | 'totalLoanVolume2m' | 'totalLoanVolume3m' | 'totalLoanVolume4m' | 'totalOutstandingPrincipal' | 'totalVolume' | 'totalVolume1d' | 'totalVolume1m' | 'totalVolume1w' | 'totalVolume1y' | 'totalVolume2m' | 'totalVolume3m' | 'totalVolume4m' | CollectionStatisticsKeySpecifier)[];
export type CollectionStatisticsFieldPolicy = {
	bestOffer?: FieldPolicy<any> | FieldReadFunction<any>,
	floorPrice?: FieldPolicy<any> | FieldReadFunction<any>,
	floorPrice7d?: FieldPolicy<any> | FieldReadFunction<any>,
	floorPrice30d?: FieldPolicy<any> | FieldReadFunction<any>,
	maxAskPrice?: FieldPolicy<any> | FieldReadFunction<any>,
	minAskPrice?: FieldPolicy<any> | FieldReadFunction<any>,
	nftsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	numberOfOffers?: FieldPolicy<any> | FieldReadFunction<any>,
	numberOfPricedNfts?: FieldPolicy<any> | FieldReadFunction<any>,
	outstandingLoanCount?: FieldPolicy<any> | FieldReadFunction<any>,
	outstandingNftsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	outstandingPrincipal?: FieldPolicy<any> | FieldReadFunction<any>,
	percentageInOutstandingLoans?: FieldPolicy<any> | FieldReadFunction<any>,
	repaymentRate?: FieldPolicy<any> | FieldReadFunction<any>,
	totalLoanVolume?: FieldPolicy<any> | FieldReadFunction<any>,
	totalLoanVolume1d?: FieldPolicy<any> | FieldReadFunction<any>,
	totalLoanVolume1m?: FieldPolicy<any> | FieldReadFunction<any>,
	totalLoanVolume1w?: FieldPolicy<any> | FieldReadFunction<any>,
	totalLoanVolume1y?: FieldPolicy<any> | FieldReadFunction<any>,
	totalLoanVolume2m?: FieldPolicy<any> | FieldReadFunction<any>,
	totalLoanVolume3m?: FieldPolicy<any> | FieldReadFunction<any>,
	totalLoanVolume4m?: FieldPolicy<any> | FieldReadFunction<any>,
	totalOutstandingPrincipal?: FieldPolicy<any> | FieldReadFunction<any>,
	totalVolume?: FieldPolicy<any> | FieldReadFunction<any>,
	totalVolume1d?: FieldPolicy<any> | FieldReadFunction<any>,
	totalVolume1m?: FieldPolicy<any> | FieldReadFunction<any>,
	totalVolume1w?: FieldPolicy<any> | FieldReadFunction<any>,
	totalVolume1y?: FieldPolicy<any> | FieldReadFunction<any>,
	totalVolume2m?: FieldPolicy<any> | FieldReadFunction<any>,
	totalVolume3m?: FieldPolicy<any> | FieldReadFunction<any>,
	totalVolume4m?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ContractDataKeySpecifier = ('blockchain' | 'contractAddress' | 'createdDate' | 'creatorAddress' | 'id' | 'standard' | ContractDataKeySpecifier)[];
export type ContractDataFieldPolicy = {
	blockchain?: FieldPolicy<any> | FieldReadFunction<any>,
	contractAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	createdDate?: FieldPolicy<any> | FieldReadFunction<any>,
	creatorAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	standard?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CurrencyKeySpecifier = ('address' | 'currentEthRate' | 'currentUsdcPrice' | 'decimals' | 'id' | 'symbol' | CurrencyKeySpecifier)[];
export type CurrencyFieldPolicy = {
	address?: FieldPolicy<any> | FieldReadFunction<any>,
	currentEthRate?: FieldPolicy<any> | FieldReadFunction<any>,
	currentUsdcPrice?: FieldPolicy<any> | FieldReadFunction<any>,
	decimals?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	symbol?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CurrencyAmountKeySpecifier = ('amount' | 'currency' | CurrencyAmountKeySpecifier)[];
export type CurrencyAmountFieldPolicy = {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CurrencyConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | CurrencyConnectionKeySpecifier)[];
export type CurrencyConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CurrencyEdgeKeySpecifier = ('cursor' | 'node' | CurrencyEdgeKeySpecifier)[];
export type CurrencyEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DelegationKeySpecifier = ('contractAddress' | 'delegateTo' | 'id' | 'nft' | 'timestamp' | DelegationKeySpecifier)[];
export type DelegationFieldPolicy = {
	contractAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	delegateTo?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	nft?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DelegationConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | DelegationConnectionKeySpecifier)[];
export type DelegationConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DelegationEdgeKeySpecifier = ('cursor' | 'node' | DelegationEdgeKeySpecifier)[];
export type DelegationEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ERC4626DepositKeySpecifier = ('assets' | 'caller' | 'id' | 'indexInBlock' | 'owner' | 'pool' | 'poolAddress' | 'shares' | 'timestamp' | 'txHash' | ERC4626DepositKeySpecifier)[];
export type ERC4626DepositFieldPolicy = {
	assets?: FieldPolicy<any> | FieldReadFunction<any>,
	caller?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	owner?: FieldPolicy<any> | FieldReadFunction<any>,
	pool?: FieldPolicy<any> | FieldReadFunction<any>,
	poolAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	shares?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ERC4626WithdrawKeySpecifier = ('assets' | 'caller' | 'id' | 'indexInBlock' | 'owner' | 'pool' | 'poolAddress' | 'receiver' | 'shares' | 'timestamp' | 'txHash' | ERC4626WithdrawKeySpecifier)[];
export type ERC4626WithdrawFieldPolicy = {
	assets?: FieldPolicy<any> | FieldReadFunction<any>,
	caller?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	owner?: FieldPolicy<any> | FieldReadFunction<any>,
	pool?: FieldPolicy<any> | FieldReadFunction<any>,
	poolAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	receiver?: FieldPolicy<any> | FieldReadFunction<any>,
	shares?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LinkedWalletsKeySpecifier = ('id' | 'pending' | 'shouldAccept' | 'walletAddress' | LinkedWalletsKeySpecifier)[];
export type LinkedWalletsFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	pending?: FieldPolicy<any> | FieldReadFunction<any>,
	shouldAccept?: FieldPolicy<any> | FieldReadFunction<any>,
	walletAddress?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ListingKeySpecifier = ('createdDate' | 'desiredDuration' | 'desiredPrincipalAddress' | 'expirationDate' | 'id' | 'marketplaceName' | 'nft' | 'user' | ListingKeySpecifier)[];
export type ListingFieldPolicy = {
	createdDate?: FieldPolicy<any> | FieldReadFunction<any>,
	desiredDuration?: FieldPolicy<any> | FieldReadFunction<any>,
	desiredPrincipalAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	expirationDate?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	marketplaceName?: FieldPolicy<any> | FieldReadFunction<any>,
	nft?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ListingConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | ListingConnectionKeySpecifier)[];
export type ListingConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ListingEdgeKeySpecifier = ('cursor' | 'node' | ListingEdgeKeySpecifier)[];
export type ListingEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoanKeySpecifier = ('activities' | 'address' | 'borrowerAddress' | 'contractStartTime' | 'currency' | 'duration' | 'id' | 'indexInBlock' | 'loanId' | 'offer' | 'offerIds' | 'principalAddress' | 'protocolFee' | 'repaidActivity' | 'repaymentTime' | 'startTime' | 'status' | 'timestamp' | 'txHash' | LoanKeySpecifier)[];
export type LoanFieldPolicy = {
	activities?: FieldPolicy<any> | FieldReadFunction<any>,
	address?: FieldPolicy<any> | FieldReadFunction<any>,
	borrowerAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	contractStartTime?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	duration?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	offer?: FieldPolicy<any> | FieldReadFunction<any>,
	offerIds?: FieldPolicy<any> | FieldReadFunction<any>,
	principalAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	protocolFee?: FieldPolicy<any> | FieldReadFunction<any>,
	repaidActivity?: FieldPolicy<any> | FieldReadFunction<any>,
	repaymentTime?: FieldPolicy<any> | FieldReadFunction<any>,
	startTime?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoanActivitiesStatisticsByMonthKeySpecifier = ('count' | 'outstanding' | LoanActivitiesStatisticsByMonthKeySpecifier)[];
export type LoanActivitiesStatisticsByMonthFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	outstanding?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoanActivityKeySpecifier = ('activityType' | 'eventType' | 'id' | 'indexInBlock' | 'loan' | 'loanId' | 'multiSourceLoanHistory' | 'nextActivity' | 'prevActivity' | 'timestamp' | 'txHash' | LoanActivityKeySpecifier)[];
export type LoanActivityFieldPolicy = {
	activityType?: FieldPolicy<any> | FieldReadFunction<any>,
	eventType?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	multiSourceLoanHistory?: FieldPolicy<any> | FieldReadFunction<any>,
	nextActivity?: FieldPolicy<any> | FieldReadFunction<any>,
	prevActivity?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoanActivityConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | LoanActivityConnectionKeySpecifier)[];
export type LoanActivityConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoanActivityEdgeKeySpecifier = ('cursor' | 'node' | LoanActivityEdgeKeySpecifier)[];
export type LoanActivityEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoanAuctionedKeySpecifier = ('activityType' | 'eventType' | 'id' | 'indexInBlock' | 'loan' | 'loanId' | 'loanPayments' | 'multiSourceLoanHistory' | 'nextActivity' | 'prevActivity' | 'timestamp' | 'totalAuctioned' | 'txHash' | 'withBuyout' | LoanAuctionedKeySpecifier)[];
export type LoanAuctionedFieldPolicy = {
	activityType?: FieldPolicy<any> | FieldReadFunction<any>,
	eventType?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	loanPayments?: FieldPolicy<any> | FieldReadFunction<any>,
	multiSourceLoanHistory?: FieldPolicy<any> | FieldReadFunction<any>,
	nextActivity?: FieldPolicy<any> | FieldReadFunction<any>,
	prevActivity?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	totalAuctioned?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>,
	withBuyout?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoanAuctionedNotificationKeySpecifier = ('auction' | 'auctionId' | 'createdOn' | 'id' | 'loan' | 'loanId' | 'notificationType' | 'readOn' | 'user' | LoanAuctionedNotificationKeySpecifier)[];
export type LoanAuctionedNotificationFieldPolicy = {
	auction?: FieldPolicy<any> | FieldReadFunction<any>,
	auctionId?: FieldPolicy<any> | FieldReadFunction<any>,
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	readOn?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoanDefaultReminderNotificationKeySpecifier = ('createdOn' | 'defaultsInHours' | 'id' | 'loan' | 'loanId' | 'notificationType' | 'readOn' | 'user' | LoanDefaultReminderNotificationKeySpecifier)[];
export type LoanDefaultReminderNotificationFieldPolicy = {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	defaultsInHours?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	readOn?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoanDefaultedKeySpecifier = ('eventType' | 'id' | 'loan' | 'loanId' | 'timestamp' | LoanDefaultedKeySpecifier)[];
export type LoanDefaultedFieldPolicy = {
	eventType?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoanDefaultedNotificationKeySpecifier = ('createdOn' | 'id' | 'loan' | 'loanId' | 'notificationType' | 'readOn' | 'user' | LoanDefaultedNotificationKeySpecifier)[];
export type LoanDefaultedNotificationFieldPolicy = {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	readOn?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoanEventKeySpecifier = ('eventType' | 'id' | 'loan' | 'loanId' | 'timestamp' | LoanEventKeySpecifier)[];
export type LoanEventFieldPolicy = {
	eventType?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoanEventConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | LoanEventConnectionKeySpecifier)[];
export type LoanEventConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoanEventEdgeKeySpecifier = ('cursor' | 'node' | LoanEventEdgeKeySpecifier)[];
export type LoanEventEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoanExtendedKeySpecifier = ('activityType' | 'eventType' | 'id' | 'indexInBlock' | 'loan' | 'loanId' | 'multiSourceLoanHistory' | 'nextActivity' | 'prevActivity' | 'timestamp' | 'txHash' | LoanExtendedKeySpecifier)[];
export type LoanExtendedFieldPolicy = {
	activityType?: FieldPolicy<any> | FieldReadFunction<any>,
	eventType?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	multiSourceLoanHistory?: FieldPolicy<any> | FieldReadFunction<any>,
	nextActivity?: FieldPolicy<any> | FieldReadFunction<any>,
	prevActivity?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoanExtendedNotificationKeySpecifier = ('createdOn' | 'id' | 'newHistory' | 'newHistoryId' | 'notificationType' | 'previousHistory' | 'previousHistoryId' | 'readOn' | 'user' | LoanExtendedNotificationKeySpecifier)[];
export type LoanExtendedNotificationFieldPolicy = {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	newHistory?: FieldPolicy<any> | FieldReadFunction<any>,
	newHistoryId?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	previousHistory?: FieldPolicy<any> | FieldReadFunction<any>,
	previousHistoryId?: FieldPolicy<any> | FieldReadFunction<any>,
	readOn?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoanForeclosedKeySpecifier = ('activityType' | 'eventType' | 'id' | 'indexInBlock' | 'loan' | 'loanId' | 'multiSourceLoanHistory' | 'nextActivity' | 'prevActivity' | 'timestamp' | 'txHash' | LoanForeclosedKeySpecifier)[];
export type LoanForeclosedFieldPolicy = {
	activityType?: FieldPolicy<any> | FieldReadFunction<any>,
	eventType?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	multiSourceLoanHistory?: FieldPolicy<any> | FieldReadFunction<any>,
	nextActivity?: FieldPolicy<any> | FieldReadFunction<any>,
	prevActivity?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoanInitiatedKeySpecifier = ('activityType' | 'eventType' | 'id' | 'indexInBlock' | 'loan' | 'loanId' | 'multiSourceLoanHistory' | 'nextActivity' | 'prevActivity' | 'timestamp' | 'txHash' | LoanInitiatedKeySpecifier)[];
export type LoanInitiatedFieldPolicy = {
	activityType?: FieldPolicy<any> | FieldReadFunction<any>,
	eventType?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	multiSourceLoanHistory?: FieldPolicy<any> | FieldReadFunction<any>,
	nextActivity?: FieldPolicy<any> | FieldReadFunction<any>,
	prevActivity?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoanPaymentKeySpecifier = ('accruedInterest' | 'activityId' | 'destination' | 'id' | 'pendingInterest' | 'principalAddress' | 'principalAmount' | 'protocolFee' | 'source' | LoanPaymentKeySpecifier)[];
export type LoanPaymentFieldPolicy = {
	accruedInterest?: FieldPolicy<any> | FieldReadFunction<any>,
	activityId?: FieldPolicy<any> | FieldReadFunction<any>,
	destination?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	pendingInterest?: FieldPolicy<any> | FieldReadFunction<any>,
	principalAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	principalAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	protocolFee?: FieldPolicy<any> | FieldReadFunction<any>,
	source?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoanRefinancedKeySpecifier = ('activityType' | 'addedNewTranche' | 'eventType' | 'id' | 'indexInBlock' | 'isRenegotiation' | 'loan' | 'loanId' | 'multiSourceLoanHistory' | 'nextActivity' | 'prevActivity' | 'timestamp' | 'txHash' | LoanRefinancedKeySpecifier)[];
export type LoanRefinancedFieldPolicy = {
	activityType?: FieldPolicy<any> | FieldReadFunction<any>,
	addedNewTranche?: FieldPolicy<any> | FieldReadFunction<any>,
	eventType?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	isRenegotiation?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	multiSourceLoanHistory?: FieldPolicy<any> | FieldReadFunction<any>,
	nextActivity?: FieldPolicy<any> | FieldReadFunction<any>,
	prevActivity?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoanRefinancedFromOffersKeySpecifier = ('activityType' | 'eventType' | 'id' | 'indexInBlock' | 'loan' | 'loanId' | 'multiSourceLoanHistory' | 'nextActivity' | 'prevActivity' | 'timestamp' | 'txHash' | LoanRefinancedFromOffersKeySpecifier)[];
export type LoanRefinancedFromOffersFieldPolicy = {
	activityType?: FieldPolicy<any> | FieldReadFunction<any>,
	eventType?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	multiSourceLoanHistory?: FieldPolicy<any> | FieldReadFunction<any>,
	nextActivity?: FieldPolicy<any> | FieldReadFunction<any>,
	prevActivity?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoanRefinancedNotificationKeySpecifier = ('createdOn' | 'id' | 'newHistory' | 'newHistoryId' | 'notificationType' | 'previousHistory' | 'previousHistoryId' | 'readOn' | 'user' | LoanRefinancedNotificationKeySpecifier)[];
export type LoanRefinancedNotificationFieldPolicy = {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	newHistory?: FieldPolicy<any> | FieldReadFunction<any>,
	newHistoryId?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	previousHistory?: FieldPolicy<any> | FieldReadFunction<any>,
	previousHistoryId?: FieldPolicy<any> | FieldReadFunction<any>,
	readOn?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoanRepaidKeySpecifier = ('activityType' | 'eventType' | 'id' | 'indexInBlock' | 'loan' | 'loanId' | 'multiSourceLoanHistory' | 'nextActivity' | 'prevActivity' | 'timestamp' | 'totalInterest' | 'txHash' | LoanRepaidKeySpecifier)[];
export type LoanRepaidFieldPolicy = {
	activityType?: FieldPolicy<any> | FieldReadFunction<any>,
	eventType?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	multiSourceLoanHistory?: FieldPolicy<any> | FieldReadFunction<any>,
	nextActivity?: FieldPolicy<any> | FieldReadFunction<any>,
	prevActivity?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	totalInterest?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoanRepaidNotificationKeySpecifier = ('createdOn' | 'id' | 'loan' | 'loanId' | 'notificationType' | 'readOn' | 'user' | LoanRepaidNotificationKeySpecifier)[];
export type LoanRepaidNotificationFieldPolicy = {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	readOn?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoanSentToAuctionKeySpecifier = ('activityType' | 'eventType' | 'id' | 'indexInBlock' | 'liquidatorAddress' | 'loan' | 'loanId' | 'multiSourceLoanHistory' | 'nextActivity' | 'prevActivity' | 'timestamp' | 'txHash' | LoanSentToAuctionKeySpecifier)[];
export type LoanSentToAuctionFieldPolicy = {
	activityType?: FieldPolicy<any> | FieldReadFunction<any>,
	eventType?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	liquidatorAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	multiSourceLoanHistory?: FieldPolicy<any> | FieldReadFunction<any>,
	nextActivity?: FieldPolicy<any> | FieldReadFunction<any>,
	prevActivity?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoansDataKeySpecifier = ('maxAprBps' | 'maxPrincipalAmount' | 'maxRemainingTime' | 'minAprBps' | 'minPrincipalAmount' | 'minRemainingTime' | LoansDataKeySpecifier)[];
export type LoansDataFieldPolicy = {
	maxAprBps?: FieldPolicy<any> | FieldReadFunction<any>,
	maxPrincipalAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	maxRemainingTime?: FieldPolicy<any> | FieldReadFunction<any>,
	minAprBps?: FieldPolicy<any> | FieldReadFunction<any>,
	minPrincipalAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	minRemainingTime?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LostSourceKeySpecifier = ('accruedInterest' | 'activity' | 'activityId' | 'aprBps' | 'duration' | 'earnedInterest' | 'endDate' | 'expectedInterestLeft' | 'id' | 'lenderAddress' | 'lenderEaprBps' | 'loan' | 'originationFee' | 'principalAmount' | 'profit' | 'repaidInterest' | 'startTime' | LostSourceKeySpecifier)[];
export type LostSourceFieldPolicy = {
	accruedInterest?: FieldPolicy<any> | FieldReadFunction<any>,
	activity?: FieldPolicy<any> | FieldReadFunction<any>,
	activityId?: FieldPolicy<any> | FieldReadFunction<any>,
	aprBps?: FieldPolicy<any> | FieldReadFunction<any>,
	duration?: FieldPolicy<any> | FieldReadFunction<any>,
	earnedInterest?: FieldPolicy<any> | FieldReadFunction<any>,
	endDate?: FieldPolicy<any> | FieldReadFunction<any>,
	expectedInterestLeft?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	lenderAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	lenderEaprBps?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	originationFee?: FieldPolicy<any> | FieldReadFunction<any>,
	principalAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	profit?: FieldPolicy<any> | FieldReadFunction<any>,
	repaidInterest?: FieldPolicy<any> | FieldReadFunction<any>,
	startTime?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LostSourceNotificationKeySpecifier = ('createdOn' | 'id' | 'lostSource' | 'lostSourceId' | 'notificationType' | 'readOn' | 'user' | LostSourceNotificationKeySpecifier)[];
export type LostSourceNotificationFieldPolicy = {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	lostSource?: FieldPolicy<any> | FieldReadFunction<any>,
	lostSourceId?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	readOn?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MultiSourceLoanKeySpecifier = ('activities' | 'address' | 'auction' | 'blendedAprBps' | 'borrowerAddress' | 'contractStartTime' | 'currency' | 'duration' | 'durationFromRenegotiationOrStart' | 'endDate' | 'id' | 'indexInBlock' | 'lastOriginationFee' | 'lastRenegotiationDate' | 'loanId' | 'nft' | 'offer' | 'offerIds' | 'principalAddress' | 'principalAmount' | 'protocolFee' | 'renegotiationCount' | 'renegotiationRequest' | 'repaidActivity' | 'repaymentTime' | 'sources' | 'startTime' | 'status' | 'timestamp' | 'topUpRequest' | 'totalOriginationFee' | 'txHash' | MultiSourceLoanKeySpecifier)[];
export type MultiSourceLoanFieldPolicy = {
	activities?: FieldPolicy<any> | FieldReadFunction<any>,
	address?: FieldPolicy<any> | FieldReadFunction<any>,
	auction?: FieldPolicy<any> | FieldReadFunction<any>,
	blendedAprBps?: FieldPolicy<any> | FieldReadFunction<any>,
	borrowerAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	contractStartTime?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	duration?: FieldPolicy<any> | FieldReadFunction<any>,
	durationFromRenegotiationOrStart?: FieldPolicy<any> | FieldReadFunction<any>,
	endDate?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	lastOriginationFee?: FieldPolicy<any> | FieldReadFunction<any>,
	lastRenegotiationDate?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	nft?: FieldPolicy<any> | FieldReadFunction<any>,
	offer?: FieldPolicy<any> | FieldReadFunction<any>,
	offerIds?: FieldPolicy<any> | FieldReadFunction<any>,
	principalAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	principalAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	protocolFee?: FieldPolicy<any> | FieldReadFunction<any>,
	renegotiationCount?: FieldPolicy<any> | FieldReadFunction<any>,
	renegotiationRequest?: FieldPolicy<any> | FieldReadFunction<any>,
	repaidActivity?: FieldPolicy<any> | FieldReadFunction<any>,
	repaymentTime?: FieldPolicy<any> | FieldReadFunction<any>,
	sources?: FieldPolicy<any> | FieldReadFunction<any>,
	startTime?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	topUpRequest?: FieldPolicy<any> | FieldReadFunction<any>,
	totalOriginationFee?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MultiSourceLoanConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | MultiSourceLoanConnectionKeySpecifier)[];
export type MultiSourceLoanConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MultiSourceLoanEdgeKeySpecifier = ('cursor' | 'node' | MultiSourceLoanEdgeKeySpecifier)[];
export type MultiSourceLoanEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MultiSourceLoanHistoryKeySpecifier = ('activity' | 'activityId' | 'borrowerAddress' | 'currency' | 'duration' | 'id' | 'loanId' | 'nft' | 'offerIds' | 'principalAddress' | 'principalAmount' | 'sources' | 'startTime' | MultiSourceLoanHistoryKeySpecifier)[];
export type MultiSourceLoanHistoryFieldPolicy = {
	activity?: FieldPolicy<any> | FieldReadFunction<any>,
	activityId?: FieldPolicy<any> | FieldReadFunction<any>,
	borrowerAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	duration?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	nft?: FieldPolicy<any> | FieldReadFunction<any>,
	offerIds?: FieldPolicy<any> | FieldReadFunction<any>,
	principalAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	principalAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	sources?: FieldPolicy<any> | FieldReadFunction<any>,
	startTime?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('addListingsOfNftsFromUser' | 'addOrUpdateListing' | 'addOrUpdateRenegotiationRequest' | 'addOrUpdateTopUpRequest' | 'generateCollectionOfferToBeSigned' | 'generateRenegotiationOfferToBeSigned' | 'generateSingleNftOfferToBeSigned' | 'hideAllOffers' | 'hideOffer' | 'hideOrder' | 'hideRenegotiation' | 'markNotificationIdsAsRead' | 'markNotificationsAsRead' | 'publishBuyNowPayLaterOrder' | 'publishOrderForCollection' | 'publishOrderForNft' | 'publishSellAndRepayOrder' | 'removeListing' | 'removeListingsOfNftsFromUser' | 'removeRenegotiationRequest' | 'removeTopUpRequest' | 'saveRenegotiationSignedOffer' | 'saveSignedCollectionOffer' | 'saveSignedSingleNftOffer' | 'setReferral' | 'showOffer' | 'showOrder' | 'showRenegotiation' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	addListingsOfNftsFromUser?: FieldPolicy<any> | FieldReadFunction<any>,
	addOrUpdateListing?: FieldPolicy<any> | FieldReadFunction<any>,
	addOrUpdateRenegotiationRequest?: FieldPolicy<any> | FieldReadFunction<any>,
	addOrUpdateTopUpRequest?: FieldPolicy<any> | FieldReadFunction<any>,
	generateCollectionOfferToBeSigned?: FieldPolicy<any> | FieldReadFunction<any>,
	generateRenegotiationOfferToBeSigned?: FieldPolicy<any> | FieldReadFunction<any>,
	generateSingleNftOfferToBeSigned?: FieldPolicy<any> | FieldReadFunction<any>,
	hideAllOffers?: FieldPolicy<any> | FieldReadFunction<any>,
	hideOffer?: FieldPolicy<any> | FieldReadFunction<any>,
	hideOrder?: FieldPolicy<any> | FieldReadFunction<any>,
	hideRenegotiation?: FieldPolicy<any> | FieldReadFunction<any>,
	markNotificationIdsAsRead?: FieldPolicy<any> | FieldReadFunction<any>,
	markNotificationsAsRead?: FieldPolicy<any> | FieldReadFunction<any>,
	publishBuyNowPayLaterOrder?: FieldPolicy<any> | FieldReadFunction<any>,
	publishOrderForCollection?: FieldPolicy<any> | FieldReadFunction<any>,
	publishOrderForNft?: FieldPolicy<any> | FieldReadFunction<any>,
	publishSellAndRepayOrder?: FieldPolicy<any> | FieldReadFunction<any>,
	removeListing?: FieldPolicy<any> | FieldReadFunction<any>,
	removeListingsOfNftsFromUser?: FieldPolicy<any> | FieldReadFunction<any>,
	removeRenegotiationRequest?: FieldPolicy<any> | FieldReadFunction<any>,
	removeTopUpRequest?: FieldPolicy<any> | FieldReadFunction<any>,
	saveRenegotiationSignedOffer?: FieldPolicy<any> | FieldReadFunction<any>,
	saveSignedCollectionOffer?: FieldPolicy<any> | FieldReadFunction<any>,
	saveSignedSingleNftOffer?: FieldPolicy<any> | FieldReadFunction<any>,
	setReferral?: FieldPolicy<any> | FieldReadFunction<any>,
	showOffer?: FieldPolicy<any> | FieldReadFunction<any>,
	showOrder?: FieldPolicy<any> | FieldReadFunction<any>,
	showRenegotiation?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NFTKeySpecifier = ('activeLoan' | 'collection' | 'collectionId' | 'createdDate' | 'description' | 'id' | 'image' | 'isFlagged' | 'listed' | 'marketPlaceOfPrice' | 'maxNetPrincipalOffer' | 'name' | 'nftId' | 'nftPriceSample' | 'owner' | 'price' | 'priceCurrencyAddress' | 'rarityRank' | 'rarityScore' | 'statistics' | 'tokenId' | 'traits' | 'url' | 'wrappedCount' | 'wrapsNfts' | NFTKeySpecifier)[];
export type NFTFieldPolicy = {
	activeLoan?: FieldPolicy<any> | FieldReadFunction<any>,
	collection?: FieldPolicy<any> | FieldReadFunction<any>,
	collectionId?: FieldPolicy<any> | FieldReadFunction<any>,
	createdDate?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	image?: FieldPolicy<any> | FieldReadFunction<any>,
	isFlagged?: FieldPolicy<any> | FieldReadFunction<any>,
	listed?: FieldPolicy<any> | FieldReadFunction<any>,
	marketPlaceOfPrice?: FieldPolicy<any> | FieldReadFunction<any>,
	maxNetPrincipalOffer?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	nftId?: FieldPolicy<any> | FieldReadFunction<any>,
	nftPriceSample?: FieldPolicy<any> | FieldReadFunction<any>,
	owner?: FieldPolicy<any> | FieldReadFunction<any>,
	price?: FieldPolicy<any> | FieldReadFunction<any>,
	priceCurrencyAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	rarityRank?: FieldPolicy<any> | FieldReadFunction<any>,
	rarityScore?: FieldPolicy<any> | FieldReadFunction<any>,
	statistics?: FieldPolicy<any> | FieldReadFunction<any>,
	tokenId?: FieldPolicy<any> | FieldReadFunction<any>,
	traits?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>,
	wrappedCount?: FieldPolicy<any> | FieldReadFunction<any>,
	wrapsNfts?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NFTConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | NFTConnectionKeySpecifier)[];
export type NFTConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NFTEdgeKeySpecifier = ('cursor' | 'node' | NFTEdgeKeySpecifier)[];
export type NFTEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NFTPriceSampleKeySpecifier = ('currencyAddress' | 'id' | 'order' | 'orderId' | 'surveyedId' | 'taker' | 'timestamp' | 'value' | NFTPriceSampleKeySpecifier)[];
export type NFTPriceSampleFieldPolicy = {
	currencyAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	order?: FieldPolicy<any> | FieldReadFunction<any>,
	orderId?: FieldPolicy<any> | FieldReadFunction<any>,
	surveyedId?: FieldPolicy<any> | FieldReadFunction<any>,
	taker?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NewCollectionUnlistedOfferNotificationKeySpecifier = ('createdOn' | 'id' | 'notificationType' | 'readOn' | 'user' | NewCollectionUnlistedOfferNotificationKeySpecifier)[];
export type NewCollectionUnlistedOfferNotificationFieldPolicy = {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	readOn?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NewOfferNotificationKeySpecifier = ('createdOn' | 'id' | 'notificationType' | 'offer' | 'offerId' | 'readOn' | 'user' | NewOfferNotificationKeySpecifier)[];
export type NewOfferNotificationFieldPolicy = {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	offer?: FieldPolicy<any> | FieldReadFunction<any>,
	offerId?: FieldPolicy<any> | FieldReadFunction<any>,
	readOn?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NewRenegotiationOfferNotificationKeySpecifier = ('createdOn' | 'id' | 'loan' | 'loanId' | 'notificationType' | 'readOn' | 'renegotiation' | 'renegotiationId' | 'user' | NewRenegotiationOfferNotificationKeySpecifier)[];
export type NewRenegotiationOfferNotificationFieldPolicy = {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	readOn?: FieldPolicy<any> | FieldReadFunction<any>,
	renegotiation?: FieldPolicy<any> | FieldReadFunction<any>,
	renegotiationId?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NftStatisticsKeySpecifier = ('highestBid' | 'lastSale' | 'loansTotalVolume' | 'numberOfOffers' | 'topTraitFloorPrice' | NftStatisticsKeySpecifier)[];
export type NftStatisticsFieldPolicy = {
	highestBid?: FieldPolicy<any> | FieldReadFunction<any>,
	lastSale?: FieldPolicy<any> | FieldReadFunction<any>,
	loansTotalVolume?: FieldPolicy<any> | FieldReadFunction<any>,
	numberOfOffers?: FieldPolicy<any> | FieldReadFunction<any>,
	topTraitFloorPrice?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NodeKeySpecifier = ('id' | NodeKeySpecifier)[];
export type NodeFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NotificationKeySpecifier = ('createdOn' | 'id' | 'notificationType' | 'readOn' | 'user' | NotificationKeySpecifier)[];
export type NotificationFieldPolicy = {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	readOn?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NotificationConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | NotificationConnectionKeySpecifier)[];
export type NotificationConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NotificationEdgeKeySpecifier = ('cursor' | 'node' | NotificationEdgeKeySpecifier)[];
export type NotificationEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OfferKeySpecifier = ('aprBps' | 'availablePrincipalAmount' | 'borrowerAddress' | 'capacity' | 'consumedCapacity' | 'contractAddress' | 'createdDate' | 'currency' | 'duration' | 'expirationTime' | 'fee' | 'hidden' | 'id' | 'lenderAddress' | 'lenderAvailableBalance' | 'maxPrincipal' | 'maxSeniorRepayment' | 'maxTrancheFloor' | 'netPrincipal' | 'offerHash' | 'offerId' | 'principalAddress' | 'principalAmount' | 'repayment' | 'requiresLiquidation' | 'signature' | 'signerAddress' | 'status' | 'validators' | OfferKeySpecifier)[];
export type OfferFieldPolicy = {
	aprBps?: FieldPolicy<any> | FieldReadFunction<any>,
	availablePrincipalAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	borrowerAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	capacity?: FieldPolicy<any> | FieldReadFunction<any>,
	consumedCapacity?: FieldPolicy<any> | FieldReadFunction<any>,
	contractAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	createdDate?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	duration?: FieldPolicy<any> | FieldReadFunction<any>,
	expirationTime?: FieldPolicy<any> | FieldReadFunction<any>,
	fee?: FieldPolicy<any> | FieldReadFunction<any>,
	hidden?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	lenderAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	lenderAvailableBalance?: FieldPolicy<any> | FieldReadFunction<any>,
	maxPrincipal?: FieldPolicy<any> | FieldReadFunction<any>,
	maxSeniorRepayment?: FieldPolicy<any> | FieldReadFunction<any>,
	maxTrancheFloor?: FieldPolicy<any> | FieldReadFunction<any>,
	netPrincipal?: FieldPolicy<any> | FieldReadFunction<any>,
	offerHash?: FieldPolicy<any> | FieldReadFunction<any>,
	offerId?: FieldPolicy<any> | FieldReadFunction<any>,
	principalAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	principalAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	repayment?: FieldPolicy<any> | FieldReadFunction<any>,
	requiresLiquidation?: FieldPolicy<any> | FieldReadFunction<any>,
	signature?: FieldPolicy<any> | FieldReadFunction<any>,
	signerAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	validators?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OfferAcceptedNotificationKeySpecifier = ('createdOn' | 'id' | 'loan' | 'loanId' | 'notificationType' | 'offer' | 'offerId' | 'readOn' | 'user' | OfferAcceptedNotificationKeySpecifier)[];
export type OfferAcceptedNotificationFieldPolicy = {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	offer?: FieldPolicy<any> | FieldReadFunction<any>,
	offerId?: FieldPolicy<any> | FieldReadFunction<any>,
	readOn?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OfferConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | OfferConnectionKeySpecifier)[];
export type OfferConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OfferEdgeKeySpecifier = ('cursor' | 'node' | OfferEdgeKeySpecifier)[];
export type OfferEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OfferStatisticsKeySpecifier = ('consumedCapacity' | OfferStatisticsKeySpecifier)[];
export type OfferStatisticsFieldPolicy = {
	consumedCapacity?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OfferValidatorKeySpecifier = ('arguments' | 'id' | 'offerId' | 'validator' | OfferValidatorKeySpecifier)[];
export type OfferValidatorFieldPolicy = {
	arguments?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	offerId?: FieldPolicy<any> | FieldReadFunction<any>,
	validator?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrderKeySpecifier = ('createdDate' | 'currency' | 'currencyAddress' | 'evmOrder' | 'expiration' | 'fees' | 'hidden' | 'id' | 'isAsk' | 'isPrivate' | 'maker' | 'marketPlace' | 'marketPlaceAddress' | 'netAmount' | 'nonce' | 'orderType' | 'originalId' | 'price' | 'signature' | 'startTime' | 'status' | 'taker' | 'timestamp' | 'txHash' | OrderKeySpecifier)[];
export type OrderFieldPolicy = {
	createdDate?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	currencyAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	evmOrder?: FieldPolicy<any> | FieldReadFunction<any>,
	expiration?: FieldPolicy<any> | FieldReadFunction<any>,
	fees?: FieldPolicy<any> | FieldReadFunction<any>,
	hidden?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isAsk?: FieldPolicy<any> | FieldReadFunction<any>,
	isPrivate?: FieldPolicy<any> | FieldReadFunction<any>,
	maker?: FieldPolicy<any> | FieldReadFunction<any>,
	marketPlace?: FieldPolicy<any> | FieldReadFunction<any>,
	marketPlaceAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	netAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	nonce?: FieldPolicy<any> | FieldReadFunction<any>,
	orderType?: FieldPolicy<any> | FieldReadFunction<any>,
	originalId?: FieldPolicy<any> | FieldReadFunction<any>,
	price?: FieldPolicy<any> | FieldReadFunction<any>,
	signature?: FieldPolicy<any> | FieldReadFunction<any>,
	startTime?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	taker?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrderConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | OrderConnectionKeySpecifier)[];
export type OrderConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrderEdgeKeySpecifier = ('cursor' | 'node' | OrderEdgeKeySpecifier)[];
export type OrderEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OutbidNotificationKeySpecifier = ('auction' | 'auctionId' | 'createdOn' | 'id' | 'loan' | 'loanId' | 'newBid' | 'newBidId' | 'notificationType' | 'readOn' | 'user' | 'userBid' | 'userBidId' | OutbidNotificationKeySpecifier)[];
export type OutbidNotificationFieldPolicy = {
	auction?: FieldPolicy<any> | FieldReadFunction<any>,
	auctionId?: FieldPolicy<any> | FieldReadFunction<any>,
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	newBid?: FieldPolicy<any> | FieldReadFunction<any>,
	newBidId?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	readOn?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	userBid?: FieldPolicy<any> | FieldReadFunction<any>,
	userBidId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OutstandingLoanStatisticsKeySpecifier = ('loansData' | 'outstandingLoanCount' | 'outstandingNftsCount' | 'outstandingPrincipal' | 'totalOutstandingPrincipal' | OutstandingLoanStatisticsKeySpecifier)[];
export type OutstandingLoanStatisticsFieldPolicy = {
	loansData?: FieldPolicy<any> | FieldReadFunction<any>,
	outstandingLoanCount?: FieldPolicy<any> | FieldReadFunction<any>,
	outstandingNftsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	outstandingPrincipal?: FieldPolicy<any> | FieldReadFunction<any>,
	totalOutstandingPrincipal?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PageInfoKeySpecifier = ('endCursor' | 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | PageInfoKeySpecifier)[];
export type PageInfoFieldPolicy = {
	endCursor?: FieldPolicy<any> | FieldReadFunction<any>,
	hasNextPage?: FieldPolicy<any> | FieldReadFunction<any>,
	hasPreviousPage?: FieldPolicy<any> | FieldReadFunction<any>,
	startCursor?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PointActivityKeySpecifier = ('id' | 'loanActivity' | 'points' | 'reason' | 'timestamp' | 'userId' | PointActivityKeySpecifier)[];
export type PointActivityFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	loanActivity?: FieldPolicy<any> | FieldReadFunction<any>,
	points?: FieldPolicy<any> | FieldReadFunction<any>,
	reason?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PointActivityConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | PointActivityConnectionKeySpecifier)[];
export type PointActivityConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PointActivityEdgeKeySpecifier = ('cursor' | 'node' | PointActivityEdgeKeySpecifier)[];
export type PointActivityEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PoolKeySpecifier = ('address' | 'asset' | 'baseRateAllocator' | 'collectionFactors' | 'currency' | 'description' | 'id' | 'poolActivities' | 'statistics' | PoolKeySpecifier)[];
export type PoolFieldPolicy = {
	address?: FieldPolicy<any> | FieldReadFunction<any>,
	asset?: FieldPolicy<any> | FieldReadFunction<any>,
	baseRateAllocator?: FieldPolicy<any> | FieldReadFunction<any>,
	collectionFactors?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	poolActivities?: FieldPolicy<any> | FieldReadFunction<any>,
	statistics?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PoolActivityKeySpecifier = ('id' | 'indexInBlock' | 'pool' | 'poolAddress' | 'timestamp' | 'txHash' | PoolActivityKeySpecifier)[];
export type PoolActivityFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	pool?: FieldPolicy<any> | FieldReadFunction<any>,
	poolAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PoolActivityConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | PoolActivityConnectionKeySpecifier)[];
export type PoolActivityConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PoolActivityEdgeKeySpecifier = ('cursor' | 'node' | PoolActivityEdgeKeySpecifier)[];
export type PoolActivityEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PoolAprFactorSetKeySpecifier = ('id' | 'indexInBlock' | 'pool' | 'poolAddress' | 'timestamp' | 'txHash' | PoolAprFactorSetKeySpecifier)[];
export type PoolAprFactorSetFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	pool?: FieldPolicy<any> | FieldReadFunction<any>,
	poolAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PoolAprPremiumSetKeySpecifier = ('aprPremium' | 'id' | 'indexInBlock' | 'pool' | 'poolAddress' | 'timestamp' | 'txHash' | PoolAprPremiumSetKeySpecifier)[];
export type PoolAprPremiumSetFieldPolicy = {
	aprPremium?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	pool?: FieldPolicy<any> | FieldReadFunction<any>,
	poolAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PoolBaseInterestAllocatorSetKeySpecifier = ('id' | 'indexInBlock' | 'pool' | 'poolAddress' | 'timestamp' | 'txHash' | PoolBaseInterestAllocatorSetKeySpecifier)[];
export type PoolBaseInterestAllocatorSetFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	pool?: FieldPolicy<any> | FieldReadFunction<any>,
	poolAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PoolBaseRateAllocatorKeySpecifier = ('address' | 'currency' | 'description' | 'id' | 'stakeCurrency' | PoolBaseRateAllocatorKeySpecifier)[];
export type PoolBaseRateAllocatorFieldPolicy = {
	address?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	stakeCurrency?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PoolCollectionFactorsKeySpecifier = ('collection' | 'collectionId' | 'duration' | 'id' | 'offerId' | 'pool' | 'poolAddress' | 'principalCurrentFactor' | 'principalHistoricalFactor' | PoolCollectionFactorsKeySpecifier)[];
export type PoolCollectionFactorsFieldPolicy = {
	collection?: FieldPolicy<any> | FieldReadFunction<any>,
	collectionId?: FieldPolicy<any> | FieldReadFunction<any>,
	duration?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	offerId?: FieldPolicy<any> | FieldReadFunction<any>,
	pool?: FieldPolicy<any> | FieldReadFunction<any>,
	poolAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	principalCurrentFactor?: FieldPolicy<any> | FieldReadFunction<any>,
	principalHistoricalFactor?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PoolCollectionFactorsSetKeySpecifier = ('id' | 'indexInBlock' | 'pool' | 'poolAddress' | 'timestamp' | 'txHash' | PoolCollectionFactorsSetKeySpecifier)[];
export type PoolCollectionFactorsSetFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	pool?: FieldPolicy<any> | FieldReadFunction<any>,
	poolAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PoolConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | PoolConnectionKeySpecifier)[];
export type PoolConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PoolEdgeKeySpecifier = ('cursor' | 'node' | PoolEdgeKeySpecifier)[];
export type PoolEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PoolReallocatedKeySpecifier = ('id' | 'indexInBlock' | 'pool' | 'poolAddress' | 'timestamp' | 'txHash' | PoolReallocatedKeySpecifier)[];
export type PoolReallocatedFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	pool?: FieldPolicy<any> | FieldReadFunction<any>,
	poolAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PoolStatisticsKeySpecifier = ('activeLoansCount' | 'activeOffersCount' | 'balanceAllocatedBaseRate' | 'liquid' | 'outstandingApr' | 'outstandingPrincipal' | 'realizedApr' | 'totalDeposits' | 'totalLoanVolume' | PoolStatisticsKeySpecifier)[];
export type PoolStatisticsFieldPolicy = {
	activeLoansCount?: FieldPolicy<any> | FieldReadFunction<any>,
	activeOffersCount?: FieldPolicy<any> | FieldReadFunction<any>,
	balanceAllocatedBaseRate?: FieldPolicy<any> | FieldReadFunction<any>,
	liquid?: FieldPolicy<any> | FieldReadFunction<any>,
	outstandingApr?: FieldPolicy<any> | FieldReadFunction<any>,
	outstandingPrincipal?: FieldPolicy<any> | FieldReadFunction<any>,
	realizedApr?: FieldPolicy<any> | FieldReadFunction<any>,
	totalDeposits?: FieldPolicy<any> | FieldReadFunction<any>,
	totalLoanVolume?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('getCollectionActivitiesCount' | 'getCollectionBySlug' | 'getCollectionLoansData' | 'getCollectionsByContractAddress' | 'getListingById' | 'getLoanActivitiesStatisticsByMonth' | 'getLoanById' | 'getNftByContractAddressAndTokenId' | 'getNftBySlugAndTokenId' | 'getOrderCancelCalldata' | 'getOrderSaleCalldata' | 'getOutstandingLoanStatistics' | 'getPointsFromReferrals' | 'getPoolByShareSymbol' | 'getReferredWallets' | 'getSourcesStatistics' | 'getSourcesStatisticsByCollection' | 'getUserPointActivities' | 'getUserPoints' | 'listAuctions' | 'listBids' | 'listCollectionTraitTypes' | 'listCollectionTraitValues' | 'listCollections' | 'listCollectionsWithListings' | 'listCollectionsWithLoans' | 'listCurrencies' | 'listListings' | 'listListingsForSale' | 'listLoanActivities' | 'listLoanEvents' | 'listLoans' | 'listNftDelegations' | 'listNftOffersAndRenegotiations' | 'listNftsFromCollections' | 'listNftsFromUser' | 'listNotifications' | 'listOffers' | 'listOrders' | 'listPoolActivities' | 'listPools' | 'listRenegotiations' | 'listSources' | 'listWithdrawalPositions' | 'listWithdrawalQueues' | 'me' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	getCollectionActivitiesCount?: FieldPolicy<any> | FieldReadFunction<any>,
	getCollectionBySlug?: FieldPolicy<any> | FieldReadFunction<any>,
	getCollectionLoansData?: FieldPolicy<any> | FieldReadFunction<any>,
	getCollectionsByContractAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	getListingById?: FieldPolicy<any> | FieldReadFunction<any>,
	getLoanActivitiesStatisticsByMonth?: FieldPolicy<any> | FieldReadFunction<any>,
	getLoanById?: FieldPolicy<any> | FieldReadFunction<any>,
	getNftByContractAddressAndTokenId?: FieldPolicy<any> | FieldReadFunction<any>,
	getNftBySlugAndTokenId?: FieldPolicy<any> | FieldReadFunction<any>,
	getOrderCancelCalldata?: FieldPolicy<any> | FieldReadFunction<any>,
	getOrderSaleCalldata?: FieldPolicy<any> | FieldReadFunction<any>,
	getOutstandingLoanStatistics?: FieldPolicy<any> | FieldReadFunction<any>,
	getPointsFromReferrals?: FieldPolicy<any> | FieldReadFunction<any>,
	getPoolByShareSymbol?: FieldPolicy<any> | FieldReadFunction<any>,
	getReferredWallets?: FieldPolicy<any> | FieldReadFunction<any>,
	getSourcesStatistics?: FieldPolicy<any> | FieldReadFunction<any>,
	getSourcesStatisticsByCollection?: FieldPolicy<any> | FieldReadFunction<any>,
	getUserPointActivities?: FieldPolicy<any> | FieldReadFunction<any>,
	getUserPoints?: FieldPolicy<any> | FieldReadFunction<any>,
	listAuctions?: FieldPolicy<any> | FieldReadFunction<any>,
	listBids?: FieldPolicy<any> | FieldReadFunction<any>,
	listCollectionTraitTypes?: FieldPolicy<any> | FieldReadFunction<any>,
	listCollectionTraitValues?: FieldPolicy<any> | FieldReadFunction<any>,
	listCollections?: FieldPolicy<any> | FieldReadFunction<any>,
	listCollectionsWithListings?: FieldPolicy<any> | FieldReadFunction<any>,
	listCollectionsWithLoans?: FieldPolicy<any> | FieldReadFunction<any>,
	listCurrencies?: FieldPolicy<any> | FieldReadFunction<any>,
	listListings?: FieldPolicy<any> | FieldReadFunction<any>,
	listListingsForSale?: FieldPolicy<any> | FieldReadFunction<any>,
	listLoanActivities?: FieldPolicy<any> | FieldReadFunction<any>,
	listLoanEvents?: FieldPolicy<any> | FieldReadFunction<any>,
	listLoans?: FieldPolicy<any> | FieldReadFunction<any>,
	listNftDelegations?: FieldPolicy<any> | FieldReadFunction<any>,
	listNftOffersAndRenegotiations?: FieldPolicy<any> | FieldReadFunction<any>,
	listNftsFromCollections?: FieldPolicy<any> | FieldReadFunction<any>,
	listNftsFromUser?: FieldPolicy<any> | FieldReadFunction<any>,
	listNotifications?: FieldPolicy<any> | FieldReadFunction<any>,
	listOffers?: FieldPolicy<any> | FieldReadFunction<any>,
	listOrders?: FieldPolicy<any> | FieldReadFunction<any>,
	listPoolActivities?: FieldPolicy<any> | FieldReadFunction<any>,
	listPools?: FieldPolicy<any> | FieldReadFunction<any>,
	listRenegotiations?: FieldPolicy<any> | FieldReadFunction<any>,
	listSources?: FieldPolicy<any> | FieldReadFunction<any>,
	listWithdrawalPositions?: FieldPolicy<any> | FieldReadFunction<any>,
	listWithdrawalQueues?: FieldPolicy<any> | FieldReadFunction<any>,
	me?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueueDeployedKeySpecifier = ('id' | 'index' | 'indexInBlock' | 'pool' | 'poolAddress' | 'queueAddress' | 'timestamp' | 'txHash' | QueueDeployedKeySpecifier)[];
export type QueueDeployedFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	index?: FieldPolicy<any> | FieldReadFunction<any>,
	indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	pool?: FieldPolicy<any> | FieldReadFunction<any>,
	poolAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	queueAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RenegotiationKeySpecifier = ('aprBps' | 'availablePrincipalAmount' | 'createdDate' | 'duration' | 'expirationTime' | 'fallbackOfferId' | 'feeAmount' | 'hidden' | 'id' | 'isAddNewTranche' | 'lenderAddress' | 'loan' | 'loanAddress' | 'loanId' | 'loanReferenceId' | 'nft' | 'offerHash' | 'principalAmount' | 'renegotiationId' | 'repayment' | 'requiresLiquidation' | 'signature' | 'signerAddress' | 'status' | 'strictImprovement' | RenegotiationKeySpecifier)[];
export type RenegotiationFieldPolicy = {
	aprBps?: FieldPolicy<any> | FieldReadFunction<any>,
	availablePrincipalAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	createdDate?: FieldPolicy<any> | FieldReadFunction<any>,
	duration?: FieldPolicy<any> | FieldReadFunction<any>,
	expirationTime?: FieldPolicy<any> | FieldReadFunction<any>,
	fallbackOfferId?: FieldPolicy<any> | FieldReadFunction<any>,
	feeAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	hidden?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isAddNewTranche?: FieldPolicy<any> | FieldReadFunction<any>,
	lenderAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	loanAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	loanReferenceId?: FieldPolicy<any> | FieldReadFunction<any>,
	nft?: FieldPolicy<any> | FieldReadFunction<any>,
	offerHash?: FieldPolicy<any> | FieldReadFunction<any>,
	principalAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	renegotiationId?: FieldPolicy<any> | FieldReadFunction<any>,
	repayment?: FieldPolicy<any> | FieldReadFunction<any>,
	requiresLiquidation?: FieldPolicy<any> | FieldReadFunction<any>,
	signature?: FieldPolicy<any> | FieldReadFunction<any>,
	signerAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	strictImprovement?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RenegotiationConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | RenegotiationConnectionKeySpecifier)[];
export type RenegotiationConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RenegotiationEdgeKeySpecifier = ('cursor' | 'node' | RenegotiationEdgeKeySpecifier)[];
export type RenegotiationEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RenegotiationRequestKeySpecifier = ('createdDate' | 'desiredAprBps' | 'desiredDuration' | 'desiredPrincipalAmount' | 'expirationDate' | 'id' | 'loanId' | RenegotiationRequestKeySpecifier)[];
export type RenegotiationRequestFieldPolicy = {
	createdDate?: FieldPolicy<any> | FieldReadFunction<any>,
	desiredAprBps?: FieldPolicy<any> | FieldReadFunction<any>,
	desiredDuration?: FieldPolicy<any> | FieldReadFunction<any>,
	desiredPrincipalAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	expirationDate?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RenegotiationRequestedNotificationKeySpecifier = ('aprBps' | 'createdOn' | 'duration' | 'id' | 'loan' | 'loanId' | 'notificationType' | 'principalAmount' | 'readOn' | 'user' | RenegotiationRequestedNotificationKeySpecifier)[];
export type RenegotiationRequestedNotificationFieldPolicy = {
	aprBps?: FieldPolicy<any> | FieldReadFunction<any>,
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	duration?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	principalAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	readOn?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SaleKeySpecifier = ('id' | 'nft' | 'order' | 'orderId' | 'taker' | 'timestamp' | 'txHash' | SaleKeySpecifier)[];
export type SaleFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	nft?: FieldPolicy<any> | FieldReadFunction<any>,
	order?: FieldPolicy<any> | FieldReadFunction<any>,
	orderId?: FieldPolicy<any> | FieldReadFunction<any>,
	taker?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SellAndRepayOrderKeySpecifier = ('createdDate' | 'currency' | 'currencyAddress' | 'evmOrder' | 'expiration' | 'fees' | 'hidden' | 'id' | 'isAsk' | 'isPrivate' | 'loan' | 'loanId' | 'maker' | 'marketPlace' | 'marketPlaceAddress' | 'netAmount' | 'nft' | 'nftId' | 'nonce' | 'orderType' | 'originalId' | 'price' | 'repaymentCalldata' | 'signature' | 'startTime' | 'status' | 'taker' | 'timestamp' | 'txHash' | SellAndRepayOrderKeySpecifier)[];
export type SellAndRepayOrderFieldPolicy = {
	createdDate?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	currencyAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	evmOrder?: FieldPolicy<any> | FieldReadFunction<any>,
	expiration?: FieldPolicy<any> | FieldReadFunction<any>,
	fees?: FieldPolicy<any> | FieldReadFunction<any>,
	hidden?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isAsk?: FieldPolicy<any> | FieldReadFunction<any>,
	isPrivate?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	maker?: FieldPolicy<any> | FieldReadFunction<any>,
	marketPlace?: FieldPolicy<any> | FieldReadFunction<any>,
	marketPlaceAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	netAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	nft?: FieldPolicy<any> | FieldReadFunction<any>,
	nftId?: FieldPolicy<any> | FieldReadFunction<any>,
	nonce?: FieldPolicy<any> | FieldReadFunction<any>,
	orderType?: FieldPolicy<any> | FieldReadFunction<any>,
	originalId?: FieldPolicy<any> | FieldReadFunction<any>,
	price?: FieldPolicy<any> | FieldReadFunction<any>,
	repaymentCalldata?: FieldPolicy<any> | FieldReadFunction<any>,
	signature?: FieldPolicy<any> | FieldReadFunction<any>,
	startTime?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	taker?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SignatureRequestKeySpecifier = ('key' | 'typedData' | SignatureRequestKeySpecifier)[];
export type SignatureRequestFieldPolicy = {
	key?: FieldPolicy<any> | FieldReadFunction<any>,
	typedData?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SingleNFTOfferKeySpecifier = ('aprBps' | 'availablePrincipalAmount' | 'borrowerAddress' | 'capacity' | 'consumedCapacity' | 'contractAddress' | 'createdDate' | 'currency' | 'duration' | 'expirationTime' | 'fee' | 'hidden' | 'id' | 'lenderAddress' | 'lenderAvailableBalance' | 'maxPrincipal' | 'maxSeniorRepayment' | 'maxTrancheFloor' | 'netPrincipal' | 'nft' | 'offerHash' | 'offerId' | 'principalAddress' | 'principalAmount' | 'repayment' | 'requiresLiquidation' | 'signature' | 'signerAddress' | 'statistics' | 'status' | 'validators' | SingleNFTOfferKeySpecifier)[];
export type SingleNFTOfferFieldPolicy = {
	aprBps?: FieldPolicy<any> | FieldReadFunction<any>,
	availablePrincipalAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	borrowerAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	capacity?: FieldPolicy<any> | FieldReadFunction<any>,
	consumedCapacity?: FieldPolicy<any> | FieldReadFunction<any>,
	contractAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	createdDate?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	duration?: FieldPolicy<any> | FieldReadFunction<any>,
	expirationTime?: FieldPolicy<any> | FieldReadFunction<any>,
	fee?: FieldPolicy<any> | FieldReadFunction<any>,
	hidden?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	lenderAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	lenderAvailableBalance?: FieldPolicy<any> | FieldReadFunction<any>,
	maxPrincipal?: FieldPolicy<any> | FieldReadFunction<any>,
	maxSeniorRepayment?: FieldPolicy<any> | FieldReadFunction<any>,
	maxTrancheFloor?: FieldPolicy<any> | FieldReadFunction<any>,
	netPrincipal?: FieldPolicy<any> | FieldReadFunction<any>,
	nft?: FieldPolicy<any> | FieldReadFunction<any>,
	offerHash?: FieldPolicy<any> | FieldReadFunction<any>,
	offerId?: FieldPolicy<any> | FieldReadFunction<any>,
	principalAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	principalAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	repayment?: FieldPolicy<any> | FieldReadFunction<any>,
	requiresLiquidation?: FieldPolicy<any> | FieldReadFunction<any>,
	signature?: FieldPolicy<any> | FieldReadFunction<any>,
	signerAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	statistics?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	validators?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SingleNFTOfferCollectionOfferRenegotiationConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | SingleNFTOfferCollectionOfferRenegotiationConnectionKeySpecifier)[];
export type SingleNFTOfferCollectionOfferRenegotiationConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SingleNFTOfferCollectionOfferRenegotiationEdgeKeySpecifier = ('cursor' | 'node' | SingleNFTOfferCollectionOfferRenegotiationEdgeKeySpecifier)[];
export type SingleNFTOfferCollectionOfferRenegotiationEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SingleNFTOrderKeySpecifier = ('createdDate' | 'currency' | 'currencyAddress' | 'evmOrder' | 'expiration' | 'fees' | 'hidden' | 'id' | 'isAsk' | 'isPrivate' | 'maker' | 'marketPlace' | 'marketPlaceAddress' | 'netAmount' | 'nft' | 'nftId' | 'nonce' | 'orderType' | 'originalId' | 'price' | 'signature' | 'startTime' | 'status' | 'taker' | 'timestamp' | 'txHash' | SingleNFTOrderKeySpecifier)[];
export type SingleNFTOrderFieldPolicy = {
	createdDate?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	currencyAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	evmOrder?: FieldPolicy<any> | FieldReadFunction<any>,
	expiration?: FieldPolicy<any> | FieldReadFunction<any>,
	fees?: FieldPolicy<any> | FieldReadFunction<any>,
	hidden?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isAsk?: FieldPolicy<any> | FieldReadFunction<any>,
	isPrivate?: FieldPolicy<any> | FieldReadFunction<any>,
	maker?: FieldPolicy<any> | FieldReadFunction<any>,
	marketPlace?: FieldPolicy<any> | FieldReadFunction<any>,
	marketPlaceAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	netAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	nft?: FieldPolicy<any> | FieldReadFunction<any>,
	nftId?: FieldPolicy<any> | FieldReadFunction<any>,
	nonce?: FieldPolicy<any> | FieldReadFunction<any>,
	orderType?: FieldPolicy<any> | FieldReadFunction<any>,
	originalId?: FieldPolicy<any> | FieldReadFunction<any>,
	price?: FieldPolicy<any> | FieldReadFunction<any>,
	signature?: FieldPolicy<any> | FieldReadFunction<any>,
	startTime?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	taker?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SourceKeySpecifier = ('accruedInterest' | 'aprBps' | 'borrowerEaprBps' | 'earnedInterest' | 'effectiveDuration' | 'endDate' | 'expectedInterestLeft' | 'id' | 'lenderAddress' | 'lenderEaprBps' | 'loan' | 'loanId' | 'loanIndex' | 'loanReferenceId' | 'originationFee' | 'principalAmount' | 'profit' | 'refinanceNetAprBps' | 'repaidInterest' | 'seniorPrincipalAmount' | 'startTime' | SourceKeySpecifier)[];
export type SourceFieldPolicy = {
	accruedInterest?: FieldPolicy<any> | FieldReadFunction<any>,
	aprBps?: FieldPolicy<any> | FieldReadFunction<any>,
	borrowerEaprBps?: FieldPolicy<any> | FieldReadFunction<any>,
	earnedInterest?: FieldPolicy<any> | FieldReadFunction<any>,
	effectiveDuration?: FieldPolicy<any> | FieldReadFunction<any>,
	endDate?: FieldPolicy<any> | FieldReadFunction<any>,
	expectedInterestLeft?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	lenderAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	lenderEaprBps?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	loanIndex?: FieldPolicy<any> | FieldReadFunction<any>,
	loanReferenceId?: FieldPolicy<any> | FieldReadFunction<any>,
	originationFee?: FieldPolicy<any> | FieldReadFunction<any>,
	principalAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	profit?: FieldPolicy<any> | FieldReadFunction<any>,
	refinanceNetAprBps?: FieldPolicy<any> | FieldReadFunction<any>,
	repaidInterest?: FieldPolicy<any> | FieldReadFunction<any>,
	seniorPrincipalAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	startTime?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SourceHistoryKeySpecifier = ('accruedInterest' | 'aprBps' | 'id' | 'lenderAddress' | 'loanId' | 'loanIndex' | 'originationFee' | 'principalAmount' | 'seniorPrincipalAmount' | 'startTime' | SourceHistoryKeySpecifier)[];
export type SourceHistoryFieldPolicy = {
	accruedInterest?: FieldPolicy<any> | FieldReadFunction<any>,
	aprBps?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	lenderAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	loanIndex?: FieldPolicy<any> | FieldReadFunction<any>,
	originationFee?: FieldPolicy<any> | FieldReadFunction<any>,
	principalAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	seniorPrincipalAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	startTime?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SourceLostSourceConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | SourceLostSourceConnectionKeySpecifier)[];
export type SourceLostSourceConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SourceLostSourceEdgeKeySpecifier = ('cursor' | 'node' | SourceLostSourceEdgeKeySpecifier)[];
export type SourceLostSourceEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SourceStatisticsFromCollectionKeySpecifier = ('collection' | 'collectionId' | 'stats' | SourceStatisticsFromCollectionKeySpecifier)[];
export type SourceStatisticsFromCollectionFieldPolicy = {
	collection?: FieldPolicy<any> | FieldReadFunction<any>,
	collectionId?: FieldPolicy<any> | FieldReadFunction<any>,
	stats?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SourcesStatisticsKeySpecifier = ('count' | 'earnedInterest' | 'expectedInterestLeft' | 'originationFee' | 'outstanding' | 'principal' | 'profit' | 'repaidInterest' | 'wavgAprBps' | 'wavgLenderEaprBps' | SourcesStatisticsKeySpecifier)[];
export type SourcesStatisticsFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	earnedInterest?: FieldPolicy<any> | FieldReadFunction<any>,
	expectedInterestLeft?: FieldPolicy<any> | FieldReadFunction<any>,
	originationFee?: FieldPolicy<any> | FieldReadFunction<any>,
	outstanding?: FieldPolicy<any> | FieldReadFunction<any>,
	principal?: FieldPolicy<any> | FieldReadFunction<any>,
	profit?: FieldPolicy<any> | FieldReadFunction<any>,
	repaidInterest?: FieldPolicy<any> | FieldReadFunction<any>,
	wavgAprBps?: FieldPolicy<any> | FieldReadFunction<any>,
	wavgLenderEaprBps?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StatByCollectionKeySpecifier = ('collection' | 'value' | StatByCollectionKeySpecifier)[];
export type StatByCollectionFieldPolicy = {
	collection?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TopUpRequestKeySpecifier = ('createdDate' | 'desiredAprBps' | 'desiredTopUp' | 'expirationDate' | 'id' | 'loanId' | TopUpRequestKeySpecifier)[];
export type TopUpRequestFieldPolicy = {
	createdDate?: FieldPolicy<any> | FieldReadFunction<any>,
	desiredAprBps?: FieldPolicy<any> | FieldReadFunction<any>,
	desiredTopUp?: FieldPolicy<any> | FieldReadFunction<any>,
	expirationDate?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TopUpRequestedNotificationKeySpecifier = ('aprBps' | 'createdOn' | 'id' | 'loan' | 'loanId' | 'notificationType' | 'readOn' | 'topUp' | 'user' | TopUpRequestedNotificationKeySpecifier)[];
export type TopUpRequestedNotificationFieldPolicy = {
	aprBps?: FieldPolicy<any> | FieldReadFunction<any>,
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	readOn?: FieldPolicy<any> | FieldReadFunction<any>,
	topUp?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TraitKeySpecifier = ('collectionId' | 'id' | 'key' | 'statistics' | 'type' | 'value' | TraitKeySpecifier)[];
export type TraitFieldPolicy = {
	collectionId?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	key?: FieldPolicy<any> | FieldReadFunction<any>,
	statistics?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TraitOrderKeySpecifier = ('collectionId' | 'createdDate' | 'currency' | 'currencyAddress' | 'evmOrder' | 'expiration' | 'fees' | 'hidden' | 'id' | 'isAsk' | 'isPrivate' | 'maker' | 'marketPlace' | 'marketPlaceAddress' | 'netAmount' | 'nonce' | 'orderType' | 'originalId' | 'price' | 'signature' | 'startTime' | 'status' | 'taker' | 'timestamp' | 'traitId' | 'txHash' | TraitOrderKeySpecifier)[];
export type TraitOrderFieldPolicy = {
	collectionId?: FieldPolicy<any> | FieldReadFunction<any>,
	createdDate?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	currencyAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	evmOrder?: FieldPolicy<any> | FieldReadFunction<any>,
	expiration?: FieldPolicy<any> | FieldReadFunction<any>,
	fees?: FieldPolicy<any> | FieldReadFunction<any>,
	hidden?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isAsk?: FieldPolicy<any> | FieldReadFunction<any>,
	isPrivate?: FieldPolicy<any> | FieldReadFunction<any>,
	maker?: FieldPolicy<any> | FieldReadFunction<any>,
	marketPlace?: FieldPolicy<any> | FieldReadFunction<any>,
	marketPlaceAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	netAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	nonce?: FieldPolicy<any> | FieldReadFunction<any>,
	orderType?: FieldPolicy<any> | FieldReadFunction<any>,
	originalId?: FieldPolicy<any> | FieldReadFunction<any>,
	price?: FieldPolicy<any> | FieldReadFunction<any>,
	signature?: FieldPolicy<any> | FieldReadFunction<any>,
	startTime?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	taker?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	traitId?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TraitTypeKeySpecifier = ('collectionId' | 'count' | 'id' | 'key' | 'max' | 'min' | 'valueType' | TraitTypeKeySpecifier)[];
export type TraitTypeFieldPolicy = {
	collectionId?: FieldPolicy<any> | FieldReadFunction<any>,
	count?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	key?: FieldPolicy<any> | FieldReadFunction<any>,
	max?: FieldPolicy<any> | FieldReadFunction<any>,
	min?: FieldPolicy<any> | FieldReadFunction<any>,
	valueType?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TraitTypeConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | TraitTypeConnectionKeySpecifier)[];
export type TraitTypeConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TraitTypeEdgeKeySpecifier = ('cursor' | 'node' | TraitTypeEdgeKeySpecifier)[];
export type TraitTypeEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TraitValueKeySpecifier = ('collectionId' | 'id' | 'key' | 'rarity' | 'sampleAsset' | 'sampleAssetId' | 'value' | TraitValueKeySpecifier)[];
export type TraitValueFieldPolicy = {
	collectionId?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	key?: FieldPolicy<any> | FieldReadFunction<any>,
	rarity?: FieldPolicy<any> | FieldReadFunction<any>,
	sampleAsset?: FieldPolicy<any> | FieldReadFunction<any>,
	sampleAssetId?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TraitValueConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | TraitValueConnectionKeySpecifier)[];
export type TraitValueConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TraitValueEdgeKeySpecifier = ('cursor' | 'node' | TraitValueEdgeKeySpecifier)[];
export type TraitValueEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TypedDataKeySpecifier = ('domain' | 'message' | 'primaryType' | 'types' | TypedDataKeySpecifier)[];
export type TypedDataFieldPolicy = {
	domain?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	primaryType?: FieldPolicy<any> | FieldReadFunction<any>,
	types?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UnderfundedOfferNotificationKeySpecifier = ('createdOn' | 'id' | 'notificationType' | 'offer' | 'offerId' | 'readOn' | 'user' | UnderfundedOfferNotificationKeySpecifier)[];
export type UnderfundedOfferNotificationFieldPolicy = {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	offer?: FieldPolicy<any> | FieldReadFunction<any>,
	offerId?: FieldPolicy<any> | FieldReadFunction<any>,
	readOn?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('about' | 'beta' | 'blockchain' | 'createdDate' | 'id' | 'linkedWallets' | 'mail' | 'mailValidationDate' | 'originalProfilePicture' | 'profilePictureId' | 'size64ProfilePicture' | 'size128ProfilePicture' | 'size256ProfilePicture' | 'size512ProfilePicture' | 'statistics' | 'twitterHandle' | 'updatedAt' | 'usedProduct' | 'username' | 'walletAddress' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	about?: FieldPolicy<any> | FieldReadFunction<any>,
	beta?: FieldPolicy<any> | FieldReadFunction<any>,
	blockchain?: FieldPolicy<any> | FieldReadFunction<any>,
	createdDate?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	linkedWallets?: FieldPolicy<any> | FieldReadFunction<any>,
	mail?: FieldPolicy<any> | FieldReadFunction<any>,
	mailValidationDate?: FieldPolicy<any> | FieldReadFunction<any>,
	originalProfilePicture?: FieldPolicy<any> | FieldReadFunction<any>,
	profilePictureId?: FieldPolicy<any> | FieldReadFunction<any>,
	size64ProfilePicture?: FieldPolicy<any> | FieldReadFunction<any>,
	size128ProfilePicture?: FieldPolicy<any> | FieldReadFunction<any>,
	size256ProfilePicture?: FieldPolicy<any> | FieldReadFunction<any>,
	size512ProfilePicture?: FieldPolicy<any> | FieldReadFunction<any>,
	statistics?: FieldPolicy<any> | FieldReadFunction<any>,
	twitterHandle?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	usedProduct?: FieldPolicy<any> | FieldReadFunction<any>,
	username?: FieldPolicy<any> | FieldReadFunction<any>,
	walletAddress?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserStatisticsKeySpecifier = ('defaultedPrincipal' | 'interestEarnedByCollection' | 'loanCount' | 'loanCountByCollection' | 'loanPrincipalByCollection' | 'originationCountAndPrincipalByMonth' | 'outstandingAccruedInterest' | 'outstandingPrincipal' | 'realizedProfits' | 'renegotiationCountAndPrincipalByMonth' | 'totalLentPrincipal' | 'totalLoanCount' | 'wavgOutstandingApr' | 'wavgOutstandingAprByCollection' | 'wavgRepaidApr' | 'wavgRepaidAprByCollection' | UserStatisticsKeySpecifier)[];
export type UserStatisticsFieldPolicy = {
	defaultedPrincipal?: FieldPolicy<any> | FieldReadFunction<any>,
	interestEarnedByCollection?: FieldPolicy<any> | FieldReadFunction<any>,
	loanCount?: FieldPolicy<any> | FieldReadFunction<any>,
	loanCountByCollection?: FieldPolicy<any> | FieldReadFunction<any>,
	loanPrincipalByCollection?: FieldPolicy<any> | FieldReadFunction<any>,
	originationCountAndPrincipalByMonth?: FieldPolicy<any> | FieldReadFunction<any>,
	outstandingAccruedInterest?: FieldPolicy<any> | FieldReadFunction<any>,
	outstandingPrincipal?: FieldPolicy<any> | FieldReadFunction<any>,
	realizedProfits?: FieldPolicy<any> | FieldReadFunction<any>,
	renegotiationCountAndPrincipalByMonth?: FieldPolicy<any> | FieldReadFunction<any>,
	totalLentPrincipal?: FieldPolicy<any> | FieldReadFunction<any>,
	totalLoanCount?: FieldPolicy<any> | FieldReadFunction<any>,
	wavgOutstandingApr?: FieldPolicy<any> | FieldReadFunction<any>,
	wavgOutstandingAprByCollection?: FieldPolicy<any> | FieldReadFunction<any>,
	wavgRepaidApr?: FieldPolicy<any> | FieldReadFunction<any>,
	wavgRepaidAprByCollection?: FieldPolicy<any> | FieldReadFunction<any>
};
export type WithdrawalPositionKeySpecifier = ('available' | 'id' | 'nft' | 'nftId' | 'pending' | 'requested' | 'shares' | 'unlockTime' | 'withdrawalQueue' | 'withdrawalQueueId' | 'withdrawn' | WithdrawalPositionKeySpecifier)[];
export type WithdrawalPositionFieldPolicy = {
	available?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	nft?: FieldPolicy<any> | FieldReadFunction<any>,
	nftId?: FieldPolicy<any> | FieldReadFunction<any>,
	pending?: FieldPolicy<any> | FieldReadFunction<any>,
	requested?: FieldPolicy<any> | FieldReadFunction<any>,
	shares?: FieldPolicy<any> | FieldReadFunction<any>,
	unlockTime?: FieldPolicy<any> | FieldReadFunction<any>,
	withdrawalQueue?: FieldPolicy<any> | FieldReadFunction<any>,
	withdrawalQueueId?: FieldPolicy<any> | FieldReadFunction<any>,
	withdrawn?: FieldPolicy<any> | FieldReadFunction<any>
};
export type WithdrawalPositionConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | WithdrawalPositionConnectionKeySpecifier)[];
export type WithdrawalPositionConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type WithdrawalPositionEdgeKeySpecifier = ('cursor' | 'node' | WithdrawalPositionEdgeKeySpecifier)[];
export type WithdrawalPositionEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type WithdrawalPositionLockedKeySpecifier = ('contract' | 'id' | 'indexInBlock' | 'pool' | 'poolAddress' | 'timestamp' | 'txHash' | 'unlockTime' | WithdrawalPositionLockedKeySpecifier)[];
export type WithdrawalPositionLockedFieldPolicy = {
	contract?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	pool?: FieldPolicy<any> | FieldReadFunction<any>,
	poolAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>,
	unlockTime?: FieldPolicy<any> | FieldReadFunction<any>
};
export type WithdrawalPositionMintedKeySpecifier = ('contract' | 'id' | 'indexInBlock' | 'pool' | 'poolAddress' | 'receiver' | 'shares' | 'timestamp' | 'txHash' | WithdrawalPositionMintedKeySpecifier)[];
export type WithdrawalPositionMintedFieldPolicy = {
	contract?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	pool?: FieldPolicy<any> | FieldReadFunction<any>,
	poolAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	receiver?: FieldPolicy<any> | FieldReadFunction<any>,
	shares?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type WithdrawalQueueKeySpecifier = ('balance' | 'collection' | 'collectionId' | 'id' | 'index' | 'pending' | 'pool' | 'poolAddress' | 'requested' | 'requesters' | 'startTime' | 'status' | 'totalShares' | 'totalWithdrawn' | WithdrawalQueueKeySpecifier)[];
export type WithdrawalQueueFieldPolicy = {
	balance?: FieldPolicy<any> | FieldReadFunction<any>,
	collection?: FieldPolicy<any> | FieldReadFunction<any>,
	collectionId?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	index?: FieldPolicy<any> | FieldReadFunction<any>,
	pending?: FieldPolicy<any> | FieldReadFunction<any>,
	pool?: FieldPolicy<any> | FieldReadFunction<any>,
	poolAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	requested?: FieldPolicy<any> | FieldReadFunction<any>,
	requesters?: FieldPolicy<any> | FieldReadFunction<any>,
	startTime?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	totalShares?: FieldPolicy<any> | FieldReadFunction<any>,
	totalWithdrawn?: FieldPolicy<any> | FieldReadFunction<any>
};
export type WithdrawalQueueConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | WithdrawalQueueConnectionKeySpecifier)[];
export type WithdrawalQueueConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type WithdrawalQueueEdgeKeySpecifier = ('cursor' | 'node' | WithdrawalQueueEdgeKeySpecifier)[];
export type WithdrawalQueueEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type WithdrawnFromQueueKeySpecifier = ('available' | 'contract' | 'id' | 'indexInBlock' | 'pool' | 'poolAddress' | 'receiver' | 'timestamp' | 'txHash' | WithdrawnFromQueueKeySpecifier)[];
export type WithdrawnFromQueueFieldPolicy = {
	available?: FieldPolicy<any> | FieldReadFunction<any>,
	contract?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	pool?: FieldPolicy<any> | FieldReadFunction<any>,
	poolAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	receiver?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	ActiveOfferNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ActiveOfferNotificationKeySpecifier | (() => undefined | ActiveOfferNotificationKeySpecifier),
		fields?: ActiveOfferNotificationFieldPolicy,
	},
	Activity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ActivityKeySpecifier | (() => undefined | ActivityKeySpecifier),
		fields?: ActivityFieldPolicy,
	},
	Asset?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AssetKeySpecifier | (() => undefined | AssetKeySpecifier),
		fields?: AssetFieldPolicy,
	},
	Auction?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AuctionKeySpecifier | (() => undefined | AuctionKeySpecifier),
		fields?: AuctionFieldPolicy,
	},
	AuctionBidConfirmationNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AuctionBidConfirmationNotificationKeySpecifier | (() => undefined | AuctionBidConfirmationNotificationKeySpecifier),
		fields?: AuctionBidConfirmationNotificationFieldPolicy,
	},
	AuctionConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AuctionConnectionKeySpecifier | (() => undefined | AuctionConnectionKeySpecifier),
		fields?: AuctionConnectionFieldPolicy,
	},
	AuctionEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AuctionEdgeKeySpecifier | (() => undefined | AuctionEdgeKeySpecifier),
		fields?: AuctionEdgeFieldPolicy,
	},
	AuctionEndedNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AuctionEndedNotificationKeySpecifier | (() => undefined | AuctionEndedNotificationKeySpecifier),
		fields?: AuctionEndedNotificationFieldPolicy,
	},
	AuctionStartedNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AuctionStartedNotificationKeySpecifier | (() => undefined | AuctionStartedNotificationKeySpecifier),
		fields?: AuctionStartedNotificationFieldPolicy,
	},
	AuctionWonNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AuctionWonNotificationKeySpecifier | (() => undefined | AuctionWonNotificationKeySpecifier),
		fields?: AuctionWonNotificationFieldPolicy,
	},
	Bid?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BidKeySpecifier | (() => undefined | BidKeySpecifier),
		fields?: BidFieldPolicy,
	},
	BidConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BidConnectionKeySpecifier | (() => undefined | BidConnectionKeySpecifier),
		fields?: BidConnectionFieldPolicy,
	},
	BidEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BidEdgeKeySpecifier | (() => undefined | BidEdgeKeySpecifier),
		fields?: BidEdgeFieldPolicy,
	},
	BigIntCurrencyAmount?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BigIntCurrencyAmountKeySpecifier | (() => undefined | BigIntCurrencyAmountKeySpecifier),
		fields?: BigIntCurrencyAmountFieldPolicy,
	},
	BuyNowPayLaterOrder?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BuyNowPayLaterOrderKeySpecifier | (() => undefined | BuyNowPayLaterOrderKeySpecifier),
		fields?: BuyNowPayLaterOrderFieldPolicy,
	},
	Collection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CollectionKeySpecifier | (() => undefined | CollectionKeySpecifier),
		fields?: CollectionFieldPolicy,
	},
	CollectionConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CollectionConnectionKeySpecifier | (() => undefined | CollectionConnectionKeySpecifier),
		fields?: CollectionConnectionFieldPolicy,
	},
	CollectionEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CollectionEdgeKeySpecifier | (() => undefined | CollectionEdgeKeySpecifier),
		fields?: CollectionEdgeFieldPolicy,
	},
	CollectionEventsCountByDayAndCurrency?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CollectionEventsCountByDayAndCurrencyKeySpecifier | (() => undefined | CollectionEventsCountByDayAndCurrencyKeySpecifier),
		fields?: CollectionEventsCountByDayAndCurrencyFieldPolicy,
	},
	CollectionLoansData?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CollectionLoansDataKeySpecifier | (() => undefined | CollectionLoansDataKeySpecifier),
		fields?: CollectionLoansDataFieldPolicy,
	},
	CollectionOffer?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CollectionOfferKeySpecifier | (() => undefined | CollectionOfferKeySpecifier),
		fields?: CollectionOfferFieldPolicy,
	},
	CollectionOfferStatistics?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CollectionOfferStatisticsKeySpecifier | (() => undefined | CollectionOfferStatisticsKeySpecifier),
		fields?: CollectionOfferStatisticsFieldPolicy,
	},
	CollectionOrder?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CollectionOrderKeySpecifier | (() => undefined | CollectionOrderKeySpecifier),
		fields?: CollectionOrderFieldPolicy,
	},
	CollectionStatistics?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CollectionStatisticsKeySpecifier | (() => undefined | CollectionStatisticsKeySpecifier),
		fields?: CollectionStatisticsFieldPolicy,
	},
	ContractData?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ContractDataKeySpecifier | (() => undefined | ContractDataKeySpecifier),
		fields?: ContractDataFieldPolicy,
	},
	Currency?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CurrencyKeySpecifier | (() => undefined | CurrencyKeySpecifier),
		fields?: CurrencyFieldPolicy,
	},
	CurrencyAmount?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CurrencyAmountKeySpecifier | (() => undefined | CurrencyAmountKeySpecifier),
		fields?: CurrencyAmountFieldPolicy,
	},
	CurrencyConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CurrencyConnectionKeySpecifier | (() => undefined | CurrencyConnectionKeySpecifier),
		fields?: CurrencyConnectionFieldPolicy,
	},
	CurrencyEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CurrencyEdgeKeySpecifier | (() => undefined | CurrencyEdgeKeySpecifier),
		fields?: CurrencyEdgeFieldPolicy,
	},
	Delegation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DelegationKeySpecifier | (() => undefined | DelegationKeySpecifier),
		fields?: DelegationFieldPolicy,
	},
	DelegationConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DelegationConnectionKeySpecifier | (() => undefined | DelegationConnectionKeySpecifier),
		fields?: DelegationConnectionFieldPolicy,
	},
	DelegationEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DelegationEdgeKeySpecifier | (() => undefined | DelegationEdgeKeySpecifier),
		fields?: DelegationEdgeFieldPolicy,
	},
	ERC4626Deposit?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ERC4626DepositKeySpecifier | (() => undefined | ERC4626DepositKeySpecifier),
		fields?: ERC4626DepositFieldPolicy,
	},
	ERC4626Withdraw?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ERC4626WithdrawKeySpecifier | (() => undefined | ERC4626WithdrawKeySpecifier),
		fields?: ERC4626WithdrawFieldPolicy,
	},
	LinkedWallets?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LinkedWalletsKeySpecifier | (() => undefined | LinkedWalletsKeySpecifier),
		fields?: LinkedWalletsFieldPolicy,
	},
	Listing?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ListingKeySpecifier | (() => undefined | ListingKeySpecifier),
		fields?: ListingFieldPolicy,
	},
	ListingConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ListingConnectionKeySpecifier | (() => undefined | ListingConnectionKeySpecifier),
		fields?: ListingConnectionFieldPolicy,
	},
	ListingEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ListingEdgeKeySpecifier | (() => undefined | ListingEdgeKeySpecifier),
		fields?: ListingEdgeFieldPolicy,
	},
	Loan?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LoanKeySpecifier | (() => undefined | LoanKeySpecifier),
		fields?: LoanFieldPolicy,
	},
	LoanActivitiesStatisticsByMonth?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LoanActivitiesStatisticsByMonthKeySpecifier | (() => undefined | LoanActivitiesStatisticsByMonthKeySpecifier),
		fields?: LoanActivitiesStatisticsByMonthFieldPolicy,
	},
	LoanActivity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LoanActivityKeySpecifier | (() => undefined | LoanActivityKeySpecifier),
		fields?: LoanActivityFieldPolicy,
	},
	LoanActivityConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LoanActivityConnectionKeySpecifier | (() => undefined | LoanActivityConnectionKeySpecifier),
		fields?: LoanActivityConnectionFieldPolicy,
	},
	LoanActivityEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LoanActivityEdgeKeySpecifier | (() => undefined | LoanActivityEdgeKeySpecifier),
		fields?: LoanActivityEdgeFieldPolicy,
	},
	LoanAuctioned?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LoanAuctionedKeySpecifier | (() => undefined | LoanAuctionedKeySpecifier),
		fields?: LoanAuctionedFieldPolicy,
	},
	LoanAuctionedNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LoanAuctionedNotificationKeySpecifier | (() => undefined | LoanAuctionedNotificationKeySpecifier),
		fields?: LoanAuctionedNotificationFieldPolicy,
	},
	LoanDefaultReminderNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LoanDefaultReminderNotificationKeySpecifier | (() => undefined | LoanDefaultReminderNotificationKeySpecifier),
		fields?: LoanDefaultReminderNotificationFieldPolicy,
	},
	LoanDefaulted?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LoanDefaultedKeySpecifier | (() => undefined | LoanDefaultedKeySpecifier),
		fields?: LoanDefaultedFieldPolicy,
	},
	LoanDefaultedNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LoanDefaultedNotificationKeySpecifier | (() => undefined | LoanDefaultedNotificationKeySpecifier),
		fields?: LoanDefaultedNotificationFieldPolicy,
	},
	LoanEvent?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LoanEventKeySpecifier | (() => undefined | LoanEventKeySpecifier),
		fields?: LoanEventFieldPolicy,
	},
	LoanEventConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LoanEventConnectionKeySpecifier | (() => undefined | LoanEventConnectionKeySpecifier),
		fields?: LoanEventConnectionFieldPolicy,
	},
	LoanEventEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LoanEventEdgeKeySpecifier | (() => undefined | LoanEventEdgeKeySpecifier),
		fields?: LoanEventEdgeFieldPolicy,
	},
	LoanExtended?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LoanExtendedKeySpecifier | (() => undefined | LoanExtendedKeySpecifier),
		fields?: LoanExtendedFieldPolicy,
	},
	LoanExtendedNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LoanExtendedNotificationKeySpecifier | (() => undefined | LoanExtendedNotificationKeySpecifier),
		fields?: LoanExtendedNotificationFieldPolicy,
	},
	LoanForeclosed?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LoanForeclosedKeySpecifier | (() => undefined | LoanForeclosedKeySpecifier),
		fields?: LoanForeclosedFieldPolicy,
	},
	LoanInitiated?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LoanInitiatedKeySpecifier | (() => undefined | LoanInitiatedKeySpecifier),
		fields?: LoanInitiatedFieldPolicy,
	},
	LoanPayment?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LoanPaymentKeySpecifier | (() => undefined | LoanPaymentKeySpecifier),
		fields?: LoanPaymentFieldPolicy,
	},
	LoanRefinanced?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LoanRefinancedKeySpecifier | (() => undefined | LoanRefinancedKeySpecifier),
		fields?: LoanRefinancedFieldPolicy,
	},
	LoanRefinancedFromOffers?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LoanRefinancedFromOffersKeySpecifier | (() => undefined | LoanRefinancedFromOffersKeySpecifier),
		fields?: LoanRefinancedFromOffersFieldPolicy,
	},
	LoanRefinancedNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LoanRefinancedNotificationKeySpecifier | (() => undefined | LoanRefinancedNotificationKeySpecifier),
		fields?: LoanRefinancedNotificationFieldPolicy,
	},
	LoanRepaid?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LoanRepaidKeySpecifier | (() => undefined | LoanRepaidKeySpecifier),
		fields?: LoanRepaidFieldPolicy,
	},
	LoanRepaidNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LoanRepaidNotificationKeySpecifier | (() => undefined | LoanRepaidNotificationKeySpecifier),
		fields?: LoanRepaidNotificationFieldPolicy,
	},
	LoanSentToAuction?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LoanSentToAuctionKeySpecifier | (() => undefined | LoanSentToAuctionKeySpecifier),
		fields?: LoanSentToAuctionFieldPolicy,
	},
	LoansData?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LoansDataKeySpecifier | (() => undefined | LoansDataKeySpecifier),
		fields?: LoansDataFieldPolicy,
	},
	LostSource?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LostSourceKeySpecifier | (() => undefined | LostSourceKeySpecifier),
		fields?: LostSourceFieldPolicy,
	},
	LostSourceNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LostSourceNotificationKeySpecifier | (() => undefined | LostSourceNotificationKeySpecifier),
		fields?: LostSourceNotificationFieldPolicy,
	},
	MultiSourceLoan?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MultiSourceLoanKeySpecifier | (() => undefined | MultiSourceLoanKeySpecifier),
		fields?: MultiSourceLoanFieldPolicy,
	},
	MultiSourceLoanConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MultiSourceLoanConnectionKeySpecifier | (() => undefined | MultiSourceLoanConnectionKeySpecifier),
		fields?: MultiSourceLoanConnectionFieldPolicy,
	},
	MultiSourceLoanEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MultiSourceLoanEdgeKeySpecifier | (() => undefined | MultiSourceLoanEdgeKeySpecifier),
		fields?: MultiSourceLoanEdgeFieldPolicy,
	},
	MultiSourceLoanHistory?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MultiSourceLoanHistoryKeySpecifier | (() => undefined | MultiSourceLoanHistoryKeySpecifier),
		fields?: MultiSourceLoanHistoryFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	NFT?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NFTKeySpecifier | (() => undefined | NFTKeySpecifier),
		fields?: NFTFieldPolicy,
	},
	NFTConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NFTConnectionKeySpecifier | (() => undefined | NFTConnectionKeySpecifier),
		fields?: NFTConnectionFieldPolicy,
	},
	NFTEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NFTEdgeKeySpecifier | (() => undefined | NFTEdgeKeySpecifier),
		fields?: NFTEdgeFieldPolicy,
	},
	NFTPriceSample?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NFTPriceSampleKeySpecifier | (() => undefined | NFTPriceSampleKeySpecifier),
		fields?: NFTPriceSampleFieldPolicy,
	},
	NewCollectionUnlistedOfferNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NewCollectionUnlistedOfferNotificationKeySpecifier | (() => undefined | NewCollectionUnlistedOfferNotificationKeySpecifier),
		fields?: NewCollectionUnlistedOfferNotificationFieldPolicy,
	},
	NewOfferNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NewOfferNotificationKeySpecifier | (() => undefined | NewOfferNotificationKeySpecifier),
		fields?: NewOfferNotificationFieldPolicy,
	},
	NewRenegotiationOfferNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NewRenegotiationOfferNotificationKeySpecifier | (() => undefined | NewRenegotiationOfferNotificationKeySpecifier),
		fields?: NewRenegotiationOfferNotificationFieldPolicy,
	},
	NftStatistics?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NftStatisticsKeySpecifier | (() => undefined | NftStatisticsKeySpecifier),
		fields?: NftStatisticsFieldPolicy,
	},
	Node?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NodeKeySpecifier | (() => undefined | NodeKeySpecifier),
		fields?: NodeFieldPolicy,
	},
	Notification?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NotificationKeySpecifier | (() => undefined | NotificationKeySpecifier),
		fields?: NotificationFieldPolicy,
	},
	NotificationConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NotificationConnectionKeySpecifier | (() => undefined | NotificationConnectionKeySpecifier),
		fields?: NotificationConnectionFieldPolicy,
	},
	NotificationEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NotificationEdgeKeySpecifier | (() => undefined | NotificationEdgeKeySpecifier),
		fields?: NotificationEdgeFieldPolicy,
	},
	Offer?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OfferKeySpecifier | (() => undefined | OfferKeySpecifier),
		fields?: OfferFieldPolicy,
	},
	OfferAcceptedNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OfferAcceptedNotificationKeySpecifier | (() => undefined | OfferAcceptedNotificationKeySpecifier),
		fields?: OfferAcceptedNotificationFieldPolicy,
	},
	OfferConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OfferConnectionKeySpecifier | (() => undefined | OfferConnectionKeySpecifier),
		fields?: OfferConnectionFieldPolicy,
	},
	OfferEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OfferEdgeKeySpecifier | (() => undefined | OfferEdgeKeySpecifier),
		fields?: OfferEdgeFieldPolicy,
	},
	OfferStatistics?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OfferStatisticsKeySpecifier | (() => undefined | OfferStatisticsKeySpecifier),
		fields?: OfferStatisticsFieldPolicy,
	},
	OfferValidator?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OfferValidatorKeySpecifier | (() => undefined | OfferValidatorKeySpecifier),
		fields?: OfferValidatorFieldPolicy,
	},
	Order?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrderKeySpecifier | (() => undefined | OrderKeySpecifier),
		fields?: OrderFieldPolicy,
	},
	OrderConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrderConnectionKeySpecifier | (() => undefined | OrderConnectionKeySpecifier),
		fields?: OrderConnectionFieldPolicy,
	},
	OrderEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrderEdgeKeySpecifier | (() => undefined | OrderEdgeKeySpecifier),
		fields?: OrderEdgeFieldPolicy,
	},
	OutbidNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OutbidNotificationKeySpecifier | (() => undefined | OutbidNotificationKeySpecifier),
		fields?: OutbidNotificationFieldPolicy,
	},
	OutstandingLoanStatistics?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OutstandingLoanStatisticsKeySpecifier | (() => undefined | OutstandingLoanStatisticsKeySpecifier),
		fields?: OutstandingLoanStatisticsFieldPolicy,
	},
	PageInfo?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PageInfoKeySpecifier | (() => undefined | PageInfoKeySpecifier),
		fields?: PageInfoFieldPolicy,
	},
	PointActivity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PointActivityKeySpecifier | (() => undefined | PointActivityKeySpecifier),
		fields?: PointActivityFieldPolicy,
	},
	PointActivityConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PointActivityConnectionKeySpecifier | (() => undefined | PointActivityConnectionKeySpecifier),
		fields?: PointActivityConnectionFieldPolicy,
	},
	PointActivityEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PointActivityEdgeKeySpecifier | (() => undefined | PointActivityEdgeKeySpecifier),
		fields?: PointActivityEdgeFieldPolicy,
	},
	Pool?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PoolKeySpecifier | (() => undefined | PoolKeySpecifier),
		fields?: PoolFieldPolicy,
	},
	PoolActivity?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PoolActivityKeySpecifier | (() => undefined | PoolActivityKeySpecifier),
		fields?: PoolActivityFieldPolicy,
	},
	PoolActivityConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PoolActivityConnectionKeySpecifier | (() => undefined | PoolActivityConnectionKeySpecifier),
		fields?: PoolActivityConnectionFieldPolicy,
	},
	PoolActivityEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PoolActivityEdgeKeySpecifier | (() => undefined | PoolActivityEdgeKeySpecifier),
		fields?: PoolActivityEdgeFieldPolicy,
	},
	PoolAprFactorSet?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PoolAprFactorSetKeySpecifier | (() => undefined | PoolAprFactorSetKeySpecifier),
		fields?: PoolAprFactorSetFieldPolicy,
	},
	PoolAprPremiumSet?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PoolAprPremiumSetKeySpecifier | (() => undefined | PoolAprPremiumSetKeySpecifier),
		fields?: PoolAprPremiumSetFieldPolicy,
	},
	PoolBaseInterestAllocatorSet?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PoolBaseInterestAllocatorSetKeySpecifier | (() => undefined | PoolBaseInterestAllocatorSetKeySpecifier),
		fields?: PoolBaseInterestAllocatorSetFieldPolicy,
	},
	PoolBaseRateAllocator?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PoolBaseRateAllocatorKeySpecifier | (() => undefined | PoolBaseRateAllocatorKeySpecifier),
		fields?: PoolBaseRateAllocatorFieldPolicy,
	},
	PoolCollectionFactors?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PoolCollectionFactorsKeySpecifier | (() => undefined | PoolCollectionFactorsKeySpecifier),
		fields?: PoolCollectionFactorsFieldPolicy,
	},
	PoolCollectionFactorsSet?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PoolCollectionFactorsSetKeySpecifier | (() => undefined | PoolCollectionFactorsSetKeySpecifier),
		fields?: PoolCollectionFactorsSetFieldPolicy,
	},
	PoolConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PoolConnectionKeySpecifier | (() => undefined | PoolConnectionKeySpecifier),
		fields?: PoolConnectionFieldPolicy,
	},
	PoolEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PoolEdgeKeySpecifier | (() => undefined | PoolEdgeKeySpecifier),
		fields?: PoolEdgeFieldPolicy,
	},
	PoolReallocated?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PoolReallocatedKeySpecifier | (() => undefined | PoolReallocatedKeySpecifier),
		fields?: PoolReallocatedFieldPolicy,
	},
	PoolStatistics?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PoolStatisticsKeySpecifier | (() => undefined | PoolStatisticsKeySpecifier),
		fields?: PoolStatisticsFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	QueueDeployed?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueueDeployedKeySpecifier | (() => undefined | QueueDeployedKeySpecifier),
		fields?: QueueDeployedFieldPolicy,
	},
	Renegotiation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RenegotiationKeySpecifier | (() => undefined | RenegotiationKeySpecifier),
		fields?: RenegotiationFieldPolicy,
	},
	RenegotiationConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RenegotiationConnectionKeySpecifier | (() => undefined | RenegotiationConnectionKeySpecifier),
		fields?: RenegotiationConnectionFieldPolicy,
	},
	RenegotiationEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RenegotiationEdgeKeySpecifier | (() => undefined | RenegotiationEdgeKeySpecifier),
		fields?: RenegotiationEdgeFieldPolicy,
	},
	RenegotiationRequest?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RenegotiationRequestKeySpecifier | (() => undefined | RenegotiationRequestKeySpecifier),
		fields?: RenegotiationRequestFieldPolicy,
	},
	RenegotiationRequestedNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RenegotiationRequestedNotificationKeySpecifier | (() => undefined | RenegotiationRequestedNotificationKeySpecifier),
		fields?: RenegotiationRequestedNotificationFieldPolicy,
	},
	Sale?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SaleKeySpecifier | (() => undefined | SaleKeySpecifier),
		fields?: SaleFieldPolicy,
	},
	SellAndRepayOrder?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SellAndRepayOrderKeySpecifier | (() => undefined | SellAndRepayOrderKeySpecifier),
		fields?: SellAndRepayOrderFieldPolicy,
	},
	SignatureRequest?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SignatureRequestKeySpecifier | (() => undefined | SignatureRequestKeySpecifier),
		fields?: SignatureRequestFieldPolicy,
	},
	SingleNFTOffer?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SingleNFTOfferKeySpecifier | (() => undefined | SingleNFTOfferKeySpecifier),
		fields?: SingleNFTOfferFieldPolicy,
	},
	SingleNFTOfferCollectionOfferRenegotiationConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SingleNFTOfferCollectionOfferRenegotiationConnectionKeySpecifier | (() => undefined | SingleNFTOfferCollectionOfferRenegotiationConnectionKeySpecifier),
		fields?: SingleNFTOfferCollectionOfferRenegotiationConnectionFieldPolicy,
	},
	SingleNFTOfferCollectionOfferRenegotiationEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SingleNFTOfferCollectionOfferRenegotiationEdgeKeySpecifier | (() => undefined | SingleNFTOfferCollectionOfferRenegotiationEdgeKeySpecifier),
		fields?: SingleNFTOfferCollectionOfferRenegotiationEdgeFieldPolicy,
	},
	SingleNFTOrder?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SingleNFTOrderKeySpecifier | (() => undefined | SingleNFTOrderKeySpecifier),
		fields?: SingleNFTOrderFieldPolicy,
	},
	Source?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SourceKeySpecifier | (() => undefined | SourceKeySpecifier),
		fields?: SourceFieldPolicy,
	},
	SourceHistory?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SourceHistoryKeySpecifier | (() => undefined | SourceHistoryKeySpecifier),
		fields?: SourceHistoryFieldPolicy,
	},
	SourceLostSourceConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SourceLostSourceConnectionKeySpecifier | (() => undefined | SourceLostSourceConnectionKeySpecifier),
		fields?: SourceLostSourceConnectionFieldPolicy,
	},
	SourceLostSourceEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SourceLostSourceEdgeKeySpecifier | (() => undefined | SourceLostSourceEdgeKeySpecifier),
		fields?: SourceLostSourceEdgeFieldPolicy,
	},
	SourceStatisticsFromCollection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SourceStatisticsFromCollectionKeySpecifier | (() => undefined | SourceStatisticsFromCollectionKeySpecifier),
		fields?: SourceStatisticsFromCollectionFieldPolicy,
	},
	SourcesStatistics?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SourcesStatisticsKeySpecifier | (() => undefined | SourcesStatisticsKeySpecifier),
		fields?: SourcesStatisticsFieldPolicy,
	},
	StatByCollection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StatByCollectionKeySpecifier | (() => undefined | StatByCollectionKeySpecifier),
		fields?: StatByCollectionFieldPolicy,
	},
	TopUpRequest?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TopUpRequestKeySpecifier | (() => undefined | TopUpRequestKeySpecifier),
		fields?: TopUpRequestFieldPolicy,
	},
	TopUpRequestedNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TopUpRequestedNotificationKeySpecifier | (() => undefined | TopUpRequestedNotificationKeySpecifier),
		fields?: TopUpRequestedNotificationFieldPolicy,
	},
	Trait?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TraitKeySpecifier | (() => undefined | TraitKeySpecifier),
		fields?: TraitFieldPolicy,
	},
	TraitOrder?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TraitOrderKeySpecifier | (() => undefined | TraitOrderKeySpecifier),
		fields?: TraitOrderFieldPolicy,
	},
	TraitType?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TraitTypeKeySpecifier | (() => undefined | TraitTypeKeySpecifier),
		fields?: TraitTypeFieldPolicy,
	},
	TraitTypeConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TraitTypeConnectionKeySpecifier | (() => undefined | TraitTypeConnectionKeySpecifier),
		fields?: TraitTypeConnectionFieldPolicy,
	},
	TraitTypeEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TraitTypeEdgeKeySpecifier | (() => undefined | TraitTypeEdgeKeySpecifier),
		fields?: TraitTypeEdgeFieldPolicy,
	},
	TraitValue?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TraitValueKeySpecifier | (() => undefined | TraitValueKeySpecifier),
		fields?: TraitValueFieldPolicy,
	},
	TraitValueConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TraitValueConnectionKeySpecifier | (() => undefined | TraitValueConnectionKeySpecifier),
		fields?: TraitValueConnectionFieldPolicy,
	},
	TraitValueEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TraitValueEdgeKeySpecifier | (() => undefined | TraitValueEdgeKeySpecifier),
		fields?: TraitValueEdgeFieldPolicy,
	},
	TypedData?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TypedDataKeySpecifier | (() => undefined | TypedDataKeySpecifier),
		fields?: TypedDataFieldPolicy,
	},
	UnderfundedOfferNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UnderfundedOfferNotificationKeySpecifier | (() => undefined | UnderfundedOfferNotificationKeySpecifier),
		fields?: UnderfundedOfferNotificationFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	},
	UserStatistics?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserStatisticsKeySpecifier | (() => undefined | UserStatisticsKeySpecifier),
		fields?: UserStatisticsFieldPolicy,
	},
	WithdrawalPosition?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | WithdrawalPositionKeySpecifier | (() => undefined | WithdrawalPositionKeySpecifier),
		fields?: WithdrawalPositionFieldPolicy,
	},
	WithdrawalPositionConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | WithdrawalPositionConnectionKeySpecifier | (() => undefined | WithdrawalPositionConnectionKeySpecifier),
		fields?: WithdrawalPositionConnectionFieldPolicy,
	},
	WithdrawalPositionEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | WithdrawalPositionEdgeKeySpecifier | (() => undefined | WithdrawalPositionEdgeKeySpecifier),
		fields?: WithdrawalPositionEdgeFieldPolicy,
	},
	WithdrawalPositionLocked?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | WithdrawalPositionLockedKeySpecifier | (() => undefined | WithdrawalPositionLockedKeySpecifier),
		fields?: WithdrawalPositionLockedFieldPolicy,
	},
	WithdrawalPositionMinted?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | WithdrawalPositionMintedKeySpecifier | (() => undefined | WithdrawalPositionMintedKeySpecifier),
		fields?: WithdrawalPositionMintedFieldPolicy,
	},
	WithdrawalQueue?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | WithdrawalQueueKeySpecifier | (() => undefined | WithdrawalQueueKeySpecifier),
		fields?: WithdrawalQueueFieldPolicy,
	},
	WithdrawalQueueConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | WithdrawalQueueConnectionKeySpecifier | (() => undefined | WithdrawalQueueConnectionKeySpecifier),
		fields?: WithdrawalQueueConnectionFieldPolicy,
	},
	WithdrawalQueueEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | WithdrawalQueueEdgeKeySpecifier | (() => undefined | WithdrawalQueueEdgeKeySpecifier),
		fields?: WithdrawalQueueEdgeFieldPolicy,
	},
	WithdrawnFromQueue?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | WithdrawnFromQueueKeySpecifier | (() => undefined | WithdrawnFromQueueKeySpecifier),
		fields?: WithdrawnFromQueueFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;
export const CurrencyInfoFragmentDoc = gql`
    fragment CurrencyInfo on Currency {
  address
  decimals
}
    `;
export const CurrencyAmountInfoFragmentDoc = gql`
    fragment CurrencyAmountInfo on CurrencyAmount {
  amount
  currency {
    ...CurrencyInfo
  }
}
    ${CurrencyInfoFragmentDoc}`;
export const SaleOfferInfoFragmentDoc = gql`
    fragment SaleOfferInfo on SingleNFTOrder {
  id
  netAmount
  status
  marketPlace
  fees
  maker
  expiration
  createdDate
  startTime
  hidden
  signature
  currencyAddress
  nonce
}
    `;
export const ListNftDocument = gql`
    mutation listNft($nftId: Int!) {
  addOrUpdateListing(nftId: $nftId) {
    id
  }
}
    `;
export const UnlistNftDocument = gql`
    mutation unlistNft($nftId: Int!) {
  removeListing(nftId: $nftId) {
    id
  }
}
    `;
export const GenerateCollectionOfferHashDocument = gql`
    mutation generateCollectionOfferHash($offerInput: CollectionOfferInput!) {
  offer: generateCollectionOfferToBeSigned(offerInput: $offerInput) {
    offerHash
    offerId
    lenderAddress
    signerAddress
    borrowerAddress
    validators {
      validator
      arguments
    }
    collection {
      contractData {
        contractAddress
      }
    }
  }
}
    `;
export const SaveCollectionOfferDocument = gql`
    mutation saveCollectionOffer($offer: CollectionSignedOfferInput!) {
  offer: saveSignedCollectionOffer(signedOfferInput: $offer) {
    id
    status
    collection {
      contractData {
        contractAddress
      }
    }
  }
}
    `;
export const HideOfferDocument = gql`
    mutation hideOffer($contract: Address!, $id: String!) {
  hideOffer(contractAddress: $contract, offerId: $id) {
    id
  }
}
    `;
export const GenerateSingleNftOfferHashDocument = gql`
    mutation generateSingleNftOfferHash($offerInput: SingleNFTOfferInput!) {
  offer: generateSingleNftOfferToBeSigned(offerInput: $offerInput) {
    offerHash
    offerId
    lenderAddress
    signerAddress
    borrowerAddress
    validators {
      validator
      arguments
    }
    nft {
      tokenId
      collection {
        contractData {
          contractAddress
        }
      }
    }
  }
}
    `;
export const SaveSingleNftOfferDocument = gql`
    mutation saveSingleNftOffer($offer: SingleNFTSignedOfferInput!) {
  offer: saveSignedSingleNftOffer(signedOfferInput: $offer) {
    id
    status
    nft {
      tokenId
      collection {
        contractData {
          contractAddress
        }
      }
    }
  }
}
    `;
export const UnhideOfferDocument = gql`
    mutation unhideOffer($contract: Address!, $id: String!) {
  showOffer(contractAddress: $contract, offerId: $id) {
    id
  }
}
    `;
export const HideOrderDocument = gql`
    mutation hideOrder($id: Int!) {
  hideOrder(orderId: $id) {
    id
  }
}
    `;
export const PublishOrderForCollectionDocument = gql`
    mutation publishOrderForCollection($orderInput: CollectionOrderInput!) {
  result: publishOrderForCollection(orderInput: $orderInput) {
    ... on CollectionOrder {
      id
      status
      signature
      marketPlaceAddress
    }
    ... on SignatureRequest {
      key
      typedData {
        types
        primaryType
        domain
        message
      }
    }
  }
}
    `;
export const PublishOrderForNftDocument = gql`
    mutation publishOrderForNft($orderInput: SingleNFTOrderInput!) {
  result: publishOrderForNft(orderInput: $orderInput) {
    ... on SingleNFTOrder {
      id
      status
      signature
      marketPlaceAddress
    }
    ... on SignatureRequest {
      key
      typedData {
        types
        primaryType
        domain
        message
      }
    }
  }
}
    `;
export const PublishSellAndRepayOrderDocument = gql`
    mutation publishSellAndRepayOrder($orderInput: NFTOrderInput!) {
  result: publishSellAndRepayOrder(orderInput: $orderInput) {
    ... on SellAndRepayOrder {
      id
      status
      signature
      repaymentCalldata
      marketPlaceAddress
    }
    ... on SignatureRequest {
      key
      typedData {
        types
        primaryType
        domain
        message
      }
    }
  }
}
    `;
export const ShowOrderDocument = gql`
    mutation showOrder($id: Int!) {
  showOrder(orderId: $id) {
    id
  }
}
    `;
export const GenerateRenegotiationOfferHashDocument = gql`
    mutation generateRenegotiationOfferHash($renegotiationInput: RenegotiationOfferInput!) {
  offer: generateRenegotiationOfferToBeSigned(
    renegotiationInput: $renegotiationInput
  ) {
    loanId
    renegotiationId
    offerHash
    lenderAddress
    signerAddress
    nft {
      tokenId
      collection {
        contractData {
          contractAddress
        }
      }
    }
  }
}
    `;
export const HideRenegotiationOfferDocument = gql`
    mutation hideRenegotiationOffer($id: String!, $contractAddress: Address!) {
  hideRenegotiation(renegotiationId: $id, contractAddress: $contractAddress) {
    id
  }
}
    `;
export const SaveRenegotiationOfferDocument = gql`
    mutation saveRenegotiationOffer($renegotiation: SignedRenegotiationOfferInput!, $fallbackOffer: SingleNFTSignedOfferInput) {
  renegotiation: saveRenegotiationSignedOffer(
    signedRenegotiationInput: $renegotiation
    fallbackOfferInput: $fallbackOffer
  ) {
    id
    status
  }
}
    `;
export const UnhideRenegotiationOfferDocument = gql`
    mutation unhideRenegotiationOffer($id: String!, $contractAddress: Address!) {
  showRenegotiation(renegotiationId: $id, contractAddress: $contractAddress) {
    id
  }
}
    `;
export const CollectionsDocument = gql`
    query collections($currency: Address!, $collections: [Int!], $standards: [TokenStandardType!], $after: String) {
  collections: listCollections(
    collections: $collections
    standards: $standards
    after: $after
  ) {
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      node {
        id
        name
        slug
        description
        discordUrl
        twitterUsername
        externalUrl
        collectionUrl
        verified
        wrapperCollections {
          contractData {
            contractAddress
          }
        }
        image {
          cacheUrl
        }
        bannerImage {
          cacheUrl
        }
        contractData {
          blockchain
          contractAddress
          createdDate
          creatorAddress
        }
        statistics {
          floorPrice {
            ...CurrencyAmountInfo
          }
          floorPrice7d
          floorPrice30d
          bestOffer {
            ...CurrencyAmountInfo
          }
          totalVolume
          totalVolume1y
          totalVolume3m
          totalVolume1m
          totalVolume1w
          totalLoanVolume(currencyAddress: $currency)
          totalLoanVolume1w(currencyAddress: $currency)
          totalLoanVolume1m(currencyAddress: $currency)
          totalLoanVolume3m(currencyAddress: $currency)
          totalLoanVolume1y(currencyAddress: $currency)
          numberOfPricedNfts
          nftsCount
          percentageInOutstandingLoans
          repaymentRate
          numberOfOffers(currencyAddress: $currency)
        }
      }
    }
  }
}
    ${CurrencyAmountInfoFragmentDoc}`;
export const CollectionByContractAddressDocument = gql`
    query collectionByContractAddress($contractAddress: Address!) {
  collection: getCollectionsByContractAddress(contractAddress: $contractAddress) {
    contractData {
      contractAddress
    }
    wrapperCollections {
      contractData {
        contractAddress
      }
    }
  }
}
    `;
export const CollectionsIdByContractAddressDocument = gql`
    query collectionsIdByContractAddress($contractAddress: Address!) {
  collections: getCollectionsByContractAddress(contractAddress: $contractAddress) {
    id
  }
}
    `;
export const CollectionIdBySlugDocument = gql`
    query collectionIdBySlug($slug: String!) {
  collection: getCollectionBySlug(slug: $slug) {
    id
  }
}
    `;
export const ListListingsDocument = gql`
    query listListings($collections: [Int!], $userFilter: UserFilter, $marketplaceNames: [MarketplaceEnum!], $first: Int = 24, $after: String) {
  result: listListings(
    collectionIds: $collections
    userFilter: $userFilter
    marketplaceNames: $marketplaceNames
    first: $first
    after: $after
  ) {
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      node {
        id
        marketplaceName
        createdDate
        desiredDuration
        desiredPrincipalAddress
        user {
          walletAddress
        }
        nft {
          id
          tokenId
          collection {
            id
            slug
            contractData {
              contractAddress
            }
          }
        }
      }
    }
  }
}
    `;
export const ListLoansDocument = gql`
    query listLoans($borrowers: [String!] = [], $collections: [Int!] = [], $nfts: [Int!], $statuses: [LoanStatusType!] = [], $sortBy: [LoanSortInput!] = [], $terms: TermsFilter, $orderByStatuses: Boolean, $loansCurrencyAddress: Address, $first: Int = 24, $after: String) {
  loans: listLoans(
    borrowers: $borrowers
    collections: $collections
    nfts: $nfts
    statuses: $statuses
    sortBy: $sortBy
    terms: $terms
    orderByStatuses: $orderByStatuses
    currencyAddress: $loansCurrencyAddress
    first: $first
    after: $after
  ) {
    totalCount
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      node {
        id
        address
        loanId
        timestamp
        txHash
        indexInBlock
        borrowerAddress
        principalAddress
        startTime
        duration
        status
        offer {
          offerId
          signerAddress
        }
        currency {
          symbol
          decimals
          address
        }
        repaidActivity {
          totalInterest
          timestamp
        }
        principalAmount
        blendedAprBps
        totalOriginationFee
        protocolFee
        nft {
          id
          name
          tokenId
          nftId
          owner
          image {
            data
            cacheUrl
            contentTypeMime
            accessTypeName
          }
          collection {
            id
            slug
            name
            nftsCount
            contractData {
              contractAddress
            }
          }
        }
        sources {
          id
          loanId
          originationFee
          principalAmount
          lenderAddress
          accruedInterest
          aprBps
          startTime
        }
      }
    }
  }
}
    `;
export const NftIdByContractAddressAndTokenIdDocument = gql`
    query nftIdByContractAddressAndTokenId($contractAddress: Address!, $tokenId: BigInt!) {
  nft: getNftByContractAddressAndTokenId(
    contractAddress: $contractAddress
    tokenId: $tokenId
  ) {
    id
  }
}
    `;
export const NftIdBySlugTokenIdDocument = gql`
    query nftIdBySlugTokenId($slug: String!, $tokenId: BigInt!) {
  nft: getNftBySlugAndTokenId(slug: $slug, tokenId: $tokenId) {
    id
  }
}
    `;
export const OwnedNftsDocument = gql`
    query ownedNfts($after: String, $includeInLoans: Boolean, $includeInStash: Boolean, $standards: [TokenStandardType!]) {
  ownedNfts: listNftsFromUser(
    after: $after
    withLoans: $includeInLoans
    includeInStash: $includeInStash
    standards: $standards
  ) {
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      node {
        id
        collection {
          id
          contractData {
            contractAddress
          }
          wrapperCollections {
            contractData {
              contractAddress
            }
            contractData {
              contractAddress
            }
          }
        }
        tokenId
        activeLoan {
          id
        }
        statistics {
          lastSale {
            order {
              price
              currency {
                ...CurrencyInfo
              }
            }
          }
          topTraitFloorPrice {
            ...CurrencyAmountInfo
          }
        }
      }
    }
  }
}
    ${CurrencyInfoFragmentDoc}
${CurrencyAmountInfoFragmentDoc}`;
export const ListOffersDocument = gql`
    query listOffers($borrowerAddress: String, $lenders: [String!], $sortBy: OffersSortInput!, $terms: TermsFilter, $statuses: [OfferStatus!] = [ACTIVE, CANCELLED, INACTIVE, EXPIRED], $nfts: [Int!], $collections: [Int!], $onlySingleNftOffers: Boolean, $onlyCollectionOffers: Boolean, $first: Int = 24, $after: String) {
  result: listOffers(
    borrowerAddress: $borrowerAddress
    lenders: $lenders
    sortBy: [$sortBy]
    terms: $terms
    nfts: $nfts
    collections: $collections
    onlySingleNftOffers: $onlySingleNftOffers
    onlyCollectionOffers: $onlyCollectionOffers
    statuses: $statuses
    first: $first
    after: $after
  ) {
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      node {
        id
        offerId
        lenderAddress
        borrowerAddress
        signerAddress
        contractAddress
        requiresLiquidation
        principalAddress
        principalAmount
        currency {
          symbol
          decimals
          address
        }
        aprBps
        fee
        capacity
        expirationTime
        duration
        status
        offerHash
        signature
        createdDate
        repayment
        hidden
        maxSeniorRepayment
        validators {
          arguments
          validator
        }
        ... on SingleNFTOffer {
          nft {
            id
            tokenId
            collection {
              id
              slug
              contractData {
                contractAddress
              }
            }
          }
        }
        ... on CollectionOffer {
          collection {
            id
            slug
            contractData {
              contractAddress
            }
          }
        }
      }
    }
  }
}
    `;
export const GetSaleCalldataDocument = gql`
    query getSaleCalldata($orderId: Int!, $nftId: Int) {
  saleCalldata: getOrderSaleCalldata(orderId: $orderId, nftId: $nftId)
}
    `;
export type Requester<C = {}, E = unknown> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R> | AsyncIterable<R>
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    listNft(variables: ListNftMutationVariables, options?: C): Promise<ListNftMutation> {
      return requester<ListNftMutation, ListNftMutationVariables>(ListNftDocument, variables, options) as Promise<ListNftMutation>;
    },
    unlistNft(variables: UnlistNftMutationVariables, options?: C): Promise<UnlistNftMutation> {
      return requester<UnlistNftMutation, UnlistNftMutationVariables>(UnlistNftDocument, variables, options) as Promise<UnlistNftMutation>;
    },
    generateCollectionOfferHash(variables: GenerateCollectionOfferHashMutationVariables, options?: C): Promise<GenerateCollectionOfferHashMutation> {
      return requester<GenerateCollectionOfferHashMutation, GenerateCollectionOfferHashMutationVariables>(GenerateCollectionOfferHashDocument, variables, options) as Promise<GenerateCollectionOfferHashMutation>;
    },
    saveCollectionOffer(variables: SaveCollectionOfferMutationVariables, options?: C): Promise<SaveCollectionOfferMutation> {
      return requester<SaveCollectionOfferMutation, SaveCollectionOfferMutationVariables>(SaveCollectionOfferDocument, variables, options) as Promise<SaveCollectionOfferMutation>;
    },
    hideOffer(variables: HideOfferMutationVariables, options?: C): Promise<HideOfferMutation> {
      return requester<HideOfferMutation, HideOfferMutationVariables>(HideOfferDocument, variables, options) as Promise<HideOfferMutation>;
    },
    generateSingleNftOfferHash(variables: GenerateSingleNftOfferHashMutationVariables, options?: C): Promise<GenerateSingleNftOfferHashMutation> {
      return requester<GenerateSingleNftOfferHashMutation, GenerateSingleNftOfferHashMutationVariables>(GenerateSingleNftOfferHashDocument, variables, options) as Promise<GenerateSingleNftOfferHashMutation>;
    },
    saveSingleNftOffer(variables: SaveSingleNftOfferMutationVariables, options?: C): Promise<SaveSingleNftOfferMutation> {
      return requester<SaveSingleNftOfferMutation, SaveSingleNftOfferMutationVariables>(SaveSingleNftOfferDocument, variables, options) as Promise<SaveSingleNftOfferMutation>;
    },
    unhideOffer(variables: UnhideOfferMutationVariables, options?: C): Promise<UnhideOfferMutation> {
      return requester<UnhideOfferMutation, UnhideOfferMutationVariables>(UnhideOfferDocument, variables, options) as Promise<UnhideOfferMutation>;
    },
    hideOrder(variables: HideOrderMutationVariables, options?: C): Promise<HideOrderMutation> {
      return requester<HideOrderMutation, HideOrderMutationVariables>(HideOrderDocument, variables, options) as Promise<HideOrderMutation>;
    },
    publishOrderForCollection(variables: PublishOrderForCollectionMutationVariables, options?: C): Promise<PublishOrderForCollectionMutation> {
      return requester<PublishOrderForCollectionMutation, PublishOrderForCollectionMutationVariables>(PublishOrderForCollectionDocument, variables, options) as Promise<PublishOrderForCollectionMutation>;
    },
    publishOrderForNft(variables: PublishOrderForNftMutationVariables, options?: C): Promise<PublishOrderForNftMutation> {
      return requester<PublishOrderForNftMutation, PublishOrderForNftMutationVariables>(PublishOrderForNftDocument, variables, options) as Promise<PublishOrderForNftMutation>;
    },
    publishSellAndRepayOrder(variables: PublishSellAndRepayOrderMutationVariables, options?: C): Promise<PublishSellAndRepayOrderMutation> {
      return requester<PublishSellAndRepayOrderMutation, PublishSellAndRepayOrderMutationVariables>(PublishSellAndRepayOrderDocument, variables, options) as Promise<PublishSellAndRepayOrderMutation>;
    },
    showOrder(variables: ShowOrderMutationVariables, options?: C): Promise<ShowOrderMutation> {
      return requester<ShowOrderMutation, ShowOrderMutationVariables>(ShowOrderDocument, variables, options) as Promise<ShowOrderMutation>;
    },
    generateRenegotiationOfferHash(variables: GenerateRenegotiationOfferHashMutationVariables, options?: C): Promise<GenerateRenegotiationOfferHashMutation> {
      return requester<GenerateRenegotiationOfferHashMutation, GenerateRenegotiationOfferHashMutationVariables>(GenerateRenegotiationOfferHashDocument, variables, options) as Promise<GenerateRenegotiationOfferHashMutation>;
    },
    hideRenegotiationOffer(variables: HideRenegotiationOfferMutationVariables, options?: C): Promise<HideRenegotiationOfferMutation> {
      return requester<HideRenegotiationOfferMutation, HideRenegotiationOfferMutationVariables>(HideRenegotiationOfferDocument, variables, options) as Promise<HideRenegotiationOfferMutation>;
    },
    saveRenegotiationOffer(variables: SaveRenegotiationOfferMutationVariables, options?: C): Promise<SaveRenegotiationOfferMutation> {
      return requester<SaveRenegotiationOfferMutation, SaveRenegotiationOfferMutationVariables>(SaveRenegotiationOfferDocument, variables, options) as Promise<SaveRenegotiationOfferMutation>;
    },
    unhideRenegotiationOffer(variables: UnhideRenegotiationOfferMutationVariables, options?: C): Promise<UnhideRenegotiationOfferMutation> {
      return requester<UnhideRenegotiationOfferMutation, UnhideRenegotiationOfferMutationVariables>(UnhideRenegotiationOfferDocument, variables, options) as Promise<UnhideRenegotiationOfferMutation>;
    },
    collections(variables: CollectionsQueryVariables, options?: C): Promise<CollectionsQuery> {
      return requester<CollectionsQuery, CollectionsQueryVariables>(CollectionsDocument, variables, options) as Promise<CollectionsQuery>;
    },
    collectionByContractAddress(variables: CollectionByContractAddressQueryVariables, options?: C): Promise<CollectionByContractAddressQuery> {
      return requester<CollectionByContractAddressQuery, CollectionByContractAddressQueryVariables>(CollectionByContractAddressDocument, variables, options) as Promise<CollectionByContractAddressQuery>;
    },
    collectionsIdByContractAddress(variables: CollectionsIdByContractAddressQueryVariables, options?: C): Promise<CollectionsIdByContractAddressQuery> {
      return requester<CollectionsIdByContractAddressQuery, CollectionsIdByContractAddressQueryVariables>(CollectionsIdByContractAddressDocument, variables, options) as Promise<CollectionsIdByContractAddressQuery>;
    },
    collectionIdBySlug(variables: CollectionIdBySlugQueryVariables, options?: C): Promise<CollectionIdBySlugQuery> {
      return requester<CollectionIdBySlugQuery, CollectionIdBySlugQueryVariables>(CollectionIdBySlugDocument, variables, options) as Promise<CollectionIdBySlugQuery>;
    },
    listListings(variables?: ListListingsQueryVariables, options?: C): Promise<ListListingsQuery> {
      return requester<ListListingsQuery, ListListingsQueryVariables>(ListListingsDocument, variables, options) as Promise<ListListingsQuery>;
    },
    listLoans(variables?: ListLoansQueryVariables, options?: C): Promise<ListLoansQuery> {
      return requester<ListLoansQuery, ListLoansQueryVariables>(ListLoansDocument, variables, options) as Promise<ListLoansQuery>;
    },
    nftIdByContractAddressAndTokenId(variables: NftIdByContractAddressAndTokenIdQueryVariables, options?: C): Promise<NftIdByContractAddressAndTokenIdQuery> {
      return requester<NftIdByContractAddressAndTokenIdQuery, NftIdByContractAddressAndTokenIdQueryVariables>(NftIdByContractAddressAndTokenIdDocument, variables, options) as Promise<NftIdByContractAddressAndTokenIdQuery>;
    },
    nftIdBySlugTokenId(variables: NftIdBySlugTokenIdQueryVariables, options?: C): Promise<NftIdBySlugTokenIdQuery> {
      return requester<NftIdBySlugTokenIdQuery, NftIdBySlugTokenIdQueryVariables>(NftIdBySlugTokenIdDocument, variables, options) as Promise<NftIdBySlugTokenIdQuery>;
    },
    ownedNfts(variables?: OwnedNftsQueryVariables, options?: C): Promise<OwnedNftsQuery> {
      return requester<OwnedNftsQuery, OwnedNftsQueryVariables>(OwnedNftsDocument, variables, options) as Promise<OwnedNftsQuery>;
    },
    listOffers(variables: ListOffersQueryVariables, options?: C): Promise<ListOffersQuery> {
      return requester<ListOffersQuery, ListOffersQueryVariables>(ListOffersDocument, variables, options) as Promise<ListOffersQuery>;
    },
    getSaleCalldata(variables: GetSaleCalldataQueryVariables, options?: C): Promise<GetSaleCalldataQuery> {
      return requester<GetSaleCalldataQuery, GetSaleCalldataQueryVariables>(GetSaleCalldataDocument, variables, options) as Promise<GetSaleCalldataQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;