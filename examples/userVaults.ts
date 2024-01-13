import { Address, isAddress } from 'viem';

import { approveNFT, testCollection, testTokenId, users } from './common';

const USER_VAULT_CONTRACT_V5 = process.env.USER_VAULT_CONTRACT_V5 ?? '';
const ANOTHER_COLLECTION = process.env.TEST_COLLECTION_2 as Address;

const userVaults = async () => {
  const gondi = users[1];

  if (!isAddress(ANOTHER_COLLECTION) || !isAddress(USER_VAULT_CONTRACT_V5)) {
    throw new Error(`
      TEST_COLLECTION_2 OR USER_VAULT_CONTRACT_5 were not correctly provided.
      Please, provide addresses to run user vaults example.
    `);
  }
  await approveNFT(gondi, USER_VAULT_CONTRACT_V5, testCollection.contractAddress);
  await approveNFT(gondi, USER_VAULT_CONTRACT_V5, ANOTHER_COLLECTION);

  console.log('Creating vault with nfts...');
  const { vaultId, receipts } = await gondi.createUserVault({
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
    await userVaults();
  } catch (e) {
    console.log('Error:');
    console.log(e);
  }
}

main();
