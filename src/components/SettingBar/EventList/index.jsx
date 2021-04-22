import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Radio, Input } from 'antd'

import { updateComponent } from '@/store/actions'
import Hidden from '@/components/Hidden'
import './index.less'

const { TextArea } = Input

function EventList() {

  const [form] = Form.useForm()
  const crud = useSelector(state => state.crud)
  const dispatch = useDispatch()


  const onValuesChange = (e, events) => {
    dispatch(updateComponent({ events }))
  }

  const init = () => {
    if (!crud.curComponentID) return
    const curComponent = crud.componentList.find(com => com.id === crud.curComponentID)

    // 切换组件更新值的时候，防止报警告，加了个延时
    setTimeout(() => {
      form.setFieldsValue(curComponent.events)
    })
  }

  init()

  return (
    <div className="event-list">
      <Hidden visible={!crud.curComponentID}>请选择组件</Hidden>
      <Hidden visible={crud.curComponentID}>
        <Form
          form={form}
          layout="vertical"
          onValuesChange={onValuesChange}
        >
          <Form.Item label="类型" name="eventType">
            <Radio.Group>
              <Radio.Button value="link">跳转链接</Radio.Button>
              <Radio.Button value="alert">弹窗提示</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="跳转地址或弹窗内容" name="content">
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Hidden>
    </div>
  )
}

export default EventList
