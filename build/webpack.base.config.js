const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const utils = require('./utils')


module.exports = {
  entry: {
    app: './src/index'
  },
  output: {
    path: utils.resolve('dist'),
    filename: 'js/[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      '@': utils.join('src')
    },
    modules: [path.resolve(__dirname, '../node_modules')]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: utils.resolve('static'),
          to: 'static'
        }
      ]
    })
  ],
  // 模块
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // 缓存转换出的结果
            cacheDirectory: true,
            // 只对src目录下的文件使用babel-loader处理，可以缩小命中范围
            include: path.resolve(__dirname, '../src'),
            presets: ['@babel/preset-env'],
          },
        },
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
