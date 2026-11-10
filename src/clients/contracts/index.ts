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
import { iCryptoPunks721Abi } from '@/generated/blockchain/cryptopunks721';
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

type MslArgs = { walletClient: Wallet; address: Address; publicClient?: PublicClient };

export class Contracts {
  publicClient: GondiPublicClient;
  walletClient: Wallet;

  constructor(publicClient: GondiPublicClient, walletClient: Wallet) {
    this.walletClient = walletClient;
    this.publicClient = publicClient;
  }

  // Each entry supplies its own version so the abi is picked without a cast.
  _Msls = {
    '1': (args: MslArgs) => new MslV4(args),
    '2': (args: MslArgs) => new MslV5(args),
    '3': (args: MslArgs) => new MslV6({ ...args, version: '3' }),
    '3.1': (args: MslArgs) => new MslV6({ ...args, version: '3.1' }),
    '3.2': (args: MslArgs) => new MslV6({ ...args, version: '3.2' }),
  };

  _Alls = {
    '1': AllV4,
    '2': AllV5,
    '3': AllV6,
    '3.1': AllV6,
    '3.2': AllV6,
  };

  _PBs = {
    '2': PurchaseBundlerV1,
    '3': PurchaseBundlerV2,
    '3.1': PurchaseBundlerV1,
    '3.1_PB_V2': PurchaseBundlerV2,
    '3.2': PurchaseBundlerV2,
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
      publicClient: this.publicClient,
    });
  }

  Msl(address: Address) {
    const version = getVersionFromMslAddress(this.walletClient.chain, address);

    return this._Msls[version]({
      walletClient: this.walletClient,
      address,
      publicClient: this.publicClient,
    });
  }

  /**
   * @param mslContractAddress The contract address of the MSL contract
   * @param address The liquidator's address; defaults to the address book's current entry for
   * the MSL version, which is not the liquidator of an auction started before a rotation
   * (use `AllForCollateral` for those)
   * @returns The corresponding AuctionLoanLiquidator contract
   */
  All(mslContractAddress: Address, address?: Address) {
    const version = getVersionFromMslAddress(this.walletClient.chain, mslContractAddress);
    const All = this._Alls[version];
    const contracts = getContracts(this.walletClient.chain);

    return new All({
      walletClient: this.walletClient,
      address: address ?? contracts.AuctionLoanLiquidator[version],
      publicClient: this.publicClient,
    });
  }

  /**
   * The AuctionLoanLiquidator running the auction on a loan's collateral.
   *
   * An MSL can rotate its liquidator, so the address book only names the current one. The MSL
   * transfers the ERC721 collateral to its liquidator when the auction starts, and the
   * liquidator keeps it until the auction settles, so the collateral's owner is the liquidator
   * of the running auction, before or after a rotation.
   *
   * Once the auction settles, or when the loan was foreclosed to the lender instead, the owner is
   * an account that is not running an auction on it, so the owner must still record one: a write
   * with no outputs simulates as a success against an account without code and would broadcast.
   *
   * @param mslContractAddress The contract address of the loan's MSL contract
   * @param collectionContractAddress The collateral's collection
   * @param tokenId The collateral's token id
   * @throws When the collateral's owner records no auction on it
   */
  async AllForCollateral({
    mslContractAddress,
    collectionContractAddress,
    tokenId,
  }: {
    mslContractAddress: Address;
    collectionContractAddress: Address;
    tokenId: bigint;
  }) {
    const liquidator = await this.ERC721(collectionContractAddress).contract.read.ownerOf([
      tokenId,
    ]);
    const auctionLoanLiquidator = this.All(mslContractAddress, liquidator);
    const hasAuction = await auctionLoanLiquidator
      .hasAuction({ collectionContractAddress, tokenId })
      .catch(() => false);
    if (!hasAuction) {
      throw new Error(
        `No running auction for ${collectionContractAddress} #${tokenId}: its owner ${liquidator} records none`,
      );
    }
    return auctionLoanLiquidator;
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
    if (msl instanceof MslV4 || msl instanceof MslV5) {
      // Enforce type cast, this should never happen.
      throw new Error('Loan version not supported for PurchaseBundler');
    }

    const contracts = getContracts(this.walletClient.chain);
    const resolvedAddress = address ?? contracts.PurchaseBundler[mslVersion];
    const version = getVersionFromPurchaseBundlerAddress(this.walletClient.chain, resolvedAddress);
    const PurchaseBundler = this._PBs[version];

    return new PurchaseBundler({
      walletClient: this.walletClient,
      address: resolvedAddress,
      msl,
      publicClient: this.publicClient,
    });
  }

  UserVault(address: Address) {
    const version = getVersionFromUserVaultAddress(this.walletClient.chain, address);
    const UserVault = this._UserVaults[version];

    return new UserVault({
      walletClient: this.walletClient,
      address,
      publicClient: this.publicClient,
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
      publicClient: this.publicClient,
    });
  }

  OldERC721(address: Address) {
    return new BaseContract({
      address,
      abi: oldErc721Abi,
      walletClient: this.walletClient,
      publicClient: this.publicClient,
    });
  }

  Cryptopunks(address: Address) {
    return new BaseContract({
      address,
      abi: cryptopunksABI,
      walletClient: this.walletClient,
      publicClient: this.publicClient,
    });
  }

  Cryptopunks721(address: Address) {
    return new BaseContract({
      address,
      abi: iCryptoPunks721Abi,
      walletClient: this.walletClient,
      publicClient: this.publicClient,
    });
  }

  ERC1155(address: Address) {
    return new BaseContract({
      address,
      abi: erc1155Abi,
      walletClient: this.walletClient,
      publicClient: this.publicClient,
    });
  }

  OldERC721Wrapper(address: Address) {
    return new OldERC721Wrapper({
      walletClient: this.walletClient,
      contractAddress: address,
      publicClient: this.publicClient,
    });
  }

  ERC20(address: Address) {
    return new Erc20({
      address,
      walletClient: this.walletClient,
      publicClient: this.publicClient,
    });
  }

  PositionMigrator(address: Address, msl: MslV6) {
    return new PositionMigrator({
      walletClient: this.walletClient,
      address,
      msl,
      publicClient: this.publicClient,
    });
  }
}
