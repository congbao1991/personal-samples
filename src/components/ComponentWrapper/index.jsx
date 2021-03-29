import React from 'react'

import './index.less'

function ComponentWrapper(props) {
  return (
    <div className="component-wrapper" style={props.style}>
      {props.children}
    </div>
  )
}

export default ComponentWrapper