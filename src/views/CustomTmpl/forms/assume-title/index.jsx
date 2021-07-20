import React from 'react'
import { Form, Radio, Input } from 'antd'
import FormItemLabel from '../components/form-item-label'
import FormLayer from '../components/form-layer'


function Title(props) {
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
        <Form.Item name="default_type" label={<FormItemLabel title="默认值" />}>
          <Radio.Group>
            <Radio value="empty">默认为空， 自动选择历史值</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="source" label={<FormItemLabel title="取值范围" />}>
          <Radio.Group>
            <Radio value="all">全部公司抬头</Radio>
          </Radio.Group>
        </Form.Item>
      </React.Fragment>
    </FormLayer>
  )
}

export default Title
