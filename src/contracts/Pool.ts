import { Address } from 'viem';

import { filterLogs } from '@/blockchain';
import { Wallet } from '@/contracts';
import { WithdrawalQueue } from '@/contracts/WithdrawalQueue';
import { poolAbi } from '@/generated/blockchain/v6';
import { daysToSeconds } from '@/utils/dates';
import { FULFILLED, REJECTED } from '@/utils/promises';
import { areSameAddress } from '@/utils/string';

import { BaseContract } from './BaseContract';

export class Pool extends BaseContract<typeof poolAbi> {
  constructor({ walletClient, address }: { walletClient: Wallet; address: Address }) {
    super({
      walletClient,
      address,
      abi: poolAbi,
    });
  }

  static LOAN_BUFFER_TIME = BigInt(daysToSeconds(7));

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
    queueTokenIds,
  }: {
    receiver: Address;
    queueTokenIds: Record<Address, bigint[]>;
  }) {
    const queueContracts = (await this.getDeployedQueues()).filter(
      (queue) => queue.address in queueTokenIds,
    );
    const results = [];

    for (const queueContract of queueContracts) {
      const tokenIds: bigint[] = [];

      for (const tokenId of queueTokenIds[queueContract.address] ?? []) {
        const owner = await queueContract.ownerOf(tokenId);
        const available = await queueContract.getAvailable(tokenId);
        if (areSameAddress(owner, this.wallet.account.address) && available > 0n) {
          tokenIds.push(tokenId);
        }
      }

      if (tokenIds.length === 0) continue;

      try {
        const claim = await queueContract.withdrawMany({ to: receiver, tokenIds });
        results.push({ status: FULFILLED, value: claim });
      } catch (reason) {
        results.push({ status: REJECTED, reason });
      }
    }
    return results;
  }

  async getDeployedQueues() {
    const maxQueues = Number(await this.contract.read.getMaxTotalWithdrawalQueues());
    return (
      await Promise.all(
        new Array(maxQueues)
          .fill(0)
          .map(async (_, i) => await this.contract.read.getDeployedQueue([BigInt(i)])),
      )
    ).map(
      (queue) =>
        new WithdrawalQueue({
          walletClient: this.wallet,
          address: queue.contractAddress,
        }),
    );
  }

  async getMinTimeBetweenWithdrawalQueues() {
    return this.contract.read.getMinTimeBetweenWithdrawalQueues();
  }

  async getMaxOfferDuration() {
    const maxQueues = await this.contract.read.getMaxTotalWithdrawalQueues();
    const getMinTimeBetweenWithdrawalQueues = await this.getMinTimeBetweenWithdrawalQueues();
    const maxOfferDurationSeconds =
      maxQueues * getMinTimeBetweenWithdrawalQueues - Pool.LOAN_BUFFER_TIME;
    return maxOfferDurationSeconds;
  }
}
