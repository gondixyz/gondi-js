var we=Object.defineProperty;var ot=(p,e,t)=>e in p?we(p,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):p[e]=t;var y=(p,e)=>we(p,"name",{value:e,configurable:!0});var he=(p,e,t)=>(ot(p,typeof e!="symbol"?e+"":e,t),t);import{createPublicClient as wn,createTransport as hn}from"viem";import{getAddress as nn}from"viem";import{ApolloClient as Tt,ApolloLink as Pe,createHttpLink as gt,InMemoryCache as bt}from"@apollo/client/core/index.js";import{setContext as It}from"@apollo/client/link/context/index.js";import{withScalars as Ft}from"apollo-link-scalars";import{buildSchema as At}from"graphql";import{ApolloClient as lt,ApolloLink as Ce,createHttpLink as yt,InMemoryCache as dt}from"@apollo/client/core/index.js";import{gql as Le}from"graphql-tag";import{SiweMessage as ut}from"siwe";var _e=y(()=>`${oe()}/graphql`,"authApiUrl"),ct=y(async()=>{let p=Ce.from([yt({uri:({operationName:e})=>`${_e()}?operation=${encodeURIComponent(e)}`})]);return new lt({link:Ce.from([p]),defaultOptions:{query:{errorPolicy:"all"},mutate:{errorPolicy:"all"}},cache:new dt({})})},"getAuthClient"),mt=y(async({wallet:p})=>{let e=await ct(),{data:t,errors:n}=await e.mutate({mutation:Le`
      mutation GenerateSignInNonce($nonceInput: NonceInput!) {
        generateSignInNonce(nonceInput: $nonceInput)
      }
    `,variables:{nonceInput:{walletAddress:p.account.address,blockchain:"ETHEREUM"}}});if(n)throw new Error(n.map(u=>u.message).join(", "));let a=t?.generateSignInNonce,i=new ut({domain:"gondi.xyz",address:p.account.address,chainId:p.chain.id,statement:"Sign in with Ethereum to the app.",uri:_e(),version:"1",nonce:a}),r=await p.signMessage({message:i.prepareMessage()}),{data:s,errors:o}=await e.mutate({mutation:Le`
      mutation SignInWithEthereum($siweInput: SiweInput!) {
        signInWithEthereum(siweInput: $siweInput)
      }
    `,variables:{siweInput:{message:i.prepareMessage(),signature:r}}});if(o)throw new Error(o.map(u=>u.message).join(", "));let l=s?.signInWithEthereum;if(!l)throw new Error("Couldn't generate Access Token, please try again later");return l},"signIn"),K=class{token;wallet;constructor({token:e,wallet:t}){this.token=e,this.wallet=t}async authorizeRequest(e){await this.signIn();let{headers:t={}}=e.context||{headers:{}};return{...e,headers:{...t,authorization:`Bearer ${this.token}`}}}async signIn(){this.token||(this.token=await mt({wallet:this.wallet}))}};y(K,"SessionToken");var Re=`type ActiveOfferNotification implements Node & Notification {
  createdOn: DateTime!
  id: String!
  notificationType: String!
  offer: Offer!
  offerId: String!
  readOn: DateTime
  user: User!
}

interface Activity implements Node {
  id: String!
  timestamp: DateTime!
  txHash: Hash
}

scalar Address

type Asset {
  accessTypeName: String!
  cacheUrl: String
  contentTypeMime: String!
  data: String!
}

type Auction implements Node {
  duration: BigInt
  endTime: DateTime
  highestBid: Bid
  id: String!
  loan: MultiSourceLoan!
  minBid: BigInt!
  originator: Address
  settler: Address
  startTime: DateTime
  status: String!
  triggerFee: BigInt
}

type AuctionBidConfirmationNotification implements Node & Notification {
  auction: Auction!
  auctionId: String!
  bid: Bid!
  bidId: Int!
  createdOn: DateTime!
  id: String!
  loan: MultiSourceLoan!
  loanId: String!
  notificationType: String!
  readOn: DateTime
  user: User!
}

type AuctionConnection {
  edges: [AuctionEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type AuctionEdge {
  cursor: String!
  node: Auction!
}

type AuctionEndedNotification implements Node & Notification {
  auction: Auction!
  auctionId: String!
  createdOn: DateTime!
  id: String!
  loan: MultiSourceLoan!
  loanId: String!
  notificationType: String!
  readOn: DateTime
  user: User!
}

enum AuctionSortField {
  END_TIME
}

input AuctionSortInput {
  field: AuctionSortField!
  order: Ordering!
}

type AuctionStartedNotification implements Node & Notification {
  auction: Auction!
  auctionId: String!
  createdOn: DateTime!
  id: String!
  loan: MultiSourceLoan!
  loanId: String!
  notificationType: String!
  readOn: DateTime
  user: User!
}

enum AuctionStatus {
  ENDED
  LIVE
  PAST
  UPCOMING
}

type AuctionWonNotification implements Node & Notification {
  auction: Auction!
  auctionId: String!
  createdOn: DateTime!
  id: String!
  loan: MultiSourceLoan!
  loanId: String!
  notificationType: String!
  readOn: DateTime
  user: User!
}

type Bid implements Node {
  amount: BigInt!
  auction: Auction!
  auctionId: String!
  bidder: Address!
  id: String!
  indexInBlock: Int!
  timestamp: DateTime!
  txHash: Hash!
}

type BidConnection {
  edges: [BidEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type BidEdge {
  cursor: String!
  node: Bid!
}

enum BidSortField {
  BID
  HIGHEST_BID
}

input BidSortInput {
  field: BidSortField!
  order: Ordering!
}

scalar BigInt

type Collection implements Node {
  bannerImage: Asset
  collectionUrl: String
  contractData: ContractData
  description: String
  discordUrl: String
  externalUrl: String
  id: String!
  image: Asset
  imageId: String
  name: String
  nftsCount: Int
  slug: String
  statistics: CollectionStatistics!
  twitterUsername: String
  verified: Boolean!
}

type CollectionConnection {
  edges: [CollectionEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type CollectionEdge {
  cursor: String!
  node: Collection!
}

type CollectionLoansData {
  maxAprBps: Float!
  maxPrincipalAmount: BigInt!
  maxRemainingTime: BigInt!
  minAprBps: Float!
  minPrincipalAmount: BigInt!
  minRemainingTime: BigInt!
}

type CollectionOffer implements Node & Offer {
  aprBps: BigInt!
  borrowerAddress: Address
  capacity: BigInt!
  collection: Collection!
  consumedCapacity: BigInt!
  contractAddress: Address!
  createdDate: DateTime
  currency: Currency!
  duration: BigInt!
  expirationTime: BigInt!
  fee: BigInt!
  hidden: Boolean
  id: String!
  lenderAddress: Address
  maxPrincipal: BigInt!
  maxSeniorRepayment: BigInt!

  """Deprecated field: use maxSeniorRepayment instead."""
  maxTrancheFloor: BigInt! @deprecated(reason: "Use maxSeniorRepayment instead.")
  netPrincipal: BigInt!
  offerHash: Hash
  offerId: BigInt!
  principalAddress: Address!
  principalAmount: BigInt!
  repayment: BigInt!
  requiresLiquidation: Boolean
  signature: Signature
  signerAddress: Address
  statistics: CollectionOfferStatistics!
  status: String!
  validators: [OfferValidator!]!
}

input CollectionOfferInput {
  aprBps: BigInt!
  borrowerAddress: Address!
  capacity: BigInt!
  collectionId: Int!
  contractAddress: Address!
  duration: BigInt!
  expirationTime: BigInt!
  fee: BigInt!
  lenderAddress: Address!
  maxSeniorRepayment: BigInt = null
  maxTrancheFloor: BigInt = null
  offerValidators: [OfferValidatorInput!]!
  principalAddress: Address!
  principalAmount: BigInt!
  requiresLiquidation: Boolean = null
  signerAddress: Address = null
}

type CollectionOfferStatistics {
  acceptedLoans: Int!
  consumedCapacity: BigInt!
}

type CollectionOrder implements Activity & Node & Order {
  collection: Collection!
  createdDate: DateTime!
  currency: Currency!
  currencyAddress: Address!
  expiration: DateTime
  fees: BigInt!
  hidden: Boolean!
  id: String!
  isAsk: Boolean!
  maker: Address!
  marketPlace: String!
  netAmount: BigInt!
  nonce: BigInt!
  orderType: String!
  price: BigInt!
  signature: Hash!
  startTime: DateTime!
  status: String!
  timestamp: DateTime!
  txHash: Hash
}

input CollectionSignedOfferInput {
  aprBps: BigInt!
  borrowerAddress: Address!
  capacity: BigInt!
  collectionId: Int!
  contractAddress: Address!
  duration: BigInt!
  expirationTime: BigInt!
  fee: BigInt!
  lenderAddress: Address!
  maxSeniorRepayment: BigInt = null
  maxTrancheFloor: BigInt = null
  offerHash: Hash!
  offerId: BigInt!
  offerValidators: [OfferValidatorInput!]!
  principalAddress: Address!
  principalAmount: BigInt!
  requiresLiquidation: Boolean = null
  signature: Signature!
  signerAddress: Address = null
}

enum CollectionSortField {
  LISTING_COUNT
  LOAN_COUNT
  OUTSTANDING_PRINCIPAL
  TOTAL_OUTSTANDING_PRINCIPAL
  TOTAL_VOLUME
}

input CollectionSortInput {
  field: CollectionSortField!
  order: Ordering!
  principalAddress: Address = null
}

type CollectionStatistics {
  bestOffer: CurrencyAmount
  floorPrice: CurrencyAmount
  floorPrice7d: Float
  floorPrice30d: Float
  lastSale: Sale
  nftsCount: Float
  numberOfOffers(currencyAddress: Address!): Float!
  numberOfPricedNfts: Int!
  outstandingLoanCount: Int!
  outstandingPrincipal(currencyAddress: Address!): BigInt!
  percentageInOutstandingLoans: Float!
  repaymentRate: Float!
  totalLoanVolume(currencyAddress: Address!): BigInt!
  totalLoanVolume1d(currencyAddress: Address!): BigInt!
  totalLoanVolume1m(currencyAddress: Address!): BigInt!
  totalLoanVolume1w(currencyAddress: Address!): BigInt!
  totalLoanVolume1y(currencyAddress: Address!): BigInt!
  totalLoanVolume2m(currencyAddress: Address!): BigInt!
  totalLoanVolume3m(currencyAddress: Address!): BigInt!
  totalLoanVolume4m(currencyAddress: Address!): BigInt!
  totalOutstandingPrincipal: BigInt!
  totalVolume: Float
  totalVolume1d: Float
  totalVolume1m: Float
  totalVolume1w: Float
  totalVolume1y: Float
  totalVolume2m: Float
  totalVolume3m: Float
  totalVolume4m: Float
}

input ConsiderationInput {
  endAmount: BigInt!
  identifierOrCriteria: BigInt!
  itemType: Int!
  recipient: Address!
  startAmount: BigInt!
  token: Address!
}

type ContractData implements Node {
  blockchain: String!
  contractAddress: Address!
  createdDate: DateTime!
  creatorAddress: Address
  id: String!
  standard: String!
}

type Currency implements Node {
  address: Address!
  currentEthRate: Float
  currentUsdcPrice: Float
  decimals: Int!
  id: String!
  symbol: String!
}

type CurrencyAmount {
  amount: Float!
  currency: Currency!
}

"""Date with time (isoformat)"""
scalar DateTime

type Delegation implements Node {
  contractAddress: String!
  delegateTo: Address!
  id: String!
  nft: NFT!
  timestamp: DateTime!
}

type DelegationConnection {
  edges: [DelegationEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type DelegationEdge {
  cursor: String!
  node: Delegation!
}

scalar Hash

scalar Hex

input Interval {
  max: Float = null
  min: Float = null
}

type LinkedWallets implements Node {
  id: String!
  pending: Boolean!
  shouldAccept: Boolean!
  walletAddress: String!
}

type Listing implements Node {
  createdDate: DateTime!
  desiredDuration: Int
  desiredPrincipalAddress: Address
  expirationDate: DateTime!
  id: String!
  marketplaceName: MarketplaceEnum!
  nft: NFT!
  user: User!
}

type ListingConnection {
  edges: [ListingEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type ListingEdge {
  cursor: String!
  node: Listing!
}

interface Loan implements Node {
  activities: [LoanActivity!]!
  address: Address!
  borrowerAddress: Address!
  contractStartTime: DateTime!
  currency: Currency!
  duration: BigInt!
  id: String!
  indexInBlock: Int!
  loanId: Int!

  """Deprecated field. Use offerIds to return loan offer ids instead."""
  offer: Offer! @deprecated(reason: "Use offerIds to return loan offer ids instead.")
  offerIds: [String!]!
  principalAddress: Address!
  protocolFee: BigInt!
  repaidActivity: LoanRepaid
  startTime: DateTime!
  status: String!
  timestamp: DateTime!
  txHash: Hash!
}

interface LoanActivity implements Node {
  id: String!
  indexInBlock: Int!
  loan: Loan!
  loanId: String!
  multiSourceLoanHistory: MultiSourceLoanHistory
  timestamp: DateTime!
  txHash: Hash!
}

type LoanActivityConnection {
  edges: [LoanActivityEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type LoanActivityEdge {
  cursor: String!
  node: LoanActivity!
}

enum LoanActivitySortField {
  TIMESTAMP
}

input LoanActivitySortInput {
  field: LoanActivitySortField!
  order: Ordering!
}

enum LoanActivityType {
  LOAN_AUCTIONED
  LOAN_EXTENDED
  LOAN_FORECLOSED
  LOAN_INITIATED
  LOAN_REFINANCED
  LOAN_REFINANCED_FROM_OFFERS
  LOAN_REPAID
  LOAN_SENT_TO_AUCTION
}

type LoanAuctioned implements LoanActivity & Node {
  id: String!
  indexInBlock: Int!
  loan: Loan!
  loanId: String!
  loanPayments: [LoanPayment!]!
  multiSourceLoanHistory: MultiSourceLoanHistory
  timestamp: DateTime!
  totalAuctioned: BigInt!
  txHash: Hash!
}

type LoanAuctionedNotification implements Node & Notification {
  auction: Auction!
  auctionId: String!
  createdOn: DateTime!
  id: String!
  loan: MultiSourceLoan!
  loanId: String!
  notificationType: String!
  readOn: DateTime
  user: User!
}

type LoanDefaultReminderNotification implements Node & Notification {
  createdOn: DateTime!
  defaultsInHours: Int!
  id: String!
  loan: MultiSourceLoan!
  loanId: String!
  notificationType: String!
  readOn: DateTime
  user: User!
}

type LoanDefaultedNotification implements Node & Notification {
  createdOn: DateTime!
  id: String!
  loan: MultiSourceLoan!
  loanId: String!
  notificationType: String!
  readOn: DateTime
  user: User!
}

type LoanExtended implements LoanActivity & Node {
  id: String!
  indexInBlock: Int!
  loan: Loan!
  loanId: String!
  multiSourceLoanHistory: MultiSourceLoanHistory
  timestamp: DateTime!
  txHash: Hash!
}

type LoanExtendedNotification implements Node & Notification {
  createdOn: DateTime!
  id: String!
  newHistory: MultiSourceLoanHistory!
  newHistoryId: String!
  notificationType: String!
  previousHistory: MultiSourceLoanHistory!
  previousHistoryId: String!
  readOn: DateTime
  user: User!
}

type LoanForeclosed implements LoanActivity & Node {
  id: String!
  indexInBlock: Int!
  loan: Loan!
  loanId: String!
  multiSourceLoanHistory: MultiSourceLoanHistory
  timestamp: DateTime!
  txHash: Hash!
}

type LoanInitiated implements LoanActivity & Node {
  id: String!
  indexInBlock: Int!
  loan: Loan!
  loanId: String!
  multiSourceLoanHistory: MultiSourceLoanHistory
  timestamp: DateTime!
  txHash: Hash!
}

type LoanPayment implements Node {
  accruedInterest: BigInt!
  activityId: String!
  destination: Address!
  id: String!
  pendingInterest: BigInt!
  principalAddress: Address!
  principalAmount: BigInt!
  protocolFee: BigInt!
  source: Address!
}

type LoanRefinanced implements LoanActivity & Node {
  addedNewTranche: Boolean!
  id: String!
  indexInBlock: Int!
  isRenegotiation: Boolean!
  loan: Loan!
  loanId: String!
  multiSourceLoanHistory: MultiSourceLoanHistory
  timestamp: DateTime!
  txHash: Hash!
}

type LoanRefinancedFromOffers implements LoanActivity & Node {
  id: String!
  indexInBlock: Int!
  loan: Loan!
  loanId: String!
  multiSourceLoanHistory: MultiSourceLoanHistory
  timestamp: DateTime!
  txHash: Hash!
}

type LoanRefinancedNotification implements Node & Notification {
  createdOn: DateTime!
  id: String!
  newHistory: MultiSourceLoanHistory!
  newHistoryId: String!
  notificationType: String!
  previousHistory: MultiSourceLoanHistory!
  previousHistoryId: String!
  readOn: DateTime
  user: User!
}

type LoanRepaid implements LoanActivity & Node {
  id: String!
  indexInBlock: Int!
  loan: Loan!
  loanId: String!
  multiSourceLoanHistory: MultiSourceLoanHistory
  timestamp: DateTime!
  totalInterest: BigInt!
  txHash: Hash!
}

type LoanRepaidNotification implements Node & Notification {
  createdOn: DateTime!
  id: String!
  loan: MultiSourceLoan!
  loanId: String!
  notificationType: String!
  readOn: DateTime
  user: User!
}

type LoanSentToAuction implements LoanActivity & Node {
  id: String!
  indexInBlock: Int!
  liquidatorAddress: String!
  loan: Loan!
  loanId: String!
  multiSourceLoanHistory: MultiSourceLoanHistory
  timestamp: DateTime!
  txHash: Hash!
}

enum LoanSortField {
  APR_BPS
  DURATION
  EFFECTIVE_APR_BPS
  EXPECTED_INTEREST
  EXPIRATION_DATE
  ORIGINATION_FEE
  PAID_INTEREST
  PRINCIPAL_AMOUNT
  RENEGOTIATION_REQUESTED
  START_TIME
  TOTAL_INTEREST
}

input LoanSortInput {
  field: LoanSortField!
  order: Ordering!
}

enum LoanStatusType {
  LOAN_AUCTIONED
  LOAN_DEFAULTED
  LOAN_FORECLOSED
  LOAN_INITIATED
  LOAN_REPAID
  LOAN_SENT_TO_AUCTION
}

type LoansData {
  maxAprBps: Float!
  maxPrincipalAmount: BigInt!
  maxRemainingTime: BigInt!
  minAprBps: Float!
  minPrincipalAmount: BigInt!
  minRemainingTime: BigInt!
}

type LostSource implements Node {
  accruedInterest: BigInt!
  activityId: String!
  aprBps: BigInt!
  duration: BigInt!
  id: String!
  lenderAddress: String!
  loan: MultiSourceLoan!
  originationFee: BigInt!
  principalAmount: BigInt!
  startTime: DateTime!
}

type LostSourceNotification implements Node & Notification {
  createdOn: DateTime!
  id: String!
  lostSource: LostSource!
  lostSourceId: String!
  notificationType: String!
  readOn: DateTime
  user: User!
}

enum MarketplaceEnum {
  GONDI
  NFTFI
}

type MultiSourceLoan implements Loan & Node {
  activities: [LoanActivity!]!
  address: Address!
  auction: Auction
  blendedAprBps: Float!
  borrowerAddress: Address!
  contractStartTime: DateTime!
  currency: Currency!
  duration: BigInt!
  id: String!
  indexInBlock: Int!
  loanId: Int!
  nft: NFT!

  """Deprecated field. Use offerIds to return loan offer ids instead."""
  offer: Offer! @deprecated(reason: "Use offerIds to return loan offer ids instead.")
  offerIds: [String!]!
  principalAddress: Address!
  principalAmount: BigInt!
  protocolFee: BigInt!
  renegotiationRequest: RenegotiationRequest
  repaidActivity: LoanRepaid
  sources: [Source!]!
  startTime: DateTime!
  status: String!
  timestamp: DateTime!
  topUpRequest: TopUpRequest
  totalOriginationFee: BigInt!
  txHash: Hash!
}

type MultiSourceLoanConnection {
  edges: [MultiSourceLoanEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type MultiSourceLoanEdge {
  cursor: String!
  node: MultiSourceLoan!
}

type MultiSourceLoanHistory implements Node {
  activity: LoanActivity!
  activityId: String!
  borrowerAddress: String!
  duration: BigInt!
  id: String!
  loanId: Int!
  offerIds: [String!]!
  principalAddress: String!
  principalAmount: BigInt!
  sources: [SourceHistory!]!
  startTime: DateTime!
}

type Mutation {
  addListingsOfNftsFromUser(desiredDuration: Int = null, desiredPrincipalAddress: Address = null, excludeCollections: [String!] = null, onlyCollections: [String!] = null): Void
  addOrUpdateListing(desiredDuration: Int = null, desiredPrincipalAddress: Address = null, nftId: Int!): Listing!
  addOrUpdateRenegotiationRequest(desiredAprBps: BigInt!, desiredDuration: BigInt!, desiredPrincipalAmount: BigInt!, loanId: String!): RenegotiationRequest!
  addOrUpdateTopUpRequest(desiredAprBps: BigInt!, desiredTopUp: BigInt!, loanId: String!): TopUpRequest!
  generateCollectionOfferToBeSigned(offerInput: CollectionOfferInput!): CollectionOffer!
  generateRenegotiationOfferToBeSigned(renegotiationInput: RenegotiationOfferInput!): Renegotiation!
  generateSingleNftOfferToBeSigned(offerInput: SingleNFTOfferInput!): SingleNFTOffer!
  hideAllOffers(contractAddress: Address!, minOfferId: String!): [Offer!]!
  hideOffer(contractAddress: Address!, offerId: String!): Offer!
  hideRenegotiation(contractAddress: Address = "0xca5a494ca20483e21ec1e41fe1d9461da77595bd", renegotiationId: String!): Renegotiation!
  hideSaleOffer(saleOfferId: String!): SingleNFTOrder!
  markNotificationIdsAsRead(ids: [Int!]): Void
  markNotificationsAsRead: Void
  removeListing(nftId: Int!): Listing!
  removeListingsOfNftsFromUser(excludeCollections: [String!] = null, onlyCollections: [String!] = null): Void
  removeRenegotiationRequest(loanId: String!): RenegotiationRequest!
  removeTopUpRequest(loanId: String!): TopUpRequest!
  saveRenegotiationSignedOffer(signedRenegotiationInput: SignedRenegotiationOfferInput!): Renegotiation!
  saveSignedCollectionOffer(signedOfferInput: CollectionSignedOfferInput!): CollectionOffer!
  saveSignedSaleOffer(signedOfferInput: SignedOrderInput!): SingleNFTOrder!
  saveSignedSingleNftOffer(signedOfferInput: SingleNFTSignedOfferInput!): SingleNFTOffer!
  setReferral(referrerId: Int!): Void
  showOffer(contractAddress: Address!, offerId: String!): Offer!
  showRenegotiation(contractAddress: Address = "0xca5a494ca20483e21ec1e41fe1d9461da77595bd", renegotiationId: String!): Renegotiation!
  showSaleOffer(saleOfferId: String!): SingleNFTOrder!
}

type NFT implements Node {
  activeLoan: Loan
  collection: Collection
  collectionId: Int
  createdDate: DateTime!
  description: String
  id: String!
  image: Asset
  isFlagged: Boolean
  listed: Listing
  marketPlaceOfPrice: String
  name: String
  nftId: String!
  owner: Address
  price: BigInt
  priceCurrencyAddress: String
  rarityRank: Int
  rarityScore: Float
  statistics: NftStatistics!
  tokenId: BigInt!
  traits: [Trait!]!
  url: String
  wrapsNfts: [NFT!]
}

type NFTConnection {
  edges: [NFTEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type NFTEdge {
  cursor: String!
  node: NFT!
}

type NewOfferNotification implements Node & Notification {
  createdOn: DateTime!
  id: String!
  notificationType: String!
  offer: Offer!
  offerId: String!
  readOn: DateTime
  user: User!
}

type NewRenegotiationOfferNotification implements Node & Notification {
  createdOn: DateTime!
  id: String!
  loan: MultiSourceLoan!
  loanId: String!
  notificationType: String!
  readOn: DateTime
  renegotiation: Renegotiation!
  renegotiationId: String!
  user: User!
}

enum NftSortField {
  COLLECTION
  NAME
  OFFERS_COUNT
  STATUS
}

input NftSortInput {
  field: NftSortField!
  order: Ordering!
  principalAddress: Address = null
}

type NftStatistics {
  bestOffer: CurrencyAmount
  floorPrice: CurrencyAmount
  floorPrice7d: Float
  floorPrice30d: Float
  lastSale: Sale
  loansTotalVolume(currencyAddress: Address!): BigInt!
  numberOfOffers(currencyAddress: Address!): Float!
  topTraitFloorPrice: CurrencyAmount
  totalVolume: Float
  totalVolume1d: Float
  totalVolume1m: Float
  totalVolume1w: Float
  totalVolume1y: Float
  totalVolume2m: Float
  totalVolume3m: Float
  totalVolume4m: Float
}

interface Node {
  id: String!
}

interface Notification implements Node {
  createdOn: DateTime!
  id: String!
  notificationType: String!
  readOn: DateTime
  user: User!
}

type NotificationConnection {
  edges: [NotificationEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type NotificationEdge {
  cursor: String!
  node: Notification!
}

enum NotificationType {
  AUCTION_WON_NOTIFICATION
  LOAN_DEFAULTED_NOTIFICATION
  LOAN_DEFAULT_REMINDER_NOTIFICATION
  LOAN_REPAID_NOTIFICATION
  LOST_SOURCE_NOTIFICATION
  NEW_OFFER_NOTIFICATION
  NEW_RENEGOTIATION_OFFER_NOTIFICATION
  OFFER_ACCEPTED_NOTIFICATION
  OUTBID_NOTIFICATION
  SET_NFT_NOTIFICATION
}

interface Offer implements Node {
  aprBps: BigInt!
  borrowerAddress: Address
  capacity: BigInt!
  consumedCapacity: BigInt!
  contractAddress: Address!
  createdDate: DateTime
  currency: Currency!
  duration: BigInt!
  expirationTime: BigInt!
  fee: BigInt!
  hidden: Boolean
  id: String!
  lenderAddress: Address
  maxPrincipal: BigInt!
  maxSeniorRepayment: BigInt!

  """Deprecated field: use maxSeniorRepayment instead."""
  maxTrancheFloor: BigInt! @deprecated(reason: "Use maxSeniorRepayment instead.")
  netPrincipal: BigInt!
  offerHash: Hash
  offerId: BigInt!
  principalAddress: Address!
  principalAmount: BigInt!
  repayment: BigInt!
  requiresLiquidation: Boolean
  signature: Signature
  signerAddress: Address
  status: String!
  validators: [OfferValidator!]!
}

type OfferAcceptedNotification implements Node & Notification {
  createdOn: DateTime!
  id: String!
  loan: MultiSourceLoan!
  loanId: String!
  notificationType: String!
  offer: Offer!
  offerId: String!
  readOn: DateTime
  user: User!
}

type OfferConnection {
  edges: [OfferEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type OfferEdge {
  cursor: String!
  node: Offer!
}

type OfferStatistics {
  consumedCapacity: BigInt!
}

enum OfferStatus {
  ACTIVE
  CANCELLED
  EXECUTED
  EXPIRED
  INACTIVE
  OUTPERFORMED
}

type OfferValidator implements Node {
  arguments: Hex!
  id: String!
  offerId: String!
  validator: Address!
}

input OfferValidatorInput {
  arguments: Hex!
  validator: Address!
}

enum OffersSortField {
  APR_BPS
  CREATED_DATE
  DAILY_INTEREST
  DURATION
  EFFECTIVE_APR_BPS
  EXPIRATION
  FEE
  MAX_PRINCIPAL
  NET_INTEREST
  NET_PRINCIPAL
  PRINCIPAL_AMOUNT
  REPAYMENT
  STATUS
  TOTAL_INTEREST
}

input OffersSortInput {
  durationOfInterest: Int = null
  field: OffersSortField!
  order: Ordering!
  principalOfInterest: BigInt = null
}

interface Order implements Activity & Node {
  createdDate: DateTime!
  currency: Currency!
  currencyAddress: Address!
  expiration: DateTime
  fees: BigInt!
  hidden: Boolean!
  id: String!
  isAsk: Boolean!
  maker: Address!
  marketPlace: String!
  netAmount: BigInt!
  nonce: BigInt!
  orderType: String!
  price: BigInt!
  signature: Hash!
  startTime: DateTime!
  status: String!
  timestamp: DateTime!
  txHash: Hash
}

type OrderConnection {
  edges: [OrderEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type OrderEdge {
  cursor: String!
  node: Order!
}

enum Ordering {
  ASC
  DESC
}

type OutbidNotification implements Node & Notification {
  auction: Auction!
  auctionId: String!
  createdOn: DateTime!
  id: String!
  loan: MultiSourceLoan!
  loanId: String!
  newBid: Bid!
  newBidId: Int!
  notificationType: String!
  readOn: DateTime
  user: User!
  userBid: Bid!
  userBidId: Int!
}

type OutstandingLoanStatistics {
  loansData(currencyAddress: Address): LoansData!
  outstandingLoanCount: Int!
  outstandingPrincipal(currencyAddress: Address!): BigInt!
  totalOutstandingPrincipal: BigInt!
}

type PageInfo {
  endCursor: String
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
}

type PointActivity implements Node {
  id: String!
  loanActivity: LoanActivity!
  points: BigInt!
  reason: String!
  timestamp: DateTime!
  userId: Int!
}

type PointActivityConnection {
  edges: [PointActivityEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type PointActivityEdge {
  cursor: String!
  node: PointActivity!
}

type Query {
  getCollectionBySlug(slug: String!): Collection
  getCollectionLoansData(collectionId: Int!, currencyAddress: Address): CollectionLoansData!
  getCollectionsByContractAddress(contractAddress: Address!): [Collection!]!
  getListingById(listingId: Int!): Listing
  getLoanById(address: String!, loanId: Int!): Loan
  getNftByContractAddressAndTokenId(contractAddress: Address!, tokenId: BigInt!): NFT
  getNftBySlugAndTokenId(slug: String!, tokenId: BigInt!): NFT
  getOutstandingLoanStatistics: OutstandingLoanStatistics!
  getPointsFromReferrals: Int!
  getReferredWallets: Int!
  getUserPointActivities(after: String, first: Int = 10): PointActivityConnection!
  getUserPoints: Int!
  listAuctions(after: String, currencyAddress: Address = null, first: Int = 10, sortBy: [AuctionSortInput!] = null, statuses: [AuctionStatus!] = null): AuctionConnection!
  listBestBidsForNft(currencyAddress: String!, nftId: Int!): [Order!]!
  listBids(after: String, auctionId: String = null, bidders: [String!] = null, currencyAddress: Address = null, first: Int = 10, onlyLatest: Boolean! = false, sortBy: [BidSortInput!] = null): BidConnection!
  listCollections(after: String, collections: [Int!] = null, excludeGondiUserVault: Boolean = false, first: Int = 10, searchTerm: String = null, sortBy: [CollectionSortInput!] = null, standards: [TokenStandardType!] = null, withListings: Boolean = false, withLoans: Boolean = false): CollectionConnection!
  listCollectionsWithListings(after: String, collections: [Int!] = null, first: Int! = 10, searchTerm: String = null): CollectionConnection!
  listCollectionsWithLoans(after: String, collections: [Int!] = null, first: Int! = 10, searchTerm: String = null): CollectionConnection!
  listListings(after: String, collectionIds: [Int!] = null, currencyAddress: Address = null, first: Int = 10, marketplaceNames: [MarketplaceEnum!] = null, searchTerm: String = null, userFilter: UserFilter = null, withLoans: Boolean = false): ListingConnection!
  listLoanActivities(after: String, first: Int! = 10, loanId: String = null, sortBy: [LoanActivitySortInput!] = null, types: [LoanActivityType!] = null): LoanActivityConnection!
  listLoans(after: String, borrowers: [String!] = null, collections: [Int!] = null, contractAddresses: [Address!] = null, currencyAddress: Address = null, excludeOwn: Boolean = null, first: Int! = 10, hideLocked: Boolean = null, nfts: [Int!] = null, orderByStatuses: Boolean = true, sortBy: [LoanSortInput!] = null, statuses: [LoanStatusType!] = null, terms: TermsFilter = null, withRenegRequestOnly: Boolean! = false, withTopUpRequestOnly: Boolean! = false): MultiSourceLoanConnection!
  listNftDelegations(after: String, contractAddress: Address = null, first: Int! = 20, nftId: Int!): DelegationConnection!
  listNftOffersAndRenegotiations(
    after: String
    collections: [Int!] = null
    currencyAddress: Address = null
    first: Int = null
    hidden: Boolean = null

    """Renegotiation only filter."""
    isAddNewTranche: Boolean = null
    lenders: [String!] = null

    """Renegotiation only filter."""
    loanId: String = null

    """Offer only filter."""
    nfts: [Int!] = null
    onlyCollectionOffers: Boolean! = false
    onlyInvalid: Boolean! = false
    onlySingleNftOffers: Boolean! = true
    sortBy: OffersSortInput = null
    statuses: [OfferStatus!] = null
    terms: TermsFilter = null
  ): SingleNFTOfferCollectionOfferRenegotiationConnection!
  listNftsFromCollections(after: String, collections: [Int!]!, first: Int = 10, onlyListed: Boolean = null, searchTerm: String = null, traitRanges: [TraitRangeOptionsInput!] = null, traits: [TraitKeyValueOptionsInput!] = null): NFTConnection!
  listNftsFromUser(after: String, collectionAddresses: [Address!] = null, first: Int = 10, searchTerm: String = null, sortBy: [NftSortInput!] = null, standards: [TokenStandardType!] = null, withLoans: Boolean = false, withNoWraps: Boolean = false): NFTConnection!
  listNotifications(after: String, first: Int = 50, notificationTypes: [NotificationType!] = null, onlyRead: Boolean! = false, onlyUnread: Boolean! = false): NotificationConnection!
  listOffers(after: String, borrowerAddress: String = null, collections: [Int!] = null, contractAddress: Address = null, currencyAddress: Address = null, first: Int = 10, hidden: Boolean = null, lenders: [String!] = null, nfts: [Int!] = null, onlyCollectionOffers: Boolean = false, onlySingleNftOffers: Boolean = false, sortBy: [OffersSortInput!] = null, statuses: [OfferStatus!] = null, terms: TermsFilter = null, worseOffers: Boolean = true): OfferConnection!
  listRenegotiations(after: String, collections: [Int!] = null, first: Int = 10, hidden: Boolean = null, isAddNewTranche: Boolean = null, loanId: String = null, sortBy: [OffersSortInput!] = null, statuses: [OfferStatus!] = null, terms: RefinanceTermsFilter = null): RenegotiationConnection!
  listSaleOffers(after: String, bidder: [String!] = null, first: Int = 10): OrderConnection!
  listSources(
    after: String
    collections: [Int!] = null
    contractAddresses: [Address!] = null
    currencyAddress: Address = null

    """Only considered if include_lost is False | None."""
    excludeOwn: Boolean = null
    first: Int! = 10
    hideLocked: Boolean = null
    includeLost: Boolean = null
    lenders: [String!] = null
    loanPrincipal: Interval = null
    sortBy: [SourceSortInput!] = null
    statuses: [LoanStatusType!] = null
    terms: TermsFilter = null
  ): SourceLostSourceConnection!
  listUserSaleOffers(after: String, first: Int = 10): OrderConnection!
  me: User
}

input RangeInput {
  max: Int!
  min: Int!
}

input RefinanceTermsFilter {
  aprBps: Interval = null
  duration: Interval = null
  fee: Interval = null
  maxPrincipal: Interval = null
  netPrincipal: Interval = null
  principal: Interval = null
  remainingTime: Interval = null
}

type Renegotiation implements Node {
  aprBps: BigInt!
  createdDate: DateTime
  duration: BigInt!
  expirationTime: BigInt!
  feeAmount: BigInt!
  hidden: Boolean
  id: String!
  isAddNewTranche: Boolean!
  lenderAddress: Address
  loan: Loan!
  loanAddress: Address!
  loanId: BigInt!
  loanReferenceId: String!
  nft: NFT!
  offerHash: Hash
  principalAmount: BigInt!
  renegotiationId: BigInt!
  repayment: BigInt!
  requiresLiquidation: Boolean!
  signature: Signature
  signerAddress: Address
  status: String!
  strictImprovement: Boolean!
}

type RenegotiationConnection {
  edges: [RenegotiationEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type RenegotiationEdge {
  cursor: String!
  node: Renegotiation!
}

input RenegotiationOfferInput {
  aprBps: BigInt!
  duration: BigInt!
  expirationTime: BigInt!
  feeAmount: BigInt!
  isAddNewTranche: Boolean = null
  lenderAddress: Address!
  loanId: String!
  principalAmount: BigInt!
  requiresLiquidation: Boolean = null
  signerAddress: Address = null
  strictImprovement: Boolean = null
  targetPrincipal: [BigInt!] = null
  trancheIndex: [BigInt!] = null
}

type RenegotiationRequest implements Node {
  desiredAprBps: BigInt!
  desiredDuration: BigInt!
  desiredPrincipalAmount: BigInt!
  id: String!
  loanId: String!
}

type RenegotiationRequestedNotification implements Node & Notification {
  aprBps: BigInt!
  createdOn: DateTime!
  duration: BigInt!
  id: String!
  loan: MultiSourceLoan!
  loanId: String!
  notificationType: String!
  principalAmount: BigInt!
  readOn: DateTime
  user: User!
}

type Sale implements Activity & Node {
  id: String!
  nft: NFT!
  order: Order!
  orderId: String!
  taker: String!
  timestamp: DateTime!
  txHash: Hash
}

input SaleOfferInput {
  endAmount: BigInt!
  identifierOrCriteria: BigInt!
  itemType: Int!
  startAmount: BigInt!
  token: Address!
}

scalar Signature

input SignedOrderInput {
  conduitKey: Hash!
  consideration: [ConsiderationInput!]!
  counter: BigInt!
  endTime: BigInt!
  offer: [SaleOfferInput!]!
  offerer: Address!
  orderType: Int!
  salt: BigInt!
  signature: Signature!
  startTime: BigInt!
  zone: Address!
  zoneHash: Hash!
}

input SignedRenegotiationOfferInput {
  aprBps: BigInt!
  duration: BigInt!
  expirationTime: BigInt!
  feeAmount: BigInt!
  isAddNewTranche: Boolean = null
  lenderAddress: Address!
  loanId: String!
  offerHash: Hash!
  principalAmount: BigInt!
  renegotiationId: BigInt!
  requiresLiquidation: Boolean = null
  signature: Signature!
  signerAddress: Address = null
  strictImprovement: Boolean = null
  targetPrincipal: [BigInt!] = null
  trancheIndex: [BigInt!] = null
}

type SingleNFTOffer implements Node & Offer {
  aprBps: BigInt!
  borrowerAddress: Address
  capacity: BigInt!
  consumedCapacity: BigInt!
  contractAddress: Address!
  createdDate: DateTime
  currency: Currency!
  duration: BigInt!
  expirationTime: BigInt!
  fee: BigInt!
  hidden: Boolean
  id: String!
  lenderAddress: Address
  maxPrincipal: BigInt!
  maxSeniorRepayment: BigInt!

  """Deprecated field: use maxSeniorRepayment instead."""
  maxTrancheFloor: BigInt! @deprecated(reason: "Use maxSeniorRepayment instead.")
  netPrincipal: BigInt!
  nft: NFT!
  offerHash: Hash
  offerId: BigInt!
  principalAddress: Address!
  principalAmount: BigInt!
  repayment: BigInt!
  requiresLiquidation: Boolean
  signature: Signature
  signerAddress: Address
  statistics: OfferStatistics!
  status: String!
  validators: [OfferValidator!]!
}

union SingleNFTOfferCollectionOfferRenegotiation = CollectionOffer | Renegotiation | SingleNFTOffer

type SingleNFTOfferCollectionOfferRenegotiationConnection {
  edges: [SingleNFTOfferCollectionOfferRenegotiationEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type SingleNFTOfferCollectionOfferRenegotiationEdge {
  cursor: String!
  node: SingleNFTOfferCollectionOfferRenegotiation!
}

input SingleNFTOfferInput {
  aprBps: BigInt!
  borrowerAddress: Address!
  capacity: BigInt!
  contractAddress: Address!
  duration: BigInt!
  expirationTime: BigInt!
  fee: BigInt!
  lenderAddress: Address!
  maxSeniorRepayment: BigInt = null
  maxTrancheFloor: BigInt = null
  nftId: Int!
  offerValidators: [OfferValidatorInput!]!
  principalAddress: Address!
  principalAmount: BigInt!
  requiresLiquidation: Boolean = null
  signerAddress: Address = null
}

type SingleNFTOrder implements Activity & Node & Order {
  createdDate: DateTime!
  currency: Currency!
  currencyAddress: Address!
  expiration: DateTime
  fees: BigInt!
  hidden: Boolean!
  id: String!
  isAsk: Boolean!
  maker: Address!
  marketPlace: String!
  netAmount: BigInt!
  nft: NFT!
  nonce: BigInt!
  orderType: String!
  price: BigInt!
  signature: Hash!
  startTime: DateTime!
  status: String!
  timestamp: DateTime!
  txHash: Hash
}

input SingleNFTSignedOfferInput {
  aprBps: BigInt!
  borrowerAddress: Address!
  capacity: BigInt!
  contractAddress: Address!
  duration: BigInt!
  expirationTime: BigInt!
  fee: BigInt!
  lenderAddress: Address!
  maxSeniorRepayment: BigInt = null
  maxTrancheFloor: BigInt = null
  nftId: Int!
  offerHash: Hash!
  offerId: BigInt!
  offerValidators: [OfferValidatorInput!]!
  principalAddress: Address!
  principalAmount: BigInt!
  requiresLiquidation: Boolean = null
  signature: Signature!
  signerAddress: Address = null
}

type Source implements Node {
  accruedInterest: BigInt!
  aprBps: BigInt!
  id: String!
  lenderAddress: String!
  loan: MultiSourceLoan!
  loanId: String!
  loanIndex: Int
  loanReferenceId: String!
  originationFee: BigInt!
  principalAmount: BigInt!
  refinanceNetAprBps: BigInt!
  seniorPrincipalAmount: BigInt
  startTime: DateTime!
}

type SourceHistory implements Node {
  accruedInterest: BigInt!
  aprBps: BigInt!
  id: String!
  lenderAddress: String!
  loanId: String!
  loanIndex: Int
  originationFee: BigInt!
  principalAmount: BigInt!
  seniorPrincipalAmount: BigInt
  startTime: DateTime!
}

union SourceLostSource = LostSource | Source

type SourceLostSourceConnection {
  edges: [SourceLostSourceEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type SourceLostSourceEdge {
  cursor: String!
  node: SourceLostSource!
}

enum SourceSortField {
  ACCRUED_INTEREST
  APR_BPS
  DUE_DATE
  DURATION
  EARNED_INTEREST
  ORIGINATION_FEE
  PRINCIPAL_AMOUNT
  REFINANCE_NET_APR_BPS
  START_TIME
}

input SourceSortInput {
  field: SourceSortField!
  order: Ordering!
}

type StatByCollection {
  collection: Collection!
  value: BigInt!
}

input TermsFilter {
  aprBps: Interval = null
  duration: Interval = null
  fee: Interval = null
  maxPrincipal: Interval = null
  netPrincipal: Interval = null
  principal: Interval = null
  remainingTime: Interval = null
}

enum TokenStandardType {
  ERC721
  ERC1155
  OLD_ERC721
}

type TopUpRequest implements Node {
  desiredAprBps: BigInt!
  desiredTopUp: BigInt!
  id: String!
  loanId: String!
}

type TopUpRequestedNotification implements Node & Notification {
  aprBps: BigInt!
  createdOn: DateTime!
  id: String!
  loan: MultiSourceLoan!
  loanId: String!
  notificationType: String!
  readOn: DateTime
  topUp: BigInt!
  user: User!
}

type Trait {
  collectionId: String!
  statistics: CollectionStatistics!
  type: String!
  value: String!
}

input TraitKeyValueOptionsInput {
  key: String!
  values: [String!]!
}

input TraitRangeOptionsInput {
  key: String!
  range: RangeInput!
}

type UnderfundedOfferNotification implements Node & Notification {
  createdOn: DateTime!
  id: String!
  notificationType: String!
  offer: Offer!
  offerId: String!
  readOn: DateTime
  user: User!
}

type User implements Node {
  about: String
  beta: Boolean!
  blockchain: String!
  createdDate: DateTime!
  id: String!
  linkedWallets: [LinkedWallets!]!
  mail: String
  mailValidationDate: DateTime
  originalProfilePicture: String
  profilePictureId: Int
  size64ProfilePicture: String
  size128ProfilePicture: String
  size256ProfilePicture: String
  size512ProfilePicture: String
  statistics: UserStatistics!
  twitterHandle: String
  updatedAt: DateTime
  usedProduct: Boolean!
  username: String
  walletAddress: Address!
}

input UserFilter {
  onlyOrExclude: Boolean!
  userId: Int!
}

type UserStatistics {
  defaultedPrincipal(currencyAddress: Address!, walletsAddresses: [Address!]!): BigInt!
  interestEarnedByCollection(currencyAddress: Address!, walletsAddresses: [Address!]!): [StatByCollection!]!
  loanCount(currencyAddress: Address!, walletsAddresses: [Address!]!): BigInt!
  loanCountByCollection(currencyAddress: Address!, walletsAddresses: [Address!]!): [StatByCollection!]!
  loanPrincipalByCollection(currencyAddress: Address!, walletsAddresses: [Address!]!): [StatByCollection!]!
  originationCountAndPrincipalByMonth(currencyAddress: Address!, walletsAddresses: [Address!]!): [[BigInt!]!]!
  outstandingPrincipal(currencyAddress: Address!, walletsAddresses: [Address!]!): BigInt!
  renegotiationCountAndPrincipalByMonth(currencyAddress: Address!, walletsAddresses: [Address!]!): [[BigInt!]!]!
  totalLentPrincipal(currencyAddress: Address!, walletsAddresses: [Address!]!): BigInt!
  wavgActualAprByCollection(currencyAddress: Address!, walletsAddresses: [Address!]!): [StatByCollection!]!
  wavgExpectedAprByCollection(currencyAddress: Address!, walletsAddresses: [Address!]!): [StatByCollection!]!
  wavgOutstandingApr(currencyAddress: Address!, walletsAddresses: [Address!]!): BigInt!
  wavgRepaidApr(currencyAddress: Address!, walletsAddresses: [Address!]!): BigInt!
}

"""Represents NULL values"""
scalar Void`;var St=y(()=>`${oe()}/lending/graphql`,"apiUrl"),xt=At(Re);Object.assign(BigInt.prototype,{toJSON(){return this.toString()}});var Mt={datetime:{serialize:p=>p instanceof Date?p.toISOString():null,parseValue:p=>typeof p=="string"?new Date(p):p instanceof Date?p:null},BigInt:{serialize:p=>typeof p=="bigint"?String(p):null,parseValue:p=>typeof p=="string"?BigInt(p):null},DateTime:{serialize:p=>p instanceof Date?p.toISOString():null,parseValue:p=>typeof p=="string"?new Date(p):p instanceof Date?p:null}},vt=y(p=>It(async e=>await p.authorizeRequest(e)),"authLink"),Ot=Pe.from([Ft({schema:xt,typesMap:Mt}),gt({uri:({operationName:p})=>`${St()}?operation=${encodeURIComponent(p)}`})]),Be=y(p=>{let e=new K({wallet:p});return new Tt({link:Pe.from([vt(e),Ot]),defaultOptions:{query:{errorPolicy:"all",fetchPolicy:"no-cache"},mutate:{errorPolicy:"all",fetchPolicy:"no-cache"},watchQuery:{fetchPolicy:"no-cache",nextFetchPolicy:"no-cache",errorPolicy:"ignore"}},cache:new bt({})})},"apolloClient");import T from"graphql-tag";var Ee=(r=>(r.LoanAuctioned="LOAN_AUCTIONED",r.LoanDefaulted="LOAN_DEFAULTED",r.LoanForeclosed="LOAN_FORECLOSED",r.LoanInitiated="LOAN_INITIATED",r.LoanRepaid="LOAN_REPAID",r.LoanSentToAuction="LOAN_SENT_TO_AUCTION",r))(Ee||{}),fe=(t=>(t.Gondi="GONDI",t.Nftfi="NFTFI",t))(fe||{});var ke=(r=>(r.Active="ACTIVE",r.Cancelled="CANCELLED",r.Executed="EXECUTED",r.Expired="EXPIRED",r.Inactive="INACTIVE",r.Outperformed="OUTPERFORMED",r))(ke||{}),Te=(f=>(f.AprBps="APR_BPS",f.CreatedDate="CREATED_DATE",f.DailyInterest="DAILY_INTEREST",f.Duration="DURATION",f.EffectiveAprBps="EFFECTIVE_APR_BPS",f.Expiration="EXPIRATION",f.Fee="FEE",f.MaxPrincipal="MAX_PRINCIPAL",f.NetInterest="NET_INTEREST",f.NetPrincipal="NET_PRINCIPAL",f.PrincipalAmount="PRINCIPAL_AMOUNT",f.Repayment="REPAYMENT",f.Status="STATUS",f.TotalInterest="TOTAL_INTEREST",f))(Te||{}),ge=(t=>(t.Asc="ASC",t.Desc="DESC",t))(ge||{});var Ne=T`
    fragment CurrencyInfo on Currency {
  address
  decimals
}
    `,De=T`
    fragment CurrencyAmountInfo on CurrencyAmount {
  amount
  currency {
    ...CurrencyInfo
  }
}
    ${Ne}`,Zn=T`
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
    `,wt=T`
    mutation listNft($nftId: Int!) {
  addOrUpdateListing(nftId: $nftId) {
    id
  }
}
    `,ht=T`
    mutation unlistNft($nftId: Int!) {
  removeListing(nftId: $nftId) {
    id
  }
}
    `,Ct=T`
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
    `,Lt=T`
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
    `,_t=T`
    mutation hideOffer($contract: Address!, $id: String!) {
  hideOffer(contractAddress: $contract, offerId: $id) {
    id
  }
}
    `,Rt=T`
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
    `,Pt=T`
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
    `,Bt=T`
    mutation unhideOffer($contract: Address!, $id: String!) {
  showOffer(contractAddress: $contract, offerId: $id) {
    id
  }
}
    `,Et=T`
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
    `,kt=T`
    mutation hideRenegotiationOffer($id: String!, $contractAddress: Address!) {
  hideRenegotiation(renegotiationId: $id, contractAddress: $contractAddress) {
    id
  }
}
    `,Nt=T`
    mutation saveRenegotiationOffer($offer: SignedRenegotiationOfferInput!) {
  offer: saveRenegotiationSignedOffer(signedRenegotiationInput: $offer) {
    id
    status
  }
}
    `,Dt=T`
    mutation unhideRenegotiationOffer($id: String!, $contractAddress: Address!) {
  showRenegotiation(renegotiationId: $id, contractAddress: $contractAddress) {
    id
  }
}
    `,Vt=T`
    mutation hideSaleOffer($id: String!) {
  hideSaleOffer(saleOfferId: $id) {
    id
  }
}
    `,Ht=T`
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
    `,Ut=T`
    mutation saveSignedSaleOffer($offer: SignedOrderInput!) {
  offer: saveSignedSaleOffer(signedOfferInput: $offer) {
    id
    status
  }
}
    `,qt=T`
    mutation unhideSaleOffer($id: String!) {
  showSaleOffer(saleOfferId: $id) {
    id
  }
}
    `,Kt=T`
    query collections($currency: Address!, $after: String) {
  collections: listCollections(after: $after) {
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
    ${De}`,Wt=T`
    query collectionsIdByContractAddress($contractAddress: Address!) {
  collections: getCollectionsByContractAddress(contractAddress: $contractAddress) {
    id
  }
}
    `,$t=T`
    query collectionIdBySlug($slug: String!) {
  collection: getCollectionBySlug(slug: $slug) {
    id
  }
}
    `,Qt=T`
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
    `,zt=T`
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
    `,Gt=T`
    query nftIdByContractAddressAndTokenId($contractAddress: Address!, $tokenId: BigInt!) {
  nft: getNftByContractAddressAndTokenId(
    contractAddress: $contractAddress
    tokenId: $tokenId
  ) {
    id
  }
}
    `,Zt=T`
    query nftIdBySlugTokenId($slug: String!, $tokenId: BigInt!) {
  nft: getNftBySlugAndTokenId(slug: $slug, tokenId: $tokenId) {
    id
  }
}
    `,Xt=T`
    query ownedNfts($after: String) {
  ownedNfts: listNftsFromUser(after: $after) {
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      node {
        id
        collection {
          id
        }
        tokenId
        price
        priceCurrencyAddress
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
    ${Ne}
${De}`,jt=T`
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
    `;function Ve(p){return{listNft(e,t){return p(wt,e,t)},unlistNft(e,t){return p(ht,e,t)},generateCollectionOfferHash(e,t){return p(Ct,e,t)},saveCollectionOffer(e,t){return p(Lt,e,t)},hideOffer(e,t){return p(_t,e,t)},generateSingleNftOfferHash(e,t){return p(Rt,e,t)},saveSingleNftOffer(e,t){return p(Pt,e,t)},unhideOffer(e,t){return p(Bt,e,t)},generateRenegotiationOfferHash(e,t){return p(Et,e,t)},hideRenegotiationOffer(e,t){return p(kt,e,t)},saveRenegotiationOffer(e,t){return p(Nt,e,t)},unhideRenegotiationOffer(e,t){return p(Dt,e,t)},hideSaleOffer(e,t){return p(Vt,e,t)},listBestBidsForNft(e,t){return p(Ht,e,t)},saveSignedSaleOffer(e,t){return p(Ut,e,t)},unhideSaleOffer(e,t){return p(qt,e,t)},collections(e,t){return p(Kt,e,t)},collectionsIdByContractAddress(e,t){return p(Wt,e,t)},collectionIdBySlug(e,t){return p($t,e,t)},listListings(e,t){return p(Qt,e,t)},listLoans(e,t){return p(zt,e,t)},nftIdByContractAddressAndTokenId(e,t){return p(Gt,e,t)},nftIdBySlugTokenId(e,t){return p(Zt,e,t)},ownedNfts(e,t){return p(Xt,e,t)},listOffers(e,t){return p(jt,e,t)}}}y(Ve,"getSdk");var Yt=["mutation","query","subscription"];function He(p){return Ve(y(async(t,n,a)=>{if(a={...a,context:{...a?.context,clientName:"lending"}},t.definitions.filter(r=>r.kind==="OperationDefinition"&&Yt.includes(r.operation)).length!==1)throw new Error("DocumentNode passed to Apollo Client must contain single query or mutation");let i=t.definitions[0];if(i.kind!=="OperationDefinition")throw new Error("DocumentNode passed to Apollo Client must contain single query or mutation");switch(i.operation){case"mutation":{let r=await p.mutate({mutation:t,variables:n,...a,fetchPolicy:"no-cache"});if(r.errors)throw new Error(JSON.stringify(r.errors));if(r.data===void 0||r.data===null)throw new Error("No data presented in the GraphQL response");return r.data}case"query":{let r=await p.query({query:t,variables:n,...a});if(r.errors)throw new Error(JSON.stringify(r.errors));if(r.data===void 0||r.data===null)throw new Error("No data presented in the GraphQL response");return r.data}case"subscription":throw new Error("Subscription requests through SDK interface are not supported");default:throw new Error("Operation not supported")}},"requester"))}y(He,"getSdkApollo");import{decodeEventLog as Jt,encodeEventTopics as en,zeroAddress as tn}from"viem";var v=tn,F=`0x${"0".repeat(64)}`,Ue="0x0",k=5n*60n;function d(p,e){return p.logs.filter(t=>en(e)[0]==t.topics[0]).map(t=>({...Jt({abi:e.abi,data:t.data,topics:t.topics,eventName:e.eventName}),topics:t.topics})).filter(t=>t.eventName==e.eventName)}y(d,"filterLogs");var W=y(p=>p!=null,"isDefined");var be=y(({endCursor:p,hasNextPage:e})=>e?{hasNextPage:e,cursor:p}:{hasNextPage:e,cursor:null},"mapPageInfo"),oe=y(()=>process.env.GONDI_URL??"https://api.gondi.xyz","apiDomain"),$=class{api;generateSingleNftOfferHash;generateCollectionOfferHash;generateRenegotiationOfferHash;nftIdBySlugTokenId;nftIdByContractAddressAndTokenId;collections;collectionIdBySlug;collectionsIdByContractAddress;listNft;unlistNft;ownedNfts;hideOffer;hideRenegotiationOffer;unhideOffer;unhideRenegotiationOffer;saveSignedSaleOffer;hideSaleOffer;unhideSaleOffer;listBestBidsForNft;constructor({apiClient:e,wallet:t}){let n=e??Be(t);this.api=He(n),this.generateSingleNftOfferHash=this.api.generateSingleNftOfferHash,this.generateCollectionOfferHash=this.api.generateCollectionOfferHash,this.generateRenegotiationOfferHash=this.api.generateRenegotiationOfferHash,this.nftIdBySlugTokenId=this.api.nftIdBySlugTokenId,this.nftIdByContractAddressAndTokenId=this.api.nftIdByContractAddressAndTokenId,this.collectionIdBySlug=this.api.collectionIdBySlug,this.collectionsIdByContractAddress=this.api.collectionsIdByContractAddress,this.collections=this.api.collections,this.listNft=this.api.listNft,this.unlistNft=this.api.unlistNft,this.ownedNfts=this.api.ownedNfts,this.saveSignedSaleOffer=this.api.saveSignedSaleOffer,this.hideOffer=this.api.hideOffer,this.hideRenegotiationOffer=this.api.hideRenegotiationOffer,this.unhideOffer=this.api.unhideOffer,this.unhideRenegotiationOffer=this.api.unhideRenegotiationOffer,this.hideSaleOffer=this.api.hideSaleOffer,this.unhideSaleOffer=this.api.unhideSaleOffer,this.listBestBidsForNft=this.api.listBestBidsForNft}async saveSingleNftOffer(e){let t={...e,borrowerAddress:e.borrowerAddress||v},n=await this.api.saveSingleNftOffer({offer:t}),a=n.offer.nft.collection?.contractData?.contractAddress||v;return{id:n.offer.id,nftCollateralAddress:a,nftCollateralTokenId:n.offer.nft.tokenId,...e}}async saveCollectionOffer(e){let t={...e,borrowerAddress:e.borrowerAddress||v},n=await this.api.saveCollectionOffer({offer:t}),a=n.offer.collection?.contractData?.contractAddress||v;return{id:n.offer.id,nftCollateralAddress:a,nftCollateralTokenId:0n,...e}}async saveRefinanceOffer(e){return{id:(await this.api.saveRenegotiationOffer({offer:e})).offer.id,...e}}async listOffers(e){let{result:{edges:t,pageInfo:n}}=await this.api.listOffers(e),a=t.map(i=>{let{__typename:r,...s}=i.node,o="collection"in s?s.collection.contractData?.contractAddress:s.nft.collection?.contractData?.contractAddress,l="collection"in s?0n:s.nft.tokenId;if(W(o))return{...s,type:r,lender:s.lenderAddress,borrower:s.borrowerAddress,signer:s.signerAddress,offerValidators:s.validators,nftCollateralAddress:o,nftCollateralTokenId:l}}).filter(W);return{...be(n),offers:a}}async listLoans(e){let{loans:{edges:t,pageInfo:n}}=await this.api.listLoans(e),a=t.map(i=>{let{__typename:r,...s}=i.node;return{...s,type:r,contractAddress:s.address,nftCollateralTokenId:s.nft.tokenId,nftCollateralAddress:s.nft.collection?.contractData?.contractAddress,borrower:s.borrowerAddress,startTime:BigInt(Math.floor(s.startTime.getTime()/1e3)),source:s.sources.map(o=>({...o,lender:nn(o.lenderAddress),loanId:BigInt(o.loanId),startTime:BigInt(Math.floor(o.startTime.getTime()/1e3))}))}});return{...be(n),loans:a}}async listListings(e){let{result:{edges:t,pageInfo:n}}=await this.api.listListings(e),a=t.map(i=>i.node);return{...be(n),listings:a}}};y($,"Api");import{getContract as Se}from"viem";var qe=[{constant:!1,inputs:[{name:"_uri",type:"string"},{name:"_editions",type:"uint256"},{name:"_salePrice",type:"uint256"}],name:"addNewTokenWithEditions",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"_tokenId",type:"uint256"},{name:"_salePrice",type:"uint256"}],name:"setSalePrice",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"name",outputs:[{name:"_name",type:"string"}],payable:!1,stateMutability:"pure",type:"function"},{constant:!1,inputs:[{name:"_to",type:"address"},{name:"_tokenId",type:"uint256"}],name:"approve",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"totalSupply",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"_tokenId",type:"uint256"}],name:"currentBidDetailsOfToken",outputs:[{name:"",type:"uint256"},{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"_tokenId",type:"uint256"}],name:"approvedFor",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_tokenId",type:"uint256"}],name:"acceptBid",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"_creator",type:"address"}],name:"isWhitelisted",outputs:[{name:"",type:"bool"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_tokenId",type:"uint256"}],name:"bid",outputs:[],payable:!0,stateMutability:"payable",type:"function"},{constant:!0,inputs:[{name:"_owner",type:"address"}],name:"tokensOf",outputs:[{name:"",type:"uint256[]"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_percentage",type:"uint256"}],name:"setMaintainerPercentage",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"_creator",type:"address"}],name:"whitelistCreator",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"_tokenId",type:"uint256"}],name:"ownerOf",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"_uri",type:"string"}],name:"originalTokenOfUri",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"_owner",type:"address"}],name:"balanceOf",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"owner",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"symbol",outputs:[{name:"_symbol",type:"string"}],payable:!1,stateMutability:"pure",type:"function"},{constant:!1,inputs:[{name:"_tokenId",type:"uint256"}],name:"cancelBid",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"_tokenId",type:"uint256"}],name:"salePriceOfToken",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_to",type:"address"},{name:"_tokenId",type:"uint256"}],name:"transfer",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"_tokenId",type:"uint256"}],name:"takeOwnership",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!1,inputs:[{name:"_percentage",type:"uint256"}],name:"setCreatorPercentage",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[{name:"_tokenId",type:"uint256"}],name:"tokenURI",outputs:[{name:"",type:"string"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[{name:"_tokenId",type:"uint256"}],name:"creatorOfToken",outputs:[{name:"",type:"address"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"_tokenId",type:"uint256"}],name:"buy",outputs:[],payable:!0,stateMutability:"payable",type:"function"},{constant:!1,inputs:[{name:"_uri",type:"string"}],name:"addNewToken",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{constant:!0,inputs:[],name:"creatorPercentage",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!0,inputs:[],name:"maintainerPercentage",outputs:[{name:"",type:"uint256"}],payable:!1,stateMutability:"view",type:"function"},{constant:!1,inputs:[{name:"newOwner",type:"address"}],name:"transferOwnership",outputs:[],payable:!1,stateMutability:"nonpayable",type:"function"},{anonymous:!1,inputs:[{indexed:!0,name:"_creator",type:"address"}],name:"WhitelistCreator",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"_bidder",type:"address"},{indexed:!0,name:"_amount",type:"uint256"},{indexed:!0,name:"_tokenId",type:"uint256"}],name:"Bid",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"_bidder",type:"address"},{indexed:!0,name:"_seller",type:"address"},{indexed:!1,name:"_amount",type:"uint256"},{indexed:!0,name:"_tokenId",type:"uint256"}],name:"AcceptBid",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"_bidder",type:"address"},{indexed:!0,name:"_amount",type:"uint256"},{indexed:!0,name:"_tokenId",type:"uint256"}],name:"CancelBid",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"_buyer",type:"address"},{indexed:!0,name:"_seller",type:"address"},{indexed:!1,name:"_amount",type:"uint256"},{indexed:!0,name:"_tokenId",type:"uint256"}],name:"Sold",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"_tokenId",type:"uint256"},{indexed:!0,name:"_price",type:"uint256"}],name:"SalePriceSet",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"previousOwner",type:"address"},{indexed:!0,name:"newOwner",type:"address"}],name:"OwnershipTransferred",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"_from",type:"address"},{indexed:!0,name:"_to",type:"address"},{indexed:!1,name:"_tokenId",type:"uint256"}],name:"Transfer",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"_owner",type:"address"},{indexed:!0,name:"_approved",type:"address"},{indexed:!1,name:"_tokenId",type:"uint256"}],name:"Approval",type:"event"}];var Ke=[{stateMutability:"nonpayable",type:"constructor",inputs:[{name:"liquidationDistributor",internalType:"address",type:"address"},{name:"currencyManager",internalType:"address",type:"address"},{name:"collectionManager",internalType:"address",type:"address"},{name:"triggerFee",internalType:"uint256",type:"uint256"}]},{type:"error",inputs:[],name:"AddressZeroError"},{type:"error",inputs:[],name:"AuctionAlreadyInProgressError"},{type:"error",inputs:[{name:"_expiration",internalType:"uint96",type:"uint96"}],name:"AuctionNotOverError"},{type:"error",inputs:[{name:"_expiration",internalType:"uint96",type:"uint96"}],name:"AuctionOverError"},{type:"error",inputs:[],name:"CollectionNotWhitelistedError"},{type:"error",inputs:[],name:"CouldNotModifyValidLoansError"},{type:"error",inputs:[],name:"CurrencyNotWhitelistedError"},{type:"error",inputs:[],name:"InvalidHashAuctionError"},{type:"error",inputs:[{name:"triggerFee",internalType:"uint256",type:"uint256"}],name:"InvalidTriggerFee"},{type:"error",inputs:[{name:"_loan",internalType:"address",type:"address"}],name:"LoanNotAcceptedError"},{type:"error",inputs:[{name:"_minBid",internalType:"uint256",type:"uint256"}],name:"MinBidError"},{type:"error",inputs:[{name:"_owner",internalType:"address",type:"address"}],name:"NFTNotOwnedError"},{type:"error",inputs:[],name:"NoBidsError"},{type:"error",inputs:[],name:"ZeroAddressError"},{type:"event",anonymous:!1,inputs:[{name:"loanContract",internalType:"address",type:"address",indexed:!1},{name:"loanId",internalType:"uint256",type:"uint256",indexed:!1},{name:"auctionContract",internalType:"address",type:"address",indexed:!1},{name:"tokenId",internalType:"uint256",type:"uint256",indexed:!1},{name:"asset",internalType:"address",type:"address",indexed:!1},{name:"proceeds",internalType:"uint256",type:"uint256",indexed:!1},{name:"settler",internalType:"address",type:"address",indexed:!1},{name:"triggerFee",internalType:"uint256",type:"uint256",indexed:!1}],name:"AuctionSettled"},{type:"event",anonymous:!1,inputs:[{name:"collection",internalType:"address",type:"address",indexed:!1},{name:"tokenId",internalType:"uint256",type:"uint256",indexed:!1},{name:"newBidder",internalType:"address",type:"address",indexed:!1},{name:"bid",internalType:"uint256",type:"uint256",indexed:!1},{name:"loanAddress",internalType:"address",type:"address",indexed:!1},{name:"loanId",internalType:"uint256",type:"uint256",indexed:!1}],name:"BidPlaced"},{type:"event",anonymous:!1,inputs:[{name:"liquidationDistributor",internalType:"address",type:"address",indexed:!1}],name:"LiquidationDistributorUpdated"},{type:"event",anonymous:!1,inputs:[{name:"loan",internalType:"address",type:"address",indexed:!1}],name:"LoanContractAdded"},{type:"event",anonymous:!1,inputs:[{name:"loan",internalType:"address",type:"address",indexed:!1}],name:"LoanContractRemoved"},{type:"event",anonymous:!1,inputs:[{name:"collection",internalType:"address",type:"address",indexed:!1},{name:"tokenId",internalType:"uint256",type:"uint256",indexed:!1},{name:"auction",internalType:"struct IAuctionLoanLiquidator.Auction",type:"tuple",components:[{name:"loanAddress",internalType:"address",type:"address"},{name:"loanId",internalType:"uint256",type:"uint256"},{name:"highestBid",internalType:"uint256",type:"uint256"},{name:"triggerFee",internalType:"uint256",type:"uint256"},{name:"highestBidder",internalType:"address",type:"address"},{name:"duration",internalType:"uint96",type:"uint96"},{name:"asset",internalType:"address",type:"address"},{name:"startTime",internalType:"uint96",type:"uint96"},{name:"originator",internalType:"address",type:"address"},{name:"lastBidTime",internalType:"uint96",type:"uint96"}],indexed:!1}],name:"LoanLiquidationStarted"},{type:"event",anonymous:!1,inputs:[{name:"user",internalType:"address",type:"address",indexed:!0},{name:"newOwner",internalType:"address",type:"address",indexed:!0}],name:"OwnershipTransferred"},{type:"event",anonymous:!1,inputs:[{name:"triggerFee",internalType:"uint256",type:"uint256",indexed:!1}],name:"TriggerFeeUpdated"},{stateMutability:"view",type:"function",inputs:[],name:"MAX_TRIGGER_FEE",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"view",type:"function",inputs:[],name:"MIN_INCREMENT_BPS",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_loanContract",internalType:"address",type:"address"}],name:"addLoanContract",outputs:[]},{stateMutability:"view",type:"function",inputs:[{name:"_contract",internalType:"address",type:"address"},{name:"_tokenId",internalType:"uint256",type:"uint256"}],name:"getAuctionHash",outputs:[{name:"",internalType:"bytes32",type:"bytes32"}]},{stateMutability:"view",type:"function",inputs:[],name:"getLiquidationDistributor",outputs:[{name:"",internalType:"address",type:"address"}]},{stateMutability:"view",type:"function",inputs:[],name:"getTriggerFee",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"view",type:"function",inputs:[],name:"getValidLoanContracts",outputs:[{name:"",internalType:"address[]",type:"address[]"}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_loanId",internalType:"uint256",type:"uint256"},{name:"_contract",internalType:"address",type:"address"},{name:"_tokenId",internalType:"uint256",type:"uint256"},{name:"_asset",internalType:"address",type:"address"},{name:"_duration",internalType:"uint96",type:"uint96"},{name:"_originator",internalType:"address",type:"address"}],name:"liquidateLoan",outputs:[{name:"",internalType:"bytes",type:"bytes"}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"",internalType:"address",type:"address"},{name:"",internalType:"address",type:"address"},{name:"",internalType:"uint256",type:"uint256"},{name:"",internalType:"bytes",type:"bytes"}],name:"onERC721Received",outputs:[{name:"",internalType:"bytes4",type:"bytes4"}]},{stateMutability:"view",type:"function",inputs:[],name:"owner",outputs:[{name:"",internalType:"address",type:"address"}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_contract",internalType:"address",type:"address"},{name:"_tokenId",internalType:"uint256",type:"uint256"},{name:"_auction",internalType:"struct IAuctionLoanLiquidator.Auction",type:"tuple",components:[{name:"loanAddress",internalType:"address",type:"address"},{name:"loanId",internalType:"uint256",type:"uint256"},{name:"highestBid",internalType:"uint256",type:"uint256"},{name:"triggerFee",internalType:"uint256",type:"uint256"},{name:"highestBidder",internalType:"address",type:"address"},{name:"duration",internalType:"uint96",type:"uint96"},{name:"asset",internalType:"address",type:"address"},{name:"startTime",internalType:"uint96",type:"uint96"},{name:"originator",internalType:"address",type:"address"},{name:"lastBidTime",internalType:"uint96",type:"uint96"}]},{name:"_bid",internalType:"uint256",type:"uint256"}],name:"placeBid",outputs:[{name:"",internalType:"struct IAuctionLoanLiquidator.Auction",type:"tuple",components:[{name:"loanAddress",internalType:"address",type:"address"},{name:"loanId",internalType:"uint256",type:"uint256"},{name:"highestBid",internalType:"uint256",type:"uint256"},{name:"triggerFee",internalType:"uint256",type:"uint256"},{name:"highestBidder",internalType:"address",type:"address"},{name:"duration",internalType:"uint96",type:"uint96"},{name:"asset",internalType:"address",type:"address"},{name:"startTime",internalType:"uint96",type:"uint96"},{name:"originator",internalType:"address",type:"address"},{name:"lastBidTime",internalType:"uint96",type:"uint96"}]}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_loanContract",internalType:"address",type:"address"}],name:"removeLoanContract",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_auction",internalType:"struct IAuctionLoanLiquidator.Auction",type:"tuple",components:[{name:"loanAddress",internalType:"address",type:"address"},{name:"loanId",internalType:"uint256",type:"uint256"},{name:"highestBid",internalType:"uint256",type:"uint256"},{name:"triggerFee",internalType:"uint256",type:"uint256"},{name:"highestBidder",internalType:"address",type:"address"},{name:"duration",internalType:"uint96",type:"uint96"},{name:"asset",internalType:"address",type:"address"},{name:"startTime",internalType:"uint96",type:"uint96"},{name:"originator",internalType:"address",type:"address"},{name:"lastBidTime",internalType:"uint96",type:"uint96"}]},{name:"_loan",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"source",internalType:"struct IMultiSourceLoan.Source[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]}]}],name:"settleAuction",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"newOwner",internalType:"address",type:"address"}],name:"transferOwnership",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"__liquidationDistributor",internalType:"address",type:"address"}],name:"updateLiquidationDistributor",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"triggerFee",internalType:"uint256",type:"uint256"}],name:"updateTriggerFee",outputs:[]}];var We=[{type:"event",anonymous:!1,inputs:[{name:"owner",internalType:"address",type:"address",indexed:!0},{name:"spender",internalType:"address",type:"address",indexed:!0},{name:"amount",internalType:"uint256",type:"uint256",indexed:!1}],name:"Approval"},{type:"event",anonymous:!1,inputs:[{name:"from",internalType:"address",type:"address",indexed:!0},{name:"to",internalType:"address",type:"address",indexed:!0},{name:"amount",internalType:"uint256",type:"uint256",indexed:!1}],name:"Transfer"},{stateMutability:"view",type:"function",inputs:[],name:"DOMAIN_SEPARATOR",outputs:[{name:"",internalType:"bytes32",type:"bytes32"}]},{stateMutability:"view",type:"function",inputs:[{name:"",internalType:"address",type:"address"},{name:"",internalType:"address",type:"address"}],name:"allowance",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"spender",internalType:"address",type:"address"},{name:"amount",internalType:"uint256",type:"uint256"}],name:"approve",outputs:[{name:"",internalType:"bool",type:"bool"}]},{stateMutability:"view",type:"function",inputs:[{name:"",internalType:"address",type:"address"}],name:"balanceOf",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"view",type:"function",inputs:[],name:"decimals",outputs:[{name:"",internalType:"uint8",type:"uint8"}]},{stateMutability:"view",type:"function",inputs:[],name:"name",outputs:[{name:"",internalType:"string",type:"string"}]},{stateMutability:"view",type:"function",inputs:[{name:"",internalType:"address",type:"address"}],name:"nonces",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"owner",internalType:"address",type:"address"},{name:"spender",internalType:"address",type:"address"},{name:"value",internalType:"uint256",type:"uint256"},{name:"deadline",internalType:"uint256",type:"uint256"},{name:"v",internalType:"uint8",type:"uint8"},{name:"r",internalType:"bytes32",type:"bytes32"},{name:"s",internalType:"bytes32",type:"bytes32"}],name:"permit",outputs:[]},{stateMutability:"view",type:"function",inputs:[],name:"symbol",outputs:[{name:"",internalType:"string",type:"string"}]},{stateMutability:"view",type:"function",inputs:[],name:"totalSupply",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"to",internalType:"address",type:"address"},{name:"amount",internalType:"uint256",type:"uint256"}],name:"transfer",outputs:[{name:"",internalType:"bool",type:"bool"}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"from",internalType:"address",type:"address"},{name:"to",internalType:"address",type:"address"},{name:"amount",internalType:"uint256",type:"uint256"}],name:"transferFrom",outputs:[{name:"",internalType:"bool",type:"bool"}]}],le=[{type:"event",anonymous:!1,inputs:[{name:"owner",internalType:"address",type:"address",indexed:!0},{name:"spender",internalType:"address",type:"address",indexed:!0},{name:"id",internalType:"uint256",type:"uint256",indexed:!0}],name:"Approval"},{type:"event",anonymous:!1,inputs:[{name:"owner",internalType:"address",type:"address",indexed:!0},{name:"operator",internalType:"address",type:"address",indexed:!0},{name:"approved",internalType:"bool",type:"bool",indexed:!1}],name:"ApprovalForAll"},{type:"event",anonymous:!1,inputs:[{name:"from",internalType:"address",type:"address",indexed:!0},{name:"to",internalType:"address",type:"address",indexed:!0},{name:"id",internalType:"uint256",type:"uint256",indexed:!0}],name:"Transfer"},{stateMutability:"nonpayable",type:"function",inputs:[{name:"spender",internalType:"address",type:"address"},{name:"id",internalType:"uint256",type:"uint256"}],name:"approve",outputs:[]},{stateMutability:"view",type:"function",inputs:[{name:"owner",internalType:"address",type:"address"}],name:"balanceOf",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"view",type:"function",inputs:[{name:"",internalType:"uint256",type:"uint256"}],name:"getApproved",outputs:[{name:"",internalType:"address",type:"address"}]},{stateMutability:"view",type:"function",inputs:[{name:"",internalType:"address",type:"address"},{name:"",internalType:"address",type:"address"}],name:"isApprovedForAll",outputs:[{name:"",internalType:"bool",type:"bool"}]},{stateMutability:"view",type:"function",inputs:[],name:"name",outputs:[{name:"",internalType:"string",type:"string"}]},{stateMutability:"view",type:"function",inputs:[{name:"id",internalType:"uint256",type:"uint256"}],name:"ownerOf",outputs:[{name:"owner",internalType:"address",type:"address"}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"from",internalType:"address",type:"address"},{name:"to",internalType:"address",type:"address"},{name:"id",internalType:"uint256",type:"uint256"}],name:"safeTransferFrom",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"from",internalType:"address",type:"address"},{name:"to",internalType:"address",type:"address"},{name:"id",internalType:"uint256",type:"uint256"},{name:"data",internalType:"bytes",type:"bytes"}],name:"safeTransferFrom",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"operator",internalType:"address",type:"address"},{name:"approved",internalType:"bool",type:"bool"}],name:"setApprovalForAll",outputs:[]},{stateMutability:"view",type:"function",inputs:[{name:"interfaceId",internalType:"bytes4",type:"bytes4"}],name:"supportsInterface",outputs:[{name:"",internalType:"bool",type:"bool"}]},{stateMutability:"view",type:"function",inputs:[],name:"symbol",outputs:[{name:"",internalType:"string",type:"string"}]},{stateMutability:"view",type:"function",inputs:[{name:"id",internalType:"uint256",type:"uint256"}],name:"tokenURI",outputs:[{name:"",internalType:"string",type:"string"}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"from",internalType:"address",type:"address"},{name:"to",internalType:"address",type:"address"},{name:"id",internalType:"uint256",type:"uint256"}],name:"transferFrom",outputs:[]}];var $e=[{stateMutability:"nonpayable",type:"constructor",inputs:[{name:"_multiSourceLoanAddress",internalType:"address",type:"address"},{name:"_marketplaceContracts",internalType:"address",type:"address"},{name:"_wethAddress",internalType:"address payable",type:"address"},{name:"_punkMarketAddress",internalType:"address payable",type:"address"},{name:"_wrappedPunkAddress",internalType:"address payable",type:"address"},{name:"_seaportAddress",internalType:"address payable",type:"address"}]},{type:"error",inputs:[],name:"AddressZeroError"},{type:"error",inputs:[],name:"CouldNotReturnEthError"},{type:"error",inputs:[],name:"InvalidAddressUpdateError"},{type:"error",inputs:[],name:"InvalidCallbackError"},{type:"error",inputs:[],name:"MarketplaceAddressNotWhitelisted"},{type:"error",inputs:[],name:"OnlyMultiSourceLoanError"},{type:"error",inputs:[],name:"OnlyWethSupportedError"},{type:"event",anonymous:!1,inputs:[{name:"_loanIds",internalType:"uint256[]",type:"uint256[]",indexed:!1}],name:"BNPLLoansStarted"},{type:"event",anonymous:!1,inputs:[{name:"_newAddress",internalType:"address",type:"address",indexed:!1}],name:"MultiSourceLoanPendingUpdate"},{type:"event",anonymous:!1,inputs:[{name:"_newAddress",internalType:"address",type:"address",indexed:!1}],name:"MultiSourceLoanUpdated"},{type:"event",anonymous:!1,inputs:[{name:"user",internalType:"address",type:"address",indexed:!0},{name:"newOwner",internalType:"address",type:"address",indexed:!0}],name:"OwnershipTransferred"},{type:"event",anonymous:!1,inputs:[{name:"_newAddress",internalType:"address",type:"address",indexed:!1}],name:"SeaportPendingUpdate"},{type:"event",anonymous:!1,inputs:[{name:"_newAddress",internalType:"address",type:"address",indexed:!1}],name:"SeaportUpdated"},{type:"event",anonymous:!1,inputs:[{name:"_loanIds",internalType:"uint256[]",type:"uint256[]",indexed:!1}],name:"SellAndRepayExecuted"},{stateMutability:"payable",type:"fallback"},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_loan",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"source",internalType:"struct IMultiSourceLoan.Source[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]}]},{name:"_executionData",internalType:"bytes",type:"bytes"}],name:"afterNFTTransfer",outputs:[{name:"",internalType:"bytes4",type:"bytes4"}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_loan",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"source",internalType:"struct IMultiSourceLoan.Source[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]}]},{name:"_fee",internalType:"uint256",type:"uint256"},{name:"_executionData",internalType:"bytes",type:"bytes"}],name:"afterPrincipalTransfer",outputs:[{name:"",internalType:"bytes4",type:"bytes4"}]},{stateMutability:"payable",type:"function",inputs:[{name:"_executionData",internalType:"bytes[]",type:"bytes[]"}],name:"buy",outputs:[{name:"",internalType:"uint256[]",type:"uint256[]"},{name:"",internalType:"struct IMultiSourceLoan.Loan[]",type:"tuple[]",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"source",internalType:"struct IMultiSourceLoan.Source[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]}]}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_newAddress",internalType:"address",type:"address"}],name:"finalUpdateMultiSourceLoanAddress",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_newAddress",internalType:"address",type:"address"}],name:"finalUpdateSeaportAddress",outputs:[]},{stateMutability:"view",type:"function",inputs:[],name:"getMultiSourceLoanAddress",outputs:[{name:"",internalType:"address",type:"address"}]},{stateMutability:"view",type:"function",inputs:[],name:"getSeaportAddress",outputs:[{name:"",internalType:"address",type:"address"}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"",internalType:"address",type:"address"},{name:"",internalType:"address",type:"address"},{name:"",internalType:"uint256",type:"uint256"},{name:"",internalType:"bytes",type:"bytes"}],name:"onERC721Received",outputs:[{name:"",internalType:"bytes4",type:"bytes4"}]},{stateMutability:"view",type:"function",inputs:[],name:"owner",outputs:[{name:"",internalType:"address",type:"address"}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_executionData",internalType:"bytes[]",type:"bytes[]"}],name:"sell",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"newOwner",internalType:"address",type:"address"}],name:"transferOwnership",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_newAddress",internalType:"address",type:"address"}],name:"updateMultiSourceLoanAddressFirst",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_newAddress",internalType:"address",type:"address"}],name:"updateSeaportAddressFirst",outputs:[]},{stateMutability:"payable",type:"receive"}];var h=[{stateMutability:"nonpayable",type:"constructor",inputs:[{name:"loanLiquidator",internalType:"address",type:"address"},{name:"protocolFee",internalType:"struct IBaseLoan.ProtocolFee",type:"tuple",components:[{name:"recipient",internalType:"address",type:"address"},{name:"fraction",internalType:"uint256",type:"uint256"}]},{name:"currencyManager",internalType:"address",type:"address"},{name:"collectionManager",internalType:"address",type:"address"},{name:"maxSources",internalType:"uint256",type:"uint256"},{name:"minLockPeriod",internalType:"uint256",type:"uint256"},{name:"delegateRegistry",internalType:"address",type:"address"},{name:"flashActionContract",internalType:"address",type:"address"}]},{type:"error",inputs:[],name:"AddressZeroError"},{type:"error",inputs:[{name:"_lender",internalType:"address",type:"address"},{name:"_offerId",internalType:"uint256",type:"uint256"}],name:"CancelledOrExecutedOfferError"},{type:"error",inputs:[{name:"_lender",internalType:"address",type:"address"},{name:"_renegotiationId",internalType:"uint256",type:"uint256"}],name:"CancelledRenegotiationOfferError"},{type:"error",inputs:[],name:"CannotLiquidateError"},{type:"error",inputs:[],name:"CollectionNotWhitelistedError"},{type:"error",inputs:[],name:"CurrencyNotWhitelistedError"},{type:"error",inputs:[],name:"ECDSAInvalidSignature"},{type:"error",inputs:[{name:"length",internalType:"uint256",type:"uint256"}],name:"ECDSAInvalidSignatureLength"},{type:"error",inputs:[{name:"s",internalType:"bytes32",type:"bytes32"}],name:"ECDSAInvalidSignatureS"},{type:"error",inputs:[{name:"_expirationTime",internalType:"uint256",type:"uint256"}],name:"ExpiredOfferError"},{type:"error",inputs:[{name:"_expirationTime",internalType:"uint256",type:"uint256"}],name:"ExpiredRenegotiationOfferError"},{type:"error",inputs:[],name:"ExtensionNotAvailableError"},{type:"error",inputs:[{name:"_amount",internalType:"uint256",type:"uint256"},{name:"_principalAmount",internalType:"uint256",type:"uint256"}],name:"InvalidAmountError"},{type:"error",inputs:[],name:"InvalidBorrowerError"},{type:"error",inputs:[],name:"InvalidCallbackError"},{type:"error",inputs:[],name:"InvalidCollateralIdError"},{type:"error",inputs:[],name:"InvalidDurationError"},{type:"error",inputs:[],name:"InvalidLenderError"},{type:"error",inputs:[],name:"InvalidLiquidationError"},{type:"error",inputs:[{name:"_loanId",internalType:"uint256",type:"uint256"}],name:"InvalidLoanError"},{type:"error",inputs:[],name:"InvalidMethodError"},{type:"error",inputs:[{name:"_fraction",internalType:"uint256",type:"uint256"}],name:"InvalidProtocolFeeError"},{type:"error",inputs:[],name:"InvalidRenegotiationOfferError"},{type:"error",inputs:[],name:"InvalidSignatureError"},{type:"error",inputs:[],name:"InvalidValueError"},{type:"error",inputs:[],name:"LengthMismatchError"},{type:"error",inputs:[{name:"_liquidator",internalType:"address",type:"address"}],name:"LiquidatorOnlyError"},{type:"error",inputs:[],name:"LoanExpiredError"},{type:"error",inputs:[{name:"_expirationTime",internalType:"uint256",type:"uint256"}],name:"LoanNotDueError"},{type:"error",inputs:[{name:"_lender",internalType:"address",type:"address"},{name:"_newMinOfferId",internalType:"uint256",type:"uint256"},{name:"_minOfferId",internalType:"uint256",type:"uint256"}],name:"LowOfferIdError"},{type:"error",inputs:[{name:"_lender",internalType:"address",type:"address"},{name:"_newMinRenegotiationOfferId",internalType:"uint256",type:"uint256"},{name:"_minOfferId",internalType:"uint256",type:"uint256"}],name:"LowRenegotiationOfferIdError"},{type:"error",inputs:[],name:"MaxCapacityExceededError"},{type:"error",inputs:[{name:"minLockPeriod",internalType:"uint256",type:"uint256"}],name:"MinLockPeriodTooHighError"},{type:"error",inputs:[{name:"i",internalType:"uint256",type:"uint256"},{name:"returndata",internalType:"bytes",type:"bytes"}],name:"MulticallFailed"},{type:"error",inputs:[],name:"NFTNotReturnedError"},{type:"error",inputs:[],name:"NotStrictlyImprovedError"},{type:"error",inputs:[],name:"OnlyBorrowerCallableError"},{type:"error",inputs:[],name:"OnlyLenderCallableError"},{type:"error",inputs:[],name:"OnlyLenderOrBorrowerCallableError"},{type:"error",inputs:[],name:"PartialOfferCannotChangeDurationError"},{type:"error",inputs:[],name:"PartialOfferCannotHaveFeeError"},{type:"error",inputs:[],name:"RefinanceFullError"},{type:"error",inputs:[{name:"minTimestamp",internalType:"uint256",type:"uint256"}],name:"SourceCannotBeRefinancedError"},{type:"error",inputs:[{name:"sourcePrincipal",internalType:"uint256",type:"uint256"},{name:"loanPrincipal",internalType:"uint256",type:"uint256"}],name:"TargetPrincipalTooLowError"},{type:"error",inputs:[{name:"_pendingProtocolFeeSetTime",internalType:"uint256",type:"uint256"}],name:"TooEarlyError"},{type:"error",inputs:[{name:"sources",internalType:"uint256",type:"uint256"}],name:"TooManySourcesError"},{type:"error",inputs:[],name:"ZeroDurationError"},{type:"error",inputs:[],name:"ZeroInterestError"},{type:"event",anonymous:!1,inputs:[{name:"lender",internalType:"address",type:"address",indexed:!1},{name:"minOfferId",internalType:"uint256",type:"uint256",indexed:!1}],name:"AllOffersCancelled"},{type:"event",anonymous:!1,inputs:[{name:"lender",internalType:"address",type:"address",indexed:!1},{name:"minRenegotiationId",internalType:"uint256",type:"uint256",indexed:!1}],name:"AllRenegotiationOffersCancelled"},{type:"event",anonymous:!1,inputs:[{name:"borrower",internalType:"address",type:"address",indexed:!1},{name:"offerId",internalType:"uint256",type:"uint256",indexed:!1}],name:"BorrowerOfferCancelled"},{type:"event",anonymous:!1,inputs:[{name:"newdelegateRegistry",internalType:"address",type:"address",indexed:!1}],name:"DelegateRegistryUpdated"},{type:"event",anonymous:!1,inputs:[{name:"loanId",internalType:"uint256",type:"uint256",indexed:!1},{name:"delegate",internalType:"address",type:"address",indexed:!1},{name:"value",internalType:"bool",type:"bool",indexed:!1}],name:"Delegated"},{type:"event",anonymous:!1,inputs:[{name:"newFlashActionContract",internalType:"address",type:"address",indexed:!1}],name:"FlashActionContractUpdated"},{type:"event",anonymous:!1,inputs:[{name:"loanId",internalType:"uint256",type:"uint256",indexed:!1},{name:"target",internalType:"address",type:"address",indexed:!1},{name:"data",internalType:"bytes",type:"bytes",indexed:!1}],name:"FlashActionExecuted"},{type:"event",anonymous:!1,inputs:[{name:"minimum",internalType:"struct IBaseLoan.ImprovementMinimum",type:"tuple",components:[{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"interest",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"}],indexed:!1}],name:"ImprovementMinimumUpdated"},{type:"event",anonymous:!1,inputs:[{name:"newDuration",internalType:"uint256",type:"uint256",indexed:!1}],name:"LiquidationAuctionDurationUpdated"},{type:"event",anonymous:!1,inputs:[{name:"liquidator",internalType:"address",type:"address",indexed:!1}],name:"LiquidationContractUpdated"},{type:"event",anonymous:!1,inputs:[{name:"loanId",internalType:"uint256",type:"uint256",indexed:!1},{name:"offerId",internalType:"uint256",type:"uint256",indexed:!1},{name:"loan",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"source",internalType:"struct IMultiSourceLoan.Source[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]}],indexed:!1},{name:"lender",internalType:"address",type:"address",indexed:!1},{name:"borrower",internalType:"address",type:"address",indexed:!1},{name:"fee",internalType:"uint256",type:"uint256",indexed:!1}],name:"LoanEmitted"},{type:"event",anonymous:!1,inputs:[{name:"oldLoanId",internalType:"uint256",type:"uint256",indexed:!1},{name:"newLoanId",internalType:"uint256",type:"uint256",indexed:!1},{name:"loan",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"source",internalType:"struct IMultiSourceLoan.Source[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]}],indexed:!1},{name:"_extension",internalType:"uint256",type:"uint256",indexed:!1}],name:"LoanExtended"},{type:"event",anonymous:!1,inputs:[{name:"loanId",internalType:"uint256",type:"uint256",indexed:!1}],name:"LoanForeclosed"},{type:"event",anonymous:!1,inputs:[{name:"loanId",internalType:"uint256",type:"uint256",indexed:!1}],name:"LoanLiquidated"},{type:"event",anonymous:!1,inputs:[{name:"renegotiationId",internalType:"uint256",type:"uint256",indexed:!1},{name:"oldLoanId",internalType:"uint256",type:"uint256",indexed:!1},{name:"newLoanId",internalType:"uint256",type:"uint256",indexed:!1},{name:"loan",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"source",internalType:"struct IMultiSourceLoan.Source[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]}],indexed:!1},{name:"fee",internalType:"uint256",type:"uint256",indexed:!1}],name:"LoanRefinanced"},{type:"event",anonymous:!1,inputs:[{name:"loanId",internalType:"uint256",type:"uint256",indexed:!1},{name:"totalRepayment",internalType:"uint256",type:"uint256",indexed:!1},{name:"fee",internalType:"uint256",type:"uint256",indexed:!1}],name:"LoanRepaid"},{type:"event",anonymous:!1,inputs:[{name:"loanId",internalType:"uint256",type:"uint256",indexed:!1},{name:"liquidator",internalType:"address",type:"address",indexed:!1}],name:"LoanSentToLiquidator"},{type:"event",anonymous:!1,inputs:[{name:"newMax",internalType:"uint256",type:"uint256",indexed:!1}],name:"MaxSourcesUpdated"},{type:"event",anonymous:!1,inputs:[{name:"minLockPeriod",internalType:"uint256",type:"uint256",indexed:!1}],name:"MinLockPeriodUpdated"},{type:"event",anonymous:!1,inputs:[{name:"lender",internalType:"address",type:"address",indexed:!1},{name:"offerId",internalType:"uint256",type:"uint256",indexed:!1}],name:"OfferCancelled"},{type:"event",anonymous:!1,inputs:[{name:"user",internalType:"address",type:"address",indexed:!0},{name:"newOwner",internalType:"address",type:"address",indexed:!0}],name:"OwnershipTransferred"},{type:"event",anonymous:!1,inputs:[{name:"fee",internalType:"struct IBaseLoan.ProtocolFee",type:"tuple",components:[{name:"recipient",internalType:"address",type:"address"},{name:"fraction",internalType:"uint256",type:"uint256"}],indexed:!1}],name:"ProtocolFeePendingUpdate"},{type:"event",anonymous:!1,inputs:[{name:"fee",internalType:"struct IBaseLoan.ProtocolFee",type:"tuple",components:[{name:"recipient",internalType:"address",type:"address"},{name:"fraction",internalType:"uint256",type:"uint256"}],indexed:!1}],name:"ProtocolFeeUpdated"},{type:"event",anonymous:!1,inputs:[{name:"lender",internalType:"address",type:"address",indexed:!1},{name:"renegotiationId",internalType:"uint256",type:"uint256",indexed:!1}],name:"RenegotiationOfferCancelled"},{type:"event",anonymous:!1,inputs:[{name:"delegate",internalType:"address",type:"address",indexed:!1},{name:"collection",internalType:"address",type:"address",indexed:!1},{name:"tokenId",internalType:"uint256",type:"uint256",indexed:!1}],name:"RevokeDelegate"},{type:"event",anonymous:!1,inputs:[{name:"contractAdded",internalType:"address",type:"address",indexed:!1},{name:"tax",internalType:"struct WithCallbacks.Taxes",type:"tuple",components:[{name:"buyTax",internalType:"uint128",type:"uint128"},{name:"sellTax",internalType:"uint128",type:"uint128"}],indexed:!1}],name:"WhitelistedCallbackContractAdded"},{type:"event",anonymous:!1,inputs:[{name:"contractRemoved",internalType:"address",type:"address",indexed:!1}],name:"WhitelistedCallbackContractRemoved"},{stateMutability:"view",type:"function",inputs:[],name:"DOMAIN_SEPARATOR",outputs:[{name:"",internalType:"bytes32",type:"bytes32"}]},{stateMutability:"view",type:"function",inputs:[],name:"FEE_UPDATE_NOTICE",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"view",type:"function",inputs:[],name:"INITIAL_DOMAIN_SEPARATOR",outputs:[{name:"",internalType:"bytes32",type:"bytes32"}]},{stateMutability:"view",type:"function",inputs:[],name:"MAX_PROTOCOL_FEE",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"view",type:"function",inputs:[],name:"MIN_AUCTION_DURATION",outputs:[{name:"",internalType:"uint48",type:"uint48"}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_contract",internalType:"address",type:"address"},{name:"_tax",internalType:"struct WithCallbacks.Taxes",type:"tuple",components:[{name:"buyTax",internalType:"uint128",type:"uint128"},{name:"sellTax",internalType:"uint128",type:"uint128"}]}],name:"addWhitelistedCallbackContract",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_minOfferId",internalType:"uint256",type:"uint256"}],name:"cancelAllOffers",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_minRenegotiationId",internalType:"uint256",type:"uint256"}],name:"cancelAllRenegotiationOffers",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_offerId",internalType:"uint256",type:"uint256"}],name:"cancelOffer",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_offerIds",internalType:"uint256[]",type:"uint256[]"}],name:"cancelOffers",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_renegotiationId",internalType:"uint256",type:"uint256"}],name:"cancelRenegotiationOffer",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_renegotiationIds",internalType:"uint256[]",type:"uint256[]"}],name:"cancelRenegotiationOffers",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_loanId",internalType:"uint256",type:"uint256"},{name:"loan",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"source",internalType:"struct IMultiSourceLoan.Source[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]}]},{name:"_delegate",internalType:"address",type:"address"},{name:"_rights",internalType:"bytes32",type:"bytes32"},{name:"_value",internalType:"bool",type:"bool"}],name:"delegate",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_executionData",internalType:"struct IMultiSourceLoan.LoanExecutionData",type:"tuple",components:[{name:"executionData",internalType:"struct IBaseLoan.ExecutionData",type:"tuple",components:[{name:"offer",internalType:"struct IBaseLoan.LoanOffer",type:"tuple",components:[{name:"offerId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"fee",internalType:"uint256",type:"uint256"},{name:"borrower",internalType:"address",type:"address"},{name:"capacity",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"},{name:"expirationTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"validators",internalType:"struct IBaseLoan.OfferValidator[]",type:"tuple[]",components:[{name:"validator",internalType:"address",type:"address"},{name:"arguments",internalType:"bytes",type:"bytes"}]}]},{name:"tokenId",internalType:"uint256",type:"uint256"},{name:"amount",internalType:"uint256",type:"uint256"},{name:"expirationTime",internalType:"uint256",type:"uint256"},{name:"callbackData",internalType:"bytes",type:"bytes"}]},{name:"lender",internalType:"address",type:"address"},{name:"borrower",internalType:"address",type:"address"},{name:"lenderOfferSignature",internalType:"bytes",type:"bytes"},{name:"borrowerOfferSignature",internalType:"bytes",type:"bytes"}]}],name:"emitLoan",outputs:[{name:"",internalType:"uint256",type:"uint256"},{name:"",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"source",internalType:"struct IMultiSourceLoan.Source[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]}]}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_loanId",internalType:"uint256",type:"uint256"},{name:"_loan",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"source",internalType:"struct IMultiSourceLoan.Source[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]}]},{name:"_target",internalType:"address",type:"address"},{name:"_data",internalType:"bytes",type:"bytes"}],name:"executeFlashAction",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_loanId",internalType:"uint256",type:"uint256"},{name:"_loan",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"source",internalType:"struct IMultiSourceLoan.Source[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]}]},{name:"_extension",internalType:"uint256",type:"uint256"}],name:"extendLoan",outputs:[{name:"",internalType:"uint256",type:"uint256"},{name:"",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"source",internalType:"struct IMultiSourceLoan.Source[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]}]}]},{stateMutability:"view",type:"function",inputs:[],name:"getCollectionManager",outputs:[{name:"",internalType:"address",type:"address"}]},{stateMutability:"view",type:"function",inputs:[],name:"getCurrencyManager",outputs:[{name:"",internalType:"address",type:"address"}]},{stateMutability:"view",type:"function",inputs:[],name:"getDelegateRegistry",outputs:[{name:"",internalType:"address",type:"address"}]},{stateMutability:"view",type:"function",inputs:[],name:"getFlashActionContract",outputs:[{name:"",internalType:"address",type:"address"}]},{stateMutability:"view",type:"function",inputs:[],name:"getImprovementMinimum",outputs:[{name:"",internalType:"struct IBaseLoan.ImprovementMinimum",type:"tuple",components:[{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"interest",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"}]}]},{stateMutability:"view",type:"function",inputs:[],name:"getLiquidationAuctionDuration",outputs:[{name:"",internalType:"uint48",type:"uint48"}]},{stateMutability:"view",type:"function",inputs:[],name:"getLiquidator",outputs:[{name:"",internalType:"address",type:"address"}]},{stateMutability:"view",type:"function",inputs:[{name:"_loanId",internalType:"uint256",type:"uint256"}],name:"getLoanHash",outputs:[{name:"",internalType:"bytes32",type:"bytes32"}]},{stateMutability:"view",type:"function",inputs:[],name:"getMaxSources",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"view",type:"function",inputs:[],name:"getMinLockPeriod",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"view",type:"function",inputs:[{name:"_loanPrincipal",internalType:"uint256",type:"uint256"}],name:"getMinSourcePrincipal",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"view",type:"function",inputs:[],name:"getPendingProtocolFee",outputs:[{name:"",internalType:"struct IBaseLoan.ProtocolFee",type:"tuple",components:[{name:"recipient",internalType:"address",type:"address"},{name:"fraction",internalType:"uint256",type:"uint256"}]}]},{stateMutability:"view",type:"function",inputs:[],name:"getPendingProtocolFeeSetTime",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"view",type:"function",inputs:[],name:"getProtocolFee",outputs:[{name:"",internalType:"struct IBaseLoan.ProtocolFee",type:"tuple",components:[{name:"recipient",internalType:"address",type:"address"},{name:"fraction",internalType:"uint256",type:"uint256"}]}]},{stateMutability:"view",type:"function",inputs:[],name:"getTotalLoansIssued",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"view",type:"function",inputs:[{name:"_lender",internalType:"address",type:"address"},{name:"_offerId",internalType:"uint256",type:"uint256"}],name:"getUsedCapacity",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"view",type:"function",inputs:[{name:"",internalType:"address",type:"address"},{name:"",internalType:"uint256",type:"uint256"}],name:"isBorrowerOfferCancelled",outputs:[{name:"",internalType:"bool",type:"bool"}]},{stateMutability:"view",type:"function",inputs:[{name:"",internalType:"address",type:"address"},{name:"",internalType:"uint256",type:"uint256"}],name:"isOfferCancelled",outputs:[{name:"",internalType:"bool",type:"bool"}]},{stateMutability:"view",type:"function",inputs:[{name:"",internalType:"address",type:"address"},{name:"",internalType:"uint256",type:"uint256"}],name:"isRenegotiationOfferCancelled",outputs:[{name:"",internalType:"bool",type:"bool"}]},{stateMutability:"view",type:"function",inputs:[{name:"_contract",internalType:"address",type:"address"}],name:"isWhitelistedCallbackContract",outputs:[{name:"",internalType:"bool",type:"bool"}]},{stateMutability:"view",type:"function",inputs:[{name:"",internalType:"address",type:"address"}],name:"lenderMinRenegotiationOfferId",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_loanId",internalType:"uint256",type:"uint256"},{name:"_loan",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"source",internalType:"struct IMultiSourceLoan.Source[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]}]}],name:"liquidateLoan",outputs:[{name:"",internalType:"bytes",type:"bytes"}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_loanId",internalType:"uint256",type:"uint256"},{name:"_loan",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"source",internalType:"struct IMultiSourceLoan.Source[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]}]}],name:"loanLiquidated",outputs:[]},{stateMutability:"view",type:"function",inputs:[{name:"",internalType:"address",type:"address"}],name:"minOfferId",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"payable",type:"function",inputs:[{name:"data",internalType:"bytes[]",type:"bytes[]"}],name:"multicall",outputs:[{name:"results",internalType:"bytes[]",type:"bytes[]"}]},{stateMutability:"view",type:"function",inputs:[],name:"name",outputs:[{name:"",internalType:"string",type:"string"}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"",internalType:"address",type:"address"},{name:"",internalType:"address",type:"address"},{name:"",internalType:"uint256",type:"uint256"},{name:"",internalType:"bytes",type:"bytes"}],name:"onERC721Received",outputs:[{name:"",internalType:"bytes4",type:"bytes4"}]},{stateMutability:"view",type:"function",inputs:[],name:"owner",outputs:[{name:"",internalType:"address",type:"address"}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_renegotiationOffer",internalType:"struct IMultiSourceLoan.RenegotiationOffer",type:"tuple",components:[{name:"renegotiationId",internalType:"uint256",type:"uint256"},{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"fee",internalType:"uint256",type:"uint256"},{name:"targetPrincipal",internalType:"uint256[]",type:"uint256[]"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"},{name:"expirationTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"}]},{name:"_loan",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"source",internalType:"struct IMultiSourceLoan.Source[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]}]},{name:"_renegotiationOfferSignature",internalType:"bytes",type:"bytes"}],name:"refinanceFull",outputs:[{name:"",internalType:"uint256",type:"uint256"},{name:"",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"source",internalType:"struct IMultiSourceLoan.Source[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]}]}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_renegotiationOffer",internalType:"struct IMultiSourceLoan.RenegotiationOffer",type:"tuple",components:[{name:"renegotiationId",internalType:"uint256",type:"uint256"},{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"fee",internalType:"uint256",type:"uint256"},{name:"targetPrincipal",internalType:"uint256[]",type:"uint256[]"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"},{name:"expirationTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"}]},{name:"_loan",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"source",internalType:"struct IMultiSourceLoan.Source[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]}]}],name:"refinancePartial",outputs:[{name:"",internalType:"uint256",type:"uint256"},{name:"",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"source",internalType:"struct IMultiSourceLoan.Source[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]}]}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_contract",internalType:"address",type:"address"}],name:"removeWhitelistedCallbackContract",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_repaymentData",internalType:"struct IMultiSourceLoan.LoanRepaymentData",type:"tuple",components:[{name:"data",internalType:"struct IMultiSourceLoan.SignableRepaymentData",type:"tuple",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"callbackData",internalType:"bytes",type:"bytes"},{name:"shouldDelegate",internalType:"bool",type:"bool"}]},{name:"loan",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"source",internalType:"struct IMultiSourceLoan.Source[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]}]},{name:"borrowerSignature",internalType:"bytes",type:"bytes"}]}],name:"repayLoan",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_delegate",internalType:"address",type:"address"},{name:"_collection",internalType:"address",type:"address"},{name:"_tokenId",internalType:"uint256",type:"uint256"}],name:"revokeDelegate",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_newDelegateRegistry",internalType:"address",type:"address"}],name:"setDelegateRegistry",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_newFlashActionContract",internalType:"address",type:"address"}],name:"setFlashActionContract",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"__maxSources",internalType:"uint256",type:"uint256"}],name:"setMaxSources",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"__minLockPeriod",internalType:"uint256",type:"uint256"}],name:"setMinLockPeriod",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[],name:"setProtocolFee",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"newOwner",internalType:"address",type:"address"}],name:"transferOwnership",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_newMinimum",internalType:"struct IBaseLoan.ImprovementMinimum",type:"tuple",components:[{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"interest",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"}]}],name:"updateImprovementMinimum",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_newDuration",internalType:"uint48",type:"uint48"}],name:"updateLiquidationAuctionDuration",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"loanLiquidator",internalType:"contract ILoanLiquidator",type:"address"}],name:"updateLiquidationContract",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_newProtocolFee",internalType:"struct IBaseLoan.ProtocolFee",type:"tuple",components:[{name:"recipient",internalType:"address",type:"address"},{name:"fraction",internalType:"uint256",type:"uint256"}]}],name:"updateProtocolFee",outputs:[]}];var Qe=[{stateMutability:"nonpayable",type:"constructor",inputs:[{name:"currencyManager",internalType:"address",type:"address"},{name:"collectionManager",internalType:"address",type:"address"}]},{type:"error",inputs:[],name:"AssetNotOwnedError"},{type:"error",inputs:[],name:"CollectionNotWhitelistedError"},{type:"error",inputs:[],name:"CurrencyNotWhitelistedError"},{type:"error",inputs:[],name:"LengthMismatchError"},{type:"error",inputs:[{name:"vaultId",internalType:"uint256",type:"uint256"}],name:"NotApprovedError"},{type:"error",inputs:[{name:"vaultId",internalType:"uint256",type:"uint256"}],name:"VaultNotExistsError"},{type:"error",inputs:[],name:"WithdrawingETHError"},{type:"error",inputs:[],name:"WrongMethodError"},{type:"event",anonymous:!1,inputs:[{name:"owner",internalType:"address",type:"address",indexed:!0},{name:"spender",internalType:"address",type:"address",indexed:!0},{name:"id",internalType:"uint256",type:"uint256",indexed:!0}],name:"Approval"},{type:"event",anonymous:!1,inputs:[{name:"owner",internalType:"address",type:"address",indexed:!0},{name:"operator",internalType:"address",type:"address",indexed:!0},{name:"approved",internalType:"bool",type:"bool",indexed:!1}],name:"ApprovalForAll"},{type:"event",anonymous:!1,inputs:[{name:"vaultId",internalType:"uint256",type:"uint256",indexed:!1},{name:"token",internalType:"address",type:"address",indexed:!1},{name:"amount",internalType:"uint256",type:"uint256",indexed:!1}],name:"ERC20Deposited"},{type:"event",anonymous:!1,inputs:[{name:"vaultId",internalType:"uint256",type:"uint256",indexed:!1},{name:"token",internalType:"address",type:"address",indexed:!1},{name:"amount",internalType:"uint256",type:"uint256",indexed:!1}],name:"ERC20Withdrawn"},{type:"event",anonymous:!1,inputs:[{name:"vaultId",internalType:"uint256",type:"uint256",indexed:!1},{name:"collection",internalType:"address",type:"address",indexed:!1},{name:"tokenId",internalType:"uint256",type:"uint256",indexed:!1}],name:"ERC721Deposited"},{type:"event",anonymous:!1,inputs:[{name:"vaultId",internalType:"uint256",type:"uint256",indexed:!1},{name:"collection",internalType:"address",type:"address",indexed:!1},{name:"tokenId",internalType:"uint256",type:"uint256",indexed:!1}],name:"ERC721Withdrawn"},{type:"event",anonymous:!1,inputs:[{name:"user",internalType:"address",type:"address",indexed:!0},{name:"newOwner",internalType:"address",type:"address",indexed:!0}],name:"OwnershipTransferred"},{type:"event",anonymous:!1,inputs:[{name:"from",internalType:"address",type:"address",indexed:!0},{name:"to",internalType:"address",type:"address",indexed:!0},{name:"id",internalType:"uint256",type:"uint256",indexed:!0}],name:"Transfer"},{stateMutability:"view",type:"function",inputs:[{name:"_vaultId",internalType:"uint256",type:"uint256"},{name:"_token",internalType:"address",type:"address"}],name:"ERC20BalanceOf",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"view",type:"function",inputs:[{name:"_collection",internalType:"address",type:"address"},{name:"_tokenId",internalType:"uint256",type:"uint256"}],name:"ERC721OwnerOf",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"view",type:"function",inputs:[],name:"ETH",outputs:[{name:"",internalType:"address",type:"address"}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"spender",internalType:"address",type:"address"},{name:"id",internalType:"uint256",type:"uint256"}],name:"approve",outputs:[]},{stateMutability:"view",type:"function",inputs:[{name:"owner",internalType:"address",type:"address"}],name:"balanceOf",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_vaultId",internalType:"uint256",type:"uint256"},{name:"_assetRecipient",internalType:"address",type:"address"}],name:"burn",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_vaultId",internalType:"uint256",type:"uint256"},{name:"_collections",internalType:"address[]",type:"address[]"},{name:"_tokenIds",internalType:"uint256[]",type:"uint256[]"},{name:"_tokens",internalType:"address[]",type:"address[]"}],name:"burnAndWithdraw",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_vaultId",internalType:"uint256",type:"uint256"},{name:"_token",internalType:"address",type:"address"},{name:"_amount",internalType:"uint256",type:"uint256"}],name:"depositERC20",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_vaultId",internalType:"uint256",type:"uint256"},{name:"_collection",internalType:"address",type:"address"},{name:"_tokenId",internalType:"uint256",type:"uint256"}],name:"depositERC721",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_vaultId",internalType:"uint256",type:"uint256"},{name:"_collection",internalType:"address",type:"address"},{name:"_tokenIds",internalType:"uint256[]",type:"uint256[]"}],name:"depositERC721s",outputs:[]},{stateMutability:"payable",type:"function",inputs:[{name:"_vaultId",internalType:"uint256",type:"uint256"}],name:"depositEth",outputs:[]},{stateMutability:"view",type:"function",inputs:[{name:"",internalType:"uint256",type:"uint256"}],name:"getApproved",outputs:[{name:"",internalType:"address",type:"address"}]},{stateMutability:"view",type:"function",inputs:[{name:"",internalType:"address",type:"address"},{name:"",internalType:"address",type:"address"}],name:"isApprovedForAll",outputs:[{name:"",internalType:"bool",type:"bool"}]},{stateMutability:"nonpayable",type:"function",inputs:[],name:"mint",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"view",type:"function",inputs:[],name:"name",outputs:[{name:"",internalType:"string",type:"string"}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"",internalType:"address",type:"address"},{name:"",internalType:"address",type:"address"},{name:"",internalType:"uint256",type:"uint256"},{name:"",internalType:"bytes",type:"bytes"}],name:"onERC721Received",outputs:[{name:"",internalType:"bytes4",type:"bytes4"}]},{stateMutability:"view",type:"function",inputs:[],name:"owner",outputs:[{name:"",internalType:"address",type:"address"}]},{stateMutability:"view",type:"function",inputs:[{name:"id",internalType:"uint256",type:"uint256"}],name:"ownerOf",outputs:[{name:"owner",internalType:"address",type:"address"}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"from",internalType:"address",type:"address"},{name:"to",internalType:"address",type:"address"},{name:"id",internalType:"uint256",type:"uint256"}],name:"safeTransferFrom",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"from",internalType:"address",type:"address"},{name:"to",internalType:"address",type:"address"},{name:"id",internalType:"uint256",type:"uint256"},{name:"data",internalType:"bytes",type:"bytes"}],name:"safeTransferFrom",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"operator",internalType:"address",type:"address"},{name:"approved",internalType:"bool",type:"bool"}],name:"setApprovalForAll",outputs:[]},{stateMutability:"view",type:"function",inputs:[{name:"interfaceId",internalType:"bytes4",type:"bytes4"}],name:"supportsInterface",outputs:[{name:"",internalType:"bool",type:"bool"}]},{stateMutability:"view",type:"function",inputs:[],name:"symbol",outputs:[{name:"",internalType:"string",type:"string"}]},{stateMutability:"pure",type:"function",inputs:[{name:"_vaultId",internalType:"uint256",type:"uint256"}],name:"tokenURI",outputs:[{name:"",internalType:"string",type:"string"}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"from",internalType:"address",type:"address"},{name:"to",internalType:"address",type:"address"},{name:"id",internalType:"uint256",type:"uint256"}],name:"transferFrom",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"newOwner",internalType:"address",type:"address"}],name:"transferOwnership",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_vaultId",internalType:"uint256",type:"uint256"},{name:"_token",internalType:"address",type:"address"}],name:"withdrawERC20",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_vaultId",internalType:"uint256",type:"uint256"},{name:"_tokens",internalType:"address[]",type:"address[]"}],name:"withdrawERC20s",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_vaultId",internalType:"uint256",type:"uint256"},{name:"_collection",internalType:"address",type:"address"},{name:"_tokenId",internalType:"uint256",type:"uint256"}],name:"withdrawERC721",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_vaultId",internalType:"uint256",type:"uint256"},{name:"_collections",internalType:"address[]",type:"address[]"},{name:"_tokenIds",internalType:"uint256[]",type:"uint256[]"}],name:"withdrawERC721s",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_vaultId",internalType:"uint256",type:"uint256"}],name:"withdrawEth",outputs:[]}];var ze="MarketPlace.Native",L="GONDI_MULTI_SOURCE_LOAN",S=y((p,e)=>W(p)&&p.toLowerCase()===e?.toLowerCase(),"areSameAddress");import{encodeAbiParameters as dn}from"viem";import{isAddress as an,zeroAddress as rn}from"viem";import{goerli as sn}from"viem/chains";var pn=31337,w=y(p=>!p||!an(p)?null:p,"ensureAddress"),Ge="0xb6dfcbc1661d0c0bced9591d06e964f97d41a35984704ffe61f8e062e43919c8",I=y(p=>p?.id===pn?{MultiSourceLoan:{v4:w(process.env.GONDI_MULTI_SOURCE_LOAN_V4)??"0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",v5:w(process.env.GONDI_MULTI_SOURCE_LOAN_V5)??"0x610178dA211FEF7D417bC0e6FeD39F05609AD788",v6:w(process.env.GONDI_MULTI_SOURCE_LOAN_V6)??"0x4ed7c70F96B99c776995fB64377f0d4aB3B0e1C1"},AuctionLoanLiquidator:{v4:w(process.env.GONDI_AUCTION_LOAN_LIQUIDATOR_V4)??"0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",v5:w(process.env.GONDI_AUCTION_LOAN_LIQUIDATOR_V5)??"0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",v6:w(process.env.GONDI_AUCTION_LOAN_LIQUIDATOR_V6)??"0x59b670e9fA9D0A427751Af201D676719a970857b"},UserVault:{v5:w(process.env.GONDI_USER_VAULT_V5)??"0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82",v6:w(process.env.GONDI_USER_VAULT_V6)??"0x4A679253410272dd5232B3Ff7cF5dbB88f295319"},LeverageAddress:w(process.env.GONDI_LEVERAGE)??"0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0",SeaportAddress:w(process.env.SEAPORT)??"0x00000000000000ADc04C56Bf30aC9d3c0aAF14dC",CryptoPunksAddress:w(process.env.CRYPTO_PUNKS)??"0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb"}:p?.id===sn.id?{MultiSourceLoan:{v4:"0x60C20627429668F267b5cF55c6605c665C69887D",v5:"0xTODO",v6:"0xTODO"},AuctionLoanLiquidator:{v4:"0x29C73faa2f9180ea5a7B0bEC243ebc63a5B4f280",v5:"0xTODO",v6:"0xTODO"},UserVault:{v5:"0xTODO",v6:"0xTODO"},LeverageAddress:"0xTODO",SeaportAddress:"0x00000000000000ADc04C56Bf30aC9d3c0aAF14dC",CryptoPunksAddress:"0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb"}:{MultiSourceLoan:{v4:"0xCa5a494Ca20483e21ec1E41FE1D9461Da77595Bd",v5:"0x478f6F994C6fb3cf3e444a489b3AD9edB8cCaE16",v6:"0xf65b99ce6dc5f6c556172bcc0ff27d3665a7d9a8"},AuctionLoanLiquidator:{v4:"0x237e4421C742d843Fdd96D22294D338507e17091",v5:"0x97d34635b605c2f1630d6b4c6c5d222b8a2ca47d",v6:"0x2995ae7233fa89b314b5a707465b57a582f440f0"},UserVault:{v5:"0x14a6Dcebb2Bb73aae1b199CCAadA75247b81976D",v6:"0xC9f152168BC7b75F76b74e1f382F90bC2FeDd15f"},LeverageAddress:"0x87Ce6e8124fFd68fa721FcC7f35fdA14A11E233e",SeaportAddress:"0x00000000000000ADc04C56Bf30aC9d3c0aAF14dC",CryptoPunksAddress:"0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb"},"getContracts"),Ze=y(()=>({reservoirApiKey:"5b472f8c-b471-531a-a450-56e428e5a00a",infuraApiKey:"9b7006cb0b0b42f1813ae9418741fbb5"}),"getApiKeys"),C=y(()=>({WETH_ADDRESS:"0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",ETH_ADDRESS:rn,USDC_ADDRESS:"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"}),"getCurrencies");var Xe=[{stateMutability:"nonpayable",type:"constructor",inputs:[{name:"currencyManager",internalType:"address",type:"address"},{name:"collectionManager",internalType:"address",type:"address"},{name:"triggerFee",internalType:"uint256",type:"uint256"}]},{type:"error",inputs:[],name:"AuctionAlreadyInProgressError"},{type:"error",inputs:[{name:"_contract",internalType:"address",type:"address"},{name:"_tokenId",internalType:"uint256",type:"uint256"}],name:"AuctionNotExistsError"},{type:"error",inputs:[{name:"_expiration",internalType:"uint96",type:"uint96"}],name:"AuctionNotOverError"},{type:"error",inputs:[{name:"_expiration",internalType:"uint96",type:"uint96"}],name:"AuctionOverError"},{type:"error",inputs:[],name:"CollectionNotWhitelistedError"},{type:"error",inputs:[],name:"CurrencyNotWhitelistedError"},{type:"error",inputs:[{name:"triggerFee",internalType:"uint256",type:"uint256"}],name:"InvalidTriggerFee"},{type:"error",inputs:[{name:"_loan",internalType:"address",type:"address"}],name:"LoanNotAcceptedError"},{type:"error",inputs:[{name:"_minBid",internalType:"uint256",type:"uint256"}],name:"MinBidError"},{type:"error",inputs:[{name:"_owner",internalType:"address",type:"address"}],name:"NFTNotOwnedError"},{type:"error",inputs:[],name:"NoBidsError"},{type:"error",inputs:[],name:"ZeroAddressError"},{type:"event",anonymous:!1,inputs:[{name:"loanContract",internalType:"address",type:"address",indexed:!1},{name:"loanId",internalType:"uint256",type:"uint256",indexed:!1},{name:"auctionContract",internalType:"address",type:"address",indexed:!1},{name:"tokenId",internalType:"uint256",type:"uint256",indexed:!1},{name:"asset",internalType:"address",type:"address",indexed:!1},{name:"highestBid",internalType:"uint256",type:"uint256",indexed:!1},{name:"settler",internalType:"address",type:"address",indexed:!1},{name:"triggerFee",internalType:"uint256",type:"uint256",indexed:!1}],name:"AuctionSettled"},{type:"event",anonymous:!1,inputs:[{name:"auctionContract",internalType:"address",type:"address",indexed:!1},{name:"tokenId",internalType:"uint256",type:"uint256",indexed:!1},{name:"newBidder",internalType:"address",type:"address",indexed:!1},{name:"bid",internalType:"uint256",type:"uint256",indexed:!1},{name:"loanAddress",internalType:"address",type:"address",indexed:!1},{name:"loanId",internalType:"uint256",type:"uint256",indexed:!1}],name:"BidPlaced"},{type:"event",anonymous:!1,inputs:[{name:"loan",internalType:"address",type:"address",indexed:!1}],name:"LoanContractAdded"},{type:"event",anonymous:!1,inputs:[{name:"loan",internalType:"address",type:"address",indexed:!1}],name:"LoanContractRemoved"},{type:"event",anonymous:!1,inputs:[{name:"loanAddress",internalType:"address",type:"address",indexed:!1},{name:"loanId",internalType:"uint256",type:"uint256",indexed:!1},{name:"duration",internalType:"uint96",type:"uint96",indexed:!1},{name:"asset",internalType:"address",type:"address",indexed:!1}],name:"LoanLiquidationStarted"},{type:"event",anonymous:!1,inputs:[{name:"user",internalType:"address",type:"address",indexed:!0},{name:"newOwner",internalType:"address",type:"address",indexed:!0}],name:"OwnershipTransferred"},{type:"event",anonymous:!1,inputs:[{name:"triggerFee",internalType:"uint256",type:"uint256",indexed:!1}],name:"TriggerFeeUpdated"},{stateMutability:"view",type:"function",inputs:[],name:"MAX_TRIGGER_FEE",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"view",type:"function",inputs:[],name:"MIN_INCREMENT_BPS",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_loanContract",internalType:"address",type:"address"}],name:"addLoanContract",outputs:[]},{stateMutability:"view",type:"function",inputs:[{name:"_contract",internalType:"address",type:"address"},{name:"_tokenId",internalType:"uint256",type:"uint256"}],name:"getAuction",outputs:[{name:"",internalType:"struct AuctionLoanLiquidator.Auction",type:"tuple",components:[{name:"loanAddress",internalType:"address",type:"address"},{name:"loanId",internalType:"uint256",type:"uint256"},{name:"highestBid",internalType:"uint256",type:"uint256"},{name:"highestBidder",internalType:"address",type:"address"},{name:"duration",internalType:"uint96",type:"uint96"},{name:"asset",internalType:"address",type:"address"},{name:"startTime",internalType:"uint96",type:"uint96"},{name:"originator",internalType:"address",type:"address"},{name:"lastBidTime",internalType:"uint96",type:"uint96"}]}]},{stateMutability:"view",type:"function",inputs:[],name:"getTriggerFee",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"view",type:"function",inputs:[],name:"getValidLoanContracts",outputs:[{name:"",internalType:"address[]",type:"address[]"}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_loanId",internalType:"uint256",type:"uint256"},{name:"_contract",internalType:"address",type:"address"},{name:"_tokenId",internalType:"uint256",type:"uint256"},{name:"_asset",internalType:"address",type:"address"},{name:"_duration",internalType:"uint96",type:"uint96"},{name:"_originator",internalType:"address",type:"address"}],name:"liquidateLoan",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"",internalType:"address",type:"address"},{name:"",internalType:"address",type:"address"},{name:"",internalType:"uint256",type:"uint256"},{name:"",internalType:"bytes",type:"bytes"}],name:"onERC721Received",outputs:[{name:"",internalType:"bytes4",type:"bytes4"}]},{stateMutability:"view",type:"function",inputs:[],name:"owner",outputs:[{name:"",internalType:"address",type:"address"}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_contract",internalType:"address",type:"address"},{name:"_tokenId",internalType:"uint256",type:"uint256"},{name:"_bid",internalType:"uint256",type:"uint256"}],name:"placeBid",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_loanContract",internalType:"address",type:"address"}],name:"removeLoanContract",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_contract",internalType:"address",type:"address"},{name:"_tokenId",internalType:"uint256",type:"uint256"},{name:"_loan",internalType:"bytes",type:"bytes"}],name:"settleAuction",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"newOwner",internalType:"address",type:"address"}],name:"transferOwnership",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"triggerFee",internalType:"uint256",type:"uint256"}],name:"updateTriggerFee",outputs:[]}];var je=[{stateMutability:"nonpayable",type:"constructor",inputs:[{name:"loanLiquidator",internalType:"address",type:"address"},{name:"protocolFee",internalType:"struct IBaseLoan.ProtocolFee",type:"tuple",components:[{name:"recipient",internalType:"address",type:"address"},{name:"fraction",internalType:"uint256",type:"uint256"}]},{name:"currencyManager",internalType:"address",type:"address"},{name:"collectionManager",internalType:"address",type:"address"},{name:"maxSources",internalType:"uint8",type:"uint8"}]},{type:"error",inputs:[],name:"AddressZeroError"},{type:"error",inputs:[{name:"_lender",internalType:"address",type:"address"},{name:"_offerId",internalType:"uint256",type:"uint256"}],name:"CancelledOrExecutedOfferError"},{type:"error",inputs:[{name:"_lender",internalType:"address",type:"address"},{name:"_offerId",internalType:"uint256",type:"uint256"}],name:"CancelledRenegotiationOffer"},{type:"error",inputs:[{name:"_lender",internalType:"address",type:"address"},{name:"_renegotiationId",internalType:"uint256",type:"uint256"}],name:"CancelledRenegotiationOfferError"},{type:"error",inputs:[],name:"CannotLiquidateError"},{type:"error",inputs:[],name:"CollectionNotWhitelistedError"},{type:"error",inputs:[],name:"CurrencyNotWhitelistedError"},{type:"error",inputs:[],name:"ExpiredLoanError"},{type:"error",inputs:[{name:"_expirationTime",internalType:"uint256",type:"uint256"}],name:"ExpiredOfferError"},{type:"error",inputs:[{name:"_expirationTime",internalType:"uint256",type:"uint256"}],name:"ExpiredRenegotiationOfferError"},{type:"error",inputs:[],name:"InvalidBorrowerError"},{type:"error",inputs:[],name:"InvalidCallbackError"},{type:"error",inputs:[],name:"InvalidCollateralIdError"},{type:"error",inputs:[],name:"InvalidLiquidationError"},{type:"error",inputs:[{name:"_loanId",internalType:"uint256",type:"uint256"}],name:"InvalidLoanError"},{type:"error",inputs:[{name:"_fraction",internalType:"uint256",type:"uint256"}],name:"InvalidProtocolFeeError"},{type:"error",inputs:[],name:"InvalidRenegotiationOfferError"},{type:"error",inputs:[],name:"InvalidSignatureError"},{type:"error",inputs:[],name:"InvalidSignerError"},{type:"error",inputs:[],name:"LengthMismatchError"},{type:"error",inputs:[{name:"_liquidator",internalType:"address",type:"address"}],name:"LiquidatorOnlyError"},{type:"error",inputs:[],name:"LoanExpiredError"},{type:"error",inputs:[{name:"_expirationTime",internalType:"uint256",type:"uint256"}],name:"LoanNotDueError"},{type:"error",inputs:[{name:"_loanId",internalType:"uint256",type:"uint256"}],name:"LoanNotFoundError"},{type:"error",inputs:[{name:"_lender",internalType:"address",type:"address"},{name:"_newMinOfferId",internalType:"uint256",type:"uint256"},{name:"_minOfferId",internalType:"uint256",type:"uint256"}],name:"LowOfferIdError"},{type:"error",inputs:[{name:"_lender",internalType:"address",type:"address"},{name:"_newMinRenegotiationOfferId",internalType:"uint256",type:"uint256"},{name:"_minOfferId",internalType:"uint256",type:"uint256"}],name:"LowRenegotiationOfferIdError"},{type:"error",inputs:[],name:"MaxCapacityExceededError"},{type:"error",inputs:[{name:"_id",internalType:"uint256",type:"uint256"}],name:"NotMintedError"},{type:"error",inputs:[],name:"NotStrictlyImprovedError"},{type:"error",inputs:[],name:"OnlyBorrowerCallableError"},{type:"error",inputs:[],name:"OnlyLenderOrSignerCallableError"},{type:"error",inputs:[],name:"PartialOfferCannotChangeDurationError"},{type:"error",inputs:[],name:"PartialOfferCannotHaveFeeError"},{type:"error",inputs:[],name:"RefinanceFullError"},{type:"error",inputs:[],name:"RepaymentError"},{type:"error",inputs:[{name:"sourcePrincipal",internalType:"uint256",type:"uint256"},{name:"loanPrincipal",internalType:"uint256",type:"uint256"}],name:"TargetPrincipalTooLowError"},{type:"error",inputs:[{name:"_pendingProtocolFeeSetTime",internalType:"uint256",type:"uint256"}],name:"TooEarlyError"},{type:"error",inputs:[{name:"sources",internalType:"uint8",type:"uint8"}],name:"TooManySourcesError"},{type:"error",inputs:[],name:"Unauthorized"},{type:"error",inputs:[{name:"_authorized",internalType:"address",type:"address"}],name:"UnauthorizedError"},{type:"error",inputs:[],name:"ZeroAddressError"},{type:"error",inputs:[],name:"ZeroDurationError"},{type:"error",inputs:[],name:"ZeroInterestError"},{type:"event",anonymous:!1,inputs:[{name:"lender",internalType:"address",type:"address",indexed:!1},{name:"minOfferId",internalType:"uint256",type:"uint256",indexed:!1}],name:"AllOffersCancelled"},{type:"event",anonymous:!1,inputs:[{name:"lender",internalType:"address",type:"address",indexed:!1},{name:"minRenegotiationId",internalType:"uint256",type:"uint256",indexed:!1}],name:"AllRenegotiationOffersCancelled"},{type:"event",anonymous:!1,inputs:[{name:"lender",internalType:"address",type:"address",indexed:!1},{name:"signer",internalType:"address",type:"address",indexed:!1}],name:"ApprovedSigner"},{type:"event",anonymous:!1,inputs:[{name:"minimum",internalType:"struct IBaseLoan.ImprovementMinimum",type:"tuple",components:[{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"interest",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"}],indexed:!1}],name:"ImprovementMinimumUpdated"},{type:"event",anonymous:!1,inputs:[{name:"newDuration",internalType:"uint256",type:"uint256",indexed:!1}],name:"LiquidationAuctionDurationUpdated"},{type:"event",anonymous:!1,inputs:[{name:"liquidator",internalType:"address",type:"address",indexed:!1}],name:"LiquidationContractUpdated"},{type:"event",anonymous:!1,inputs:[{name:"loanId",internalType:"uint256",type:"uint256",indexed:!1},{name:"offerId",internalType:"uint256",type:"uint256",indexed:!1},{name:"loan",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"source",internalType:"struct IMultiSourceLoan.Source[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]}],indexed:!1},{name:"fee",internalType:"uint256",type:"uint256",indexed:!1}],name:"LoanEmitted"},{type:"event",anonymous:!1,inputs:[{name:"loanId",internalType:"uint256",type:"uint256",indexed:!1}],name:"LoanForeclosed"},{type:"event",anonymous:!1,inputs:[{name:"loanId",internalType:"uint256",type:"uint256",indexed:!1},{name:"repayment",internalType:"uint256",type:"uint256",indexed:!1}],name:"LoanLiquidated"},{type:"event",anonymous:!1,inputs:[{name:"renegotiationId",internalType:"uint256",type:"uint256",indexed:!1},{name:"oldLoanId",internalType:"uint256",type:"uint256",indexed:!1},{name:"newLoanId",internalType:"uint256",type:"uint256",indexed:!1},{name:"loan",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"source",internalType:"struct IMultiSourceLoan.Source[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]}],indexed:!1},{name:"fee",internalType:"uint256",type:"uint256",indexed:!1}],name:"LoanRefinanced"},{type:"event",anonymous:!1,inputs:[{name:"loanId",internalType:"uint256",type:"uint256",indexed:!1},{name:"totalRepayment",internalType:"uint256",type:"uint256",indexed:!1},{name:"fee",internalType:"uint256",type:"uint256",indexed:!1}],name:"LoanRepaid"},{type:"event",anonymous:!1,inputs:[{name:"loanId",internalType:"uint256",type:"uint256",indexed:!1},{name:"liquidator",internalType:"address",type:"address",indexed:!1}],name:"LoanSentToLiquidator"},{type:"event",anonymous:!1,inputs:[{name:"newMax",internalType:"uint8",type:"uint8",indexed:!1}],name:"MaxSourcesUpdated"},{type:"event",anonymous:!1,inputs:[{name:"lender",internalType:"address",type:"address",indexed:!1},{name:"offerId",internalType:"uint256",type:"uint256",indexed:!1}],name:"OfferCancelled"},{type:"event",anonymous:!1,inputs:[{name:"user",internalType:"address",type:"address",indexed:!0},{name:"newOwner",internalType:"address",type:"address",indexed:!0}],name:"OwnershipTransferred"},{type:"event",anonymous:!1,inputs:[{name:"fee",internalType:"struct IBaseLoan.ProtocolFee",type:"tuple",components:[{name:"recipient",internalType:"address",type:"address"},{name:"fraction",internalType:"uint256",type:"uint256"}],indexed:!1}],name:"ProtocolFeePendingUpdate"},{type:"event",anonymous:!1,inputs:[{name:"fee",internalType:"struct IBaseLoan.ProtocolFee",type:"tuple",components:[{name:"recipient",internalType:"address",type:"address"},{name:"fraction",internalType:"uint256",type:"uint256"}],indexed:!1}],name:"ProtocolFeeUpdated"},{type:"event",anonymous:!1,inputs:[{name:"lender",internalType:"address",type:"address",indexed:!1},{name:"renegotiationId",internalType:"uint256",type:"uint256",indexed:!1}],name:"RenegotiationOfferCancelled"},{type:"event",anonymous:!1,inputs:[{name:"contract_added",internalType:"address",type:"address",indexed:!1}],name:"WhitelistedCallbackContractAdded"},{type:"event",anonymous:!1,inputs:[{name:"contract_removed",internalType:"address",type:"address",indexed:!1}],name:"WhitelistedCallbackContractRemoved"},{stateMutability:"view",type:"function",inputs:[],name:"DOMAIN_SEPARATOR",outputs:[{name:"",internalType:"bytes32",type:"bytes32"}]},{stateMutability:"view",type:"function",inputs:[],name:"FEE_UPDATE_NOTICE",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"view",type:"function",inputs:[],name:"INITIAL_DOMAIN_SEPARATOR",outputs:[{name:"",internalType:"bytes32",type:"bytes32"}]},{stateMutability:"view",type:"function",inputs:[],name:"MAX_PROTOCOL_FEE",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_contract",internalType:"address",type:"address"}],name:"addWhitelistedCallbackContract",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_signer",internalType:"address",type:"address"}],name:"approveSigner",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_lender",internalType:"address",type:"address"},{name:"_minOfferId",internalType:"uint256",type:"uint256"}],name:"cancelAllOffers",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_lender",internalType:"address",type:"address"},{name:"_minRenegotiationId",internalType:"uint256",type:"uint256"}],name:"cancelAllRenegotiationOffers",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_lender",internalType:"address",type:"address"},{name:"_offerId",internalType:"uint256",type:"uint256"}],name:"cancelOffer",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_lender",internalType:"address",type:"address"},{name:"_offerIds",internalType:"uint256[]",type:"uint256[]"}],name:"cancelOffers",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_lender",internalType:"address",type:"address"},{name:"_renegotiationId",internalType:"uint256",type:"uint256"}],name:"cancelRenegotiationOffer",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_lender",internalType:"address",type:"address"},{name:"_renegotiationIds",internalType:"uint256[]",type:"uint256[]"}],name:"cancelRenegotiationOffers",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_loanOffer",internalType:"struct IBaseLoan.LoanOffer",type:"tuple",components:[{name:"offerId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"fee",internalType:"uint256",type:"uint256"},{name:"borrower",internalType:"address",type:"address"},{name:"capacity",internalType:"uint256",type:"uint256"},{name:"signer",internalType:"address",type:"address"},{name:"requiresLiquidation",internalType:"bool",type:"bool"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"},{name:"expirationTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"validators",internalType:"struct IBaseLoan.OfferValidator[]",type:"tuple[]",components:[{name:"validator",internalType:"address",type:"address"},{name:"arguments",internalType:"bytes",type:"bytes"}]}]},{name:"_tokenId",internalType:"uint256",type:"uint256"},{name:"_lenderOfferSignature",internalType:"bytes",type:"bytes"},{name:"_withCallback",internalType:"bool",type:"bool"}],name:"emitLoan",outputs:[{name:"",internalType:"uint256",type:"uint256"},{name:"",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"source",internalType:"struct IMultiSourceLoan.Source[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]}]}]},{stateMutability:"view",type:"function",inputs:[{name:"",internalType:"address",type:"address"}],name:"getApprovedSigner",outputs:[{name:"",internalType:"address",type:"address"}]},{stateMutability:"view",type:"function",inputs:[],name:"getCollectionManager",outputs:[{name:"",internalType:"address",type:"address"}]},{stateMutability:"view",type:"function",inputs:[],name:"getCurrencyManager",outputs:[{name:"",internalType:"address",type:"address"}]},{stateMutability:"view",type:"function",inputs:[],name:"getImprovementMinimum",outputs:[{name:"",internalType:"struct IBaseLoan.ImprovementMinimum",type:"tuple",components:[{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"interest",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"}]}]},{stateMutability:"view",type:"function",inputs:[],name:"getLiquidationAuctionDuration",outputs:[{name:"",internalType:"uint48",type:"uint48"}]},{stateMutability:"view",type:"function",inputs:[],name:"getLiquidator",outputs:[{name:"",internalType:"address",type:"address"}]},{stateMutability:"view",type:"function",inputs:[{name:"_loanId",internalType:"uint256",type:"uint256"}],name:"getLoanHash",outputs:[{name:"",internalType:"bytes32",type:"bytes32"}]},{stateMutability:"view",type:"function",inputs:[],name:"getMaxSources",outputs:[{name:"",internalType:"uint8",type:"uint8"}]},{stateMutability:"view",type:"function",inputs:[{name:"_loanPrincipal",internalType:"uint256",type:"uint256"}],name:"getMinSourcePrincipal",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"view",type:"function",inputs:[],name:"getPendingProtocolFee",outputs:[{name:"",internalType:"struct IBaseLoan.ProtocolFee",type:"tuple",components:[{name:"recipient",internalType:"address",type:"address"},{name:"fraction",internalType:"uint256",type:"uint256"}]}]},{stateMutability:"view",type:"function",inputs:[],name:"getPendingProtocolFeeSetTime",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"view",type:"function",inputs:[],name:"getProtocolFee",outputs:[{name:"",internalType:"struct IBaseLoan.ProtocolFee",type:"tuple",components:[{name:"recipient",internalType:"address",type:"address"},{name:"fraction",internalType:"uint256",type:"uint256"}]}]},{stateMutability:"view",type:"function",inputs:[],name:"getTotalLoansIssued",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"view",type:"function",inputs:[{name:"_lender",internalType:"address",type:"address"},{name:"_offerId",internalType:"uint256",type:"uint256"}],name:"getUsedCapacity",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"view",type:"function",inputs:[{name:"",internalType:"address",type:"address"},{name:"",internalType:"uint256",type:"uint256"}],name:"isOfferCancelled",outputs:[{name:"",internalType:"bool",type:"bool"}]},{stateMutability:"view",type:"function",inputs:[{name:"",internalType:"address",type:"address"},{name:"",internalType:"uint256",type:"uint256"}],name:"isRenegotiationOfferCancelled",outputs:[{name:"",internalType:"bool",type:"bool"}]},{stateMutability:"view",type:"function",inputs:[{name:"_contract",internalType:"address",type:"address"}],name:"isWhitelistedCallbackContract",outputs:[{name:"",internalType:"bool",type:"bool"}]},{stateMutability:"view",type:"function",inputs:[{name:"",internalType:"address",type:"address"}],name:"lenderMinOfferId",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"view",type:"function",inputs:[{name:"",internalType:"address",type:"address"}],name:"lenderMinRenegotiationOfferId",outputs:[{name:"",internalType:"uint256",type:"uint256"}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_loanId",internalType:"uint256",type:"uint256"},{name:"_loan",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"source",internalType:"struct IMultiSourceLoan.Source[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]}]}],name:"liquidateLoan",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_collateralAddress",internalType:"address",type:"address"},{name:"_collateralTokenId",internalType:"uint256",type:"uint256"},{name:"_loanId",internalType:"uint256",type:"uint256"},{name:"_repayment",internalType:"uint256",type:"uint256"},{name:"_loan",internalType:"bytes",type:"bytes"}],name:"loanLiquidated",outputs:[]},{stateMutability:"view",type:"function",inputs:[],name:"name",outputs:[{name:"",internalType:"string",type:"string"}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"",internalType:"address",type:"address"},{name:"",internalType:"address",type:"address"},{name:"",internalType:"uint256",type:"uint256"},{name:"",internalType:"bytes",type:"bytes"}],name:"onERC721Received",outputs:[{name:"",internalType:"bytes4",type:"bytes4"}]},{stateMutability:"view",type:"function",inputs:[],name:"owner",outputs:[{name:"",internalType:"address",type:"address"}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_renegotiationOffer",internalType:"struct IMultiSourceLoan.RenegotiationOffer",type:"tuple",components:[{name:"renegotiationId",internalType:"uint256",type:"uint256"},{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"fee",internalType:"uint256",type:"uint256"},{name:"signer",internalType:"address",type:"address"},{name:"targetPrincipal",internalType:"uint256[]",type:"uint256[]"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"},{name:"expirationTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"strictImprovement",internalType:"bool",type:"bool"}]},{name:"_loan",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"source",internalType:"struct IMultiSourceLoan.Source[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]}]},{name:"_renegotiationOfferSignature",internalType:"bytes",type:"bytes"}],name:"refinanceFull",outputs:[{name:"",internalType:"uint256",type:"uint256"},{name:"",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"source",internalType:"struct IMultiSourceLoan.Source[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]}]}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_renegotiationOffer",internalType:"struct IMultiSourceLoan.RenegotiationOffer",type:"tuple",components:[{name:"renegotiationId",internalType:"uint256",type:"uint256"},{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"fee",internalType:"uint256",type:"uint256"},{name:"signer",internalType:"address",type:"address"},{name:"targetPrincipal",internalType:"uint256[]",type:"uint256[]"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"},{name:"expirationTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"strictImprovement",internalType:"bool",type:"bool"}]},{name:"_loan",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"source",internalType:"struct IMultiSourceLoan.Source[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]}]}],name:"refinancePartial",outputs:[{name:"",internalType:"uint256",type:"uint256"},{name:"",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"source",internalType:"struct IMultiSourceLoan.Source[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]}]}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_renegotiationOffer",internalType:"struct IMultiSourceLoan.RenegotiationOffer[]",type:"tuple[]",components:[{name:"renegotiationId",internalType:"uint256",type:"uint256"},{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"fee",internalType:"uint256",type:"uint256"},{name:"signer",internalType:"address",type:"address"},{name:"targetPrincipal",internalType:"uint256[]",type:"uint256[]"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"},{name:"expirationTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"strictImprovement",internalType:"bool",type:"bool"}]},{name:"_loan",internalType:"struct IMultiSourceLoan.Loan[]",type:"tuple[]",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"source",internalType:"struct IMultiSourceLoan.Source[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]}]}],name:"refinancePartialBatch",outputs:[{name:"loanId",internalType:"uint256[]",type:"uint256[]"},{name:"loans",internalType:"struct IMultiSourceLoan.Loan[]",type:"tuple[]",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"source",internalType:"struct IMultiSourceLoan.Source[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]}]}]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_contract",internalType:"address",type:"address"}],name:"removeWhitelistedCallbackContract",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_collateralTo",internalType:"address",type:"address"},{name:"_loanId",internalType:"uint256",type:"uint256"},{name:"_loan",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"source",internalType:"struct IMultiSourceLoan.Source[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]}]},{name:"_withCallback",internalType:"bool",type:"bool"}],name:"repayLoan",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"maxSources",internalType:"uint8",type:"uint8"}],name:"setMaxSources",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[],name:"setProtocolFee",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"newOwner",internalType:"address",type:"address"}],name:"transferOwnership",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_newMinimum",internalType:"struct IBaseLoan.ImprovementMinimum",type:"tuple",components:[{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"interest",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"}]}],name:"updateImprovementMinimum",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_newDuration",internalType:"uint48",type:"uint48"}],name:"updateLiquidationAuctionDuration",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"loanLiquidator",internalType:"contract ILoanLiquidator",type:"address"}],name:"updateLiquidationContract",outputs:[]},{stateMutability:"nonpayable",type:"function",inputs:[{name:"_newProtocolFee",internalType:"struct IBaseLoan.ProtocolFee",type:"tuple",components:[{name:"recipient",internalType:"address",type:"address"},{name:"fraction",internalType:"uint256",type:"uint256"}]}],name:"updateProtocolFee",outputs:[]}];import{createPublicClient as on,createTransport as ln,getContract as yn}from"viem";var b=class{abi;address;bcClient;wallet;contract;safeContractWrite;constructor({walletClient:e,address:t,abi:n}){this.wallet=e;let a=on({transport:()=>ln(e.transport)});this.bcClient=a,this.address=t,this.abi=n,this.contract=yn({address:this.address,abi:this.abi,walletClient:e,publicClient:this.bcClient}),this.safeContractWrite=new Proxy({},{get(i,r){return async(s,o={})=>{let{request:l}=await a.simulateContract({address:t,abi:n,functionName:r,args:s,account:e.account,...o});return e.writeContract(l)}}})}};y(b,"BaseContract");var Ie=class extends b{constructor({walletClient:e}){let{AuctionLoanLiquidator:{v4:t}}=I(e.chain);super({walletClient:e,address:t,abi:Xe})}async placeBid({collectionContractAddress:e,tokenId:t,bid:n}){let a=await this.safeContractWrite.placeBid([e,t,n]);return{txHash:a,waitTxInBlock:async()=>{let i=await this.bcClient.waitForTransactionReceipt({hash:a}),r=await this.contract.createEventFilter.BidPlaced(),s=d(i,r);if(s.length===0)throw new Error("Bid not placed");return{...s[0].args,...i}}}}getRemainingLockupSeconds(){return 0}async settleAuctionWithBuyout(){throw new Error("Not implemented for V1")}async settleAuction({loan:e}){let t={...e,source:e.source.map(a=>[Number(a.loanId),a.lender,a.principalAmount,a.accruedInterest,a.startTime,a.aprBps])},n=await this.safeContractWrite.settleAuction([e.nftCollateralAddress,e.nftCollateralTokenId,dn(Ie.LOAN_SETTLEMENT_ENCODE_TYPES,[t])]);return{txHash:n,waitTxInBlock:async()=>{let a=await this.bcClient.waitForTransactionReceipt({hash:n}),i=await this.contract.createEventFilter.AuctionSettled(),r=d(a,i);if(r.length===0)throw new Error("Auction not settled");return{...r[0].args,...a}}}}},N=Ie;y(N,"AllV4"),he(N,"LOAN_SETTLEMENT_ENCODE_TYPES",[{name:"",type:"tuple",components:[{name:"borrower",type:"address"},{name:"nftCollateralTokenId",type:"uint256"},{name:"nftCollateralAddress",type:"address"},{name:"principalAddress",type:"address"},{name:"principalAmount",type:"uint256"},{name:"startTime",type:"uint256"},{name:"duration",type:"uint256"},{name:"source",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]}]}]);var Q=class extends b{constructor({walletClient:e}){let{AuctionLoanLiquidator:{v5:t}}=I(e.chain);super({walletClient:e,address:t,abi:Ke})}async placeBid({collectionContractAddress:e,tokenId:t,bid:n,auction:a}){let i=await this.safeContractWrite.placeBid([e,t,a,n]);return{txHash:i,waitTxInBlock:async()=>{let r=await this.bcClient.waitForTransactionReceipt({hash:i}),s=await this.contract.createEventFilter.BidPlaced(),o=d(r,s);if(o.length===0)throw new Error("Bid not placed");return{...o[0].args,...r}}}}getRemainingLockupSeconds(){return 0}async settleAuctionWithBuyout(){throw new Error("Not implemented for V2")}async settleAuction({auction:e,loan:t}){let n=await this.safeContractWrite.settleAuction([e,t]);return{txHash:n,waitTxInBlock:async()=>{let a=await this.bcClient.waitForTransactionReceipt({hash:n}),i=await this.contract.createEventFilter.AuctionSettled(),r=d(a,i);if(r.length===0)throw new Error("Auction not settled");return{...r[0].args,...a}}}}};y(Q,"AllV5");var Ye=[{type:"constructor",inputs:[{name:"liquidationDistributor",internalType:"address",type:"address"},{name:"currencyManager",internalType:"address",type:"address"},{name:"collectionManager",internalType:"address",type:"address"},{name:"loanManagerRegistry",internalType:"address",type:"address"},{name:"triggerFee",internalType:"uint256",type:"uint256"},{name:"maxExtension",internalType:"uint96",type:"uint96"},{name:"timeForMainLenderToBuy",internalType:"uint256",type:"uint256"}],stateMutability:"nonpayable"},{type:"error",inputs:[],name:"AddressZeroError"},{type:"error",inputs:[],name:"AuctionAlreadyInProgressError"},{type:"error",inputs:[{name:"_expiration",internalType:"uint96",type:"uint96"}],name:"AuctionNotOverError"},{type:"error",inputs:[{name:"_expiration",internalType:"uint96",type:"uint96"}],name:"AuctionOverError"},{type:"error",inputs:[],name:"CollectionNotWhitelistedError"},{type:"error",inputs:[],name:"CouldNotModifyValidLoansError"},{type:"error",inputs:[],name:"CurrencyNotWhitelistedError"},{type:"error",inputs:[],name:"InvalidHashAuctionError"},{type:"error",inputs:[],name:"InvalidInputError"},{type:"error",inputs:[{name:"triggerFee",internalType:"uint256",type:"uint256"}],name:"InvalidTriggerFee"},{type:"error",inputs:[{name:"_loan",internalType:"address",type:"address"}],name:"LoanNotAcceptedError"},{type:"error",inputs:[{name:"_minBid",internalType:"uint256",type:"uint256"}],name:"MinBidError"},{type:"error",inputs:[{name:"_owner",internalType:"address",type:"address"}],name:"NFTNotOwnedError"},{type:"error",inputs:[],name:"NoBidsError"},{type:"error",inputs:[],name:"NotMainLenderError"},{type:"error",inputs:[{name:"timeLimit",internalType:"uint256",type:"uint256"}],name:"OptionToBuyExpiredError"},{type:"error",inputs:[{name:"timeLimit",internalType:"uint256",type:"uint256"}],name:"OptionToBuyStilValidError"},{type:"event",anonymous:!1,inputs:[{name:"loanContract",internalType:"address",type:"address",indexed:!1},{name:"loanId",internalType:"uint256",type:"uint256",indexed:!1},{name:"collection",internalType:"address",type:"address",indexed:!1},{name:"tokenId",internalType:"uint256",type:"uint256",indexed:!1},{name:"asset",internalType:"address",type:"address",indexed:!1},{name:"proceeds",internalType:"uint256",type:"uint256",indexed:!1},{name:"settler",internalType:"address",type:"address",indexed:!1},{name:"triggerFee",internalType:"uint256",type:"uint256",indexed:!1}],name:"AuctionSettled"},{type:"event",anonymous:!1,inputs:[{name:"loanAddress",internalType:"address",type:"address",indexed:!1},{name:"loanId",internalType:"uint256",type:"uint256",indexed:!1},{name:"nftAddress",internalType:"address",type:"address",indexed:!1},{name:"tokenId",internalType:"uint256",type:"uint256",indexed:!1},{name:"largestTrancheIdx",internalType:"uint256",type:"uint256",indexed:!1}],name:"AuctionSettledWithBuyout"},{type:"event",anonymous:!1,inputs:[{name:"collection",internalType:"address",type:"address",indexed:!1},{name:"tokenId",internalType:"uint256",type:"uint256",indexed:!1},{name:"newBidder",internalType:"address",type:"address",indexed:!1},{name:"bid",internalType:"uint256",type:"uint256",indexed:!1},{name:"loanAddress",internalType:"address",type:"address",indexed:!1},{name:"loanId",internalType:"uint256",type:"uint256",indexed:!1}],name:"BidPlaced"},{type:"event",anonymous:!1,inputs:[{name:"liquidationDistributor",internalType:"address",type:"address",indexed:!1}],name:"LiquidationDistributorUpdated"},{type:"event",anonymous:!1,inputs:[{name:"loan",internalType:"address",type:"address",indexed:!1}],name:"LoanContractAdded"},{type:"event",anonymous:!1,inputs:[{name:"loan",internalType:"address",type:"address",indexed:!1}],name:"LoanContractRemoved"},{type:"event",anonymous:!1,inputs:[{name:"collection",internalType:"address",type:"address",indexed:!1},{name:"tokenId",internalType:"uint256",type:"uint256",indexed:!1},{name:"auction",internalType:"struct IAuctionLoanLiquidator.Auction",type:"tuple",components:[{name:"loanAddress",internalType:"address",type:"address"},{name:"loanId",internalType:"uint256",type:"uint256"},{name:"highestBid",internalType:"uint256",type:"uint256"},{name:"triggerFee",internalType:"uint256",type:"uint256"},{name:"minBid",internalType:"uint256",type:"uint256"},{name:"highestBidder",internalType:"address",type:"address"},{name:"duration",internalType:"uint96",type:"uint96"},{name:"asset",internalType:"address",type:"address"},{name:"startTime",internalType:"uint96",type:"uint96"},{name:"originator",internalType:"address",type:"address"},{name:"lastBidTime",internalType:"uint96",type:"uint96"}],indexed:!1}],name:"LoanLiquidationStarted"},{type:"event",anonymous:!1,inputs:[{name:"user",internalType:"address",type:"address",indexed:!0},{name:"newOwner",internalType:"address",type:"address",indexed:!0}],name:"OwnershipTransferred"},{type:"event",anonymous:!1,inputs:[{name:"timeForMainLenderToBuy",internalType:"uint256",type:"uint256",indexed:!1}],name:"TimeForMainLenderToBuyUpdated"},{type:"event",anonymous:!1,inputs:[{name:"triggerFee",internalType:"uint256",type:"uint256",indexed:!1}],name:"TriggerFeeUpdated"},{type:"function",inputs:[],name:"MAX_TIME_FOR_MAIN_LENDER_TO_BUY",outputs:[{name:"",internalType:"uint256",type:"uint256"}],stateMutability:"view"},{type:"function",inputs:[],name:"MAX_TRIGGER_FEE",outputs:[{name:"",internalType:"uint256",type:"uint256"}],stateMutability:"view"},{type:"function",inputs:[],name:"MIN_INCREMENT_BPS",outputs:[{name:"",internalType:"uint256",type:"uint256"}],stateMutability:"view"},{type:"function",inputs:[{name:"_loanContract",internalType:"address",type:"address"}],name:"addLoanContract",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"_nftAddress",internalType:"address",type:"address"},{name:"_tokenId",internalType:"uint256",type:"uint256"}],name:"getAuctionHash",outputs:[{name:"",internalType:"bytes32",type:"bytes32"}],stateMutability:"view"},{type:"function",inputs:[],name:"getLiquidationDistributor",outputs:[{name:"",internalType:"address",type:"address"}],stateMutability:"view"},{type:"function",inputs:[],name:"getLoanManagerRegistry",outputs:[{name:"",internalType:"contract ILoanManagerRegistry",type:"address"}],stateMutability:"view"},{type:"function",inputs:[],name:"getMaxExtension",outputs:[{name:"",internalType:"uint96",type:"uint96"}],stateMutability:"view"},{type:"function",inputs:[],name:"getTimeForMainLenderToBuy",outputs:[{name:"",internalType:"uint256",type:"uint256"}],stateMutability:"view"},{type:"function",inputs:[],name:"getTriggerFee",outputs:[{name:"",internalType:"uint256",type:"uint256"}],stateMutability:"view"},{type:"function",inputs:[],name:"getValidLoanContracts",outputs:[{name:"",internalType:"address[]",type:"address[]"}],stateMutability:"view"},{type:"function",inputs:[{name:"_loanId",internalType:"uint256",type:"uint256"},{name:"_nftAddress",internalType:"address",type:"address"},{name:"_tokenId",internalType:"uint256",type:"uint256"},{name:"_asset",internalType:"address",type:"address"},{name:"_duration",internalType:"uint96",type:"uint96"},{name:"_minBid",internalType:"uint256",type:"uint256"},{name:"_originator",internalType:"address",type:"address"}],name:"liquidateLoan",outputs:[{name:"",internalType:"bytes",type:"bytes"}],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"",internalType:"address",type:"address"},{name:"",internalType:"address",type:"address"},{name:"",internalType:"uint256",type:"uint256"},{name:"",internalType:"bytes",type:"bytes"}],name:"onERC721Received",outputs:[{name:"",internalType:"bytes4",type:"bytes4"}],stateMutability:"nonpayable"},{type:"function",inputs:[],name:"owner",outputs:[{name:"",internalType:"address",type:"address"}],stateMutability:"view"},{type:"function",inputs:[{name:"_nftAddress",internalType:"address",type:"address"},{name:"_tokenId",internalType:"uint256",type:"uint256"},{name:"_auction",internalType:"struct IAuctionLoanLiquidator.Auction",type:"tuple",components:[{name:"loanAddress",internalType:"address",type:"address"},{name:"loanId",internalType:"uint256",type:"uint256"},{name:"highestBid",internalType:"uint256",type:"uint256"},{name:"triggerFee",internalType:"uint256",type:"uint256"},{name:"minBid",internalType:"uint256",type:"uint256"},{name:"highestBidder",internalType:"address",type:"address"},{name:"duration",internalType:"uint96",type:"uint96"},{name:"asset",internalType:"address",type:"address"},{name:"startTime",internalType:"uint96",type:"uint96"},{name:"originator",internalType:"address",type:"address"},{name:"lastBidTime",internalType:"uint96",type:"uint96"}]},{name:"_bid",internalType:"uint256",type:"uint256"}],name:"placeBid",outputs:[{name:"",internalType:"struct IAuctionLoanLiquidator.Auction",type:"tuple",components:[{name:"loanAddress",internalType:"address",type:"address"},{name:"loanId",internalType:"uint256",type:"uint256"},{name:"highestBid",internalType:"uint256",type:"uint256"},{name:"triggerFee",internalType:"uint256",type:"uint256"},{name:"minBid",internalType:"uint256",type:"uint256"},{name:"highestBidder",internalType:"address",type:"address"},{name:"duration",internalType:"uint96",type:"uint96"},{name:"asset",internalType:"address",type:"address"},{name:"startTime",internalType:"uint96",type:"uint96"},{name:"originator",internalType:"address",type:"address"},{name:"lastBidTime",internalType:"uint96",type:"uint96"}]}],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"_loanContract",internalType:"address",type:"address"}],name:"removeLoanContract",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"__timeForMainLenderToBuy",internalType:"uint256",type:"uint256"}],name:"setTimeForMainLenderToBuy",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"_auction",internalType:"struct IAuctionLoanLiquidator.Auction",type:"tuple",components:[{name:"loanAddress",internalType:"address",type:"address"},{name:"loanId",internalType:"uint256",type:"uint256"},{name:"highestBid",internalType:"uint256",type:"uint256"},{name:"triggerFee",internalType:"uint256",type:"uint256"},{name:"minBid",internalType:"uint256",type:"uint256"},{name:"highestBidder",internalType:"address",type:"address"},{name:"duration",internalType:"uint96",type:"uint96"},{name:"asset",internalType:"address",type:"address"},{name:"startTime",internalType:"uint96",type:"uint96"},{name:"originator",internalType:"address",type:"address"},{name:"lastBidTime",internalType:"uint96",type:"uint96"}]},{name:"_loan",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"tranche",internalType:"struct IMultiSourceLoan.Tranche[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"floor",internalType:"uint256",type:"uint256"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]},{name:"protocolFee",internalType:"uint256",type:"uint256"}]}],name:"settleAuction",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"_nftAddress",internalType:"address",type:"address"},{name:"_tokenId",internalType:"uint256",type:"uint256"},{name:"_auction",internalType:"struct IAuctionLoanLiquidator.Auction",type:"tuple",components:[{name:"loanAddress",internalType:"address",type:"address"},{name:"loanId",internalType:"uint256",type:"uint256"},{name:"highestBid",internalType:"uint256",type:"uint256"},{name:"triggerFee",internalType:"uint256",type:"uint256"},{name:"minBid",internalType:"uint256",type:"uint256"},{name:"highestBidder",internalType:"address",type:"address"},{name:"duration",internalType:"uint96",type:"uint96"},{name:"asset",internalType:"address",type:"address"},{name:"startTime",internalType:"uint96",type:"uint96"},{name:"originator",internalType:"address",type:"address"},{name:"lastBidTime",internalType:"uint96",type:"uint96"}]},{name:"_loan",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"tranche",internalType:"struct IMultiSourceLoan.Tranche[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"floor",internalType:"uint256",type:"uint256"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]},{name:"protocolFee",internalType:"uint256",type:"uint256"}]}],name:"settleWithBuyout",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"newOwner",internalType:"address",type:"address"}],name:"transferOwnership",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"__liquidationDistributor",internalType:"address",type:"address"}],name:"updateLiquidationDistributor",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"triggerFee",internalType:"uint256",type:"uint256"}],name:"updateTriggerFee",outputs:[],stateMutability:"nonpayable"}];var P=[{type:"constructor",inputs:[{name:"loanLiquidator",internalType:"address",type:"address"},{name:"protocolFee",internalType:"struct WithProtocolFee.ProtocolFee",type:"tuple",components:[{name:"recipient",internalType:"address",type:"address"},{name:"fraction",internalType:"uint256",type:"uint256"}]},{name:"currencyManager",internalType:"address",type:"address"},{name:"collectionManager",internalType:"address",type:"address"},{name:"maxTranches",internalType:"uint256",type:"uint256"},{name:"minLockPeriod",internalType:"uint256",type:"uint256"},{name:"delegateRegistry",internalType:"address",type:"address"},{name:"loanManagerRegistry",internalType:"address",type:"address"},{name:"flashActionContract",internalType:"address",type:"address"},{name:"minWaitTime",internalType:"uint256",type:"uint256"}],stateMutability:"nonpayable"},{type:"error",inputs:[],name:"AddressZeroError"},{type:"error",inputs:[{name:"_lender",internalType:"address",type:"address"},{name:"_offerId",internalType:"uint256",type:"uint256"}],name:"CancelledOrExecutedOfferError"},{type:"error",inputs:[],name:"CollectionNotWhitelistedError"},{type:"error",inputs:[],name:"CurrencyNotWhitelistedError"},{type:"error",inputs:[],name:"ECDSAInvalidSignature"},{type:"error",inputs:[{name:"length",internalType:"uint256",type:"uint256"}],name:"ECDSAInvalidSignatureLength"},{type:"error",inputs:[{name:"s",internalType:"bytes32",type:"bytes32"}],name:"ECDSAInvalidSignatureS"},{type:"error",inputs:[{name:"_expirationTime",internalType:"uint256",type:"uint256"}],name:"ExpiredOfferError"},{type:"error",inputs:[],name:"InvalidAddressesError"},{type:"error",inputs:[{name:"_amount",internalType:"uint256",type:"uint256"},{name:"_principalAmount",internalType:"uint256",type:"uint256"}],name:"InvalidAmountError"},{type:"error",inputs:[],name:"InvalidCallbackError"},{type:"error",inputs:[],name:"InvalidCallerError"},{type:"error",inputs:[],name:"InvalidCollateralIdError"},{type:"error",inputs:[],name:"InvalidDurationError"},{type:"error",inputs:[],name:"InvalidInputError"},{type:"error",inputs:[{name:"_loanId",internalType:"uint256",type:"uint256"}],name:"InvalidLoanError"},{type:"error",inputs:[],name:"InvalidMethodError"},{type:"error",inputs:[],name:"InvalidParametersError"},{type:"error",inputs:[],name:"InvalidRenegotiationOfferError"},{type:"error",inputs:[],name:"InvalidSignatureError"},{type:"error",inputs:[],name:"InvalidTrancheError"},{type:"error",inputs:[{name:"_liquidator",internalType:"address",type:"address"}],name:"LiquidatorOnlyError"},{type:"error",inputs:[],name:"LoanExpiredError"},{type:"error",inputs:[],name:"LoanLockedError"},{type:"error",inputs:[{name:"_expirationTime",internalType:"uint256",type:"uint256"}],name:"LoanNotDueError"},{type:"error",inputs:[{name:"_lender",internalType:"address",type:"address"},{name:"_newMinOfferId",internalType:"uint256",type:"uint256"},{name:"_minOfferId",internalType:"uint256",type:"uint256"}],name:"LowOfferIdError"},{type:"error",inputs:[{name:"_lender",internalType:"address",type:"address"},{name:"_newMinRenegotiationOfferId",internalType:"uint256",type:"uint256"},{name:"_minOfferId",internalType:"uint256",type:"uint256"}],name:"LowRenegotiationOfferIdError"},{type:"error",inputs:[],name:"MaxCapacityExceededError"},{type:"error",inputs:[],name:"MismatchError"},{type:"error",inputs:[{name:"i",internalType:"uint256",type:"uint256"},{name:"returndata",internalType:"bytes",type:"bytes"}],name:"MulticallFailed"},{type:"error",inputs:[],name:"NFTNotReturnedError"},{type:"error",inputs:[],name:"NotStrictlyImprovedError"},{type:"error",inputs:[{name:"_pendingProtocolFeeSetTime",internalType:"uint256",type:"uint256"}],name:"TooEarlyError"},{type:"error",inputs:[],name:"TooManyTranchesError"},{type:"error",inputs:[],name:"TooSoonError"},{type:"error",inputs:[{name:"minTimestamp",internalType:"uint256",type:"uint256"}],name:"TrancheCannotBeRefinancedError"},{type:"error",inputs:[],name:"ZeroInterestError"},{type:"event",anonymous:!1,inputs:[{name:"lender",internalType:"address",type:"address",indexed:!1},{name:"minOfferId",internalType:"uint256",type:"uint256",indexed:!1}],name:"AllOffersCancelled"},{type:"event",anonymous:!1,inputs:[{name:"loanId",internalType:"uint256",type:"uint256",indexed:!1},{name:"delegate",internalType:"address",type:"address",indexed:!1},{name:"value",internalType:"bool",type:"bool",indexed:!1}],name:"Delegated"},{type:"event",anonymous:!1,inputs:[{name:"newFlashActionContract",internalType:"address",type:"address",indexed:!1}],name:"FlashActionContractUpdated"},{type:"event",anonymous:!1,inputs:[{name:"loanId",internalType:"uint256",type:"uint256",indexed:!1},{name:"target",internalType:"address",type:"address",indexed:!1},{name:"data",internalType:"bytes",type:"bytes",indexed:!1}],name:"FlashActionExecuted"},{type:"event",anonymous:!1,inputs:[{name:"newDuration",internalType:"uint256",type:"uint256",indexed:!1}],name:"LiquidationAuctionDurationUpdated"},{type:"event",anonymous:!1,inputs:[{name:"liquidator",internalType:"address",type:"address",indexed:!1}],name:"LiquidationContractUpdated"},{type:"event",anonymous:!1,inputs:[{name:"loanId",internalType:"uint256",type:"uint256",indexed:!1},{name:"offerId",internalType:"uint256[]",type:"uint256[]",indexed:!1},{name:"loan",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"tranche",internalType:"struct IMultiSourceLoan.Tranche[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"floor",internalType:"uint256",type:"uint256"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]},{name:"protocolFee",internalType:"uint256",type:"uint256"}],indexed:!1},{name:"fee",internalType:"uint256",type:"uint256",indexed:!1}],name:"LoanEmitted"},{type:"event",anonymous:!1,inputs:[{name:"loanId",internalType:"uint256",type:"uint256",indexed:!1}],name:"LoanForeclosed"},{type:"event",anonymous:!1,inputs:[{name:"loanId",internalType:"uint256",type:"uint256",indexed:!1}],name:"LoanLiquidated"},{type:"event",anonymous:!1,inputs:[{name:"renegotiationId",internalType:"uint256",type:"uint256",indexed:!1},{name:"oldLoanId",internalType:"uint256",type:"uint256",indexed:!1},{name:"newLoanId",internalType:"uint256",type:"uint256",indexed:!1},{name:"loan",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"tranche",internalType:"struct IMultiSourceLoan.Tranche[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"floor",internalType:"uint256",type:"uint256"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]},{name:"protocolFee",internalType:"uint256",type:"uint256"}],indexed:!1},{name:"fee",internalType:"uint256",type:"uint256",indexed:!1}],name:"LoanRefinanced"},{type:"event",anonymous:!1,inputs:[{name:"loanId",internalType:"uint256",type:"uint256",indexed:!1},{name:"newLoanId",internalType:"uint256",type:"uint256",indexed:!1},{name:"loan",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"tranche",internalType:"struct IMultiSourceLoan.Tranche[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"floor",internalType:"uint256",type:"uint256"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]},{name:"protocolFee",internalType:"uint256",type:"uint256"}],indexed:!1},{name:"offerIds",internalType:"uint256[]",type:"uint256[]",indexed:!1},{name:"totalFee",internalType:"uint256",type:"uint256",indexed:!1}],name:"LoanRefinancedFromNewOffers"},{type:"event",anonymous:!1,inputs:[{name:"loanId",internalType:"uint256",type:"uint256",indexed:!1},{name:"totalRepayment",internalType:"uint256",type:"uint256",indexed:!1},{name:"fee",internalType:"uint256",type:"uint256",indexed:!1}],name:"LoanRepaid"},{type:"event",anonymous:!1,inputs:[{name:"loanId",internalType:"uint256",type:"uint256",indexed:!1},{name:"liquidator",internalType:"address",type:"address",indexed:!1}],name:"LoanSentToLiquidator"},{type:"event",anonymous:!1,inputs:[{name:"_minimum",internalType:"uint256",type:"uint256",indexed:!1}],name:"MinAprImprovementUpdated"},{type:"event",anonymous:!1,inputs:[{name:"newMinBid",internalType:"uint256",type:"uint256",indexed:!1}],name:"MinBidLiquidationUpdated"},{type:"event",anonymous:!1,inputs:[{name:"minLockPeriod",internalType:"uint256",type:"uint256",indexed:!1}],name:"MinLockPeriodUpdated"},{type:"event",anonymous:!1,inputs:[{name:"lender",internalType:"address",type:"address",indexed:!1},{name:"offerId",internalType:"uint256",type:"uint256",indexed:!1}],name:"OfferCancelled"},{type:"event",anonymous:!1,inputs:[{name:"user",internalType:"address",type:"address",indexed:!0},{name:"newOwner",internalType:"address",type:"address",indexed:!0}],name:"OwnershipTransferred"},{type:"event",anonymous:!1,inputs:[{name:"fee",internalType:"struct WithProtocolFee.ProtocolFee",type:"tuple",components:[{name:"recipient",internalType:"address",type:"address"},{name:"fraction",internalType:"uint256",type:"uint256"}],indexed:!1}],name:"ProtocolFeePendingUpdate"},{type:"event",anonymous:!1,inputs:[{name:"fee",internalType:"struct WithProtocolFee.ProtocolFee",type:"tuple",components:[{name:"recipient",internalType:"address",type:"address"},{name:"fraction",internalType:"uint256",type:"uint256"}],indexed:!1}],name:"ProtocolFeeUpdated"},{type:"event",anonymous:!1,inputs:[{name:"lender",internalType:"address",type:"address",indexed:!1},{name:"renegotiationId",internalType:"uint256",type:"uint256",indexed:!1}],name:"RenegotiationOfferCancelled"},{type:"event",anonymous:!1,inputs:[{name:"delegate",internalType:"address",type:"address",indexed:!1},{name:"collection",internalType:"address",type:"address",indexed:!1},{name:"tokenId",internalType:"uint256",type:"uint256",indexed:!1}],name:"RevokeDelegate"},{type:"event",anonymous:!1,inputs:[{name:"newOwner",internalType:"address",type:"address",indexed:!1}],name:"TransferOwnerRequested"},{type:"event",anonymous:!1,inputs:[{name:"contractAdded",internalType:"address",type:"address",indexed:!1}],name:"WhitelistedCallbackContractAdded"},{type:"event",anonymous:!1,inputs:[{name:"contractRemoved",internalType:"address",type:"address",indexed:!1}],name:"WhitelistedCallbackContractRemoved"},{type:"function",inputs:[],name:"DOMAIN_SEPARATOR",outputs:[{name:"",internalType:"bytes32",type:"bytes32"}],stateMutability:"view"},{type:"function",inputs:[],name:"FEE_UPDATE_NOTICE",outputs:[{name:"",internalType:"uint256",type:"uint256"}],stateMutability:"view"},{type:"function",inputs:[],name:"INITIAL_DOMAIN_SEPARATOR",outputs:[{name:"",internalType:"bytes32",type:"bytes32"}],stateMutability:"view"},{type:"function",inputs:[],name:"MAX_AUCTION_DURATION",outputs:[{name:"",internalType:"uint48",type:"uint48"}],stateMutability:"view"},{type:"function",inputs:[],name:"MIN_AUCTION_DURATION",outputs:[{name:"",internalType:"uint48",type:"uint48"}],stateMutability:"view"},{type:"function",inputs:[],name:"MIN_BID_LIQUIDATION",outputs:[{name:"",internalType:"uint256",type:"uint256"}],stateMutability:"view"},{type:"function",inputs:[],name:"MIN_WAIT_TIME",outputs:[{name:"",internalType:"uint256",type:"uint256"}],stateMutability:"view"},{type:"function",inputs:[],name:"VERSION",outputs:[{name:"",internalType:"bytes",type:"bytes"}],stateMutability:"view"},{type:"function",inputs:[{name:"_renegotiationOffer",internalType:"struct IMultiSourceLoan.RenegotiationOffer",type:"tuple",components:[{name:"renegotiationId",internalType:"uint256",type:"uint256"},{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"fee",internalType:"uint256",type:"uint256"},{name:"trancheIndex",internalType:"uint256[]",type:"uint256[]"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"},{name:"expirationTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"}]},{name:"_loan",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"tranche",internalType:"struct IMultiSourceLoan.Tranche[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"floor",internalType:"uint256",type:"uint256"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]},{name:"protocolFee",internalType:"uint256",type:"uint256"}]},{name:"_renegotiationOfferSignature",internalType:"bytes",type:"bytes"}],name:"addNewTranche",outputs:[{name:"",internalType:"uint256",type:"uint256"},{name:"",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"tranche",internalType:"struct IMultiSourceLoan.Tranche[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"floor",internalType:"uint256",type:"uint256"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]},{name:"protocolFee",internalType:"uint256",type:"uint256"}]}],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"_contract",internalType:"address",type:"address"}],name:"addWhitelistedCallbackContract",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"_minOfferId",internalType:"uint256",type:"uint256"}],name:"cancelAllOffers",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"_offerId",internalType:"uint256",type:"uint256"}],name:"cancelOffer",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"_renegotiationId",internalType:"uint256",type:"uint256"}],name:"cancelRenegotiationOffer",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"_loanId",internalType:"uint256",type:"uint256"},{name:"loan",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"tranche",internalType:"struct IMultiSourceLoan.Tranche[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"floor",internalType:"uint256",type:"uint256"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]},{name:"protocolFee",internalType:"uint256",type:"uint256"}]},{name:"_delegate",internalType:"address",type:"address"},{name:"_rights",internalType:"bytes32",type:"bytes32"},{name:"_value",internalType:"bool",type:"bool"}],name:"delegate",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"_loanExecutionData",internalType:"struct IMultiSourceLoan.LoanExecutionData",type:"tuple",components:[{name:"executionData",internalType:"struct IMultiSourceLoan.ExecutionData",type:"tuple",components:[{name:"offerExecution",internalType:"struct IMultiSourceLoan.OfferExecution[]",type:"tuple[]",components:[{name:"offer",internalType:"struct IMultiSourceLoan.LoanOffer",type:"tuple",components:[{name:"offerId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"fee",internalType:"uint256",type:"uint256"},{name:"capacity",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"},{name:"expirationTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"maxSeniorRepayment",internalType:"uint256",type:"uint256"},{name:"validators",internalType:"struct IBaseLoan.OfferValidator[]",type:"tuple[]",components:[{name:"validator",internalType:"address",type:"address"},{name:"arguments",internalType:"bytes",type:"bytes"}]}]},{name:"amount",internalType:"uint256",type:"uint256"},{name:"lenderOfferSignature",internalType:"bytes",type:"bytes"}]},{name:"tokenId",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"expirationTime",internalType:"uint256",type:"uint256"},{name:"principalReceiver",internalType:"address",type:"address"},{name:"callbackData",internalType:"bytes",type:"bytes"}]},{name:"borrower",internalType:"address",type:"address"},{name:"borrowerOfferSignature",internalType:"bytes",type:"bytes"}]}],name:"emitLoan",outputs:[{name:"",internalType:"uint256",type:"uint256"},{name:"",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"tranche",internalType:"struct IMultiSourceLoan.Tranche[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"floor",internalType:"uint256",type:"uint256"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]},{name:"protocolFee",internalType:"uint256",type:"uint256"}]}],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"_loanId",internalType:"uint256",type:"uint256"},{name:"_loan",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"tranche",internalType:"struct IMultiSourceLoan.Tranche[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"floor",internalType:"uint256",type:"uint256"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]},{name:"protocolFee",internalType:"uint256",type:"uint256"}]},{name:"_target",internalType:"address",type:"address"},{name:"_data",internalType:"bytes",type:"bytes"}],name:"executeFlashAction",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[],name:"getCollectionManager",outputs:[{name:"",internalType:"address",type:"address"}],stateMutability:"view"},{type:"function",inputs:[],name:"getCurrencyManager",outputs:[{name:"",internalType:"address",type:"address"}],stateMutability:"view"},{type:"function",inputs:[],name:"getDelegateRegistry",outputs:[{name:"",internalType:"address",type:"address"}],stateMutability:"view"},{type:"function",inputs:[],name:"getFlashActionContract",outputs:[{name:"",internalType:"address",type:"address"}],stateMutability:"view"},{type:"function",inputs:[],name:"getLiquidationAuctionDuration",outputs:[{name:"",internalType:"uint48",type:"uint48"}],stateMutability:"view"},{type:"function",inputs:[],name:"getLiquidator",outputs:[{name:"",internalType:"address",type:"address"}],stateMutability:"view"},{type:"function",inputs:[{name:"_loanId",internalType:"uint256",type:"uint256"}],name:"getLoanHash",outputs:[{name:"",internalType:"bytes32",type:"bytes32"}],stateMutability:"view"},{type:"function",inputs:[],name:"getLoanManagerRegistry",outputs:[{name:"",internalType:"contract ILoanManagerRegistry",type:"address"}],stateMutability:"view"},{type:"function",inputs:[],name:"getMaxTranches",outputs:[{name:"",internalType:"uint256",type:"uint256"}],stateMutability:"view"},{type:"function",inputs:[],name:"getMinImprovementApr",outputs:[{name:"",internalType:"uint256",type:"uint256"}],stateMutability:"view"},{type:"function",inputs:[],name:"getMinLockPeriod",outputs:[{name:"",internalType:"uint256",type:"uint256"}],stateMutability:"view"},{type:"function",inputs:[],name:"getPendingProtocolFee",outputs:[{name:"",internalType:"struct WithProtocolFee.ProtocolFee",type:"tuple",components:[{name:"recipient",internalType:"address",type:"address"},{name:"fraction",internalType:"uint256",type:"uint256"}]}],stateMutability:"view"},{type:"function",inputs:[],name:"getPendingProtocolFeeSetTime",outputs:[{name:"",internalType:"uint256",type:"uint256"}],stateMutability:"view"},{type:"function",inputs:[],name:"getProtocolFee",outputs:[{name:"",internalType:"struct WithProtocolFee.ProtocolFee",type:"tuple",components:[{name:"recipient",internalType:"address",type:"address"},{name:"fraction",internalType:"uint256",type:"uint256"}]}],stateMutability:"view"},{type:"function",inputs:[],name:"getTotalLoansIssued",outputs:[{name:"",internalType:"uint256",type:"uint256"}],stateMutability:"view"},{type:"function",inputs:[{name:"_lender",internalType:"address",type:"address"},{name:"_offerId",internalType:"uint256",type:"uint256"}],name:"getUsedCapacity",outputs:[{name:"",internalType:"uint256",type:"uint256"}],stateMutability:"view"},{type:"function",inputs:[{name:"user",internalType:"address",type:"address"},{name:"offerId",internalType:"uint256",type:"uint256"}],name:"isOfferCancelled",outputs:[{name:"notActive",internalType:"bool",type:"bool"}],stateMutability:"view"},{type:"function",inputs:[{name:"user",internalType:"address",type:"address"},{name:"renegotiationIf",internalType:"uint256",type:"uint256"}],name:"isRenegotiationOfferCancelled",outputs:[{name:"notActive",internalType:"bool",type:"bool"}],stateMutability:"view"},{type:"function",inputs:[{name:"_contract",internalType:"address",type:"address"}],name:"isWhitelistedCallbackContract",outputs:[{name:"",internalType:"bool",type:"bool"}],stateMutability:"view"},{type:"function",inputs:[{name:"_loanId",internalType:"uint256",type:"uint256"},{name:"_loan",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"tranche",internalType:"struct IMultiSourceLoan.Tranche[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"floor",internalType:"uint256",type:"uint256"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]},{name:"protocolFee",internalType:"uint256",type:"uint256"}]}],name:"liquidateLoan",outputs:[{name:"",internalType:"bytes",type:"bytes"}],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"_loanId",internalType:"uint256",type:"uint256"},{name:"_loan",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"tranche",internalType:"struct IMultiSourceLoan.Tranche[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"floor",internalType:"uint256",type:"uint256"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]},{name:"protocolFee",internalType:"uint256",type:"uint256"}]}],name:"loanLiquidated",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"user",internalType:"address",type:"address"}],name:"minOfferId",outputs:[{name:"minOfferId",internalType:"uint256",type:"uint256"}],stateMutability:"view"},{type:"function",inputs:[{name:"data",internalType:"bytes[]",type:"bytes[]"}],name:"multicall",outputs:[{name:"results",internalType:"bytes[]",type:"bytes[]"}],stateMutability:"payable"},{type:"function",inputs:[],name:"name",outputs:[{name:"",internalType:"string",type:"string"}],stateMutability:"view"},{type:"function",inputs:[{name:"",internalType:"address",type:"address"},{name:"",internalType:"address",type:"address"},{name:"",internalType:"uint256",type:"uint256"},{name:"",internalType:"bytes",type:"bytes"}],name:"onERC721Received",outputs:[{name:"",internalType:"bytes4",type:"bytes4"}],stateMutability:"nonpayable"},{type:"function",inputs:[],name:"owner",outputs:[{name:"",internalType:"address",type:"address"}],stateMutability:"view"},{type:"function",inputs:[],name:"pendingOwner",outputs:[{name:"",internalType:"address",type:"address"}],stateMutability:"view"},{type:"function",inputs:[],name:"pendingOwnerTime",outputs:[{name:"",internalType:"uint256",type:"uint256"}],stateMutability:"view"},{type:"function",inputs:[{name:"_loanId",internalType:"uint256",type:"uint256"},{name:"_loan",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"tranche",internalType:"struct IMultiSourceLoan.Tranche[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"floor",internalType:"uint256",type:"uint256"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]},{name:"protocolFee",internalType:"uint256",type:"uint256"}]},{name:"_loanExecutionData",internalType:"struct IMultiSourceLoan.LoanExecutionData",type:"tuple",components:[{name:"executionData",internalType:"struct IMultiSourceLoan.ExecutionData",type:"tuple",components:[{name:"offerExecution",internalType:"struct IMultiSourceLoan.OfferExecution[]",type:"tuple[]",components:[{name:"offer",internalType:"struct IMultiSourceLoan.LoanOffer",type:"tuple",components:[{name:"offerId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"fee",internalType:"uint256",type:"uint256"},{name:"capacity",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"},{name:"expirationTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"maxSeniorRepayment",internalType:"uint256",type:"uint256"},{name:"validators",internalType:"struct IBaseLoan.OfferValidator[]",type:"tuple[]",components:[{name:"validator",internalType:"address",type:"address"},{name:"arguments",internalType:"bytes",type:"bytes"}]}]},{name:"amount",internalType:"uint256",type:"uint256"},{name:"lenderOfferSignature",internalType:"bytes",type:"bytes"}]},{name:"tokenId",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"expirationTime",internalType:"uint256",type:"uint256"},{name:"principalReceiver",internalType:"address",type:"address"},{name:"callbackData",internalType:"bytes",type:"bytes"}]},{name:"borrower",internalType:"address",type:"address"},{name:"borrowerOfferSignature",internalType:"bytes",type:"bytes"}]}],name:"refinanceFromLoanExecutionData",outputs:[{name:"",internalType:"uint256",type:"uint256"},{name:"",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"tranche",internalType:"struct IMultiSourceLoan.Tranche[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"floor",internalType:"uint256",type:"uint256"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]},{name:"protocolFee",internalType:"uint256",type:"uint256"}]}],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"_renegotiationOffer",internalType:"struct IMultiSourceLoan.RenegotiationOffer",type:"tuple",components:[{name:"renegotiationId",internalType:"uint256",type:"uint256"},{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"fee",internalType:"uint256",type:"uint256"},{name:"trancheIndex",internalType:"uint256[]",type:"uint256[]"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"},{name:"expirationTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"}]},{name:"_loan",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"tranche",internalType:"struct IMultiSourceLoan.Tranche[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"floor",internalType:"uint256",type:"uint256"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]},{name:"protocolFee",internalType:"uint256",type:"uint256"}]},{name:"_renegotiationOfferSignature",internalType:"bytes",type:"bytes"}],name:"refinanceFull",outputs:[{name:"",internalType:"uint256",type:"uint256"},{name:"",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"tranche",internalType:"struct IMultiSourceLoan.Tranche[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"floor",internalType:"uint256",type:"uint256"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]},{name:"protocolFee",internalType:"uint256",type:"uint256"}]}],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"_renegotiationOffer",internalType:"struct IMultiSourceLoan.RenegotiationOffer",type:"tuple",components:[{name:"renegotiationId",internalType:"uint256",type:"uint256"},{name:"loanId",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"fee",internalType:"uint256",type:"uint256"},{name:"trancheIndex",internalType:"uint256[]",type:"uint256[]"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"},{name:"expirationTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"}]},{name:"_loan",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"tranche",internalType:"struct IMultiSourceLoan.Tranche[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"floor",internalType:"uint256",type:"uint256"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]},{name:"protocolFee",internalType:"uint256",type:"uint256"}]}],name:"refinancePartial",outputs:[{name:"",internalType:"uint256",type:"uint256"},{name:"",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"tranche",internalType:"struct IMultiSourceLoan.Tranche[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"floor",internalType:"uint256",type:"uint256"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]},{name:"protocolFee",internalType:"uint256",type:"uint256"}]}],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"_contract",internalType:"address",type:"address"}],name:"removeWhitelistedCallbackContract",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"_repaymentData",internalType:"struct IMultiSourceLoan.LoanRepaymentData",type:"tuple",components:[{name:"data",internalType:"struct IMultiSourceLoan.SignableRepaymentData",type:"tuple",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"callbackData",internalType:"bytes",type:"bytes"},{name:"shouldDelegate",internalType:"bool",type:"bool"}]},{name:"loan",internalType:"struct IMultiSourceLoan.Loan",type:"tuple",components:[{name:"borrower",internalType:"address",type:"address"},{name:"nftCollateralTokenId",internalType:"uint256",type:"uint256"},{name:"nftCollateralAddress",internalType:"address",type:"address"},{name:"principalAddress",internalType:"address",type:"address"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"duration",internalType:"uint256",type:"uint256"},{name:"tranche",internalType:"struct IMultiSourceLoan.Tranche[]",type:"tuple[]",components:[{name:"loanId",internalType:"uint256",type:"uint256"},{name:"floor",internalType:"uint256",type:"uint256"},{name:"principalAmount",internalType:"uint256",type:"uint256"},{name:"lender",internalType:"address",type:"address"},{name:"accruedInterest",internalType:"uint256",type:"uint256"},{name:"startTime",internalType:"uint256",type:"uint256"},{name:"aprBps",internalType:"uint256",type:"uint256"}]},{name:"protocolFee",internalType:"uint256",type:"uint256"}]},{name:"borrowerSignature",internalType:"bytes",type:"bytes"}]}],name:"repayLoan",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"_newOwner",internalType:"address",type:"address"}],name:"requestTransferOwner",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"_delegate",internalType:"address",type:"address"},{name:"_collection",internalType:"address",type:"address"},{name:"_tokenId",internalType:"uint256",type:"uint256"}],name:"revokeDelegate",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"_newFlashActionContract",internalType:"address",type:"address"}],name:"setFlashActionContract",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"__minLockPeriod",internalType:"uint256",type:"uint256"}],name:"setMinLockPeriod",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[],name:"setProtocolFee",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[],name:"transferOwnership",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"newOwner",internalType:"address",type:"address"}],name:"transferOwnership",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"_newDuration",internalType:"uint48",type:"uint48"}],name:"updateLiquidationAuctionDuration",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"__loanLiquidator",internalType:"address",type:"address"}],name:"updateLiquidationContract",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"_newMinimum",internalType:"uint256",type:"uint256"}],name:"updateMinImprovementApr",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"_newProtocolFee",internalType:"struct WithProtocolFee.ProtocolFee",type:"tuple",components:[{name:"recipient",internalType:"address",type:"address"},{name:"fraction",internalType:"uint256",type:"uint256"}]}],name:"updateProtocolFee",outputs:[],stateMutability:"nonpayable"}];var Je=[{type:"constructor",inputs:[{name:"currencyManager",internalType:"address",type:"address"},{name:"collectionManager",internalType:"address",type:"address"},{name:"oldCollectionManager",internalType:"address",type:"address"}],stateMutability:"nonpayable"},{type:"error",inputs:[],name:"AssetNotOwnedError"},{type:"error",inputs:[],name:"CollectionNotWhitelistedError"},{type:"error",inputs:[],name:"CurrencyNotWhitelistedError"},{type:"error",inputs:[],name:"InvalidCallerError"},{type:"error",inputs:[],name:"LengthMismatchError"},{type:"error",inputs:[{name:"vaultId",internalType:"uint256",type:"uint256"}],name:"NotApprovedError"},{type:"error",inputs:[],name:"VaultNotExistsError"},{type:"error",inputs:[],name:"WithdrawingETHError"},{type:"error",inputs:[],name:"WrongMethodError"},{type:"event",anonymous:!1,inputs:[{name:"owner",internalType:"address",type:"address",indexed:!0},{name:"spender",internalType:"address",type:"address",indexed:!0},{name:"id",internalType:"uint256",type:"uint256",indexed:!0}],name:"Approval"},{type:"event",anonymous:!1,inputs:[{name:"owner",internalType:"address",type:"address",indexed:!0},{name:"operator",internalType:"address",type:"address",indexed:!0},{name:"approved",internalType:"bool",type:"bool",indexed:!1}],name:"ApprovalForAll"},{type:"event",anonymous:!1,inputs:[{name:"vaultId",internalType:"uint256",type:"uint256",indexed:!1},{name:"token",internalType:"address",type:"address",indexed:!1},{name:"amount",internalType:"uint256",type:"uint256",indexed:!1}],name:"ERC20Deposited"},{type:"event",anonymous:!1,inputs:[{name:"vaultId",internalType:"uint256",type:"uint256",indexed:!1},{name:"token",internalType:"address",type:"address",indexed:!1},{name:"amount",internalType:"uint256",type:"uint256",indexed:!1}],name:"ERC20Withdrawn"},{type:"event",anonymous:!1,inputs:[{name:"vaultId",internalType:"uint256",type:"uint256",indexed:!1},{name:"collection",internalType:"address",type:"address",indexed:!1},{name:"tokenId",internalType:"uint256",type:"uint256",indexed:!1}],name:"ERC721Deposited"},{type:"event",anonymous:!1,inputs:[{name:"vaultId",internalType:"uint256",type:"uint256",indexed:!1},{name:"collection",internalType:"address",type:"address",indexed:!1},{name:"tokenId",internalType:"uint256",type:"uint256",indexed:!1}],name:"ERC721Withdrawn"},{type:"event",anonymous:!1,inputs:[{name:"vaultId",internalType:"uint256",type:"uint256",indexed:!1},{name:"collection",internalType:"address",type:"address",indexed:!1},{name:"tokenId",internalType:"uint256",type:"uint256",indexed:!1}],name:"OldERC721Deposited"},{type:"event",anonymous:!1,inputs:[{name:"vaultId",internalType:"uint256",type:"uint256",indexed:!1},{name:"collection",internalType:"address",type:"address",indexed:!1},{name:"tokenId",internalType:"uint256",type:"uint256",indexed:!1}],name:"OldERC721Withdrawn"},{type:"event",anonymous:!1,inputs:[{name:"user",internalType:"address",type:"address",indexed:!0},{name:"newOwner",internalType:"address",type:"address",indexed:!0}],name:"OwnershipTransferred"},{type:"event",anonymous:!1,inputs:[{name:"from",internalType:"address",type:"address",indexed:!0},{name:"to",internalType:"address",type:"address",indexed:!0},{name:"id",internalType:"uint256",type:"uint256",indexed:!0}],name:"Transfer"},{type:"function",inputs:[{name:"_vaultId",internalType:"uint256",type:"uint256"},{name:"_token",internalType:"address",type:"address"}],name:"ERC20BalanceOf",outputs:[{name:"",internalType:"uint256",type:"uint256"}],stateMutability:"view"},{type:"function",inputs:[{name:"_collection",internalType:"address",type:"address"},{name:"_tokenId",internalType:"uint256",type:"uint256"}],name:"ERC721OwnerOf",outputs:[{name:"",internalType:"uint256",type:"uint256"}],stateMutability:"view"},{type:"function",inputs:[],name:"ETH",outputs:[{name:"",internalType:"address",type:"address"}],stateMutability:"view"},{type:"function",inputs:[{name:"_collection",internalType:"address",type:"address"},{name:"_tokenId",internalType:"uint256",type:"uint256"}],name:"OldERC721OwnerOf",outputs:[{name:"",internalType:"uint256",type:"uint256"}],stateMutability:"view"},{type:"function",inputs:[{name:"spender",internalType:"address",type:"address"},{name:"id",internalType:"uint256",type:"uint256"}],name:"approve",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"owner",internalType:"address",type:"address"}],name:"balanceOf",outputs:[{name:"",internalType:"uint256",type:"uint256"}],stateMutability:"view"},{type:"function",inputs:[{name:"_vaultId",internalType:"uint256",type:"uint256"},{name:"_assetRecipient",internalType:"address",type:"address"}],name:"burn",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"_vaultId",internalType:"uint256",type:"uint256"},{name:"_collections",internalType:"address[]",type:"address[]"},{name:"_tokenIds",internalType:"uint256[]",type:"uint256[]"},{name:"_oldCollections",internalType:"address[]",type:"address[]"},{name:"_oldTokenIds",internalType:"uint256[]",type:"uint256[]"},{name:"_tokens",internalType:"address[]",type:"address[]"}],name:"burnAndWithdraw",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"_vaultId",internalType:"uint256",type:"uint256"},{name:"_token",internalType:"address",type:"address"},{name:"_amount",internalType:"uint256",type:"uint256"}],name:"depositERC20",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"_vaultId",internalType:"uint256",type:"uint256"},{name:"_collection",internalType:"address",type:"address"},{name:"_tokenId",internalType:"uint256",type:"uint256"}],name:"depositERC721",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"_vaultId",internalType:"uint256",type:"uint256"},{name:"_collection",internalType:"address",type:"address"},{name:"_tokenIds",internalType:"uint256[]",type:"uint256[]"}],name:"depositERC721s",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"_vaultId",internalType:"uint256",type:"uint256"}],name:"depositEth",outputs:[],stateMutability:"payable"},{type:"function",inputs:[{name:"_vaultId",internalType:"uint256",type:"uint256"},{name:"_collection",internalType:"address",type:"address"},{name:"_tokenId",internalType:"uint256",type:"uint256"}],name:"depositOldERC721",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"_vaultId",internalType:"uint256",type:"uint256"},{name:"_collection",internalType:"address",type:"address"},{name:"_tokenIds",internalType:"uint256[]",type:"uint256[]"}],name:"depositOldERC721s",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"",internalType:"uint256",type:"uint256"}],name:"getApproved",outputs:[{name:"",internalType:"address",type:"address"}],stateMutability:"view"},{type:"function",inputs:[{name:"",internalType:"address",type:"address"},{name:"",internalType:"address",type:"address"}],name:"isApprovedForAll",outputs:[{name:"",internalType:"bool",type:"bool"}],stateMutability:"view"},{type:"function",inputs:[],name:"mint",outputs:[{name:"",internalType:"uint256",type:"uint256"}],stateMutability:"nonpayable"},{type:"function",inputs:[],name:"name",outputs:[{name:"",internalType:"string",type:"string"}],stateMutability:"view"},{type:"function",inputs:[{name:"",internalType:"address",type:"address"},{name:"",internalType:"address",type:"address"},{name:"",internalType:"uint256",type:"uint256"},{name:"",internalType:"bytes",type:"bytes"}],name:"onERC721Received",outputs:[{name:"",internalType:"bytes4",type:"bytes4"}],stateMutability:"nonpayable"},{type:"function",inputs:[],name:"owner",outputs:[{name:"",internalType:"address",type:"address"}],stateMutability:"view"},{type:"function",inputs:[{name:"id",internalType:"uint256",type:"uint256"}],name:"ownerOf",outputs:[{name:"owner",internalType:"address",type:"address"}],stateMutability:"view"},{type:"function",inputs:[{name:"from",internalType:"address",type:"address"},{name:"to",internalType:"address",type:"address"},{name:"id",internalType:"uint256",type:"uint256"}],name:"safeTransferFrom",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"from",internalType:"address",type:"address"},{name:"to",internalType:"address",type:"address"},{name:"id",internalType:"uint256",type:"uint256"},{name:"data",internalType:"bytes",type:"bytes"}],name:"safeTransferFrom",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"operator",internalType:"address",type:"address"},{name:"approved",internalType:"bool",type:"bool"}],name:"setApprovalForAll",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"interfaceId",internalType:"bytes4",type:"bytes4"}],name:"supportsInterface",outputs:[{name:"",internalType:"bool",type:"bool"}],stateMutability:"view"},{type:"function",inputs:[],name:"symbol",outputs:[{name:"",internalType:"string",type:"string"}],stateMutability:"view"},{type:"function",inputs:[{name:"_vaultId",internalType:"uint256",type:"uint256"}],name:"tokenURI",outputs:[{name:"",internalType:"string",type:"string"}],stateMutability:"pure"},{type:"function",inputs:[{name:"from",internalType:"address",type:"address"},{name:"to",internalType:"address",type:"address"},{name:"id",internalType:"uint256",type:"uint256"}],name:"transferFrom",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"newOwner",internalType:"address",type:"address"}],name:"transferOwnership",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"_vaultId",internalType:"uint256",type:"uint256"},{name:"_token",internalType:"address",type:"address"}],name:"withdrawERC20",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"_vaultId",internalType:"uint256",type:"uint256"},{name:"_tokens",internalType:"address[]",type:"address[]"}],name:"withdrawERC20s",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"_vaultId",internalType:"uint256",type:"uint256"},{name:"_collection",internalType:"address",type:"address"},{name:"_tokenId",internalType:"uint256",type:"uint256"}],name:"withdrawERC721",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"_vaultId",internalType:"uint256",type:"uint256"},{name:"_collections",internalType:"address[]",type:"address[]"},{name:"_tokenIds",internalType:"uint256[]",type:"uint256[]"}],name:"withdrawERC721s",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"_vaultId",internalType:"uint256",type:"uint256"}],name:"withdrawEth",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"_vaultId",internalType:"uint256",type:"uint256"},{name:"_collection",internalType:"address",type:"address"},{name:"_tokenId",internalType:"uint256",type:"uint256"}],name:"withdrawOldERC721",outputs:[],stateMutability:"nonpayable"},{type:"function",inputs:[{name:"_vaultId",internalType:"uint256",type:"uint256"},{name:"_collections",internalType:"address[]",type:"address[]"},{name:"_tokenIds",internalType:"uint256[]",type:"uint256[]"}],name:"withdrawOldERC721s",outputs:[],stateMutability:"nonpayable"}];var ye=y(p=>Number(p.valueOf()),"toInteger"),z=y(p=>ye(p)/1e4,"bpsToPercentage"),D=y((p,e)=>{if(p.length)return typeof p[0]?.[e]=="bigint"?p.reduce((t,n)=>t+BigInt(n[e]),0n):p.reduce((t,n)=>t+Number(n[e]),0)},"sumBy"),et=y((p,e)=>{if(p.length)return typeof p[0]?.[e]=="bigint"?p.reduce((t,n)=>BigInt(n[e])>t?BigInt(n[e]):t,0n):p.reduce((t,n)=>Number(n[e])>t?Number(n[e]):t,0)},"maxBy"),tt=y((p,e)=>p===void 0?e:e===void 0||p<e?p:e,"min");var Fe=60,de=Fe*60*24,A=y(p=>Math.ceil(ye(p)/1e3),"millisToSeconds"),V=y(p=>ye(p)*1e3,"secondsToMillis");var Ae=y(p=>typeof p=="bigint"?new Date(V(p)):p,"toDate");var G=class extends b{constructor({walletClient:e}){let{AuctionLoanLiquidator:{v6:t}}=I(e.chain);super({walletClient:e,address:t,abi:Ye})}async placeBid({collectionContractAddress:e,tokenId:t,bid:n,auction:a}){let i=await this.safeContractWrite.placeBid([e,t,this.mapAuctionToAuctionArgs(a),n]);return{txHash:i,waitTxInBlock:async()=>{let r=await this.bcClient.waitForTransactionReceipt({hash:i}),s=await this.contract.createEventFilter.BidPlaced(),o=d(r,s);if(o.length===0)throw new Error("Bid not placed");return{...o[0].args,...r}}}}async getRemainingLockupSeconds({auction:e}){let t=await this.contract.read.getTimeForMainLenderToBuy(),n=Number(t),a=Math.ceil(A(Date.now())-Number(e.startTime));return a>=n?0:n-a}async settleAuctionWithBuyout({auction:e,loan:t}){let n=await this.safeContractWrite.settleWithBuyout([t.nftCollateralAddress,t.nftCollateralTokenId,this.mapAuctionToAuctionArgs(e),t]);return{txHash:n,waitTxInBlock:async()=>{let a=await this.bcClient.waitForTransactionReceipt({hash:n}),i=await this.contract.createEventFilter.AuctionSettledWithBuyout(),r=d(a,i);if(r.length===0)throw new Error("Auction not settled");return{...r[0].args,...a}}}}async settleAuction({auction:e,loan:t}){let n=await this.safeContractWrite.settleAuction([this.mapAuctionToAuctionArgs(e),t]);return{txHash:n,waitTxInBlock:async()=>{let a=await this.bcClient.waitForTransactionReceipt({hash:n}),i=await this.contract.createEventFilter.AuctionSettled(),r=d(a,i);if(r.length===0)throw new Error("Auction not settled");return{...r[0].args,...a}}}}mapAuctionToAuctionArgs(e){if("minBid"in e)return e;throw new Error("minBid is required for v6 auctions")}};y(G,"AllV6");import{encodeFunctionData as un}from"viem";var nt=[{constant:!0,inputs:[],name:"name",outputs:[{name:"",type:"string"}],payable:!1,type:"function",stateMutability:"view"},{constant:!0,inputs:[{name:"",type:"uint256"}],name:"punksOfferedForSale",outputs:[{name:"isForSale",type:"bool"},{name:"punkIndex",type:"uint256"},{name:"seller",type:"address"},{name:"minValue",type:"uint256"},{name:"onlySellTo",type:"address"}],payable:!1,type:"function",stateMutability:"view"},{constant:!1,inputs:[{name:"punkIndex",type:"uint256"}],name:"enterBidForPunk",outputs:[],payable:!0,type:"function",stateMutability:"payable"},{constant:!0,inputs:[],name:"totalSupply",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function",stateMutability:"view"},{constant:!1,inputs:[{name:"punkIndex",type:"uint256"},{name:"minPrice",type:"uint256"}],name:"acceptBidForPunk",outputs:[],payable:!1,type:"function",stateMutability:"nonpayable"},{constant:!0,inputs:[],name:"decimals",outputs:[{name:"",type:"uint8"}],payable:!1,type:"function",stateMutability:"view"},{constant:!1,inputs:[{name:"addresses",type:"address[]"},{name:"indices",type:"uint256[]"}],name:"setInitialOwners",outputs:[],payable:!1,type:"function",stateMutability:"nonpayable"},{constant:!1,inputs:[],name:"withdraw",outputs:[],payable:!1,type:"function",stateMutability:"nonpayable"},{constant:!0,inputs:[],name:"imageHash",outputs:[{name:"",type:"string"}],payable:!1,type:"function",stateMutability:"view"},{constant:!0,inputs:[],name:"nextPunkIndexToAssign",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function",stateMutability:"view"},{constant:!0,inputs:[{name:"",type:"uint256"}],name:"punkIndexToAddress",outputs:[{name:"",type:"address"}],payable:!1,type:"function",stateMutability:"view"},{constant:!0,inputs:[],name:"standard",outputs:[{name:"",type:"string"}],payable:!1,type:"function",stateMutability:"view"},{constant:!0,inputs:[{name:"",type:"uint256"}],name:"punkBids",outputs:[{name:"hasBid",type:"bool"},{name:"punkIndex",type:"uint256"},{name:"bidder",type:"address"},{name:"value",type:"uint256"}],payable:!1,type:"function",stateMutability:"view"},{constant:!0,inputs:[{name:"",type:"address"}],name:"balanceOf",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function",stateMutability:"view"},{constant:!1,inputs:[],name:"allInitialOwnersAssigned",outputs:[],payable:!1,type:"function",stateMutability:"nonpayable"},{constant:!0,inputs:[],name:"allPunksAssigned",outputs:[{name:"",type:"bool"}],payable:!1,type:"function",stateMutability:"view"},{constant:!1,inputs:[{name:"punkIndex",type:"uint256"}],name:"buyPunk",outputs:[],payable:!0,type:"function",stateMutability:"payable"},{constant:!1,inputs:[{name:"to",type:"address"},{name:"punkIndex",type:"uint256"}],name:"transferPunk",outputs:[],payable:!1,type:"function",stateMutability:"nonpayable"},{constant:!0,inputs:[],name:"symbol",outputs:[{name:"",type:"string"}],payable:!1,type:"function",stateMutability:"view"},{constant:!1,inputs:[{name:"punkIndex",type:"uint256"}],name:"withdrawBidForPunk",outputs:[],payable:!1,type:"function",stateMutability:"nonpayable"},{constant:!1,inputs:[{name:"to",type:"address"},{name:"punkIndex",type:"uint256"}],name:"setInitialOwner",outputs:[],payable:!1,type:"function",stateMutability:"nonpayable"},{constant:!1,inputs:[{name:"punkIndex",type:"uint256"},{name:"minSalePriceInWei",type:"uint256"},{name:"toAddress",type:"address"}],name:"offerPunkForSaleToAddress",outputs:[],payable:!1,type:"function",stateMutability:"nonpayable"},{constant:!0,inputs:[],name:"punksRemainingToAssign",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function",stateMutability:"view"},{constant:!1,inputs:[{name:"punkIndex",type:"uint256"},{name:"minSalePriceInWei",type:"uint256"}],name:"offerPunkForSale",outputs:[],payable:!1,type:"function",stateMutability:"nonpayable"},{constant:!1,inputs:[{name:"punkIndex",type:"uint256"}],name:"getPunk",outputs:[],payable:!1,type:"function",stateMutability:"nonpayable"},{constant:!0,inputs:[{name:"",type:"address"}],name:"pendingWithdrawals",outputs:[{name:"",type:"uint256"}],payable:!1,type:"function",stateMutability:"view"},{constant:!1,inputs:[{name:"punkIndex",type:"uint256"}],name:"punkNoLongerForSale",outputs:[],payable:!1,type:"function",stateMutability:"nonpayable"},{inputs:[],payable:!0,type:"constructor",stateMutability:"payable"},{anonymous:!1,inputs:[{indexed:!0,name:"to",type:"address"},{indexed:!1,name:"punkIndex",type:"uint256"}],name:"Assign",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"from",type:"address"},{indexed:!0,name:"to",type:"address"},{indexed:!1,name:"value",type:"uint256"}],name:"Transfer",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"from",type:"address"},{indexed:!0,name:"to",type:"address"},{indexed:!1,name:"punkIndex",type:"uint256"}],name:"PunkTransfer",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"punkIndex",type:"uint256"},{indexed:!1,name:"minValue",type:"uint256"},{indexed:!0,name:"toAddress",type:"address"}],name:"PunkOffered",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"punkIndex",type:"uint256"},{indexed:!1,name:"value",type:"uint256"},{indexed:!0,name:"fromAddress",type:"address"}],name:"PunkBidEntered",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"punkIndex",type:"uint256"},{indexed:!1,name:"value",type:"uint256"},{indexed:!0,name:"fromAddress",type:"address"}],name:"PunkBidWithdrawn",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"punkIndex",type:"uint256"},{indexed:!1,name:"value",type:"uint256"},{indexed:!0,name:"fromAddress",type:"address"},{indexed:!0,name:"toAddress",type:"address"}],name:"PunkBought",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"punkIndex",type:"uint256"}],name:"PunkNoLongerForSale",type:"event"}];var Z=class extends b{constructor({walletClient:e}){let{CryptoPunksAddress:t}=I(e.chain);super({walletClient:e,address:t,abi:nt})}async encodeBuyPunk(e){return un({abi:this.abi,functionName:"buyPunk",args:[e]})}};y(Z,"CryptoPunks");import{encodeFunctionData as at}from"viem";var X=class extends b{mslAddress;constructor({walletClient:e,mslAddress:t}){let{LeverageAddress:n}=I(e.chain);super({walletClient:e,address:n,abi:$e}),this.mslAddress=t}getDomain(){return{name:L,version:"2",chainId:this.wallet.chain.id,verifyingContract:this.mslAddress}}async signExecutionData(e){return this.wallet.signTypedData({domain:this.getDomain(),primaryType:"ExecutionData",types:{ExecutionData:[{name:"offer",type:"LoanOffer"},{name:"tokenId",type:"uint256"},{name:"amount",type:"uint256"},{name:"expirationTime",type:"uint256"},{name:"callbackData",type:"bytes"}],LoanOffer:[{name:"offerId",type:"uint256"},{name:"lender",type:"address"},{name:"fee",type:"uint256"},{name:"borrower",type:"address"},{name:"capacity",type:"uint256"},{name:"nftCollateralAddress",type:"address"},{name:"nftCollateralTokenId",type:"uint256"},{name:"principalAddress",type:"address"},{name:"principalAmount",type:"uint256"},{name:"aprBps",type:"uint256"},{name:"expirationTime",type:"uint256"},{name:"duration",type:"uint256"},{name:"validators",type:"OfferValidator[]"}],OfferValidator:[{name:"validator",type:"address"},{name:"arguments",type:"bytes"}]},message:e})}async signRepaymentData(e){return this.wallet.signTypedData({domain:this.getDomain(),primaryType:"SignableRepaymentData",types:{SignableRepaymentData:[{name:"loanId",type:"uint256"},{name:"callbackData",type:"bytes"},{name:"shouldDelegate",type:"bool"}]},message:e})}async buy({leverageBuyData:e,ethToSend:t}){let n=await this.safeContractWrite.buy([await Promise.all(e.map(async a=>{let i={offer:a.offer,tokenId:a.nft.tokenId,amount:a.amount,expirationTime:a.expirationTime,callbackData:a.callbackData};return at({abi:h,functionName:"emitLoan",args:[{executionData:i,lender:a.offer.lender,borrower:this.wallet.account.address,lenderOfferSignature:a.offer.signature,borrowerOfferSignature:await this.signExecutionData(i)}]})}))],{value:t});return{txHash:n,waitTxInBlock:async()=>{let a=await this.bcClient.waitForTransactionReceipt({hash:n}),i=await this.contract.createEventFilter.BNPLLoansStarted(),r=d(a,i);if(r.length===0)throw new Error("BNPL Loans not started");return{...r[0].args,...a}}}}async sell({loan:e,callbackData:t,shouldDelegate:n,loanId:a}){let i={loanId:a,callbackData:t,shouldDelegate:n},r=await this.safeContractWrite.sell([[at({abi:h,functionName:"repayLoan",args:[{data:i,loan:e,borrowerSignature:await this.signRepaymentData(i)}]})]]);return{txHash:r,waitTxInBlock:async()=>{let s=await this.bcClient.waitForTransactionReceipt({hash:r}),o=await this.contract.createEventFilter.SellAndRepayExecuted(),l=d(s,o);if(l.length===0)throw new Error("Sell and repay not executed");return{...l[0].args,...s}}}}};y(X,"LeverageV5");import{zeroAddress as mn}from"viem";import{isAddress as cn}from"viem";var ue=y((p,e)=>({...p,loanId:e,strictImprovement:p.strictImprovement??!1,lender:p.lenderAddress,signer:p.signerAddress??v,fee:p.feeAmount,trancheIndex:p.trancheIndex??[],targetPrincipal:p.targetPrincipal??[]}),"renegotiationToMslRenegotiation"),x=y(p=>{let e=p.nftCollateralAddress??v;if(S(v,e)||!cn(e))throw new Error("nftCollateralAddress is required");let t;"source"in p?t=p.source.map(l=>({...l,floor:0n})):t=p.tranche;let n;"protocolFee"in p?n=p.protocolFee:n=0n;let a=Ae(p.startTime),i="contractStartTime"in p?Ae(p.contractStartTime):a,r=i.getTime()-a.getTime(),s=p.duration-BigInt(A(r)),o=BigInt(A(i.getTime()));return{...p,startTime:o,contractStartTime:o,duration:s,nftCollateralAddress:e,source:t,tranche:t,protocolFee:n}},"loanToMslLoan"),it=y(({loanId:p,loan:e,trancheIndex:t,address:n})=>{let a=x(e),i=t?{trancheIndex:a.source.map((r,s)=>BigInt(s)),targetPrincipal:[]}:{trancheIndex:[],targetPrincipal:a.source.map(()=>0n)};return{loanId:p,lenderAddress:n,signerAddress:n,expirationTime:BigInt(A(Date.now())),aprBps:0n,feeAmount:0n,duration:a.duration,principalAmount:a.principalAmount,...i}},"generateFakeRenegotiationInput"),H=y(p=>{let e=x(p);return et(e.source,"loanId")??0n},"getMslLoanId"),ce=y(p=>{let e=new Date,t=new Date(V(p.startTime)+V(p.duration));return t.getTime()<e.getTime()?0:A(t.getTime()-e.getTime())},"getRemainingSeconds");var j=class extends b{constructor({walletClient:e}){let{MultiSourceLoan:{v4:t}}=I(e.chain);super({walletClient:e,address:t,abi:je})}getDomain(){return{name:L,version:"1",chainId:this.wallet.chain.id,verifyingContract:this.address}}async signOffer({structToSign:e}){return this.wallet.signTypedData({domain:this.getDomain(),primaryType:"LoanOffer",types:{LoanOffer:[{name:"offerId",type:"uint256"},{name:"lender",type:"address"},{name:"fee",type:"uint256"},{name:"borrower",type:"address"},{name:"capacity",type:"uint256"},{name:"signer",type:"address"},{name:"requiresLiquidation",type:"bool"},{name:"nftCollateralAddress",type:"address"},{name:"nftCollateralTokenId",type:"uint256"},{name:"principalAddress",type:"address"},{name:"principalAmount",type:"uint256"},{name:"aprBps",type:"uint256"},{name:"expirationTime",type:"uint256"},{name:"duration",type:"uint256"},{name:"validators",type:"OfferValidator[]"}],OfferValidator:[{name:"validator",type:"address"},{name:"arguments",type:"bytes"}]},message:e})}async signRenegotiationOffer({structToSign:e}){return this.wallet.signTypedData({domain:this.getDomain(),primaryType:"RenegotiationOffer",types:{RenegotiationOffer:[{name:"renegotiationId",type:"uint256"},{name:"loanId",type:"uint256"},{name:"lender",type:"address"},{name:"fee",type:"uint256"},{name:"signer",type:"address"},{name:"targetPrincipal",type:"uint256[]"},{name:"principalAmount",type:"uint256"},{name:"aprBps",type:"uint256"},{name:"expirationTime",type:"uint256"},{name:"duration",type:"uint256"},{name:"strictImprovement",type:"bool"}]},message:e})}async cancelOffer({id:e}){let t=await this.safeContractWrite.cancelOffer([this.wallet.account.address,e]);return{txHash:t,waitTxInBlock:async()=>{let n=await this.bcClient.waitForTransactionReceipt({hash:t}),a=await this.contract.createEventFilter.OfferCancelled(),i=d(n,a);if(i.length===0)throw new Error("Offer not cancelled");return{...i[0].args,...n}}}}async cancelAllOffers({minId:e}){let t=await this.safeContractWrite.cancelAllOffers([this.wallet.account.address,e]);return{txHash:t,waitTxInBlock:async()=>{let n=await this.bcClient.waitForTransactionReceipt({hash:t}),a=await this.contract.createEventFilter.AllOffersCancelled(),i=d(n,a);if(i.length===0)throw new Error("Offers not cancelled");return{...i[0].args,...n}}}}async cancelRefinanceOffer({id:e}){let t=await this.safeContractWrite.cancelRenegotiationOffer([this.wallet.account.address,e]);return{txHash:t,waitTxInBlock:async()=>{let n=await this.bcClient.waitForTransactionReceipt({hash:t}),a=await this.contract.createEventFilter.RenegotiationOfferCancelled(),i=d(n,a);if(i.length===0)throw new Error("Offer not cancelled");return{...i[0].args,...n}}}}async cancelAllRenegotiations({minId:e}){let t=await this.safeContractWrite.cancelAllRenegotiationOffers([this.wallet.account.address,e]);return{txHash:t,waitTxInBlock:async()=>{let n=await this.bcClient.waitForTransactionReceipt({hash:t}),a=await this.contract.createEventFilter.RenegotiationOfferCancelled(),i=d(n,a);if(i.length===0)throw new Error("Offer not cancelled");return{...i[0].args,...n}}}}mapEmitLoanToMslEmitLoanArgs({offerExecution:e,tokenId:t}){let{offer:n,lenderOfferSignature:a}=e[0];return[{...n,signer:n.signerAddress??mn,lender:n.lenderAddress,borrower:n.borrowerAddress,validators:n.offerValidators,requiresLiquidation:!!n.requiresLiquidation},t,a,!1]}async emitLoan(e){let t=this.mapEmitLoanToMslEmitLoanArgs(e),n=await this.safeContractWrite.emitLoan(t);return{txHash:n,waitTxInBlock:async()=>{let a=await this.bcClient.waitForTransactionReceipt({hash:n}),i=await this.contract.createEventFilter.LoanEmitted(),r=d(a,i);if(r.length===0)throw new Error("Loan not emitted");let s=r[0].args;return{loan:{id:`${this.contract.address.toLowerCase()}.${s.loanId}`,...s.loan,contractAddress:this.contract.address},loanId:s.loanId,offerId:`${this.contract.address.toLowerCase()}.${t[0].lender.toLowerCase()}.${s.offerId}`,...a}}}}async repayLoan({loan:e,nftReceiver:t,loanId:n}){let a=t??this.wallet.account.address,i=await this.safeContractWrite.repayLoan([a,n,e,!1]);return{txHash:i,waitTxInBlock:async()=>{let r=await this.bcClient.waitForTransactionReceipt({hash:i}),s=await this.contract.createEventFilter.LoanRepaid(),o=d(r,s);if(o.length===0)throw new Error("Loan not repaid");return{...o[0].args,...r}}}}getRemainingLockupSeconds(){return 0}isEndLockedUp(){return!1}async refinanceBatch({renegotiationId:e,refinancings:t}){let n=[],a=[];t.forEach(({loan:r,sources:s,newAprBps:o},l)=>{let u=r.source.map(({principalAmount:g,loanId:m})=>{let f=s.find(({source:M})=>M.loanId===m);return g-(f?.refinancingPrincipal??0n)}),c=D(s,"refinancingPrincipal")??0n;n.push({renegotiationId:e+BigInt(l),loanId:H(r),lender:this.wallet.account.address,fee:0n,signer:this.wallet.account.address,targetPrincipal:u,principalAmount:c,aprBps:o,expirationTime:BigInt(A(Date.now())+Fe),duration:0n,strictImprovement:!0}),a.push(r)});let i=await this.safeContractWrite.refinancePartialBatch([n,a]);return{txHash:i,waitTxInBlock:async()=>{let r=await this.bcClient.waitForTransactionReceipt({hash:i}),s=await this.contract.createEventFilter.LoanRefinanced(),o=d(r,s);if(o.length!==t.length)throw new Error("Loan not refinanced");return{results:o.map(({args:u})=>u),...r}}}}async refinanceFullLoan({offer:e,signature:t,loan:n}){return this.executeRenegotiation({offer:e,executeRenegotiationTxn:()=>this.safeContractWrite.refinanceFull([e,n,t])})}async refinancePartialLoan({offer:e,loan:t}){return this.executeRenegotiation({offer:e,executeRenegotiationTxn:()=>this.safeContractWrite.refinancePartial([e,t])})}async executeRenegotiation({offer:e,executeRenegotiationTxn:t}){let n=await t();return{txHash:n,waitTxInBlock:async()=>{let a=await this.bcClient.waitForTransactionReceipt({hash:n}),i=await this.contract.createEventFilter.LoanRefinanced(),r=d(a,i);if(r.length===0)throw new Error("Loan not refinanced");let s=r[0].args;return{loan:{id:`${this.contract.address.toLowerCase()}.${s.newLoanId}`,...s.loan,contractAddress:this.contract.address},loanId:s.newLoanId,renegotiationId:`${this.contract.address.toLowerCase()}.${e.lender.toLowerCase()}.${s.renegotiationId}`,...a}}}}async addTranche(){throw new Error("Not implemented for V1")}async refinanceFromOffers(){throw new Error("Not implemented for V1")}async delegateMulticall(){throw new Error("Not implemented for V1")}async delegate(){throw new Error("Not implemented for V1")}async revokeDelegate(){throw new Error("Not implemented for V1")}async revokeDelegationsAndEmitLoan(){throw new Error("Not implemented for V1")}async liquidateLoan({loan:e,loanId:t}){let n=await this.safeContractWrite.liquidateLoan([t,e]);return{txHash:n,waitTxInBlock:async()=>{let a=await this.bcClient.waitForTransactionReceipt({hash:n}),i=await this.contract.createEventFilter.LoanForeclosed(),r=await this.contract.createEventFilter.LoanSentToLiquidator(),s=d(a,i),o=d(a,r);if(s.length===0&&o.length===0)throw new Error("Loan not liquidated");return{...s?.[0]?.args??o?.[0]?.args,...a}}}}};y(j,"MslV4");import{encodeFunctionData as Y}from"viem";var J=class extends b{constructor({walletClient:e}){let{MultiSourceLoan:{v5:t}}=I(e.chain);super({walletClient:e,address:t,abi:h})}getDomain(){return{name:L,version:"2",chainId:this.wallet.chain.id,verifyingContract:this.address}}async signOffer({structToSign:e}){return this.wallet.signTypedData({domain:this.getDomain(),primaryType:"LoanOffer",types:{LoanOffer:[{name:"offerId",type:"uint256"},{name:"lender",type:"address"},{name:"fee",type:"uint256"},{name:"borrower",type:"address"},{name:"capacity",type:"uint256"},{name:"nftCollateralAddress",type:"address"},{name:"nftCollateralTokenId",type:"uint256"},{name:"principalAddress",type:"address"},{name:"principalAmount",type:"uint256"},{name:"aprBps",type:"uint256"},{name:"expirationTime",type:"uint256"},{name:"duration",type:"uint256"},{name:"validators",type:"OfferValidator[]"}],OfferValidator:[{name:"validator",type:"address"},{name:"arguments",type:"bytes"}]},message:e})}async signRenegotiationOffer({structToSign:e}){return this.wallet.signTypedData({domain:this.getDomain(),primaryType:"RenegotiationOffer",types:{RenegotiationOffer:[{name:"renegotiationId",type:"uint256"},{name:"loanId",type:"uint256"},{name:"lender",type:"address"},{name:"fee",type:"uint256"},{name:"targetPrincipal",type:"uint256[]"},{name:"principalAmount",type:"uint256"},{name:"aprBps",type:"uint256"},{name:"expirationTime",type:"uint256"},{name:"duration",type:"uint256"}]},message:e})}async cancelOffer({id:e}){let t=await this.safeContractWrite.cancelOffer([e]);return{txHash:t,waitTxInBlock:async()=>{let n=await this.bcClient.waitForTransactionReceipt({hash:t}),a=await this.contract.createEventFilter.OfferCancelled(),i=d(n,a);if(i.length===0)throw new Error("Offer not cancelled");return{...i[0].args,...n}}}}async cancelAllOffers({minId:e}){let t=await this.safeContractWrite.cancelAllOffers([e]);return{txHash:t,waitTxInBlock:async()=>{let n=await this.bcClient.waitForTransactionReceipt({hash:t}),a=await this.contract.createEventFilter.AllOffersCancelled(),i=d(n,a);if(i.length===0)throw new Error("Offers not cancelled");return{...i[0].args,...n}}}}async cancelRefinanceOffer({id:e}){let t=await this.safeContractWrite.cancelRenegotiationOffer([e]);return{txHash:t,waitTxInBlock:async()=>{let n=await this.bcClient.waitForTransactionReceipt({hash:t}),a=await this.contract.createEventFilter.RenegotiationOfferCancelled(),i=d(n,a);if(i.length===0)throw new Error("Renegotiation offer not cancelled");return{...i[0].args,...n}}}}async cancelAllRenegotiations({minId:e}){let t=await this.safeContractWrite.cancelAllRenegotiationOffers([e]);return{txHash:t,waitTxInBlock:async()=>{let n=await this.bcClient.waitForTransactionReceipt({hash:t}),a=await this.contract.createEventFilter.AllRenegotiationOffersCancelled(),i=d(n,a);if(i.length===0)throw new Error("Renegotiation offers not cancelled");return{...i[0].args,...n}}}}mapEmitLoanToMslEmitLoanArgs({offerExecution:e,tokenId:t,expirationTime:n}){let{offer:a,amount:i,lenderOfferSignature:r}=e[0];return{executionData:{offer:{...a,lender:a.lenderAddress,borrower:a.borrowerAddress,validators:a.offerValidators},tokenId:t,amount:i??a.principalAmount,expirationTime:n??BigInt(A(Date.now())+de),callbackData:"0x"},lender:a.lenderAddress,borrower:this.wallet.account.address,lenderOfferSignature:r,borrowerOfferSignature:"0x"}}async emitLoan(e){let t=this.mapEmitLoanToMslEmitLoanArgs(e),n=await this.safeContractWrite.emitLoan([t]);return{txHash:n,waitTxInBlock:async()=>{let a=await this.bcClient.waitForTransactionReceipt({hash:n}),i=await this.contract.createEventFilter.LoanEmitted(),r=d(a,i);if(r.length===0)throw new Error("Loan not emitted");let s=r[0].args;return{loan:{id:`${this.contract.address.toLowerCase()}.${s.loanId}`,...s.loan,contractAddress:this.contract.address},loanId:s.loanId,offerId:`${this.contract.address.toLowerCase()}.${t.lender.toLowerCase()}.${s.offerId}`,...a}}}}async revokeDelegationsAndEmitLoan({delegations:e,emit:t}){if(e.length===0)throw new Error("At least one delegation must be revoked");let n=this.mapEmitLoanToMslEmitLoanArgs(t),{tokenId:a,offer:i}=n.executionData,r=e.map(l=>Y({abi:h,functionName:"revokeDelegate",args:[l,i.nftCollateralAddress,a]})),s=Y({abi:h,functionName:"emitLoan",args:[n]}),o=await this.safeContractWrite.multicall([[...r,s]]);return{txHash:o,waitTxInBlock:async()=>{let l=await this.bcClient.waitForTransactionReceipt({hash:o}),u=await this.contract.createEventFilter.RevokeDelegate(),c=d(l,u);if(c.length!==e.length)throw new Error("Revoke delegations failed");let g=await this.contract.createEventFilter.LoanEmitted(),m=d(l,g);if(m.length===0)throw new Error("Loan not emitted");let f=[...c.map(({args:O})=>O),...m.map(({args:O})=>O)],M=m[0].args;return{loan:{id:`${this.contract.address.toLowerCase()}.${M.loanId}`,...M.loan,contractAddress:this.contract.address},loanId:M.loanId,...l,results:f}}}}async repayLoan({loan:e,loanId:t}){let n={loanId:t,callbackData:"0x",shouldDelegate:!1},a=await this.safeContractWrite.repayLoan([{data:n,loan:e,borrowerSignature:"0x"}]);return{txHash:a,waitTxInBlock:async()=>{let i=await this.bcClient.waitForTransactionReceipt({hash:a}),r=await this.contract.createEventFilter.LoanRepaid(),s=d(i,r);if(s.length===0)throw new Error("Loan not repaid");return{...s[0].args,...i}}}}async getRemainingLockupSeconds({loan:e}){let t=e.source[0],a=e.startTime+e.duration-t.startTime,i=await this.contract.read.getMinLockPeriod(),r=z(i),s=Math.ceil(Number(a)*r),o=Math.ceil(A(Date.now())-Number(t.startTime));return o>=s?0:s-o}isEndLockedUp(){return!1}async refinanceBatch({renegotiationId:e,refinancings:t}){let n=t.map(({loan:i,sources:r,newAprBps:s},o)=>{let l=i.source.map(({principalAmount:m,loanId:f})=>{let M=r.find(({source:O})=>O.loanId===f);return m-(M?.refinancingPrincipal??0n)}),u=D(r,"refinancingPrincipal")??0n,c={renegotiationId:e+BigInt(o),loanId:H(i),lender:this.wallet.account.address,fee:0n,targetPrincipal:l,principalAmount:u,aprBps:s,expirationTime:BigInt(A(Date.now()))+k,duration:BigInt(ce(i))+k};return u===i.principalAmount?Y({abi:h,functionName:"refinanceFull",args:[c,i,F]}):Y({abi:h,functionName:"refinancePartial",args:[{...c,duration:0n},i]})}),a=await this.safeContractWrite.multicall([n]);return{txHash:a,waitTxInBlock:async()=>{let i=await this.bcClient.waitForTransactionReceipt({hash:a}),r=await this.contract.createEventFilter.LoanRefinanced(),s=d(i,r);if(s.length!==t.length)throw new Error("Loan not refinanced");return{results:s.map(({args:l})=>l),...i}}}}async refinanceFullLoan({offer:e,signature:t,loan:n}){return this.executeRenegotiation({offer:e,executeRenegotiationTxn:()=>this.safeContractWrite.refinanceFull([e,n,t])})}async refinancePartialLoan({offer:e,loan:t}){return this.executeRenegotiation({offer:e,executeRenegotiationTxn:()=>this.safeContractWrite.refinancePartial([e,t])})}async executeRenegotiation({offer:e,executeRenegotiationTxn:t}){let n=await t();return{txHash:n,waitTxInBlock:async()=>{let a=await this.bcClient.waitForTransactionReceipt({hash:n}),i=await this.contract.createEventFilter.LoanRefinanced(),r=d(a,i);if(r.length===0)throw new Error("Loan not refinanced");let s=r[0].args;return{loan:{id:`${this.contract.address.toLowerCase()}.${s.newLoanId}`,...s.loan,contractAddress:this.contract.address},loanId:s.newLoanId,renegotiationId:`${this.contract.address.toLowerCase()}.${e.lender.toLowerCase()}.${s.renegotiationId}`,...a}}}}async addTranche(){throw new Error("Not implemented for V2")}async refinanceFromOffers(){throw new Error("Not implemented for V2")}async delegateMulticall(e){if(e.length===0)throw new Error("At least one delegation must be revoked");let t=await this.safeContractWrite.multicall([e.map(n=>Y({abi:h,functionName:"delegate",args:[n.loanId,n.loan,n.to,n.rights??F,n.enable]}))]);return{txHash:t,waitTxInBlock:async()=>{let n=await this.bcClient.waitForTransactionReceipt({hash:t}),a=await this.contract.createEventFilter.Delegated(),i=d(n,a);if(i.length!==e.length)throw new Error("Delegate multicall failed");return{...n,results:i.map(({args:r})=>r)}}}}async delegate({loan:e,loanId:t,to:n,rights:a=F,enable:i}){let r=await this.safeContractWrite.delegate([t,e,n,a,i]);return{txHash:r,waitTxInBlock:async()=>{let s=await this.bcClient.waitForTransactionReceipt({hash:r}),o=await this.contract.createEventFilter.Delegated(),l=d(s,o);if(l.length===0)throw new Error("Token not delegated");let u=l[0].args;return{loan:{...e,loanId:t,contractAddress:this.contract.address},value:u.value,...s}}}}async revokeDelegate({to:e,collection:t,tokenId:n}){let a=await this.safeContractWrite.revokeDelegate([e,t,n]);return{txHash:a,waitTxInBlock:async()=>{let i=await this.bcClient.waitForTransactionReceipt({hash:a}),r=await this.contract.createEventFilter.RevokeDelegate(),s=d(i,r);if(s.length===0)throw new Error("Token delegation not revoked");return{...s[0].args,...i}}}}async liquidateLoan({loan:e,loanId:t}){let n=await this.safeContractWrite.liquidateLoan([t,e]);return{txHash:n,waitTxInBlock:async()=>{let a=await this.bcClient.waitForTransactionReceipt({hash:n}),i=await this.contract.createEventFilter.LoanForeclosed(),r=await this.contract.createEventFilter.LoanSentToLiquidator(),s=d(a,i),o=d(a,r);if(s.length===0&&o.length===0)throw new Error("Loan not liquidated");return{...s?.[0]?.args??o?.[0]?.args,...a}}}}};y(J,"MslV5");import{encodeFunctionData as ee}from"viem";var te=class extends b{constructor({walletClient:e}){let{MultiSourceLoan:{v6:t}}=I(e.chain);super({walletClient:e,address:t,abi:P})}getDomain(){return{name:L,version:"3",chainId:this.wallet.chain.id,verifyingContract:this.address}}async signOffer({structToSign:e}){return this.wallet.signTypedData({domain:this.getDomain(),primaryType:"LoanOffer",types:{LoanOffer:[{name:"offerId",type:"uint256"},{name:"lender",type:"address"},{name:"fee",type:"uint256"},{name:"capacity",type:"uint256"},{name:"nftCollateralAddress",type:"address"},{name:"nftCollateralTokenId",type:"uint256"},{name:"principalAddress",type:"address"},{name:"principalAmount",type:"uint256"},{name:"aprBps",type:"uint256"},{name:"expirationTime",type:"uint256"},{name:"duration",type:"uint256"},{name:"maxSeniorRepayment",type:"uint256"},{name:"validators",type:"OfferValidator[]"}],OfferValidator:[{name:"validator",type:"address"},{name:"arguments",type:"bytes"}]},message:e})}async signRenegotiationOffer({structToSign:e}){return this.wallet.signTypedData({domain:this.getDomain(),primaryType:"RenegotiationOffer",types:{RenegotiationOffer:[{name:"renegotiationId",type:"uint256"},{name:"loanId",type:"uint256"},{name:"lender",type:"address"},{name:"fee",type:"uint256"},{name:"trancheIndex",type:"uint256[]"},{name:"principalAmount",type:"uint256"},{name:"aprBps",type:"uint256"},{name:"expirationTime",type:"uint256"},{name:"duration",type:"uint256"}]},message:e})}async cancelOffer({id:e}){let t=await this.safeContractWrite.cancelOffer([e]);return{txHash:t,waitTxInBlock:async()=>{let n=await this.bcClient.waitForTransactionReceipt({hash:t}),a=await this.contract.createEventFilter.OfferCancelled(),i=d(n,a);if(i.length===0)throw new Error("Offer not cancelled");return{...i[0].args,...n}}}}async cancelAllOffers({minId:e}){let t=await this.safeContractWrite.cancelAllOffers([e]);return{txHash:t,waitTxInBlock:async()=>{let n=await this.bcClient.waitForTransactionReceipt({hash:t}),a=await this.contract.createEventFilter.AllOffersCancelled(),i=d(n,a);if(i.length===0)throw new Error("Offers not cancelled");return{...i[0].args,...n}}}}async cancelRefinanceOffer({id:e}){let t=await this.safeContractWrite.cancelRenegotiationOffer([e]);return{txHash:t,waitTxInBlock:async()=>{let n=await this.bcClient.waitForTransactionReceipt({hash:t}),a=await this.contract.createEventFilter.RenegotiationOfferCancelled(),i=d(n,a);if(i.length===0)throw new Error("Renegotiation offer not cancelled");return{...i[0].args,...n}}}}async cancelAllRenegotiations(e){throw new Error("Not implemented for V3")}mapEmitLoanToMslEmitLoanArgs({offerExecution:e,tokenId:t,duration:n,principalReceiver:a,expirationTime:i}){return{executionData:{offerExecution:e.map(({offer:s,amount:o,...l})=>({...l,amount:o??s.principalAmount,offer:{...s,lender:s.lenderAddress,validators:s.offerValidators}})),tokenId:t,duration:n,expirationTime:i??BigInt(A(Date.now())+de),principalReceiver:a??this.wallet.account.address,callbackData:"0x"},borrower:this.wallet.account.address,borrowerOfferSignature:"0x"}}async emitLoan(e){let t=this.mapEmitLoanToMslEmitLoanArgs(e),n=await this.safeContractWrite.emitLoan([t]);return{txHash:n,waitTxInBlock:async()=>{let a=await this.bcClient.waitForTransactionReceipt({hash:n}),i=await this.contract.createEventFilter.LoanEmitted(),r=d(a,i);if(r.length===0)throw new Error("Loan not emitted");let s=r[0].args;return{loan:{id:`${this.contract.address.toLowerCase()}.${s.loanId}`,...s.loan,contractAddress:this.contract.address},loanId:s.loanId,offerIds:t.executionData.offerExecution.map(({offer:o})=>`${this.contract.address.toLowerCase()}.${o.lender.toLowerCase()}.${o.offerId}`),...a}}}}async revokeDelegationsAndEmitLoan({delegations:e,emit:t}){if(e.length===0)throw new Error("At least one delegation must be revoked");let n=this.mapEmitLoanToMslEmitLoanArgs(t),{tokenId:a,offerExecution:i}=n.executionData,r=e.map(l=>ee({abi:P,functionName:"revokeDelegate",args:[l,i[0].offer.nftCollateralAddress,a]})),s=ee({abi:P,functionName:"emitLoan",args:[n]}),o=await this.safeContractWrite.multicall([[...r,s]]);return{txHash:o,waitTxInBlock:async()=>{let l=await this.bcClient.waitForTransactionReceipt({hash:o}),u=await this.contract.createEventFilter.RevokeDelegate(),c=d(l,u);if(c.length!==e.length)throw new Error("Revoke delegations failed");let g=await this.contract.createEventFilter.LoanEmitted(),m=d(l,g);if(m.length===0)throw new Error("Loan not emitted");let f=[...c.map(({args:O})=>O),...m.map(({args:O})=>O)],M=m[0].args;return{loan:{id:`${this.contract.address.toLowerCase()}.${M.loanId}`,...M.loan,contractAddress:this.contract.address},loanId:M.loanId,...l,results:f}}}}async repayLoan({loan:e,loanId:t}){let n={loanId:t,callbackData:"0x",shouldDelegate:!1},a=await this.safeContractWrite.repayLoan([{data:n,loan:e,borrowerSignature:"0x"}]);return{txHash:a,waitTxInBlock:async()=>{let i=await this.bcClient.waitForTransactionReceipt({hash:a}),r=await this.contract.createEventFilter.LoanRepaid(),s=d(i,r);if(s.length===0)throw new Error("Loan not repaid");return{...s[0].args,...i}}}}async getRemainingLockupSeconds({loan:e}){let t=e.tranche[e.tranche.length-1],a=e.startTime+e.duration-t.startTime,i=await this.contract.read.getMinLockPeriod(),r=z(i),s=Math.ceil(Number(a)*r),o=Math.ceil(A(Date.now())-Number(t.startTime));return o>=s?0:s-o}async isEndLockedUp({loan:e}){let t=await this.contract.read.getMinLockPeriod(),n=z(t),a=Number(e.startTime+e.duration),i=Math.ceil(Number(e.duration)*n);return Date.now()>V(a-i)}async refinanceBatch({renegotiationId:e,refinancings:t}){let n=t.map(({loan:i,sources:r,newAprBps:s},o)=>{let l=r.map(({source:m})=>BigInt(m.loanIndex)),u=D(r,"refinancingPrincipal")??0n,c={renegotiationId:e+BigInt(o),loanId:H(i),lender:this.wallet.account.address,fee:0n,trancheIndex:l,principalAmount:u,aprBps:s,expirationTime:BigInt(A(Date.now()))+k,duration:BigInt(ce(i))+k};return u===i.principalAmount?ee({abi:P,functionName:"refinanceFull",args:[c,i,F]}):ee({abi:P,functionName:"refinancePartial",args:[c,i]})}),a=await this.safeContractWrite.multicall([n]);return{txHash:a,waitTxInBlock:async()=>{let i=await this.bcClient.waitForTransactionReceipt({hash:a}),r=await this.contract.createEventFilter.LoanRefinanced(),s=d(i,r);if(s.length!==t.length)throw new Error("Loan not refinanced");return{results:s.map(({args:l})=>l),...i}}}}async refinanceFullLoan({offer:e,signature:t,loan:n}){return this.executeRenegotiation({offer:e,executeRenegotiationTxn:()=>this.safeContractWrite.refinanceFull([e,n,t])})}async refinancePartialLoan({offer:e,loan:t}){return this.executeRenegotiation({offer:e,executeRenegotiationTxn:()=>this.safeContractWrite.refinancePartial([e,t])})}async addTranche({offer:e,signature:t,loan:n}){return this.executeRenegotiation({offer:e,executeRenegotiationTxn:()=>this.safeContractWrite.addNewTranche([e,n,t])})}async refinanceFromOffers({loan:e,loanId:t,executionData:n}){let a=this.mapEmitLoanToMslEmitLoanArgs(n),i=await this.safeContractWrite.refinanceFromLoanExecutionData([t,e,a]);return{txHash:i,waitTxInBlock:async()=>{let r=await this.bcClient.waitForTransactionReceipt({hash:i}),s=await this.contract.createEventFilter.LoanRefinancedFromNewOffers(),o=d(r,s);if(o.length===0)throw new Error("LoanRefinancedFromNewOffers not emitted");let l=o[0].args;return{loan:{id:`${this.contract.address.toLowerCase()}.${l.newLoanId}`,...l.loan,contractAddress:this.contract.address},loanId:l.newLoanId,offerIds:a.executionData.offerExecution.map(({offer:u})=>`${this.contract.address.toLowerCase()}.${u.lender.toLowerCase()}.${u.offerId}`),...r}}}}async executeRenegotiation({offer:e,executeRenegotiationTxn:t}){let n=await t();return{txHash:n,waitTxInBlock:async()=>{let a=await this.bcClient.waitForTransactionReceipt({hash:n}),i=await this.contract.createEventFilter.LoanRefinanced(),r=d(a,i);if(r.length===0)throw new Error("Loan not refinanced");let s=r[0].args;return{loan:{id:`${this.contract.address.toLowerCase()}.${s.newLoanId}`,...s.loan,contractAddress:this.contract.address},loanId:s.newLoanId,renegotiationId:`${this.contract.address.toLowerCase()}.${e.lender.toLowerCase()}.${s.renegotiationId}`,...a}}}}async delegateMulticall(e){if(e.length===0)throw new Error("At least one delegation must be revoked");let t=await this.safeContractWrite.multicall([e.map(n=>ee({abi:P,functionName:"delegate",args:[n.loanId,n.loan,n.to,n.rights??F,n.enable]}))]);return{txHash:t,waitTxInBlock:async()=>{let n=await this.bcClient.waitForTransactionReceipt({hash:t}),a=await this.contract.createEventFilter.Delegated(),i=d(n,a);if(i.length!==e.length)throw new Error("Delegate multicall failed");return{...n,results:i.map(({args:r})=>r)}}}}async delegate({loan:e,loanId:t,to:n,rights:a=F,enable:i}){let r=await this.safeContractWrite.delegate([t,e,n,a,i]);return{txHash:r,waitTxInBlock:async()=>{let s=await this.bcClient.waitForTransactionReceipt({hash:r}),o=await this.contract.createEventFilter.Delegated(),l=d(s,o);if(l.length===0)throw new Error("Token not delegated");let u=l[0].args;return{loan:{...e,loanId:t,contractAddress:this.contract.address},value:u.value,...s}}}}async revokeDelegate({to:e,collection:t,tokenId:n}){let a=await this.safeContractWrite.revokeDelegate([e,t,n]);return{txHash:a,waitTxInBlock:async()=>{let i=await this.bcClient.waitForTransactionReceipt({hash:a}),r=await this.contract.createEventFilter.RevokeDelegate(),s=d(i,r);if(s.length===0)throw new Error("Token delegation not revoked");return{...s[0].args,...i}}}}async liquidateLoan({loan:e,loanId:t}){let n=await this.safeContractWrite.liquidateLoan([t,e]);return{txHash:n,waitTxInBlock:async()=>{let a=await this.bcClient.waitForTransactionReceipt({hash:n}),i=await this.contract.createEventFilter.LoanForeclosed(),r=await this.contract.createEventFilter.LoanSentToLiquidator(),s=d(a,i),o=d(a,r);if(s.length===0&&o.length===0)throw new Error("Loan not liquidated");return{...s?.[0]?.args??o?.[0]?.args,...a}}}}};y(te,"MslV6");import{zeroAddress as ne}from"viem";var B=[{inputs:[{internalType:"address",name:"conduitController",type:"address"}],stateMutability:"nonpayable",type:"constructor"},{inputs:[],name:"BadContractSignature",type:"error"},{inputs:[],name:"BadFraction",type:"error"},{inputs:[{internalType:"address",name:"token",type:"address"},{internalType:"address",name:"from",type:"address"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"BadReturnValueFromERC20OnTransfer",type:"error"},{inputs:[{internalType:"uint8",name:"v",type:"uint8"}],name:"BadSignatureV",type:"error"},{inputs:[],name:"CannotCancelOrder",type:"error"},{inputs:[],name:"ConsiderationCriteriaResolverOutOfRange",type:"error"},{inputs:[],name:"ConsiderationLengthNotEqualToTotalOriginal",type:"error"},{inputs:[{internalType:"uint256",name:"orderIndex",type:"uint256"},{internalType:"uint256",name:"considerationIndex",type:"uint256"},{internalType:"uint256",name:"shortfallAmount",type:"uint256"}],name:"ConsiderationNotMet",type:"error"},{inputs:[],name:"CriteriaNotEnabledForItem",type:"error"},{inputs:[{internalType:"address",name:"token",type:"address"},{internalType:"address",name:"from",type:"address"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256[]",name:"identifiers",type:"uint256[]"},{internalType:"uint256[]",name:"amounts",type:"uint256[]"}],name:"ERC1155BatchTransferGenericFailure",type:"error"},{inputs:[],name:"InexactFraction",type:"error"},{inputs:[],name:"InsufficientNativeTokensSupplied",type:"error"},{inputs:[],name:"Invalid1155BatchTransferEncoding",type:"error"},{inputs:[],name:"InvalidBasicOrderParameterEncoding",type:"error"},{inputs:[{internalType:"address",name:"conduit",type:"address"}],name:"InvalidCallToConduit",type:"error"},{inputs:[{internalType:"bytes32",name:"conduitKey",type:"bytes32"},{internalType:"address",name:"conduit",type:"address"}],name:"InvalidConduit",type:"error"},{inputs:[{internalType:"bytes32",name:"orderHash",type:"bytes32"}],name:"InvalidContractOrder",type:"error"},{inputs:[{internalType:"uint256",name:"amount",type:"uint256"}],name:"InvalidERC721TransferAmount",type:"error"},{inputs:[],name:"InvalidFulfillmentComponentData",type:"error"},{inputs:[{internalType:"uint256",name:"value",type:"uint256"}],name:"InvalidMsgValue",type:"error"},{inputs:[],name:"InvalidNativeOfferItem",type:"error"},{inputs:[],name:"InvalidProof",type:"error"},{inputs:[{internalType:"bytes32",name:"orderHash",type:"bytes32"}],name:"InvalidRestrictedOrder",type:"error"},{inputs:[],name:"InvalidSignature",type:"error"},{inputs:[],name:"InvalidSigner",type:"error"},{inputs:[{internalType:"uint256",name:"startTime",type:"uint256"},{internalType:"uint256",name:"endTime",type:"uint256"}],name:"InvalidTime",type:"error"},{inputs:[{internalType:"uint256",name:"fulfillmentIndex",type:"uint256"}],name:"MismatchedFulfillmentOfferAndConsiderationComponents",type:"error"},{inputs:[{internalType:"enum Side",name:"side",type:"uint8"}],name:"MissingFulfillmentComponentOnAggregation",type:"error"},{inputs:[],name:"MissingItemAmount",type:"error"},{inputs:[],name:"MissingOriginalConsiderationItems",type:"error"},{inputs:[{internalType:"address",name:"account",type:"address"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"NativeTokenTransferGenericFailure",type:"error"},{inputs:[{internalType:"address",name:"account",type:"address"}],name:"NoContract",type:"error"},{inputs:[],name:"NoReentrantCalls",type:"error"},{inputs:[],name:"NoSpecifiedOrdersAvailable",type:"error"},{inputs:[],name:"OfferAndConsiderationRequiredOnFulfillment",type:"error"},{inputs:[],name:"OfferCriteriaResolverOutOfRange",type:"error"},{inputs:[{internalType:"bytes32",name:"orderHash",type:"bytes32"}],name:"OrderAlreadyFilled",type:"error"},{inputs:[{internalType:"enum Side",name:"side",type:"uint8"}],name:"OrderCriteriaResolverOutOfRange",type:"error"},{inputs:[{internalType:"bytes32",name:"orderHash",type:"bytes32"}],name:"OrderIsCancelled",type:"error"},{inputs:[{internalType:"bytes32",name:"orderHash",type:"bytes32"}],name:"OrderPartiallyFilled",type:"error"},{inputs:[],name:"PartialFillsNotEnabledForOrder",type:"error"},{inputs:[{internalType:"address",name:"token",type:"address"},{internalType:"address",name:"from",type:"address"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"identifier",type:"uint256"},{internalType:"uint256",name:"amount",type:"uint256"}],name:"TokenTransferGenericFailure",type:"error"},{inputs:[{internalType:"uint256",name:"orderIndex",type:"uint256"},{internalType:"uint256",name:"considerationIndex",type:"uint256"}],name:"UnresolvedConsiderationCriteria",type:"error"},{inputs:[{internalType:"uint256",name:"orderIndex",type:"uint256"},{internalType:"uint256",name:"offerIndex",type:"uint256"}],name:"UnresolvedOfferCriteria",type:"error"},{inputs:[],name:"UnusedItemParameters",type:"error"},{anonymous:!1,inputs:[{indexed:!1,internalType:"uint256",name:"newCounter",type:"uint256"},{indexed:!0,internalType:"address",name:"offerer",type:"address"}],name:"CounterIncremented",type:"event"},{anonymous:!1,inputs:[{indexed:!1,internalType:"bytes32",name:"orderHash",type:"bytes32"},{indexed:!0,internalType:"address",name:"offerer",type:"address"},{indexed:!0,internalType:"address",name:"zone",type:"address"}],name:"OrderCancelled",type:"event"},{anonymous:!1,inputs:[{indexed:!1,internalType:"bytes32",name:"orderHash",type:"bytes32"},{indexed:!0,internalType:"address",name:"offerer",type:"address"},{indexed:!0,internalType:"address",name:"zone",type:"address"},{indexed:!1,internalType:"address",name:"recipient",type:"address"},{components:[{internalType:"enum ItemType",name:"itemType",type:"uint8"},{internalType:"address",name:"token",type:"address"},{internalType:"uint256",name:"identifier",type:"uint256"},{internalType:"uint256",name:"amount",type:"uint256"}],indexed:!1,internalType:"struct SpentItem[]",name:"offer",type:"tuple[]"},{components:[{internalType:"enum ItemType",name:"itemType",type:"uint8"},{internalType:"address",name:"token",type:"address"},{internalType:"uint256",name:"identifier",type:"uint256"},{internalType:"uint256",name:"amount",type:"uint256"},{internalType:"address payable",name:"recipient",type:"address"}],indexed:!1,internalType:"struct ReceivedItem[]",name:"consideration",type:"tuple[]"}],name:"OrderFulfilled",type:"event"},{anonymous:!1,inputs:[{indexed:!1,internalType:"bytes32",name:"orderHash",type:"bytes32"},{components:[{internalType:"address",name:"offerer",type:"address"},{internalType:"address",name:"zone",type:"address"},{components:[{internalType:"enum ItemType",name:"itemType",type:"uint8"},{internalType:"address",name:"token",type:"address"},{internalType:"uint256",name:"identifierOrCriteria",type:"uint256"},{internalType:"uint256",name:"startAmount",type:"uint256"},{internalType:"uint256",name:"endAmount",type:"uint256"}],internalType:"struct OfferItem[]",name:"offer",type:"tuple[]"},{components:[{internalType:"enum ItemType",name:"itemType",type:"uint8"},{internalType:"address",name:"token",type:"address"},{internalType:"uint256",name:"identifierOrCriteria",type:"uint256"},{internalType:"uint256",name:"startAmount",type:"uint256"},{internalType:"uint256",name:"endAmount",type:"uint256"},{internalType:"address payable",name:"recipient",type:"address"}],internalType:"struct ConsiderationItem[]",name:"consideration",type:"tuple[]"},{internalType:"enum OrderType",name:"orderType",type:"uint8"},{internalType:"uint256",name:"startTime",type:"uint256"},{internalType:"uint256",name:"endTime",type:"uint256"},{internalType:"bytes32",name:"zoneHash",type:"bytes32"},{internalType:"uint256",name:"salt",type:"uint256"},{internalType:"bytes32",name:"conduitKey",type:"bytes32"},{internalType:"uint256",name:"totalOriginalConsiderationItems",type:"uint256"}],indexed:!1,internalType:"struct OrderParameters",name:"orderParameters",type:"tuple"}],name:"OrderValidated",type:"event"},{anonymous:!1,inputs:[{indexed:!1,internalType:"bytes32[]",name:"orderHashes",type:"bytes32[]"}],name:"OrdersMatched",type:"event"},{inputs:[{components:[{internalType:"address",name:"offerer",type:"address"},{internalType:"address",name:"zone",type:"address"},{components:[{internalType:"enum ItemType",name:"itemType",type:"uint8"},{internalType:"address",name:"token",type:"address"},{internalType:"uint256",name:"identifierOrCriteria",type:"uint256"},{internalType:"uint256",name:"startAmount",type:"uint256"},{internalType:"uint256",name:"endAmount",type:"uint256"}],internalType:"struct OfferItem[]",name:"offer",type:"tuple[]"},{components:[{internalType:"enum ItemType",name:"itemType",type:"uint8"},{internalType:"address",name:"token",type:"address"},{internalType:"uint256",name:"identifierOrCriteria",type:"uint256"},{internalType:"uint256",name:"startAmount",type:"uint256"},{internalType:"uint256",name:"endAmount",type:"uint256"},{internalType:"address payable",name:"recipient",type:"address"}],internalType:"struct ConsiderationItem[]",name:"consideration",type:"tuple[]"},{internalType:"enum OrderType",name:"orderType",type:"uint8"},{internalType:"uint256",name:"startTime",type:"uint256"},{internalType:"uint256",name:"endTime",type:"uint256"},{internalType:"bytes32",name:"zoneHash",type:"bytes32"},{internalType:"uint256",name:"salt",type:"uint256"},{internalType:"bytes32",name:"conduitKey",type:"bytes32"},{internalType:"uint256",name:"counter",type:"uint256"}],internalType:"struct OrderComponents[]",name:"orders",type:"tuple[]"}],name:"cancel",outputs:[{internalType:"bool",name:"cancelled",type:"bool"}],stateMutability:"nonpayable",type:"function"},{inputs:[{components:[{components:[{internalType:"address",name:"offerer",type:"address"},{internalType:"address",name:"zone",type:"address"},{components:[{internalType:"enum ItemType",name:"itemType",type:"uint8"},{internalType:"address",name:"token",type:"address"},{internalType:"uint256",name:"identifierOrCriteria",type:"uint256"},{internalType:"uint256",name:"startAmount",type:"uint256"},{internalType:"uint256",name:"endAmount",type:"uint256"}],internalType:"struct OfferItem[]",name:"offer",type:"tuple[]"},{components:[{internalType:"enum ItemType",name:"itemType",type:"uint8"},{internalType:"address",name:"token",type:"address"},{internalType:"uint256",name:"identifierOrCriteria",type:"uint256"},{internalType:"uint256",name:"startAmount",type:"uint256"},{internalType:"uint256",name:"endAmount",type:"uint256"},{internalType:"address payable",name:"recipient",type:"address"}],internalType:"struct ConsiderationItem[]",name:"consideration",type:"tuple[]"},{internalType:"enum OrderType",name:"orderType",type:"uint8"},{internalType:"uint256",name:"startTime",type:"uint256"},{internalType:"uint256",name:"endTime",type:"uint256"},{internalType:"bytes32",name:"zoneHash",type:"bytes32"},{internalType:"uint256",name:"salt",type:"uint256"},{internalType:"bytes32",name:"conduitKey",type:"bytes32"},{internalType:"uint256",name:"totalOriginalConsiderationItems",type:"uint256"}],internalType:"struct OrderParameters",name:"parameters",type:"tuple"},{internalType:"uint120",name:"numerator",type:"uint120"},{internalType:"uint120",name:"denominator",type:"uint120"},{internalType:"bytes",name:"signature",type:"bytes"},{internalType:"bytes",name:"extraData",type:"bytes"}],internalType:"struct AdvancedOrder",name:"",type:"tuple"},{components:[{internalType:"uint256",name:"orderIndex",type:"uint256"},{internalType:"enum Side",name:"side",type:"uint8"},{internalType:"uint256",name:"index",type:"uint256"},{internalType:"uint256",name:"identifier",type:"uint256"},{internalType:"bytes32[]",name:"criteriaProof",type:"bytes32[]"}],internalType:"struct CriteriaResolver[]",name:"",type:"tuple[]"},{internalType:"bytes32",name:"fulfillerConduitKey",type:"bytes32"},{internalType:"address",name:"recipient",type:"address"}],name:"fulfillAdvancedOrder",outputs:[{internalType:"bool",name:"fulfilled",type:"bool"}],stateMutability:"payable",type:"function"},{inputs:[{components:[{components:[{internalType:"address",name:"offerer",type:"address"},{internalType:"address",name:"zone",type:"address"},{components:[{internalType:"enum ItemType",name:"itemType",type:"uint8"},{internalType:"address",name:"token",type:"address"},{internalType:"uint256",name:"identifierOrCriteria",type:"uint256"},{internalType:"uint256",name:"startAmount",type:"uint256"},{internalType:"uint256",name:"endAmount",type:"uint256"}],internalType:"struct OfferItem[]",name:"offer",type:"tuple[]"},{components:[{internalType:"enum ItemType",name:"itemType",type:"uint8"},{internalType:"address",name:"token",type:"address"},{internalType:"uint256",name:"identifierOrCriteria",type:"uint256"},{internalType:"uint256",name:"startAmount",type:"uint256"},{internalType:"uint256",name:"endAmount",type:"uint256"},{internalType:"address payable",name:"recipient",type:"address"}],internalType:"struct ConsiderationItem[]",name:"consideration",type:"tuple[]"},{internalType:"enum OrderType",name:"orderType",type:"uint8"},{internalType:"uint256",name:"startTime",type:"uint256"},{internalType:"uint256",name:"endTime",type:"uint256"},{internalType:"bytes32",name:"zoneHash",type:"bytes32"},{internalType:"uint256",name:"salt",type:"uint256"},{internalType:"bytes32",name:"conduitKey",type:"bytes32"},{internalType:"uint256",name:"totalOriginalConsiderationItems",type:"uint256"}],internalType:"struct OrderParameters",name:"parameters",type:"tuple"},{internalType:"uint120",name:"numerator",type:"uint120"},{internalType:"uint120",name:"denominator",type:"uint120"},{internalType:"bytes",name:"signature",type:"bytes"},{internalType:"bytes",name:"extraData",type:"bytes"}],internalType:"struct AdvancedOrder[]",name:"",type:"tuple[]"},{components:[{internalType:"uint256",name:"orderIndex",type:"uint256"},{internalType:"enum Side",name:"side",type:"uint8"},{internalType:"uint256",name:"index",type:"uint256"},{internalType:"uint256",name:"identifier",type:"uint256"},{internalType:"bytes32[]",name:"criteriaProof",type:"bytes32[]"}],internalType:"struct CriteriaResolver[]",name:"",type:"tuple[]"},{components:[{internalType:"uint256",name:"orderIndex",type:"uint256"},{internalType:"uint256",name:"itemIndex",type:"uint256"}],internalType:"struct FulfillmentComponent[][]",name:"",type:"tuple[][]"},{components:[{internalType:"uint256",name:"orderIndex",type:"uint256"},{internalType:"uint256",name:"itemIndex",type:"uint256"}],internalType:"struct FulfillmentComponent[][]",name:"",type:"tuple[][]"},{internalType:"bytes32",name:"fulfillerConduitKey",type:"bytes32"},{internalType:"address",name:"recipient",type:"address"},{internalType:"uint256",name:"maximumFulfilled",type:"uint256"}],name:"fulfillAvailableAdvancedOrders",outputs:[{internalType:"bool[]",name:"",type:"bool[]"},{components:[{components:[{internalType:"enum ItemType",name:"itemType",type:"uint8"},{internalType:"address",name:"token",type:"address"},{internalType:"uint256",name:"identifier",type:"uint256"},{internalType:"uint256",name:"amount",type:"uint256"},{internalType:"address payable",name:"recipient",type:"address"}],internalType:"struct ReceivedItem",name:"item",type:"tuple"},{internalType:"address",name:"offerer",type:"address"},{internalType:"bytes32",name:"conduitKey",type:"bytes32"}],internalType:"struct Execution[]",name:"",type:"tuple[]"}],stateMutability:"payable",type:"function"},{inputs:[{components:[{components:[{internalType:"address",name:"offerer",type:"address"},{internalType:"address",name:"zone",type:"address"},{components:[{internalType:"enum ItemType",name:"itemType",type:"uint8"},{internalType:"address",name:"token",type:"address"},{internalType:"uint256",name:"identifierOrCriteria",type:"uint256"},{internalType:"uint256",name:"startAmount",type:"uint256"},{internalType:"uint256",name:"endAmount",type:"uint256"}],internalType:"struct OfferItem[]",name:"offer",type:"tuple[]"},{components:[{internalType:"enum ItemType",name:"itemType",type:"uint8"},{internalType:"address",name:"token",type:"address"},{internalType:"uint256",name:"identifierOrCriteria",type:"uint256"},{internalType:"uint256",name:"startAmount",type:"uint256"},{internalType:"uint256",name:"endAmount",type:"uint256"},{internalType:"address payable",name:"recipient",type:"address"}],internalType:"struct ConsiderationItem[]",name:"consideration",type:"tuple[]"},{internalType:"enum OrderType",name:"orderType",type:"uint8"},{internalType:"uint256",name:"startTime",type:"uint256"},{internalType:"uint256",name:"endTime",type:"uint256"},{internalType:"bytes32",name:"zoneHash",type:"bytes32"},{internalType:"uint256",name:"salt",type:"uint256"},{internalType:"bytes32",name:"conduitKey",type:"bytes32"},{internalType:"uint256",name:"totalOriginalConsiderationItems",type:"uint256"}],internalType:"struct OrderParameters",name:"parameters",type:"tuple"},{internalType:"bytes",name:"signature",type:"bytes"}],internalType:"struct Order[]",name:"",type:"tuple[]"},{components:[{internalType:"uint256",name:"orderIndex",type:"uint256"},{internalType:"uint256",name:"itemIndex",type:"uint256"}],internalType:"struct FulfillmentComponent[][]",name:"",type:"tuple[][]"},{components:[{internalType:"uint256",name:"orderIndex",type:"uint256"},{internalType:"uint256",name:"itemIndex",type:"uint256"}],internalType:"struct FulfillmentComponent[][]",name:"",type:"tuple[][]"},{internalType:"bytes32",name:"fulfillerConduitKey",type:"bytes32"},{internalType:"uint256",name:"maximumFulfilled",type:"uint256"}],name:"fulfillAvailableOrders",outputs:[{internalType:"bool[]",name:"",type:"bool[]"},{components:[{components:[{internalType:"enum ItemType",name:"itemType",type:"uint8"},{internalType:"address",name:"token",type:"address"},{internalType:"uint256",name:"identifier",type:"uint256"},{internalType:"uint256",name:"amount",type:"uint256"},{internalType:"address payable",name:"recipient",type:"address"}],internalType:"struct ReceivedItem",name:"item",type:"tuple"},{internalType:"address",name:"offerer",type:"address"},{internalType:"bytes32",name:"conduitKey",type:"bytes32"}],internalType:"struct Execution[]",name:"",type:"tuple[]"}],stateMutability:"payable",type:"function"},{inputs:[{components:[{internalType:"address",name:"considerationToken",type:"address"},{internalType:"uint256",name:"considerationIdentifier",type:"uint256"},{internalType:"uint256",name:"considerationAmount",type:"uint256"},{internalType:"address payable",name:"offerer",type:"address"},{internalType:"address",name:"zone",type:"address"},{internalType:"address",name:"offerToken",type:"address"},{internalType:"uint256",name:"offerIdentifier",type:"uint256"},{internalType:"uint256",name:"offerAmount",type:"uint256"},{internalType:"enum BasicOrderType",name:"basicOrderType",type:"uint8"},{internalType:"uint256",name:"startTime",type:"uint256"},{internalType:"uint256",name:"endTime",type:"uint256"},{internalType:"bytes32",name:"zoneHash",type:"bytes32"},{internalType:"uint256",name:"salt",type:"uint256"},{internalType:"bytes32",name:"offererConduitKey",type:"bytes32"},{internalType:"bytes32",name:"fulfillerConduitKey",type:"bytes32"},{internalType:"uint256",name:"totalOriginalAdditionalRecipients",type:"uint256"},{components:[{internalType:"uint256",name:"amount",type:"uint256"},{internalType:"address payable",name:"recipient",type:"address"}],internalType:"struct AdditionalRecipient[]",name:"additionalRecipients",type:"tuple[]"},{internalType:"bytes",name:"signature",type:"bytes"}],internalType:"struct BasicOrderParameters",name:"parameters",type:"tuple"}],name:"fulfillBasicOrder",outputs:[{internalType:"bool",name:"fulfilled",type:"bool"}],stateMutability:"payable",type:"function"},{inputs:[{components:[{internalType:"address",name:"considerationToken",type:"address"},{internalType:"uint256",name:"considerationIdentifier",type:"uint256"},{internalType:"uint256",name:"considerationAmount",type:"uint256"},{internalType:"address payable",name:"offerer",type:"address"},{internalType:"address",name:"zone",type:"address"},{internalType:"address",name:"offerToken",type:"address"},{internalType:"uint256",name:"offerIdentifier",type:"uint256"},{internalType:"uint256",name:"offerAmount",type:"uint256"},{internalType:"enum BasicOrderType",name:"basicOrderType",type:"uint8"},{internalType:"uint256",name:"startTime",type:"uint256"},{internalType:"uint256",name:"endTime",type:"uint256"},{internalType:"bytes32",name:"zoneHash",type:"bytes32"},{internalType:"uint256",name:"salt",type:"uint256"},{internalType:"bytes32",name:"offererConduitKey",type:"bytes32"},{internalType:"bytes32",name:"fulfillerConduitKey",type:"bytes32"},{internalType:"uint256",name:"totalOriginalAdditionalRecipients",type:"uint256"},{components:[{internalType:"uint256",name:"amount",type:"uint256"},{internalType:"address payable",name:"recipient",type:"address"}],internalType:"struct AdditionalRecipient[]",name:"additionalRecipients",type:"tuple[]"},{internalType:"bytes",name:"signature",type:"bytes"}],internalType:"struct BasicOrderParameters",name:"parameters",type:"tuple"}],name:"fulfillBasicOrder_efficient_6GL6yc",outputs:[{internalType:"bool",name:"fulfilled",type:"bool"}],stateMutability:"payable",type:"function"},{inputs:[{components:[{components:[{internalType:"address",name:"offerer",type:"address"},{internalType:"address",name:"zone",type:"address"},{components:[{internalType:"enum ItemType",name:"itemType",type:"uint8"},{internalType:"address",name:"token",type:"address"},{internalType:"uint256",name:"identifierOrCriteria",type:"uint256"},{internalType:"uint256",name:"startAmount",type:"uint256"},{internalType:"uint256",name:"endAmount",type:"uint256"}],internalType:"struct OfferItem[]",name:"offer",type:"tuple[]"},{components:[{internalType:"enum ItemType",name:"itemType",type:"uint8"},{internalType:"address",name:"token",type:"address"},{internalType:"uint256",name:"identifierOrCriteria",type:"uint256"},{internalType:"uint256",name:"startAmount",type:"uint256"},{internalType:"uint256",name:"endAmount",type:"uint256"},{internalType:"address payable",name:"recipient",type:"address"}],internalType:"struct ConsiderationItem[]",name:"consideration",type:"tuple[]"},{internalType:"enum OrderType",name:"orderType",type:"uint8"},{internalType:"uint256",name:"startTime",type:"uint256"},{internalType:"uint256",name:"endTime",type:"uint256"},{internalType:"bytes32",name:"zoneHash",type:"bytes32"},{internalType:"uint256",name:"salt",type:"uint256"},{internalType:"bytes32",name:"conduitKey",type:"bytes32"},{internalType:"uint256",name:"totalOriginalConsiderationItems",type:"uint256"}],internalType:"struct OrderParameters",name:"parameters",type:"tuple"},{internalType:"bytes",name:"signature",type:"bytes"}],internalType:"struct Order",name:"",type:"tuple"},{internalType:"bytes32",name:"fulfillerConduitKey",type:"bytes32"}],name:"fulfillOrder",outputs:[{internalType:"bool",name:"fulfilled",type:"bool"}],stateMutability:"payable",type:"function"},{inputs:[{internalType:"address",name:"contractOfferer",type:"address"}],name:"getContractOffererNonce",outputs:[{internalType:"uint256",name:"nonce",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"offerer",type:"address"}],name:"getCounter",outputs:[{internalType:"uint256",name:"counter",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[{components:[{internalType:"address",name:"offerer",type:"address"},{internalType:"address",name:"zone",type:"address"},{components:[{internalType:"enum ItemType",name:"itemType",type:"uint8"},{internalType:"address",name:"token",type:"address"},{internalType:"uint256",name:"identifierOrCriteria",type:"uint256"},{internalType:"uint256",name:"startAmount",type:"uint256"},{internalType:"uint256",name:"endAmount",type:"uint256"}],internalType:"struct OfferItem[]",name:"offer",type:"tuple[]"},{components:[{internalType:"enum ItemType",name:"itemType",type:"uint8"},{internalType:"address",name:"token",type:"address"},{internalType:"uint256",name:"identifierOrCriteria",type:"uint256"},{internalType:"uint256",name:"startAmount",type:"uint256"},{internalType:"uint256",name:"endAmount",type:"uint256"},{internalType:"address payable",name:"recipient",type:"address"}],internalType:"struct ConsiderationItem[]",name:"consideration",type:"tuple[]"},{internalType:"enum OrderType",name:"orderType",type:"uint8"},{internalType:"uint256",name:"startTime",type:"uint256"},{internalType:"uint256",name:"endTime",type:"uint256"},{internalType:"bytes32",name:"zoneHash",type:"bytes32"},{internalType:"uint256",name:"salt",type:"uint256"},{internalType:"bytes32",name:"conduitKey",type:"bytes32"},{internalType:"uint256",name:"counter",type:"uint256"}],internalType:"struct OrderComponents",name:"",type:"tuple"}],name:"getOrderHash",outputs:[{internalType:"bytes32",name:"orderHash",type:"bytes32"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"bytes32",name:"orderHash",type:"bytes32"}],name:"getOrderStatus",outputs:[{internalType:"bool",name:"isValidated",type:"bool"},{internalType:"bool",name:"isCancelled",type:"bool"},{internalType:"uint256",name:"totalFilled",type:"uint256"},{internalType:"uint256",name:"totalSize",type:"uint256"}],stateMutability:"view",type:"function"},{inputs:[],name:"incrementCounter",outputs:[{internalType:"uint256",name:"newCounter",type:"uint256"}],stateMutability:"nonpayable",type:"function"},{inputs:[],name:"information",outputs:[{internalType:"string",name:"version",type:"string"},{internalType:"bytes32",name:"domainSeparator",type:"bytes32"},{internalType:"address",name:"conduitController",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{components:[{components:[{internalType:"address",name:"offerer",type:"address"},{internalType:"address",name:"zone",type:"address"},{components:[{internalType:"enum ItemType",name:"itemType",type:"uint8"},{internalType:"address",name:"token",type:"address"},{internalType:"uint256",name:"identifierOrCriteria",type:"uint256"},{internalType:"uint256",name:"startAmount",type:"uint256"},{internalType:"uint256",name:"endAmount",type:"uint256"}],internalType:"struct OfferItem[]",name:"offer",type:"tuple[]"},{components:[{internalType:"enum ItemType",name:"itemType",type:"uint8"},{internalType:"address",name:"token",type:"address"},{internalType:"uint256",name:"identifierOrCriteria",type:"uint256"},{internalType:"uint256",name:"startAmount",type:"uint256"},{internalType:"uint256",name:"endAmount",type:"uint256"},{internalType:"address payable",name:"recipient",type:"address"}],internalType:"struct ConsiderationItem[]",name:"consideration",type:"tuple[]"},{internalType:"enum OrderType",name:"orderType",type:"uint8"},{internalType:"uint256",name:"startTime",type:"uint256"},{internalType:"uint256",name:"endTime",type:"uint256"},{internalType:"bytes32",name:"zoneHash",type:"bytes32"},{internalType:"uint256",name:"salt",type:"uint256"},{internalType:"bytes32",name:"conduitKey",type:"bytes32"},{internalType:"uint256",name:"totalOriginalConsiderationItems",type:"uint256"}],internalType:"struct OrderParameters",name:"parameters",type:"tuple"},{internalType:"uint120",name:"numerator",type:"uint120"},{internalType:"uint120",name:"denominator",type:"uint120"},{internalType:"bytes",name:"signature",type:"bytes"},{internalType:"bytes",name:"extraData",type:"bytes"}],internalType:"struct AdvancedOrder[]",name:"",type:"tuple[]"},{components:[{internalType:"uint256",name:"orderIndex",type:"uint256"},{internalType:"enum Side",name:"side",type:"uint8"},{internalType:"uint256",name:"index",type:"uint256"},{internalType:"uint256",name:"identifier",type:"uint256"},{internalType:"bytes32[]",name:"criteriaProof",type:"bytes32[]"}],internalType:"struct CriteriaResolver[]",name:"",type:"tuple[]"},{components:[{components:[{internalType:"uint256",name:"orderIndex",type:"uint256"},{internalType:"uint256",name:"itemIndex",type:"uint256"}],internalType:"struct FulfillmentComponent[]",name:"offerComponents",type:"tuple[]"},{components:[{internalType:"uint256",name:"orderIndex",type:"uint256"},{internalType:"uint256",name:"itemIndex",type:"uint256"}],internalType:"struct FulfillmentComponent[]",name:"considerationComponents",type:"tuple[]"}],internalType:"struct Fulfillment[]",name:"",type:"tuple[]"},{internalType:"address",name:"recipient",type:"address"}],name:"matchAdvancedOrders",outputs:[{components:[{components:[{internalType:"enum ItemType",name:"itemType",type:"uint8"},{internalType:"address",name:"token",type:"address"},{internalType:"uint256",name:"identifier",type:"uint256"},{internalType:"uint256",name:"amount",type:"uint256"},{internalType:"address payable",name:"recipient",type:"address"}],internalType:"struct ReceivedItem",name:"item",type:"tuple"},{internalType:"address",name:"offerer",type:"address"},{internalType:"bytes32",name:"conduitKey",type:"bytes32"}],internalType:"struct Execution[]",name:"",type:"tuple[]"}],stateMutability:"payable",type:"function"},{inputs:[{components:[{components:[{internalType:"address",name:"offerer",type:"address"},{internalType:"address",name:"zone",type:"address"},{components:[{internalType:"enum ItemType",name:"itemType",type:"uint8"},{internalType:"address",name:"token",type:"address"},{internalType:"uint256",name:"identifierOrCriteria",type:"uint256"},{internalType:"uint256",name:"startAmount",type:"uint256"},{internalType:"uint256",name:"endAmount",type:"uint256"}],internalType:"struct OfferItem[]",name:"offer",type:"tuple[]"},{components:[{internalType:"enum ItemType",name:"itemType",type:"uint8"},{internalType:"address",name:"token",type:"address"},{internalType:"uint256",name:"identifierOrCriteria",type:"uint256"},{internalType:"uint256",name:"startAmount",type:"uint256"},{internalType:"uint256",name:"endAmount",type:"uint256"},{internalType:"address payable",name:"recipient",type:"address"}],internalType:"struct ConsiderationItem[]",name:"consideration",type:"tuple[]"},{internalType:"enum OrderType",name:"orderType",type:"uint8"},{internalType:"uint256",name:"startTime",type:"uint256"},{internalType:"uint256",name:"endTime",type:"uint256"},{internalType:"bytes32",name:"zoneHash",type:"bytes32"},{internalType:"uint256",name:"salt",type:"uint256"},{internalType:"bytes32",name:"conduitKey",type:"bytes32"},{internalType:"uint256",name:"totalOriginalConsiderationItems",type:"uint256"}],internalType:"struct OrderParameters",name:"parameters",type:"tuple"},{internalType:"bytes",name:"signature",type:"bytes"}],internalType:"struct Order[]",name:"",type:"tuple[]"},{components:[{components:[{internalType:"uint256",name:"orderIndex",type:"uint256"},{internalType:"uint256",name:"itemIndex",type:"uint256"}],internalType:"struct FulfillmentComponent[]",name:"offerComponents",type:"tuple[]"},{components:[{internalType:"uint256",name:"orderIndex",type:"uint256"},{internalType:"uint256",name:"itemIndex",type:"uint256"}],internalType:"struct FulfillmentComponent[]",name:"considerationComponents",type:"tuple[]"}],internalType:"struct Fulfillment[]",name:"",type:"tuple[]"}],name:"matchOrders",outputs:[{components:[{components:[{internalType:"enum ItemType",name:"itemType",type:"uint8"},{internalType:"address",name:"token",type:"address"},{internalType:"uint256",name:"identifier",type:"uint256"},{internalType:"uint256",name:"amount",type:"uint256"},{internalType:"address payable",name:"recipient",type:"address"}],internalType:"struct ReceivedItem",name:"item",type:"tuple"},{internalType:"address",name:"offerer",type:"address"},{internalType:"bytes32",name:"conduitKey",type:"bytes32"}],internalType:"struct Execution[]",name:"",type:"tuple[]"}],stateMutability:"payable",type:"function"},{inputs:[],name:"name",outputs:[{internalType:"string",name:"",type:"string"}],stateMutability:"pure",type:"function"},{inputs:[{components:[{components:[{internalType:"address",name:"offerer",type:"address"},{internalType:"address",name:"zone",type:"address"},{components:[{internalType:"enum ItemType",name:"itemType",type:"uint8"},{internalType:"address",name:"token",type:"address"},{internalType:"uint256",name:"identifierOrCriteria",type:"uint256"},{internalType:"uint256",name:"startAmount",type:"uint256"},{internalType:"uint256",name:"endAmount",type:"uint256"}],internalType:"struct OfferItem[]",name:"offer",type:"tuple[]"},{components:[{internalType:"enum ItemType",name:"itemType",type:"uint8"},{internalType:"address",name:"token",type:"address"},{internalType:"uint256",name:"identifierOrCriteria",type:"uint256"},{internalType:"uint256",name:"startAmount",type:"uint256"},{internalType:"uint256",name:"endAmount",type:"uint256"},{internalType:"address payable",name:"recipient",type:"address"}],internalType:"struct ConsiderationItem[]",name:"consideration",type:"tuple[]"},{internalType:"enum OrderType",name:"orderType",type:"uint8"},{internalType:"uint256",name:"startTime",type:"uint256"},{internalType:"uint256",name:"endTime",type:"uint256"},{internalType:"bytes32",name:"zoneHash",type:"bytes32"},{internalType:"uint256",name:"salt",type:"uint256"},{internalType:"bytes32",name:"conduitKey",type:"bytes32"},{internalType:"uint256",name:"totalOriginalConsiderationItems",type:"uint256"}],internalType:"struct OrderParameters",name:"parameters",type:"tuple"},{internalType:"bytes",name:"signature",type:"bytes"}],internalType:"struct Order[]",name:"",type:"tuple[]"}],name:"validate",outputs:[{internalType:"bool",name:"",type:"bool"}],stateMutability:"nonpayable",type:"function"},{stateMutability:"payable",type:"receive"}];var ae=class extends b{constructor({walletClient:e}){let{SeaportAddress:t}=I(e.chain);super({walletClient:e,address:t,abi:B})}async getOrderHash(e){return this.contract.read.getOrderHash([e])}async getCounter(){return this.contract.read.getCounter([this.wallet.account.address])}async signOrder(e){let t={name:"Seaport",version:"1.5",chainId:this.wallet.chain?.id,verifyingContract:this.address},n={OrderComponents:[{name:"offerer",type:"address"},{name:"zone",type:"address"},{name:"offer",type:"OfferItem[]"},{name:"consideration",type:"ConsiderationItem[]"},{name:"orderType",type:"uint8"},{name:"startTime",type:"uint256"},{name:"endTime",type:"uint256"},{name:"zoneHash",type:"bytes32"},{name:"salt",type:"uint256"},{name:"conduitKey",type:"bytes32"},{name:"counter",type:"uint256"}],OfferItem:[{name:"itemType",type:"uint8"},{name:"token",type:"address"},{name:"identifierOrCriteria",type:"uint256"},{name:"startAmount",type:"uint256"},{name:"endAmount",type:"uint256"}],ConsiderationItem:[{name:"itemType",type:"uint8"},{name:"token",type:"address"},{name:"identifierOrCriteria",type:"uint256"},{name:"startAmount",type:"uint256"},{name:"endAmount",type:"uint256"},{name:"recipient",type:"address"}]};return this.wallet.signTypedData({domain:t,types:n,primaryType:"OrderComponents",message:e})}async generateOrderFromSaleOffer({collectionContractAddress:e,tokenId:t,price:n,expirationTime:a}){let{WETH_ADDRESS:i}=C(),r={offerer:this.wallet.account.address,zone:ne,offer:[{itemType:1,token:i,identifierOrCriteria:0n,startAmount:n,endAmount:n}],consideration:[{itemType:2,token:e,identifierOrCriteria:t,startAmount:1n,endAmount:1n,recipient:this.wallet.account.address}],orderType:0,startTime:BigInt(Math.floor(A(Date.now()))),endTime:a,zoneHash:F,salt:0n,conduitKey:F,counter:await this.getCounter(),totalOriginalConsiderationItems:1n},s=await this.signOrder(r);return{parameters:r,signature:s}}async recoverOrderFromNativeBid({nativeBid:e,collectionContractAddress:t,tokenId:n}){let{WETH_ADDRESS:a}=C();return{offerer:e.maker,zone:ne,offer:[{itemType:1,token:a,identifierOrCriteria:0n,startAmount:e.netAmount,endAmount:e.netAmount}],consideration:[{itemType:2,token:t,identifierOrCriteria:n,startAmount:1n,endAmount:1n,recipient:e.maker}],orderType:0,startTime:BigInt(Math.floor(A(e.startTime.getTime()))),endTime:BigInt(Math.floor(A(e.expiration?.getTime()??Date.now()))),zoneHash:F,salt:0n,conduitKey:F,counter:await this.getCounter(),totalOriginalConsiderationItems:1n}}async generateInverseOrder(e){return{offerer:this.wallet.account?.address??ne,zone:ne,offer:e.consideration,consideration:e.offer.map(t=>({...t,recipient:this.wallet.account?.address??ne})),orderType:0,startTime:e.startTime,endTime:e.endTime,zoneHash:F,salt:0n,conduitKey:F,counter:await this.getCounter(),totalOriginalConsiderationItems:BigInt(e.offer.length)}}generateFulfillmentsForOrderAndInverse(e){let t=[];return e.offer.forEach((n,a)=>{t.push({offerComponents:[{orderIndex:0n,itemIndex:BigInt(a)}],considerationComponents:[{orderIndex:1n,itemIndex:BigInt(a)}]})}),e.consideration.forEach((n,a)=>{t.push({offerComponents:[{orderIndex:1n,itemIndex:BigInt(a)}],considerationComponents:[{orderIndex:0n,itemIndex:BigInt(a)}]})}),t}async cancel({orderComponents:e}){let t=await this.safeContractWrite.cancel([[e]]);return{txHash:t,waitTxInBlock:async()=>{let n=await this.bcClient.waitForTransactionReceipt({hash:t}),a=await this.contract.createEventFilter.OrderCancelled({offerer:e.offerer}),i=d(n,a);if(i.length===0)throw new Error("Order not cancelled");return{...i[0].args,...n}}}}};y(ae,"Seaport");var ie=class extends b{constructor({walletClient:e}){let{UserVault:t}=I(e.chain);super({walletClient:e,address:t.v5,abi:Qe})}async burnAndWithdraw({vaultId:e,collections:t,tokenIds:n,tokens:a=[]}){if(t.length!=n.length)throw new Error("collections and tokenIds must have the same length");let i=await this.safeContractWrite.burnAndWithdraw([e,t,n,a]);return{txHash:i,waitTxInBlock:async()=>{let r=await this.bcClient.waitForTransactionReceipt({hash:i}),s=await this.contract.createEventFilter.ERC721Withdrawn(),o=d(r,s);if(o.length!==n.length)throw new Error("Withdrawn count mismatch");return{events:o.map(l=>l.args),oldEvents:[],...r}}}}async createVault(e){let{id:t}=await this.#e(),n=[],a={};for(let{collection:i,tokenIds:r}of e)a[i]?a[i].tokenIds.push(...r):a[i]={collection:i,tokenIds:[...r]};for(let{collection:i,tokenIds:r}of Object.values(a)){let o=await(await this.depositERC721s({vaultId:t,collection:i,tokenIds:r})).waitTxInBlock();n.push(o)}return{vaultId:t,receipts:n}}async depositERC721s({vaultId:e,collection:t,tokenIds:n}){let a=await this.safeContractWrite.depositERC721s([e,t,n]);return{txHash:a,waitTxInBlock:async()=>{let i=await this.bcClient.waitForTransactionReceipt({hash:a}),r=await this.contract.createEventFilter.ERC721Deposited(),s=d(i,r);if(s.length===0)throw new Error("Deposit not created");return{...s[0].args,...i}}}}async depositOldERC721s(){throw new Error("Not implemented")}async#e(){let e=await this.safeContractWrite.mint(void 0),t=await this.bcClient.waitForTransactionReceipt({hash:e}),n=await this.contract.createEventFilter.Transfer({}),a=d(t,n);if(a.length===0)throw new Error("Vault not created");return{...a[0].args,...t}}};y(ie,"UserVaultV5");var re=class extends b{constructor({walletClient:e}){let{UserVault:t}=I(e.chain);super({walletClient:e,address:t.v6,abi:Je})}async burnAndWithdraw({vaultId:e,collections:t,tokenIds:n,oldCollections:a=[],oldTokenIds:i=[],tokens:r=[]}){if(t.length!=n.length)throw new Error("collections and tokenIds must have the same length");if(a.length!=i.length)throw new Error("oldCollections and oldTokenIds must have the same length");let s=await this.safeContractWrite.burnAndWithdraw([e,t,n,a,i,r]);return{txHash:s,waitTxInBlock:async()=>{let o=await this.bcClient.waitForTransactionReceipt({hash:s}),l=await this.contract.createEventFilter.ERC721Withdrawn({}),u=d(o,l),c=await this.contract.createEventFilter.OldERC721Withdrawn({}),g=d(o,c);if(u.length!==n.length||g.length!==i.length)throw new Error("Withdrawn count mismatch");return{events:u.map(m=>m.args),oldEvents:u.map(m=>m.args),...o}}}}async createVault(e){let{id:t}=await this.#e(),n=[],a={};for(let{collection:i,tokenIds:r,isOldErc721:s}of e)a[i]?a[i].tokenIds.push(...r):a[i]={collection:i,tokenIds:[...r],isOldErc721:s};for(let{collection:i,tokenIds:r,isOldErc721:s}of Object.values(a)){let l=await(s?await this.depositOldERC721s({vaultId:t,collection:i,tokenIds:r}):await this.depositERC721s({vaultId:t,collection:i,tokenIds:r})).waitTxInBlock();n.push(l)}return{vaultId:t,receipts:n}}async depositERC721s({vaultId:e,collection:t,tokenIds:n}){let a=await this.safeContractWrite.depositERC721s([e,t,n]);return{txHash:a,waitTxInBlock:async()=>{let i=await this.bcClient.waitForTransactionReceipt({hash:a}),r=await this.contract.createEventFilter.ERC721Deposited({}),s=d(i,r);if(s.length===0)throw new Error("Deposit not created");return{...s[0].args,...i}}}}async depositOldERC721s({vaultId:e,collection:t,tokenIds:n}){let a=await this.safeContractWrite.depositOldERC721s([e,t,n]);return{txHash:a,waitTxInBlock:async()=>{let i=await this.bcClient.waitForTransactionReceipt({hash:a}),r=await this.contract.createEventFilter.OldERC721Deposited({}),s=d(i,r);if(s.length===0)throw new Error("Deposit not created");return{...s[0].args,...i}}}}async#e(){let e=await this.safeContractWrite.mint(void 0),t=await this.bcClient.waitForTransactionReceipt({hash:e}),n=await this.contract.createEventFilter.Transfer({}),a=d(t,n);if(a.length===0)throw new Error("Vault not created");return{...a[0].args,...t}}};y(re,"UserVaultV6");var se=class{walletClient;publicClient;MultiSourceLoanV4;MultiSourceLoanV5;MultiSourceLoanV6;AuctionLoanLiquidatorV4;AuctionLoanLiquidatorV5;AuctionLoanLiquidatorV6;UserVaultV5;UserVaultV6;Leverage;Seaport;CryptoPunks;constructor(e,t){this.walletClient=t,this.publicClient=e,this.MultiSourceLoanV4=new j({walletClient:t}),this.MultiSourceLoanV5=new J({walletClient:t}),this.MultiSourceLoanV6=new te({walletClient:t}),this.AuctionLoanLiquidatorV4=new N({walletClient:t}),this.AuctionLoanLiquidatorV5=new Q({walletClient:t}),this.AuctionLoanLiquidatorV6=new G({walletClient:t}),this.UserVaultV5=new ie({walletClient:t}),this.UserVaultV6=new re({walletClient:t}),this.Leverage=new X({walletClient:t,mslAddress:this.MultiSourceLoanV5.address}),this.Seaport=new ae({walletClient:t}),this.CryptoPunks=new Z({walletClient:t})}Msl(e){if(S(e,this.MultiSourceLoanV4.address))return this.MultiSourceLoanV4;if(S(e,this.MultiSourceLoanV5.address))return this.MultiSourceLoanV5;if(S(e,this.MultiSourceLoanV6.address))return this.MultiSourceLoanV6;throw new Error(`Invalid Contract Address ${e}`)}All(e){if(S(e,this.MultiSourceLoanV4.address))return this.AuctionLoanLiquidatorV4;if(S(e,this.MultiSourceLoanV5.address))return this.AuctionLoanLiquidatorV5;if(S(e,this.MultiSourceLoanV6.address))return this.AuctionLoanLiquidatorV6;throw new Error(`Invalid Contract Address ${e}`)}UserVault(e){if(S(e,this.UserVaultV5.address))return this.UserVaultV5;if(S(e,this.UserVaultV6.address))return this.UserVaultV6;throw new Error(`Invalid Contract Address ${e}`)}ERC721(e){return Se({address:e,abi:le,walletClient:this.walletClient,publicClient:this.publicClient})}OldERC721(e){return Se({address:e,abi:qe,walletClient:this.walletClient,publicClient:this.publicClient})}ERC20(e){return Se({address:e,abi:We,walletClient:this.walletClient,publicClient:this.publicClient})}};y(se,"Contracts");var rt=115792089237316195423570985008687907853269984665640564039457584007913129639935n;import{createClient as Fn}from"@reservoir0x/reservoir-sdk";import{createPublicClient as An,encodeAbiParameters as Sn,encodeFunctionData as pt,getContract as xn,http as Mn,zeroAddress as vn}from"viem";import{mainnet as On}from"viem/chains";var U=class{orderId;to;callbackData;value;constructor({orderId:e,to:t,callbackData:n,value:a}){this.orderId=e,this.to=t,this.callbackData=n,this.value=a}};y(U,"InterruptedSendTransactionStepError");var _=class extends U{signature;constructor({orderId:e,to:t,callbackData:n,value:a,signature:i}){super({orderId:e,to:t,callbackData:n,value:a}),this.signature=i}};y(_,"InterruptedSeaportSendTransactionStepError");var E=class extends U{};y(E,"InterruptedCryptoPunksSendTransactionStepError");var R=class extends U{};y(R,"InterruptedGenericSendTransactionStepError");import{adaptViemWallet as Tn}from"@reservoir0x/reservoir-sdk";import{decodeFunctionData as gn,zeroAddress as bn}from"viem";var xe=y(p=>p==="opensea.io","isOpensea"),In=y(p=>p==="cryptopunks.app","isCryptopunks"),st=y(p=>p==="gondi.xyz","isNative"),Me=y((p,e)=>({...Tn(p),transport:void 0,handleSendTransactionStep:async(a,i,r)=>{if(r.id!=="sale")return console.log(r),Ge;let s=i.orderIds?.[0]??"",o=i.data.to,l=i.data.data,u=BigInt(i.data.value??0);if(xe(e)){let g=gn({abi:B,data:i.data.data})?.args?.[0],m=Array.isArray(g)?g[0].signature:typeof g=="object"?g.signature:bn;throw new _({orderId:s,to:o,callbackData:l,value:u,signature:m})}else throw In(e)?new E({orderId:s,to:o,callbackData:l,value:u}):new R({orderId:s,to:o,callbackData:l,value:u})}}),"adaptWalletToCaptureTxData");var pe=class{baseApiUrl;mainnetClient;wallet;Seaport;CryptoPunks;client;EXECUTION_INFO_ABI=[{name:"ExecutionInfo",type:"tuple",components:[{name:"module",type:"address"},{name:"data",type:"bytes"},{name:"value",type:"uint256"}]}];constructor({baseApiUrl:e="https://api.reservoir.tools",wallet:t,Seaport:n,CryptoPunks:a}){this.baseApiUrl=e,this.wallet=t,this.Seaport=n,this.CryptoPunks=a;let{reservoirApiKey:i,infuraApiKey:r}=Ze();this.client=Fn({chains:[{id:t.chain.id,name:t.chain.name,baseApiUrl:e,active:!0}],apiKey:i,source:"gondi.xyz"}),this.mainnetClient=An({chain:On,transport:Mn(`https://mainnet.infura.io/v3/${r}`)})}async getAsk({orderId:e}){return fetch(`${this.baseApiUrl}/orders/asks/v5?ids=${e}&includeRawData=true`).then(t=>t.json()).then(({orders:t})=>{if(!t)throw new Error(`Order ${e} is not available anymore`);return t[0]})}async getBid({orderId:e}){return fetch(`${this.baseApiUrl}/orders/bids/v6?ids=${e}&includeRawData=true`).then(t=>t.json()).then(({orders:t})=>{if(!t)throw new Error(`Order ${e} is not available anymore`);return t[0]})}generateExpectedCurrencyPriceObject(e,t){return{[t]:{raw:e,currencyAddress:t,currencyDecimals:18}}}encodeExecutionData({module:e,data:t,value:n}){return Sn(this.EXECUTION_INFO_ABI,[{module:e,data:t,value:n}])}async generateMatchOrdersExecutionData({askOrBid:e,signature:t,side:n="ask"}){let a={parameters:{...e.rawData,totalOriginalConsiderationItems:BigInt(e.rawData.consideration.length)},signature:t},i=await this.Seaport.generateInverseOrder(a.parameters),r={parameters:i,signature:await this.Seaport.signOrder(i)},s=this.Seaport.generateFulfillmentsForOrderAndInverse(a.parameters),o=pt({abi:B,functionName:"matchOrders",args:[[a,r],s]}),l=n==="ask"?a.parameters.consideration.reduce((u,c)=>u+(c.itemType===0?BigInt(c.endAmount):0n),0n):BigInt(e.price.netAmount.raw);return{callbackData:this.encodeExecutionData({module:this.Seaport.address,data:o,value:l}),value:l,isSeaportCall:!0}}async generateFulfillOrderExecutionData({askOrBid:e,signature:t,tokenId:n}){let a={parameters:{...e.rawData,totalOriginalConsiderationItems:BigInt(e.rawData.consideration.length)},numerator:1n,denominator:1n,signature:t,extraData:"0x"},i=a.parameters.consideration.findIndex(o=>o.itemType===4),r=pt({abi:B,functionName:"fulfillAdvancedOrder",args:[a,i!==-1?[{orderIndex:0n,side:1,index:BigInt(i),identifier:n,criteriaProof:[]}]:[],F,vn]}),s=BigInt(e.price.netAmount.raw);return{callbackData:this.encodeExecutionData({module:this.Seaport.address,data:r,value:s}),value:s,isSeaportCall:!0}}async buyTokens(e){let{ETH_ADDRESS:t}=C(),n=e.reduce((a,i)=>a+i.price,0n);return this.client?.actions.buyToken({items:e.map(a=>({token:`${a.collectionContractAddress}:${a.tokenId}`,quantity:1,exactOrderSource:a.orderSource})),expectedPrice:this.generateExpectedCurrencyPriceObject(n,t),wallet:this.wallet,onProgress:()=>null,precheck:!1,options:{excludeEOA:!0,skipBalanceCheck:!0}})}async getExecutionDataForBuyToken({collectionContractAddress:e,tokenId:t,price:n,exactOrderSource:a}){let i=Me(this.wallet,a),{ETH_ADDRESS:r}=C();try{throw await this.client?.actions.buyToken({items:[{token:`${e}:${t}`,quantity:1,exactOrderSource:a}],expectedPrice:this.generateExpectedCurrencyPriceObject(n,r),wallet:i,onProgress:()=>null,precheck:!1,options:{excludeEOA:!0,skipBalanceCheck:!0}}),new Error("This should never happen since we will throw inside the wallet tx")}catch(s){if(s instanceof _){let{orderId:o,signature:l}=s,u=await this.getAsk({orderId:o});return this.generateMatchOrdersExecutionData({askOrBid:u,signature:l})}else if(s instanceof E){let{value:o}=s,l=await this.CryptoPunks.encodeBuyPunk(t);return{callbackData:this.encodeExecutionData({module:this.CryptoPunks.address,data:l,value:o}),value:o,isSeaportCall:!1}}else if(s instanceof R){let{to:o,callbackData:l,value:u}=s;return{callbackData:this.encodeExecutionData({module:o,data:l,value:u}),value:u,isSeaportCall:!1}}else throw new Error(`No available offer for price ${n}`)}}async getCallbackDataForSellToken({collectionContractAddress:e,tokenId:t,price:n,exactOrderSource:a}){let i=Me(this.wallet,a),{WETH_ADDRESS:r}=C(),{LeverageAddress:s}=I(this.wallet.chain),l=await xn({abi:le,address:e,publicClient:this.mainnetClient}).read.ownerOf([t]);try{throw await this.client?.actions.acceptOffer({items:[{token:`${e}:${t}`,quantity:1,exactOrderSource:a}],expectedPrice:this.generateExpectedCurrencyPriceObject(n,r),wallet:i,onProgress:()=>null,precheck:!1,options:{excludeEOA:!0,taker:xe(a)?l:s}}),new Error("This should never happen since we will throw inside the wallet tx")}catch(u){if(u instanceof _){let{orderId:c,signature:g}=u,m=await this.getBid({orderId:c});return this.generateFulfillOrderExecutionData({askOrBid:m,signature:g,tokenId:t})}else if(u instanceof R){let{orderId:c,to:g,callbackData:m}=u,f=await this.getBid({orderId:c});return{callbackData:this.encodeExecutionData({module:g,data:m,value:BigInt(f.price?.netAmount?.raw??0n)}),value:BigInt(f.price?.netAmount?.raw??0n),isSeaportCall:!1}}else throw new Error(`No available offer for price ${n}`)}}};y(pe,"Reservoir");var ve="fulfilled",Oe="rejected";var me=class{contracts;wallet;bcClient;api;reservoir;defaults;constructor({wallet:e,apiClient:t,reservoirBaseApiUrl:n}){this.wallet=e,this.bcClient=wn({chain:e.chain,transport:()=>hn(e.transport)}),this.contracts=new se(this.bcClient,e),this.defaults={Msl:this.contracts.MultiSourceLoanV6.address,UserVault:this.contracts.UserVaultV5.address},this.api=new $({wallet:e,apiClient:t}),this.reservoir=new pe({baseApiUrl:n,wallet:e,Seaport:this.contracts.Seaport,CryptoPunks:this.contracts.CryptoPunks})}async makeSingleNftOffer(e){return await this._makeSingleNftOffer(e)}async _makeSingleNftOffer(e,t){let n=this.contracts.Msl(t??this.defaults.Msl),a=n.address,i={...e,lenderAddress:e.lenderAddress?e.lenderAddress:this.wallet.account?.address,signerAddress:this.wallet.account?.address,borrowerAddress:e.borrowerAddress??v,requiresLiquidation:!!e.requiresLiquidation,contractAddress:a,offerValidators:[]},r=await this.api.generateSingleNftOfferHash({offerInput:i}),{offerHash:s,offerId:o,validators:l,lenderAddress:u,signerAddress:c,borrowerAddress:g}=r.offer,m=r.offer.nft.collection?.contractData?.contractAddress;if(m===void 0)throw new Error("Invalid nft");let f={...i,lender:u??i.lenderAddress,signer:c??i.signerAddress,borrower:g??i.borrowerAddress,nftCollateralTokenId:r.offer.nft.tokenId,nftCollateralAddress:m,validators:l,offerId:o},M=await n.signOffer({structToSign:f}),O={...i,offerValidators:l.map(q=>({arguments:q.arguments,validator:q.validator})),offerHash:s??F,offerId:o,signature:M};return await this.api.saveSingleNftOffer(O)}async makeCollectionOffer(e){return await this._makeCollectionOffer(e)}async _makeCollectionOffer(e,t){let n=this.contracts.Msl(t??this.defaults.Msl),a=n.address,i={...e,lenderAddress:e.lenderAddress?e.lenderAddress:this.wallet.account?.address,signerAddress:this.wallet.account?.address,borrowerAddress:e.borrowerAddress??v,requiresLiquidation:!!e.requiresLiquidation,contractAddress:a,offerValidators:[{validator:v,arguments:Ue}]},r=await this.api.generateCollectionOfferHash({offerInput:i}),s=r.offer.collection.contractData?.contractAddress;if(s===void 0)throw new Error("Invalid collection");let{offerHash:o,offerId:l,validators:u,lenderAddress:c,signerAddress:g,borrowerAddress:m}=r.offer,f={...i,lender:c??i.lenderAddress,signer:g??i.signerAddress,borrower:m??i.borrowerAddress,nftCollateralTokenId:0n,nftCollateralAddress:s,validators:u,offerId:l},M=await n.signOffer({structToSign:f}),O={...i,offerValidators:u.map(q=>({arguments:q.arguments,validator:q.validator})),offerHash:o??F,offerId:l,signature:M};return await this.api.saveCollectionOffer(O)}async makeSaleOffer({collectionContractAddress:e,tokenId:t,price:n,expirationTime:a}){let{parameters:{totalOriginalConsiderationItems:i,...r},signature:s}=await this.contracts.Seaport.generateOrderFromSaleOffer({collectionContractAddress:e,tokenId:t,price:n,expirationTime:a});return this.api.saveSignedSaleOffer({offer:{...r,signature:s}})}async cancelSaleOffer({saleOffer:e}){return this.contracts.Seaport.cancel({orderComponents:e})}async cancelOffer({id:e,contractAddress:t}){return this.contracts.Msl(t).cancelOffer({id:e})}async cancelAllOffers({minId:e,contractAddress:t}){return this.contracts.Msl(t).cancelAllOffers({minId:e})}async hideOffer({id:e,contractAddress:t}){return this.api.hideOffer({contract:t,id:e.toString()})}async unhideOffer({id:e,contractAddress:t}){return this.api.unhideOffer({contract:t,id:e.toString()})}async makeRefinanceOffer({renegotiation:e,contractAddress:t,skipSignature:n}){let a={lenderAddress:this.wallet.account?.address,signerAddress:this.wallet.account?.address,...e,targetPrincipal:e.targetPrincipal??[],trancheIndex:e.trancheIndex??[]},i=await this.api.generateRenegotiationOfferHash({renegotiationInput:a}),{renegotiationId:r,offerHash:s,loanId:o,lenderAddress:l,signerAddress:u}=i.offer;if(n)return{...a,offerHash:s??F,signature:F,renegotiationId:r};let c={...a,fee:a.feeAmount,lender:l??a.lenderAddress,signer:u??a.signerAddress??v,strictImprovement:!1,loanId:o,renegotiationId:r},m=await this.contracts.Msl(t).signRenegotiationOffer({structToSign:c}),f={...a,signature:m,offerHash:s??F,renegotiationId:r};return await this.api.saveRefinanceOffer(f)}async cancelRefinanceOffer({id:e,contractAddress:t}){return this.contracts.Msl(t).cancelRefinanceOffer({id:e})}async hideRenegotiationOffer({id:e,contractAddress:t}){return this.api.hideRenegotiationOffer({id:e.toString(),contractAddress:t})}async unhideRenegotiationOffer({id:e,contractAddress:t}){return this.api.unhideRenegotiationOffer({id:e.toString(),contractAddress:t})}async hideSaleOffer({id:e}){return this.api.hideSaleOffer({id:e})}async unhideSaleOffer({id:e}){return this.api.unhideSaleOffer({id:e})}async cancelAllRenegotiations({minId:e,contractAddress:t}){return this.contracts.Msl(t).cancelAllRenegotiations({minId:e})}offerExecutionFromOffers(e,t){return e.map((n,a)=>{let{signature:i,lenderAddress:r,borrowerAddress:s,offerHash:o}=n;if(!(i&&r&&s&&o))throw new Error("Misisng required field for offer");return{offer:{...n,offerHash:o,lenderAddress:r,lender:r,borrowerAddress:s,borrower:s,signature:i,maxSeniorRepayment:n.maxSeniorRepayment??0n},amount:t?.[a]??n.principalAmount,lenderOfferSignature:i}})}async emitLoan(e){let t=e.offerExecution[0].offer.contractAddress;return this.contracts.Msl(t).emitLoan(e)}async refinanceFromOffers({loan:e,loanId:t,executionData:n}){return this.contracts.Msl(e.contractAddress).refinanceFromOffers({loan:x(e),loanId:t,executionData:n})}async repayLoan({loan:e,loanId:t,nftReceiver:n}){return this.contracts.Msl(e.contractAddress).repayLoan({loan:x(e),nftReceiver:n,loanId:t})}async offers({limit:e=20,cursor:t,sortBy:n={field:"CREATED_DATE",order:"DESC"},filterBy:a={}}){let{status:i,nft:r,collection:s,borrower:o,...l}=a;return await this.api.listOffers({first:e,after:t,sortBy:n,statuses:i,nfts:r?[r]:[],collections:s?[s]:[],borrowerAddress:o,...l})}async loans({limit:e=20,cursor:t,...n}){return await this.api.listLoans({first:e,after:t,...n})}async list({nft:e}){return await this.api.listNft({nftId:e})}async unlist({nft:e}){return await this.api.unlistNft({nftId:e})}async listings({collections:e,user:t,marketPlaces:n=["GONDI"],limit:a=20,cursor:i}){return await this.api.listListings({collections:e,userFilter:t,marketplaceNames:n,after:i,first:a})}async nftId(e){let t;if(e.slug&&(t=await this.api.nftIdBySlugTokenId(e)),e.contractAddress&&(t=await this.api.nftIdByContractAddressAndTokenId(e)),!t?.nft)throw new Error(`invalid nft ${e}`);return Number(t.nft.id)}async collections(e){let t=await this.api.collections({currency:e.statsCurrency??v}),{edges:n,pageInfo:a}=t.collections;return{collections:n.map(i=>i.node),pageInfo:a}}async collectionId(e){let t;if(e.slug){if(t=await this.api.collectionIdBySlug(e),!t?.collection)throw new Error(`invalid collection ${e}`);return Number(t.collection.id)}if(e.contractAddress){if(t=await this.api.collectionsIdByContractAddress(e),!t?.collections)throw new Error(`invalid collection ${e}`);return t.collections.map(n=>Number(n.id))}}async ownedNfts(){let e=await this.api.ownedNfts(),{edges:t,pageInfo:n}=e.ownedNfts;return{ownedNfts:t.map(a=>a.node),pageInfo:n}}async getRemainingLockupSeconds({loan:e}){return this.contracts.Msl(e.contractAddress).getRemainingLockupSeconds({loan:x(e)})}async isEndLockedUp({loan:e}){return this.contracts.Msl(e.contractAddress).isEndLockedUp({loan:x(e)})}async getBestNativeSaleOffer({contractAddress:e,tokenId:t}){let{WETH_ADDRESS:n}=C(),a=await this.nftId({contractAddress:e,tokenId:t}),{bids:i}=await this.api.listBestBidsForNft({nftId:a,currencyAddress:n});return i.find(s=>s.marketPlace===ze)??null}contractToVersion(e){return S(e,this.contracts.MultiSourceLoanV4.address)?"v4":S(e,this.contracts.MultiSourceLoanV5.address)?"v5":"v6"}async generateRenegotiationId({loanId:e,loan:t}){let n=it({loanId:e,loan:t,trancheIndex:S(t.contractAddress,this.contracts.MultiSourceLoanV6.address),address:this.wallet.account?.address}),{offer:a}=await this.api.generateRenegotiationOfferHash({renegotiationInput:n});return a.renegotiationId}async refinanceBatch({aprBpsImprovementPercentage:e,refinancings:t}){let n={v4:{},v5:{},v6:{}};t.forEach(({loan:r,source:s,refinancingPrincipal:o})=>{let l=`${r.nftCollateralAddress}-${r.nftCollateralTokenId}`,u=this.contractToVersion(r.contractAddress),c=n[u][l],g=BigInt(Math.floor(Number(s.aprBps)*(1-e))),m=tt(c?.newAprBps,g);n[u][l]={loan:x(r),loanReferenceId:r.loanReferenceId,newAprBps:m,sources:[...c?.sources??[],{source:s,refinancingPrincipal:o}]}});let a=["v4","v5","v6"],i=[];for(let r of a){let s=Object.values(n[r]);if(s.length>0){let o=await this.generateRenegotiationId({loan:s[0].loan,loanId:s[0].loanReferenceId});try{let l=r==="v4"?await this.contracts.MultiSourceLoanV4.refinanceBatch({refinancings:Object.values(n.v4),renegotiationId:o}):r==="v5"?await this.contracts.MultiSourceLoanV5.refinanceBatch({refinancings:Object.values(n.v5),renegotiationId:o}):await this.contracts.MultiSourceLoanV6.refinanceBatch({refinancings:Object.values(n.v6),renegotiationId:o});i.push({status:ve,value:l})}catch(l){i.push({status:Oe,reason:l,value:s})}}}return i}async refinanceFullLoan({offer:e,loan:t,loanId:n}){return this.contracts.Msl(t.contractAddress).refinanceFullLoan({offer:ue(e,n),loan:x(t),signature:e.signature})}async refinancePartialLoan({offer:e,loan:t,loanId:n}){return this.contracts.Msl(t.contractAddress).refinancePartialLoan({offer:ue(e,n),loan:x(t)})}async addTranche({offer:e,loan:t,loanId:n}){return this.contracts.Msl(t.contractAddress).addTranche({offer:ue(e,n),loan:x(t),signature:e.signature})}async delegateMulticall(e){let t=e[0].loan.contractAddress;return this.contracts.Msl(t).delegateMulticall(e.map(n=>({...n,loan:x(n.loan)})))}async delegate({loan:e,loanId:t,to:n,enable:a,rights:i}){return this.contracts.Msl(e.contractAddress).delegate({loan:x(e),loanId:t,to:n,rights:i,enable:a})}async revokeDelegate({to:e,collection:t,tokenId:n,contract:a=this.defaults.Msl}){return this.contracts.Msl(a).revokeDelegate({to:e,collection:t,tokenId:n})}async revokeDelegationsAndEmitLoan({delegations:e,emit:t}){let n=t.offerExecution[0].offer.contractAddress;return this.contracts.Msl(n).revokeDelegationsAndEmitLoan({delegations:e,emit:t})}async liquidateLoan({loan:e,loanId:t}){return this.contracts.Msl(e.contractAddress).liquidateLoan({loanId:t,loan:x(e)})}async placeBid({collectionContractAddress:e,tokenId:t,bid:n,auction:a}){return this.contracts.All(a.loanAddress).placeBid({collectionContractAddress:e,tokenId:t,bid:n,auction:a})}async settleAuction({loan:e,auction:t}){return this.contracts.All(t.loanAddress).settleAuction({auction:t,loan:x(e)})}async settleAuctionWithBuyout({loan:e,auction:t}){return this.contracts.All(t.loanAddress).settleAuctionWithBuyout({auction:t,loan:x(e)})}async getAuctionRemainingLockupSeconds({auction:e}){return this.contracts.All(e.loanAddress).getRemainingLockupSeconds({auction:e})}async buy(e){return this.reservoir.buyTokens(e)}async leverageBuy({leverageBuyData:e}){let t=await Promise.all(e.map(i=>this.reservoir.getExecutionDataForBuyToken({collectionContractAddress:i.nft.collectionContractAddress,tokenId:i.nft.tokenId,price:i.nft.price,exactOrderSource:i.nft.orderSource}))),n=t.reduce((i,{value:r},s)=>i+r-e[s].amount+e[s].offer.fee,0n),a=e.map((i,r)=>({...i,callbackData:t[r].callbackData}));return this.contracts.Leverage.buy({leverageBuyData:a,ethToSend:n<0n?0n:n})}async leverageSell({loan:e,loanId:t,price:n,orderSource:a}){let i=null;if(st(a)){let s=await this.getBestNativeSaleOffer({contractAddress:e.nftCollateralAddress,tokenId:e.nftCollateralTokenId});if(!s||s.netAmount<n)throw new Error(`No native bid for price ${n}`);i=await this.reservoir.generateFulfillOrderExecutionData({askOrBid:{rawData:await this.contracts.Seaport.recoverOrderFromNativeBid({nativeBid:s,collectionContractAddress:e.nftCollateralAddress,tokenId:e.nftCollateralTokenId}),price:{netAmount:{raw:String(n)}}},signature:s.signature,tokenId:e.nftCollateralTokenId})}else i=await this.reservoir.getCallbackDataForSellToken({collectionContractAddress:e.nftCollateralAddress,tokenId:e.nftCollateralTokenId,price:n,exactOrderSource:a});let r=i.isSeaportCall;return this.contracts.Leverage.sell({loan:e,callbackData:i.callbackData,shouldDelegate:r,loanId:t})}async getOwner({nftAddress:e,tokenId:t}){return this.contracts.ERC721(e).read.ownerOf([t])}async isApprovedNFTForAll({nftAddress:e,to:t=this.defaults.Msl}){return this.contracts.ERC721(e).read.isApprovedForAll([this.wallet.account?.address,t])}async isApprovedNFT({nftAddress:e,isOldErc721:t,tokenId:n,to:a=this.defaults.Msl}){if(t){let r=await this.contracts.OldERC721(e).read.approvedFor([n]);return S(r,a)}return this.isApprovedNFTForAll({nftAddress:e,to:a})}async approveNFTForAll({nftAddress:e,to:t=this.defaults.Msl}){let n=this.contracts.ERC721(e),a=await n.write.setApprovalForAll([t,!0]);return{txHash:a,waitTxInBlock:async()=>{let i=await this.bcClient.waitForTransactionReceipt({hash:a}),r=await n.createEventFilter.ApprovalForAll({}),s=d(i,r);if(s.length===0)throw new Error("ERC721 approval for all not set");return{...s[0].args,...i}}}}async approveNFT({nftAddress:e,isOldErc721:t,tokenId:n,to:a=this.defaults.Msl}){if(t){let i=this.contracts.OldERC721(e),r=await i.write.approve([a,n]);return{txHash:r,waitTxInBlock:async()=>{let s=await this.bcClient.waitForTransactionReceipt({hash:r}),o=await i.createEventFilter.Approval({}),l=d(s,o);if(l.length===0)throw new Error("ERC721 approval not set");return{...l[0].args,...s}}}}return this.approveNFTForAll({nftAddress:e,to:a})}async isApprovedToken({tokenAddress:e,amount:t,to:n=this.defaults.Msl}){return await this.contracts.ERC20(e).read.allowance([this.wallet.account?.address,n])>=t}async approveToken({tokenAddress:e,amount:t=rt,to:n=this.defaults.Msl}){let a=this.contracts.ERC20(e),i=await a.write.approve([n,t]);return{txHash:i,waitTxInBlock:async()=>{let r=await this.bcClient.waitForTransactionReceipt({hash:i}),s=await a.createEventFilter.Approval({}),o=d(r,s);if(o.length===0)throw new Error("ERC20 approval not set");return{...o[0].args,...r}}}}async createUserVault({nfts:e,userVaultAddress:t=this.defaults.UserVault}){return this.contracts.UserVault(t).createVault(e)}async depositUserVaultERC721s({userVaultAddress:e=this.defaults.UserVault,...t}){return this.contracts.UserVault(e).depositERC721s(t)}async depositUserVaultOldERC721s({userVaultAddress:e=this.defaults.UserVault,...t}){return this.contracts.UserVault(e).depositOldERC721s(t)}async burnUserVaultAndWithdraw({userVaultAddress:e=this.defaults.UserVault,...t}){return this.contracts.UserVault(e).burnAndWithdraw(t)}};y(me,"Gondi");export{ve as FULFILLED,me as Gondi,Ee as LoanStatusType,fe as MarketplaceEnum,ke as OfferStatus,Te as OffersSortField,ge as Ordering,Oe as REJECTED};
//# sourceMappingURL=index.mjs.map
