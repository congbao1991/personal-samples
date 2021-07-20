import React from 'react'
import { Form, InputNumber, Input } from 'antd'
import FormItemLabel from '../components/form-item-label'
import FormLayer from '../components/form-layer'

/**
 * 事由组件
 */
function Remark(props) {

  const numberValidator = (_, val) => {
    return new Promise((resolve, reject) => {
      if ((/^[1-9]\d*$/.test(val) && val <= 1024) || !val) {
        resolve()
      } else {
        reject(new Error('请输入正确数值，最多1024个字符'))
      }
    })
  }

  return (
    <FormLayer {...props}>
      <React.Fragment>
        <Form.Item
          label={<FormItemLabel title="提示性文字" desc="最多20字" />}
          name="tip"
          rules={[{ required: true, whitespace: true, message: '请输入提示性文字' }]}
        >
          <Input placeholder="请输入提示性文字" maxLength={20} />
        </Form.Item>
        <Form.Item
          label={<FormItemLabel title="字符限制" desc="最多1024个字符" />}
          name="length_limit"
          rules={[{ required: true, message: '请输入字符限制' }, {validator: (_, value) => numberValidator(_, value)}]}
        >
          <InputNumber style={{ width: '100%' }} min={1} max={1024} />
        </Form.Item>
      </React.Fragment>
    </FormLayer>
  )
}

export default Remark
