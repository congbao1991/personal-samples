import React, { useContext } from 'react'
import { Form, Select, Input, Radio, Checkbox } from 'antd'
import FormItemLabel from '../components/form-item-label'
import { CategoryListContext } from '../../context-manager'

const { Option } = Select

/**
 * 时长组件
 */

function CustomDate(props) {
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
    // 只过滤是申请单类型
    return allTypes.filter(i => i.template_type === 2).map(i => ({ text: i.name, value: i.type }))
  }

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
      <Form.Item
        label={<FormItemLabel title="标题1" desc="最多20字" />}
        name="start_time_label"
        rules={[{ required: true, whitespace: true, message: '请输入标题1' }]}
      >
        <Input placeholder="请输入标题1" maxLength={20} />
      </Form.Item>
      <Form.Item
        label={<FormItemLabel title="标题2" desc="最多20字" />}
        name="end_time_label"
        rules={[{ required: true, whitespace: true, message: '请输入标题2' }]}
      >
        <Input placeholder="请输入标题2" maxLength={20} />
      </Form.Item>
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
          <Radio value="empty">无</Radio><br />
          <Radio value="today">默认填充当前日期</Radio><br />
          <Radio value="relation_form">默认共享关联单据时长字段数据</Radio>
          {/* <Form.Item name="default_value" style={{ marginTop: 10 }}>
            <Select>
              {apply_types().map(i => (
                <Option key={i.value} value={i.value} >{i.text}</Option>
              ))}
            </Select>
          </Form.Item> */}
        </Radio.Group>
      </Form.Item>
      <Form.Item label="其他">
        <Form.Item name="required" valuePropName="checked" style={{ marginBottom: 0,
          transform: 'translateY(-7px)' }}>
          <Checkbox>必填</Checkbox>
        </Form.Item>
        <Form.Item name="print" valuePropName="checked" style={{ transform: 'translateY(-7px)' }}>
          <Checkbox>参与打印</Checkbox>
        </Form.Item>
      </Form.Item>
    </Form>
  )
}

export default CustomDate
