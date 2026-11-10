import { describe, expect, mock, test } from 'bun:test';

import { getSdkApollo } from '@/clients/api/sdk';

const VARIABLES = { nftId: 1 };

/** An SDK over a stub Apollo client whose `mutate` runs `mutate`, reporting to a mock callback. */
const setup = (mutate: () => Promise<unknown>, onStepChange = mock(async () => undefined)) => {
  const client = { mutate } as unknown as Parameters<typeof getSdkApollo>[0];
  const sdk = getSdkApollo(client, onStepChange);
  const listNft = () => sdk.listNft(VARIABLES as unknown as Parameters<typeof sdk.listNft>[0]);
  return { listNft, onStepChange };
};

describe('getSdkApollo mutation steps', () => {
  test('reports waiting then success for a mutation that answers', async () => {
    const { listNft, onStepChange } = setup(async () => ({ data: { listNft: { id: 1 } } }));

    await listNft();

    expect(onStepChange.mock.calls).toEqual([
      [{ type: 'api', status: 'waiting', mutationName: 'listNft', variables: VARIABLES }],
      [{ type: 'api', status: 'success', mutationName: 'listNft', variables: VARIABLES }],
    ]);
  });

  test.each([
    ['the request rejects', async () => Promise.reject(new Error('Network error'))],
    ['the response carries errors', async () => ({ data: null, errors: [{ message: 'Bad' }] })],
    ['the response has no data', async () => ({ data: null })],
  ])('reports an error with the cause when %s', async (_case, mutate) => {
    const { listNft, onStepChange } = setup(mutate);

    const error = await listNft().catch((rejection: Error) => rejection);

    expect(error).toBeInstanceOf(Error);
    expect(onStepChange.mock.calls.at(-1)).toEqual([
      { type: 'api', status: 'error', mutationName: 'listNft', variables: VARIABLES, error },
    ]);
  });

  test('awaits the step callback before sending and before resolving', async () => {
    const order: string[] = [];
    const onStepChange = mock(async (step: { status: string }) => {
      await Promise.resolve();
      order.push(`step ${step.status}`);
    });
    const { listNft } = setup(async () => {
      order.push('mutate');
      return { data: { listNft: { id: 1 } } };
    }, onStepChange as never);

    await listNft();
    order.push('resolved');

    expect(order).toEqual(['step waiting', 'mutate', 'step success', 'resolved']);
  });

  test('rejects with the callback error and reports no error step when the success callback throws', async () => {
    const callbackError = new Error('callback bug');
    const onStepChange = mock(async (step: { status: string }) => {
      if (step.status === 'success') throw callbackError;
    });
    const { listNft } = setup(
      async () => ({ data: { listNft: { id: 1 } } }),
      onStepChange as never,
    );

    await expect(listNft()).rejects.toBe(callbackError);
    expect(onStepChange.mock.calls.map(([step]) => step.status)).toEqual(['waiting', 'success']);
  });

  test('rejects with the mutation error when the error callback throws', async () => {
    const mutationError = new Error('Network error');
    const onStepChange = mock(async (step: { status: string }) => {
      if (step.status === 'error') throw new Error('callback bug');
    });
    const { listNft } = setup(async () => Promise.reject(mutationError), onStepChange as never);

    await expect(listNft()).rejects.toBe(mutationError);
  });
});
