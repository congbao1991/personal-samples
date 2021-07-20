import React, { useContext } from 'react'
import { Form, Input, Radio, Select, Checkbox } from 'antd'
import FormItemLabel from '../components/form-item-label'
import FormLayer from '../components/form-layer'
import { CategoryListContext } from '../../context-manager'

const { Option } = Select

/**
 * 关联单据内部
 */

function RelateInsideApply(props) {
  const categoryList = useContext(CategoryListContext)


  const apply_types = () => {
    let allTypes = []
    categoryList.forEach(i => {
      if (i.receipts) {
        allTypes = [...allTypes, ...i.receipts]
      }
    })
    let params = sessionStorage.getItem('custom_doc_tmpl_query')
    if (params) {
      params = JSON.parse(params)
    }
    return allTypes.filter(i => i.template_type === 2).map(i => ({ text: i.name, value: i.type }))
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
        <Form.Item name="relation_apply_type" label={<FormItemLabel title="可关联申请单类型" />}>
          <Select placeholder="全部" mode="multiple">
            {apply_types().map(i => (
              <Option key={i.value} value={i.value} >{i.text}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="limit_apply_range" label={<FormItemLabel title="限制可关联申请单的范围" />}>
          <Checkbox.Group>
            <Checkbox value="bear_reimburse_apply" disabled>限制承担/报销人提交的申请单</Checkbox>
          </Checkbox.Group>
        </Form.Item>
        <Form.Item name="limit_apply_number" label={<FormItemLabel title="关联申请单张数限制" />}>
          <Radio.Group>
            <Radio value="multiple">可以关联多张(行程时间需连续)</Radio>
          </Radio.Group>
        </Form.Item>
      </React.Fragment>
    </FormLayer>
  )
}

export default RelateInsideApply
