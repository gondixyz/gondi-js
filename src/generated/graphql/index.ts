/* eslint-disable */
//@ts-nocheck
import { Address, Hash, Hex } from "viem";
import {
  FieldPolicy,
  FieldReadFunction,
  TypePolicies,
  TypePolicy,
} from "@apollo/client/cache";
import { DocumentNode } from "graphql";
import gql from "graphql-tag";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Address: Address;
  BigInt: bigint;
  DateTime: any;
  Hash: Hash;
  Hex: Hex;
  Signature: Hex;
  Void: any;
};

export type ActiveOfferNotification = Node &
  Notification & {
    __typename?: "ActiveOfferNotification";
    createdOn: Scalars["DateTime"];
    id: Scalars["String"];
    notificationType: Scalars["String"];
    offer: Offer;
    readOn?: Maybe<Scalars["DateTime"]>;
    user: User;
  };

export type Activity = {
  id: Scalars["String"];
  timestamp: Scalars["DateTime"];
  txHash?: Maybe<Scalars["Hash"]>;
};

export type Asset = {
  __typename?: "Asset";
  accessTypeName: Scalars["String"];
  cacheUrl?: Maybe<Scalars["String"]>;
  contentTypeMime: Scalars["String"];
  data: Scalars["String"];
};

export type Auction = Node & {
  __typename?: "Auction";
  duration?: Maybe<Scalars["BigInt"]>;
  endTime?: Maybe<Scalars["DateTime"]>;
  highestBid?: Maybe<Bid>;
  id: Scalars["String"];
  loan: MultiSourceLoan;
  settler?: Maybe<Scalars["String"]>;
  startTime?: Maybe<Scalars["DateTime"]>;
  status: Scalars["String"];
};

export type AuctionBidConfirmationNotification = Node &
  Notification & {
    __typename?: "AuctionBidConfirmationNotification";
    auction: Auction;
    bid: Bid;
    createdOn: Scalars["DateTime"];
    id: Scalars["String"];
    loan: MultiSourceLoan;
    notificationType: Scalars["String"];
    readOn?: Maybe<Scalars["DateTime"]>;
    user: User;
  };

