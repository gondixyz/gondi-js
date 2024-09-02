import { Address, Hash } from 'viem';
import { LoanV6, OfferV6, RenegotiationV6 } from '../blockchain';
import { Wallet } from '../contracts';
import { multiSourceLoanAbi as multiSourceLoanAbiV6 } from '../generated/blockchain/v6';
import { EmitLoanArgs } from '../gondi';
import { BaseContract } from './BaseContract';
export declare class MslV6 extends BaseContract<typeof multiSourceLoanAbiV6> {
    constructor({ walletClient }: {
        walletClient: Wallet;
    });
    private getDomain;
    signOffer({ structToSign }: {
        structToSign: OfferV6;
    }): Promise<`0x${string}`>;
    signRenegotiationOffer({ structToSign }: {
        structToSign: RenegotiationV6;
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
    cancelAllRenegotiations(_: {
        minId: bigint;
    }): Promise<void>;
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
                tranche: readonly {
                    loanId: bigint;
                    floor: bigint;
                    principalAmount: bigint;
                    lender: `0x${string}`;
                    accruedInterest: bigint;
                    startTime: bigint;
                    aprBps: bigint;
                }[];
                protocolFee: bigint;
                id: string;
            };
            loanId: bigint;
            offerIds: string[];
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
                offerId: readonly bigint[];
                loan: {
                    borrower: `0x${string}`;
                    nftCollateralTokenId: bigint;
                    nftCollateralAddress: `0x${string}`;
                    principalAddress: `0x${string}`;
                    principalAmount: bigint;
                    startTime: bigint;
                    duration: bigint;
                    tranche: readonly {
                        loanId: bigint;
                        floor: bigint;
                        principalAmount: bigint;
                        lender: `0x${string}`;
                        accruedInterest: bigint;
                        startTime: bigint;
                        aprBps: bigint;
                    }[];
                    protocolFee: bigint;
                };
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
                tranche: readonly {
                    loanId: bigint;
                    floor: bigint;
                    principalAmount: bigint;
                    lender: `0x${string}`;
                    accruedInterest: bigint;
                    startTime: bigint;
                    aprBps: bigint;
                }[];
                protocolFee: bigint;
                id: string;
            };
            loanId: bigint;
        }>;
    }>;
    repayLoan({ loan, loanId }: {
        loan: LoanV6;
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
        loan: LoanV6;
    }): Promise<number>;
    isEndLockedUp({ loan }: {
        loan: LoanV6;
    }): Promise<boolean>;
    refinanceBatch({ renegotiationId, refinancings, }: {
        renegotiationId: bigint;
        refinancings: {
            loan: LoanV6;
            newAprBps: bigint;
            sources: {
                source: LoanV6['tranche'][number] & {
                    loanIndex: number;
                };
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
                    tranche: readonly {
                        loanId: bigint;
                        floor: bigint;
                        principalAmount: bigint;
                        lender: `0x${string}`;
                        accruedInterest: bigint;
                        startTime: bigint;
                        aprBps: bigint;
                    }[];
                    protocolFee: bigint;
                };
                fee: bigint;
            }[];
        }>;
    }>;
    refinanceFullLoan({ offer, signature, loan, }: {
        offer: RenegotiationV6;
        signature: Hash;
        loan: LoanV6;
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
                tranche: readonly {
                    loanId: bigint;
                    floor: bigint;
                    principalAmount: bigint;
                    lender: `0x${string}`;
                    accruedInterest: bigint;
                    startTime: bigint;
                    aprBps: bigint;
                }[];
                protocolFee: bigint;
                id: string;
            };
            loanId: bigint;
            renegotiationId: string;
        }>;
    }>;
    refinancePartialLoan({ offer, loan }: {
        offer: RenegotiationV6;
        loan: LoanV6;
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
                tranche: readonly {
                    loanId: bigint;
                    floor: bigint;
                    principalAmount: bigint;
                    lender: `0x${string}`;
                    accruedInterest: bigint;
                    startTime: bigint;
                    aprBps: bigint;
                }[];
                protocolFee: bigint;
                id: string;
            };
            loanId: bigint;
            renegotiationId: string;
        }>;
    }>;
    addTranche({ offer, signature, loan, }: {
        offer: RenegotiationV6;
        signature: Hash;
        loan: LoanV6;
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
                tranche: readonly {
                    loanId: bigint;
                    floor: bigint;
                    principalAmount: bigint;
                    lender: `0x${string}`;
                    accruedInterest: bigint;
                    startTime: bigint;
                    aprBps: bigint;
                }[];
                protocolFee: bigint;
                id: string;
            };
            loanId: bigint;
            renegotiationId: string;
        }>;
    }>;
    refinanceFromOffers({ loan, loanId, executionData, }: {
        loan: LoanV6;
        loanId: bigint;
        executionData: EmitLoanArgs;
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
                tranche: readonly {
                    loanId: bigint;
                    floor: bigint;
                    principalAmount: bigint;
                    lender: `0x${string}`;
                    accruedInterest: bigint;
                    startTime: bigint;
                    aprBps: bigint;
                }[];
                protocolFee: bigint;
                id: string;
            };
            loanId: bigint;
            offerIds: string[];
        }>;
    }>;
    private executeRenegotiation;
    delegateMulticall(delegations: Parameters<MslV6['delegate']>[0][]): Promise<{
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
        loan: LoanV6;
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
                tranche: readonly {
                    loanId: bigint;
                    floor: bigint;
                    principalAmount: bigint;
                    lender: `0x${string}`;
                    accruedInterest: bigint;
                    startTime: bigint;
                    aprBps: bigint;
                }[];
                protocolFee: bigint;
                contractStartTime: bigint | Date;
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
        loan: LoanV6;
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
