import { Address, isAddress } from 'viem';

import { approveNFT, setAllowances, testCollection, testTokenId, users } from './common';

const ANOTHER_COLLECTION = process.env.TEST_COLLECTION_2 as Address;

const userVaults = async (contract: Address) => {
  const gondi = users[1];

  await approveNFT(gondi, contract, testCollection.contractAddress);
  await approveNFT(gondi, contract, ANOTHER_COLLECTION);

  console.log('Creating vault with nfts...');
  const { vaultId, receipts } = await gondi.createUserVault({
    userVaultAddress: contract,
    nfts: [
      // Assuming user has same tokenId for collections
      { collection: ANOTHER_COLLECTION, tokenIds: [testTokenId] },
      { collection: testCollection.contractAddress, tokenIds: [testTokenId] },
    ],
  });
  console.log(`
    Successfully created vaultId ${vaultId}.
    Successfully deposited ${receipts.length} nfts to vaultId ${vaultId}.`);

  for (let i = 0; i < receipts.length; i++) {
    const element = receipts[i];
    const owner = await gondi.getOwner({
      nftAddress: element.collection,
      tokenId: element.tokenId,
    });
    console.log(`-- ${i + 1}: ${element.collection} ${element.tokenId} - owner: ${owner}`);
  }

  console.log('Burning and withdrawing nfts...');

  const burnTxn = await gondi.burnUserVaultAndWithdraw({
    userVaultAddress: contract,
    vaultId,
    collections: [ANOTHER_COLLECTION, testCollection.contractAddress],
    tokenIds: [testTokenId, testTokenId],
  });

  const burnResult = await burnTxn.waitTxInBlock();
  console.log(`successfully burned vaultId ${vaultId}.`);

  const withdrawEvents = burnResult.events;
  console.log(`successfully withdrawn ${withdrawEvents.length} nfts from vaultId ${vaultId}.`);

  for (let j = 0; j < withdrawEvents.length; j++) {
    const event = withdrawEvents[j];
    const owner = await gondi.getOwner({ nftAddress: event.collection, tokenId: event.tokenId });
    console.log(`-- ${j + 1}: ${event.collection} ${event.tokenId} - owner: ${owner}`);
  }
};

async function main() {
  try {
    await setAllowances();
    if (!isAddress(ANOTHER_COLLECTION)) {
      throw new Error(`
        TEST_COLLECTION_2 was not correctly provided.
        Please, provide address to run user vaults example.
      `);
    }
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
