import { Address, Hash } from "viem";

export class InterruptedSendTransactionStepError {
  orderId: Hash;
  to: Address;
  callbackData: Hash;
  value: bigint;

  constructor({
    orderId,
    to,
    callbackData,
    value,
  }: {
    orderId: Hash;
    to: Address;
    callbackData: Hash;
    value: bigint;
  }) {
    this.orderId = orderId;
    this.to = to;
    this.callbackData = callbackData;
    this.value = value;
  }
}
export class InterruptedSeaportSendTransactionStepError extends InterruptedSendTransactionStepError {
  signature: Hash;

  constructor({
    orderId,
    to,
    callbackData,
    value,
    signature,
  }: {
    orderId: Hash;
    to: Address;
    callbackData: Hash;
    value: bigint;
    signature: Hash;
  }) {
    super({ orderId, to, callbackData, value });
    this.signature = signature;
  }
}

export class InterruptedCryptoPunksSendTransactionStepError extends InterruptedSendTransactionStepError {}

export class InterruptedGenericSendTransactionStepError extends InterruptedSendTransactionStepError {}
