export declare const addressManagerAbi: readonly [{
    readonly type: "constructor";
    readonly inputs: readonly [{
        readonly name: "_original";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
    readonly stateMutability: "nonpayable";
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
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_entry";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "addToWhitelist";
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "owner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_entry";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "removeFromWhitelist";
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}];
export declare const auctionLoanLiquidatorAbi: readonly [{
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
    }, {
        readonly name: "maxExtension";
        readonly internalType: "uint96";
        readonly type: "uint96";
    }];
    readonly stateMutability: "nonpayable";
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
            readonly name: "minBid";
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
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "MAX_TRIGGER_FEE";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "MIN_INCREMENT_BPS";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_loanContract";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "addLoanContract";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_nftAddress";
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getLiquidationDistributor";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getMaxExtension";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint96";
        readonly type: "uint96";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getTriggerFee";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getValidLoanContracts";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_loanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
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
    }, {
        readonly name: "_duration";
        readonly internalType: "uint96";
        readonly type: "uint96";
    }, {
        readonly name: "_minBid";
        readonly internalType: "uint256";
        readonly type: "uint256";
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "owner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
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
            readonly name: "minBid";
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
            readonly name: "minBid";
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_loanContract";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "removeLoanContract";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
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
            readonly name: "minBid";
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly name: "settleAuction";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "__liquidationDistributor";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "updateLiquidationDistributor";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "triggerFee";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "updateTriggerFee";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}];
export declare const auctionWithBuyoutLoanLiquidatorAbi: readonly [{
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
        readonly name: "loanManagerRegistry";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "triggerFee";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "maxExtension";
        readonly internalType: "uint96";
        readonly type: "uint96";
    }, {
        readonly name: "timeForMainLenderToBuy";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
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
    readonly inputs: readonly [];
    readonly name: "InvalidInputError";
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
    readonly name: "NotMainLenderError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "timeLimit";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "OptionToBuyExpiredError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "timeLimit";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "OptionToBuyStilValidError";
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
        readonly name: "nftAddress";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "largestTrancheIdx";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "AuctionSettledWithBuyout";
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
            readonly name: "minBid";
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
        readonly name: "timeForMainLenderToBuy";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "TimeForMainLenderToBuyUpdated";
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
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "MAX_TIME_FOR_MAIN_LENDER_TO_BUY";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "MAX_TRIGGER_FEE";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "MIN_INCREMENT_BPS";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_loanContract";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "addLoanContract";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_nftAddress";
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getLiquidationDistributor";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getLoanManagerRegistry";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "contract ILoanManagerRegistry";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getMaxExtension";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint96";
        readonly type: "uint96";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getTimeForMainLenderToBuy";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getTriggerFee";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getValidLoanContracts";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_loanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
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
    }, {
        readonly name: "_duration";
        readonly internalType: "uint96";
        readonly type: "uint96";
    }, {
        readonly name: "_minBid";
        readonly internalType: "uint256";
        readonly type: "uint256";
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "owner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
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
            readonly name: "minBid";
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
            readonly name: "minBid";
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_loanContract";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "removeLoanContract";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "__timeForMainLenderToBuy";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "setTimeForMainLenderToBuy";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
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
            readonly name: "minBid";
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly name: "settleAuction";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
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
            readonly name: "minBid";
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly name: "settleWithBuyout";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "__liquidationDistributor";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "updateLiquidationDistributor";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "triggerFee";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "updateTriggerFee";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}];
export declare const baseLoanAbi: readonly [{
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
    readonly name: "InvalidDurationError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidInputError";
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
    readonly name: "InvalidSignatureError";
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
    readonly inputs: readonly [{
        readonly name: "_pendingProtocolFeeSetTime";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "TooEarlyError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "TooSoonError";
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
        readonly name: "_minimum";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "MinAprImprovementUpdated";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "newMinBid";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "MinBidLiquidationUpdated";
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
        readonly internalType: "struct WithProtocolFee.ProtocolFee";
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
        readonly internalType: "struct WithProtocolFee.ProtocolFee";
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
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "TransferOwnerRequested";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "contractAdded";
        readonly internalType: "address";
        readonly type: "address";
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
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "DOMAIN_SEPARATOR";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "FEE_UPDATE_NOTICE";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "INITIAL_DOMAIN_SEPARATOR";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "MAX_AUCTION_DURATION";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint48";
        readonly type: "uint48";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "MIN_AUCTION_DURATION";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint48";
        readonly type: "uint48";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "MIN_BID_LIQUIDATION";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "MIN_WAIT_TIME";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "VERSION";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_contract";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "addWhitelistedCallbackContract";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_minOfferId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "cancelAllOffers";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_offerId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "cancelOffer";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_renegotiationId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "cancelRenegotiationOffer";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getCollectionManager";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getCurrencyManager";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getLiquidationAuctionDuration";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint48";
        readonly type: "uint48";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getLiquidator";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getMinImprovementApr";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getPendingProtocolFee";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct WithProtocolFee.ProtocolFee";
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getPendingProtocolFeeSetTime";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getProtocolFee";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct WithProtocolFee.ProtocolFee";
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getTotalLoansIssued";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "user";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "offerId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "isOfferCancelled";
    readonly outputs: readonly [{
        readonly name: "notActive";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "user";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "renegotiationIf";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "isRenegotiationOfferCancelled";
    readonly outputs: readonly [{
        readonly name: "notActive";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "user";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "minOfferId";
    readonly outputs: readonly [{
        readonly name: "minOfferId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "name";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "owner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "pendingOwner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "pendingOwnerTime";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_contract";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "removeWhitelistedCallbackContract";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newOwner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "requestTransferOwner";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "setProtocolFee";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newDuration";
        readonly internalType: "uint48";
        readonly type: "uint48";
    }];
    readonly name: "updateLiquidationAuctionDuration";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "__loanLiquidator";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "updateLiquidationContract";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newMinimum";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "updateMinImprovementApr";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newProtocolFee";
        readonly internalType: "struct WithProtocolFee.ProtocolFee";
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
    readonly stateMutability: "nonpayable";
}];
export declare const callbackHandlerAbi: readonly [{
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "AddressZeroError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidInputError";
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
    readonly name: "TooSoonError";
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
        readonly internalType: "struct WithProtocolFee.ProtocolFee";
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
        readonly internalType: "struct WithProtocolFee.ProtocolFee";
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
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "TransferOwnerRequested";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "contractAdded";
        readonly internalType: "address";
        readonly type: "address";
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
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "FEE_UPDATE_NOTICE";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "MIN_WAIT_TIME";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_contract";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "addWhitelistedCallbackContract";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getPendingProtocolFee";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct WithProtocolFee.ProtocolFee";
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getPendingProtocolFeeSetTime";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getProtocolFee";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct WithProtocolFee.ProtocolFee";
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "owner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "pendingOwner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "pendingOwnerTime";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_contract";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "removeWhitelistedCallbackContract";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newOwner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "requestTransferOwner";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "setProtocolFee";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newProtocolFee";
        readonly internalType: "struct WithProtocolFee.ProtocolFee";
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
    readonly stateMutability: "nonpayable";
}];
export declare const dsTestAbi: readonly [{
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
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "IS_TEST";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "failed";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly stateMutability: "nonpayable";
}];
export declare const delegateRegistryAbi: readonly [{
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "payable";
}, {
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
    readonly stateMutability: "payable";
}, {
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
    readonly stateMutability: "payable";
}, {
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
    readonly stateMutability: "payable";
}, {
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
    readonly stateMutability: "payable";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "payable";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "pure";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "sweep";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}];
export declare const ecdsaAbi: readonly [{
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
export declare const erc20Abi: readonly [{
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
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "DOMAIN_SEPARATOR";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "decimals";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint8";
        readonly type: "uint8";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "name";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "symbol";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "totalSupply";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}];
export declare const erc4626Abi: readonly [{
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "MathOverflowedMulDiv";
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
        readonly name: "caller";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "owner";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "assets";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "shares";
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
        readonly name: "caller";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "receiver";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "owner";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "assets";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "shares";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "Withdraw";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "DOMAIN_SEPARATOR";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "asset";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "contract ERC20";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "shares";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "convertToAssets";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "assets";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "convertToShares";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "decimals";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint8";
        readonly type: "uint8";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "decimalsOffset";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint8";
        readonly type: "uint8";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "assets";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "receiver";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "deposit";
    readonly outputs: readonly [{
        readonly name: "shares";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "maxDeposit";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "maxMint";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "maxRedeem";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "owner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "maxWithdraw";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "shares";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "receiver";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "mint";
    readonly outputs: readonly [{
        readonly name: "assets";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "name";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "assets";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "previewDeposit";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "shares";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "previewMint";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "shares";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "previewRedeem";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "assets";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "previewWithdraw";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "shares";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "receiver";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "owner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "redeem";
    readonly outputs: readonly [{
        readonly name: "assets";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "symbol";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "totalAssets";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "totalSupply";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "assets";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "receiver";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "owner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "withdraw";
    readonly outputs: readonly [{
        readonly name: "shares";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
}];
export declare const erc721Abi: readonly [{
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "name";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "symbol";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "nonpayable";
}];
export declare const erc721TokenReceiverAbi: readonly [{
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
    readonly stateMutability: "nonpayable";
}];
export declare const feeManagerAbi: readonly [{
    readonly type: "constructor";
    readonly inputs: readonly [{
        readonly name: "__fees";
        readonly internalType: "struct IFeeManager.Fees";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "managementFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "performanceFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidFeesError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidInputError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "TooSoonError";
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
        readonly name: "fees";
        readonly internalType: "struct IFeeManager.Fees";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "managementFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "performanceFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
        readonly indexed: false;
    }];
    readonly name: "ProposedFeesConfirmed";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "fees";
        readonly internalType: "struct IFeeManager.Fees";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "managementFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "performanceFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
        readonly indexed: false;
    }];
    readonly name: "ProposedFeesSet";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "TransferOwnerRequested";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "MIN_WAIT_TIME";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "PRECISION";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "WAIT_TIME";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "__fees";
        readonly internalType: "struct IFeeManager.Fees";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "managementFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "performanceFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly name: "confirmFees";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getFees";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct IFeeManager.Fees";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "managementFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "performanceFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getProposedFees";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct IFeeManager.Fees";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "managementFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "performanceFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getProposedFeesSetTime";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "owner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "pendingOwner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "pendingOwnerTime";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_principal";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_interest";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "processFees";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newOwner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "requestTransferOwner";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "__fees";
        readonly internalType: "struct IFeeManager.Fees";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "managementFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "performanceFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly name: "setProposedFees";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}];
export declare const iAuctionLoanLiquidatorAbi: readonly [{
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_loanContract";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "addLoanContract";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getLiquidationDistributor";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getTriggerFee";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getValidLoanContracts";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
    readonly stateMutability: "view";
}, {
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
            readonly name: "minBid";
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
            readonly name: "minBid";
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_loanContract";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "removeLoanContract";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
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
            readonly name: "minBid";
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly name: "settleAuction";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_liquidationDistributor";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "updateLiquidationDistributor";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "triggerFee";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "updateTriggerFee";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}];
export declare const iBaseInterestAllocatorAbi: readonly [{
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "total";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "AllTransfered";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "currentIdle";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "targetIdle";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "Reallocated";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getAssetsAllocated";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getBaseApr";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getBaseAprWithUpdate";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_currentIdle";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_targetIdle";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_force";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly name: "reallocate";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "transferAll";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}];
export declare const iBaseLoanAbi: readonly [{
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_minOfferId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "cancelAllOffers";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_offerId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "cancelOffer";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_renegotiationId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "cancelRenegotiationOffer";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getTotalLoansIssued";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}];
export declare const iCryptoPunksMarketAbi: readonly [{
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "withdraw";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}];
export declare const iCurveAbi: readonly [{
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_i";
        readonly internalType: "uint128";
        readonly type: "uint128";
    }, {
        readonly name: "_j";
        readonly internalType: "uint128";
        readonly type: "uint128";
    }, {
        readonly name: "_dx";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_min_dy";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "exchange";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "payable";
}];
export declare const iDelegateRegistryAbi: readonly [{
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "payable";
}, {
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
    readonly stateMutability: "payable";
}, {
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
    readonly stateMutability: "payable";
}, {
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
    readonly stateMutability: "payable";
}, {
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
    readonly stateMutability: "payable";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "payable";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}];
export declare const ierc1271Abi: readonly [{
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
    readonly stateMutability: "view";
}];
export declare const ierc721TokenReceiverAbi: readonly [{
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
    readonly stateMutability: "nonpayable";
}];
export declare const iFeeManagerAbi: readonly [{
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "PRECISION";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_fees";
        readonly internalType: "struct IFeeManager.Fees";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "managementFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "performanceFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly name: "confirmFees";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getFees";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct IFeeManager.Fees";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "managementFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "performanceFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getProposedFees";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct IFeeManager.Fees";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "managementFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "performanceFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getProposedFeesSetTime";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_principal";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_interest";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "processFees";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_fee";
        readonly internalType: "struct IFeeManager.Fees";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "managementFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }, {
            readonly name: "performanceFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly name: "setProposedFees";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}];
export declare const iLiquidationDistributorAbi: readonly [{
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly name: "distribute";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}];
export declare const iLiquidationHandlerAbi: readonly [{
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getLiquidationAuctionDuration";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint48";
        readonly type: "uint48";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getLiquidator";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newDuration";
        readonly internalType: "uint48";
        readonly type: "uint48";
    }];
    readonly name: "updateLiquidationAuctionDuration";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "loanLiquidator";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "updateLiquidationContract";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}];
export declare const iLoanCallbackAbi: readonly [{
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidCallbackError";
}, {
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
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
    readonly stateMutability: "nonpayable";
}, {
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
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
    readonly stateMutability: "nonpayable";
}];
export declare const iLoanLiquidatorAbi: readonly [{
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
        readonly name: "_minBid";
        readonly internalType: "uint256";
        readonly type: "uint256";
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
    readonly stateMutability: "nonpayable";
}];
export declare const iLoanManagerAbi: readonly [{
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_callers";
        readonly internalType: "struct ILoanManager.ProposedCaller[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "caller";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "isLoanContract";
            readonly internalType: "bool";
            readonly type: "bool";
        }];
    }];
    readonly name: "addCallers";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getParameterSetter";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_loanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_principalAmount";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_apr";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_accruedInterest";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_protocolFee";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_received";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_startTime";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "loanLiquidation";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_loanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_principalAmount";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_apr";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_accruedInterest";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_protocolFee";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_startTime";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "loanRepayment";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_offerHandler";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "updateOfferHandler";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_offer";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }, {
        readonly name: "_protocolFee";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "validateOffer";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}];
export declare const iLoanManagerRegistryAbi: readonly [{
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_loanManager";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "addLoanManager";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_loanManager";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "isLoanManager";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_loanManager";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "removeLoanManager";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}];
export declare const iMultiSourceLoanAbi: readonly [{
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
        readonly name: "loanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }, {
        readonly name: "offerId";
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
        readonly indexed: false;
    }, {
        readonly name: "offerIds";
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
        readonly indexed: false;
    }, {
        readonly name: "totalFee";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "LoanRefinancedFromNewOffers";
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
            readonly name: "trancheIndex";
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }, {
        readonly name: "_renegotiationOfferSignature";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly name: "addNewTranche";
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly stateMutability: "nonpayable";
}, {
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_loanExecutionData";
        readonly internalType: "struct IMultiSourceLoan.LoanExecutionData";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "executionData";
            readonly internalType: "struct IMultiSourceLoan.ExecutionData";
            readonly type: "tuple";
            readonly components: readonly [{
                readonly name: "offerExecution";
                readonly internalType: "struct IMultiSourceLoan.OfferExecution[]";
                readonly type: "tuple[]";
                readonly components: readonly [{
                    readonly name: "offer";
                    readonly internalType: "struct IMultiSourceLoan.LoanOffer";
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
                        readonly name: "maxSeniorRepayment";
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
                    readonly name: "amount";
                    readonly internalType: "uint256";
                    readonly type: "uint256";
                }, {
                    readonly name: "lenderOfferSignature";
                    readonly internalType: "bytes";
                    readonly type: "bytes";
                }];
            }, {
                readonly name: "tokenId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "duration";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "expirationTime";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalReceiver";
                readonly internalType: "address";
                readonly type: "address";
            }, {
                readonly name: "callbackData";
                readonly internalType: "bytes";
                readonly type: "bytes";
            }];
        }, {
            readonly name: "borrower";
            readonly internalType: "address";
            readonly type: "address";
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly stateMutability: "nonpayable";
}, {
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getDelegateRegistry";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getFlashActionContract";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getMaxTranches";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getMinLockPeriod";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly name: "liquidateLoan";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly stateMutability: "nonpayable";
}, {
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly name: "loanLiquidated";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }, {
        readonly name: "_loanExecutionData";
        readonly internalType: "struct IMultiSourceLoan.LoanExecutionData";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "executionData";
            readonly internalType: "struct IMultiSourceLoan.ExecutionData";
            readonly type: "tuple";
            readonly components: readonly [{
                readonly name: "offerExecution";
                readonly internalType: "struct IMultiSourceLoan.OfferExecution[]";
                readonly type: "tuple[]";
                readonly components: readonly [{
                    readonly name: "offer";
                    readonly internalType: "struct IMultiSourceLoan.LoanOffer";
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
                        readonly name: "maxSeniorRepayment";
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
                    readonly name: "amount";
                    readonly internalType: "uint256";
                    readonly type: "uint256";
                }, {
                    readonly name: "lenderOfferSignature";
                    readonly internalType: "bytes";
                    readonly type: "bytes";
                }];
            }, {
                readonly name: "tokenId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "duration";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "expirationTime";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalReceiver";
                readonly internalType: "address";
                readonly type: "address";
            }, {
                readonly name: "callbackData";
                readonly internalType: "bytes";
                readonly type: "bytes";
            }];
        }, {
            readonly name: "borrower";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "borrowerOfferSignature";
            readonly internalType: "bytes";
            readonly type: "bytes";
        }];
    }];
    readonly name: "refinanceFromLoanExecutionData";
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly stateMutability: "nonpayable";
}, {
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
            readonly name: "trancheIndex";
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly stateMutability: "nonpayable";
}, {
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
            readonly name: "trancheIndex";
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly stateMutability: "nonpayable";
}, {
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
                readonly name: "tranche";
                readonly internalType: "struct IMultiSourceLoan.Tranche[]";
                readonly type: "tuple[]";
                readonly components: readonly [{
                    readonly name: "loanId";
                    readonly internalType: "uint256";
                    readonly type: "uint256";
                }, {
                    readonly name: "floor";
                    readonly internalType: "uint256";
                    readonly type: "uint256";
                }, {
                    readonly name: "principalAmount";
                    readonly internalType: "uint256";
                    readonly type: "uint256";
                }, {
                    readonly name: "lender";
                    readonly internalType: "address";
                    readonly type: "address";
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
            }, {
                readonly name: "protocolFee";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }];
        }, {
            readonly name: "borrowerSignature";
            readonly internalType: "bytes";
            readonly type: "bytes";
        }];
    }];
    readonly name: "repayLoan";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newFlashActionContract";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "setFlashActionContract";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_minLockPeriod";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "setMinLockPeriod";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}];
export declare const iMulticallAbi: readonly [{
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
    readonly stateMutability: "payable";
}];
export declare const iMulticall3Abi: readonly [{
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
    readonly stateMutability: "payable";
}, {
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
    readonly stateMutability: "payable";
}, {
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
    readonly stateMutability: "payable";
}, {
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
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getBasefee";
    readonly outputs: readonly [{
        readonly name: "basefee";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getBlockNumber";
    readonly outputs: readonly [{
        readonly name: "blockNumber";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getChainId";
    readonly outputs: readonly [{
        readonly name: "chainid";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getCurrentBlockCoinbase";
    readonly outputs: readonly [{
        readonly name: "coinbase";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getCurrentBlockDifficulty";
    readonly outputs: readonly [{
        readonly name: "difficulty";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getCurrentBlockGasLimit";
    readonly outputs: readonly [{
        readonly name: "gaslimit";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getCurrentBlockTimestamp";
    readonly outputs: readonly [{
        readonly name: "timestamp";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getLastBlockHash";
    readonly outputs: readonly [{
        readonly name: "blockHash";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "payable";
}, {
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
    readonly stateMutability: "payable";
}];
export declare const inftFlashActionAbi: readonly [{
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidOwnerError";
}, {
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
    readonly stateMutability: "nonpayable";
}];
export declare const iOfferValidatorAbi: readonly [{
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_offer";
        readonly internalType: "struct IMultiSourceLoan.LoanOffer";
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
            readonly name: "maxSeniorRepayment";
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
    readonly stateMutability: "view";
}];
export declare const iOldErc721Abi: readonly [{
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "approve";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_owner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "balanceOf";
    readonly outputs: readonly [{
        readonly name: "_balance";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "ownerOf";
    readonly outputs: readonly [{
        readonly name: "_owner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "takeOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "transfer";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}];
export declare const iOracleAbi: readonly [{
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "collection";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "period";
        readonly internalType: "uint64";
        readonly type: "uint64";
        readonly indexed: false;
    }, {
        readonly name: "key";
        readonly internalType: "bytes4";
        readonly type: "bytes4";
        readonly indexed: false;
    }, {
        readonly name: "value";
        readonly internalType: "uint128";
        readonly type: "uint128";
        readonly indexed: false;
    }];
    readonly name: "DataUpdated";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_collection";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_period";
        readonly internalType: "uint64";
        readonly type: "uint64";
    }, {
        readonly name: "_key";
        readonly internalType: "bytes4";
        readonly type: "bytes4";
    }];
    readonly name: "getData";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct IOracle.CollectionData";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "value";
            readonly internalType: "uint128";
            readonly type: "uint128";
        }, {
            readonly name: "updated";
            readonly internalType: "uint128";
            readonly type: "uint128";
        }];
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_collection";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_period";
        readonly internalType: "uint64";
        readonly type: "uint64";
    }, {
        readonly name: "_key";
        readonly internalType: "bytes4";
        readonly type: "bytes4";
    }, {
        readonly name: "_value";
        readonly internalType: "uint128";
        readonly type: "uint128";
    }];
    readonly name: "setData";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}];
export declare const iPurchaseBundlerAbi: readonly [{
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newAddress";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "finalUpdateMultiSourceLoanAddress";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getMultiSourceLoanAddress";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getPendingTaxes";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct IPurchaseBundler.Taxes";
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getPendingTaxesSetTime";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getTaxes";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct IPurchaseBundler.Taxes";
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_executionData";
        readonly internalType: "bytes[]";
        readonly type: "bytes[]";
    }];
    readonly name: "sell";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "setTaxes";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newAddress";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "updateMultiSourceLoanAddressFirst";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newTaxes";
        readonly internalType: "struct IPurchaseBundler.Taxes";
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
    readonly name: "updateTaxes";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}];
export declare const iReservoirAbi: readonly [{
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
    readonly stateMutability: "payable";
}];
export declare const iUserVaultAbi: readonly [{
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
        readonly name: "_oldCollections";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }, {
        readonly name: "_oldTokenIds";
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
    }, {
        readonly name: "_tokens";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
    readonly name: "burnAndWithdraw";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_vaultId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "depositEth";
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
}, {
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
    readonly name: "depositOldERC721";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
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
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
    }];
    readonly name: "depositOldERC721s";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "mint";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_vaultId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "withdrawEth";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
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
    readonly name: "withdrawOldERC721";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
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
    readonly name: "withdrawOldERC721s";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}];
export declare const iWrappedPunkAbi: readonly [{
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "punkIndex";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "burn";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "punkIndex";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "mint";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "registerProxy";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}];
export declare const inputCheckerAbi: readonly [{
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "AddressZeroError";
}];
export declare const liquidationDistributorAbi: readonly [{
    readonly type: "constructor";
    readonly inputs: readonly [{
        readonly name: "_loanManagerRegistry";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidCallerError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "LiquidatorCannotBeUpdatedError";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "liquidator";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "LiquidatorSet";
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly name: "distribute";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getLiquidator";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getLoanManagerRegistry";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "contract ILoanManagerRegistry";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "owner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_liquidator";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "setLiquidator";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}];
export declare const liquidationHandlerAbi: readonly [{
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "AddressZeroError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidDurationError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidInputError";
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
        readonly name: "_pendingProtocolFeeSetTime";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "TooEarlyError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "TooSoonError";
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
        readonly name: "newMinBid";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "MinBidLiquidationUpdated";
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
        readonly internalType: "struct WithProtocolFee.ProtocolFee";
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
        readonly internalType: "struct WithProtocolFee.ProtocolFee";
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
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "TransferOwnerRequested";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "contractAdded";
        readonly internalType: "address";
        readonly type: "address";
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
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "FEE_UPDATE_NOTICE";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "MAX_AUCTION_DURATION";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint48";
        readonly type: "uint48";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "MIN_AUCTION_DURATION";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint48";
        readonly type: "uint48";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "MIN_BID_LIQUIDATION";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "MIN_WAIT_TIME";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_contract";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "addWhitelistedCallbackContract";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getLiquidationAuctionDuration";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint48";
        readonly type: "uint48";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getLiquidator";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getPendingProtocolFee";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct WithProtocolFee.ProtocolFee";
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getPendingProtocolFeeSetTime";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getProtocolFee";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct WithProtocolFee.ProtocolFee";
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "owner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "pendingOwner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "pendingOwnerTime";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_contract";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "removeWhitelistedCallbackContract";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newOwner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "requestTransferOwner";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "setProtocolFee";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newDuration";
        readonly internalType: "uint48";
        readonly type: "uint48";
    }];
    readonly name: "updateLiquidationAuctionDuration";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "__loanLiquidator";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "updateLiquidationContract";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newProtocolFee";
        readonly internalType: "struct WithProtocolFee.ProtocolFee";
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
    readonly stateMutability: "nonpayable";
}];
export declare const loanManagerAbi: readonly [{
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "CallerNotAccepted";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidCallerError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidInputError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "TooSoonError";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "callers";
        readonly internalType: "struct ILoanManager.ProposedCaller[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "caller";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "isLoanContract";
            readonly internalType: "bool";
            readonly type: "bool";
        }];
        readonly indexed: false;
    }];
    readonly name: "CallersAdded";
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
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "TransferOwnerRequested";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "MIN_WAIT_TIME";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "UPDATE_WAITING_TIME";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_callers";
        readonly internalType: "struct ILoanManager.ProposedCaller[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "caller";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "isLoanContract";
            readonly internalType: "bool";
            readonly type: "bool";
        }];
    }];
    readonly name: "addCallers";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getOfferHandler";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getParameterSetter";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_caller";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "isCallerAccepted";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_loanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_principalAmount";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_apr";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_accruedInterest";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_protocolFee";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_received";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_startTime";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "loanLiquidation";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_loanId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_principalAmount";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_apr";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_accruedInterest";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_protocolFee";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_startTime";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "loanRepayment";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "owner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "pendingOwner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "pendingOwnerTime";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newOwner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "requestTransferOwner";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_offerHandler";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "updateOfferHandler";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_offer";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }, {
        readonly name: "_protocolFee";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "validateOffer";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}];
export declare const loanManagerParameterSetterAbi: readonly [{
    readonly type: "constructor";
    readonly inputs: readonly [{
        readonly name: "__offerHandler";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_updateWaitingTime";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "AddressZeroError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidInputError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "LoanManagerSetError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "TooSoonError";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "offerHandler";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "OfferHandlerSet";
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
        readonly name: "offerHandler";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "ProposedOfferHandlerSet";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "callers";
        readonly internalType: "struct ILoanManager.ProposedCaller[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "caller";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "isLoanContract";
            readonly internalType: "bool";
            readonly type: "bool";
        }];
        readonly indexed: false;
    }];
    readonly name: "RequestCallersAdded";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "TransferOwnerRequested";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "MIN_WAIT_TIME";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "UPDATE_WAITING_TIME";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_callers";
        readonly internalType: "struct ILoanManager.ProposedCaller[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "caller";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "isLoanContract";
            readonly internalType: "bool";
            readonly type: "bool";
        }];
    }];
    readonly name: "addCallers";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "__offerHandler";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "confirmOfferHandler";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getLoanManager";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getOfferHandler";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "getProposedAcceptedCallers";
    readonly outputs: readonly [{
        readonly name: "caller";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "isLoanContract";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getProposedAcceptedCallersSetTime";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getProposedOfferHandler";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getProposedOfferHandlerSetTime";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "owner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "pendingOwner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "pendingOwnerTime";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_callers";
        readonly internalType: "struct ILoanManager.ProposedCaller[]";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "caller";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "isLoanContract";
            readonly internalType: "bool";
            readonly type: "bool";
        }];
    }];
    readonly name: "requestAddCallers";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newOwner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "requestTransferOwner";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "__loanManager";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "setLoanManager";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "__offerHandler";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "setOfferHandler";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}];
