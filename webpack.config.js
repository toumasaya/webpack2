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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
          publicPath: './dist'
        }),
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"), // 要跑 server 的目錄
    compress: true, // 用 gzip 壓縮檔案
    stats: "errors-only", // 只輸出錯誤訊息
    open: true // 第一次啟動會自動打開瀏覽器
  }
}