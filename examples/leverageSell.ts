import { getAddress } from 'viem';

import { setAllowances, users } from './common';

async function main() {
  await setAllowances();
  const loanToRepay = (
    await users[0].loans({
      borrowerAddress: users[0].wallet.account.address,
      limit: 1,
    })
  ).loans[0];

  console.log('Attempting to sell & repay', loanToRepay.nft.tokenId);

  const { waitTxInBlock } = await users[0].leverageSell({
    loan: {
      ...loanToRepay,
      borrower: getAddress(loanToRepay.borrowerAddress),
      nftCollateralAddress: getAddress(
        loanToRepay.nft.collection?.contractData?.contractAddress ?? '',
      ),
      nftCollateralTokenId: loanToRepay.nft.tokenId,
      source: loanToRepay.source.map((source) => ({
        ...source,
        lender: getAddress(source.lenderAddress),
      })),
      contractAddress: loanToRepay.address,
    },
    loanId: BigInt(loanToRepay.sources[0].loanId),
    price: 10000000000000000000n,
    orderSource: 'opensea.io',
  });

  await waitTxInBlock();

  console.log('Leverage Sell executed');
}

main();
