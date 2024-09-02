export declare const cryptopunksABI: readonly [{
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "name";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "string";
    }];
    readonly payable: false;
    readonly type: "function";
    readonly stateMutability: "view";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly name: "punksOfferedForSale";
    readonly outputs: readonly [{
        readonly name: "isForSale";
        readonly type: "bool";
    }, {
        readonly name: "punkIndex";
        readonly type: "uint256";
    }, {
        readonly name: "seller";
        readonly type: "address";
    }, {
        readonly name: "minValue";
        readonly type: "uint256";
    }, {
        readonly name: "onlySellTo";
        readonly type: "address";
    }];
    readonly payable: false;
    readonly type: "function";
    readonly stateMutability: "view";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly name: "punkIndex";
        readonly type: "uint256";
    }];
    readonly name: "enterBidForPunk";
    readonly outputs: readonly [];
    readonly payable: true;
    readonly type: "function";
    readonly stateMutability: "payable";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "totalSupply";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly type: "function";
    readonly stateMutability: "view";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly name: "punkIndex";
        readonly type: "uint256";
    }, {
        readonly name: "minPrice";
        readonly type: "uint256";
    }];
    readonly name: "acceptBidForPunk";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly type: "function";
    readonly stateMutability: "nonpayable";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "decimals";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint8";
    }];
    readonly payable: false;
    readonly type: "function";
    readonly stateMutability: "view";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly name: "addresses";
        readonly type: "address[]";
    }, {
        readonly name: "indices";
        readonly type: "uint256[]";
    }];
    readonly name: "setInitialOwners";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly type: "function";
    readonly stateMutability: "nonpayable";
}, {
    readonly constant: false;
    readonly inputs: readonly [];
    readonly name: "withdraw";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly type: "function";
    readonly stateMutability: "nonpayable";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "imageHash";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "string";
    }];
    readonly payable: false;
    readonly type: "function";
    readonly stateMutability: "view";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "nextPunkIndexToAssign";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly type: "function";
    readonly stateMutability: "view";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly name: "punkIndexToAddress";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
    }];
    readonly payable: false;
    readonly type: "function";
    readonly stateMutability: "view";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "standard";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "string";
    }];
    readonly payable: false;
    readonly type: "function";
    readonly stateMutability: "view";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly name: "punkBids";
    readonly outputs: readonly [{
        readonly name: "hasBid";
        readonly type: "bool";
    }, {
        readonly name: "punkIndex";
        readonly type: "uint256";
    }, {
        readonly name: "bidder";
        readonly type: "address";
    }, {
        readonly name: "value";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly type: "function";
    readonly stateMutability: "view";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly name: "";
        readonly type: "address";
    }];
    readonly name: "balanceOf";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly type: "function";
    readonly stateMutability: "view";
}, {
    readonly constant: false;
    readonly inputs: readonly [];
    readonly name: "allInitialOwnersAssigned";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly type: "function";
    readonly stateMutability: "nonpayable";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "allPunksAssigned";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
    }];
    readonly payable: false;
    readonly type: "function";
    readonly stateMutability: "view";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly name: "punkIndex";
        readonly type: "uint256";
    }];
    readonly name: "buyPunk";
    readonly outputs: readonly [];
    readonly payable: true;
    readonly type: "function";
    readonly stateMutability: "payable";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly name: "to";
        readonly type: "address";
    }, {
        readonly name: "punkIndex";
        readonly type: "uint256";
    }];
    readonly name: "transferPunk";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly type: "function";
    readonly stateMutability: "nonpayable";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "symbol";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "string";
    }];
    readonly payable: false;
    readonly type: "function";
    readonly stateMutability: "view";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly name: "punkIndex";
        readonly type: "uint256";
    }];
    readonly name: "withdrawBidForPunk";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly type: "function";
    readonly stateMutability: "nonpayable";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly name: "to";
        readonly type: "address";
    }, {
        readonly name: "punkIndex";
        readonly type: "uint256";
    }];
    readonly name: "setInitialOwner";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly type: "function";
    readonly stateMutability: "nonpayable";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly name: "punkIndex";
        readonly type: "uint256";
    }, {
        readonly name: "minSalePriceInWei";
        readonly type: "uint256";
    }, {
        readonly name: "toAddress";
        readonly type: "address";
    }];
    readonly name: "offerPunkForSaleToAddress";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly type: "function";
    readonly stateMutability: "nonpayable";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "punksRemainingToAssign";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly type: "function";
    readonly stateMutability: "view";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly name: "punkIndex";
        readonly type: "uint256";
    }, {
        readonly name: "minSalePriceInWei";
        readonly type: "uint256";
    }];
    readonly name: "offerPunkForSale";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly type: "function";
    readonly stateMutability: "nonpayable";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly name: "punkIndex";
        readonly type: "uint256";
    }];
    readonly name: "getPunk";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly type: "function";
    readonly stateMutability: "nonpayable";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly name: "";
        readonly type: "address";
    }];
    readonly name: "pendingWithdrawals";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly type: "function";
    readonly stateMutability: "view";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly name: "punkIndex";
        readonly type: "uint256";
    }];
    readonly name: "punkNoLongerForSale";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly type: "function";
    readonly stateMutability: "nonpayable";
}, {
    readonly inputs: readonly [];
    readonly payable: true;
    readonly type: "constructor";
    readonly stateMutability: "payable";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "to";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly name: "punkIndex";
        readonly type: "uint256";
    }];
    readonly name: "Assign";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "from";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly name: "to";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly name: "value";
        readonly type: "uint256";
    }];
    readonly name: "Transfer";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "from";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly name: "to";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly name: "punkIndex";
        readonly type: "uint256";
    }];
    readonly name: "PunkTransfer";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "punkIndex";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly name: "minValue";
        readonly type: "uint256";
    }, {
        readonly indexed: true;
        readonly name: "toAddress";
        readonly type: "address";
    }];
    readonly name: "PunkOffered";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "punkIndex";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly name: "value";
        readonly type: "uint256";
    }, {
        readonly indexed: true;
        readonly name: "fromAddress";
        readonly type: "address";
    }];
    readonly name: "PunkBidEntered";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "punkIndex";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly name: "value";
        readonly type: "uint256";
    }, {
        readonly indexed: true;
        readonly name: "fromAddress";
        readonly type: "address";
    }];
    readonly name: "PunkBidWithdrawn";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "punkIndex";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly name: "value";
        readonly type: "uint256";
    }, {
        readonly indexed: true;
        readonly name: "fromAddress";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly name: "toAddress";
        readonly type: "address";
    }];
    readonly name: "PunkBought";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "punkIndex";
        readonly type: "uint256";
    }];
    readonly name: "PunkNoLongerForSale";
    readonly type: "event";
}];
