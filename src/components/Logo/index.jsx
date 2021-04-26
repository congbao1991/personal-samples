import React from 'react'
import { Link } from 'react-router-dom'
import './index.less'

function Logo() {

  return (
    <Link to="/">
      <span id="xiaocong-logo">小葱Blog</span>
    </Link>
  )
}

export default Logo
