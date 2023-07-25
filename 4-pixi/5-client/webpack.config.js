const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'atari-monk-client.js',
    globalObject: 'this',
    library: {
      name: 'atari-monk-client',
      type: 'umd',
    },
  },
  externals: {
    socketio: 'socket.io-client',
    eventemitter3: 'eventemitter3',
    atarimonkpixilib: 'atari-monk-pixi-lib',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [{ from: './package.json', to: './' }],
    }),
  ],
  stats: { errorDetails: true },
};
