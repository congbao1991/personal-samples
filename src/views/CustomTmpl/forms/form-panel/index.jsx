import React from 'react'
import cx from 'classname'
import Hidden from '@/components/Hidden'
import RenderForm from '../render-form'
import './index.less'

function FormPanel(props) {
  return (
    <div className={cx({
      'form-container': true,
      open: props.open
    })}>
      <Hidden visible={props.currentComponent}>
        <RenderForm {...props} />
      </Hidden>
    </div>
  )
}
export default FormPanel
