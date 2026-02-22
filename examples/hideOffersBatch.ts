import * as dotenv from 'dotenv';
import { Gondi, OfferStatus } from 'gondi';
import { createWalletClient, http, zeroAddress } from 'viem';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';
import { mainnet } from 'viem/chains';

dotenv.config();

const RPC_URL = process.env.RPC_URL;
if (!RPC_URL) throw new Error('RPC_URL is required');

const TEST_COLLECTION = process.env.TEST_COLLECTION ?? '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D'; // BAYC
const TEST_TOKEN_ID = BigInt(process.env.TEST_TOKEN_ID ?? 1);
const TEST_PRINCIPAL_CURRENCY =
  process.env.TEST_PRINCIPAL_CURRENCY ?? '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'; // WETH

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  const privateKey = generatePrivateKey();
  const account = privateKeyToAccount(privateKey);
  const wallet = createWalletClient({
    account,
    chain: mainnet,
    transport: http(RPC_URL),
  });

  const gondi = new Gondi({ wallet });
  console.log('wallet address:', account.address);

  const collectionIds = await gondi.collectionId({
    contractAddress: TEST_COLLECTION as `0x${string}`,
  });
  const collectionId = collectionIds[0];
  console.log('collectionId:', collectionId);

  const nftId = await gondi.nftId({
    contractAddress: TEST_COLLECTION as `0x${string}`,
    tokenId: TEST_TOKEN_ID,
  });
  console.log('nftId:', nftId);

  const steps = await gondi.collectionStepsById({ collectionId });
  console.log('collection steps:', steps);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const expirationTime = BigInt(Math.ceil(tomorrow.getTime() / 1_000));

  const wethStep = steps.wethStep;
  const aprStep = steps.aprBpsStep;
  const feeStep = steps.origFeeBpsStep;

  const baseOffer = {
    principalAddress: TEST_PRINCIPAL_CURRENCY as `0x${string}`,
    principalAmount: wethStep,
    capacity: wethStep,
    fee: feeStep,
    aprBps: aprStep,
    expirationTime,
    duration: 86_400n, // 1 day
    borrowerAddress: zeroAddress,
    maxSeniorRepayment: 0n,
  };

  console.log('placing 3 offers...');
  const offerA = await gondi.makeSingleNftOffer({ ...baseOffer, nftId });
  console.log('offer A placed:', offerA.offerId);

  const offerB = await gondi.makeSingleNftOffer({
    ...baseOffer,
    nftId,
    principalAmount: wethStep * 2n,
    capacity: wethStep * 2n,
  });
  console.log('offer B placed:', offerB.offerId);

  const offerC = await gondi.makeCollectionOffer({ ...baseOffer, collectionId });
  console.log('offer C placed:', offerC.offerId);

  const offers = [offerA, offerB, offerC];

  console.log('hiding all 3 offers in a single batch call...');
  const result = await gondi.hideOffers({
    ids: offers.map((o) => o.offerId),
    contractAddress: offers[0].contractAddress,
  });
  console.log('hideOffers result:', result);

  console.log('waiting for API propagation...');
  await sleep(10_000);

  const { offers: listedOffers } = await gondi.offers({
    filterBy: {
      status: [OfferStatus.Active],
      lenders: [account.address],
    },
  });

  const hiddenIds = new Set(offers.map((o) => o.offerId.toString()));
  const leaked = listedOffers.filter((o) => hiddenIds.has(o.id));
  if (leaked.length > 0) {
    console.error('FAIL: hidden offers still appear as active:', leaked);
    process.exit(1);
  }

  console.log('SUCCESS: all hidden offers verified as not active');
}

main();
