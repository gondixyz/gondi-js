import {
  Abi,
  Address,
  ContractEventName,
  ContractFunctionArgs,
  ContractFunctionName,
  createPublicClient,
  createTransport,
  decodeFunctionData,
  encodeFunctionData,
  getContract,
  GetContractReturnType,
  Hash,
  Hex,
  parseEventLogs,
  PublicClient,
  SimulateContractParameters,
  TransactionReceipt,
} from 'viem';

import { Wallet } from '@/clients/contracts';
import { withRetriedReceiptWait } from '@/utils/blockchain';

/**
 * Options of a `safeContractWrite` call. `dataSuffix` is appended verbatim after
 * the ABI-encoded arguments, both in the simulation and in the broadcast
 * transaction (viem's `writeContract` forwards it to `sendTransaction`, which
 * concatenates it onto `data`); Solidity's decoder ignores trailing bytes, so a
 * suffix never changes what the contract executes.
 */
export type SafeContractWriteOptions = { value?: bigint; dataSuffix?: Hex };

export class BaseContract<TAbi extends Abi> {
  abi: TAbi;
  address: Address;
  bcClient: PublicClient;
  wallet: Wallet;
  contract: GetContractReturnType<TAbi, PublicClient | Wallet>;

  safeContractWrite: {
    [TFunctionName in ContractFunctionName<TAbi, 'nonpayable' | 'payable'>]: (
      args: SimulateContractParameters<TAbi, TFunctionName>['args'],
      options?: SafeContractWriteOptions,
    ) => Promise<Hash>;
  };

  parseEventLogs: <TFunctionName extends ContractEventName<TAbi>>(
    eventName: TFunctionName,
    logs: TransactionReceipt['logs'],
  ) => ReturnType<typeof parseEventLogs<TAbi, true, TFunctionName>>;

  constructor({
    walletClient,
    address,
    abi,
    publicClient,
  }: {
    walletClient: Wallet;
    address: Address;
    abi: TAbi;
    publicClient?: PublicClient;
  }) {
    this.wallet = walletClient;
    const bcClient =
      publicClient ??
      withRetriedReceiptWait(
        createPublicClient({
          transport: () => createTransport(walletClient.transport),
        }),
      );
    this.bcClient = bcClient;
    this.address = address;
    this.abi = abi;
    this.contract = getContract({
      address: this.address,
      abi: this.abi,
      client: {
        public: this.bcClient,
        wallet: walletClient,
      },
    });

    this.parseEventLogs = (eventName, logs) => parseEventLogs({ eventName, logs, abi: this.abi });

    this.safeContractWrite = new Proxy({} as typeof this.safeContractWrite, {
      get<TFunctionName extends ContractFunctionName<TAbi, 'nonpayable' | 'payable'>>(
        _: unknown,
        functionName: TFunctionName,
      ) {
        return async (
          args: ContractFunctionArgs<TAbi, 'nonpayable' | 'payable', TFunctionName>,
          options: SafeContractWriteOptions = {},
        ) => {
          // The typecast here is necessary,
          // we still enjoy the type checking on the arguments themselves so it's not the end of the world
          const { request } = await bcClient.simulateContract({
            address,
            abi,
            functionName,
            args,
            account: walletClient.account,
            ...options,
          } as unknown as SimulateContractParameters);

          return walletClient.writeContract(request);
        };
      },
    });
  }

  async sendTransactionData(data: Hex, value?: bigint) {
    const txHash = await this.sendTransactionWithAbiValidation(data, value);
    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        if (receipt.status === 'reverted')
          throw new Error(`Transaction reverted to:${this.address}, data:${data}`);
        return receipt;
      },
    };
  }

  private async sendRawTransaction(data: Hex, value?: bigint) {
    return this.wallet.sendTransaction({ data, to: this.address, value });
  }

  private async sendTransactionWithAbiValidation(data: Hex, value?: bigint) {
    let decoded;
    try {
      decoded = decodeFunctionData({
        abi: this.abi,
        data,
      });
    } catch (e) {
      return this.sendRawTransaction(data, value);
    }

    const reencoded = encodeFunctionData({
      abi: this.abi,
      functionName: decoded.functionName,
      args: decoded.args,
    } as Parameters<typeof encodeFunctionData>[0]);
    if (!data.toLowerCase().startsWith(reencoded.toLowerCase())) {
      return this.sendRawTransaction(data, value);
    }
    const dataSuffix =
      data.length > reencoded.length ? (`0x${data.slice(reencoded.length)}` as Hex) : undefined;

    // @ts-expect-error
    return this.safeContractWrite[decoded.functionName](decoded.args, { value, dataSuffix });
  }
}
