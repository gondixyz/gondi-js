export declare const addressManagerABI: readonly [{
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
    readonly inputs: readonly [{
        readonly name: "_original";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_address";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "AddressAlreadyAddedError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_address";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "AddressNotAddedError";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "address_added";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "AddressAdded";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "address_removed";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "AddressRemovedFromWhitelist";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "address_whitelisted";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "AddressWhitelisted";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "user";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }];
    readonly name: "OwnershipTransferred";
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_entry";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "add";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint16";
        readonly type: "uint16";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_entry";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "addToWhitelist";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_address";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "addressToIndex";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint16";
        readonly type: "uint16";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_index";
        readonly internalType: "uint16";
        readonly type: "uint16";
    }];
    readonly name: "indexToAddress";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_entry";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "isWhitelisted";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "owner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_entry";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "removeFromWhitelist";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
}];
export declare const auctionLoanLiquidatorABI: readonly [{
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
    readonly inputs: readonly [{
        readonly name: "currencyManager";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "collectionManager";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "triggerFee";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "AuctionAlreadyInProgressError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_contract";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "AuctionNotExistsError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_expiration";
        readonly internalType: "uint96";
        readonly type: "uint96";
    }];
    readonly name: "AuctionNotOverError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_expiration";
        readonly internalType: "uint96";
        readonly type: "uint96";
    }];
    readonly name: "AuctionOverError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "CollectionNotWhitelistedError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "CurrencyNotWhitelistedError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "triggerFee";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "InvalidTriggerFee";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_loan";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "LoanNotAcceptedError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_minBid";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "MinBidError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_owner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "NFTNotOwnedError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "NoBidsError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "ZeroAddressError";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "loanContract";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "loanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "auctionContract";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "asset";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "highestBid";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "settler";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "triggerFee";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "AuctionSettled";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "auctionContract";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "newBidder";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "bid";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "loanAddress";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "loanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "BidPlaced";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "loan";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "LoanContractAdded";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "loan";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "LoanContractRemoved";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "loanAddress";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "loanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "duration";
        readonly internalType: "uint96";
        readonly type: "uint96";
        readonly indexed: false;
    }, {
        readonly name: "asset";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "LoanLiquidationStarted";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "user";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }];
    readonly name: "OwnershipTransferred";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "triggerFee";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "TriggerFeeUpdated";
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "MAX_TRIGGER_FEE";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "MIN_INCREMENT_BPS";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_loanContract";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "addLoanContract";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_contract";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "getAuction";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct AuctionLoanLiquidator.Auction";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "loanAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "loanId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "highestBid";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "highestBidder";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "duration";
            readonly internalType: "uint96";
            readonly type: "uint96";
        }, {
            readonly name: "asset";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "startTime";
            readonly internalType: "uint96";
            readonly type: "uint96";
        }, {
            readonly name: "originator";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "lastBidTime";
            readonly internalType: "uint96";
            readonly type: "uint96";
        }];
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getTriggerFee";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getValidLoanContracts";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_loanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_contract";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_asset";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_duration";
        readonly internalType: "uint96";
        readonly type: "uint96";
    }, {
        readonly name: "_originator";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "liquidateLoan";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly name: "onERC721Received";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes4";
        readonly type: "bytes4";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "owner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_contract";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_bid";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "placeBid";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_loanContract";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "removeLoanContract";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_contract";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_loan";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly name: "settleAuction";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "triggerFee";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "updateTriggerFee";
    readonly outputs: readonly [];
}];
export declare const baseLoanABI: readonly [{
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "AddressZeroError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_lender";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_offerId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "CancelledOrExecutedOfferError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_lender";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_offerId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "CancelledRenegotiationOffer";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_lender";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_renegotiationId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "CancelledRenegotiationOfferError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "CannotLiquidateError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "CollectionNotWhitelistedError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "CurrencyNotWhitelistedError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "ExpiredLoanError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_expirationTime";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "ExpiredOfferError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_expirationTime";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "ExpiredRenegotiationOfferError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidBorrowerError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidCollateralIdError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidLiquidationError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_loanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "InvalidLoanError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_fraction";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "InvalidProtocolFeeError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidSignatureError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidSignerError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_liquidator";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "LiquidatorOnlyError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_expirationTime";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "LoanNotDueError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_loanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "LoanNotFoundError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_lender";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_newMinOfferId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_minOfferId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "LowOfferIdError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_lender";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_newMinRenegotiationOfferId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_minOfferId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "LowRenegotiationOfferIdError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "MaxCapacityExceededError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_id";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "NotMintedError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "NotStrictlyImprovedError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "OnlyBorrowerCallableError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "OnlyLenderOrSignerCallableError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "RepaymentError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_pendingProtocolFeeSetTime";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "TooEarlyError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "Unauthorized";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_authorized";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "UnauthorizedError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "ZeroAddressError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "ZeroDurationError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "ZeroInterestError";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "lender";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "minOfferId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "AllOffersCancelled";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "lender";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "minRenegotiationId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "AllRenegotiationOffersCancelled";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "lender";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "signer";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "ApprovedSigner";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "minimum";
        readonly internalType: "struct IBaseLoan.ImprovementMinimum";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "interest";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
        readonly indexed: false;
    }];
    readonly name: "ImprovementMinimumUpdated";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "newDuration";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "LiquidationAuctionDurationUpdated";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "liquidator";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "LiquidationContractUpdated";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "loanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "LoanForeclosed";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "loanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "repayment";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "LoanLiquidated";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "loanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "liquidator";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "LoanSentToLiquidator";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "lender";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "offerId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "OfferCancelled";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "user";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }];
    readonly name: "OwnershipTransferred";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "fee";
        readonly internalType: "struct IBaseLoan.ProtocolFee";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "recipient";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "fraction";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
        readonly indexed: false;
    }];
    readonly name: "ProtocolFeePendingUpdate";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "fee";
        readonly internalType: "struct IBaseLoan.ProtocolFee";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "recipient";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "fraction";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
        readonly indexed: false;
    }];
    readonly name: "ProtocolFeeUpdated";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "lender";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "renegotiationId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "RenegotiationOfferCancelled";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "contract_added";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "WhitelistedCallbackContractAdded";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "contract_removed";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "WhitelistedCallbackContractRemoved";
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "DOMAIN_SEPARATOR";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "FEE_UPDATE_NOTICE";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "INITIAL_DOMAIN_SEPARATOR";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "MAX_PROTOCOL_FEE";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_contract";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "addWhitelistedCallbackContract";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_signer";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "approveSigner";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_lender";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_minOfferId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "cancelAllOffers";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_lender";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_minRenegotiationId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "cancelAllRenegotiationOffers";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_lender";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_offerId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "cancelOffer";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_lender";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_offerIds";
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
    }];
    readonly name: "cancelOffers";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_lender";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_renegotiationId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "cancelRenegotiationOffer";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_lender";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_renegotiationIds";
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
    }];
    readonly name: "cancelRenegotiationOffers";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "getApprovedSigner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getCollectionManager";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getCurrencyManager";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getImprovementMinimum";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct IBaseLoan.ImprovementMinimum";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "interest";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getLiquidationAuctionDuration";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint48";
        readonly type: "uint48";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getLiquidator";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getPendingProtocolFee";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct IBaseLoan.ProtocolFee";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "recipient";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "fraction";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getPendingProtocolFeeSetTime";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getProtocolFee";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct IBaseLoan.ProtocolFee";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "recipient";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "fraction";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getTotalLoansIssued";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_lender";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_offerId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "getUsedCapacity";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "isOfferCancelled";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "isRenegotiationOfferCancelled";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_contract";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "isWhitelistedCallbackContract";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "lenderMinOfferId";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "lenderMinRenegotiationOfferId";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_collateralAddress";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_collateralTokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_loanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_repayment";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_loan";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly name: "loanLiquidated";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "name";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly name: "onERC721Received";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes4";
        readonly type: "bytes4";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "owner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_contract";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "removeWhitelistedCallbackContract";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "setProtocolFee";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newMinimum";
        readonly internalType: "struct IBaseLoan.ImprovementMinimum";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "interest";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly name: "updateImprovementMinimum";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newDuration";
        readonly internalType: "uint48";
        readonly type: "uint48";
    }];
    readonly name: "updateLiquidationAuctionDuration";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "loanLiquidator";
        readonly internalType: "contract ILoanLiquidator";
        readonly type: "address";
    }];
    readonly name: "updateLiquidationContract";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newProtocolFee";
        readonly internalType: "struct IBaseLoan.ProtocolFee";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "recipient";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "fraction";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly name: "updateProtocolFee";
    readonly outputs: readonly [];
}];
export declare const collectionOracleABI: readonly [{
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
    readonly inputs: readonly [];
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidLengthsError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_nftAddress";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "NftNotFoundError";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "user";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }];
    readonly name: "OwnershipTransferred";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "_collection";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "_asset";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "_price";
        readonly internalType: "uint128";
        readonly type: "uint128";
        readonly indexed: false;
    }, {
        readonly name: "_timestamp";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "PriceUpdated";
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_nftAddress";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_asset";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "getPrice";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct IOracle.PriceUpdate";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "price";
            readonly internalType: "uint128";
            readonly type: "uint128";
        }, {
            readonly name: "updatedTimestamp";
            readonly internalType: "uint128";
            readonly type: "uint128";
        }];
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "owner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "collections";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }, {
        readonly name: "assets";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }, {
        readonly name: "price";
        readonly internalType: "uint128[]";
        readonly type: "uint128[]";
    }, {
        readonly name: "timestamp";
        readonly internalType: "uint128";
        readonly type: "uint128";
    }];
    readonly name: "updatePrices";
    readonly outputs: readonly [];
}];
export declare const erc165ABI: readonly [{
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "interfaceId";
        readonly internalType: "bytes4";
        readonly type: "bytes4";
    }];
    readonly name: "supportsInterface";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}];
