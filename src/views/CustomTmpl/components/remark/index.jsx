/**
 * 承担主体控件
*/
import React from 'react'
import '../styles/custom-select.less'

function Remark(props) {

  return (
    <div className="committer">
      <div>
        {props.componentData.form.label}
      </div>
      <div>
        {props.componentData.form.tip}
      </div>
    </div>
  )
}

export default Remark
