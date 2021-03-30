import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form } from 'antd';

import Hidden from '@/components/Hidden'
import ButtonPropsFormItems from './ButtonPropsFormItems'
import StyleFormItems from './StyleFormItems'
import { updateComponent } from '@/store/actions'
import './index.less'

function AttrList(props) {
  const [form] = Form.useForm();
  const crud = useSelector(state => state.crud)
  const dispatch = useDispatch()

  let styleKeys = []
  let antdPropsKeys = []
  let initialValues = {}

  const init = () => {
    if (!crud.curComponentID) return;
    const curComponent = crud.componentList.find(com => com.id == crud.curComponentID)
    if (!curComponent) {
      styleKeys = []
      antdPropsKeys = []
    } else {
      styleKeys = [...Object.keys(curComponent.style)].filter(key => key !== 'rotate')
      antdPropsKeys = [...Object.keys(curComponent.antdProps)]
    }
    initialValues = {
      ...curComponent.antdProps,
      ...curComponent.style
    }

    // 切换组件更新值的时候，防止报警告，加了个延时
    setTimeout(() => {
      form.setFieldsValue(initialValues)
    })
  }

  init()

  const onValuesChange = e => {
    let values = form.getFieldsValue();
    console.log(values)
    let style = {};
    let antdProps = {};
    styleKeys.forEach(key => {
      switch (key) {
        case 'color':
          style[key] = values[key]
          break;
        default:
          style[key] = Number(values[key])
          break;
      }
    })
    antdPropsKeys.forEach(key => {
      antdProps[key] = values[key]
    })
    dispatch(updateComponent({ style, antdProps }))
  }

  return (
    <div className="attr-list">
      <Hidden visible={!crud.curComponentID}>请选择组件</Hidden>
      <Hidden visible={crud.curComponentID}>
        <Form
          layout="vertical"
          form={form}
          initialValues={initialValues}
          onValuesChange={onValuesChange}
        >
          <ButtonPropsFormItems antdPropsKeys={antdPropsKeys} />
          <StyleFormItems styleKeys={styleKeys} />
        </Form>
      </Hidden>
    </div>
  )

}

export default AttrList
