const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const WebpackAssetsManifest = require('webpack-assets-manifest')
const BabiliPlugin = require('babili-webpack-plugin')

const production = process.env.NODE_ENV === 'production'

const createEnvVarArray = () => {
  const o = {}
  ;['NODE_ENV', 'VERSION', 'PATHNAME_BASE', 'SENTRY_DSN']
    .filter(name => name in process.env)
    .forEach(name => (o[`process.env.${name}`] = `"${process.env[name]}"`))

  o[`process.env.RELEASE_DATE`] = Date.now()

  return o
}

console.log('injected env var', createEnvVarArray())

module.exports = {
  entry: {
    index: [
      path.join(__dirname, '../src/index.js'),
      // path.join(__dirname, '../src/asset/image/favicon/favicon.ico'),
      path.join(__dirname, '../src/index.html'),
    ],
    sw: path.join(__dirname, '../src/service/serviceWorker/sw.js'),
  },

  output: {
    path: path.join(__dirname, '../dist'),
    filename: production ? '[name]-[hash:8].js' : '[name].js',
    chunkFilename: '[hash:8].[name].js',
    publicPath: process.env.PATHNAME_BASE || '/',
  },

  resolve: {
    alias: {
      react: 'preact',
      'react-dom': 'preact',
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },

      {
        test: [/\.html?$/, /\.ico/],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },

      {
        test: [/\.bmp/, /\.gif/, /\.jpe?g/, /\.png/, /\.otf/, /\.svg/],
        loader: 'url-loader',
        options: {
          limit: 100,
          name: production
            ? 'static/[hash:8].[ext]'
            : 'static/[name].[hash:8].[ext]',
        },
      },
    ],
  },

  plugins: [
    production &&
      new BabiliPlugin(
        {},
        {
          sourceMap: false,
          comments: false,
        }
      ),

    production && new webpack.HashedModuleIdsPlugin(),

    !production && new webpack.NamedModulesPlugin(),

    new webpack.DefinePlugin(createEnvVarArray()),

    new WebpackAssetsManifest({
      output: path.resolve(__dirname, '../dist', 'assetManifest.json'),
    }),
  ].filter(Boolean),

  devServer: {
    port: 8082,
    contentBase: false,
    historyApiFallback: true,
    watchOptions: {
      ignored: /node_modules/,
    },
  },
}
