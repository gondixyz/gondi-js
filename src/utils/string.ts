import { Address } from 'abitype';

import { isDefined } from '@/utils/types';

export const NATIVE_MARKETPLACE = 'MarketPlace.Native';
export const CONTRACT_DOMAIN_NAME = 'GONDI_MULTI_SOURCE_LOAN';

export const areSameAddress = (
  adr1: string | Address | null | undefined,
  adr2: string | Address | null | undefined,
) => isDefined(adr1) && adr1.toLowerCase() === adr2?.toLowerCase();
