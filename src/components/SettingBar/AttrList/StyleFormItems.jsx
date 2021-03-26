import React from 'react'
import { Form, Input } from 'antd';

import keysMap from '@/constants/attr'

function StyleFormItems(props) {
  return props.styleKeys.map(key => {
    return (
      <Form.Item key={key} label={keysMap[key]} name={key}>
        <Input type="number" />
      </Form.Item>
    )
  })
}

export default StyleFormItems