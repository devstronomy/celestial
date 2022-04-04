module.exports = {
  // TODO: MK: fix me
  // entry: ['./src/main.ts', './src/style.css'],
  // output: {
  //   filename: '[name].[contenthash].js',
  //   path: path.resolve(__dirname, 'dist'),
  // },
  resolve: {
    extensions: ['.ts', '.tsx', '...'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
}
