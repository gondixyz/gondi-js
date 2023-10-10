import { ExtractAbiFunctionNames } from "abitype";
import {
  Abi,
  Account,
  Address,
  Chain,
  createPublicClient,
  createTransport,
  getContract,
  GetContractReturnType,
  Hash,
  PublicClient,
  SimulateContractParameters,
  Transport,
  WalletClient,
} from "viem";

type Wallet = WalletClient<Transport, Chain, Account>;

export class Contract<TAbi extends Abi> {
  abi: TAbi;
  address: Address;
  bcClient: PublicClient;
  wallet: Wallet;
  contract: GetContractReturnType<TAbi, PublicClient, Wallet, Address>;

  safeContractWrite: {
    [TFunctionName in ExtractAbiFunctionNames<TAbi>]: (
      args: SimulateContractParameters<TAbi, TFunctionName>["args"]
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
      walletClient,
      publicClient: this.bcClient,
    });

    this.safeContractWrite = new Proxy({} as typeof this.safeContractWrite, {
      get<TFunctionName extends string>(
        _: unknown,
        functionName: TFunctionName
      ) {
        return async (
          args: SimulateContractParameters<TAbi, TFunctionName>["args"]
        ) => {
          // The typecast here is necessary,
          // we still enjoy the type checking on the arguments themselves so it's not the end of the world
          const { request } = await bcClient.simulateContract({
            address: address,
            abi: abi,
            functionName,
            args,
            account: walletClient.account,
          } as SimulateContractParameters);

          return walletClient.writeContract(request);
        };
      },
    });
  }
}
