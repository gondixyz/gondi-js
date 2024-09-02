import { Wallet } from '../contracts';
import { UserVaultV6 } from '../contracts/UserVaultV6';
import { userVaultABI as userVaultABIV5 } from '../generated/blockchain/v5';
import { BaseContract } from './BaseContract';
export declare class UserVaultV5 extends BaseContract<typeof userVaultABIV5> {
    #private;
    constructor({ walletClient }: {
        walletClient: Wallet;
    });
    burnAndWithdraw({ vaultId, collections, tokenIds, tokens, }: Parameters<UserVaultV6['burnAndWithdraw']>[0]): ReturnType<UserVaultV6['burnAndWithdraw']>;
    createVault(nfts: Parameters<UserVaultV6['createVault']>[0]): Promise<{
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
    depositERC721s({ vaultId, collection, tokenIds, }: Parameters<UserVaultV6['depositERC721s']>[0]): Promise<{
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
    depositOldERC721s(): Promise<void>;
}
