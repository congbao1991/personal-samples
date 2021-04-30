import React from 'react'
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../ItemTypes';

const style = {
  display: 'inline-block',
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  backgroundColor: 'white',
  cursor: 'move',
};
export const Box = ({ children, item }) => {
  const [, drag] = useDrag(() => ({ type: ItemTypes.CARD, item }));
  return (
    <div ref={drag} style={style}>
      {children}
    </div>
  );
};