export declare const erc20ABI: readonly [{
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "spender";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "amount";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "Approval";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "from";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "amount";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "Transfer";
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "DOMAIN_SEPARATOR";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "allowance";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "spender";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "amount";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "approve";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "balanceOf";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "decimals";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint8";
        readonly type: "uint8";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "name";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "nonces";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "spender";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "value";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "deadline";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "v";
        readonly internalType: "uint8";
        readonly type: "uint8";
    }, {
        readonly name: "r";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }, {
        readonly name: "s";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
    readonly name: "permit";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "symbol";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "totalSupply";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "amount";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "transfer";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "from";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "amount";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "transferFrom";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}];
export declare const erc721ABI: readonly [{
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "spender";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "id";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: true;
    }];
    readonly name: "Approval";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "operator";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "approved";
        readonly internalType: "bool";
        readonly type: "bool";
        readonly indexed: false;
    }];
    readonly name: "ApprovalForAll";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "from";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "id";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: true;
    }];
    readonly name: "Transfer";
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "spender";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "id";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "approve";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "balanceOf";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "getApproved";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "isApprovedForAll";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "name";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "id";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "ownerOf";
    readonly outputs: readonly [{
        readonly name: "owner";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "from";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "id";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "safeTransferFrom";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "from";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "id";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "data";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly name: "safeTransferFrom";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "operator";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "approved";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly name: "setApprovalForAll";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "interfaceId";
        readonly internalType: "bytes4";
        readonly type: "bytes4";
    }];
    readonly name: "supportsInterface";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "symbol";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "id";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "tokenURI";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "from";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "id";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "transferFrom";
    readonly outputs: readonly [];
}];
export declare const erc721TokenReceiverABI: readonly [{
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly name: "onERC721Received";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes4";
        readonly type: "bytes4";
    }];
}];
export declare const iBaseLoanABI: readonly [{
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_contract";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "addWhitelistedCallbackContract";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_signer";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "approveSigner";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_lender";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_minOfferId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "cancelAllOffers";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_lender";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_minRenegotiationId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "cancelAllRenegotiationOffers";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_lender";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_offerId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "cancelOffer";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_lender";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_offerIds";
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
    }];
    readonly name: "cancelOffers";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_lender";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_renegotiationId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "cancelRenegotiationOffer";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_lender";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_renegotiationIds";
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
    }];
    readonly name: "cancelRenegotiationOffers";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_lender";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "getApprovedSigner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getLiquidationAuctionDuration";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint48";
        readonly type: "uint48";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getLiquidator";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getPendingProtocolFee";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct IBaseLoan.ProtocolFee";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "recipient";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "fraction";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getPendingProtocolFeeSetTime";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getProtocolFee";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct IBaseLoan.ProtocolFee";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "recipient";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "fraction";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getTotalLoansIssued";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_contract";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "isWhitelistedCallbackContract";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_collateralAddress";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_collateralTokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_loanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_repayment";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_loan";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly name: "loanLiquidated";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_contract";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "removeWhitelistedCallbackContract";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "setProtocolFee";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newDuration";
        readonly internalType: "uint48";
        readonly type: "uint48";
    }];
    readonly name: "updateLiquidationAuctionDuration";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "loanLiquidator";
        readonly internalType: "contract ILoanLiquidator";
        readonly type: "address";
    }];
    readonly name: "updateLiquidationContract";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newProtocolFee";
        readonly internalType: "struct IBaseLoan.ProtocolFee";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "recipient";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "fraction";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly name: "updateProtocolFee";
    readonly outputs: readonly [];
}];
export declare const iBaseOfferValidatorABI: readonly [{
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_offer";
        readonly internalType: "struct IBaseLoan.LoanOffer";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "offerId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "lender";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "fee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "borrower";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "capacity";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "signer";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "requiresLiquidation";
            readonly internalType: "bool";
            readonly type: "bool";
        }, {
            readonly name: "nftCollateralAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "nftCollateralTokenId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "principalAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "aprBps";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "expirationTime";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "validators";
            readonly internalType: "struct IBaseLoan.OfferValidator[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "validator";
                readonly internalType: "address";
                readonly type: "address";
            }, {
                readonly name: "arguments";
                readonly internalType: "bytes";
                readonly type: "bytes";
            }];
        }];
    }, {
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_validatorData";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly name: "validateOffer";
    readonly outputs: readonly [];
}];
export declare const ierc1271ABI: readonly [{
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "hash";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }, {
        readonly name: "signature";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly name: "isValidSignature";
    readonly outputs: readonly [{
        readonly name: "magicValue";
        readonly internalType: "bytes4";
        readonly type: "bytes4";
    }];
}];
export declare const ierc165ABI: readonly [{
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "interfaceId";
        readonly internalType: "bytes4";
        readonly type: "bytes4";
    }];
    readonly name: "supportsInterface";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}];
