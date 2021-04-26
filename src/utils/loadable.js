import Loadable from 'react-loadable'


const requireContext = require.context('@/views', true, /\.jsx$/, 'lazy')
const requireContextKeys = requireContext.keys()
const getComponentPath = path => {
  const reg = new RegExp(/\/:.*$/g)
  const newPath = path.replace(reg, '')
  return requireContextKeys.find(n => n === `.${newPath}.jsx` || n === `.${newPath}/index.less`)
}

export const Loading = props => {
  if (props.error) {
    console.log(props.error)
    return `加载错误${props.error}`
  }
  if (props.timedOut) {
    return '加载超时'
  }
  if (props.pastDelay) {
    return '正在加载中...'
  }
  return null
}

// eslint-disable-next-line new-cap
export default path => Loadable({
  loader: () => requireContext(getComponentPath(path)),
  loading: Loading,
  delay: 200,
  timeout: 10000,
})
