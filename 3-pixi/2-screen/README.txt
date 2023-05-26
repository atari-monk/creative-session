This is steps to add typescript and webpack to js, pixi project.

1. Terminal in Folder
npm init -y
2.
npm install webpack webpack-cli typescript ts-loader --save-dev
npm install pixi.js
3.
tsconfig.json

{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "dist",
    "strict": true,
    "allowJs": true
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.js",
    "./../2-pixi-lib/**/*.ts",
    "./../2-pixi-lib/**/*.js"
  ],
  "exclude": ["node_modules"]
}

4.
webpack.config.js

const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  devtool: 'inline-source-map',
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
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

5.
Folder
src

6.
index.ts

7.
index.html

use
<script src="dist/bundle.js"></script>

8.
npx webpack --config webpack.config.js