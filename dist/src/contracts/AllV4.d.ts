import { Address } from 'viem';
import { LoanV4 } from '../blockchain';
import { Wallet } from '../contracts';
import { auctionLoanLiquidatorABI as auctionLoanLiquidatorABIV4 } from '../generated/blockchain/v4';
import { AllV6 } from './AllV6';
import { BaseContract } from './BaseContract';
export declare class AllV4 extends BaseContract<typeof auctionLoanLiquidatorABIV4> {
    static LOAN_SETTLEMENT_ENCODE_TYPES: {
        name: string;
        type: string;
        components: ({
            name: string;
            type: string;
            components?: undefined;
        } | {
            name: string;
            type: string;
            components: {
                name: string;
                internalType: string;
                type: string;
            }[];
        })[];
    }[];
    constructor({ walletClient }: {
        walletClient: Wallet;
    });
    placeBid({ collectionContractAddress, tokenId, bid, }: {
        collectionContractAddress: Address;
        tokenId: bigint;
        bid: bigint;
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
            auctionContract: `0x${string}`;
            tokenId: bigint;
            newBidder: `0x${string}`;
            bid: bigint;
            loanAddress: `0x${string}`;
            loanId: bigint;
        }>;
    }>;
    getRemainingLockupSeconds(): number;
    settleAuctionWithBuyout(): ReturnType<AllV6['settleAuctionWithBuyout']>;
    settleAuction({ loan }: {
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
            loanContract: `0x${string}`;
            loanId: bigint;
            auctionContract: `0x${string}`;
            tokenId: bigint;
            asset: `0x${string}`;
            highestBid: bigint;
            settler: `0x${string}`;
            triggerFee: bigint;
        }>;
    }>;
}
