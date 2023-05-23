To start a Pixi.js project with a bundler (Webpack) and TypeScript from scratch, you can follow these steps:

1. Folder
2. Terminal in Folder
3. 
npm init
4. 
npm install webpack webpack-cli typescript ts-loader --save-dev
5. 
npm install pixi.js
6. 
tsconfig.json

{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "sourceMap": true
  },
  "include": [
    "src/**/*.ts"
  ]
}
7. 
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
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};

8. Folder
src

9.

index.ts

import * as PIXI from 'pixi.js';

const app = new PIXI.Application<HTMLCanvasElement>({
  width: 800,
  height: 600,
  backgroundColor: 0x1099bb,
});

document.body.appendChild(app.view);

app.ticker.add(() => {

});

10.
index.html

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pixi.js Project</title>
</head>
<body>
  <!-- Your HTML content goes here -->
  
  <script src="dist/bundle.js"></script>
</body>
</html>

11.

npx webpack --config webpack.config.js