import React from 'react'
import {Form, Input} from 'antd'
import FormLayer from '../components/form-layer'
import FormItemLabel from '../components/form-item-label'

function CustomArchivesLob(props) {
  return (
    <FormLayer {...props}>
      <Form.Item
        label={<FormItemLabel title="提示性文字" desc="最多20字"/>}
        name="tip"
        rules={[{ required: true, whitespace: true, message: '请输入提示性文字' }]}
      >
        <Input placeholder="请输入提示性文字" maxLength={20} />
      </Form.Item>
    </FormLayer>
  )
}

export default CustomArchivesLob

