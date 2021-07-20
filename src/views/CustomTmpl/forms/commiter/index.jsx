import React from 'react'
import { Form, Radio } from 'antd'
import FormItemLabel from '../components/form-item-label'
import FormLayer from '../components/form-layer'


function Committer(props) {
  return (
    <FormLayer {...props}>
      <React.Fragment>
        <Form.Item name="default_type" label={<FormItemLabel title="默认值"/>}>
          <Radio.Group>
            <Radio value="commiter">提单人</Radio>
          </Radio.Group>
        </Form.Item>
      </React.Fragment>
    </FormLayer>
  )
}

export default Committer
