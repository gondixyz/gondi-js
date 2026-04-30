import { getAddress } from 'viem';

export const buildSiweMessage = ({
  domain,
  address,
  statement,
  uri,
  version,
  chainId,
  nonce,
}: {
  domain: string;
  address: string;
  statement: string;
  uri: string;
  version: string;
  chainId: number;
  nonce: string;
}): string => {
  const checksummed = getAddress(address);
  if (checksummed !== address) {
    throw new Error(`Address must be EIP-55 checksummed: ${address}`);
  }
  const issuedAt = new Date().toISOString();
  return (
    `${domain} wants you to sign in with your Ethereum account:\n` +
    `${checksummed}\n\n` +
    `${statement}\n\n` +
    `URI: ${uri}\n` +
    `Version: ${version}\n` +
    `Chain ID: ${chainId}\n` +
    `Nonce: ${nonce}\n` +
    `Issued At: ${issuedAt}`
  );
};
