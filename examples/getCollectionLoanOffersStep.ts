import { testCollectionId, users } from './common';

const getCollectionLoanOffersStep = async () => {
  const steps = await users[0].collectionStepsById({ collectionId: testCollectionId });
  console.log(steps);
};

async function main() {
  try {
    await getCollectionLoanOffersStep();
  } catch (e) {
    console.log('Error:');
    console.log(e);
  }
}

main();
