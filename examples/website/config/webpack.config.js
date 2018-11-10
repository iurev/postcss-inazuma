/* global process, __dirname, module */
const postcssConfig = './config/postcss/postcss.config.js';

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const path = require('path');
const projectDir = path.resolve(`${__dirname}/..`);

const isDev = process.env.NODE_ENV !== 'production';

// Set a random Public URL to share your website with anyone
// Or you can use a custom URL "http://mysuperwebsite.localtunnel.me"
// const tunnel = 'mysuperwebsite';
const tunnel = false;

console.log('NODE_ENV:', process.env.NODE_ENV);

const config = {
  context: projectDir + '/src',
  entry: {
    'index': './index.js'
  },
  output: {
    filename: isDev ? '[name].js' : '[name].[chunkhash].js',
    path: path.resolve(projectDir, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.sss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: isDev,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                config: { path: postcssConfig }
              }
            },
          ],
        })
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
        }
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    compress: true,
    port: 3000
  },
  plugins: [
    new ExtractTextPlugin('[name].[contenthash:base64:5].css'),
    new CleanWebpackPlugin(['build/'], {
      root: projectDir
    }), // avoid Duplicated CSS files with different hash

    // YOUR PROJECT PAGES
    new HtmlWebpackPlugin({
      chunks: ['index'],
      template: './index.html',
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      proxy: 'http://localhost:3000/',
      ghostMode: { // Disable interaction features between different browsers
        clicks: false,
        forms: false,
        scroll: false
      },
      tunnel,
    }, {
      // prevent BrowserSync from reloading the page
      // and let Webpack Dev Server take care of this
      reload: false
    })
  ]
};

module.exports = config;
