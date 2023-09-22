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

import { multiSourceLoanABI as multiSourceLoanABIV4 } from "@/generated/blockchain/v4";
import {
  erc20ABI,
  erc721ABI,
  multiSourceLoanABI as multiSourceLoanABIV5,
} from "@/generated/blockchain/v5";

import { getContracts } from "./deploys";
export type Wallet = WalletClient<Transport, Chain, Account>;

export class Contracts {
  walletClient: Wallet;
  publicClient: PublicClient;
  MultiSourceLoanV4: GetContractReturnType<
    typeof multiSourceLoanABIV4,
    PublicClient,
    Wallet,
    Address
  >;
  MultiSourceLoanV5: GetContractReturnType<
    typeof multiSourceLoanABIV5,
    PublicClient,
    Wallet,
    Address
  >;

  constructor(publicClient: PublicClient, walletClient: Wallet) {
    this.walletClient = walletClient;
    this.publicClient = publicClient;

    const { MultiSourceLoanV4Address, MultiSourceLoanV5Address } = getContracts(
      walletClient.chain
    );
    this.MultiSourceLoanV4 = getContract({
      address: MultiSourceLoanV4Address,
      abi: multiSourceLoanABIV4,
      walletClient,
      publicClient,
    });
    this.MultiSourceLoanV5 = getContract({
      address: MultiSourceLoanV5Address,
      abi: multiSourceLoanABIV5,
      walletClient,
      publicClient,
    });
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

type AbiType = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof multiSourceLoanABIV4, "repayLoan">["inputs"]
>;

export type Loan = AbiType[2];

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
