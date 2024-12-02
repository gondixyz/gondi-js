import { Address, Hash } from 'viem';

export class InterruptedSendTransactionStepError {
  orderId: string;
  to: Address;
  callbackData: Hash;
  value: bigint;

  constructor({
    orderId,
    to,
    callbackData,
    value,
  }: {
    orderId: string;
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
    orderId: string;
    to: Address;
    callbackData: Hash;
    value: bigint;
    signature: Hash;
  }) {
    super({ orderId, to, callbackData, value });
    this.signature = signature;
  }
}
