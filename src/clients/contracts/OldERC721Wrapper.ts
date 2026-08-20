import { Address, PublicClient } from 'viem';

import { Wallet } from '@/clients/contracts';
import { BaseContract } from '@/clients/contracts/BaseContract';
import { oldErc721WrapperAbi } from '@/generated/blockchain/oldERC721Wrapper';

export class OldERC721Wrapper extends BaseContract<typeof oldErc721WrapperAbi> {
  constructor({
    walletClient,
    contractAddress,
    publicClient,
  }: {
    walletClient: Wallet;
    contractAddress: Address;
    publicClient?: PublicClient;
  }) {
    super({
      walletClient,
      address: contractAddress,
      abi: oldErc721WrapperAbi,
      publicClient,
    });
  }

  async wrapOldERC721({ tokenId }: { tokenId: bigint }) {
    const txHash = await this.safeContractWrite.wrap([tokenId]);

    return {
      txHash,
      waitMined: () => this.bcClient.waitForTransactionReceipt({ hash: txHash }),
    };
  }

  async unwrap(tokenId: bigint) {
    const txHash = await this.safeContractWrite.unwrap([tokenId]);

    return {
      txHash,
      waitMined: () =>
        this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        }),
    };
  }
}
