import { users } from "./common";

async function main() {
  const test = await users[0].leverageSell({
    loan: {
      nftCollateralAddress: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
      nftCollateralTokenId: 8831n,
    },
    price: 10000000000000000000n,
    orderSource: "opensea.io",
  });

  // console.log(test);
}

main();
