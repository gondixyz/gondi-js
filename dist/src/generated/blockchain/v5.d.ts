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
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "AddressZeroError";
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
export declare const auctionLoanLiquidatorABI: readonly [{
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
    readonly inputs: readonly [{
        readonly name: "liquidationDistributor";
        readonly internalType: "address";
        readonly type: "address";
    }, {
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
    readonly name: "AddressZeroError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "AuctionAlreadyInProgressError";
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
    readonly name: "CouldNotModifyValidLoansError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "CurrencyNotWhitelistedError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidHashAuctionError";
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
        readonly name: "proceeds";
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
        readonly name: "collection";
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
        readonly name: "liquidationDistributor";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "LiquidationDistributorUpdated";
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
        readonly name: "collection";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "auction";
        readonly internalType: "struct IAuctionLoanLiquidator.Auction";
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
            readonly name: "triggerFee";
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
    readonly name: "getAuctionHash";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getLiquidationDistributor";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
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
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes";
        readonly type: "bytes";
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
    }, {
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_auction";
        readonly internalType: "struct IAuctionLoanLiquidator.Auction";
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
            readonly name: "triggerFee";
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
    }, {
        readonly name: "_bid";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "placeBid";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct IAuctionLoanLiquidator.Auction";
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
            readonly name: "triggerFee";
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
        readonly name: "_auction";
        readonly internalType: "struct IAuctionLoanLiquidator.Auction";
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
            readonly name: "triggerFee";
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
        readonly name: "__liquidationDistributor";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "updateLiquidationDistributor";
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
    readonly inputs: readonly [{
        readonly name: "_amount";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_principalAmount";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "InvalidAmountError";
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
    readonly name: "InvalidDurationError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidLenderError";
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
    readonly name: "InvalidValueError";
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
    readonly inputs: readonly [];
    readonly name: "NotStrictlyImprovedError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "OnlyBorrowerCallableError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "OnlyLenderCallableError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "OnlyLenderOrBorrowerCallableError";
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
        readonly name: "borrower";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "offerId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "BorrowerOfferCancelled";
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
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "MIN_AUCTION_DURATION";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint48";
        readonly type: "uint48";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
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
        readonly name: "_renegotiationIds";
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
    }];
    readonly name: "cancelRenegotiationOffers";
    readonly outputs: readonly [];
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
    readonly name: "isBorrowerOfferCancelled";
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
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "minOfferId";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
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
export declare const ecdsaABI: readonly [{
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "ECDSAInvalidSignature";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "length";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "ECDSAInvalidSignatureLength";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "s";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
    readonly name: "ECDSAInvalidSignatureS";
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
export declare const delegateRegistryABI: readonly [{
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "MulticallFailed";
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
        readonly name: "rights";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
        readonly indexed: false;
    }, {
        readonly name: "enable";
        readonly internalType: "bool";
        readonly type: "bool";
        readonly indexed: false;
    }];
    readonly name: "DelegateAll";
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
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "rights";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
        readonly indexed: false;
    }, {
        readonly name: "enable";
        readonly internalType: "bool";
        readonly type: "bool";
        readonly indexed: false;
    }];
    readonly name: "DelegateContract";
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
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "rights";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
        readonly indexed: false;
    }, {
        readonly name: "amount";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "DelegateERC1155";
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
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "rights";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
        readonly indexed: false;
    }, {
        readonly name: "amount";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "DelegateERC20";
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
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "rights";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
        readonly indexed: false;
    }, {
        readonly name: "enable";
        readonly internalType: "bool";
        readonly type: "bool";
        readonly indexed: false;
    }];
    readonly name: "DelegateERC721";
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "from";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "rights";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
    readonly name: "checkDelegateForAll";
    readonly outputs: readonly [{
        readonly name: "valid";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "from";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "rights";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
    readonly name: "checkDelegateForContract";
    readonly outputs: readonly [{
        readonly name: "valid";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "from";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "rights";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
    readonly name: "checkDelegateForERC1155";
    readonly outputs: readonly [{
        readonly name: "amount";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "from";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "rights";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
    readonly name: "checkDelegateForERC20";
    readonly outputs: readonly [{
        readonly name: "amount";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "from";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "rights";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
    readonly name: "checkDelegateForERC721";
    readonly outputs: readonly [{
        readonly name: "valid";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}, {
    readonly stateMutability: "payable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "rights";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }, {
        readonly name: "enable";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly name: "delegateAll";
    readonly outputs: readonly [{
        readonly name: "hash";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
}, {
    readonly stateMutability: "payable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "rights";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }, {
        readonly name: "enable";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly name: "delegateContract";
    readonly outputs: readonly [{
        readonly name: "hash";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
}, {
    readonly stateMutability: "payable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "rights";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }, {
        readonly name: "amount";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "delegateERC1155";
    readonly outputs: readonly [{
        readonly name: "hash";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
}, {
    readonly stateMutability: "payable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "rights";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }, {
        readonly name: "amount";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "delegateERC20";
    readonly outputs: readonly [{
        readonly name: "hash";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
}, {
    readonly stateMutability: "payable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "rights";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }, {
        readonly name: "enable";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly name: "delegateERC721";
    readonly outputs: readonly [{
        readonly name: "hash";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "hashes";
        readonly internalType: "bytes32[]";
        readonly type: "bytes32[]";
    }];
    readonly name: "getDelegationsFromHashes";
    readonly outputs: readonly [{
        readonly name: "delegations_";
        readonly internalType: "struct IDelegateRegistry.Delegation[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "type_";
            readonly internalType: "enum IDelegateRegistry.DelegationType";
            readonly type: "uint8";
        }, {
            readonly name: "to";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "from";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "rights";
            readonly internalType: "bytes32";
            readonly type: "bytes32";
        }, {
            readonly name: "contract_";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "tokenId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "amount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "getIncomingDelegationHashes";
    readonly outputs: readonly [{
        readonly name: "delegationHashes";
        readonly internalType: "bytes32[]";
        readonly type: "bytes32[]";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "getIncomingDelegations";
    readonly outputs: readonly [{
        readonly name: "delegations_";
        readonly internalType: "struct IDelegateRegistry.Delegation[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "type_";
            readonly internalType: "enum IDelegateRegistry.DelegationType";
            readonly type: "uint8";
        }, {
            readonly name: "to";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "from";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "rights";
            readonly internalType: "bytes32";
            readonly type: "bytes32";
        }, {
            readonly name: "contract_";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "tokenId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "amount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "from";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "getOutgoingDelegationHashes";
    readonly outputs: readonly [{
        readonly name: "delegationHashes";
        readonly internalType: "bytes32[]";
        readonly type: "bytes32[]";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "from";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "getOutgoingDelegations";
    readonly outputs: readonly [{
        readonly name: "delegations_";
        readonly internalType: "struct IDelegateRegistry.Delegation[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "type_";
            readonly internalType: "enum IDelegateRegistry.DelegationType";
            readonly type: "uint8";
        }, {
            readonly name: "to";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "from";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "rights";
            readonly internalType: "bytes32";
            readonly type: "bytes32";
        }, {
            readonly name: "contract_";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "tokenId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "amount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
}, {
    readonly stateMutability: "payable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "data";
        readonly internalType: "bytes[]";
        readonly type: "bytes[]";
    }];
    readonly name: "multicall";
    readonly outputs: readonly [{
        readonly name: "results";
        readonly internalType: "bytes[]";
        readonly type: "bytes[]";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "location";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
    readonly name: "readSlot";
    readonly outputs: readonly [{
        readonly name: "contents";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "locations";
        readonly internalType: "bytes32[]";
        readonly type: "bytes32[]";
    }];
    readonly name: "readSlots";
    readonly outputs: readonly [{
        readonly name: "contents";
        readonly internalType: "bytes32[]";
        readonly type: "bytes32[]";
    }];
}, {
    readonly stateMutability: "pure";
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
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "sweep";
    readonly outputs: readonly [];
}];
export declare const delegationRegistryABI: readonly [{
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "vault";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "delegate";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "value";
        readonly internalType: "bool";
        readonly type: "bool";
        readonly indexed: false;
    }];
    readonly name: "DelegateForAll";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "vault";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "delegate";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "value";
        readonly internalType: "bool";
        readonly type: "bool";
        readonly indexed: false;
    }];
    readonly name: "DelegateForContract";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "vault";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "delegate";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "value";
        readonly internalType: "bool";
        readonly type: "bool";
        readonly indexed: false;
    }];
    readonly name: "DelegateForToken";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "vault";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "RevokeAllDelegates";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "vault";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "delegate";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "RevokeDelegate";
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "delegate";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "vault";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "checkDelegateForAll";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "delegate";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "vault";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "checkDelegateForContract";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "delegate";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "vault";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "checkDelegateForToken";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "delegate";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "value";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly name: "delegateForAll";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "delegate";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "value";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly name: "delegateForContract";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "delegate";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "value";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly name: "delegateForToken";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "vault";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "getContractLevelDelegations";
    readonly outputs: readonly [{
        readonly name: "contractDelegations";
        readonly internalType: "struct IDelegationRegistry.ContractDelegation[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "contract_";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "delegate";
            readonly internalType: "address";
            readonly type: "address";
        }];
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "vault";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "getDelegatesForAll";
    readonly outputs: readonly [{
        readonly name: "delegates";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "vault";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "getDelegatesForContract";
    readonly outputs: readonly [{
        readonly name: "delegates";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "vault";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "getDelegatesForToken";
    readonly outputs: readonly [{
        readonly name: "delegates";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "delegate";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "getDelegationsByDelegate";
    readonly outputs: readonly [{
        readonly name: "info";
        readonly internalType: "struct IDelegationRegistry.DelegationInfo[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "type_";
            readonly internalType: "enum IDelegationRegistry.DelegationType";
            readonly type: "uint8";
        }, {
            readonly name: "vault";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "delegate";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "contract_";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "tokenId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "vault";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "getTokenLevelDelegations";
    readonly outputs: readonly [{
        readonly name: "tokenDelegations";
        readonly internalType: "struct IDelegationRegistry.TokenDelegation[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "contract_";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "tokenId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "delegate";
            readonly internalType: "address";
            readonly type: "address";
        }];
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "revokeAllDelegates";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "delegate";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "revokeDelegate";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "vault";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "revokeSelf";
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
}];
export declare const iAuctionLoanLiquidatorABI: readonly [{
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
    readonly name: "getAuctionHash";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getLiquidationDistributor";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
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
        readonly name: "_contract";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_auction";
        readonly internalType: "struct IAuctionLoanLiquidator.Auction";
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
            readonly name: "triggerFee";
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
    }, {
        readonly name: "_bid";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "placeBid";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct IAuctionLoanLiquidator.Auction";
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
            readonly name: "triggerFee";
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
        readonly name: "_auction";
        readonly internalType: "struct IAuctionLoanLiquidator.Auction";
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
            readonly name: "triggerFee";
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
    readonly name: "settleAuction";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_liquidationDistributor";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "updateLiquidationDistributor";
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
export declare const iBaseLoanABI: readonly [{
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
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
        readonly name: "_renegotiationIds";
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
    }];
    readonly name: "cancelRenegotiationOffers";
    readonly outputs: readonly [];
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
export declare const iCryptoPunksMarketABI: readonly [{
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "user";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "pendingWithdrawals";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "punkIndex";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "punkBids";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct ICryptoPunksMarket.Bid";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "hasBid";
            readonly internalType: "bool";
            readonly type: "bool";
        }, {
            readonly name: "punkIndex";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "bidder";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "value";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "punkIndex";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "punkIndexToAddress";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "punkIndex";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "transferPunk";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "withdraw";
    readonly outputs: readonly [];
}];
export declare const iDelegateRegistryABI: readonly [{
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "MulticallFailed";
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
        readonly name: "rights";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
        readonly indexed: false;
    }, {
        readonly name: "enable";
        readonly internalType: "bool";
        readonly type: "bool";
        readonly indexed: false;
    }];
    readonly name: "DelegateAll";
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
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "rights";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
        readonly indexed: false;
    }, {
        readonly name: "enable";
        readonly internalType: "bool";
        readonly type: "bool";
        readonly indexed: false;
    }];
    readonly name: "DelegateContract";
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
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "rights";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
        readonly indexed: false;
    }, {
        readonly name: "amount";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "DelegateERC1155";
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
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "rights";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
        readonly indexed: false;
    }, {
        readonly name: "amount";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "DelegateERC20";
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
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "rights";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
        readonly indexed: false;
    }, {
        readonly name: "enable";
        readonly internalType: "bool";
        readonly type: "bool";
        readonly indexed: false;
    }];
    readonly name: "DelegateERC721";
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "from";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "rights";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
    readonly name: "checkDelegateForAll";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "from";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "rights";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
    readonly name: "checkDelegateForContract";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "from";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "rights";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
    readonly name: "checkDelegateForERC1155";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "from";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "rights";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
    readonly name: "checkDelegateForERC20";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "from";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "rights";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
    readonly name: "checkDelegateForERC721";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}, {
    readonly stateMutability: "payable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "rights";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }, {
        readonly name: "enable";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly name: "delegateAll";
    readonly outputs: readonly [{
        readonly name: "delegationHash";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
}, {
    readonly stateMutability: "payable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "rights";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }, {
        readonly name: "enable";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly name: "delegateContract";
    readonly outputs: readonly [{
        readonly name: "delegationHash";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
}, {
    readonly stateMutability: "payable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "rights";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }, {
        readonly name: "amount";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "delegateERC1155";
    readonly outputs: readonly [{
        readonly name: "delegationHash";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
}, {
    readonly stateMutability: "payable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "rights";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }, {
        readonly name: "amount";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "delegateERC20";
    readonly outputs: readonly [{
        readonly name: "delegationHash";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
}, {
    readonly stateMutability: "payable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "rights";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }, {
        readonly name: "enable";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly name: "delegateERC721";
    readonly outputs: readonly [{
        readonly name: "delegationHash";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "delegationHashes";
        readonly internalType: "bytes32[]";
        readonly type: "bytes32[]";
    }];
    readonly name: "getDelegationsFromHashes";
    readonly outputs: readonly [{
        readonly name: "delegations";
        readonly internalType: "struct IDelegateRegistry.Delegation[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "type_";
            readonly internalType: "enum IDelegateRegistry.DelegationType";
            readonly type: "uint8";
        }, {
            readonly name: "to";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "from";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "rights";
            readonly internalType: "bytes32";
            readonly type: "bytes32";
        }, {
            readonly name: "contract_";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "tokenId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "amount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "getIncomingDelegationHashes";
    readonly outputs: readonly [{
        readonly name: "delegationHashes";
        readonly internalType: "bytes32[]";
        readonly type: "bytes32[]";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "getIncomingDelegations";
    readonly outputs: readonly [{
        readonly name: "delegations";
        readonly internalType: "struct IDelegateRegistry.Delegation[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "type_";
            readonly internalType: "enum IDelegateRegistry.DelegationType";
            readonly type: "uint8";
        }, {
            readonly name: "to";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "from";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "rights";
            readonly internalType: "bytes32";
            readonly type: "bytes32";
        }, {
            readonly name: "contract_";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "tokenId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "amount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "from";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "getOutgoingDelegationHashes";
    readonly outputs: readonly [{
        readonly name: "delegationHashes";
        readonly internalType: "bytes32[]";
        readonly type: "bytes32[]";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "from";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "getOutgoingDelegations";
    readonly outputs: readonly [{
        readonly name: "delegations";
        readonly internalType: "struct IDelegateRegistry.Delegation[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "type_";
            readonly internalType: "enum IDelegateRegistry.DelegationType";
            readonly type: "uint8";
        }, {
            readonly name: "to";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "from";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "rights";
            readonly internalType: "bytes32";
            readonly type: "bytes32";
        }, {
            readonly name: "contract_";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "tokenId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "amount";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
}, {
    readonly stateMutability: "payable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "data";
        readonly internalType: "bytes[]";
        readonly type: "bytes[]";
    }];
    readonly name: "multicall";
    readonly outputs: readonly [{
        readonly name: "results";
        readonly internalType: "bytes[]";
        readonly type: "bytes[]";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "location";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
    readonly name: "readSlot";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "locations";
        readonly internalType: "bytes32[]";
        readonly type: "bytes32[]";
    }];
    readonly name: "readSlots";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes32[]";
        readonly type: "bytes32[]";
    }];
}];
export declare const iDelegationRegistryABI: readonly [{
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "vault";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "delegate";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "value";
        readonly internalType: "bool";
        readonly type: "bool";
        readonly indexed: false;
    }];
    readonly name: "DelegateForAll";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "vault";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "delegate";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "value";
        readonly internalType: "bool";
        readonly type: "bool";
        readonly indexed: false;
    }];
    readonly name: "DelegateForContract";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "vault";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "delegate";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "value";
        readonly internalType: "bool";
        readonly type: "bool";
        readonly indexed: false;
    }];
    readonly name: "DelegateForToken";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "vault";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "RevokeAllDelegates";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "vault";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "delegate";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "RevokeDelegate";
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "delegate";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "vault";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "checkDelegateForAll";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "delegate";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "vault";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "checkDelegateForContract";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "delegate";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "vault";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "checkDelegateForToken";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "delegate";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "value";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly name: "delegateForAll";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "delegate";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "value";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly name: "delegateForContract";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "delegate";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "value";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly name: "delegateForToken";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "vault";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "getContractLevelDelegations";
    readonly outputs: readonly [{
        readonly name: "delegations";
        readonly internalType: "struct IDelegationRegistry.ContractDelegation[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "contract_";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "delegate";
            readonly internalType: "address";
            readonly type: "address";
        }];
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "vault";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "getDelegatesForAll";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "vault";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "getDelegatesForContract";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "vault";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "contract_";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "getDelegatesForToken";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "delegate";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "getDelegationsByDelegate";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct IDelegationRegistry.DelegationInfo[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "type_";
            readonly internalType: "enum IDelegationRegistry.DelegationType";
            readonly type: "uint8";
        }, {
            readonly name: "vault";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "delegate";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "contract_";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "tokenId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "vault";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "getTokenLevelDelegations";
    readonly outputs: readonly [{
        readonly name: "delegations";
        readonly internalType: "struct IDelegationRegistry.TokenDelegation[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "contract_";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "tokenId";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "delegate";
            readonly internalType: "address";
            readonly type: "address";
        }];
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "revokeAllDelegates";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "delegate";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "revokeDelegate";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "vault";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "revokeSelf";
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
export declare const iLeverageABI: readonly [{
    readonly stateMutability: "payable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_executionData";
        readonly internalType: "bytes[]";
        readonly type: "bytes[]";
    }];
    readonly name: "buy";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
    }, {
        readonly name: "";
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
        readonly name: "_newAddress";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "finalUpdateMultiSourceLoanAddress";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newAddress";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "finalUpdateSeaportAddress";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getMultiSourceLoanAddress";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getSeaportAddress";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_executionData";
        readonly internalType: "bytes[]";
        readonly type: "bytes[]";
    }];
    readonly name: "sell";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newAddress";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "updateMultiSourceLoanAddressFirst";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newAddress";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "updateSeaportAddressFirst";
    readonly outputs: readonly [];
}];
export declare const iLiquidationDistributorABI: readonly [{
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_repayment";
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
    readonly name: "distribute";
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
        readonly name: "_executionData";
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
        readonly name: "_fee";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_executionData";
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
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
}];
export declare const iMultiSourceLoanABI: readonly [{
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
    }, {
        readonly name: "_delegate";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_rights";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }, {
        readonly name: "_value";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly name: "delegate";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_executionData";
        readonly internalType: "struct IMultiSourceLoan.LoanExecutionData";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "executionData";
            readonly internalType: "struct IBaseLoan.ExecutionData";
            readonly type: "tuple";
            readonly components: readonly [{
                readonly name: "offer";
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
                readonly name: "tokenId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "amount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "expirationTime";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "callbackData";
                readonly internalType: "bytes";
                readonly type: "bytes";
            }];
        }, {
            readonly name: "lender";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "borrower";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "lenderOfferSignature";
            readonly internalType: "bytes";
            readonly type: "bytes";
        }, {
            readonly name: "borrowerOfferSignature";
            readonly internalType: "bytes";
            readonly type: "bytes";
        }];
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
    }, {
        readonly name: "_target";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_data";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly name: "executeFlashAction";
    readonly outputs: readonly [];
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
    }, {
        readonly name: "_extension";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "extendLoan";
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
    readonly name: "getDelegateRegistry";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getFlashActionContract";
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
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getMinLockPeriod";
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
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes";
        readonly type: "bytes";
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
    readonly name: "loanLiquidated";
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
        readonly name: "_repaymentData";
        readonly internalType: "struct IMultiSourceLoan.LoanRepaymentData";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "data";
            readonly internalType: "struct IMultiSourceLoan.SignableRepaymentData";
            readonly type: "tuple";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "callbackData";
                readonly internalType: "bytes";
                readonly type: "bytes";
            }, {
                readonly name: "shouldDelegate";
                readonly internalType: "bool";
                readonly type: "bool";
            }];
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
        }, {
            readonly name: "borrowerSignature";
            readonly internalType: "bytes";
            readonly type: "bytes";
        }];
    }];
    readonly name: "repayLoan";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_delegate";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_collection";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "revokeDelegate";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newDelegationRegistry";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "setDelegateRegistry";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newFlashActionContract";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "setFlashActionContract";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "maxSources";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "setMaxSources";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_minLockPeriod";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "setMinLockPeriod";
    readonly outputs: readonly [];
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
export declare const inftFlashActionABI: readonly [{
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidOwnerError";
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_collection";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_target";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_data";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly name: "execute";
    readonly outputs: readonly [];
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
export declare const iReservoirABI: readonly [{
    readonly stateMutability: "payable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_executionInfos";
        readonly internalType: "struct IReservoir.ExecutionInfo[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "module";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "data";
            readonly internalType: "bytes";
            readonly type: "bytes";
        }, {
            readonly name: "value";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly name: "execute";
    readonly outputs: readonly [];
}];
export declare const iUserVaultABI: readonly [{
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_vaultId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_token";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "ERC20BalanceOf";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_collection";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "ERC721OwnerOf";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_vaultId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_assetRecipient";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "burn";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_vaultId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_collections";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }, {
        readonly name: "_tokenIds";
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
    }, {
        readonly name: "_tokens";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
    readonly name: "burnAndWithdraw";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_vaultId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_token";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_amount";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "depositERC20";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_vaultId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_collection";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "depositERC721";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_vaultId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_collection";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_tokenIds";
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
    }];
    readonly name: "depositERC721s";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "payable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_vaultId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "depositEth";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "mint";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_vaultId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_token";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "withdrawERC20";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_vaultId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_tokens";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
    readonly name: "withdrawERC20s";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_vaultId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_collection";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "withdrawERC721";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_vaultId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_collections";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }, {
        readonly name: "_tokenIds";
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
    }];
    readonly name: "withdrawERC721s";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_vaultId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "withdrawEth";
    readonly outputs: readonly [];
}];
export declare const iWrappedPunkABI: readonly [{
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "punkIndex";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "burn";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "punkIndex";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "mint";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "ownerOf";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "user";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "proxyInfo";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "registerProxy";
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
        readonly name: "tokenId";
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
        readonly name: "tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "transferFrom";
    readonly outputs: readonly [];
}];
export declare const inputCheckerABI: readonly [{
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "AddressZeroError";
}];
export declare const leverageABI: readonly [{
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
    readonly inputs: readonly [{
        readonly name: "_multiSourceLoanAddress";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_marketplaceContracts";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_wethAddress";
        readonly internalType: "address payable";
        readonly type: "address";
    }, {
        readonly name: "_punkMarketAddress";
        readonly internalType: "address payable";
        readonly type: "address";
    }, {
        readonly name: "_wrappedPunkAddress";
        readonly internalType: "address payable";
        readonly type: "address";
    }, {
        readonly name: "_seaportAddress";
        readonly internalType: "address payable";
        readonly type: "address";
    }];
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "AddressZeroError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "CouldNotReturnEthError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidAddressUpdateError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidCallbackError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "MarketplaceAddressNotWhitelisted";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "OnlyMultiSourceLoanError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "OnlyWethSupportedError";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "_loanIds";
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
        readonly indexed: false;
    }];
    readonly name: "BNPLLoansStarted";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "_newAddress";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "MultiSourceLoanPendingUpdate";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "_newAddress";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "MultiSourceLoanUpdated";
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
        readonly name: "_newAddress";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "SeaportPendingUpdate";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "_newAddress";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "SeaportUpdated";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "_loanIds";
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
        readonly indexed: false;
    }];
    readonly name: "SellAndRepayExecuted";
}, {
    readonly stateMutability: "payable";
    readonly type: "fallback";
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
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
        readonly name: "_executionData";
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
        readonly name: "_fee";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_executionData";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly name: "afterPrincipalTransfer";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes4";
        readonly type: "bytes4";
    }];
}, {
    readonly stateMutability: "payable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_executionData";
        readonly internalType: "bytes[]";
        readonly type: "bytes[]";
    }];
    readonly name: "buy";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
    }, {
        readonly name: "";
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
        readonly name: "_newAddress";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "finalUpdateMultiSourceLoanAddress";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newAddress";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "finalUpdateSeaportAddress";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getMultiSourceLoanAddress";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getSeaportAddress";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
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
        readonly name: "_executionData";
        readonly internalType: "bytes[]";
        readonly type: "bytes[]";
    }];
    readonly name: "sell";
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
        readonly name: "_newAddress";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "updateMultiSourceLoanAddressFirst";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newAddress";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "updateSeaportAddressFirst";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "payable";
    readonly type: "receive";
}];
export declare const liquidationDistributorABI: readonly [{
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
    readonly inputs: readonly [];
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
        readonly name: "_proceeds";
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
    readonly name: "distribute";
    readonly outputs: readonly [];
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
export declare const mathABI: readonly [{
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "MathOverflowedMulDiv";
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
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "excludeArtifacts";
    readonly outputs: readonly [{
        readonly name: "excludedArtifacts_";
        readonly internalType: "string[]";
        readonly type: "string[]";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "excludeContracts";
    readonly outputs: readonly [{
        readonly name: "excludedContracts_";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "excludeSenders";
    readonly outputs: readonly [{
        readonly name: "excludedSenders_";
        readonly internalType: "address[]";
        readonly type: "address[]";
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
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "targetArtifactSelectors";
    readonly outputs: readonly [{
        readonly name: "targetedArtifactSelectors_";
        readonly internalType: "struct StdInvariant.FuzzSelector[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "addr";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "selectors";
            readonly internalType: "bytes4[]";
            readonly type: "bytes4[]";
        }];
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "targetArtifacts";
    readonly outputs: readonly [{
        readonly name: "targetedArtifacts_";
        readonly internalType: "string[]";
        readonly type: "string[]";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "targetContracts";
    readonly outputs: readonly [{
        readonly name: "targetedContracts_";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "targetInterfaces";
    readonly outputs: readonly [{
        readonly name: "targetedInterfaces_";
        readonly internalType: "struct StdInvariant.FuzzInterface[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "addr";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "artifacts";
            readonly internalType: "string[]";
            readonly type: "string[]";
        }];
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "targetSelectors";
    readonly outputs: readonly [{
        readonly name: "targetedSelectors_";
        readonly internalType: "struct StdInvariant.FuzzSelector[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "addr";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "selectors";
            readonly internalType: "bytes4[]";
            readonly type: "bytes4[]";
        }];
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "targetSenders";
    readonly outputs: readonly [{
        readonly name: "targetedSenders_";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
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
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "minLockPeriod";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "delegateRegistry";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "flashActionContract";
        readonly internalType: "address";
        readonly type: "address";
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
    readonly name: "ECDSAInvalidSignature";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "length";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "ECDSAInvalidSignatureLength";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "s";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
    readonly name: "ECDSAInvalidSignatureS";
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
    readonly name: "ExtensionNotAvailableError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "_amount";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_principalAmount";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "InvalidAmountError";
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
    readonly name: "InvalidDurationError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidLenderError";
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
    readonly inputs: readonly [];
    readonly name: "InvalidMethodError";
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
    readonly name: "InvalidValueError";
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
        readonly name: "minLockPeriod";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "MinLockPeriodTooHighError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "i";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "returndata";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly name: "MulticallFailed";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "NFTNotReturnedError";
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
    readonly name: "OnlyLenderCallableError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "OnlyLenderOrBorrowerCallableError";
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
    readonly inputs: readonly [{
        readonly name: "minTimestamp";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "SourceCannotBeRefinancedError";
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
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "TooManySourcesError";
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
        readonly name: "borrower";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "offerId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "BorrowerOfferCancelled";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "newdelegateRegistry";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "DelegateRegistryUpdated";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "loanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "delegate";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "value";
        readonly internalType: "bool";
        readonly type: "bool";
        readonly indexed: false;
    }];
    readonly name: "Delegated";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "newFlashActionContract";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "FlashActionContractUpdated";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "loanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "target";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "data";
        readonly internalType: "bytes";
        readonly type: "bytes";
        readonly indexed: false;
    }];
    readonly name: "FlashActionExecuted";
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
        readonly name: "lender";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "borrower";
        readonly internalType: "address";
        readonly type: "address";
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
        readonly name: "_extension";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "LoanExtended";
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
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "MaxSourcesUpdated";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "minLockPeriod";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "MinLockPeriodUpdated";
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
        readonly name: "delegate";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "collection";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "RevokeDelegate";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "contractAdded";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "tax";
        readonly internalType: "struct WithCallbacks.Taxes";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "buyTax";
            readonly internalType: "uint128";
            readonly type: "uint128";
        }, {
            readonly name: "sellTax";
            readonly internalType: "uint128";
            readonly type: "uint128";
        }];
        readonly indexed: false;
    }];
    readonly name: "WhitelistedCallbackContractAdded";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "contractRemoved";
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
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "MIN_AUCTION_DURATION";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint48";
        readonly type: "uint48";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_contract";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_tax";
        readonly internalType: "struct WithCallbacks.Taxes";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "buyTax";
            readonly internalType: "uint128";
            readonly type: "uint128";
        }, {
            readonly name: "sellTax";
            readonly internalType: "uint128";
            readonly type: "uint128";
        }];
    }];
    readonly name: "addWhitelistedCallbackContract";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
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
        readonly name: "_loanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
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
    }, {
        readonly name: "_delegate";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_rights";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }, {
        readonly name: "_value";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly name: "delegate";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_executionData";
        readonly internalType: "struct IMultiSourceLoan.LoanExecutionData";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "executionData";
            readonly internalType: "struct IBaseLoan.ExecutionData";
            readonly type: "tuple";
            readonly components: readonly [{
                readonly name: "offer";
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
                readonly name: "tokenId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "amount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "expirationTime";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "callbackData";
                readonly internalType: "bytes";
                readonly type: "bytes";
            }];
        }, {
            readonly name: "lender";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "borrower";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "lenderOfferSignature";
            readonly internalType: "bytes";
            readonly type: "bytes";
        }, {
            readonly name: "borrowerOfferSignature";
            readonly internalType: "bytes";
            readonly type: "bytes";
        }];
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
    }, {
        readonly name: "_target";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_data";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly name: "executeFlashAction";
    readonly outputs: readonly [];
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
    }, {
        readonly name: "_extension";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "extendLoan";
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
    readonly name: "getDelegateRegistry";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getFlashActionContract";
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
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getMinLockPeriod";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
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
    readonly name: "isBorrowerOfferCancelled";
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
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes";
        readonly type: "bytes";
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
    readonly name: "loanLiquidated";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "minOfferId";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "payable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "data";
        readonly internalType: "bytes[]";
        readonly type: "bytes[]";
    }];
    readonly name: "multicall";
    readonly outputs: readonly [{
        readonly name: "results";
        readonly internalType: "bytes[]";
        readonly type: "bytes[]";
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
        readonly name: "_repaymentData";
        readonly internalType: "struct IMultiSourceLoan.LoanRepaymentData";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "data";
            readonly internalType: "struct IMultiSourceLoan.SignableRepaymentData";
            readonly type: "tuple";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "callbackData";
                readonly internalType: "bytes";
                readonly type: "bytes";
            }, {
                readonly name: "shouldDelegate";
                readonly internalType: "bool";
                readonly type: "bool";
            }];
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
        }, {
            readonly name: "borrowerSignature";
            readonly internalType: "bytes";
            readonly type: "bytes";
        }];
    }];
    readonly name: "repayLoan";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_delegate";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_collection";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "revokeDelegate";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newDelegateRegistry";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "setDelegateRegistry";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newFlashActionContract";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "setFlashActionContract";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "__maxSources";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "setMaxSources";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "__minLockPeriod";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "setMinLockPeriod";
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
export declare const iMulticallABI: readonly [{
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "i";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "returndata";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly name: "MulticallFailed";
}, {
    readonly stateMutability: "payable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "data";
        readonly internalType: "bytes[]";
        readonly type: "bytes[]";
    }];
    readonly name: "multicall";
    readonly outputs: readonly [{
        readonly name: "results";
        readonly internalType: "bytes[]";
        readonly type: "bytes[]";
    }];
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
export declare const multicallAbi: readonly [{
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "i";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "returndata";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly name: "MulticallFailed";
}, {
    readonly stateMutability: "payable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "data";
        readonly internalType: "bytes[]";
        readonly type: "bytes[]";
    }];
    readonly name: "multicall";
    readonly outputs: readonly [{
        readonly name: "results";
        readonly internalType: "bytes[]";
        readonly type: "bytes[]";
    }];
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
export declare const ownable2StepABI: readonly [{
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "OwnableInvalidOwner";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "OwnableUnauthorizedAccount";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "previousOwner";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }];
    readonly name: "OwnershipTransferStarted";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "previousOwner";
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
    readonly inputs: readonly [];
    readonly name: "acceptOwnership";
    readonly outputs: readonly [];
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
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "pendingOwner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "renounceOwnership";
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
export declare const ownableABI: readonly [{
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "OwnableInvalidOwner";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "account";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "OwnableUnauthorizedAccount";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "previousOwner";
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
    readonly inputs: readonly [];
    readonly name: "renounceOwnership";
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
export declare const sampleMarketplaceABI: readonly [{
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "buy";
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
export declare const stdInvariantABI: readonly [{
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "excludeArtifacts";
    readonly outputs: readonly [{
        readonly name: "excludedArtifacts_";
        readonly internalType: "string[]";
        readonly type: "string[]";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "excludeContracts";
    readonly outputs: readonly [{
        readonly name: "excludedContracts_";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "excludeSenders";
    readonly outputs: readonly [{
        readonly name: "excludedSenders_";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "targetArtifactSelectors";
    readonly outputs: readonly [{
        readonly name: "targetedArtifactSelectors_";
        readonly internalType: "struct StdInvariant.FuzzSelector[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "addr";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "selectors";
            readonly internalType: "bytes4[]";
            readonly type: "bytes4[]";
        }];
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "targetArtifacts";
    readonly outputs: readonly [{
        readonly name: "targetedArtifacts_";
        readonly internalType: "string[]";
        readonly type: "string[]";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "targetContracts";
    readonly outputs: readonly [{
        readonly name: "targetedContracts_";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "targetInterfaces";
    readonly outputs: readonly [{
        readonly name: "targetedInterfaces_";
        readonly internalType: "struct StdInvariant.FuzzInterface[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "addr";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "artifacts";
            readonly internalType: "string[]";
            readonly type: "string[]";
        }];
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "targetSelectors";
    readonly outputs: readonly [{
        readonly name: "targetedSelectors_";
        readonly internalType: "struct StdInvariant.FuzzSelector[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "addr";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "selectors";
            readonly internalType: "bytes4[]";
            readonly type: "bytes4[]";
        }];
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "targetSenders";
    readonly outputs: readonly [{
        readonly name: "targetedSenders_";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
}];
export declare const stringsABI: readonly [{
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "value";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "length";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "StringsInsufficientHexLength";
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
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "excludeArtifacts";
    readonly outputs: readonly [{
        readonly name: "excludedArtifacts_";
        readonly internalType: "string[]";
        readonly type: "string[]";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "excludeContracts";
    readonly outputs: readonly [{
        readonly name: "excludedContracts_";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "excludeSenders";
    readonly outputs: readonly [{
        readonly name: "excludedSenders_";
        readonly internalType: "address[]";
        readonly type: "address[]";
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
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "targetArtifactSelectors";
    readonly outputs: readonly [{
        readonly name: "targetedArtifactSelectors_";
        readonly internalType: "struct StdInvariant.FuzzSelector[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "addr";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "selectors";
            readonly internalType: "bytes4[]";
            readonly type: "bytes4[]";
        }];
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "targetArtifacts";
    readonly outputs: readonly [{
        readonly name: "targetedArtifacts_";
        readonly internalType: "string[]";
        readonly type: "string[]";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "targetContracts";
    readonly outputs: readonly [{
        readonly name: "targetedContracts_";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "targetInterfaces";
    readonly outputs: readonly [{
        readonly name: "targetedInterfaces_";
        readonly internalType: "struct StdInvariant.FuzzInterface[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "addr";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "artifacts";
            readonly internalType: "string[]";
            readonly type: "string[]";
        }];
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "targetSelectors";
    readonly outputs: readonly [{
        readonly name: "targetedSelectors_";
        readonly internalType: "struct StdInvariant.FuzzSelector[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "addr";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "selectors";
            readonly internalType: "bytes4[]";
            readonly type: "bytes4[]";
        }];
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "targetSenders";
    readonly outputs: readonly [{
        readonly name: "targetedSenders_";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
}];
export declare const testNftFlashActionABI: readonly [{
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidOwnerError";
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_collection";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly name: "execute";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "pure";
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
export declare const testNftMaliciousFlashActionABI: readonly [{
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidOwnerError";
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly name: "execute";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "pure";
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
export declare const wethABI: readonly [{
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
        readonly name: "amount";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "Deposit";
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
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
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
    readonly name: "Withdrawal";
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
    readonly stateMutability: "payable";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "deposit";
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
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "amount";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "withdraw";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "payable";
    readonly type: "receive";
}];
export declare const withCallbacksABI: readonly [{
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
    readonly inputs: readonly [{
        readonly name: "_amount";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_principalAmount";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "InvalidAmountError";
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
    readonly name: "InvalidDurationError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidLenderError";
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
    readonly name: "InvalidValueError";
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
    readonly inputs: readonly [];
    readonly name: "NotStrictlyImprovedError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "OnlyBorrowerCallableError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "OnlyLenderCallableError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "OnlyLenderOrBorrowerCallableError";
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
        readonly name: "borrower";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "offerId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "BorrowerOfferCancelled";
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
        readonly name: "contractAdded";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "tax";
        readonly internalType: "struct WithCallbacks.Taxes";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "buyTax";
            readonly internalType: "uint128";
            readonly type: "uint128";
        }, {
            readonly name: "sellTax";
            readonly internalType: "uint128";
            readonly type: "uint128";
        }];
        readonly indexed: false;
    }];
    readonly name: "WhitelistedCallbackContractAdded";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "contractRemoved";
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
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "MIN_AUCTION_DURATION";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint48";
        readonly type: "uint48";
    }];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_contract";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_tax";
        readonly internalType: "struct WithCallbacks.Taxes";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "buyTax";
            readonly internalType: "uint128";
            readonly type: "uint128";
        }, {
            readonly name: "sellTax";
            readonly internalType: "uint128";
            readonly type: "uint128";
        }];
    }];
    readonly name: "addWhitelistedCallbackContract";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
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
        readonly name: "_renegotiationIds";
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
    }];
    readonly name: "cancelRenegotiationOffers";
    readonly outputs: readonly [];
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
    readonly name: "isBorrowerOfferCancelled";
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
    readonly name: "lenderMinRenegotiationOfferId";
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
    readonly name: "minOfferId";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
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
export declare const userVaultABI: readonly [{
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
    }];
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "AssetNotOwnedError";
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
    readonly name: "LengthMismatchError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "vaultId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "NotApprovedError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "vaultId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "VaultNotExistsError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "WithdrawingETHError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "WrongMethodError";
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
        readonly name: "vaultId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "token";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "amount";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "ERC20Deposited";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "vaultId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "token";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "amount";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "ERC20Withdrawn";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "vaultId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "collection";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "ERC721Deposited";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "vaultId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "collection";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "ERC721Withdrawn";
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
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_vaultId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_token";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "ERC20BalanceOf";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_collection";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "ERC721OwnerOf";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
}, {
    readonly stateMutability: "view";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "ETH";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
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
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_vaultId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_assetRecipient";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "burn";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_vaultId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_collections";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }, {
        readonly name: "_tokenIds";
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
    }, {
        readonly name: "_tokens";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
    readonly name: "burnAndWithdraw";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_vaultId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_token";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_amount";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "depositERC20";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_vaultId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_collection";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "depositERC721";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_vaultId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_collection";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_tokenIds";
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
    }];
    readonly name: "depositERC721s";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "payable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_vaultId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "depositEth";
    readonly outputs: readonly [];
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
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "mint";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
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
        readonly name: "_vaultId";
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
        readonly name: "_vaultId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_token";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "withdrawERC20";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_vaultId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_tokens";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
    readonly name: "withdrawERC20s";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_vaultId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_collection";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "withdrawERC721";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_vaultId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_collections";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }, {
        readonly name: "_tokenIds";
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
    }];
    readonly name: "withdrawERC721s";
    readonly outputs: readonly [];
}, {
    readonly stateMutability: "nonpayable";
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_vaultId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "withdrawEth";
    readonly outputs: readonly [];
}];
export declare const usdcSampleTokenABI: readonly [{
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