export type AuctionConnection = {
  __typename?: "AuctionConnection";
  edges: Array<AuctionEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type AuctionEdge = {
  __typename?: "AuctionEdge";
  cursor: Scalars["String"];
  node: Auction;
};

export type AuctionEndedNotification = Node &
  Notification & {
    __typename?: "AuctionEndedNotification";
    auction: Auction;
    createdOn: Scalars["DateTime"];
    id: Scalars["String"];
    loan: MultiSourceLoan;
    notificationType: Scalars["String"];
    readOn?: Maybe<Scalars["DateTime"]>;
    user: User;
  };

export enum AuctionSortField {
  EndTime = "END_TIME",
  Status = "STATUS",
}

export type AuctionSortInput = {
  field: AuctionSortField;
  order: Ordering;
};

export type AuctionStartedNotification = Node &
  Notification & {
    __typename?: "AuctionStartedNotification";
    auction: Auction;
    createdOn: Scalars["DateTime"];
    id: Scalars["String"];
    loan: MultiSourceLoan;
    notificationType: Scalars["String"];
    readOn?: Maybe<Scalars["DateTime"]>;
    user: User;
  };

export enum AuctionStatus {
  Ended = "ENDED",
  Live = "LIVE",
  Past = "PAST",
  Upcoming = "UPCOMING",
}

export type AuctionWonNotification = Node &
  Notification & {
    __typename?: "AuctionWonNotification";
    auction: Auction;
    createdOn: Scalars["DateTime"];
    id: Scalars["String"];
    loan: MultiSourceLoan;
    notificationType: Scalars["String"];
    readOn?: Maybe<Scalars["DateTime"]>;
    user: User;
  };

export type Bid = Node & {
  __typename?: "Bid";
  amount: Scalars["BigInt"];
  auction: Auction;
  bidder: Scalars["Address"];
  id: Scalars["String"];
  indexInBlock: Scalars["Int"];
  timestamp: Scalars["DateTime"];
  txHash: Scalars["Hash"];
};

export type BidConnection = {
  __typename?: "BidConnection";
  edges: Array<BidEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type BidEdge = {
  __typename?: "BidEdge";
  cursor: Scalars["String"];
  node: Bid;
};

export enum BidSortField {
  Bid = "BID",
  HighestBid = "HIGHEST_BID",
}

export type BidSortInput = {
  field: BidSortField;
  order: Ordering;
};

export type Cart = Node & {
  __typename?: "Cart";
  createdDate: Scalars["DateTime"];
  id: Scalars["String"];
  items: NftConnection;
};

export type CartItemsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  first?: Scalars["Int"];
};

export type Collection = Node & {
  __typename?: "Collection";
  bannerImage?: Maybe<Asset>;
  collectionUrl?: Maybe<Scalars["String"]>;
  contractData?: Maybe<ContractData>;
  description?: Maybe<Scalars["String"]>;
  discordUrl?: Maybe<Scalars["String"]>;
  externalUrl?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
  image?: Maybe<Asset>;
  name?: Maybe<Scalars["String"]>;
  nftsCount?: Maybe<Scalars["Int"]>;
  royalties: Array<Royalty>;
  slug?: Maybe<Scalars["String"]>;
  statistics: CollectionStatistics;
  twitterUsername?: Maybe<Scalars["String"]>;
  verified: Scalars["Boolean"];
};

export type CollectionConnection = {
  __typename?: "CollectionConnection";
  edges: Array<CollectionEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type CollectionEdge = {
  __typename?: "CollectionEdge";
  cursor: Scalars["String"];
  node: Collection;
};

export type CollectionOffer = Node &
  Offer & {
    __typename?: "CollectionOffer";
    aprBps: Scalars["BigInt"];
    borrowerAddress?: Maybe<Scalars["Address"]>;
    capacity: Scalars["BigInt"];
    collection: Collection;
    contractAddress: Scalars["Address"];
    createdDate?: Maybe<Scalars["DateTime"]>;
    currency?: Maybe<Currency>;
    duration: Scalars["BigInt"];
    expirationTime: Scalars["BigInt"];
    fee: Scalars["BigInt"];
    hidden?: Maybe<Scalars["Boolean"]>;
    id: Scalars["String"];
    lenderAddress?: Maybe<Scalars["Address"]>;
    offerHash?: Maybe<Scalars["Hash"]>;
    offerId: Scalars["BigInt"];
    principalAddress: Scalars["Address"];
    principalAmount: Scalars["BigInt"];
    repayment: Scalars["BigInt"];
    requiresLiquidation: Scalars["Boolean"];
    signature?: Maybe<Scalars["Signature"]>;
    signerAddress?: Maybe<Scalars["Address"]>;
    statistics: CollectionOfferStatistics;
    status: Scalars["String"];
    validators: Array<OfferValidator>;
  };

export type CollectionOfferInput = {
  aprBps: Scalars["BigInt"];
  borrowerAddress: Scalars["Address"];
  capacity: Scalars["BigInt"];
  collectionId: Scalars["Int"];
  contractAddress: Scalars["Address"];
  duration: Scalars["BigInt"];
  expirationTime: Scalars["BigInt"];
  fee: Scalars["BigInt"];
  lenderAddress: Scalars["Address"];
  offerValidators: Array<OfferValidatorInput>;
  principalAddress: Scalars["Address"];
  principalAmount: Scalars["BigInt"];
  requiresLiquidation: Scalars["Boolean"];
  signerAddress: Scalars["Address"];
};

export type CollectionOfferStatistics = {
  __typename?: "CollectionOfferStatistics";
  acceptedLoans: Scalars["Int"];
  consumedCapacity: Scalars["BigInt"];
};

export type CollectionOrder = Activity &
  Node &
  Order & {
    __typename?: "CollectionOrder";
    collection: Collection;
    createdDate: Scalars["DateTime"];
    currency: Currency;
    currencyAddress: Scalars["Address"];
    executionData: Scalars["String"];
    expiration?: Maybe<Scalars["DateTime"]>;
    id: Scalars["String"];
    isAsk: Scalars["Boolean"];
    maker: Scalars["String"];
    marketPlace: Scalars["String"];
    marketPlaceId: Scalars["String"];
    orderType: Scalars["String"];
    price: Scalars["Float"];
    status: Scalars["String"];
    timestamp: Scalars["DateTime"];
    txHash?: Maybe<Scalars["Hash"]>;
  };

export type CollectionSignedOfferInput = {
  aprBps: Scalars["BigInt"];
  borrowerAddress: Scalars["Address"];
  capacity: Scalars["BigInt"];
  collectionId: Scalars["Int"];
  contractAddress: Scalars["Address"];
  duration: Scalars["BigInt"];
  expirationTime: Scalars["BigInt"];
  fee: Scalars["BigInt"];
  lenderAddress: Scalars["Address"];
  offerHash: Scalars["Hash"];
  offerId: Scalars["BigInt"];
  offerValidators: Array<OfferValidatorInput>;
  principalAddress: Scalars["Address"];
  principalAmount: Scalars["BigInt"];
  requiresLiquidation: Scalars["Boolean"];
  signature: Scalars["Signature"];
  signerAddress: Scalars["Address"];
};

export type CollectionStatistics = {
  __typename?: "CollectionStatistics";
  bestOffer?: Maybe<CurrencyAmount>;
  floorPrice?: Maybe<CurrencyAmount>;
  floorPrice7d?: Maybe<Scalars["Float"]>;
  floorPrice30d?: Maybe<Scalars["Float"]>;
  lastSale?: Maybe<Sale>;
  nftsCount?: Maybe<Scalars["Float"]>;
  numberOfOffers: Scalars["Float"];
  percentageInOutstandingLoans: Scalars["Float"];
  repaymentRate: Scalars["Float"];
  totalLoanVolume: Scalars["BigInt"];
  totalLoanVolume1d: Scalars["BigInt"];
  totalLoanVolume1m: Scalars["BigInt"];
  totalLoanVolume1w: Scalars["BigInt"];
  totalLoanVolume1y: Scalars["BigInt"];
  totalLoanVolume2m: Scalars["BigInt"];
  totalLoanVolume3m: Scalars["BigInt"];
  totalLoanVolume4m: Scalars["BigInt"];
  totalVolume?: Maybe<Scalars["Float"]>;
  totalVolume1d?: Maybe<Scalars["Float"]>;
  totalVolume1m?: Maybe<Scalars["Float"]>;
  totalVolume1w?: Maybe<Scalars["Float"]>;
  totalVolume1y?: Maybe<Scalars["Float"]>;
  totalVolume2m?: Maybe<Scalars["Float"]>;
  totalVolume3m?: Maybe<Scalars["Float"]>;
  totalVolume4m?: Maybe<Scalars["Float"]>;
};

export type CollectionStatisticsNumberOfOffersArgs = {
  currencyAddress: Scalars["Address"];
};

export type CollectionStatisticsTotalLoanVolumeArgs = {
  currencyAddress: Scalars["Address"];
};

export type CollectionStatisticsTotalLoanVolume1dArgs = {
  currencyAddress: Scalars["Address"];
};

export type CollectionStatisticsTotalLoanVolume1mArgs = {
  currencyAddress: Scalars["Address"];
};

export type CollectionStatisticsTotalLoanVolume1wArgs = {
  currencyAddress: Scalars["Address"];
};

export type CollectionStatisticsTotalLoanVolume1yArgs = {
  currencyAddress: Scalars["Address"];
};

export type CollectionStatisticsTotalLoanVolume2mArgs = {
  currencyAddress: Scalars["Address"];
};

export type CollectionStatisticsTotalLoanVolume3mArgs = {
  currencyAddress: Scalars["Address"];
};

export type CollectionStatisticsTotalLoanVolume4mArgs = {
  currencyAddress: Scalars["Address"];
};

export type ContractData = Node & {
  __typename?: "ContractData";
  blockchain: Scalars["String"];
  contractAddress: Scalars["Address"];
  createdDate: Scalars["DateTime"];
  creatorAddress?: Maybe<Scalars["Address"]>;
  id: Scalars["String"];
};

export type Currency = Node & {
  __typename?: "Currency";
  address: Scalars["Address"];
  decimals: Scalars["Int"];
  id: Scalars["String"];
  symbol: Scalars["String"];
};

export type CurrencyAmount = {
  __typename?: "CurrencyAmount";
  amount: Scalars["Float"];
  currency: Currency;
};

export type Interval = {
  max?: InputMaybe<Scalars["Float"]>;
  min?: InputMaybe<Scalars["Float"]>;
};

export type Listing = Node & {
  __typename?: "Listing";
  createdDate: Scalars["DateTime"];
  desiredDuration?: Maybe<Scalars["Int"]>;
  desiredPrincipalAddress?: Maybe<Scalars["Address"]>;
  id: Scalars["String"];
  marketplaceName: MarketplaceEnum;
  nft: Nft;
  user: User;
};

export type ListingConnection = {
  __typename?: "ListingConnection";
  edges: Array<ListingEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type ListingEdge = {
  __typename?: "ListingEdge";
  cursor: Scalars["String"];
  node: Listing;
};

export type Loan = {
  activities: Array<LoanActivity>;
  address: Scalars["Address"];
  borrowerAddress: Scalars["Address"];
  currency?: Maybe<Currency>;
  duration: Scalars["BigInt"];
  id: Scalars["String"];
  indexInBlock: Scalars["Int"];
  loanId: Scalars["Int"];
  offer: Offer;
  principalAddress: Scalars["Address"];
  repaidActivity?: Maybe<LoanRepaid>;
  startTime: Scalars["DateTime"];
  status: Scalars["String"];
  timestamp: Scalars["DateTime"];
  txHash: Scalars["Hash"];
};

export type LoanActivity = {
  id: Scalars["String"];
  indexInBlock: Scalars["Int"];
  loan: Loan;
  loanId: Scalars["String"];
  multiSourceLoanHistory?: Maybe<MultiSourceLoanHistory>;
  timestamp: Scalars["DateTime"];
  txHash: Scalars["Hash"];
};

export type LoanActivityConnection = {
  __typename?: "LoanActivityConnection";
  edges: Array<LoanActivityEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type LoanActivityEdge = {
  __typename?: "LoanActivityEdge";
  cursor: Scalars["String"];
  node: LoanActivity;
};

export enum LoanActivitySortField {
  Timestamp = "TIMESTAMP",
}

export type LoanActivitySortInput = {
  field: LoanActivitySortField;
  order: Ordering;
};

export enum LoanActivityType {
  LoanAuctioned = "LOAN_AUCTIONED",
  LoanForeclosed = "LOAN_FORECLOSED",
  LoanInitiated = "LOAN_INITIATED",
  LoanRefinanced = "LOAN_REFINANCED",
  LoanRepaid = "LOAN_REPAID",
  LoanSentToAuction = "LOAN_SENT_TO_AUCTION",
}

export type LoanAuctioned = LoanActivity &
  Node & {
    __typename?: "LoanAuctioned";
    id: Scalars["String"];
    indexInBlock: Scalars["Int"];
    loan: Loan;
    loanId: Scalars["String"];
    loanPayments: Array<LoanPayment>;
    multiSourceLoanHistory?: Maybe<MultiSourceLoanHistory>;
    timestamp: Scalars["DateTime"];
    totalAuctioned: Scalars["BigInt"];
    txHash: Scalars["Hash"];
  };

export type LoanAuctionedNotification = Node &
  Notification & {
    __typename?: "LoanAuctionedNotification";
    auction: Auction;
    createdOn: Scalars["DateTime"];
    id: Scalars["String"];
    loan: MultiSourceLoan;
    notificationType: Scalars["String"];
    readOn?: Maybe<Scalars["DateTime"]>;
    user: User;
  };

export type LoanDefaultReminderNotification = Node &
  Notification & {
    __typename?: "LoanDefaultReminderNotification";
    createdOn: Scalars["DateTime"];
    defaultsInHours: Scalars["Int"];
    id: Scalars["String"];
    loan: MultiSourceLoan;
    notificationType: Scalars["String"];
    readOn?: Maybe<Scalars["DateTime"]>;
    user: User;
  };

export type LoanDefaultedNotification = Node &
  Notification & {
    __typename?: "LoanDefaultedNotification";
    createdOn: Scalars["DateTime"];
    id: Scalars["String"];
    loan: MultiSourceLoan;
    notificationType: Scalars["String"];
    readOn?: Maybe<Scalars["DateTime"]>;
    user: User;
  };

export type LoanForeclosed = LoanActivity &
  Node & {
    __typename?: "LoanForeclosed";
    id: Scalars["String"];
    indexInBlock: Scalars["Int"];
    loan: Loan;
    loanId: Scalars["String"];
    multiSourceLoanHistory?: Maybe<MultiSourceLoanHistory>;
    timestamp: Scalars["DateTime"];
    txHash: Scalars["Hash"];
  };

export type LoanInitiated = LoanActivity &
  Node & {
    __typename?: "LoanInitiated";
    id: Scalars["String"];
    indexInBlock: Scalars["Int"];
    loan: Loan;
    loanId: Scalars["String"];
    multiSourceLoanHistory?: Maybe<MultiSourceLoanHistory>;
    timestamp: Scalars["DateTime"];
    txHash: Scalars["Hash"];
  };

export type LoanPayment = Node & {
  __typename?: "LoanPayment";
  accruedInterest: Scalars["BigInt"];
  activityId: Scalars["String"];
  destination: Scalars["Address"];
  id: Scalars["String"];
  pendingInterest: Scalars["BigInt"];
  principalAddress: Scalars["Address"];
  principalAmount: Scalars["BigInt"];
  protocolFee: Scalars["BigInt"];
  source: Scalars["Address"];
};

export type LoanRefinanced = LoanActivity &
  Node & {
    __typename?: "LoanRefinanced";
    id: Scalars["String"];
    indexInBlock: Scalars["Int"];
    loan: Loan;
    loanId: Scalars["String"];
    multiSourceLoanHistory?: Maybe<MultiSourceLoanHistory>;
    timestamp: Scalars["DateTime"];
    txHash: Scalars["Hash"];
  };

export type LoanRefinancedNotification = Node &
  Notification & {
    __typename?: "LoanRefinancedNotification";
    createdOn: Scalars["DateTime"];
    id: Scalars["String"];
    newHistory: MultiSourceLoanHistory;
    notificationType: Scalars["String"];
    previousHistory: MultiSourceLoanHistory;
    readOn?: Maybe<Scalars["DateTime"]>;
    user: User;
  };

export type LoanRepaid = LoanActivity &
  Node & {
    __typename?: "LoanRepaid";
    id: Scalars["String"];
    indexInBlock: Scalars["Int"];
    loan: Loan;
    loanId: Scalars["String"];
    multiSourceLoanHistory?: Maybe<MultiSourceLoanHistory>;
    timestamp: Scalars["DateTime"];
    totalInterest: Scalars["BigInt"];
    txHash: Scalars["Hash"];
  };

export type LoanRepaidNotification = Node &
  Notification & {
    __typename?: "LoanRepaidNotification";
    createdOn: Scalars["DateTime"];
    id: Scalars["String"];
    loan: MultiSourceLoan;
    notificationType: Scalars["String"];
    readOn?: Maybe<Scalars["DateTime"]>;
    user: User;
  };

export type LoanSentToAuction = LoanActivity &
  Node & {
    __typename?: "LoanSentToAuction";
    id: Scalars["String"];
    indexInBlock: Scalars["Int"];
    liquidatorAddress: Scalars["Address"];
    loan: Loan;
    loanId: Scalars["String"];
    multiSourceLoanHistory?: Maybe<MultiSourceLoanHistory>;
    timestamp: Scalars["DateTime"];
    txHash: Scalars["Hash"];
  };

export enum LoanSortField {
  AprBps = "APR_BPS",
  Duration = "DURATION",
  ExpectedInterest = "EXPECTED_INTEREST",
  ExpirationDate = "EXPIRATION_DATE",
  OriginationFee = "ORIGINATION_FEE",
  PaidInterest = "PAID_INTEREST",
  PrincipalAmount = "PRINCIPAL_AMOUNT",
  StartTime = "START_TIME",
  TotalInterest = "TOTAL_INTEREST",
}

export type LoanSortInput = {
  field: LoanSortField;
  order: Ordering;
};

export enum LoanStatusType {
  LoanAuctioned = "LOAN_AUCTIONED",
  LoanDefaulted = "LOAN_DEFAULTED",
  LoanForeclosed = "LOAN_FORECLOSED",
  LoanInitiated = "LOAN_INITIATED",
  LoanRepaid = "LOAN_REPAID",
  LoanSentToAuction = "LOAN_SENT_TO_AUCTION",
}

export type LostSource = Node & {
  __typename?: "LostSource";
  accruedInterest: Scalars["BigInt"];
  aprBps: Scalars["BigInt"];
  duration: Scalars["BigInt"];
  id: Scalars["String"];
  lenderAddress: Scalars["String"];
  loan: MultiSourceLoan;
  originationFee: Scalars["BigInt"];
  principalAmount: Scalars["BigInt"];
  startTime: Scalars["DateTime"];
};

export type LostSourceNotification = Node &
  Notification & {
    __typename?: "LostSourceNotification";
    createdOn: Scalars["DateTime"];
    id: Scalars["String"];
    lostSource: LostSource;
    notificationType: Scalars["String"];
    readOn?: Maybe<Scalars["DateTime"]>;
    user: User;
  };

export type ManyNftsStatistics = {
  __typename?: "ManyNftsStatistics";
  bestOffer?: Maybe<CurrencyAmount>;
  floorPrice?: Maybe<CurrencyAmount>;
  floorPrice7d?: Maybe<Scalars["Float"]>;
  floorPrice30d?: Maybe<Scalars["Float"]>;
  lastSale?: Maybe<Sale>;
  nftsCount?: Maybe<Scalars["Float"]>;
  totalVolume?: Maybe<Scalars["Float"]>;
  totalVolume1d?: Maybe<Scalars["Float"]>;
  totalVolume1m?: Maybe<Scalars["Float"]>;
  totalVolume1w?: Maybe<Scalars["Float"]>;
  totalVolume1y?: Maybe<Scalars["Float"]>;
  totalVolume2m?: Maybe<Scalars["Float"]>;
  totalVolume3m?: Maybe<Scalars["Float"]>;
  totalVolume4m?: Maybe<Scalars["Float"]>;
};

export enum MarketplaceEnum {
  Gondi = "GONDI",
  Nftfi = "NFTFI",
}

export type MultiSourceLoan = Loan &
  Node & {
    __typename?: "MultiSourceLoan";
    activities: Array<LoanActivity>;
    address: Scalars["Address"];
    auction?: Maybe<Auction>;
    blendedAprBps: Scalars["Float"];
    borrowerAddress: Scalars["Address"];
    currency?: Maybe<Currency>;
    duration: Scalars["BigInt"];
    id: Scalars["String"];
    indexInBlock: Scalars["Int"];
    loanId: Scalars["Int"];
    nft: Nft;
    offer: Offer;
    principalAddress: Scalars["Address"];
    principalAmount: Scalars["BigInt"];
    repaidActivity?: Maybe<LoanRepaid>;
    sources: Array<Source>;
    startTime: Scalars["DateTime"];
    status: Scalars["String"];
    timestamp: Scalars["DateTime"];
    totalOriginationFee: Scalars["BigInt"];
    txHash: Scalars["Hash"];
  };

export type MultiSourceLoanConnection = {
  __typename?: "MultiSourceLoanConnection";
  edges: Array<MultiSourceLoanEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type MultiSourceLoanEdge = {
  __typename?: "MultiSourceLoanEdge";
  cursor: Scalars["String"];
  node: MultiSourceLoan;
};

export type MultiSourceLoanHistory = Node & {
  __typename?: "MultiSourceLoanHistory";
  activity: LoanActivity;
  borrowerAddress: Scalars["String"];
  duration: Scalars["BigInt"];
  id: Scalars["String"];
  offerId: Scalars["String"];
  principalAddress: Scalars["String"];
  principalAmount: Scalars["BigInt"];
  sources: Array<SourceHistory>;
  startTime: Scalars["DateTime"];
};

export type Mutation = {
  __typename?: "Mutation";
  addListingsOfNftsFromUser?: Maybe<Scalars["Void"]>;
  addOrUpdateListing: Listing;
  generateCollectionOfferToBeSigned: CollectionOffer;
  generateRenegotiationOfferToBeSigned: Renegotiation;
  generateSingleNftOfferToBeSigned: SingleNftOffer;
  hideAllOffers: Array<Offer>;
  hideOffer: Offer;
  hideRenegotiation: Renegotiation;
  markNotificationIdsAsRead?: Maybe<Scalars["Void"]>;
  markNotificationsAsRead?: Maybe<Scalars["Void"]>;
  removeListing: Listing;
  removeListingsOfNftsFromUser?: Maybe<Scalars["Void"]>;
  saveRenegotiationSignedOffer: Renegotiation;
  saveSignedCollectionOffer: CollectionOffer;
  saveSignedSingleNftOffer: SingleNftOffer;
  setReferral?: Maybe<Scalars["Void"]>;
  showOffer: Offer;
  showRenegotiation: Renegotiation;
};

export type MutationAddListingsOfNftsFromUserArgs = {
  desiredDuration?: InputMaybe<Scalars["Int"]>;
  desiredPrincipalAddress?: InputMaybe<Scalars["Address"]>;
};

export type MutationAddOrUpdateListingArgs = {
  desiredDuration?: InputMaybe<Scalars["Int"]>;
  desiredPrincipalAddress?: InputMaybe<Scalars["Address"]>;
  nftId: Scalars["Int"];
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
  contractAddress: Scalars["Address"];
  minOfferId: Scalars["String"];
};

export type MutationHideOfferArgs = {
  contractAddress: Scalars["Address"];
  offerId: Scalars["String"];
};

export type MutationHideRenegotiationArgs = {
  renegotiationId: Scalars["String"];
};

export type MutationMarkNotificationIdsAsReadArgs = {
  ids?: InputMaybe<Array<Scalars["Int"]>>;
};

export type MutationRemoveListingArgs = {
  nftId: Scalars["Int"];
};

export type MutationSaveRenegotiationSignedOfferArgs = {
  signedRenegotiationInput: SignedRenegotiationOfferInput;
};

export type MutationSaveSignedCollectionOfferArgs = {
  signedOfferInput: CollectionSignedOfferInput;
};

export type MutationSaveSignedSingleNftOfferArgs = {
  signedOfferInput: SingleNftSignedOfferInput;
};

export type MutationSetReferralArgs = {
  referrerId: Scalars["Int"];
};

export type MutationShowOfferArgs = {
  contractAddress: Scalars["Address"];
  offerId: Scalars["String"];
};

export type MutationShowRenegotiationArgs = {
  renegotiationId: Scalars["String"];
};

export type Nft = Node & {
  __typename?: "NFT";
  activeLoan?: Maybe<Loan>;
  collection?: Maybe<Collection>;
  createdDate: Scalars["DateTime"];
  description?: Maybe<Scalars["String"]>;
  id: Scalars["String"];
  image?: Maybe<Asset>;
  isFlagged?: Maybe<Scalars["Boolean"]>;
  listed?: Maybe<Listing>;
  marketPlaceOfPrice?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  nftId: Scalars["String"];
  owner?: Maybe<Scalars["Address"]>;
  price?: Maybe<Scalars["BigInt"]>;
  priceCurrencyAddress?: Maybe<Scalars["String"]>;
  rarityRank?: Maybe<Scalars["Int"]>;
  rarityScore?: Maybe<Scalars["Float"]>;
  statistics: NftStatistics;
  tokenId: Scalars["BigInt"];
  traits: Array<Trait>;
  url?: Maybe<Scalars["String"]>;
};

export type NftConnection = {
  __typename?: "NFTConnection";
  edges: Array<NftEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type NftEdge = {
  __typename?: "NFTEdge";
  cursor: Scalars["String"];
  node: Nft;
};

export type NewOfferNotification = Node &
  Notification & {
    __typename?: "NewOfferNotification";
    createdOn: Scalars["DateTime"];
    id: Scalars["String"];
    notificationType: Scalars["String"];
    offer: Offer;
    readOn?: Maybe<Scalars["DateTime"]>;
    user: User;
  };

export type NewRenegotiationOfferNotification = Node &
  Notification & {
    __typename?: "NewRenegotiationOfferNotification";
    createdOn: Scalars["DateTime"];
    id: Scalars["String"];
    loan: MultiSourceLoan;
    notificationType: Scalars["String"];
    readOn?: Maybe<Scalars["DateTime"]>;
    renegotiation: Renegotiation;
    user: User;
  };

export enum NftSortField {
  Collection = "COLLECTION",
  Name = "NAME",
  OffersCount = "OFFERS_COUNT",
  Status = "STATUS",
}

export type NftSortInput = {
  field: NftSortField;
  order: Ordering;
  principalAddress?: InputMaybe<Scalars["Address"]>;
};

export type NftStatistics = {
  __typename?: "NftStatistics";
  bestOffer?: Maybe<CurrencyAmount>;
  floorPrice?: Maybe<CurrencyAmount>;
  floorPrice7d?: Maybe<Scalars["Float"]>;
  floorPrice30d?: Maybe<Scalars["Float"]>;
  lastSale?: Maybe<Sale>;
  loansTotalVolume: Scalars["BigInt"];
  numberOfOffers: Scalars["Float"];
  topTraitFloorPrice?: Maybe<CurrencyAmount>;
  totalVolume?: Maybe<Scalars["Float"]>;
  totalVolume1d?: Maybe<Scalars["Float"]>;
  totalVolume1m?: Maybe<Scalars["Float"]>;
  totalVolume1w?: Maybe<Scalars["Float"]>;
  totalVolume1y?: Maybe<Scalars["Float"]>;
  totalVolume2m?: Maybe<Scalars["Float"]>;
  totalVolume3m?: Maybe<Scalars["Float"]>;
  totalVolume4m?: Maybe<Scalars["Float"]>;
};

export type NftStatisticsLoansTotalVolumeArgs = {
  currencyAddress: Scalars["Address"];
};

export type NftStatisticsNumberOfOffersArgs = {
  currencyAddress: Scalars["Address"];
};

export type Node = {
  id: Scalars["String"];
};

export type Notification = {
  createdOn: Scalars["DateTime"];
  id: Scalars["String"];
  notificationType: Scalars["String"];
  readOn?: Maybe<Scalars["DateTime"]>;
  user: User;
};

export type NotificationConnection = {
  __typename?: "NotificationConnection";
  edges: Array<NotificationEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type NotificationEdge = {
  __typename?: "NotificationEdge";
  cursor: Scalars["String"];
  node: Notification;
};

export enum NotificationType {
  AuctionWonNotification = "AUCTION_WON_NOTIFICATION",
  LoanDefaultedNotification = "LOAN_DEFAULTED_NOTIFICATION",
  LoanDefaultReminderNotification = "LOAN_DEFAULT_REMINDER_NOTIFICATION",
  LoanRepaidNotification = "LOAN_REPAID_NOTIFICATION",
  LostSourceNotification = "LOST_SOURCE_NOTIFICATION",
  NewOfferNotification = "NEW_OFFER_NOTIFICATION",
  NewRenegotiationOfferNotification = "NEW_RENEGOTIATION_OFFER_NOTIFICATION",
  OfferAcceptedNotification = "OFFER_ACCEPTED_NOTIFICATION",
  OutbidNotification = "OUTBID_NOTIFICATION",
  SetNftNotification = "SET_NFT_NOTIFICATION",
}

export type Offer = {
  aprBps: Scalars["BigInt"];
  borrowerAddress?: Maybe<Scalars["Address"]>;
  capacity: Scalars["BigInt"];
  contractAddress: Scalars["Address"];
  createdDate?: Maybe<Scalars["DateTime"]>;
  currency?: Maybe<Currency>;
  duration: Scalars["BigInt"];
  expirationTime: Scalars["BigInt"];
  fee: Scalars["BigInt"];
  hidden?: Maybe<Scalars["Boolean"]>;
  id: Scalars["String"];
  lenderAddress?: Maybe<Scalars["Address"]>;
  offerHash?: Maybe<Scalars["Hash"]>;
  offerId: Scalars["BigInt"];
  principalAddress: Scalars["Address"];
  principalAmount: Scalars["BigInt"];
  repayment: Scalars["BigInt"];
  requiresLiquidation: Scalars["Boolean"];
  signature?: Maybe<Scalars["Signature"]>;
  signerAddress?: Maybe<Scalars["Address"]>;
  status: Scalars["String"];
  validators: Array<OfferValidator>;
};

export type OfferAcceptedNotification = Node &
  Notification & {
    __typename?: "OfferAcceptedNotification";
    createdOn: Scalars["DateTime"];
    id: Scalars["String"];
    loan: MultiSourceLoan;
    notificationType: Scalars["String"];
    offer: Offer;
    readOn?: Maybe<Scalars["DateTime"]>;
    user: User;
  };

export type OfferConnection = {
  __typename?: "OfferConnection";
  edges: Array<OfferEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type OfferEdge = {
  __typename?: "OfferEdge";
  cursor: Scalars["String"];
  node: Offer;
};

export type OfferStatistics = {
  __typename?: "OfferStatistics";
  consumedCapacity: Scalars["BigInt"];
};

export enum OfferStatus {
  Active = "ACTIVE",
  Cancelled = "CANCELLED",
  Executed = "EXECUTED",
  Expired = "EXPIRED",
  Inactive = "INACTIVE",
  Outperformed = "OUTPERFORMED",
}

export type OfferValidator = Node & {
  __typename?: "OfferValidator";
  arguments: Scalars["Hex"];
  id: Scalars["String"];
  offerId: Scalars["String"];
  validator: Scalars["Address"];
};

export type OfferValidatorInput = {
  arguments: Scalars["Hex"];
  validator: Scalars["Address"];
};

export type OffersAndRenegotiations = Renegotiation | SingleNftOffer;

export type OffersAndRenegotiationsConnection = {
  __typename?: "OffersAndRenegotiationsConnection";
  edges: Array<OffersAndRenegotiationsEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type OffersAndRenegotiationsEdge = {
  __typename?: "OffersAndRenegotiationsEdge";
  cursor: Scalars["String"];
  node: OffersAndRenegotiations;
};

export enum OffersSortField {
  AprBps = "APR_BPS",
  CreatedDate = "CREATED_DATE",
  DailyInterest = "DAILY_INTEREST",
  Duration = "DURATION",
  Expiration = "EXPIRATION",
  NetPrincipal = "NET_PRINCIPAL",
  PrincipalAmount = "PRINCIPAL_AMOUNT",
  Repayment = "REPAYMENT",
  Status = "STATUS",
  TotalInterest = "TOTAL_INTEREST",
}

export type OffersSortInput = {
  field: OffersSortField;
  order: Ordering;
};

export type Order = {
  createdDate: Scalars["DateTime"];
  currency: Currency;
  currencyAddress: Scalars["Address"];
  executionData: Scalars["String"];
  expiration?: Maybe<Scalars["DateTime"]>;
  id: Scalars["String"];
  isAsk: Scalars["Boolean"];
  maker: Scalars["String"];
  marketPlace: Scalars["String"];
  marketPlaceId: Scalars["String"];
  orderType: Scalars["String"];
  price: Scalars["Float"];
  status: Scalars["String"];
  timestamp: Scalars["DateTime"];
  txHash?: Maybe<Scalars["Hash"]>;
};

export enum Ordering {
  Asc = "ASC",
  Desc = "DESC",
}

export type OutbidNotification = Node &
  Notification & {
    __typename?: "OutbidNotification";
    auction: Auction;
    createdOn: Scalars["DateTime"];
    id: Scalars["String"];
    loan: MultiSourceLoan;
    newBid: Bid;
    notificationType: Scalars["String"];
    readOn?: Maybe<Scalars["DateTime"]>;
    user: User;
    userBid: Bid;
  };

export type PageInfo = {
  __typename?: "PageInfo";
  endCursor?: Maybe<Scalars["String"]>;
  hasNextPage: Scalars["Boolean"];
  hasPreviousPage: Scalars["Boolean"];
  startCursor?: Maybe<Scalars["String"]>;
};

export type PointActivity = Node & {
  __typename?: "PointActivity";
  id: Scalars["String"];
  loanActivity: LoanActivity;
  points: Scalars["BigInt"];
  reason: Scalars["String"];
  timestamp: Scalars["DateTime"];
  userId: Scalars["Int"];
};

export type PointActivityConnection = {
  __typename?: "PointActivityConnection";
  edges: Array<PointActivityEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type PointActivityEdge = {
  __typename?: "PointActivityEdge";
  cursor: Scalars["String"];
  node: PointActivity;
};

export type Query = {
  __typename?: "Query";
  getCollectionBySlug?: Maybe<Collection>;
  getCollectionsByContractAddress: Array<Collection>;
  getListingById?: Maybe<Listing>;
  getLoanById?: Maybe<Loan>;
  getNftByContractAddressAndTokenId?: Maybe<Nft>;
  getNftBySlugAndTokenId?: Maybe<Nft>;
  getPointsFromReferrals: Scalars["Int"];
  getReferredWallets: Scalars["Int"];
  getUserPointActivities: PointActivityConnection;
  getUserPoints: Scalars["Int"];
  listAuctions: AuctionConnection;
  listBids: BidConnection;
  listCollections: CollectionConnection;
  listCollectionsWithListings: CollectionConnection;
  listCollectionsWithLoans: CollectionConnection;
  listListings: ListingConnection;
  listLoanActivities: LoanActivityConnection;
  listLoans: MultiSourceLoanConnection;
  listNftOffersAndRenegotiations: OffersAndRenegotiationsConnection;
  listNftsFromCollection: NftConnection;
  listNftsFromUser: NftConnection;
  listNotifications: NotificationConnection;
  listOffers: OfferConnection;
  listRenegotiations: RenegotiationConnection;
  listSources: SourcesAndLostSourcesConnection;
  me?: Maybe<User>;
};

export type QueryGetCollectionBySlugArgs = {
  slug: Scalars["String"];
};

export type QueryGetCollectionsByContractAddressArgs = {
  contractAddress: Scalars["Address"];
};

export type QueryGetListingByIdArgs = {
  listingId: Scalars["Int"];
};

export type QueryGetLoanByIdArgs = {
  address: Scalars["String"];
  loanId: Scalars["Int"];
};

export type QueryGetNftByContractAddressAndTokenIdArgs = {
  contractAddress: Scalars["Address"];
  tokenId: Scalars["BigInt"];
};

export type QueryGetNftBySlugAndTokenIdArgs = {
  slug: Scalars["String"];
  tokenId: Scalars["BigInt"];
};

export type QueryGetUserPointActivitiesArgs = {
  after?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
};

export type QueryListAuctionsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  currencyAddress?: InputMaybe<Scalars["Address"]>;
  first?: InputMaybe<Scalars["Int"]>;
  sortBy?: InputMaybe<Array<AuctionSortInput>>;
  statuses?: InputMaybe<Array<AuctionStatus>>;
};

export type QueryListBidsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  auctionId?: InputMaybe<Scalars["String"]>;
  bidder?: InputMaybe<Scalars["String"]>;
  currencyAddress?: InputMaybe<Scalars["Address"]>;
  first?: InputMaybe<Scalars["Int"]>;
  onlyLatest?: Scalars["Boolean"];
  sortBy?: InputMaybe<Array<BidSortInput>>;
};

export type QueryListCollectionsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  searchTerm?: InputMaybe<Scalars["String"]>;
};

export type QueryListCollectionsWithListingsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  first?: Scalars["Int"];
  searchTerm?: InputMaybe<Scalars["String"]>;
};

export type QueryListCollectionsWithLoansArgs = {
  after?: InputMaybe<Scalars["String"]>;
  first?: Scalars["Int"];
  searchTerm?: InputMaybe<Scalars["String"]>;
};

export type QueryListListingsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  collectionIds?: InputMaybe<Array<Scalars["Int"]>>;
  first?: InputMaybe<Scalars["Int"]>;
  marketplaceNames?: InputMaybe<Array<MarketplaceEnum>>;
  searchTerm?: InputMaybe<Scalars["String"]>;
  userFilter?: InputMaybe<UserFilter>;
  withLoans?: InputMaybe<Scalars["Boolean"]>;
};

export type QueryListLoanActivitiesArgs = {
  after?: InputMaybe<Scalars["String"]>;
  first?: Scalars["Int"];
  loanId?: InputMaybe<Scalars["String"]>;
  sortBy?: InputMaybe<Array<LoanActivitySortInput>>;
  types?: InputMaybe<Array<LoanActivityType>>;
};

export type QueryListLoansArgs = {
  after?: InputMaybe<Scalars["String"]>;
  borrowerAddress?: InputMaybe<Scalars["String"]>;
  collections?: InputMaybe<Array<Scalars["Int"]>>;
  currencyAddress?: InputMaybe<Scalars["Address"]>;
  first?: Scalars["Int"];
  nfts?: InputMaybe<Array<Scalars["Int"]>>;
  orderByStatuses?: InputMaybe<Scalars["Boolean"]>;
  sortBy?: InputMaybe<Array<LoanSortInput>>;
  statuses?: InputMaybe<Array<LoanStatusType>>;
  terms?: InputMaybe<TermsFilter>;
};

export type QueryListNftOffersAndRenegotiationsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  currencyAddress?: InputMaybe<Scalars["Address"]>;
  first?: InputMaybe<Scalars["Int"]>;
  hidden?: InputMaybe<Scalars["Boolean"]>;
  lenderAddress?: InputMaybe<Scalars["String"]>;
  sortBy?: InputMaybe<OffersSortInput>;
  statuses?: InputMaybe<Array<OfferStatus>>;
  terms?: InputMaybe<TermsFilter>;
};

export type QueryListNftsFromCollectionArgs = {
  after?: InputMaybe<Scalars["String"]>;
  collectionId: Scalars["Int"];
  first?: InputMaybe<Scalars["Int"]>;
  searchTerm?: InputMaybe<Scalars["String"]>;
};

export type QueryListNftsFromUserArgs = {
  after?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  searchTerm?: InputMaybe<Scalars["String"]>;
  sortBy?: InputMaybe<Array<NftSortInput>>;
  withLoans?: InputMaybe<Scalars["Boolean"]>;
};

export type QueryListNotificationsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  notificationTypes?: InputMaybe<Array<NotificationType>>;
  onlyRead?: Scalars["Boolean"];
  onlyUnread?: Scalars["Boolean"];
};

export type QueryListOffersArgs = {
  after?: InputMaybe<Scalars["String"]>;
  borrowerAddress?: InputMaybe<Scalars["String"]>;
  collections?: InputMaybe<Array<Scalars["Int"]>>;
  currencyAddress?: InputMaybe<Scalars["Address"]>;
  first?: InputMaybe<Scalars["Int"]>;
  hidden?: InputMaybe<Scalars["Boolean"]>;
  lenderAddress?: InputMaybe<Scalars["String"]>;
  nfts?: InputMaybe<Array<Scalars["Int"]>>;
  onlyCollectionOffers?: InputMaybe<Scalars["Boolean"]>;
  onlySingleNftOffers?: InputMaybe<Scalars["Boolean"]>;
  sortBy?: InputMaybe<Array<OffersSortInput>>;
  statuses?: InputMaybe<Array<OfferStatus>>;
  terms?: InputMaybe<TermsFilter>;
  worseOffers?: InputMaybe<Scalars["Boolean"]>;
};

export type QueryListRenegotiationsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  first?: InputMaybe<Scalars["Int"]>;
  hidden?: InputMaybe<Scalars["Boolean"]>;
  loanId?: InputMaybe<Scalars["String"]>;
  sortBy?: InputMaybe<Array<OffersSortInput>>;
  statuses?: InputMaybe<Array<OfferStatus>>;
  terms?: InputMaybe<RefinanceTermsFilter>;
};

export type QueryListSourcesArgs = {
  after?: InputMaybe<Scalars["String"]>;
  currencyAddress?: InputMaybe<Scalars["Address"]>;
  first?: Scalars["Int"];
  includeLost?: InputMaybe<Scalars["Boolean"]>;
  lenderAddress?: InputMaybe<Scalars["String"]>;
  sortBy?: InputMaybe<Array<SourceSortInput>>;
  statuses?: InputMaybe<Array<LoanStatusType>>;
  terms?: InputMaybe<TermsFilter>;
};

export type RangeInput = {
  max: Scalars["Int"];
  min: Scalars["Int"];
};

export type RefinanceTermsFilter = {
  aprBps?: InputMaybe<Interval>;
  duration?: InputMaybe<Interval>;
  fee?: InputMaybe<Interval>;
  netPrincipal?: InputMaybe<Interval>;
  principal?: InputMaybe<Interval>;
  remainingTime?: InputMaybe<Interval>;
};

export type Renegotiation = Node & {
  __typename?: "Renegotiation";
  aprBps: Scalars["BigInt"];
  createdDate?: Maybe<Scalars["DateTime"]>;
  duration: Scalars["BigInt"];
  expirationTime: Scalars["BigInt"];
  feeAmount: Scalars["BigInt"];
  hidden?: Maybe<Scalars["Boolean"]>;
  id: Scalars["String"];
  lenderAddress?: Maybe<Scalars["Address"]>;
  loanAddress: Scalars["Address"];
  loanId: Scalars["BigInt"];
  loanReferenceId: Scalars["String"];
  nft: Nft;
  offerHash?: Maybe<Scalars["Hash"]>;
  principalAmount: Scalars["BigInt"];
  renegotiationId: Scalars["BigInt"];
  repayment: Scalars["BigInt"];
  requiresLiquidation: Scalars["Boolean"];
  signature?: Maybe<Scalars["Signature"]>;
  signerAddress?: Maybe<Scalars["Address"]>;
  status: Scalars["String"];
  strictImprovement: Scalars["Boolean"];
};

export type RenegotiationConnection = {
  __typename?: "RenegotiationConnection";
  edges: Array<RenegotiationEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type RenegotiationEdge = {
  __typename?: "RenegotiationEdge";
  cursor: Scalars["String"];
  node: Renegotiation;
};

export type RenegotiationOfferInput = {
  aprBps: Scalars["BigInt"];
  duration: Scalars["BigInt"];
  expirationTime: Scalars["BigInt"];
  feeAmount: Scalars["BigInt"];
  lenderAddress: Scalars["Address"];
  loanId: Scalars["String"];
  principalAmount: Scalars["BigInt"];
  requiresLiquidation?: InputMaybe<Scalars["Boolean"]>;
  signerAddress: Scalars["Address"];
  strictImprovement?: InputMaybe<Scalars["Boolean"]>;
  targetPrincipal: Array<Scalars["BigInt"]>;
};

export type Royalty = {
  __typename?: "Royalty";
  beneficiary: Scalars["String"];
  percentage: Scalars["Float"];
};

export type Sale = Activity &
  Node & {
    __typename?: "Sale";
    id: Scalars["String"];
    nft: Nft;
    order: Order;
    taker: Scalars["String"];
    timestamp: Scalars["DateTime"];
    txHash?: Maybe<Scalars["Hash"]>;
  };

export type Set = Node & {
  __typename?: "Set";
  collection?: Maybe<Collection>;
  collections: CollectionConnection;
  createdDate: Scalars["DateTime"];
  creator: User;
  creatorId: Scalars["String"];
  creators: Array<User>;
  description: Scalars["String"];
  followersCount: Scalars["Int"];
  id: Scalars["String"];
  isActive: Scalars["Boolean"];
  isPublic: Scalars["Boolean"];
  isVerified?: Maybe<Scalars["Boolean"]>;
  lastModified: Scalars["DateTime"];
  name: Scalars["String"];
  nftsCount: Scalars["Int"];
  setFollowerPosition?: Maybe<SetFollower>;
  slug?: Maybe<Scalars["String"]>;
  statistics: ManyNftsStatistics;
  tags?: Maybe<Array<Tag>>;
};

export type SetCollectionsArgs = {
  after?: InputMaybe<Scalars["String"]>;
  first?: Scalars["Int"];
};

export type SetFollower = Node & {
  __typename?: "SetFollower";
  createdDate: Scalars["DateTime"];
  id: Scalars["String"];
  position: Scalars["Int"];
  setId: Scalars["Int"];
  userId: Scalars["Int"];
};

export type SetNftNotification = Node &
  Notification & {
    __typename?: "SetNftNotification";
    createdOn: Scalars["DateTime"];
    id: Scalars["String"];
    nft: Nft;
    nftNotificationReasonName: Scalars["String"];
    notificationType: Scalars["String"];
    readOn?: Maybe<Scalars["DateTime"]>;
    set: Set;
    user: User;
  };

export type SignedRenegotiationOfferInput = {
  aprBps: Scalars["BigInt"];
  duration: Scalars["BigInt"];
  expirationTime: Scalars["BigInt"];
  feeAmount: Scalars["BigInt"];
  lenderAddress: Scalars["Address"];
  loanId: Scalars["String"];
  offerHash: Scalars["Hash"];
  principalAmount: Scalars["BigInt"];
  renegotiationId: Scalars["BigInt"];
  requiresLiquidation?: InputMaybe<Scalars["Boolean"]>;
  signature: Scalars["Signature"];
  signerAddress: Scalars["Address"];
  strictImprovement?: InputMaybe<Scalars["Boolean"]>;
  targetPrincipal: Array<Scalars["BigInt"]>;
};

export type SingleNftOffer = Node &
  Offer & {
    __typename?: "SingleNFTOffer";
    aprBps: Scalars["BigInt"];
    borrowerAddress?: Maybe<Scalars["Address"]>;
    capacity: Scalars["BigInt"];
    contractAddress: Scalars["Address"];
    createdDate?: Maybe<Scalars["DateTime"]>;
    currency?: Maybe<Currency>;
    duration: Scalars["BigInt"];
    expirationTime: Scalars["BigInt"];
    fee: Scalars["BigInt"];
    hidden?: Maybe<Scalars["Boolean"]>;
    id: Scalars["String"];
    lenderAddress?: Maybe<Scalars["Address"]>;
    nft: Nft;
    offerHash?: Maybe<Scalars["Hash"]>;
    offerId: Scalars["BigInt"];
    principalAddress: Scalars["Address"];
    principalAmount: Scalars["BigInt"];
    repayment: Scalars["BigInt"];
    requiresLiquidation: Scalars["Boolean"];
    signature?: Maybe<Scalars["Signature"]>;
    signerAddress?: Maybe<Scalars["Address"]>;
    statistics: OfferStatistics;
    status: Scalars["String"];
    validators: Array<OfferValidator>;
  };

export type SingleNftOfferInput = {
  aprBps: Scalars["BigInt"];
  borrowerAddress: Scalars["Address"];
  capacity: Scalars["BigInt"];
  contractAddress: Scalars["Address"];
  duration: Scalars["BigInt"];
  expirationTime: Scalars["BigInt"];
  fee: Scalars["BigInt"];
  lenderAddress: Scalars["Address"];
  nftId: Scalars["Int"];
  offerValidators: Array<OfferValidatorInput>;
  principalAddress: Scalars["Address"];
  principalAmount: Scalars["BigInt"];
  requiresLiquidation: Scalars["Boolean"];
  signerAddress: Scalars["Address"];
};

export type SingleNftOrder = Activity &
  Node &
  Order & {
    __typename?: "SingleNFTOrder";
    createdDate: Scalars["DateTime"];
    currency: Currency;
    currencyAddress: Scalars["Address"];
    executionData: Scalars["String"];
    expiration?: Maybe<Scalars["DateTime"]>;
    id: Scalars["String"];
    isAsk: Scalars["Boolean"];
    maker: Scalars["String"];
    marketPlace: Scalars["String"];
    marketPlaceId: Scalars["String"];
    nft: Nft;
    orderType: Scalars["String"];
    price: Scalars["Float"];
    status: Scalars["String"];
    timestamp: Scalars["DateTime"];
    txHash?: Maybe<Scalars["Hash"]>;
  };

export type SingleNftSignedOfferInput = {
  aprBps: Scalars["BigInt"];
  borrowerAddress: Scalars["Address"];
  capacity: Scalars["BigInt"];
  contractAddress: Scalars["Address"];
  duration: Scalars["BigInt"];
  expirationTime: Scalars["BigInt"];
  fee: Scalars["BigInt"];
  lenderAddress: Scalars["Address"];
  nftId: Scalars["Int"];
  offerHash: Scalars["Hash"];
  offerId: Scalars["BigInt"];
  offerValidators: Array<OfferValidatorInput>;
  principalAddress: Scalars["Address"];
  principalAmount: Scalars["BigInt"];
  requiresLiquidation: Scalars["Boolean"];
  signature: Scalars["Signature"];
  signerAddress: Scalars["Address"];
};

export type SingleSourceLoan = Loan &
  Node & {
    __typename?: "SingleSourceLoan";
    accruedInterest: Scalars["BigInt"];
    activities: Array<LoanActivity>;
    address: Scalars["Address"];
    aprBps: Scalars["BigInt"];
    borrowerAddress: Scalars["Address"];
    currency?: Maybe<Currency>;
    duration: Scalars["BigInt"];
    id: Scalars["String"];
    indexInBlock: Scalars["Int"];
    lenderAddress: Scalars["Address"];
    loanId: Scalars["Int"];
    nft: Nft;
    offer: Offer;
    principalAddress: Scalars["Address"];
    principalAmount: Scalars["BigInt"];
    repaidActivity?: Maybe<LoanRepaid>;
    requiresLiquidation: Scalars["Boolean"];
    startTime: Scalars["DateTime"];
    status: Scalars["String"];
    timestamp: Scalars["DateTime"];
    txHash: Scalars["Hash"];
  };

export type Source = Node & {
  __typename?: "Source";
  accruedInterest: Scalars["BigInt"];
  aprBps: Scalars["BigInt"];
  id: Scalars["String"];
  lenderAddress: Scalars["String"];
  loan: MultiSourceLoan;
  loanId: Scalars["String"];
  originationFee: Scalars["BigInt"];
  principalAmount: Scalars["BigInt"];
  startTime: Scalars["DateTime"];
};

export type SourceHistory = Node & {
  __typename?: "SourceHistory";
  accruedInterest: Scalars["BigInt"];
  aprBps: Scalars["BigInt"];
  id: Scalars["String"];
  lenderAddress: Scalars["String"];
  loanId: Scalars["String"];
  originationFee: Scalars["BigInt"];
  principalAmount: Scalars["BigInt"];
  startTime: Scalars["DateTime"];
};

export enum SourceSortField {
  AccruedInterest = "ACCRUED_INTEREST",
  AprBps = "APR_BPS",
  DueDate = "DUE_DATE",
  Duration = "DURATION",
  EarnedInterest = "EARNED_INTEREST",
  OriginationFee = "ORIGINATION_FEE",
  PrincipalAmount = "PRINCIPAL_AMOUNT",
  StartTime = "START_TIME",
}

export type SourceSortInput = {
  field: SourceSortField;
  order: Ordering;
};

export type SourcesAndLostSources = LostSource | Source;

export type SourcesAndLostSourcesConnection = {
  __typename?: "SourcesAndLostSourcesConnection";
  edges: Array<SourcesAndLostSourcesEdge>;
  pageInfo: PageInfo;
  totalCount?: Maybe<Scalars["Int"]>;
};

export type SourcesAndLostSourcesEdge = {
  __typename?: "SourcesAndLostSourcesEdge";
  cursor: Scalars["String"];
  node: SourcesAndLostSources;
};

export type Tag = Node & {
  __typename?: "Tag";
  createdDate: Scalars["DateTime"];
  id: Scalars["String"];
  value: Scalars["String"];
};

export type TermsFilter = {
  aprBps?: InputMaybe<Interval>;
  duration?: InputMaybe<Interval>;
  fee?: InputMaybe<Interval>;
  netPrincipal?: InputMaybe<Interval>;
  principal?: InputMaybe<Interval>;
};

export type Trait = {
  __typename?: "Trait";
  collectionId: Scalars["String"];
  statistics: ManyNftsStatistics;
  type: Scalars["String"];
  value: Scalars["String"];
};

export type UnderfundedOfferNotification = Node &
  Notification & {
    __typename?: "UnderfundedOfferNotification";
    createdOn: Scalars["DateTime"];
    id: Scalars["String"];
    notificationType: Scalars["String"];
    offer: Offer;
    readOn?: Maybe<Scalars["DateTime"]>;
    user: User;
  };

export type User = Node & {
  __typename?: "User";
  about?: Maybe<Scalars["String"]>;
  beta: Scalars["Boolean"];
  blockchain: Scalars["String"];
  cart: Cart;
  cartId?: Maybe<Scalars["Int"]>;
  createdDate: Scalars["DateTime"];
  id: Scalars["String"];
  mail?: Maybe<Scalars["String"]>;
  mailValidationDate?: Maybe<Scalars["DateTime"]>;
  originalProfilePicture?: Maybe<Scalars["String"]>;
  profilePictureId?: Maybe<Scalars["Int"]>;
  size64ProfilePicture?: Maybe<Scalars["String"]>;
  size128ProfilePicture?: Maybe<Scalars["String"]>;
  size256ProfilePicture?: Maybe<Scalars["String"]>;
  size512ProfilePicture?: Maybe<Scalars["String"]>;
  twitterHandle?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  usedProduct: Scalars["Boolean"];
  username?: Maybe<Scalars["String"]>;
  walletAddress: Scalars["Address"];
};

export type UserFilter = {
  onlyOrExclude: Scalars["Boolean"];
  userId: Scalars["Int"];
};

export type ListNftMutationVariables = Exact<{
  nftId: Scalars["Int"];
}>;

export type ListNftMutation = {
  __typename?: "Mutation";
  addOrUpdateListing: { __typename?: "Listing"; id: string };
};

export type UnlistNftMutationVariables = Exact<{
  nftId: Scalars["Int"];
}>;

export type UnlistNftMutation = {
  __typename?: "Mutation";
  removeListing: { __typename?: "Listing"; id: string };
};

export type GenerateCollectionOfferHashMutationVariables = Exact<{
  offerInput: CollectionOfferInput;
}>;

export type GenerateCollectionOfferHashMutation = {
  __typename?: "Mutation";
  offer: {
    __typename?: "CollectionOffer";
    offerHash?: Hash | null;
    offerId: bigint;
    lenderAddress?: Address | null;
    signerAddress?: Address | null;
    borrowerAddress?: Address | null;
    validators: Array<{
      __typename?: "OfferValidator";
      validator: Address;
      arguments: Hex;
    }>;
    collection: {
      __typename?: "Collection";
      contractData?: {
        __typename?: "ContractData";
        contractAddress: Address;
      } | null;
    };
  };
};

export type SaveCollectionOfferMutationVariables = Exact<{
  offer: CollectionSignedOfferInput;
}>;

export type SaveCollectionOfferMutation = {
  __typename?: "Mutation";
  offer: {
    __typename?: "CollectionOffer";
    id: string;
    status: string;
    collection: {
      __typename?: "Collection";
      contractData?: {
        __typename?: "ContractData";
        contractAddress: Address;
      } | null;
    };
  };
};

export type HideOfferMutationVariables = Exact<{
  contract: Scalars["Address"];
  id: Scalars["String"];
}>;

export type HideOfferMutation = {
  __typename?: "Mutation";
  hideOffer:
    | { __typename?: "CollectionOffer"; id: string }
    | { __typename?: "SingleNFTOffer"; id: string };
};

export type GenerateSingleNftOfferHashMutationVariables = Exact<{
  offerInput: SingleNftOfferInput;
}>;

export type GenerateSingleNftOfferHashMutation = {
  __typename?: "Mutation";
  offer: {
    __typename?: "SingleNFTOffer";
    offerHash?: Hash | null;
    offerId: bigint;
    lenderAddress?: Address | null;
    signerAddress?: Address | null;
    borrowerAddress?: Address | null;
    validators: Array<{
      __typename?: "OfferValidator";
      validator: Address;
      arguments: Hex;
    }>;
    nft: {
      __typename?: "NFT";
      tokenId: bigint;
      collection?: {
        __typename?: "Collection";
        contractData?: {
          __typename?: "ContractData";
          contractAddress: Address;
        } | null;
      } | null;
    };
  };
};

export type SaveSingleNftOfferMutationVariables = Exact<{
  offer: SingleNftSignedOfferInput;
}>;

export type SaveSingleNftOfferMutation = {
  __typename?: "Mutation";
  offer: {
    __typename?: "SingleNFTOffer";
    id: string;
    status: string;
    nft: {
      __typename?: "NFT";
      tokenId: bigint;
      collection?: {
        __typename?: "Collection";
        contractData?: {
          __typename?: "ContractData";
          contractAddress: Address;
        } | null;
      } | null;
    };
  };
};

export type UnhideOfferMutationVariables = Exact<{
  contract: Scalars["Address"];
  id: Scalars["String"];
}>;

export type UnhideOfferMutation = {
  __typename?: "Mutation";
  showOffer:
    | { __typename?: "CollectionOffer"; id: string }
    | { __typename?: "SingleNFTOffer"; id: string };
};

export type GenerateRenegotiationOfferHashMutationVariables = Exact<{
  renegotiationInput: RenegotiationOfferInput;
}>;

export type GenerateRenegotiationOfferHashMutation = {
  __typename?: "Mutation";
  offer: {
    __typename?: "Renegotiation";
    loanId: bigint;
    renegotiationId: bigint;
    offerHash?: Hash | null;
    lenderAddress?: Address | null;
    signerAddress?: Address | null;
    nft: {
      __typename?: "NFT";
      tokenId: bigint;
      collection?: {
        __typename?: "Collection";
        contractData?: {
          __typename?: "ContractData";
          contractAddress: Address;
        } | null;
      } | null;
    };
  };
};

export type HideRenegotiationOfferMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type HideRenegotiationOfferMutation = {
  __typename?: "Mutation";
  hideRenegotiation: { __typename?: "Renegotiation"; id: string };
};

export type SaveRenegotiationOfferMutationVariables = Exact<{
  offer: SignedRenegotiationOfferInput;
}>;

export type SaveRenegotiationOfferMutation = {
  __typename?: "Mutation";
  offer: { __typename?: "Renegotiation"; id: string; status: string };
};

export type UnhideRenegotiationOfferMutationVariables = Exact<{
  id: Scalars["String"];
}>;

export type UnhideRenegotiationOfferMutation = {
  __typename?: "Mutation";
  showRenegotiation: { __typename?: "Renegotiation"; id: string };
};

export type CollectionsIdByContractAddressQueryVariables = Exact<{
  contractAddress: Scalars["Address"];
}>;

export type CollectionsIdByContractAddressQuery = {
  __typename?: "Query";
  collections: Array<{ __typename?: "Collection"; id: string }>;
};

export type CollectionIdBySlugQueryVariables = Exact<{
  slug: Scalars["String"];
}>;

export type CollectionIdBySlugQuery = {
  __typename?: "Query";
  collection?: { __typename?: "Collection"; id: string } | null;
};

export type ListListingsQueryVariables = Exact<{
  collections?: InputMaybe<Array<Scalars["Int"]> | Scalars["Int"]>;
  userFilter?: InputMaybe<UserFilter>;
  marketplaceNames?: InputMaybe<Array<MarketplaceEnum> | MarketplaceEnum>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
}>;

export type ListListingsQuery = {
  __typename?: "Query";
  result: {
    __typename?: "ListingConnection";
    pageInfo: { __typename?: "PageInfo"; endCursor?: string | null };
    edges: Array<{
      __typename?: "ListingEdge";
      node: {
        __typename?: "Listing";
        id: string;
        marketplaceName: MarketplaceEnum;
        createdDate: any;
        user: { __typename?: "User"; walletAddress: Address };
        nft: {
          __typename?: "NFT";
          id: string;
          tokenId: bigint;
          collection?: {
            __typename?: "Collection";
            id: string;
            slug?: string | null;
            contractData?: {
              __typename?: "ContractData";
              contractAddress: Address;
            } | null;
          } | null;
        };
      };
    }>;
  };
};

export type NftIdByContractAddressAndTokenIdQueryVariables = Exact<{
  contractAddress: Scalars["Address"];
  tokenId: Scalars["BigInt"];
}>;

export type NftIdByContractAddressAndTokenIdQuery = {
  __typename?: "Query";
  nft?: { __typename?: "NFT"; id: string } | null;
};

export type NftIdBySlugTokenIdQueryVariables = Exact<{
  slug: Scalars["String"];
  tokenId: Scalars["BigInt"];
}>;

export type NftIdBySlugTokenIdQuery = {
  __typename?: "Query";
  nft?: { __typename?: "NFT"; id: string } | null;
};

export type ListOffersQueryVariables = Exact<{
  lenderAddress?: InputMaybe<Scalars["String"]>;
  sortBy: OffersSortInput;
  terms?: InputMaybe<TermsFilter>;
  statuses?: InputMaybe<Array<OfferStatus> | OfferStatus>;
  nfts?: InputMaybe<Array<Scalars["Int"]> | Scalars["Int"]>;
  collections?: InputMaybe<Array<Scalars["Int"]> | Scalars["Int"]>;
  onlySingleNftOffers?: InputMaybe<Scalars["Boolean"]>;
  onlyCollectionOffers?: InputMaybe<Scalars["Boolean"]>;
  first?: InputMaybe<Scalars["Int"]>;
  after?: InputMaybe<Scalars["String"]>;
}>;

export type ListOffersQuery = {
  __typename?: "Query";
  result: {
    __typename?: "OfferConnection";
    pageInfo: { __typename?: "PageInfo"; endCursor?: string | null };
    edges: Array<{
      __typename?: "OfferEdge";
      node:
        | {
            __typename?: "CollectionOffer";
            id: string;
            offerId: bigint;
            lenderAddress?: Address | null;
            borrowerAddress?: Address | null;
            signerAddress?: Address | null;
            contractAddress: Address;
            requiresLiquidation: boolean;
            principalAddress: Address;
            principalAmount: bigint;
            aprBps: bigint;
            fee: bigint;
            capacity: bigint;
            expirationTime: bigint;
            duration: bigint;
            status: string;
            offerHash?: Hash | null;
            signature?: Hex | null;
            createdDate?: any | null;
            repayment: bigint;
            hidden?: boolean | null;
            collection: {
              __typename?: "Collection";
              id: string;
              slug?: string | null;
              contractData?: {
                __typename?: "ContractData";
                contractAddress: Address;
              } | null;
            };
            currency?: {
              __typename?: "Currency";
              symbol: string;
              decimals: number;
              address: Address;
            } | null;
            validators: Array<{
              __typename?: "OfferValidator";
              arguments: Hex;
              validator: Address;
            }>;
          }
        | {
            __typename?: "SingleNFTOffer";
            id: string;
            offerId: bigint;
            lenderAddress?: Address | null;
            borrowerAddress?: Address | null;
            signerAddress?: Address | null;
            contractAddress: Address;
            requiresLiquidation: boolean;
            principalAddress: Address;
            principalAmount: bigint;
            aprBps: bigint;
            fee: bigint;
            capacity: bigint;
            expirationTime: bigint;
            duration: bigint;
            status: string;
            offerHash?: Hash | null;
            signature?: Hex | null;
            createdDate?: any | null;
            repayment: bigint;
            hidden?: boolean | null;
            nft: {
              __typename?: "NFT";
              id: string;
              tokenId: bigint;
              collection?: {
                __typename?: "Collection";
                id: string;
                slug?: string | null;
                contractData?: {
                  __typename?: "ContractData";
                  contractAddress: Address;
                } | null;
              } | null;
            };
            currency?: {
              __typename?: "Currency";
              symbol: string;
              decimals: number;
              address: Address;
            } | null;
            validators: Array<{
              __typename?: "OfferValidator";
              arguments: Hex;
              validator: Address;
            }>;
          };
    }>;
  };
};

export type ActiveOfferNotificationKeySpecifier = (
  | "createdOn"
  | "id"
  | "notificationType"
  | "offer"
  | "readOn"
  | "user"
  | ActiveOfferNotificationKeySpecifier
)[];
export type ActiveOfferNotificationFieldPolicy = {
  createdOn?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  notificationType?: FieldPolicy<any> | FieldReadFunction<any>;
  offer?: FieldPolicy<any> | FieldReadFunction<any>;
  readOn?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ActivityKeySpecifier = (
  | "id"
  | "timestamp"
  | "txHash"
  | ActivityKeySpecifier
)[];
export type ActivityFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
  txHash?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AssetKeySpecifier = (
  | "accessTypeName"
  | "cacheUrl"
  | "contentTypeMime"
  | "data"
  | AssetKeySpecifier
)[];
export type AssetFieldPolicy = {
  accessTypeName?: FieldPolicy<any> | FieldReadFunction<any>;
  cacheUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  contentTypeMime?: FieldPolicy<any> | FieldReadFunction<any>;
  data?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AuctionKeySpecifier = (
  | "duration"
  | "endTime"
  | "highestBid"
  | "id"
  | "loan"
  | "settler"
  | "startTime"
  | "status"
  | AuctionKeySpecifier
)[];
export type AuctionFieldPolicy = {
  duration?: FieldPolicy<any> | FieldReadFunction<any>;
  endTime?: FieldPolicy<any> | FieldReadFunction<any>;
  highestBid?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  loan?: FieldPolicy<any> | FieldReadFunction<any>;
  settler?: FieldPolicy<any> | FieldReadFunction<any>;
  startTime?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AuctionBidConfirmationNotificationKeySpecifier = (
  | "auction"
  | "bid"
  | "createdOn"
  | "id"
  | "loan"
  | "notificationType"
  | "readOn"
  | "user"
  | AuctionBidConfirmationNotificationKeySpecifier
)[];
export type AuctionBidConfirmationNotificationFieldPolicy = {
  auction?: FieldPolicy<any> | FieldReadFunction<any>;
  bid?: FieldPolicy<any> | FieldReadFunction<any>;
  createdOn?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  loan?: FieldPolicy<any> | FieldReadFunction<any>;
  notificationType?: FieldPolicy<any> | FieldReadFunction<any>;
  readOn?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AuctionConnectionKeySpecifier = (
  | "edges"
  | "pageInfo"
  | "totalCount"
  | AuctionConnectionKeySpecifier
)[];
export type AuctionConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AuctionEdgeKeySpecifier = (
  | "cursor"
  | "node"
  | AuctionEdgeKeySpecifier
)[];
export type AuctionEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AuctionEndedNotificationKeySpecifier = (
  | "auction"
  | "createdOn"
  | "id"
  | "loan"
  | "notificationType"
  | "readOn"
  | "user"
  | AuctionEndedNotificationKeySpecifier
)[];
export type AuctionEndedNotificationFieldPolicy = {
  auction?: FieldPolicy<any> | FieldReadFunction<any>;
  createdOn?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  loan?: FieldPolicy<any> | FieldReadFunction<any>;
  notificationType?: FieldPolicy<any> | FieldReadFunction<any>;
  readOn?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AuctionStartedNotificationKeySpecifier = (
  | "auction"
  | "createdOn"
  | "id"
  | "loan"
  | "notificationType"
  | "readOn"
  | "user"
  | AuctionStartedNotificationKeySpecifier
)[];
export type AuctionStartedNotificationFieldPolicy = {
  auction?: FieldPolicy<any> | FieldReadFunction<any>;
  createdOn?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  loan?: FieldPolicy<any> | FieldReadFunction<any>;
  notificationType?: FieldPolicy<any> | FieldReadFunction<any>;
  readOn?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AuctionWonNotificationKeySpecifier = (
  | "auction"
  | "createdOn"
  | "id"
  | "loan"
  | "notificationType"
  | "readOn"
  | "user"
  | AuctionWonNotificationKeySpecifier
)[];
export type AuctionWonNotificationFieldPolicy = {
  auction?: FieldPolicy<any> | FieldReadFunction<any>;
  createdOn?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  loan?: FieldPolicy<any> | FieldReadFunction<any>;
  notificationType?: FieldPolicy<any> | FieldReadFunction<any>;
  readOn?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type BidKeySpecifier = (
  | "amount"
  | "auction"
  | "bidder"
  | "id"
  | "indexInBlock"
  | "timestamp"
  | "txHash"
  | BidKeySpecifier
)[];
export type BidFieldPolicy = {
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  auction?: FieldPolicy<any> | FieldReadFunction<any>;
  bidder?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
  txHash?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type BidConnectionKeySpecifier = (
  | "edges"
  | "pageInfo"
  | "totalCount"
  | BidConnectionKeySpecifier
)[];
export type BidConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type BidEdgeKeySpecifier = ("cursor" | "node" | BidEdgeKeySpecifier)[];
export type BidEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CartKeySpecifier = (
  | "createdDate"
  | "id"
  | "items"
  | CartKeySpecifier
)[];
export type CartFieldPolicy = {
  createdDate?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  items?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CollectionKeySpecifier = (
  | "bannerImage"
  | "collectionUrl"
  | "contractData"
  | "description"
  | "discordUrl"
  | "externalUrl"
  | "id"
  | "image"
  | "name"
  | "nftsCount"
  | "royalties"
  | "slug"
  | "statistics"
  | "twitterUsername"
  | "verified"
  | CollectionKeySpecifier
)[];
export type CollectionFieldPolicy = {
  bannerImage?: FieldPolicy<any> | FieldReadFunction<any>;
  collectionUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  contractData?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  discordUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  externalUrl?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  image?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  nftsCount?: FieldPolicy<any> | FieldReadFunction<any>;
  royalties?: FieldPolicy<any> | FieldReadFunction<any>;
  slug?: FieldPolicy<any> | FieldReadFunction<any>;
  statistics?: FieldPolicy<any> | FieldReadFunction<any>;
  twitterUsername?: FieldPolicy<any> | FieldReadFunction<any>;
  verified?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CollectionConnectionKeySpecifier = (
  | "edges"
  | "pageInfo"
  | "totalCount"
  | CollectionConnectionKeySpecifier
)[];
export type CollectionConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CollectionEdgeKeySpecifier = (
  | "cursor"
  | "node"
  | CollectionEdgeKeySpecifier
)[];
export type CollectionEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CollectionOfferKeySpecifier = (
  | "aprBps"
  | "borrowerAddress"
  | "capacity"
  | "collection"
  | "contractAddress"
  | "createdDate"
  | "currency"
  | "duration"
  | "expirationTime"
  | "fee"
  | "hidden"
  | "id"
  | "lenderAddress"
  | "offerHash"
  | "offerId"
  | "principalAddress"
  | "principalAmount"
  | "repayment"
  | "requiresLiquidation"
  | "signature"
  | "signerAddress"
  | "statistics"
  | "status"
  | "validators"
  | CollectionOfferKeySpecifier
)[];
export type CollectionOfferFieldPolicy = {
  aprBps?: FieldPolicy<any> | FieldReadFunction<any>;
  borrowerAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  capacity?: FieldPolicy<any> | FieldReadFunction<any>;
  collection?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  createdDate?: FieldPolicy<any> | FieldReadFunction<any>;
  currency?: FieldPolicy<any> | FieldReadFunction<any>;
  duration?: FieldPolicy<any> | FieldReadFunction<any>;
  expirationTime?: FieldPolicy<any> | FieldReadFunction<any>;
  fee?: FieldPolicy<any> | FieldReadFunction<any>;
  hidden?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  lenderAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  offerHash?: FieldPolicy<any> | FieldReadFunction<any>;
  offerId?: FieldPolicy<any> | FieldReadFunction<any>;
  principalAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  principalAmount?: FieldPolicy<any> | FieldReadFunction<any>;
  repayment?: FieldPolicy<any> | FieldReadFunction<any>;
  requiresLiquidation?: FieldPolicy<any> | FieldReadFunction<any>;
  signature?: FieldPolicy<any> | FieldReadFunction<any>;
  signerAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  statistics?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  validators?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CollectionOfferStatisticsKeySpecifier = (
  | "acceptedLoans"
  | "consumedCapacity"
  | CollectionOfferStatisticsKeySpecifier
)[];
export type CollectionOfferStatisticsFieldPolicy = {
  acceptedLoans?: FieldPolicy<any> | FieldReadFunction<any>;
  consumedCapacity?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CollectionOrderKeySpecifier = (
  | "collection"
  | "createdDate"
  | "currency"
  | "currencyAddress"
  | "executionData"
  | "expiration"
  | "id"
  | "isAsk"
  | "maker"
  | "marketPlace"
  | "marketPlaceId"
  | "orderType"
  | "price"
  | "status"
  | "timestamp"
  | "txHash"
  | CollectionOrderKeySpecifier
)[];
export type CollectionOrderFieldPolicy = {
  collection?: FieldPolicy<any> | FieldReadFunction<any>;
  createdDate?: FieldPolicy<any> | FieldReadFunction<any>;
  currency?: FieldPolicy<any> | FieldReadFunction<any>;
  currencyAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  executionData?: FieldPolicy<any> | FieldReadFunction<any>;
  expiration?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  isAsk?: FieldPolicy<any> | FieldReadFunction<any>;
  maker?: FieldPolicy<any> | FieldReadFunction<any>;
  marketPlace?: FieldPolicy<any> | FieldReadFunction<any>;
  marketPlaceId?: FieldPolicy<any> | FieldReadFunction<any>;
  orderType?: FieldPolicy<any> | FieldReadFunction<any>;
  price?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
  txHash?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CollectionStatisticsKeySpecifier = (
  | "bestOffer"
  | "floorPrice"
  | "floorPrice7d"
  | "floorPrice30d"
  | "lastSale"
  | "nftsCount"
  | "numberOfOffers"
  | "percentageInOutstandingLoans"
  | "repaymentRate"
  | "totalLoanVolume"
  | "totalLoanVolume1d"
  | "totalLoanVolume1m"
  | "totalLoanVolume1w"
  | "totalLoanVolume1y"
  | "totalLoanVolume2m"
  | "totalLoanVolume3m"
  | "totalLoanVolume4m"
  | "totalVolume"
  | "totalVolume1d"
  | "totalVolume1m"
  | "totalVolume1w"
  | "totalVolume1y"
  | "totalVolume2m"
  | "totalVolume3m"
  | "totalVolume4m"
  | CollectionStatisticsKeySpecifier
)[];
export type CollectionStatisticsFieldPolicy = {
  bestOffer?: FieldPolicy<any> | FieldReadFunction<any>;
  floorPrice?: FieldPolicy<any> | FieldReadFunction<any>;
  floorPrice7d?: FieldPolicy<any> | FieldReadFunction<any>;
  floorPrice30d?: FieldPolicy<any> | FieldReadFunction<any>;
  lastSale?: FieldPolicy<any> | FieldReadFunction<any>;
  nftsCount?: FieldPolicy<any> | FieldReadFunction<any>;
  numberOfOffers?: FieldPolicy<any> | FieldReadFunction<any>;
  percentageInOutstandingLoans?: FieldPolicy<any> | FieldReadFunction<any>;
  repaymentRate?: FieldPolicy<any> | FieldReadFunction<any>;
  totalLoanVolume?: FieldPolicy<any> | FieldReadFunction<any>;
  totalLoanVolume1d?: FieldPolicy<any> | FieldReadFunction<any>;
  totalLoanVolume1m?: FieldPolicy<any> | FieldReadFunction<any>;
  totalLoanVolume1w?: FieldPolicy<any> | FieldReadFunction<any>;
  totalLoanVolume1y?: FieldPolicy<any> | FieldReadFunction<any>;
  totalLoanVolume2m?: FieldPolicy<any> | FieldReadFunction<any>;
  totalLoanVolume3m?: FieldPolicy<any> | FieldReadFunction<any>;
  totalLoanVolume4m?: FieldPolicy<any> | FieldReadFunction<any>;
  totalVolume?: FieldPolicy<any> | FieldReadFunction<any>;
  totalVolume1d?: FieldPolicy<any> | FieldReadFunction<any>;
  totalVolume1m?: FieldPolicy<any> | FieldReadFunction<any>;
  totalVolume1w?: FieldPolicy<any> | FieldReadFunction<any>;
  totalVolume1y?: FieldPolicy<any> | FieldReadFunction<any>;
  totalVolume2m?: FieldPolicy<any> | FieldReadFunction<any>;
  totalVolume3m?: FieldPolicy<any> | FieldReadFunction<any>;
  totalVolume4m?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ContractDataKeySpecifier = (
  | "blockchain"
  | "contractAddress"
  | "createdDate"
  | "creatorAddress"
  | "id"
  | ContractDataKeySpecifier
)[];
export type ContractDataFieldPolicy = {
  blockchain?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  createdDate?: FieldPolicy<any> | FieldReadFunction<any>;
  creatorAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CurrencyKeySpecifier = (
  | "address"
  | "decimals"
  | "id"
  | "symbol"
  | CurrencyKeySpecifier
)[];
export type CurrencyFieldPolicy = {
  address?: FieldPolicy<any> | FieldReadFunction<any>;
  decimals?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  symbol?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CurrencyAmountKeySpecifier = (
  | "amount"
  | "currency"
  | CurrencyAmountKeySpecifier
)[];
export type CurrencyAmountFieldPolicy = {
  amount?: FieldPolicy<any> | FieldReadFunction<any>;
  currency?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ListingKeySpecifier = (
  | "createdDate"
  | "desiredDuration"
  | "desiredPrincipalAddress"
  | "id"
  | "marketplaceName"
  | "nft"
  | "user"
  | ListingKeySpecifier
)[];
export type ListingFieldPolicy = {
  createdDate?: FieldPolicy<any> | FieldReadFunction<any>;
  desiredDuration?: FieldPolicy<any> | FieldReadFunction<any>;
  desiredPrincipalAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  marketplaceName?: FieldPolicy<any> | FieldReadFunction<any>;
  nft?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ListingConnectionKeySpecifier = (
  | "edges"
  | "pageInfo"
  | "totalCount"
  | ListingConnectionKeySpecifier
)[];
export type ListingConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ListingEdgeKeySpecifier = (
  | "cursor"
  | "node"
  | ListingEdgeKeySpecifier
)[];
export type ListingEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LoanKeySpecifier = (
  | "activities"
  | "address"
  | "borrowerAddress"
  | "currency"
  | "duration"
  | "id"
  | "indexInBlock"
  | "loanId"
  | "offer"
  | "principalAddress"
  | "repaidActivity"
  | "startTime"
  | "status"
  | "timestamp"
  | "txHash"
  | LoanKeySpecifier
)[];
export type LoanFieldPolicy = {
  activities?: FieldPolicy<any> | FieldReadFunction<any>;
  address?: FieldPolicy<any> | FieldReadFunction<any>;
  borrowerAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  currency?: FieldPolicy<any> | FieldReadFunction<any>;
  duration?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>;
  loanId?: FieldPolicy<any> | FieldReadFunction<any>;
  offer?: FieldPolicy<any> | FieldReadFunction<any>;
  principalAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  repaidActivity?: FieldPolicy<any> | FieldReadFunction<any>;
  startTime?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
  txHash?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LoanActivityKeySpecifier = (
  | "id"
  | "indexInBlock"
  | "loan"
  | "loanId"
  | "multiSourceLoanHistory"
  | "timestamp"
  | "txHash"
  | LoanActivityKeySpecifier
)[];
export type LoanActivityFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>;
  loan?: FieldPolicy<any> | FieldReadFunction<any>;
  loanId?: FieldPolicy<any> | FieldReadFunction<any>;
  multiSourceLoanHistory?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
  txHash?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LoanActivityConnectionKeySpecifier = (
  | "edges"
  | "pageInfo"
  | "totalCount"
  | LoanActivityConnectionKeySpecifier
)[];
export type LoanActivityConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LoanActivityEdgeKeySpecifier = (
  | "cursor"
  | "node"
  | LoanActivityEdgeKeySpecifier
)[];
export type LoanActivityEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LoanAuctionedKeySpecifier = (
  | "id"
  | "indexInBlock"
  | "loan"
  | "loanId"
  | "loanPayments"
  | "multiSourceLoanHistory"
  | "timestamp"
  | "totalAuctioned"
  | "txHash"
  | LoanAuctionedKeySpecifier
)[];
export type LoanAuctionedFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>;
  loan?: FieldPolicy<any> | FieldReadFunction<any>;
  loanId?: FieldPolicy<any> | FieldReadFunction<any>;
  loanPayments?: FieldPolicy<any> | FieldReadFunction<any>;
  multiSourceLoanHistory?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
  totalAuctioned?: FieldPolicy<any> | FieldReadFunction<any>;
  txHash?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LoanAuctionedNotificationKeySpecifier = (
  | "auction"
  | "createdOn"
  | "id"
  | "loan"
  | "notificationType"
  | "readOn"
  | "user"
  | LoanAuctionedNotificationKeySpecifier
)[];
export type LoanAuctionedNotificationFieldPolicy = {
  auction?: FieldPolicy<any> | FieldReadFunction<any>;
  createdOn?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  loan?: FieldPolicy<any> | FieldReadFunction<any>;
  notificationType?: FieldPolicy<any> | FieldReadFunction<any>;
  readOn?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LoanDefaultReminderNotificationKeySpecifier = (
  | "createdOn"
  | "defaultsInHours"
  | "id"
  | "loan"
  | "notificationType"
  | "readOn"
  | "user"
  | LoanDefaultReminderNotificationKeySpecifier
)[];
export type LoanDefaultReminderNotificationFieldPolicy = {
  createdOn?: FieldPolicy<any> | FieldReadFunction<any>;
  defaultsInHours?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  loan?: FieldPolicy<any> | FieldReadFunction<any>;
  notificationType?: FieldPolicy<any> | FieldReadFunction<any>;
  readOn?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LoanDefaultedNotificationKeySpecifier = (
  | "createdOn"
  | "id"
  | "loan"
  | "notificationType"
  | "readOn"
  | "user"
  | LoanDefaultedNotificationKeySpecifier
)[];
export type LoanDefaultedNotificationFieldPolicy = {
  createdOn?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  loan?: FieldPolicy<any> | FieldReadFunction<any>;
  notificationType?: FieldPolicy<any> | FieldReadFunction<any>;
  readOn?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LoanForeclosedKeySpecifier = (
  | "id"
  | "indexInBlock"
  | "loan"
  | "loanId"
  | "multiSourceLoanHistory"
  | "timestamp"
  | "txHash"
  | LoanForeclosedKeySpecifier
)[];
export type LoanForeclosedFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>;
  loan?: FieldPolicy<any> | FieldReadFunction<any>;
  loanId?: FieldPolicy<any> | FieldReadFunction<any>;
  multiSourceLoanHistory?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
  txHash?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LoanInitiatedKeySpecifier = (
  | "id"
  | "indexInBlock"
  | "loan"
  | "loanId"
  | "multiSourceLoanHistory"
  | "timestamp"
  | "txHash"
  | LoanInitiatedKeySpecifier
)[];
export type LoanInitiatedFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>;
  loan?: FieldPolicy<any> | FieldReadFunction<any>;
  loanId?: FieldPolicy<any> | FieldReadFunction<any>;
  multiSourceLoanHistory?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
  txHash?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LoanPaymentKeySpecifier = (
  | "accruedInterest"
  | "activityId"
  | "destination"
  | "id"
  | "pendingInterest"
  | "principalAddress"
  | "principalAmount"
  | "protocolFee"
  | "source"
  | LoanPaymentKeySpecifier
)[];
export type LoanPaymentFieldPolicy = {
  accruedInterest?: FieldPolicy<any> | FieldReadFunction<any>;
  activityId?: FieldPolicy<any> | FieldReadFunction<any>;
  destination?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  pendingInterest?: FieldPolicy<any> | FieldReadFunction<any>;
  principalAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  principalAmount?: FieldPolicy<any> | FieldReadFunction<any>;
  protocolFee?: FieldPolicy<any> | FieldReadFunction<any>;
  source?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LoanRefinancedKeySpecifier = (
  | "id"
  | "indexInBlock"
  | "loan"
  | "loanId"
  | "multiSourceLoanHistory"
  | "timestamp"
  | "txHash"
  | LoanRefinancedKeySpecifier
)[];
export type LoanRefinancedFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>;
  loan?: FieldPolicy<any> | FieldReadFunction<any>;
  loanId?: FieldPolicy<any> | FieldReadFunction<any>;
  multiSourceLoanHistory?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
  txHash?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LoanRefinancedNotificationKeySpecifier = (
  | "createdOn"
  | "id"
  | "newHistory"
  | "notificationType"
  | "previousHistory"
  | "readOn"
  | "user"
  | LoanRefinancedNotificationKeySpecifier
)[];
export type LoanRefinancedNotificationFieldPolicy = {
  createdOn?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  newHistory?: FieldPolicy<any> | FieldReadFunction<any>;
  notificationType?: FieldPolicy<any> | FieldReadFunction<any>;
  previousHistory?: FieldPolicy<any> | FieldReadFunction<any>;
  readOn?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LoanRepaidKeySpecifier = (
  | "id"
  | "indexInBlock"
  | "loan"
  | "loanId"
  | "multiSourceLoanHistory"
  | "timestamp"
  | "totalInterest"
  | "txHash"
  | LoanRepaidKeySpecifier
)[];
export type LoanRepaidFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>;
  loan?: FieldPolicy<any> | FieldReadFunction<any>;
  loanId?: FieldPolicy<any> | FieldReadFunction<any>;
  multiSourceLoanHistory?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
  totalInterest?: FieldPolicy<any> | FieldReadFunction<any>;
  txHash?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LoanRepaidNotificationKeySpecifier = (
  | "createdOn"
  | "id"
  | "loan"
  | "notificationType"
  | "readOn"
  | "user"
  | LoanRepaidNotificationKeySpecifier
)[];
export type LoanRepaidNotificationFieldPolicy = {
  createdOn?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  loan?: FieldPolicy<any> | FieldReadFunction<any>;
  notificationType?: FieldPolicy<any> | FieldReadFunction<any>;
  readOn?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LoanSentToAuctionKeySpecifier = (
  | "id"
  | "indexInBlock"
  | "liquidatorAddress"
  | "loan"
  | "loanId"
  | "multiSourceLoanHistory"
  | "timestamp"
  | "txHash"
  | LoanSentToAuctionKeySpecifier
)[];
export type LoanSentToAuctionFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>;
  liquidatorAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  loan?: FieldPolicy<any> | FieldReadFunction<any>;
  loanId?: FieldPolicy<any> | FieldReadFunction<any>;
  multiSourceLoanHistory?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
  txHash?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LostSourceKeySpecifier = (
  | "accruedInterest"
  | "aprBps"
  | "duration"
  | "id"
  | "lenderAddress"
  | "loan"
  | "originationFee"
  | "principalAmount"
  | "startTime"
  | LostSourceKeySpecifier
)[];
export type LostSourceFieldPolicy = {
  accruedInterest?: FieldPolicy<any> | FieldReadFunction<any>;
  aprBps?: FieldPolicy<any> | FieldReadFunction<any>;
  duration?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  lenderAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  loan?: FieldPolicy<any> | FieldReadFunction<any>;
  originationFee?: FieldPolicy<any> | FieldReadFunction<any>;
  principalAmount?: FieldPolicy<any> | FieldReadFunction<any>;
  startTime?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type LostSourceNotificationKeySpecifier = (
  | "createdOn"
  | "id"
  | "lostSource"
  | "notificationType"
  | "readOn"
  | "user"
  | LostSourceNotificationKeySpecifier
)[];
export type LostSourceNotificationFieldPolicy = {
  createdOn?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  lostSource?: FieldPolicy<any> | FieldReadFunction<any>;
  notificationType?: FieldPolicy<any> | FieldReadFunction<any>;
  readOn?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ManyNftsStatisticsKeySpecifier = (
  | "bestOffer"
  | "floorPrice"
  | "floorPrice7d"
  | "floorPrice30d"
  | "lastSale"
  | "nftsCount"
  | "totalVolume"
  | "totalVolume1d"
  | "totalVolume1m"
  | "totalVolume1w"
  | "totalVolume1y"
  | "totalVolume2m"
  | "totalVolume3m"
  | "totalVolume4m"
  | ManyNftsStatisticsKeySpecifier
)[];
export type ManyNftsStatisticsFieldPolicy = {
  bestOffer?: FieldPolicy<any> | FieldReadFunction<any>;
  floorPrice?: FieldPolicy<any> | FieldReadFunction<any>;
  floorPrice7d?: FieldPolicy<any> | FieldReadFunction<any>;
  floorPrice30d?: FieldPolicy<any> | FieldReadFunction<any>;
  lastSale?: FieldPolicy<any> | FieldReadFunction<any>;
  nftsCount?: FieldPolicy<any> | FieldReadFunction<any>;
  totalVolume?: FieldPolicy<any> | FieldReadFunction<any>;
  totalVolume1d?: FieldPolicy<any> | FieldReadFunction<any>;
  totalVolume1m?: FieldPolicy<any> | FieldReadFunction<any>;
  totalVolume1w?: FieldPolicy<any> | FieldReadFunction<any>;
  totalVolume1y?: FieldPolicy<any> | FieldReadFunction<any>;
  totalVolume2m?: FieldPolicy<any> | FieldReadFunction<any>;
  totalVolume3m?: FieldPolicy<any> | FieldReadFunction<any>;
  totalVolume4m?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MultiSourceLoanKeySpecifier = (
  | "activities"
  | "address"
  | "auction"
  | "blendedAprBps"
  | "borrowerAddress"
  | "currency"
  | "duration"
  | "id"
  | "indexInBlock"
  | "loanId"
  | "nft"
  | "offer"
  | "principalAddress"
  | "principalAmount"
  | "repaidActivity"
  | "sources"
  | "startTime"
  | "status"
  | "timestamp"
  | "totalOriginationFee"
  | "txHash"
  | MultiSourceLoanKeySpecifier
)[];
export type MultiSourceLoanFieldPolicy = {
  activities?: FieldPolicy<any> | FieldReadFunction<any>;
  address?: FieldPolicy<any> | FieldReadFunction<any>;
  auction?: FieldPolicy<any> | FieldReadFunction<any>;
  blendedAprBps?: FieldPolicy<any> | FieldReadFunction<any>;
  borrowerAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  currency?: FieldPolicy<any> | FieldReadFunction<any>;
  duration?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>;
  loanId?: FieldPolicy<any> | FieldReadFunction<any>;
  nft?: FieldPolicy<any> | FieldReadFunction<any>;
  offer?: FieldPolicy<any> | FieldReadFunction<any>;
  principalAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  principalAmount?: FieldPolicy<any> | FieldReadFunction<any>;
  repaidActivity?: FieldPolicy<any> | FieldReadFunction<any>;
  sources?: FieldPolicy<any> | FieldReadFunction<any>;
  startTime?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
  totalOriginationFee?: FieldPolicy<any> | FieldReadFunction<any>;
  txHash?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MultiSourceLoanConnectionKeySpecifier = (
  | "edges"
  | "pageInfo"
  | "totalCount"
  | MultiSourceLoanConnectionKeySpecifier
)[];
export type MultiSourceLoanConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MultiSourceLoanEdgeKeySpecifier = (
  | "cursor"
  | "node"
  | MultiSourceLoanEdgeKeySpecifier
)[];
export type MultiSourceLoanEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MultiSourceLoanHistoryKeySpecifier = (
  | "activity"
  | "borrowerAddress"
  | "duration"
  | "id"
  | "offerId"
  | "principalAddress"
  | "principalAmount"
  | "sources"
  | "startTime"
  | MultiSourceLoanHistoryKeySpecifier
)[];
export type MultiSourceLoanHistoryFieldPolicy = {
  activity?: FieldPolicy<any> | FieldReadFunction<any>;
  borrowerAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  duration?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  offerId?: FieldPolicy<any> | FieldReadFunction<any>;
  principalAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  principalAmount?: FieldPolicy<any> | FieldReadFunction<any>;
  sources?: FieldPolicy<any> | FieldReadFunction<any>;
  startTime?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MutationKeySpecifier = (
  | "addListingsOfNftsFromUser"
  | "addOrUpdateListing"
  | "generateCollectionOfferToBeSigned"
  | "generateRenegotiationOfferToBeSigned"
  | "generateSingleNftOfferToBeSigned"
  | "hideAllOffers"
  | "hideOffer"
  | "hideRenegotiation"
  | "markNotificationIdsAsRead"
  | "markNotificationsAsRead"
  | "removeListing"
  | "removeListingsOfNftsFromUser"
  | "saveRenegotiationSignedOffer"
  | "saveSignedCollectionOffer"
  | "saveSignedSingleNftOffer"
  | "setReferral"
  | "showOffer"
  | "showRenegotiation"
  | MutationKeySpecifier
)[];
export type MutationFieldPolicy = {
  addListingsOfNftsFromUser?: FieldPolicy<any> | FieldReadFunction<any>;
  addOrUpdateListing?: FieldPolicy<any> | FieldReadFunction<any>;
  generateCollectionOfferToBeSigned?: FieldPolicy<any> | FieldReadFunction<any>;
  generateRenegotiationOfferToBeSigned?:
    | FieldPolicy<any>
    | FieldReadFunction<any>;
  generateSingleNftOfferToBeSigned?: FieldPolicy<any> | FieldReadFunction<any>;
  hideAllOffers?: FieldPolicy<any> | FieldReadFunction<any>;
  hideOffer?: FieldPolicy<any> | FieldReadFunction<any>;
  hideRenegotiation?: FieldPolicy<any> | FieldReadFunction<any>;
  markNotificationIdsAsRead?: FieldPolicy<any> | FieldReadFunction<any>;
  markNotificationsAsRead?: FieldPolicy<any> | FieldReadFunction<any>;
  removeListing?: FieldPolicy<any> | FieldReadFunction<any>;
  removeListingsOfNftsFromUser?: FieldPolicy<any> | FieldReadFunction<any>;
  saveRenegotiationSignedOffer?: FieldPolicy<any> | FieldReadFunction<any>;
  saveSignedCollectionOffer?: FieldPolicy<any> | FieldReadFunction<any>;
  saveSignedSingleNftOffer?: FieldPolicy<any> | FieldReadFunction<any>;
  setReferral?: FieldPolicy<any> | FieldReadFunction<any>;
  showOffer?: FieldPolicy<any> | FieldReadFunction<any>;
  showRenegotiation?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NFTKeySpecifier = (
  | "activeLoan"
  | "collection"
  | "createdDate"
  | "description"
  | "id"
  | "image"
  | "isFlagged"
  | "listed"
  | "marketPlaceOfPrice"
  | "name"
  | "nftId"
  | "owner"
  | "price"
  | "priceCurrencyAddress"
  | "rarityRank"
  | "rarityScore"
  | "statistics"
  | "tokenId"
  | "traits"
  | "url"
  | NFTKeySpecifier
)[];
export type NFTFieldPolicy = {
  activeLoan?: FieldPolicy<any> | FieldReadFunction<any>;
  collection?: FieldPolicy<any> | FieldReadFunction<any>;
  createdDate?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  image?: FieldPolicy<any> | FieldReadFunction<any>;
  isFlagged?: FieldPolicy<any> | FieldReadFunction<any>;
  listed?: FieldPolicy<any> | FieldReadFunction<any>;
  marketPlaceOfPrice?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  nftId?: FieldPolicy<any> | FieldReadFunction<any>;
  owner?: FieldPolicy<any> | FieldReadFunction<any>;
  price?: FieldPolicy<any> | FieldReadFunction<any>;
  priceCurrencyAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  rarityRank?: FieldPolicy<any> | FieldReadFunction<any>;
  rarityScore?: FieldPolicy<any> | FieldReadFunction<any>;
  statistics?: FieldPolicy<any> | FieldReadFunction<any>;
  tokenId?: FieldPolicy<any> | FieldReadFunction<any>;
  traits?: FieldPolicy<any> | FieldReadFunction<any>;
  url?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NFTConnectionKeySpecifier = (
  | "edges"
  | "pageInfo"
  | "totalCount"
  | NFTConnectionKeySpecifier
)[];
export type NFTConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NFTEdgeKeySpecifier = ("cursor" | "node" | NFTEdgeKeySpecifier)[];
export type NFTEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NewOfferNotificationKeySpecifier = (
  | "createdOn"
  | "id"
  | "notificationType"
  | "offer"
  | "readOn"
  | "user"
  | NewOfferNotificationKeySpecifier
)[];
export type NewOfferNotificationFieldPolicy = {
  createdOn?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  notificationType?: FieldPolicy<any> | FieldReadFunction<any>;
  offer?: FieldPolicy<any> | FieldReadFunction<any>;
  readOn?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NewRenegotiationOfferNotificationKeySpecifier = (
  | "createdOn"
  | "id"
  | "loan"
  | "notificationType"
  | "readOn"
  | "renegotiation"
  | "user"
  | NewRenegotiationOfferNotificationKeySpecifier
)[];
export type NewRenegotiationOfferNotificationFieldPolicy = {
  createdOn?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  loan?: FieldPolicy<any> | FieldReadFunction<any>;
  notificationType?: FieldPolicy<any> | FieldReadFunction<any>;
  readOn?: FieldPolicy<any> | FieldReadFunction<any>;
  renegotiation?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NftStatisticsKeySpecifier = (
  | "bestOffer"
  | "floorPrice"
  | "floorPrice7d"
  | "floorPrice30d"
  | "lastSale"
  | "loansTotalVolume"
  | "numberOfOffers"
  | "topTraitFloorPrice"
  | "totalVolume"
  | "totalVolume1d"
  | "totalVolume1m"
  | "totalVolume1w"
  | "totalVolume1y"
  | "totalVolume2m"
  | "totalVolume3m"
  | "totalVolume4m"
  | NftStatisticsKeySpecifier
)[];
export type NftStatisticsFieldPolicy = {
  bestOffer?: FieldPolicy<any> | FieldReadFunction<any>;
  floorPrice?: FieldPolicy<any> | FieldReadFunction<any>;
  floorPrice7d?: FieldPolicy<any> | FieldReadFunction<any>;
  floorPrice30d?: FieldPolicy<any> | FieldReadFunction<any>;
  lastSale?: FieldPolicy<any> | FieldReadFunction<any>;
  loansTotalVolume?: FieldPolicy<any> | FieldReadFunction<any>;
  numberOfOffers?: FieldPolicy<any> | FieldReadFunction<any>;
  topTraitFloorPrice?: FieldPolicy<any> | FieldReadFunction<any>;
  totalVolume?: FieldPolicy<any> | FieldReadFunction<any>;
  totalVolume1d?: FieldPolicy<any> | FieldReadFunction<any>;
  totalVolume1m?: FieldPolicy<any> | FieldReadFunction<any>;
  totalVolume1w?: FieldPolicy<any> | FieldReadFunction<any>;
  totalVolume1y?: FieldPolicy<any> | FieldReadFunction<any>;
  totalVolume2m?: FieldPolicy<any> | FieldReadFunction<any>;
  totalVolume3m?: FieldPolicy<any> | FieldReadFunction<any>;
  totalVolume4m?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NodeKeySpecifier = ("id" | NodeKeySpecifier)[];
export type NodeFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NotificationKeySpecifier = (
  | "createdOn"
  | "id"
  | "notificationType"
  | "readOn"
  | "user"
  | NotificationKeySpecifier
)[];
export type NotificationFieldPolicy = {
  createdOn?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  notificationType?: FieldPolicy<any> | FieldReadFunction<any>;
  readOn?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NotificationConnectionKeySpecifier = (
  | "edges"
  | "pageInfo"
  | "totalCount"
  | NotificationConnectionKeySpecifier
)[];
export type NotificationConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type NotificationEdgeKeySpecifier = (
  | "cursor"
  | "node"
  | NotificationEdgeKeySpecifier
)[];
export type NotificationEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type OfferKeySpecifier = (
  | "aprBps"
  | "borrowerAddress"
  | "capacity"
  | "contractAddress"
  | "createdDate"
  | "currency"
  | "duration"
  | "expirationTime"
  | "fee"
  | "hidden"
  | "id"
  | "lenderAddress"
  | "offerHash"
  | "offerId"
  | "principalAddress"
  | "principalAmount"
  | "repayment"
  | "requiresLiquidation"
  | "signature"
  | "signerAddress"
  | "status"
  | "validators"
  | OfferKeySpecifier
)[];
export type OfferFieldPolicy = {
  aprBps?: FieldPolicy<any> | FieldReadFunction<any>;
  borrowerAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  capacity?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  createdDate?: FieldPolicy<any> | FieldReadFunction<any>;
  currency?: FieldPolicy<any> | FieldReadFunction<any>;
  duration?: FieldPolicy<any> | FieldReadFunction<any>;
  expirationTime?: FieldPolicy<any> | FieldReadFunction<any>;
  fee?: FieldPolicy<any> | FieldReadFunction<any>;
  hidden?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  lenderAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  offerHash?: FieldPolicy<any> | FieldReadFunction<any>;
  offerId?: FieldPolicy<any> | FieldReadFunction<any>;
  principalAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  principalAmount?: FieldPolicy<any> | FieldReadFunction<any>;
  repayment?: FieldPolicy<any> | FieldReadFunction<any>;
  requiresLiquidation?: FieldPolicy<any> | FieldReadFunction<any>;
  signature?: FieldPolicy<any> | FieldReadFunction<any>;
  signerAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  validators?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type OfferAcceptedNotificationKeySpecifier = (
  | "createdOn"
  | "id"
  | "loan"
  | "notificationType"
  | "offer"
  | "readOn"
  | "user"
  | OfferAcceptedNotificationKeySpecifier
)[];
export type OfferAcceptedNotificationFieldPolicy = {
  createdOn?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  loan?: FieldPolicy<any> | FieldReadFunction<any>;
  notificationType?: FieldPolicy<any> | FieldReadFunction<any>;
  offer?: FieldPolicy<any> | FieldReadFunction<any>;
  readOn?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type OfferConnectionKeySpecifier = (
  | "edges"
  | "pageInfo"
  | "totalCount"
  | OfferConnectionKeySpecifier
)[];
export type OfferConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type OfferEdgeKeySpecifier = (
  | "cursor"
  | "node"
  | OfferEdgeKeySpecifier
)[];
export type OfferEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type OfferStatisticsKeySpecifier = (
  | "consumedCapacity"
  | OfferStatisticsKeySpecifier
)[];
export type OfferStatisticsFieldPolicy = {
  consumedCapacity?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type OfferValidatorKeySpecifier = (
  | "arguments"
  | "id"
  | "offerId"
  | "validator"
  | OfferValidatorKeySpecifier
)[];
export type OfferValidatorFieldPolicy = {
  arguments?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  offerId?: FieldPolicy<any> | FieldReadFunction<any>;
  validator?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type OffersAndRenegotiationsConnectionKeySpecifier = (
  | "edges"
  | "pageInfo"
  | "totalCount"
  | OffersAndRenegotiationsConnectionKeySpecifier
)[];
export type OffersAndRenegotiationsConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type OffersAndRenegotiationsEdgeKeySpecifier = (
  | "cursor"
  | "node"
  | OffersAndRenegotiationsEdgeKeySpecifier
)[];
export type OffersAndRenegotiationsEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type OrderKeySpecifier = (
  | "createdDate"
  | "currency"
  | "currencyAddress"
  | "executionData"
  | "expiration"
  | "id"
  | "isAsk"
  | "maker"
  | "marketPlace"
  | "marketPlaceId"
  | "orderType"
  | "price"
  | "status"
  | "timestamp"
  | "txHash"
  | OrderKeySpecifier
)[];
export type OrderFieldPolicy = {
  createdDate?: FieldPolicy<any> | FieldReadFunction<any>;
  currency?: FieldPolicy<any> | FieldReadFunction<any>;
  currencyAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  executionData?: FieldPolicy<any> | FieldReadFunction<any>;
  expiration?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  isAsk?: FieldPolicy<any> | FieldReadFunction<any>;
  maker?: FieldPolicy<any> | FieldReadFunction<any>;
  marketPlace?: FieldPolicy<any> | FieldReadFunction<any>;
  marketPlaceId?: FieldPolicy<any> | FieldReadFunction<any>;
  orderType?: FieldPolicy<any> | FieldReadFunction<any>;
  price?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
  txHash?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type OutbidNotificationKeySpecifier = (
  | "auction"
  | "createdOn"
  | "id"
  | "loan"
  | "newBid"
  | "notificationType"
  | "readOn"
  | "user"
  | "userBid"
  | OutbidNotificationKeySpecifier
)[];
export type OutbidNotificationFieldPolicy = {
  auction?: FieldPolicy<any> | FieldReadFunction<any>;
  createdOn?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  loan?: FieldPolicy<any> | FieldReadFunction<any>;
  newBid?: FieldPolicy<any> | FieldReadFunction<any>;
  notificationType?: FieldPolicy<any> | FieldReadFunction<any>;
  readOn?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
  userBid?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PageInfoKeySpecifier = (
  | "endCursor"
  | "hasNextPage"
  | "hasPreviousPage"
  | "startCursor"
  | PageInfoKeySpecifier
)[];
export type PageInfoFieldPolicy = {
  endCursor?: FieldPolicy<any> | FieldReadFunction<any>;
  hasNextPage?: FieldPolicy<any> | FieldReadFunction<any>;
  hasPreviousPage?: FieldPolicy<any> | FieldReadFunction<any>;
  startCursor?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PointActivityKeySpecifier = (
  | "id"
  | "loanActivity"
  | "points"
  | "reason"
  | "timestamp"
  | "userId"
  | PointActivityKeySpecifier
)[];
export type PointActivityFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  loanActivity?: FieldPolicy<any> | FieldReadFunction<any>;
  points?: FieldPolicy<any> | FieldReadFunction<any>;
  reason?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
  userId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PointActivityConnectionKeySpecifier = (
  | "edges"
  | "pageInfo"
  | "totalCount"
  | PointActivityConnectionKeySpecifier
)[];
export type PointActivityConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PointActivityEdgeKeySpecifier = (
  | "cursor"
  | "node"
  | PointActivityEdgeKeySpecifier
)[];
export type PointActivityEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type QueryKeySpecifier = (
  | "getCollectionBySlug"
  | "getCollectionsByContractAddress"
  | "getListingById"
  | "getLoanById"
  | "getNftByContractAddressAndTokenId"
  | "getNftBySlugAndTokenId"
  | "getPointsFromReferrals"
  | "getReferredWallets"
  | "getUserPointActivities"
  | "getUserPoints"
  | "listAuctions"
  | "listBids"
  | "listCollections"
  | "listCollectionsWithListings"
  | "listCollectionsWithLoans"
  | "listListings"
  | "listLoanActivities"
  | "listLoans"
  | "listNftOffersAndRenegotiations"
  | "listNftsFromCollection"
  | "listNftsFromUser"
  | "listNotifications"
  | "listOffers"
  | "listRenegotiations"
  | "listSources"
  | "me"
  | QueryKeySpecifier
)[];
export type QueryFieldPolicy = {
  getCollectionBySlug?: FieldPolicy<any> | FieldReadFunction<any>;
  getCollectionsByContractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  getListingById?: FieldPolicy<any> | FieldReadFunction<any>;
  getLoanById?: FieldPolicy<any> | FieldReadFunction<any>;
  getNftByContractAddressAndTokenId?: FieldPolicy<any> | FieldReadFunction<any>;
  getNftBySlugAndTokenId?: FieldPolicy<any> | FieldReadFunction<any>;
  getPointsFromReferrals?: FieldPolicy<any> | FieldReadFunction<any>;
  getReferredWallets?: FieldPolicy<any> | FieldReadFunction<any>;
  getUserPointActivities?: FieldPolicy<any> | FieldReadFunction<any>;
  getUserPoints?: FieldPolicy<any> | FieldReadFunction<any>;
  listAuctions?: FieldPolicy<any> | FieldReadFunction<any>;
  listBids?: FieldPolicy<any> | FieldReadFunction<any>;
  listCollections?: FieldPolicy<any> | FieldReadFunction<any>;
  listCollectionsWithListings?: FieldPolicy<any> | FieldReadFunction<any>;
  listCollectionsWithLoans?: FieldPolicy<any> | FieldReadFunction<any>;
  listListings?: FieldPolicy<any> | FieldReadFunction<any>;
  listLoanActivities?: FieldPolicy<any> | FieldReadFunction<any>;
  listLoans?: FieldPolicy<any> | FieldReadFunction<any>;
  listNftOffersAndRenegotiations?: FieldPolicy<any> | FieldReadFunction<any>;
  listNftsFromCollection?: FieldPolicy<any> | FieldReadFunction<any>;
  listNftsFromUser?: FieldPolicy<any> | FieldReadFunction<any>;
  listNotifications?: FieldPolicy<any> | FieldReadFunction<any>;
  listOffers?: FieldPolicy<any> | FieldReadFunction<any>;
  listRenegotiations?: FieldPolicy<any> | FieldReadFunction<any>;
  listSources?: FieldPolicy<any> | FieldReadFunction<any>;
  me?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RenegotiationKeySpecifier = (
  | "aprBps"
  | "createdDate"
  | "duration"
  | "expirationTime"
  | "feeAmount"
  | "hidden"
  | "id"
  | "lenderAddress"
  | "loanAddress"
  | "loanId"
  | "loanReferenceId"
  | "nft"
  | "offerHash"
  | "principalAmount"
  | "renegotiationId"
  | "repayment"
  | "requiresLiquidation"
  | "signature"
  | "signerAddress"
  | "status"
  | "strictImprovement"
  | RenegotiationKeySpecifier
)[];
export type RenegotiationFieldPolicy = {
  aprBps?: FieldPolicy<any> | FieldReadFunction<any>;
  createdDate?: FieldPolicy<any> | FieldReadFunction<any>;
  duration?: FieldPolicy<any> | FieldReadFunction<any>;
  expirationTime?: FieldPolicy<any> | FieldReadFunction<any>;
  feeAmount?: FieldPolicy<any> | FieldReadFunction<any>;
  hidden?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  lenderAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  loanAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  loanId?: FieldPolicy<any> | FieldReadFunction<any>;
  loanReferenceId?: FieldPolicy<any> | FieldReadFunction<any>;
  nft?: FieldPolicy<any> | FieldReadFunction<any>;
  offerHash?: FieldPolicy<any> | FieldReadFunction<any>;
  principalAmount?: FieldPolicy<any> | FieldReadFunction<any>;
  renegotiationId?: FieldPolicy<any> | FieldReadFunction<any>;
  repayment?: FieldPolicy<any> | FieldReadFunction<any>;
  requiresLiquidation?: FieldPolicy<any> | FieldReadFunction<any>;
  signature?: FieldPolicy<any> | FieldReadFunction<any>;
  signerAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  strictImprovement?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RenegotiationConnectionKeySpecifier = (
  | "edges"
  | "pageInfo"
  | "totalCount"
  | RenegotiationConnectionKeySpecifier
)[];
export type RenegotiationConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RenegotiationEdgeKeySpecifier = (
  | "cursor"
  | "node"
  | RenegotiationEdgeKeySpecifier
)[];
export type RenegotiationEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RoyaltyKeySpecifier = (
  | "beneficiary"
  | "percentage"
  | RoyaltyKeySpecifier
)[];
export type RoyaltyFieldPolicy = {
  beneficiary?: FieldPolicy<any> | FieldReadFunction<any>;
  percentage?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SaleKeySpecifier = (
  | "id"
  | "nft"
  | "order"
  | "taker"
  | "timestamp"
  | "txHash"
  | SaleKeySpecifier
)[];
export type SaleFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  nft?: FieldPolicy<any> | FieldReadFunction<any>;
  order?: FieldPolicy<any> | FieldReadFunction<any>;
  taker?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
  txHash?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SetKeySpecifier = (
  | "collection"
  | "collections"
  | "createdDate"
  | "creator"
  | "creatorId"
  | "creators"
  | "description"
  | "followersCount"
  | "id"
  | "isActive"
  | "isPublic"
  | "isVerified"
  | "lastModified"
  | "name"
  | "nftsCount"
  | "setFollowerPosition"
  | "slug"
  | "statistics"
  | "tags"
  | SetKeySpecifier
)[];
export type SetFieldPolicy = {
  collection?: FieldPolicy<any> | FieldReadFunction<any>;
  collections?: FieldPolicy<any> | FieldReadFunction<any>;
  createdDate?: FieldPolicy<any> | FieldReadFunction<any>;
  creator?: FieldPolicy<any> | FieldReadFunction<any>;
  creatorId?: FieldPolicy<any> | FieldReadFunction<any>;
  creators?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  followersCount?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  isActive?: FieldPolicy<any> | FieldReadFunction<any>;
  isPublic?: FieldPolicy<any> | FieldReadFunction<any>;
  isVerified?: FieldPolicy<any> | FieldReadFunction<any>;
  lastModified?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  nftsCount?: FieldPolicy<any> | FieldReadFunction<any>;
  setFollowerPosition?: FieldPolicy<any> | FieldReadFunction<any>;
  slug?: FieldPolicy<any> | FieldReadFunction<any>;
  statistics?: FieldPolicy<any> | FieldReadFunction<any>;
  tags?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SetFollowerKeySpecifier = (
  | "createdDate"
  | "id"
  | "position"
  | "setId"
  | "userId"
  | SetFollowerKeySpecifier
)[];
export type SetFollowerFieldPolicy = {
  createdDate?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  position?: FieldPolicy<any> | FieldReadFunction<any>;
  setId?: FieldPolicy<any> | FieldReadFunction<any>;
  userId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SetNftNotificationKeySpecifier = (
  | "createdOn"
  | "id"
  | "nft"
  | "nftNotificationReasonName"
  | "notificationType"
  | "readOn"
  | "set"
  | "user"
  | SetNftNotificationKeySpecifier
)[];
export type SetNftNotificationFieldPolicy = {
  createdOn?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  nft?: FieldPolicy<any> | FieldReadFunction<any>;
  nftNotificationReasonName?: FieldPolicy<any> | FieldReadFunction<any>;
  notificationType?: FieldPolicy<any> | FieldReadFunction<any>;
  readOn?: FieldPolicy<any> | FieldReadFunction<any>;
  set?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SingleNFTOfferKeySpecifier = (
  | "aprBps"
  | "borrowerAddress"
  | "capacity"
  | "contractAddress"
  | "createdDate"
  | "currency"
  | "duration"
  | "expirationTime"
  | "fee"
  | "hidden"
  | "id"
  | "lenderAddress"
  | "nft"
  | "offerHash"
  | "offerId"
  | "principalAddress"
  | "principalAmount"
  | "repayment"
  | "requiresLiquidation"
  | "signature"
  | "signerAddress"
  | "statistics"
  | "status"
  | "validators"
  | SingleNFTOfferKeySpecifier
)[];
export type SingleNFTOfferFieldPolicy = {
  aprBps?: FieldPolicy<any> | FieldReadFunction<any>;
  borrowerAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  capacity?: FieldPolicy<any> | FieldReadFunction<any>;
  contractAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  createdDate?: FieldPolicy<any> | FieldReadFunction<any>;
  currency?: FieldPolicy<any> | FieldReadFunction<any>;
  duration?: FieldPolicy<any> | FieldReadFunction<any>;
  expirationTime?: FieldPolicy<any> | FieldReadFunction<any>;
  fee?: FieldPolicy<any> | FieldReadFunction<any>;
  hidden?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  lenderAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  nft?: FieldPolicy<any> | FieldReadFunction<any>;
  offerHash?: FieldPolicy<any> | FieldReadFunction<any>;
  offerId?: FieldPolicy<any> | FieldReadFunction<any>;
  principalAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  principalAmount?: FieldPolicy<any> | FieldReadFunction<any>;
  repayment?: FieldPolicy<any> | FieldReadFunction<any>;
  requiresLiquidation?: FieldPolicy<any> | FieldReadFunction<any>;
  signature?: FieldPolicy<any> | FieldReadFunction<any>;
  signerAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  statistics?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  validators?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SingleNFTOrderKeySpecifier = (
  | "createdDate"
  | "currency"
  | "currencyAddress"
  | "executionData"
  | "expiration"
  | "id"
  | "isAsk"
  | "maker"
  | "marketPlace"
  | "marketPlaceId"
  | "nft"
  | "orderType"
  | "price"
  | "status"
  | "timestamp"
  | "txHash"
  | SingleNFTOrderKeySpecifier
)[];
export type SingleNFTOrderFieldPolicy = {
  createdDate?: FieldPolicy<any> | FieldReadFunction<any>;
  currency?: FieldPolicy<any> | FieldReadFunction<any>;
  currencyAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  executionData?: FieldPolicy<any> | FieldReadFunction<any>;
  expiration?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  isAsk?: FieldPolicy<any> | FieldReadFunction<any>;
  maker?: FieldPolicy<any> | FieldReadFunction<any>;
  marketPlace?: FieldPolicy<any> | FieldReadFunction<any>;
  marketPlaceId?: FieldPolicy<any> | FieldReadFunction<any>;
  nft?: FieldPolicy<any> | FieldReadFunction<any>;
  orderType?: FieldPolicy<any> | FieldReadFunction<any>;
  price?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
  txHash?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SingleSourceLoanKeySpecifier = (
  | "accruedInterest"
  | "activities"
  | "address"
  | "aprBps"
  | "borrowerAddress"
  | "currency"
  | "duration"
  | "id"
  | "indexInBlock"
  | "lenderAddress"
  | "loanId"
  | "nft"
  | "offer"
  | "principalAddress"
  | "principalAmount"
  | "repaidActivity"
  | "requiresLiquidation"
  | "startTime"
  | "status"
  | "timestamp"
  | "txHash"
  | SingleSourceLoanKeySpecifier
)[];
export type SingleSourceLoanFieldPolicy = {
  accruedInterest?: FieldPolicy<any> | FieldReadFunction<any>;
  activities?: FieldPolicy<any> | FieldReadFunction<any>;
  address?: FieldPolicy<any> | FieldReadFunction<any>;
  aprBps?: FieldPolicy<any> | FieldReadFunction<any>;
  borrowerAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  currency?: FieldPolicy<any> | FieldReadFunction<any>;
  duration?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  indexInBlock?: FieldPolicy<any> | FieldReadFunction<any>;
  lenderAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  loanId?: FieldPolicy<any> | FieldReadFunction<any>;
  nft?: FieldPolicy<any> | FieldReadFunction<any>;
  offer?: FieldPolicy<any> | FieldReadFunction<any>;
  principalAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  principalAmount?: FieldPolicy<any> | FieldReadFunction<any>;
  repaidActivity?: FieldPolicy<any> | FieldReadFunction<any>;
  requiresLiquidation?: FieldPolicy<any> | FieldReadFunction<any>;
  startTime?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  timestamp?: FieldPolicy<any> | FieldReadFunction<any>;
  txHash?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SourceKeySpecifier = (
  | "accruedInterest"
  | "aprBps"
  | "id"
  | "lenderAddress"
  | "loan"
  | "loanId"
  | "originationFee"
  | "principalAmount"
  | "startTime"
  | SourceKeySpecifier
)[];
export type SourceFieldPolicy = {
  accruedInterest?: FieldPolicy<any> | FieldReadFunction<any>;
  aprBps?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  lenderAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  loan?: FieldPolicy<any> | FieldReadFunction<any>;
  loanId?: FieldPolicy<any> | FieldReadFunction<any>;
  originationFee?: FieldPolicy<any> | FieldReadFunction<any>;
  principalAmount?: FieldPolicy<any> | FieldReadFunction<any>;
  startTime?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SourceHistoryKeySpecifier = (
  | "accruedInterest"
  | "aprBps"
  | "id"
  | "lenderAddress"
  | "loanId"
  | "originationFee"
  | "principalAmount"
  | "startTime"
  | SourceHistoryKeySpecifier
)[];
export type SourceHistoryFieldPolicy = {
  accruedInterest?: FieldPolicy<any> | FieldReadFunction<any>;
  aprBps?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  lenderAddress?: FieldPolicy<any> | FieldReadFunction<any>;
  loanId?: FieldPolicy<any> | FieldReadFunction<any>;
  originationFee?: FieldPolicy<any> | FieldReadFunction<any>;
  principalAmount?: FieldPolicy<any> | FieldReadFunction<any>;
  startTime?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SourcesAndLostSourcesConnectionKeySpecifier = (
  | "edges"
  | "pageInfo"
  | "totalCount"
  | SourcesAndLostSourcesConnectionKeySpecifier
)[];
export type SourcesAndLostSourcesConnectionFieldPolicy = {
  edges?: FieldPolicy<any> | FieldReadFunction<any>;
  pageInfo?: FieldPolicy<any> | FieldReadFunction<any>;
  totalCount?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SourcesAndLostSourcesEdgeKeySpecifier = (
  | "cursor"
  | "node"
  | SourcesAndLostSourcesEdgeKeySpecifier
)[];
export type SourcesAndLostSourcesEdgeFieldPolicy = {
  cursor?: FieldPolicy<any> | FieldReadFunction<any>;
  node?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TagKeySpecifier = (
  | "createdDate"
  | "id"
  | "value"
  | TagKeySpecifier
)[];
export type TagFieldPolicy = {
  createdDate?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TraitKeySpecifier = (
  | "collectionId"
  | "statistics"
  | "type"
  | "value"
  | TraitKeySpecifier
)[];
export type TraitFieldPolicy = {
  collectionId?: FieldPolicy<any> | FieldReadFunction<any>;
  statistics?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  value?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UnderfundedOfferNotificationKeySpecifier = (
  | "createdOn"
  | "id"
  | "notificationType"
  | "offer"
  | "readOn"
  | "user"
  | UnderfundedOfferNotificationKeySpecifier
)[];
export type UnderfundedOfferNotificationFieldPolicy = {
  createdOn?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  notificationType?: FieldPolicy<any> | FieldReadFunction<any>;
  offer?: FieldPolicy<any> | FieldReadFunction<any>;
  readOn?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserKeySpecifier = (
  | "about"
  | "beta"
  | "blockchain"
  | "cart"
  | "cartId"
  | "createdDate"
  | "id"
  | "mail"
  | "mailValidationDate"
  | "originalProfilePicture"
  | "profilePictureId"
  | "size64ProfilePicture"
  | "size128ProfilePicture"
  | "size256ProfilePicture"
  | "size512ProfilePicture"
  | "twitterHandle"
  | "updatedAt"
  | "usedProduct"
  | "username"
  | "walletAddress"
  | UserKeySpecifier
)[];
export type UserFieldPolicy = {
  about?: FieldPolicy<any> | FieldReadFunction<any>;
  beta?: FieldPolicy<any> | FieldReadFunction<any>;
  blockchain?: FieldPolicy<any> | FieldReadFunction<any>;
  cart?: FieldPolicy<any> | FieldReadFunction<any>;
  cartId?: FieldPolicy<any> | FieldReadFunction<any>;
  createdDate?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  mail?: FieldPolicy<any> | FieldReadFunction<any>;
  mailValidationDate?: FieldPolicy<any> | FieldReadFunction<any>;
  originalProfilePicture?: FieldPolicy<any> | FieldReadFunction<any>;
  profilePictureId?: FieldPolicy<any> | FieldReadFunction<any>;
  size64ProfilePicture?: FieldPolicy<any> | FieldReadFunction<any>;
  size128ProfilePicture?: FieldPolicy<any> | FieldReadFunction<any>;
  size256ProfilePicture?: FieldPolicy<any> | FieldReadFunction<any>;
  size512ProfilePicture?: FieldPolicy<any> | FieldReadFunction<any>;
  twitterHandle?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
  usedProduct?: FieldPolicy<any> | FieldReadFunction<any>;
  username?: FieldPolicy<any> | FieldReadFunction<any>;
  walletAddress?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type StrictTypedTypePolicies = {
  ActiveOfferNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | ActiveOfferNotificationKeySpecifier
      | (() => undefined | ActiveOfferNotificationKeySpecifier);
    fields?: ActiveOfferNotificationFieldPolicy;
  };
  Activity?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | ActivityKeySpecifier
      | (() => undefined | ActivityKeySpecifier);
    fields?: ActivityFieldPolicy;
  };
  Asset?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | AssetKeySpecifier
      | (() => undefined | AssetKeySpecifier);
    fields?: AssetFieldPolicy;
  };
  Auction?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | AuctionKeySpecifier
      | (() => undefined | AuctionKeySpecifier);
    fields?: AuctionFieldPolicy;
  };
  AuctionBidConfirmationNotification?: Omit<
    TypePolicy,
    "fields" | "keyFields"
  > & {
    keyFields?:
      | false
      | AuctionBidConfirmationNotificationKeySpecifier
      | (() => undefined | AuctionBidConfirmationNotificationKeySpecifier);
    fields?: AuctionBidConfirmationNotificationFieldPolicy;
  };
  AuctionConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | AuctionConnectionKeySpecifier
      | (() => undefined | AuctionConnectionKeySpecifier);
    fields?: AuctionConnectionFieldPolicy;
  };
  AuctionEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | AuctionEdgeKeySpecifier
      | (() => undefined | AuctionEdgeKeySpecifier);
    fields?: AuctionEdgeFieldPolicy;
  };
  AuctionEndedNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | AuctionEndedNotificationKeySpecifier
      | (() => undefined | AuctionEndedNotificationKeySpecifier);
    fields?: AuctionEndedNotificationFieldPolicy;
  };
  AuctionStartedNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | AuctionStartedNotificationKeySpecifier
      | (() => undefined | AuctionStartedNotificationKeySpecifier);
    fields?: AuctionStartedNotificationFieldPolicy;
  };
  AuctionWonNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | AuctionWonNotificationKeySpecifier
      | (() => undefined | AuctionWonNotificationKeySpecifier);
    fields?: AuctionWonNotificationFieldPolicy;
  };
  Bid?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?: false | BidKeySpecifier | (() => undefined | BidKeySpecifier);
    fields?: BidFieldPolicy;
  };
  BidConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | BidConnectionKeySpecifier
      | (() => undefined | BidConnectionKeySpecifier);
    fields?: BidConnectionFieldPolicy;
  };
  BidEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | BidEdgeKeySpecifier
      | (() => undefined | BidEdgeKeySpecifier);
    fields?: BidEdgeFieldPolicy;
  };
  Cart?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?: false | CartKeySpecifier | (() => undefined | CartKeySpecifier);
    fields?: CartFieldPolicy;
  };
  Collection?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | CollectionKeySpecifier
      | (() => undefined | CollectionKeySpecifier);
    fields?: CollectionFieldPolicy;
  };
  CollectionConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | CollectionConnectionKeySpecifier
      | (() => undefined | CollectionConnectionKeySpecifier);
    fields?: CollectionConnectionFieldPolicy;
  };
  CollectionEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | CollectionEdgeKeySpecifier
      | (() => undefined | CollectionEdgeKeySpecifier);
    fields?: CollectionEdgeFieldPolicy;
  };
  CollectionOffer?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | CollectionOfferKeySpecifier
      | (() => undefined | CollectionOfferKeySpecifier);
    fields?: CollectionOfferFieldPolicy;
  };
  CollectionOfferStatistics?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | CollectionOfferStatisticsKeySpecifier
      | (() => undefined | CollectionOfferStatisticsKeySpecifier);
    fields?: CollectionOfferStatisticsFieldPolicy;
  };
  CollectionOrder?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | CollectionOrderKeySpecifier
      | (() => undefined | CollectionOrderKeySpecifier);
    fields?: CollectionOrderFieldPolicy;
  };
  CollectionStatistics?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | CollectionStatisticsKeySpecifier
      | (() => undefined | CollectionStatisticsKeySpecifier);
    fields?: CollectionStatisticsFieldPolicy;
  };
  ContractData?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | ContractDataKeySpecifier
      | (() => undefined | ContractDataKeySpecifier);
    fields?: ContractDataFieldPolicy;
  };
  Currency?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | CurrencyKeySpecifier
      | (() => undefined | CurrencyKeySpecifier);
    fields?: CurrencyFieldPolicy;
  };
  CurrencyAmount?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | CurrencyAmountKeySpecifier
      | (() => undefined | CurrencyAmountKeySpecifier);
    fields?: CurrencyAmountFieldPolicy;
  };
  Listing?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | ListingKeySpecifier
      | (() => undefined | ListingKeySpecifier);
    fields?: ListingFieldPolicy;
  };
  ListingConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | ListingConnectionKeySpecifier
      | (() => undefined | ListingConnectionKeySpecifier);
    fields?: ListingConnectionFieldPolicy;
  };
  ListingEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | ListingEdgeKeySpecifier
      | (() => undefined | ListingEdgeKeySpecifier);
    fields?: ListingEdgeFieldPolicy;
  };
  Loan?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?: false | LoanKeySpecifier | (() => undefined | LoanKeySpecifier);
    fields?: LoanFieldPolicy;
  };
  LoanActivity?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | LoanActivityKeySpecifier
      | (() => undefined | LoanActivityKeySpecifier);
    fields?: LoanActivityFieldPolicy;
  };
  LoanActivityConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | LoanActivityConnectionKeySpecifier
      | (() => undefined | LoanActivityConnectionKeySpecifier);
    fields?: LoanActivityConnectionFieldPolicy;
  };
  LoanActivityEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | LoanActivityEdgeKeySpecifier
      | (() => undefined | LoanActivityEdgeKeySpecifier);
    fields?: LoanActivityEdgeFieldPolicy;
  };
  LoanAuctioned?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | LoanAuctionedKeySpecifier
      | (() => undefined | LoanAuctionedKeySpecifier);
    fields?: LoanAuctionedFieldPolicy;
  };
  LoanAuctionedNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | LoanAuctionedNotificationKeySpecifier
      | (() => undefined | LoanAuctionedNotificationKeySpecifier);
    fields?: LoanAuctionedNotificationFieldPolicy;
  };
  LoanDefaultReminderNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | LoanDefaultReminderNotificationKeySpecifier
      | (() => undefined | LoanDefaultReminderNotificationKeySpecifier);
    fields?: LoanDefaultReminderNotificationFieldPolicy;
  };
  LoanDefaultedNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | LoanDefaultedNotificationKeySpecifier
      | (() => undefined | LoanDefaultedNotificationKeySpecifier);
    fields?: LoanDefaultedNotificationFieldPolicy;
  };
  LoanForeclosed?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | LoanForeclosedKeySpecifier
      | (() => undefined | LoanForeclosedKeySpecifier);
    fields?: LoanForeclosedFieldPolicy;
  };
  LoanInitiated?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | LoanInitiatedKeySpecifier
      | (() => undefined | LoanInitiatedKeySpecifier);
    fields?: LoanInitiatedFieldPolicy;
  };
  LoanPayment?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | LoanPaymentKeySpecifier
      | (() => undefined | LoanPaymentKeySpecifier);
    fields?: LoanPaymentFieldPolicy;
  };
  LoanRefinanced?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | LoanRefinancedKeySpecifier
      | (() => undefined | LoanRefinancedKeySpecifier);
    fields?: LoanRefinancedFieldPolicy;
  };
  LoanRefinancedNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | LoanRefinancedNotificationKeySpecifier
      | (() => undefined | LoanRefinancedNotificationKeySpecifier);
    fields?: LoanRefinancedNotificationFieldPolicy;
  };
  LoanRepaid?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | LoanRepaidKeySpecifier
      | (() => undefined | LoanRepaidKeySpecifier);
    fields?: LoanRepaidFieldPolicy;
  };
  LoanRepaidNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | LoanRepaidNotificationKeySpecifier
      | (() => undefined | LoanRepaidNotificationKeySpecifier);
    fields?: LoanRepaidNotificationFieldPolicy;
  };
  LoanSentToAuction?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | LoanSentToAuctionKeySpecifier
      | (() => undefined | LoanSentToAuctionKeySpecifier);
    fields?: LoanSentToAuctionFieldPolicy;
  };
  LostSource?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | LostSourceKeySpecifier
      | (() => undefined | LostSourceKeySpecifier);
    fields?: LostSourceFieldPolicy;
  };
  LostSourceNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | LostSourceNotificationKeySpecifier
      | (() => undefined | LostSourceNotificationKeySpecifier);
    fields?: LostSourceNotificationFieldPolicy;
  };
  ManyNftsStatistics?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | ManyNftsStatisticsKeySpecifier
      | (() => undefined | ManyNftsStatisticsKeySpecifier);
    fields?: ManyNftsStatisticsFieldPolicy;
  };
  MultiSourceLoan?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | MultiSourceLoanKeySpecifier
      | (() => undefined | MultiSourceLoanKeySpecifier);
    fields?: MultiSourceLoanFieldPolicy;
  };
  MultiSourceLoanConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | MultiSourceLoanConnectionKeySpecifier
      | (() => undefined | MultiSourceLoanConnectionKeySpecifier);
    fields?: MultiSourceLoanConnectionFieldPolicy;
  };
  MultiSourceLoanEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | MultiSourceLoanEdgeKeySpecifier
      | (() => undefined | MultiSourceLoanEdgeKeySpecifier);
    fields?: MultiSourceLoanEdgeFieldPolicy;
  };
  MultiSourceLoanHistory?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | MultiSourceLoanHistoryKeySpecifier
      | (() => undefined | MultiSourceLoanHistoryKeySpecifier);
    fields?: MultiSourceLoanHistoryFieldPolicy;
  };
  Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | MutationKeySpecifier
      | (() => undefined | MutationKeySpecifier);
    fields?: MutationFieldPolicy;
  };
  NFT?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?: false | NFTKeySpecifier | (() => undefined | NFTKeySpecifier);
    fields?: NFTFieldPolicy;
  };
  NFTConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | NFTConnectionKeySpecifier
      | (() => undefined | NFTConnectionKeySpecifier);
    fields?: NFTConnectionFieldPolicy;
  };
  NFTEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | NFTEdgeKeySpecifier
      | (() => undefined | NFTEdgeKeySpecifier);
    fields?: NFTEdgeFieldPolicy;
  };
  NewOfferNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | NewOfferNotificationKeySpecifier
      | (() => undefined | NewOfferNotificationKeySpecifier);
    fields?: NewOfferNotificationFieldPolicy;
  };
  NewRenegotiationOfferNotification?: Omit<
    TypePolicy,
    "fields" | "keyFields"
  > & {
    keyFields?:
      | false
      | NewRenegotiationOfferNotificationKeySpecifier
      | (() => undefined | NewRenegotiationOfferNotificationKeySpecifier);
    fields?: NewRenegotiationOfferNotificationFieldPolicy;
  };
  NftStatistics?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | NftStatisticsKeySpecifier
      | (() => undefined | NftStatisticsKeySpecifier);
    fields?: NftStatisticsFieldPolicy;
  };
  Node?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?: false | NodeKeySpecifier | (() => undefined | NodeKeySpecifier);
    fields?: NodeFieldPolicy;
  };
  Notification?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | NotificationKeySpecifier
      | (() => undefined | NotificationKeySpecifier);
    fields?: NotificationFieldPolicy;
  };
  NotificationConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | NotificationConnectionKeySpecifier
      | (() => undefined | NotificationConnectionKeySpecifier);
    fields?: NotificationConnectionFieldPolicy;
  };
  NotificationEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | NotificationEdgeKeySpecifier
      | (() => undefined | NotificationEdgeKeySpecifier);
    fields?: NotificationEdgeFieldPolicy;
  };
  Offer?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | OfferKeySpecifier
      | (() => undefined | OfferKeySpecifier);
    fields?: OfferFieldPolicy;
  };
  OfferAcceptedNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | OfferAcceptedNotificationKeySpecifier
      | (() => undefined | OfferAcceptedNotificationKeySpecifier);
    fields?: OfferAcceptedNotificationFieldPolicy;
  };
  OfferConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | OfferConnectionKeySpecifier
      | (() => undefined | OfferConnectionKeySpecifier);
    fields?: OfferConnectionFieldPolicy;
  };
  OfferEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | OfferEdgeKeySpecifier
      | (() => undefined | OfferEdgeKeySpecifier);
    fields?: OfferEdgeFieldPolicy;
  };
  OfferStatistics?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | OfferStatisticsKeySpecifier
      | (() => undefined | OfferStatisticsKeySpecifier);
    fields?: OfferStatisticsFieldPolicy;
  };
  OfferValidator?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | OfferValidatorKeySpecifier
      | (() => undefined | OfferValidatorKeySpecifier);
    fields?: OfferValidatorFieldPolicy;
  };
  OffersAndRenegotiationsConnection?: Omit<
    TypePolicy,
    "fields" | "keyFields"
  > & {
    keyFields?:
      | false
      | OffersAndRenegotiationsConnectionKeySpecifier
      | (() => undefined | OffersAndRenegotiationsConnectionKeySpecifier);
    fields?: OffersAndRenegotiationsConnectionFieldPolicy;
  };
  OffersAndRenegotiationsEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | OffersAndRenegotiationsEdgeKeySpecifier
      | (() => undefined | OffersAndRenegotiationsEdgeKeySpecifier);
    fields?: OffersAndRenegotiationsEdgeFieldPolicy;
  };
  Order?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | OrderKeySpecifier
      | (() => undefined | OrderKeySpecifier);
    fields?: OrderFieldPolicy;
  };
  OutbidNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | OutbidNotificationKeySpecifier
      | (() => undefined | OutbidNotificationKeySpecifier);
    fields?: OutbidNotificationFieldPolicy;
  };
  PageInfo?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | PageInfoKeySpecifier
      | (() => undefined | PageInfoKeySpecifier);
    fields?: PageInfoFieldPolicy;
  };
  PointActivity?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | PointActivityKeySpecifier
      | (() => undefined | PointActivityKeySpecifier);
    fields?: PointActivityFieldPolicy;
  };
  PointActivityConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | PointActivityConnectionKeySpecifier
      | (() => undefined | PointActivityConnectionKeySpecifier);
    fields?: PointActivityConnectionFieldPolicy;
  };
  PointActivityEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | PointActivityEdgeKeySpecifier
      | (() => undefined | PointActivityEdgeKeySpecifier);
    fields?: PointActivityEdgeFieldPolicy;
  };
  Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | QueryKeySpecifier
      | (() => undefined | QueryKeySpecifier);
    fields?: QueryFieldPolicy;
  };
  Renegotiation?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | RenegotiationKeySpecifier
      | (() => undefined | RenegotiationKeySpecifier);
    fields?: RenegotiationFieldPolicy;
  };
  RenegotiationConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | RenegotiationConnectionKeySpecifier
      | (() => undefined | RenegotiationConnectionKeySpecifier);
    fields?: RenegotiationConnectionFieldPolicy;
  };
  RenegotiationEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | RenegotiationEdgeKeySpecifier
      | (() => undefined | RenegotiationEdgeKeySpecifier);
    fields?: RenegotiationEdgeFieldPolicy;
  };
  Royalty?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | RoyaltyKeySpecifier
      | (() => undefined | RoyaltyKeySpecifier);
    fields?: RoyaltyFieldPolicy;
  };
  Sale?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?: false | SaleKeySpecifier | (() => undefined | SaleKeySpecifier);
    fields?: SaleFieldPolicy;
  };
  Set?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?: false | SetKeySpecifier | (() => undefined | SetKeySpecifier);
    fields?: SetFieldPolicy;
  };
  SetFollower?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | SetFollowerKeySpecifier
      | (() => undefined | SetFollowerKeySpecifier);
    fields?: SetFollowerFieldPolicy;
  };
  SetNftNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | SetNftNotificationKeySpecifier
      | (() => undefined | SetNftNotificationKeySpecifier);
    fields?: SetNftNotificationFieldPolicy;
  };
  SingleNFTOffer?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | SingleNFTOfferKeySpecifier
      | (() => undefined | SingleNFTOfferKeySpecifier);
    fields?: SingleNFTOfferFieldPolicy;
  };
  SingleNFTOrder?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | SingleNFTOrderKeySpecifier
      | (() => undefined | SingleNFTOrderKeySpecifier);
    fields?: SingleNFTOrderFieldPolicy;
  };
  SingleSourceLoan?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | SingleSourceLoanKeySpecifier
      | (() => undefined | SingleSourceLoanKeySpecifier);
    fields?: SingleSourceLoanFieldPolicy;
  };
  Source?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | SourceKeySpecifier
      | (() => undefined | SourceKeySpecifier);
    fields?: SourceFieldPolicy;
  };
  SourceHistory?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | SourceHistoryKeySpecifier
      | (() => undefined | SourceHistoryKeySpecifier);
    fields?: SourceHistoryFieldPolicy;
  };
  SourcesAndLostSourcesConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | SourcesAndLostSourcesConnectionKeySpecifier
      | (() => undefined | SourcesAndLostSourcesConnectionKeySpecifier);
    fields?: SourcesAndLostSourcesConnectionFieldPolicy;
  };
  SourcesAndLostSourcesEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | SourcesAndLostSourcesEdgeKeySpecifier
      | (() => undefined | SourcesAndLostSourcesEdgeKeySpecifier);
    fields?: SourcesAndLostSourcesEdgeFieldPolicy;
  };
  Tag?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?: false | TagKeySpecifier | (() => undefined | TagKeySpecifier);
    fields?: TagFieldPolicy;
  };
  Trait?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | TraitKeySpecifier
      | (() => undefined | TraitKeySpecifier);
    fields?: TraitFieldPolicy;
  };
  UnderfundedOfferNotification?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?:
      | false
      | UnderfundedOfferNotificationKeySpecifier
      | (() => undefined | UnderfundedOfferNotificationKeySpecifier);
    fields?: UnderfundedOfferNotificationFieldPolicy;
  };
  User?: Omit<TypePolicy, "fields" | "keyFields"> & {
    keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier);
    fields?: UserFieldPolicy;
  };
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;

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
  mutation generateRenegotiationOfferHash(
    $renegotiationInput: RenegotiationOfferInput!
  ) {
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
  mutation hideRenegotiationOffer($id: String!) {
    hideRenegotiation(renegotiationId: $id) {
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
  mutation unhideRenegotiationOffer($id: String!) {
    showRenegotiation(renegotiationId: $id) {
      id
    }
  }
`;
export const CollectionsIdByContractAddressDocument = gql`
  query collectionsIdByContractAddress($contractAddress: Address!) {
    collections: getCollectionsByContractAddress(
      contractAddress: $contractAddress
    ) {
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
  query listListings(
    $collections: [Int!]
    $userFilter: UserFilter
    $marketplaceNames: [MarketplaceEnum!]
    $first: Int = 24
    $after: String
  ) {
    result: listListings(
      collectionIds: $collections
      userFilter: $userFilter
      marketplaceNames: $marketplaceNames
      first: $first
      after: $after
    ) {
      pageInfo {
        endCursor
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
export const NftIdByContractAddressAndTokenIdDocument = gql`
  query nftIdByContractAddressAndTokenId(
    $contractAddress: Address!
    $tokenId: BigInt!
  ) {
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
  query listOffers(
    $lenderAddress: String
    $sortBy: OffersSortInput!
    $terms: TermsFilter
    $statuses: [OfferStatus!] = [ACTIVE, CANCELLED, INACTIVE, EXPIRED]
    $nfts: [Int!]
    $collections: [Int!]
    $onlySingleNftOffers: Boolean
    $onlyCollectionOffers: Boolean
    $first: Int = 24
    $after: String
  ) {
    result: listOffers(
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
export type Requester<C = {}, E = unknown> = <R, V>(
  doc: DocumentNode,
  vars?: V,
  options?: C
) => Promise<R> | AsyncIterable<R>;
export function getSdk<C, E>(requester: Requester<C, E>) {
  return {
    listNft(
      variables: ListNftMutationVariables,
      options?: C
    ): Promise<ListNftMutation> {
      return requester<ListNftMutation, ListNftMutationVariables>(
        ListNftDocument,
        variables,
        options
      ) as Promise<ListNftMutation>;
    },
    unlistNft(
      variables: UnlistNftMutationVariables,
      options?: C
    ): Promise<UnlistNftMutation> {
      return requester<UnlistNftMutation, UnlistNftMutationVariables>(
        UnlistNftDocument,
        variables,
        options
      ) as Promise<UnlistNftMutation>;
    },
    generateCollectionOfferHash(
      variables: GenerateCollectionOfferHashMutationVariables,
      options?: C
    ): Promise<GenerateCollectionOfferHashMutation> {
      return requester<
        GenerateCollectionOfferHashMutation,
        GenerateCollectionOfferHashMutationVariables
      >(
        GenerateCollectionOfferHashDocument,
        variables,
        options
      ) as Promise<GenerateCollectionOfferHashMutation>;
    },
    saveCollectionOffer(
      variables: SaveCollectionOfferMutationVariables,
      options?: C
    ): Promise<SaveCollectionOfferMutation> {
      return requester<
        SaveCollectionOfferMutation,
        SaveCollectionOfferMutationVariables
      >(
        SaveCollectionOfferDocument,
        variables,
        options
      ) as Promise<SaveCollectionOfferMutation>;
    },
    hideOffer(
      variables: HideOfferMutationVariables,
      options?: C
    ): Promise<HideOfferMutation> {
      return requester<HideOfferMutation, HideOfferMutationVariables>(
        HideOfferDocument,
        variables,
        options
      ) as Promise<HideOfferMutation>;
    },
    generateSingleNftOfferHash(
      variables: GenerateSingleNftOfferHashMutationVariables,
      options?: C
    ): Promise<GenerateSingleNftOfferHashMutation> {
      return requester<
        GenerateSingleNftOfferHashMutation,
        GenerateSingleNftOfferHashMutationVariables
      >(
        GenerateSingleNftOfferHashDocument,
        variables,
        options
      ) as Promise<GenerateSingleNftOfferHashMutation>;
    },
    saveSingleNftOffer(
      variables: SaveSingleNftOfferMutationVariables,
      options?: C
    ): Promise<SaveSingleNftOfferMutation> {
      return requester<
        SaveSingleNftOfferMutation,
        SaveSingleNftOfferMutationVariables
      >(
        SaveSingleNftOfferDocument,
        variables,
        options
      ) as Promise<SaveSingleNftOfferMutation>;
    },
    unhideOffer(
      variables: UnhideOfferMutationVariables,
      options?: C
    ): Promise<UnhideOfferMutation> {
      return requester<UnhideOfferMutation, UnhideOfferMutationVariables>(
        UnhideOfferDocument,
        variables,
        options
      ) as Promise<UnhideOfferMutation>;
    },
    generateRenegotiationOfferHash(
      variables: GenerateRenegotiationOfferHashMutationVariables,
      options?: C
    ): Promise<GenerateRenegotiationOfferHashMutation> {
      return requester<
        GenerateRenegotiationOfferHashMutation,
        GenerateRenegotiationOfferHashMutationVariables
      >(
        GenerateRenegotiationOfferHashDocument,
        variables,
        options
      ) as Promise<GenerateRenegotiationOfferHashMutation>;
    },
    hideRenegotiationOffer(
      variables: HideRenegotiationOfferMutationVariables,
      options?: C
    ): Promise<HideRenegotiationOfferMutation> {
      return requester<
        HideRenegotiationOfferMutation,
        HideRenegotiationOfferMutationVariables
      >(
        HideRenegotiationOfferDocument,
        variables,
        options
      ) as Promise<HideRenegotiationOfferMutation>;
    },
    saveRenegotiationOffer(
      variables: SaveRenegotiationOfferMutationVariables,
      options?: C
    ): Promise<SaveRenegotiationOfferMutation> {
      return requester<
        SaveRenegotiationOfferMutation,
        SaveRenegotiationOfferMutationVariables
      >(
        SaveRenegotiationOfferDocument,
        variables,
        options
      ) as Promise<SaveRenegotiationOfferMutation>;
    },
    unhideRenegotiationOffer(
      variables: UnhideRenegotiationOfferMutationVariables,
      options?: C
    ): Promise<UnhideRenegotiationOfferMutation> {
      return requester<
        UnhideRenegotiationOfferMutation,
        UnhideRenegotiationOfferMutationVariables
      >(
        UnhideRenegotiationOfferDocument,
        variables,
        options
      ) as Promise<UnhideRenegotiationOfferMutation>;
    },
    collectionsIdByContractAddress(
      variables: CollectionsIdByContractAddressQueryVariables,
      options?: C
    ): Promise<CollectionsIdByContractAddressQuery> {
      return requester<
        CollectionsIdByContractAddressQuery,
        CollectionsIdByContractAddressQueryVariables
      >(
        CollectionsIdByContractAddressDocument,
        variables,
        options
      ) as Promise<CollectionsIdByContractAddressQuery>;
    },
    collectionIdBySlug(
      variables: CollectionIdBySlugQueryVariables,
      options?: C
    ): Promise<CollectionIdBySlugQuery> {
      return requester<
        CollectionIdBySlugQuery,
        CollectionIdBySlugQueryVariables
      >(
        CollectionIdBySlugDocument,
        variables,
        options
      ) as Promise<CollectionIdBySlugQuery>;
    },
    listListings(
      variables?: ListListingsQueryVariables,
      options?: C
    ): Promise<ListListingsQuery> {
      return requester<ListListingsQuery, ListListingsQueryVariables>(
        ListListingsDocument,
        variables,
        options
      ) as Promise<ListListingsQuery>;
    },
    nftIdByContractAddressAndTokenId(
      variables: NftIdByContractAddressAndTokenIdQueryVariables,
      options?: C
    ): Promise<NftIdByContractAddressAndTokenIdQuery> {
      return requester<
        NftIdByContractAddressAndTokenIdQuery,
        NftIdByContractAddressAndTokenIdQueryVariables
      >(
        NftIdByContractAddressAndTokenIdDocument,
        variables,
        options
      ) as Promise<NftIdByContractAddressAndTokenIdQuery>;
    },
    nftIdBySlugTokenId(
      variables: NftIdBySlugTokenIdQueryVariables,
      options?: C
    ): Promise<NftIdBySlugTokenIdQuery> {
      return requester<
        NftIdBySlugTokenIdQuery,
        NftIdBySlugTokenIdQueryVariables
      >(
        NftIdBySlugTokenIdDocument,
        variables,
        options
      ) as Promise<NftIdBySlugTokenIdQuery>;
    },
    listOffers(
      variables: ListOffersQueryVariables,
      options?: C
    ): Promise<ListOffersQuery> {
      return requester<ListOffersQuery, ListOffersQueryVariables>(
        ListOffersDocument,
        variables,
        options
      ) as Promise<ListOffersQuery>;
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
