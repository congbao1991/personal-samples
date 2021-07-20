import React from 'react'
import './index.less'
import PropTypes from 'prop-types'
import { Checkbox, Form, Input } from 'antd'
import Hidden from '@/components/Hidden'
import FormItemLabel from '../form-item-label'

function FormLayer(props) {
  return (
    <Form
      layout="vertical"
      labelAlign="right"
      name="customInput"
      onValuesChange={props.updateComponentForm}
      ref={props.formRef}
      className="custom-tmpl-formlayer"
      onFinish={() => props.onFormFinish('success')}
      onFinishFailed={() => props.onFormFinish('error')}
    >
      <Hidden visible={!props.hideTitle}>
        <Form.Item
          label={<FormItemLabel title="标题" desc="最多6个字" />}
          style={{ marginTop: 5 }}
          name="label"
          rules={[{ required: true, whitespace: true, message: '请输入标题' }]}
        >
          <Input placeholder="请输入标题" maxLength={6} />
        </Form.Item>
      </Hidden>
      {props.children}
      <Form.Item label="其他">
        <Form.Item name="required" valuePropName="checked" style={{
          marginBottom: 0,
          transform: 'translateY(-5px)'
        }}>
          <Checkbox disabled={props.currentComponent.required_fixed}>必填</Checkbox>
        </Form.Item>
        <Form.Item name="print" valuePropName="checked" style={{ transform: 'translateY(-9px)' }}>
          <Checkbox disabled={props.currentComponent.print_fixed}>参与打印</Checkbox>
        </Form.Item>
      </Form.Item>
    </Form>
  )
}
FormLayer.propTypes = {
  updateComponentForm: PropTypes.func,
  hideTitle: PropTypes.bool,
  // formRef: PropTypes.oneOfType([
  //   PropTypes.func,
  //   PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  // ])
}

FormLayer.defaultProps = {
  updateComponentForm: () => { },
  hideTitle: false
  // formRef: {
  //   current: null
  // }
}
export default FormLayer
