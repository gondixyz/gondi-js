export const positionMigratorAbi = [
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "_name",
        "type": "string",
        "internalType": "string"
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
    "name": "executeOperation",
    "inputs": [
      {
        "name": "assets",
        "type": "address[]",
        "internalType": "address[]"
      },
      {
        "name": "amounts",
        "type": "uint256[]",
        "internalType": "uint256[]"
      },
      {
        "name": "premiums",
        "type": "uint256[]",
        "internalType": "uint256[]"
      },
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      },
      {
        "name": "params",
        "type": "bytes",
        "internalType": "bytes"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "nonpayable"
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
        "internalType": "struct IFlashLoanRenegotiation.SmartMigrationArgs",
        "components": [
          {
            "name": "migrationArgs",
            "type": "tuple",
            "internalType": "struct IFlashLoanRenegotiation.PositionMigrationArgs",
            "components": [
              {
                "name": "close",
                "type": "tuple",
                "internalType": "struct IFlashLoanRenegotiation.Position",
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
                "internalType": "struct IFlashLoanRenegotiation.Position",
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
                "internalType": "struct IFlashLoanRenegotiation.AaveBorrowArgs",
                "components": [
                  {
                    "name": "pool",
                    "type": "address",
                    "internalType": "contract IPool"
                  },
                  {
                    "name": "recipient",
                    "type": "address",
                    "internalType": "address"
                  },
                  {
                    "name": "assets",
                    "type": "address[]",
                    "internalType": "address[]"
                  },
                  {
                    "name": "amounts",
                    "type": "uint256[]",
                    "internalType": "uint256[]"
                  }
                ]
              },
              {
                "name": "migrator",
                "type": "address",
                "internalType": "address"
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
    "name": "InvalidSignatureError",
    "inputs": []
  },
  {
    "type": "error",
    "name": "TargetContractCallFailed",
    "inputs": []
  }
] as const;
