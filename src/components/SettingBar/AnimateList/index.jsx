import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Tag } from 'antd'
import cs from 'classname'
import { CheckCircleOutlined } from '@ant-design/icons'
import animations from '@/constants/animate'
import Hidden from '@/components/Hidden'
import { updateComponent } from '@/store/actions'
import './index.less'

function AnimateList() {
  const [animates, setAnimates] = useState(animations)
  const curComponentID = useSelector(state => state.crud.curComponentID)
  const componentList = useSelector(state => state.crud.componentList)
  const dispatch = useDispatch()

  // 鼠标悬浮添加预览动画
  const addAnimate = (e, animate) => {
    e.preventDefault()
    e.stopPropagation()
    const anis = JSON.parse(JSON.stringify(animates))
    // 先把所有的状态设置为false,后续再把悬浮的目标加上动画class
    anis.forEach(item => {
      item.show = false
    })
    const index = anis.findIndex(i => i.value === animate.value)
    anis[index].show = true
    setAnimates(anis)
  }

  // 移除全部预览动画
  const removeAnimate = e => {
    e.preventDefault()
    e.stopPropagation()
    const anis = JSON.parse(JSON.stringify(animates))
    // 先把所有的状态设置为false,后续再把悬浮的目标加上动画class
    anis.forEach(item => {
      item.show = false
    })
    setAnimates(anis)
  }

  // 更新组件动画列表
  const updateCompAnimate = (e, item) => {
    e.preventDefault()
    e.stopPropagation()
    const anis = []
    if (item.value) {
      anis.push(item.value)
    }
    dispatch(updateComponent({ animations: anis }))
  }

  let selectAnimateId = null
  const currentComponent = componentList.find(com => com.id === curComponentID)
  console.log('currentComponent', currentComponent)
  if (currentComponent && currentComponent.animations.length > 0) {
    selectAnimateId = currentComponent.animations[0]
  }

  return (
    <div className="animate-list-container" onMouseLeave={e => removeAnimate(e)}>
      <Hidden visible={!curComponentID}>请选择组件</Hidden>
      <Hidden visible={curComponentID}>
        {
          animates.map(item => (
            <Tag
              icon={selectAnimateId === item.value ? (<CheckCircleOutlined />) : null}
              color={selectAnimateId === item.value ? 'success' : null}
              onMouseEnter={e => addAnimate(e, item)}
              onClick={e => updateCompAnimate(e, item)}
              className={cs('animate-tag', { [`animate__${item.value}`]: item.show })}
              key={item.value}>
              {item.label}
            </Tag>
          ))
        }
      </Hidden>
    </div>
  )
}

export default AnimateList
