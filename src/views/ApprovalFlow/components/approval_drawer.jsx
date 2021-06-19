/*eslint-disable */
import React, { Component, createRef } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import Hidden from '@/components/Hidden'
import { Button, Radio, Input, Select, message as Message } from 'antd'
import { deepCopy, isEmpty } from '@/utils'
import './drawer.less'
import HoverTips from '@/components/hover-tips'
import SelectedMember from './form/selected_member'
import RolePopover from './role-popover'
import { LEADER_OPTIONS, APPOINT_MEMBERS, APPOINT_SUPERIOR, SERIES_SUPERIOR, ORGANIZATION_LEADER_OPTIONS, APPOINT_ROLE, SHOW_SIGN_METHOD_TYPES } from '../constant'

const { Option } = Select;

class ApprovalDrawer extends Component {
  constructor(props) {
    super(props)
    const drawerData = deepCopy(this.props.drawerData)
    this.state = {
      approvalDrawerModel: drawerData,
      titleEditable: false,
      memberSelectorVisible: false,
      config: {},
      treeData: [],
      roleData: [],
      roleSelectorVisible: false,
    }
  }

  inputRef = createRef()
  editMemberRef = React.createRef();

  /* 点击保存 */
  submit = () => {
    let { user_type, users, roles, sign_method = 2, leader_level = '1', root_level = '1', level_type = 1, if_empty = 1 } = this.state.config;
    users = users && users.filter(item => !item.leave);
    if (user_type === APPOINT_MEMBERS && (!users || users.length == 0)) {
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

    let config = { user_type }
    switch (user_type) {
      case APPOINT_SUPERIOR:
        config.sign_method = sign_method;
        config.level_num = leader_level;
        break;
      case APPOINT_MEMBERS:
        config.users = users;
        if (users.length > 1) {
          config.sign_method = sign_method
        }
        break;
      case SERIES_SUPERIOR:
        config.level_type = level_type
        config.sign_method = sign_method;
        if (config.level_type == 1) {
          config.level_num = leader_level
        } else {
          config.level_num = root_level
        }
        break
      case APPOINT_ROLE:
        config.sign_method = sign_method
        config.if_empty = if_empty
        config.roles = roles.map(role => ({ rid: role.role_id, rname: role.role_name }));
        break
      default:
        break
    }
    this.state.approvalDrawerModel.node_value = JSON.stringify(config)
    console.log('更新后的节点数据', this.state.approvalDrawerModel)
    this.props.onSubmit(this.state.approvalDrawerModel)
  }

  onRadioChange = (e, field) => {
    this.state.config[field] = e.target.value
    this.setState({
      config: this.state.config
    })
  }

  onCloseDrawer = () => {
    this.props.onCloseDrawer()
  }

  /* 关闭人员选择框 */
  closeMember = () => {
    this.setState({
      memberSelectorVisible: false
    })
  }

  showMemberSelector = () => {
    this.setState({
      memberSelectorVisible: true
    })
    this.editMemberRef.current.wrappedInstance.setCheck((this.state.config.users || []).filter(i => !i.leave))
  }

  /* 选择人员后回调 */
  memberSelectorCallback = val => {
    if (val.length > 20) {
      Message.warn('最多可添加20个成员')
      return;
    }
    const { config } = this.state
    config.users = val.map(item => {
      return {
        uid: item.id.toString(),
        uname: typeof item.name == 'string' ? item.name : item.name.props.children
      }
    })
    this.setState({
      config,
      memberSelectorVisible: false
    })
  }

  onTitleChange = (e) => {
    this.state.approvalDrawerModel.node_name = e.target.value
    this.setState({
      approvalDrawerModel: this.state.approvalDrawerModel
    })
  }

  onSelectChange = (val, field) => {
    this.state.config[field] = val
    this.setState({
      config: this.state.config
    })
  }

  onTitleBlur = () => {
    this.setState({
      titleEditable: false
    })
  }

  onTitleEdit = () => {
    this.setState({
      titleEditable: true
    }, () => {
      this.inputRef.current.focus()
    })
  }

  onDeleteMember = (index) => {
    this.state.config.users.splice(index, 1);
    this.setState({
      config: this.state.config
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

  /* 初始化 */
  initData = () => {
    if (this.state.approvalDrawerModel.node_value) {
      const config = JSON.parse(this.state.approvalDrawerModel.node_value);
      console.log(`抽屉初始化数据`, config)
      if (config.user_type === SERIES_SUPERIOR) {
        // leader_level, root_level前端标识两个选择框，实际都是取level_num
        if (config.level_type == 1) {
          config.leader_level = config.level_num
        } else {
          config.root_level = config.level_num
        }
      } else {
        config.leader_level = config.level_num
      }

      if (config.user_type === APPOINT_ROLE) {
        config.roles = (config.roles || []).map(role => {
          return {
            role_id: role.rid,
            role_name: role.rname,
            is_empty: role.is_empty,
            is_del: role.is_del
          }
        })
      }

      if (!config.sign_method) {
        config.sign_method = 2
      }
      this.setState({
        config
      })
    }
  }

  componentDidMount() {
    this.initData()
  }

  render() {
    const { approvalDrawerModel, titleEditable, config, memberSelectorVisible, treeData, roleSelectorVisible } = this.state;
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
            <span className="edit-title">{approvalDrawerModel.node_name}</span>
            <span className="edit-icon" onClick={this.onTitleEdit} style={{ marginLeft: 10 }}></span>
          </Hidden>
          <Hidden visible={titleEditable}>
            <Input maxLength={20} value={approvalDrawerModel.node_name} ref={this.inputRef} onChange={this.onTitleChange} onBlur={this.onTitleBlur} style={{ width: 300 }}></Input>
          </Hidden>
        </div>
        <div className="drawer-content-wrapper">
          <h1 className="drawer-title">设置审批人</h1>
          <Radio.Group name="radiogroup" className="approval-type-radio-group" onChange={(e) => { this.onRadioChange(e, 'user_type') }} value={config.user_type}>
            <Radio className="approval-type-radio" value={APPOINT_SUPERIOR}>指定主管</Radio>
            <Radio className="approval-type-radio" value={APPOINT_MEMBERS}>指定成员</Radio>
            <Radio className="approval-type-radio" value={SERIES_SUPERIOR}>连续多级主管<HoverTips>发起人向上的各级主管依次审批</HoverTips></Radio>
            <Radio className="approval-type-radio" value={APPOINT_ROLE}>指定用户组<RolePopover></RolePopover></Radio>
          </Radio.Group>
          <Hidden visible={config.user_type == APPOINT_SUPERIOR}>
            <div>
              <span style={{ marginRight: 14 }}>发起人的</span>
              <Select className="approval-level-select" onChange={(e) => { this.onSelectChange(e, 'leader_level') }} value={config.leader_level || '1'}>
                {LEADER_OPTIONS.map(item => {
                  return (
                    <Option value={item.value} key={item.value}>{item.label}</Option>
                  )
                })}
              </Select>
            </div>
          </Hidden>
          <Hidden visible={config.user_type == APPOINT_MEMBERS}>
            <h1 className="drawer-title">添加成员：<span className="sub-title">（不超过20个）</span></h1>
            <Hidden visible={config.users && config.users.length > 0}>
              <SelectedMember showSelector={this.showMemberSelector} onDelete={this.onDeleteMember} members={config.users}></SelectedMember>
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
          <Hidden visible={config.user_type == SERIES_SUPERIOR}>
            <h1 className="drawer-title">根据申请人执行依次向上审批：</h1>
            <Radio.Group name="approve" value={config.level_type || 1} onChange={(e) => { this.onRadioChange(e, 'level_type') }}>
              <div style={{ marginBottom: 16 }}>
                <Radio value={1}><span className="text-split">直到发起人向上的</span></Radio>
                <Select className="approval-level-select" onChange={(e) => { this.onSelectChange(e, 'leader_level') }} value={config.leader_level || '1'}>
                  {LEADER_OPTIONS.map(item => {
                    return (
                      <Option value={item.value} key={item.value}>{item.label}</Option>
                    )
                  })}
                </Select>
              </div>
              <div>
                <Radio value={2}><span className="text-split">直到通讯录中</span></Radio>
                <Select className="approval-level-select" onChange={(e) => { this.onSelectChange(e, 'root_level') }} value={config.root_level || '1'}>
                  {ORGANIZATION_LEADER_OPTIONS.map(item => {
                    return (
                      <Option value={item.value} key={item.value}>{item.label}</Option>
                    )
                  })}
                </Select>
              </div>
            </Radio.Group>
          </Hidden>
          <Hidden visible={SHOW_SIGN_METHOD_TYPES.includes(config.user_type) || (config.user_type == APPOINT_MEMBERS && config.users && config.users.length > 1)}>
            <h1 className="drawer-title approval-type-title">多人审批时采用的审批方式：</h1>
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

export default ApprovalDrawer