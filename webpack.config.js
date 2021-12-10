const Dotenv = require('dotenv-webpack');
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
  mode: 'production',
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ test: /\.js(\?.*)?$/i, })],
  },
  plugins: [
    new Dotenv()
  ]
}