import React from 'react'
import { useDispatch } from 'react-redux'
import { updateComponent } from '@/store/actions'

import './index.less'

function Shape(props) {

  const dispatch = useDispatch()

  const onShapeMouseDown = e => {

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

  return (
    <div className="shape" onMouseDown={onShapeMouseDown} style={props.style}>
      {props.children}
    </div>
  )
}

export default Shape
