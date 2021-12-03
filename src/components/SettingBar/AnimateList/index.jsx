import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Tag } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'
import animations from '@/constants/animate'
import Hidden from '@/components/Hidden'
import { updateComponent } from '@/store/actions'
import './index.less'

function AnimateList() {
  const [animates] = useState(animations)
  const curComponentID = useSelector(state => state.crud.curComponentID)
  const componentList = useSelector(state => state.crud.componentList)
  const dispatch = useDispatch()

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
    <div className="animate-list-container">
      <Hidden visible={!curComponentID}>请选择组件</Hidden>
      <Hidden visible={curComponentID}>
        {
          animates.map(item => (
            <Tag
              icon={selectAnimateId === item.value ? (<CheckCircleOutlined />) : null}
              color={selectAnimateId === item.value ? 'success' : null}
              onClick={e => updateCompAnimate(e, item)}
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
