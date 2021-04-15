import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Tag } from 'antd'
import cs from 'classname'

import animations from '@/constants/animate'
import Hidden from '@/components/Hidden'
import { updateComponent } from '@/store/actions'
import './index.less'

function AnimateList(props) {
  const [animates, setAnimates] = useState(animations)
  const curComponentID = useSelector(state => state.crud.curComponentID)
  const dispatch = useDispatch()

  // 鼠标悬浮添加预览动画
  const addAnimate = (e, animate) => {
    e.preventDefault()
    e.stopPropagation()
    let anis = JSON.parse(JSON.stringify(animates))
    // 先把所有的状态设置为false,后续再把悬浮的目标加上动画class
    anis.forEach(item => {
      item.show = false
    })
    let index = anis.findIndex(i => i.value === animate.value)
    anis[index].show = true
    setAnimates(anis)
  }

  // 更新组件动画列表
  const updateCompAnimate = (e, item) => {
    e.preventDefault()
    e.stopPropagation()
    let animations = []
    if (item.value) {
      animations.push(item.value)
    }
    dispatch(updateComponent({ animations }))
  }

  return (
    <div className="animate-list-container">
      <Hidden visible={!curComponentID}>请选择组件</Hidden>
      <Hidden visible={curComponentID}>
        {
          animates.map(item => {
            return (
              <Tag
                onMouseEnter={(e) => { addAnimate(e, item) }}
                onClick={(e) => { updateCompAnimate(e, item) }}
                className={cs("animate-tag", { ['animate__' + item.value]: item.show })}
                key={item.value}>
                {item.label}
              </Tag>
            )
          })
        }
      </Hidden>
    </div>
  )
}

export default AnimateList
