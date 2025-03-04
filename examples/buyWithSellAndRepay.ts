import {
  setAllowances,
  sleep,
  test721Collection,
  testCurrency,
  testSingleNftOfferInput,
  testTokenId,
  users,
} from './common';

const sellAndRepay = async () => {
  const owner = users[0];
  const lender = users[1];
  const signedOffer = await lender.makeSingleNftOffer(testSingleNftOfferInput);
  const emitLoan = await owner.emitLoan({
    offerExecution: owner.offerExecutionFromOffers([signedOffer]),
    duration: signedOffer.duration,
    tokenId: testTokenId,
  });
  const { loan, loanId } = await emitLoan.waitTxInBlock();
  await sleep(2000);
  try {
    const price = 100n;
    const signedOrder = await owner.makeSellAndRepayOrder({
      collectionContractAddress: test721Collection.contractAddress,
      tokenId: testTokenId,
      price,
      expirationTime: loan.startTime + 60n * 10n,
      currencyAddress: testCurrency,
      isAsk: true,
      // taker: lender.wallet.account.address,
    });
    await lender.buyWithSellAndRepay({
      repaymentCalldata: signedOrder.repaymentCalldata,
      mslContractAddress: loan.contractAddress,
      price,
    });
    console.log('Executed Sell & Repay with Listing');
  } catch (err) {
    console.log(err);
    const repayLoan = await owner.repayLoan({
      loanId,
      loan: {
        ...loan,
        contractStartTime: loan.startTime,
      },
    });
    await repayLoan.waitTxInBlock();
    console.log('Repaid');
  } finally {
  }
};

async function main() {
  try {
    await setAllowances();
    await sellAndRepay();
  } catch (e) {
    console.log('Error:');
    console.log(e);
  }
}

main();
