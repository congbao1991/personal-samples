import React from 'react'
import './index.less'

function ReimbursementList(props) {
  return (
    <div className="get-list">
      <h1 className="fee-list-title"><span className="label">{props.componentData.form.label}</span><span className="required">*</span></h1>
      <img className="img"
        src="https://apg-1258944054.cos.ap-guangzhou.myqcloud.com/apg/wbx-qwapp/reimburse/no-data.png"></img>
      <div className="button">
        <div id="choose-invoice" className="btn btn-primary btn-large">
          {props.componentData.form.tip}
        </div>
      </div>
      {/* <div className="split"></div> */}
    </div>
  )
}
export default ReimbursementList
