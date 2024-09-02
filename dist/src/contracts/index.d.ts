import { Account, Address, Chain, GetContractReturnType, PublicClient, Transport, WalletClient } from 'viem';
import { oldErc721Abi } from '../generated/blockchain/oldErc721';
import { erc20ABI, erc721ABI } from '../generated/blockchain/v5';
import { AllV4 } from './AllV4';
import { AllV5 } from './AllV5';
import { AllV6 } from './AllV6';
import { CryptoPunks } from './CryptoPunks';
import { LeverageV5 } from './LeverageV5';
import { MslV4 } from './MslV4';
import { MslV5 } from './MslV5';
import { MslV6 } from './MslV6';
import { Seaport } from './Seaport';
import { UserVaultV5 } from './UserVaultV5';
import { UserVaultV6 } from './UserVaultV6';
export type Wallet = WalletClient<Transport, Chain, Account>;
export declare class Contracts {
    walletClient: Wallet;
    publicClient: PublicClient;
    MultiSourceLoanV4: MslV4;
    MultiSourceLoanV5: MslV5;
    MultiSourceLoanV6: MslV6;
    AuctionLoanLiquidatorV4: AllV4;
    AuctionLoanLiquidatorV5: AllV5;
    AuctionLoanLiquidatorV6: AllV6;
    UserVaultV5: UserVaultV5;
    UserVaultV6: UserVaultV6;
    Leverage: LeverageV5;
    Seaport: Seaport;
    CryptoPunks: CryptoPunks;
    constructor(publicClient: PublicClient, walletClient: Wallet);
    Msl(contractAddress: Address): MslV6 | MslV4 | MslV5;
    /**
     *
     * @param contractAddress The contract address of the MultiSourceLoanV4 or MultiSourceLoanV5 contract
     * @returns The corresponding AuctionLoanLiquidator contract
     */
    All(contractAddress: Address): AllV4 | AllV5 | AllV6;
    UserVault(contractAddress: Address): UserVaultV5 | UserVaultV6;
    ERC721(nftAddress: Address): GetContractReturnType<typeof erc721ABI, PublicClient, Wallet, Address>;
    OldERC721(nftAddress: Address): GetContractReturnType<typeof oldErc721Abi, PublicClient, Wallet, Address>;
    ERC20(nftAddress: Address): GetContractReturnType<typeof erc20ABI, PublicClient, Wallet, Address>;
}
