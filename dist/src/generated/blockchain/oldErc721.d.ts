export declare const oldErc721Abi: readonly [{
    readonly constant: false;
    readonly inputs: readonly [{
        readonly name: "_uri";
        readonly type: "string";
    }, {
        readonly name: "_editions";
        readonly type: "uint256";
    }, {
        readonly name: "_salePrice";
        readonly type: "uint256";
    }];
    readonly name: "addNewTokenWithEditions";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly name: "_tokenId";
        readonly type: "uint256";
    }, {
        readonly name: "_salePrice";
        readonly type: "uint256";
    }];
    readonly name: "setSalePrice";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "name";
    readonly outputs: readonly [{
        readonly name: "_name";
        readonly type: "string";
    }];
    readonly payable: false;
    readonly stateMutability: "pure";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly name: "_to";
        readonly type: "address";
    }, {
        readonly name: "_tokenId";
        readonly type: "uint256";
    }];
    readonly name: "approve";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "totalSupply";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly name: "_tokenId";
        readonly type: "uint256";
    }];
    readonly name: "currentBidDetailsOfToken";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }, {
        readonly name: "";
        readonly type: "address";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly name: "_tokenId";
        readonly type: "uint256";
    }];
    readonly name: "approvedFor";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly name: "_tokenId";
        readonly type: "uint256";
    }];
    readonly name: "acceptBid";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly name: "_creator";
        readonly type: "address";
    }];
    readonly name: "isWhitelisted";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly name: "_tokenId";
        readonly type: "uint256";
    }];
    readonly name: "bid";
    readonly outputs: readonly [];
    readonly payable: true;
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly name: "_owner";
        readonly type: "address";
    }];
    readonly name: "tokensOf";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256[]";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly name: "_percentage";
        readonly type: "uint256";
    }];
    readonly name: "setMaintainerPercentage";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly name: "_creator";
        readonly type: "address";
    }];
    readonly name: "whitelistCreator";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly name: "_tokenId";
        readonly type: "uint256";
    }];
    readonly name: "ownerOf";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly name: "_uri";
        readonly type: "string";
    }];
    readonly name: "originalTokenOfUri";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly name: "_owner";
        readonly type: "address";
    }];
    readonly name: "balanceOf";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "owner";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "symbol";
    readonly outputs: readonly [{
        readonly name: "_symbol";
        readonly type: "string";
    }];
    readonly payable: false;
    readonly stateMutability: "pure";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly name: "_tokenId";
        readonly type: "uint256";
    }];
    readonly name: "cancelBid";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly name: "_tokenId";
        readonly type: "uint256";
    }];
    readonly name: "salePriceOfToken";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly name: "_to";
        readonly type: "address";
    }, {
        readonly name: "_tokenId";
        readonly type: "uint256";
    }];
    readonly name: "transfer";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly name: "_tokenId";
        readonly type: "uint256";
    }];
    readonly name: "takeOwnership";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly name: "_percentage";
        readonly type: "uint256";
    }];
    readonly name: "setCreatorPercentage";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly name: "_tokenId";
        readonly type: "uint256";
    }];
    readonly name: "tokenURI";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "string";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [{
        readonly name: "_tokenId";
        readonly type: "uint256";
    }];
    readonly name: "creatorOfToken";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly name: "_tokenId";
        readonly type: "uint256";
    }];
    readonly name: "buy";
    readonly outputs: readonly [];
    readonly payable: true;
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly name: "_uri";
        readonly type: "string";
    }];
    readonly name: "addNewToken";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "creatorPercentage";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: true;
    readonly inputs: readonly [];
    readonly name: "maintainerPercentage";
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly payable: false;
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly constant: false;
    readonly inputs: readonly [{
        readonly name: "newOwner";
        readonly type: "address";
    }];
    readonly name: "transferOwnership";
    readonly outputs: readonly [];
    readonly payable: false;
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "_creator";
        readonly type: "address";
    }];
    readonly name: "WhitelistCreator";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "_bidder";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly name: "_amount";
        readonly type: "uint256";
    }, {
        readonly indexed: true;
        readonly name: "_tokenId";
        readonly type: "uint256";
    }];
    readonly name: "Bid";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "_bidder";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly name: "_seller";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly name: "_amount";
        readonly type: "uint256";
    }, {
        readonly indexed: true;
        readonly name: "_tokenId";
        readonly type: "uint256";
    }];
    readonly name: "AcceptBid";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "_bidder";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly name: "_amount";
        readonly type: "uint256";
    }, {
        readonly indexed: true;
        readonly name: "_tokenId";
        readonly type: "uint256";
    }];
    readonly name: "CancelBid";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "_buyer";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly name: "_seller";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly name: "_amount";
        readonly type: "uint256";
    }, {
        readonly indexed: true;
        readonly name: "_tokenId";
        readonly type: "uint256";
    }];
    readonly name: "Sold";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "_tokenId";
        readonly type: "uint256";
    }, {
        readonly indexed: true;
        readonly name: "_price";
        readonly type: "uint256";
    }];
    readonly name: "SalePriceSet";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "previousOwner";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly name: "newOwner";
        readonly type: "address";
    }];
    readonly name: "OwnershipTransferred";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "_from";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly name: "_to";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly name: "_tokenId";
        readonly type: "uint256";
    }];
    readonly name: "Transfer";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly name: "_owner";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly name: "_approved";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly name: "_tokenId";
        readonly type: "uint256";
    }];
    readonly name: "Approval";
    readonly type: "event";
}];
