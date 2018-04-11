const merge = require('webpack-merge');
const { resolve } = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const commonConfig = require('./common');

module.exports = merge(commonConfig, {
  entry: './init.jsx',
  devtool: 'source-map',
  output: {
    filename: 'js/bundle.min.js',
    path: resolve(__dirname, '../../dist'),
    publicPath: '/map2'
  },
  plugins: [new CopyWebpackPlugin([{ from: 'data', to: 'data' }])]
});
