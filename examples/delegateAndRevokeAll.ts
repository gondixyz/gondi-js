import { Address, isAddress } from 'viem';

import {
  setAllowances,
  testNftCollateralAddress,
  testSingleNftOfferInput,
  testTokenId,
  users,
} from './common';

const delegateAndRevokeAll = async (contract?: Address) => {
  const signedOffer = await users[0]._makeSingleNftOffer(testSingleNftOfferInput, contract);
  const contractVersionString = `msl: ${signedOffer.contractAddress}`;
  console.log(`offer placed successfully: ${contractVersionString}`);

  const emitLoan = await users[1].emitLoan({
    offerExecution: users[1].offerExecutionFromOffers([signedOffer]),
    duration: signedOffer.duration,
    nftCollateralAddress: testNftCollateralAddress,
    tokenId: testTokenId,
  });
  const { loan, loanId } = await emitLoan.waitTxInBlock();
  console.log(`loan emitted: ${contractVersionString}`);

  try {
    const delegationsTo = [users[0].wallet.account.address, users[2].wallet.account.address];
    const delegations = delegationsTo.map((to) => ({
      loanId,
      to,
      enable: true,
      loan: {
        ...loan,
        contractStartTime: loan.startTime,
      },
    }));
    const delegationsResult = await users[1].delegateMulticall(delegations);
    await delegationsResult.waitTxInBlock();
    console.log(
      `nft from loanId ${loanId} successfully delegated to multiple addresses: ${contractVersionString}`,
    );

    const revokings = delegationsTo.map((to) => ({
      loanId,
      to,
      enable: false,
      loan: {
        ...loan,
        contractStartTime: loan.startTime,
      },
    }));
    const revokingsResult = await users[1].delegateMulticall(revokings);
    await revokingsResult.waitTxInBlock();
    console.log(
      `nft from loanId ${loanId} successfully revoked multiple delegation: ${contractVersionString}`,
    );
  } catch (e) {
    console.log('Error while delegating and revoking during loan:');
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
  console.log(`loan repaid: ${contractVersionString}`);
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
        await delegateAndRevokeAll(contract);
      }
    }
  } catch (e) {
    console.log('Error:');
    console.log(e);
  }
}

main();
