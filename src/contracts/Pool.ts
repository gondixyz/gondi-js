import { Address } from 'viem';

import { filterLogs } from '@/blockchain';
import { Wallet } from '@/contracts';
import { WithdrawalQueue } from '@/contracts/WithdrawalQueue';
import { poolABI } from '@/generated/blockchain/pool';
import { FULFILLED, REJECTED } from '@/utils/promises';

import { BaseContract } from './BaseContract';

export class Pool extends BaseContract<typeof poolABI> {
  constructor({ walletClient, address }: { walletClient: Wallet; address: Address }) {
    super({
      walletClient,
      address,
      abi: poolABI,
    });
  }

  async deposit({ amount, receiver }: { amount: bigint; receiver: Address }) {
    const txHash = await this.safeContractWrite.deposit([amount, receiver]);
    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });

        const filter = await this.contract.createEventFilter.Deposit({});
        const events = filterLogs(receipt, filter);
        if (events.length === 0) throw new Error('Deposit did not go through');
        return { ...events[0].args, ...receipt };
      },
    };
  }

  async mint({ amount, receiver }: { amount: bigint; receiver: Address }) {
    const txHash = await this.safeContractWrite.mint([amount, receiver]);
    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });

        const filter = await this.contract.createEventFilter.Deposit({});
        const events = filterLogs(receipt, filter);
        if (events.length === 0) throw new Error('Mint did not go through');
        return { ...events[0].args, ...receipt };
      },
    };
  }

  async previewDeposit({ amount }: { amount: bigint }) {
    return this.contract.read.previewDeposit([amount]);
  }

  async previewMint({ amount }: { amount: bigint }) {
    return this.contract.read.previewMint([amount]);
  }

  async withdraw({
    amount,
    receiver,
    owner,
  }: {
    amount: bigint;
    receiver: Address;
    owner: Address;
  }) {
    const txHash = await this.safeContractWrite.withdraw([amount, receiver, owner]);
    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });

        const filter = await this.contract.createEventFilter.Withdraw({});
        const events = filterLogs(receipt, filter);
        if (events.length === 0) throw new Error('Withdraw did not go through');
        return { ...events[0].args, ...receipt };
      },
    };
  }

  async redeem({ amount, receiver, owner }: { amount: bigint; receiver: Address; owner: Address }) {
    const txHash = await this.safeContractWrite.redeem([amount, receiver, owner]);
    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });

        const filter = await this.contract.createEventFilter.Withdraw({});
        const events = filterLogs(receipt, filter);
        if (events.length === 0) throw new Error('Withdraw did not go through');
        return { ...events[0].args, ...receipt };
      },
    };
  }

  async claim({
    receiver,
    tokenIdsForEachQueue,
  }: {
    receiver: Address;
    tokenIdsForEachQueue: Record<Address, bigint[]>;
  }) {
    const maxQueues = Number(await this.contract.read.getMaxTotalWithdrawalQueues());
    const queueContracts = (
      await Promise.all(
        new Array(maxQueues)
          .fill(0)
          .map(async (_, i) => await this.contract.read.getDeployedQueue([BigInt(i)])),
      )
    )
      .filter((queue) => queue.contractAddress in tokenIdsForEachQueue)
      .map(
        (queue) =>
          new WithdrawalQueue({
            walletClient: this.wallet,
            address: queue.contractAddress,
          }),
      );

    const results = [];

    for (const queueContract of queueContracts) {
      const nfts = (tokenIdsForEachQueue[queueContract.address] ?? [])
        .filter(async (tokenId) => {
          const owner = await queueContract.ownerOf(tokenId);
          return owner == this.wallet.account.address;
        })
        .filter(async (tokenId) => {
          const available = await queueContract.getAvailable(tokenId);
          return available > 0n;
        });

      if (nfts.length === 0) continue;

      try {
        const claim = await queueContract.withdrawMany({ to: receiver, tokenIds: nfts });
        results.push({ status: FULFILLED, value: claim });
      } catch (reason) {
        results.push({ status: REJECTED, reason });
      }
    }
    return results;
  }
}
