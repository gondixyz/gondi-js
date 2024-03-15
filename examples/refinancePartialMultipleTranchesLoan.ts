import { Address } from 'viem';

import {
  generateBlock,
  setAllowances,
  sleep,
  testSingleNftOfferInput,
  testTokenId,
  users,
} from './common';

const SLEEP_BUFFER = 3000;

const emitRefinacePartialAndRepayLoan = async (contract?: Address) => {
  const offer = {
    ...testSingleNftOfferInput,
    duration: 30n,
    maxSeniorRepayment: testSingleNftOfferInput.principalAmount,
  };
  const signedOffer = await users[0]._makeSingleNftOffer(offer, contract);
  const secondSignedOffer = await users[0]._makeSingleNftOffer(offer, contract);
  const thirdSignedOffer = await users[0]._makeSingleNftOffer(offer, contract);
  const contractVersionString = `msl: ${signedOffer.contractAddress}`;
  console.log(`offers placed successfully: ${contractVersionString}`);

  const nftId = Number(signedOffer.nftCollateralTokenId.valueOf());
  const amount = signedOffer.principalAmount / 4n;
  const emitLoan = await users[1].emitLoan({
    offerExecution: [
      {
        offer: {
          ...signedOffer,
          maxSeniorRepayment: signedOffer.maxSeniorRepayment ?? 0n,
          nftId,
        },
        lenderOfferSignature: signedOffer.signature,
        amount,
      },
      {
        offer: {
          ...secondSignedOffer,
          maxSeniorRepayment: secondSignedOffer.maxSeniorRepayment ?? 0n,
          nftId,
        },
        lenderOfferSignature: secondSignedOffer.signature,
        amount,
      },
      {
        offer: {
          ...thirdSignedOffer,
          maxSeniorRepayment: thirdSignedOffer.maxSeniorRepayment ?? 0n,
          nftId,
        },
        lenderOfferSignature: thirdSignedOffer.signature,
        amount,
      },
    ],
    duration: signedOffer.duration,
    tokenId: testTokenId,
  });
  const { loan, loanId } = await emitLoan.waitTxInBlock();
  console.log(`loan emitted: ${contractVersionString}`);

  const remainingLockup = await users[0].getRemainingLockupSeconds({ loan });
  console.log(`remaining lockup: ${remainingLockup}`);
  await sleep(remainingLockup * 1_000 + SLEEP_BUFFER);

  const isV6 =
    signedOffer.contractAddress === process.env.MULTI_SOURCE_LOAN_CONTRACT_V6 ||
    !('source' in loan);
  const renegotiationOffer = await users[0].makeRefinanceOffer({
    renegotiation: {
      loanId: loan.id,
      feeAmount: 0n,
      aprBps: signedOffer.aprBps - signedOffer.aprBps / 2n,
      duration: 0n,
      expirationTime: signedOffer.expirationTime,
      principalAmount: amount * 2n,
      strictImprovement: true,
      requiresLiquidation: signedOffer.requiresLiquidation,
      ...(isV6
        ? { trancheIndex: [2n], targetPrincipal: undefined }
        : {
            trancheIndex: undefined,
            targetPrincipal: loan.source.map((s) => s.principalAmount / 2n),
          }),
    },
    contractAddress: signedOffer.contractAddress,
    skipSignature: true,
  });
  console.log(`refinance offer placed successfully: ${contractVersionString}`);

  let repayLoan = loan;
  let repayLoanId = loanId;
  try {
    await generateBlock(); // We need to push a new block into the blockchain [anvil issue]
    const refinancePartialLoan = await users[0].refinancePartialLoan({
      offer: renegotiationOffer,
      loan,
      loanId,
    });
    const { loan: refinancedLoanResult, loanId: newLoanId } =
      await refinancePartialLoan.waitTxInBlock();
    repayLoan = refinancedLoanResult;
    repayLoanId = newLoanId;
    console.log(`loan partially refinanced: ${contractVersionString}`);
  } catch (e) {
    console.log('Error while refinancing loan:');
    console.log(e);
  } finally {
    const repaidLoan = await users[1].repayLoan({
      loan: repayLoan,
      loanId: repayLoanId,
    });
    await repaidLoan.waitTxInBlock();
    console.log(`loan repaid: ${contractVersionString}`);
  }
};

async function main() {
  try {
    await setAllowances();
    await emitRefinacePartialAndRepayLoan();
  } catch (e) {
    console.log('Error:');
    console.log(e);
  }
}

main();
