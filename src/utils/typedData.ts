type TypedDataField = { name: string; type: string };

type TypedDataTypes = Record<string, readonly TypedDataField[]>;

/** EIP-712 array suffix ending a type name: `[]` or `[N]`, as in `OfferExecution[]` / `bytes32[3]`. */
const ARRAY_SUFFIX_REGEX = /\[\d*\]$/;

const pickTypedFields = (value: unknown, type: string, types: TypedDataTypes): unknown => {
  if (ARRAY_SUFFIX_REGEX.test(type) && Array.isArray(value)) {
    const elementType = type.replace(ARRAY_SUFFIX_REGEX, '');
    return value.map((element) => pickTypedFields(element, elementType, types));
  }
  const fields = types[type];
  if (!fields || typeof value !== 'object' || value === null) return value;
  const struct = value as Record<string, unknown>;
  return Object.fromEntries(
    fields.map((field) => [field.name, pickTypedFields(struct[field.name], field.type, types)]),
  );
};

/**
 * Returns the sign typed data parameters with the message reduced to the fields declared in
 * `types`, recursing into nested structs and arrays.
 *
 * Extra properties do not change the EIP-712 hash, but they are serialized into the
 * `eth_signTypedData_v4` request, so wallets display them and wallet security checks scan them:
 * Rabby warns that "the transaction is not associated with the website that initiated it" when a
 * URL anywhere in the payload does not match the connected site. Structs assembled by spreading
 * API objects (offers carrying nested NFT and collection data) must therefore be stripped before
 * reaching the wallet.
 */
export const sanitizeTypedDataMessage = <
  const TParameters extends {
    primaryType: string;
    types: TypedDataTypes;
    message: Record<string, unknown>;
  },
>(
  parameters: TParameters,
): TParameters => ({
  ...parameters,
  message: pickTypedFields(
    parameters.message,
    parameters.primaryType,
    parameters.types,
  ) as TParameters['message'],
});
