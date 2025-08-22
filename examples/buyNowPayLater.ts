import {
  setAllowances,
  sleep,
  test721Collection,
  testSingleNftOfferInput,
  testTokenId,
  users,
} from './common';

const buyNowPayLater = async () => {
  const lender = users[0];
  const buyer = users[1];

  const signedOffer = await lender._makeSingleNftOffer(
    testSingleNftOfferInput,
    process.env.MULTI_SOURCE_LOAN_CONTRACT_V7 ?? '',
  );

  const bnplLoan = await buyer.buyNowPayLater({
    amounts: [signedOffer.principalAmount],
    contractAddress: test721Collection.contractAddress,
    loanDuration: signedOffer.duration,
    offers: [signedOffer],
    tokenId: testTokenId,
  });

  await bnplLoan.waitTxInBlock();
  console.log('Buy Now Pay Later executed');
  await sleep(2000);

  const {
    loans: { 0: loan },
  } = await buyer.loans({
    borrowers: [buyer.wallet.account.address],
  });

  const repayLoan = await buyer.repayLoan({
    loanId: loan.loanId,
    loan: {
      ...loan,
      contractStartTime: loan.startTime,
    },
  });
  await repayLoan.waitTxInBlock();
  console.log('Repaid');
};

async function main() {
  try {
    // await setAllowances();
    await buyNowPayLater();
  } catch (e) {
    console.log('Error:');
    console.log(e);
  }
}

main();
