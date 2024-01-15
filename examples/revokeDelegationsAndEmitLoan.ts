import { Address } from 'viem';

import { testSingleNftOfferInput, testTokenId, users } from './common';

const revokeAndEmitLoan = async (contract?: Address) => {
  const signedOffer = await users[0]._makeSingleNftOffer(testSingleNftOfferInput, contract);
  const contractVersionString = `msl: ${signedOffer.contractAddress}`;
  console.log(`offer placed successfully: ${contractVersionString}`);

  const emitLoan = await users[1].emitLoan({
    offer: signedOffer,
    tokenId: testTokenId,
  });
  const { loan, loanId } = await emitLoan.waitTxInBlock();
  console.log(`loan emitted: ${contractVersionString}`);

  const delegateTo = users[2].wallet.account.address;
  try {
    const delegateTrue = await users[1].delegate({
      loan,
      loanId,
      to: delegateTo,
      enable: true,
    });
    await delegateTrue.waitTxInBlock();
    console.log(`nft from loanId ${loanId} successfully delegated: ${contractVersionString}`);
  } catch (e) {
    console.log('Error while delegating:');
    console.log(e);
  }

  const repayLoan = await users[1].repayLoan({ loan, loanId });
  await repayLoan.waitTxInBlock();
  console.log(`loan repaid without revoking: ${contractVersionString}`);

  const newSignedOffer = await users[2]._makeSingleNftOffer(testSingleNftOfferInput, contract);
  console.log(`new offer placed successfully: ${contractVersionString}`);

  const revokeDelegationsAndEmitLoan = await users[1].revokeDelegationsAndEmitLoan({
    delegations: [delegateTo],
    emit: {
      offer: newSignedOffer,
      tokenId: testTokenId,
    },
  });
  const { loan: newLoan, loanId: newLoanId } = await revokeDelegationsAndEmitLoan.waitTxInBlock();
  console.log(`revoked old delegations and emitted new loan: ${contractVersionString}`);

  const repayNewLoan = await users[1].repayLoan({ loan: newLoan, loanId: newLoanId });
  await repayNewLoan.waitTxInBlock();
  console.log(`new loan repaid after emit revoking previous delegations: ${contractVersionString}`);
};

async function main() {
  try {
    await revokeAndEmitLoan();
  } catch (e) {
    console.log('Error:');
    console.log(e);
  }
}

main();
