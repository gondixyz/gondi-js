import { describe, expect, test } from 'bun:test';
import fc from 'fast-check';
import {
  Abi,
  AbiParameter,
  Address,
  bytesToHex,
  createWalletClient,
  custom,
  decodeFunctionData,
  getAddress,
  Hex,
  recoverTypedDataAddress,
} from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet } from 'viem/chains';

import { MslV6, MslV6Version } from '@/clients/contracts/MslV6';
import { multiSourceLoanAbi as multiSourceLoanAbiV6 } from '@/generated/blockchain/v6';
import { multiSourceLoanAbi as multiSourceLoanAbiV7 } from '@/generated/blockchain/v7';
import { multiSourceLoanAbi as multiSourceLoanAbiV8 } from '@/generated/blockchain/v8';
import { EmitLoanArgs } from '@/gondi';
import { CONTRACT_DOMAIN_NAME } from '@/utils/string';

/**
 * Property-based round-trips for the MultiSourceLoan calldata and signatures the SDK builds.
 *
 * The contract recomputes every EIP-712 digest from its own struct definitions, so a field the
 * SDK names, orders or types differently yields a signature that recovers to the wrong address
 * rather than a readable revert. Each property therefore verifies the SDK's signature against
 * EIP-712 types derived from the contract ABI's structs, not against the SDK's own type lists,
 * and decodes the SDK's calldata with the ABI to check that it carries exactly what was passed.
 */

const ABI_BY_VERSION = {
  '3': multiSourceLoanAbiV6,
  '3.1': multiSourceLoanAbiV7,
  '3.2': multiSourceLoanAbiV8,
} as const satisfies Record<MslV6Version, Abi>;

const VERSIONS = Object.keys(ABI_BY_VERSION) as MslV6Version[];

const MSL_ADDRESS = getAddress('0x00000000000000000000000000000000000000aa');

const NUM_RUNS = 25;

type TypedDataTypes = Record<string, { name: string; type: string }[]>;

/** The struct name Solidity gives a tuple parameter: `struct IMultiSourceLoan.LoanOffer[]` → `LoanOffer`. */
const structName = (parameter: AbiParameter) =>
  (parameter.internalType ?? '')
    .replace(/^struct /, '')
    .replace(/\[\d*\]$/, '')
    .split('.')
    .pop()!;

/** Collects the EIP-712 types of `parameter`'s struct and every struct nested in it. */
const collectStructTypes = (parameter: AbiParameter, types: TypedDataTypes) => {
  if (!('components' in parameter)) return;
  types[structName(parameter)] = parameter.components.map((component) => ({
    name: component.name ?? '',
    type: component.type.startsWith('tuple')
      ? component.type.replace('tuple', structName(component))
      : component.type,
  }));
  parameter.components.forEach((component) => collectStructTypes(component, types));
};

/** Every parameter of every function in `abi`, nested ones included. */
const allParameters = (abi: Abi): AbiParameter[] => {
  const expand = (parameter: AbiParameter): AbiParameter[] => [
    parameter,
    ...('components' in parameter ? parameter.components.flatMap(expand) : []),
  ];
  return abi.flatMap((item) => (item.type === 'function' ? item.inputs.flatMap(expand) : []));
};

/**
 * The EIP-712 types of the ABI struct named `primaryType`, as the contract hashes it: field names,
 * order and types exactly as the ABI declares them, with nested structs named after their
 * Solidity struct.
 */
const abiTypedDataTypes = (abi: Abi, primaryType: string): TypedDataTypes => {
  const parameter = allParameters(abi).find(
    (candidate) => candidate.type === 'tuple' && structName(candidate) === primaryType,
  );
  if (!parameter) throw new Error(`No struct ${primaryType} in the ABI`);
  const types: TypedDataTypes = {};
  collectStructTypes(parameter, types);
  return types;
};

const domainOf = (version: MslV6Version) => ({
  name: CONTRACT_DOMAIN_NAME,
  version,
  chainId: mainnet.id,
  verifyingContract: MSL_ADDRESS as Address,
});

const mslSignedBy = (privateKey: Hex, version: MslV6Version) =>
  new MslV6({
    walletClient: createWalletClient({
      account: privateKeyToAccount(privateKey),
      chain: mainnet,
      transport: custom({ request: async () => null }),
    }),
    address: MSL_ADDRESS,
    version,
  });

/** Recovers the signer of `message` under the ABI's definition of `primaryType`. */
const recoverUnderAbi = (
  version: MslV6Version,
  primaryType: string,
  message: Record<string, unknown>,
  signature: Hex,
) =>
  recoverTypedDataAddress({
    domain: domainOf(version),
    types: abiTypedDataTypes(ABI_BY_VERSION[version], primaryType),
    primaryType,
    message,
    signature,
  });

