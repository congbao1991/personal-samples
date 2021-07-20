import React from 'react'
import PropTypes from 'prop-types'
import CustomSelect from '../custom-select'

function FormItemLabel(props) {
  const {form} = props.componentData
  return (
    <React.Fragment>
      <CustomSelect noBorder={props.noBorder} componentData={{form: {
        label: form.start_time_label, tip: form.tip, required: form.required}
      }}/>
      <CustomSelect componentData={{form: {
        label: form.end_time_label, tip: form.tip, required: form.required}
      }}/>
      <CustomSelect componentData={{form: {
        label: '时长', required: form.required} }}/>
    </React.Fragment>
  )
}

FormItemLabel.propTypes = {
  componentData: PropTypes.object
}

FormItemLabel.defaultProps = {
  componentData: {}
}
export default FormItemLabel
