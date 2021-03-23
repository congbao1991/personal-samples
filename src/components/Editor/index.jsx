import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'antd'

import { deepCopy } from '@/utils'
import COMPONENT_LIST from '@/constants/components'
import generateID from '@/utils/generateID'
import { addComponent } from '@/store/actions'
import Grid from '@/components/Grid'
import Shape from '@/components/shape'


import './index.less'

function Editor(props) {

  const componentList = useSelector(state => state.crud.componentList)

  const dispatch = useDispatch()

  const onDragOver = e => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }

  const onDrop = e => {
    e.preventDefault()
    e.stopPropagation()
    const component = deepCopy(COMPONENT_LIST[e.dataTransfer.getData('index')])
    component.style.top = e.nativeEvent.offsetY
    component.style.left = e.nativeEvent.offsetX
    component.id = generateID()
    dispatch(addComponent({ component }))
    // this.$store.commit('recordSnapshot')
  }


  const generateComponents = () => {
    return componentList.map(com => {
      switch (com.name) {
        case 'antd-button':
          const { top, left, ...rest } = com.style
          return (
            <Shape key={com.id} id={com.id} style={{ top, left }}>
              <Button
                {...com.antdProps}
                style={rest}>
                {com.label}
              </Button>
            </Shape>
          )
        default:
          return null
      }
    })
  }

  return (
    <div className="editor-container">
      <div
        className="editor-wrapper"
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <Grid />
        {generateComponents()}
      </div>
    </div>
  )
}

export default Editor