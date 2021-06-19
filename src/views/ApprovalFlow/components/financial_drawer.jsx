/*eslint-disable */
import React, { Component, createRef } from 'react'
import { deepCopy, isEmpty } from '@/utils'
import Hidden from '@/components/Hidden'
import { Input, Button, Radio, Checkbox, message as Message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import HoverTips from '@/components/hover-tips'
import SelectedMember from './form/selected_member'
import RolePopover from './role-popover'
import { APPOINT_ROLE } from '../constant'


export default class FinancialDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerModel: deepCopy(this.props.drawerData),
      titleEditable: false,
      treeData: [],
      config: {},
      financialMembers: [],
      memberSelectorVisible: false,
      checkedList: [],
      roleData: [],
      roleSelectorVisible: false,
    }
  }

  inputRef = createRef()
  editMemberRef = createRef()

  /* 保存 */
  submit = () => {
    const { user_type, sign_method = 2, roles, if_empty = 1 } = this.state.config;
    let { users } = this.state
    users = users && users.filter(item => !item.leave);
    if (user_type === 3 && (!users || users.length == 0)) {
      Message.warn('请选择指定人员')
      return;
    }
    if (user_type === APPOINT_ROLE && (!roles || roles.length == 0)) {
      Message.warn('请选择指定用户组')
      return;
    }

    if (user_type === APPOINT_ROLE && roles.some(role => role.is_empty)) {
      Message.warn('用户组为空，请添加用户组')
      return;
    }

    if (user_type === APPOINT_ROLE && roles.some(role => role.is_del)) {
      Message.warn('用户组为空，请添加用户组')
      return;
    }
    let config = {}
    switch (user_type) {
      case 1:
        // 如果选中列表和全部财务人员数组长度相同，即为全选中
        if (this.state.checkedList.length == this.state.financialMembers.length) {
          config.user_type = 1;
          config.sign_method = sign_method;
        } else {
          let checkedMeber = this.state.financialMembers.filter(member => { return this.state.checkedList.some(i => i == member.uid && !member.leave) })
          if (checkedMeber.length == 0) {
            Message.warn('请选择指定审单会计')
            return;
          }
          if (checkedMeber.length == 1) {
            config.sign_method = 2 // 只有一个选中人时候,不管之前选的是啥，扭转为或签状态
          } else {
            config.sign_method = sign_method;
          }
          config.users = checkedMeber;
          config.user_type = 2
        }
        break
      case 3:
        config.users = users;
        config.user_type = 3;
        if (users.length == 1) {
          config.sign_method = 2 // 只有一个选中人时候,不管之前选的是啥，扭转为或签状态
        } else {
          config.sign_method = sign_method;
        }
        break;
      case APPOINT_ROLE:
        config.user_type = APPOINT_ROLE;
        config.sign_method = sign_method;
        config.if_empty = if_empty;
        config.roles = roles.map(role => ({ rid: role.role_id, rname: role.role_name }));
        break
    }

    this.state.drawerModel.node_value = JSON.stringify(config)
    console.log('更新后的节点数据', this.state.drawerModel)
    this.props.onSubmit(this.state.drawerModel)
  }

  onTitleBlur = () => {
    this.setState({
      titleEditable: false
    })
  }

  onRadioChange = (e, field) => {
    let { checkedList } = this.state;
    if (e.target.value == 1 && field == 'user_type') {
      checkedList = this.state.financialMembers.map(item => item.uid)
    }
    this.state.config[field] = e.target.value
    this.setState({
      config: this.state.config,
      checkedList
    })
  }

  onTitleEdit = () => {
    this.setState({
      titleEditable: true
    }, () => {
      this.inputRef.current.focus()
    })
  }

  onCloseDrawer = () => {
    this.props.onCloseDrawer()
  }

  onTitleChange = (e) => {
    this.state.drawerModel.node_name = e.target.value
    this.setState({
      drawerModel: this.state.drawerModel
    })
  }

  showMemberSelector = () => {
    this.setState({
      memberSelectorVisible: true
    })
    this.editMemberRef.current.wrappedInstance.setCheck((this.state.users || []).filter(i => !i.leave))
  }


  onDeleteMember = (index) => {
    this.state.users.splice(index, 1);
    this.setState({
      users: this.state.users
    })
  }

  /* 关闭人员选择框 */
  closeMember = () => {
    this.setState({
      memberSelectorVisible: false
    })
  }

  onCheckboxGroupChange = (e) => {
    this.setState({
      checkedList: e
    })
  }

  /* 选择员工后回调 */
  memberSelectorCallback = val => {
    let { users } = this.state
    if (val.length > 20) {
      Message.warn('最多可添加20个成员')
      return;
    }
    users = val.map(item => {
      return {
        uid: item.id.toString(),
        uname: typeof item.name == 'string' ? item.name : item.name.props.children
      }
    })
    this.setState({
      users,
      memberSelectorVisible: false
    })
  }

  onDeleteRole = (index) => {
    this.state.config.roles.splice(index, 1);
    this.setState({
      config: this.state.config
    })
  }

  showRoleSelector = () => {
    this.setState({
      roleSelectorVisible: true
    })
  }

  onHideRolePicker = () => {
    this.setState({
      roleSelectorVisible: false
    })
  }

  initData = () => {
  }

  componentDidMount() {
    this.initData()
  }

  render() {
    const { titleEditable, drawerModel, config, financialMembers, treeData, memberSelectorVisible, checkedList, users, roleSelectorVisible } = this.state
    const companyInfo = {}
    let roles = [];
    config.roles && (
      roles = config.roles.map(role => {
        return {
          ...role,
          key: role.role_id,
          title: role.role_name,
          uname: role.role_name
        }
      })
    )
    return (
      <div style={{ height: '100vh', position: 'relative' }}>
        <div className="drawer-header">
          <Hidden visible={!titleEditable}>
            <span className="edit-title">{drawerModel.node_name}</span>
            <span className="edit-icon" onClick={this.onTitleEdit} style={{ marginLeft: 10 }}></span>
          </Hidden>
          <Hidden visible={titleEditable}>
            <Input maxLength={20} value={drawerModel.node_name} ref={this.inputRef} onChange={this.onTitleChange} onBlur={this.onTitleBlur} style={{ width: 300 }}></Input>
          </Hidden>
        </div>
        <div className="drawer-content-wrapper">
          <h1 className="drawer-title">设置审核人</h1>
          <Radio.Group name="radiogroup" className="approval-type-radio-group" onChange={(e) => { this.onRadioChange(e, 'user_type') }} value={config.user_type}>
            <Radio className="approval-type-radio" value={1}>全部审单会计</Radio>
            <Radio className="approval-type-radio" value={3}>指定成员</Radio>
            <Radio className="approval-type-radio" value={APPOINT_ROLE}>指定用户组<RolePopover></RolePopover></Radio>
          </Radio.Group>
          <Hidden visible={config.user_type == 1 && financialMembers && financialMembers.length == 0}>
            <div className="setting-member-tips">
              <span className="icon"></span>
              <span className="text">未设置财务权限人员，请先前往</span>
              <span className="highlight-text">【企业设置-权限管理】</span>
              <span className="text">中设置</span>
            </div>
          </Hidden>
          <Hidden visible={config.user_type == 1 && financialMembers && financialMembers.length > 0}>
            <div>
              <Checkbox.Group onChange={this.onCheckboxGroupChange} defaultValue={checkedList}>
                {financialMembers.map((item => {
                  return <Checkbox value={item.uid} key={item.uid} className={item.leave ? 'quit' : ''}>{item.uname + (item.leave ? "(已离职)" : "")}</Checkbox>
                }))}
              </Checkbox.Group>
            </div>
          </Hidden>
          <Hidden visible={config.user_type == 3}>
            <h1 className="drawer-title">添加成员：<span className="sub-title">（不超过20个）</span></h1>
            <Hidden visible={users && users.length > 0}>
              <SelectedMember showSelector={this.showMemberSelector} onDelete={this.onDeleteMember} members={users}></SelectedMember>
            </Hidden>
            <Button
              onClick={this.showMemberSelector}
              type="primary"
              className="drawer-add-member"
            >
              <PlusOutlined className="drawer-add-member-icon" /> 添加指定成员
              </Button>
          </Hidden>
          <Hidden visible={config.user_type == APPOINT_ROLE}>
            <h1 className="drawer-title">添加用户组：<span className="sub-title">（单选）</span></h1>
            <Hidden visible={config.roles && config.roles.length > 0}>
              <SelectedMember showSelector={this.showRoleSelector} onDelete={this.onDeleteRole} members={roles}></SelectedMember>
            </Hidden>
            <Button
              onClick={this.showRoleSelector}
              type="primary"
              className="drawer-add-member"
            >
              <PlusOutlined className="drawer-add-member-icon" /> 添加用户组
            </Button>
          </Hidden>
          <Hidden visible={config.user_type === APPOINT_ROLE || (config.user_type == 1 && checkedList.length > 1) || (config.user_type == 3 && users && users.length > 1)}>
            <h1 className="drawer-title approval-type-title">多人审批时采用的审批方式</h1>
            <Radio.Group name="radiogroup" onChange={(e) => { this.onRadioChange(e, 'sign_method') }} value={config.sign_method || 2}>
              <Radio style={{ marginBottom: 10 }} value={2}>或签（一名审批人同意或拒绝即可）</Radio><br />
              <Radio value={1}>会签（须所有审批人同意）</Radio>
            </Radio.Group>
          </Hidden>
          <Hidden visible={config.user_type == APPOINT_ROLE}>
            <h1 className="drawer-title approval-type-title">审批人为空时候：</h1>
            <Radio.Group name="radiogroup" onChange={(e) => { this.onRadioChange(e, 'if_empty') }} value={isEmpty(config.if_empty) ? 1 : config.if_empty}>
              <Radio style={{ marginBottom: 10 }} value={2}>自动通过<HoverTips>当该用户组或主管没有人的时候，审批单将自动通过</HoverTips></Radio><br />
              <Radio value={1}>自动转交管理员<HoverTips>当用户组或主管为空时，审批单会自动转交给超级管理员</HoverTips></Radio>
            </Radio.Group>
          </Hidden>
        </div>
        <div className="button-bar">
          <Button type="primary" onClick={() => { this.submit() }}>确定</Button>
          <Button onClick={this.onCloseDrawer}>取消</Button>
        </div>
      </div>
    )
  }
}
