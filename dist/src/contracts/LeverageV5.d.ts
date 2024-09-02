import { Address, Hash } from 'viem';
import { LoanV5, OfferV5 } from '../blockchain';
import { Wallet } from '../contracts';
import { leverageABI } from '../generated/blockchain/v5';
import { BaseContract } from './BaseContract';
export declare class LeverageV5 extends BaseContract<typeof leverageABI> {
    mslAddress: Address;
    constructor({ walletClient, mslAddress }: {
        walletClient: Wallet;
        mslAddress: Address;
    });
    private getDomain;
    signExecutionData(executionData: {
        offer: OfferV5 & {
            signature: Hash;
        };
        tokenId: bigint;
        amount: bigint;
        expirationTime: bigint;
        callbackData: Hash;
    }): Promise<`0x${string}`>;
    signRepaymentData(data: {
        loanId: bigint;
        callbackData: Hash;
        shouldDelegate: boolean;
    }): Promise<`0x${string}`>;
    buy({ leverageBuyData, ethToSend, }: {
        leverageBuyData: {
            offer: OfferV5 & {
                signature: Hash;
            };
            expirationTime: bigint;
            amount: bigint;
            nft: {
                tokenId: bigint;
            };
            callbackData: Hash;
        }[];
        ethToSend: bigint;
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
            _loanIds: readonly bigint[];
        }>;
    }>;
    sell({ loan, callbackData, shouldDelegate, loanId, }: {
        loan: LoanV5;
        callbackData: Hash;
        shouldDelegate: boolean;
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
            _loanIds: readonly bigint[];
        }>;
    }>;
}
