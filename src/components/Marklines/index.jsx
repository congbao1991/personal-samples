import React, { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateComponent } from '@/store/actions'

import './index.less'

function Marklines() {

  const componentList = useSelector(state => state.crud.componentList)
  const curComponentID = useSelector(state => state.crud.curComponentID)
  const currentComponent = componentList.find(com => com.id === curComponentID)

  const dispatch = useDispatch()

  const xLines = []
  const yLines = []
  let timer = null
  const nearly = (current, target, direction = 'top') => {
    clearTimeout(timer)
    if (Math.abs(current - target) < 3) {
      const style = {
        [direction]: current
      }
      timer = setTimeout(() => {
        dispatch(updateComponent({ style }))
      })
      return true
    }
    return false
  }

  componentList.forEach(component => {
    if (component.id === curComponentID || !curComponentID) return
    const { style } = component
    const { style: curStyle } = currentComponent
    // 展示X轴顶部对齐线条
    nearly(curStyle.top, style.top)
    nearly(curStyle.top, Math.floor(style.top + style.height))

    if (style.top === curStyle.top || Math.floor(style.top + style.height) === curStyle.top) {
      xLines.push({
        top: curStyle.top
      })
      return
    }

    // 展示X轴中线
    if (Math.floor(style.top + style.height / 2) === Math.floor(curStyle.top + curStyle.height / 2)) {
      xLines.push({
        top: Math.floor(curStyle.top + curStyle.height / 2)
      })
      return
    }
    // 展示X轴底部对齐线条
    if (Math.floor(style.top + style.height) === Math.floor(curStyle.top + curStyle.height) || Math.floor(style.top) === Math.floor(curStyle.top + curStyle.height)) {
      xLines.push({
        top: Math.floor(curStyle.top + curStyle.height)
      })
      return
    }
    // 展示y轴左边对齐线条
    if (style.left === curStyle.left || style.right === curStyle.left) {
      yLines.push({
        left: curStyle.left
      })
      return
    }
    // 展示y轴中间对齐线条
    if (Math.floor(style.left + style.width / 2) === Math.floor(curStyle.left + curStyle.width / 2)) {
      yLines.push({
        left: Math.floor(curStyle.left + curStyle.width / 2)
      })
      return
    }
    // 展示y轴右边边对齐线条
    if (Math.floor(style.left + style.width) === Math.floor(curStyle.left + curStyle.width) || Math.floor(style.left) === Math.floor(curStyle.left + curStyle.width)) {
      yLines.push({
        left: Math.floor(curStyle.left + curStyle.width)
      })
    }
  })

  return (
    <Fragment>
      {
        xLines.map((line, index) => (
          <div className="xc-marklines-x" key={index} style={line}></div>
        ))
      }
      {
        yLines.map((line, index) => (
          <div className="xc-marklines-y" key={index} style={line}></div>
        ))
      }
    </Fragment>
  )
}

export default Marklines
