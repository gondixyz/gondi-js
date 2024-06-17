import { Address } from 'viem';

import { POOL_USDC, POOL_WETH, setAllowances, users } from './common';

const withdraw = async (pool: Address) => {
  const { waitTxInBlock: waitDeposit } = await users[0].poolMintOrDeposit({
    address: pool,
    shareAmount: 100n,
  });
  await waitDeposit();
  const { waitTxInBlock: waitRedeem } = await users[0].poolWithdrawOrRedeem({
    address: pool,
    shareAmount: 50n,
  });
  await waitRedeem();
  const { waitTxInBlock: waitWithdraw } = await users[0].poolWithdrawOrRedeem({
    address: pool,
    assetAmount: 50n,
  });
  await waitWithdraw();
};

async function main() {
  try {
    await setAllowances();
    await withdraw(POOL_WETH);
    await withdraw(POOL_USDC);
  } catch (e) {
    console.error(e);
  }
}

main();
