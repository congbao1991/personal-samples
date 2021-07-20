import React from 'react'
import { Form, Input, Checkbox } from 'antd'
import CustomOptions from '../custom-options'
import FormItemLabel from '../components/form-item-label'
import FormLayer from '../components/form-layer'

/**
 * 自定义选择框表单
 */

function CustomSelect(props) {

  const onOptionChange = options => {
    props.updateComponentForm(Object.assign(props.currentComponent.form, {options}), props.id)
  }

  return (
    <FormLayer {...props}>
      <Form.Item
        label={<FormItemLabel title="提示性文字" desc="最多20字"/>}
        name="tip"
        rules={[{ required: true, whitespace: true, message: '请输入提示性文字' }]}
      >
        <Input placeholder="请输入提示性文字" maxLength={20} />
      </Form.Item>
      <Form.Item label="选项">
        <CustomOptions value={props.currentComponent.form.options} form_type={props.form_type} form={props.currentComponent} onChange={onOptionChange} />
      </Form.Item>
    </FormLayer>
  )
}

export default CustomSelect