export declare const iLoanLiquidatorABI: readonly [{
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_loanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_contract";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_asset";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_duration";
        readonly internalType: "uint96";
        readonly type: "uint96";
    }, {
        readonly name: "_originator";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "liquidateLoan";
    readonly outputs: readonly [];
}];
export declare const iMultiSourceLoanABI: readonly [{
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_loanOffer";
        readonly internalType: "struct IBaseLoan.LoanOffer";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "offerId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "lender";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "fee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "borrower";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "capacity";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "signer";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "requiresLiquidation";
            readonly internalType: "bool";
            readonly type: "bool";
        }, {
            readonly name: "nftCollateralAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "nftCollateralTokenId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "principalAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "aprBps";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "expirationTime";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "validators";
            readonly internalType: "struct IBaseLoan.OfferValidator[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "validator";
                readonly internalType: "address";
                readonly type: "address";
            }, {
                readonly name: "arguments";
                readonly internalType: "bytes";
                readonly type: "bytes";
            }];
        }];
    }, {
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_lenderOfferSignature";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }, {
        readonly name: "_withCallback";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly name: "emitLoan";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "";
        readonly internalType: "struct IMultiSourceLoan.Loan";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "borrower";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "nftCollateralTokenId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "nftCollateralAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "startTime";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "source";
            readonly internalType: "struct IMultiSourceLoan.Source[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "accruedInterest";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "startTime";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "aprBps";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }];
        }];
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getMaxSources";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint8";
        readonly type: "uint8";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_loanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_loan";
        readonly internalType: "struct IMultiSourceLoan.Loan";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "borrower";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "nftCollateralTokenId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "nftCollateralAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "startTime";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "source";
            readonly internalType: "struct IMultiSourceLoan.Source[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "accruedInterest";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "startTime";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "aprBps";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }];
        }];
    }];
    readonly name: "liquidateLoan";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_renegotiationOffer";
        readonly internalType: "struct IMultiSourceLoan.RenegotiationOffer";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "renegotiationId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "loanId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "lender";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "fee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "signer";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "targetPrincipal";
            readonly internalType: "uint256[]";
            readonly type: "uint256[]";
        }, {
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "aprBps";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "expirationTime";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "strictImprovement";
            readonly internalType: "bool";
            readonly type: "bool";
        }];
    }, {
        readonly name: "_loan";
        readonly internalType: "struct IMultiSourceLoan.Loan";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "borrower";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "nftCollateralTokenId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "nftCollateralAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "startTime";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "source";
            readonly internalType: "struct IMultiSourceLoan.Source[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "accruedInterest";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "startTime";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "aprBps";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }];
        }];
    }, {
        readonly name: "_renegotiationOfferSignature";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly name: "refinanceFull";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "";
        readonly internalType: "struct IMultiSourceLoan.Loan";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "borrower";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "nftCollateralTokenId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "nftCollateralAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "startTime";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "source";
            readonly internalType: "struct IMultiSourceLoan.Source[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "accruedInterest";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "startTime";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "aprBps";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }];
        }];
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_renegotiationOffer";
        readonly internalType: "struct IMultiSourceLoan.RenegotiationOffer";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "renegotiationId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "loanId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "lender";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "fee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "signer";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "targetPrincipal";
            readonly internalType: "uint256[]";
            readonly type: "uint256[]";
        }, {
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "aprBps";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "expirationTime";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "strictImprovement";
            readonly internalType: "bool";
            readonly type: "bool";
        }];
    }, {
        readonly name: "_loan";
        readonly internalType: "struct IMultiSourceLoan.Loan";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "borrower";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "nftCollateralTokenId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "nftCollateralAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "startTime";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "source";
            readonly internalType: "struct IMultiSourceLoan.Source[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "accruedInterest";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "startTime";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "aprBps";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }];
        }];
    }];
    readonly name: "refinancePartial";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "";
        readonly internalType: "struct IMultiSourceLoan.Loan";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "borrower";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "nftCollateralTokenId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "nftCollateralAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "startTime";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "source";
            readonly internalType: "struct IMultiSourceLoan.Source[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "accruedInterest";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "startTime";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "aprBps";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }];
        }];
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_renegotiationOffer";
        readonly internalType: "struct IMultiSourceLoan.RenegotiationOffer[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "renegotiationId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "loanId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "lender";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "fee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "signer";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "targetPrincipal";
            readonly internalType: "uint256[]";
            readonly type: "uint256[]";
        }, {
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "aprBps";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "expirationTime";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "strictImprovement";
            readonly internalType: "bool";
            readonly type: "bool";
        }];
    }, {
        readonly name: "_loan";
        readonly internalType: "struct IMultiSourceLoan.Loan[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "borrower";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "nftCollateralTokenId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "nftCollateralAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "startTime";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "source";
            readonly internalType: "struct IMultiSourceLoan.Source[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "accruedInterest";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "startTime";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "aprBps";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }];
        }];
    }];
    readonly name: "refinancePartialBatch";
    readonly outputs: readonly [{
        readonly name: "loanId";
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
    }, {
        readonly name: "loan";
        readonly internalType: "struct IMultiSourceLoan.Loan[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "borrower";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "nftCollateralTokenId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "nftCollateralAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "startTime";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "source";
            readonly internalType: "struct IMultiSourceLoan.Source[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "accruedInterest";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "startTime";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "aprBps";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }];
        }];
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_collateralTo";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_loanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_loan";
        readonly internalType: "struct IMultiSourceLoan.Loan";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "borrower";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "nftCollateralTokenId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "nftCollateralAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "startTime";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "source";
            readonly internalType: "struct IMultiSourceLoan.Source[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "accruedInterest";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "startTime";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "aprBps";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }];
        }];
    }, {
        readonly name: "_withCallback";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly name: "repayLoan";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "maxSources";
        readonly internalType: "uint8";
        readonly type: "uint8";
    }];
    readonly name: "setMaxSources";
    readonly outputs: readonly [];
}];
export declare const iLoanCallbackABI: readonly [{
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidCallbackError";
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_loan";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly name: "afterNFTTransfer";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes4";
        readonly type: "bytes4";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_loan";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly name: "afterPrincipalTransfer";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes4";
        readonly type: "bytes4";
    }];
}];
export declare const iMulticall3ABI: readonly [{
    readonly stateMutability: "payable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "calls";
        readonly internalType: "struct IMulticall3.Call[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "target";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "callData";
            readonly internalType: "bytes";
            readonly type: "bytes";
        }];
    }];
    readonly name: "aggregate";
    readonly outputs: readonly [{
        readonly name: "blockNumber";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "returnData";
        readonly internalType: "bytes[]";
        readonly type: "bytes[]";
    }];
}, {
    readonly stateMutability: "payable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "calls";
        readonly internalType: "struct IMulticall3.Call3[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "target";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "allowFailure";
            readonly internalType: "bool";
            readonly type: "bool";
        }, {
            readonly name: "callData";
            readonly internalType: "bytes";
            readonly type: "bytes";
        }];
    }];
    readonly name: "aggregate3";
    readonly outputs: readonly [{
        readonly name: "returnData";
        readonly internalType: "struct IMulticall3.Result[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "success";
            readonly internalType: "bool";
            readonly type: "bool";
        }, {
            readonly name: "returnData";
            readonly internalType: "bytes";
            readonly type: "bytes";
        }];
    }];
}, {
    readonly stateMutability: "payable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "calls";
        readonly internalType: "struct IMulticall3.Call3Value[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "target";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "allowFailure";
            readonly internalType: "bool";
            readonly type: "bool";
        }, {
            readonly name: "value";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "callData";
            readonly internalType: "bytes";
            readonly type: "bytes";
        }];
    }];
    readonly name: "aggregate3Value";
    readonly outputs: readonly [{
        readonly name: "returnData";
        readonly internalType: "struct IMulticall3.Result[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "success";
            readonly internalType: "bool";
            readonly type: "bool";
        }, {
            readonly name: "returnData";
            readonly internalType: "bytes";
            readonly type: "bytes";
        }];
    }];
}, {
    readonly stateMutability: "payable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "calls";
        readonly internalType: "struct IMulticall3.Call[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "target";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "callData";
            readonly internalType: "bytes";
            readonly type: "bytes";
        }];
    }];
    readonly name: "blockAndAggregate";
    readonly outputs: readonly [{
        readonly name: "blockNumber";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "blockHash";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }, {
        readonly name: "returnData";
        readonly internalType: "struct IMulticall3.Result[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "success";
            readonly internalType: "bool";
            readonly type: "bool";
        }, {
            readonly name: "returnData";
            readonly internalType: "bytes";
            readonly type: "bytes";
        }];
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getBasefee";
    readonly outputs: readonly [{
        readonly name: "basefee";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "blockNumber";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "getBlockHash";
    readonly outputs: readonly [{
        readonly name: "blockHash";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getBlockNumber";
    readonly outputs: readonly [{
        readonly name: "blockNumber";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getChainId";
    readonly outputs: readonly [{
        readonly name: "chainid";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getCurrentBlockCoinbase";
    readonly outputs: readonly [{
        readonly name: "coinbase";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getCurrentBlockDifficulty";
    readonly outputs: readonly [{
        readonly name: "difficulty";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getCurrentBlockGasLimit";
    readonly outputs: readonly [{
        readonly name: "gaslimit";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getCurrentBlockTimestamp";
    readonly outputs: readonly [{
        readonly name: "timestamp";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "addr";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "getEthBalance";
    readonly outputs: readonly [{
        readonly name: "balance";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getLastBlockHash";
    readonly outputs: readonly [{
        readonly name: "blockHash";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
}, {
    readonly stateMutability: "payable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "requireSuccess";
        readonly internalType: "bool";
        readonly type: "bool";
    }, {
        readonly name: "calls";
        readonly internalType: "struct IMulticall3.Call[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "target";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "callData";
            readonly internalType: "bytes";
            readonly type: "bytes";
        }];
    }];
    readonly name: "tryAggregate";
    readonly outputs: readonly [{
        readonly name: "returnData";
        readonly internalType: "struct IMulticall3.Result[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "success";
            readonly internalType: "bool";
            readonly type: "bool";
        }, {
            readonly name: "returnData";
            readonly internalType: "bytes";
            readonly type: "bytes";
        }];
    }];
}, {
    readonly stateMutability: "payable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "requireSuccess";
        readonly internalType: "bool";
        readonly type: "bool";
    }, {
        readonly name: "calls";
        readonly internalType: "struct IMulticall3.Call[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "target";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "callData";
            readonly internalType: "bytes";
            readonly type: "bytes";
        }];
    }];
    readonly name: "tryBlockAndAggregate";
    readonly outputs: readonly [{
        readonly name: "blockNumber";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "blockHash";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }, {
        readonly name: "returnData";
        readonly internalType: "struct IMulticall3.Result[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "success";
            readonly internalType: "bool";
            readonly type: "bool";
        }, {
            readonly name: "returnData";
            readonly internalType: "bytes";
            readonly type: "bytes";
        }];
    }];
}];
export declare const iOracleABI: readonly [{
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_nftAddress";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_asset";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "getPrice";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct IOracle.PriceUpdate";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "price";
            readonly internalType: "uint128";
            readonly type: "uint128";
        }, {
            readonly name: "updatedTimestamp";
            readonly internalType: "uint128";
            readonly type: "uint128";
        }];
    }];
}];
export declare const multiSourceCommonsABI: readonly [{
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
        readonly indexed: false;
    }];
    readonly name: "log";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "log_address";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "val";
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
        readonly indexed: false;
    }];
    readonly name: "log_array";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "val";
        readonly internalType: "int256[]";
        readonly type: "int256[]";
        readonly indexed: false;
    }];
    readonly name: "log_array";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "val";
        readonly internalType: "address[]";
        readonly type: "address[]";
        readonly indexed: false;
    }];
    readonly name: "log_array";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes";
        readonly type: "bytes";
        readonly indexed: false;
    }];
    readonly name: "log_bytes";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
        readonly indexed: false;
    }];
    readonly name: "log_bytes32";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "int256";
        readonly type: "int256";
        readonly indexed: false;
    }];
    readonly name: "log_int";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "key";
        readonly internalType: "string";
        readonly type: "string";
        readonly indexed: false;
    }, {
        readonly name: "val";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "log_named_address";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "key";
        readonly internalType: "string";
        readonly type: "string";
        readonly indexed: false;
    }, {
        readonly name: "val";
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
        readonly indexed: false;
    }];
    readonly name: "log_named_array";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "key";
        readonly internalType: "string";
        readonly type: "string";
        readonly indexed: false;
    }, {
        readonly name: "val";
        readonly internalType: "int256[]";
        readonly type: "int256[]";
        readonly indexed: false;
    }];
    readonly name: "log_named_array";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "key";
        readonly internalType: "string";
        readonly type: "string";
        readonly indexed: false;
    }, {
        readonly name: "val";
        readonly internalType: "address[]";
        readonly type: "address[]";
        readonly indexed: false;
    }];
    readonly name: "log_named_array";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "key";
        readonly internalType: "string";
        readonly type: "string";
        readonly indexed: false;
    }, {
        readonly name: "val";
        readonly internalType: "bytes";
        readonly type: "bytes";
        readonly indexed: false;
    }];
    readonly name: "log_named_bytes";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "key";
        readonly internalType: "string";
        readonly type: "string";
        readonly indexed: false;
    }, {
        readonly name: "val";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
        readonly indexed: false;
    }];
    readonly name: "log_named_bytes32";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "key";
        readonly internalType: "string";
        readonly type: "string";
        readonly indexed: false;
    }, {
        readonly name: "val";
        readonly internalType: "int256";
        readonly type: "int256";
        readonly indexed: false;
    }, {
        readonly name: "decimals";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "log_named_decimal_int";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "key";
        readonly internalType: "string";
        readonly type: "string";
        readonly indexed: false;
    }, {
        readonly name: "val";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "decimals";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "log_named_decimal_uint";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "key";
        readonly internalType: "string";
        readonly type: "string";
        readonly indexed: false;
    }, {
        readonly name: "val";
        readonly internalType: "int256";
        readonly type: "int256";
        readonly indexed: false;
    }];
    readonly name: "log_named_int";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "key";
        readonly internalType: "string";
        readonly type: "string";
        readonly indexed: false;
    }, {
        readonly name: "val";
        readonly internalType: "string";
        readonly type: "string";
        readonly indexed: false;
    }];
    readonly name: "log_named_string";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "key";
        readonly internalType: "string";
        readonly type: "string";
        readonly indexed: false;
    }, {
        readonly name: "val";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "log_named_uint";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
        readonly indexed: false;
    }];
    readonly name: "log_string";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "log_uint";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes";
        readonly type: "bytes";
        readonly indexed: false;
    }];
    readonly name: "logs";
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "IS_TEST";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "failed";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "setUp";
    readonly outputs: readonly [];
}];
export declare const multiSourceLoanABI: readonly [{
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
    readonly inputs: readonly [{
        readonly name: "loanLiquidator";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "protocolFee";
        readonly internalType: "struct IBaseLoan.ProtocolFee";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "recipient";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "fraction";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }, {
        readonly name: "currencyManager";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "collectionManager";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "maxSources";
        readonly internalType: "uint8";
        readonly type: "uint8";
    }];
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "AddressZeroError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_lender";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_offerId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "CancelledOrExecutedOfferError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_lender";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_offerId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "CancelledRenegotiationOffer";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_lender";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_renegotiationId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "CancelledRenegotiationOfferError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "CannotLiquidateError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "CollectionNotWhitelistedError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "CurrencyNotWhitelistedError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "ExpiredLoanError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_expirationTime";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "ExpiredOfferError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_expirationTime";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "ExpiredRenegotiationOfferError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidBorrowerError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidCallbackError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidCollateralIdError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidLiquidationError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_loanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "InvalidLoanError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_fraction";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "InvalidProtocolFeeError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidRenegotiationOfferError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidSignatureError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidSignerError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "LengthMismatchError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_liquidator";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "LiquidatorOnlyError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "LoanExpiredError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_expirationTime";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "LoanNotDueError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_loanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "LoanNotFoundError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_lender";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_newMinOfferId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_minOfferId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "LowOfferIdError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_lender";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_newMinRenegotiationOfferId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_minOfferId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "LowRenegotiationOfferIdError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "MaxCapacityExceededError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_id";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "NotMintedError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "NotStrictlyImprovedError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "OnlyBorrowerCallableError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "OnlyLenderOrSignerCallableError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "PartialOfferCannotChangeDurationError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "PartialOfferCannotHaveFeeError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "RefinanceFullError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "RepaymentError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "sourcePrincipal";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "loanPrincipal";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "TargetPrincipalTooLowError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_pendingProtocolFeeSetTime";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "TooEarlyError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "sources";
        readonly internalType: "uint8";
        readonly type: "uint8";
    }];
    readonly name: "TooManySourcesError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "Unauthorized";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_authorized";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "UnauthorizedError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "ZeroAddressError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "ZeroDurationError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "ZeroInterestError";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "lender";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "minOfferId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "AllOffersCancelled";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "lender";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "minRenegotiationId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "AllRenegotiationOffersCancelled";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "lender";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "signer";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "ApprovedSigner";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "minimum";
        readonly internalType: "struct IBaseLoan.ImprovementMinimum";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "interest";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
        readonly indexed: false;
    }];
    readonly name: "ImprovementMinimumUpdated";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "newDuration";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "LiquidationAuctionDurationUpdated";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "liquidator";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "LiquidationContractUpdated";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "loanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "offerId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "loan";
        readonly internalType: "struct IMultiSourceLoan.Loan";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "borrower";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "nftCollateralTokenId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "nftCollateralAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "startTime";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "source";
            readonly internalType: "struct IMultiSourceLoan.Source[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "accruedInterest";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "startTime";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "aprBps";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }];
        }];
        readonly indexed: false;
    }, {
        readonly name: "fee";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "LoanEmitted";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "loanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "LoanForeclosed";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "loanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "repayment";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "LoanLiquidated";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "renegotiationId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "oldLoanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "newLoanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "loan";
        readonly internalType: "struct IMultiSourceLoan.Loan";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "borrower";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "nftCollateralTokenId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "nftCollateralAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "startTime";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "source";
            readonly internalType: "struct IMultiSourceLoan.Source[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "accruedInterest";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "startTime";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "aprBps";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }];
        }];
        readonly indexed: false;
    }, {
        readonly name: "fee";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "LoanRefinanced";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "loanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "totalRepayment";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "fee";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "LoanRepaid";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "loanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "liquidator";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "LoanSentToLiquidator";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "newMax";
        readonly internalType: "uint8";
        readonly type: "uint8";
        readonly indexed: false;
    }];
    readonly name: "MaxSourcesUpdated";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "lender";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "offerId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "OfferCancelled";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "user";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }];
    readonly name: "OwnershipTransferred";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "fee";
        readonly internalType: "struct IBaseLoan.ProtocolFee";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "recipient";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "fraction";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
        readonly indexed: false;
    }];
    readonly name: "ProtocolFeePendingUpdate";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "fee";
        readonly internalType: "struct IBaseLoan.ProtocolFee";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "recipient";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "fraction";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
        readonly indexed: false;
    }];
    readonly name: "ProtocolFeeUpdated";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "lender";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "renegotiationId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "RenegotiationOfferCancelled";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "contract_added";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "WhitelistedCallbackContractAdded";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "contract_removed";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "WhitelistedCallbackContractRemoved";
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "DOMAIN_SEPARATOR";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "FEE_UPDATE_NOTICE";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "INITIAL_DOMAIN_SEPARATOR";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "MAX_PROTOCOL_FEE";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_contract";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "addWhitelistedCallbackContract";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_signer";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "approveSigner";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_lender";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_minOfferId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "cancelAllOffers";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_lender";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_minRenegotiationId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "cancelAllRenegotiationOffers";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_lender";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_offerId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "cancelOffer";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_lender";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_offerIds";
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
    }];
    readonly name: "cancelOffers";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_lender";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_renegotiationId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "cancelRenegotiationOffer";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_lender";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_renegotiationIds";
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
    }];
    readonly name: "cancelRenegotiationOffers";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_loanOffer";
        readonly internalType: "struct IBaseLoan.LoanOffer";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "offerId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "lender";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "fee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "borrower";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "capacity";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "signer";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "requiresLiquidation";
            readonly internalType: "bool";
            readonly type: "bool";
        }, {
            readonly name: "nftCollateralAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "nftCollateralTokenId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "principalAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "aprBps";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "expirationTime";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "validators";
            readonly internalType: "struct IBaseLoan.OfferValidator[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "validator";
                readonly internalType: "address";
                readonly type: "address";
            }, {
                readonly name: "arguments";
                readonly internalType: "bytes";
                readonly type: "bytes";
            }];
        }];
    }, {
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_lenderOfferSignature";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }, {
        readonly name: "_withCallback";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly name: "emitLoan";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "";
        readonly internalType: "struct IMultiSourceLoan.Loan";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "borrower";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "nftCollateralTokenId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "nftCollateralAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "startTime";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "source";
            readonly internalType: "struct IMultiSourceLoan.Source[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "accruedInterest";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "startTime";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "aprBps";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }];
        }];
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "getApprovedSigner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getCollectionManager";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getCurrencyManager";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getImprovementMinimum";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct IBaseLoan.ImprovementMinimum";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "interest";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getLiquidationAuctionDuration";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint48";
        readonly type: "uint48";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getLiquidator";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_loanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "getLoanHash";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getMaxSources";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint8";
        readonly type: "uint8";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_loanPrincipal";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "getMinSourcePrincipal";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getPendingProtocolFee";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct IBaseLoan.ProtocolFee";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "recipient";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "fraction";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getPendingProtocolFeeSetTime";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getProtocolFee";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct IBaseLoan.ProtocolFee";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "recipient";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "fraction";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getTotalLoansIssued";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_lender";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_offerId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "getUsedCapacity";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "isOfferCancelled";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "isRenegotiationOfferCancelled";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_contract";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "isWhitelistedCallbackContract";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "lenderMinOfferId";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "lenderMinRenegotiationOfferId";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_loanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_loan";
        readonly internalType: "struct IMultiSourceLoan.Loan";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "borrower";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "nftCollateralTokenId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "nftCollateralAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "startTime";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "source";
            readonly internalType: "struct IMultiSourceLoan.Source[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "accruedInterest";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "startTime";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "aprBps";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }];
        }];
    }];
    readonly name: "liquidateLoan";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_collateralAddress";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_collateralTokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_loanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_repayment";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_loan";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly name: "loanLiquidated";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "name";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly name: "onERC721Received";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes4";
        readonly type: "bytes4";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "owner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_renegotiationOffer";
        readonly internalType: "struct IMultiSourceLoan.RenegotiationOffer";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "renegotiationId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "loanId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "lender";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "fee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "signer";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "targetPrincipal";
            readonly internalType: "uint256[]";
            readonly type: "uint256[]";
        }, {
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "aprBps";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "expirationTime";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "strictImprovement";
            readonly internalType: "bool";
            readonly type: "bool";
        }];
    }, {
        readonly name: "_loan";
        readonly internalType: "struct IMultiSourceLoan.Loan";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "borrower";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "nftCollateralTokenId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "nftCollateralAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "startTime";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "source";
            readonly internalType: "struct IMultiSourceLoan.Source[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "accruedInterest";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "startTime";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "aprBps";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }];
        }];
    }, {
        readonly name: "_renegotiationOfferSignature";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly name: "refinanceFull";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "";
        readonly internalType: "struct IMultiSourceLoan.Loan";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "borrower";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "nftCollateralTokenId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "nftCollateralAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "startTime";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "source";
            readonly internalType: "struct IMultiSourceLoan.Source[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "accruedInterest";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "startTime";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "aprBps";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }];
        }];
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_renegotiationOffer";
        readonly internalType: "struct IMultiSourceLoan.RenegotiationOffer";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "renegotiationId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "loanId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "lender";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "fee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "signer";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "targetPrincipal";
            readonly internalType: "uint256[]";
            readonly type: "uint256[]";
        }, {
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "aprBps";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "expirationTime";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "strictImprovement";
            readonly internalType: "bool";
            readonly type: "bool";
        }];
    }, {
        readonly name: "_loan";
        readonly internalType: "struct IMultiSourceLoan.Loan";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "borrower";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "nftCollateralTokenId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "nftCollateralAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "startTime";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "source";
            readonly internalType: "struct IMultiSourceLoan.Source[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "accruedInterest";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "startTime";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "aprBps";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }];
        }];
    }];
    readonly name: "refinancePartial";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "";
        readonly internalType: "struct IMultiSourceLoan.Loan";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "borrower";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "nftCollateralTokenId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "nftCollateralAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "startTime";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "source";
            readonly internalType: "struct IMultiSourceLoan.Source[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "accruedInterest";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "startTime";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "aprBps";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }];
        }];
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_renegotiationOffer";
        readonly internalType: "struct IMultiSourceLoan.RenegotiationOffer[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "renegotiationId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "loanId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "lender";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "fee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "signer";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "targetPrincipal";
            readonly internalType: "uint256[]";
            readonly type: "uint256[]";
        }, {
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "aprBps";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "expirationTime";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "strictImprovement";
            readonly internalType: "bool";
            readonly type: "bool";
        }];
    }, {
        readonly name: "_loan";
        readonly internalType: "struct IMultiSourceLoan.Loan[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "borrower";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "nftCollateralTokenId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "nftCollateralAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "startTime";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "source";
            readonly internalType: "struct IMultiSourceLoan.Source[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "accruedInterest";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "startTime";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "aprBps";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }];
        }];
    }];
    readonly name: "refinancePartialBatch";
    readonly outputs: readonly [{
        readonly name: "loanId";
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
    }, {
        readonly name: "loans";
        readonly internalType: "struct IMultiSourceLoan.Loan[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "borrower";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "nftCollateralTokenId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "nftCollateralAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "startTime";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "source";
            readonly internalType: "struct IMultiSourceLoan.Source[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "accruedInterest";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "startTime";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "aprBps";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }];
        }];
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_contract";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "removeWhitelistedCallbackContract";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_collateralTo";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_loanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_loan";
        readonly internalType: "struct IMultiSourceLoan.Loan";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "borrower";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "nftCollateralTokenId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "nftCollateralAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "startTime";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "source";
            readonly internalType: "struct IMultiSourceLoan.Source[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "accruedInterest";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "startTime";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "aprBps";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }];
        }];
    }, {
        readonly name: "_withCallback";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly name: "repayLoan";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "maxSources";
        readonly internalType: "uint8";
        readonly type: "uint8";
    }];
    readonly name: "setMaxSources";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "setProtocolFee";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newMinimum";
        readonly internalType: "struct IBaseLoan.ImprovementMinimum";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "interest";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly name: "updateImprovementMinimum";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newDuration";
        readonly internalType: "uint48";
        readonly type: "uint48";
    }];
    readonly name: "updateLiquidationAuctionDuration";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "loanLiquidator";
        readonly internalType: "contract ILoanLiquidator";
        readonly type: "address";
    }];
    readonly name: "updateLiquidationContract";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newProtocolFee";
        readonly internalType: "struct IBaseLoan.ProtocolFee";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "recipient";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "fraction";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly name: "updateProtocolFee";
    readonly outputs: readonly [];
}];
export declare const nftPackedListValidatorABI: readonly [{
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "EmptyTokenIdListError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_bytesPerTokenId";
        readonly internalType: "uint64";
        readonly type: "uint64";
    }];
    readonly name: "InvalidBytesPerTokenIdError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "TokenIdNotFoundError";
}, {
    readonly stateMutability: "pure";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "struct IBaseLoan.LoanOffer";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "offerId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "lender";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "fee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "borrower";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "capacity";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "signer";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "requiresLiquidation";
            readonly internalType: "bool";
            readonly type: "bool";
        }, {
            readonly name: "nftCollateralAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "nftCollateralTokenId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "principalAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "aprBps";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "expirationTime";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "validators";
            readonly internalType: "struct IBaseLoan.OfferValidator[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "validator";
                readonly internalType: "address";
                readonly type: "address";
            }, {
                readonly name: "arguments";
                readonly internalType: "bytes";
                readonly type: "bytes";
            }];
        }];
    }, {
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_validatorData";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly name: "validateOffer";
    readonly outputs: readonly [];
}];
export declare const nftBitVectorValidatorABI: readonly [{
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "BitVectorLengthExceededError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "TokenIdNotFoundError";
}, {
    readonly stateMutability: "pure";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "struct IBaseLoan.LoanOffer";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "offerId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "lender";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "fee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "borrower";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "capacity";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "signer";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "requiresLiquidation";
            readonly internalType: "bool";
            readonly type: "bool";
        }, {
            readonly name: "nftCollateralAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "nftCollateralTokenId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "principalAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "aprBps";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "expirationTime";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "validators";
            readonly internalType: "struct IBaseLoan.OfferValidator[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "validator";
                readonly internalType: "address";
                readonly type: "address";
            }, {
                readonly name: "arguments";
                readonly internalType: "bytes";
                readonly type: "bytes";
            }];
        }];
    }, {
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_validatorData";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly name: "validateOffer";
    readonly outputs: readonly [];
}];
export declare const rangeValidatorABI: readonly [{
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "min";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "max";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "TokenIdOutOfRangeError";
}, {
    readonly stateMutability: "pure";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "struct IBaseLoan.LoanOffer";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "offerId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "lender";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "fee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "borrower";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "capacity";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "signer";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "requiresLiquidation";
            readonly internalType: "bool";
            readonly type: "bool";
        }, {
            readonly name: "nftCollateralAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "nftCollateralTokenId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "principalAddress";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "principalAmount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "aprBps";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "expirationTime";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "duration";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "validators";
            readonly internalType: "struct IBaseLoan.OfferValidator[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "validator";
                readonly internalType: "address";
                readonly type: "address";
            }, {
                readonly name: "arguments";
                readonly internalType: "bytes";
                readonly type: "bytes";
            }];
        }];
    }, {
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_validatorData";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly name: "validateOffer";
    readonly outputs: readonly [];
}];
export declare const ownedABI: readonly [{
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "user";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }];
    readonly name: "OwnershipTransferred";
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "owner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
}];
export declare const sampleCollectionABI: readonly [{
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
    readonly inputs: readonly [];
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "spender";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "id";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: true;
    }];
    readonly name: "Approval";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "operator";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "approved";
        readonly internalType: "bool";
        readonly type: "bool";
        readonly indexed: false;
    }];
    readonly name: "ApprovalForAll";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "from";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "id";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: true;
    }];
    readonly name: "Transfer";
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "spender";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "id";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "approve";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "balanceOf";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "getApproved";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "isApprovedForAll";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "lastId";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "id";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "mint";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "mintNext";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "name";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "id";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "ownerOf";
    readonly outputs: readonly [{
        readonly name: "owner";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "from";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "id";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "safeTransferFrom";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "from";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "id";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "data";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly name: "safeTransferFrom";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "operator";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "approved";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly name: "setApprovalForAll";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "interfaceId";
        readonly internalType: "bytes4";
        readonly type: "bytes4";
    }];
    readonly name: "supportsInterface";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "symbol";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
}, {
    readonly stateMutability: "pure";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "id";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "tokenURI";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "from";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "id";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "transferFrom";
    readonly outputs: readonly [];
}];
export declare const sampleTokenABI: readonly [{
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "spender";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "amount";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "Approval";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "from";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "amount";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "Transfer";
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "DOMAIN_SEPARATOR";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "allowance";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "spender";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "amount";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "approve";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "balanceOf";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "decimals";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint8";
        readonly type: "uint8";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "amount";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "mint";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "name";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "nonces";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "spender";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "value";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "deadline";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "v";
        readonly internalType: "uint8";
        readonly type: "uint8";
    }, {
        readonly name: "r";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }, {
        readonly name: "s";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
    readonly name: "permit";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "symbol";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "totalSupply";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "amount";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "transfer";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "from";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "amount";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "transferFrom";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}];
