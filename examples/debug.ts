import {
  decodeAbiParameters,
  decodeFunctionData,
  getFunctionSelector,
} from "viem";

import { users } from "./common";
import { formatAbiItem } from "viem/contract";

const multicallFailed = {
  inputs: [
    { internalType: "uint256", name: "i", type: "uint256" },
    { internalType: "bytes", name: "returndata", type: "bytes" },
  ],
  name: "MulticallFailed",
  type: "error",
} as const;

const mslAbi = [
  {
    inputs: [
      { internalType: "address", name: "loanLiquidator", type: "address" },
      {
        components: [
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "fraction", type: "uint256" },
        ],
        internalType: "struct IBaseLoan.ProtocolFee",
        name: "protocolFee",
        type: "tuple",
      },
      { internalType: "address", name: "currencyManager", type: "address" },
      { internalType: "address", name: "collectionManager", type: "address" },
      { internalType: "uint256", name: "maxSources", type: "uint256" },
      { internalType: "uint256", name: "minLockPeriod", type: "uint256" },
      { internalType: "address", name: "delegateRegistry", type: "address" },
      { internalType: "address", name: "flashActionContract", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "AddressZeroError", type: "error" },
  {
    inputs: [
      { internalType: "address", name: "_lender", type: "address" },
      { internalType: "uint256", name: "_offerId", type: "uint256" },
    ],
    name: "CancelledOrExecutedOfferError",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "_lender", type: "address" },
      { internalType: "uint256", name: "_renegotiationId", type: "uint256" },
    ],
    name: "CancelledRenegotiationOfferError",
    type: "error",
  },
  { inputs: [], name: "CannotLiquidateError", type: "error" },
  { inputs: [], name: "CollectionNotWhitelistedError", type: "error" },
  { inputs: [], name: "CurrencyNotWhitelistedError", type: "error" },
  { inputs: [], name: "ECDSAInvalidSignature", type: "error" },
  {
    inputs: [{ internalType: "uint256", name: "length", type: "uint256" }],
    name: "ECDSAInvalidSignatureLength",
    type: "error",
  },
  {
    inputs: [{ internalType: "bytes32", name: "s", type: "bytes32" }],
    name: "ECDSAInvalidSignatureS",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_expirationTime", type: "uint256" },
    ],
    name: "ExpiredOfferError",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_expirationTime", type: "uint256" },
    ],
    name: "ExpiredRenegotiationOfferError",
    type: "error",
  },
  { inputs: [], name: "ExtensionNotAvailableError", type: "error" },
  {
    inputs: [
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "uint256", name: "_principalAmount", type: "uint256" },
    ],
    name: "InvalidAmountError",
    type: "error",
  },
  { inputs: [], name: "InvalidBorrowerError", type: "error" },
  { inputs: [], name: "InvalidCallbackError", type: "error" },
  { inputs: [], name: "InvalidCollateralIdError", type: "error" },
  { inputs: [], name: "InvalidDurationError", type: "error" },
  { inputs: [], name: "InvalidLenderError", type: "error" },
  { inputs: [], name: "InvalidLiquidationError", type: "error" },
  {
    inputs: [{ internalType: "uint256", name: "_loanId", type: "uint256" }],
    name: "InvalidLoanError",
    type: "error",
  },
  { inputs: [], name: "InvalidMethodError", type: "error" },
  {
    inputs: [{ internalType: "uint256", name: "_fraction", type: "uint256" }],
    name: "InvalidProtocolFeeError",
    type: "error",
  },
  { inputs: [], name: "InvalidRenegotiationOfferError", type: "error" },
  { inputs: [], name: "InvalidSignatureError", type: "error" },
  { inputs: [], name: "InvalidValueError", type: "error" },
  { inputs: [], name: "LengthMismatchError", type: "error" },
  {
    inputs: [{ internalType: "address", name: "_liquidator", type: "address" }],
    name: "LiquidatorOnlyError",
    type: "error",
  },
  { inputs: [], name: "LoanExpiredError", type: "error" },
  {
    inputs: [
      { internalType: "uint256", name: "_expirationTime", type: "uint256" },
    ],
    name: "LoanNotDueError",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "_lender", type: "address" },
      { internalType: "uint256", name: "_newMinOfferId", type: "uint256" },
      { internalType: "uint256", name: "_minOfferId", type: "uint256" },
    ],
    name: "LowOfferIdError",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "_lender", type: "address" },
      {
        internalType: "uint256",
        name: "_newMinRenegotiationOfferId",
        type: "uint256",
      },
      { internalType: "uint256", name: "_minOfferId", type: "uint256" },
    ],
    name: "LowRenegotiationOfferIdError",
    type: "error",
  },
  { inputs: [], name: "MaxCapacityExceededError", type: "error" },
  {
    inputs: [
      { internalType: "uint256", name: "minLockPeriod", type: "uint256" },
    ],
    name: "MinLockPeriodTooHighError",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint256", name: "i", type: "uint256" },
      { internalType: "bytes", name: "returndata", type: "bytes" },
    ],
    name: "MulticallFailed",
    type: "error",
  },
  { inputs: [], name: "NFTNotReturnedError", type: "error" },
  { inputs: [], name: "NotStrictlyImprovedError", type: "error" },
  { inputs: [], name: "OnlyBorrowerCallableError", type: "error" },
  { inputs: [], name: "OnlyLenderCallableError", type: "error" },
  { inputs: [], name: "OnlyLenderOrBorrowerCallableError", type: "error" },
  { inputs: [], name: "PartialOfferCannotChangeDurationError", type: "error" },
  { inputs: [], name: "PartialOfferCannotHaveFeeError", type: "error" },
  { inputs: [], name: "RefinanceFullError", type: "error" },
  {
    inputs: [
      { internalType: "uint256", name: "minTimestamp", type: "uint256" },
    ],
    name: "SourceCannotBeRefinancedError",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint256", name: "sourcePrincipal", type: "uint256" },
      { internalType: "uint256", name: "loanPrincipal", type: "uint256" },
    ],
    name: "TargetPrincipalTooLowError",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_pendingProtocolFeeSetTime",
        type: "uint256",
      },
    ],
    name: "TooEarlyError",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint256", name: "sources", type: "uint256" }],
    name: "TooManySourcesError",
    type: "error",
  },
  { inputs: [], name: "ZeroDurationError", type: "error" },
  { inputs: [], name: "ZeroInterestError", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "lender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "minOfferId",
        type: "uint256",
      },
    ],
    name: "AllOffersCancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "lender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "minRenegotiationId",
        type: "uint256",
      },
    ],
    name: "AllRenegotiationOffersCancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "borrower",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "offerId",
        type: "uint256",
      },
    ],
    name: "BorrowerOfferCancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newdelegateRegistry",
        type: "address",
      },
    ],
    name: "DelegateRegistryUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "loanId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "delegate",
        type: "address",
      },
      { indexed: false, internalType: "bool", name: "value", type: "bool" },
    ],
    name: "Delegated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "newFlashActionContract",
        type: "address",
      },
    ],
    name: "FlashActionContractUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "loanId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "target",
        type: "address",
      },
      { indexed: false, internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "FlashActionExecuted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          { internalType: "uint256", name: "principalAmount", type: "uint256" },
          { internalType: "uint256", name: "interest", type: "uint256" },
          { internalType: "uint256", name: "duration", type: "uint256" },
        ],
        indexed: false,
        internalType: "struct IBaseLoan.ImprovementMinimum",
        name: "minimum",
        type: "tuple",
      },
    ],
    name: "ImprovementMinimumUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newDuration",
        type: "uint256",
      },
    ],
    name: "LiquidationAuctionDurationUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "liquidator",
        type: "address",
      },
    ],
    name: "LiquidationContractUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "loanId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "offerId",
        type: "uint256",
      },
      {
        components: [
          { internalType: "address", name: "borrower", type: "address" },
          {
            internalType: "uint256",
            name: "nftCollateralTokenId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "nftCollateralAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "principalAddress",
            type: "address",
          },
          { internalType: "uint256", name: "principalAmount", type: "uint256" },
          { internalType: "uint256", name: "startTime", type: "uint256" },
          { internalType: "uint256", name: "duration", type: "uint256" },
          {
            components: [
              { internalType: "uint256", name: "loanId", type: "uint256" },
              { internalType: "address", name: "lender", type: "address" },
              {
                internalType: "uint256",
                name: "principalAmount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "accruedInterest",
                type: "uint256",
              },
              { internalType: "uint256", name: "startTime", type: "uint256" },
              { internalType: "uint256", name: "aprBps", type: "uint256" },
            ],
            internalType: "struct IMultiSourceLoan.Source[]",
            name: "source",
            type: "tuple[]",
          },
        ],
        indexed: false,
        internalType: "struct IMultiSourceLoan.Loan",
        name: "loan",
        type: "tuple",
      },
      {
        indexed: false,
        internalType: "address",
        name: "lender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "borrower",
        type: "address",
      },
      { indexed: false, internalType: "uint256", name: "fee", type: "uint256" },
    ],
    name: "LoanEmitted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "oldLoanId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newLoanId",
        type: "uint256",
      },
      {
        components: [
          { internalType: "address", name: "borrower", type: "address" },
          {
            internalType: "uint256",
            name: "nftCollateralTokenId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "nftCollateralAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "principalAddress",
            type: "address",
          },
          { internalType: "uint256", name: "principalAmount", type: "uint256" },
          { internalType: "uint256", name: "startTime", type: "uint256" },
          { internalType: "uint256", name: "duration", type: "uint256" },
          {
            components: [
              { internalType: "uint256", name: "loanId", type: "uint256" },
              { internalType: "address", name: "lender", type: "address" },
              {
                internalType: "uint256",
                name: "principalAmount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "accruedInterest",
                type: "uint256",
              },
              { internalType: "uint256", name: "startTime", type: "uint256" },
              { internalType: "uint256", name: "aprBps", type: "uint256" },
            ],
            internalType: "struct IMultiSourceLoan.Source[]",
            name: "source",
            type: "tuple[]",
          },
        ],
        indexed: false,
        internalType: "struct IMultiSourceLoan.Loan",
        name: "loan",
        type: "tuple",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_extension",
        type: "uint256",
      },
    ],
    name: "LoanExtended",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "loanId",
        type: "uint256",
      },
    ],
    name: "LoanForeclosed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "loanId",
        type: "uint256",
      },
    ],
    name: "LoanLiquidated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "renegotiationId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "oldLoanId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "newLoanId",
        type: "uint256",
      },
      {
        components: [
          { internalType: "address", name: "borrower", type: "address" },
          {
            internalType: "uint256",
            name: "nftCollateralTokenId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "nftCollateralAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "principalAddress",
            type: "address",
          },
          { internalType: "uint256", name: "principalAmount", type: "uint256" },
          { internalType: "uint256", name: "startTime", type: "uint256" },
          { internalType: "uint256", name: "duration", type: "uint256" },
          {
            components: [
              { internalType: "uint256", name: "loanId", type: "uint256" },
              { internalType: "address", name: "lender", type: "address" },
              {
                internalType: "uint256",
                name: "principalAmount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "accruedInterest",
                type: "uint256",
              },
              { internalType: "uint256", name: "startTime", type: "uint256" },
              { internalType: "uint256", name: "aprBps", type: "uint256" },
            ],
            internalType: "struct IMultiSourceLoan.Source[]",
            name: "source",
            type: "tuple[]",
          },
        ],
        indexed: false,
        internalType: "struct IMultiSourceLoan.Loan",
        name: "loan",
        type: "tuple",
      },
      { indexed: false, internalType: "uint256", name: "fee", type: "uint256" },
    ],
    name: "LoanRefinanced",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "loanId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "totalRepayment",
        type: "uint256",
      },
      { indexed: false, internalType: "uint256", name: "fee", type: "uint256" },
    ],
    name: "LoanRepaid",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "loanId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "liquidator",
        type: "address",
      },
    ],
    name: "LoanSentToLiquidator",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "newMax",
        type: "uint256",
      },
    ],
    name: "MaxSourcesUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "minLockPeriod",
        type: "uint256",
      },
    ],
    name: "MinLockPeriodUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "lender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "offerId",
        type: "uint256",
      },
    ],
    name: "OfferCancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "fraction", type: "uint256" },
        ],
        indexed: false,
        internalType: "struct IBaseLoan.ProtocolFee",
        name: "fee",
        type: "tuple",
      },
    ],
    name: "ProtocolFeePendingUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "fraction", type: "uint256" },
        ],
        indexed: false,
        internalType: "struct IBaseLoan.ProtocolFee",
        name: "fee",
        type: "tuple",
      },
    ],
    name: "ProtocolFeeUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "lender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "renegotiationId",
        type: "uint256",
      },
    ],
    name: "RenegotiationOfferCancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "delegate",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "collection",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "RevokeDelegate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "contractAdded",
        type: "address",
      },
      {
        components: [
          { internalType: "uint128", name: "buyTax", type: "uint128" },
          { internalType: "uint128", name: "sellTax", type: "uint128" },
        ],
        indexed: false,
        internalType: "struct WithCallbacks.Taxes",
        name: "tax",
        type: "tuple",
      },
    ],
    name: "WhitelistedCallbackContractAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "contractRemoved",
        type: "address",
      },
    ],
    name: "WhitelistedCallbackContractRemoved",
    type: "event",
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "FEE_UPDATE_NOTICE",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "INITIAL_DOMAIN_SEPARATOR",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MAX_PROTOCOL_FEE",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MIN_AUCTION_DURATION",
    outputs: [{ internalType: "uint48", name: "", type: "uint48" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_contract", type: "address" },
      {
        components: [
          { internalType: "uint128", name: "buyTax", type: "uint128" },
          { internalType: "uint128", name: "sellTax", type: "uint128" },
        ],
        internalType: "struct WithCallbacks.Taxes",
        name: "_tax",
        type: "tuple",
      },
    ],
    name: "addWhitelistedCallbackContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_minOfferId", type: "uint256" }],
    name: "cancelAllOffers",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_minRenegotiationId", type: "uint256" },
    ],
    name: "cancelAllRenegotiationOffers",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_offerId", type: "uint256" }],
    name: "cancelOffer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256[]", name: "_offerIds", type: "uint256[]" },
    ],
    name: "cancelOffers",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_renegotiationId", type: "uint256" },
    ],
    name: "cancelRenegotiationOffer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_renegotiationIds",
        type: "uint256[]",
      },
    ],
    name: "cancelRenegotiationOffers",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_loanId", type: "uint256" },
      {
        components: [
          { internalType: "address", name: "borrower", type: "address" },
          {
            internalType: "uint256",
            name: "nftCollateralTokenId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "nftCollateralAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "principalAddress",
            type: "address",
          },
          { internalType: "uint256", name: "principalAmount", type: "uint256" },
          { internalType: "uint256", name: "startTime", type: "uint256" },
          { internalType: "uint256", name: "duration", type: "uint256" },
          {
            components: [
              { internalType: "uint256", name: "loanId", type: "uint256" },
              { internalType: "address", name: "lender", type: "address" },
              {
                internalType: "uint256",
                name: "principalAmount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "accruedInterest",
                type: "uint256",
              },
              { internalType: "uint256", name: "startTime", type: "uint256" },
              { internalType: "uint256", name: "aprBps", type: "uint256" },
            ],
            internalType: "struct IMultiSourceLoan.Source[]",
            name: "source",
            type: "tuple[]",
          },
        ],
        internalType: "struct IMultiSourceLoan.Loan",
        name: "loan",
        type: "tuple",
      },
      { internalType: "address", name: "_delegate", type: "address" },
      { internalType: "bytes32", name: "_rights", type: "bytes32" },
      { internalType: "bool", name: "_value", type: "bool" },
    ],
    name: "delegate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                components: [
                  { internalType: "uint256", name: "offerId", type: "uint256" },
                  { internalType: "address", name: "lender", type: "address" },
                  { internalType: "uint256", name: "fee", type: "uint256" },
                  {
                    internalType: "address",
                    name: "borrower",
                    type: "address",
                  },
                  {
                    internalType: "uint256",
                    name: "capacity",
                    type: "uint256",
                  },
                  {
                    internalType: "address",
                    name: "nftCollateralAddress",
                    type: "address",
                  },
                  {
                    internalType: "uint256",
                    name: "nftCollateralTokenId",
                    type: "uint256",
                  },
                  {
                    internalType: "address",
                    name: "principalAddress",
                    type: "address",
                  },
                  {
                    internalType: "uint256",
                    name: "principalAmount",
                    type: "uint256",
                  },
                  { internalType: "uint256", name: "aprBps", type: "uint256" },
                  {
                    internalType: "uint256",
                    name: "expirationTime",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "duration",
                    type: "uint256",
                  },
                  {
                    components: [
                      {
                        internalType: "address",
                        name: "validator",
                        type: "address",
                      },
                      {
                        internalType: "bytes",
                        name: "arguments",
                        type: "bytes",
                      },
                    ],
                    internalType: "struct IBaseLoan.OfferValidator[]",
                    name: "validators",
                    type: "tuple[]",
                  },
                ],
                internalType: "struct IBaseLoan.LoanOffer",
                name: "offer",
                type: "tuple",
              },
              { internalType: "uint256", name: "tokenId", type: "uint256" },
              { internalType: "uint256", name: "amount", type: "uint256" },
              {
                internalType: "uint256",
                name: "expirationTime",
                type: "uint256",
              },
              { internalType: "bytes", name: "callbackData", type: "bytes" },
            ],
            internalType: "struct IBaseLoan.ExecutionData",
            name: "executionData",
            type: "tuple",
          },
          { internalType: "address", name: "lender", type: "address" },
          { internalType: "address", name: "borrower", type: "address" },
          {
            internalType: "bytes",
            name: "lenderOfferSignature",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "borrowerOfferSignature",
            type: "bytes",
          },
        ],
        internalType: "struct IMultiSourceLoan.LoanExecutionData",
        name: "_executionData",
        type: "tuple",
      },
    ],
    name: "emitLoan",
    outputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      {
        components: [
          { internalType: "address", name: "borrower", type: "address" },
          {
            internalType: "uint256",
            name: "nftCollateralTokenId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "nftCollateralAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "principalAddress",
            type: "address",
          },
          { internalType: "uint256", name: "principalAmount", type: "uint256" },
          { internalType: "uint256", name: "startTime", type: "uint256" },
          { internalType: "uint256", name: "duration", type: "uint256" },
          {
            components: [
              { internalType: "uint256", name: "loanId", type: "uint256" },
              { internalType: "address", name: "lender", type: "address" },
              {
                internalType: "uint256",
                name: "principalAmount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "accruedInterest",
                type: "uint256",
              },
              { internalType: "uint256", name: "startTime", type: "uint256" },
              { internalType: "uint256", name: "aprBps", type: "uint256" },
            ],
            internalType: "struct IMultiSourceLoan.Source[]",
            name: "source",
            type: "tuple[]",
          },
        ],
        internalType: "struct IMultiSourceLoan.Loan",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_loanId", type: "uint256" },
      {
        components: [
          { internalType: "address", name: "borrower", type: "address" },
          {
            internalType: "uint256",
            name: "nftCollateralTokenId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "nftCollateralAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "principalAddress",
            type: "address",
          },
          { internalType: "uint256", name: "principalAmount", type: "uint256" },
          { internalType: "uint256", name: "startTime", type: "uint256" },
          { internalType: "uint256", name: "duration", type: "uint256" },
          {
            components: [
              { internalType: "uint256", name: "loanId", type: "uint256" },
              { internalType: "address", name: "lender", type: "address" },
              {
                internalType: "uint256",
                name: "principalAmount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "accruedInterest",
                type: "uint256",
              },
              { internalType: "uint256", name: "startTime", type: "uint256" },
              { internalType: "uint256", name: "aprBps", type: "uint256" },
            ],
            internalType: "struct IMultiSourceLoan.Source[]",
            name: "source",
            type: "tuple[]",
          },
        ],
        internalType: "struct IMultiSourceLoan.Loan",
        name: "_loan",
        type: "tuple",
      },
      { internalType: "address", name: "_target", type: "address" },
      { internalType: "bytes", name: "_data", type: "bytes" },
    ],
    name: "executeFlashAction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_loanId", type: "uint256" },
      {
        components: [
          { internalType: "address", name: "borrower", type: "address" },
          {
            internalType: "uint256",
            name: "nftCollateralTokenId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "nftCollateralAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "principalAddress",
            type: "address",
          },
          { internalType: "uint256", name: "principalAmount", type: "uint256" },
          { internalType: "uint256", name: "startTime", type: "uint256" },
          { internalType: "uint256", name: "duration", type: "uint256" },
          {
            components: [
              { internalType: "uint256", name: "loanId", type: "uint256" },
              { internalType: "address", name: "lender", type: "address" },
              {
                internalType: "uint256",
                name: "principalAmount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "accruedInterest",
                type: "uint256",
              },
              { internalType: "uint256", name: "startTime", type: "uint256" },
              { internalType: "uint256", name: "aprBps", type: "uint256" },
            ],
            internalType: "struct IMultiSourceLoan.Source[]",
            name: "source",
            type: "tuple[]",
          },
        ],
        internalType: "struct IMultiSourceLoan.Loan",
        name: "_loan",
        type: "tuple",
      },
      { internalType: "uint256", name: "_extension", type: "uint256" },
    ],
    name: "extendLoan",
    outputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      {
        components: [
          { internalType: "address", name: "borrower", type: "address" },
          {
            internalType: "uint256",
            name: "nftCollateralTokenId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "nftCollateralAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "principalAddress",
            type: "address",
          },
          { internalType: "uint256", name: "principalAmount", type: "uint256" },
          { internalType: "uint256", name: "startTime", type: "uint256" },
          { internalType: "uint256", name: "duration", type: "uint256" },
          {
            components: [
              { internalType: "uint256", name: "loanId", type: "uint256" },
              { internalType: "address", name: "lender", type: "address" },
              {
                internalType: "uint256",
                name: "principalAmount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "accruedInterest",
                type: "uint256",
              },
              { internalType: "uint256", name: "startTime", type: "uint256" },
              { internalType: "uint256", name: "aprBps", type: "uint256" },
            ],
            internalType: "struct IMultiSourceLoan.Source[]",
            name: "source",
            type: "tuple[]",
          },
        ],
        internalType: "struct IMultiSourceLoan.Loan",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getCollectionManager",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrencyManager",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDelegateRegistry",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getFlashActionContract",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getImprovementMinimum",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "principalAmount", type: "uint256" },
          { internalType: "uint256", name: "interest", type: "uint256" },
          { internalType: "uint256", name: "duration", type: "uint256" },
        ],
        internalType: "struct IBaseLoan.ImprovementMinimum",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLiquidationAuctionDuration",
    outputs: [{ internalType: "uint48", name: "", type: "uint48" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getLiquidator",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_loanId", type: "uint256" }],
    name: "getLoanHash",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMaxSources",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMinLockPeriod",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_loanPrincipal", type: "uint256" },
    ],
    name: "getMinSourcePrincipal",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPendingProtocolFee",
    outputs: [
      {
        components: [
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "fraction", type: "uint256" },
        ],
        internalType: "struct IBaseLoan.ProtocolFee",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPendingProtocolFeeSetTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getProtocolFee",
    outputs: [
      {
        components: [
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "fraction", type: "uint256" },
        ],
        internalType: "struct IBaseLoan.ProtocolFee",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTotalLoansIssued",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_lender", type: "address" },
      { internalType: "uint256", name: "_offerId", type: "uint256" },
    ],
    name: "getUsedCapacity",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "isOfferCancelled",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    name: "isRenegotiationOfferCancelled",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_contract", type: "address" }],
    name: "isWhitelistedCallbackContract",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "lenderMinRenegotiationOfferId",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_loanId", type: "uint256" },
      {
        components: [
          { internalType: "address", name: "borrower", type: "address" },
          {
            internalType: "uint256",
            name: "nftCollateralTokenId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "nftCollateralAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "principalAddress",
            type: "address",
          },
          { internalType: "uint256", name: "principalAmount", type: "uint256" },
          { internalType: "uint256", name: "startTime", type: "uint256" },
          { internalType: "uint256", name: "duration", type: "uint256" },
          {
            components: [
              { internalType: "uint256", name: "loanId", type: "uint256" },
              { internalType: "address", name: "lender", type: "address" },
              {
                internalType: "uint256",
                name: "principalAmount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "accruedInterest",
                type: "uint256",
              },
              { internalType: "uint256", name: "startTime", type: "uint256" },
              { internalType: "uint256", name: "aprBps", type: "uint256" },
            ],
            internalType: "struct IMultiSourceLoan.Source[]",
            name: "source",
            type: "tuple[]",
          },
        ],
        internalType: "struct IMultiSourceLoan.Loan",
        name: "_loan",
        type: "tuple",
      },
    ],
    name: "liquidateLoan",
    outputs: [{ internalType: "bytes", name: "", type: "bytes" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_loanId", type: "uint256" },
      {
        components: [
          { internalType: "address", name: "borrower", type: "address" },
          {
            internalType: "uint256",
            name: "nftCollateralTokenId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "nftCollateralAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "principalAddress",
            type: "address",
          },
          { internalType: "uint256", name: "principalAmount", type: "uint256" },
          { internalType: "uint256", name: "startTime", type: "uint256" },
          { internalType: "uint256", name: "duration", type: "uint256" },
          {
            components: [
              { internalType: "uint256", name: "loanId", type: "uint256" },
              { internalType: "address", name: "lender", type: "address" },
              {
                internalType: "uint256",
                name: "principalAmount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "accruedInterest",
                type: "uint256",
              },
              { internalType: "uint256", name: "startTime", type: "uint256" },
              { internalType: "uint256", name: "aprBps", type: "uint256" },
            ],
            internalType: "struct IMultiSourceLoan.Source[]",
            name: "source",
            type: "tuple[]",
          },
        ],
        internalType: "struct IMultiSourceLoan.Loan",
        name: "_loan",
        type: "tuple",
      },
    ],
    name: "loanLiquidated",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "minOfferId",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes[]", name: "data", type: "bytes[]" }],
    name: "multicall",
    outputs: [{ internalType: "bytes[]", name: "results", type: "bytes[]" }],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    name: "onERC721Received",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint256", name: "renegotiationId", type: "uint256" },
          { internalType: "uint256", name: "loanId", type: "uint256" },
          { internalType: "address", name: "lender", type: "address" },
          { internalType: "uint256", name: "fee", type: "uint256" },
          {
            internalType: "uint256[]",
            name: "targetPrincipal",
            type: "uint256[]",
          },
          { internalType: "uint256", name: "principalAmount", type: "uint256" },
          { internalType: "uint256", name: "aprBps", type: "uint256" },
          { internalType: "uint256", name: "expirationTime", type: "uint256" },
          { internalType: "uint256", name: "duration", type: "uint256" },
        ],
        internalType: "struct IMultiSourceLoan.RenegotiationOffer",
        name: "_renegotiationOffer",
        type: "tuple",
      },
      {
        components: [
          { internalType: "address", name: "borrower", type: "address" },
          {
            internalType: "uint256",
            name: "nftCollateralTokenId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "nftCollateralAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "principalAddress",
            type: "address",
          },
          { internalType: "uint256", name: "principalAmount", type: "uint256" },
          { internalType: "uint256", name: "startTime", type: "uint256" },
          { internalType: "uint256", name: "duration", type: "uint256" },
          {
            components: [
              { internalType: "uint256", name: "loanId", type: "uint256" },
              { internalType: "address", name: "lender", type: "address" },
              {
                internalType: "uint256",
                name: "principalAmount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "accruedInterest",
                type: "uint256",
              },
              { internalType: "uint256", name: "startTime", type: "uint256" },
              { internalType: "uint256", name: "aprBps", type: "uint256" },
            ],
            internalType: "struct IMultiSourceLoan.Source[]",
            name: "source",
            type: "tuple[]",
          },
        ],
        internalType: "struct IMultiSourceLoan.Loan",
        name: "_loan",
        type: "tuple",
      },
      {
        internalType: "bytes",
        name: "_renegotiationOfferSignature",
        type: "bytes",
      },
    ],
    name: "refinanceFull",
    outputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      {
        components: [
          { internalType: "address", name: "borrower", type: "address" },
          {
            internalType: "uint256",
            name: "nftCollateralTokenId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "nftCollateralAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "principalAddress",
            type: "address",
          },
          { internalType: "uint256", name: "principalAmount", type: "uint256" },
          { internalType: "uint256", name: "startTime", type: "uint256" },
          { internalType: "uint256", name: "duration", type: "uint256" },
          {
            components: [
              { internalType: "uint256", name: "loanId", type: "uint256" },
              { internalType: "address", name: "lender", type: "address" },
              {
                internalType: "uint256",
                name: "principalAmount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "accruedInterest",
                type: "uint256",
              },
              { internalType: "uint256", name: "startTime", type: "uint256" },
              { internalType: "uint256", name: "aprBps", type: "uint256" },
            ],
            internalType: "struct IMultiSourceLoan.Source[]",
            name: "source",
            type: "tuple[]",
          },
        ],
        internalType: "struct IMultiSourceLoan.Loan",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint256", name: "renegotiationId", type: "uint256" },
          { internalType: "uint256", name: "loanId", type: "uint256" },
          { internalType: "address", name: "lender", type: "address" },
          { internalType: "uint256", name: "fee", type: "uint256" },
          {
            internalType: "uint256[]",
            name: "targetPrincipal",
            type: "uint256[]",
          },
          { internalType: "uint256", name: "principalAmount", type: "uint256" },
          { internalType: "uint256", name: "aprBps", type: "uint256" },
          { internalType: "uint256", name: "expirationTime", type: "uint256" },
          { internalType: "uint256", name: "duration", type: "uint256" },
        ],
        internalType: "struct IMultiSourceLoan.RenegotiationOffer",
        name: "_renegotiationOffer",
        type: "tuple",
      },
      {
        components: [
          { internalType: "address", name: "borrower", type: "address" },
          {
            internalType: "uint256",
            name: "nftCollateralTokenId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "nftCollateralAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "principalAddress",
            type: "address",
          },
          { internalType: "uint256", name: "principalAmount", type: "uint256" },
          { internalType: "uint256", name: "startTime", type: "uint256" },
          { internalType: "uint256", name: "duration", type: "uint256" },
          {
            components: [
              { internalType: "uint256", name: "loanId", type: "uint256" },
              { internalType: "address", name: "lender", type: "address" },
              {
                internalType: "uint256",
                name: "principalAmount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "accruedInterest",
                type: "uint256",
              },
              { internalType: "uint256", name: "startTime", type: "uint256" },
              { internalType: "uint256", name: "aprBps", type: "uint256" },
            ],
            internalType: "struct IMultiSourceLoan.Source[]",
            name: "source",
            type: "tuple[]",
          },
        ],
        internalType: "struct IMultiSourceLoan.Loan",
        name: "_loan",
        type: "tuple",
      },
    ],
    name: "refinancePartial",
    outputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      {
        components: [
          { internalType: "address", name: "borrower", type: "address" },
          {
            internalType: "uint256",
            name: "nftCollateralTokenId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "nftCollateralAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "principalAddress",
            type: "address",
          },
          { internalType: "uint256", name: "principalAmount", type: "uint256" },
          { internalType: "uint256", name: "startTime", type: "uint256" },
          { internalType: "uint256", name: "duration", type: "uint256" },
          {
            components: [
              { internalType: "uint256", name: "loanId", type: "uint256" },
              { internalType: "address", name: "lender", type: "address" },
              {
                internalType: "uint256",
                name: "principalAmount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "accruedInterest",
                type: "uint256",
              },
              { internalType: "uint256", name: "startTime", type: "uint256" },
              { internalType: "uint256", name: "aprBps", type: "uint256" },
            ],
            internalType: "struct IMultiSourceLoan.Source[]",
            name: "source",
            type: "tuple[]",
          },
        ],
        internalType: "struct IMultiSourceLoan.Loan",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_contract", type: "address" }],
    name: "removeWhitelistedCallbackContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: "uint256", name: "loanId", type: "uint256" },
              { internalType: "bytes", name: "callbackData", type: "bytes" },
              { internalType: "bool", name: "shouldDelegate", type: "bool" },
            ],
            internalType: "struct IMultiSourceLoan.SignableRepaymentData",
            name: "data",
            type: "tuple",
          },
          {
            components: [
              { internalType: "address", name: "borrower", type: "address" },
              {
                internalType: "uint256",
                name: "nftCollateralTokenId",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "nftCollateralAddress",
                type: "address",
              },
              {
                internalType: "address",
                name: "principalAddress",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "principalAmount",
                type: "uint256",
              },
              { internalType: "uint256", name: "startTime", type: "uint256" },
              { internalType: "uint256", name: "duration", type: "uint256" },
              {
                components: [
                  { internalType: "uint256", name: "loanId", type: "uint256" },
                  { internalType: "address", name: "lender", type: "address" },
                  {
                    internalType: "uint256",
                    name: "principalAmount",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "accruedInterest",
                    type: "uint256",
                  },
                  {
                    internalType: "uint256",
                    name: "startTime",
                    type: "uint256",
                  },
                  { internalType: "uint256", name: "aprBps", type: "uint256" },
                ],
                internalType: "struct IMultiSourceLoan.Source[]",
                name: "source",
                type: "tuple[]",
              },
            ],
            internalType: "struct IMultiSourceLoan.Loan",
            name: "loan",
            type: "tuple",
          },
          { internalType: "bytes", name: "borrowerSignature", type: "bytes" },
        ],
        internalType: "struct IMultiSourceLoan.LoanRepaymentData",
        name: "_repaymentData",
        type: "tuple",
      },
    ],
    name: "repayLoan",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_delegate", type: "address" },
      { internalType: "address", name: "_collection", type: "address" },
      { internalType: "uint256", name: "_tokenId", type: "uint256" },
    ],
    name: "revokeDelegate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newDelegateRegistry",
        type: "address",
      },
    ],
    name: "setDelegateRegistry",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newFlashActionContract",
        type: "address",
      },
    ],
    name: "setFlashActionContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "__maxSources", type: "uint256" },
    ],
    name: "setMaxSources",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "__minLockPeriod", type: "uint256" },
    ],
    name: "setMinLockPeriod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "setProtocolFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint256", name: "principalAmount", type: "uint256" },
          { internalType: "uint256", name: "interest", type: "uint256" },
          { internalType: "uint256", name: "duration", type: "uint256" },
        ],
        internalType: "struct IBaseLoan.ImprovementMinimum",
        name: "_newMinimum",
        type: "tuple",
      },
    ],
    name: "updateImprovementMinimum",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint48", name: "_newDuration", type: "uint48" }],
    name: "updateLiquidationAuctionDuration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract ILoanLiquidator",
        name: "loanLiquidator",
        type: "address",
      },
    ],
    name: "updateLiquidationContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "recipient", type: "address" },
          { internalType: "uint256", name: "fraction", type: "uint256" },
        ],
        internalType: "struct IBaseLoan.ProtocolFee",
        name: "_newProtocolFee",
        type: "tuple",
      },
    ],
    name: "updateProtocolFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const leverageAbi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_multiSourceLoanAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_marketplaceContracts",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "_wethAddress",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "_punkMarketAddress",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "_wrappedPunkAddress",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "_seaportAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  { inputs: [], name: "AddressZeroError", type: "error" },
  { inputs: [], name: "CouldNotReturnEthError", type: "error" },
  { inputs: [], name: "InvalidAddressUpdateError", type: "error" },
  { inputs: [], name: "InvalidCallbackError", type: "error" },
  { inputs: [], name: "MarketplaceAddressNotWhitelisted", type: "error" },
  { inputs: [], name: "OnlyMultiSourceLoanError", type: "error" },
  { inputs: [], name: "OnlyWethSupportedError", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256[]",
        name: "_loanIds",
        type: "uint256[]",
      },
    ],
    name: "BNPLLoansStarted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_newAddress",
        type: "address",
      },
    ],
    name: "MultiSourceLoanPendingUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_newAddress",
        type: "address",
      },
    ],
    name: "MultiSourceLoanUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_newAddress",
        type: "address",
      },
    ],
    name: "SeaportPendingUpdate",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "_newAddress",
        type: "address",
      },
    ],
    name: "SeaportUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256[]",
        name: "_loanIds",
        type: "uint256[]",
      },
    ],
    name: "SellAndRepayExecuted",
    type: "event",
  },
  { stateMutability: "payable", type: "fallback" },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "borrower", type: "address" },
          {
            internalType: "uint256",
            name: "nftCollateralTokenId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "nftCollateralAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "principalAddress",
            type: "address",
          },
          { internalType: "uint256", name: "principalAmount", type: "uint256" },
          { internalType: "uint256", name: "startTime", type: "uint256" },
          { internalType: "uint256", name: "duration", type: "uint256" },
          {
            components: [
              { internalType: "uint256", name: "loanId", type: "uint256" },
              { internalType: "address", name: "lender", type: "address" },
              {
                internalType: "uint256",
                name: "principalAmount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "accruedInterest",
                type: "uint256",
              },
              { internalType: "uint256", name: "startTime", type: "uint256" },
              { internalType: "uint256", name: "aprBps", type: "uint256" },
            ],
            internalType: "struct IMultiSourceLoan.Source[]",
            name: "source",
            type: "tuple[]",
          },
        ],
        internalType: "struct IMultiSourceLoan.Loan",
        name: "_loan",
        type: "tuple",
      },
      { internalType: "bytes", name: "_executionData", type: "bytes" },
    ],
    name: "afterNFTTransfer",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "borrower", type: "address" },
          {
            internalType: "uint256",
            name: "nftCollateralTokenId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "nftCollateralAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "principalAddress",
            type: "address",
          },
          { internalType: "uint256", name: "principalAmount", type: "uint256" },
          { internalType: "uint256", name: "startTime", type: "uint256" },
          { internalType: "uint256", name: "duration", type: "uint256" },
          {
            components: [
              { internalType: "uint256", name: "loanId", type: "uint256" },
              { internalType: "address", name: "lender", type: "address" },
              {
                internalType: "uint256",
                name: "principalAmount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "accruedInterest",
                type: "uint256",
              },
              { internalType: "uint256", name: "startTime", type: "uint256" },
              { internalType: "uint256", name: "aprBps", type: "uint256" },
            ],
            internalType: "struct IMultiSourceLoan.Source[]",
            name: "source",
            type: "tuple[]",
          },
        ],
        internalType: "struct IMultiSourceLoan.Loan",
        name: "_loan",
        type: "tuple",
      },
      { internalType: "uint256", name: "_fee", type: "uint256" },
      { internalType: "bytes", name: "_executionData", type: "bytes" },
    ],
    name: "afterPrincipalTransfer",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes[]", name: "_executionData", type: "bytes[]" },
    ],
    name: "buy",
    outputs: [
      { internalType: "uint256[]", name: "", type: "uint256[]" },
      {
        components: [
          { internalType: "address", name: "borrower", type: "address" },
          {
            internalType: "uint256",
            name: "nftCollateralTokenId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "nftCollateralAddress",
            type: "address",
          },
          {
            internalType: "address",
            name: "principalAddress",
            type: "address",
          },
          { internalType: "uint256", name: "principalAmount", type: "uint256" },
          { internalType: "uint256", name: "startTime", type: "uint256" },
          { internalType: "uint256", name: "duration", type: "uint256" },
          {
            components: [
              { internalType: "uint256", name: "loanId", type: "uint256" },
              { internalType: "address", name: "lender", type: "address" },
              {
                internalType: "uint256",
                name: "principalAmount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "accruedInterest",
                type: "uint256",
              },
              { internalType: "uint256", name: "startTime", type: "uint256" },
              { internalType: "uint256", name: "aprBps", type: "uint256" },
            ],
            internalType: "struct IMultiSourceLoan.Source[]",
            name: "source",
            type: "tuple[]",
          },
        ],
        internalType: "struct IMultiSourceLoan.Loan[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_newAddress", type: "address" }],
    name: "finalUpdateMultiSourceLoanAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_newAddress", type: "address" }],
    name: "finalUpdateSeaportAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getMultiSourceLoanAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSeaportAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    name: "onERC721Received",
    outputs: [{ internalType: "bytes4", name: "", type: "bytes4" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes[]", name: "_executionData", type: "bytes[]" },
    ],
    name: "sell",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_newAddress", type: "address" }],
    name: "updateMultiSourceLoanAddressFirst",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_newAddress", type: "address" }],
    name: "updateSeaportAddressFirst",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
] as const;

const main = async () => {
  const errorArgs = decodeAbiParameters(
    multicallFailed.inputs,
    "0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000044eba994600000000000000000000000000000000000000000000000000000000"
  );
  const reason = errorArgs[1];

  mslAbi.forEach((abi) => {
    if (abi.type !== "error") return;
    const signature = getFunctionSelector(formatAbiItem(abi));
    if (signature === reason) {
      console.log(abi);
    }
  });

  leverageAbi.forEach((abi) => {
    if (abi.type !== "error") return;
    const signature = getFunctionSelector(formatAbiItem(abi));
    if (signature === reason) {
      console.log(abi);
    }
  });
};

main();
