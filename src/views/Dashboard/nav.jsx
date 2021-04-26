import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'

const MENU_LIST = [
  {
    key: 'dashboard',
    label: '首页',
    path: '/'
  },
  {
    key: 'test',
    label: '测试',
    path: '/workbench'
  }
]

function Nav() {

  const [current, setCurrent] = useState('dashboard')

  const handleClick = e => {
    console.log(e)
  }

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      {
        MENU_LIST.map(menu => (
          <Menu.Item key={menu.key}>
            <Link to={menu.path}>{menu.label}</Link>
          </Menu.Item>
        ))
      }
    </Menu>
  )
}

export default Nav
