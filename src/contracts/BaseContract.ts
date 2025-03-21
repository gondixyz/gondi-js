import {
  Abi,
  Address,
  ContractEventName,
  ContractFunctionArgs,
  ContractFunctionName,
  createPublicClient,
  createTransport,
  decodeFunctionData,
  getContract,
  GetContractReturnType,
  Hash,
  Hex,
  parseEventLogs,
  PublicClient,
  SimulateContractParameters,
  TransactionReceipt,
} from 'viem';

import { Wallet } from '@/contracts';

export class BaseContract<TAbi extends Abi> {
  abi: TAbi;
  address: Address;
  bcClient: PublicClient;
  wallet: Wallet;
  contract: GetContractReturnType<TAbi, PublicClient | Wallet>;

  safeContractWrite: {
    [TFunctionName in ContractFunctionName<TAbi, 'nonpayable' | 'payable'>]: (
      args: SimulateContractParameters<TAbi, TFunctionName>['args'],
      options?: { value?: bigint },
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
  }: {
    walletClient: Wallet;
    address: Address;
    abi: TAbi;
  }) {
    this.wallet = walletClient;
    const bcClient = createPublicClient({
      transport: () => createTransport(walletClient.transport),
    });
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
          options: { value?: bigint } = {},
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
    try {
      const decoded = decodeFunctionData({
        abi: this.abi,
        data,
      });
      // @ts-expect-error
      return this.safeContractWrite[decoded.functionName](decoded.args, { value });
    } catch (e) {
      return this.sendRawTransaction(data, value);
    }
  }
}
