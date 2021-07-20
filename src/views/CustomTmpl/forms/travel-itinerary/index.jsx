import React from 'react'
import { Checkbox, Form, Select } from 'antd'
import FormItemLabel from '../components/form-item-label'

const { Option } = Select

function TravelItinerary(props) {
  return (
    <Form
      layout="vertical"
      labelAlign="right"
      name="customInput"
      onValuesChange={props.updateComponentForm}
      ref={props.formRef}
      onFinish={() => props.onFormFinish('success')}
      onFinishFailed={() => props.onFormFinish('error')}
    >
      <Form.Item name="date_type" label={<FormItemLabel title="日期类型" />}>
        <Select>
          <Option value="YY-MM-DD-hh-mm">年-月-日-时-分</Option>
          <Option value="YY-MM-DD">年-月-日</Option>
        </Select>
      </Form.Item>
      <Form.Item label="其他">
        <Form.Item name="required" valuePropName="checked" style={{ marginBottom: 0, transform: 'translateY(-7px)' }}>
          <Checkbox disabled={props.currentComponent.required_fixed}>必填</Checkbox>
        </Form.Item>
        <Form.Item name="print" valuePropName="checked">
          <Checkbox disabled={props.currentComponent.required_fixed} style={{ transform: 'translateY(-9px)' }}>参与打印</Checkbox>
        </Form.Item>
      </Form.Item>
    </Form>
  )
}

export default TravelItinerary
