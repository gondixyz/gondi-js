import { Address, PublicClient } from 'viem';

import { Wallet } from '@/clients/contracts';
import { CreateVaultError } from '@/errors';
import { userVaultAbi as userVaultABIV6 } from '@/generated/blockchain/v6';
import {
  BurnAndWithdrawArgs,
  CreateVaultCurrencies,
  CreateVaultNfts,
  DepositERC20Args,
  DepositERC721sArgs,
  DepositERC1155sArgs,
} from '@/gondi';
import { waitForSucceededReceipt } from '@/utils/blockchain';

import { BaseContract } from './BaseContract';

export class UserVaultV6 extends BaseContract<typeof userVaultABIV6> {
  constructor({
    walletClient,
    address,
    publicClient,
  }: {
    walletClient: Wallet;
    address: Address;
    publicClient?: PublicClient;
  }) {
    super({
      walletClient,
      address,
      abi: userVaultABIV6,
      publicClient,
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
        const receipt = await waitForSucceededReceipt(this.bcClient, txHash);
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

  /**
   * Mints a vault, then deposits `nfts` (one transaction per collection, whatever the case of its
   * address) and `currencies` into it, one transaction after the other. A deposit that fails
   * after the mint throws a {@link CreateVaultError} carrying the new `vaultId` and the deposits
   * already mined, so the caller can resume into that vault.
   */
  async createVault(nfts: CreateVaultNfts, currencies: CreateVaultCurrencies) {
    const { id: vaultId } = await this.#mintVault();
    const receipts = [];

    const groupedNfts = new Map<string, (typeof nfts)[number]>();
    for (const nft of nfts) {
      const key = nft.collection.toLowerCase();
      const group = groupedNfts.get(key);
      if (group) {
        group.tokenIds.push(...nft.tokenIds);
        group.amounts.push(...nft.amounts);
      } else {
        groupedNfts.set(key, { ...nft, tokenIds: [...nft.tokenIds], amounts: [...nft.amounts] });
      }
    }

    try {
      for (const nft of groupedNfts.values()) {
        const deposit =
          nft.standard === 'ERC721'
            ? await this.depositERC721s({ vaultId, ...nft })
            : await this.depositERC1155s({ vaultId, ...nft });
        receipts.push(await deposit.waitTxInBlock());
      }

      for (const { address, amount } of currencies) {
        const deposit = await this.depositERC20({ vaultId, tokenAddress: address, amount });
        receipts.push(await deposit.waitTxInBlock());
      }
    } catch (cause) {
      throw new CreateVaultError({ vaultId, receipts, cause });
    }

    return { vaultId, receipts };
  }

  async depositERC721s({ vaultId, collection, tokenIds }: DepositERC721sArgs) {
    const txHash = await this.safeContractWrite.depositERC721s([vaultId, collection, tokenIds]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await waitForSucceededReceipt(this.bcClient, txHash);
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
        const receipt = await waitForSucceededReceipt(this.bcClient, txHash);
        const events = this.parseEventLogs('ERC1155Deposited', receipt.logs);
        if (events.length === 0) throw new Error('Deposit not created');
        return { ...events[0].args, ...receipt };
      },
    };
  }

  async depositERC20({ vaultId, tokenAddress, amount }: DepositERC20Args) {
    const txHash = await this.safeContractWrite.depositERC20([vaultId, tokenAddress, amount]);

    return {
      txHash,
      waitTxInBlock: async () => {
        const receipt = await waitForSucceededReceipt(this.bcClient, txHash);
        const events = this.parseEventLogs('ERC20Deposited', receipt.logs);
        if (events.length === 0) throw new Error('Deposit not created');
        return { ...events[0].args, ...receipt };
      },
    };
  }

  async #mintVault() {
    const txHash = await this.safeContractWrite.mint(undefined);
    const receipt = await waitForSucceededReceipt(this.bcClient, txHash);

    const events = this.parseEventLogs('Transfer', receipt.logs);
    if (events.length === 0) throw new Error('Vault not created');
    return { ...events[0].args, ...receipt };
  }
}
