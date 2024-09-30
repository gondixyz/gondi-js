import { build } from 'esbuild';
import { writeFileSync } from 'fs';

import packageJson from './package.json' assert { type: 'json' };

const metafile = !!process.env.METAFILE;

const result = await build({
  entryPoints: ['src/index.ts'],

  allowOverwrite: true,
  sourcemap: true,
  bundle: true,
  minify: true,
  keepNames: true,
  format: 'esm',
  platform: 'node',
  target: ['esnext'],
  metafile,
  tsconfig: './tsconfig.json',
  outfile: './dist/index.mjs',

  loader: { '.graphql': 'text' },
  external: [
    ...Object.keys(packageJson.peerDependencies || {}),
    ...Object.keys(packageJson.devDependencies),
    ...Object.keys(packageJson.dependencies || {}),
  ],
});

if (metafile) writeFileSync('meta.json', JSON.stringify(result.metafile));
