import { Gondi } from 'gondi';
import { Address, isAddress } from 'viem';

import {
  approveNFT,
  generateBlock,
  setAllowances,
  sleep,
  testSingleNftOfferInput,
  testTokenId,
  users,
} from './common';

const SLEEP_BUFFER = 3000;
const ANOTHER_COLLECTION = process.env.TEST_COLLECTION_2 as Address;

type RepayLoanType = Parameters<Gondi['repayLoan']>[0]['loan'];

const emitLoansRefinanceBatchAndRepay = async (contract?: Address) => {
  const [lender, borrower] = users;
  if (!isAddress(ANOTHER_COLLECTION)) {
    throw new Error(`
      TEST_COLLECTION_2 was not correctly provided.
      Please, provide addresses to run user vaults example.
    `);
  }
  const offer = {
    ...testSingleNftOfferInput,
    duration: 300n,
  };
  const signedOffer = await lender._makeSingleNftOffer(offer, contract);
  const contractVersionString = `msl: ${signedOffer.contractAddress}`;
  await approveNFT(users[1], signedOffer.contractAddress, ANOTHER_COLLECTION);
  console.log(`approving second nft: ${contractVersionString}`);

  const secondNftId = await lender.nftId({
    contractAddress: ANOTHER_COLLECTION,
    tokenId: testTokenId,
  });
  const signedOfferTwo = await lender._makeSingleNftOffer(
    { ...offer, nftId: secondNftId },
    contract,
  );
  console.log(`both offers placed successfully: ${contractVersionString}`);

  const emitLoan = await borrower.emitLoan({
    offerExecution: borrower.offerExecutionFromOffers([signedOffer]),
    duration: signedOffer.duration,
    tokenId: testTokenId,
  });
  const { loan, loanId } = await emitLoan.waitTxInBlock();

  let repayLoans: RepayLoanType[] = [loan];
  let repayLoanIds = [loanId];
  let loanReferenceIds = [loan.id];

  try {
    const emitLoanTwo = await borrower.emitLoan({
      offerExecution: borrower.offerExecutionFromOffers([signedOfferTwo]),
      duration: signedOfferTwo.duration,
      tokenId: testTokenId,
    });
    const { loan: loanTwo, loanId: loanIdTwo } = await emitLoanTwo.waitTxInBlock();
    console.log(`both loans emitted: ${contractVersionString}`);

    repayLoans = [loan, loanTwo];
    repayLoanIds = [loanId, loanIdTwo];
    loanReferenceIds = [loan.id, loanTwo.id];

    const remainingLockup = await borrower.getRemainingLockupSeconds({ loan: loanTwo });
    console.log(`remaining lockup: ${remainingLockup}`);
    await sleep(remainingLockup * 1_000 + SLEEP_BUFFER);
    await generateBlock(); // We need to push a new block into the blockchain [anvil issue]

    const refinancingSources = repayLoans.map((loan) =>
      'source' in loan ? loan.source[0] : loan.tranche[0],
    );
    const batchRefinance = await lender.refinanceBatch({
      aprBpsImprovementPercentage: 0.05,
      refinancings: repayLoans.map((loan, i) => ({
        loan: { ...loan, loanReferenceId: loanReferenceIds[i] },
        source: { ...refinancingSources[i], loanIndex: 0, floor: 0n },
        refinancingPrincipal: refinancingSources[i].principalAmount,
      })),
    });
    const contractBatchCalls = await Promise.all(
      batchRefinance.map(async (result) =>
        result.status === 'fulfilled'
          ? { status: 'fulfilled' as const, value: await result.value.waitTxInBlock() }
          : result,
      ),
    );
    repayLoans = [];
    repayLoanIds = [];
    contractBatchCalls.forEach((contractBatchCall) => {
      if (contractBatchCall.status !== 'fulfilled') return;
      repayLoans = [
        ...repayLoans,
        ...contractBatchCall.value.results.map(({ loan }) => ({
          ...loan,
          contractAddress: signedOffer.contractAddress,
        })),
      ];
      repayLoanIds = [
        ...repayLoanIds,
        ...contractBatchCall.value.results.map(({ newLoanId }) => newLoanId),
      ];
    });
    console.log(`loans batch refinanced: ${contractVersionString}`);
    console.log(JSON.stringify(repayLoans, null, 2));
    console.log(JSON.stringify(repayLoanIds, null, 2));
  } catch (e) {
    console.log('Error while executin refinance batch for loans:');
    console.log(e);
  } finally {
    for (let i = 0; i < repayLoans.length; i++) {
      const repaidLoan = await borrower.repayLoan({
        loan: repayLoans[i],
        loanId: repayLoanIds[i],
      });
      await repaidLoan.waitTxInBlock();
    }
    console.log(`loans repaid: ${contractVersionString}`);
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
        await emitLoansRefinanceBatchAndRepay(contract);
      }
    }
  } catch (e) {
    console.log('Error:');
    console.log(e);
  }
}

main();
