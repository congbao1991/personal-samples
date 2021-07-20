import React from 'react'
import { Form, Input, Radio, Checkbox } from 'antd'
import FormItemLabel from '../components/form-item-label'
import FormLayer from '../components/form-layer'

/**
 * 关联客户
 */

function RelateCustomer(props) {

  const runtimeValidator = (_, val) => {
    return new Promise((resolve, reject) => {
      if (!val || val.length === 0) {
        reject(new Error('请选择要展示的客户端'))
      } else {
        resolve()
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
        <Form.Item name="relate_type" label={<FormItemLabel title="关联数据" />}>
          <Radio.Group>
            {/* <Radio value="1">
              手动填写
            </Radio> */}
            <Radio value="external_data" disabled>
              允许关联外部单数据
            </Radio>
            {/* <Form.Item name="order_url">
              <Input />
            </Form.Item> */}
          </Radio.Group>
        </Form.Item>
        <Form.Item name="runtime" rules={[{validator: runtimeValidator}]} label={<FormItemLabel title="展示客户端" />}>
          <Checkbox.Group>
            <Checkbox value="qwh5" style={{marginBottom: 6}}>企业微信H5</Checkbox><br />
            <Checkbox value="wxapp">微信小程序</Checkbox>
          </Checkbox.Group>
        </Form.Item>
      </React.Fragment>
    </FormLayer>
  )
}

export default RelateCustomer
