import React from 'react'
import { Timeline } from 'antd'
import { Link } from 'react-router-dom'

function randomColor() {
  let str = '#'
  for (let i = 0; i < 6; i++) {
    str += Math.floor(Math.random() * 16).toString(16)
  }
  return str
}

function DashboardTimeline() {

  return (
    <Timeline style={{marginLeft: 30, marginTop: 30}}>
      <Timeline.Item color={randomColor()}>
        <Link to="/workbench">拖拽组件构建页面Demo</Link>
      </Timeline.Item>
      <Timeline.Item color={randomColor()}>
        <Link to="/approval-flow">审批流树状可视配置Demo</Link>
      </Timeline.Item>
    </Timeline>
  )
}

export default DashboardTimeline
