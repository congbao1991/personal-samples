import React from 'react'
import {Checkbox, Form, Select} from 'antd'
import FormItemLabel from '../components/form-item-label'

const {Option} = Select

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
      <Form.Item name="des_apply_type" label={<FormItemLabel title="可核销的借款单类型" />}>
        <Select>
          <Option value="all">全部借款单</Option>
          <Option value="individual">个人借款单</Option>
          <Option value="reserve_fund">备用金借款单</Option>
        </Select>
      </Form.Item>
      <Form.Item name="required" valuePropName="checked">
        <Checkbox>必填</Checkbox>
      </Form.Item>
      <Form.Item name="print" valuePropName="checked">
        <Checkbox>参与打印</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default TravelItinerary
