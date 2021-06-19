import React, { Component } from 'react'
import { Tooltip } from 'antd';
import './index.less'
import cx from 'classname'

export default class HoverTips extends Component {
    render() {
        const { content, minHgWid = 20, children, bgOpacity = false, ...rest } = this.props
        const contentHook = (<div className="hover-tips-content">{children}</div>)
        return (
            <Tooltip title={contentHook} className="hover-tips-popover" {...rest}>
                <div id="hover-tips" className={cx({
                    'bg-opacity': bgOpacity
                })} style={{minHeight: minHgWid, minWidth: minHgWid}}>
                </div>
            </Tooltip>
        )
    }
}
