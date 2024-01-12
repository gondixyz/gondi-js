import { Address } from 'viem';

import { filterLogs, Wallet } from '@/blockchain';
import { getContracts } from '@/deploys';
import { userVaultABI as userVaultABIV5 } from '@/generated/blockchain/v5';

import { Contract } from './Contract';

export class UserVaultV5 extends Contract<typeof userVaultABIV5> {
  constructor({ walletClient }: { walletClient: Wallet }) {
    const { UserVaultV5Address } = getContracts(walletClient.chain);

    super({
      walletClient,
      address: UserVaultV5Address,
      abi: userVaultABIV5,
    });
  }

  async burnAndWithdraw({
    vaultId,
    collections,
    tokenIds,
    tokens = [],
  }: {
    vaultId: bigint;
    collections: Address[];
    tokenIds: bigint[];
    tokens?: Address[]; // erc20 tokens
  }) {
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
        return { events, ...receipt };
      },
    };
  }

  async createVault(nfts: { collection: Address; tokenIds: bigint[] }[]) {
    const { id: vaultId } = await this.#mintVault();

    const deposits = await Promise.all(
      nfts.map(async ({ collection, tokenIds }) =>
        this.depositERC721s({ vaultId, collection, tokenIds }),
      ),
    );

    return {
      vaultId,
      txHash: deposits.map(({ txHash }) => txHash),
      waitTxInBlock: async () =>
        await Promise.all(deposits.map(({ waitTxInBlock }) => waitTxInBlock())),
    };
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

        const filter = await this.contract.createEventFilter.ERC721Deposited();
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
