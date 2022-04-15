const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  entry: './demo/src/index.tsx',
  devtool: 'inline-source-map',
  devServer: {
    static: './demo/public',
    port: 8081,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '...'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './demo/public/index.html',
    }),
    new MiniCssExtractPlugin(),
  ],
}