export declare const loanManagerRegistryAbi: readonly [{
    readonly type: "constructor";
    readonly inputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "loanManagerAdded";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "LoanManagerAdded";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "loanManagerRemoved";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "LoanManagerRemoved";
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
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_loanManager";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "addLoanManager";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_loanManager";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "isLoanManager";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "owner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_loanManager";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "removeLoanManager";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}];
export declare const mathAbi: readonly [{
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "MathOverflowedMulDiv";
}];
export declare const mockErc20Abi: readonly [{
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
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "DOMAIN_SEPARATOR";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "decimals";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint8";
        readonly type: "uint8";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_name";
        readonly internalType: "string";
        readonly type: "string";
    }, {
        readonly name: "_symbol";
        readonly internalType: "string";
        readonly type: "string";
    }, {
        readonly name: "_decimals";
        readonly internalType: "uint8";
        readonly type: "uint8";
    }];
    readonly name: "initialize";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "name";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "symbol";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "totalSupply";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}];
export declare const mockErc721Abi: readonly [{
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_name";
        readonly internalType: "string";
        readonly type: "string";
    }, {
        readonly name: "_symbol";
        readonly internalType: "string";
        readonly type: "string";
    }];
    readonly name: "initialize";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "name";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "pure";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "symbol";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "nonpayable";
}];
export declare const mockedAaveAbi: readonly [{
    readonly type: "constructor";
    readonly inputs: readonly [{
        readonly name: "__baseAsset";
        readonly internalType: "contract SampleToken";
        readonly type: "address";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "aToken";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "contract SampleToken";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "baseAsset";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "contract ERC20";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "amount";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "onBehalfOf";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "";
        readonly internalType: "uint16";
        readonly type: "uint16";
    }];
    readonly name: "deposit";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "getReserveData";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "";
        readonly internalType: "uint128";
        readonly type: "uint128";
    }, {
        readonly name: "";
        readonly internalType: "uint128";
        readonly type: "uint128";
    }, {
        readonly name: "";
        readonly internalType: "uint128";
        readonly type: "uint128";
    }, {
        readonly name: "";
        readonly internalType: "uint128";
        readonly type: "uint128";
    }, {
        readonly name: "";
        readonly internalType: "uint128";
        readonly type: "uint128";
    }, {
        readonly name: "";
        readonly internalType: "uint40";
        readonly type: "uint40";
    }, {
        readonly name: "";
        readonly internalType: "uint16";
        readonly type: "uint16";
    }, {
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "";
        readonly internalType: "uint128";
        readonly type: "uint128";
    }, {
        readonly name: "";
        readonly internalType: "uint128";
        readonly type: "uint128";
    }, {
        readonly name: "";
        readonly internalType: "uint128";
        readonly type: "uint128";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "__apr";
        readonly internalType: "uint128";
        readonly type: "uint128";
    }];
    readonly name: "setAprBps";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "amount";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "withdraw";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}];
