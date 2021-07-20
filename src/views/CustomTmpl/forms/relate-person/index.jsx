import React from 'react'
import { Form, Input, Radio } from 'antd'
import FormItemLabel from '../components/form-item-label'
import FormLayer from '../components/form-layer'
/**
 * 相关人组件表单
 */

function RelatePerson(props) {
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
        <Form.Item name="safety_control" label={<FormItemLabel title="参与人控件安全设置" />}>
          <Radio.Group>
            <Radio value="0" style={{marginBottom: 6}}>全部</Radio><br/>
            <Radio value="1" disabled style={{marginBottom: 6}}>同申请人公司</Radio><br/>
            <Radio value="2" disabled style={{marginBottom: 6}}>同申请人部门</Radio><br/>
            <Radio value="3" disabled style={{marginBottom: 6}}>同申请人部门(含子部门)</Radio><br/>
            <Radio value="4" disabled style={{marginBottom: 6}}>同单据部门</Radio>
          </Radio.Group>
        </Form.Item>
      </React.Fragment>
    </FormLayer>
  )
}

export default RelatePerson
