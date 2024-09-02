import { Address } from 'viem';
import { Auction, LoanV6 } from '../blockchain';
import { Wallet } from '../contracts';
import { auctionWithBuyoutLoanLiquidatorAbi as auctionWithBuyoutLoanLiquidatorABIV6 } from '../generated/blockchain/v6';
import { BaseContract } from './BaseContract';
export declare class AllV6 extends BaseContract<typeof auctionWithBuyoutLoanLiquidatorABIV6> {
    constructor({ walletClient }: {
        walletClient: Wallet;
    });
    placeBid({ collectionContractAddress, tokenId, bid, auction, }: {
        collectionContractAddress: Address;
        tokenId: bigint;
        bid: bigint;
        auction: Auction;
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
            collection: `0x${string}`;
            tokenId: bigint;
            newBidder: `0x${string}`;
            bid: bigint;
            loanAddress: `0x${string}`;
            loanId: bigint;
        }>;
    }>;
    getRemainingLockupSeconds({ auction }: {
        auction: Auction;
    }): Promise<number>;
    settleAuctionWithBuyout({ auction, loan }: {
        auction: Auction;
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
            loanAddress: `0x${string}`;
            loanId: bigint;
            nftAddress: `0x${string}`;
            tokenId: bigint;
            largestTrancheIdx: bigint;
        }>;
    }>;
    settleAuction({ auction, loan }: {
        auction: Auction;
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
            loanContract: `0x${string}`;
            loanId: bigint;
            collection: `0x${string}`;
            tokenId: bigint;
            asset: `0x${string}`;
            proceeds: bigint;
            settler: `0x${string}`;
            triggerFee: bigint;
        }>;
    }>;
    private mapAuctionToAuctionArgs;
}
