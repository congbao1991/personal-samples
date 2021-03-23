import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateComponent } from '@/store/actions'

import './index.less'

function Shape(props) {

  const dispatch = useDispatch()

  // 监听鼠标按下事件
  const onShapeMouseDown = e => {

    const [cursors, setCursors] = useState({})

    // 记录鼠标起始位置
    let startX = e.clientX;
    let startY = e.clientY;

    // 获取元素的起始位置
    const { style } = props
    let startTop = Number(style.top);
    let startLeft = Number(style.left);

    const move = moveEvent => {

      let curX = moveEvent.clientX;
      let curY = moveEvent.clientY;

      let top = curY - startY + startTop
      let left = curX - startX + startLeft

      let pos = {}
      pos.top = top < 0 ? 0 : top;
      pos.left = left < 0 ? 0 : left;

      dispatch(updateComponent({ id: props.id, style: pos }))

    }

    const up = () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }

  // 八个方向圆点
  const pointList = ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l']

  // 每个点对应的初始角度
  const initialAngle = {
    lt: 0,
    t: 45,
    rt: 90,
    r: 135,
    rb: 180,
    b: 225,
    lb: 270,
    l: 315,
  }

  // 每个范围的角度对应的光标
  const angleToCursor = [
    { start: 338, end: 23, cursor: 'nw' },
    { start: 23, end: 68, cursor: 'n' },
    { start: 68, end: 113, cursor: 'ne' },
    { start: 113, end: 158, cursor: 'e' },
    { start: 158, end: 203, cursor: 'se' },
    { start: 203, end: 248, cursor: 's' },
    { start: 248, end: 293, cursor: 'sw' },
    { start: 293, end: 338, cursor: 'w' },
  ]

  const getPointStyle = point => {
    const { width, height } = props
    const hasT = /t/.test(point)
    const hasB = /b/.test(point)
    const hasL = /l/.test(point)
    const hasR = /r/.test(point)
    let newLeft = 0
    let newTop = 0

    // 四个角的点
    if (point.length === 2) {
      newLeft = hasL ? 0 : width
      newTop = hasT ? 0 : height
    } else {
      // 上下两点的点，宽度居中
      if (hasT || hasB) {
        newLeft = width / 2
        newTop = hasT ? 0 : height
      }

      // 左右两边的点，高度居中
      if (hasL || hasR) {
        newLeft = hasL ? 0 : width
        newTop = Math.floor(height / 2)
      }
    }

    const style = {
      marginLeft: -4,
      marginTop: -4,
      left: newLeft,
      top: newTop,
      // cursor: this.cursors[point],
    }
    return style
  }

  // 生成改变组件大小圆点
  const generatePoints = () => {
    return pointList.map(point => {
      return (
        <div className="shape-point" key={point} style={getPointStyle(point)}></div>
      )
    })
  }

  return (
    <div className="shape" onMouseDown={onShapeMouseDown} style={props.style}>
      {generatePoints()}
      {props.children}
    </div>
  )
}

export default Shape
