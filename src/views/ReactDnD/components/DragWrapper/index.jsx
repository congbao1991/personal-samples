import React from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from '../ItemTypes'

const style = {
  border: '1px dashed gray',
  padding: '.5rem 1rem 0.5rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
  color: 'red'
};
export const DragWrapper = ({ id, text, moveCard, findCard, children, wrapperId, type, cards }) => {
  const originalIndex = findCard(id).index
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { id, originalIndex, wrapperId, text, type, cards },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        moveCard(item, originalIndex, wrapperId)
      }
    },
  }), [id, originalIndex, moveCard])
  const [{ hovered }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    collect: monitor => ({
      hovered: monitor.isOver(),
    }),
    drop(item) { // item是拖拽状态目标
      // 如果是复合组件直接返回
      const { index: overIndex } = findCard(id, wrapperId)
      if (type === 'C') {
        // moveCard(item, overIndex)
        return
      }
      if (item.id !== id) {
        moveCard(item, overIndex, wrapperId)
      }
    },
  }), [findCard, moveCard])
  const opacity = isDragging ? 0 : 1
  const border = hovered ? '3px solid red' : '1px dashed gray'
  return (
    <div ref={(node) => drag(drop(node))} style={{ ...style, opacity, border }}>
      {children || text}
    </div>
  )
}
