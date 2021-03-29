import React from 'react'
import { Form, Select } from 'antd';

const { Option } = Select;

const keysMap = {
  type: '按钮类型',
  shape: '按钮形状'
}

const TYPE_OPTIONS = [
  { label: 'primary', value: 'primary ' },
  { label: 'danger', value: 'danger ' },
  { label: 'ghost', value: 'ghost ' },
  { label: 'dashed', value: 'dashed ' },
  { label: 'link', value: 'link ' },
  { label: 'text', value: 'text ' },
  { label: 'default', value: 'default' },
]

const SHAPE_OPTIONS = [
  { label: 'circle', value: 'circle ' },
  { label: 'round', value: 'round ' },
  { label: 'default', value: 'default'}
]

function ButtonPropsFormItems(props) {
  const generateFormItems = (key) => {
    switch (key) {
      case 'type':
        return (
          <Select>
            {
              TYPE_OPTIONS.map(opt => {
                return (
                  <Option key={opt.value} value={opt.value}>{opt.label}</Option>
                )
              })
            }
          </Select>
        )
      case 'shape':
        return (
          <Select>
            {
              SHAPE_OPTIONS.map(opt => {
                return (
                  <Option key={opt.value} value={opt.value}>{opt.label}</Option>
                )
              })
            }
          </Select>
        )
    }
  }

  return props.antdPropsKeys.map(key => {
    return (
      <Form.Item key={key} label={keysMap[key]} name={key}>
        {generateFormItems(key)}
      </Form.Item>
    )
  })
}

export default ButtonPropsFormItems