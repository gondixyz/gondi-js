import { Address } from 'viem';

import { Wallet } from '@/contracts';
import { BaseContract } from '@/contracts/BaseContract';
import { oldErc721WrapperAbi } from '@/generated/blockchain/oldERC721Wrapper';

export class OldERC721Wrapper extends BaseContract<typeof oldErc721WrapperAbi> {
  constructor({
    walletClient,
    contractAddress,
  }: {
    walletClient: Wallet;
    contractAddress: Address;
  }) {
    super({
      walletClient,
      address: contractAddress,
      abi: oldErc721WrapperAbi,
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
