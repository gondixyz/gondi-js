import {
  Abi,
  AbiParametersToPrimitiveTypes,
  ExtractAbiEventNames,
  ExtractAbiFunction,
} from "abitype";
import {
  DecodeEventLogReturnType,
  EncodeEventTopicsParameters,
  WalletClient,
} from "viem";
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
} from "viem";

import type { multiSourceLoanABI as multiSourceLoanABIV4 } from "@/generated/blockchain/v4";
import { erc20ABI, erc721ABI } from "@/generated/blockchain/v5";

import { MslV4 } from "./contracts/MslV4";
import { MslV5 } from "./contracts/MslV5";
import { areSameAddress } from "./utils";
export type Wallet = WalletClient<Transport, Chain, Account>;

export class Contracts {
  walletClient: Wallet;
  publicClient: PublicClient;

  MultiSourceLoanV4: MslV4;
  MultiSourceLoanV5: MslV5;

  constructor(publicClient: PublicClient, walletClient: Wallet) {
    this.walletClient = walletClient;
    this.publicClient = publicClient;

    this.MultiSourceLoanV4 = new MslV4({ walletClient });
    this.MultiSourceLoanV5 = new MslV5({ walletClient });
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

  ERC721(
    nftAddress: Address
  ): GetContractReturnType<typeof erc721ABI, PublicClient, Wallet, Address> {
    return getContract({
      address: nftAddress,
      abi: erc721ABI,
      walletClient: this.walletClient,
      publicClient: this.publicClient,
    });
  }

  ERC20(
    nftAddress: Address
  ): GetContractReturnType<typeof erc20ABI, PublicClient, Wallet, Address> {
    return getContract({
      address: nftAddress,
      abi: erc20ABI,
      walletClient: this.walletClient,
      publicClient: this.publicClient,
    });
  }
}

type RepayAbiType = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof multiSourceLoanABIV4, "repayLoan">["inputs"]
>;
type EmitAbiType = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof multiSourceLoanABIV4, "emitLoan">["inputs"]
>;
type RefiAbiType = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof multiSourceLoanABIV4, "refinanceFull">["inputs"]
>;

export type Loan = RepayAbiType[2];
export type Offer = EmitAbiType[0];
export type Renegotiation = RefiAbiType[0];

export type HexString = `0x${string}`;
export type Signature = HexString;

export const zeroAddress: Address = zeroAddressViem;
export const zeroHash: Hash = `0x${"0".repeat(64)}`;
export const zeroHex: HexString = `0x0`;

export function filterLogs<
  TAbi extends Abi,
  TEventName extends ExtractAbiEventNames<TAbi>
>(
  receipt: TransactionReceipt,
  filter: EncodeEventTopicsParameters<TAbi, TEventName>
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
