import {
  Abi,
  AbiParametersToPrimitiveTypes,
  ExtractAbiEventNames,
  ExtractAbiFunction,
} from 'abitype';
import {
  Address,
  decodeEventLog,
  DecodeEventLogReturnType,
  encodeEventTopics,
  EncodeEventTopicsParameters,
  Hash,
  TransactionReceipt,
  zeroAddress as zeroAddressViem,
} from 'viem';

import type { multiSourceLoanABI as multiSourceLoanABIV4 } from '@/generated/blockchain/v4';
import type { auctionLoanLiquidatorABI as auctionLoanLiquidatorABIV5 } from '@/generated/blockchain/v5';
import type { multiSourceLoanABI as multiSourceLoanABIV5 } from '@/generated/blockchain/v5';
import type { multiSourceLoanAbi as multiSourceLoanABIV6 } from '@/generated/blockchain/v6';

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

type PlaceBidAbiType = AbiParametersToPrimitiveTypes<
  ExtractAbiFunction<typeof auctionLoanLiquidatorABIV5, 'placeBid'>['inputs']
>;

export type LoanV4 = RepayAbiTypeV4[2] & { contractAddress: Address };
export type LoanV5 = RepayAbiTypeV5[0]['loan'] & { contractAddress: Address };
export type LoanV6 = RepayAbiTypeV6[0]['loan'] & { contractAddress: Address };
export type Loan = LoanV4 | LoanV5 | LoanV6;

export type OfferV4 = EmitAbiTypeV4[0];
export type OfferV5 = EmitAbiTypeV5[0]['executionData']['offer'];
export type OfferV6 = EmitAbiTypeV6[0]['executionData']['offerExecution'][number]['offer'];

export type RenegotiationV4 = RefiAbiTypeV4[0];
export type RenegotiationV5 = RefiAbiTypeV5[0];
export type RenegotiationV6 = RefiAbiTypeV6[0];

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
