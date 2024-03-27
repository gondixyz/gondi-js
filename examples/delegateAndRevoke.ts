import { Address, isAddress } from 'viem';

import { setAllowances, testSingleNftOfferInput, testTokenId, users } from './common';

const delegateAndRevoke = async (contract?: Address) => {
  const signedOffer = await users[0]._makeSingleNftOffer(testSingleNftOfferInput, contract);
  const contractVersionString = `msl: ${signedOffer.contractAddress}`;
  console.log(`offer placed successfully: ${contractVersionString}`);

  const emitLoan = await users[1].emitLoan({
    offerExecution: users[1].offerExecutionFromOffers([signedOffer]),
    duration: signedOffer.duration,
    tokenId: testTokenId,
  });
  const { loan, loanId } = await emitLoan.waitTxInBlock();
  console.log(`loan emitted: ${contractVersionString}`);

  try {
    const delegateTrue = await users[1].delegate({
      loan,
      loanId,
      to: users[0].wallet.account.address,
      enable: true,
    });
    await delegateTrue.waitTxInBlock();
    console.log(`nft from loanId ${loanId} successfully delegated: ${contractVersionString}`);

    const delegateFalse = await users[1].delegate({
      loan,
      loanId,
      to: users[0].wallet.account.address,
      enable: false,
    });
    await delegateFalse.waitTxInBlock();
    console.log(
      `nft from loanId ${loanId} successfully revoked delegation: ${contractVersionString}`,
    );
  } catch (e) {
    console.log('Error while delegating and revoking during loan:');
    console.log(e);
  }

  const repayLoan = await users[1].repayLoan({ loan, loanId });
  await repayLoan.waitTxInBlock();
  console.log(`loan repaid: ${contractVersionString}`);

  const revokeDelegate = await users[1].revokeDelegate({
    collection: signedOffer.nftCollateralAddress,
    tokenId: signedOffer.nftCollateralTokenId,
    to: users[0].wallet.account.address,
    contract,
  });
  await revokeDelegate.waitTxInBlock();
  console.log(`owner succesfully revoked delegate: ${contractVersionString}`);
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
        await delegateAndRevoke(contract);
      }
    }
  } catch (e) {
    console.log('Error:');
    console.log(e);
  }
}

main();
