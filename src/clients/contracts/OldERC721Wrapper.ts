import { Address, Hash, PublicClient } from 'viem';

import { Wallet } from '@/clients/contracts';
import { BaseContract } from '@/clients/contracts/BaseContract';
import { oldErc721WrapperAbi } from '@/generated/blockchain/oldERC721Wrapper';
import { minedTransaction } from '@/utils/blockchain';

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

    return this._sentTransaction(txHash);
  }

  async unwrap(tokenId: bigint) {
    const txHash = await this.safeContractWrite.unwrap([tokenId]);

    return this._sentTransaction(txHash);
  }

  /** The wrapper's public shape of {@link minedTransaction}: its wait is named `waitMined`. */
  private _sentTransaction(txHash: Hash) {
    const { waitTxInBlock: waitMined } = minedTransaction(this.bcClient, txHash);
    return { txHash, waitMined };
  }
}
