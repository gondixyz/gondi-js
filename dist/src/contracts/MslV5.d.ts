import { Address, Hash } from 'viem';
import { LoanV5, OfferV5, RenegotiationV5 } from '../blockchain';
import { Wallet } from '../contracts';
import { multiSourceLoanABI as multiSourceLoanABIV5 } from '../generated/blockchain/v5';
import { EmitLoanArgs } from '../gondi';
import { BaseContract } from './BaseContract';
import { MslV6 } from './MslV6';
export declare class MslV5 extends BaseContract<typeof multiSourceLoanABIV5> {
    constructor({ walletClient }: {
        walletClient: Wallet;
    });
    private getDomain;
    signOffer({ structToSign }: {
        structToSign: OfferV5;
    }): Promise<`0x${string}`>;
    signRenegotiationOffer({ structToSign }: {
        structToSign: RenegotiationV5;
    }): Promise<`0x${string}`>;
    cancelOffer({ id }: {
        id: bigint;
    }): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            lender: `0x${string}`;
            offerId: bigint;
        }>;
    }>;
    cancelAllOffers({ minId }: {
        minId: bigint;
    }): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            lender: `0x${string}`;
            minOfferId: bigint;
        }>;
    }>;
    cancelRefinanceOffer({ id }: {
        id: bigint;
    }): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            lender: `0x${string}`;
            renegotiationId: bigint;
        }>;
    }>;
    cancelAllRenegotiations({ minId }: {
        minId: bigint;
    }): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            lender: `0x${string}`;
            minRenegotiationId: bigint;
        }>;
    }>;
    private mapEmitLoanToMslEmitLoanArgs;
    emitLoan(emitArgs: EmitLoanArgs): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            loan: {
                contractAddress: `0x${string}`;
                borrower: `0x${string}`;
                nftCollateralTokenId: bigint;
                nftCollateralAddress: `0x${string}`;
                principalAddress: `0x${string}`;
                principalAmount: bigint;
                startTime: bigint;
                duration: bigint;
                source: readonly {
                    loanId: bigint;
                    lender: `0x${string}`;
                    principalAmount: bigint;
                    accruedInterest: bigint;
                    startTime: bigint;
                    aprBps: bigint;
                }[];
                id: string;
            };
            loanId: bigint;
            offerId: string;
        }>;
    }>;
    revokeDelegationsAndEmitLoan({ delegations, emit, }: {
        delegations: Address[];
        emit: EmitLoanArgs;
    }): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            results: ({
                loanId: bigint;
                offerId: bigint;
                loan: {
                    borrower: `0x${string}`;
                    nftCollateralTokenId: bigint;
                    nftCollateralAddress: `0x${string}`;
                    principalAddress: `0x${string}`;
                    principalAmount: bigint;
                    startTime: bigint;
                    duration: bigint;
                    source: readonly {
                        loanId: bigint;
                        lender: `0x${string}`;
                        principalAmount: bigint;
                        accruedInterest: bigint;
                        startTime: bigint;
                        aprBps: bigint;
                    }[];
                };
                lender: `0x${string}`;
                borrower: `0x${string}`;
                fee: bigint;
            } | {
                delegate: `0x${string}`;
                collection: `0x${string}`;
                tokenId: bigint;
            })[];
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            loan: {
                contractAddress: `0x${string}`;
                borrower: `0x${string}`;
                nftCollateralTokenId: bigint;
                nftCollateralAddress: `0x${string}`;
                principalAddress: `0x${string}`;
                principalAmount: bigint;
                startTime: bigint;
                duration: bigint;
                source: readonly {
                    loanId: bigint;
                    lender: `0x${string}`;
                    principalAmount: bigint;
                    accruedInterest: bigint;
                    startTime: bigint;
                    aprBps: bigint;
                }[];
                id: string;
            };
            loanId: bigint;
        }>;
    }>;
    repayLoan({ loan, loanId }: {
        loan: LoanV5;
        loanId: bigint;
    }): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            loanId: bigint;
            totalRepayment: bigint;
            fee: bigint;
        }>;
    }>;
    getRemainingLockupSeconds({ loan }: {
        loan: LoanV5;
    }): Promise<number>;
    isEndLockedUp(): boolean;
    refinanceBatch({ renegotiationId, refinancings, }: {
        renegotiationId: bigint;
        refinancings: {
            loan: LoanV5;
            newAprBps: bigint;
            sources: {
                source: LoanV5['source'][number];
                refinancingPrincipal: bigint;
            }[];
        }[];
    }): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            results: {
                renegotiationId: bigint;
                oldLoanId: bigint;
                newLoanId: bigint;
                loan: {
                    borrower: `0x${string}`;
                    nftCollateralTokenId: bigint;
                    nftCollateralAddress: `0x${string}`;
                    principalAddress: `0x${string}`;
                    principalAmount: bigint;
                    startTime: bigint;
                    duration: bigint;
                    source: readonly {
                        loanId: bigint;
                        lender: `0x${string}`;
                        principalAmount: bigint;
                        accruedInterest: bigint;
                        startTime: bigint;
                        aprBps: bigint;
                    }[];
                };
                fee: bigint;
            }[];
        }>;
    }>;
    refinanceFullLoan({ offer, signature, loan, }: {
        offer: RenegotiationV5;
        signature: Hash;
        loan: LoanV5;
    }): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            loan: {
                contractAddress: `0x${string}`;
                borrower: `0x${string}`;
                nftCollateralTokenId: bigint;
                nftCollateralAddress: `0x${string}`;
                principalAddress: `0x${string}`;
                principalAmount: bigint;
                startTime: bigint;
                duration: bigint;
                source: readonly {
                    loanId: bigint;
                    lender: `0x${string}`;
                    principalAmount: bigint;
                    accruedInterest: bigint;
                    startTime: bigint;
                    aprBps: bigint;
                }[];
                id: string;
            };
            loanId: bigint;
            renegotiationId: string;
        }>;
    }>;
    refinancePartialLoan({ offer, loan }: {
        offer: RenegotiationV5;
        loan: LoanV5;
    }): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            loan: {
                contractAddress: `0x${string}`;
                borrower: `0x${string}`;
                nftCollateralTokenId: bigint;
                nftCollateralAddress: `0x${string}`;
                principalAddress: `0x${string}`;
                principalAmount: bigint;
                startTime: bigint;
                duration: bigint;
                source: readonly {
                    loanId: bigint;
                    lender: `0x${string}`;
                    principalAmount: bigint;
                    accruedInterest: bigint;
                    startTime: bigint;
                    aprBps: bigint;
                }[];
                id: string;
            };
            loanId: bigint;
            renegotiationId: string;
        }>;
    }>;
    private executeRenegotiation;
    addTranche(): ReturnType<MslV6['addTranche']>;
    refinanceFromOffers(): ReturnType<MslV6['refinanceFromOffers']>;
    delegateMulticall(delegations: Parameters<MslV5['delegate']>[0][]): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            results: {
                loanId: bigint;
                delegate: `0x${string}`;
                value: boolean;
            }[];
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
        }>;
    }>;
    delegate({ loan, loanId, to, rights, enable, }: {
        loan: LoanV5;
        loanId: bigint;
        to: Address;
        rights?: Hash;
        enable: boolean;
    }): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            loan: {
                loanId: bigint;
                contractAddress: `0x${string}`;
                borrower: `0x${string}`;
                nftCollateralTokenId: bigint;
                nftCollateralAddress: `0x${string}`;
                principalAddress: `0x${string}`;
                principalAmount: bigint;
                startTime: bigint | (bigint & Date);
                duration: bigint;
                source: readonly {
                    loanId: bigint;
                    lender: `0x${string}`;
                    principalAmount: bigint;
                    accruedInterest: bigint;
                    startTime: bigint;
                    aprBps: bigint;
                }[];
            };
            value: boolean;
        }>;
    }>;
    revokeDelegate({ to, collection, tokenId, }: {
        to: Address;
        collection: Address;
        tokenId: bigint;
    }): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            delegate: `0x${string}`;
            collection: `0x${string}`;
            tokenId: bigint;
        }>;
    }>;
    liquidateLoan({ loan, loanId }: {
        loan: LoanV5;
        loanId: bigint;
    }): Promise<{
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            blockHash: `0x${string}`;
            blockNumber: bigint;
            contractAddress: `0x${string}` | null;
            cumulativeGasUsed: bigint;
            effectiveGasPrice: bigint;
            from: `0x${string}`;
            gasUsed: bigint;
            logs: import("viem").Log<bigint, number, false>[];
            logsBloom: `0x${string}`;
            status: "success" | "reverted";
            to: `0x${string}` | null;
            transactionHash: `0x${string}`;
            transactionIndex: number;
            type: import("viem").TransactionType;
            loanId: bigint;
        }>;
    }>;
}
