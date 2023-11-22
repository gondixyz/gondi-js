import { Hash, TransactionReceipt } from "viem";

export type ContractMethodReturnType<T> = Promise<{
  txHash: Hash;
  waitTxInBlock: () => Promise<TransactionReceipt & T>;
}>;
