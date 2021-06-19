import React, { Component } from 'react'
import { Tooltip, Button, Modal } from 'antd'
import { withRouter } from 'react-router-dom'
import './index.less';

@withRouter
export default class SelectedMember extends Component {

  onDelete = (event, index) => {
    event && event.stopPropagation()
    this.props.onDelete(index)
  }

  linkRolePage = e => {
    e.preventDefault()
    e.stopPropagation()
    Modal.confirm({
      title: '提示',
      content: '设置用户组不会保存当前审批流，确认要去设置用户组吗',
      cancelText: '取消',
      okText: '去设置',
      zIndex: 2000,
      onOk: () => {
        this.props.history.replace('/company/roles/index')
      }
    })
  }

  generateMemberEl = (item, index) => {
    if (item.is_empty) {
      const title = (
        <div>
          该用户组下没有成员,<Button style={{padding: 0}} type="link" onClick={this.linkRolePage}>前往设置</Button>
        </div>
      )
      return (
        <Tooltip key={index} placement="top" title={title}>
          <div className={'member-box quit'}>
            <span className="img-box">{item.uname.substr(0, 1)}</span>
            <span className="member-name">{`${item.uname}${item.leave ? '(已离职)' : ''}${item.is_del ? '(已删除)' : ''}`}</span>
            <span className="member-tip-icon"><img src="https://apg-1258944054.cos.ap-guangzhou.myqcloud.com/apg/pc-micro-reimburse/common/%21.png" alt=""/></span>
            <i className="member-delete" onClick={(e) => { this.onDelete(e, index) }}></i>
          </div>
        </Tooltip>
      )
    }
    return (
      <div key={index} className={`member-box ${(item.leave || item.is_del) ? 'quit' : ''}`}>
        <span className="img-box">{item.uname.substr(0, 1)}</span>
        <span className="member-name">{`${item.uname}${item.leave ? '(已离职)' : ''}${item.is_del ? '(已删除)' : ''}`}</span>
        <i className="member-delete" onClick={(e) => { this.onDelete(e, index) }}></i>
      </div>
    )
  }

  render() {
    const { members } = this.props

    return (
      <div className="selected-member-wrapper" onClick={() => { this.props.showSelector && this.props.showSelector() }}>
        {members.map((item, index) => {
          return this.generateMemberEl(item, index)
        })}
      </div>
    )
  }
}
