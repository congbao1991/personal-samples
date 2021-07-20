import React, {useState} from 'react'
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

  const [colorMap] = useState({
    color1: randomColor(),
    color2: randomColor(),
    color3: randomColor(),
  })

  return (
    <Timeline style={{marginLeft: 30, marginTop: 30}}>
      <Timeline.Item color={colorMap.color1}>
        <Link to="/workbench" style={{color: colorMap.color1}}>拖拽组件构建页面Demo</Link>
      </Timeline.Item>
      <Timeline.Item color={colorMap.color2}>
        <Link to="/approval-flow" style={{color: colorMap.color2}}>审批流树状可视配置Demo</Link>
      </Timeline.Item>
      <Timeline.Item color={colorMap.color3}>
        <Link to="/time-selector" style={{color: colorMap.color3}}>拖拽框选时间选择器</Link>
      </Timeline.Item>
    </Timeline>
  )
}

export default DashboardTimeline
