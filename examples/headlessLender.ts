import { Gondi, OfferStatus } from 'gondi';
import { parseEther } from 'viem';

import { testCurrency, testNftCollateralAddress, wallets } from './common';

const SECONDS_PER_DAY = 86_400n;

/**
 * Runnable twin of the README's "Headless lender" quickstart: approve the loan
 * contract for the principal currency, publish a 30-day collection offer, find
 * it among the lender's active offers, then hide it and cancel it onchain.
 * Like the other examples, `TEST_PRINCIPAL_CURRENCY` is an 18-decimal token
 * such as WETH.
 */
async function main() {
  const lender = new Gondi({ wallet: wallets[0] });
  const principalAmount = parseEther('1');

  const isApproved = await lender.isApprovedToken({
    tokenAddress: testCurrency,
    amount: principalAmount,
  });
  if (!isApproved) {
    const approval = await lender.approveToken({ tokenAddress: testCurrency });
    await approval.waitTxInBlock();
  }

  const [collectionId] = await lender.collectionId({ contractAddress: testNftCollateralAddress });

  const offer = await lender.makeCollectionOffer({
    collectionId,
    principalAddress: testCurrency,
    principalAmount,
    capacity: principalAmount,
    fee: 0n,
    aprBps: 1_000n,
    duration: 30n * SECONDS_PER_DAY,
    expirationTime: BigInt(Math.floor(Date.now() / 1_000)) + SECONDS_PER_DAY,
    maxSeniorRepayment: 0n,
  });
  console.log(`offer ${offer.offerId} published on ${offer.contractAddress}`);

  const { offers } = await lender.offers({
    filterBy: { lenders: [lender.account.address], status: [OfferStatus.Active] },
  });
  console.log(`active offers: ${offers.length}`);

  await lender.hideOffer({ id: offer.offerId, contractAddress: offer.contractAddress });
  console.log('offer hidden');

  const cancellation = await lender.cancelOffer({
    id: offer.offerId,
    contractAddress: offer.contractAddress,
  });
  await cancellation.waitTxInBlock();
  console.log('offer cancelled onchain');
}

main();
