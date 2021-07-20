import React from 'react'

import './index.less'

function FeeInfo(props) {
  return (
    <div className="get-invoice">
      <h1 className="fee-list-title"><span className="label">{props.componentData.form.label}</span><span className="required">*</span></h1>
      <img className="img"
        src="https://apg-1258944054.cos.ap-guangzhou.myqcloud.com/apg/wbx-qwapp/reimburse/step-1/add_bg.png"></img>
      <div className="tip">选择发票，自动生成费用明细</div>
      <div className="button">
        <div id="choose-invoice" className="btn btn-primary btn-large">
          {props.componentData.form.tip || '添加发票'}
        </div>
      </div>
      <div id="choose-manual-invoice" className="expense-add">
        <div>
          <span className="font-size-26 underline">没有发票？手动录入金额</span>
        </div>
      </div>
      <div className="split"></div>
    </div>
  )
}
export default FeeInfo
