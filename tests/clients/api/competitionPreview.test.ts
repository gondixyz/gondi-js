import { describe, expect, it, mock } from 'bun:test';

mock.module('@/clients/api/client', () => ({ apolloClient: () => ({}) }));
const { Api } = await import('@/clients/api');

const PUBLICATION = { replacementIds: ['previous'] };

const INCOMPLETE_PREVIEW = {
  complete: false,
  qualifies: true,
  reason: 'COMPETITION_UNAVAILABLE',
  replacementIds: [],
  references: [],
};
const NON_QUALIFYING_PREVIEW = {
  complete: true,
  qualifies: false,
  reason: null,
  replacementIds: [],
  references: [],
};
const QUALIFYING_PREVIEW = {
  complete: true,
  qualifies: true,
  reason: null,
  replacementIds: ['previous'],
  references: [],
};

/**
 * Builds an `Api` without running its constructor, whose generated SDK answers
 * both competition preview queries with `preview`.
 */
const apiPreviewing = (preview: object) =>
  Object.assign(Object.create(Api.prototype), {
    api: {
      previewItemLoanOfferCompetition: async () => ({ preview }),
      previewRenegotiationCompetition: async () => ({ preview }),
    },
  }) as InstanceType<typeof Api>;

const PREVIEW_METHODS = [
  {
    name: 'previewSingleNftPublication',
    preview: (api: InstanceType<typeof Api>) =>
      api.previewSingleNftPublication({} as never, PUBLICATION),
  },
  {
    name: 'previewRenegotiationPublication',
    preview: (api: InstanceType<typeof Api>) =>
      api.previewRenegotiationPublication({} as never, PUBLICATION),
  },
];

describe.each(PREVIEW_METHODS)('Api.$name', ({ preview }) => {
  it('rejects an incomplete preview with its reason', async () => {
    expect(preview(apiPreviewing(INCOMPLETE_PREVIEW))).rejects.toThrow('COMPETITION_UNAVAILABLE');
  });

  it('rejects a non-qualifying preview without a reason as an insufficient improvement', async () => {
    expect(preview(apiPreviewing(NON_QUALIFYING_PREVIEW))).rejects.toThrow(
      'INSUFFICIENT_IMPROVEMENT',
    );
  });

  it('returns a qualifying preview', async () => {
    expect(await preview(apiPreviewing(QUALIFYING_PREVIEW))).toEqual(QUALIFYING_PREVIEW);
  });
});
