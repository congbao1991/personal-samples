import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Card, Modal } from 'antd'

import { deepCopy } from '@/utils'
import COMPONENT_LIST from '@/constants/components'
import generateID from '@/utils/generateID'
import { addComponent } from '@/store/actions'
import Grid from '@/components/Grid'
import Shape from '@/components/Shape'
import Hidden from '@/components/Hidden'
import ComponentWrapper from '@/components/ComponentWrapper'

import './index.less'

const { Meta } = Card;

function Editor(props) {

  const componentList = useSelector(state => state.crud.componentList)
  const previewStatus = useSelector(state => state.crud.previewStatus)

  const dispatch = useDispatch()

  const onDragOver = e => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }

  const onDrop = e => {
    e.preventDefault()
    e.stopPropagation()
    const component = deepCopy(COMPONENT_LIST[e.dataTransfer.getData('index')])
    if (!component) {
      return;
    }
    component.style.top = e.nativeEvent.offsetY
    component.style.left = e.nativeEvent.offsetX
    component.id = generateID()
    dispatch(addComponent({ component }))
    // this.$store.commit('recordSnapshot')
  }

  const exChangeWrapper = (component, attr) => {
    if (previewStatus) {
      return (
        <ComponentWrapper instance={attr} key={attr.id} id={attr.id} width={attr.style.width} height={attr.style.height} style={{ top: attr.style.top, left: attr.style.left }}>
          {component}
        </ComponentWrapper>
      )
    } else {
      return (
        <Shape instance={attr} key={attr.id} id={attr.id} width={attr.style.width} height={attr.style.height} style={{ top: attr.style.top, left: attr.style.left }}>
          {component}
        </Shape>
      )
    }
  }

  const onEventsTrigger = (e, component) => {
    e.preventDefault()
    if (!component.events.content) {
      return
    }

    switch (component.events.eventType) {
      case 'alert':
        Modal.info({ content: component.events.content });
        break;
      case 'link':
        window.open(component.events.content)
        break;
      default:
        break;
    }
  }

  const generateComponents = () => {
    return componentList.map(com => {
      const { top, left, ...rest } = com.style
      let component = null
      switch (com.name) {
        case 'antd-button':
          component = (
            <Button
              {...com.antdProps}
              onClick={(e) => { onEventsTrigger(e, com) }}
              style={rest}>
              {com.label}
            </Button>
          )
          return exChangeWrapper(component, com)
        case 'antd-card':
          component = (
            <Card
              onClick={(e) => { onEventsTrigger(e, com) }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              {...com.antdProps}
              style={rest}>
              <Meta title="Europe Street beat" description="www.instagram.com" />
            </Card>
          )
          return exChangeWrapper(component, com)
        default:
          return null
      }
    })
  }

  return (
    <div className="editor-container">
      <div
        className="editor-wrapper"
        id="editor"
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <Hidden visible={!previewStatus}>
          <Grid />
        </Hidden>
        {generateComponents()}
      </div>
    </div>
  )
}

export default Editor