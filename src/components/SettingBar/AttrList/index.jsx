import React from 'react'
import { useSelector } from 'react-redux'
import { Form, Input } from 'antd';

import Hidden from '@/components/Hidden'
import AntdPropsFormItems from './AntdPropsFormItems'
import StyleFormItems from './StyleFormItems'
import './index.less'

function AttrList(props) {
  const [form] = Form.useForm();
  const crud = useSelector(state => state.crud)

  let styleKeys = []
  let atndPropsKeys = []

  const init = () => {
    if (!crud.curComponentID) return;
    const curComponent = crud.componentList.find(com => com.id == crud.curComponentID)
    if (!curComponent) {
      styleKeys = []
      atndPropsKeys = []
    } else {
      styleKeys = [...Object.keys(curComponent.style)].filter(key => key !== 'rotate')
      atndPropsKeys = [...Object.keys(curComponent.antdProps)]
    }
  }

  init()

  const onFormLayoutChange = e => {
    console.log(form.getFieldsValue())
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
          <StyleFormItems styleKeys={styleKeys} />
          <AntdPropsFormItems atndPropsKeys={atndPropsKeys} />
        </Form>
      </Hidden>
    </div>
  )

}

export default AttrList
