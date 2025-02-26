import { Execute, getClient, paths } from '@reservoir0x/reservoir-sdk';

import { GondiPublicClient, Wallet } from '@/contracts';

type TransactionStep = Execute['steps'][number];
type MinimalStep = Pick<TransactionStep, 'kind' | 'id' | 'items'>;

const isTransaction = (step: MinimalStep) => step.kind === 'transaction';

const isSale = (step: MinimalStep) =>
  step.id === 'sale' && isTransaction(step) && step.items?.length === 1;

export const isCurrencyApproval = (step: MinimalStep) =>
  step.id === 'currency-approval' && isTransaction(step) && step.items?.length === 1;

const isCancel = (step: MinimalStep) =>
  step.id === 'cancellation' && isTransaction(step) && step.items?.length === 1;

export const validateBuySteps = (steps: MinimalStep[]) => {
  for (const step of steps) {
    if (!isCurrencyApproval(step) && !isSale(step)) {
      throw new Error(`Unknown step: ${step.id} - ${step.kind}: ${step}`);
    }
  }
};

export const validateCancelSteps = (steps: MinimalStep[] | null | undefined) => {
  if (steps?.length !== 1 || !isCancel(steps[0])) {
    throw new Error(`Invalid cancellation steps: ${steps}`);
  }
};

export const sendTransaction = async (
  wallet: Wallet,
  bcClient: GondiPublicClient,
  step: TransactionStep,
) => {
  const txHash = await wallet.sendTransaction(step.items?.[0].data);
  const receipt = await bcClient.waitForTransactionReceipt({
    hash: txHash,
  });
  if (receipt.status !== 'success') {
    throw new Error(`Transaction failed: ${txHash}`);
  }
  return receipt;
};

export const reservoirApi = async <P extends keyof paths, M extends keyof paths[P]>(
  path: P,
  method: keyof paths[P],
  // @ts-ignore fix if necessary
  parameters: paths[P][M]['parameters']['body']['body'],
) => {
  const client = getClient();
  const response = await fetch(`${client.chains[0].baseApiUrl}${path}`, {
    method: method === 'post' ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': client.apiKey ?? '',
    },
    body: JSON.stringify(parameters),
  });
  // @ts-ignore fix if necessary
  return (await response.json()) as paths[P][M]['responses']['200']['schema'];
};
