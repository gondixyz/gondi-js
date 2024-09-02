import { Address } from 'viem';
import { Wallet } from '../contracts';
import { userVaultAbi as userVaultABIV6 } from '../generated/blockchain/v6';
import { BaseContract } from './BaseContract';
export declare class UserVaultV6 extends BaseContract<typeof userVaultABIV6> {
    #private;
    constructor({ walletClient }: {
        walletClient: Wallet;
    });
    burnAndWithdraw({ vaultId, collections, tokenIds, oldCollections, oldTokenIds, tokens, }: {
        vaultId: bigint;
        collections: Address[];
        tokenIds: bigint[];
        oldCollections?: Address[];
        oldTokenIds?: bigint[];
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
            oldEvents: {
                vaultId: bigint;
                collection: `0x${string}`;
                tokenId: bigint;
            }[];
        }>;
    }>;
    createVault(nfts: {
        collection: Address;
        tokenIds: bigint[];
        isOldErc721?: boolean;
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
    depositOldERC721s({ vaultId, collection, tokenIds, }: {
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
