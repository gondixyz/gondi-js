import { Address, decodeFunctionData, Hex } from 'viem';

import { Wallet } from '@/clients/contracts';
import { erc20ABI } from '@/generated/blockchain/v5';

import { BaseContract } from './BaseContract';

export class Erc20 extends BaseContract<typeof erc20ABI> {
  constructor({ address, walletClient }: { address: Address; walletClient: Wallet }) {
    super({
      walletClient,
      address,
      abi: erc20ABI,
    });
  }

  decodeApproveCalldata(calldata: Hex) {
    const decoded = decodeFunctionData({
      abi: erc20ABI,
      data: calldata,
    });
    if (decoded.functionName !== 'approve') {
      throw new Error('Wrong calldata');
    }
    return decoded.args;
  }
}
