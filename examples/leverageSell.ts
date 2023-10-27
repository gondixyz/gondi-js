import { getAddress } from "viem";

import { users } from "./common";

async function main() {
  const loanToRepay = (
    await users[0].loans({
      borrowerAddress: users[0].wallet.account.address,
      limit: 1,
    })
  ).loans[0];

  console.log("Attempting to sell & repay", loanToRepay.nft.tokenId)

  const { waitTxInBlock } = await users[0].leverageSell({
    loan: {
      ...loanToRepay,
      borrower: getAddress(loanToRepay.borrowerAddress),

      nftCollateralAddress: getAddress(
        loanToRepay.nft.collection?.contractData?.contractAddress ?? ""
      ),
      nftCollateralTokenId: loanToRepay.nft.tokenId,
      startTime: BigInt(Math.floor(loanToRepay.startTime.getTime() / 1000)),
      source: loanToRepay.sources.map((source) => ({
        ...source,
        startTime: BigInt(Math.floor(source.startTime.getTime() / 1000)),
        lender: getAddress(source.lenderAddress),
        loanId: BigInt(source.loanId),
      })),
      contractAddress: loanToRepay.address,
    },
    price: 10000000000000000000n,
    orderSource: "opensea.io",
  });

  await waitTxInBlock();

  console.log("Leverage Sell executed");
}

main();
