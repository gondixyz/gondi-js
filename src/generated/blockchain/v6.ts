//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AddressManager
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const addressManagerAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '_original', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'error',
    inputs: [{ name: '_address', internalType: 'address', type: 'address' }],
    name: 'AddressAlreadyAddedError',
  },
  {
    type: 'error',
    inputs: [{ name: '_address', internalType: 'address', type: 'address' }],
    name: 'AddressNotAddedError',
  },
  { type: 'error', inputs: [], name: 'AddressZeroError' },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'address_added', internalType: 'address', type: 'address', indexed: false }],
    name: 'AddressAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'address_removed', internalType: 'address', type: 'address', indexed: false }],
    name: 'AddressRemovedFromWhitelist',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'address_whitelisted', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'AddressWhitelisted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'function',
    inputs: [{ name: '_entry', internalType: 'address', type: 'address' }],
    name: 'add',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: '_entry', internalType: 'address', type: 'address' }],
    name: 'addToWhitelist',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: '_address', internalType: 'address', type: 'address' }],
    name: 'addressToIndex',
    outputs: [{ name: '', internalType: 'uint16', type: 'uint16' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_index', internalType: 'uint16', type: 'uint16' }],
    name: 'indexToAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_entry', internalType: 'address', type: 'address' }],
    name: 'isWhitelisted',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_entry', internalType: 'address', type: 'address' }],
    name: 'removeFromWhitelist',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AuctionLoanLiquidator
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const auctionLoanLiquidatorAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'liquidationDistributor', internalType: 'address', type: 'address' },
      { name: 'currencyManager', internalType: 'address', type: 'address' },
      { name: 'collectionManager', internalType: 'address', type: 'address' },
      { name: 'triggerFee', internalType: 'uint256', type: 'uint256' },
      { name: 'maxExtension', internalType: 'uint96', type: 'uint96' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'AddressZeroError' },
  { type: 'error', inputs: [], name: 'AuctionAlreadyInProgressError' },
  {
    type: 'error',
    inputs: [{ name: '_expiration', internalType: 'uint96', type: 'uint96' }],
    name: 'AuctionNotOverError',
  },
  {
    type: 'error',
    inputs: [{ name: '_expiration', internalType: 'uint96', type: 'uint96' }],
    name: 'AuctionOverError',
  },
  { type: 'error', inputs: [], name: 'CollectionNotWhitelistedError' },
  { type: 'error', inputs: [], name: 'CouldNotModifyValidLoansError' },
  { type: 'error', inputs: [], name: 'CurrencyNotWhitelistedError' },
  { type: 'error', inputs: [], name: 'InvalidHashAuctionError' },
  {
    type: 'error',
    inputs: [{ name: 'triggerFee', internalType: 'uint256', type: 'uint256' }],
    name: 'InvalidTriggerFee',
  },
  {
    type: 'error',
    inputs: [{ name: '_loan', internalType: 'address', type: 'address' }],
    name: 'LoanNotAcceptedError',
  },
  {
    type: 'error',
    inputs: [{ name: '_minBid', internalType: 'uint256', type: 'uint256' }],
    name: 'MinBidError',
  },
  {
    type: 'error',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
    name: 'NFTNotOwnedError',
  },
  { type: 'error', inputs: [], name: 'NoBidsError' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'loanContract', internalType: 'address', type: 'address', indexed: false },
      { name: 'loanId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'collection', internalType: 'address', type: 'address', indexed: false },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'asset', internalType: 'address', type: 'address', indexed: false },
      { name: 'proceeds', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'settler', internalType: 'address', type: 'address', indexed: false },
      { name: 'triggerFee', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'AuctionSettled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'collection', internalType: 'address', type: 'address', indexed: false },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'newBidder', internalType: 'address', type: 'address', indexed: false },
      { name: 'bid', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'loanAddress', internalType: 'address', type: 'address', indexed: false },
      { name: 'loanId', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'BidPlaced',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'liquidationDistributor', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'LiquidationDistributorUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'loan', internalType: 'address', type: 'address', indexed: false }],
    name: 'LoanContractAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'loan', internalType: 'address', type: 'address', indexed: false }],
    name: 'LoanContractRemoved',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'collection', internalType: 'address', type: 'address', indexed: false },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'auction',
        internalType: 'struct IAuctionLoanLiquidator.Auction',
        type: 'tuple',
        components: [
          { name: 'loanAddress', internalType: 'address', type: 'address' },
          { name: 'loanId', internalType: 'uint256', type: 'uint256' },
          { name: 'highestBid', internalType: 'uint256', type: 'uint256' },
          { name: 'triggerFee', internalType: 'uint256', type: 'uint256' },
          { name: 'minBid', internalType: 'uint256', type: 'uint256' },
          { name: 'highestBidder', internalType: 'address', type: 'address' },
          { name: 'duration', internalType: 'uint96', type: 'uint96' },
          { name: 'asset', internalType: 'address', type: 'address' },
          { name: 'startTime', internalType: 'uint96', type: 'uint96' },
          { name: 'originator', internalType: 'address', type: 'address' },
          { name: 'lastBidTime', internalType: 'uint96', type: 'uint96' },
        ],
        indexed: false,
      },
    ],
    name: 'LoanLiquidationStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'triggerFee', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'TriggerFeeUpdated',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_TRIGGER_FEE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_INCREMENT_BPS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_loanContract', internalType: 'address', type: 'address' }],
    name: 'addLoanContract',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_nftAddress', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getAuctionHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLiquidationDistributor',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMaxExtension',
    outputs: [{ name: '', internalType: 'uint96', type: 'uint96' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTriggerFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getValidLoanContracts',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_loanId', internalType: 'uint256', type: 'uint256' },
      { name: '_nftAddress', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_asset', internalType: 'address', type: 'address' },
      { name: '_duration', internalType: 'uint96', type: 'uint96' },
      { name: '_minBid', internalType: 'uint256', type: 'uint256' },
      { name: '_originator', internalType: 'address', type: 'address' },
    ],
    name: 'liquidateLoan',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_nftAddress', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
      {
        name: '_auction',
        internalType: 'struct IAuctionLoanLiquidator.Auction',
        type: 'tuple',
        components: [
          { name: 'loanAddress', internalType: 'address', type: 'address' },
          { name: 'loanId', internalType: 'uint256', type: 'uint256' },
          { name: 'highestBid', internalType: 'uint256', type: 'uint256' },
          { name: 'triggerFee', internalType: 'uint256', type: 'uint256' },
          { name: 'minBid', internalType: 'uint256', type: 'uint256' },
          { name: 'highestBidder', internalType: 'address', type: 'address' },
          { name: 'duration', internalType: 'uint96', type: 'uint96' },
          { name: 'asset', internalType: 'address', type: 'address' },
          { name: 'startTime', internalType: 'uint96', type: 'uint96' },
          { name: 'originator', internalType: 'address', type: 'address' },
          { name: 'lastBidTime', internalType: 'uint96', type: 'uint96' },
        ],
      },
      { name: '_bid', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'placeBid',
    outputs: [
      {
        name: '',
        internalType: 'struct IAuctionLoanLiquidator.Auction',
        type: 'tuple',
        components: [
          { name: 'loanAddress', internalType: 'address', type: 'address' },
          { name: 'loanId', internalType: 'uint256', type: 'uint256' },
          { name: 'highestBid', internalType: 'uint256', type: 'uint256' },
          { name: 'triggerFee', internalType: 'uint256', type: 'uint256' },
          { name: 'minBid', internalType: 'uint256', type: 'uint256' },
          { name: 'highestBidder', internalType: 'address', type: 'address' },
          { name: 'duration', internalType: 'uint96', type: 'uint96' },
          { name: 'asset', internalType: 'address', type: 'address' },
          { name: 'startTime', internalType: 'uint96', type: 'uint96' },
          { name: 'originator', internalType: 'address', type: 'address' },
          { name: 'lastBidTime', internalType: 'uint96', type: 'uint96' },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_loanContract', internalType: 'address', type: 'address' }],
    name: 'removeLoanContract',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_auction',
        internalType: 'struct IAuctionLoanLiquidator.Auction',
        type: 'tuple',
        components: [
          { name: 'loanAddress', internalType: 'address', type: 'address' },
          { name: 'loanId', internalType: 'uint256', type: 'uint256' },
          { name: 'highestBid', internalType: 'uint256', type: 'uint256' },
          { name: 'triggerFee', internalType: 'uint256', type: 'uint256' },
          { name: 'minBid', internalType: 'uint256', type: 'uint256' },
          { name: 'highestBidder', internalType: 'address', type: 'address' },
          { name: 'duration', internalType: 'uint96', type: 'uint96' },
          { name: 'asset', internalType: 'address', type: 'address' },
          { name: 'startTime', internalType: 'uint96', type: 'uint96' },
          { name: 'originator', internalType: 'address', type: 'address' },
          { name: 'lastBidTime', internalType: 'uint96', type: 'uint96' },
        ],
      },
      {
        name: '_loan',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'settleAuction',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '__liquidationDistributor', internalType: 'address', type: 'address' }],
    name: 'updateLiquidationDistributor',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'triggerFee', internalType: 'uint256', type: 'uint256' }],
    name: 'updateTriggerFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AuctionWithBuyoutLoanLiquidator
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const auctionWithBuyoutLoanLiquidatorAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'liquidationDistributor', internalType: 'address', type: 'address' },
      { name: 'currencyManager', internalType: 'address', type: 'address' },
      { name: 'collectionManager', internalType: 'address', type: 'address' },
      { name: 'loanManagerRegistry', internalType: 'address', type: 'address' },
      { name: 'triggerFee', internalType: 'uint256', type: 'uint256' },
      { name: 'maxExtension', internalType: 'uint96', type: 'uint96' },
      { name: 'timeForMainLenderToBuy', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'AddressZeroError' },
  { type: 'error', inputs: [], name: 'AuctionAlreadyInProgressError' },
  {
    type: 'error',
    inputs: [{ name: '_expiration', internalType: 'uint96', type: 'uint96' }],
    name: 'AuctionNotOverError',
  },
  {
    type: 'error',
    inputs: [{ name: '_expiration', internalType: 'uint96', type: 'uint96' }],
    name: 'AuctionOverError',
  },
  { type: 'error', inputs: [], name: 'CollectionNotWhitelistedError' },
  { type: 'error', inputs: [], name: 'CouldNotModifyValidLoansError' },
  { type: 'error', inputs: [], name: 'CurrencyNotWhitelistedError' },
  { type: 'error', inputs: [], name: 'InvalidHashAuctionError' },
  { type: 'error', inputs: [], name: 'InvalidInputError' },
  {
    type: 'error',
    inputs: [{ name: 'triggerFee', internalType: 'uint256', type: 'uint256' }],
    name: 'InvalidTriggerFee',
  },
  {
    type: 'error',
    inputs: [{ name: '_loan', internalType: 'address', type: 'address' }],
    name: 'LoanNotAcceptedError',
  },
  {
    type: 'error',
    inputs: [{ name: '_minBid', internalType: 'uint256', type: 'uint256' }],
    name: 'MinBidError',
  },
  {
    type: 'error',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
    name: 'NFTNotOwnedError',
  },
  { type: 'error', inputs: [], name: 'NoBidsError' },
  { type: 'error', inputs: [], name: 'NotMainLenderError' },
  {
    type: 'error',
    inputs: [{ name: 'timeLimit', internalType: 'uint256', type: 'uint256' }],
    name: 'OptionToBuyExpiredError',
  },
  {
    type: 'error',
    inputs: [{ name: 'timeLimit', internalType: 'uint256', type: 'uint256' }],
    name: 'OptionToBuyStilValidError',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'loanContract', internalType: 'address', type: 'address', indexed: false },
      { name: 'loanId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'collection', internalType: 'address', type: 'address', indexed: false },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'asset', internalType: 'address', type: 'address', indexed: false },
      { name: 'proceeds', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'settler', internalType: 'address', type: 'address', indexed: false },
      { name: 'triggerFee', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'AuctionSettled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'loanAddress', internalType: 'address', type: 'address', indexed: false },
      { name: 'loanId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'nftAddress', internalType: 'address', type: 'address', indexed: false },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'largestTrancheIdx', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'AuctionSettledWithBuyout',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'collection', internalType: 'address', type: 'address', indexed: false },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'newBidder', internalType: 'address', type: 'address', indexed: false },
      { name: 'bid', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'loanAddress', internalType: 'address', type: 'address', indexed: false },
      { name: 'loanId', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'BidPlaced',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'liquidationDistributor', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'LiquidationDistributorUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'loan', internalType: 'address', type: 'address', indexed: false }],
    name: 'LoanContractAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'loan', internalType: 'address', type: 'address', indexed: false }],
    name: 'LoanContractRemoved',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'collection', internalType: 'address', type: 'address', indexed: false },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'auction',
        internalType: 'struct IAuctionLoanLiquidator.Auction',
        type: 'tuple',
        components: [
          { name: 'loanAddress', internalType: 'address', type: 'address' },
          { name: 'loanId', internalType: 'uint256', type: 'uint256' },
          { name: 'highestBid', internalType: 'uint256', type: 'uint256' },
          { name: 'triggerFee', internalType: 'uint256', type: 'uint256' },
          { name: 'minBid', internalType: 'uint256', type: 'uint256' },
          { name: 'highestBidder', internalType: 'address', type: 'address' },
          { name: 'duration', internalType: 'uint96', type: 'uint96' },
          { name: 'asset', internalType: 'address', type: 'address' },
          { name: 'startTime', internalType: 'uint96', type: 'uint96' },
          { name: 'originator', internalType: 'address', type: 'address' },
          { name: 'lastBidTime', internalType: 'uint96', type: 'uint96' },
        ],
        indexed: false,
      },
    ],
    name: 'LoanLiquidationStarted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'timeForMainLenderToBuy', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'TimeForMainLenderToBuyUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'triggerFee', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'TriggerFeeUpdated',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_TIME_FOR_MAIN_LENDER_TO_BUY',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_TRIGGER_FEE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_INCREMENT_BPS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_loanContract', internalType: 'address', type: 'address' }],
    name: 'addLoanContract',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_nftAddress', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getAuctionHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLiquidationDistributor',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLoanManagerRegistry',
    outputs: [{ name: '', internalType: 'contract ILoanManagerRegistry', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMaxExtension',
    outputs: [{ name: '', internalType: 'uint96', type: 'uint96' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTimeForMainLenderToBuy',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTriggerFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getValidLoanContracts',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_loanId', internalType: 'uint256', type: 'uint256' },
      { name: '_nftAddress', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_asset', internalType: 'address', type: 'address' },
      { name: '_duration', internalType: 'uint96', type: 'uint96' },
      { name: '_minBid', internalType: 'uint256', type: 'uint256' },
      { name: '_originator', internalType: 'address', type: 'address' },
    ],
    name: 'liquidateLoan',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_nftAddress', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
      {
        name: '_auction',
        internalType: 'struct IAuctionLoanLiquidator.Auction',
        type: 'tuple',
        components: [
          { name: 'loanAddress', internalType: 'address', type: 'address' },
          { name: 'loanId', internalType: 'uint256', type: 'uint256' },
          { name: 'highestBid', internalType: 'uint256', type: 'uint256' },
          { name: 'triggerFee', internalType: 'uint256', type: 'uint256' },
          { name: 'minBid', internalType: 'uint256', type: 'uint256' },
          { name: 'highestBidder', internalType: 'address', type: 'address' },
          { name: 'duration', internalType: 'uint96', type: 'uint96' },
          { name: 'asset', internalType: 'address', type: 'address' },
          { name: 'startTime', internalType: 'uint96', type: 'uint96' },
          { name: 'originator', internalType: 'address', type: 'address' },
          { name: 'lastBidTime', internalType: 'uint96', type: 'uint96' },
        ],
      },
      { name: '_bid', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'placeBid',
    outputs: [
      {
        name: '',
        internalType: 'struct IAuctionLoanLiquidator.Auction',
        type: 'tuple',
        components: [
          { name: 'loanAddress', internalType: 'address', type: 'address' },
          { name: 'loanId', internalType: 'uint256', type: 'uint256' },
          { name: 'highestBid', internalType: 'uint256', type: 'uint256' },
          { name: 'triggerFee', internalType: 'uint256', type: 'uint256' },
          { name: 'minBid', internalType: 'uint256', type: 'uint256' },
          { name: 'highestBidder', internalType: 'address', type: 'address' },
          { name: 'duration', internalType: 'uint96', type: 'uint96' },
          { name: 'asset', internalType: 'address', type: 'address' },
          { name: 'startTime', internalType: 'uint96', type: 'uint96' },
          { name: 'originator', internalType: 'address', type: 'address' },
          { name: 'lastBidTime', internalType: 'uint96', type: 'uint96' },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_loanContract', internalType: 'address', type: 'address' }],
    name: 'removeLoanContract',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '__timeForMainLenderToBuy', internalType: 'uint256', type: 'uint256' }],
    name: 'setTimeForMainLenderToBuy',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_auction',
        internalType: 'struct IAuctionLoanLiquidator.Auction',
        type: 'tuple',
        components: [
          { name: 'loanAddress', internalType: 'address', type: 'address' },
          { name: 'loanId', internalType: 'uint256', type: 'uint256' },
          { name: 'highestBid', internalType: 'uint256', type: 'uint256' },
          { name: 'triggerFee', internalType: 'uint256', type: 'uint256' },
          { name: 'minBid', internalType: 'uint256', type: 'uint256' },
          { name: 'highestBidder', internalType: 'address', type: 'address' },
          { name: 'duration', internalType: 'uint96', type: 'uint96' },
          { name: 'asset', internalType: 'address', type: 'address' },
          { name: 'startTime', internalType: 'uint96', type: 'uint96' },
          { name: 'originator', internalType: 'address', type: 'address' },
          { name: 'lastBidTime', internalType: 'uint96', type: 'uint96' },
        ],
      },
      {
        name: '_loan',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'settleAuction',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_nftAddress', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
      {
        name: '_auction',
        internalType: 'struct IAuctionLoanLiquidator.Auction',
        type: 'tuple',
        components: [
          { name: 'loanAddress', internalType: 'address', type: 'address' },
          { name: 'loanId', internalType: 'uint256', type: 'uint256' },
          { name: 'highestBid', internalType: 'uint256', type: 'uint256' },
          { name: 'triggerFee', internalType: 'uint256', type: 'uint256' },
          { name: 'minBid', internalType: 'uint256', type: 'uint256' },
          { name: 'highestBidder', internalType: 'address', type: 'address' },
          { name: 'duration', internalType: 'uint96', type: 'uint96' },
          { name: 'asset', internalType: 'address', type: 'address' },
          { name: 'startTime', internalType: 'uint96', type: 'uint96' },
          { name: 'originator', internalType: 'address', type: 'address' },
          { name: 'lastBidTime', internalType: 'uint96', type: 'uint96' },
        ],
      },
      {
        name: '_loan',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'settleWithBuyout',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '__liquidationDistributor', internalType: 'address', type: 'address' }],
    name: 'updateLiquidationDistributor',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'triggerFee', internalType: 'uint256', type: 'uint256' }],
    name: 'updateTriggerFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BaseLoan
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const baseLoanAbi = [
  { type: 'error', inputs: [], name: 'AddressZeroError' },
  {
    type: 'error',
    inputs: [
      { name: '_lender', internalType: 'address', type: 'address' },
      { name: '_offerId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'CancelledOrExecutedOfferError',
  },
  { type: 'error', inputs: [], name: 'CollectionNotWhitelistedError' },
  { type: 'error', inputs: [], name: 'CurrencyNotWhitelistedError' },
  {
    type: 'error',
    inputs: [{ name: '_expirationTime', internalType: 'uint256', type: 'uint256' }],
    name: 'ExpiredOfferError',
  },
  {
    type: 'error',
    inputs: [
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_principalAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidAmountError',
  },
  { type: 'error', inputs: [], name: 'InvalidDurationError' },
  { type: 'error', inputs: [], name: 'InvalidInputError' },
  {
    type: 'error',
    inputs: [{ name: '_loanId', internalType: 'uint256', type: 'uint256' }],
    name: 'InvalidLoanError',
  },
  { type: 'error', inputs: [], name: 'InvalidSignatureError' },
  {
    type: 'error',
    inputs: [{ name: '_liquidator', internalType: 'address', type: 'address' }],
    name: 'LiquidatorOnlyError',
  },
  {
    type: 'error',
    inputs: [{ name: '_expirationTime', internalType: 'uint256', type: 'uint256' }],
    name: 'LoanNotDueError',
  },
  {
    type: 'error',
    inputs: [
      { name: '_lender', internalType: 'address', type: 'address' },
      { name: '_newMinOfferId', internalType: 'uint256', type: 'uint256' },
      { name: '_minOfferId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'LowOfferIdError',
  },
  {
    type: 'error',
    inputs: [
      { name: '_lender', internalType: 'address', type: 'address' },
      { name: '_newMinRenegotiationOfferId', internalType: 'uint256', type: 'uint256' },
      { name: '_minOfferId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'LowRenegotiationOfferIdError',
  },
  { type: 'error', inputs: [], name: 'MaxCapacityExceededError' },
  { type: 'error', inputs: [], name: 'NotStrictlyImprovedError' },
  {
    type: 'error',
    inputs: [{ name: '_pendingProtocolFeeSetTime', internalType: 'uint256', type: 'uint256' }],
    name: 'TooEarlyError',
  },
  { type: 'error', inputs: [], name: 'TooSoonError' },
  { type: 'error', inputs: [], name: 'ZeroInterestError' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'lender', internalType: 'address', type: 'address', indexed: false },
      { name: 'minOfferId', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'AllOffersCancelled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newDuration', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'LiquidationAuctionDurationUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'liquidator', internalType: 'address', type: 'address', indexed: false }],
    name: 'LiquidationContractUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'loanId', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'LoanForeclosed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'loanId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'liquidator', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'LoanSentToLiquidator',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '_minimum', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'MinAprImprovementUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newMinBid', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'MinBidLiquidationUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'lender', internalType: 'address', type: 'address', indexed: false },
      { name: 'offerId', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'OfferCancelled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fee',
        internalType: 'struct WithProtocolFee.ProtocolFee',
        type: 'tuple',
        components: [
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'fraction', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: false,
      },
    ],
    name: 'ProtocolFeePendingUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fee',
        internalType: 'struct WithProtocolFee.ProtocolFee',
        type: 'tuple',
        components: [
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'fraction', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: false,
      },
    ],
    name: 'ProtocolFeeUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'lender', internalType: 'address', type: 'address', indexed: false },
      { name: 'renegotiationId', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'RenegotiationOfferCancelled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address', indexed: false }],
    name: 'TransferOwnerRequested',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'contractAdded', internalType: 'address', type: 'address', indexed: false }],
    name: 'WhitelistedCallbackContractAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'contractRemoved', internalType: 'address', type: 'address', indexed: false }],
    name: 'WhitelistedCallbackContractRemoved',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'FEE_UPDATE_NOTICE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'INITIAL_DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_AUCTION_DURATION',
    outputs: [{ name: '', internalType: 'uint48', type: 'uint48' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_AUCTION_DURATION',
    outputs: [{ name: '', internalType: 'uint48', type: 'uint48' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_BID_LIQUIDATION',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_WAIT_TIME',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'VERSION',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_contract', internalType: 'address', type: 'address' }],
    name: 'addWhitelistedCallbackContract',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_minOfferId', internalType: 'uint256', type: 'uint256' }],
    name: 'cancelAllOffers',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_offerId', internalType: 'uint256', type: 'uint256' }],
    name: 'cancelOffer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_renegotiationId', internalType: 'uint256', type: 'uint256' }],
    name: 'cancelRenegotiationOffer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCollectionManager',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrencyManager',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLiquidationAuctionDuration',
    outputs: [{ name: '', internalType: 'uint48', type: 'uint48' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLiquidator',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMinImprovementApr',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPendingProtocolFee',
    outputs: [
      {
        name: '',
        internalType: 'struct WithProtocolFee.ProtocolFee',
        type: 'tuple',
        components: [
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'fraction', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPendingProtocolFeeSetTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getProtocolFee',
    outputs: [
      {
        name: '',
        internalType: 'struct WithProtocolFee.ProtocolFee',
        type: 'tuple',
        components: [
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'fraction', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTotalLoansIssued',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_lender', internalType: 'address', type: 'address' },
      { name: '_offerId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getUsedCapacity',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'offerId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'isOfferCancelled',
    outputs: [{ name: 'notActive', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'renegotiationIf', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'isRenegotiationOfferCancelled',
    outputs: [{ name: 'notActive', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_contract', internalType: 'address', type: 'address' }],
    name: 'isWhitelistedCallbackContract',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'minOfferId',
    outputs: [{ name: 'minOfferId', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwnerTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_contract', internalType: 'address', type: 'address' }],
    name: 'removeWhitelistedCallbackContract',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_newOwner', internalType: 'address', type: 'address' }],
    name: 'requestTransferOwner',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'setProtocolFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_newDuration', internalType: 'uint48', type: 'uint48' }],
    name: 'updateLiquidationAuctionDuration',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '__loanLiquidator', internalType: 'address', type: 'address' }],
    name: 'updateLiquidationContract',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_newMinimum', internalType: 'uint256', type: 'uint256' }],
    name: 'updateMinImprovementApr',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_newProtocolFee',
        internalType: 'struct WithProtocolFee.ProtocolFee',
        type: 'tuple',
        components: [
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'fraction', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'updateProtocolFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CallbackHandler
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const callbackHandlerAbi = [
  { type: 'error', inputs: [], name: 'AddressZeroError' },
  { type: 'error', inputs: [], name: 'InvalidInputError' },
  {
    type: 'error',
    inputs: [{ name: '_pendingProtocolFeeSetTime', internalType: 'uint256', type: 'uint256' }],
    name: 'TooEarlyError',
  },
  { type: 'error', inputs: [], name: 'TooSoonError' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fee',
        internalType: 'struct WithProtocolFee.ProtocolFee',
        type: 'tuple',
        components: [
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'fraction', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: false,
      },
    ],
    name: 'ProtocolFeePendingUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fee',
        internalType: 'struct WithProtocolFee.ProtocolFee',
        type: 'tuple',
        components: [
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'fraction', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: false,
      },
    ],
    name: 'ProtocolFeeUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address', indexed: false }],
    name: 'TransferOwnerRequested',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'contractAdded', internalType: 'address', type: 'address', indexed: false }],
    name: 'WhitelistedCallbackContractAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'contractRemoved', internalType: 'address', type: 'address', indexed: false }],
    name: 'WhitelistedCallbackContractRemoved',
  },
  {
    type: 'function',
    inputs: [],
    name: 'FEE_UPDATE_NOTICE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_WAIT_TIME',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_contract', internalType: 'address', type: 'address' }],
    name: 'addWhitelistedCallbackContract',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPendingProtocolFee',
    outputs: [
      {
        name: '',
        internalType: 'struct WithProtocolFee.ProtocolFee',
        type: 'tuple',
        components: [
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'fraction', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPendingProtocolFeeSetTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getProtocolFee',
    outputs: [
      {
        name: '',
        internalType: 'struct WithProtocolFee.ProtocolFee',
        type: 'tuple',
        components: [
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'fraction', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_contract', internalType: 'address', type: 'address' }],
    name: 'isWhitelistedCallbackContract',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwnerTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_contract', internalType: 'address', type: 'address' }],
    name: 'removeWhitelistedCallbackContract',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_newOwner', internalType: 'address', type: 'address' }],
    name: 'requestTransferOwner',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'setProtocolFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_newProtocolFee',
        internalType: 'struct WithProtocolFee.ProtocolFee',
        type: 'tuple',
        components: [
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'fraction', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'updateProtocolFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DSTest
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const dsTestAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'string', type: 'string', indexed: false }],
    name: 'log',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'address', type: 'address', indexed: false }],
    name: 'log_address',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'bytes', type: 'bytes', indexed: false }],
    name: 'log_bytes',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32', indexed: false }],
    name: 'log_bytes32',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'int256', type: 'int256', indexed: false }],
    name: 'log_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'log_named_address',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'log_named_bytes',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'bytes32', type: 'bytes32', indexed: false },
    ],
    name: 'log_named_bytes32',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'int256', type: 'int256', indexed: false },
      { name: 'decimals', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'log_named_decimal_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'decimals', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'log_named_decimal_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'int256', type: 'int256', indexed: false },
    ],
    name: 'log_named_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'log_named_string',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'log_named_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'string', type: 'string', indexed: false }],
    name: 'log_string',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'log_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'bytes', type: 'bytes', indexed: false }],
    name: 'logs',
  },
  {
    type: 'function',
    inputs: [],
    name: 'IS_TEST',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'failed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DelegateRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const delegateRegistryAbi = [
  { type: 'error', inputs: [], name: 'MulticallFailed' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'rights', internalType: 'bytes32', type: 'bytes32', indexed: false },
      { name: 'enable', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'DelegateAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'contract_', internalType: 'address', type: 'address', indexed: true },
      { name: 'rights', internalType: 'bytes32', type: 'bytes32', indexed: false },
      { name: 'enable', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'DelegateContract',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'contract_', internalType: 'address', type: 'address', indexed: true },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'rights', internalType: 'bytes32', type: 'bytes32', indexed: false },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'DelegateERC1155',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'contract_', internalType: 'address', type: 'address', indexed: true },
      { name: 'rights', internalType: 'bytes32', type: 'bytes32', indexed: false },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'DelegateERC20',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'contract_', internalType: 'address', type: 'address', indexed: true },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'rights', internalType: 'bytes32', type: 'bytes32', indexed: false },
      { name: 'enable', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'DelegateERC721',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'rights', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'checkDelegateForAll',
    outputs: [{ name: 'valid', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'contract_', internalType: 'address', type: 'address' },
      { name: 'rights', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'checkDelegateForContract',
    outputs: [{ name: 'valid', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'contract_', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'rights', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'checkDelegateForERC1155',
    outputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'contract_', internalType: 'address', type: 'address' },
      { name: 'rights', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'checkDelegateForERC20',
    outputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'contract_', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'rights', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'checkDelegateForERC721',
    outputs: [{ name: 'valid', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'rights', internalType: 'bytes32', type: 'bytes32' },
      { name: 'enable', internalType: 'bool', type: 'bool' },
    ],
    name: 'delegateAll',
    outputs: [{ name: 'hash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'contract_', internalType: 'address', type: 'address' },
      { name: 'rights', internalType: 'bytes32', type: 'bytes32' },
      { name: 'enable', internalType: 'bool', type: 'bool' },
    ],
    name: 'delegateContract',
    outputs: [{ name: 'hash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'contract_', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'rights', internalType: 'bytes32', type: 'bytes32' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'delegateERC1155',
    outputs: [{ name: 'hash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'contract_', internalType: 'address', type: 'address' },
      { name: 'rights', internalType: 'bytes32', type: 'bytes32' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'delegateERC20',
    outputs: [{ name: 'hash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'contract_', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'rights', internalType: 'bytes32', type: 'bytes32' },
      { name: 'enable', internalType: 'bool', type: 'bool' },
    ],
    name: 'delegateERC721',
    outputs: [{ name: 'hash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'hashes', internalType: 'bytes32[]', type: 'bytes32[]' }],
    name: 'getDelegationsFromHashes',
    outputs: [
      {
        name: 'delegations_',
        internalType: 'struct IDelegateRegistry.Delegation[]',
        type: 'tuple[]',
        components: [
          { name: 'type_', internalType: 'enum IDelegateRegistry.DelegationType', type: 'uint8' },
          { name: 'to', internalType: 'address', type: 'address' },
          { name: 'from', internalType: 'address', type: 'address' },
          { name: 'rights', internalType: 'bytes32', type: 'bytes32' },
          { name: 'contract_', internalType: 'address', type: 'address' },
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'getIncomingDelegationHashes',
    outputs: [{ name: 'delegationHashes', internalType: 'bytes32[]', type: 'bytes32[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'getIncomingDelegations',
    outputs: [
      {
        name: 'delegations_',
        internalType: 'struct IDelegateRegistry.Delegation[]',
        type: 'tuple[]',
        components: [
          { name: 'type_', internalType: 'enum IDelegateRegistry.DelegationType', type: 'uint8' },
          { name: 'to', internalType: 'address', type: 'address' },
          { name: 'from', internalType: 'address', type: 'address' },
          { name: 'rights', internalType: 'bytes32', type: 'bytes32' },
          { name: 'contract_', internalType: 'address', type: 'address' },
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'from', internalType: 'address', type: 'address' }],
    name: 'getOutgoingDelegationHashes',
    outputs: [{ name: 'delegationHashes', internalType: 'bytes32[]', type: 'bytes32[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'from', internalType: 'address', type: 'address' }],
    name: 'getOutgoingDelegations',
    outputs: [
      {
        name: 'delegations_',
        internalType: 'struct IDelegateRegistry.Delegation[]',
        type: 'tuple[]',
        components: [
          { name: 'type_', internalType: 'enum IDelegateRegistry.DelegationType', type: 'uint8' },
          { name: 'to', internalType: 'address', type: 'address' },
          { name: 'from', internalType: 'address', type: 'address' },
          { name: 'rights', internalType: 'bytes32', type: 'bytes32' },
          { name: 'contract_', internalType: 'address', type: 'address' },
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'multicall',
    outputs: [{ name: 'results', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'location', internalType: 'bytes32', type: 'bytes32' }],
    name: 'readSlot',
    outputs: [{ name: 'contents', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'locations', internalType: 'bytes32[]', type: 'bytes32[]' }],
    name: 'readSlots',
    outputs: [{ name: 'contents', internalType: 'bytes32[]', type: 'bytes32[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  { type: 'function', inputs: [], name: 'sweep', outputs: [], stateMutability: 'nonpayable' },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ECDSA
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ecdsaAbi = [
  { type: 'error', inputs: [], name: 'ECDSAInvalidSignature' },
  {
    type: 'error',
    inputs: [{ name: 'length', internalType: 'uint256', type: 'uint256' }],
    name: 'ECDSAInvalidSignatureLength',
  },
  {
    type: 'error',
    inputs: [{ name: 's', internalType: 'bytes32', type: 'bytes32' }],
    name: 'ECDSAInvalidSignatureS',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20Abi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'spender', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC4626
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc4626Abi = [
  { type: 'error', inputs: [], name: 'MathOverflowedMulDiv' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'spender', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'caller', internalType: 'address', type: 'address', indexed: true },
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'assets', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'shares', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Deposit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'caller', internalType: 'address', type: 'address', indexed: true },
      { name: 'receiver', internalType: 'address', type: 'address', indexed: true },
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'assets', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'shares', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Withdraw',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'asset',
    outputs: [{ name: '', internalType: 'contract ERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'shares', internalType: 'uint256', type: 'uint256' }],
    name: 'convertToAssets',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'assets', internalType: 'uint256', type: 'uint256' }],
    name: 'convertToShares',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimalsOffset',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'assets', internalType: 'uint256', type: 'uint256' },
      { name: 'receiver', internalType: 'address', type: 'address' },
    ],
    name: 'deposit',
    outputs: [{ name: 'shares', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'maxDeposit',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'maxMint',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'maxRedeem',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'maxWithdraw',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'shares', internalType: 'uint256', type: 'uint256' },
      { name: 'receiver', internalType: 'address', type: 'address' },
    ],
    name: 'mint',
    outputs: [{ name: 'assets', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'assets', internalType: 'uint256', type: 'uint256' }],
    name: 'previewDeposit',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'shares', internalType: 'uint256', type: 'uint256' }],
    name: 'previewMint',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'shares', internalType: 'uint256', type: 'uint256' }],
    name: 'previewRedeem',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'assets', internalType: 'uint256', type: 'uint256' }],
    name: 'previewWithdraw',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'shares', internalType: 'uint256', type: 'uint256' },
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'redeem',
    outputs: [{ name: 'assets', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalAssets',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'assets', internalType: 'uint256', type: 'uint256' },
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'withdraw',
    outputs: [{ name: 'shares', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721Abi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'spender', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC721TokenReceiver
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc721TokenReceiverAbi = [
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FeeManager
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const feeManagerAbi = [
  {
    type: 'constructor',
    inputs: [
      {
        name: '__fees',
        internalType: 'struct IFeeManager.Fees',
        type: 'tuple',
        components: [
          { name: 'managementFee', internalType: 'uint256', type: 'uint256' },
          { name: 'performanceFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'InvalidFeesError' },
  { type: 'error', inputs: [], name: 'InvalidInputError' },
  { type: 'error', inputs: [], name: 'TooSoonError' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fees',
        internalType: 'struct IFeeManager.Fees',
        type: 'tuple',
        components: [
          { name: 'managementFee', internalType: 'uint256', type: 'uint256' },
          { name: 'performanceFee', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: false,
      },
    ],
    name: 'ProposedFeesConfirmed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fees',
        internalType: 'struct IFeeManager.Fees',
        type: 'tuple',
        components: [
          { name: 'managementFee', internalType: 'uint256', type: 'uint256' },
          { name: 'performanceFee', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: false,
      },
    ],
    name: 'ProposedFeesSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address', indexed: false }],
    name: 'TransferOwnerRequested',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_WAIT_TIME',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'PRECISION',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'WAIT_TIME',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '__fees',
        internalType: 'struct IFeeManager.Fees',
        type: 'tuple',
        components: [
          { name: 'managementFee', internalType: 'uint256', type: 'uint256' },
          { name: 'performanceFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'confirmFees',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getFees',
    outputs: [
      {
        name: '',
        internalType: 'struct IFeeManager.Fees',
        type: 'tuple',
        components: [
          { name: 'managementFee', internalType: 'uint256', type: 'uint256' },
          { name: 'performanceFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getProposedFees',
    outputs: [
      {
        name: '',
        internalType: 'struct IFeeManager.Fees',
        type: 'tuple',
        components: [
          { name: 'managementFee', internalType: 'uint256', type: 'uint256' },
          { name: 'performanceFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getProposedFeesSetTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwnerTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_principal', internalType: 'uint256', type: 'uint256' },
      { name: '_interest', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'processFees',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_newOwner', internalType: 'address', type: 'address' }],
    name: 'requestTransferOwner',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '__fees',
        internalType: 'struct IFeeManager.Fees',
        type: 'tuple',
        components: [
          { name: 'managementFee', internalType: 'uint256', type: 'uint256' },
          { name: 'performanceFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'setProposedFees',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

export const iAuctionLoanLiquidatorAbi = [
  {
    type: 'function',
    inputs: [{ name: '_loanContract', internalType: 'address', type: 'address' }],
    name: 'addLoanContract',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_contract', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getAuctionHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLiquidationDistributor',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTriggerFee',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getValidLoanContracts',
    outputs: [{ name: '', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_contract', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
      {
        name: '_auction',
        internalType: 'struct IAuctionLoanLiquidator.Auction',
        type: 'tuple',
        components: [
          { name: 'loanAddress', internalType: 'address', type: 'address' },
          { name: 'loanId', internalType: 'uint256', type: 'uint256' },
          { name: 'highestBid', internalType: 'uint256', type: 'uint256' },
          { name: 'triggerFee', internalType: 'uint256', type: 'uint256' },
          { name: 'minBid', internalType: 'uint256', type: 'uint256' },
          { name: 'highestBidder', internalType: 'address', type: 'address' },
          { name: 'duration', internalType: 'uint96', type: 'uint96' },
          { name: 'asset', internalType: 'address', type: 'address' },
          { name: 'startTime', internalType: 'uint96', type: 'uint96' },
          { name: 'originator', internalType: 'address', type: 'address' },
          { name: 'lastBidTime', internalType: 'uint96', type: 'uint96' },
        ],
      },
      { name: '_bid', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'placeBid',
    outputs: [
      {
        name: '',
        internalType: 'struct IAuctionLoanLiquidator.Auction',
        type: 'tuple',
        components: [
          { name: 'loanAddress', internalType: 'address', type: 'address' },
          { name: 'loanId', internalType: 'uint256', type: 'uint256' },
          { name: 'highestBid', internalType: 'uint256', type: 'uint256' },
          { name: 'triggerFee', internalType: 'uint256', type: 'uint256' },
          { name: 'minBid', internalType: 'uint256', type: 'uint256' },
          { name: 'highestBidder', internalType: 'address', type: 'address' },
          { name: 'duration', internalType: 'uint96', type: 'uint96' },
          { name: 'asset', internalType: 'address', type: 'address' },
          { name: 'startTime', internalType: 'uint96', type: 'uint96' },
          { name: 'originator', internalType: 'address', type: 'address' },
          { name: 'lastBidTime', internalType: 'uint96', type: 'uint96' },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_loanContract', internalType: 'address', type: 'address' }],
    name: 'removeLoanContract',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_auction',
        internalType: 'struct IAuctionLoanLiquidator.Auction',
        type: 'tuple',
        components: [
          { name: 'loanAddress', internalType: 'address', type: 'address' },
          { name: 'loanId', internalType: 'uint256', type: 'uint256' },
          { name: 'highestBid', internalType: 'uint256', type: 'uint256' },
          { name: 'triggerFee', internalType: 'uint256', type: 'uint256' },
          { name: 'minBid', internalType: 'uint256', type: 'uint256' },
          { name: 'highestBidder', internalType: 'address', type: 'address' },
          { name: 'duration', internalType: 'uint96', type: 'uint96' },
          { name: 'asset', internalType: 'address', type: 'address' },
          { name: 'startTime', internalType: 'uint96', type: 'uint96' },
          { name: 'originator', internalType: 'address', type: 'address' },
          { name: 'lastBidTime', internalType: 'uint96', type: 'uint96' },
        ],
      },
      {
        name: '_loan',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'settleAuction',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_liquidationDistributor', internalType: 'address', type: 'address' }],
    name: 'updateLiquidationDistributor',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'triggerFee', internalType: 'uint256', type: 'uint256' }],
    name: 'updateTriggerFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IBaseInterestAllocator
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iBaseInterestAllocatorAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'total', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'AllTransfered',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'currentIdle', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'targetIdle', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Reallocated',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAssetsAllocated',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBaseApr',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBaseAprWithUpdate',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_currentIdle', internalType: 'uint256', type: 'uint256' },
      { name: '_targetIdle', internalType: 'uint256', type: 'uint256' },
      { name: '_force', internalType: 'bool', type: 'bool' },
    ],
    name: 'reallocate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'function', inputs: [], name: 'transferAll', outputs: [], stateMutability: 'nonpayable' },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IBaseLoan
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iBaseLoanAbi = [
  {
    type: 'function',
    inputs: [{ name: '_minOfferId', internalType: 'uint256', type: 'uint256' }],
    name: 'cancelAllOffers',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_offerId', internalType: 'uint256', type: 'uint256' }],
    name: 'cancelOffer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_renegotiationId', internalType: 'uint256', type: 'uint256' }],
    name: 'cancelRenegotiationOffer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTotalLoansIssued',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ICryptoPunksMarket
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iCryptoPunksMarketAbi = [
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'pendingWithdrawals',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'punkIndex', internalType: 'uint256', type: 'uint256' }],
    name: 'punkBids',
    outputs: [
      {
        name: '',
        internalType: 'struct ICryptoPunksMarket.Bid',
        type: 'tuple',
        components: [
          { name: 'hasBid', internalType: 'bool', type: 'bool' },
          { name: 'punkIndex', internalType: 'uint256', type: 'uint256' },
          { name: 'bidder', internalType: 'address', type: 'address' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'punkIndex', internalType: 'uint256', type: 'uint256' }],
    name: 'punkIndexToAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'punkIndex', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferPunk',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'function', inputs: [], name: 'withdraw', outputs: [], stateMutability: 'nonpayable' },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ICurve
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iCurveAbi = [
  {
    type: 'function',
    inputs: [
      { name: '_i', internalType: 'uint128', type: 'uint128' },
      { name: '_j', internalType: 'uint128', type: 'uint128' },
      { name: '_dx', internalType: 'uint256', type: 'uint256' },
      { name: '_min_dy', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'exchange',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'payable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IDelegateRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iDelegateRegistryAbi = [
  { type: 'error', inputs: [], name: 'MulticallFailed' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'rights', internalType: 'bytes32', type: 'bytes32', indexed: false },
      { name: 'enable', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'DelegateAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'contract_', internalType: 'address', type: 'address', indexed: true },
      { name: 'rights', internalType: 'bytes32', type: 'bytes32', indexed: false },
      { name: 'enable', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'DelegateContract',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'contract_', internalType: 'address', type: 'address', indexed: true },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'rights', internalType: 'bytes32', type: 'bytes32', indexed: false },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'DelegateERC1155',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'contract_', internalType: 'address', type: 'address', indexed: true },
      { name: 'rights', internalType: 'bytes32', type: 'bytes32', indexed: false },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'DelegateERC20',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'contract_', internalType: 'address', type: 'address', indexed: true },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'rights', internalType: 'bytes32', type: 'bytes32', indexed: false },
      { name: 'enable', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'DelegateERC721',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'rights', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'checkDelegateForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'contract_', internalType: 'address', type: 'address' },
      { name: 'rights', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'checkDelegateForContract',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'contract_', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'rights', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'checkDelegateForERC1155',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'contract_', internalType: 'address', type: 'address' },
      { name: 'rights', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'checkDelegateForERC20',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'contract_', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'rights', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'checkDelegateForERC721',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'rights', internalType: 'bytes32', type: 'bytes32' },
      { name: 'enable', internalType: 'bool', type: 'bool' },
    ],
    name: 'delegateAll',
    outputs: [{ name: 'delegationHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'contract_', internalType: 'address', type: 'address' },
      { name: 'rights', internalType: 'bytes32', type: 'bytes32' },
      { name: 'enable', internalType: 'bool', type: 'bool' },
    ],
    name: 'delegateContract',
    outputs: [{ name: 'delegationHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'contract_', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'rights', internalType: 'bytes32', type: 'bytes32' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'delegateERC1155',
    outputs: [{ name: 'delegationHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'contract_', internalType: 'address', type: 'address' },
      { name: 'rights', internalType: 'bytes32', type: 'bytes32' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'delegateERC20',
    outputs: [{ name: 'delegationHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'contract_', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'rights', internalType: 'bytes32', type: 'bytes32' },
      { name: 'enable', internalType: 'bool', type: 'bool' },
    ],
    name: 'delegateERC721',
    outputs: [{ name: 'delegationHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'delegationHashes', internalType: 'bytes32[]', type: 'bytes32[]' }],
    name: 'getDelegationsFromHashes',
    outputs: [
      {
        name: 'delegations',
        internalType: 'struct IDelegateRegistry.Delegation[]',
        type: 'tuple[]',
        components: [
          { name: 'type_', internalType: 'enum IDelegateRegistry.DelegationType', type: 'uint8' },
          { name: 'to', internalType: 'address', type: 'address' },
          { name: 'from', internalType: 'address', type: 'address' },
          { name: 'rights', internalType: 'bytes32', type: 'bytes32' },
          { name: 'contract_', internalType: 'address', type: 'address' },
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'getIncomingDelegationHashes',
    outputs: [{ name: 'delegationHashes', internalType: 'bytes32[]', type: 'bytes32[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'getIncomingDelegations',
    outputs: [
      {
        name: 'delegations',
        internalType: 'struct IDelegateRegistry.Delegation[]',
        type: 'tuple[]',
        components: [
          { name: 'type_', internalType: 'enum IDelegateRegistry.DelegationType', type: 'uint8' },
          { name: 'to', internalType: 'address', type: 'address' },
          { name: 'from', internalType: 'address', type: 'address' },
          { name: 'rights', internalType: 'bytes32', type: 'bytes32' },
          { name: 'contract_', internalType: 'address', type: 'address' },
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'from', internalType: 'address', type: 'address' }],
    name: 'getOutgoingDelegationHashes',
    outputs: [{ name: 'delegationHashes', internalType: 'bytes32[]', type: 'bytes32[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'from', internalType: 'address', type: 'address' }],
    name: 'getOutgoingDelegations',
    outputs: [
      {
        name: 'delegations',
        internalType: 'struct IDelegateRegistry.Delegation[]',
        type: 'tuple[]',
        components: [
          { name: 'type_', internalType: 'enum IDelegateRegistry.DelegationType', type: 'uint8' },
          { name: 'to', internalType: 'address', type: 'address' },
          { name: 'from', internalType: 'address', type: 'address' },
          { name: 'rights', internalType: 'bytes32', type: 'bytes32' },
          { name: 'contract_', internalType: 'address', type: 'address' },
          { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'multicall',
    outputs: [{ name: 'results', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: 'location', internalType: 'bytes32', type: 'bytes32' }],
    name: 'readSlot',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'locations', internalType: 'bytes32[]', type: 'bytes32[]' }],
    name: 'readSlots',
    outputs: [{ name: '', internalType: 'bytes32[]', type: 'bytes32[]' }],
    stateMutability: 'view',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC1271
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc1271Abi = [
  {
    type: 'function',
    inputs: [
      { name: 'hash', internalType: 'bytes32', type: 'bytes32' },
      { name: 'signature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'isValidSignature',
    outputs: [{ name: 'magicValue', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'view',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IERC721TokenReceiver
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ierc721TokenReceiverAbi = [
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IFeeManager
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iFeeManagerAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'PRECISION',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_fees',
        internalType: 'struct IFeeManager.Fees',
        type: 'tuple',
        components: [
          { name: 'managementFee', internalType: 'uint256', type: 'uint256' },
          { name: 'performanceFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'confirmFees',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getFees',
    outputs: [
      {
        name: '',
        internalType: 'struct IFeeManager.Fees',
        type: 'tuple',
        components: [
          { name: 'managementFee', internalType: 'uint256', type: 'uint256' },
          { name: 'performanceFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getProposedFees',
    outputs: [
      {
        name: '',
        internalType: 'struct IFeeManager.Fees',
        type: 'tuple',
        components: [
          { name: 'managementFee', internalType: 'uint256', type: 'uint256' },
          { name: 'performanceFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getProposedFeesSetTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_principal', internalType: 'uint256', type: 'uint256' },
      { name: '_interest', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'processFees',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_fee',
        internalType: 'struct IFeeManager.Fees',
        type: 'tuple',
        components: [
          { name: 'managementFee', internalType: 'uint256', type: 'uint256' },
          { name: 'performanceFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'setProposedFees',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ILiquidationDistributor
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iLiquidationDistributorAbi = [
  {
    type: 'function',
    inputs: [
      { name: '_repayment', internalType: 'uint256', type: 'uint256' },
      {
        name: '_loan',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'distribute',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ILiquidationHandler
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iLiquidationHandlerAbi = [
  {
    type: 'function',
    inputs: [],
    name: 'getLiquidationAuctionDuration',
    outputs: [{ name: '', internalType: 'uint48', type: 'uint48' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLiquidator',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_newDuration', internalType: 'uint48', type: 'uint48' }],
    name: 'updateLiquidationAuctionDuration',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'loanLiquidator', internalType: 'address', type: 'address' }],
    name: 'updateLiquidationContract',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ILoanCallback
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iLoanCallbackAbi = [
  { type: 'error', inputs: [], name: 'InvalidCallbackError' },
  {
    type: 'function',
    inputs: [
      {
        name: '_loan',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: '_executionData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'afterNFTTransfer',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_loan',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: '_fee', internalType: 'uint256', type: 'uint256' },
      { name: '_executionData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'afterPrincipalTransfer',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ILoanLiquidator
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iLoanLiquidatorAbi = [
  {
    type: 'function',
    inputs: [
      { name: '_loanId', internalType: 'uint256', type: 'uint256' },
      { name: '_contract', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_asset', internalType: 'address', type: 'address' },
      { name: '_duration', internalType: 'uint96', type: 'uint96' },
      { name: '_minBid', internalType: 'uint256', type: 'uint256' },
      { name: '_originator', internalType: 'address', type: 'address' },
    ],
    name: 'liquidateLoan',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ILoanManager
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iLoanManagerAbi = [
  {
    type: 'function',
    inputs: [
      {
        name: '_callers',
        internalType: 'struct ILoanManager.ProposedCaller[]',
        type: 'tuple[]',
        components: [
          { name: 'caller', internalType: 'address', type: 'address' },
          { name: 'isLoanContract', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    name: 'addCallers',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getParameterSetter',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_loanId', internalType: 'uint256', type: 'uint256' },
      { name: '_principalAmount', internalType: 'uint256', type: 'uint256' },
      { name: '_apr', internalType: 'uint256', type: 'uint256' },
      { name: '_accruedInterest', internalType: 'uint256', type: 'uint256' },
      { name: '_protocolFee', internalType: 'uint256', type: 'uint256' },
      { name: '_received', internalType: 'uint256', type: 'uint256' },
      { name: '_startTime', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'loanLiquidation',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_loanId', internalType: 'uint256', type: 'uint256' },
      { name: '_principalAmount', internalType: 'uint256', type: 'uint256' },
      { name: '_apr', internalType: 'uint256', type: 'uint256' },
      { name: '_accruedInterest', internalType: 'uint256', type: 'uint256' },
      { name: '_protocolFee', internalType: 'uint256', type: 'uint256' },
      { name: '_startTime', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'loanRepayment',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_offerHandler', internalType: 'address', type: 'address' }],
    name: 'updateOfferHandler',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_offer', internalType: 'bytes', type: 'bytes' },
      { name: '_protocolFee', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'validateOffer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ILoanManagerRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iLoanManagerRegistryAbi = [
  {
    type: 'function',
    inputs: [{ name: '_loanManager', internalType: 'address', type: 'address' }],
    name: 'addLoanManager',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_loanManager', internalType: 'address', type: 'address' }],
    name: 'isLoanManager',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_loanManager', internalType: 'address', type: 'address' }],
    name: 'removeLoanManager',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMultiSourceLoan
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMultiSourceLoanAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'loanId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'delegate',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: '_rights',
        type: 'bytes32',
        indexed: false,
        internalType: 'bytes32',
      },
      {
        name: 'value',
        type: 'bool',
        indexed: false,
        internalType: 'bool',
      },
    ],
    name: 'Delegated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'newFlashActionContract', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'FlashActionContractUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'loanId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'target', internalType: 'address', type: 'address', indexed: false },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'FlashActionExecuted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'loanId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'offerId', internalType: 'uint256[]', type: 'uint256[]', indexed: false },
      {
        name: 'loan',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: false,
      },
      { name: 'fee', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'LoanEmitted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'loanId', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'LoanLiquidated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'renegotiationId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'oldLoanId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'newLoanId', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'loan',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: false,
      },
      { name: 'fee', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'LoanRefinanced',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'loanId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'newLoanId', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'loan',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: false,
      },
      { name: 'offerIds', internalType: 'uint256[]', type: 'uint256[]', indexed: false },
      { name: 'totalFee', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'LoanRefinancedFromNewOffers',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'loanId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'totalRepayment', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'fee', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'LoanRepaid',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'minLockPeriod', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'MinLockPeriodUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'delegate', internalType: 'address', type: 'address', indexed: false },
      { name: 'collection', internalType: 'address', type: 'address', indexed: false },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'RevokeDelegate',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_renegotiationOffer',
        internalType: 'struct IMultiSourceLoan.RenegotiationOffer',
        type: 'tuple',
        components: [
          { name: 'renegotiationId', internalType: 'uint256', type: 'uint256' },
          { name: 'loanId', internalType: 'uint256', type: 'uint256' },
          { name: 'lender', internalType: 'address', type: 'address' },
          { name: 'fee', internalType: 'uint256', type: 'uint256' },
          { name: 'trancheIndex', internalType: 'uint256[]', type: 'uint256[]' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
          { name: 'expirationTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: '_loan',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: '_renegotiationOfferSignature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'addNewTranche',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      {
        name: '',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_loanId', internalType: 'uint256', type: 'uint256' },
      {
        name: '_loan',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: '_delegate', internalType: 'address', type: 'address' },
      { name: '_rights', internalType: 'bytes32', type: 'bytes32' },
      { name: '_value', internalType: 'bool', type: 'bool' },
    ],
    name: 'delegate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_loanExecutionData',
        internalType: 'struct IMultiSourceLoan.LoanExecutionData',
        type: 'tuple',
        components: [
          {
            name: 'executionData',
            internalType: 'struct IMultiSourceLoan.ExecutionData',
            type: 'tuple',
            components: [
              {
                name: 'offerExecution',
                internalType: 'struct IMultiSourceLoan.OfferExecution[]',
                type: 'tuple[]',
                components: [
                  {
                    name: 'offer',
                    internalType: 'struct IMultiSourceLoan.LoanOffer',
                    type: 'tuple',
                    components: [
                      { name: 'offerId', internalType: 'uint256', type: 'uint256' },
                      { name: 'lender', internalType: 'address', type: 'address' },
                      { name: 'fee', internalType: 'uint256', type: 'uint256' },
                      { name: 'capacity', internalType: 'uint256', type: 'uint256' },
                      { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
                      { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
                      { name: 'principalAddress', internalType: 'address', type: 'address' },
                      { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
                      { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
                      { name: 'expirationTime', internalType: 'uint256', type: 'uint256' },
                      { name: 'duration', internalType: 'uint256', type: 'uint256' },
                      { name: 'maxSeniorRepayment', internalType: 'uint256', type: 'uint256' },
                      {
                        name: 'validators',
                        internalType: 'struct IBaseLoan.OfferValidator[]',
                        type: 'tuple[]',
                        components: [
                          { name: 'validator', internalType: 'address', type: 'address' },
                          { name: 'arguments', internalType: 'bytes', type: 'bytes' },
                        ],
                      },
                    ],
                  },
                  { name: 'amount', internalType: 'uint256', type: 'uint256' },
                  { name: 'lenderOfferSignature', internalType: 'bytes', type: 'bytes' },
                ],
              },
              { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
              { name: 'duration', internalType: 'uint256', type: 'uint256' },
              { name: 'expirationTime', internalType: 'uint256', type: 'uint256' },
              { name: 'principalReceiver', internalType: 'address', type: 'address' },
              { name: 'callbackData', internalType: 'bytes', type: 'bytes' },
            ],
          },
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'borrowerOfferSignature', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'emitLoan',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      {
        name: '',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_loanId', internalType: 'uint256', type: 'uint256' },
      {
        name: '_loan',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: '_target', internalType: 'address', type: 'address' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'executeFlashAction',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getDelegateRegistry',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getFlashActionContract',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_loanId', internalType: 'uint256', type: 'uint256' }],
    name: 'getLoanHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMaxTranches',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMinLockPeriod',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_loanId', internalType: 'uint256', type: 'uint256' },
      {
        name: '_loan',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'liquidateLoan',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_loanId', internalType: 'uint256', type: 'uint256' },
      {
        name: '_loan',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'loanLiquidated',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_loanId', internalType: 'uint256', type: 'uint256' },
      {
        name: '_loan',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: '_loanExecutionData',
        internalType: 'struct IMultiSourceLoan.LoanExecutionData',
        type: 'tuple',
        components: [
          {
            name: 'executionData',
            internalType: 'struct IMultiSourceLoan.ExecutionData',
            type: 'tuple',
            components: [
              {
                name: 'offerExecution',
                internalType: 'struct IMultiSourceLoan.OfferExecution[]',
                type: 'tuple[]',
                components: [
                  {
                    name: 'offer',
                    internalType: 'struct IMultiSourceLoan.LoanOffer',
                    type: 'tuple',
                    components: [
                      { name: 'offerId', internalType: 'uint256', type: 'uint256' },
                      { name: 'lender', internalType: 'address', type: 'address' },
                      { name: 'fee', internalType: 'uint256', type: 'uint256' },
                      { name: 'capacity', internalType: 'uint256', type: 'uint256' },
                      { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
                      { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
                      { name: 'principalAddress', internalType: 'address', type: 'address' },
                      { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
                      { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
                      { name: 'expirationTime', internalType: 'uint256', type: 'uint256' },
                      { name: 'duration', internalType: 'uint256', type: 'uint256' },
                      { name: 'maxSeniorRepayment', internalType: 'uint256', type: 'uint256' },
                      {
                        name: 'validators',
                        internalType: 'struct IBaseLoan.OfferValidator[]',
                        type: 'tuple[]',
                        components: [
                          { name: 'validator', internalType: 'address', type: 'address' },
                          { name: 'arguments', internalType: 'bytes', type: 'bytes' },
                        ],
                      },
                    ],
                  },
                  { name: 'amount', internalType: 'uint256', type: 'uint256' },
                  { name: 'lenderOfferSignature', internalType: 'bytes', type: 'bytes' },
                ],
              },
              { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
              { name: 'duration', internalType: 'uint256', type: 'uint256' },
              { name: 'expirationTime', internalType: 'uint256', type: 'uint256' },
              { name: 'principalReceiver', internalType: 'address', type: 'address' },
              { name: 'callbackData', internalType: 'bytes', type: 'bytes' },
            ],
          },
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'borrowerOfferSignature', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'refinanceFromLoanExecutionData',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      {
        name: '',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_renegotiationOffer',
        internalType: 'struct IMultiSourceLoan.RenegotiationOffer',
        type: 'tuple',
        components: [
          { name: 'renegotiationId', internalType: 'uint256', type: 'uint256' },
          { name: 'loanId', internalType: 'uint256', type: 'uint256' },
          { name: 'lender', internalType: 'address', type: 'address' },
          { name: 'fee', internalType: 'uint256', type: 'uint256' },
          { name: 'trancheIndex', internalType: 'uint256[]', type: 'uint256[]' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
          { name: 'expirationTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: '_loan',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: '_renegotiationOfferSignature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'refinanceFull',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      {
        name: '',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_renegotiationOffer',
        internalType: 'struct IMultiSourceLoan.RenegotiationOffer',
        type: 'tuple',
        components: [
          { name: 'renegotiationId', internalType: 'uint256', type: 'uint256' },
          { name: 'loanId', internalType: 'uint256', type: 'uint256' },
          { name: 'lender', internalType: 'address', type: 'address' },
          { name: 'fee', internalType: 'uint256', type: 'uint256' },
          { name: 'trancheIndex', internalType: 'uint256[]', type: 'uint256[]' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
          { name: 'expirationTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: '_loan',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'refinancePartial',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      {
        name: '',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_repaymentData',
        internalType: 'struct IMultiSourceLoan.LoanRepaymentData',
        type: 'tuple',
        components: [
          {
            name: 'data',
            internalType: 'struct IMultiSourceLoan.SignableRepaymentData',
            type: 'tuple',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'callbackData', internalType: 'bytes', type: 'bytes' },
              { name: 'shouldDelegate', internalType: 'bool', type: 'bool' },
            ],
          },
          {
            name: 'loan',
            internalType: 'struct IMultiSourceLoan.Loan',
            type: 'tuple',
            components: [
              { name: 'borrower', internalType: 'address', type: 'address' },
              { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
              { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
              { name: 'principalAddress', internalType: 'address', type: 'address' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'duration', internalType: 'uint256', type: 'uint256' },
              {
                name: 'tranche',
                internalType: 'struct IMultiSourceLoan.Tranche[]',
                type: 'tuple[]',
                components: [
                  { name: 'loanId', internalType: 'uint256', type: 'uint256' },
                  { name: 'floor', internalType: 'uint256', type: 'uint256' },
                  { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
                  { name: 'lender', internalType: 'address', type: 'address' },
                  { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
                  { name: 'startTime', internalType: 'uint256', type: 'uint256' },
                  { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
                ],
              },
              { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'borrowerSignature', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'repayLoan',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_delegate', internalType: 'address', type: 'address' },
      { name: '_collection', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'revokeDelegate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_newFlashActionContract', internalType: 'address', type: 'address' }],
    name: 'setFlashActionContract',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_minLockPeriod', internalType: 'uint256', type: 'uint256' }],
    name: 'setMinLockPeriod',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMulticall
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMulticallAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'i', internalType: 'uint256', type: 'uint256' },
      { name: 'returndata', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'MulticallFailed',
  },
  {
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'multicall',
    outputs: [{ name: 'results', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'payable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMulticall3
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iMulticall3Abi = [
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'returnData', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call3Value[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'allowFailure', internalType: 'bool', type: 'bool' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'aggregate3Value',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'blockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBasefee',
    outputs: [{ name: 'basefee', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'blockNumber', internalType: 'uint256', type: 'uint256' }],
    name: 'getBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBlockNumber',
    outputs: [{ name: 'blockNumber', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getChainId',
    outputs: [{ name: 'chainid', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockCoinbase',
    outputs: [{ name: 'coinbase', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockDifficulty',
    outputs: [{ name: 'difficulty', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockGasLimit',
    outputs: [{ name: 'gaslimit', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrentBlockTimestamp',
    outputs: [{ name: 'timestamp', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'addr', internalType: 'address', type: 'address' }],
    name: 'getEthBalance',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLastBlockHash',
    outputs: [{ name: 'blockHash', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryAggregate',
    outputs: [
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'requireSuccess', internalType: 'bool', type: 'bool' },
      {
        name: 'calls',
        internalType: 'struct IMulticall3.Call[]',
        type: 'tuple[]',
        components: [
          { name: 'target', internalType: 'address', type: 'address' },
          { name: 'callData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'tryBlockAndAggregate',
    outputs: [
      { name: 'blockNumber', internalType: 'uint256', type: 'uint256' },
      { name: 'blockHash', internalType: 'bytes32', type: 'bytes32' },
      {
        name: 'returnData',
        internalType: 'struct IMulticall3.Result[]',
        type: 'tuple[]',
        components: [
          { name: 'success', internalType: 'bool', type: 'bool' },
          { name: 'returnData', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    stateMutability: 'payable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// INFTFlashAction
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const inftFlashActionAbi = [
  { type: 'error', inputs: [], name: 'InvalidOwnerError' },
  {
    type: 'function',
    inputs: [
      { name: '_collection', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_target', internalType: 'address', type: 'address' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'execute',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IOfferValidator
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iOfferValidatorAbi = [
  {
    type: 'function',
    inputs: [
      {
        name: '_offer',
        internalType: 'struct IMultiSourceLoan.LoanOffer',
        type: 'tuple',
        components: [
          { name: 'offerId', internalType: 'uint256', type: 'uint256' },
          { name: 'lender', internalType: 'address', type: 'address' },
          { name: 'fee', internalType: 'uint256', type: 'uint256' },
          { name: 'capacity', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
          { name: 'expirationTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          { name: 'maxSeniorRepayment', internalType: 'uint256', type: 'uint256' },
          {
            name: 'validators',
            internalType: 'struct IBaseLoan.OfferValidator[]',
            type: 'tuple[]',
            components: [
              { name: 'validator', internalType: 'address', type: 'address' },
              { name: 'arguments', internalType: 'bytes', type: 'bytes' },
            ],
          },
        ],
      },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_validatorData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'validateOffer',
    outputs: [],
    stateMutability: 'view',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IOldERC721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iOldErc721Abi = [
  {
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '_balance', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'takeOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IOracle
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iOracleAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'collection', internalType: 'address', type: 'address', indexed: false },
      { name: 'period', internalType: 'uint64', type: 'uint64', indexed: false },
      { name: 'key', internalType: 'bytes4', type: 'bytes4', indexed: false },
      { name: 'value', internalType: 'uint128', type: 'uint128', indexed: false },
    ],
    name: 'DataUpdated',
  },
  {
    type: 'function',
    inputs: [
      { name: '_collection', internalType: 'address', type: 'address' },
      { name: '_period', internalType: 'uint64', type: 'uint64' },
      { name: '_key', internalType: 'bytes4', type: 'bytes4' },
    ],
    name: 'getData',
    outputs: [
      {
        name: '',
        internalType: 'struct IOracle.CollectionData',
        type: 'tuple',
        components: [
          { name: 'value', internalType: 'uint128', type: 'uint128' },
          { name: 'updated', internalType: 'uint128', type: 'uint128' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_collection', internalType: 'address', type: 'address' },
      { name: '_period', internalType: 'uint64', type: 'uint64' },
      { name: '_key', internalType: 'bytes4', type: 'bytes4' },
      { name: '_value', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'setData',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IPurchaseBundler
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iPurchaseBundlerAbi = [
  {
    type: 'function',
    name: 'buy',
    inputs: [
      {
        name: '_executionData',
        type: 'bytes[]',
        internalType: 'bytes[]',
      },
    ],
    outputs: [
      {
        name: '',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
      {
        name: '',
        type: 'tuple[]',
        internalType: 'struct IMultiSourceLoan.Loan[]',
        components: [
          {
            name: 'borrower',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'nftCollateralTokenId',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'nftCollateralAddress',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'principalAddress',
            type: 'address',
            internalType: 'address',
          },
          {
            name: 'principalAmount',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'startTime',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'duration',
            type: 'uint256',
            internalType: 'uint256',
          },
          {
            name: 'tranche',
            type: 'tuple[]',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            components: [
              {
                name: 'loanId',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'floor',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'principalAmount',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'lender',
                type: 'address',
                internalType: 'address',
              },
              {
                name: 'accruedInterest',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'startTime',
                type: 'uint256',
                internalType: 'uint256',
              },
              {
                name: 'aprBps',
                type: 'uint256',
                internalType: 'uint256',
              },
            ],
          },
          {
            name: 'protocolFee',
            type: 'uint256',
            internalType: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'executeSell',
    inputs: [
      {
        name: '_currencies',
        type: 'address[]',
        internalType: 'contract ERC20[]',
      },
      {
        name: '_currencyAmounts',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
      {
        name: '_collections',
        type: 'address[]',
        internalType: 'contract ERC721[]',
      },
      {
        name: '_tokenIds',
        type: 'uint256[]',
        internalType: 'uint256[]',
      },
      {
        name: '_marketPlace',
        type: 'address',
        internalType: 'address',
      },
      {
        name: '_executionData',
        type: 'bytes[]',
        internalType: 'bytes[]',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'finalUpdateMultiSourceLoanAddress',
    inputs: [
      {
        name: '_newAddress',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getMultiSourceLoanAddress',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'address',
        internalType: 'address',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getPendingTaxes',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct IPurchaseBundler.Taxes',
        components: [
          {
            name: 'buyTax',
            type: 'uint128',
            internalType: 'uint128',
          },
          {
            name: 'sellTax',
            type: 'uint128',
            internalType: 'uint128',
          },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getPendingTaxesSetTime',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getTaxes',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct IPurchaseBundler.Taxes',
        components: [
          {
            name: 'buyTax',
            type: 'uint128',
            internalType: 'uint128',
          },
          {
            name: 'sellTax',
            type: 'uint128',
            internalType: 'uint128',
          },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'sell',
    inputs: [
      {
        name: '_executionData',
        type: 'bytes[]',
        internalType: 'bytes[]',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setTaxes',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'updateMultiSourceLoanAddressFirst',
    inputs: [
      {
        name: '_newAddress',
        type: 'address',
        internalType: 'address',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'updateTaxes',
    inputs: [
      {
        name: '_newTaxes',
        type: 'tuple',
        internalType: 'struct IPurchaseBundler.Taxes',
        components: [
          {
            name: 'buyTax',
            type: 'uint128',
            internalType: 'uint128',
          },
          {
            name: 'sellTax',
            type: 'uint128',
            internalType: 'uint128',
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IReservoir
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iReservoirAbi = [
  {
    type: 'function',
    inputs: [
      {
        name: '_executionInfos',
        internalType: 'struct IReservoir.ExecutionInfo[]',
        type: 'tuple[]',
        components: [
          { name: 'module', internalType: 'address', type: 'address' },
          { name: 'data', internalType: 'bytes', type: 'bytes' },
          { name: 'value', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'execute',
    outputs: [],
    stateMutability: 'payable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IUserVault
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iUserVaultAbi = [
  {
    type: 'function',
    inputs: [
      { name: '_vaultId', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
    ],
    name: 'ERC20BalanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_collection', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721OwnerOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_vaultId', internalType: 'uint256', type: 'uint256' },
      { name: '_assetRecipient', internalType: 'address', type: 'address' },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_vaultId', internalType: 'uint256', type: 'uint256' },
      { name: '_collections', internalType: 'address[]', type: 'address[]' },
      { name: '_tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '_tokens', internalType: 'address[]', type: 'address[]' },
      { name: '_erc1155Tokens', internalType: 'address[]', type: 'address[]' },
      { name: '_erc1155TokensIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'burnAndWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_vaultId', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'depositERC1155',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_vaultId', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '_amounts', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'depositERC1155s',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_vaultId', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'depositERC20',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_vaultId', internalType: 'uint256', type: 'uint256' },
      { name: '_collection', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'depositERC721',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_vaultId', internalType: 'uint256', type: 'uint256' },
      { name: '_collection', internalType: 'address', type: 'address' },
      { name: '_tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'depositERC721s',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_vaultId', internalType: 'uint256', type: 'uint256' }],
    name: 'depositEth',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'mint',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_vaultId', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'withdrawERC1155',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_vaultId', internalType: 'uint256', type: 'uint256' },
      { name: '_tokens', internalType: 'address[]', type: 'address[]' },
      { name: '_tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'withdrawERC1155s',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_vaultId', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
    ],
    name: 'withdrawERC20',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_vaultId', internalType: 'uint256', type: 'uint256' },
      { name: '_tokens', internalType: 'address[]', type: 'address[]' },
    ],
    name: 'withdrawERC20s',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_vaultId', internalType: 'uint256', type: 'uint256' },
      { name: '_collection', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'withdrawERC721',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_vaultId', internalType: 'uint256', type: 'uint256' },
      { name: '_collections', internalType: 'address[]', type: 'address[]' },
      { name: '_tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'withdrawERC721s',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_vaultId', internalType: 'uint256', type: 'uint256' }],
    name: 'withdrawEth',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IWrappedPunk
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const iWrappedPunkAbi = [
  {
    type: 'function',
    inputs: [{ name: 'punkIndex', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'punkIndex', internalType: 'uint256', type: 'uint256' }],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'proxyInfo',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'registerProxy',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// InputChecker
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const inputCheckerAbi = [{ type: 'error', inputs: [], name: 'AddressZeroError' }] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LiquidationDistributor
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const liquidationDistributorAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '_loanManagerRegistry', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'InvalidCallerError' },
  { type: 'error', inputs: [], name: 'LiquidatorCannotBeUpdatedError' },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'liquidator', internalType: 'address', type: 'address', indexed: false }],
    name: 'LiquidatorSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'function',
    inputs: [
      { name: '_proceeds', internalType: 'uint256', type: 'uint256' },
      {
        name: '_loan',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'distribute',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLiquidator',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLoanManagerRegistry',
    outputs: [{ name: '', internalType: 'contract ILoanManagerRegistry', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_liquidator', internalType: 'address', type: 'address' }],
    name: 'setLiquidator',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LiquidationHandler
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const liquidationHandlerAbi = [
  { type: 'error', inputs: [], name: 'AddressZeroError' },
  { type: 'error', inputs: [], name: 'InvalidDurationError' },
  { type: 'error', inputs: [], name: 'InvalidInputError' },
  {
    type: 'error',
    inputs: [{ name: '_liquidator', internalType: 'address', type: 'address' }],
    name: 'LiquidatorOnlyError',
  },
  {
    type: 'error',
    inputs: [{ name: '_expirationTime', internalType: 'uint256', type: 'uint256' }],
    name: 'LoanNotDueError',
  },
  {
    type: 'error',
    inputs: [{ name: '_pendingProtocolFeeSetTime', internalType: 'uint256', type: 'uint256' }],
    name: 'TooEarlyError',
  },
  { type: 'error', inputs: [], name: 'TooSoonError' },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newDuration', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'LiquidationAuctionDurationUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'liquidator', internalType: 'address', type: 'address', indexed: false }],
    name: 'LiquidationContractUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'loanId', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'LoanForeclosed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'loanId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'liquidator', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'LoanSentToLiquidator',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newMinBid', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'MinBidLiquidationUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fee',
        internalType: 'struct WithProtocolFee.ProtocolFee',
        type: 'tuple',
        components: [
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'fraction', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: false,
      },
    ],
    name: 'ProtocolFeePendingUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fee',
        internalType: 'struct WithProtocolFee.ProtocolFee',
        type: 'tuple',
        components: [
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'fraction', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: false,
      },
    ],
    name: 'ProtocolFeeUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address', indexed: false }],
    name: 'TransferOwnerRequested',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'contractAdded', internalType: 'address', type: 'address', indexed: false }],
    name: 'WhitelistedCallbackContractAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'contractRemoved', internalType: 'address', type: 'address', indexed: false }],
    name: 'WhitelistedCallbackContractRemoved',
  },
  {
    type: 'function',
    inputs: [],
    name: 'FEE_UPDATE_NOTICE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_AUCTION_DURATION',
    outputs: [{ name: '', internalType: 'uint48', type: 'uint48' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_AUCTION_DURATION',
    outputs: [{ name: '', internalType: 'uint48', type: 'uint48' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_BID_LIQUIDATION',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_WAIT_TIME',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_contract', internalType: 'address', type: 'address' }],
    name: 'addWhitelistedCallbackContract',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLiquidationAuctionDuration',
    outputs: [{ name: '', internalType: 'uint48', type: 'uint48' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLiquidator',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPendingProtocolFee',
    outputs: [
      {
        name: '',
        internalType: 'struct WithProtocolFee.ProtocolFee',
        type: 'tuple',
        components: [
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'fraction', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPendingProtocolFeeSetTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getProtocolFee',
    outputs: [
      {
        name: '',
        internalType: 'struct WithProtocolFee.ProtocolFee',
        type: 'tuple',
        components: [
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'fraction', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_contract', internalType: 'address', type: 'address' }],
    name: 'isWhitelistedCallbackContract',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwnerTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_contract', internalType: 'address', type: 'address' }],
    name: 'removeWhitelistedCallbackContract',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_newOwner', internalType: 'address', type: 'address' }],
    name: 'requestTransferOwner',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'setProtocolFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_newDuration', internalType: 'uint48', type: 'uint48' }],
    name: 'updateLiquidationAuctionDuration',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '__loanLiquidator', internalType: 'address', type: 'address' }],
    name: 'updateLiquidationContract',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_newProtocolFee',
        internalType: 'struct WithProtocolFee.ProtocolFee',
        type: 'tuple',
        components: [
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'fraction', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'updateProtocolFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LoanManager
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const loanManagerAbi = [
  { type: 'error', inputs: [], name: 'CallerNotAccepted' },
  { type: 'error', inputs: [], name: 'InvalidCallerError' },
  { type: 'error', inputs: [], name: 'InvalidInputError' },
  { type: 'error', inputs: [], name: 'TooSoonError' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'callers',
        internalType: 'struct ILoanManager.ProposedCaller[]',
        type: 'tuple[]',
        components: [
          { name: 'caller', internalType: 'address', type: 'address' },
          { name: 'isLoanContract', internalType: 'bool', type: 'bool' },
        ],
        indexed: false,
      },
    ],
    name: 'CallersAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address', indexed: false }],
    name: 'TransferOwnerRequested',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_WAIT_TIME',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'UPDATE_WAITING_TIME',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_callers',
        internalType: 'struct ILoanManager.ProposedCaller[]',
        type: 'tuple[]',
        components: [
          { name: 'caller', internalType: 'address', type: 'address' },
          { name: 'isLoanContract', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    name: 'addCallers',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getOfferHandler',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getParameterSetter',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_caller', internalType: 'address', type: 'address' }],
    name: 'isCallerAccepted',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_loanId', internalType: 'uint256', type: 'uint256' },
      { name: '_principalAmount', internalType: 'uint256', type: 'uint256' },
      { name: '_apr', internalType: 'uint256', type: 'uint256' },
      { name: '_accruedInterest', internalType: 'uint256', type: 'uint256' },
      { name: '_protocolFee', internalType: 'uint256', type: 'uint256' },
      { name: '_received', internalType: 'uint256', type: 'uint256' },
      { name: '_startTime', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'loanLiquidation',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_loanId', internalType: 'uint256', type: 'uint256' },
      { name: '_principalAmount', internalType: 'uint256', type: 'uint256' },
      { name: '_apr', internalType: 'uint256', type: 'uint256' },
      { name: '_accruedInterest', internalType: 'uint256', type: 'uint256' },
      { name: '_protocolFee', internalType: 'uint256', type: 'uint256' },
      { name: '_startTime', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'loanRepayment',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwnerTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_newOwner', internalType: 'address', type: 'address' }],
    name: 'requestTransferOwner',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_offerHandler', internalType: 'address', type: 'address' }],
    name: 'updateOfferHandler',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_offer', internalType: 'bytes', type: 'bytes' },
      { name: '_protocolFee', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'validateOffer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LoanManagerParameterSetter
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const loanManagerParameterSetterAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '__offerHandler', internalType: 'address', type: 'address' },
      { name: '_updateWaitingTime', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'AddressZeroError' },
  { type: 'error', inputs: [], name: 'InvalidInputError' },
  { type: 'error', inputs: [], name: 'LoanManagerSetError' },
  { type: 'error', inputs: [], name: 'TooSoonError' },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'offerHandler', internalType: 'address', type: 'address', indexed: false }],
    name: 'OfferHandlerSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'offerHandler', internalType: 'address', type: 'address', indexed: false }],
    name: 'ProposedOfferHandlerSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'callers',
        internalType: 'struct ILoanManager.ProposedCaller[]',
        type: 'tuple[]',
        components: [
          { name: 'caller', internalType: 'address', type: 'address' },
          { name: 'isLoanContract', internalType: 'bool', type: 'bool' },
        ],
        indexed: false,
      },
    ],
    name: 'RequestCallersAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address', indexed: false }],
    name: 'TransferOwnerRequested',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_WAIT_TIME',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'UPDATE_WAITING_TIME',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_callers',
        internalType: 'struct ILoanManager.ProposedCaller[]',
        type: 'tuple[]',
        components: [
          { name: 'caller', internalType: 'address', type: 'address' },
          { name: 'isLoanContract', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    name: 'addCallers',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '__offerHandler', internalType: 'address', type: 'address' }],
    name: 'confirmOfferHandler',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLoanManager',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getOfferHandler',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'getProposedAcceptedCallers',
    outputs: [
      { name: 'caller', internalType: 'address', type: 'address' },
      { name: 'isLoanContract', internalType: 'bool', type: 'bool' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getProposedAcceptedCallersSetTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getProposedOfferHandler',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getProposedOfferHandlerSetTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwnerTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_callers',
        internalType: 'struct ILoanManager.ProposedCaller[]',
        type: 'tuple[]',
        components: [
          { name: 'caller', internalType: 'address', type: 'address' },
          { name: 'isLoanContract', internalType: 'bool', type: 'bool' },
        ],
      },
    ],
    name: 'requestAddCallers',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_newOwner', internalType: 'address', type: 'address' }],
    name: 'requestTransferOwner',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '__loanManager', internalType: 'address', type: 'address' }],
    name: 'setLoanManager',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '__offerHandler', internalType: 'address', type: 'address' }],
    name: 'setOfferHandler',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LoanManagerRegistry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const loanManagerRegistryAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'loanManagerAdded', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'LoanManagerAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'loanManagerRemoved', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'LoanManagerRemoved',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'function',
    inputs: [{ name: '_loanManager', internalType: 'address', type: 'address' }],
    name: 'addLoanManager',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_loanManager', internalType: 'address', type: 'address' }],
    name: 'isLoanManager',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_loanManager', internalType: 'address', type: 'address' }],
    name: 'removeLoanManager',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Math
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mathAbi = [{ type: 'error', inputs: [], name: 'MathOverflowedMulDiv' }] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MockERC20
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mockErc20Abi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'spender', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_name', internalType: 'string', type: 'string' },
      { name: '_symbol', internalType: 'string', type: 'string' },
      { name: '_decimals', internalType: 'uint8', type: 'uint8' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MockERC721
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mockErc721Abi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'spender', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_name', internalType: 'string', type: 'string' },
      { name: '_symbol', internalType: 'string', type: 'string' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MockedAave
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mockedAaveAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '__baseAsset', internalType: 'contract SampleToken', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'aToken',
    outputs: [{ name: '', internalType: 'contract SampleToken', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'baseAsset',
    outputs: [{ name: '', internalType: 'contract ERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'onBehalfOf', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint16', type: 'uint16' },
    ],
    name: 'deposit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'getReserveData',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint128', type: 'uint128' },
      { name: '', internalType: 'uint128', type: 'uint128' },
      { name: '', internalType: 'uint128', type: 'uint128' },
      { name: '', internalType: 'uint128', type: 'uint128' },
      { name: '', internalType: 'uint128', type: 'uint128' },
      { name: '', internalType: 'uint40', type: 'uint40' },
      { name: '', internalType: 'uint16', type: 'uint16' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint128', type: 'uint128' },
      { name: '', internalType: 'uint128', type: 'uint128' },
      { name: '', internalType: 'uint128', type: 'uint128' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '__apr', internalType: 'uint128', type: 'uint128' }],
    name: 'setAprBps',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'to', internalType: 'address', type: 'address' },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MockedCurve
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const mockedCurveAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '_token', internalType: 'contract SampleToken', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'i', internalType: 'uint128', type: 'uint128' },
      { name: '', internalType: 'uint128', type: 'uint128' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '_min_dy', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'exchange',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'nextDy',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_nextDy', internalType: 'uint256', type: 'uint256' }],
    name: 'setNextDy',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [{ name: '', internalType: 'contract SampleToken', type: 'address' }],
    stateMutability: 'view',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MultiSourceCommons
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const multiSourceCommonsAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'string', type: 'string', indexed: false }],
    name: 'log',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'address', type: 'address', indexed: false }],
    name: 'log_address',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'val', internalType: 'uint256[]', type: 'uint256[]', indexed: false }],
    name: 'log_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'val', internalType: 'int256[]', type: 'int256[]', indexed: false }],
    name: 'log_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'val', internalType: 'address[]', type: 'address[]', indexed: false }],
    name: 'log_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'bytes', type: 'bytes', indexed: false }],
    name: 'log_bytes',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32', indexed: false }],
    name: 'log_bytes32',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'int256', type: 'int256', indexed: false }],
    name: 'log_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'log_named_address',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'uint256[]', type: 'uint256[]', indexed: false },
    ],
    name: 'log_named_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'int256[]', type: 'int256[]', indexed: false },
    ],
    name: 'log_named_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'address[]', type: 'address[]', indexed: false },
    ],
    name: 'log_named_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'log_named_bytes',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'bytes32', type: 'bytes32', indexed: false },
    ],
    name: 'log_named_bytes32',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'int256', type: 'int256', indexed: false },
      { name: 'decimals', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'log_named_decimal_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'decimals', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'log_named_decimal_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'int256', type: 'int256', indexed: false },
    ],
    name: 'log_named_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'log_named_string',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'log_named_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'string', type: 'string', indexed: false }],
    name: 'log_string',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'log_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'bytes', type: 'bytes', indexed: false }],
    name: 'logs',
  },
  {
    type: 'function',
    inputs: [],
    name: 'IS_TEST',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'excludeArtifacts',
    outputs: [{ name: 'excludedArtifacts_', internalType: 'string[]', type: 'string[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'excludeContracts',
    outputs: [{ name: 'excludedContracts_', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'excludeSenders',
    outputs: [{ name: 'excludedSenders_', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'failed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  { type: 'function', inputs: [], name: 'setUp', outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    inputs: [],
    name: 'targetArtifactSelectors',
    outputs: [
      {
        name: 'targetedArtifactSelectors_',
        internalType: 'struct StdInvariant.FuzzSelector[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'selectors', internalType: 'bytes4[]', type: 'bytes4[]' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetArtifacts',
    outputs: [{ name: 'targetedArtifacts_', internalType: 'string[]', type: 'string[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetContracts',
    outputs: [{ name: 'targetedContracts_', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetInterfaces',
    outputs: [
      {
        name: 'targetedInterfaces_',
        internalType: 'struct StdInvariant.FuzzInterface[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'artifacts', internalType: 'string[]', type: 'string[]' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetSelectors',
    outputs: [
      {
        name: 'targetedSelectors_',
        internalType: 'struct StdInvariant.FuzzSelector[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'selectors', internalType: 'bytes4[]', type: 'bytes4[]' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetSenders',
    outputs: [{ name: 'targetedSenders_', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MultiSourceLoan
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const multiSourceLoanAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'loanLiquidator', internalType: 'address', type: 'address' },
      {
        name: 'protocolFee',
        internalType: 'struct WithProtocolFee.ProtocolFee',
        type: 'tuple',
        components: [
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'fraction', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: 'currencyManager', internalType: 'address', type: 'address' },
      { name: 'collectionManager', internalType: 'address', type: 'address' },
      { name: 'maxTranches', internalType: 'uint256', type: 'uint256' },
      { name: 'minLockPeriod', internalType: 'uint256', type: 'uint256' },
      { name: 'delegateRegistry', internalType: 'address', type: 'address' },
      { name: 'loanManagerRegistry', internalType: 'address', type: 'address' },
      { name: 'flashActionContract', internalType: 'address', type: 'address' },
      { name: 'minWaitTime', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'AddressZeroError' },
  {
    type: 'error',
    inputs: [
      { name: '_lender', internalType: 'address', type: 'address' },
      { name: '_offerId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'CancelledOrExecutedOfferError',
  },
  { type: 'error', inputs: [], name: 'CollectionNotWhitelistedError' },
  { type: 'error', inputs: [], name: 'CurrencyNotWhitelistedError' },
  { type: 'error', inputs: [], name: 'ECDSAInvalidSignature' },
  {
    type: 'error',
    inputs: [{ name: 'length', internalType: 'uint256', type: 'uint256' }],
    name: 'ECDSAInvalidSignatureLength',
  },
  {
    type: 'error',
    inputs: [{ name: 's', internalType: 'bytes32', type: 'bytes32' }],
    name: 'ECDSAInvalidSignatureS',
  },
  {
    type: 'error',
    inputs: [{ name: '_expirationTime', internalType: 'uint256', type: 'uint256' }],
    name: 'ExpiredOfferError',
  },
  { type: 'error', inputs: [], name: 'InvalidAddressesError' },
  {
    type: 'error',
    inputs: [
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
      { name: '_principalAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidAmountError',
  },
  { type: 'error', inputs: [], name: 'InvalidCallbackError' },
  { type: 'error', inputs: [], name: 'InvalidCallerError' },
  { type: 'error', inputs: [], name: 'InvalidCollateralIdError' },
  { type: 'error', inputs: [], name: 'InvalidDurationError' },
  { type: 'error', inputs: [], name: 'InvalidInputError' },
  {
    type: 'error',
    inputs: [{ name: '_loanId', internalType: 'uint256', type: 'uint256' }],
    name: 'InvalidLoanError',
  },
  { type: 'error', inputs: [], name: 'InvalidMethodError' },
  { type: 'error', inputs: [], name: 'InvalidParametersError' },
  { type: 'error', inputs: [], name: 'InvalidRenegotiationOfferError' },
  { type: 'error', inputs: [], name: 'InvalidSignatureError' },
  { type: 'error', inputs: [], name: 'InvalidTrancheError' },
  {
    type: 'error',
    inputs: [{ name: '_liquidator', internalType: 'address', type: 'address' }],
    name: 'LiquidatorOnlyError',
  },
  { type: 'error', inputs: [], name: 'LoanExpiredError' },
  { type: 'error', inputs: [], name: 'LoanLockedError' },
  {
    type: 'error',
    inputs: [{ name: '_expirationTime', internalType: 'uint256', type: 'uint256' }],
    name: 'LoanNotDueError',
  },
  {
    type: 'error',
    inputs: [
      { name: '_lender', internalType: 'address', type: 'address' },
      { name: '_newMinOfferId', internalType: 'uint256', type: 'uint256' },
      { name: '_minOfferId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'LowOfferIdError',
  },
  {
    type: 'error',
    inputs: [
      { name: '_lender', internalType: 'address', type: 'address' },
      { name: '_newMinRenegotiationOfferId', internalType: 'uint256', type: 'uint256' },
      { name: '_minOfferId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'LowRenegotiationOfferIdError',
  },
  { type: 'error', inputs: [], name: 'MaxCapacityExceededError' },
  { type: 'error', inputs: [], name: 'MismatchError' },
  {
    type: 'error',
    inputs: [
      { name: 'i', internalType: 'uint256', type: 'uint256' },
      { name: 'returndata', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'MulticallFailed',
  },
  { type: 'error', inputs: [], name: 'NFTNotReturnedError' },
  { type: 'error', inputs: [], name: 'NotStrictlyImprovedError' },
  {
    type: 'error',
    inputs: [{ name: '_pendingProtocolFeeSetTime', internalType: 'uint256', type: 'uint256' }],
    name: 'TooEarlyError',
  },
  { type: 'error', inputs: [], name: 'TooManyTranchesError' },
  { type: 'error', inputs: [], name: 'TooSoonError' },
  {
    type: 'error',
    inputs: [{ name: 'minTimestamp', internalType: 'uint256', type: 'uint256' }],
    name: 'TrancheCannotBeRefinancedError',
  },
  { type: 'error', inputs: [], name: 'ZeroInterestError' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'lender', internalType: 'address', type: 'address', indexed: false },
      { name: 'minOfferId', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'AllOffersCancelled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'loanId',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256',
      },
      {
        name: 'delegate',
        type: 'address',
        indexed: false,
        internalType: 'address',
      },
      {
        name: '_rights',
        type: 'bytes32',
        indexed: false,
        internalType: 'bytes32',
      },
      {
        name: 'value',
        type: 'bool',
        indexed: false,
        internalType: 'bool',
      },
    ],
    name: 'Delegated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'newFlashActionContract', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'FlashActionContractUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'loanId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'target', internalType: 'address', type: 'address', indexed: false },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'FlashActionExecuted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newDuration', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'LiquidationAuctionDurationUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'liquidator', internalType: 'address', type: 'address', indexed: false }],
    name: 'LiquidationContractUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'loanId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'offerId', internalType: 'uint256[]', type: 'uint256[]', indexed: false },
      {
        name: 'loan',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: false,
      },
      { name: 'fee', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'LoanEmitted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'loanId', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'LoanForeclosed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'loanId', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'LoanLiquidated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'renegotiationId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'oldLoanId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'newLoanId', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'loan',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: false,
      },
      { name: 'fee', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'LoanRefinanced',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'loanId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'newLoanId', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'loan',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: false,
      },
      { name: 'offerIds', internalType: 'uint256[]', type: 'uint256[]', indexed: false },
      { name: 'totalFee', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'LoanRefinancedFromNewOffers',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'loanId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'totalRepayment', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'fee', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'LoanRepaid',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'loanId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'liquidator', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'LoanSentToLiquidator',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '_minimum', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'MinAprImprovementUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newMinBid', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'MinBidLiquidationUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'minLockPeriod', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'MinLockPeriodUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'lender', internalType: 'address', type: 'address', indexed: false },
      { name: 'offerId', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'OfferCancelled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fee',
        internalType: 'struct WithProtocolFee.ProtocolFee',
        type: 'tuple',
        components: [
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'fraction', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: false,
      },
    ],
    name: 'ProtocolFeePendingUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fee',
        internalType: 'struct WithProtocolFee.ProtocolFee',
        type: 'tuple',
        components: [
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'fraction', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: false,
      },
    ],
    name: 'ProtocolFeeUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'lender', internalType: 'address', type: 'address', indexed: false },
      { name: 'renegotiationId', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'RenegotiationOfferCancelled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'delegate', internalType: 'address', type: 'address', indexed: false },
      { name: 'collection', internalType: 'address', type: 'address', indexed: false },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'RevokeDelegate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address', indexed: false }],
    name: 'TransferOwnerRequested',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'contractAdded', internalType: 'address', type: 'address', indexed: false }],
    name: 'WhitelistedCallbackContractAdded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'contractRemoved', internalType: 'address', type: 'address', indexed: false }],
    name: 'WhitelistedCallbackContractRemoved',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'FEE_UPDATE_NOTICE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'INITIAL_DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_AUCTION_DURATION',
    outputs: [{ name: '', internalType: 'uint48', type: 'uint48' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_AUCTION_DURATION',
    outputs: [{ name: '', internalType: 'uint48', type: 'uint48' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_BID_LIQUIDATION',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_WAIT_TIME',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'VERSION',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_renegotiationOffer',
        internalType: 'struct IMultiSourceLoan.RenegotiationOffer',
        type: 'tuple',
        components: [
          { name: 'renegotiationId', internalType: 'uint256', type: 'uint256' },
          { name: 'loanId', internalType: 'uint256', type: 'uint256' },
          { name: 'lender', internalType: 'address', type: 'address' },
          { name: 'fee', internalType: 'uint256', type: 'uint256' },
          { name: 'trancheIndex', internalType: 'uint256[]', type: 'uint256[]' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
          { name: 'expirationTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: '_loan',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: '_renegotiationOfferSignature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'addNewTranche',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      {
        name: '',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_contract', internalType: 'address', type: 'address' }],
    name: 'addWhitelistedCallbackContract',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_minOfferId', internalType: 'uint256', type: 'uint256' }],
    name: 'cancelAllOffers',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_offerId', internalType: 'uint256', type: 'uint256' }],
    name: 'cancelOffer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_renegotiationId', internalType: 'uint256', type: 'uint256' }],
    name: 'cancelRenegotiationOffer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_loanId', internalType: 'uint256', type: 'uint256' },
      {
        name: 'loan',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: '_delegate', internalType: 'address', type: 'address' },
      { name: '_rights', internalType: 'bytes32', type: 'bytes32' },
      { name: '_value', internalType: 'bool', type: 'bool' },
    ],
    name: 'delegate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_loanExecutionData',
        internalType: 'struct IMultiSourceLoan.LoanExecutionData',
        type: 'tuple',
        components: [
          {
            name: 'executionData',
            internalType: 'struct IMultiSourceLoan.ExecutionData',
            type: 'tuple',
            components: [
              {
                name: 'offerExecution',
                internalType: 'struct IMultiSourceLoan.OfferExecution[]',
                type: 'tuple[]',
                components: [
                  {
                    name: 'offer',
                    internalType: 'struct IMultiSourceLoan.LoanOffer',
                    type: 'tuple',
                    components: [
                      { name: 'offerId', internalType: 'uint256', type: 'uint256' },
                      { name: 'lender', internalType: 'address', type: 'address' },
                      { name: 'fee', internalType: 'uint256', type: 'uint256' },
                      { name: 'capacity', internalType: 'uint256', type: 'uint256' },
                      { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
                      { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
                      { name: 'principalAddress', internalType: 'address', type: 'address' },
                      { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
                      { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
                      { name: 'expirationTime', internalType: 'uint256', type: 'uint256' },
                      { name: 'duration', internalType: 'uint256', type: 'uint256' },
                      { name: 'maxSeniorRepayment', internalType: 'uint256', type: 'uint256' },
                      {
                        name: 'validators',
                        internalType: 'struct IBaseLoan.OfferValidator[]',
                        type: 'tuple[]',
                        components: [
                          { name: 'validator', internalType: 'address', type: 'address' },
                          { name: 'arguments', internalType: 'bytes', type: 'bytes' },
                        ],
                      },
                    ],
                  },
                  { name: 'amount', internalType: 'uint256', type: 'uint256' },
                  { name: 'lenderOfferSignature', internalType: 'bytes', type: 'bytes' },
                ],
              },
              { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
              { name: 'duration', internalType: 'uint256', type: 'uint256' },
              { name: 'expirationTime', internalType: 'uint256', type: 'uint256' },
              { name: 'principalReceiver', internalType: 'address', type: 'address' },
              { name: 'callbackData', internalType: 'bytes', type: 'bytes' },
            ],
          },
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'borrowerOfferSignature', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'emitLoan',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      {
        name: '',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_loanId', internalType: 'uint256', type: 'uint256' },
      {
        name: '_loan',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: '_target', internalType: 'address', type: 'address' },
      { name: '_data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'executeFlashAction',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCollectionManager',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getCurrencyManager',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getDelegateRegistry',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getFlashActionContract',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLiquidationAuctionDuration',
    outputs: [{ name: '', internalType: 'uint48', type: 'uint48' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLiquidator',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_loanId', internalType: 'uint256', type: 'uint256' }],
    name: 'getLoanHash',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getLoanManagerRegistry',
    outputs: [{ name: '', internalType: 'contract ILoanManagerRegistry', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMaxTranches',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMinImprovementApr',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMinLockPeriod',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPendingProtocolFee',
    outputs: [
      {
        name: '',
        internalType: 'struct WithProtocolFee.ProtocolFee',
        type: 'tuple',
        components: [
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'fraction', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPendingProtocolFeeSetTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getProtocolFee',
    outputs: [
      {
        name: '',
        internalType: 'struct WithProtocolFee.ProtocolFee',
        type: 'tuple',
        components: [
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'fraction', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTotalLoansIssued',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_lender', internalType: 'address', type: 'address' },
      { name: '_offerId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getUsedCapacity',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'offerId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'isOfferCancelled',
    outputs: [{ name: 'notActive', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'renegotiationIf', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'isRenegotiationOfferCancelled',
    outputs: [{ name: 'notActive', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_contract', internalType: 'address', type: 'address' }],
    name: 'isWhitelistedCallbackContract',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_loanId', internalType: 'uint256', type: 'uint256' },
      {
        name: '_loan',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'liquidateLoan',
    outputs: [{ name: '', internalType: 'bytes', type: 'bytes' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_loanId', internalType: 'uint256', type: 'uint256' },
      {
        name: '_loan',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'loanLiquidated',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'user', internalType: 'address', type: 'address' }],
    name: 'minOfferId',
    outputs: [{ name: 'minOfferId', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'multicall',
    outputs: [{ name: 'results', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwnerTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_loanId', internalType: 'uint256', type: 'uint256' },
      {
        name: '_loan',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: '_loanExecutionData',
        internalType: 'struct IMultiSourceLoan.LoanExecutionData',
        type: 'tuple',
        components: [
          {
            name: 'executionData',
            internalType: 'struct IMultiSourceLoan.ExecutionData',
            type: 'tuple',
            components: [
              {
                name: 'offerExecution',
                internalType: 'struct IMultiSourceLoan.OfferExecution[]',
                type: 'tuple[]',
                components: [
                  {
                    name: 'offer',
                    internalType: 'struct IMultiSourceLoan.LoanOffer',
                    type: 'tuple',
                    components: [
                      { name: 'offerId', internalType: 'uint256', type: 'uint256' },
                      { name: 'lender', internalType: 'address', type: 'address' },
                      { name: 'fee', internalType: 'uint256', type: 'uint256' },
                      { name: 'capacity', internalType: 'uint256', type: 'uint256' },
                      { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
                      { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
                      { name: 'principalAddress', internalType: 'address', type: 'address' },
                      { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
                      { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
                      { name: 'expirationTime', internalType: 'uint256', type: 'uint256' },
                      { name: 'duration', internalType: 'uint256', type: 'uint256' },
                      { name: 'maxSeniorRepayment', internalType: 'uint256', type: 'uint256' },
                      {
                        name: 'validators',
                        internalType: 'struct IBaseLoan.OfferValidator[]',
                        type: 'tuple[]',
                        components: [
                          { name: 'validator', internalType: 'address', type: 'address' },
                          { name: 'arguments', internalType: 'bytes', type: 'bytes' },
                        ],
                      },
                    ],
                  },
                  { name: 'amount', internalType: 'uint256', type: 'uint256' },
                  { name: 'lenderOfferSignature', internalType: 'bytes', type: 'bytes' },
                ],
              },
              { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
              { name: 'duration', internalType: 'uint256', type: 'uint256' },
              { name: 'expirationTime', internalType: 'uint256', type: 'uint256' },
              { name: 'principalReceiver', internalType: 'address', type: 'address' },
              { name: 'callbackData', internalType: 'bytes', type: 'bytes' },
            ],
          },
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'borrowerOfferSignature', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'refinanceFromLoanExecutionData',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      {
        name: '',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_renegotiationOffer',
        internalType: 'struct IMultiSourceLoan.RenegotiationOffer',
        type: 'tuple',
        components: [
          { name: 'renegotiationId', internalType: 'uint256', type: 'uint256' },
          { name: 'loanId', internalType: 'uint256', type: 'uint256' },
          { name: 'lender', internalType: 'address', type: 'address' },
          { name: 'fee', internalType: 'uint256', type: 'uint256' },
          { name: 'trancheIndex', internalType: 'uint256[]', type: 'uint256[]' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
          { name: 'expirationTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: '_loan',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
      { name: '_renegotiationOfferSignature', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'refinanceFull',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      {
        name: '',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_renegotiationOffer',
        internalType: 'struct IMultiSourceLoan.RenegotiationOffer',
        type: 'tuple',
        components: [
          { name: 'renegotiationId', internalType: 'uint256', type: 'uint256' },
          { name: 'loanId', internalType: 'uint256', type: 'uint256' },
          { name: 'lender', internalType: 'address', type: 'address' },
          { name: 'fee', internalType: 'uint256', type: 'uint256' },
          { name: 'trancheIndex', internalType: 'uint256[]', type: 'uint256[]' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
          { name: 'expirationTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
        ],
      },
      {
        name: '_loan',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'refinancePartial',
    outputs: [
      { name: '', internalType: 'uint256', type: 'uint256' },
      {
        name: '',
        internalType: 'struct IMultiSourceLoan.Loan',
        type: 'tuple',
        components: [
          { name: 'borrower', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'tranche',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            type: 'tuple[]',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'floor', internalType: 'uint256', type: 'uint256' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'lender', internalType: 'address', type: 'address' },
              { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_contract', internalType: 'address', type: 'address' }],
    name: 'removeWhitelistedCallbackContract',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_repaymentData',
        internalType: 'struct IMultiSourceLoan.LoanRepaymentData',
        type: 'tuple',
        components: [
          {
            name: 'data',
            internalType: 'struct IMultiSourceLoan.SignableRepaymentData',
            type: 'tuple',
            components: [
              { name: 'loanId', internalType: 'uint256', type: 'uint256' },
              { name: 'callbackData', internalType: 'bytes', type: 'bytes' },
              { name: 'shouldDelegate', internalType: 'bool', type: 'bool' },
            ],
          },
          {
            name: 'loan',
            internalType: 'struct IMultiSourceLoan.Loan',
            type: 'tuple',
            components: [
              { name: 'borrower', internalType: 'address', type: 'address' },
              { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
              { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
              { name: 'principalAddress', internalType: 'address', type: 'address' },
              { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
              { name: 'startTime', internalType: 'uint256', type: 'uint256' },
              { name: 'duration', internalType: 'uint256', type: 'uint256' },
              {
                name: 'tranche',
                internalType: 'struct IMultiSourceLoan.Tranche[]',
                type: 'tuple[]',
                components: [
                  { name: 'loanId', internalType: 'uint256', type: 'uint256' },
                  { name: 'floor', internalType: 'uint256', type: 'uint256' },
                  { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
                  { name: 'lender', internalType: 'address', type: 'address' },
                  { name: 'accruedInterest', internalType: 'uint256', type: 'uint256' },
                  { name: 'startTime', internalType: 'uint256', type: 'uint256' },
                  { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
                ],
              },
              { name: 'protocolFee', internalType: 'uint256', type: 'uint256' },
            ],
          },
          { name: 'borrowerSignature', internalType: 'bytes', type: 'bytes' },
        ],
      },
    ],
    name: 'repayLoan',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_newOwner', internalType: 'address', type: 'address' }],
    name: 'requestTransferOwner',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_delegate', internalType: 'address', type: 'address' },
      { name: '_collection', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'revokeDelegate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_newFlashActionContract', internalType: 'address', type: 'address' }],
    name: 'setFlashActionContract',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '__minLockPeriod', internalType: 'uint256', type: 'uint256' }],
    name: 'setMinLockPeriod',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'setProtocolFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_newDuration', internalType: 'uint48', type: 'uint48' }],
    name: 'updateLiquidationAuctionDuration',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '__loanLiquidator', internalType: 'address', type: 'address' }],
    name: 'updateLiquidationContract',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_newMinimum', internalType: 'uint256', type: 'uint256' }],
    name: 'updateMinImprovementApr',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_newProtocolFee',
        internalType: 'struct WithProtocolFee.ProtocolFee',
        type: 'tuple',
        components: [
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'fraction', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'updateProtocolFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Multicall
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const multicallAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'i', internalType: 'uint256', type: 'uint256' },
      { name: 'returndata', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'MulticallFailed',
  },
  {
    type: 'function',
    inputs: [{ name: 'data', internalType: 'bytes[]', type: 'bytes[]' }],
    name: 'multicall',
    outputs: [{ name: 'results', internalType: 'bytes[]', type: 'bytes[]' }],
    stateMutability: 'payable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// NftBitVectorValidator
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const nftBitVectorValidatorAbi = [
  {
    type: 'error',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'BitVectorLengthExceededError',
  },
  {
    type: 'error',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'TokenIdNotFoundError',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '',
        internalType: 'struct IMultiSourceLoan.LoanOffer',
        type: 'tuple',
        components: [
          { name: 'offerId', internalType: 'uint256', type: 'uint256' },
          { name: 'lender', internalType: 'address', type: 'address' },
          { name: 'fee', internalType: 'uint256', type: 'uint256' },
          { name: 'capacity', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
          { name: 'expirationTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          { name: 'maxSeniorRepayment', internalType: 'uint256', type: 'uint256' },
          {
            name: 'validators',
            internalType: 'struct IBaseLoan.OfferValidator[]',
            type: 'tuple[]',
            components: [
              { name: 'validator', internalType: 'address', type: 'address' },
              { name: 'arguments', internalType: 'bytes', type: 'bytes' },
            ],
          },
        ],
      },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_validatorData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'validateOffer',
    outputs: [],
    stateMutability: 'pure',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// NftPackedListValidator
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const nftPackedListValidatorAbi = [
  { type: 'error', inputs: [], name: 'EmptyTokenIdListError' },
  {
    type: 'error',
    inputs: [{ name: '_bytesPerTokenId', internalType: 'uint64', type: 'uint64' }],
    name: 'InvalidBytesPerTokenIdError',
  },
  {
    type: 'error',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'TokenIdNotFoundError',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '',
        internalType: 'struct IMultiSourceLoan.LoanOffer',
        type: 'tuple',
        components: [
          { name: 'offerId', internalType: 'uint256', type: 'uint256' },
          { name: 'lender', internalType: 'address', type: 'address' },
          { name: 'fee', internalType: 'uint256', type: 'uint256' },
          { name: 'capacity', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
          { name: 'expirationTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          { name: 'maxSeniorRepayment', internalType: 'uint256', type: 'uint256' },
          {
            name: 'validators',
            internalType: 'struct IBaseLoan.OfferValidator[]',
            type: 'tuple[]',
            components: [
              { name: 'validator', internalType: 'address', type: 'address' },
              { name: 'arguments', internalType: 'bytes', type: 'bytes' },
            ],
          },
        ],
      },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_validatorData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'validateOffer',
    outputs: [],
    stateMutability: 'pure',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Oracle
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const oracleAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '_minWaitTime', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'InvalidInputError' },
  { type: 'error', inputs: [], name: 'TooSoonError' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'collection', internalType: 'address', type: 'address', indexed: false },
      { name: 'period', internalType: 'uint64', type: 'uint64', indexed: false },
      { name: 'key', internalType: 'bytes4', type: 'bytes4', indexed: false },
      { name: 'value', internalType: 'uint128', type: 'uint128', indexed: false },
    ],
    name: 'DataUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address', indexed: false }],
    name: 'TransferOwnerRequested',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_WAIT_TIME',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_collection', internalType: 'address', type: 'address' },
      { name: '_period', internalType: 'uint64', type: 'uint64' },
      { name: '_key', internalType: 'bytes4', type: 'bytes4' },
    ],
    name: 'getData',
    outputs: [
      {
        name: '',
        internalType: 'struct IOracle.CollectionData',
        type: 'tuple',
        components: [
          { name: 'value', internalType: 'uint128', type: 'uint128' },
          { name: 'updated', internalType: 'uint128', type: 'uint128' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwnerTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_newOwner', internalType: 'address', type: 'address' }],
    name: 'requestTransferOwner',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_collection', internalType: 'address', type: 'address' },
      { name: '_period', internalType: 'uint64', type: 'uint64' },
      { name: '_key', internalType: 'bytes4', type: 'bytes4' },
      { name: '_value', internalType: 'uint128', type: 'uint128' },
    ],
    name: 'setData',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Owned
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const ownedAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PurchaseBundler
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const purchaseBundlerAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'name', type: 'string', internalType: 'string' },
      { name: 'multiSourceLoanAddress', type: 'address', internalType: 'address' },
      { name: 'marketplaceContracts', type: 'address', internalType: 'address' },
      { name: 'wethAddress', type: 'address', internalType: 'address payable' },
      { name: 'punkMarketAddress', type: 'address', internalType: 'address payable' },
      { name: 'wrappedPunkAddress', type: 'address', internalType: 'address payable' },
      { name: 'c721Address', type: 'address', internalType: 'address payable' },
      { name: 'uniswapRouterAddress', type: 'address', internalType: 'address payable' },
      { name: 'currencyManager', type: 'address', internalType: 'address' },
      {
        name: 'taxes',
        type: 'tuple',
        internalType: 'struct IPurchaseBundler.Taxes',
        components: [
          { name: 'buyTax', type: 'uint128', internalType: 'uint128' },
          { name: 'sellTax', type: 'uint128', internalType: 'uint128' },
        ],
      },
      { name: 'minWaitTime', type: 'uint256', internalType: 'uint256' },
      {
        name: 'protocolFee',
        type: 'tuple',
        internalType: 'struct WithProtocolFee.ProtocolFee',
        components: [
          { name: 'recipient', type: 'address', internalType: 'address' },
          { name: 'fraction', type: 'uint256', internalType: 'uint256' },
        ],
      },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'fallback', stateMutability: 'payable' },
  { type: 'receive', stateMutability: 'payable' },
  {
    type: 'function',
    name: 'DOMAIN_SEPARATOR',
    inputs: [],
    outputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'FEE_UPDATE_NOTICE',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'INITIAL_DOMAIN_SEPARATOR',
    inputs: [],
    outputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'MIN_WAIT_TIME',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'TAX_UPDATE_NOTICE',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'VERSION',
    inputs: [],
    outputs: [{ name: '', type: 'bytes', internalType: 'bytes' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'afterNFTTransfer',
    inputs: [
      {
        name: '_loan',
        type: 'tuple',
        internalType: 'struct IMultiSourceLoan.Loan',
        components: [
          { name: 'borrower', type: 'address', internalType: 'address' },
          { name: 'nftCollateralTokenId', type: 'uint256', internalType: 'uint256' },
          { name: 'nftCollateralAddress', type: 'address', internalType: 'address' },
          { name: 'principalAddress', type: 'address', internalType: 'address' },
          { name: 'principalAmount', type: 'uint256', internalType: 'uint256' },
          { name: 'startTime', type: 'uint256', internalType: 'uint256' },
          { name: 'duration', type: 'uint256', internalType: 'uint256' },
          {
            name: 'tranche',
            type: 'tuple[]',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            components: [
              { name: 'loanId', type: 'uint256', internalType: 'uint256' },
              { name: 'floor', type: 'uint256', internalType: 'uint256' },
              { name: 'principalAmount', type: 'uint256', internalType: 'uint256' },
              { name: 'lender', type: 'address', internalType: 'address' },
              { name: 'accruedInterest', type: 'uint256', internalType: 'uint256' },
              { name: 'startTime', type: 'uint256', internalType: 'uint256' },
              { name: 'aprBps', type: 'uint256', internalType: 'uint256' },
            ],
          },
          { name: 'protocolFee', type: 'uint256', internalType: 'uint256' },
        ],
      },
      { name: '_executionData', type: 'bytes', internalType: 'bytes' },
    ],
    outputs: [{ name: '', type: 'bytes4', internalType: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'afterNFTTransfer',
    inputs: [
      {
        name: '_loan',
        type: 'tuple',
        internalType: 'struct IMultiSourceLoan.Loan',
        components: [
          { name: 'borrower', type: 'address', internalType: 'address' },
          { name: 'nftCollateralTokenId', type: 'uint256', internalType: 'uint256' },
          { name: 'nftCollateralAddress', type: 'address', internalType: 'address' },
          { name: 'principalAddress', type: 'address', internalType: 'address' },
          { name: 'principalAmount', type: 'uint256', internalType: 'uint256' },
          { name: 'startTime', type: 'uint256', internalType: 'uint256' },
          { name: 'duration', type: 'uint256', internalType: 'uint256' },
          {
            name: 'source',
            type: 'tuple[]',
            internalType: 'struct IMultiSourceLoan.Source[]',
            components: [
              { name: 'loanId', type: 'uint256', internalType: 'uint256' },
              { name: 'lender', type: 'address', internalType: 'address' },
              { name: 'principalAmount', type: 'uint256', internalType: 'uint256' },
              { name: 'accruedInterest', type: 'uint256', internalType: 'uint256' },
              { name: 'startTime', type: 'uint256', internalType: 'uint256' },
              { name: 'aprBps', type: 'uint256', internalType: 'uint256' },
            ],
          },
        ],
      },
      { name: '_executionData', type: 'bytes', internalType: 'bytes' },
    ],
    outputs: [{ name: '', type: 'bytes4', internalType: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'afterPrincipalTransfer',
    inputs: [
      {
        name: '_loan',
        type: 'tuple',
        internalType: 'struct IMultiSourceLoan.Loan',
        components: [
          { name: 'borrower', type: 'address', internalType: 'address' },
          { name: 'nftCollateralTokenId', type: 'uint256', internalType: 'uint256' },
          { name: 'nftCollateralAddress', type: 'address', internalType: 'address' },
          { name: 'principalAddress', type: 'address', internalType: 'address' },
          { name: 'principalAmount', type: 'uint256', internalType: 'uint256' },
          { name: 'startTime', type: 'uint256', internalType: 'uint256' },
          { name: 'duration', type: 'uint256', internalType: 'uint256' },
          {
            name: 'source',
            type: 'tuple[]',
            internalType: 'struct IMultiSourceLoan.Source[]',
            components: [
              { name: 'loanId', type: 'uint256', internalType: 'uint256' },
              { name: 'lender', type: 'address', internalType: 'address' },
              { name: 'principalAmount', type: 'uint256', internalType: 'uint256' },
              { name: 'accruedInterest', type: 'uint256', internalType: 'uint256' },
              { name: 'startTime', type: 'uint256', internalType: 'uint256' },
              { name: 'aprBps', type: 'uint256', internalType: 'uint256' },
            ],
          },
        ],
      },
      { name: '_fee', type: 'uint256', internalType: 'uint256' },
      { name: '_executionData', type: 'bytes', internalType: 'bytes' },
    ],
    outputs: [{ name: '', type: 'bytes4', internalType: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'afterPrincipalTransfer',
    inputs: [
      {
        name: '_loan',
        type: 'tuple',
        internalType: 'struct IMultiSourceLoan.Loan',
        components: [
          { name: 'borrower', type: 'address', internalType: 'address' },
          { name: 'nftCollateralTokenId', type: 'uint256', internalType: 'uint256' },
          { name: 'nftCollateralAddress', type: 'address', internalType: 'address' },
          { name: 'principalAddress', type: 'address', internalType: 'address' },
          { name: 'principalAmount', type: 'uint256', internalType: 'uint256' },
          { name: 'startTime', type: 'uint256', internalType: 'uint256' },
          { name: 'duration', type: 'uint256', internalType: 'uint256' },
          {
            name: 'tranche',
            type: 'tuple[]',
            internalType: 'struct IMultiSourceLoan.Tranche[]',
            components: [
              { name: 'loanId', type: 'uint256', internalType: 'uint256' },
              { name: 'floor', type: 'uint256', internalType: 'uint256' },
              { name: 'principalAmount', type: 'uint256', internalType: 'uint256' },
              { name: 'lender', type: 'address', internalType: 'address' },
              { name: 'accruedInterest', type: 'uint256', internalType: 'uint256' },
              { name: 'startTime', type: 'uint256', internalType: 'uint256' },
              { name: 'aprBps', type: 'uint256', internalType: 'uint256' },
            ],
          },
          { name: 'protocolFee', type: 'uint256', internalType: 'uint256' },
        ],
      },
      { name: '_fee', type: 'uint256', internalType: 'uint256' },
      { name: '_executionData', type: 'bytes', internalType: 'bytes' },
    ],
    outputs: [{ name: '', type: 'bytes4', internalType: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'approveForSwap',
    inputs: [{ name: 'currency', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'buy',
    inputs: [{ name: 'executionData', type: 'bytes[]', internalType: 'bytes[]' }],
    outputs: [{ name: 'loanIds', type: 'uint256[]', internalType: 'uint256[]' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'cancelAllOrders',
    inputs: [{ name: 'nonce', type: 'uint256', internalType: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'cancelOrder',
    inputs: [{ name: 'nonce', type: 'uint256', internalType: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'cancelled',
    inputs: [
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'executeOperation',
    inputs: [
      { name: 'assets', type: 'address[]', internalType: 'address[]' },
      { name: 'amounts', type: 'uint256[]', internalType: 'uint256[]' },
      { name: 'premiums', type: 'uint256[]', internalType: 'uint256[]' },
      { name: '', type: 'address', internalType: 'address' },
      { name: 'params', type: 'bytes', internalType: 'bytes' },
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'executeOrder',
    inputs: [
      {
        name: 'order',
        type: 'tuple',
        internalType: 'struct ITradeMarketplace.Order',
        components: [
          { name: 'maker', type: 'address', internalType: 'address' },
          { name: 'taker', type: 'address', internalType: 'address' },
          { name: 'collection', type: 'address', internalType: 'address' },
          { name: 'tokenId', type: 'uint256', internalType: 'uint256' },
          { name: 'currency', type: 'address', internalType: 'address' },
          { name: 'price', type: 'uint256', internalType: 'uint256' },
          { name: 'nonce', type: 'uint256', internalType: 'uint256' },
          { name: 'expiration', type: 'uint256', internalType: 'uint256' },
          { name: 'isAsk', type: 'bool', internalType: 'bool' },
          { name: 'signature', type: 'bytes', internalType: 'bytes' },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'executeSell',
    inputs: [
      { name: 'currencies', type: 'address[]', internalType: 'contract ERC20[]' },
      { name: 'currencyAmounts', type: 'uint256[]', internalType: 'uint256[]' },
      { name: 'collections', type: 'address[]', internalType: 'contract ERC721[]' },
      { name: 'tokenIds', type: 'uint256[]', internalType: 'uint256[]' },
      { name: 'marketPlace', type: 'address', internalType: 'address' },
      { name: 'executionData', type: 'bytes[]', internalType: 'bytes[]' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'executeSellWithETH',
    inputs: [
      { name: 'wethPrincipalSwapData', type: 'bytes', internalType: 'bytes' },
      { name: 'principal', type: 'address', internalType: 'contract ERC20' },
      { name: 'collection', type: 'address', internalType: 'contract ERC721' },
      { name: 'tokenId', type: 'uint256', internalType: 'uint256' },
      { name: 'executionData', type: 'bytes[]', internalType: 'bytes[]' },
    ],
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'executeSellWithLoan',
    inputs: [
      {
        name: 'args',
        type: 'tuple',
        internalType: 'struct IPurchaseBundler.ExecuteSellWithLoanArgs',
        components: [
          {
            name: 'borrowArgs',
            type: 'tuple',
            internalType: 'struct IPurchaseBundler.AaveBorrowArgs',
            components: [
              { name: 'pool', type: 'address', internalType: 'contract IPool' },
              { name: 'assets', type: 'address[]', internalType: 'address[]' },
              { name: 'amounts', type: 'uint256[]', internalType: 'uint256[]' },
            ],
          },
          {
            name: 'executeSellArgs',
            type: 'tuple',
            internalType: 'struct IPurchaseBundler.ExecuteSellArgs',
            components: [
              { name: 'currencies', type: 'address[]', internalType: 'contract ERC20[]' },
              { name: 'currencyAmounts', type: 'uint256[]', internalType: 'uint256[]' },
              { name: 'collections', type: 'address[]', internalType: 'contract ERC721[]' },
              { name: 'tokenIds', type: 'uint256[]', internalType: 'uint256[]' },
              { name: 'marketPlace', type: 'address', internalType: 'address' },
              { name: 'executionData', type: 'bytes[]', internalType: 'bytes[]' },
            ],
          },
          { name: 'loanExecutionData', type: 'bytes[]', internalType: 'bytes[]' },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'finalUpdateMultiSourceLoanAddress',
    inputs: [{ name: '_newAddress', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getMultiSourceLoanAddress',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getPendingProtocolFee',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct WithProtocolFee.ProtocolFee',
        components: [
          { name: 'recipient', type: 'address', internalType: 'address' },
          { name: 'fraction', type: 'uint256', internalType: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getPendingProtocolFeeSetTime',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getPendingTaxes',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct IPurchaseBundler.Taxes',
        components: [
          { name: 'buyTax', type: 'uint128', internalType: 'uint128' },
          { name: 'sellTax', type: 'uint128', internalType: 'uint128' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getPendingTaxesSetTime',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getProtocolFee',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct WithProtocolFee.ProtocolFee',
        components: [
          { name: 'recipient', type: 'address', internalType: 'address' },
          { name: 'fraction', type: 'uint256', internalType: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getTaxes',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct IPurchaseBundler.Taxes',
        components: [
          { name: 'buyTax', type: 'uint128', internalType: 'uint128' },
          { name: 'sellTax', type: 'uint128', internalType: 'uint128' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isOrderCancelled',
    inputs: [
      {
        name: 'order',
        type: 'tuple',
        internalType: 'struct ITradeMarketplace.Order',
        components: [
          { name: 'maker', type: 'address', internalType: 'address' },
          { name: 'taker', type: 'address', internalType: 'address' },
          { name: 'collection', type: 'address', internalType: 'address' },
          { name: 'tokenId', type: 'uint256', internalType: 'uint256' },
          { name: 'currency', type: 'address', internalType: 'address' },
          { name: 'price', type: 'uint256', internalType: 'uint256' },
          { name: 'nonce', type: 'uint256', internalType: 'uint256' },
          { name: 'expiration', type: 'uint256', internalType: 'uint256' },
          { name: 'isAsk', type: 'bool', internalType: 'bool' },
          { name: 'signature', type: 'bytes', internalType: 'bytes' },
        ],
      },
    ],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'minNonce',
    inputs: [{ name: '', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'name',
    inputs: [],
    outputs: [{ name: '', type: 'string', internalType: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'onERC721Received',
    inputs: [
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'uint256', internalType: 'uint256' },
      { name: '', type: 'bytes', internalType: 'bytes' },
    ],
    outputs: [{ name: '', type: 'bytes4', internalType: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'orderHash',
    inputs: [
      {
        name: 'order',
        type: 'tuple',
        internalType: 'struct ITradeMarketplace.Order',
        components: [
          { name: 'maker', type: 'address', internalType: 'address' },
          { name: 'taker', type: 'address', internalType: 'address' },
          { name: 'collection', type: 'address', internalType: 'address' },
          { name: 'tokenId', type: 'uint256', internalType: 'uint256' },
          { name: 'currency', type: 'address', internalType: 'address' },
          { name: 'price', type: 'uint256', internalType: 'uint256' },
          { name: 'nonce', type: 'uint256', internalType: 'uint256' },
          { name: 'expiration', type: 'uint256', internalType: 'uint256' },
          { name: 'isAsk', type: 'bool', internalType: 'bool' },
          { name: 'signature', type: 'bytes', internalType: 'bytes' },
        ],
      },
    ],
    outputs: [{ name: '', type: 'bytes32', internalType: 'bytes32' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'pendingOwner',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'pendingOwnerTime',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'requestTransferOwner',
    inputs: [{ name: '_newOwner', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'sell',
    inputs: [{ name: 'executionData', type: 'bytes[]', internalType: 'bytes[]' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setProtocolFee',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'function', name: 'setTaxes', inputs: [], outputs: [], stateMutability: 'nonpayable' },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [{ name: 'newOwner', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'updateMultiSourceLoanAddressFirst',
    inputs: [{ name: '_newAddress', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'updateProtocolFee',
    inputs: [
      {
        name: '_newProtocolFee',
        type: 'tuple',
        internalType: 'struct WithProtocolFee.ProtocolFee',
        components: [
          { name: 'recipient', type: 'address', internalType: 'address' },
          { name: 'fraction', type: 'uint256', internalType: 'uint256' },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'updateTaxes',
    inputs: [
      {
        name: '_newTaxes',
        type: 'tuple',
        internalType: 'struct IPurchaseBundler.Taxes',
        components: [
          { name: 'buyTax', type: 'uint128', internalType: 'uint128' },
          { name: 'sellTax', type: 'uint128', internalType: 'uint128' },
        ],
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    name: 'AllOrdersCancelled',
    inputs: [
      { name: 'user', type: 'address', indexed: true, internalType: 'address' },
      { name: 'nonce', type: 'uint256', indexed: false, internalType: 'uint256' },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'BNPLLoansStarted',
    inputs: [{ name: 'loanIds', type: 'uint256[]', indexed: false, internalType: 'uint256[]' }],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'MultiSourceLoanPendingUpdate',
    inputs: [{ name: 'newAddress', type: 'address', indexed: false, internalType: 'address' }],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'MultiSourceLoanUpdated',
    inputs: [{ name: 'newAddress', type: 'address', indexed: false, internalType: 'address' }],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OrderExecuted',
    inputs: [
      { name: 'maker', type: 'address', indexed: true, internalType: 'address' },
      { name: 'taker', type: 'address', indexed: true, internalType: 'address' },
      { name: 'collection', type: 'address', indexed: true, internalType: 'address' },
      { name: 'tokenId', type: 'uint256', indexed: false, internalType: 'uint256' },
      { name: 'currency', type: 'address', indexed: false, internalType: 'address' },
      { name: 'price', type: 'uint256', indexed: false, internalType: 'uint256' },
      { name: 'nonce', type: 'uint256', indexed: false, internalType: 'uint256' },
      { name: 'expiration', type: 'uint256', indexed: false, internalType: 'uint256' },
      { name: 'isAsk', type: 'bool', indexed: false, internalType: 'bool' },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      { name: 'user', type: 'address', indexed: true, internalType: 'address' },
      { name: 'newOwner', type: 'address', indexed: true, internalType: 'address' },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ProtocolFeePendingUpdate',
    inputs: [
      {
        name: 'fee',
        type: 'tuple',
        indexed: false,
        internalType: 'struct WithProtocolFee.ProtocolFee',
        components: [
          { name: 'recipient', type: 'address', internalType: 'address' },
          { name: 'fraction', type: 'uint256', internalType: 'uint256' },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'ProtocolFeeUpdated',
    inputs: [
      {
        name: 'fee',
        type: 'tuple',
        indexed: false,
        internalType: 'struct WithProtocolFee.ProtocolFee',
        components: [
          { name: 'recipient', type: 'address', internalType: 'address' },
          { name: 'fraction', type: 'uint256', internalType: 'uint256' },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'SellAndRepayExecuted',
    inputs: [{ name: 'loanIds', type: 'uint256[]', indexed: false, internalType: 'uint256[]' }],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'TaxesPendingUpdate',
    inputs: [
      {
        name: 'newTaxes',
        type: 'tuple',
        indexed: false,
        internalType: 'struct IPurchaseBundler.Taxes',
        components: [
          { name: 'buyTax', type: 'uint128', internalType: 'uint128' },
          { name: 'sellTax', type: 'uint128', internalType: 'uint128' },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'TaxesUpdated',
    inputs: [
      {
        name: 'taxes',
        type: 'tuple',
        indexed: false,
        internalType: 'struct IPurchaseBundler.Taxes',
        components: [
          { name: 'buyTax', type: 'uint128', internalType: 'uint128' },
          { name: 'sellTax', type: 'uint128', internalType: 'uint128' },
        ],
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'TransferOwnerRequested',
    inputs: [{ name: 'newOwner', type: 'address', indexed: false, internalType: 'address' }],
    anonymous: false,
  },
  { type: 'error', name: 'AddressZeroError', inputs: [] },
  { type: 'error', name: 'CouldNotReturnEthError', inputs: [] },
  { type: 'error', name: 'ECDSAInvalidSignature', inputs: [] },
  {
    type: 'error',
    name: 'ECDSAInvalidSignatureLength',
    inputs: [{ name: 'length', type: 'uint256', internalType: 'uint256' }],
  },
  {
    type: 'error',
    name: 'ECDSAInvalidSignatureS',
    inputs: [{ name: 's', type: 'bytes32', internalType: 'bytes32' }],
  },
  { type: 'error', name: 'InvalidAddressUpdateError', inputs: [] },
  { type: 'error', name: 'InvalidCallbackError', inputs: [] },
  { type: 'error', name: 'InvalidInputError', inputs: [] },
  { type: 'error', name: 'InvalidSignature', inputs: [] },
  { type: 'error', name: 'InvalidTaker', inputs: [] },
  {
    type: 'error',
    name: 'InvalidTaxesError',
    inputs: [
      {
        name: 'newTaxes',
        type: 'tuple',
        internalType: 'struct IPurchaseBundler.Taxes',
        components: [
          { name: 'buyTax', type: 'uint128', internalType: 'uint128' },
          { name: 'sellTax', type: 'uint128', internalType: 'uint128' },
        ],
      },
    ],
  },
  {
    type: 'error',
    name: 'LowNonceError',
    inputs: [
      { name: 'user', type: 'address', internalType: 'address' },
      { name: 'nonce', type: 'uint256', internalType: 'uint256' },
      { name: 'currentMinNonce', type: 'uint256', internalType: 'uint256' },
    ],
  },
  { type: 'error', name: 'MarketplaceAddressNotWhitelisted', inputs: [] },
  { type: 'error', name: 'OnlyLoanCallableError', inputs: [] },
  { type: 'error', name: 'OnlyWethSupportedError', inputs: [] },
  { type: 'error', name: 'OrderCancelled', inputs: [] },
  { type: 'error', name: 'OrderExpired', inputs: [] },
  {
    type: 'error',
    name: 'TooEarlyError',
    inputs: [{ name: '_pendingProtocolFeeSetTime', type: 'uint256', internalType: 'uint256' }],
  },
  { type: 'error', name: 'TooSoonError', inputs: [] },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// RangeValidator
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const rangeValidatorAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'min', internalType: 'uint256', type: 'uint256' },
      { name: 'max', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'TokenIdOutOfRangeError',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '',
        internalType: 'struct IMultiSourceLoan.LoanOffer',
        type: 'tuple',
        components: [
          { name: 'offerId', internalType: 'uint256', type: 'uint256' },
          { name: 'lender', internalType: 'address', type: 'address' },
          { name: 'fee', internalType: 'uint256', type: 'uint256' },
          { name: 'capacity', internalType: 'uint256', type: 'uint256' },
          { name: 'nftCollateralAddress', internalType: 'address', type: 'address' },
          { name: 'nftCollateralTokenId', internalType: 'uint256', type: 'uint256' },
          { name: 'principalAddress', internalType: 'address', type: 'address' },
          { name: 'principalAmount', internalType: 'uint256', type: 'uint256' },
          { name: 'aprBps', internalType: 'uint256', type: 'uint256' },
          { name: 'expirationTime', internalType: 'uint256', type: 'uint256' },
          { name: 'duration', internalType: 'uint256', type: 'uint256' },
          { name: 'maxSeniorRepayment', internalType: 'uint256', type: 'uint256' },
          {
            name: 'validators',
            internalType: 'struct IBaseLoan.OfferValidator[]',
            type: 'tuple[]',
            components: [
              { name: 'validator', internalType: 'address', type: 'address' },
              { name: 'arguments', internalType: 'bytes', type: 'bytes' },
            ],
          },
        ],
      },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_validatorData', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'validateOffer',
    outputs: [],
    stateMutability: 'pure',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SampleCollection
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const sampleCollectionAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'spender', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'mintNext',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SampleMarketplace
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const sampleMarketplaceAbi = [
  { type: 'function', inputs: [], name: 'buy', outputs: [], stateMutability: 'nonpayable' },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SampleOldCollection
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const sampleOldCollectionAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'spender', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lastId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'to', internalType: 'address', type: 'address' }],
    name: 'mintNext',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'takeOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: '_to', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SampleToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const sampleTokenAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'spender', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Deposit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Withdrawal',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  { type: 'function', inputs: [], name: 'deposit', outputs: [], stateMutability: 'payable' },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Strings
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const stringsAbi = [
  {
    type: 'error',
    inputs: [
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'length', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'StringsInsufficientHexLength',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Test
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const testAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'string', type: 'string', indexed: false }],
    name: 'log',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'address', type: 'address', indexed: false }],
    name: 'log_address',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'val', internalType: 'uint256[]', type: 'uint256[]', indexed: false }],
    name: 'log_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'val', internalType: 'int256[]', type: 'int256[]', indexed: false }],
    name: 'log_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'val', internalType: 'address[]', type: 'address[]', indexed: false }],
    name: 'log_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'bytes', type: 'bytes', indexed: false }],
    name: 'log_bytes',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32', indexed: false }],
    name: 'log_bytes32',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'int256', type: 'int256', indexed: false }],
    name: 'log_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'log_named_address',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'uint256[]', type: 'uint256[]', indexed: false },
    ],
    name: 'log_named_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'int256[]', type: 'int256[]', indexed: false },
    ],
    name: 'log_named_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'address[]', type: 'address[]', indexed: false },
    ],
    name: 'log_named_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'log_named_bytes',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'bytes32', type: 'bytes32', indexed: false },
    ],
    name: 'log_named_bytes32',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'int256', type: 'int256', indexed: false },
      { name: 'decimals', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'log_named_decimal_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'decimals', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'log_named_decimal_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'int256', type: 'int256', indexed: false },
    ],
    name: 'log_named_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'log_named_string',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'log_named_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'string', type: 'string', indexed: false }],
    name: 'log_string',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'log_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'bytes', type: 'bytes', indexed: false }],
    name: 'logs',
  },
  {
    type: 'function',
    inputs: [],
    name: 'IS_TEST',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'excludeArtifacts',
    outputs: [{ name: 'excludedArtifacts_', internalType: 'string[]', type: 'string[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'excludeContracts',
    outputs: [{ name: 'excludedContracts_', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'excludeSenders',
    outputs: [{ name: 'excludedSenders_', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'failed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetArtifactSelectors',
    outputs: [
      {
        name: 'targetedArtifactSelectors_',
        internalType: 'struct StdInvariant.FuzzSelector[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'selectors', internalType: 'bytes4[]', type: 'bytes4[]' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetArtifacts',
    outputs: [{ name: 'targetedArtifacts_', internalType: 'string[]', type: 'string[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetContracts',
    outputs: [{ name: 'targetedContracts_', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetInterfaces',
    outputs: [
      {
        name: 'targetedInterfaces_',
        internalType: 'struct StdInvariant.FuzzInterface[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'artifacts', internalType: 'string[]', type: 'string[]' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetSelectors',
    outputs: [
      {
        name: 'targetedSelectors_',
        internalType: 'struct StdInvariant.FuzzSelector[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'selectors', internalType: 'bytes4[]', type: 'bytes4[]' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetSenders',
    outputs: [{ name: 'targetedSenders_', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TestLoanSetup
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const testLoanSetupAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'string', type: 'string', indexed: false }],
    name: 'log',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'address', type: 'address', indexed: false }],
    name: 'log_address',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'val', internalType: 'uint256[]', type: 'uint256[]', indexed: false }],
    name: 'log_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'val', internalType: 'int256[]', type: 'int256[]', indexed: false }],
    name: 'log_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'val', internalType: 'address[]', type: 'address[]', indexed: false }],
    name: 'log_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'bytes', type: 'bytes', indexed: false }],
    name: 'log_bytes',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'bytes32', type: 'bytes32', indexed: false }],
    name: 'log_bytes32',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'int256', type: 'int256', indexed: false }],
    name: 'log_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'address', type: 'address', indexed: false },
    ],
    name: 'log_named_address',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'uint256[]', type: 'uint256[]', indexed: false },
    ],
    name: 'log_named_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'int256[]', type: 'int256[]', indexed: false },
    ],
    name: 'log_named_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'address[]', type: 'address[]', indexed: false },
    ],
    name: 'log_named_array',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'log_named_bytes',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'bytes32', type: 'bytes32', indexed: false },
    ],
    name: 'log_named_bytes32',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'int256', type: 'int256', indexed: false },
      { name: 'decimals', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'log_named_decimal_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'decimals', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'log_named_decimal_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'int256', type: 'int256', indexed: false },
    ],
    name: 'log_named_int',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'log_named_string',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'key', internalType: 'string', type: 'string', indexed: false },
      { name: 'val', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'log_named_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'string', type: 'string', indexed: false }],
    name: 'log_string',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256', indexed: false }],
    name: 'log_uint',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: '', internalType: 'bytes', type: 'bytes', indexed: false }],
    name: 'logs',
  },
  {
    type: 'function',
    inputs: [],
    name: 'IS_TEST',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'excludeArtifacts',
    outputs: [{ name: 'excludedArtifacts_', internalType: 'string[]', type: 'string[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'excludeContracts',
    outputs: [{ name: 'excludedContracts_', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'excludeSenders',
    outputs: [{ name: 'excludedSenders_', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'failed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetArtifactSelectors',
    outputs: [
      {
        name: 'targetedArtifactSelectors_',
        internalType: 'struct StdInvariant.FuzzSelector[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'selectors', internalType: 'bytes4[]', type: 'bytes4[]' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetArtifacts',
    outputs: [{ name: 'targetedArtifacts_', internalType: 'string[]', type: 'string[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetContracts',
    outputs: [{ name: 'targetedContracts_', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetInterfaces',
    outputs: [
      {
        name: 'targetedInterfaces_',
        internalType: 'struct StdInvariant.FuzzInterface[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'artifacts', internalType: 'string[]', type: 'string[]' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetSelectors',
    outputs: [
      {
        name: 'targetedSelectors_',
        internalType: 'struct StdInvariant.FuzzSelector[]',
        type: 'tuple[]',
        components: [
          { name: 'addr', internalType: 'address', type: 'address' },
          { name: 'selectors', internalType: 'bytes4[]', type: 'bytes4[]' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'targetSenders',
    outputs: [{ name: 'targetedSenders_', internalType: 'address[]', type: 'address[]' }],
    stateMutability: 'view',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TestNFTFlashAction
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const testNftFlashActionAbi = [
  { type: 'error', inputs: [], name: 'InvalidOwnerError' },
  {
    type: 'function',
    inputs: [
      { name: '_collection', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'execute',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'pure',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TestNFTMaliciousFlashAction
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const testNftMaliciousFlashActionAbi = [
  { type: 'error', inputs: [], name: 'InvalidOwnerError' },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'execute',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'pure',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TwoStepOwned
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const twoStepOwnedAbi = [
  { type: 'error', inputs: [], name: 'InvalidInputError' },
  { type: 'error', inputs: [], name: 'TooSoonError' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address', indexed: false }],
    name: 'TransferOwnerRequested',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_WAIT_TIME',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwnerTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_newOwner', internalType: 'address', type: 'address' }],
    name: 'requestTransferOwner',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// USDCSampleToken
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const usdcSampleTokenAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'spender', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UserVault
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const userVaultAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'currencyManager', internalType: 'address', type: 'address' },
      { name: 'collectionManager', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_vaultId', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155BalanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_vaultId', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
    ],
    name: 'ERC20BalanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_collection', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721OwnerOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'ETH',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_vaultId', internalType: 'uint256', type: 'uint256' },
      { name: '_assetRecipient', internalType: 'address', type: 'address' },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_vaultId', internalType: 'uint256', type: 'uint256' },
      { name: '_collections', internalType: 'address[]', type: 'address[]' },
      { name: '_tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '_tokens', internalType: 'address[]', type: 'address[]' },
      { name: '_erc1155Tokens', internalType: 'address[]', type: 'address[]' },
      { name: '_erc1155TokensIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'burnAndWithdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_vaultId', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'depositERC1155',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_vaultId', internalType: 'uint256', type: 'uint256' },
      { name: '_collection', internalType: 'address', type: 'address' },
      { name: '_tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '_amounts', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'depositERC1155s',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_vaultId', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'depositERC20',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_vaultId', internalType: 'uint256', type: 'uint256' },
      { name: '_collection', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'depositERC721',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_vaultId', internalType: 'uint256', type: 'uint256' },
      { name: '_collection', internalType: 'address', type: 'address' },
      { name: '_tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'depositERC721s',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_vaultId', internalType: 'uint256', type: 'uint256' }],
    name: 'depositEth',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'mint',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_vaultId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_vaultId', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'withdrawERC1155',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_vaultId', internalType: 'uint256', type: 'uint256' },
      { name: '_tokens', internalType: 'address[]', type: 'address[]' },
      { name: '_tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'withdrawERC1155s',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_vaultId', internalType: 'uint256', type: 'uint256' },
      { name: '_token', internalType: 'address', type: 'address' },
    ],
    name: 'withdrawERC20',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_vaultId', internalType: 'uint256', type: 'uint256' },
      { name: '_tokens', internalType: 'address[]', type: 'address[]' },
    ],
    name: 'withdrawERC20s',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_vaultId', internalType: 'uint256', type: 'uint256' },
      { name: '_collection', internalType: 'address', type: 'address' },
      { name: '_tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'withdrawERC721',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_vaultId', internalType: 'uint256', type: 'uint256' },
      { name: '_collections', internalType: 'address[]', type: 'address[]' },
      { name: '_tokenIds', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'withdrawERC721s',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_vaultId', internalType: 'uint256', type: 'uint256' }],
    name: 'withdrawEth',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'spender', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'vaultId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'token', internalType: 'address', type: 'address', indexed: false },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'ERC1155Deposited',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'vaultId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'token', internalType: 'address', type: 'address', indexed: false },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'ERC1155Withdrawn',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'vaultId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'token', internalType: 'address', type: 'address', indexed: false },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'ERC20Deposited',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'vaultId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'token', internalType: 'address', type: 'address', indexed: false },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'ERC20Withdrawn',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'vaultId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'collection', internalType: 'address', type: 'address', indexed: false },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'ERC721Deposited',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'vaultId', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'collection', internalType: 'address', type: 'address', indexed: false },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'ERC721Withdrawn',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'Transfer',
  },
  { type: 'error', inputs: [], name: 'AssetNotOwnedError' },
  { type: 'error', inputs: [], name: 'CollectionNotWhitelistedError' },
  { type: 'error', inputs: [], name: 'CurrencyNotWhitelistedError' },
  { type: 'error', inputs: [], name: 'InvalidCallerError' },
  { type: 'error', inputs: [], name: 'LengthMismatchError' },
  {
    type: 'error',
    inputs: [{ name: 'vaultId', internalType: 'uint256', type: 'uint256' }],
    name: 'NotApprovedError',
  },
  { type: 'error', inputs: [], name: 'VaultNotExistsError' },
  { type: 'error', inputs: [], name: 'WithdrawingETHError' },
  { type: 'error', inputs: [], name: 'WrongMethodError' },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ValidatorHelpers
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const validatorHelpersAbi = [
  {
    type: 'error',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'BitVectorLengthExceededError',
  },
  { type: 'error', inputs: [], name: 'EmptyTokenIdListError' },
  {
    type: 'error',
    inputs: [{ name: '_bytesPerTokenId', internalType: 'uint64', type: 'uint64' }],
    name: 'InvalidBytesPerTokenIdError',
  },
  {
    type: 'error',
    inputs: [{ name: '_tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'TokenIdNotFoundError',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WETH
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const wethAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'spender', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Deposit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Transfer',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'Withdrawal',
  },
  {
    type: 'function',
    inputs: [],
    name: 'DOMAIN_SEPARATOR',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  { type: 'function', inputs: [], name: 'deposit', outputs: [], stateMutability: 'payable' },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'nonces',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'deadline', internalType: 'uint256', type: 'uint256' },
      { name: 'v', internalType: 'uint8', type: 'uint8' },
      { name: 'r', internalType: 'bytes32', type: 'bytes32' },
      { name: 's', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'permit',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WithProtocolFee
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const withProtocolFeeAbi = [
  { type: 'error', inputs: [], name: 'AddressZeroError' },
  { type: 'error', inputs: [], name: 'InvalidInputError' },
  {
    type: 'error',
    inputs: [{ name: '_pendingProtocolFeeSetTime', internalType: 'uint256', type: 'uint256' }],
    name: 'TooEarlyError',
  },
  { type: 'error', inputs: [], name: 'TooSoonError' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'user', internalType: 'address', type: 'address', indexed: true },
      { name: 'newOwner', internalType: 'address', type: 'address', indexed: true },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fee',
        internalType: 'struct WithProtocolFee.ProtocolFee',
        type: 'tuple',
        components: [
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'fraction', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: false,
      },
    ],
    name: 'ProtocolFeePendingUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'fee',
        internalType: 'struct WithProtocolFee.ProtocolFee',
        type: 'tuple',
        components: [
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'fraction', internalType: 'uint256', type: 'uint256' },
        ],
        indexed: false,
      },
    ],
    name: 'ProtocolFeeUpdated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address', indexed: false }],
    name: 'TransferOwnerRequested',
  },
  {
    type: 'function',
    inputs: [],
    name: 'FEE_UPDATE_NOTICE',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MIN_WAIT_TIME',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPendingProtocolFee',
    outputs: [
      {
        name: '',
        internalType: 'struct WithProtocolFee.ProtocolFee',
        type: 'tuple',
        components: [
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'fraction', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getPendingProtocolFeeSetTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getProtocolFee',
    outputs: [
      {
        name: '',
        internalType: 'struct WithProtocolFee.ProtocolFee',
        type: 'tuple',
        components: [
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'fraction', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pendingOwnerTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_newOwner', internalType: 'address', type: 'address' }],
    name: 'requestTransferOwner',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'setProtocolFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: '_newProtocolFee',
        internalType: 'struct WithProtocolFee.ProtocolFee',
        type: 'tuple',
        components: [
          { name: 'recipient', internalType: 'address', type: 'address' },
          { name: 'fraction', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    name: 'updateProtocolFee',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC1155
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc1155Abi = [
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owners', internalType: 'address[]', type: 'address[]' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'balanceOfBatch',
    outputs: [{ name: 'balances', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'id', internalType: 'uint256', type: 'uint256' }],
    name: 'uri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address', indexed: true },
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]', indexed: false },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]', indexed: false },
    ],
    name: 'TransferBatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address', indexed: true },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      { name: 'amount', internalType: 'uint256', type: 'uint256', indexed: false },
    ],
    name: 'TransferSingle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'URI',
  },
] as const;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC1155TokenReceiver
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc1155TokenReceiverAbi = [
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'nonpayable',
  },
] as const;
