/**
 * 分栏表单
*/
import React from 'react'
import FormLayer from '../components/form-layer'

function CustomDetailedForm(props) {
  return (
    <div className="custom-detailed-form">
      <FormLayer {...props} hideRequired={props.currentComponent.name === 'custom_columns' || props.currentComponent.name === 'custom_detailed'}>
      </FormLayer>
    </div>
  )
}

export default CustomDetailedForm
