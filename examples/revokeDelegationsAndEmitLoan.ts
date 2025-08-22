import { Address, isAddress } from 'viem';

import {
  setAllowances,
  testNftCollateralAddress,
  testSingleNftOfferInput,
  testTokenId,
  users,
} from './common';

const revokeAndEmitLoan = async (contract?: Address) => {
  const signedOffer = await users[0]._makeSingleNftOffer(testSingleNftOfferInput, contract);
  const contractVersionString = `msl: ${signedOffer.contractAddress}`;
  console.log(`offer placed successfully: ${contractVersionString}`);

  const emitLoan = await users[1].emitLoan({
    offerExecution: users[1].offerExecutionFromOffers([signedOffer]),
    duration: signedOffer.duration,
    tokenId: testTokenId,
    nftCollateralAddress: testNftCollateralAddress,
  });
  const { loan, loanId } = await emitLoan.waitTxInBlock();
  console.log(`loan emitted: ${contractVersionString}`);

  const delegateTo = users[2].wallet.account.address;
  try {
    const delegateTrue = await users[1].delegate({
      loan: {
        ...loan,
        contractStartTime: loan.startTime,
      },
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

  const repayLoan = await users[1].repayLoan({
    loanId,
    loan: {
      ...loan,
      contractStartTime: loan.startTime,
    },
  });
  await repayLoan.waitTxInBlock();
  console.log(`loan repaid without revoking: ${contractVersionString}`);

  const newSignedOffer = await users[2]._makeSingleNftOffer(testSingleNftOfferInput, contract);
  console.log(`new offer placed successfully: ${contractVersionString}`);

  // TODO: This step fails to be processed by the backend
  const revokeDelegationsAndEmitLoan = await users[1].revokeDelegationsAndEmitLoan({
    delegations: [delegateTo],
    emit: {
      offerExecution: users[1].offerExecutionFromOffers([newSignedOffer]),
      nftCollateralAddress: testNftCollateralAddress,
      duration: newSignedOffer.duration,
      tokenId: testTokenId,
    },
  });
  const { loan: newLoan, loanId: newLoanId } = await revokeDelegationsAndEmitLoan.waitTxInBlock();
  console.log(`revoked old delegations and emitted new loan: ${contractVersionString}`);

  const repayNewLoan = await users[1].repayLoan({
    loanId: newLoanId,
    loan: {
      ...newLoan,
      contractStartTime: newLoan.startTime,
    },
  });
  await repayNewLoan.waitTxInBlock();
  console.log(`new loan repaid after emit revoking previous delegations: ${contractVersionString}`);
};

async function main() {
  try {
    await setAllowances();

    const contracts = [
      process.env.MULTI_SOURCE_LOAN_CONTRACT_V6 ?? '',
      process.env.MULTI_SOURCE_LOAN_CONTRACT_V5 ?? '',
    ];
    for (const contract of contracts) {
      if (isAddress(contract)) {
        await revokeAndEmitLoan(contract);
      }
    }
  } catch (e) {
    console.log('Error:');
    console.log(e);
  }
}

main();
