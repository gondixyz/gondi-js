import { Address, Hash } from "viem";

export class InterruptedSendTransactionStepError {
  orderId: string;
  to: Address;
  callbackData: Hash;
  value: bigint;
  signature: Hash;
  isSeaportCall: boolean;

  constructor({
    orderId,
    to,
    callbackData,
    value,
    signature,
    isSeaportCall,
  }: {
    orderId: string;
    to: Address;
    callbackData: Hash;
    value: bigint;
    signature: Hash;
    isSeaportCall: boolean;
  }) {
    this.orderId = orderId;
    this.to = to;
    this.callbackData = callbackData;
    this.value = value;
    this.signature = signature;
    this.isSeaportCall = isSeaportCall;
  }
}
