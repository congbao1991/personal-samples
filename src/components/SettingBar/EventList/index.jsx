import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Radio, Input } from 'antd'

import { updateComponent } from '@/store/actions'
import './index.less'

const { TextArea } = Input;

function EventList(props) {

  const [form] = Form.useForm();
  const crud = useSelector(state => state.crud)
  const dispatch = useDispatch()


  const onValuesChange = (e, form) => {
    dispatch(updateComponent({events: form}))
  }

  const init = () => {
    if (!crud.curComponentID) return;
    const curComponent = crud.componentList.find(com => com.id == crud.curComponentID)

    // 切换组件更新值的时候，防止报警告，加了个延时
    setTimeout(() => {
      form.setFieldsValue(curComponent.events)
    })
  }

  init()

  return (
    <div className="event-list">
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
    </div>
  )
}

export default EventList