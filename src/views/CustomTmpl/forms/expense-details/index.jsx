import React from 'react'
import { Form, Input } from 'antd'
import FormItemLabel from '../components/form-item-label'
import FormLayer from '../components/form-layer'

/**
 * 报销清单组件
 */
function ExpenseDetails(props) {
  return (
    <FormLayer {...props}>
      <React.Fragment>
        <Form.Item
          label={<FormItemLabel title="按钮文字" desc="最多20字" />}
          name="tip"
          rules={[{ required: true, whitespace: true, message: '请输入按钮文字' }]}
        >
          <Input />
        </Form.Item>
      </React.Fragment>
    </FormLayer>
  )
}

export default ExpenseDetails
