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

  const colors = {
    1: randomColor(),
    2: randomColor(),
    3: randomColor(),
  }

  return (
    <Timeline style={{marginLeft: 30, marginTop: 30}}>
      <Timeline.Item color={colors[1]}>
        <Link to="/workbench" style={{color: colors[1]}}>拖拽组件构建页面Demo</Link>
      </Timeline.Item>
      <Timeline.Item color={colors[2]}>
        <Link to="/approval-flow" style={{color: colors[2]}}>审批流树状可视配置Demo</Link>
      </Timeline.Item>
      <Timeline.Item color={colors[3]}>
        <Link to="/time-selector" style={{color: colors[3]}}>拖拽时间选择器</Link>
      </Timeline.Item>
    </Timeline>
  )
}

export default DashboardTimeline
