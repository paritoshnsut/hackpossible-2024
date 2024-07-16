/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-var-requires, no-unused-vars, 
import/no-extraneous-dependencies */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const { ModuleFederationPlugin } = require('webpack').container;
const packageJson = require('../package.json');

const releaseDateTime = Date.now();

const config = {
  entry: ['react-hot-loader/patch', './src/index.tsx'],
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: '[name].[contenthash].js',
    // TODO: Check if we need to change this later,
    // please change config.js path in index.html if you change this
    publicPath: '/v2/remote/shipments/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.svg$/,
        use: 'file-loader'
      },
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'image/png'
            }
          }
        ]
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/resource',
        generator: {
          filename: './fonts/[name][ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '..', './src/index.html')
    }),
    new MiniCssExtractPlugin(),
    new Dotenv(),
    new ModuleFederationPlugin({
      name: 'shipments',
      filename: 'shipments_remoteEntry.js',
      exposes: {
        './ShipmentsModule': './src/App'
      },
      remotes: {
        host: `host@/v2/host_remoteEntry.js?v=${releaseDateTime}`
      },
      shared: {
        'react-router-dom': {
          singleton: true,
          eager: true,
          requiredVersion: packageJson.dependencies['react-router-dom']
        },
        react: { singleton: true, eager: true, requiredVersion: packageJson.dependencies.react }
      }
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      'react/jsx-dev-runtime': 'react/jsx-dev-runtime.js',
      'react/jsx-runtime': 'react/jsx-runtime.js'
    }
  }
};

module.exports = config;
