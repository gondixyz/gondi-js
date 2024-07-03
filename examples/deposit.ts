import { Address } from 'viem';

import { POOL_USDC, POOL_WETH, setAllowances, users } from './common';

const deposit = async (pool: Address) => {
  const { waitTxInBlock: waitDeposit } = await users[0].poolMintOrDeposit({
    address: pool,
    assetAmount: 100n,
  });
  await waitDeposit();
  const { waitTxInBlock: waitMint } = await users[0].poolMintOrDeposit({
    address: pool,
    shareAmount: 100n,
  });
  await waitMint();
};

async function main() {
  try {
    await setAllowances();
    await deposit(POOL_WETH);
    await deposit(POOL_USDC);
  } catch (e) {
    console.error(e);
  }
}

main();
