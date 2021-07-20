/**
 * 明细表单
*/
import React from 'react'
import {Form, Input} from 'antd'
import FormItemLabel from '../components/form-item-label'
import FormLayer from '../components/form-layer'

function CustomDetailedForm(props) {
  return (
    <div className="custom-detailed-form">
      <FormLayer {...props} hideRequired={props.currentComponent.name === 'custom_detailed'}>
        <Form.Item
          label={<FormItemLabel title="按钮名称" desc="最多15字"/>}
          name="tip"
          rules={[{ required: true, whitespace: true, message: '请输入按钮文字' }]}
        >
          <Input placeholder="请输入按钮名称" maxLength={15}/>
        </Form.Item>
      </FormLayer>
    </div>
  )
}

export default CustomDetailedForm
