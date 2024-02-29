import { Address, isAddress } from 'viem';

import { testSingleNftOfferInput, testTokenId, users } from './common';

const delegateAndRevokeAll = async (contract?: Address) => {
  const signedOffer = await users[0]._makeSingleNftOffer(testSingleNftOfferInput, contract);
  const contractVersionString = `msl: ${signedOffer.contractAddress}`;
  console.log(`offer placed successfully: ${contractVersionString}`);

  const emitLoan = await users[1].emitLoan({
    offerExecution: [
      {
        offer: {
          ...signedOffer,
          maxTrancheFloor: signedOffer.maxTrancheFloor ?? 0n,
        },
        lenderOfferSignature: signedOffer.signature,
      },
    ],
    duration: signedOffer.duration,
    tokenId: testTokenId,
  });
  const { loan, loanId } = await emitLoan.waitTxInBlock();
  console.log(`loan emitted: ${contractVersionString}`);

  try {
    const delegationsTo = [users[0].wallet.account.address, users[2].wallet.account.address];
    const delegations = delegationsTo.map((to) => ({ loan, loanId, to, enable: true }));
    const delegationsResult = await users[1].delegateMulticall(delegations);
    await delegationsResult.waitTxInBlock();
    console.log(
      `nft from loanId ${loanId} successfully delegated to multiple addresses: ${contractVersionString}`,
    );

    const revokings = delegationsTo.map((to) => ({ loan, loanId, to, enable: false }));
    const revokingsResult = await users[1].delegateMulticall(revokings);
    await revokingsResult.waitTxInBlock();
    console.log(
      `nft from loanId ${loanId} successfully revoked multiple delegation: ${contractVersionString}`,
    );
  } catch (e) {
    console.log('Error while delegating and revoking during loan:');
    console.log(e);
  }

  const repayLoan = await users[1].repayLoan({ loan, loanId });
  await repayLoan.waitTxInBlock();
  console.log(`loan repaid: ${contractVersionString}`);
};

async function main() {
  try {
    await delegateAndRevokeAll();

    const oldContracts = [process.env.MULTI_SOURCE_LOAN_CONTRACT_V5 ?? ''];
    for (const contract of oldContracts) {
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
