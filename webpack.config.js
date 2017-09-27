var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname, "src"),
  entry: [
    'whatwg-fetch',
    './scripts/index.js',
    './index.html'
  ],
  externals: {
    'push-notifications': 'PushNotification'
  },
  devServer: {
    historyApiFallback: true
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: [
            'react',
            'env',
            'stage-0',
            'flow'
          ],
          plugins: [
            'react-html-attrs',
            'transform-class-properties',
            'transform-object-rest-spread',
            'transform-runtime',
            'flow-react-proptypes'
          ],
        }
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
          }
        ]
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      }
    ]
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "client.js?version=[hash].js",
    publicPath : '/'
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
};
