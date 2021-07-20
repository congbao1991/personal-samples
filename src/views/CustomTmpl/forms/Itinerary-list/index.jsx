import React from 'react'
import { Form, Select } from 'antd'
import FormItemLabel from '../components/form-item-label'
import FormLayer from '../components/form-layer'

const { Option } = Select

/**
 * 行程清单组件
 */

function ItineraryList(props) {
  return (
    <FormLayer {...props} hideTitle>
      <React.Fragment>
        <Form.Item name="date_type" label={<FormItemLabel title="默认值" />}>
          <Select>
            <Option value="YY-MM-DD-hh-mm">年-月-日-时-分</Option>
            <Option value="YY-MM-DD">年-月-日</Option>
          </Select>
        </Form.Item>
      </React.Fragment>
    </FormLayer>
  )
}

export default ItineraryList
