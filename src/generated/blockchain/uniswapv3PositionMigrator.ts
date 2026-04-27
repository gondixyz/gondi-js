export const uniswapv3PositionMigrator = [
    {
        "type": "constructor",
        "inputs": [
            {
                "name": "_name",
                "type": "string",
                "internalType": "string"
            },
            {
                "name": "addressManager",
                "type": "address",
                "internalType": "address"
            },
            {
                "name": "uniswapV3Factory",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "DOMAIN_SEPARATOR",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "INITIAL_DOMAIN_SEPARATOR",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "VERSION",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "getNonce",
        "inputs": [
            {
                "name": "account",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "nonce",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "name",
        "inputs": [],
        "outputs": [
            {
                "name": "",
                "type": "string",
                "internalType": "string"
            }
        ],
        "stateMutability": "view"
    },
    {
        "type": "function",
        "name": "smartMigrate",
        "inputs": [
            {
                "name": "args",
                "type": "tuple",
                "internalType": "struct IUniswapV3PositionMigrator.SmartMigrationArgs",
                "components": [
                    {
                        "name": "migrationArgs",
                        "type": "tuple",
                        "internalType": "struct IUniswapV3PositionMigrator.PositionMigrationArgs",
                        "components": [
                            {
                                "name": "close",
                                "type": "tuple",
                                "internalType": "struct IPositionMigrator.Position",
                                "components": [
                                    {
                                        "name": "contractAddress",
                                        "type": "address",
                                        "internalType": "address"
                                    },
                                    {
                                        "name": "callData",
                                        "type": "bytes",
                                        "internalType": "bytes"
                                    },
                                    {
                                        "name": "value",
                                        "type": "uint256",
                                        "internalType": "uint256"
                                    }
                                ]
                            },
                            {
                                "name": "open",
                                "type": "tuple",
                                "internalType": "struct IPositionMigrator.Position",
                                "components": [
                                    {
                                        "name": "contractAddress",
                                        "type": "address",
                                        "internalType": "address"
                                    },
                                    {
                                        "name": "callData",
                                        "type": "bytes",
                                        "internalType": "bytes"
                                    },
                                    {
                                        "name": "value",
                                        "type": "uint256",
                                        "internalType": "uint256"
                                    }
                                ]
                            },
                            {
                                "name": "borrowArgs",
                                "type": "tuple",
                                "internalType": "struct IUniswapV3PositionMigrator.UniswapV3BorrowArgs",
                                "components": [
                                    {
                                        "name": "token0",
                                        "type": "address",
                                        "internalType": "address"
                                    },
                                    {
                                        "name": "token1",
                                        "type": "address",
                                        "internalType": "address"
                                    },
                                    {
                                        "name": "fee",
                                        "type": "uint24",
                                        "internalType": "uint24"
                                    },
                                    {
                                        "name": "recipient",
                                        "type": "address",
                                        "internalType": "address"
                                    },
                                    {
                                        "name": "amount0",
                                        "type": "uint256",
                                        "internalType": "uint256"
                                    },
                                    {
                                        "name": "amount1",
                                        "type": "uint256",
                                        "internalType": "uint256"
                                    }
                                ]
                            },
                            {
                                "name": "approvalContract",
                                "type": "address",
                                "internalType": "address"
                            },
                            {
                                "name": "migrator",
                                "type": "address",
                                "internalType": "address"
                            },
                            {
                                "name": "nonce",
                                "type": "uint256",
                                "internalType": "uint256"
                            }
                        ]
                    },
                    {
                        "name": "migratorSignature",
                        "type": "bytes",
                        "internalType": "bytes"
                    }
                ]
            }
        ],
        "outputs": [],
        "stateMutability": "payable"
    },
    {
        "type": "function",
        "name": "uniswapV3FlashCallback",
        "inputs": [
            {
                "name": "fee0",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "fee1",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "data",
                "type": "bytes",
                "internalType": "bytes"
            }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "event",
        "name": "SmartMigration",
        "inputs": [
            {
                "name": "closeContract",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            },
            {
                "name": "openContract",
                "type": "address",
                "indexed": false,
                "internalType": "address"
            }
        ],
        "anonymous": false
    },
    {
        "type": "error",
        "name": "AddressZeroError",
        "inputs": []
    },
    {
        "type": "error",
        "name": "ECDSAInvalidSignature",
        "inputs": []
    },
    {
        "type": "error",
        "name": "ECDSAInvalidSignatureLength",
        "inputs": [
            {
                "name": "length",
                "type": "uint256",
                "internalType": "uint256"
            }
        ]
    },
    {
        "type": "error",
        "name": "ECDSAInvalidSignatureS",
        "inputs": [
            {
                "name": "s",
                "type": "bytes32",
                "internalType": "bytes32"
            }
        ]
    },
    {
        "type": "error",
        "name": "InvalidNonceError",
        "inputs": []
    },
    {
        "type": "error",
        "name": "InvalidPoolFlowError",
        "inputs": []
    },
    {
        "type": "error",
        "name": "InvalidSignatureError",
        "inputs": []
    },
    {
        "type": "error",
        "name": "NotWhitelistedAddressError",
        "inputs": []
    },
    {
        "type": "error",
        "name": "TargetContractCallFailed",
        "inputs": []
    }
] as const;
