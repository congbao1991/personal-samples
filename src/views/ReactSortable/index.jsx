import React, { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import cs from 'classname'
import { Layout } from 'antd'

import Container from './Components/Container'

import './index.less'

const { Content, Sider } = Layout

let id = 1

function ReactSortableApp(props) {
  const [state, setState] = useState([
  ])
  const [state2, setState2] = useState([
  ])
  const [componentList, setComponentList] = useState(
    [
      { name: 'shrek' },
      { name: 'fiona' },
      { name: 'container', children: [] },
    ]
  )

  const updateState = (e = [], tid, tab) => {
    if (e.some(i => i.name === 'container')) {
      alert('不能放这种组件')
      const oldState = JSON.parse(JSON.stringify(state))
      const oldState2 = JSON.parse(JSON.stringify(state2))
      setTimeout(() => {
        setState(oldState)
        setState2(oldState2)
      })
      return;
    }
    e.forEach(item => {
      if (!item.id) {
        item.id = id
        id++
      }
    })
    let newState
    if (tab === '1') {
      newState = JSON.parse(JSON.stringify(state))
    } else {
      newState = JSON.parse(JSON.stringify(state2))
    }
    const target = newState.find(item => tid === item.id)
    target.children = e
    if (tab === '1') {
      setState(newState)
    } else {
      setState2(newState)
    }
    const newComList = JSON.parse(JSON.stringify(componentList))
    newComList.forEach((i, index) => {
      index === 2 && (i.disabled = true)
    })
    setComponentList(newComList)
  }

  const setList = (e, tab) => {
    e.forEach(item => {
      if (!item.id) {
        item.id = id
        id++
      }
    })
    if (tab === '1') {
      setState(e)
    } else {
      setState2(e)
    }
  }

  const onComClick = e => {
    console.log(e)
  }


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <ReactSortable group={{ name: 'formItem', pull: 'clone', put: false }} filter=".ignore-elements" list={componentList} setList={setComponentList} sort={false}>
          {componentList.map((item, index) => (
            <div data-id={item.name} className={cs({ 'ignore-elements': item.disabled })} style={{ padding: 2, background: '#fff', color: 'red', marginBottom: 10 }} key={index}>{item.name}</div>
          ))}
        </ReactSortable>
      </Sider>
      <Content style={{ margin: '0 16px', display: 'flex' }}>
        <div style={{ flex: 1, padding: 20, marginRight: 20, background: '#fff' }}>
          <Container state={state} setList={setList} updateState={updateState} onComClick={onComClick} tab="1" />
        </div>
        <div style={{ flex: 1, padding: 20, background: '#fff' }}>
          <Container state={state2} setList={setList} updateState={updateState} onComClick={onComClick} tab="2" />
        </div>
      </Content>
    </Layout>
  )
}

export default ReactSortableApp
