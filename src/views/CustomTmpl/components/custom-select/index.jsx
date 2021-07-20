/**
 * 选择框
*/
import React from 'react'
import '../styles/custom-select.less'
import { RightOutlined } from '@ant-design/icons'
import Hidden from '@/components/Hidden'
import cs from 'classname'

function CustomSelect(props) {
  return (
    <div className={cs(
      {
        'custom-input': true,
        'custom-select': true,
        'no-border': props.noBorder,
      }
    )}>
      <div>
        {props.componentData.form.label}<Hidden visible={props.componentData.form.required}><span className="required">*</span></Hidden>
      </div>
      <div>
        {props.componentData.form.tip}
      </div>
      <div className="right-out-line">
        <RightOutlined />
      </div>
    </div>
  )
}
export default CustomSelect
