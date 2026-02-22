module.exports = {
  // Input
  entryPoints: ['./src/index.ts'],
  includeVersion: true,
  tsconfig: './tsconfig.json',
  out: './docs',
  excludeExternals: true,
  excludePrivate: true,
  excludeProtected: true,
  readme: 'README.md',
  name: 'Gondi JS SDK',

  // Output
  basePath: './',
  hideGenerator: true,
  visibilityFilters: {},
  navigationLinks: {
    Github: 'https://github.com/gondixyz/gondi-js',
  },
  excludeInternal: true,

  // Organization
  groupOrder: ['Classes', 'Namespaces', 'Modules', '*'],
  sort: ['kind'],
  kindSortOrder: ['Class', 'Namespace', 'Module', 'Enum'],

  plugin: ['typedoc-plugin-missing-exports'],
  internalModule: 'Internal',
};
