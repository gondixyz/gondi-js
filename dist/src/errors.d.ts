import { Address, Hash } from 'viem';
export declare class InterruptedSendTransactionStepError {
    orderId: string;
    to: Address;
    callbackData: Hash;
    value: bigint;
    constructor({ orderId, to, callbackData, value, }: {
        orderId: string;
        to: Address;
        callbackData: Hash;
        value: bigint;
    });
}
export declare class InterruptedSeaportSendTransactionStepError extends InterruptedSendTransactionStepError {
    signature: Hash;
    constructor({ orderId, to, callbackData, value, signature, }: {
        orderId: string;
        to: Address;
        callbackData: Hash;
        value: bigint;
        signature: Hash;
    });
}
export declare class InterruptedCryptoPunksSendTransactionStepError extends InterruptedSendTransactionStepError {
}
export declare class InterruptedGenericSendTransactionStepError extends InterruptedSendTransactionStepError {
}
