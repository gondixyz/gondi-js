import {
  Account,
  Address,
  Chain,
  getContract,
  GetContractReturnType,
  PublicClient,
  Transport,
  WalletClient,
} from 'viem';

import { erc20ABI, erc721ABI } from '@/generated/blockchain/v5';
import { areSameAddress } from '@/utils/string';

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

export class Contracts {
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

  constructor(publicClient: PublicClient, walletClient: Wallet) {
    this.walletClient = walletClient;
    this.publicClient = publicClient;

    this.MultiSourceLoanV4 = new MslV4({ walletClient });
    this.MultiSourceLoanV5 = new MslV5({ walletClient });
    this.MultiSourceLoanV6 = new MslV6({ walletClient });
    this.AuctionLoanLiquidatorV4 = new AllV4({ walletClient });
    this.AuctionLoanLiquidatorV5 = new AllV5({ walletClient });
    this.AuctionLoanLiquidatorV6 = new AllV6({ walletClient });
    this.UserVaultV5 = new UserVaultV5({ walletClient });
    this.UserVaultV6 = new UserVaultV6({ walletClient });
    this.Leverage = new LeverageV5({
      walletClient,
      mslAddress: this.MultiSourceLoanV5.address,
    });
    this.Seaport = new Seaport({ walletClient });
    this.CryptoPunks = new CryptoPunks({ walletClient });
  }

  Msl(contractAddress: Address) {
    if (areSameAddress(contractAddress, this.MultiSourceLoanV4.address)) {
      return this.MultiSourceLoanV4;
    }
    if (areSameAddress(contractAddress, this.MultiSourceLoanV5.address)) {
      return this.MultiSourceLoanV5;
    }
    if (areSameAddress(contractAddress, this.MultiSourceLoanV6.address)) {
      return this.MultiSourceLoanV6;
    }
    throw new Error(`Invalid Contract Address ${contractAddress}`);
  }

  /**
   *
   * @param contractAddress The contract address of the MultiSourceLoanV4 or MultiSourceLoanV5 contract
   * @returns The corresponding AuctionLoanLiquidator contract
   */
  All(contractAddress: Address) {
    if (areSameAddress(contractAddress, this.MultiSourceLoanV4.address)) {
      return this.AuctionLoanLiquidatorV4;
    }
    if (areSameAddress(contractAddress, this.MultiSourceLoanV5.address)) {
      return this.AuctionLoanLiquidatorV5;
    }
    if (areSameAddress(contractAddress, this.MultiSourceLoanV6.address)) {
      return this.AuctionLoanLiquidatorV6;
    }
    throw new Error(`Invalid Contract Address ${contractAddress}`);
  }

  UserVault(contractAddress: Address) {
    if (areSameAddress(contractAddress, this.UserVaultV5.address)) {
      return this.UserVaultV5;
    }
    if (areSameAddress(contractAddress, this.UserVaultV6.address)) {
      return this.UserVaultV6;
    }

    throw new Error(`Invalid Contract Address ${contractAddress}`);
  }

  ERC721(
    nftAddress: Address,
  ): GetContractReturnType<typeof erc721ABI, PublicClient, Wallet, Address> {
    return getContract({
      address: nftAddress,
      abi: erc721ABI,
      walletClient: this.walletClient,
      publicClient: this.publicClient,
    });
  }

  ERC20(
    nftAddress: Address,
  ): GetContractReturnType<typeof erc20ABI, PublicClient, Wallet, Address> {
    return getContract({
      address: nftAddress,
      abi: erc20ABI,
      walletClient: this.walletClient,
      publicClient: this.publicClient,
    });
  }
}
