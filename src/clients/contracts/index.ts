import { Abi, Account, Address, Chain, PublicClient, Transport, WalletClient } from 'viem';

import { Erc20 } from '@/clients/contracts/Erc20';
import { OldERC721Wrapper } from '@/clients/contracts/OldERC721Wrapper';
import { PurchaseBundler } from '@/clients/contracts/PurchaseBundler';
import { getContracts } from '@/deploys';
import { cryptopunksABI } from '@/generated/blockchain/cryptopunks';
import { oldErc721Abi } from '@/generated/blockchain/oldERC721';
import { seaportABI } from '@/generated/blockchain/seaport';
import { erc721ABI } from '@/generated/blockchain/v5';
import { erc1155Abi } from '@/generated/blockchain/v6';
import { NftStandard } from '@/model';
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

  constructor(publicClient: GondiPublicClient, walletClient: Wallet) {
    this.walletClient = walletClient;
    this.publicClient = publicClient;
  }

  GenericContract(address: Address) {
    const contracts = getContracts(this.walletClient.chain);

    let abi: Abi = [];

    if (areSameAddress(address, contracts.Seaport)) {
      abi = seaportABI;
    } else if (areSameAddress(address, contracts.Cryptopunks)) {
      abi = cryptopunksABI;
    }

    return new BaseContract({
      address,
      abi,
      walletClient: this.walletClient,
    });
  }

  Msl(contractAddress: Address) {
    const contracts = getContracts(this.walletClient.chain);

    if (areSameAddress(contractAddress, contracts.MultiSourceLoan.v4)) {
      return new MslV4({ walletClient: this.walletClient });
    }
    if (areSameAddress(contractAddress, contracts.MultiSourceLoan.v5)) {
      return new MslV5({ walletClient: this.walletClient });
    }
    if (areSameAddress(contractAddress, contracts.MultiSourceLoan.v6)) {
      return new MslV6({
        walletClient: this.walletClient,
        contractAddress: contracts.MultiSourceLoan.v6,
        version: '3',
      });
    }
    if (areSameAddress(contractAddress, contracts.MultiSourceLoan.v7)) {
      return new MslV6({
        walletClient: this.walletClient,
        contractAddress: contracts.MultiSourceLoan.v7,
        version: '3.1',
      });
    }

    throw new Error(
      `Invalid Contract Address ${contractAddress} for chain ${this.walletClient.chain.id}`,
    );
  }

  /**
   *
   * @param contractAddress The contract address of the MSL contract
   * @returns The corresponding AuctionLoanLiquidator contract
   */
  All(contractAddress: Address) {
    const contracts = getContracts(this.walletClient.chain);

    if (areSameAddress(contractAddress, contracts.MultiSourceLoan.v4)) {
      return new AllV4({ walletClient: this.walletClient });
    }
    if (areSameAddress(contractAddress, contracts.MultiSourceLoan.v5)) {
      return new AllV5({ walletClient: this.walletClient });
    }

    if (areSameAddress(contractAddress, contracts.MultiSourceLoan.v6)) {
      return new AllV6({
        walletClient: this.walletClient,
        contractAddress: contracts.AuctionLoanLiquidator.v6,
      });
    }
    if (areSameAddress(contractAddress, contracts.MultiSourceLoan.v7)) {
      return new AllV6({
        walletClient: this.walletClient,
        contractAddress: contracts.AuctionLoanLiquidator.v7,
      });
    }
    throw new Error(`Invalid Contract Address ${contractAddress}`);
  }

  /**
   *
   * @param mslContractAddress The contract address of the MSL contract
   * @returns The corresponding PurchaseBundler contract
   */
  PurchaseBundler(mslContractAddress: Address) {
    const contracts = getContracts(this.walletClient.chain);

    const msl = this.Msl(mslContractAddress);
    if (msl instanceof MslV4) {
      // Enforce type cast, this should never happen.
      throw new Error('MslV4 is not supported for PurchaseBundler');
    }

    if (areSameAddress(mslContractAddress, contracts.MultiSourceLoan.v5)) {
      return new PurchaseBundler({
        walletClient: this.walletClient,
        contractAddress: contracts.PurchaseBundler.v5,
        msl,
      });
    }
    if (areSameAddress(mslContractAddress, contracts.MultiSourceLoan.v6)) {
      return new PurchaseBundler({
        walletClient: this.walletClient,
        contractAddress: contracts.PurchaseBundler.v6,
        msl,
      });
    }
    if (areSameAddress(mslContractAddress, contracts.MultiSourceLoan.v7)) {
      return new PurchaseBundler({
        walletClient: this.walletClient,
        contractAddress: contracts.PurchaseBundler.v7,
        msl,
      });
    }
    throw new Error(`Invalid Contract Address ${mslContractAddress}`);
  }

  UserVault(contractAddress: Address) {
    const contracts = getContracts(this.walletClient.chain);

    if (areSameAddress(contractAddress, contracts.UserVault.v5)) {
      return new UserVaultV5({ walletClient: this.walletClient });
    }
    if (areSameAddress(contractAddress, contracts.UserVault.v6)) {
      return new UserVaultV6({ walletClient: this.walletClient });
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
