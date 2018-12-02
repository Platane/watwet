const plugins = [
  [
    'babel-plugin-module-resolver',
    {
      alias: {
        '~': './src',
        type: './src/type',
      },
    },
  ],

  [
    'babel-plugin-transform-inline-environment-variables',
    {
      include: ['NODE_ENV', 'VERSION', 'PATHNAME_BASE', 'SENTRY_DSN', 'HOST'],
    },
  ],

  'babel-plugin-emotion',

  '@babel/plugin-proposal-export-namespace-from',
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-object-rest-spread',
  ['@babel/plugin-transform-react-jsx', { pragma: 'h' }],
]

const presets = ['@babel/preset-flow']

if (process.env.NODE_ENV === 'productionserviceworker') {
}
if (process.env.NODE_ENV === 'production') {
  presets.push('@babel/preset-env')
  plugins.push([
    '@babel/plugin-transform-runtime',
    {
      helpers: false,
      regenerator: true,
    },
  ])
}
if (process.env.NODE_ENV === 'test') {
  plugins.push('@babel/plugin-transform-modules-commonjs')
}

module.exports = { plugins, presets }
