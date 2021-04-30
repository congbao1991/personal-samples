import React from 'react'
import cs from 'classname'

import './index.less'

function ComponentWrapper(props) {

  let animateClass = null

  function init() {
    const animations = props.instance.animations
    animateClass = `animate__${animations[0]}`
  }

  init()

  return (
    <div className={cs('component-wrapper', animateClass)} style={props.style}>
      {props.children}
    </div>
  )
}

export default ComponentWrapper
