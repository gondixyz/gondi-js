import {
  Abi,
  Account,
  Address,
  Chain,
  createPublicClient,
  createTransport,
  getContract,
  GetContractReturnType,
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

  constructor({
    // publicClient,
    walletClient,
    address,
    abi,
  }: {
    publicClient: PublicClient;
    walletClient: Wallet;
    address: Address;
    abi: TAbi;
  }) {
    this.wallet = walletClient;
    this.bcClient = createPublicClient({
      transport: ({ chain: _chain }: { chain?: Chain }) =>
        createTransport(walletClient.transport),
    });
    this.address = address;
    this.abi = abi;
    // @ts-ignore TODO: fix this
    this.contract = getContract({
      address: this.address,
      abi: this.abi,
      walletClient,
      publicClient: this.bcClient,
    });
  }

  protected async safeContractWrite<TFunctionName extends string>(
    functionName: TFunctionName,
    args: SimulateContractParameters<TAbi, TFunctionName>["args"]
  ) {
    // The typecast here is necessary,
    // we still enjoy the type checking on the arguments themselves so it's not the end of the world
    const { request } = await this.bcClient.simulateContract({
      address: this.address,
      abi: this.abi,
      functionName,
      args,
      account: this.wallet.account,
    } as SimulateContractParameters);

    return this.wallet.writeContract(request);
  }
}
