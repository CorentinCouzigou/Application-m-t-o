const Dotenv = require('dotenv-webpack');
module.exports = {
    entry:'./app.js',
    output: {
      filename: 'bundle.js'
    },
    plugins: [
      new Dotenv()
    ]
  }