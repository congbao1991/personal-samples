const { merge } = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config")
const utils = require("./utils")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
  // 指定构建环境  
  mode: "production",
  output: {
    path: utils.resolve("dist"),
    filename: "js/[name].[chunkhash].js",
    publicPath: "/"
  },
  module: {
    rules: utils.cssLoaders({ extract: true, sourceMap: true })
  },
  // 插件
  plugins: [
    // new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/styles/[name].[chunkhash].css',
      chunkFilename: 'static/styles/[name].[chunkhash].css',
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: utils.resolve('dist/index.html'), // html模板的生成路径
      template: 'index.html',//html模板
      inject: true, // true：默认值，script标签位于html文件的 body 底部
      hash: true, // 在打包的资源插入html会加上hash
      //  html 文件进行压缩
      minify: {
        removeComments: true,               //去注释
        collapseWhitespace: true,           //压缩空格
        removeAttributeQuotes: true         //去除属性引用
      }
    })
  ],
  optimization: {
    minimizer: [
      '...',
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
      }),
      new TerserPlugin()
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        antdui: {
          name: 'antd',
          priority: 2,
          test: /[\\/]node_modules[\\/](antd)[\\/]/,
        },
        basic: {
          name: 'basic',
          priority: 3,
          test: /[\\/]node_modules[\\/](moment|react|react-dom|react-router|react-router-dom|mobx|mobx-react|axios)[\\/]/,
        }
      },
    }
  },
  performance: {
    hints: "warning", // 枚举
    maxAssetSize: 700000, // 整数类型（以字节为单位）
    maxEntrypointSize: 2000000, // 整数类型（以字节为单位）
    assetFilter: function (assetFilename) {
      // 提供资源文件名的断言函数
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');

    }
  }
})