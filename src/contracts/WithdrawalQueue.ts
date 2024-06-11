import { Address, encodeFunctionData } from 'viem';

import { filterLogs } from '@/blockchain';
import { Wallet } from '@/contracts';
import { withdrawalQueueAbi } from '@/generated/blockchain/v6';

import { BaseContract } from './BaseContract';

export class WithdrawalQueue extends BaseContract<typeof withdrawalQueueAbi> {
  constructor({ walletClient, address }: { walletClient: Wallet; address: Address }) {
    super({
      walletClient,
      address,
      abi: withdrawalQueueAbi,
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

  async withdrawMany({ to, tokenIds }: { to: Address; tokenIds: bigint[] }) {
    if (tokenIds.length === 1) {
      // This makes the tx readable in wallets
      return this.withdraw({ to, tokenId: tokenIds[0] });
    }

    const txHash = await this.safeContractWrite.multicall([
      tokenIds.map((tokenId) =>
        encodeFunctionData({
          abi: withdrawalQueueAbi,
          functionName: 'withdraw',
          args: [to, tokenId],
        }),
      ),
    ]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });

        const filter = await this.contract.createEventFilter.Withdrawn();
        const events = filterLogs(receipt, filter);
        if (events.length !== tokenIds.length) throw new Error('Withdraw did not go through');
        return { ...receipt, results: events.map(({ args }) => args) };
      },
    };
  }
}
