import React from 'react'
import { Form, Input } from 'antd';

import keysMap from '@/constants/attr'
import ColorPicker from '@/components/ColorPicker'

function StyleFormItems(props) {
  return props.styleKeys.map(key => {
    switch (key) {
      case 'color':
        return (
          <Form.Item key={key} label={keysMap[key]} name={key}>
            <ColorPicker />
          </Form.Item>
        )
      default:
        return (
          <Form.Item key={key} label={keysMap[key]} name={key}>
            <Input type="number" />
          </Form.Item>
        )
    }

  })
}

export default StyleFormItems