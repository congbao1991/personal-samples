import React from 'react';
import { ReactSortable } from 'react-sortablejs';

function Container(props) {
  return (
    <ReactSortable group="formItem" style={{ width: '100%', height: '100%' }} invertSwap={true} list={props.state} setList={e => props.setList(e, props.tab)}>
      {props.state.map((item, index) => {
        if (item.name === 'container') {
          return (
            <div key={item.id} style={{ background: '#eee', padding: 10, marginBottom: 10 }}>
              <ReactSortable group="formItem" style={{ minHeight: 100, paddingBottom: 50 }} list={item.children} setList={e => props.updateState(e, item.id, props.tab)}>
                {item.children.map((it, i) => {
                  if (it.name === 'fiona') {
                    return (<div style={{ background: 'red', marginBottom: 10, border: it.border }} key={it.id} onClick={props.onComClick}>{it.name}-{it.id}</div>)
                  }
                  if (it.name === 'shrek') {
                    return (<div style={{ background: 'lightblue', marginBottom: 10, padding: 50, border: it.border }} onClick={props.onComClick} key={it.id}>{it.name}-{it.id}</div>)
                  }
                })}
              </ReactSortable>
            </div>
          )
        }
        if (item.name === 'fiona') {
          return (<div style={{ background: 'red', marginBottom: 10, border: item.border }} key={item.id} onClick={props.onComClick}>{item.name}-{item.id}</div>)
        }
        if (item.name === 'shrek') {
          return (<div style={{ background: 'lightblue', marginBottom: 10, padding: 50, border: item.border }} key={item.id} onClick={props.onComClick}>{item.name}-{item.id}</div>)
        }
      })}
    </ReactSortable>
  )
}

export default Container
