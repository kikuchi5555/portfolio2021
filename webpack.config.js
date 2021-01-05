const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  entry: {
    app: './src/js/app.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts/[name].[contentHash].js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },

      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },

      {
        test: /\.html$/,
        loader: 'html-loader'
      },

      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[contentHash].[ext]',
          outputPath: 'images/',
          esModule: false
        }
      },

      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/'
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: './src/favicon.ico',
      inject: true,
      hash: true
    }),

    new MiniCssExtractPlugin({
      filename: 'app.css'
    }),

    new BrowserSyncPlugin({
      host: 'localhost',
      port: 8888,
      server: { baseDir: 'dist' },
      browser: 'google chrome'
    })
  ]
};
