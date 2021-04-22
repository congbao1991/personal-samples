import Loadable from 'react-loadable'

// eslint-disable-next-line new-cap
const LoadableComponent = component => Loadable({
  loader: component,
  loading: () => null,
})

export default LoadableComponent