const SECP256K1_ORDER = 0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141n;

const privateKeys = fc
  .bigInt({ min: 1n, max: SECP256K1_ORDER - 1n })
  .map((key) => `0x${key.toString(16).padStart(64, '0')}` as Hex);
const uint256s = fc.bigInt({ min: 0n, max: 2n ** 256n - 1n });
const addresses = fc
  .uint8Array({ minLength: 20, maxLength: 20 })
  .map((bytes) => getAddress(bytesToHex(bytes)));
const byteStrings = fc.uint8Array({ maxLength: 96 }).map((bytes) => bytesToHex(bytes));
const versions = fc.constantFrom(...VERSIONS);

const offers = fc.record({
  offerId: uint256s,
  lender: addresses,
  fee: uint256s,
  capacity: uint256s,
  nftCollateralAddress: addresses,
  nftCollateralTokenId: uint256s,
  principalAddress: addresses,
  principalAmount: uint256s,
  aprBps: uint256s,
  expirationTime: uint256s,
  duration: uint256s,
  maxSeniorRepayment: uint256s,
  validators: fc.array(fc.record({ validator: addresses, arguments: byteStrings }), {
    maxLength: 3,
  }),
  lenderRefinanceDisabled: fc.boolean(),
  borrower: addresses,
});

/** API offers carry fields no struct declares; signing must drop them, not hash them. */
const withApiFields = <T extends object>(struct: T) => ({
  ...struct,
  id: 'offer-id',
  nft: { collection: { image: 'https://example.com/collection.png' } },
});

/** The offer as the contract version's struct holds it: 3.2 added the last two fields. */
const offerForVersion = (offer: fc.RecordValue<typeof offers>, version: MslV6Version) => {
  if (version === '3.2') return offer;
  const { lenderRefinanceDisabled: _disabled, borrower: _borrower, ...rest } = offer;
  return rest;
};

const tranches = fc.record({
  loanId: uint256s,
  floor: uint256s,
  principalAmount: uint256s,
  lender: addresses,
  accruedInterest: uint256s,
  startTime: uint256s,
  aprBps: uint256s,
});

const loans = fc.record({
  borrower: addresses,
  nftCollateralTokenId: uint256s,
  nftCollateralAddress: addresses,
  principalAddress: addresses,
  principalAmount: uint256s,
  startTime: uint256s,
  duration: uint256s,
  tranche: fc.array(tranches, { minLength: 1, maxLength: 3 }),
  protocolFee: uint256s,
  lenderRefinanceDisabled: fc.boolean(),
});

const repaymentData = fc.record({
  loanId: uint256s,
  callbackData: byteStrings,
  shouldDelegate: fc.boolean(),
});

const renegotiations = fc.record({
  renegotiationId: uint256s,
  loanId: uint256s,
  lender: addresses,
  fee: uint256s,
  trancheIndex: fc.array(uint256s, { maxLength: 3 }),
  principalAmount: uint256s,
  aprBps: uint256s,
  expirationTime: uint256s,
  duration: uint256s,
});

const emits = fc.record({
  offer: offers,
  amount: uint256s,
  lenderOfferSignature: byteStrings,
  nftCollateralAddress: addresses,
  tokenId: uint256s,
  duration: uint256s,
  principalReceiver: addresses,
  expirationTime: uint256s,
  callbackData: byteStrings,
});

/** The SDK's emit arguments for `emit`, with the API names the SDK maps from. */
const emitLoanArgs = ({
  offer,
  amount,
  lenderOfferSignature,
  ...rest
}: fc.RecordValue<typeof emits>) =>
  ({
    ...rest,
    offerExecution: [
      {
        offer: withApiFields({
          ...offer,
          lenderAddress: offer.lender,
          offerValidators: offer.validators,
          borrowerAddress: offer.borrower,
        }),
        amount,
        lenderOfferSignature,
      },
    ],
  }) as unknown as EmitLoanArgs;

/** The execution data the contract version's struct holds for `emit`. */
const expectedExecutionData = (emit: fc.RecordValue<typeof emits>, version: MslV6Version) => ({
  offerExecution: [
    {
      offer: offerForVersion(emit.offer, version),
      amount: emit.amount,
      lenderOfferSignature: emit.lenderOfferSignature,
    },
  ],
  ...(version === '3' ? {} : { loanId: 0n, nftCollateralAddress: emit.nftCollateralAddress }),
  tokenId: emit.tokenId,
  duration: emit.duration,
  expirationTime: emit.expirationTime,
  principalReceiver: emit.principalReceiver,
  callbackData: emit.callbackData,
});

/** The loan the contract version's struct holds: 3.2 added `lenderRefinanceDisabled`. */
const loanForVersion = (loan: fc.RecordValue<typeof loans>, version: MslV6Version) => {
  if (version === '3.2') return loan;
  const { lenderRefinanceDisabled: _disabled, ...rest } = loan;
  return rest;
};

