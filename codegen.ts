import type { CodegenConfig } from '@graphql-codegen/cli';
import { generate } from '@graphql-codegen/cli';

const GONDI_API = process.env.GONDI_API ?? 'https://api.gondi.xyz/lending/graphql';

console.log('Using schema', GONDI_API);

const config: CodegenConfig = {
  generates: {
    'src/generated/graphql/index.ts': {
      schema: [GONDI_API],
      documents: ['./src/api/graphql/**/*.gql'],
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-apollo-client-helpers',
        'typescript-generic-sdk',
        {
          add: {
            content: [
              '/* eslint-disable */',
              '//@ts-nocheck',
              "import { Address, Hash, Hex } from 'viem'",
            ],
          },
        },
      ],
      config: {
        defaultBaseOptions: {
          context: {
            clientName: 'lending',
          },
        },
        scalars: {
          DateTime: 'Date',
          Decimal: 'decimal',
          BigInt: 'bigint',
          Hash: 'Hash',
          Address: 'Address',
          Signature: 'Hex',
          Hex: 'Hex',
        },
      },
    },
    'src/generated/graphql/lending-schema.graphql': {
      schema: [GONDI_API],
      plugins: ['schema-ast'],
    },
  },
  hooks: {
    afterOneFileWrite: ['prettier --write'],
  },
};

await generate(config);
