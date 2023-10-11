import { Gondi } from "gondi";
import { Address, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";

const RPC = "https://mainnet.infura.io/v3/your-api-key";

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

const mainnetWallet = createWalletClient({
  account: privateKeyToAccount(
    process.env.TEST_WALLETS.split(",")[0] as Address
  ),
  transport,
  chain: mainnetChain,
});

const mainnetUser = new Gondi({ wallet: mainnetWallet });

async function main() {
  await mainnetUser.leverageBuy({
    leverageBuyData: [
      {
        offer: {},
        expirationTime: 5n,
        amount: 1n,
        nft: {
          collectionContractAddress:
            "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
          tokenId: 7560n,
          price: 27000000000000000000n,
        },
      },
    ],
  });
}

main();
