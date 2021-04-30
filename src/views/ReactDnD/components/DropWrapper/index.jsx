import React from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from '../ItemTypes'

function getStyle(backgroundColor) {
  return {
    border: '1px solid rgba(0,0,0,0.2)',
    minHeight: '8rem',
    minWidth: '8rem',
    color: 'white',
    backgroundColor,
    padding: '2rem',
    paddingTop: '1rem',
    margin: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
  };
}
export const DropWrapper = ({ children, addCard, id }) => {
  const [{ isOver, isOverCurrent }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop()
      if (didDrop) {
        return
      }
      if (id && item.type === 'C') {
        alert('不能放这些组件')
        return
      }
      item && addCard(item, id)
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
    }),
  }), [addCard]);
  let backgroundColor = 'rgba(0, 0, 0, .5)';
  if (isOverCurrent || (isOver)) {
    backgroundColor = 'darkgreen';
  }
  return (
    <div ref={drop} style={getStyle(backgroundColor)}>
      <div>{children}</div>
    </div>
  );
};
