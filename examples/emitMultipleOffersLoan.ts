import { Address } from 'viem';

import { sleep, testCollectionOfferInput, testTokenId, users } from './common';

const emitAndRepayLoan = async (contract?: Address) => {
  const signedOffer = await users[0]._makeCollectionOffer(testCollectionOfferInput, contract);
  const anotherOfferInput = {
    ...testCollectionOfferInput,
    maxTrancheFloor: testCollectionOfferInput.principalAmount,
  };
  const anotherSignedOffer = await users[0]._makeCollectionOffer(anotherOfferInput, contract);
  const contractVersionString = `msl: ${signedOffer.contractAddress}`;
  console.log(`offers placed successfully: ${contractVersionString}`);

  const nftId = Number(signedOffer.nftCollateralTokenId.valueOf());
  const emitLoan = await users[1].emitLoan({
    offerExecution: [
      {
        offer: {
          ...signedOffer,
          maxTrancheFloor: signedOffer.maxTrancheFloor ?? 0n,
          nftId,
        },
        amount: signedOffer.principalAmount / 2n,
        lenderOfferSignature: signedOffer.signature,
      },
      {
        offer: {
          ...anotherSignedOffer,
          maxTrancheFloor: anotherSignedOffer.maxTrancheFloor ?? 0n,
          nftId,
        },
        amount: anotherSignedOffer.principalAmount / 2n,
        lenderOfferSignature: anotherSignedOffer.signature,
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
    await emitAndRepayLoan();
  } catch (e) {
    console.log('Error:');
    console.log(e);
  }
}

main();
