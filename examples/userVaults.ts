import { Address, isAddress } from 'viem';

import { approveNFT, setAllowances, test721Collection, testTokenId, users } from './common';

const ERC1155_COLLECTION: Address = '0xc36cf0cfcb5d905b8b513860db0cfe63f6cf9f5c';

const userVaults = async (contract: Address) => {
  const gondi = users[1];

  await approveNFT(gondi, contract, test721Collection.contractAddress, 'ERC721');
  await approveNFT(gondi, contract, ERC1155_COLLECTION, 'ERC1155');

  console.log('Creating vault with nfts...');
  const { vaultId, receipts } = await gondi._createUserVault({
    userVaultAddress: contract,
    nfts: [
      // Assuming user has same tokenId for collections
      {
        // ERC1155 will be ignored in v5
        collection: ERC1155_COLLECTION,
        tokenIds: [testTokenId],
        amounts: [1n],
        standard: 'ERC1155',
      },
      {
        collection: test721Collection.contractAddress,
        tokenIds: [testTokenId],
        amounts: [1n],
        standard: 'ERC721',
      },
    ],
  });
  console.log(`
    Successfully created vaultId ${vaultId}.
    Successfully deposited ${receipts.length} nfts to vaultId ${vaultId}.`);

  console.log('Burning and withdrawing nfts...');

  const burnTxn = await gondi.burnUserVaultAndWithdraw({
    userVaultAddress: contract,
    vaultId,
    collections: [test721Collection.contractAddress],
    tokenIds: [testTokenId],
    // Following args will be ignored for v5
    erc1155Collections: [ERC1155_COLLECTION],
    erc1155TokenIds: [testTokenId],
  });

  const burnResult = await burnTxn.waitTxInBlock();
  console.log(`successfully burned vaultId ${vaultId}.`);

  const withdrawEvents = burnResult.events;
  console.log(`successfully withdrawn ${withdrawEvents.length} nfts from vaultId ${vaultId}.`);
};

async function main() {
  try {
    await setAllowances();
    const contracts = [
      process.env.USER_VAULT_CONTRACT_V5 ?? '',
      process.env.USER_VAULT_CONTRACT_V6 ?? '',
    ];
    for (const contract of contracts) {
      if (isAddress(contract)) {
        await userVaults(contract);
      }
    }
  } catch (e) {
    console.log('Error:');
    console.log(e);
  }
}

main();
