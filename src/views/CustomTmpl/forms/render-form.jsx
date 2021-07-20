/**
 * 匹配指定组件
 */
import React from 'react'
import PropTypes from 'prop-types'
import options from './form-options'

function RenderForm(props) {
  const {currentComponent} = props
  const RenderF = options[currentComponent.name]
  return <RenderF {...props}/>
}

RenderForm.propTypes = {
  currentComponent: PropTypes.object
}
RenderForm.defaultProps = {
  currentComponent: {}
}
export default RenderForm
