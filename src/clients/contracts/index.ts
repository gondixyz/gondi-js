import { Abi, Account, Address, Chain, PublicClient, Transport, WalletClient } from 'viem';

import { Erc20 } from '@/clients/contracts/Erc20';
import { OldERC721Wrapper } from '@/clients/contracts/OldERC721Wrapper';
import { PositionMigrator } from '@/clients/contracts/PositionMigrator';
import { PurchaseBundlerV1 } from '@/clients/contracts/PurchaseBundlerV1';
import { PurchaseBundlerV2 } from '@/clients/contracts/PurchaseBundlerV2';
import {
  getContracts,
  getVersionFromMslAddress,
  getVersionFromPurchaseBundlerAddress,
  getVersionFromUserVaultAddress,
} from '@/deploys';
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

  _Msls = {
    '1': MslV4,
    '2': MslV5,
    '3': MslV6,
    '3.1': MslV6,
  };

  _Alls = {
    '1': AllV4,
    '2': AllV5,
    '3': AllV6,
    '3.1': AllV6,
  };

  _PBs = {
    '2': PurchaseBundlerV1,
    '3': PurchaseBundlerV1,
    '3.1': PurchaseBundlerV1,
    '3.1_PB_V2': PurchaseBundlerV2,
  };

  _UserVaults = {
    '2': UserVaultV5,
    '3': UserVaultV6,
  };

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

  Msl(address: Address) {
    const version = getVersionFromMslAddress(this.walletClient.chain, address);
    const Msl = this._Msls[version];

    return new Msl({
      walletClient: this.walletClient,
      address,
      version,
    });
  }

  /**
   *
   * @param contractAddress The contract address of the MSL contract
   * @returns The corresponding AuctionLoanLiquidator contract
   */
  All(mslContractAddress: Address) {
    const version = getVersionFromMslAddress(this.walletClient.chain, mslContractAddress);
    const All = this._Alls[version];
    const contracts = getContracts(this.walletClient.chain);

    return new All({
      walletClient: this.walletClient,
      address: contracts.AuctionLoanLiquidator[version],
    });
  }

  /**
   * @param address The contract address of the PurchaseBundler contract
   * @param mslContractAddress The contract address of the MSL contract
   * @returns The corresponding PurchaseBundler contract
   */
  PurchaseBundler(address: Address | undefined, mslContractAddress: Address) {
    const mslVersion = getVersionFromMslAddress(this.walletClient.chain, mslContractAddress);
    if (mslVersion === '1') {
      throw new Error('V1 has no support for PurchaseBundler');
    }

    const msl = this.Msl(mslContractAddress);
    if (msl instanceof MslV4) {
      // Enforce type cast, this should never happen.
      throw new Error('MslV4 is not supported for PurchaseBundler');
    }

    const contracts = getContracts(this.walletClient.chain);
    const resolvedAddress = address ?? contracts.PurchaseBundler[mslVersion];
    const version = getVersionFromPurchaseBundlerAddress(this.walletClient.chain, resolvedAddress);
    const PurchaseBundler = this._PBs[version];

    if ((mslVersion === '2' || mslVersion === '3') && version === '3.1_PB_V2') {
      throw new Error('PurchaseBundlerV2 is not supported for MslV5 or MslV6');
    }

    return new PurchaseBundler({
      walletClient: this.walletClient,
      address: resolvedAddress,
      msl,
    });
  }

  UserVault(address: Address) {
    const version = getVersionFromUserVaultAddress(this.walletClient.chain, address);
    const UserVault = this._UserVaults[version];

    return new UserVault({
      walletClient: this.walletClient,
      address,
    });
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

  PositionMigrator(address: Address, msl: MslV6) {
    return new PositionMigrator({
      walletClient: this.walletClient,
      address,
      msl,
    });
  }
}
