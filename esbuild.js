import { buildSync } from 'esbuild';

import packageJson from './package.json' assert { type: 'json' };

buildSync({
  entryPoints: ['index.ts'],

  allowOverwrite: true,
  sourcemap: true,
  bundle: true,
  minify: true,
  keepNames: true,
  format: 'esm',
  platform: 'browser',
  target: ['esnext'],

  tsconfig: './tsconfig.json',
  outdir: 'dist',

  loader: { '.graphql': 'text' },
  external: [
    ...Object.keys(packageJson.devDependencies),
    ...Object.keys(packageJson.peerDependencies || {}),
  ],
});
