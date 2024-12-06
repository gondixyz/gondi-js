import {
  setAllowances,
  test721Collection,
  testCurrency,
  testSingleNftOfferInput,
  testTokenId,
  users,
} from './common';

const cancelOrder = async () => {
  const signedOffer = await users[0].makeSingleNftOffer(testSingleNftOfferInput);
  const emitLoan = await users[1].emitLoan({
    offerExecution: users[1].offerExecutionFromOffers([signedOffer]),
    duration: signedOffer.duration,
    tokenId: testTokenId,
  });
  const { loan, loanId } = await emitLoan.waitTxInBlock();
  try {
    const order = await users[1].makeOrder({
      collectionContractAddress: test721Collection.contractAddress,
      tokenId: testTokenId,
      price: 1n,
      expirationTime: 1n,
      currencyAddress: testCurrency,
      isAsk: true,
    });
    console.log(`order placed successfully: ${JSON.stringify(order, null, 4)}`);
    const cancelOrder = await users[1].cancelOrder(order);
    await cancelOrder.waitTxInBlock();
    console.log('order cancelled successfully');
  } catch (err) {
    console.log(err);
  } finally {
    const repayLoan = await users[1].repayLoan({
      loanId,
      loan: {
        ...loan,
        contractStartTime: loan.startTime,
      },
    });
    await repayLoan.waitTxInBlock();
    console.log('Repaid');
  }
};

async function main() {
  try {
    await setAllowances();
    await cancelOrder();
  } catch (e) {
    console.log('Error:');
    console.log(e);
  }
}

main();
