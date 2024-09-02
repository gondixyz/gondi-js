import { Address, Chain } from 'viem';
interface Contracts {
    MultiSourceLoan: {
        v4: Address;
        v5: Address;
        v6: Address;
    };
    AuctionLoanLiquidator: {
        v4: Address;
        v5: Address;
        v6: Address;
    };
    UserVault: {
        v5: Address;
        v6: Address;
    };
    LeverageAddress: Address;
    SeaportAddress: Address;
    CryptoPunksAddress: Address;
}
interface ApiKeys {
    reservoirApiKey: string;
    infuraApiKey: string;
}
interface Currencies {
    WETH_ADDRESS: Address;
    ETH_ADDRESS: Address;
    USDC_ADDRESS: Address;
}
export declare const MSL_V5_TX_HASH: `0x${string}`;
export declare const getContracts: (chain: Pick<Chain, 'id'>) => Contracts;
export declare const getApiKeys: () => ApiKeys;
export declare const getCurrencies: () => Currencies;
export {};
