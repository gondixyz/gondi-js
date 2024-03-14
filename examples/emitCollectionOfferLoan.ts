import { Address, isAddress } from 'viem';

import { setAllowances, sleep, testCollectionOfferInput, testTokenId, users } from './common';

const emitAndRepayLoan = async (contract?: Address) => {
  const signedOffer = await users[0]._makeCollectionOffer(testCollectionOfferInput, contract);
  const contractVersionString = `msl: ${signedOffer.contractAddress}`;
  console.log(`offer placed successfully: ${contractVersionString}`);

  const emitLoan = await users[1].emitLoan({
    offerExecution: [
      {
        offer: {
          ...signedOffer,
          nftId: Number(signedOffer.nftCollateralTokenId.valueOf()),
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

  await sleep(3000);

  const repayLoan = await users[1].repayLoan({ loan, loanId });
  await repayLoan.waitTxInBlock();
  console.log(`loan repaid: ${contractVersionString}`);
};

async function main() {
  try {
    await setAllowances();
    await emitAndRepayLoan();

    const oldContracts = [
      process.env.MULTI_SOURCE_LOAN_CONTRACT_V5 ?? '',
      process.env.MULTI_SOURCE_LOAN_CONTRACT_V4 ?? '',
    ];
    for (const contract of oldContracts) {
      if (isAddress(contract)) {
        await emitAndRepayLoan(contract);
      }
    }
  } catch (e) {
    console.log('Error:');
    console.log(e);
  }
}

main();
