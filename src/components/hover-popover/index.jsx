import React, { Component } from 'react'
import { Popover } from 'antd';
import './index.less'
import cx from 'classname'

export default class HoverPopover extends Component {
    render() {
        const { content, minHgWid = 20, children, bgOpacity = false, ...rest } = this.props
        const contentHook = (<div className="hover-tips-content">{children}</div>)
        return (
            <Popover content={contentHook} className="hover-tips-popover" {...rest}>
                <div id="hover-popover" className={cx({
                    'bg-opacity': bgOpacity
                })} style={{minHeight: minHgWid, minWidth: minHgWid}}>
                </div>
            </Popover>
        )
    }
}
