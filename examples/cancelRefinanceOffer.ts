import { Address, isAddress } from 'viem';

import { setAllowances, testSingleNftOfferInput, testTokenId, users } from './common';

const emitCancelRefiOfferAndRepayLoan = async (contract?: Address) => {
  const signedOffer = await users[0]._makeSingleNftOffer(testSingleNftOfferInput, contract);
  const contractVersionString = `msl: ${signedOffer.contractAddress}`;
  console.log(`offer placed successfully: ${contractVersionString}`);

  const emitLoan = await users[1].emitLoan({
    offerExecution: [
      {
        offer: {
          ...signedOffer,
          maxSeniorRepayment: signedOffer.maxSeniorRepayment ?? 0n,
        },
        lenderOfferSignature: signedOffer.signature,
      },
    ],
    duration: signedOffer.duration,
    tokenId: testTokenId,
  });
  const { loan, loanId } = await emitLoan.waitTxInBlock();
  console.log(`loan emitted: ${contractVersionString}`);

  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    const isV6 =
      signedOffer.contractAddress === process.env.MULTI_SOURCE_LOAN_CONTRACT_V6 ||
      !('source' in loan);
    const refinanceOffer = await users[0].makeRefinanceOffer({
      contractAddress: signedOffer.contractAddress,
      renegotiation: {
        loanId: loan.id,
        feeAmount: 0n,
        aprBps: signedOffer.aprBps,
        duration: signedOffer.duration,
        expirationTime: signedOffer.expirationTime,
        principalAmount: signedOffer.principalAmount,
        strictImprovement: false,
        requiresLiquidation: signedOffer.requiresLiquidation,
        ...(isV6
          ? { trancheIndex: [0n], targetPrincipal: undefined }
          : { trancheIndex: undefined, targetPrincipal: loan.source.map((_) => 0n) }),
      },
    });

    const { waitTxInBlock } = await users[0].cancelRefinanceOffer({
      id: refinanceOffer.renegotiationId,
      contractAddress: signedOffer.contractAddress,
    });

    await waitTxInBlock();
    console.log(`renegotiation offer cancelled: ${contractVersionString}`);
  } catch (e) {
    console.log('Error while placing and cancelling renegotiation offer:');
    console.log(e);
  } finally {
    const repayLoan = await users[1].repayLoan({ loan, loanId });
    await repayLoan.waitTxInBlock();
    console.log(`loan repaid: ${contractVersionString}`);
  }
};

async function main() {
  try {
    await setAllowances();
    await emitCancelRefiOfferAndRepayLoan();

    const oldContracts = [
      process.env.MULTI_SOURCE_LOAN_CONTRACT_V5 ?? '',
      process.env.MULTI_SOURCE_LOAN_CONTRACT_V4 ?? '',
    ];
    for (const contract of oldContracts) {
      if (isAddress(contract)) {
        await emitCancelRefiOfferAndRepayLoan(contract);
      }
    }
  } catch (e) {
    console.log('Error:');
    console.log(e);
  }
}

main();
