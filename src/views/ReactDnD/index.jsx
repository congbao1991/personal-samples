import React, { useState } from 'react'
import { Layout } from 'antd'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'
import { DropWrapper } from '@/views/ReactDnD/components/DropWrapper'
import { DragWrapper } from '@/views/ReactDnD/components/DragWrapper'
import { Box } from '@/views/ReactDnD/components/Box'

const { Content, Footer, Sider } = Layout

let addNum = 1

function array2Map(arr) {
  const map = {}
  arr.forEach(item => {
    map[item.id] = item
    if (item.cards) {
      array2Map(item.cards)
    }
  })
  return map
}

function ReactDnD(props) {
  const [cards, setCards] = useState([])
  const findCard = (id, wrapperId) => {
    if (wrapperId) {
      const card = cards.filter((c) => `${c && c.id}` === wrapperId)[0].cards.filter((c) => `${c && c.id}` === id)[0];
      return {
        card,
        index: cards.filter((c) => `${c && c.id}` === wrapperId)[0].cards.indexOf(card)
      }
    }
    const card = cards.filter((c) => `${c && c.id}` === id)[0];
    return {
      card,
      index: cards.indexOf(card)
    }
  }
  const addCard = (item, wrapperId) => {
    const arr = cards.slice()
    if (item.id && item.id === wrapperId) {
      return
    }
    if (!item.id) {
      let c
      if (wrapperId) {
        const target = findCard(wrapperId).card
        c = target.cards
      } else {
        c = arr
      }
      addNum++
      c.push({ id: `${item.type}${addNum}`, text: `${item.type}${addNum}`, type: item.type, cards: [], wrapperId })
      setCards(arr)
    } else {
      const map = array2Map(arr)
      // 如果不存在wrapperId，证明拖拽目标也在外层
      if (item.wrapperId && !wrapperId) {
        // 元素组删除数据
        const delIndex = map[item.wrapperId].cards.findIndex(ca => ca.id === item.id)
        map[item.wrapperId].cards.splice(delIndex, 1)
        delete item.wrapperId
        arr.push(item)
      }
      // 如果从外层组件拖拽进子组件
      if (!item.wrapperId && wrapperId) {
        // 元素组删除数据
        map[wrapperId].cards.push(Object.assign(item, { wrapperId }))
        const delIndex = arr.findIndex(ca => ca.id === item.id)
        arr.splice(delIndex, 1)
      }
      // 从一个子组件拖拽到另外一个子组件
      if (item.wrapperId && wrapperId && item.wrapperId !== wrapperId) {
        // 元素组删除数据
        const delIndex = map[item.wrapperId].cards.findIndex(ca => ca.id === item.id)
        map[item.wrapperId].cards.splice(delIndex, 1)
        map[wrapperId].cards.push(Object.assign(item, { wrapperId }))
      }
      setCards(arr)
    }

  }
  const moveCard = (dragTarget, atIndex, wrapperId) => {
    const { card, index } = findCard(dragTarget.id, wrapperId)
    if (index === atIndex) {
      return
    }
    let arr = cards.slice()
    const map = array2Map(arr)
    const targetCards = wrapperId ? map[wrapperId].cards : arr
    if (wrapperId) {
      if (index === -1) {
        let deleteIndex
        if (!dragTarget.wrapperId) {
          deleteIndex = arr.findIndex(ca => ca.id === dragTarget.id)
          arr.splice(deleteIndex, 1)
        } else {
          deleteIndex = map[dragTarget.wrapperId].cards.findIndex(ca => ca.id === dragTarget.id)
          map[dragTarget.wrapperId].cards.splice(deleteIndex, 1)
        }
        map[wrapperId].cards = update(targetCards, {
          $splice: [
            [atIndex, 0, Object.assign(dragTarget, { wrapperId })]
          ]
        })
      } else {
        map[wrapperId].cards = update(targetCards, {
          $splice: [
            [index, 1],
            [atIndex, 0, card]
          ]
        })
      }
    } else if (!wrapperId) {
      if (index === -1) {
        const deleteIndex = map[dragTarget.wrapperId].cards.findIndex(ca => ca.id === dragTarget.id)
        map[dragTarget.wrapperId].cards.splice(deleteIndex, 1)
        arr = update(targetCards, {
          $splice: [
            [atIndex, 0, Object.assign(dragTarget, { wrapperId })]
          ]
        })
      } else {
        arr = update(targetCards, {
          $splice: [
            [index, 1],
            [atIndex, 0, card]
          ]
        })
      }
    }

    setCards(arr)
  }
  console.log(cards)
  return (
    <DndProvider backend={HTML5Backend}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible>
          <Box item={{ type: 'A' }}>1</Box>
          <Box item={{ type: 'B' }}>2</Box>
          <Box item={{ type: 'C' }}>3</Box>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <DropWrapper addCard={addCard} >
                {cards.map(card => {
                  if (card.type === 'C') {
                    return (
                      <div>
                        <DragWrapper
                          key={card.id}
                          id={`${card.id}`}
                          moveCard={moveCard}
                          findCard={findCard}
                          type={card.type}
                          text={card.text}
                        >
                        </DragWrapper>
                        <DropWrapper addCard={addCard} id={card.id}>
                          {
                            card.cards.map((item => (
                              <DragWrapper
                                key={item.id}
                                id={`${item.id}`}
                                wrapperId={item.wrapperId}
                                type={item.type}
                                text={item.text}
                                cards={item.cards}
                                moveCard={moveCard}
                                findCard={findCard}
                              />
                            )))
                          }
                        </DropWrapper>
                      </div>
                    )
                  }
                  return (
                    <DragWrapper
                      key={card.id}
                      id={`${card.id}`}
                      text={card.text}
                      type={card.type}
                      moveCard={moveCard}
                      findCard={findCard}
                      {...card}
                    />
                  )
                })}
              </DropWrapper>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </DndProvider>
  )
}

export default ReactDnD
