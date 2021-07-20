import React from 'react'
import './index.less'
import PropTypes from 'prop-types'

function FormItemLabel(props) {
  return (
    <div className="form-item-label">
      <span className="form-item-label-title">{props.title}</span>
      <span className="form-item-label-desc">{props.desc}</span>
    </div>
  )
}
FormItemLabel.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string
}

FormItemLabel.defaultProps = {
  title: '',
  desc: ''
}
export default FormItemLabel
