import React from 'react'
import { useSelector } from 'react-redux'
import { Form, Input } from 'antd';

import Hidden from '@/components/Hidden'
import './index.less'

function AttrList(props) {
  const [form] = Form.useForm();
  const crud = useSelector(state => state.crud)

  const onFormLayoutChange = e => {
    console.log(e)
  }

  return (
    <div className="attr-list">
      <Hidden visible={!crud.curComponentID}>请选择组件</Hidden>
      <Hidden visible={crud.curComponentID}>
        <Form
          layout="vertical"
          form={form}
          onValuesChange={onFormLayoutChange}
        >
          <Form.Item label="Field A" name="a">
            <Input placeholder="input placeholder" />
          </Form.Item>
        </Form>
      </Hidden>
    </div>
  )

}

export default AttrList
