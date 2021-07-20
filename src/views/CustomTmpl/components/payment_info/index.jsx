import React from 'react'
import './index.less'

function ReimbursementList(props) {
  return (
    <div className="payment-info">
      <p>{props.componentData.form.label} <span className="ant-form-item-required">*</span></p>
      <div className="payment-info-btn">
        <div>{props.componentData.form.tip}</div>
      </div>
    </div>
  )
}
export default ReimbursementList
