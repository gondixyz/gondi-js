import { Address } from 'viem';

import { filterLogs } from '@/blockchain';
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

        const filter = await this.contract.createEventFilter.ERC721Withdrawn({});
        const events = filterLogs(receipt, filter);
        const oldFilter = await this.contract.createEventFilter.OldERC721Withdrawn({});
        const oldEvents = filterLogs(receipt, oldFilter);
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
    const groupedNfts = nfts.reduce(
      (acc, { collection, tokenIds, isOldErc721 }) => {
        if (acc[collection]) {
          acc[collection].tokenIds = [...acc[collection].tokenIds, ...tokenIds];
        } else {
          acc[collection] = { collection, tokenIds, isOldErc721 };
        }
        return acc;
      },
      {} as Record<Address, (typeof nfts)[number]>,
    );

    for (const { collection, tokenIds, isOldErc721 } of Object.values(groupedNfts)) {
      const depositMethod = isOldErc721 ? this.depositOldERC721s : this.depositERC721s;
      const deposit = await depositMethod({ vaultId, collection, tokenIds });
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

        const filter = await this.contract.createEventFilter.ERC721Deposited({});
        const events = filterLogs(receipt, filter);
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

        const filter = await this.contract.createEventFilter.OldERC721Deposited({});
        const events = filterLogs(receipt, filter);
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

    const filter = await this.contract.createEventFilter.Transfer({});
    const events = filterLogs(receipt, filter);
    if (events.length === 0) throw new Error('Vault not created');
    return { ...events[0].args, ...receipt };
  }
}
