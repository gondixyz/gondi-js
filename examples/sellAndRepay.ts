import {
  setAllowances,
  test721Collection,
  testCurrency,
  testSingleNftOfferInput,
  testTokenId,
  users,
} from './common';

const sellAndRepay = async () => {
  const signedOffer = await users[0].makeSingleNftOffer(testSingleNftOfferInput);
  const emitLoan = await users[1].emitLoan({
    offerExecution: users[1].offerExecutionFromOffers([signedOffer]),
    duration: signedOffer.duration,
    tokenId: testTokenId,
  });
  const { loan, loanId } = await emitLoan.waitTxInBlock();
  try {
    const signedOrder = await users[1].makeOrder({
      collectionContractAddress: test721Collection.contractAddress,
      tokenId: testTokenId,
      price: 1n,
      expirationTime: 1n,
      currencyAddress: testCurrency,
      isAsk: true,
    });
    await users[0].sellAndRepay({
      repaymentCalldata: signedOrder.repaymentCalldata,
    });
  } catch (err) {
    console.log(err);
    const repayLoan = await users[1].repayLoan({
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