export declare const testLoanSetupABI: readonly [{
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
        readonly indexed: false;
    }];
    readonly name: "log";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "log_address";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "val";
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
        readonly indexed: false;
    }];
    readonly name: "log_array";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "val";
        readonly internalType: "int256[]";
        readonly type: "int256[]";
        readonly indexed: false;
    }];
    readonly name: "log_array";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "val";
        readonly internalType: "address[]";
        readonly type: "address[]";
        readonly indexed: false;
    }];
    readonly name: "log_array";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes";
        readonly type: "bytes";
        readonly indexed: false;
    }];
    readonly name: "log_bytes";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
        readonly indexed: false;
    }];
    readonly name: "log_bytes32";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "int256";
        readonly type: "int256";
        readonly indexed: false;
    }];
    readonly name: "log_int";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "key";
        readonly internalType: "string";
        readonly type: "string";
        readonly indexed: false;
    }, {
        readonly name: "val";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "log_named_address";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "key";
        readonly internalType: "string";
        readonly type: "string";
        readonly indexed: false;
    }, {
        readonly name: "val";
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
        readonly indexed: false;
    }];
    readonly name: "log_named_array";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "key";
        readonly internalType: "string";
        readonly type: "string";
        readonly indexed: false;
    }, {
        readonly name: "val";
        readonly internalType: "int256[]";
        readonly type: "int256[]";
        readonly indexed: false;
    }];
    readonly name: "log_named_array";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "key";
        readonly internalType: "string";
        readonly type: "string";
        readonly indexed: false;
    }, {
        readonly name: "val";
        readonly internalType: "address[]";
        readonly type: "address[]";
        readonly indexed: false;
    }];
    readonly name: "log_named_array";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "key";
        readonly internalType: "string";
        readonly type: "string";
        readonly indexed: false;
    }, {
        readonly name: "val";
        readonly internalType: "bytes";
        readonly type: "bytes";
        readonly indexed: false;
    }];
    readonly name: "log_named_bytes";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "key";
        readonly internalType: "string";
        readonly type: "string";
        readonly indexed: false;
    }, {
        readonly name: "val";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
        readonly indexed: false;
    }];
    readonly name: "log_named_bytes32";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "key";
        readonly internalType: "string";
        readonly type: "string";
        readonly indexed: false;
    }, {
        readonly name: "val";
        readonly internalType: "int256";
        readonly type: "int256";
        readonly indexed: false;
    }, {
        readonly name: "decimals";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "log_named_decimal_int";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "key";
        readonly internalType: "string";
        readonly type: "string";
        readonly indexed: false;
    }, {
        readonly name: "val";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "decimals";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "log_named_decimal_uint";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "key";
        readonly internalType: "string";
        readonly type: "string";
        readonly indexed: false;
    }, {
        readonly name: "val";
        readonly internalType: "int256";
        readonly type: "int256";
        readonly indexed: false;
    }];
    readonly name: "log_named_int";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "key";
        readonly internalType: "string";
        readonly type: "string";
        readonly indexed: false;
    }, {
        readonly name: "val";
        readonly internalType: "string";
        readonly type: "string";
        readonly indexed: false;
    }];
    readonly name: "log_named_string";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "key";
        readonly internalType: "string";
        readonly type: "string";
        readonly indexed: false;
    }, {
        readonly name: "val";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "log_named_uint";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
        readonly indexed: false;
    }];
    readonly name: "log_string";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "log_uint";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes";
        readonly type: "bytes";
        readonly indexed: false;
    }];
    readonly name: "logs";
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "IS_TEST";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "failed";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}];
export declare const validatorHelpersABI: readonly [{
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "BitVectorLengthExceededError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "EmptyTokenIdListError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_bytesPerTokenId";
        readonly internalType: "uint64";
        readonly type: "uint64";
    }];
    readonly name: "InvalidBytesPerTokenIdError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "TokenIdNotFoundError";
}];
