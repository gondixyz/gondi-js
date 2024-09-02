import { ExtractAbiFunctionNames } from 'abitype';
import { Abi, Address, GetContractReturnType, Hash, PublicClient, SimulateContractParameters } from 'viem';
import { Wallet } from '../contracts';
export declare class BaseContract<TAbi extends Abi> {
    abi: TAbi;
    address: Address;
    bcClient: PublicClient;
    wallet: Wallet;
    contract: GetContractReturnType<TAbi, PublicClient, Wallet, Address>;
    safeContractWrite: {
        [TFunctionName in ExtractAbiFunctionNames<TAbi>]: (args: SimulateContractParameters<TAbi, TFunctionName>['args'], options?: {
            value?: bigint;
        }) => Promise<Hash>;
    };
    constructor({ walletClient, address, abi, }: {
        walletClient: Wallet;
        address: Address;
        abi: TAbi;
    });
}
