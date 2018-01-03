const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const WebpackAssetsManifest = require('webpack-assets-manifest')
const BabiliPlugin = require('babili-webpack-plugin')

const production = process.env.NODE_ENV === 'production'

module.exports = {
  entry: {
    index: [
      path.join(__dirname, '../src/index.js'),
      // path.join(__dirname, '../src/asset/image/favicon/favicon.ico'),
      path.join(__dirname, '../src/index.html'),
    ],
  },

  output: {
    path: path.join(__dirname, '../dist'),
    filename: production ? '[name]-[hash:8].js' : '[name].js',
    chunkFilename: '[hash:8].[name].js',
    publicPath: process.env.PATHNAME_BASE || '/',
  },

  resolve: {
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
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

    new WebpackAssetsManifest({
      output: path.resolve(__dirname, '../dist', 'assetManifest.json'),
    }),
  ].filter(Boolean),

  devServer: {
    port: 8082,
    contentBase: [path.resolve(__dirname, '../dist')],
    historyApiFallback: true,
    watchOptions: {
      ignored: /node_modules/,
    },
  },
}
