const path = require('path');

module.exports = {
  entry: './assets/scripts/index.ts',
  mode: "production",
  devtool: "inline-source-map",
  module: {
    rules: [
      {        
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'assets/scripts/bin'),
  },
};