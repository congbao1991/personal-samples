import React from 'react'
import { Form, Input, InputNumber, Radio, Select, Checkbox} from 'antd'
import Hidden from '@/components/Hidden'
import FormItemLabel from '../components/form-item-label'
import FormLayer from '../components/form-layer'

const { Option } = Select

function CustomInput(props) {
  /**
   * props.type: input-单行文本组件 textarea-多行文本组件 number-数字组件 amount-金额组件
   */

  // number text textarea
  const inputType = props.currentComponent.inputType

  const numberValidator = (_, val) => {
    return new Promise((resolve, reject) => {
      if ((/^[1-9]\d*$/.test(val) && val <= 250) || !val) {
        resolve()
      } else {
        reject(new Error('请输入正确数值'))
      }
    })
  }

  const fillTextValidator = (_, val) => {
    const length_limit = props.formRef.current.getFieldValue('length_limit')
    return new Promise((resolve, reject) => {
      if (!length_limit) {
        reject(new Error('请输入字符限制'))
      } else if (val && val.length > length_limit) {
        reject(new Error('超出字符限制'))
      } else {
        resolve()
      }
    })
  }

  return (
    <FormLayer {...props}>
      <React.Fragment>
        <Form.Item
          required
          label={<FormItemLabel title="提示性文字" desc="最多20字"/>}
          name="tip"
          rules={[{ required: true, whitespace: true, message: '请输入提示性文字' }]}
        >
          <Input placeholder="请输入提示性文字" maxLength={20} />
        </Form.Item>
        <Hidden visible={ typeof props.currentComponent.form.length_limit !== 'undefined'}>
          <Form.Item
            required
            label={<FormItemLabel title="字符限制" desc="支持输入1-200个字符"/>}
            name="length_limit"
            rules={[{ required: true, message: '请输入字符限制' }, {validator: (_, value) => numberValidator(_, value)}]}
          >
            <InputNumber style={{ width: '100%' }} min={1} max={200} />
          </Form.Item>
        </Hidden>
        <React.Fragment>
          <Form.Item
            label="数字格式"
          >
            <div style={{ display: 'flex',
              alignItems: 'center' }}>
              <span>精确到&nbsp;&nbsp;</span>
              <Form.Item name="decimal_length" style={{
                display: 'inline-block',
                marginBottom: 0
              }}
              rules={[{ required: true, message: '请选择' }]}>
                <Select style={{ width: 50 }}>
                  <Option value={0}>0</Option>
                  <Option value={1}>1</Option>
                  <Option value={2}>2</Option>
                </Select>
              </Form.Item>
              <span>&nbsp;&nbsp;位小数</span>
            </div>
          </Form.Item>
          {/* <Form.Item
            required
            label={<FormItemLabel title="取值规则"/>}
            name="value_rules"
            valuePropName="checked"
          >
            <Checkbox value="submitter_fill">由填单人填写</Checkbox>
          </Form.Item> */}
        </React.Fragment>
        <React.Fragment r-else>
          <Form.Item name="default_type" label={<FormItemLabel title="默认值"/>}>
            <Radio.Group>
              <Radio value="empty">无</Radio><br/>
              {/* <Radio value="fill_form_data">默认填充 报销人 员工表单中的 职级 字段</Radio><br/> */}
              <Radio value="fill_text">默认填充固定文本</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label=""
            name="default_value"
            rules={[{validator: (_, value) => fillTextValidator(_, value)}]}
          >
            <Input.TextArea placeholder="请输入默认填充文本"/>
          </Form.Item>
        </React.Fragment>
      </React.Fragment>
    </FormLayer>
  )
}

export default CustomInput
