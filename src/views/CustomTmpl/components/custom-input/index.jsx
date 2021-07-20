/**
 * 单行文本控件
*/
import React from 'react'
import PropTypes from 'prop-types'
import cs from 'classname'
import Hidden from '@/components/Hidden'
import '../styles/custom-input.less'

function CustomInput(props) {
  return (
    <div>
      <div className={cs(
        {
          'custom-area': props.componentData.inputType === 'textarea',
          'custom-input': props.componentData.inputType !== 'textarea',
          'no-border': props.noBorder,
        }
      )}
      >
        <div>
          {props.componentData.form.label}<Hidden visible={props.componentData.form.required}><span style={{ color: '#FF3B30' }}>*</span></Hidden>
        </div>
        <div>
          {props.componentData.form.tip}
        </div>
      </div>
    </div>
  )
}

CustomInput.propTypes = {
  componentData: PropTypes.object,
  label: PropTypes.string,
  tip: PropTypes.string
}

CustomInput.defaultProps = {
  componentData: {
    form: {}
  },
  label: '',
  tip: ''
}

export default CustomInput
