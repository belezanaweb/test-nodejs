module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }],
    '@babel/preset-typescript',
  ],
  plugins: [
    'babel-plugin-transform-typescript-metadata',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    [
      'module-resolver',
      {
        // aqui que ensinamos ele onde buscar os imports
       // e também ja podemos ter uma ideia de como irá ficar nossa estrutura de pastas
        alias: {
          '@apps': './src/apps',
          '@config': './src/config',
          '@helper': './src/helper',
          '@middlewares': './src/middlewares',
          '@shared': './src/shared',
          '@tools': './src/tools',
          '@services': './src/services',
          '@utils': './src/utils',
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts'],
};
