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
  Signature: Hex;
  Void: any;
};

export type ActiveOfferNotification = Node & Notification & {
  __typename?: 'ActiveOfferNotification';
  createdOn: Scalars['DateTime'];
  id: Scalars['String'];
  notificationType: Scalars['String'];
  offer: Offer;
  readOn?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type Activity = {
  id: Scalars['String'];
  timestamp: Scalars['DateTime'];
  txHash?: Maybe<Scalars['Hash']>;
};

export type Asset = {
  __typename?: 'Asset';
  accessTypeName: Scalars['String'];
  cacheUrl?: Maybe<Scalars['String']>;
  contentTypeMime: Scalars['String'];
  data: Scalars['String'];
};

export type Auction = Node & {
  __typename?: 'Auction';
  duration?: Maybe<Scalars['BigInt']>;
  endTime?: Maybe<Scalars['DateTime']>;
  highestBid?: Maybe<Bid>;
  id: Scalars['String'];
  loan: MultiSourceLoan;
  originator?: Maybe<Scalars['Address']>;
  settler?: Maybe<Scalars['Address']>;
  startTime?: Maybe<Scalars['DateTime']>;
  status: Scalars['String'];
  triggerFee?: Maybe<Scalars['BigInt']>;
};

export type AuctionBidConfirmationNotification = Node & Notification & {
  __typename?: 'AuctionBidConfirmationNotification';
  auction: Auction;
  bid: Bid;
  createdOn: Scalars['DateTime'];
  id: Scalars['String'];
  loan: MultiSourceLoan;
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
  createdOn: Scalars['DateTime'];
  id: Scalars['String'];
  loan: MultiSourceLoan;
  notificationType: Scalars['String'];
  readOn?: Maybe<Scalars['DateTime']>;
  user: User;
};

export enum AuctionSortField {
  EndTime = 'END_TIME',
  Status = 'STATUS'
}

export type AuctionSortInput = {
  field: AuctionSortField;
  order: Ordering;
};

export type AuctionStartedNotification = Node & Notification & {
  __typename?: 'AuctionStartedNotification';
  auction: Auction;
  createdOn: Scalars['DateTime'];
  id: Scalars['String'];
  loan: MultiSourceLoan;
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
  createdOn: Scalars['DateTime'];
  id: Scalars['String'];
  loan: MultiSourceLoan;
  notificationType: Scalars['String'];
  readOn?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type Bid = Node & {
  __typename?: 'Bid';
  amount: Scalars['BigInt'];
  auction: Auction;
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

export type Cart = Node & {
  __typename?: 'Cart';
  createdDate: Scalars['DateTime'];
  id: Scalars['String'];
  items: NftConnection;
};


export type CartItemsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
};

export type Collection = Node & {
  __typename?: 'Collection';
  bannerImage?: Maybe<Asset>;
  collectionUrl?: Maybe<Scalars['String']>;
  contractData?: Maybe<ContractData>;
  description?: Maybe<Scalars['String']>;
  discordUrl?: Maybe<Scalars['String']>;
  externalUrl?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  image?: Maybe<Asset>;
  name?: Maybe<Scalars['String']>;
  nftsCount?: Maybe<Scalars['Int']>;
  royalties: Array<Royalty>;
  slug?: Maybe<Scalars['String']>;
  statistics: CollectionStatistics;
  twitterUsername?: Maybe<Scalars['String']>;
  verified: Scalars['Boolean'];
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

export type CollectionOffer = Node & Offer & {
  __typename?: 'CollectionOffer';
  aprBps: Scalars['BigInt'];
  borrowerAddress?: Maybe<Scalars['Address']>;
  capacity: Scalars['BigInt'];
  collection: Collection;
  consumedCapacity: Scalars['BigInt'];
  contractAddress: Scalars['Address'];
  createdDate?: Maybe<Scalars['DateTime']>;
  currency?: Maybe<Currency>;
  duration: Scalars['BigInt'];
  expirationTime: Scalars['BigInt'];
  fee: Scalars['BigInt'];
  hidden?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  lenderAddress?: Maybe<Scalars['Address']>;
  maxPrincipal: Scalars['BigInt'];
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
  createdDate: Scalars['DateTime'];
  currency: Currency;
  currencyAddress: Scalars['Address'];
  expiration?: Maybe<Scalars['DateTime']>;
  fees: Scalars['BigInt'];
  hidden: Scalars['Boolean'];
  id: Scalars['String'];
  isAsk: Scalars['Boolean'];
  maker: Scalars['Address'];
  marketPlace: Scalars['String'];
  netAmount: Scalars['BigInt'];
  nonce: Scalars['BigInt'];
  orderType: Scalars['String'];
  price: Scalars['BigInt'];
  signature: Scalars['Hash'];
  startTime: Scalars['DateTime'];
  status: Scalars['String'];
  timestamp: Scalars['DateTime'];
  txHash?: Maybe<Scalars['Hash']>;
};

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
  TotalVolume = 'TOTAL_VOLUME'
}

export type CollectionSortInput = {
  field: CollectionSortField;
  order: Ordering;
};

export type CollectionStatistics = {
  __typename?: 'CollectionStatistics';
  bestOffer?: Maybe<CurrencyAmount>;
  floorPrice?: Maybe<CurrencyAmount>;
  floorPrice7d?: Maybe<Scalars['Float']>;
  floorPrice30d?: Maybe<Scalars['Float']>;
  lastSale?: Maybe<Sale>;
  nftsCount?: Maybe<Scalars['Float']>;
  numberOfOffers: Scalars['Float'];
  numberOfPricedNfts: Scalars['Int'];
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
  totalVolume?: Maybe<Scalars['Float']>;
  totalVolume1d?: Maybe<Scalars['Float']>;
  totalVolume1m?: Maybe<Scalars['Float']>;
  totalVolume1w?: Maybe<Scalars['Float']>;
  totalVolume1y?: Maybe<Scalars['Float']>;
  totalVolume2m?: Maybe<Scalars['Float']>;
  totalVolume3m?: Maybe<Scalars['Float']>;
  totalVolume4m?: Maybe<Scalars['Float']>;
};


export type CollectionStatisticsNumberOfOffersArgs = {
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

export type ConsiderationInput = {
  endAmount: Scalars['BigInt'];
  identifierOrCriteria: Scalars['BigInt'];
  itemType: Scalars['Int'];
  recipient: Scalars['Address'];
  startAmount: Scalars['BigInt'];
  token: Scalars['Address'];
};

export type ContractData = Node & {
  __typename?: 'ContractData';
  blockchain: Scalars['String'];
  contractAddress: Scalars['Address'];
  createdDate: Scalars['DateTime'];
  creatorAddress?: Maybe<Scalars['Address']>;
  id: Scalars['String'];
};

export type Currency = Node & {
  __typename?: 'Currency';
  address: Scalars['Address'];
  decimals: Scalars['Int'];
  id: Scalars['String'];
  symbol: Scalars['String'];
};

export type CurrencyAmount = {
  __typename?: 'CurrencyAmount';
  amount: Scalars['Float'];
  currency: Currency;
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
  currency?: Maybe<Currency>;
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
  repaidActivity?: Maybe<LoanRepaid>;
  startTime: Scalars['DateTime'];
  status: Scalars['String'];
  timestamp: Scalars['DateTime'];
  txHash: Scalars['Hash'];
};

export type LoanActivity = {
  id: Scalars['String'];
  indexInBlock: Scalars['Int'];
  loan: Loan;
  loanId: Scalars['String'];
  multiSourceLoanHistory?: Maybe<MultiSourceLoanHistory>;
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
  LoanRepaid = 'LOAN_REPAID',
  LoanSentToAuction = 'LOAN_SENT_TO_AUCTION'
}

export type LoanAuctioned = LoanActivity & Node & {
  __typename?: 'LoanAuctioned';
  id: Scalars['String'];
  indexInBlock: Scalars['Int'];
  loan: Loan;
  loanId: Scalars['String'];
  loanPayments: Array<LoanPayment>;
  multiSourceLoanHistory?: Maybe<MultiSourceLoanHistory>;
  timestamp: Scalars['DateTime'];
  totalAuctioned: Scalars['BigInt'];
  txHash: Scalars['Hash'];
};

export type LoanAuctionedNotification = Node & Notification & {
  __typename?: 'LoanAuctionedNotification';
  auction: Auction;
  createdOn: Scalars['DateTime'];
  id: Scalars['String'];
  loan: MultiSourceLoan;
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
  notificationType: Scalars['String'];
  readOn?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type LoanDefaultedNotification = Node & Notification & {
  __typename?: 'LoanDefaultedNotification';
  createdOn: Scalars['DateTime'];
  id: Scalars['String'];
  loan: MultiSourceLoan;
  notificationType: Scalars['String'];
  readOn?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type LoanExtended = LoanActivity & Node & {
  __typename?: 'LoanExtended';
  id: Scalars['String'];
  indexInBlock: Scalars['Int'];
  loan: Loan;
  loanId: Scalars['String'];
  multiSourceLoanHistory?: Maybe<MultiSourceLoanHistory>;
  timestamp: Scalars['DateTime'];
  txHash: Scalars['Hash'];
};

export type LoanExtendedNotification = Node & Notification & {
  __typename?: 'LoanExtendedNotification';
  createdOn: Scalars['DateTime'];
  id: Scalars['String'];
  newHistory: MultiSourceLoanHistory;
  notificationType: Scalars['String'];
  previousHistory: MultiSourceLoanHistory;
  readOn?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type LoanForeclosed = LoanActivity & Node & {
  __typename?: 'LoanForeclosed';
  id: Scalars['String'];
  indexInBlock: Scalars['Int'];
  loan: Loan;
  loanId: Scalars['String'];
  multiSourceLoanHistory?: Maybe<MultiSourceLoanHistory>;
  timestamp: Scalars['DateTime'];
  txHash: Scalars['Hash'];
};

export type LoanInitiated = LoanActivity & Node & {
  __typename?: 'LoanInitiated';
  id: Scalars['String'];
  indexInBlock: Scalars['Int'];
  loan: Loan;
  loanId: Scalars['String'];
  multiSourceLoanHistory?: Maybe<MultiSourceLoanHistory>;
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

export type LoanRefinanced = LoanActivity & Node & {
  __typename?: 'LoanRefinanced';
  addedNewTranche: Scalars['Boolean'];
  id: Scalars['String'];
  indexInBlock: Scalars['Int'];
  isRenegotiation: Scalars['Boolean'];
  loan: Loan;
  loanId: Scalars['String'];
  multiSourceLoanHistory?: Maybe<MultiSourceLoanHistory>;
  timestamp: Scalars['DateTime'];
  txHash: Scalars['Hash'];
};

export type LoanRefinancedNotification = Node & Notification & {
  __typename?: 'LoanRefinancedNotification';
  createdOn: Scalars['DateTime'];
  id: Scalars['String'];
  newHistory: MultiSourceLoanHistory;
  notificationType: Scalars['String'];
  previousHistory: MultiSourceLoanHistory;
  readOn?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type LoanRepaid = LoanActivity & Node & {
  __typename?: 'LoanRepaid';
  id: Scalars['String'];
  indexInBlock: Scalars['Int'];
  loan: Loan;
  loanId: Scalars['String'];
  multiSourceLoanHistory?: Maybe<MultiSourceLoanHistory>;
  timestamp: Scalars['DateTime'];
  totalInterest: Scalars['BigInt'];
  txHash: Scalars['Hash'];
};

export type LoanRepaidNotification = Node & Notification & {
  __typename?: 'LoanRepaidNotification';
  createdOn: Scalars['DateTime'];
  id: Scalars['String'];
  loan: MultiSourceLoan;
  notificationType: Scalars['String'];
  readOn?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type LoanSentToAuction = LoanActivity & Node & {
  __typename?: 'LoanSentToAuction';
  id: Scalars['String'];
  indexInBlock: Scalars['Int'];
  liquidatorAddress: Scalars['Address'];
  loan: Loan;
  loanId: Scalars['String'];
  multiSourceLoanHistory?: Maybe<MultiSourceLoanHistory>;
  timestamp: Scalars['DateTime'];
  txHash: Scalars['Hash'];
};

export enum LoanSortField {
  AprBps = 'APR_BPS',
  Duration = 'DURATION',
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
  LoanDefaulted = 'LOAN_DEFAULTED',
  LoanForeclosed = 'LOAN_FORECLOSED',
  LoanInitiated = 'LOAN_INITIATED',
  LoanRepaid = 'LOAN_REPAID',
  LoanSentToAuction = 'LOAN_SENT_TO_AUCTION'
}

export type LostSource = Node & {
  __typename?: 'LostSource';
  accruedInterest: Scalars['BigInt'];
  aprBps: Scalars['BigInt'];
  duration: Scalars['BigInt'];
  id: Scalars['String'];
  lenderAddress: Scalars['String'];
  loan: MultiSourceLoan;
  originationFee: Scalars['BigInt'];
  principalAmount: Scalars['BigInt'];
  startTime: Scalars['DateTime'];
};

export type LostSourceNotification = Node & Notification & {
  __typename?: 'LostSourceNotification';
  createdOn: Scalars['DateTime'];
  id: Scalars['String'];
  lostSource: LostSource;
  notificationType: Scalars['String'];
  readOn?: Maybe<Scalars['DateTime']>;
  user: User;
};

export enum MarketplaceEnum {
  Gondi = 'GONDI',
  Nftfi = 'NFTFI'
}

export type MultiSourceLoan = Loan & Node & {
  __typename?: 'MultiSourceLoan';
  activities: Array<LoanActivity>;
  address: Scalars['Address'];
  auction?: Maybe<Auction>;
  blendedAprBps: Scalars['Float'];
  borrowerAddress: Scalars['Address'];
  currency?: Maybe<Currency>;
  duration: Scalars['BigInt'];
  id: Scalars['String'];
  indexInBlock: Scalars['Int'];
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
  renegotiationRequest?: Maybe<RenegotiationRequest>;
  repaidActivity?: Maybe<LoanRepaid>;
  sources: Array<Source>;
  startTime: Scalars['DateTime'];
  status: Scalars['String'];
  timestamp: Scalars['DateTime'];
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

export type MultiSourceLoanHistory = Node & {
  __typename?: 'MultiSourceLoanHistory';
  activity: LoanActivity;
  borrowerAddress: Scalars['String'];
  duration: Scalars['BigInt'];
  id: Scalars['String'];
  offerIds: Array<Scalars['String']>;
  principalAddress: Scalars['String'];
  principalAmount: Scalars['BigInt'];
  sources: Array<SourceHistory>;
  startTime: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addListingsOfNftsFromUser?: Maybe<Scalars['Void']>;
  addOrUpdateListing: Listing;
  addOrUpdateRenegotiationRequest: RenegotiationRequest;
  generateCollectionOfferToBeSigned: CollectionOffer;
  generateRenegotiationOfferToBeSigned: Renegotiation;
  generateSingleNftOfferToBeSigned: SingleNftOffer;
  hideAllOffers: Array<Offer>;
  hideOffer: Offer;
  hideRenegotiation: Renegotiation;
  hideSaleOffer: SingleNftOrder;
  markNotificationIdsAsRead?: Maybe<Scalars['Void']>;
  markNotificationsAsRead?: Maybe<Scalars['Void']>;
  removeListing: Listing;
  removeListingsOfNftsFromUser?: Maybe<Scalars['Void']>;
  removeRenegotiationRequest: RenegotiationRequest;
  saveRenegotiationSignedOffer: Renegotiation;
  saveSignedCollectionOffer: CollectionOffer;
  saveSignedSaleOffer: SingleNftOrder;
  saveSignedSingleNftOffer: SingleNftOffer;
  setReferral?: Maybe<Scalars['Void']>;
  showOffer: Offer;
  showRenegotiation: Renegotiation;
  showSaleOffer: SingleNftOrder;
};


export type MutationAddListingsOfNftsFromUserArgs = {
  desiredDuration?: InputMaybe<Scalars['Int']>;
  desiredPrincipalAddress?: InputMaybe<Scalars['Address']>;
};


export type MutationAddOrUpdateListingArgs = {
  desiredDuration?: InputMaybe<Scalars['Int']>;
  desiredPrincipalAddress?: InputMaybe<Scalars['Address']>;
  nftId: Scalars['Int'];
};


export type MutationAddOrUpdateRenegotiationRequestArgs = {
  desiredAprBps: Scalars['BigInt'];
  desiredDuration: Scalars['BigInt'];
  desiredPrincipalAmount: Scalars['BigInt'];
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


export type MutationHideRenegotiationArgs = {
  contractAddress?: InputMaybe<Scalars['Address']>;
  renegotiationId: Scalars['String'];
};


export type MutationHideSaleOfferArgs = {
  saleOfferId: Scalars['String'];
};


export type MutationMarkNotificationIdsAsReadArgs = {
  ids?: InputMaybe<Array<Scalars['Int']>>;
};


export type MutationRemoveListingArgs = {
  nftId: Scalars['Int'];
};


export type MutationRemoveRenegotiationRequestArgs = {
  loanId: Scalars['String'];
};


export type MutationSaveRenegotiationSignedOfferArgs = {
  signedRenegotiationInput: SignedRenegotiationOfferInput;
};


export type MutationSaveSignedCollectionOfferArgs = {
  signedOfferInput: CollectionSignedOfferInput;
};


export type MutationSaveSignedSaleOfferArgs = {
  signedOfferInput: SignedOrderInput;
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


export type MutationShowRenegotiationArgs = {
  contractAddress?: InputMaybe<Scalars['Address']>;
  renegotiationId: Scalars['String'];
};


export type MutationShowSaleOfferArgs = {
  saleOfferId: Scalars['String'];
};

export type Nft = Node & {
  __typename?: 'NFT';
  activeLoan?: Maybe<Loan>;
  collection?: Maybe<Collection>;
  createdDate: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  image?: Maybe<Asset>;
  isFlagged?: Maybe<Scalars['Boolean']>;
  listed?: Maybe<Listing>;
  marketPlaceOfPrice?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nftId: Scalars['String'];
  owner?: Maybe<Scalars['Address']>;
  price?: Maybe<Scalars['BigInt']>;
  priceCurrencyAddress?: Maybe<Scalars['String']>;
  rarityRank?: Maybe<Scalars['Int']>;
  rarityScore?: Maybe<Scalars['Float']>;
  statistics: NftStatistics;
  tokenId: Scalars['BigInt'];
  traits: Array<Trait>;
  url?: Maybe<Scalars['String']>;
  wrapsNfts?: Maybe<Array<Nft>>;
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

export type NewOfferNotification = Node & Notification & {
  __typename?: 'NewOfferNotification';
  createdOn: Scalars['DateTime'];
  id: Scalars['String'];
  notificationType: Scalars['String'];
  offer: Offer;
  readOn?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type NewRenegotiationOfferNotification = Node & Notification & {
  __typename?: 'NewRenegotiationOfferNotification';
  createdOn: Scalars['DateTime'];
  id: Scalars['String'];
  loan: MultiSourceLoan;
  notificationType: Scalars['String'];
  readOn?: Maybe<Scalars['DateTime']>;
  renegotiation: Renegotiation;
  user: User;
};

export enum NftSortField {
  Collection = 'COLLECTION',
  Name = 'NAME',
  OffersCount = 'OFFERS_COUNT',
  Status = 'STATUS'
}

export type NftSortInput = {
  field: NftSortField;
  order: Ordering;
  principalAddress?: InputMaybe<Scalars['Address']>;
};

export type NftStatistics = {
  __typename?: 'NftStatistics';
  bestOffer?: Maybe<CurrencyAmount>;
  floorPrice?: Maybe<CurrencyAmount>;
  floorPrice7d?: Maybe<Scalars['Float']>;
  floorPrice30d?: Maybe<Scalars['Float']>;
  lastSale?: Maybe<Sale>;
  loansTotalVolume: Scalars['BigInt'];
  numberOfOffers: Scalars['Float'];
  topTraitFloorPrice?: Maybe<CurrencyAmount>;
  totalVolume?: Maybe<Scalars['Float']>;
  totalVolume1d?: Maybe<Scalars['Float']>;
  totalVolume1m?: Maybe<Scalars['Float']>;
  totalVolume1w?: Maybe<Scalars['Float']>;
  totalVolume1y?: Maybe<Scalars['Float']>;
  totalVolume2m?: Maybe<Scalars['Float']>;
  totalVolume3m?: Maybe<Scalars['Float']>;
  totalVolume4m?: Maybe<Scalars['Float']>;
};


export type NftStatisticsLoansTotalVolumeArgs = {
  currencyAddress: Scalars['Address'];
};


export type NftStatisticsNumberOfOffersArgs = {
  currencyAddress: Scalars['Address'];
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
  borrowerAddress?: Maybe<Scalars['Address']>;
  capacity: Scalars['BigInt'];
  consumedCapacity: Scalars['BigInt'];
  contractAddress: Scalars['Address'];
  createdDate?: Maybe<Scalars['DateTime']>;
  currency?: Maybe<Currency>;
  duration: Scalars['BigInt'];
  expirationTime: Scalars['BigInt'];
  fee: Scalars['BigInt'];
  hidden?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  lenderAddress?: Maybe<Scalars['Address']>;
  maxPrincipal: Scalars['BigInt'];
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
  notificationType: Scalars['String'];
  offer: Offer;
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
  CreatedDate = 'CREATED_DATE',
  DailyInterest = 'DAILY_INTEREST',
  Duration = 'DURATION',
  Expiration = 'EXPIRATION',
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
};

export type Order = {
  createdDate: Scalars['DateTime'];
  currency: Currency;
  currencyAddress: Scalars['Address'];
  expiration?: Maybe<Scalars['DateTime']>;
  fees: Scalars['BigInt'];
  hidden: Scalars['Boolean'];
  id: Scalars['String'];
  isAsk: Scalars['Boolean'];
  maker: Scalars['Address'];
  marketPlace: Scalars['String'];
  netAmount: Scalars['BigInt'];
  nonce: Scalars['BigInt'];
  orderType: Scalars['String'];
  price: Scalars['BigInt'];
  signature: Scalars['Hash'];
  startTime: Scalars['DateTime'];
  status: Scalars['String'];
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

export enum Ordering {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type OutbidNotification = Node & Notification & {
  __typename?: 'OutbidNotification';
  auction: Auction;
  createdOn: Scalars['DateTime'];
  id: Scalars['String'];
  loan: MultiSourceLoan;
  newBid: Bid;
  notificationType: Scalars['String'];
  readOn?: Maybe<Scalars['DateTime']>;
  user: User;
  userBid: Bid;
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

export type Query = {
  __typename?: 'Query';
  getCollectionBySlug?: Maybe<Collection>;
  getCollectionsByContractAddress: Array<Collection>;
  getListingById?: Maybe<Listing>;
  getLoanById?: Maybe<Loan>;
  getNftByContractAddressAndTokenId?: Maybe<Nft>;
  getNftBySlugAndTokenId?: Maybe<Nft>;
  getPointsFromReferrals: Scalars['Int'];
  getReferredWallets: Scalars['Int'];
  getUserPointActivities: PointActivityConnection;
  getUserPoints: Scalars['Int'];
  listAuctions: AuctionConnection;
  listBestBidsForNft: Array<Order>;
  listBids: BidConnection;
  listCollections: CollectionConnection;
  listCollectionsWithListings: CollectionConnection;
  listCollectionsWithLoans: CollectionConnection;
  listListings: ListingConnection;
  listLoanActivities: LoanActivityConnection;
  listLoans: MultiSourceLoanConnection;
  listNftDelegations: DelegationConnection;
  listNftOffersAndRenegotiations: SingleNftOfferRenegotiationConnection;
  listNftsFromCollections: NftConnection;
  listNftsFromUser: NftConnection;
  listNotifications: NotificationConnection;
  listOffers: OfferConnection;
  listRenegotiations: RenegotiationConnection;
  listSaleOffers: OrderConnection;
  listSources: SourceLostSourceConnection;
  listUserSaleOffers: OrderConnection;
  me?: Maybe<User>;
};


export type QueryGetCollectionBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryGetCollectionsByContractAddressArgs = {
  contractAddress: Scalars['Address'];
};


export type QueryGetListingByIdArgs = {
  listingId: Scalars['Int'];
};


export type QueryGetLoanByIdArgs = {
  address: Scalars['String'];
  loanId: Scalars['Int'];
};


export type QueryGetNftByContractAddressAndTokenIdArgs = {
  contractAddress: Scalars['Address'];
  tokenId: Scalars['BigInt'];
};


export type QueryGetNftBySlugAndTokenIdArgs = {
  slug: Scalars['String'];
  tokenId: Scalars['BigInt'];
};


export type QueryGetUserPointActivitiesArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};


export type QueryListAuctionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  currencyAddress?: InputMaybe<Scalars['Address']>;
  first?: InputMaybe<Scalars['Int']>;
  sortBy?: InputMaybe<Array<AuctionSortInput>>;
  statuses?: InputMaybe<Array<AuctionStatus>>;
};


export type QueryListBestBidsForNftArgs = {
  currencyAddress: Scalars['String'];
  nftId: Scalars['Int'];
};


export type QueryListBidsArgs = {
  after?: InputMaybe<Scalars['String']>;
  auctionId?: InputMaybe<Scalars['String']>;
  bidder?: InputMaybe<Array<Scalars['String']>>;
  currencyAddress?: InputMaybe<Scalars['Address']>;
  first?: InputMaybe<Scalars['Int']>;
  onlyLatest?: Scalars['Boolean'];
  sortBy?: InputMaybe<Array<BidSortInput>>;
};


export type QueryListCollectionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  collections?: InputMaybe<Array<Scalars['Int']>>;
  first?: InputMaybe<Scalars['Int']>;
  searchTerm?: InputMaybe<Scalars['String']>;
  sortBy?: InputMaybe<Array<CollectionSortInput>>;
};


export type QueryListCollectionsWithListingsArgs = {
  after?: InputMaybe<Scalars['String']>;
  collections?: InputMaybe<Array<Scalars['Int']>>;
  first?: Scalars['Int'];
  searchTerm?: InputMaybe<Scalars['String']>;
};


export type QueryListCollectionsWithLoansArgs = {
  after?: InputMaybe<Scalars['String']>;
  collections?: InputMaybe<Array<Scalars['Int']>>;
  first?: Scalars['Int'];
  searchTerm?: InputMaybe<Scalars['String']>;
};


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


export type QueryListLoanActivitiesArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: Scalars['Int'];
  loanId?: InputMaybe<Scalars['String']>;
  sortBy?: InputMaybe<Array<LoanActivitySortInput>>;
  types?: InputMaybe<Array<LoanActivityType>>;
};


export type QueryListLoansArgs = {
  after?: InputMaybe<Scalars['String']>;
  borrowerAddress?: InputMaybe<Scalars['String']>;
  collections?: InputMaybe<Array<Scalars['Int']>>;
  contractAddresses?: InputMaybe<Array<Scalars['Address']>>;
  currencyAddress?: InputMaybe<Scalars['Address']>;
  excludeOwn?: InputMaybe<Scalars['Boolean']>;
  first?: Scalars['Int'];
  hideLocked?: InputMaybe<Scalars['Boolean']>;
  nfts?: InputMaybe<Array<Scalars['Int']>>;
  orderByStatuses?: InputMaybe<Scalars['Boolean']>;
  sortBy?: InputMaybe<Array<LoanSortInput>>;
  statuses?: InputMaybe<Array<LoanStatusType>>;
  terms?: InputMaybe<TermsFilter>;
};


export type QueryListNftDelegationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  contractAddress?: InputMaybe<Scalars['Address']>;
  first?: Scalars['Int'];
  nftId: Scalars['Int'];
};


export type QueryListNftOffersAndRenegotiationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  collections?: InputMaybe<Array<Scalars['Int']>>;
  currencyAddress?: InputMaybe<Scalars['Address']>;
  first?: InputMaybe<Scalars['Int']>;
  hidden?: InputMaybe<Scalars['Boolean']>;
  lenderAddress?: InputMaybe<Array<Scalars['String']>>;
  sortBy?: InputMaybe<OffersSortInput>;
  statuses?: InputMaybe<Array<OfferStatus>>;
  terms?: InputMaybe<TermsFilter>;
};


export type QueryListNftsFromCollectionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  collections: Array<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  onlyListed?: InputMaybe<Scalars['Boolean']>;
  searchTerm?: InputMaybe<Scalars['String']>;
  traitRanges?: InputMaybe<Array<TraitRangeOptionsInput>>;
  traits?: InputMaybe<Array<TraitKeyValueOptionsInput>>;
};


export type QueryListNftsFromUserArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  searchTerm?: InputMaybe<Scalars['String']>;
  sortBy?: InputMaybe<Array<NftSortInput>>;
  withLoans?: InputMaybe<Scalars['Boolean']>;
  withNoWraps?: InputMaybe<Scalars['Boolean']>;
};


export type QueryListNotificationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  notificationTypes?: InputMaybe<Array<NotificationType>>;
  onlyRead?: Scalars['Boolean'];
  onlyUnread?: Scalars['Boolean'];
};


export type QueryListOffersArgs = {
  after?: InputMaybe<Scalars['String']>;
  borrowerAddress?: InputMaybe<Scalars['String']>;
  collections?: InputMaybe<Array<Scalars['Int']>>;
  contractAddress?: InputMaybe<Scalars['Address']>;
  currencyAddress?: InputMaybe<Scalars['Address']>;
  first?: InputMaybe<Scalars['Int']>;
  hidden?: InputMaybe<Scalars['Boolean']>;
  lenderAddress?: InputMaybe<Array<Scalars['String']>>;
  nfts?: InputMaybe<Array<Scalars['Int']>>;
  onlyCollectionOffers?: InputMaybe<Scalars['Boolean']>;
  onlySingleNftOffers?: InputMaybe<Scalars['Boolean']>;
  sortBy?: InputMaybe<Array<OffersSortInput>>;
  statuses?: InputMaybe<Array<OfferStatus>>;
  terms?: InputMaybe<TermsFilter>;
  worseOffers?: InputMaybe<Scalars['Boolean']>;
};


export type QueryListRenegotiationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  collections?: InputMaybe<Array<Scalars['Int']>>;
  first?: InputMaybe<Scalars['Int']>;
  hidden?: InputMaybe<Scalars['Boolean']>;
  loanId?: InputMaybe<Scalars['String']>;
  sortBy?: InputMaybe<Array<OffersSortInput>>;
  statuses?: InputMaybe<Array<OfferStatus>>;
  terms?: InputMaybe<RefinanceTermsFilter>;
};


export type QueryListSaleOffersArgs = {
  after?: InputMaybe<Scalars['String']>;
  bidder?: InputMaybe<Array<Scalars['String']>>;
  first?: InputMaybe<Scalars['Int']>;
};


export type QueryListSourcesArgs = {
  after?: InputMaybe<Scalars['String']>;
  currencyAddress?: InputMaybe<Scalars['Address']>;
  first?: Scalars['Int'];
  includeLost?: InputMaybe<Scalars['Boolean']>;
  lenderAddress?: InputMaybe<Array<Scalars['String']>>;
  sortBy?: InputMaybe<Array<SourceSortInput>>;
  statuses?: InputMaybe<Array<LoanStatusType>>;
  terms?: InputMaybe<TermsFilter>;
};


export type QueryListUserSaleOffersArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
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

export type Renegotiation = Node & {
  __typename?: 'Renegotiation';
  aprBps: Scalars['BigInt'];
  createdDate?: Maybe<Scalars['DateTime']>;
  duration: Scalars['BigInt'];
  expirationTime: Scalars['BigInt'];
  feeAmount: Scalars['BigInt'];
  hidden?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
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
  desiredAprBps: Scalars['BigInt'];
  desiredDuration: Scalars['BigInt'];
  desiredPrincipalAmount: Scalars['BigInt'];
  id: Scalars['String'];
  loanId: Scalars['String'];
};

export type RenegotiationRequestedNotification = Node & Notification & {
  __typename?: 'RenegotiationRequestedNotification';
  aprBps: Scalars['BigInt'];
  createdOn: Scalars['DateTime'];
  duration: Scalars['BigInt'];
  id: Scalars['String'];
  loan: MultiSourceLoan;
  loanId: Scalars['String'];
  notificationType: Scalars['String'];
  principalAmount: Scalars['BigInt'];
  readOn?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type Royalty = {
  __typename?: 'Royalty';
  beneficiary: Scalars['String'];
  percentage: Scalars['Float'];
};

export type Sale = Activity & Node & {
  __typename?: 'Sale';
  id: Scalars['String'];
  nft: Nft;
  order: Order;
  taker: Scalars['String'];
  timestamp: Scalars['DateTime'];
  txHash?: Maybe<Scalars['Hash']>;
};

export type SaleOfferInput = {
  endAmount: Scalars['BigInt'];
  identifierOrCriteria: Scalars['BigInt'];
  itemType: Scalars['Int'];
  startAmount: Scalars['BigInt'];
  token: Scalars['Address'];
};

export type SignedOrderInput = {
  conduitKey: Scalars['Hash'];
  consideration: Array<ConsiderationInput>;
  counter: Scalars['BigInt'];
  endTime: Scalars['BigInt'];
  offer: Array<SaleOfferInput>;
  offerer: Scalars['Address'];
  orderType: Scalars['Int'];
  salt: Scalars['BigInt'];
  signature: Scalars['Signature'];
  startTime: Scalars['BigInt'];
  zone: Scalars['Address'];
  zoneHash: Scalars['Hash'];
};

export type SignedRenegotiationOfferInput = {
  aprBps: Scalars['BigInt'];
  duration: Scalars['BigInt'];
  expirationTime: Scalars['BigInt'];
  feeAmount: Scalars['BigInt'];
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
  borrowerAddress?: Maybe<Scalars['Address']>;
  capacity: Scalars['BigInt'];
  consumedCapacity: Scalars['BigInt'];
  contractAddress: Scalars['Address'];
  createdDate?: Maybe<Scalars['DateTime']>;
  currency?: Maybe<Currency>;
  duration: Scalars['BigInt'];
  expirationTime: Scalars['BigInt'];
  fee: Scalars['BigInt'];
  hidden?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  lenderAddress?: Maybe<Scalars['Address']>;
  maxPrincipal: Scalars['BigInt'];
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

export type SingleNftOfferInput = {
  aprBps: Scalars['BigInt'];
  borrowerAddress: Scalars['Address'];
  capacity: Scalars['BigInt'];
  contractAddress: Scalars['Address'];
  duration: Scalars['BigInt'];
  expirationTime: Scalars['BigInt'];
  fee: Scalars['BigInt'];
  lenderAddress: Scalars['Address'];
  maxTrancheFloor?: InputMaybe<Scalars['BigInt']>;
  nftId: Scalars['Int'];
  offerValidators: Array<OfferValidatorInput>;
  principalAddress: Scalars['Address'];
  principalAmount: Scalars['BigInt'];
  requiresLiquidation?: InputMaybe<Scalars['Boolean']>;
  signerAddress?: InputMaybe<Scalars['Address']>;
};

export type SingleNftOfferRenegotiation = Renegotiation | SingleNftOffer;

export type SingleNftOfferRenegotiationConnection = {
  __typename?: 'SingleNFTOfferRenegotiationConnection';
  edges: Array<SingleNftOfferRenegotiationEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type SingleNftOfferRenegotiationEdge = {
  __typename?: 'SingleNFTOfferRenegotiationEdge';
  cursor: Scalars['String'];
  node: SingleNftOfferRenegotiation;
};

export type SingleNftOrder = Activity & Node & Order & {
  __typename?: 'SingleNFTOrder';
  createdDate: Scalars['DateTime'];
  currency: Currency;
  currencyAddress: Scalars['Address'];
  expiration?: Maybe<Scalars['DateTime']>;
  fees: Scalars['BigInt'];
  hidden: Scalars['Boolean'];
  id: Scalars['String'];
  isAsk: Scalars['Boolean'];
  maker: Scalars['Address'];
  marketPlace: Scalars['String'];
  netAmount: Scalars['BigInt'];
  nft: Nft;
  nonce: Scalars['BigInt'];
  orderType: Scalars['String'];
  price: Scalars['BigInt'];
  signature: Scalars['Hash'];
  startTime: Scalars['DateTime'];
  status: Scalars['String'];
  timestamp: Scalars['DateTime'];
  txHash?: Maybe<Scalars['Hash']>;
};

export type SingleNftSignedOfferInput = {
  aprBps: Scalars['BigInt'];
  borrowerAddress: Scalars['Address'];
  capacity: Scalars['BigInt'];
  contractAddress: Scalars['Address'];
  duration: Scalars['BigInt'];
  expirationTime: Scalars['BigInt'];
  fee: Scalars['BigInt'];
  lenderAddress: Scalars['Address'];
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

export type Source = Node & {
  __typename?: 'Source';
  accruedInterest: Scalars['BigInt'];
  aprBps: Scalars['BigInt'];
  id: Scalars['String'];
  lenderAddress: Scalars['String'];
  loan: MultiSourceLoan;
  loanId: Scalars['String'];
  loanIndex?: Maybe<Scalars['Int']>;
  loanReferenceId: Scalars['String'];
  originationFee: Scalars['BigInt'];
  principalAmount: Scalars['BigInt'];
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
  OriginationFee = 'ORIGINATION_FEE',
  PrincipalAmount = 'PRINCIPAL_AMOUNT',
  StartTime = 'START_TIME'
}

export type SourceSortInput = {
  field: SourceSortField;
  order: Ordering;
};

export type TermsFilter = {
  aprBps?: InputMaybe<Interval>;
  duration?: InputMaybe<Interval>;
  fee?: InputMaybe<Interval>;
  maxPrincipal?: InputMaybe<Interval>;
  netPrincipal?: InputMaybe<Interval>;
  principal?: InputMaybe<Interval>;
};

export type Trait = {
  __typename?: 'Trait';
  collectionId: Scalars['String'];
  statistics: CollectionStatistics;
  type: Scalars['String'];
  value: Scalars['String'];
};

export type TraitKeyValueOptionsInput = {
  key: Scalars['String'];
  values: Array<Scalars['String']>;
};

export type TraitRangeOptionsInput = {
  key: Scalars['String'];
  range: RangeInput;
};

export type UnderfundedOfferNotification = Node & Notification & {
  __typename?: 'UnderfundedOfferNotification';
  createdOn: Scalars['DateTime'];
  id: Scalars['String'];
  notificationType: Scalars['String'];
  offer: Offer;
  readOn?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type User = Node & {
  __typename?: 'User';
  about?: Maybe<Scalars['String']>;
  beta: Scalars['Boolean'];
  blockchain: Scalars['String'];
  cart: Cart;
  cartId?: Maybe<Scalars['Int']>;
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

export type SaleOfferInfoFragment = { __typename?: 'SingleNFTOrder', id: string, netAmount: bigint, status: string, marketPlace: string, fees: bigint, maker: Address, expiration?: Date | null, createdDate: Date, startTime: Date, hidden: boolean, signature: Hash, currencyAddress: Address, nonce: bigint };

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


export type GenerateCollectionOfferHashMutation = { __typename?: 'Mutation', offer: { __typename?: 'CollectionOffer', offerHash?: Hash | null, offerId: bigint, lenderAddress?: Address | null, signerAddress?: Address | null, borrowerAddress?: Address | null, validators: Array<{ __typename?: 'OfferValidator', validator: Address, arguments: Hex }>, collection: { __typename?: 'Collection', contractData?: { __typename?: 'ContractData', contractAddress: Address } | null } } };

export type SaveCollectionOfferMutationVariables = Exact<{
  offer: CollectionSignedOfferInput;
}>;


export type SaveCollectionOfferMutation = { __typename?: 'Mutation', offer: { __typename?: 'CollectionOffer', id: string, status: string, collection: { __typename?: 'Collection', contractData?: { __typename?: 'ContractData', contractAddress: Address } | null } } };

export type HideOfferMutationVariables = Exact<{
  contract: Scalars['Address'];
  id: Scalars['String'];
}>;


export type HideOfferMutation = { __typename?: 'Mutation', hideOffer: { __typename?: 'CollectionOffer', id: string } | { __typename?: 'SingleNFTOffer', id: string } };

export type GenerateSingleNftOfferHashMutationVariables = Exact<{
  offerInput: SingleNftOfferInput;
}>;


export type GenerateSingleNftOfferHashMutation = { __typename?: 'Mutation', offer: { __typename?: 'SingleNFTOffer', offerHash?: Hash | null, offerId: bigint, lenderAddress?: Address | null, signerAddress?: Address | null, borrowerAddress?: Address | null, validators: Array<{ __typename?: 'OfferValidator', validator: Address, arguments: Hex }>, nft: { __typename?: 'NFT', tokenId: bigint, collection?: { __typename?: 'Collection', contractData?: { __typename?: 'ContractData', contractAddress: Address } | null } | null } } };

export type SaveSingleNftOfferMutationVariables = Exact<{
  offer: SingleNftSignedOfferInput;
}>;


export type SaveSingleNftOfferMutation = { __typename?: 'Mutation', offer: { __typename?: 'SingleNFTOffer', id: string, status: string, nft: { __typename?: 'NFT', tokenId: bigint, collection?: { __typename?: 'Collection', contractData?: { __typename?: 'ContractData', contractAddress: Address } | null } | null } } };

export type UnhideOfferMutationVariables = Exact<{
  contract: Scalars['Address'];
  id: Scalars['String'];
}>;


export type UnhideOfferMutation = { __typename?: 'Mutation', showOffer: { __typename?: 'CollectionOffer', id: string } | { __typename?: 'SingleNFTOffer', id: string } };

export type GenerateRenegotiationOfferHashMutationVariables = Exact<{
  renegotiationInput: RenegotiationOfferInput;
}>;


export type GenerateRenegotiationOfferHashMutation = { __typename?: 'Mutation', offer: { __typename?: 'Renegotiation', loanId: bigint, renegotiationId: bigint, offerHash?: Hash | null, lenderAddress?: Address | null, signerAddress?: Address | null, nft: { __typename?: 'NFT', tokenId: bigint, collection?: { __typename?: 'Collection', contractData?: { __typename?: 'ContractData', contractAddress: Address } | null } | null } } };

export type HideRenegotiationOfferMutationVariables = Exact<{
  id: Scalars['String'];
  contractAddress: Scalars['Address'];
}>;


export type HideRenegotiationOfferMutation = { __typename?: 'Mutation', hideRenegotiation: { __typename?: 'Renegotiation', id: string } };

export type SaveRenegotiationOfferMutationVariables = Exact<{
  offer: SignedRenegotiationOfferInput;
}>;


export type SaveRenegotiationOfferMutation = { __typename?: 'Mutation', offer: { __typename?: 'Renegotiation', id: string, status: string } };

export type UnhideRenegotiationOfferMutationVariables = Exact<{
  id: Scalars['String'];
  contractAddress: Scalars['Address'];
}>;


export type UnhideRenegotiationOfferMutation = { __typename?: 'Mutation', showRenegotiation: { __typename?: 'Renegotiation', id: string } };

export type HideSaleOfferMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type HideSaleOfferMutation = { __typename?: 'Mutation', hideSaleOffer: { __typename?: 'SingleNFTOrder', id: string } };

export type ListBestBidsForNftQueryVariables = Exact<{
  nftId: Scalars['Int'];
  currencyAddress: Scalars['String'];
}>;


export type ListBestBidsForNftQuery = { __typename?: 'Query', bids: Array<{ __typename?: 'CollectionOrder', id: string, netAmount: bigint, status: string, marketPlace: string, fees: bigint, maker: Address, expiration?: Date | null, createdDate: Date, hidden: boolean, signature: Hash, currencyAddress: Address, startTime: Date, nonce: bigint } | { __typename?: 'SingleNFTOrder', id: string, netAmount: bigint, status: string, marketPlace: string, fees: bigint, maker: Address, expiration?: Date | null, createdDate: Date, hidden: boolean, signature: Hash, currencyAddress: Address, startTime: Date, nonce: bigint }> };

export type SaveSignedSaleOfferMutationVariables = Exact<{
  offer: SignedOrderInput;
}>;


export type SaveSignedSaleOfferMutation = { __typename?: 'Mutation', offer: { __typename?: 'SingleNFTOrder', id: string, status: string } };

export type UnhideSaleOfferMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type UnhideSaleOfferMutation = { __typename?: 'Mutation', showSaleOffer: { __typename?: 'SingleNFTOrder', id: string } };

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


export type ListListingsQuery = { __typename?: 'Query', result: { __typename?: 'ListingConnection', pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean }, edges: Array<{ __typename?: 'ListingEdge', node: { __typename?: 'Listing', id: string, marketplaceName: MarketplaceEnum, createdDate: Date, user: { __typename?: 'User', walletAddress: Address }, nft: { __typename?: 'NFT', id: string, tokenId: bigint, collection?: { __typename?: 'Collection', id: string, slug?: string | null, contractData?: { __typename?: 'ContractData', contractAddress: Address } | null } | null } } }> } };

export type ListLoansQueryVariables = Exact<{
  borrowerAddress?: InputMaybe<Scalars['String']>;
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


export type ListLoansQuery = { __typename?: 'Query', loans: { __typename?: 'MultiSourceLoanConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean }, edges: Array<{ __typename?: 'MultiSourceLoanEdge', node: { __typename?: 'MultiSourceLoan', id: string, address: Address, loanId: number, timestamp: Date, txHash: Hash, indexInBlock: number, borrowerAddress: Address, principalAddress: Address, startTime: Date, duration: bigint, status: string, principalAmount: bigint, blendedAprBps: number, totalOriginationFee: bigint, offer: { __typename?: 'CollectionOffer', offerId: bigint, signerAddress?: Address | null } | { __typename?: 'SingleNFTOffer', offerId: bigint, signerAddress?: Address | null }, currency?: { __typename?: 'Currency', symbol: string, decimals: number, address: Address } | null, repaidActivity?: { __typename?: 'LoanRepaid', totalInterest: bigint, timestamp: Date } | null, nft: { __typename?: 'NFT', id: string, name?: string | null, tokenId: bigint, nftId: string, owner?: Address | null, image?: { __typename?: 'Asset', data: string, cacheUrl?: string | null, contentTypeMime: string, accessTypeName: string } | null, collection?: { __typename?: 'Collection', id: string, slug?: string | null, name?: string | null, nftsCount?: number | null, contractData?: { __typename?: 'ContractData', contractAddress: Address } | null } | null }, sources: Array<{ __typename?: 'Source', id: string, loanId: string, originationFee: bigint, principalAmount: bigint, lenderAddress: string, accruedInterest: bigint, aprBps: bigint, startTime: Date }> } }> } };

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

export type ListOffersQueryVariables = Exact<{
  borrowerAddress?: InputMaybe<Scalars['String']>;
  lenderAddress?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
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


export type ListOffersQuery = { __typename?: 'Query', result: { __typename?: 'OfferConnection', pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean }, edges: Array<{ __typename?: 'OfferEdge', node: { __typename?: 'CollectionOffer', id: string, offerId: bigint, lenderAddress?: Address | null, borrowerAddress?: Address | null, signerAddress?: Address | null, contractAddress: Address, requiresLiquidation?: boolean | null, principalAddress: Address, principalAmount: bigint, aprBps: bigint, fee: bigint, capacity: bigint, expirationTime: bigint, duration: bigint, status: string, offerHash?: Hash | null, signature?: Hex | null, createdDate?: Date | null, repayment: bigint, hidden?: boolean | null, collection: { __typename?: 'Collection', id: string, slug?: string | null, contractData?: { __typename?: 'ContractData', contractAddress: Address } | null }, currency?: { __typename?: 'Currency', symbol: string, decimals: number, address: Address } | null, validators: Array<{ __typename?: 'OfferValidator', arguments: Hex, validator: Address }> } | { __typename?: 'SingleNFTOffer', id: string, offerId: bigint, lenderAddress?: Address | null, borrowerAddress?: Address | null, signerAddress?: Address | null, contractAddress: Address, requiresLiquidation?: boolean | null, principalAddress: Address, principalAmount: bigint, aprBps: bigint, fee: bigint, capacity: bigint, expirationTime: bigint, duration: bigint, status: string, offerHash?: Hash | null, signature?: Hex | null, createdDate?: Date | null, repayment: bigint, hidden?: boolean | null, nft: { __typename?: 'NFT', id: string, tokenId: bigint, collection?: { __typename?: 'Collection', id: string, slug?: string | null, contractData?: { __typename?: 'ContractData', contractAddress: Address } | null } | null }, currency?: { __typename?: 'Currency', symbol: string, decimals: number, address: Address } | null, validators: Array<{ __typename?: 'OfferValidator', arguments: Hex, validator: Address }> } }> } };

export type ActiveOfferNotificationKeySpecifier = ('createdOn' | 'id' | 'notificationType' | 'offer' | 'readOn' | 'user' | ActiveOfferNotificationKeySpecifier)[];
export type ActiveOfferNotificationFieldPolicy = {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	offer?: FieldPolicy<any> | FieldReadFunction<any>,
	readOn?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ActivityKeySpecifier = ('id' | 'timestamp' | 'txHash' | ActivityKeySpecifier)[];
export type ActivityFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AssetKeySpecifier = ('accessTypeName' | 'cacheUrl' | 'contentTypeMime' | 'data' | AssetKeySpecifier)[];
export type AssetFieldPolicy = {
	accessTypeName?: FieldPolicy<any> | FieldReadFunction<any>,
	cacheUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	contentTypeMime?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AuctionKeySpecifier = ('duration' | 'endTime' | 'highestBid' | 'id' | 'loan' | 'originator' | 'settler' | 'startTime' | 'status' | 'triggerFee' | AuctionKeySpecifier)[];
export type AuctionFieldPolicy = {
	duration?: FieldPolicy<any> | FieldReadFunction<any>,
	endTime?: FieldPolicy<any> | FieldReadFunction<any>,
	highestBid?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	originator?: FieldPolicy<any> | FieldReadFunction<any>,
	settler?: FieldPolicy<any> | FieldReadFunction<any>,
	startTime?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	triggerFee?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AuctionBidConfirmationNotificationKeySpecifier = ('auction' | 'bid' | 'createdOn' | 'id' | 'loan' | 'notificationType' | 'readOn' | 'user' | AuctionBidConfirmationNotificationKeySpecifier)[];
export type AuctionBidConfirmationNotificationFieldPolicy = {
	auction?: FieldPolicy<any> | FieldReadFunction<any>,
	bid?: FieldPolicy<any> | FieldReadFunction<any>,
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
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
export type AuctionEndedNotificationKeySpecifier = ('auction' | 'createdOn' | 'id' | 'loan' | 'notificationType' | 'readOn' | 'user' | AuctionEndedNotificationKeySpecifier)[];
export type AuctionEndedNotificationFieldPolicy = {
	auction?: FieldPolicy<any> | FieldReadFunction<any>,
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	readOn?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AuctionStartedNotificationKeySpecifier = ('auction' | 'createdOn' | 'id' | 'loan' | 'notificationType' | 'readOn' | 'user' | AuctionStartedNotificationKeySpecifier)[];
export type AuctionStartedNotificationFieldPolicy = {
	auction?: FieldPolicy<any> | FieldReadFunction<any>,
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	readOn?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AuctionWonNotificationKeySpecifier = ('auction' | 'createdOn' | 'id' | 'loan' | 'notificationType' | 'readOn' | 'user' | AuctionWonNotificationKeySpecifier)[];
export type AuctionWonNotificationFieldPolicy = {
	auction?: FieldPolicy<any> | FieldReadFunction<any>,
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	readOn?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BidKeySpecifier = ('amount' | 'auction' | 'bidder' | 'id' | 'indexInBlock' | 'timestamp' | 'txHash' | BidKeySpecifier)[];
export type BidFieldPolicy = {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	auction?: FieldPolicy<any> | FieldReadFunction<any>,
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
export type CartKeySpecifier = ('createdDate' | 'id' | 'items' | CartKeySpecifier)[];
export type CartFieldPolicy = {
	createdDate?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	items?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CollectionKeySpecifier = ('bannerImage' | 'collectionUrl' | 'contractData' | 'description' | 'discordUrl' | 'externalUrl' | 'id' | 'image' | 'name' | 'nftsCount' | 'royalties' | 'slug' | 'statistics' | 'twitterUsername' | 'verified' | CollectionKeySpecifier)[];
export type CollectionFieldPolicy = {
	bannerImage?: FieldPolicy<any> | FieldReadFunction<any>,
	collectionUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	contractData?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	discordUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	externalUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	image?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	nftsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	royalties?: FieldPolicy<any> | FieldReadFunction<any>,
	slug?: FieldPolicy<any> | FieldReadFunction<any>,
	statistics?: FieldPolicy<any> | FieldReadFunction<any>,
	twitterUsername?: FieldPolicy<any> | FieldReadFunction<any>,
	verified?: FieldPolicy<any> | FieldReadFunction<any>
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
export type CollectionOfferKeySpecifier = ('aprBps' | 'borrowerAddress' | 'capacity' | 'collection' | 'consumedCapacity' | 'contractAddress' | 'createdDate' | 'currency' | 'duration' | 'expirationTime' | 'fee' | 'hidden' | 'id' | 'lenderAddress' | 'maxPrincipal' | 'maxTrancheFloor' | 'netPrincipal' | 'offerHash' | 'offerId' | 'principalAddress' | 'principalAmount' | 'repayment' | 'requiresLiquidation' | 'signature' | 'signerAddress' | 'statistics' | 'status' | 'validators' | CollectionOfferKeySpecifier)[];
export type CollectionOfferFieldPolicy = {
	aprBps?: FieldPolicy<any> | FieldReadFunction<any>,
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
	maxPrincipal?: FieldPolicy<any> | FieldReadFunction<any>,
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
export type CollectionOrderKeySpecifier = ('collection' | 'createdDate' | 'currency' | 'currencyAddress' | 'expiration' | 'fees' | 'hidden' | 'id' | 'isAsk' | 'maker' | 'marketPlace' | 'netAmount' | 'nonce' | 'orderType' | 'price' | 'signature' | 'startTime' | 'status' | 'timestamp' | 'txHash' | CollectionOrderKeySpecifier)[];
export type CollectionOrderFieldPolicy = {
	collection?: FieldPolicy<any> | FieldReadFunction<any>,
	createdDate?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	currencyAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	expiration?: FieldPolicy<any> | FieldReadFunction<any>,
	fees?: FieldPolicy<any> | FieldReadFunction<any>,
	hidden?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isAsk?: FieldPolicy<any> | FieldReadFunction<any>,
	maker?: FieldPolicy<any> | FieldReadFunction<any>,
	marketPlace?: FieldPolicy<any> | FieldReadFunction<any>,
	netAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	nonce?: FieldPolicy<any> | FieldReadFunction<any>,
	orderType?: FieldPolicy<any> | FieldReadFunction<any>,
	price?: FieldPolicy<any> | FieldReadFunction<any>,
	signature?: FieldPolicy<any> | FieldReadFunction<any>,
	startTime?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CollectionStatisticsKeySpecifier = ('bestOffer' | 'floorPrice' | 'floorPrice7d' | 'floorPrice30d' | 'lastSale' | 'nftsCount' | 'numberOfOffers' | 'numberOfPricedNfts' | 'percentageInOutstandingLoans' | 'repaymentRate' | 'totalLoanVolume' | 'totalLoanVolume1d' | 'totalLoanVolume1m' | 'totalLoanVolume1w' | 'totalLoanVolume1y' | 'totalLoanVolume2m' | 'totalLoanVolume3m' | 'totalLoanVolume4m' | 'totalVolume' | 'totalVolume1d' | 'totalVolume1m' | 'totalVolume1w' | 'totalVolume1y' | 'totalVolume2m' | 'totalVolume3m' | 'totalVolume4m' | CollectionStatisticsKeySpecifier)[];
export type CollectionStatisticsFieldPolicy = {
	bestOffer?: FieldPolicy<any> | FieldReadFunction<any>,
	floorPrice?: FieldPolicy<any> | FieldReadFunction<any>,
	floorPrice7d?: FieldPolicy<any> | FieldReadFunction<any>,
	floorPrice30d?: FieldPolicy<any> | FieldReadFunction<any>,
	lastSale?: FieldPolicy<any> | FieldReadFunction<any>,
	nftsCount?: FieldPolicy<any> | FieldReadFunction<any>,
	numberOfOffers?: FieldPolicy<any> | FieldReadFunction<any>,
	numberOfPricedNfts?: FieldPolicy<any> | FieldReadFunction<any>,
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
	totalVolume?: FieldPolicy<any> | FieldReadFunction<any>,
	totalVolume1d?: FieldPolicy<any> | FieldReadFunction<any>,
	totalVolume1m?: FieldPolicy<any> | FieldReadFunction<any>,
	totalVolume1w?: FieldPolicy<any> | FieldReadFunction<any>,
	totalVolume1y?: FieldPolicy<any> | FieldReadFunction<any>,
	totalVolume2m?: FieldPolicy<any> | FieldReadFunction<any>,
	totalVolume3m?: FieldPolicy<any> | FieldReadFunction<any>,
	totalVolume4m?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ContractDataKeySpecifier = ('blockchain' | 'contractAddress' | 'createdDate' | 'creatorAddress' | 'id' | ContractDataKeySpecifier)[];
export type ContractDataFieldPolicy = {
	blockchain?: FieldPolicy<any> | FieldReadFunction<any>,
	contractAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	createdDate?: FieldPolicy<any> | FieldReadFunction<any>,
	creatorAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CurrencyKeySpecifier = ('address' | 'decimals' | 'id' | 'symbol' | CurrencyKeySpecifier)[];
export type CurrencyFieldPolicy = {
	address?: FieldPolicy<any> | FieldReadFunction<any>,
	decimals?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	symbol?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CurrencyAmountKeySpecifier = ('amount' | 'currency' | CurrencyAmountKeySpecifier)[];
export type CurrencyAmountFieldPolicy = {
	amount?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>
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
export type LinkedWalletsKeySpecifier = ('id' | 'pending' | 'shouldAccept' | 'walletAddress' | LinkedWalletsKeySpecifier)[];
export type LinkedWalletsFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	pending?: FieldPolicy<any> | FieldReadFunction<any>,
	shouldAccept?: FieldPolicy<any> | FieldReadFunction<any>,
	walletAddress?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ListingKeySpecifier = ('createdDate' | 'desiredDuration' | 'desiredPrincipalAddress' | 'id' | 'marketplaceName' | 'nft' | 'user' | ListingKeySpecifier)[];
export type ListingFieldPolicy = {
	createdDate?: FieldPolicy<any> | FieldReadFunction<any>,
	desiredDuration?: FieldPolicy<any> | FieldReadFunction<any>,
	desiredPrincipalAddress?: FieldPolicy<any> | FieldReadFunction<any>,
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
export type LoanKeySpecifier = ('activities' | 'address' | 'borrowerAddress' | 'currency' | 'duration' | 'id' | 'indexInBlock' | 'loanId' | 'offer' | 'offerIds' | 'principalAddress' | 'repaidActivity' | 'startTime' | 'status' | 'timestamp' | 'txHash' | LoanKeySpecifier)[];
export type LoanFieldPolicy = {
	activities?: FieldPolicy<any> | FieldReadFunction<any>,
	address?: FieldPolicy<any> | FieldReadFunction<any>,
	borrowerAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	duration?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	offer?: FieldPolicy<any> | FieldReadFunction<any>,
	offerIds?: FieldPolicy<any> | FieldReadFunction<any>,
	principalAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	repaidActivity?: FieldPolicy<any> | FieldReadFunction<any>,
	startTime?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoanActivityKeySpecifier = ('id' | 'indexInBlock' | 'loan' | 'loanId' | 'multiSourceLoanHistory' | 'timestamp' | 'txHash' | LoanActivityKeySpecifier)[];
export type LoanActivityFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	multiSourceLoanHistory?: FieldPolicy<any> | FieldReadFunction<any>,
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
export type LoanAuctionedKeySpecifier = ('id' | 'indexInBlock' | 'loan' | 'loanId' | 'loanPayments' | 'multiSourceLoanHistory' | 'timestamp' | 'totalAuctioned' | 'txHash' | LoanAuctionedKeySpecifier)[];
export type LoanAuctionedFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	loanPayments?: FieldPolicy<any> | FieldReadFunction<any>,
	multiSourceLoanHistory?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	totalAuctioned?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoanAuctionedNotificationKeySpecifier = ('auction' | 'createdOn' | 'id' | 'loan' | 'notificationType' | 'readOn' | 'user' | LoanAuctionedNotificationKeySpecifier)[];
export type LoanAuctionedNotificationFieldPolicy = {
	auction?: FieldPolicy<any> | FieldReadFunction<any>,
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	readOn?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoanDefaultReminderNotificationKeySpecifier = ('createdOn' | 'defaultsInHours' | 'id' | 'loan' | 'notificationType' | 'readOn' | 'user' | LoanDefaultReminderNotificationKeySpecifier)[];
export type LoanDefaultReminderNotificationFieldPolicy = {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	defaultsInHours?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	readOn?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoanDefaultedNotificationKeySpecifier = ('createdOn' | 'id' | 'loan' | 'notificationType' | 'readOn' | 'user' | LoanDefaultedNotificationKeySpecifier)[];
export type LoanDefaultedNotificationFieldPolicy = {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	readOn?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoanExtendedKeySpecifier = ('id' | 'indexInBlock' | 'loan' | 'loanId' | 'multiSourceLoanHistory' | 'timestamp' | 'txHash' | LoanExtendedKeySpecifier)[];
export type LoanExtendedFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	multiSourceLoanHistory?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoanExtendedNotificationKeySpecifier = ('createdOn' | 'id' | 'newHistory' | 'notificationType' | 'previousHistory' | 'readOn' | 'user' | LoanExtendedNotificationKeySpecifier)[];
export type LoanExtendedNotificationFieldPolicy = {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	newHistory?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	previousHistory?: FieldPolicy<any> | FieldReadFunction<any>,
	readOn?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoanForeclosedKeySpecifier = ('id' | 'indexInBlock' | 'loan' | 'loanId' | 'multiSourceLoanHistory' | 'timestamp' | 'txHash' | LoanForeclosedKeySpecifier)[];
export type LoanForeclosedFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	multiSourceLoanHistory?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoanInitiatedKeySpecifier = ('id' | 'indexInBlock' | 'loan' | 'loanId' | 'multiSourceLoanHistory' | 'timestamp' | 'txHash' | LoanInitiatedKeySpecifier)[];
export type LoanInitiatedFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	multiSourceLoanHistory?: FieldPolicy<any> | FieldReadFunction<any>,
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
export type LoanRefinancedKeySpecifier = ('addedNewTranche' | 'id' | 'indexInBlock' | 'isRenegotiation' | 'loan' | 'loanId' | 'multiSourceLoanHistory' | 'timestamp' | 'txHash' | LoanRefinancedKeySpecifier)[];
export type LoanRefinancedFieldPolicy = {
	addedNewTranche?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	isRenegotiation?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	multiSourceLoanHistory?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoanRefinancedNotificationKeySpecifier = ('createdOn' | 'id' | 'newHistory' | 'notificationType' | 'previousHistory' | 'readOn' | 'user' | LoanRefinancedNotificationKeySpecifier)[];
export type LoanRefinancedNotificationFieldPolicy = {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	newHistory?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	previousHistory?: FieldPolicy<any> | FieldReadFunction<any>,
	readOn?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoanRepaidKeySpecifier = ('id' | 'indexInBlock' | 'loan' | 'loanId' | 'multiSourceLoanHistory' | 'timestamp' | 'totalInterest' | 'txHash' | LoanRepaidKeySpecifier)[];
export type LoanRepaidFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	multiSourceLoanHistory?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	totalInterest?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoanRepaidNotificationKeySpecifier = ('createdOn' | 'id' | 'loan' | 'notificationType' | 'readOn' | 'user' | LoanRepaidNotificationKeySpecifier)[];
export type LoanRepaidNotificationFieldPolicy = {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	readOn?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LoanSentToAuctionKeySpecifier = ('id' | 'indexInBlock' | 'liquidatorAddress' | 'loan' | 'loanId' | 'multiSourceLoanHistory' | 'timestamp' | 'txHash' | LoanSentToAuctionKeySpecifier)[];
export type LoanSentToAuctionFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	liquidatorAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	multiSourceLoanHistory?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LostSourceKeySpecifier = ('accruedInterest' | 'aprBps' | 'duration' | 'id' | 'lenderAddress' | 'loan' | 'originationFee' | 'principalAmount' | 'startTime' | LostSourceKeySpecifier)[];
export type LostSourceFieldPolicy = {
	accruedInterest?: FieldPolicy<any> | FieldReadFunction<any>,
	aprBps?: FieldPolicy<any> | FieldReadFunction<any>,
	duration?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	lenderAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	originationFee?: FieldPolicy<any> | FieldReadFunction<any>,
	principalAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	startTime?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LostSourceNotificationKeySpecifier = ('createdOn' | 'id' | 'lostSource' | 'notificationType' | 'readOn' | 'user' | LostSourceNotificationKeySpecifier)[];
export type LostSourceNotificationFieldPolicy = {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	lostSource?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	readOn?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MultiSourceLoanKeySpecifier = ('activities' | 'address' | 'auction' | 'blendedAprBps' | 'borrowerAddress' | 'currency' | 'duration' | 'id' | 'indexInBlock' | 'loanId' | 'nft' | 'offer' | 'offerIds' | 'principalAddress' | 'principalAmount' | 'renegotiationRequest' | 'repaidActivity' | 'sources' | 'startTime' | 'status' | 'timestamp' | 'totalOriginationFee' | 'txHash' | MultiSourceLoanKeySpecifier)[];
export type MultiSourceLoanFieldPolicy = {
	activities?: FieldPolicy<any> | FieldReadFunction<any>,
	address?: FieldPolicy<any> | FieldReadFunction<any>,
	auction?: FieldPolicy<any> | FieldReadFunction<any>,
	blendedAprBps?: FieldPolicy<any> | FieldReadFunction<any>,
	borrowerAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	duration?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	nft?: FieldPolicy<any> | FieldReadFunction<any>,
	offer?: FieldPolicy<any> | FieldReadFunction<any>,
	offerIds?: FieldPolicy<any> | FieldReadFunction<any>,
	principalAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	principalAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	renegotiationRequest?: FieldPolicy<any> | FieldReadFunction<any>,
	repaidActivity?: FieldPolicy<any> | FieldReadFunction<any>,
	sources?: FieldPolicy<any> | FieldReadFunction<any>,
	startTime?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
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
export type MultiSourceLoanHistoryKeySpecifier = ('activity' | 'borrowerAddress' | 'duration' | 'id' | 'offerIds' | 'principalAddress' | 'principalAmount' | 'sources' | 'startTime' | MultiSourceLoanHistoryKeySpecifier)[];
export type MultiSourceLoanHistoryFieldPolicy = {
	activity?: FieldPolicy<any> | FieldReadFunction<any>,
	borrowerAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	duration?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	offerIds?: FieldPolicy<any> | FieldReadFunction<any>,
	principalAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	principalAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	sources?: FieldPolicy<any> | FieldReadFunction<any>,
	startTime?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('addListingsOfNftsFromUser' | 'addOrUpdateListing' | 'addOrUpdateRenegotiationRequest' | 'generateCollectionOfferToBeSigned' | 'generateRenegotiationOfferToBeSigned' | 'generateSingleNftOfferToBeSigned' | 'hideAllOffers' | 'hideOffer' | 'hideRenegotiation' | 'hideSaleOffer' | 'markNotificationIdsAsRead' | 'markNotificationsAsRead' | 'removeListing' | 'removeListingsOfNftsFromUser' | 'removeRenegotiationRequest' | 'saveRenegotiationSignedOffer' | 'saveSignedCollectionOffer' | 'saveSignedSaleOffer' | 'saveSignedSingleNftOffer' | 'setReferral' | 'showOffer' | 'showRenegotiation' | 'showSaleOffer' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	addListingsOfNftsFromUser?: FieldPolicy<any> | FieldReadFunction<any>,
	addOrUpdateListing?: FieldPolicy<any> | FieldReadFunction<any>,
	addOrUpdateRenegotiationRequest?: FieldPolicy<any> | FieldReadFunction<any>,
	generateCollectionOfferToBeSigned?: FieldPolicy<any> | FieldReadFunction<any>,
	generateRenegotiationOfferToBeSigned?: FieldPolicy<any> | FieldReadFunction<any>,
	generateSingleNftOfferToBeSigned?: FieldPolicy<any> | FieldReadFunction<any>,
	hideAllOffers?: FieldPolicy<any> | FieldReadFunction<any>,
	hideOffer?: FieldPolicy<any> | FieldReadFunction<any>,
	hideRenegotiation?: FieldPolicy<any> | FieldReadFunction<any>,
	hideSaleOffer?: FieldPolicy<any> | FieldReadFunction<any>,
	markNotificationIdsAsRead?: FieldPolicy<any> | FieldReadFunction<any>,
	markNotificationsAsRead?: FieldPolicy<any> | FieldReadFunction<any>,
	removeListing?: FieldPolicy<any> | FieldReadFunction<any>,
	removeListingsOfNftsFromUser?: FieldPolicy<any> | FieldReadFunction<any>,
	removeRenegotiationRequest?: FieldPolicy<any> | FieldReadFunction<any>,
	saveRenegotiationSignedOffer?: FieldPolicy<any> | FieldReadFunction<any>,
	saveSignedCollectionOffer?: FieldPolicy<any> | FieldReadFunction<any>,
	saveSignedSaleOffer?: FieldPolicy<any> | FieldReadFunction<any>,
	saveSignedSingleNftOffer?: FieldPolicy<any> | FieldReadFunction<any>,
	setReferral?: FieldPolicy<any> | FieldReadFunction<any>,
	showOffer?: FieldPolicy<any> | FieldReadFunction<any>,
	showRenegotiation?: FieldPolicy<any> | FieldReadFunction<any>,
	showSaleOffer?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NFTKeySpecifier = ('activeLoan' | 'collection' | 'createdDate' | 'description' | 'id' | 'image' | 'isFlagged' | 'listed' | 'marketPlaceOfPrice' | 'name' | 'nftId' | 'owner' | 'price' | 'priceCurrencyAddress' | 'rarityRank' | 'rarityScore' | 'statistics' | 'tokenId' | 'traits' | 'url' | 'wrapsNfts' | NFTKeySpecifier)[];
export type NFTFieldPolicy = {
	activeLoan?: FieldPolicy<any> | FieldReadFunction<any>,
	collection?: FieldPolicy<any> | FieldReadFunction<any>,
	createdDate?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	image?: FieldPolicy<any> | FieldReadFunction<any>,
	isFlagged?: FieldPolicy<any> | FieldReadFunction<any>,
	listed?: FieldPolicy<any> | FieldReadFunction<any>,
	marketPlaceOfPrice?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	nftId?: FieldPolicy<any> | FieldReadFunction<any>,
	owner?: FieldPolicy<any> | FieldReadFunction<any>,
	price?: FieldPolicy<any> | FieldReadFunction<any>,
	priceCurrencyAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	rarityRank?: FieldPolicy<any> | FieldReadFunction<any>,
	rarityScore?: FieldPolicy<any> | FieldReadFunction<any>,
	statistics?: FieldPolicy<any> | FieldReadFunction<any>,
	tokenId?: FieldPolicy<any> | FieldReadFunction<any>,
	traits?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>,
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
export type NewOfferNotificationKeySpecifier = ('createdOn' | 'id' | 'notificationType' | 'offer' | 'readOn' | 'user' | NewOfferNotificationKeySpecifier)[];
export type NewOfferNotificationFieldPolicy = {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	offer?: FieldPolicy<any> | FieldReadFunction<any>,
	readOn?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NewRenegotiationOfferNotificationKeySpecifier = ('createdOn' | 'id' | 'loan' | 'notificationType' | 'readOn' | 'renegotiation' | 'user' | NewRenegotiationOfferNotificationKeySpecifier)[];
export type NewRenegotiationOfferNotificationFieldPolicy = {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	readOn?: FieldPolicy<any> | FieldReadFunction<any>,
	renegotiation?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NftStatisticsKeySpecifier = ('bestOffer' | 'floorPrice' | 'floorPrice7d' | 'floorPrice30d' | 'lastSale' | 'loansTotalVolume' | 'numberOfOffers' | 'topTraitFloorPrice' | 'totalVolume' | 'totalVolume1d' | 'totalVolume1m' | 'totalVolume1w' | 'totalVolume1y' | 'totalVolume2m' | 'totalVolume3m' | 'totalVolume4m' | NftStatisticsKeySpecifier)[];
export type NftStatisticsFieldPolicy = {
	bestOffer?: FieldPolicy<any> | FieldReadFunction<any>,
	floorPrice?: FieldPolicy<any> | FieldReadFunction<any>,
	floorPrice7d?: FieldPolicy<any> | FieldReadFunction<any>,
	floorPrice30d?: FieldPolicy<any> | FieldReadFunction<any>,
	lastSale?: FieldPolicy<any> | FieldReadFunction<any>,
	loansTotalVolume?: FieldPolicy<any> | FieldReadFunction<any>,
	numberOfOffers?: FieldPolicy<any> | FieldReadFunction<any>,
	topTraitFloorPrice?: FieldPolicy<any> | FieldReadFunction<any>,
	totalVolume?: FieldPolicy<any> | FieldReadFunction<any>,
	totalVolume1d?: FieldPolicy<any> | FieldReadFunction<any>,
	totalVolume1m?: FieldPolicy<any> | FieldReadFunction<any>,
	totalVolume1w?: FieldPolicy<any> | FieldReadFunction<any>,
	totalVolume1y?: FieldPolicy<any> | FieldReadFunction<any>,
	totalVolume2m?: FieldPolicy<any> | FieldReadFunction<any>,
	totalVolume3m?: FieldPolicy<any> | FieldReadFunction<any>,
	totalVolume4m?: FieldPolicy<any> | FieldReadFunction<any>
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
export type OfferKeySpecifier = ('aprBps' | 'borrowerAddress' | 'capacity' | 'consumedCapacity' | 'contractAddress' | 'createdDate' | 'currency' | 'duration' | 'expirationTime' | 'fee' | 'hidden' | 'id' | 'lenderAddress' | 'maxPrincipal' | 'maxTrancheFloor' | 'netPrincipal' | 'offerHash' | 'offerId' | 'principalAddress' | 'principalAmount' | 'repayment' | 'requiresLiquidation' | 'signature' | 'signerAddress' | 'status' | 'validators' | OfferKeySpecifier)[];
export type OfferFieldPolicy = {
	aprBps?: FieldPolicy<any> | FieldReadFunction<any>,
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
	maxPrincipal?: FieldPolicy<any> | FieldReadFunction<any>,
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
export type OfferAcceptedNotificationKeySpecifier = ('createdOn' | 'id' | 'loan' | 'notificationType' | 'offer' | 'readOn' | 'user' | OfferAcceptedNotificationKeySpecifier)[];
export type OfferAcceptedNotificationFieldPolicy = {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	offer?: FieldPolicy<any> | FieldReadFunction<any>,
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
export type OrderKeySpecifier = ('createdDate' | 'currency' | 'currencyAddress' | 'expiration' | 'fees' | 'hidden' | 'id' | 'isAsk' | 'maker' | 'marketPlace' | 'netAmount' | 'nonce' | 'orderType' | 'price' | 'signature' | 'startTime' | 'status' | 'timestamp' | 'txHash' | OrderKeySpecifier)[];
export type OrderFieldPolicy = {
	createdDate?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	currencyAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	expiration?: FieldPolicy<any> | FieldReadFunction<any>,
	fees?: FieldPolicy<any> | FieldReadFunction<any>,
	hidden?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isAsk?: FieldPolicy<any> | FieldReadFunction<any>,
	maker?: FieldPolicy<any> | FieldReadFunction<any>,
	marketPlace?: FieldPolicy<any> | FieldReadFunction<any>,
	netAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	nonce?: FieldPolicy<any> | FieldReadFunction<any>,
	orderType?: FieldPolicy<any> | FieldReadFunction<any>,
	price?: FieldPolicy<any> | FieldReadFunction<any>,
	signature?: FieldPolicy<any> | FieldReadFunction<any>,
	startTime?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
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
export type OutbidNotificationKeySpecifier = ('auction' | 'createdOn' | 'id' | 'loan' | 'newBid' | 'notificationType' | 'readOn' | 'user' | 'userBid' | OutbidNotificationKeySpecifier)[];
export type OutbidNotificationFieldPolicy = {
	auction?: FieldPolicy<any> | FieldReadFunction<any>,
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	newBid?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	readOn?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	userBid?: FieldPolicy<any> | FieldReadFunction<any>
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
export type QueryKeySpecifier = ('getCollectionBySlug' | 'getCollectionsByContractAddress' | 'getListingById' | 'getLoanById' | 'getNftByContractAddressAndTokenId' | 'getNftBySlugAndTokenId' | 'getPointsFromReferrals' | 'getReferredWallets' | 'getUserPointActivities' | 'getUserPoints' | 'listAuctions' | 'listBestBidsForNft' | 'listBids' | 'listCollections' | 'listCollectionsWithListings' | 'listCollectionsWithLoans' | 'listListings' | 'listLoanActivities' | 'listLoans' | 'listNftDelegations' | 'listNftOffersAndRenegotiations' | 'listNftsFromCollections' | 'listNftsFromUser' | 'listNotifications' | 'listOffers' | 'listRenegotiations' | 'listSaleOffers' | 'listSources' | 'listUserSaleOffers' | 'me' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	getCollectionBySlug?: FieldPolicy<any> | FieldReadFunction<any>,
	getCollectionsByContractAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	getListingById?: FieldPolicy<any> | FieldReadFunction<any>,
	getLoanById?: FieldPolicy<any> | FieldReadFunction<any>,
	getNftByContractAddressAndTokenId?: FieldPolicy<any> | FieldReadFunction<any>,
	getNftBySlugAndTokenId?: FieldPolicy<any> | FieldReadFunction<any>,
	getPointsFromReferrals?: FieldPolicy<any> | FieldReadFunction<any>,
	getReferredWallets?: FieldPolicy<any> | FieldReadFunction<any>,
	getUserPointActivities?: FieldPolicy<any> | FieldReadFunction<any>,
	getUserPoints?: FieldPolicy<any> | FieldReadFunction<any>,
	listAuctions?: FieldPolicy<any> | FieldReadFunction<any>,
	listBestBidsForNft?: FieldPolicy<any> | FieldReadFunction<any>,
	listBids?: FieldPolicy<any> | FieldReadFunction<any>,
	listCollections?: FieldPolicy<any> | FieldReadFunction<any>,
	listCollectionsWithListings?: FieldPolicy<any> | FieldReadFunction<any>,
	listCollectionsWithLoans?: FieldPolicy<any> | FieldReadFunction<any>,
	listListings?: FieldPolicy<any> | FieldReadFunction<any>,
	listLoanActivities?: FieldPolicy<any> | FieldReadFunction<any>,
	listLoans?: FieldPolicy<any> | FieldReadFunction<any>,
	listNftDelegations?: FieldPolicy<any> | FieldReadFunction<any>,
	listNftOffersAndRenegotiations?: FieldPolicy<any> | FieldReadFunction<any>,
	listNftsFromCollections?: FieldPolicy<any> | FieldReadFunction<any>,
	listNftsFromUser?: FieldPolicy<any> | FieldReadFunction<any>,
	listNotifications?: FieldPolicy<any> | FieldReadFunction<any>,
	listOffers?: FieldPolicy<any> | FieldReadFunction<any>,
	listRenegotiations?: FieldPolicy<any> | FieldReadFunction<any>,
	listSaleOffers?: FieldPolicy<any> | FieldReadFunction<any>,
	listSources?: FieldPolicy<any> | FieldReadFunction<any>,
	listUserSaleOffers?: FieldPolicy<any> | FieldReadFunction<any>,
	me?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RenegotiationKeySpecifier = ('aprBps' | 'createdDate' | 'duration' | 'expirationTime' | 'feeAmount' | 'hidden' | 'id' | 'lenderAddress' | 'loan' | 'loanAddress' | 'loanId' | 'loanReferenceId' | 'nft' | 'offerHash' | 'principalAmount' | 'renegotiationId' | 'repayment' | 'requiresLiquidation' | 'signature' | 'signerAddress' | 'status' | 'strictImprovement' | RenegotiationKeySpecifier)[];
export type RenegotiationFieldPolicy = {
	aprBps?: FieldPolicy<any> | FieldReadFunction<any>,
	createdDate?: FieldPolicy<any> | FieldReadFunction<any>,
	duration?: FieldPolicy<any> | FieldReadFunction<any>,
	expirationTime?: FieldPolicy<any> | FieldReadFunction<any>,
	feeAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	hidden?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
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
export type RenegotiationRequestKeySpecifier = ('desiredAprBps' | 'desiredDuration' | 'desiredPrincipalAmount' | 'id' | 'loanId' | RenegotiationRequestKeySpecifier)[];
export type RenegotiationRequestFieldPolicy = {
	desiredAprBps?: FieldPolicy<any> | FieldReadFunction<any>,
	desiredDuration?: FieldPolicy<any> | FieldReadFunction<any>,
	desiredPrincipalAmount?: FieldPolicy<any> | FieldReadFunction<any>,
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
export type RoyaltyKeySpecifier = ('beneficiary' | 'percentage' | RoyaltyKeySpecifier)[];
export type RoyaltyFieldPolicy = {
	beneficiary?: FieldPolicy<any> | FieldReadFunction<any>,
	percentage?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SaleKeySpecifier = ('id' | 'nft' | 'order' | 'taker' | 'timestamp' | 'txHash' | SaleKeySpecifier)[];
export type SaleFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	nft?: FieldPolicy<any> | FieldReadFunction<any>,
	order?: FieldPolicy<any> | FieldReadFunction<any>,
	taker?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SingleNFTOfferKeySpecifier = ('aprBps' | 'borrowerAddress' | 'capacity' | 'consumedCapacity' | 'contractAddress' | 'createdDate' | 'currency' | 'duration' | 'expirationTime' | 'fee' | 'hidden' | 'id' | 'lenderAddress' | 'maxPrincipal' | 'maxTrancheFloor' | 'netPrincipal' | 'nft' | 'offerHash' | 'offerId' | 'principalAddress' | 'principalAmount' | 'repayment' | 'requiresLiquidation' | 'signature' | 'signerAddress' | 'statistics' | 'status' | 'validators' | SingleNFTOfferKeySpecifier)[];
export type SingleNFTOfferFieldPolicy = {
	aprBps?: FieldPolicy<any> | FieldReadFunction<any>,
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
	maxPrincipal?: FieldPolicy<any> | FieldReadFunction<any>,
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
export type SingleNFTOfferRenegotiationConnectionKeySpecifier = ('edges' | 'pageInfo' | 'totalCount' | SingleNFTOfferRenegotiationConnectionKeySpecifier)[];
export type SingleNFTOfferRenegotiationConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	totalCount?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SingleNFTOfferRenegotiationEdgeKeySpecifier = ('cursor' | 'node' | SingleNFTOfferRenegotiationEdgeKeySpecifier)[];
export type SingleNFTOfferRenegotiationEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SingleNFTOrderKeySpecifier = ('createdDate' | 'currency' | 'currencyAddress' | 'expiration' | 'fees' | 'hidden' | 'id' | 'isAsk' | 'maker' | 'marketPlace' | 'netAmount' | 'nft' | 'nonce' | 'orderType' | 'price' | 'signature' | 'startTime' | 'status' | 'timestamp' | 'txHash' | SingleNFTOrderKeySpecifier)[];
export type SingleNFTOrderFieldPolicy = {
	createdDate?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	currencyAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	expiration?: FieldPolicy<any> | FieldReadFunction<any>,
	fees?: FieldPolicy<any> | FieldReadFunction<any>,
	hidden?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isAsk?: FieldPolicy<any> | FieldReadFunction<any>,
	maker?: FieldPolicy<any> | FieldReadFunction<any>,
	marketPlace?: FieldPolicy<any> | FieldReadFunction<any>,
	netAmount?: FieldPolicy<any> | FieldReadFunction<any>,
	nft?: FieldPolicy<any> | FieldReadFunction<any>,
	nonce?: FieldPolicy<any> | FieldReadFunction<any>,
	orderType?: FieldPolicy<any> | FieldReadFunction<any>,
	price?: FieldPolicy<any> | FieldReadFunction<any>,
	signature?: FieldPolicy<any> | FieldReadFunction<any>,
	startTime?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txHash?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SourceKeySpecifier = ('accruedInterest' | 'aprBps' | 'id' | 'lenderAddress' | 'loan' | 'loanId' | 'loanIndex' | 'loanReferenceId' | 'originationFee' | 'principalAmount' | 'seniorPrincipalAmount' | 'startTime' | SourceKeySpecifier)[];
export type SourceFieldPolicy = {
	accruedInterest?: FieldPolicy<any> | FieldReadFunction<any>,
	aprBps?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	lenderAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	loan?: FieldPolicy<any> | FieldReadFunction<any>,
	loanId?: FieldPolicy<any> | FieldReadFunction<any>,
	loanIndex?: FieldPolicy<any> | FieldReadFunction<any>,
	loanReferenceId?: FieldPolicy<any> | FieldReadFunction<any>,
	originationFee?: FieldPolicy<any> | FieldReadFunction<any>,
	principalAmount?: FieldPolicy<any> | FieldReadFunction<any>,
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
export type TraitKeySpecifier = ('collectionId' | 'statistics' | 'type' | 'value' | TraitKeySpecifier)[];
export type TraitFieldPolicy = {
	collectionId?: FieldPolicy<any> | FieldReadFunction<any>,
	statistics?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UnderfundedOfferNotificationKeySpecifier = ('createdOn' | 'id' | 'notificationType' | 'offer' | 'readOn' | 'user' | UnderfundedOfferNotificationKeySpecifier)[];
export type UnderfundedOfferNotificationFieldPolicy = {
	createdOn?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	notificationType?: FieldPolicy<any> | FieldReadFunction<any>,
	offer?: FieldPolicy<any> | FieldReadFunction<any>,
	readOn?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('about' | 'beta' | 'blockchain' | 'cart' | 'cartId' | 'createdDate' | 'id' | 'linkedWallets' | 'mail' | 'mailValidationDate' | 'originalProfilePicture' | 'profilePictureId' | 'size64ProfilePicture' | 'size128ProfilePicture' | 'size256ProfilePicture' | 'size512ProfilePicture' | 'twitterHandle' | 'updatedAt' | 'usedProduct' | 'username' | 'walletAddress' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	about?: FieldPolicy<any> | FieldReadFunction<any>,
	beta?: FieldPolicy<any> | FieldReadFunction<any>,
	blockchain?: FieldPolicy<any> | FieldReadFunction<any>,
	cart?: FieldPolicy<any> | FieldReadFunction<any>,
	cartId?: FieldPolicy<any> | FieldReadFunction<any>,
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
	twitterHandle?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	usedProduct?: FieldPolicy<any> | FieldReadFunction<any>,
	username?: FieldPolicy<any> | FieldReadFunction<any>,
	walletAddress?: FieldPolicy<any> | FieldReadFunction<any>
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
	Cart?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartKeySpecifier | (() => undefined | CartKeySpecifier),
		fields?: CartFieldPolicy,
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
	LoanDefaultedNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LoanDefaultedNotificationKeySpecifier | (() => undefined | LoanDefaultedNotificationKeySpecifier),
		fields?: LoanDefaultedNotificationFieldPolicy,
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
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
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
	Royalty?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RoyaltyKeySpecifier | (() => undefined | RoyaltyKeySpecifier),
		fields?: RoyaltyFieldPolicy,
	},
	Sale?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SaleKeySpecifier | (() => undefined | SaleKeySpecifier),
		fields?: SaleFieldPolicy,
	},
	SingleNFTOffer?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SingleNFTOfferKeySpecifier | (() => undefined | SingleNFTOfferKeySpecifier),
		fields?: SingleNFTOfferFieldPolicy,
	},
	SingleNFTOfferRenegotiationConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SingleNFTOfferRenegotiationConnectionKeySpecifier | (() => undefined | SingleNFTOfferRenegotiationConnectionKeySpecifier),
		fields?: SingleNFTOfferRenegotiationConnectionFieldPolicy,
	},
	SingleNFTOfferRenegotiationEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SingleNFTOfferRenegotiationEdgeKeySpecifier | (() => undefined | SingleNFTOfferRenegotiationEdgeKeySpecifier),
		fields?: SingleNFTOfferRenegotiationEdgeFieldPolicy,
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
	Trait?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TraitKeySpecifier | (() => undefined | TraitKeySpecifier),
		fields?: TraitFieldPolicy,
	},
	UnderfundedOfferNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UnderfundedOfferNotificationKeySpecifier | (() => undefined | UnderfundedOfferNotificationKeySpecifier),
		fields?: UnderfundedOfferNotificationFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;
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
    mutation saveRenegotiationOffer($offer: SignedRenegotiationOfferInput!) {
  offer: saveRenegotiationSignedOffer(signedRenegotiationInput: $offer) {
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
export const HideSaleOfferDocument = gql`
    mutation hideSaleOffer($id: String!) {
  hideSaleOffer(saleOfferId: $id) {
    id
  }
}
    `;
export const ListBestBidsForNftDocument = gql`
    query listBestBidsForNft($nftId: Int!, $currencyAddress: String!) {
  bids: listBestBidsForNft(nftId: $nftId, currencyAddress: $currencyAddress) {
    id
    netAmount
    status
    marketPlace
    fees
    maker
    expiration
    createdDate
    hidden
    signature
    currencyAddress
    startTime
    nonce
  }
}
    `;
export const SaveSignedSaleOfferDocument = gql`
    mutation saveSignedSaleOffer($offer: SignedOrderInput!) {
  offer: saveSignedSaleOffer(signedOfferInput: $offer) {
    id
    status
  }
}
    `;
export const UnhideSaleOfferDocument = gql`
    mutation unhideSaleOffer($id: String!) {
  showSaleOffer(saleOfferId: $id) {
    id
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
    query listLoans($borrowerAddress: String = "", $collections: [Int!] = [], $nfts: [Int!], $statuses: [LoanStatusType!] = [], $sortBy: [LoanSortInput!] = [], $terms: TermsFilter, $orderByStatuses: Boolean, $loansCurrencyAddress: Address, $first: Int = 24, $after: String) {
  loans: listLoans(
    borrowerAddress: $borrowerAddress
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
export const ListOffersDocument = gql`
    query listOffers($borrowerAddress: String, $lenderAddress: [String!], $sortBy: OffersSortInput!, $terms: TermsFilter, $statuses: [OfferStatus!] = [ACTIVE, CANCELLED, INACTIVE, EXPIRED], $nfts: [Int!], $collections: [Int!], $onlySingleNftOffers: Boolean, $onlyCollectionOffers: Boolean, $first: Int = 24, $after: String) {
  result: listOffers(
    borrowerAddress: $borrowerAddress
    lenderAddress: $lenderAddress
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
    hideSaleOffer(variables: HideSaleOfferMutationVariables, options?: C): Promise<HideSaleOfferMutation> {
      return requester<HideSaleOfferMutation, HideSaleOfferMutationVariables>(HideSaleOfferDocument, variables, options) as Promise<HideSaleOfferMutation>;
    },
    listBestBidsForNft(variables: ListBestBidsForNftQueryVariables, options?: C): Promise<ListBestBidsForNftQuery> {
      return requester<ListBestBidsForNftQuery, ListBestBidsForNftQueryVariables>(ListBestBidsForNftDocument, variables, options) as Promise<ListBestBidsForNftQuery>;
    },
    saveSignedSaleOffer(variables: SaveSignedSaleOfferMutationVariables, options?: C): Promise<SaveSignedSaleOfferMutation> {
      return requester<SaveSignedSaleOfferMutation, SaveSignedSaleOfferMutationVariables>(SaveSignedSaleOfferDocument, variables, options) as Promise<SaveSignedSaleOfferMutation>;
    },
    unhideSaleOffer(variables: UnhideSaleOfferMutationVariables, options?: C): Promise<UnhideSaleOfferMutation> {
      return requester<UnhideSaleOfferMutation, UnhideSaleOfferMutationVariables>(UnhideSaleOfferDocument, variables, options) as Promise<UnhideSaleOfferMutation>;
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
    listOffers(variables: ListOffersQueryVariables, options?: C): Promise<ListOffersQuery> {
      return requester<ListOffersQuery, ListOffersQueryVariables>(ListOffersDocument, variables, options) as Promise<ListOffersQuery>;
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;