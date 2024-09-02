import { Address, Hash } from 'viem';
import { LoanV4, OfferV4, RenegotiationV4 } from '../blockchain';
import { Wallet } from '../contracts';
import { multiSourceLoanABI as multiSourceLoanABIV4 } from '../generated/blockchain/v4';
import { EmitLoanArgs } from '../gondi';
import { BaseContract } from './BaseContract';
import { MslV5 } from './MslV5';
import { MslV6 } from './MslV6';
export declare class MslV4 extends BaseContract<typeof multiSourceLoanABIV4> {
    constructor({ walletClient }: {
        walletClient: Wallet;
    });
    private getDomain;
    signOffer({ structToSign }: {
        structToSign: OfferV4;
    }): Promise<`0x${string}`>;
    signRenegotiationOffer({ structToSign }: {
        structToSign: RenegotiationV4;
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
            renegotiationId: bigint;
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
    repayLoan({ loan, nftReceiver, loanId, }: {
        loan: LoanV4;
        loanId: bigint;
        nftReceiver?: Address;
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
    getRemainingLockupSeconds(): number;
    isEndLockedUp(): boolean;
    refinanceBatch({ renegotiationId, refinancings, }: {
        renegotiationId: bigint;
        refinancings: {
            loan: LoanV4;
            newAprBps: bigint;
            sources: {
                source: LoanV4['source'][number];
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
        offer: RenegotiationV4;
        signature: Hash;
        loan: LoanV4;
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
        offer: RenegotiationV4;
        loan: LoanV4;
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
    delegateMulticall(): ReturnType<MslV5['delegateMulticall']>;
    delegate(): ReturnType<MslV5['delegate']>;
    revokeDelegate(): ReturnType<MslV5['revokeDelegate']>;
    revokeDelegationsAndEmitLoan(): ReturnType<MslV5['revokeDelegationsAndEmitLoan']>;
    liquidateLoan({ loan, loanId }: {
        loan: LoanV4;
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
