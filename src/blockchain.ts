import {
  Abi,
  AbiParametersToPrimitiveTypes,
  ExtractAbiEventNames,
  ExtractAbiFunction,
} from 'abitype';
import { DecodeEventLogReturnType, EncodeEventTopicsParameters, WalletClient } from 'viem';
import {
  Account,
  Address,
  Chain,
  decodeEventLog,
  encodeEventTopics,
  getContract,
  GetContractReturnType,
  Hash,
  PublicClient,
  TransactionReceipt,
  Transport,
  zeroAddress as zeroAddressViem,
} from 'viem';

import type { multiSourceLoanABI as multiSourceLoanABIV4 } from '@/generated/blockchain/v4';
import type { auctionLoanLiquidatorABI as auctionLoanLiquidatorABIV5 } from '@/generated/blockchain/v5';
import type { multiSourceLoanABI as multiSourceLoanABIV5 } from '@/generated/blockchain/v5';
import { erc20ABI, erc721ABI } from '@/generated/blockchain/v5';

import { AllV4 } from './contracts/AllV4';
import { AllV5 } from './contracts/AllV5';
import { CryptoPunks } from './contracts/CryptoPunks';
import { Leverage } from './contracts/Leverage';
import { MslV4 } from './contracts/MslV4';
import { MslV5 } from './contracts/MslV5';
import { Seaport } from './contracts/Seaport';
import { UserVaultV5 } from './contracts/UserVaultV5';
import { areSameAddress } from './utils';

export type Wallet = WalletClient<Transport, Chain, Account>;

export class Contracts {
  walletClient: Wallet;
  publicClient: PublicClient;

  MultiSourceLoanV4: MslV4;
  MultiSourceLoanV5: MslV5;
  AuctionLoanLiquidatorV4: AllV4;
  AuctionLoanLiquidatorV5: AllV5;
  UserVaultV5: UserVaultV5;
  Leverage: Leverage;
  Seaport: Seaport;
  CryptoPunks: CryptoPunks;

  constructor(publicClient: PublicClient, walletClient: Wallet) {
    this.walletClient = walletClient;
    this.publicClient = publicClient;

    this.MultiSourceLoanV4 = new MslV4({ walletClient });
    this.MultiSourceLoanV5 = new MslV5({ walletClient });
    this.AuctionLoanLiquidatorV4 = new AllV4({ walletClient });
    this.AuctionLoanLiquidatorV5 = new AllV5({ walletClient });
    this.UserVaultV5 = new UserVaultV5({ walletClient });
    this.Leverage = new Leverage({
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
    throw new Error(`Invalid Contract Address ${contractAddress}`);
  }

  UserVault(contractAddress: Address) {
    if (areSameAddress(contractAddress, this.UserVaultV5.address)) {
      return this.UserVaultV5;
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

type RepayAbiTypeV4 = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof multiSourceLoanABIV4, 'repayLoan'>['inputs']
>;
type RepayAbiTypeV5 = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof multiSourceLoanABIV5, 'repayLoan'>['inputs']
>;

type EmitAbiTypeV4 = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof multiSourceLoanABIV4, 'emitLoan'>['inputs']
>;
type EmitAbiTypeV5 = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof multiSourceLoanABIV5, 'emitLoan'>['inputs']
>;

type RefiAbiTypeV4 = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof multiSourceLoanABIV4, 'refinanceFull'>['inputs']
>;
type RefiAbiTypeV5 = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof multiSourceLoanABIV5, 'refinanceFull'>['inputs']
>;

type PlaceBidAbiType = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof auctionLoanLiquidatorABIV5, 'placeBid'>['inputs']
>;

export type LoanV4 = RepayAbiTypeV4[2] & { contractAddress: Address };
export type LoanV5 = RepayAbiTypeV5[0]['loan'] & { contractAddress: Address };
export type LoanV4V5 = LoanV4 | LoanV5;

export type OfferV4 = EmitAbiTypeV4[0];
export type OfferV5 = EmitAbiTypeV5[0]['executionData']['offer'];

export type RenegotiationV4 = RefiAbiTypeV4[0];
export type RenegotiationV5 = RefiAbiTypeV5[0];

export type Auction = PlaceBidAbiType[2];

export type HexString = `0x${string}`;
export type Signature = HexString;

export const zeroAddress: Address = zeroAddressViem;
export const zeroHash: Hash = `0x${'0'.repeat(64)}`;
export const zeroHex: HexString = `0x0`;

export function filterLogs<TAbi extends Abi, TEventName extends ExtractAbiEventNames<TAbi>>(
  receipt: TransactionReceipt,
  filter: EncodeEventTopicsParameters<TAbi, TEventName>,
): DecodeEventLogReturnType<TAbi, TEventName>[] {
  return receipt.logs
    .filter((log) => {
      const topics = encodeEventTopics(filter);
      return topics[0] == log.topics[0];
    })
    .map((log) => {
      return decodeEventLog({
        abi: filter.abi,
        data: log.data,
        topics: log.topics,
        eventName: filter.eventName,
      });
    })
    .filter((event) => event.eventName == filter.eventName);
}
