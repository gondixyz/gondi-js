import { Account, Address, Chain, PublicClient, Transport, WalletClient } from 'viem';

import { Erc20 } from '@/contracts/Erc20';
import { OldERC721Wrapper } from '@/contracts/OldERC721Wrapper';
import { PurchaseBundler } from '@/contracts/PurchaseBundler';
import { Seaport } from '@/contracts/Seaport';
import { getContracts } from '@/deploys';
import { oldErc721Abi } from '@/generated/blockchain/oldERC721';
import { erc721ABI } from '@/generated/blockchain/v5';
import { erc1155Abi } from '@/generated/blockchain/v6';
import { NftStandard } from '@/model';
import { getAbi } from '@/utils/abi';
import { areSameAddress } from '@/utils/string';

import { AllV4 } from './AllV4';
import { AllV5 } from './AllV5';
import { AllV6 } from './AllV6';
import { BaseContract } from './BaseContract';
import { MslV4 } from './MslV4';
import { MslV5 } from './MslV5';
import { MslV6 } from './MslV6';
import { UserVaultV5 } from './UserVaultV5';
import { UserVaultV6 } from './UserVaultV6';
export type Wallet = WalletClient<Transport, Chain, Account>;
export type GondiPublicClient = PublicClient<Transport, Chain>;

export interface KeyedClient {
  public: GondiPublicClient;
  wallet: Wallet;
}

type Erc721Or1155ABI = typeof erc721ABI | typeof erc1155Abi;

export class Contracts {
  publicClient: GondiPublicClient;
  walletClient: Wallet;

  MultiSourceLoanV4: MslV4;
  MultiSourceLoanV5: MslV5;
  MultiSourceLoanV6: MslV6;
  AuctionLoanLiquidatorV4: AllV4;
  AuctionLoanLiquidatorV5: AllV5;
  AuctionLoanLiquidatorV6: AllV6;
  UserVaultV5: UserVaultV5;
  UserVaultV6: UserVaultV6;
  PurchaseBundlerV5: PurchaseBundler;
  PurchaseBundlerV6: PurchaseBundler;
  Seaport: Seaport;

  constructor(publicClient: GondiPublicClient, walletClient: Wallet) {
    this.walletClient = walletClient;
    this.publicClient = publicClient;

    const { PurchaseBundler: PurchaseBundlerContract } = getContracts(walletClient.chain);

    this.MultiSourceLoanV4 = new MslV4({ walletClient });
    this.MultiSourceLoanV5 = new MslV5({ walletClient });
    this.MultiSourceLoanV6 = new MslV6({ walletClient });
    this.AuctionLoanLiquidatorV4 = new AllV4({ walletClient });
    this.AuctionLoanLiquidatorV5 = new AllV5({ walletClient });
    this.AuctionLoanLiquidatorV6 = new AllV6({ walletClient });
    this.UserVaultV5 = new UserVaultV5({ walletClient });
    this.UserVaultV6 = new UserVaultV6({ walletClient });
    this.PurchaseBundlerV5 = new PurchaseBundler({
      walletClient,
      contractAddress: PurchaseBundlerContract.v5,
      msl: this.MultiSourceLoanV5,
    });
    this.PurchaseBundlerV6 = new PurchaseBundler({
      walletClient,
      contractAddress: PurchaseBundlerContract.v6,
      msl: this.MultiSourceLoanV6,
    });
    this.Seaport = new Seaport({
      walletClient,
    });
  }

  GenericContract(address: Address) {
    return new BaseContract({
      address,
      abi: getAbi(address, this.walletClient.chain),
      walletClient: this.walletClient,
    });
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
   * @param contractAddress The contract address of the MSL contract
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

  /**
   *
   * @param mslContractAddress The contract address of the MSL contract
   * @returns The corresponding PurchaseBundler contract
   */
  PurchaseBundler(mslContractAddress: Address) {
    if (areSameAddress(mslContractAddress, this.MultiSourceLoanV5.address)) {
      return this.PurchaseBundlerV5;
    }
    if (areSameAddress(mslContractAddress, this.MultiSourceLoanV6.address)) {
      return this.PurchaseBundlerV6;
    }
    throw new Error(`Invalid Contract Address ${mslContractAddress}`);
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

  Nft(address: Address, standard: NftStandard) {
    if (standard === 'ERC721') {
      return this.ERC721(address) as BaseContract<Erc721Or1155ABI>;
    }
    if (standard === 'ERC1155') {
      return this.ERC1155(address) as BaseContract<Erc721Or1155ABI>;
    }
    throw new Error(`Invalid NFT standard ${standard}`);
  }

  ERC721(address: Address) {
    return new BaseContract({
      address,
      abi: erc721ABI,
      walletClient: this.walletClient,
    });
  }

  OldERC721(address: Address) {
    return new BaseContract({
      address,
      abi: oldErc721Abi,
      walletClient: this.walletClient,
    });
  }

  ERC1155(address: Address) {
    return new BaseContract({
      address,
      abi: erc1155Abi,
      walletClient: this.walletClient,
    });
  }

  OldERC721Wrapper(address: Address) {
    return new OldERC721Wrapper({
      walletClient: this.walletClient,
      contractAddress: address,
    });
  }

  ERC20(address: Address) {
    return new Erc20({
      address,
      walletClient: this.walletClient,
    });
  }
}
