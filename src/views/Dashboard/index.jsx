import React from 'react'
import { Button } from 'antd'

function Dashboard(props) {

  const linkWorkbench = () => {
    props.history.push('/workbench')
  }

  return (
    <Button onClick={linkWorkbench}>跳转工作台</Button>
  )
}

export default Dashboard
