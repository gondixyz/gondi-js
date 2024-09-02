import { Address } from 'viem';
import { Auction, LoanV5 } from '../blockchain';
import { Wallet } from '../contracts';
import { auctionLoanLiquidatorABI as auctionLoanLiquidatorABIV5 } from '../generated/blockchain/v5';
import { AllV6 } from './AllV6';
import { BaseContract } from './BaseContract';
export declare class AllV5 extends BaseContract<typeof auctionLoanLiquidatorABIV5> {
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
    getRemainingLockupSeconds(): number;
    settleAuctionWithBuyout(): ReturnType<AllV6['settleAuctionWithBuyout']>;
    settleAuction({ auction, loan }: {
        auction: Auction;
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
            loanContract: `0x${string}`;
            loanId: bigint;
            auctionContract: `0x${string}`;
            tokenId: bigint;
            asset: `0x${string}`;
            proceeds: bigint;
            settler: `0x${string}`;
            triggerFee: bigint;
        }>;
    }>;
}
