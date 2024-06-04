import { Address } from 'viem';

import { filterLogs } from '@/blockchain';
import { Wallet } from '@/contracts';
import { UserVaultV6 } from '@/contracts/UserVaultV6';
import { getContracts } from '@/deploys';
import { userVaultABI as userVaultABIV5 } from '@/generated/blockchain/v5';

import { BaseContract } from './BaseContract';

export class UserVaultV5 extends BaseContract<typeof userVaultABIV5> {
  constructor({ walletClient }: { walletClient: Wallet }) {
    const { UserVault } = getContracts(walletClient.chain);

    super({
      walletClient,
      address: UserVault.v5,
      abi: userVaultABIV5,
    });
  }

  async burnAndWithdraw({
    vaultId,
    collections,
    tokenIds,
    tokens = [],
  }: Parameters<UserVaultV6['burnAndWithdraw']>[0]): ReturnType<UserVaultV6['burnAndWithdraw']> {
    if (collections.length != tokenIds.length) {
      throw new Error('collections and tokenIds must have the same length');
    }
    const txHash = await this.safeContractWrite.burnAndWithdraw([
      vaultId,
      collections,
      tokenIds,
      tokens,
    ]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });

        const filter = await this.contract.createEventFilter.ERC721Withdrawn();
        const events = filterLogs(receipt, filter);
        if (events.length !== tokenIds.length) throw new Error('Withdrawn count mismatch');
        return {
          events: events.map((event) => event.args),
          oldEvents: [],
          ...receipt,
        };
      },
    };
  }
  async createVault(nfts: Parameters<UserVaultV6['createVault']>[0]) {
    const { id: vaultId } = await this.#mintVault();
    const receipts = [];

    // Regroup all elements in the same collection in case users send tokenIds as separate elements of the array
    const groupedNfts = nfts.reduce(
      (acc, { collection, tokenIds }) => {
        if (acc[collection]) {
          acc[collection].tokenIds = [...acc[collection].tokenIds, ...tokenIds];
        } else {
          acc[collection] = { collection, tokenIds };
        }
        return acc;
      },
      {} as Record<Address, (typeof nfts)[number]>,
    );

    for (const { collection, tokenIds } of Object.values(groupedNfts)) {
      const deposit = await this.depositERC721s({ vaultId, collection, tokenIds });
      const receipt = await deposit.waitTxInBlock();
      receipts.push(receipt);
    }

    return { vaultId, receipts };
  }

  async depositERC721s({
    vaultId,
    collection,
    tokenIds,
  }: Parameters<UserVaultV6['depositERC721s']>[0]) {
    const txHash = await this.safeContractWrite.depositERC721s([vaultId, collection, tokenIds]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });

        const filter = await this.contract.createEventFilter.ERC721Deposited();
        const events = filterLogs(receipt, filter);
        if (events.length === 0) throw new Error('Deposit not created');
        return { ...events[0].args, ...receipt };
      },
    };
  }

  async depositOldERC721s() {
    throw new Error('Not implemented');
  }

  async #mintVault() {
    const txHash = await this.safeContractWrite.mint(undefined);
    const receipt = await this.bcClient.waitForTransactionReceipt({
      hash: txHash,
    });

    const filter = await this.contract.createEventFilter.Transfer({});
    const events = filterLogs(receipt, filter);
    if (events.length === 0) throw new Error('Vault not created');
    return { ...events[0].args, ...receipt };
  }
}
