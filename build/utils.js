const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

exports.resolve = function(dir) {
  return path.resolve(__dirname, '..', dir)
}

exports.join = function(dir) {
  return path.join(__dirname, '..', dir)
}

exports.cssLoaders = function(options) {
  options = options || {}
  const cssLoader = {
    loader: 'css-loader', // 转换css
    options: {
      sourceMap: options.sourceMap
    }
  };

  function generateLoaders(loader, loaderOptions) {
    const loaders = [cssLoader, 'postcss-loader'];
    if (loader) {
      loaders.push({
        loader: `${loader}-loader`,
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        }, {
          lessOptions: { // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
            modifyVars: {
              'primary-color': '#00cd96',
              'link-color': '#00cd96',
            },
            javascriptEnabled: true,
          }
        })
      })
    }
    if (options.extract) {
      return [
        {
          loader: MiniCssExtractPlugin.loader
        }
      ].concat(loaders)
    }
    return ['style-loader'].concat(loaders)
  }

  const object = {
    css: generateLoaders(),
    less: generateLoaders('less')
  }
  const output = []
  for (let key in object) {
    const loader = object[key];
    output.push({
      test: new RegExp('\\.' + key + '$'),
      use: loader
    })
  }
  return output
}
