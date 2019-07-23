var path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "index.js",
  },
  devServer: {
    contentBase: path.join( __dirname, '../dist'),
    compress: true,
    port: 9000,
    hot: true
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