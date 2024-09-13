import { Abi, AbiParametersToPrimitiveTypes, ExtractAbiFunction } from 'abitype';
import {
  Address,
  ContractEventName,
  decodeEventLog,
  DecodeEventLogReturnType,
  encodeEventTopics,
  EncodeEventTopicsParameters,
  Hash,
  TransactionReceipt,
  zeroAddress as zeroAddressViem,
} from 'viem';

import type { multiSourceLoanABI as multiSourceLoanABIV4 } from '@/generated/blockchain/v4';
import type {
  auctionLoanLiquidatorABI as auctionLoanLiquidatorABIV5,
  multiSourceLoanABI as multiSourceLoanABIV5,
} from '@/generated/blockchain/v5';
import type {
  auctionLoanLiquidatorAbi as auctionLoanLiquidatorABIV6,
  multiSourceLoanAbi as multiSourceLoanABIV6,
} from '@/generated/blockchain/v6';

type RepayAbiTypeV4 = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof multiSourceLoanABIV4, 'repayLoan'>['inputs']
>;
type RepayAbiTypeV5 = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof multiSourceLoanABIV5, 'repayLoan'>['inputs']
>;
type RepayAbiTypeV6 = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof multiSourceLoanABIV6, 'repayLoan'>['inputs']
>;

type EmitAbiTypeV4 = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof multiSourceLoanABIV4, 'emitLoan'>['inputs']
>;
type EmitAbiTypeV5 = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof multiSourceLoanABIV5, 'emitLoan'>['inputs']
>;
type EmitAbiTypeV6 = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof multiSourceLoanABIV6, 'emitLoan'>['inputs']
>;

type RefiAbiTypeV4 = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof multiSourceLoanABIV4, 'refinanceFull'>['inputs']
>;
type RefiAbiTypeV5 = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof multiSourceLoanABIV5, 'refinanceFull'>['inputs']
>;
type RefiAbiTypeV6 = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof multiSourceLoanABIV6, 'refinanceFull'>['inputs']
>;

type PlaceBidAbiTypeV5 = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof auctionLoanLiquidatorABIV5, 'placeBid'>['inputs']
>;
type PlaceBidAbiTypeV6 = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof auctionLoanLiquidatorABIV6, 'placeBid'>['inputs']
>;

export type LoanV4 = RepayAbiTypeV4[2] & { contractAddress: Address };
export type LoanV5 = RepayAbiTypeV5[0]['loan'] & {
  contractAddress: Address;
  startTime: Date | bigint;
};
export type LoanV6 = RepayAbiTypeV6[0]['loan'] & {
  contractAddress: Address;
  startTime: Date | bigint;
  contractStartTime: Date | bigint;
};
export type Loan = LoanV4 | LoanV5 | LoanV6;

export type OfferV4 = EmitAbiTypeV4[0];
export type OfferV5 = EmitAbiTypeV5[0]['executionData']['offer'];
export type OfferV6 = EmitAbiTypeV6[0]['executionData']['offerExecution'][number]['offer'];

export type RenegotiationV4 = RefiAbiTypeV4[0];
export type RenegotiationV5 = RefiAbiTypeV5[0];
export type RenegotiationV6 = RefiAbiTypeV6[0];

type AuctionV5 = PlaceBidAbiTypeV5[2];
type AuctionV6 = PlaceBidAbiTypeV6[2];
export type Auction = AuctionV5 | AuctionV6;

export type HexString = `0x${string}`;
export type Signature = HexString;

export const zeroAddress: Address = zeroAddressViem;
export const zeroHash: Hash = `0x${'0'.repeat(64)}`;
export const zeroHex: HexString = `0x0`;

export const REORG_SAFETY_BUFFER = 5n * 60n;

export function filterLogs<TAbi extends Abi, TEventName extends ContractEventName<TAbi>>(
  receipt: TransactionReceipt,
  filter: EncodeEventTopicsParameters<TAbi, TEventName>,
): (DecodeEventLogReturnType<TAbi, TEventName> & { topics: string[] })[] {
  return receipt.logs
    .filter((log) => {
      const topics = encodeEventTopics(filter);
      return topics[0] == log.topics[0];
    })
    .map((log) => {
      const decoded = decodeEventLog({
        abi: filter.abi,
        data: log.data,
        topics: log.topics,
        eventName: filter.eventName,
      });
      return { ...decoded, topics: log.topics };
    })
    .filter((event) => event.eventName == filter.eventName);
}
