import React from 'react'
import { Form, Input, Checkbox } from 'antd'
import FormItemLabel from '../components/form-item-label'
import FormLayer from '../components/form-layer'

function PaymentInfo(props) {
  return (
    <FormLayer {...props}>
      <React.Fragment>
        <Form.Item
          label={<FormItemLabel title="按钮名字" desc="最多15字" />}
          name="tip"
          rules={[{ required: true, whitespace: true, message: '请输入按钮文字' }]}
        >
          <Input maxLength={15}/>
        </Form.Item>
        <Form.Item name="pay_type" label={<FormItemLabel title="启动功能类型" desc="" />}>
          <Checkbox.Group>
            <Checkbox value="pay_arrival" style={{ lineHeight: '32px' }} disabled={props.currentComponent.pay_arrival_fixed}>
              到票支付<br />
              启用后，对公支付单界面显示新建到票支付按钮，用于录入收到发票后申请付款的单据
            </Checkbox>
          </Checkbox.Group>
        </Form.Item>
      </React.Fragment>
    </FormLayer>
  )
}

export default PaymentInfo
