const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
  mode: 'development',
  entry: './demo/src/index.tsx',
  devtool: 'inline-source-map',
  devServer: {
    static: './demo/public',
    port: 8081,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './demo/public/index.html',
    }),
    new MiniCssExtractPlugin(),
  ],
})
