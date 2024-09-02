export declare const seaportABI: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "conduitController";
        readonly type: "address";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
}, {
    readonly inputs: readonly [];
    readonly name: "BadContractSignature";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "BadFraction";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "from";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "to";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }];
    readonly name: "BadReturnValueFromERC20OnTransfer";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint8";
        readonly name: "v";
        readonly type: "uint8";
    }];
    readonly name: "BadSignatureV";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "CannotCancelOrder";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "ConsiderationCriteriaResolverOutOfRange";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "ConsiderationLengthNotEqualToTotalOriginal";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "orderIndex";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "considerationIndex";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "shortfallAmount";
        readonly type: "uint256";
    }];
    readonly name: "ConsiderationNotMet";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "CriteriaNotEnabledForItem";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "from";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "to";
        readonly type: "address";
    }, {
        readonly internalType: "uint256[]";
        readonly name: "identifiers";
        readonly type: "uint256[]";
    }, {
        readonly internalType: "uint256[]";
        readonly name: "amounts";
        readonly type: "uint256[]";
    }];
    readonly name: "ERC1155BatchTransferGenericFailure";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "InexactFraction";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "InsufficientNativeTokensSupplied";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "Invalid1155BatchTransferEncoding";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "InvalidBasicOrderParameterEncoding";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "conduit";
        readonly type: "address";
    }];
    readonly name: "InvalidCallToConduit";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "conduitKey";
        readonly type: "bytes32";
    }, {
        readonly internalType: "address";
        readonly name: "conduit";
        readonly type: "address";
    }];
    readonly name: "InvalidConduit";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "orderHash";
        readonly type: "bytes32";
    }];
    readonly name: "InvalidContractOrder";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }];
    readonly name: "InvalidERC721TransferAmount";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "InvalidFulfillmentComponentData";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "value";
        readonly type: "uint256";
    }];
    readonly name: "InvalidMsgValue";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "InvalidNativeOfferItem";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "InvalidProof";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "orderHash";
        readonly type: "bytes32";
    }];
    readonly name: "InvalidRestrictedOrder";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "InvalidSignature";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "InvalidSigner";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "startTime";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "endTime";
        readonly type: "uint256";
    }];
    readonly name: "InvalidTime";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "fulfillmentIndex";
        readonly type: "uint256";
    }];
    readonly name: "MismatchedFulfillmentOfferAndConsiderationComponents";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "enum Side";
        readonly name: "side";
        readonly type: "uint8";
    }];
    readonly name: "MissingFulfillmentComponentOnAggregation";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MissingItemAmount";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "MissingOriginalConsiderationItems";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }];
    readonly name: "NativeTokenTransferGenericFailure";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "account";
        readonly type: "address";
    }];
    readonly name: "NoContract";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "NoReentrantCalls";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "NoSpecifiedOrdersAvailable";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "OfferAndConsiderationRequiredOnFulfillment";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "OfferCriteriaResolverOutOfRange";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "orderHash";
        readonly type: "bytes32";
    }];
    readonly name: "OrderAlreadyFilled";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "enum Side";
        readonly name: "side";
        readonly type: "uint8";
    }];
    readonly name: "OrderCriteriaResolverOutOfRange";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "orderHash";
        readonly type: "bytes32";
    }];
    readonly name: "OrderIsCancelled";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "orderHash";
        readonly type: "bytes32";
    }];
    readonly name: "OrderPartiallyFilled";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "PartialFillsNotEnabledForOrder";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "token";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "from";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "to";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "identifier";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }];
    readonly name: "TokenTransferGenericFailure";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "orderIndex";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "considerationIndex";
        readonly type: "uint256";
    }];
    readonly name: "UnresolvedConsiderationCriteria";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "orderIndex";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "offerIndex";
        readonly type: "uint256";
    }];
    readonly name: "UnresolvedOfferCriteria";
    readonly type: "error";
}, {
    readonly inputs: readonly [];
    readonly name: "UnusedItemParameters";
    readonly type: "error";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "newCounter";
        readonly type: "uint256";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "offerer";
        readonly type: "address";
    }];
    readonly name: "CounterIncremented";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "bytes32";
        readonly name: "orderHash";
        readonly type: "bytes32";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "offerer";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "zone";
        readonly type: "address";
    }];
    readonly name: "OrderCancelled";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "bytes32";
        readonly name: "orderHash";
        readonly type: "bytes32";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "offerer";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "zone";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "recipient";
        readonly type: "address";
    }, {
        readonly components: readonly [{
            readonly internalType: "enum ItemType";
            readonly name: "itemType";
            readonly type: "uint8";
        }, {
            readonly internalType: "address";
            readonly name: "token";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "identifier";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly indexed: false;
        readonly internalType: "struct SpentItem[]";
        readonly name: "offer";
        readonly type: "tuple[]";
    }, {
        readonly components: readonly [{
            readonly internalType: "enum ItemType";
            readonly name: "itemType";
            readonly type: "uint8";
        }, {
            readonly internalType: "address";
            readonly name: "token";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "identifier";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }, {
            readonly internalType: "address payable";
            readonly name: "recipient";
            readonly type: "address";
        }];
        readonly indexed: false;
        readonly internalType: "struct ReceivedItem[]";
        readonly name: "consideration";
        readonly type: "tuple[]";
    }];
    readonly name: "OrderFulfilled";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "bytes32";
        readonly name: "orderHash";
        readonly type: "bytes32";
    }, {
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "offerer";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "zone";
            readonly type: "address";
        }, {
            readonly components: readonly [{
                readonly internalType: "enum ItemType";
                readonly name: "itemType";
                readonly type: "uint8";
            }, {
                readonly internalType: "address";
                readonly name: "token";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "identifierOrCriteria";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "startAmount";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "endAmount";
                readonly type: "uint256";
            }];
            readonly internalType: "struct OfferItem[]";
            readonly name: "offer";
            readonly type: "tuple[]";
        }, {
            readonly components: readonly [{
                readonly internalType: "enum ItemType";
                readonly name: "itemType";
                readonly type: "uint8";
            }, {
                readonly internalType: "address";
                readonly name: "token";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "identifierOrCriteria";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "startAmount";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "endAmount";
                readonly type: "uint256";
            }, {
                readonly internalType: "address payable";
                readonly name: "recipient";
                readonly type: "address";
            }];
            readonly internalType: "struct ConsiderationItem[]";
            readonly name: "consideration";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "enum OrderType";
            readonly name: "orderType";
            readonly type: "uint8";
        }, {
            readonly internalType: "uint256";
            readonly name: "startTime";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "endTime";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes32";
            readonly name: "zoneHash";
            readonly type: "bytes32";
        }, {
            readonly internalType: "uint256";
            readonly name: "salt";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes32";
            readonly name: "conduitKey";
            readonly type: "bytes32";
        }, {
            readonly internalType: "uint256";
            readonly name: "totalOriginalConsiderationItems";
            readonly type: "uint256";
        }];
        readonly indexed: false;
        readonly internalType: "struct OrderParameters";
        readonly name: "orderParameters";
        readonly type: "tuple";
    }];
    readonly name: "OrderValidated";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "bytes32[]";
        readonly name: "orderHashes";
        readonly type: "bytes32[]";
    }];
    readonly name: "OrdersMatched";
    readonly type: "event";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "offerer";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "zone";
            readonly type: "address";
        }, {
            readonly components: readonly [{
                readonly internalType: "enum ItemType";
                readonly name: "itemType";
                readonly type: "uint8";
            }, {
                readonly internalType: "address";
                readonly name: "token";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "identifierOrCriteria";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "startAmount";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "endAmount";
                readonly type: "uint256";
            }];
            readonly internalType: "struct OfferItem[]";
            readonly name: "offer";
            readonly type: "tuple[]";
        }, {
            readonly components: readonly [{
                readonly internalType: "enum ItemType";
                readonly name: "itemType";
                readonly type: "uint8";
            }, {
                readonly internalType: "address";
                readonly name: "token";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "identifierOrCriteria";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "startAmount";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "endAmount";
                readonly type: "uint256";
            }, {
                readonly internalType: "address payable";
                readonly name: "recipient";
                readonly type: "address";
            }];
            readonly internalType: "struct ConsiderationItem[]";
            readonly name: "consideration";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "enum OrderType";
            readonly name: "orderType";
            readonly type: "uint8";
        }, {
            readonly internalType: "uint256";
            readonly name: "startTime";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "endTime";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes32";
            readonly name: "zoneHash";
            readonly type: "bytes32";
        }, {
            readonly internalType: "uint256";
            readonly name: "salt";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes32";
            readonly name: "conduitKey";
            readonly type: "bytes32";
        }, {
            readonly internalType: "uint256";
            readonly name: "counter";
            readonly type: "uint256";
        }];
        readonly internalType: "struct OrderComponents[]";
        readonly name: "orders";
        readonly type: "tuple[]";
    }];
    readonly name: "cancel";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "cancelled";
        readonly type: "bool";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "offerer";
                readonly type: "address";
            }, {
                readonly internalType: "address";
                readonly name: "zone";
                readonly type: "address";
            }, {
                readonly components: readonly [{
                    readonly internalType: "enum ItemType";
                    readonly name: "itemType";
                    readonly type: "uint8";
                }, {
                    readonly internalType: "address";
                    readonly name: "token";
                    readonly type: "address";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "identifierOrCriteria";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "startAmount";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "endAmount";
                    readonly type: "uint256";
                }];
                readonly internalType: "struct OfferItem[]";
                readonly name: "offer";
                readonly type: "tuple[]";
            }, {
                readonly components: readonly [{
                    readonly internalType: "enum ItemType";
                    readonly name: "itemType";
                    readonly type: "uint8";
                }, {
                    readonly internalType: "address";
                    readonly name: "token";
                    readonly type: "address";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "identifierOrCriteria";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "startAmount";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "endAmount";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "address payable";
                    readonly name: "recipient";
                    readonly type: "address";
                }];
                readonly internalType: "struct ConsiderationItem[]";
                readonly name: "consideration";
                readonly type: "tuple[]";
            }, {
                readonly internalType: "enum OrderType";
                readonly name: "orderType";
                readonly type: "uint8";
            }, {
                readonly internalType: "uint256";
                readonly name: "startTime";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "endTime";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes32";
                readonly name: "zoneHash";
                readonly type: "bytes32";
            }, {
                readonly internalType: "uint256";
                readonly name: "salt";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes32";
                readonly name: "conduitKey";
                readonly type: "bytes32";
            }, {
                readonly internalType: "uint256";
                readonly name: "totalOriginalConsiderationItems";
                readonly type: "uint256";
            }];
            readonly internalType: "struct OrderParameters";
            readonly name: "parameters";
            readonly type: "tuple";
        }, {
            readonly internalType: "uint120";
            readonly name: "numerator";
            readonly type: "uint120";
        }, {
            readonly internalType: "uint120";
            readonly name: "denominator";
            readonly type: "uint120";
        }, {
            readonly internalType: "bytes";
            readonly name: "signature";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes";
            readonly name: "extraData";
            readonly type: "bytes";
        }];
        readonly internalType: "struct AdvancedOrder";
        readonly name: "";
        readonly type: "tuple";
    }, {
        readonly components: readonly [{
            readonly internalType: "uint256";
            readonly name: "orderIndex";
            readonly type: "uint256";
        }, {
            readonly internalType: "enum Side";
            readonly name: "side";
            readonly type: "uint8";
        }, {
            readonly internalType: "uint256";
            readonly name: "index";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "identifier";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes32[]";
            readonly name: "criteriaProof";
            readonly type: "bytes32[]";
        }];
        readonly internalType: "struct CriteriaResolver[]";
        readonly name: "";
        readonly type: "tuple[]";
    }, {
        readonly internalType: "bytes32";
        readonly name: "fulfillerConduitKey";
        readonly type: "bytes32";
    }, {
        readonly internalType: "address";
        readonly name: "recipient";
        readonly type: "address";
    }];
    readonly name: "fulfillAdvancedOrder";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "fulfilled";
        readonly type: "bool";
    }];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "offerer";
                readonly type: "address";
            }, {
                readonly internalType: "address";
                readonly name: "zone";
                readonly type: "address";
            }, {
                readonly components: readonly [{
                    readonly internalType: "enum ItemType";
                    readonly name: "itemType";
                    readonly type: "uint8";
                }, {
                    readonly internalType: "address";
                    readonly name: "token";
                    readonly type: "address";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "identifierOrCriteria";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "startAmount";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "endAmount";
                    readonly type: "uint256";
                }];
                readonly internalType: "struct OfferItem[]";
                readonly name: "offer";
                readonly type: "tuple[]";
            }, {
                readonly components: readonly [{
                    readonly internalType: "enum ItemType";
                    readonly name: "itemType";
                    readonly type: "uint8";
                }, {
                    readonly internalType: "address";
                    readonly name: "token";
                    readonly type: "address";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "identifierOrCriteria";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "startAmount";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "endAmount";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "address payable";
                    readonly name: "recipient";
                    readonly type: "address";
                }];
                readonly internalType: "struct ConsiderationItem[]";
                readonly name: "consideration";
                readonly type: "tuple[]";
            }, {
                readonly internalType: "enum OrderType";
                readonly name: "orderType";
                readonly type: "uint8";
            }, {
                readonly internalType: "uint256";
                readonly name: "startTime";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "endTime";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes32";
                readonly name: "zoneHash";
                readonly type: "bytes32";
            }, {
                readonly internalType: "uint256";
                readonly name: "salt";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes32";
                readonly name: "conduitKey";
                readonly type: "bytes32";
            }, {
                readonly internalType: "uint256";
                readonly name: "totalOriginalConsiderationItems";
                readonly type: "uint256";
            }];
            readonly internalType: "struct OrderParameters";
            readonly name: "parameters";
            readonly type: "tuple";
        }, {
            readonly internalType: "uint120";
            readonly name: "numerator";
            readonly type: "uint120";
        }, {
            readonly internalType: "uint120";
            readonly name: "denominator";
            readonly type: "uint120";
        }, {
            readonly internalType: "bytes";
            readonly name: "signature";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes";
            readonly name: "extraData";
            readonly type: "bytes";
        }];
        readonly internalType: "struct AdvancedOrder[]";
        readonly name: "";
        readonly type: "tuple[]";
    }, {
        readonly components: readonly [{
            readonly internalType: "uint256";
            readonly name: "orderIndex";
            readonly type: "uint256";
        }, {
            readonly internalType: "enum Side";
            readonly name: "side";
            readonly type: "uint8";
        }, {
            readonly internalType: "uint256";
            readonly name: "index";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "identifier";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes32[]";
            readonly name: "criteriaProof";
            readonly type: "bytes32[]";
        }];
        readonly internalType: "struct CriteriaResolver[]";
        readonly name: "";
        readonly type: "tuple[]";
    }, {
        readonly components: readonly [{
            readonly internalType: "uint256";
            readonly name: "orderIndex";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "itemIndex";
            readonly type: "uint256";
        }];
        readonly internalType: "struct FulfillmentComponent[][]";
        readonly name: "";
        readonly type: "tuple[][]";
    }, {
        readonly components: readonly [{
            readonly internalType: "uint256";
            readonly name: "orderIndex";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "itemIndex";
            readonly type: "uint256";
        }];
        readonly internalType: "struct FulfillmentComponent[][]";
        readonly name: "";
        readonly type: "tuple[][]";
    }, {
        readonly internalType: "bytes32";
        readonly name: "fulfillerConduitKey";
        readonly type: "bytes32";
    }, {
        readonly internalType: "address";
        readonly name: "recipient";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "maximumFulfilled";
        readonly type: "uint256";
    }];
    readonly name: "fulfillAvailableAdvancedOrders";
    readonly outputs: readonly [{
        readonly internalType: "bool[]";
        readonly name: "";
        readonly type: "bool[]";
    }, {
        readonly components: readonly [{
            readonly components: readonly [{
                readonly internalType: "enum ItemType";
                readonly name: "itemType";
                readonly type: "uint8";
            }, {
                readonly internalType: "address";
                readonly name: "token";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "identifier";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }, {
                readonly internalType: "address payable";
                readonly name: "recipient";
                readonly type: "address";
            }];
            readonly internalType: "struct ReceivedItem";
            readonly name: "item";
            readonly type: "tuple";
        }, {
            readonly internalType: "address";
            readonly name: "offerer";
            readonly type: "address";
        }, {
            readonly internalType: "bytes32";
            readonly name: "conduitKey";
            readonly type: "bytes32";
        }];
        readonly internalType: "struct Execution[]";
        readonly name: "";
        readonly type: "tuple[]";
    }];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "offerer";
                readonly type: "address";
            }, {
                readonly internalType: "address";
                readonly name: "zone";
                readonly type: "address";
            }, {
                readonly components: readonly [{
                    readonly internalType: "enum ItemType";
                    readonly name: "itemType";
                    readonly type: "uint8";
                }, {
                    readonly internalType: "address";
                    readonly name: "token";
                    readonly type: "address";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "identifierOrCriteria";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "startAmount";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "endAmount";
                    readonly type: "uint256";
                }];
                readonly internalType: "struct OfferItem[]";
                readonly name: "offer";
                readonly type: "tuple[]";
            }, {
                readonly components: readonly [{
                    readonly internalType: "enum ItemType";
                    readonly name: "itemType";
                    readonly type: "uint8";
                }, {
                    readonly internalType: "address";
                    readonly name: "token";
                    readonly type: "address";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "identifierOrCriteria";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "startAmount";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "endAmount";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "address payable";
                    readonly name: "recipient";
                    readonly type: "address";
                }];
                readonly internalType: "struct ConsiderationItem[]";
                readonly name: "consideration";
                readonly type: "tuple[]";
            }, {
                readonly internalType: "enum OrderType";
                readonly name: "orderType";
                readonly type: "uint8";
            }, {
                readonly internalType: "uint256";
                readonly name: "startTime";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "endTime";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes32";
                readonly name: "zoneHash";
                readonly type: "bytes32";
            }, {
                readonly internalType: "uint256";
                readonly name: "salt";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes32";
                readonly name: "conduitKey";
                readonly type: "bytes32";
            }, {
                readonly internalType: "uint256";
                readonly name: "totalOriginalConsiderationItems";
                readonly type: "uint256";
            }];
            readonly internalType: "struct OrderParameters";
            readonly name: "parameters";
            readonly type: "tuple";
        }, {
            readonly internalType: "bytes";
            readonly name: "signature";
            readonly type: "bytes";
        }];
        readonly internalType: "struct Order[]";
        readonly name: "";
        readonly type: "tuple[]";
    }, {
        readonly components: readonly [{
            readonly internalType: "uint256";
            readonly name: "orderIndex";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "itemIndex";
            readonly type: "uint256";
        }];
        readonly internalType: "struct FulfillmentComponent[][]";
        readonly name: "";
        readonly type: "tuple[][]";
    }, {
        readonly components: readonly [{
            readonly internalType: "uint256";
            readonly name: "orderIndex";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "itemIndex";
            readonly type: "uint256";
        }];
        readonly internalType: "struct FulfillmentComponent[][]";
        readonly name: "";
        readonly type: "tuple[][]";
    }, {
        readonly internalType: "bytes32";
        readonly name: "fulfillerConduitKey";
        readonly type: "bytes32";
    }, {
        readonly internalType: "uint256";
        readonly name: "maximumFulfilled";
        readonly type: "uint256";
    }];
    readonly name: "fulfillAvailableOrders";
    readonly outputs: readonly [{
        readonly internalType: "bool[]";
        readonly name: "";
        readonly type: "bool[]";
    }, {
        readonly components: readonly [{
            readonly components: readonly [{
                readonly internalType: "enum ItemType";
                readonly name: "itemType";
                readonly type: "uint8";
            }, {
                readonly internalType: "address";
                readonly name: "token";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "identifier";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }, {
                readonly internalType: "address payable";
                readonly name: "recipient";
                readonly type: "address";
            }];
            readonly internalType: "struct ReceivedItem";
            readonly name: "item";
            readonly type: "tuple";
        }, {
            readonly internalType: "address";
            readonly name: "offerer";
            readonly type: "address";
        }, {
            readonly internalType: "bytes32";
            readonly name: "conduitKey";
            readonly type: "bytes32";
        }];
        readonly internalType: "struct Execution[]";
        readonly name: "";
        readonly type: "tuple[]";
    }];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "considerationToken";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "considerationIdentifier";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "considerationAmount";
            readonly type: "uint256";
        }, {
            readonly internalType: "address payable";
            readonly name: "offerer";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "zone";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "offerToken";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "offerIdentifier";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "offerAmount";
            readonly type: "uint256";
        }, {
            readonly internalType: "enum BasicOrderType";
            readonly name: "basicOrderType";
            readonly type: "uint8";
        }, {
            readonly internalType: "uint256";
            readonly name: "startTime";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "endTime";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes32";
            readonly name: "zoneHash";
            readonly type: "bytes32";
        }, {
            readonly internalType: "uint256";
            readonly name: "salt";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes32";
            readonly name: "offererConduitKey";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "fulfillerConduitKey";
            readonly type: "bytes32";
        }, {
            readonly internalType: "uint256";
            readonly name: "totalOriginalAdditionalRecipients";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }, {
                readonly internalType: "address payable";
                readonly name: "recipient";
                readonly type: "address";
            }];
            readonly internalType: "struct AdditionalRecipient[]";
            readonly name: "additionalRecipients";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "bytes";
            readonly name: "signature";
            readonly type: "bytes";
        }];
        readonly internalType: "struct BasicOrderParameters";
        readonly name: "parameters";
        readonly type: "tuple";
    }];
    readonly name: "fulfillBasicOrder";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "fulfilled";
        readonly type: "bool";
    }];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "considerationToken";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "considerationIdentifier";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "considerationAmount";
            readonly type: "uint256";
        }, {
            readonly internalType: "address payable";
            readonly name: "offerer";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "zone";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "offerToken";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "offerIdentifier";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "offerAmount";
            readonly type: "uint256";
        }, {
            readonly internalType: "enum BasicOrderType";
            readonly name: "basicOrderType";
            readonly type: "uint8";
        }, {
            readonly internalType: "uint256";
            readonly name: "startTime";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "endTime";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes32";
            readonly name: "zoneHash";
            readonly type: "bytes32";
        }, {
            readonly internalType: "uint256";
            readonly name: "salt";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes32";
            readonly name: "offererConduitKey";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "fulfillerConduitKey";
            readonly type: "bytes32";
        }, {
            readonly internalType: "uint256";
            readonly name: "totalOriginalAdditionalRecipients";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }, {
                readonly internalType: "address payable";
                readonly name: "recipient";
                readonly type: "address";
            }];
            readonly internalType: "struct AdditionalRecipient[]";
            readonly name: "additionalRecipients";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "bytes";
            readonly name: "signature";
            readonly type: "bytes";
        }];
        readonly internalType: "struct BasicOrderParameters";
        readonly name: "parameters";
        readonly type: "tuple";
    }];
    readonly name: "fulfillBasicOrder_efficient_6GL6yc";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "fulfilled";
        readonly type: "bool";
    }];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "offerer";
                readonly type: "address";
            }, {
                readonly internalType: "address";
                readonly name: "zone";
                readonly type: "address";
            }, {
                readonly components: readonly [{
                    readonly internalType: "enum ItemType";
                    readonly name: "itemType";
                    readonly type: "uint8";
                }, {
                    readonly internalType: "address";
                    readonly name: "token";
                    readonly type: "address";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "identifierOrCriteria";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "startAmount";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "endAmount";
                    readonly type: "uint256";
                }];
                readonly internalType: "struct OfferItem[]";
                readonly name: "offer";
                readonly type: "tuple[]";
            }, {
                readonly components: readonly [{
                    readonly internalType: "enum ItemType";
                    readonly name: "itemType";
                    readonly type: "uint8";
                }, {
                    readonly internalType: "address";
                    readonly name: "token";
                    readonly type: "address";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "identifierOrCriteria";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "startAmount";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "endAmount";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "address payable";
                    readonly name: "recipient";
                    readonly type: "address";
                }];
                readonly internalType: "struct ConsiderationItem[]";
                readonly name: "consideration";
                readonly type: "tuple[]";
            }, {
                readonly internalType: "enum OrderType";
                readonly name: "orderType";
                readonly type: "uint8";
            }, {
                readonly internalType: "uint256";
                readonly name: "startTime";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "endTime";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes32";
                readonly name: "zoneHash";
                readonly type: "bytes32";
            }, {
                readonly internalType: "uint256";
                readonly name: "salt";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes32";
                readonly name: "conduitKey";
                readonly type: "bytes32";
            }, {
                readonly internalType: "uint256";
                readonly name: "totalOriginalConsiderationItems";
                readonly type: "uint256";
            }];
            readonly internalType: "struct OrderParameters";
            readonly name: "parameters";
            readonly type: "tuple";
        }, {
            readonly internalType: "bytes";
            readonly name: "signature";
            readonly type: "bytes";
        }];
        readonly internalType: "struct Order";
        readonly name: "";
        readonly type: "tuple";
    }, {
        readonly internalType: "bytes32";
        readonly name: "fulfillerConduitKey";
        readonly type: "bytes32";
    }];
    readonly name: "fulfillOrder";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "fulfilled";
        readonly type: "bool";
    }];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "contractOfferer";
        readonly type: "address";
    }];
    readonly name: "getContractOffererNonce";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "nonce";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "offerer";
        readonly type: "address";
    }];
    readonly name: "getCounter";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "counter";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "offerer";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "zone";
            readonly type: "address";
        }, {
            readonly components: readonly [{
                readonly internalType: "enum ItemType";
                readonly name: "itemType";
                readonly type: "uint8";
            }, {
                readonly internalType: "address";
                readonly name: "token";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "identifierOrCriteria";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "startAmount";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "endAmount";
                readonly type: "uint256";
            }];
            readonly internalType: "struct OfferItem[]";
            readonly name: "offer";
            readonly type: "tuple[]";
        }, {
            readonly components: readonly [{
                readonly internalType: "enum ItemType";
                readonly name: "itemType";
                readonly type: "uint8";
            }, {
                readonly internalType: "address";
                readonly name: "token";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "identifierOrCriteria";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "startAmount";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "endAmount";
                readonly type: "uint256";
            }, {
                readonly internalType: "address payable";
                readonly name: "recipient";
                readonly type: "address";
            }];
            readonly internalType: "struct ConsiderationItem[]";
            readonly name: "consideration";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "enum OrderType";
            readonly name: "orderType";
            readonly type: "uint8";
        }, {
            readonly internalType: "uint256";
            readonly name: "startTime";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "endTime";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes32";
            readonly name: "zoneHash";
            readonly type: "bytes32";
        }, {
            readonly internalType: "uint256";
            readonly name: "salt";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes32";
            readonly name: "conduitKey";
            readonly type: "bytes32";
        }, {
            readonly internalType: "uint256";
            readonly name: "counter";
            readonly type: "uint256";
        }];
        readonly internalType: "struct OrderComponents";
        readonly name: "";
        readonly type: "tuple";
    }];
    readonly name: "getOrderHash";
    readonly outputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "orderHash";
        readonly type: "bytes32";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "orderHash";
        readonly type: "bytes32";
    }];
    readonly name: "getOrderStatus";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "isValidated";
        readonly type: "bool";
    }, {
        readonly internalType: "bool";
        readonly name: "isCancelled";
        readonly type: "bool";
    }, {
        readonly internalType: "uint256";
        readonly name: "totalFilled";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "totalSize";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "incrementCounter";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "newCounter";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "information";
    readonly outputs: readonly [{
        readonly internalType: "string";
        readonly name: "version";
        readonly type: "string";
    }, {
        readonly internalType: "bytes32";
        readonly name: "domainSeparator";
        readonly type: "bytes32";
    }, {
        readonly internalType: "address";
        readonly name: "conduitController";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "offerer";
                readonly type: "address";
            }, {
                readonly internalType: "address";
                readonly name: "zone";
                readonly type: "address";
            }, {
                readonly components: readonly [{
                    readonly internalType: "enum ItemType";
                    readonly name: "itemType";
                    readonly type: "uint8";
                }, {
                    readonly internalType: "address";
                    readonly name: "token";
                    readonly type: "address";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "identifierOrCriteria";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "startAmount";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "endAmount";
                    readonly type: "uint256";
                }];
                readonly internalType: "struct OfferItem[]";
                readonly name: "offer";
                readonly type: "tuple[]";
            }, {
                readonly components: readonly [{
                    readonly internalType: "enum ItemType";
                    readonly name: "itemType";
                    readonly type: "uint8";
                }, {
                    readonly internalType: "address";
                    readonly name: "token";
                    readonly type: "address";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "identifierOrCriteria";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "startAmount";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "endAmount";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "address payable";
                    readonly name: "recipient";
                    readonly type: "address";
                }];
                readonly internalType: "struct ConsiderationItem[]";
                readonly name: "consideration";
                readonly type: "tuple[]";
            }, {
                readonly internalType: "enum OrderType";
                readonly name: "orderType";
                readonly type: "uint8";
            }, {
                readonly internalType: "uint256";
                readonly name: "startTime";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "endTime";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes32";
                readonly name: "zoneHash";
                readonly type: "bytes32";
            }, {
                readonly internalType: "uint256";
                readonly name: "salt";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes32";
                readonly name: "conduitKey";
                readonly type: "bytes32";
            }, {
                readonly internalType: "uint256";
                readonly name: "totalOriginalConsiderationItems";
                readonly type: "uint256";
            }];
            readonly internalType: "struct OrderParameters";
            readonly name: "parameters";
            readonly type: "tuple";
        }, {
            readonly internalType: "uint120";
            readonly name: "numerator";
            readonly type: "uint120";
        }, {
            readonly internalType: "uint120";
            readonly name: "denominator";
            readonly type: "uint120";
        }, {
            readonly internalType: "bytes";
            readonly name: "signature";
            readonly type: "bytes";
        }, {
            readonly internalType: "bytes";
            readonly name: "extraData";
            readonly type: "bytes";
        }];
        readonly internalType: "struct AdvancedOrder[]";
        readonly name: "";
        readonly type: "tuple[]";
    }, {
        readonly components: readonly [{
            readonly internalType: "uint256";
            readonly name: "orderIndex";
            readonly type: "uint256";
        }, {
            readonly internalType: "enum Side";
            readonly name: "side";
            readonly type: "uint8";
        }, {
            readonly internalType: "uint256";
            readonly name: "index";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "identifier";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes32[]";
            readonly name: "criteriaProof";
            readonly type: "bytes32[]";
        }];
        readonly internalType: "struct CriteriaResolver[]";
        readonly name: "";
        readonly type: "tuple[]";
    }, {
        readonly components: readonly [{
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "orderIndex";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "itemIndex";
                readonly type: "uint256";
            }];
            readonly internalType: "struct FulfillmentComponent[]";
            readonly name: "offerComponents";
            readonly type: "tuple[]";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "orderIndex";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "itemIndex";
                readonly type: "uint256";
            }];
            readonly internalType: "struct FulfillmentComponent[]";
            readonly name: "considerationComponents";
            readonly type: "tuple[]";
        }];
        readonly internalType: "struct Fulfillment[]";
        readonly name: "";
        readonly type: "tuple[]";
    }, {
        readonly internalType: "address";
        readonly name: "recipient";
        readonly type: "address";
    }];
    readonly name: "matchAdvancedOrders";
    readonly outputs: readonly [{
        readonly components: readonly [{
            readonly components: readonly [{
                readonly internalType: "enum ItemType";
                readonly name: "itemType";
                readonly type: "uint8";
            }, {
                readonly internalType: "address";
                readonly name: "token";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "identifier";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }, {
                readonly internalType: "address payable";
                readonly name: "recipient";
                readonly type: "address";
            }];
            readonly internalType: "struct ReceivedItem";
            readonly name: "item";
            readonly type: "tuple";
        }, {
            readonly internalType: "address";
            readonly name: "offerer";
            readonly type: "address";
        }, {
            readonly internalType: "bytes32";
            readonly name: "conduitKey";
            readonly type: "bytes32";
        }];
        readonly internalType: "struct Execution[]";
        readonly name: "";
        readonly type: "tuple[]";
    }];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "offerer";
                readonly type: "address";
            }, {
                readonly internalType: "address";
                readonly name: "zone";
                readonly type: "address";
            }, {
                readonly components: readonly [{
                    readonly internalType: "enum ItemType";
                    readonly name: "itemType";
                    readonly type: "uint8";
                }, {
                    readonly internalType: "address";
                    readonly name: "token";
                    readonly type: "address";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "identifierOrCriteria";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "startAmount";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "endAmount";
                    readonly type: "uint256";
                }];
                readonly internalType: "struct OfferItem[]";
                readonly name: "offer";
                readonly type: "tuple[]";
            }, {
                readonly components: readonly [{
                    readonly internalType: "enum ItemType";
                    readonly name: "itemType";
                    readonly type: "uint8";
                }, {
                    readonly internalType: "address";
                    readonly name: "token";
                    readonly type: "address";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "identifierOrCriteria";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "startAmount";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "endAmount";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "address payable";
                    readonly name: "recipient";
                    readonly type: "address";
                }];
                readonly internalType: "struct ConsiderationItem[]";
                readonly name: "consideration";
                readonly type: "tuple[]";
            }, {
                readonly internalType: "enum OrderType";
                readonly name: "orderType";
                readonly type: "uint8";
            }, {
                readonly internalType: "uint256";
                readonly name: "startTime";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "endTime";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes32";
                readonly name: "zoneHash";
                readonly type: "bytes32";
            }, {
                readonly internalType: "uint256";
                readonly name: "salt";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes32";
                readonly name: "conduitKey";
                readonly type: "bytes32";
            }, {
                readonly internalType: "uint256";
                readonly name: "totalOriginalConsiderationItems";
                readonly type: "uint256";
            }];
            readonly internalType: "struct OrderParameters";
            readonly name: "parameters";
            readonly type: "tuple";
        }, {
            readonly internalType: "bytes";
            readonly name: "signature";
            readonly type: "bytes";
        }];
        readonly internalType: "struct Order[]";
        readonly name: "";
        readonly type: "tuple[]";
    }, {
        readonly components: readonly [{
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "orderIndex";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "itemIndex";
                readonly type: "uint256";
            }];
            readonly internalType: "struct FulfillmentComponent[]";
            readonly name: "offerComponents";
            readonly type: "tuple[]";
        }, {
            readonly components: readonly [{
                readonly internalType: "uint256";
                readonly name: "orderIndex";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "itemIndex";
                readonly type: "uint256";
            }];
            readonly internalType: "struct FulfillmentComponent[]";
            readonly name: "considerationComponents";
            readonly type: "tuple[]";
        }];
        readonly internalType: "struct Fulfillment[]";
        readonly name: "";
        readonly type: "tuple[]";
    }];
    readonly name: "matchOrders";
    readonly outputs: readonly [{
        readonly components: readonly [{
            readonly components: readonly [{
                readonly internalType: "enum ItemType";
                readonly name: "itemType";
                readonly type: "uint8";
            }, {
                readonly internalType: "address";
                readonly name: "token";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "identifier";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }, {
                readonly internalType: "address payable";
                readonly name: "recipient";
                readonly type: "address";
            }];
            readonly internalType: "struct ReceivedItem";
            readonly name: "item";
            readonly type: "tuple";
        }, {
            readonly internalType: "address";
            readonly name: "offerer";
            readonly type: "address";
        }, {
            readonly internalType: "bytes32";
            readonly name: "conduitKey";
            readonly type: "bytes32";
        }];
        readonly internalType: "struct Execution[]";
        readonly name: "";
        readonly type: "tuple[]";
    }];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [];
    readonly name: "name";
    readonly outputs: readonly [{
        readonly internalType: "string";
        readonly name: "";
        readonly type: "string";
    }];
    readonly stateMutability: "pure";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "offerer";
                readonly type: "address";
            }, {
                readonly internalType: "address";
                readonly name: "zone";
                readonly type: "address";
            }, {
                readonly components: readonly [{
                    readonly internalType: "enum ItemType";
                    readonly name: "itemType";
                    readonly type: "uint8";
                }, {
                    readonly internalType: "address";
                    readonly name: "token";
                    readonly type: "address";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "identifierOrCriteria";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "startAmount";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "endAmount";
                    readonly type: "uint256";
                }];
                readonly internalType: "struct OfferItem[]";
                readonly name: "offer";
                readonly type: "tuple[]";
            }, {
                readonly components: readonly [{
                    readonly internalType: "enum ItemType";
                    readonly name: "itemType";
                    readonly type: "uint8";
                }, {
                    readonly internalType: "address";
                    readonly name: "token";
                    readonly type: "address";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "identifierOrCriteria";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "startAmount";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "uint256";
                    readonly name: "endAmount";
                    readonly type: "uint256";
                }, {
                    readonly internalType: "address payable";
                    readonly name: "recipient";
                    readonly type: "address";
                }];
                readonly internalType: "struct ConsiderationItem[]";
                readonly name: "consideration";
                readonly type: "tuple[]";
            }, {
                readonly internalType: "enum OrderType";
                readonly name: "orderType";
                readonly type: "uint8";
            }, {
                readonly internalType: "uint256";
                readonly name: "startTime";
                readonly type: "uint256";
            }, {
                readonly internalType: "uint256";
                readonly name: "endTime";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes32";
                readonly name: "zoneHash";
                readonly type: "bytes32";
            }, {
                readonly internalType: "uint256";
                readonly name: "salt";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes32";
                readonly name: "conduitKey";
                readonly type: "bytes32";
            }, {
                readonly internalType: "uint256";
                readonly name: "totalOriginalConsiderationItems";
                readonly type: "uint256";
            }];
            readonly internalType: "struct OrderParameters";
            readonly name: "parameters";
            readonly type: "tuple";
        }, {
            readonly internalType: "bytes";
            readonly name: "signature";
            readonly type: "bytes";
        }];
        readonly internalType: "struct Order[]";
        readonly name: "";
        readonly type: "tuple[]";
    }];
    readonly name: "validate";
    readonly outputs: readonly [{
        readonly internalType: "bool";
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly stateMutability: "payable";
    readonly type: "receive";
}];
