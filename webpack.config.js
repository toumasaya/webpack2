const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let isProd = process.env.NODE_ENV === 'production'; // true or false
let cssDev = ['style-loader', 'css-loader', 'sass-loader'];
let cssProd = ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader'],
                publicPath: './dist'
              });
let cssConfig = isProd ? cssProd : cssDev;

module.exports = {
  entry: {
    app: './src/app.js',
    contact: './src/contact.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      excludeChunks: ['contact'],
      template: './src/index.pug'
    }),
    new HtmlWebpackPlugin({
      hash: true,
      chunks: ['contact'],
      filename: 'contact.html', // 指定 template 要輸出的路徑
      template: './src/contact.pug'
    }),
    new ExtractTextPlugin({
      filename: 'app.css',
      disable: !isProd,
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: cssConfig
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.pug$/,
        use: ['html-loader', 'pug-html-loader']
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"), // 要跑 server 的目錄
    compress: true, // 用 gzip 壓縮檔案
    stats: "errors-only", // 只輸出錯誤訊息
    open: true, // 第一次啟動會自動打開瀏覽器
    hot: true, // 啟動 HMR
  }
}