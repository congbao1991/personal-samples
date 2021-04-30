import React from 'react'
// import { useDrop } from 'react-dnd'
import { DragWrapper } from '../DragWrapper'
// import { ItemTypes } from '../ItemTypes'
import { DropWrapper } from '../DropWrapper'

const style = {
  width: 'auto'
};

export const Container = ({ findCard, moveCard, cards, addCard }) => (
  <div style={style}>
    {cards.map(card => (
      card.type === 'C'
        ? (
          <DropWrapper addCard={addCard} key={card.id} id={card.id} findCard={findCard} moveCard={moveCard}>
            <Container cards={card.cards} findCard={findCard} moveCard={moveCard}></Container>
          </DropWrapper>
        )
        : (
          <DragWrapper
            key={card.id}
            id={`${card.id}`}
            text={card.text}
            moveCard={moveCard}
            findCard={findCard}
            {...card}
          />
        )
    ))}
  </div>
)
