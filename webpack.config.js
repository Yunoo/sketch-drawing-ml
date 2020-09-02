const { resolve } = require('path')
const nodeExternals = require('webpack-node-externals')

const filename = process.env.NODE_ENV === 'production' ? 'main.prod.js' : 'main.dev.js'

module.exports = {
  entry: './src/app.js',
  target: 'node',
  output: {
    filename,
    path: resolve(__dirname, 'dist'),
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    alias: {
      '~/__test__': resolve(__dirname, '__test__'),
      '~': resolve(__dirname, 'src'),
    },
    extensions: ['.js'],
  },
}
