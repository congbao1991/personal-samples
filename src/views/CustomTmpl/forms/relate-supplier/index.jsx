import React from 'react'
import { Form, Input, Radio } from 'antd'
import FormItemLabel from '../components/form-item-label'
import FormLayer from '../components/form-layer'

/**
 * 关联供应商
 */

function RelateSupplier(props) {
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
        <Form.Item name="staff_create" label={<FormItemLabel title="员工创建供应商" />}>
          <Radio.Group>
            <Radio value="no">不可创建</Radio><br/>
            <Radio value="supplier_bank">可创建： 供应商+银行卡账号</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="supplier_scope" label={<FormItemLabel title="供应商使用范围" />}>
          <Radio.Group>
            <Radio value="all">全部</Radio><br/>
            <Radio value="applicant_company" disabled>同申请人公司</Radio>
          </Radio.Group>
        </Form.Item>
      </React.Fragment>
    </FormLayer>
  )
}

export default RelateSupplier
