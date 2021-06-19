import React, { Component, createRef } from 'react'
import { deepCopy } from '@/utils'
import Hidden from '@/components/Hidden';
import { Input, Button, Select, message as Message } from 'antd'
import SelectedMember from './form/selected_member'
import { PlusOutlined } from '@ant-design/icons'
import { LEADER_OPTIONS } from '../constant'

const { Option } = Select

export default class NotifyDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerModel: deepCopy(this.props.drawerData),
      titleEditable: false,
      treeData: [],
      config: {}
    }
  }
  inputRef = createRef()
  editMemberRef = createRef()

  // 提交表单
  submit = () => {
    let { cc_superiors, users } = this.state.config;
    users = users.filter(item => !item.leave);
    if ((!cc_superiors || cc_superiors.length == 0) && (!users || users.length == 0)) {
      Message.warn('请选择指定成员或者添加指定上级')
      return;
    }
    let node_value = {};
    if (users && users.length > 0) {
      node_value.users = users
    }
    if (cc_superiors && cc_superiors.length > 0) {
      node_value.level_num = (cc_superiors.map(item => item.level_num)).join(',')
    }
    this.state.drawerModel.node_value = JSON.stringify(node_value);
    console.log('更新后的节点数据', this.state.drawerModel)
    this.props.onSubmit(this.state.drawerModel)
  }

  // 节点名字修改失焦
  onTitleBlur = () => {
    this.setState({
      titleEditable: false
    })
  }

  // 点击激活节点名字修改
  onTitleEdit = () => {
    this.setState({
      titleEditable: true
    }, () => {
      this.inputRef.current.focus()
    })
  }

  // 关闭抽屉
  onCloseDrawer = () => {
    this.props.onCloseDrawer()
  }

  /* 关闭人员选择框 */
  closeMember = () => {
    this.setState({
      memberSelectorVisible: false
    })
  }

  // 选择人员后回调
  memberSelectorCallback = val => {
    const { config } = this.state
    if (val.length > 20) {
      Message.warn('最多可添加20个成员')
      return;
    }
    config.users = val.map(item => {
      return {
        type: item.type,
        uid: item.id.toString(),
        uname: typeof item.name == 'string' ? item.name : item.name.props.children
      }
    })
    this.setState({
      config,
      memberSelectorVisible: false
    })
  }

  // 标题更改
  onTitleChange = (e) => {
    this.state.drawerModel.node_name = e.target.value
    this.setState({
      drawerModel: this.state.drawerModel
    })
  }

  // 展示选择人员框
  showMemberSelector = () => {
    this.setState({
      memberSelectorVisible: true
    })
    this.editMemberRef.current.wrappedInstance.setCheck((this.state.config.users || []).filter(i => !i.leave))
  }

  // 点击添加上级
  addSuperior = () => {
    const { cc_superiors = [] } = this.state.config;
    cc_superiors.push({ level_num: '1' });
    this.state.config.cc_superiors = cc_superiors;
    this.setState({
      config: this.state.config
    })
  }

  // 选择指定上级
  onSuperiorTypeChange = (e, index) => {
    const { cc_superiors = [] } = this.state.config;
    cc_superiors[index].level_num = e;
    this.state.config.cc_superiors = cc_superiors;
    this.setState({
      config: this.state.config
    })
  }

  // 删除指定上级
  deleteCondition = (index) => {
    const { cc_superiors = [] } = this.state.config;
    cc_superiors.splice(index, 1)
    this.state.config.cc_superiors = cc_superiors;
    this.setState({
      config: this.state.config
    })
  }

  // 删除指定人员 
  onDeleteMember = (index) => {
    this.state.config.users.splice(index, 1);
    this.setState({
      config: this.state.config
    })
  }

  initData = () => {
    if (this.state.drawerModel.node_value) {
      const config = JSON.parse(this.state.drawerModel.node_value);
      console.log(`初始化抽屉数据`, config)
      if (config.level_num) {
        const levels = config.level_num.split(',');
        let cc_superiors = []
        levels.forEach((item) => {
          cc_superiors.push({ level_num: item })
        })
        config.cc_superiors = cc_superiors
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
    const { titleEditable, drawerModel, treeData, memberSelectorVisible, config } = this.state
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
          <h1 className="drawer-title">指定成员：<span className="sub-title">（可抄送成员）</span></h1>
          <Hidden visible={config.users && config.users.length > 0}>
            <SelectedMember showSelector={this.showMemberSelector} onDelete={this.onDeleteMember} members={config.users}></SelectedMember>
          </Hidden>
          <Button
            onClick={this.showMemberSelector}
            type="primary"
            className="drawer-add-notify-member"
          >
            <PlusOutlined className="drawer-add-member-icon" /> 添加
          </Button>
          <h1 className="drawer-title">指定上级：<span className="sub-title">（可抄送指定层级上单）</span></h1>
          {
            config.cc_superiors && config.cc_superiors.map((item, index) => {
              return (
                <div key={index} className="notify-drawer-appoint-superiors">
                  <Select value={item.level_num || '1'} onChange={(e) => { this.onSuperiorTypeChange(e, index) }}>
                    {LEADER_OPTIONS.map(option => {
                      return (
                        <Option key={option.value} value={option.value}>{option.label}</Option>
                      )
                    })}
                  </Select>
                  <span className="condition-edit-close" onClick={() => { this.deleteCondition(index) }}></span>
                </div>
              )
            })
          }
          <Button
            onClick={this.addSuperior}
            type="primary"
            className="drawer-add-notify-condition"
          >
            <PlusOutlined /> 添加上级
          </Button>
        </div>
        <div className="button-bar">
          <Button type="primary" onClick={() => { this.submit() }}>确定</Button>
          <Button onClick={this.onCloseDrawer}>取消</Button>
        </div>
      </div>
    )
  }
}
