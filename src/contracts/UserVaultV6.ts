import { Address } from 'viem';

import { Wallet } from '@/contracts';
import { getContracts } from '@/deploys';
import { userVaultAbi as userVaultABIV6 } from '@/generated/blockchain/v6';

import { BaseContract } from './BaseContract';

export class UserVaultV6 extends BaseContract<typeof userVaultABIV6> {
  constructor({ walletClient }: { walletClient: Wallet }) {
    const { UserVault } = getContracts(walletClient.chain);

    super({
      walletClient,
      address: UserVault.v6,
      abi: userVaultABIV6,
    });
  }

  async burnAndWithdraw({
    vaultId,
    collections,
    tokenIds,
    oldCollections = [],
    oldTokenIds = [],
    tokens = [],
  }: {
    vaultId: bigint;
    collections: Address[];
    tokenIds: bigint[];
    oldCollections?: Address[];
    oldTokenIds?: bigint[];
    tokens?: Address[]; // erc20 tokens
  }) {
    if (collections.length != tokenIds.length) {
      throw new Error('collections and tokenIds must have the same length');
    }
    if (oldCollections.length != oldTokenIds.length) {
      throw new Error('oldCollections and oldTokenIds must have the same length');
    }
    const txHash = await this.safeContractWrite.burnAndWithdraw([
      vaultId,
      collections,
      tokenIds,
      oldCollections,
      oldTokenIds,
      tokens,
    ]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const events = this.parseEventLogs('ERC721Withdrawn', receipt.logs);
        const oldEvents = this.parseEventLogs('OldERC721Withdrawn', receipt.logs);
        if (events.length !== tokenIds.length || oldEvents.length !== oldTokenIds.length)
          throw new Error('Withdrawn count mismatch');
        return {
          events: events.map((event) => event.args),
          oldEvents: events.map((event) => event.args),
          ...receipt,
        };
      },
    };
  }

  async createVault(nfts: { collection: Address; tokenIds: bigint[]; isOldErc721?: boolean }[]) {
    const { id: vaultId } = await this.#mintVault();
    const receipts = [];

    // Regroup all elements in the same collection in case users send tokenIds as separate elements of the array
    const groupedNfts: Record<Address, (typeof nfts)[number]> = {};
    for (const { collection, tokenIds, isOldErc721 } of nfts) {
      if (groupedNfts[collection]) {
        groupedNfts[collection].tokenIds.push(...tokenIds);
      } else {
        groupedNfts[collection] = { collection, tokenIds: [...tokenIds], isOldErc721 };
      }
    }

    for (const { collection, tokenIds, isOldErc721 } of Object.values(groupedNfts)) {
      const deposit = isOldErc721
        ? await this.depositOldERC721s({ vaultId, collection, tokenIds })
        : await this.depositERC721s({ vaultId, collection, tokenIds });
      const receipt = await deposit.waitTxInBlock();
      receipts.push(receipt);
    }

    return { vaultId, receipts };
  }

  async depositERC721s({
    vaultId,
    collection,
    tokenIds,
  }: {
    vaultId: bigint;
    collection: Address;
    tokenIds: bigint[];
  }) {
    const txHash = await this.safeContractWrite.depositERC721s([vaultId, collection, tokenIds]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const events = this.parseEventLogs('ERC721Deposited', receipt.logs);
        if (events.length === 0) throw new Error('Deposit not created');
        return { ...events[0].args, ...receipt };
      },
    };
  }

  async depositOldERC721s({
    vaultId,
    collection,
    tokenIds,
  }: {
    vaultId: bigint;
    collection: Address;
    tokenIds: bigint[];
  }) {
    const txHash = await this.safeContractWrite.depositOldERC721s([vaultId, collection, tokenIds]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const events = this.parseEventLogs('OldERC721Deposited', receipt.logs);
        if (events.length === 0) throw new Error('Deposit not created');
        return { ...events[0].args, ...receipt };
      },
    };
  }

  async #mintVault() {
    const txHash = await this.safeContractWrite.mint(undefined);
    const receipt = await this.bcClient.waitForTransactionReceipt({
      hash: txHash,
    });

    const events = this.parseEventLogs('Transfer', receipt.logs);
    if (events.length === 0) throw new Error('Vault not created');
    return { ...events[0].args, ...receipt };
  }
}
