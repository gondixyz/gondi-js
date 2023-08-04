import { buildSync } from "esbuild";

import packageJson from "./package.json" assert { type: "json" };

buildSync({
  entryPoints: ["src/index.ts"],

  allowOverwrite: true,
  sourcemap: true,
  bundle: true,
  minify: false,
  keepNames: true,
  format: "esm",
  platform: "node",
  target: ["esnext"],

  tsconfig: "./tsconfig.json",
  outfile: "./dist/index.js",

  loader: { ".graphql": "text" },
  external: [
    ...Object.keys(packageJson.peerDependencies || {}),
    ...Object.keys(packageJson.devDependencies),
    ...Object.keys(packageJson.dependencies || {}),
  ],
});
