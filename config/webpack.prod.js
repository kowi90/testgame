var path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, "../build"),
    filename: "index.js",
  },
    // Loaders
    module: {
      rules : [
        {
          test: /\.js/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        },
      ]
    },
};