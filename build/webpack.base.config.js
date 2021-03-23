const utils = require('./utils')
const CopyWebpackPlugin = require("copy-webpack-plugin")
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
  entry: {
    app: "./src/index"
  },
  output: {
    path: utils.resolve("dist"),
    filename: "js/[name].js",
    publicPath: "/"
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      '@': utils.join("src")
    }
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: utils.resolve('static'),
          to: "static"
        }
      ]
    }),
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader?cacheDirectory'],
      threadPool: happyThreadPool,
      verbose: true,
    })
  ],
  // 模块
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['happypack/loader?id=babel'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
}