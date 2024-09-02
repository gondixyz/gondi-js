import { Address } from 'viem';
import { Wallet } from '../contracts';
import { WithdrawalQueue } from '../contracts/WithdrawalQueue';
import { poolAbi } from '../generated/blockchain/v6';
import { BaseContract } from './BaseContract';
export declare class Pool extends BaseContract<typeof poolAbi> {
    constructor({ walletClient, address }: {
        walletClient: Wallet;
        address: Address;
    });
    static LOAN_BUFFER_TIME: bigint;
    deposit({ amount, receiver }: {
        amount: bigint;
        receiver: Address;
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
            caller: `0x${string}`;
            owner: `0x${string}`;
            assets: bigint;
            shares: bigint;
        }>;
    }>;
    mint({ amount, receiver }: {
        amount: bigint;
        receiver: Address;
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
            caller: `0x${string}`;
            owner: `0x${string}`;
            assets: bigint;
            shares: bigint;
        }>;
    }>;
    previewDeposit({ amount }: {
        amount: bigint;
    }): Promise<bigint>;
    previewMint({ amount }: {
        amount: bigint;
    }): Promise<bigint>;
    withdraw({ amount, receiver, owner, }: {
        amount: bigint;
        receiver: Address;
        owner: Address;
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
            caller: `0x${string}`;
            receiver: `0x${string}`;
            owner: `0x${string}`;
            assets: bigint;
            shares: bigint;
        }>;
    }>;
    redeem({ amount, receiver, owner }: {
        amount: bigint;
        receiver: Address;
        owner: Address;
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
            caller: `0x${string}`;
            receiver: `0x${string}`;
            owner: `0x${string}`;
            assets: bigint;
            shares: bigint;
        }>;
    }>;
    claim({ receiver, queueTokenIds, }: {
        receiver: Address;
        queueTokenIds: Record<Address, bigint[]>;
    }): Promise<({
        status: "fulfilled";
        value: {
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
        };
        reason?: undefined;
    } | {
        status: "rejected";
        reason: unknown;
        value?: undefined;
    })[]>;
    getDeployedQueues(): Promise<WithdrawalQueue[]>;
    getMinTimeBetweenWithdrawalQueues(): Promise<bigint>;
    getMaxOfferDuration(): Promise<bigint>;
    deployWithdrawalQueue(): Promise<{
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
            index: bigint;
            queueAddress: `0x${string}`;
        }>;
    }>;
}
