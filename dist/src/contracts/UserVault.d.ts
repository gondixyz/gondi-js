import { Address } from 'viem';
import { Wallet } from '../contracts';
import { userVaultABI as userVaultABIV5 } from '../generated/blockchain/v5';
import { BaseContract } from './BaseContract';
export declare class UserVault extends BaseContract<typeof userVaultABIV5> {
    #private;
    constructor({ walletClient }: {
        walletClient: Wallet;
    });
    burnAndWithdraw({ vaultId, collections, tokenIds, tokens, }: {
        vaultId: bigint;
        collections: Address[];
        tokenIds: bigint[];
        tokens?: Address[];
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
            events: {
                vaultId: bigint;
                collection: `0x${string}`;
                tokenId: bigint;
            }[];
        }>;
    }>;
    createVault(nfts: {
        collection: Address;
        tokenIds: bigint[];
    }[]): Promise<{
        vaultId: bigint;
        receipts: {
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
            vaultId: bigint;
            collection: `0x${string}`;
            tokenId: bigint;
        }[];
    }>;
    depositERC721s({ vaultId, collection, tokenIds, }: {
        vaultId: bigint;
        collection: Address;
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
            vaultId: bigint;
            collection: `0x${string}`;
            tokenId: bigint;
        }>;
    }>;
}
