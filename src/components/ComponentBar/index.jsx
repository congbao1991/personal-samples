import React from 'react'
import { Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import COMPONENT_LIST from '@/constants/components'
import './index.less'

const generateBtnList = () => {

  const btnList = COMPONENT_LIST.map(item => (
    {
      text: item.label,
      icon: <SearchOutlined />
    }
  ))

  const onDragStart = (e, index) => {
    e.dataTransfer.setData('index', index)
  }

  return btnList.map((item, index) => (
    <Button
      draggable
      onDragStart={(e) => { onDragStart(e, index) }}
      className="item"
      key={item.text}
      icon={item.icon}>
      {item.text}
    </Button>
  ))

}

function ComponentBar() {

  return (
    <div className="component-list">
      {
        generateBtnList()
      }
    </div>
  )
}

export default ComponentBar
