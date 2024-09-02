import { ReservoirClient } from '@reservoir0x/reservoir-sdk';
import { Address, Hash, PublicClient } from 'viem';
import { Wallet } from '../contracts';
import { CryptoPunks } from '../contracts/CryptoPunks';
import { Seaport } from '../contracts/Seaport';
import { SeaportAskOrBid } from './utils';
export declare class Reservoir {
    baseApiUrl: string;
    mainnetClient: PublicClient;
    wallet: Wallet;
    Seaport: Seaport;
    CryptoPunks: CryptoPunks;
    client: ReservoirClient;
    EXECUTION_INFO_ABI: readonly [{
        readonly name: "ExecutionInfo";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "module";
            readonly type: "address";
        }, {
            readonly name: "data";
            readonly type: "bytes";
        }, {
            readonly name: "value";
            readonly type: "uint256";
        }];
    }];
    constructor({ baseApiUrl, wallet, Seaport, CryptoPunks, }: {
        baseApiUrl?: string;
        wallet: Wallet;
        Seaport: Seaport;
        CryptoPunks: CryptoPunks;
    });
    getAsk({ orderId }: {
        orderId: string;
    }): Promise<{
        id: string;
        kind: string;
        side: "buy" | "sell";
        status?: string | undefined;
        tokenSetId: string;
        tokenSetSchemaHash: string;
        contract?: string | undefined;
        contractKind?: string | undefined;
        maker: string;
        taker: string;
        price?: {
            currency?: {
                contract?: string | undefined;
                name?: string | undefined;
                symbol?: string | undefined;
                decimals?: number | undefined;
                chainId?: number | undefined;
            } | undefined;
            amount?: {
                raw?: string | undefined;
                decimal?: number | undefined;
                usd?: number | undefined;
                native?: number | undefined;
            } | undefined;
            netAmount?: {
                raw?: string | undefined;
                decimal?: number | undefined;
                usd?: number | undefined;
                native?: number | undefined;
            } | undefined;
        } | undefined;
        validFrom: number;
        validUntil: number;
        quantityFilled?: number | undefined;
        quantityRemaining?: number | undefined;
        dynamicPricing?: {
            kind?: "dutch" | undefined;
            data?: {
                price?: {
                    start?: {
                        currency?: {
                            contract?: string | undefined;
                            name?: string | undefined;
                            symbol?: string | undefined;
                            decimals?: number | undefined;
                            chainId?: number | undefined;
                        } | undefined;
                        amount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                        netAmount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                    } | undefined;
                    end?: {
                        currency?: {
                            contract?: string | undefined;
                            name?: string | undefined;
                            symbol?: string | undefined;
                            decimals?: number | undefined;
                            chainId?: number | undefined;
                        } | undefined;
                        amount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                        netAmount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
                time?: {
                    start?: number | undefined;
                    end?: number | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        criteria?: {
            kind?: "token" | undefined;
            data?: {
                token?: {
                    tokenId?: string | undefined;
                    name?: string | undefined;
                    image?: string | undefined;
                    isSpam?: boolean | undefined;
                    isNsfw?: boolean | undefined;
                } | undefined;
                collection?: {
                    id?: string | undefined;
                    name?: string | undefined;
                    image?: string | undefined;
                    isSpam?: boolean | undefined;
                    isNsfw?: boolean | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        source?: {
            [key: string]: unknown;
        } | undefined;
        feeBps?: number | undefined;
        feeBreakdown?: {
            kind?: string | undefined;
            recipient?: string | undefined;
            bps?: number | undefined;
        }[] | undefined;
        expiration: number;
        isReservoir?: boolean | undefined;
        isDynamic?: boolean | undefined;
        createdAt: string;
        updatedAt: string;
        originatedAt?: string | undefined;
        rawData?: {
            [key: string]: unknown;
        } | undefined;
        isNativeOffChainCancellable?: boolean | undefined;
        depth?: {
            price?: number | undefined;
            quantity?: number | undefined;
        }[] | undefined;
    }>;
    getBid({ orderId }: {
        orderId: string;
    }): Promise<{
        id: string;
        kind: string;
        side: "buy" | "sell";
        status?: string | undefined;
        tokenSetId: string;
        tokenSetSchemaHash: string;
        contract?: string | undefined;
        contractKind?: string | undefined;
        maker: string;
        taker: string;
        price?: {
            currency?: {
                contract?: string | undefined;
                name?: string | undefined;
                symbol?: string | undefined;
                decimals?: number | undefined;
                chainId?: number | undefined;
            } | undefined;
            amount?: {
                raw?: string | undefined;
                decimal?: number | undefined;
                usd?: number | undefined;
                native?: number | undefined;
            } | undefined;
            netAmount?: {
                raw?: string | undefined;
                decimal?: number | undefined;
                usd?: number | undefined;
                native?: number | undefined;
            } | undefined;
        } | undefined;
        validFrom: number;
        validUntil: number;
        quantityFilled?: number | undefined;
        quantityRemaining?: number | undefined;
        dynamicPricing?: {
            kind?: "dutch" | undefined;
            data?: {
                price?: {
                    start?: {
                        currency?: {
                            contract?: string | undefined;
                            name?: string | undefined;
                            symbol?: string | undefined;
                            decimals?: number | undefined;
                            chainId?: number | undefined;
                        } | undefined;
                        amount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                        netAmount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                    } | undefined;
                    end?: {
                        currency?: {
                            contract?: string | undefined;
                            name?: string | undefined;
                            symbol?: string | undefined;
                            decimals?: number | undefined;
                            chainId?: number | undefined;
                        } | undefined;
                        amount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                        netAmount?: {
                            raw?: string | undefined;
                            decimal?: number | undefined;
                            usd?: number | undefined;
                            native?: number | undefined;
                        } | undefined;
                    } | undefined;
                } | undefined;
                time?: {
                    start?: number | undefined;
                    end?: number | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        criteria?: {
            kind?: "token" | undefined;
            data?: {
                token?: {
                    tokenId?: string | undefined;
                    name?: string | undefined;
                    image?: string | undefined;
                    isSpam?: boolean | undefined;
                    isNsfw?: boolean | undefined;
                } | undefined;
                collection?: {
                    id?: string | undefined;
                    name?: string | undefined;
                    image?: string | undefined;
                    isSpam?: boolean | undefined;
                    isNsfw?: boolean | undefined;
                } | undefined;
            } | undefined;
        } | undefined;
        source?: {
            [key: string]: unknown;
        } | undefined;
        feeBps?: number | undefined;
        feeBreakdown?: {
            kind?: string | undefined;
            recipient?: string | undefined;
            bps?: number | undefined;
        }[] | undefined;
        expiration: number;
        isReservoir?: boolean | undefined;
        isDynamic?: boolean | undefined;
        createdAt: string;
        updatedAt: string;
        originatedAt?: string | undefined;
        rawData?: {
            [key: string]: unknown;
        } | undefined;
        isNativeOffChainCancellable?: boolean | undefined;
        depth?: {
            price?: number | undefined;
            quantity?: number | undefined;
        }[] | undefined;
    }>;
    generateExpectedCurrencyPriceObject(price: bigint, currencyAddress: Address): {
        [x: string]: {
            raw: bigint;
            currencyAddress: `0x${string}`;
            currencyDecimals: number;
        };
    };
    encodeExecutionData({ module, data, value }: {
        module: Address;
        data: Hash;
        value: bigint;
    }): `0x${string}`;
    generateMatchOrdersExecutionData({ askOrBid, signature, side, }: {
        askOrBid: SeaportAskOrBid;
        signature: Hash;
        side?: 'ask' | 'bid';
    }): Promise<{
        callbackData: `0x${string}`;
        value: bigint;
        isSeaportCall: boolean;
    }>;
    generateFulfillOrderExecutionData({ askOrBid, signature, tokenId, }: {
        askOrBid: SeaportAskOrBid;
        signature: Hash;
        tokenId: bigint;
    }): Promise<{
        callbackData: `0x${string}`;
        value: bigint;
        isSeaportCall: boolean;
    }>;
    buyTokens(tokensToBuy: {
        collectionContractAddress: Address;
        tokenId: bigint;
        price: bigint;
        orderSource: string;
    }[]): Promise<true | import("@reservoir0x/reservoir-sdk").Execute>;
    getExecutionDataForBuyToken({ collectionContractAddress, tokenId, price, exactOrderSource, }: {
        collectionContractAddress: string;
        tokenId: bigint;
        price: bigint;
        exactOrderSource: string;
    }): Promise<{
        callbackData: `0x${string}`;
        value: bigint;
        isSeaportCall: boolean;
    }>;
    getCallbackDataForSellToken({ collectionContractAddress, tokenId, price, exactOrderSource, }: {
        collectionContractAddress: Address;
        tokenId: bigint;
        price: bigint;
        exactOrderSource: string;
    }): Promise<{
        callbackData: `0x${string}`;
        value: bigint;
        isSeaportCall: boolean;
    }>;
}
