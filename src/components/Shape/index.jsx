import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cs from 'classname'

import { updateComponent, setCurComponentID } from '@/store/actions'
import Hidden from '@/components/Hidden'
import calculateComponentPositonAndSize from '@/utils/calculateComponentPositonAndSize'
import './index.less'

function Shape(props) {

  const [cursors, setCursors] = useState(null)
  const dispatch = useDispatch()
  const curComponentID = useSelector(state => state.crud.curComponentID)
  const editor = document.querySelector('#editor')

  // 监听鼠标按下事件
  const onShapeMouseDown = e => {

    e.preventDefault()
    e.stopPropagation()

    dispatch(setCurComponentID({ id: props.id }))
    // 记录鼠标起始位置
    const startX = e.clientX
    const startY = e.clientY

    // 获取元素的起始位置
    const { style } = props
    const startTop = Number(style.top)
    const startLeft = Number(style.left)

    const move = moveEvent => {

      const curX = moveEvent.clientX
      const curY = moveEvent.clientY

      const top = curY - startY + startTop
      const left = curX - startX + startLeft

      const pos = {}
      pos.top = top < 0 ? 0 : top
      pos.left = left < 0 ? 0 : left

      dispatch(updateComponent({ style: pos }))
    }

    const up = () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
    }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', up)
  }

  const onPointMouseDown = (e, point) => {
    e.stopPropagation()
    e.preventDefault()

    const { width, height, style } = props

    const calculateStyle = { ...style }
    // 组件宽高比
    const proportion = width / height

    // 组件中心点
    const center = {
      x: calculateStyle.left + width / 2,
      y: calculateStyle.top + height / 2,
    }

    // 获取画布位移信息
    const editorRectInfo = editor.getBoundingClientRect()

    // 当前点击坐标
    const curPoint = {
      x: e.clientX - editorRectInfo.left,
      y: e.clientY - editorRectInfo.top,
    }

    // 获取对称点的坐标
    const symmetricPoint = {
      x: center.x - (curPoint.x - center.x),
      y: center.y - (curPoint.y - center.y),
    }

    // 是否需要保存快照
    // let needSave = false
    let isFirst = true

    const needLockProportion = false

    const move = moveEvent => {
      // 第一次点击时也会触发 move，所以会有“刚点击组件但未移动，组件的大小却改变了”的情况发生
      // 因此第一次点击时不触发 move 事件
      if (isFirst) {
        isFirst = false
        return
      }

      // needSave = true
      const curPositon = {
        x: moveEvent.clientX - editorRectInfo.left,
        y: moveEvent.clientY - editorRectInfo.top,
      }

      calculateStyle.rotate = calculateStyle.rotate || 0
      calculateStyle.width = calculateStyle.width || width
      calculateStyle.height = calculateStyle.height || height

      calculateComponentPositonAndSize(point, calculateStyle, curPositon, proportion, needLockProportion, {
        center,
        curPoint,
        symmetricPoint,
      })
      dispatch(updateComponent({ style: calculateStyle }))
    }

    const up = () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', up)
      // needSave && this.$store.commit('recordSnapshot')
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

  // 获取圆点鼠标悬浮光标样式
  const getCursors = () => {
    // const rotate = mod360(curComponent.style.rotate) // 取余 360
    const result = {}
    let lastMatchIndex = -1 // 从上一个命中的角度的索引开始匹配下一个，降低时间复杂度

    pointList.forEach(point => {
      // const angle = mod360(initialAngle[point] + rotate)
      const angle = initialAngle[point]
      const len = angleToCursor.length
      while (true) {
        lastMatchIndex = (lastMatchIndex + 1) % len
        const angleLimit = angleToCursor[lastMatchIndex]
        if (angle < 23 || angle >= 338) {
          result[point] = 'nw-resize'
          return
        }

        if (angleLimit.start <= angle && angle < angleLimit.end) {
          result[point] = `${angleLimit.cursor}-resize`
          return
        }
      }
    })
    return result
  }

  // 初始化鼠标悬浮光标样式
  if (!cursors) {
    setCursors(getCursors())
  }

  const getPointStyle = point => {
    if (!cursors) {
      return
    }
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
      cursor: cursors[point],
    }
    return style
  }

  // 生成改变组件大小圆点
  const generatePoints = () => (
    pointList.map(point => (
      <Hidden key={point} visible={curComponentID === props.id}>
        <div className="shape-point" onMouseDown={e => onPointMouseDown(e, point)} style={getPointStyle(point)}></div>
      </Hidden>
    ))
  )

  return (
    <div className={cs('shape', { actived: curComponentID === props.id })} onMouseDown={onShapeMouseDown} style={props.style}>
      {generatePoints()}
      {props.children}
    </div>
  )
}

export default Shape
