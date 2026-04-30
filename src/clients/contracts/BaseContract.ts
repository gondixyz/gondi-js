import {
  Abi,
  Address,
  BaseError,
  ContractEventName,
  ContractFunctionArgs,
  ContractFunctionName,
  createPublicClient,
  createTransport,
  decodeErrorResult,
  decodeFunctionData,
  encodeFunctionData,
  getContract,
  GetContractReturnType,
  Hash,
  Hex,
  parseEventLogs,
  PublicClient,
  RawContractError,
  SimulateContractParameters,
  TransactionReceipt,
} from 'viem';

import { Wallet } from '@/clients/contracts';

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

  // Raw-calldata equivalent of `safeContractWrite`: eth_call first so reverts
  // surface before broadcasting, then send the original bytes unchanged.
  // Use this when the calldata can't be expressed as abi + args (e.g. it has
  // trailing attribution bytes appended after the ABI-encoded payload).
  private async safeRawWrite(data: Hex, value?: bigint) {
    try {
      await this.bcClient.call({
        to: this.address,
        data,
        value,
        account: this.wallet.account,
      });
    } catch (err) {
      throw this.decodeRawRevert(err);
    }
    return this.sendRawTransaction(data, value);
  }

  // bcClient.call surfaces custom errors as raw revert bytes; decode them
  // against the contract ABI so callers see the same error names/args that
  // safeContractWrite would have produced via simulateContract.
  private decodeRawRevert(err: unknown): unknown {
    if (!(err instanceof BaseError)) return err;
    const raw = err.walk((e) => e instanceof RawContractError);
    if (!(raw instanceof RawContractError)) return err;
    const revertData = typeof raw.data === 'string' ? raw.data : raw.data?.data;
    if (!revertData || revertData === '0x') return err;
    try {
      const decoded = decodeErrorResult({ abi: this.abi, data: revertData });
      const args = Array.isArray(decoded.args) ? decoded.args.map(String).join(', ') : '';
      return new Error(`Reverted: ${decoded.errorName}(${args})`, { cause: err });
    } catch {
      return err;
    }
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

    // Preserve any trailing bytes that aren't part of the ABI-encoded args
    // (e.g. the gondi attribution tag appended to seaport calldata by the
    // backend). Solidity's ABI decoder ignores trailing bytes, so a
    // decode -> re-encode round-trip would silently drop them.
    const reencoded = encodeFunctionData({
      abi: this.abi,
      functionName: decoded.functionName,
      args: decoded.args,
    } as Parameters<typeof encodeFunctionData>[0]);
    if (data.length > reencoded.length) {
      return this.safeRawWrite(data, value);
    }

    // @ts-expect-error
    return this.safeContractWrite[decoded.functionName](decoded.args, { value });
  }
}