type EmitCalldataArgs = [
  { executionData: Record<string, unknown>; borrower: Address; borrowerOfferSignature: Hex },
];
type RepayCalldataArgs = [
  { data: Record<string, unknown>; loan: Record<string, unknown>; borrowerSignature: Hex },
];

const decodeArgs = <T>(version: MslV6Version, data: Hex) =>
  decodeFunctionData({ abi: ABI_BY_VERSION[version], data }).args as unknown as T;

describe('offer signatures', () => {
  test('recover to the lender under the contract ABI struct', async () => {
    await fc.assert(
      fc.asyncProperty(privateKeys, versions, offers, async (privateKey, version, offer) => {
        const signature = await mslSignedBy(privateKey, version).signOffer({
          structToSign: withApiFields(offerForVersion(offer, version)) as never,
        });
        const signer = await recoverUnderAbi(version, 'LoanOffer', offer, signature);
        expect(signer).toBe(privateKeyToAccount(privateKey).address);
      }),
      { numRuns: NUM_RUNS },
    );
  });
});

describe('renegotiation signatures', () => {
  test('recover to the lender under the contract ABI struct', async () => {
    await fc.assert(
      fc.asyncProperty(
        privateKeys,
        versions,
        renegotiations,
        async (privateKey, version, renegotiation) => {
          const signature = await mslSignedBy(privateKey, version).signRenegotiationOffer({
            structToSign: withApiFields(renegotiation),
          });
          const signer = await recoverUnderAbi(
            version,
            'RenegotiationOffer',
            renegotiation,
            signature,
          );
          expect(signer).toBe(privateKeyToAccount(privateKey).address);
        },
      ),
      { numRuns: NUM_RUNS },
    );
  });
});

describe('emitLoan calldata', () => {
  test('decodes to the execution data the borrower passed', async () => {
    await fc.assert(
      fc.asyncProperty(privateKeys, versions, emits, async (privateKey, version, emit) => {
        const calldata = await mslSignedBy(privateKey, version).encodeEmitLoan({
          emitArgs: emitLoanArgs(emit),
          withSignature: false,
        });
        const [{ executionData }] = decodeArgs<EmitCalldataArgs>(version, calldata);
        expect(executionData).toEqual(expectedExecutionData(emit, version));
      }),
      { numRuns: NUM_RUNS },
    );
  });

  test('carries a borrower signature over its own execution data', async () => {
    await fc.assert(
      fc.asyncProperty(privateKeys, versions, emits, async (privateKey, version, emit) => {
        const calldata = await mslSignedBy(privateKey, version).encodeEmitLoan({
          emitArgs: { ...emitLoanArgs(emit), expirationTime: undefined },
          withSignature: true,
        });
        const [{ executionData, borrower, borrowerOfferSignature }] = decodeArgs<EmitCalldataArgs>(
          version,
          calldata,
        );
        const signer = await recoverUnderAbi(
          version,
          'ExecutionData',
          executionData,
          borrowerOfferSignature,
        );
        expect(signer).toBe(borrower);
      }),
      { numRuns: NUM_RUNS },
    );
  });
});

describe('repayLoan calldata', () => {
  test('decodes to the loan the borrower passed', async () => {
    await fc.assert(
      fc.asyncProperty(
        privateKeys,
        versions,
        loans,
        repaymentData,
        async (privateKey, version, loan, data) => {
          const calldata = await mslSignedBy(privateKey, version).encodeRepayLoan({
            repayArgs: {
              loan: loanForVersion(loan, version) as never,
              signableRepaymentData: data,
            },
            withSignature: false,
          });
          const [decoded] = decodeArgs<RepayCalldataArgs>(version, calldata);
          expect(decoded.loan).toEqual(loanForVersion(loan, version));
        },
      ),
      { numRuns: NUM_RUNS },
    );
  });

  test('carries a borrower signature over its own repayment data', async () => {
    await fc.assert(
      fc.asyncProperty(
        privateKeys,
        versions,
        loans,
        repaymentData,
        async (privateKey, version, loan, data) => {
          const calldata = await mslSignedBy(privateKey, version).encodeRepayLoan({
            repayArgs: {
              loan: loanForVersion(loan, version) as never,
              signableRepaymentData: data,
            },
            withSignature: true,
          });
          const [decoded] = decodeArgs<RepayCalldataArgs>(version, calldata);
          const signer = await recoverUnderAbi(
            version,
            'SignableRepaymentData',
            decoded.data,
            decoded.borrowerSignature,
          );
          expect(signer).toBe(privateKeyToAccount(privateKey).address);
        },
      ),
      { numRuns: NUM_RUNS },
    );
  });
});
