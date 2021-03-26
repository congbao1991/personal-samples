import React from 'react'
import { Form, Input } from 'antd';

function AntdPropsFormItems(props) {
  return props.atndPropsKeys.map(key => {
    return (
      <Form.Item key={key} label={keysMap[key]} name={key}>
        <Input type="number" />
      </Form.Item>
    )
  })
}

export default AntdPropsFormItems