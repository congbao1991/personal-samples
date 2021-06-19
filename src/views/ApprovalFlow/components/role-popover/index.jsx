import React, { Component } from 'react'
import { Button, Modal } from 'antd'
import { withRouter } from 'react-router-dom'

import HoverPopover from '@/components/hover-popover';
import './index.less'

@withRouter
class RolePopover extends Component {

  linkRolePage = () => {
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

  render() {
    return (
      <HoverPopover placement="bottomRight">
        <div className="role-popover-container">
          <h1 className="role-popover-title">适用场景：</h1>
          <img className="role-desc-img" src="https://apg-1258944054.cos.ap-guangzhou.myqcloud.com/apg/pc-micro-reimburse/apply-flow/role_popover.png" alt="" />
          <h1 className="role-popover-title">用户组定义：</h1>
          <p className="role-popover-content">将很多有相同审批职能的人设置为同一用户组，并将这个用户组添加为审批人，如部门总监</p>
          <h1 className="role-popover-title">用户组的管理范围：</h1>
          <p className="role-popover-content">可以给用户组里的每成员指定管理的部门，这些部门的员工提交的单据就由该成员审批，默认管理所有人。</p>
          <h1 className="role-popover-title">如何设置：</h1>
          <div className="role-popover-steps">
            <div className="role-popover-step">
              <span className="icon">1</span>
              <span className="desc">进入组织架构设置用户组</span>
              <span className="arrow">
                <img src="https://apg-1258944054.cos.ap-guangzhou.myqcloud.com/apg/pc-micro-reimburse/apply-flow/role-popover-arrow.png" alt="" />
              </span>
            </div>
            <div className="role-popover-step">
              <span className="icon">2</span>
              <span className="desc">设置用户组的管理范围</span>
              <span className="arrow">
                <img src="https://apg-1258944054.cos.ap-guangzhou.myqcloud.com/apg/pc-micro-reimburse/apply-flow/role-popover-arrow.png" alt="" />
              </span>
            </div>
            <div className="role-popover-step">
              <span className="icon">3</span>
              <span className="desc">审批流里使用用户组</span>
            </div>
          </div>
          <Button className="set-role-btn" onClick={this.linkRolePage}>设置用户组</Button>
        </div>
      </HoverPopover>
    )
  }
}

export default RolePopover
