import React, { PureComponent, Fragment } from 'react'

export default class Hidden extends PureComponent {
  render() {
    const { visible, children } = this.props
    const content = visible ? children : null
    return (
      <Fragment>
        {content}
      </Fragment>
    )
  }
}
