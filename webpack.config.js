const Dotenv = require('dotenv-webpack');
const TerserPlugin = require("terser-webpack-plugin");
const { Resolver } = require('webpack');

const path = require('path');
// const PATHS = {
//   img: path.join(dirname, './img'),
// }

module.exports = {
  mode: 'production',
  entry: ['./app.js', './validation/cityValidation.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  // watch: true,
  module: {
    // loaders: [
    //   {
    //     test: /\.(png|jpg|jpeg|gif|svg)$/i,
    //     loader: 'file-loader'
    //   }
    // ],
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      { test: /ignore\.(png|jpg|gif|svg)$/, loader: 'ignore-loader' },
      { test: /\.(png|jpg|gif|svg)$/, loader: 'file-loader', options: { name: '[name].[ext]?[hash]' } },
    ],
  },
  optimization: {
    minimize: true,
  },
}
