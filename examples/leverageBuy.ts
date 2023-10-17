import { users } from "./common";

async function main() {
  const test = await users[0].leverageBuy({
    leverageBuyData: [
      {
        offer: {},
        expirationTime: 5n,
        amount: 1n,
        nft: {
          collectionContractAddress:
            "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
          tokenId: 4829n,
          price: 78000000000000000000n,
          orderSource: 'opensea.io',
        },
      },
    ],
  });

  // console.log(test);
}

main();
