import * as dotenv from "dotenv";
import { Gondi } from "gondi";
import { Address, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";

dotenv.config();

const RPC = `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`;

const mainnetChain = {
  id: 1,
  name: "Ethereum",
  network: "ethereum",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [RPC],
    },
    public: {
      http: [RPC],
    },
  },
};

export const transport = http(mainnetChain.rpcUrls.default.http[0]);

// TODO: use the wallet with the local chain to test
if (!process.env.TEST_WALLETS) {
  throw new Error(
    "TEST_WALLETS not provided, please provide comma separated list"
  );
}
const mainnetWallet = createWalletClient({
  account: privateKeyToAccount(
    process.env.TEST_WALLETS.split(",")[0] as Address
  ),
  transport,
  chain: mainnetChain,
});

const mainnetUser = new Gondi({
  wallet: mainnetWallet,
  reservoirApiKey: process.env.RESERVOIR_API_KEY,
});

async function main() {
  const test = await mainnetUser.leverageBuy({
    leverageBuyData: [
      {
        offer: {},
        expirationTime: 5n,
        amount: 1n,
        nft: {
          collectionContractAddress:
            "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
          tokenId: 1193n,
          price: 38000000000000000000n,
        },
      },
    ],
  });

  console.log(test);
}

main();
