import { Execute } from '@reservoir0x/reservoir-sdk';

import { GondiPublicClient, Wallet } from '@/clients/contracts';

type TransactionStep = Execute['steps'][number];
type MinimalStep = Pick<TransactionStep, 'kind' | 'id' | 'items'>;

const isTransaction = (step: MinimalStep) => step.kind === 'transaction';

const isSale = (step: MinimalStep) =>
  step.id === 'sale' && isTransaction(step) && step.items?.length === 1;

export const isCurrencyApproval = (step: MinimalStep) =>
  step.id === 'currency-approval' && isTransaction(step) && step.items?.length === 1;

export const validateSteps = (steps: MinimalStep[]) => {
  for (const step of steps) {
    if (!isCurrencyApproval(step) && !isSale(step)) {
      throw new Error(`Unknown step: ${step.id} - ${step.kind}: ${step}`);
    }
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
