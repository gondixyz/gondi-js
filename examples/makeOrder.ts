import { setAllowances, test721Collection, testCurrency, testTokenId, users } from './common';

const makeOrder = async () => {
  const signedOrder = await users[0].makeOrder({
    collectionContractAddress: test721Collection.contractAddress,
    tokenId: testTokenId,
    price: 1n,
    expirationTime: 1n,
    currencyAddress: testCurrency,
    isAsk: true,
  });
  console.log(`order placed successfully: ${signedOrder}`);
};

async function main() {
  try {
    await setAllowances();
    await makeOrder();
  } catch (e) {
    console.log('Error:');
    console.log(e);
  }
}

main();
