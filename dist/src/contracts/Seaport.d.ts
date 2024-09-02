import { Address } from 'viem';
import { Wallet } from '../contracts';
import { seaportABI } from '../generated/blockchain/seaport';
import { SaleOfferInfoFragment } from '../generated/graphql';
import { Fulfillment, SeaportOrder, SeaportOrderParameter } from '../reservoir/utils';
import { BaseContract } from './BaseContract';
export declare class Seaport extends BaseContract<typeof seaportABI> {
    constructor({ walletClient }: {
        walletClient: Wallet;
    });
    getOrderHash(order: SeaportOrder): Promise<`0x${string}`>;
    getCounter(): Promise<bigint>;
    signOrder(order: SeaportOrderParameter): Promise<`0x${string}`>;
    generateOrderFromSaleOffer({ collectionContractAddress, tokenId, price, expirationTime, }: {
        collectionContractAddress: Address;
        tokenId: bigint;
        price: bigint;
        expirationTime: bigint;
    }): Promise<{
        parameters: SeaportOrderParameter;
        signature: `0x${string}`;
    }>;
    recoverOrderFromNativeBid({ nativeBid, collectionContractAddress, tokenId, }: {
        nativeBid: Omit<SaleOfferInfoFragment, '__typename'>;
        collectionContractAddress: Address;
        tokenId: bigint;
    }): Promise<SeaportOrderParameter>;
    generateInverseOrder(order: SeaportOrder): Promise<SeaportOrderParameter>;
    generateFulfillmentsForOrderAndInverse(order: SeaportOrderParameter): Fulfillment[];
    cancel({ orderComponents }: {
        orderComponents: SeaportOrder;
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
            orderHash: `0x${string}`;
            offerer: `0x${string}`;
            zone: `0x${string}`;
        }>;
    }>;
}
