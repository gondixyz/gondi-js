import { Address } from 'viem';
import { Wallet } from '../contracts';
import { withdrawalQueueAbi } from '../generated/blockchain/v6';
import { BaseContract } from './BaseContract';
export declare class WithdrawalQueue extends BaseContract<typeof withdrawalQueueAbi> {
    constructor({ walletClient, address }: {
        walletClient: Wallet;
        address: Address;
    });
    ownerOf(tokenId: bigint): Promise<`0x${string}`>;
    getAvailable(tokenId: bigint): Promise<bigint>;
    withdraw({ to, tokenId }: {
        to: Address;
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
            tokenId: bigint;
            available: bigint;
        }>;
    }>;
    withdrawMany({ to, tokenIds }: {
        to: Address;
        tokenIds: bigint[];
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
            tokenId: bigint;
            available: bigint;
        }>;
    } | {
        txHash: `0x${string}`;
        waitTxInBlock: () => Promise<{
            results: {
                to: `0x${string}`;
                tokenId: bigint;
                available: bigint;
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
}
