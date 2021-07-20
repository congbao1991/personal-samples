/**
 * 附件表单
 */
import React from 'react'
// import {Form, InputNumber} from 'antd'
import FormLayer from '../components/form-layer'
// import FormItemLabel from '../components/form-item-label'

function CustomAttachForm(props) {
  return (
    <FormLayer {...props} hidePrint>
      {/* <React.Fragment>
        <Form.Item
          label={<FormItemLabel title="附件大小限制"/>}
          name="max_file_size"
        >
          <InputNumber style={{width: '100px'}} min={0} max={200} className="custom-attach-form-input-number"/>
        </Form.Item>
      </React.Fragment> */}
    </FormLayer>
  )
}

export default CustomAttachForm
