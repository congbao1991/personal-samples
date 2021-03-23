import React from 'react'
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import './index.less'

const generateBtnList = () => {

  const btnList = [
    { text: '按钮', icon: <SearchOutlined /> },
  ]

  const onDragStart = (e, index) => {
    e.dataTransfer.setData('index', index)
  }

  return btnList.map((item, index) => {
    return (
      <Button
        draggable
        onDragStart={(e) => {onDragStart(e, index)}}
        className="item"
        key={item.text}
        icon={item.icon}>
        {item.text}
      </Button>
    )
  })

}

function ComponentBar(props) {

  return (
    <div className="component-list">
      {
        generateBtnList()
      }
    </div>
  )
}

export default ComponentBar
