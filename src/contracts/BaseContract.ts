import {
  Abi,
  Address,
  ContractFunctionArgs,
  ContractFunctionName,
  createPublicClient,
  createTransport,
  getContract,
  GetContractReturnType,
  Hash,
  PublicClient,
  SimulateContractParameters,
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
}
