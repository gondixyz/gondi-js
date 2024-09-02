import { Address, Hash } from 'viem';
import { Wallet } from '../contracts';
export interface Offer {
    itemType: number;
    token: Address;
    identifierOrCriteria: bigint;
    startAmount: bigint;
    endAmount: bigint;
}
export interface Consideration extends Offer {
    recipient: Address;
}
export interface SeaportAskOrBid {
    rawData: SeaportOrder;
    price: {
        netAmount: {
            raw: string;
        };
    };
}
export interface SeaportOrder {
    offerer: Address;
    zone: Address;
    offer: Offer[];
    consideration: Consideration[];
    orderType: number;
    startTime: bigint;
    endTime: bigint;
    zoneHash: Hash;
    salt: bigint;
    conduitKey: Hash;
    counter: bigint;
}
export interface SeaportOrderParameter extends SeaportOrder {
    totalOriginalConsiderationItems: bigint;
}
export interface FulfillmentComponent {
    orderIndex: bigint;
    itemIndex: bigint;
}
export interface Fulfillment {
    offerComponents: FulfillmentComponent[];
    considerationComponents: FulfillmentComponent[];
}
export declare const isOpensea: (orderSource: string) => boolean;
export declare const isCryptopunks: (orderSource: string) => boolean;
export declare const isNative: (orderSource: string) => boolean;
export declare const adaptWalletToCaptureTxData: (wallet: Wallet, exactOrderSource: string) => {
    transport: undefined;
    handleSendTransactionStep: (_chainId: number, stepItem: {
        data: {
            data: Hash;
            to: Address;
            value: string;
        };
        orderIds?: string[];
    }, step: {
        id: string;
    }) => Promise<`0x${string}`>;
    handleSignMessageStep: (item: import("@reservoir0x/reservoir-sdk").SignatureStepItem, step: {
        error?: string | undefined;
        errorData?: any;
        action: string;
        description: string;
        kind: "transaction" | "signature";
        id: string;
        items?: {
            status: "complete" | "incomplete";
            data?: any;
            check?: {
                endpoint: string;
                method: "POST";
                body?: string | undefined;
            } | undefined;
            orderIndexes?: number[] | undefined;
            orderIds?: string[] | undefined;
            error?: string | undefined;
            txHashes?: {
                txHash: `0x${string}`;
                chainId: number;
            }[] | undefined;
            internalTxHashes?: {
                txHash: `0x${string}`;
                chainId: number;
            }[] | undefined;
            errorData?: any;
            orderData?: {
                crossPostingOrderId?: string | undefined;
                orderId: string;
                orderIndex: string;
            }[] | undefined;
            transfersData?: {
                id?: string | undefined;
                token?: {
                    contract?: string | undefined;
                    tokenId?: string | undefined;
                } | undefined;
                from?: string | undefined;
                to?: string | undefined;
                amount?: string | undefined;
                block?: number | undefined;
                txHash?: string | undefined;
                logIndex?: number | undefined;
                batchIndex?: number | undefined;
                timestamp?: number | undefined;
                isDeleted?: boolean | undefined;
                updatedAt?: string | undefined;
            }[] | undefined;
        }[] | undefined;
    }) => Promise<string | undefined>;
    address: () => Promise<string>;
};
