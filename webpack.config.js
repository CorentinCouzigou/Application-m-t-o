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
 
  },
  plugins: [
    new Dotenv()
  ]
}