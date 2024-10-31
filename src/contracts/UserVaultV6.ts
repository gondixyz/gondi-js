import { Address } from 'viem';

import { Wallet } from '@/contracts';
import { getContracts } from '@/deploys';
import { userVaultAbi as userVaultABIV6 } from '@/generated/blockchain/v6';
import {
  BurnAndWithdrawArgs,
  CreateVaultArgs,
  DepositERC721sArgs,
  DepositERC1155sArgs,
} from '@/gondi';

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
    tokens = [],
    erc1155Collections = [],
    erc1155TokenIds = [],
  }: BurnAndWithdrawArgs) {
    if (collections.length != tokenIds.length) {
      throw new Error('collections and tokenIds must have the same length');
    }
    if (erc1155Collections.length != erc1155TokenIds.length) {
      throw new Error('erc1155Collections and erc1155TokenIds must have the same length');
    }
    const txHash = await this.safeContractWrite.burnAndWithdraw([
      vaultId,
      collections,
      tokenIds,
      tokens,
      erc1155Collections,
      erc1155TokenIds,
    ]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const events = this.parseEventLogs('ERC721Withdrawn', receipt.logs);
        const tokenEvents = this.parseEventLogs('ERC20Withdrawn', receipt.logs);
        const erc1155Events = this.parseEventLogs('ERC1155Withdrawn', receipt.logs);
        if (
          events.length !== tokenIds.length ||
          tokenEvents.length !== tokens.length ||
          erc1155Events.length !== erc1155TokenIds.length
        )
          throw new Error('Withdrawn count mismatch');
        return {
          events: events.map((event) => event.args),
          oldEvents: events.map((event) => event.args),
          ...receipt,
        };
      },
    };
  }

  async createVault(nfts: CreateVaultArgs) {
    const { id: vaultId } = await this.#mintVault();
    const receipts = [];

    // Regroup all elements in the same collection in case users send tokenIds as separate elements of the array
    const groupedNfts: Record<Address, (typeof nfts)[number]> = {};
    for (const nft of nfts) {
      const { collection, tokenIds } = nft;
      if (groupedNfts[collection]) {
        groupedNfts[collection].tokenIds.push(...tokenIds);
      } else {
        groupedNfts[collection] = { ...nft, tokenIds: [...tokenIds] };
      }
    }

    for (const nft of Object.values(groupedNfts)) {
      const deposit =
        nft.standard === 'ERC721'
          ? await this.depositERC721s({ vaultId, ...nft })
          : await this.depositERC1155s({ vaultId, ...nft });
      const receipt = await deposit.waitTxInBlock();
      receipts.push(receipt);
    }

    return { vaultId, receipts };
  }

  async depositERC721s({ vaultId, collection, tokenIds }: DepositERC721sArgs) {
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

  async depositERC1155s({ vaultId, collection, tokenIds, amounts }: DepositERC1155sArgs) {
    const txHash = await this.safeContractWrite.depositERC1155s([
      vaultId,
      collection,
      tokenIds,
      amounts,
    ]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await this.bcClient.waitForTransactionReceipt({
          hash: txHash,
        });
        const events = this.parseEventLogs('ERC1155Deposited', receipt.logs);
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
