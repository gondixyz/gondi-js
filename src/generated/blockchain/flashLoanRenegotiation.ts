export const flashLoanRenegotiationAbi = [
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
    "name": "smartRenegotiation",
    "inputs": [
      {
        "name": "args",
        "type": "tuple",
        "internalType": "struct IFlashLoanRenegotiation.SmartRenegotiationLoanArgs",
        "components": [
          {
            "name": "targetContract",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "callData",
            "type": "bytes",
            "internalType": "bytes"
          },
          {
            "name": "emitLoanArgs",
            "type": "tuple",
            "internalType": "struct IFlashLoanRenegotiation.EmitLoanArgs",
            "components": [
              {
                "name": "loanAddress",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "loanExecutionData",
                "type": "tuple",
                "internalType": "struct IMultiSourceLoan.LoanExecutionData",
                "components": [
                  {
                    "name": "executionData",
                    "type": "tuple",
                    "internalType": "struct IMultiSourceLoan.ExecutionData",
                    "components": [
                      {
                        "name": "offerExecution",
                        "type": "tuple[]",
                        "internalType": "struct IMultiSourceLoan.OfferExecution[]",
                        "components": [
                          {
                            "name": "offer",
                            "type": "tuple",
                            "internalType": "struct IMultiSourceLoan.LoanOffer",
                            "components": [
                              {
                                "name": "offerId",
                                "type": "uint256",
                                "internalType": "uint256"
                              },
                              {
                                "name": "lender",
                                "type": "address",
                                "internalType": "address"
                              },
                              {
                                "name": "fee",
                                "type": "uint256",
                                "internalType": "uint256"
                              },
                              {
                                "name": "capacity",
                                "type": "uint256",
                                "internalType": "uint256"
                              },
                              {
                                "name": "nftCollateralAddress",
                                "type": "address",
                                "internalType": "address"
                              },
                              {
                                "name": "nftCollateralTokenId",
                                "type": "uint256",
                                "internalType": "uint256"
                              },
                              {
                                "name": "principalAddress",
                                "type": "address",
                                "internalType": "address"
                              },
                              {
                                "name": "principalAmount",
                                "type": "uint256",
                                "internalType": "uint256"
                              },
                              {
                                "name": "aprBps",
                                "type": "uint256",
                                "internalType": "uint256"
                              },
                              {
                                "name": "expirationTime",
                                "type": "uint256",
                                "internalType": "uint256"
                              },
                              {
                                "name": "duration",
                                "type": "uint256",
                                "internalType": "uint256"
                              },
                              {
                                "name": "maxSeniorRepayment",
                                "type": "uint256",
                                "internalType": "uint256"
                              },
                              {
                                "name": "validators",
                                "type": "tuple[]",
                                "internalType": "struct IBaseLoan.OfferValidator[]",
                                "components": [
                                  {
                                    "name": "validator",
                                    "type": "address",
                                    "internalType": "address"
                                  },
                                  {
                                    "name": "arguments",
                                    "type": "bytes",
                                    "internalType": "bytes"
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            "name": "amount",
                            "type": "uint256",
                            "internalType": "uint256"
                          },
                          {
                            "name": "lenderOfferSignature",
                            "type": "bytes",
                            "internalType": "bytes"
                          }
                        ]
                      },
                      {
                        "name": "loanId",
                        "type": "uint256",
                        "internalType": "uint256"
                      },
                      {
                        "name": "nftCollateralAddress",
                        "type": "address",
                        "internalType": "address"
                      },
                      {
                        "name": "tokenId",
                        "type": "uint256",
                        "internalType": "uint256"
                      },
                      {
                        "name": "duration",
                        "type": "uint256",
                        "internalType": "uint256"
                      },
                      {
                        "name": "expirationTime",
                        "type": "uint256",
                        "internalType": "uint256"
                      },
                      {
                        "name": "principalReceiver",
                        "type": "address",
                        "internalType": "address"
                      },
                      {
                        "name": "callbackData",
                        "type": "bytes",
                        "internalType": "bytes"
                      }
                    ]
                  },
                  {
                    "name": "borrower",
                    "type": "address",
                    "internalType": "address"
                  },
                  {
                    "name": "borrowerOfferSignature",
                    "type": "bytes",
                    "internalType": "bytes"
                  }
                ]
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
          }
        ]
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "SmartRenegotiation",
    "inputs": [
      {
        "name": "targetContract",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "newContract",
        "type": "address",
        "indexed": false,
        "internalType": "address"
      },
      {
        "name": "newLoanId",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  }
] as const;
