import { Address, isAddress } from 'viem';

import { setAllowances, testSingleNftOfferInput, testTokenId, users } from './common';

const emitCancelRefiOfferAndRepayLoan = async (contract?: Address) => {
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

  await new Promise((resolve) => setTimeout(resolve, 3000));

  try {
    const renegotiationChanges =
      'source' in loan ? { targetPrincipal: loan.source.map((_) => 0n) } : { trancheIndex: [0n] };
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
        ...renegotiationChanges,
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
    const repayLoan = await users[1].repayLoan({
      loanId,
      loan: {
        ...loan,
        contractStartTime: loan.startTime,
      },
    });
    await repayLoan.waitTxInBlock();
    console.log(`loan repaid: ${contractVersionString}`);
  }
};

async function main() {
  try {
    await setAllowances();

    const contracts = [
      process.env.MULTI_SOURCE_LOAN_CONTRACT_V6 ?? '',
      process.env.MULTI_SOURCE_LOAN_CONTRACT_V5 ?? '',
      process.env.MULTI_SOURCE_LOAN_CONTRACT_V4 ?? '',
    ];
    for (const contract of contracts) {
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
