import React from 'react'
import { Form, Select, Input, Radio } from 'antd'
import FormItemLabel from '../components/form-item-label'
import FormLayer from '../components/form-layer'

const { Option } = Select

/**
 * 日期组件
 */

function CustomDate(props) {
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
        <Form.Item name="date_type" label={<FormItemLabel title="日期类型" />}>
          <Select>
            <Option value="YY-MM-DD-hh-mm">年-月-日-时-分</Option>
            <Option value="YY-MM-DD">年-月-日</Option>
          </Select>
        </Form.Item>
        <Form.Item name="default_type" label={<FormItemLabel title="默认值" />}>
          <Radio.Group>
            <Radio value="empty">无</Radio><br/>
            <Radio value="today">默认填充当前日期</Radio>
          </Radio.Group>
        </Form.Item>
      </React.Fragment >
    </FormLayer >
  )
}

export default CustomDate
