import { Address } from 'viem';

import { filterLogs } from '@/blockchain';
import { Wallet } from '@/contracts';
import { withdrawalQueueABI } from '@/generated/blockchain/withdrawal_queue';

import { BaseContract } from './BaseContract';

export class WithdrawalQueue extends BaseContract<typeof withdrawalQueueABI> {
  constructor({ walletClient, address }: { walletClient: Wallet; address: Address }) {
    super({
      walletClient,
      address,
      abi: withdrawalQueueABI,
    });
  }

  async ownerOf(tokenId: bigint) {
    return this.contract.read.ownerOf([tokenId]);
  }

  async getAvailable(tokenId: bigint) {
    return this.contract.read.getAvailable([tokenId]);
  }

  async withdraw({ to, tokenId }: { to: Address; tokenId: bigint }) {
    const txHash = await this.safeContractWrite.withdraw([to, tokenId]);
    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });

        const filter = await this.contract.createEventFilter.Withdrawn();
        const events = filterLogs(receipt, filter);
        if (events.length === 0) throw new Error('Withdraw did not go through');
        return { ...events[0].args, ...receipt };
      },
    };
  }
}
