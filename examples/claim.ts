import { Address } from 'viem';

import { POOL_USDC, POOL_WETH, setAllowances, users } from './common';

// For this example to work, sufficient time must have passed since the last queue was deployed
const claim = async (pool: Address) => {
  const { waitTxInBlock: waitDeposit } = await users[0].poolMintOrDeposit({
    address: pool,
    shareAmount: 100n,
  });
  await waitDeposit();
  const { waitTxInBlock: waitRedeem } = await users[0].poolWithdrawOrRedeem({
    address: pool,
    shareAmount: 100n,
  });
  await waitRedeem();

  const { waitTxInBlock: waitQueueDeploy } = await users[0]._poolDeployWithdrawalQueue({
    address: pool,
  });

  await waitQueueDeploy();

  const { positions } = await users[0].withdrawalPositions({
    poolAddresses: [pool],
    owner: users[0].wallet.account.address,
  });

  const mostRecentPosition = positions[0];

  if (!mostRecentPosition) {
    throw new Error('No positions found');
  }

  const results = await users[0].poolClaim({
    address: pool,
    queueTokenIds: {
      [mostRecentPosition.withdrawalQueue.collection.contractData?.contractAddress ?? '']: [
        mostRecentPosition.nft.tokenId,
      ],
    },
  });

  for (const result of results) {
    if (result.status === 'fulfilled') {
      const { waitTxInBlock: waitClaim } = result.value;
      await waitClaim();
    }
  }
};

async function main() {
  try {
    await setAllowances();
    await claim(POOL_WETH);
    await claim(POOL_USDC);
  } catch (e) {
    console.error(e);
  }
}

main();