export declare const mockedCurveAbi: readonly [{
    readonly type: "constructor";
    readonly inputs: readonly [{
        readonly name: "_token";
        readonly internalType: "contract SampleToken";
        readonly type: "address";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "i";
        readonly internalType: "uint128";
        readonly type: "uint128";
    }, {
        readonly name: "";
        readonly internalType: "uint128";
        readonly type: "uint128";
    }, {
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "_min_dy";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "exchange";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "nextDy";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_nextDy";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "setNextDy";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "token";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "contract SampleToken";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}];
export declare const multiSourceCommonsAbi: readonly [{
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
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "IS_TEST";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "excludeArtifacts";
    readonly outputs: readonly [{
        readonly name: "excludedArtifacts_";
        readonly internalType: "string[]";
        readonly type: "string[]";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "excludeContracts";
    readonly outputs: readonly [{
        readonly name: "excludedContracts_";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "excludeSenders";
    readonly outputs: readonly [{
        readonly name: "excludedSenders_";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "failed";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "setUp";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "targetArtifacts";
    readonly outputs: readonly [{
        readonly name: "targetedArtifacts_";
        readonly internalType: "string[]";
        readonly type: "string[]";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "targetContracts";
    readonly outputs: readonly [{
        readonly name: "targetedContracts_";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "targetSenders";
    readonly outputs: readonly [{
        readonly name: "targetedSenders_";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
    readonly stateMutability: "view";
}];
export declare const multiSourceLoanAbi: readonly [{
    readonly type: "constructor";
    readonly inputs: readonly [{
        readonly name: "loanLiquidator";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "protocolFee";
        readonly internalType: "struct WithProtocolFee.ProtocolFee";
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
        readonly name: "maxTranches";
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
        readonly name: "loanManagerRegistry";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "flashActionContract";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "minWaitTime";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
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
    readonly inputs: readonly [];
    readonly name: "InvalidAddressesError";
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
    readonly name: "InvalidCallbackError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidCallerError";
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
    readonly name: "InvalidInputError";
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
    readonly inputs: readonly [];
    readonly name: "InvalidParametersError";
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
    readonly name: "InvalidTrancheError";
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
    readonly inputs: readonly [];
    readonly name: "LoanLockedError";
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
    readonly name: "MismatchError";
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
    readonly inputs: readonly [{
        readonly name: "_pendingProtocolFeeSetTime";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "TooEarlyError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "TooManyTranchesError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "TooSoonError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "minTimestamp";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "TrancheCannotBeRefinancedError";
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
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
        readonly indexed: false;
    }, {
        readonly name: "offerIds";
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
        readonly indexed: false;
    }, {
        readonly name: "totalFee";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "LoanRefinancedFromNewOffers";
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
        readonly name: "_minimum";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "MinAprImprovementUpdated";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "newMinBid";
        readonly internalType: "uint256";
        readonly type: "uint256";
        readonly indexed: false;
    }];
    readonly name: "MinBidLiquidationUpdated";
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
        readonly internalType: "struct WithProtocolFee.ProtocolFee";
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
        readonly internalType: "struct WithProtocolFee.ProtocolFee";
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
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "TransferOwnerRequested";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "contractAdded";
        readonly internalType: "address";
        readonly type: "address";
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
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "DOMAIN_SEPARATOR";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "FEE_UPDATE_NOTICE";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "INITIAL_DOMAIN_SEPARATOR";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "MAX_AUCTION_DURATION";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint48";
        readonly type: "uint48";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "MIN_AUCTION_DURATION";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint48";
        readonly type: "uint48";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "MIN_BID_LIQUIDATION";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "MIN_WAIT_TIME";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "VERSION";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly stateMutability: "view";
}, {
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
            readonly name: "trancheIndex";
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }, {
        readonly name: "_renegotiationOfferSignature";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly name: "addNewTranche";
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_contract";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "addWhitelistedCallbackContract";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_minOfferId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "cancelAllOffers";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_offerId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "cancelOffer";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_renegotiationId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "cancelRenegotiationOffer";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_loanExecutionData";
        readonly internalType: "struct IMultiSourceLoan.LoanExecutionData";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "executionData";
            readonly internalType: "struct IMultiSourceLoan.ExecutionData";
            readonly type: "tuple";
            readonly components: readonly [{
                readonly name: "offerExecution";
                readonly internalType: "struct IMultiSourceLoan.OfferExecution[]";
                readonly type: "tuple[]";
                readonly components: readonly [{
                    readonly name: "offer";
                    readonly internalType: "struct IMultiSourceLoan.LoanOffer";
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
                        readonly name: "maxSeniorRepayment";
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
                    readonly name: "amount";
                    readonly internalType: "uint256";
                    readonly type: "uint256";
                }, {
                    readonly name: "lenderOfferSignature";
                    readonly internalType: "bytes";
                    readonly type: "bytes";
                }];
            }, {
                readonly name: "tokenId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "duration";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "expirationTime";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalReceiver";
                readonly internalType: "address";
                readonly type: "address";
            }, {
                readonly name: "callbackData";
                readonly internalType: "bytes";
                readonly type: "bytes";
            }];
        }, {
            readonly name: "borrower";
            readonly internalType: "address";
            readonly type: "address";
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly stateMutability: "nonpayable";
}, {
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getCollectionManager";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getCurrencyManager";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getDelegateRegistry";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getFlashActionContract";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getLiquidationAuctionDuration";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint48";
        readonly type: "uint48";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getLiquidator";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getLoanManagerRegistry";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "contract ILoanManagerRegistry";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getMaxTranches";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getMinImprovementApr";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getMinLockPeriod";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getPendingProtocolFee";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct WithProtocolFee.ProtocolFee";
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getPendingProtocolFeeSetTime";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getProtocolFee";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct WithProtocolFee.ProtocolFee";
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getTotalLoansIssued";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "user";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "offerId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "isOfferCancelled";
    readonly outputs: readonly [{
        readonly name: "notActive";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "user";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "renegotiationIf";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "isRenegotiationOfferCancelled";
    readonly outputs: readonly [{
        readonly name: "notActive";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly name: "liquidateLoan";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes";
        readonly type: "bytes";
    }];
    readonly stateMutability: "nonpayable";
}, {
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly name: "loanLiquidated";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "user";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "minOfferId";
    readonly outputs: readonly [{
        readonly name: "minOfferId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "name";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "owner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "pendingOwner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "pendingOwnerTime";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }, {
        readonly name: "_loanExecutionData";
        readonly internalType: "struct IMultiSourceLoan.LoanExecutionData";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "executionData";
            readonly internalType: "struct IMultiSourceLoan.ExecutionData";
            readonly type: "tuple";
            readonly components: readonly [{
                readonly name: "offerExecution";
                readonly internalType: "struct IMultiSourceLoan.OfferExecution[]";
                readonly type: "tuple[]";
                readonly components: readonly [{
                    readonly name: "offer";
                    readonly internalType: "struct IMultiSourceLoan.LoanOffer";
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
                        readonly name: "maxSeniorRepayment";
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
                    readonly name: "amount";
                    readonly internalType: "uint256";
                    readonly type: "uint256";
                }, {
                    readonly name: "lenderOfferSignature";
                    readonly internalType: "bytes";
                    readonly type: "bytes";
                }];
            }, {
                readonly name: "tokenId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "duration";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "expirationTime";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalReceiver";
                readonly internalType: "address";
                readonly type: "address";
            }, {
                readonly name: "callbackData";
                readonly internalType: "bytes";
                readonly type: "bytes";
            }];
        }, {
            readonly name: "borrower";
            readonly internalType: "address";
            readonly type: "address";
        }, {
            readonly name: "borrowerOfferSignature";
            readonly internalType: "bytes";
            readonly type: "bytes";
        }];
    }];
    readonly name: "refinanceFromLoanExecutionData";
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly stateMutability: "nonpayable";
}, {
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
            readonly name: "trancheIndex";
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly stateMutability: "nonpayable";
}, {
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
            readonly name: "trancheIndex";
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_contract";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "removeWhitelistedCallbackContract";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
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
                readonly name: "tranche";
                readonly internalType: "struct IMultiSourceLoan.Tranche[]";
                readonly type: "tuple[]";
                readonly components: readonly [{
                    readonly name: "loanId";
                    readonly internalType: "uint256";
                    readonly type: "uint256";
                }, {
                    readonly name: "floor";
                    readonly internalType: "uint256";
                    readonly type: "uint256";
                }, {
                    readonly name: "principalAmount";
                    readonly internalType: "uint256";
                    readonly type: "uint256";
                }, {
                    readonly name: "lender";
                    readonly internalType: "address";
                    readonly type: "address";
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
            }, {
                readonly name: "protocolFee";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }];
        }, {
            readonly name: "borrowerSignature";
            readonly internalType: "bytes";
            readonly type: "bytes";
        }];
    }];
    readonly name: "repayLoan";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newOwner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "requestTransferOwner";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newFlashActionContract";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "setFlashActionContract";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "__minLockPeriod";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "setMinLockPeriod";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "setProtocolFee";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newDuration";
        readonly internalType: "uint48";
        readonly type: "uint48";
    }];
    readonly name: "updateLiquidationAuctionDuration";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "__loanLiquidator";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "updateLiquidationContract";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newMinimum";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "updateMinImprovementApr";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newProtocolFee";
        readonly internalType: "struct WithProtocolFee.ProtocolFee";
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
    readonly stateMutability: "nonpayable";
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
    readonly stateMutability: "payable";
}];
export declare const nftBitVectorValidatorAbi: readonly [{
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
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "struct IMultiSourceLoan.LoanOffer";
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
            readonly name: "maxSeniorRepayment";
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
    readonly stateMutability: "pure";
}];
export declare const nftPackedListValidatorAbi: readonly [{
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
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "struct IMultiSourceLoan.LoanOffer";
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
            readonly name: "maxSeniorRepayment";
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
    readonly stateMutability: "pure";
}];
export declare const oracleAbi: readonly [{
    readonly type: "constructor";
    readonly inputs: readonly [{
        readonly name: "_minWaitTime";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidInputError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "TooSoonError";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "collection";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "period";
        readonly internalType: "uint64";
        readonly type: "uint64";
        readonly indexed: false;
    }, {
        readonly name: "key";
        readonly internalType: "bytes4";
        readonly type: "bytes4";
        readonly indexed: false;
    }, {
        readonly name: "value";
        readonly internalType: "uint128";
        readonly type: "uint128";
        readonly indexed: false;
    }];
    readonly name: "DataUpdated";
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
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "TransferOwnerRequested";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "MIN_WAIT_TIME";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_collection";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_period";
        readonly internalType: "uint64";
        readonly type: "uint64";
    }, {
        readonly name: "_key";
        readonly internalType: "bytes4";
        readonly type: "bytes4";
    }];
    readonly name: "getData";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct IOracle.CollectionData";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "value";
            readonly internalType: "uint128";
            readonly type: "uint128";
        }, {
            readonly name: "updated";
            readonly internalType: "uint128";
            readonly type: "uint128";
        }];
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "owner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "pendingOwner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "pendingOwnerTime";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newOwner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "requestTransferOwner";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_collection";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_period";
        readonly internalType: "uint64";
        readonly type: "uint64";
    }, {
        readonly name: "_key";
        readonly internalType: "bytes4";
        readonly type: "bytes4";
    }, {
        readonly name: "_value";
        readonly internalType: "uint128";
        readonly type: "uint128";
    }];
    readonly name: "setData";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}];
export declare const ownedAbi: readonly [{
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
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "owner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}];
export declare const purchaseBundlerAbi: readonly [{
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
        readonly name: "__taxes";
        readonly internalType: "struct IPurchaseBundler.Taxes";
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
    }, {
        readonly name: "_minWaitTime";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }, {
        readonly name: "__protocolFee";
        readonly internalType: "struct WithProtocolFee.ProtocolFee";
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
    readonly stateMutability: "nonpayable";
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
    readonly name: "InvalidInputError";
}, {
    readonly type: "error";
    readonly inputs: readonly [{
        readonly name: "newTaxes";
        readonly internalType: "struct IPurchaseBundler.Taxes";
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
    readonly name: "InvalidTaxesError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "MarketplaceAddressNotWhitelisted";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "OnlyLoanCallableError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "OnlyWethSupportedError";
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
    readonly name: "TooSoonError";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "loanIds";
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
        readonly indexed: false;
    }];
    readonly name: "BNPLLoansStarted";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "newAddress";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "MultiSourceLoanPendingUpdate";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "newAddress";
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
        readonly name: "fee";
        readonly internalType: "struct WithProtocolFee.ProtocolFee";
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
        readonly internalType: "struct WithProtocolFee.ProtocolFee";
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
        readonly name: "loanIds";
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
        readonly indexed: false;
    }];
    readonly name: "SellAndRepayExecuted";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "newTaxes";
        readonly internalType: "struct IPurchaseBundler.Taxes";
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
    readonly name: "TaxesPendingUpdate";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "taxes";
        readonly internalType: "struct IPurchaseBundler.Taxes";
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
    readonly name: "TaxesUpdated";
}, {
    readonly type: "event";
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "TransferOwnerRequested";
}, {
    readonly type: "fallback";
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "FEE_UPDATE_NOTICE";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "MIN_WAIT_TIME";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "TAX_UPDATE_NOTICE";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
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
    readonly stateMutability: "nonpayable";
}, {
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
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
    readonly stateMutability: "nonpayable";
}, {
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
            readonly name: "tranche";
            readonly internalType: "struct IMultiSourceLoan.Tranche[]";
            readonly type: "tuple[]";
            readonly components: readonly [{
                readonly name: "loanId";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "floor";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "principalAmount";
                readonly internalType: "uint256";
                readonly type: "uint256";
            }, {
                readonly name: "lender";
                readonly internalType: "address";
                readonly type: "address";
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
        }, {
            readonly name: "protocolFee";
            readonly internalType: "uint256";
            readonly type: "uint256";
        }];
    }];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newAddress";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "finalUpdateMultiSourceLoanAddress";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getMultiSourceLoanAddress";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getPendingProtocolFee";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct WithProtocolFee.ProtocolFee";
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getPendingProtocolFeeSetTime";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getPendingTaxes";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct IPurchaseBundler.Taxes";
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getPendingTaxesSetTime";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getProtocolFee";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct WithProtocolFee.ProtocolFee";
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getTaxes";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct IPurchaseBundler.Taxes";
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "owner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "pendingOwner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "pendingOwnerTime";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newOwner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "requestTransferOwner";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_executionData";
        readonly internalType: "bytes[]";
        readonly type: "bytes[]";
    }];
    readonly name: "sell";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "setProtocolFee";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "setTaxes";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newAddress";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "updateMultiSourceLoanAddressFirst";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newProtocolFee";
        readonly internalType: "struct WithProtocolFee.ProtocolFee";
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newTaxes";
        readonly internalType: "struct IPurchaseBundler.Taxes";
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
    readonly name: "updateTaxes";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "receive";
    readonly stateMutability: "payable";
}];
export declare const rangeValidatorAbi: readonly [{
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
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "";
        readonly internalType: "struct IMultiSourceLoan.LoanOffer";
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
            readonly name: "maxSeniorRepayment";
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
    readonly stateMutability: "pure";
}];
export declare const sampleCollectionAbi: readonly [{
    readonly type: "constructor";
    readonly inputs: readonly [];
    readonly stateMutability: "nonpayable";
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "lastId";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "mintNext";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "name";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "symbol";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "pure";
}, {
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
    readonly stateMutability: "nonpayable";
}];
export declare const sampleMarketplaceAbi: readonly [{
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "buy";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}];
export declare const sampleOldCollectionAbi: readonly [{
    readonly type: "constructor";
    readonly inputs: readonly [];
    readonly stateMutability: "nonpayable";
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
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "approve";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_owner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "balanceOf";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "lastId";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "to";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "mintNext";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "name";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "ownerOf";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "symbol";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "takeOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "pure";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_to";
        readonly internalType: "address";
        readonly type: "address";
    }, {
        readonly name: "_tokenId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "transfer";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}];
export declare const sampleTokenAbi: readonly [{
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
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "DOMAIN_SEPARATOR";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "decimals";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint8";
        readonly type: "uint8";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "deposit";
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "name";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "symbol";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "totalSupply";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "amount";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "withdraw";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "receive";
    readonly stateMutability: "payable";
}];
export declare const stringsAbi: readonly [{
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
export declare const testAbi: readonly [{
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
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "IS_TEST";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "excludeArtifacts";
    readonly outputs: readonly [{
        readonly name: "excludedArtifacts_";
        readonly internalType: "string[]";
        readonly type: "string[]";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "excludeContracts";
    readonly outputs: readonly [{
        readonly name: "excludedContracts_";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "excludeSenders";
    readonly outputs: readonly [{
        readonly name: "excludedSenders_";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "failed";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "targetArtifacts";
    readonly outputs: readonly [{
        readonly name: "targetedArtifacts_";
        readonly internalType: "string[]";
        readonly type: "string[]";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "targetContracts";
    readonly outputs: readonly [{
        readonly name: "targetedContracts_";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "targetSenders";
    readonly outputs: readonly [{
        readonly name: "targetedSenders_";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
    readonly stateMutability: "view";
}];
export declare const testLoanSetupAbi: readonly [{
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
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "IS_TEST";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "excludeArtifacts";
    readonly outputs: readonly [{
        readonly name: "excludedArtifacts_";
        readonly internalType: "string[]";
        readonly type: "string[]";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "excludeContracts";
    readonly outputs: readonly [{
        readonly name: "excludedContracts_";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "excludeSenders";
    readonly outputs: readonly [{
        readonly name: "excludedSenders_";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "failed";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bool";
        readonly type: "bool";
    }];
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "targetArtifacts";
    readonly outputs: readonly [{
        readonly name: "targetedArtifacts_";
        readonly internalType: "string[]";
        readonly type: "string[]";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "targetContracts";
    readonly outputs: readonly [{
        readonly name: "targetedContracts_";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "targetSenders";
    readonly outputs: readonly [{
        readonly name: "targetedSenders_";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
    readonly stateMutability: "view";
}];
export declare const testNftFlashActionAbi: readonly [{
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidOwnerError";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "pure";
}];
export declare const testNftMaliciousFlashActionAbi: readonly [{
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidOwnerError";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "pure";
}];
export declare const twoStepOwnedAbi: readonly [{
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidInputError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "TooSoonError";
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
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "TransferOwnerRequested";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "MIN_WAIT_TIME";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "owner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "pendingOwner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "pendingOwnerTime";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newOwner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "requestTransferOwner";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}];
export declare const usdcSampleTokenAbi: readonly [{
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
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "DOMAIN_SEPARATOR";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "decimals";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint8";
        readonly type: "uint8";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "name";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "symbol";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "totalSupply";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}];
export declare const userVaultAbi: readonly [{
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
        readonly name: "oldCollectionManager";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "nonpayable";
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
    readonly name: "InvalidCallerError";
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
    readonly inputs: readonly [];
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
    readonly name: "OldERC721Deposited";
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
    readonly name: "OldERC721Withdrawn";
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "ETH";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly name: "OldERC721OwnerOf";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
        readonly name: "_oldCollections";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }, {
        readonly name: "_oldTokenIds";
        readonly internalType: "uint256[]";
        readonly type: "uint256[]";
    }, {
        readonly name: "_tokens";
        readonly internalType: "address[]";
        readonly type: "address[]";
    }];
    readonly name: "burnAndWithdraw";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_vaultId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "depositEth";
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
}, {
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
    readonly name: "depositOldERC721";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
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
    readonly name: "depositOldERC721s";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "mint";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "name";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "owner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "symbol";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "pure";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_vaultId";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "withdrawEth";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
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
    readonly name: "withdrawOldERC721";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
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
    readonly name: "withdrawOldERC721s";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}];
export declare const validatorHelpersAbi: readonly [{
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
export declare const wethAbi: readonly [{
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
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "DOMAIN_SEPARATOR";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "bytes32";
        readonly type: "bytes32";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "decimals";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint8";
        readonly type: "uint8";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "deposit";
    readonly outputs: readonly [];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "name";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "symbol";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "string";
        readonly type: "string";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "totalSupply";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
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
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "amount";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly name: "withdraw";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "receive";
    readonly stateMutability: "payable";
}];
export declare const withProtocolFeeAbi: readonly [{
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "AddressZeroError";
}, {
    readonly type: "error";
    readonly inputs: readonly [];
    readonly name: "InvalidInputError";
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
    readonly name: "TooSoonError";
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
        readonly internalType: "struct WithProtocolFee.ProtocolFee";
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
        readonly internalType: "struct WithProtocolFee.ProtocolFee";
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
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
        readonly indexed: false;
    }];
    readonly name: "TransferOwnerRequested";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "FEE_UPDATE_NOTICE";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "MIN_WAIT_TIME";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getPendingProtocolFee";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct WithProtocolFee.ProtocolFee";
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getPendingProtocolFeeSetTime";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "getProtocolFee";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "struct WithProtocolFee.ProtocolFee";
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
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "owner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "pendingOwner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "pendingOwnerTime";
    readonly outputs: readonly [{
        readonly name: "";
        readonly internalType: "uint256";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newOwner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "requestTransferOwner";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "setProtocolFee";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "newOwner";
        readonly internalType: "address";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly stateMutability: "nonpayable";
}, {
    readonly type: "function";
    readonly inputs: readonly [{
        readonly name: "_newProtocolFee";
        readonly internalType: "struct WithProtocolFee.ProtocolFee";
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
    readonly stateMutability: "nonpayable";
}];
