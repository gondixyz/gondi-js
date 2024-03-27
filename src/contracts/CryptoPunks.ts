import { encodeFunctionData } from 'viem';

import { Wallet } from '@/contracts';
import { getContracts } from '@/deploys';
import { cryptopunksABI } from '@/generated/blockchain/cryptopunks';

import { BaseContract } from './BaseContract';

export class CryptoPunks extends BaseContract<typeof cryptopunksABI> {
  constructor({ walletClient }: { walletClient: Wallet }) {
    const { CryptoPunksAddress } = getContracts(walletClient.chain);

    super({
      walletClient,
      address: CryptoPunksAddress,
      abi: cryptopunksABI,
    });
  }

  async encodeBuyPunk(tokenId: bigint) {
    return encodeFunctionData({
      abi: this.abi,
      functionName: 'buyPunk',
      args: [tokenId],
    });
  }
}
