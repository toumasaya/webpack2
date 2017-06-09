const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'app.bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new ExtractTextPlugin({
      filename: 'app.css',
      disable: false,
      allChunks: true
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        // use: ['style-loader', 'css-loader', 'sass-loader']
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
          publicPath: './dist'
        }),
      }
    ]
  }
}