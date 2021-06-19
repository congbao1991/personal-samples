/*eslint-disable */
import React, { Component, createRef } from 'react'
import './index.less'
import cs from 'classname';
import Hidden from '@/components/Hidden/index';
import { Popover, Button, Drawer, Modal, Input, message as Message, Switch, Tooltip } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import {
  APPLICANT_NODE, ROUTER_NODE, APPROVAL_NODE, PAYMENT_NODE, APPLICIANT_DEPART_CONDITION,
  FINANCIAL_NODE, END_NODE, NOTIFY_NODE, SELECTOR_NODE, generalApprovalNode,
  generalFinacialNode, generalNotifyNode, generalPaymentNode, generalSelectorNode,
  APPLICIANT_CONDITION, COMPANY_TITLE_CONDITION, AMOUNT_CONDITION, FEE_TYPE_CONDITION,
  APPOINT_SUPERIOR, APPOINT_MEMBERS, SERIES_SUPERIOR, CONDITION_OPTIONS, TRAVEL_MODE_CONDITION, TRAVEL_TYPE_CONDITION, OFFICE_LOCATION_CONDITION,
  TRAVLE_TIME_CONDITION, ROLE_CONDITION, APPOINT_ROLE
} from './constant';
import { amountRelationFilter, conditionTypeFilter, leaderLevelFilter, conditonRelationFilter, feeTypeConditonRelationFilter, organLeaderLevelFilter } from './filters';
import { randomString, formatData, resetPriority, checkNodeMap, findIndex4paymentNode, reverseData } from './utils'
import ApprovalDrawer from './components/approval_drawer';
import ConditionDrawer from './components/condition_drawer';
import FinancialDrawer from './components/financial_drawer';
import PaymentDrawer from './components/payment_drawer';
import NotifyDrawer from './components/notify_drawer';
import { LeftOutlined } from '@ant-design/icons'
import qs from 'qs';
import { deepCopy, generalOptionFilter } from '@/utils';
import { debounce } from '@/utils/throttle-debounce'

let DRAWER_NODE = {}
let LINENODES_CONFIG = {}

const amountTitleFilter = (input, options, tempType) => {
  if (input === '' || input === undefined || input === null) {
    return ''
  }
  const val = options.find(opt => opt.value == input && opt.template_types.includes(Number(tempType)));
  if (val) {
    return val.label
  }
  return input
}

export default class ApprovalFlow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      approvalFlowData: [],
      drawerVisible: false,
      approvalDrawerModel: {},
      tempTitleEdit: false,
      titleEditable: false,
      scaleStyle: null,
      scale: 1,
      submitLoading: false,
      template_name: null,
      template_id: null,
      template_type: null,
      doc_tmpl_type: null,
      conditions_quit: false,
      conditionLabelMap: {},
      template: 2, // 前端标识  用于区分模板是否含有财务和支付节点逻辑  1：没有  2：有
    }

    this.showDrawer = debounce(300, false, this.showDrawer)
  }

  tempTitleRef = createRef()

  componentDidMount() {
    this.initData()
  }

  initData = () => {
    const { template_name = '', template_id, template_type, doc_tmpl_type } = qs.parse(location.search, { ignoreQueryPrefix: true });
    let template
    switch (+doc_tmpl_type) {
      // 申请单
      case 2:
        template = 1;
        break;
      default:
        template = 2;
        break;
    }
    let approvalFlowData
    if (template == 1) {
      approvalFlowData = [
        { node_type: APPLICANT_NODE, key: randomString() },
        generalApprovalNode(2),
        { node_type: END_NODE, key: randomString() }
      ]
    } else {
      approvalFlowData = [
        { node_type: APPLICANT_NODE, key: randomString() },
        generalApprovalNode(2),
        generalFinacialNode(),
        generalPaymentNode(),
        { node_type: END_NODE, key: randomString() }
      ]
    }
    this.setState({
      approvalFlowData,
      template_name: decodeURIComponent(template_name),
      template_type,
      doc_tmpl_type,
      template
    })
  }

  // 保存模板
  onSaveTemp = () => {
    this.setState({
      submitLoading: true
    })
    // 检查节点信息是否完整
    const checkNode = node => {
      let node_value = node.node_value && JSON.parse(node.node_value) || {}
      if (node_value.users && this.haddleQuit(node_value.users)) {
        return false
      }
      if (node_value.roles && this.haddleRoleStatus(node_value.roles)) {
        return false
      }
      if (node.node_type === APPROVAL_NODE) {
        // 指定成员，成员数组为空时
        if (node_value.user_type == 3 && (!node_value.users || node_value.users.length == 0)) {
          return false
        }
      }
      if (node.node_type === FINANCIAL_NODE || node.node_type === PAYMENT_NODE) {
        // 指定成员，成员数组为空时
        if (node_value.user_type == 3 && (!node_value.users || node_value.users.length == 0)) {
          return false
        }
      }
      if (node.node_type === SELECTOR_NODE) {
        if ((!node_value.conditions || node_value.conditions.length == 0) && !node.default) {
          return false
        }

        // 检查条件节点里面是否已经有已删除用户组配置
        const { conditions = [] } = node_value
        let flag = true;
        for (let i = 0; i < conditions.length; i++) {
          if (conditions[i].type === ROLE_CONDITION) {
            let roles = conditions[i].value.split(',');
            for (let j = 0; j < roles.length; j++) {
              let [role_id, role_name, is_del] = roles[j].split('#')
              if (is_del === 'true') {
                flag = false;
                break
              }
            }
          }
        }
        if (!flag) {
          return flag
        }
      }
      if (node.node_type === NOTIFY_NODE) {
        if ((!node_value.users || node_value.users.length == 0) && !node_value.level_num) {
          return false
        }
      }
      return true
    }
    // 检查递归函数
    const check = (arr) => {
      let flag = true;
      for (let i = 0; i < arr.length; i++) {
        flag = checkNode(arr[i])
        if (!flag) {
          break;
        }
        if (arr[i].node_type == SELECTOR_NODE) {
          flag = check(arr[i].child_nodes)
        }
        if (!flag) {
          break;
        }
      }
      return flag
    }
    const nodes = reverseData(deepCopy(this.state.approvalFlowData))
    let submitFlag = check(nodes);

    if (!submitFlag) {
      this.setState({
        submitLoading: false
      })
      Message.warn('存在节点信息配置不完整，详见流程图警告提示')
      return
    }
    const postdata = {
      template_id: this.state.template_id,
      template_name: this.state.template_name,
      template_type: +this.state.template_type,
      nodes: nodes.slice(1, -1)
    }
    Message.success('保存成功')
    this.goBack()
  }

  // 生成条件线上所有模板
  generateNodeContainer = (approvalFlowData) => {
    return approvalFlowData && approvalFlowData.map((item, index) => {
      switch (item.node_type) {
        case APPLICANT_NODE:
        case END_NODE:
          return this.generateApplicantNode(item, index, approvalFlowData)
        case FINANCIAL_NODE:
          return this.generateFinancialNode(item, index, approvalFlowData)
        case PAYMENT_NODE:
          return this.generatePaymentNode(item, index, approvalFlowData)
        case APPROVAL_NODE:
          return this.generateApprovalNode(item, index, approvalFlowData)
        case NOTIFY_NODE:
          return this.generateNotifyNode(item, index, approvalFlowData)
        case ROUTER_NODE:
          return this.generateRouteNode(item, index, approvalFlowData)
      }
    })
  }

  // 生成开始、结束节点
  generateApplicantNode = (item, index, approvalFlowData) => {
    return (
      <div className="node-container" key={item.key}>
        <div>
          <div className="node-box-start">
            <Hidden visible={item.node_type != END_NODE}>
              <div className="content">开始</div>
            </Hidden>
            <Hidden visible={item.node_type == END_NODE}>
              <div className="content">结束</div>
            </Hidden>
          </div>
        </div>
        <Hidden visible={item.node_type != END_NODE}>
          <div className="add-node-btn-box">
            <div className="add-node-btn">
              <Popover placement="right" content={this.generateCreateNodeBtns(item.node_type, index, approvalFlowData)}>
                <div className="btn"></div>
              </Popover>
            </div>
          </div>
        </Hidden>
      </div>
    )
  }

  // 生成路由节点模板
  generateRouteNode(item, index, approvalFlowData) {
    return (
      <div className="node-container" key={item.key}>
        <div className="branch-wrap">
          <div className="branch-wrap-box">
            <div className="branch-box">
              <div className="add-branch" onClick={() => { this.addConditionNode(item.lineNodes) }}>添加条件</div>
              {item.lineNodes.map((target, idx) => {
                return (
                  <div className="col-box" key={target.key}>
                    <Hidden visible={idx == 0}>
                      <div className="top-left-cover-line"></div>
                      <div className="bottom-left-cover-line"></div>
                    </Hidden>
                    <Hidden visible={idx == item.lineNodes.length - 1}>
                      <div className="top-right-cover-line"></div>
                      <div className="bottom-right-cover-line"></div>
                    </Hidden>
                    {this.generateSelectorNode(target, idx, item.lineNodes, { currentNodes: item, index: idx, approvalFlowData })}
                    {this.generateNodeContainer(target.child_nodes)}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="add-node-btn-box">
          <div className="add-node-btn">
            <Popover placement="right" content={this.generateCreateNodeBtns(item.node_type, index, approvalFlowData)}>
              <div className="btn"></div>
            </Popover>
          </div>
        </div>
      </div>
    )
  }

  // 生成条件节点
  generateSelectorNode = (item, index, approvalFlowData, lineNodesConfig) => {
    let conditions
    let conditionTemp = {}

    if (item.node_value) {
      // item.node_value = '{"conditions":[{"type":1,"compare":1,"value":"20207679#李雪,20208045#李李#true"},{"type":8,"compare":1,"value":"北京市|北京市"}]}'
      conditions = JSON.parse(item.node_value).conditions;
    }
    if (conditions) {
      conditionTemp = this.generateConditionTemp(conditions, Number(this.state.doc_tmpl_type))
    }
    return (
      <div className="node-container" key={item.key}>
        <div className='node-condition'>
          <div className={cs('node-box', 'node-box-condition')} onClick={(e) => { this.showDrawer(e, item, lineNodesConfig) }}>
            <div className="line-end-arrow"></div>
            {conditionTemp.isHaveQuit && this.generateCreateWarning('人员离职或用户组删除')}
            <div className="title">
              <span className="title-text">{item.node_name}</span>
              <span className="node-priority">{item.node_option}</span>
              <Hidden visible={!item.default}>
                <span className="node-title-operate">
                  <CloseOutlined onClick={(e) => { this.deleteCondition(e, lineNodesConfig) }} />
                </span>
              </Hidden>
            </div>
            <div className={cs('content', { 'defaul-condition': item.default })}>
              <Hidden visible={!conditions && !item.default}>
                <div className="no-condition"><span></span>请设置条件</div>
              </Hidden>
              <Hidden visible={!conditions && item.default}>
                未满足其他条件分支的情况，将使用默认流程
              </Hidden>
              <Hidden visible={conditions}>
                <div className="condition-line" key="title">需同时满足以下条件：</div>
                {conditionTemp.conditionsNode}
              </Hidden>
            </div>
          </div>
        </div>
        <div className="add-node-btn-box">
          <div className="add-node-btn">
            <Popover placement="right" content={this.generateCreateNodeBtns(item.node_type, index, approvalFlowData)}>
              <div className="btn"></div>
            </Popover>
          </div>
        </div>
      </div>
    )
  }


  // 生成审批节点
  generateApprovalNode = (item, index, approvalFlowData) => {
    const data = JSON.parse(item.node_value);
    const { isHaveQuit, members } = this.haddleMembers(data.users);
    const { isEmpty, isDel, tooltip, roles } = this.haddleRoles(data.roles);
    return (
      <div className="node-container" key={item.key}>
        <div className={cs('node-box', 'node-box-approval')} onClick={(e) => { this.showDrawer(e, item) }}>
          <div className="line-end-arrow"></div>
          {isHaveQuit && this.generateCreateWarning('审批人已离职')}
          {(isEmpty || isDel) && this.generateCreateWarning(tooltip)}
          <div className="title">
            <span className="title-text">{item.node_name}</span>
            <span className="node-title-operate">
              <CloseOutlined style={{ color: '#898c96' }} onClick={(e) => { this.deleteNode(e, index, approvalFlowData) }}></CloseOutlined>
            </span>
          </div>
          <Hidden visible={data.user_type == APPOINT_SUPERIOR}>
            <div className="content">
              {leaderLevelFilter(data.level_num)}
            </div>
          </Hidden>
          <Hidden visible={data.user_type == APPOINT_MEMBERS}>
            <Hidden visible={members && members.length > 0}>
              <span className="content">
                <div className="condition-line">指定成员：{members && members}</div>
              </span>
            </Hidden>
            <Hidden visible={!members || members.length == 0}>
              <span className="content no-condition"><span></span>请指定审批人</span>
            </Hidden>
          </Hidden>
          <Hidden visible={data.user_type == APPOINT_ROLE}>
            <Hidden visible={roles && roles.length > 0}>
              <span className="content">
                <div className="condition-line">指定用户组：{roles && roles}</div>
              </span>
            </Hidden>
          </Hidden>
          <Hidden visible={data.user_type == SERIES_SUPERIOR}>
            <Hidden visible={data.level_type == 1}>
              <div className="content">从直接主管到发起人向上的{leaderLevelFilter(data.level_num)}</div>
            </Hidden>
            <Hidden visible={data.level_type == 2}>
              <div className="content">从直接主管到通讯录级别最高的{organLeaderLevelFilter(data.level_num)}</div>
            </Hidden>
          </Hidden>
        </div>
        <div className="add-node-btn-box">
          <div className="add-node-btn">
            <Popover placement="right" content={this.generateCreateNodeBtns(item.node_type, index, approvalFlowData)}>
              <div className="btn"></div>
            </Popover>
          </div>
        </div>
      </div>
    )
  }

  // 生成财务审核节点
  generateFinancialNode = (item, index, approvalFlowData) => {
    const data = JSON.parse(item.node_value);
    const { isHaveQuit, members } = this.haddleMembers(data.users);
    const { isEmpty, isDel, tooltip, roles } = this.haddleRoles(data.roles);
    return (
      <div className="node-container" key={item.key}>
        <div className={cs('node-box', 'node-box-financial')} onClick={(e) => { this.showDrawer(e, item) }}>
          <div className="line-end-arrow"></div>
          {isHaveQuit && this.generateCreateWarning('审核人已离职')}
          {(isEmpty || isDel) && this.generateCreateWarning(tooltip)}
          <div className="title">
            <span className="title-text">{item.node_name}</span>
          </div>
          <Hidden visible={data.user_type == 1}>
            <span className="content">
              <div className="condition-line">全部审单会计</div>
            </span>
          </Hidden>
          <Hidden visible={data.user_type == 2 && members && members.length > 0}>
            <span className="content">
              <div className="condition-line">审单会计：{members && members}</div>
            </span>
          </Hidden>
          <Hidden visible={data.user_type == 3 && members && members.length > 0}>
            <span className="content">
              <div className="condition-line">指定成员：{members && members}</div>
            </span>
          </Hidden>
          <Hidden visible={data.user_type == APPOINT_ROLE}>
            <Hidden visible={roles && roles.length > 0}>
              <span className="content">
                <div className="condition-line">指定用户组：{roles && roles}</div>
              </span>
            </Hidden>
          </Hidden>
        </div>
        <div className="add-node-btn-box">
          <div className="add-node-btn">
            <Popover placement="right" content={this.generateCreateNodeBtns(item.node_type, index, approvalFlowData)}>
              <div className="btn"></div>
            </Popover>
          </div>
        </div>
      </div>
    )
  }


  // 生成抄送节点
  generateNotifyNode = (item, index, approvalFlowData) => {
    const data = JSON.parse(item.node_value);
    const { isHaveQuit, members } = this.haddleMembers(data.users);
    const superiors = data.level_num && data.level_num.split(',').map(item => {
      return leaderLevelFilter(item)
    })
    return (
      <div className="node-container" key={item.key}>
        <div className={cs('node-box', 'node-box-notify')} onClick={(e) => { this.showDrawer(e, item) }}>
          <div className="line-end-arrow"></div>
          {isHaveQuit && this.generateCreateWarning('抄送人已离职')}
          <div className="title">
            <span className="title-text">{item.node_name}</span>
            <span className="node-title-operate">
              <CloseOutlined style={{ color: '#898c96' }} onClick={(e) => { this.deleteNode(e, index, approvalFlowData) }}></CloseOutlined>
            </span>
          </div>
          <Hidden visible={(!members || members.length == 0) && (!superiors || superiors.length == 0)}>
            <span className="content no-condition"><span></span>请指定抄送人</span>
          </Hidden>
          <Hidden visible={(members && members.length > 0) || (superiors && superiors.length > 0)}>
            <div className="content">
              <div className="condition-line">指定成员：{members && members}{members && superiors && ','}{superiors && superiors.join(',')}</div>
            </div>
          </Hidden>
        </div>
        <div className="add-node-btn-box">
          <div className="add-node-btn">
            <Popover placement="right" content={this.generateCreateNodeBtns(item.node_type, index, approvalFlowData)}>
              <div className="btn"></div>
            </Popover>
          </div>
        </div>
      </div>
    )
  }

  // 生成支付节点
  generatePaymentNode = (item, index, approvalFlowData) => {
    const data = JSON.parse(item.node_value);
    const { isHaveQuit, members } = this.haddleMembers(data.users);
    const { isEmpty, isDel, tooltip, roles } = this.haddleRoles(data.roles);
    const changePayStatus = (val, event, node) => {
      const node_value = JSON.parse(node.node_value);
      event && event.preventDefault();
      event && event.stopPropagation();
      if (val) {
        node_value.pay_status = 1;
      } else {
        node_value.pay_status = 2;
      }
      node.node_value = JSON.stringify(node_value);
      this.setState({
        approvalFlowData: this.state.approvalFlowData
      })
    }
    return (
      <div className="node-container" key={item.key}>
        <div className={cs('node-box', 'node-box-payment')} onClick={(e) => { this.showDrawer(e, item) }}>
          <div className="line-end-arrow"></div>
          {isHaveQuit && this.generateCreateWarning('结算人已离职')}
          {(isEmpty || isDel) && this.generateCreateWarning(tooltip)}
          <div className="title">
            <span className="title-text">{item.node_name}</span>
            <span className="node-switch" >
              <Switch size="small" onChange={(val, event) => { changePayStatus(val, event, item) }} checked={data.pay_status == 1} />
            </span>
          </div>
          <Hidden visible={data.user_type == 1}>
            <span className="content">
              <div className="condition-line">全部出纳</div>
            </span>
          </Hidden>
          <Hidden visible={data.user_type == 2 && members && members.length > 0}>
            <span className="content">M
              <div className="condition-line">出纳：{members && members}</div>
            </span>
          </Hidden>
          <Hidden visible={data.user_type == 3 && members && members.length > 0}>
            <span className="content">
              <div className="condition-line">指定成员：{members && members}</div>
            </span>
          </Hidden>
          <Hidden visible={data.user_type == APPOINT_ROLE}>
            <Hidden visible={roles && roles.length > 0}>
              <span className="content">
                <div className="condition-line">指定用户组：{roles && roles}</div>
              </span>
            </Hidden>
          </Hidden>
        </div>
        <div className="add-node-btn-box">
          <div className="add-node-btn">
            <Popover placement="right" content={this.generateCreateNodeBtns(item.node_type, index, approvalFlowData)}>
              <div className="btn"></div>
            </Popover>
          </div>
        </div>
      </div>
    )
  }

  //生成成员有已离职提示
  generateCreateWarning = (title) => {
    return (
      <Tooltip placement="top" title={title}>
        <div className="node-box-warning">
          <img src="https://apg-1258944054.cos.ap-guangzhou.myqcloud.com/apg/pc-micro-reimburse/common/%21.svg" alt="" />
        </div>
      </Tooltip>
    )
  }

  // 判断人员中是否有已离职
  haddleMembers(users) {
    let isHaveQuit = false
    const members = users && users.map((item, index) => {
      let className = ''
      if (item.leave || item.is_del || item.is_empty) {
        isHaveQuit = true
        className = 'quit'
      }
      return (
        <span className={className} key={'members' + item.uid}>{`${item.uname}${item.leave ? '(已离职)' : ''}`}</span>
      )
    })
    return { members, isHaveQuit }
  }

  // 判断人员中是否有已离职
  haddleRoles = (users) => {
    let isEmpty = false
    let isDel = false
    let tooltip = ''
    const roles = users && users.map((item, index) => {
      let className = ''
      if (item.is_del) {
        isDel = true
        className = 'quit'
        tooltip = '用户组已删除'
      }
      if (item.is_empty) {
        isEmpty = true
        className = 'quit'
        tooltip = '用户组无成员'
      }
      return (
        <span className={className} key={'members' + item.rid}>{`${item.rname}${item.is_empty ? '(无成员)' : ''}${item.is_del ? '(已删除)' : ''}`}</span>
      )
    })
    return { roles, isEmpty, isDel, tooltip }
  }

  // 判断审批流中是否有已离职
  haddleQuit(users) {
    let isHaveQuit = false
    users && users.map(item => {
      if (item.leave) {
        isHaveQuit = true
        return
      }
    })
    return isHaveQuit
  }

  // 判断审批流中用户组是否已删除或者无成袁
  haddleRoleStatus(users) {
    let flag = false
    users && users.forEach(item => {
      if (item.is_empty || item.is_del) {
        flag = true
        return
      }
    })
    return flag
  }


  // 生成条件节点显示模板
  generateConditionTemp = (conditions, tempType) => {
    const { conditionLabelMap } = this.state
    const all_tmpl_options = []
    const optionFilter = generalOptionFilter(all_tmpl_options, '已删除')
    if (!conditions) {
      return null
    }
    let isHaveQuit = false
    const conditionsNode = conditions.map((condition, index) => {
      switch (condition.type) {
        case APPLICIANT_CONDITION:
          const members = condition.value && condition.value.split(',').map(item => {
            let [id, name, leave] = item.split('#');
            let className = ''
            if (leave) {
              isHaveQuit = true
              className = 'quit'
              name = name + '(已离职)'
            }
            return (
              <span className={className} key={'members' + id}>{name}</span>
            )
          })
          return <div className="condition-line conditions" key={index}>{conditionLabelMap['commiter'] || conditionTypeFilter(APPLICIANT_CONDITION)}: {conditonRelationFilter(condition.compare)} {members}</div>
        case ROLE_CONDITION:
          const roles = condition.value && condition.value.split(',').map(item => {
            let [role_id, role_name, is_del] = item.split('#');
            let className = ''
            if (is_del && is_del === 'true') {
              isHaveQuit = true
              className = 'quit'
              role_name = role_name + '(已删除)'
            }
            return (
              <span className={className} key={'members' + role_id}>{role_name}</span>
            )
          })
          return <div className="condition-line conditions" key={index}>{conditionTypeFilter(ROLE_CONDITION)}: {conditonRelationFilter(condition.compare)} {roles}</div>
        case APPLICIANT_DEPART_CONDITION:
          const departs = condition.value && condition.value.split(',').map(item => {
            const [id, name] = item.split('#');
            return name
          })
          return <div className="condition-line conditions" key={index}>{conditionLabelMap['department'] || conditionTypeFilter(APPLICIANT_DEPART_CONDITION)}: {conditonRelationFilter(condition.compare)} {departs.join(',')}</div>
        case COMPANY_TITLE_CONDITION:
          const titles = condition.value && condition.value.split(',').map(item => {
            const [ienterprise_id, enterprise_name] = item.split('#');
            return enterprise_name
          })
          return <div className="condition-line conditions" key={index}>{conditionLabelMap['title'] || conditionTypeFilter(COMPANY_TITLE_CONDITION)}: {conditonRelationFilter(condition.compare)} {titles.join(',')}</div>
        case FEE_TYPE_CONDITION:
          const fees = condition.value && condition.value.split(',').map(item => {
            const [fee_type, fee_name] = item.split('#');
            return fee_name
          })
          return <div className="condition-line conditions" key={index}>{conditionTypeFilter(FEE_TYPE_CONDITION)}: {feeTypeConditonRelationFilter(condition.compare)} {fees.join(',')}</div>
        case TRAVEL_MODE_CONDITION:
          const modes = condition.value && condition.value.split(',').map(item => {
            return optionFilter(item)
          })
          return <div className="condition-line conditions" key={index}>{conditionLabelMap['trans_way'] || conditionTypeFilter(TRAVEL_MODE_CONDITION)}: {feeTypeConditonRelationFilter(condition.compare)} {modes.join(',')}</div>
        case TRAVEL_TYPE_CONDITION:
          const types = condition.value && condition.value.split(',').map(item => {
            return optionFilter(item)
          })
          return <div className="condition-line conditions" key={index}>{conditionLabelMap['travel_type'] || conditionTypeFilter(TRAVEL_TYPE_CONDITION)}: {conditonRelationFilter(condition.compare)} {types.join(',')}</div>
        case OFFICE_LOCATION_CONDITION:
          const office = condition.value && condition.value.split(',').map(item => {
            return item
          })
          return <div className="condition-line conditions" key={index}>{conditionTypeFilter(OFFICE_LOCATION_CONDITION)}: {conditonRelationFilter(condition.compare)} {office.join(',')}</div>
        case TRAVLE_TIME_CONDITION:
          const [startTime, endTime] = condition.value && condition.value.split(',')
          return (
            <div className="condition-line conditions" key={index}>
              {amountTitleFilter(condition.type, CONDITION_OPTIONS, tempType)}: {amountRelationFilter(condition.compare)}{(+startTime)}{endTime && ` - ${(+endTime)}`}小时
            </div>
          )
        case AMOUNT_CONDITION:
          const [startAmount, endAmount] = condition.value && condition.value.split(',')
          return (
            <div className="condition-line conditions" key={index}>
              {conditionLabelMap['amount'] || amountTitleFilter(condition.type, CONDITION_OPTIONS, tempType)}: {amountRelationFilter(condition.compare)}{(+startAmount).div(100)}{endAmount && `-${(+endAmount).div(100)}`}
            </div>
          )

      }
    })
    return { isHaveQuit, conditionsNode }
  }

  // 生成按钮模板
  generateCreateNodeBtns = (type, index, approvalFlowData) => {
    // 检查当前节点及上面节点是否含有支付节点。如果有则返回true
    const checkPaymentNode = (list) => {
      const arr = list.slice(0, index + 1)
      let flag = false;
      for (var i = 0; i < arr.length; i++) {
        let node = arr[i]
        if (node.node_type === ROUTER_NODE) {
          node.lineNodes.forEach(item => {
            flag = checkPaymentNode(item.child_nodes)
          })
        }
        if (node.node_type === PAYMENT_NODE) {
          flag = true;
          break;
        }
      }
      return flag;
    }

    const showConditionButton = (approvalFlowData) => {
      if (type === SELECTOR_NODE) {
        return true
      }
      return approvalFlowData[index + 1] && approvalFlowData[index + 1].node_type != END_NODE && !checkPaymentNode(approvalFlowData)
    }
    return (
      <div className="add-button-container">
        <Hidden visible={!checkPaymentNode(approvalFlowData)}>
          <div className="add-button-wrapper">
            <span className="icon audit-icon" onClick={() => { this.onCreateNode(APPROVAL_NODE, index, approvalFlowData) }}></span>
            <span style={{ color: '#007AFF' }} onClick={() => { this.onCreateNode(APPROVAL_NODE, index, approvalFlowData) }}>审批人</span>
          </div>
        </Hidden>
        <div className="add-button-wrapper">
          <span className="icon cc-icon" onClick={() => { this.onCreateNode(NOTIFY_NODE, index, approvalFlowData) }}></span>
          <span style={{ color: '#F8A209' }} onClick={() => { this.onCreateNode(NOTIFY_NODE, index, approvalFlowData) }}>抄送人</span>
        </div>
        <Hidden visible={showConditionButton(approvalFlowData)}>
          <div className="add-button-wrapper">
            <span className="icon condition-icon" onClick={() => { this.onCreateNode(ROUTER_NODE, index, approvalFlowData) }}></span>
            <span style={{ color: '#898C96' }} onClick={() => { this.onCreateNode(ROUTER_NODE, index, approvalFlowData) }}>条件</span>
          </div>
        </Hidden>
      </div>
    )
  }

  // 删除条件
  deleteCondition = (event, lineNodesConfig) => {
    event.stopPropagation();
    Modal.confirm({
      content: '是否确认删除该条件？',
      title: '提示',
      onOk: () => {
        if (lineNodesConfig.currentNodes.lineNodes.length > 2) {
          lineNodesConfig.currentNodes.lineNodes.splice(lineNodesConfig.index, 1);
          // 重置优先级
          resetPriority(lineNodesConfig.currentNodes.lineNodes)
        } else {
          let nodes = lineNodesConfig.currentNodes.lineNodes[1].child_nodes;
          let index = lineNodesConfig.approvalFlowData.findIndex(item => item.key == lineNodesConfig.currentNodes.key);
          lineNodesConfig.approvalFlowData.splice(index, 1, ...nodes)
        }
        this.setState({
          approvalFlowData: this.state.approvalFlowData
        })
      }
    })
  }

  // 删除节点
  deleteNode = (event, index, approvalFlowData) => {
    event.stopPropagation();
    Modal.confirm({
      content: '是否确认删除该节点？',
      title: '提示',
      onOk: () => {
        approvalFlowData.splice(index, 1)
        this.setState({
          approvalFlowData: this.state.approvalFlowData
        })
      }
    })
  }

  // 点击添加条件
  addConditionNode = (lineNodes) => {
    if (lineNodes.length > 98) {
      Message.warn(`最多能添加99个条件`);
      return;
    }
    let defaultMap = []
    // 检查创建条件分支时候可以添加那些node模板，往defaulMap推node类型
    lineNodes.forEach(line => {
      defaultMap = [...defaultMap, ...checkNodeMap(line.child_nodes)]
    })
    // 设置分支的nodes
    let defaultChild = [];
    defaultMap.includes(APPROVAL_NODE) && defaultChild.push(generalApprovalNode())
    defaultMap.includes(FINANCIAL_NODE) && defaultChild.push(generalFinacialNode())
    defaultMap.includes(PAYMENT_NODE) && defaultChild.push(generalPaymentNode())
    lineNodes.splice(-1, 0, generalSelectorNode(defaultChild, `条件${lineNodes.length}`))
    // 重新设置优先级
    resetPriority(lineNodes)
    this.setState({
      approvalFlowData: this.state.approvalFlowData
    })
    console.log(this.state.approvalFlowData)
  }

  // 创建节点
  onCreateNode = (type, index, approvalFlowData) => {
    // 获取当前节点  如果当前节点是条件分支节点，则需要对节点的child_nodes进行节点插入
    let currentNode = approvalFlowData[index];
    const { template } = this.state
    switch (type) {
      case APPROVAL_NODE:
        if (currentNode.node_type == SELECTOR_NODE) {
          currentNode.child_nodes.unshift(generalApprovalNode())
        } else {
          approvalFlowData.splice(index + 1, 0, generalApprovalNode())
        }
        break;
      case NOTIFY_NODE:
        if (currentNode.node_type == SELECTOR_NODE) {
          currentNode.child_nodes.unshift(generalNotifyNode())
        } else {
          approvalFlowData.splice(index + 1, 0, generalNotifyNode())
        }
        break;
      case ROUTER_NODE:
        let list
        let paymentIndex = findIndex4paymentNode(approvalFlowData)
        let endNode = approvalFlowData[approvalFlowData.length - 1];
        if (currentNode.node_type == SELECTOR_NODE) {
          list = currentNode.child_nodes
        }
        else if (index < paymentIndex) {
          if (index + 1 === paymentIndex) {
            list = approvalFlowData.slice(index + 1, -1)
          } else {
            list = approvalFlowData.slice(index + 1, paymentIndex)
          }
        }
        else {
          if (template == 1) {
            if (endNode.node_type == END_NODE) {
              list = approvalFlowData.slice(index + 1, -1)
            } else {
              list = approvalFlowData.slice(index + 1)
            }
          } else {
            if (endNode.node_type == END_NODE) {
              list = approvalFlowData.slice(index + 1, -2)
            } else {
              list = approvalFlowData.slice(index + 1)
            }
          }
        }
        let defaultChild = []
        // 寻找新创建条件分支可插入的子节点类型
        let defaultMap = checkNodeMap(list)
        defaultMap.includes(APPROVAL_NODE) && defaultChild.push(generalApprovalNode())
        defaultMap.includes(FINANCIAL_NODE) && defaultChild.push(generalFinacialNode())
        defaultMap.includes(PAYMENT_NODE) && defaultChild.push(generalPaymentNode())
        if (currentNode.node_type == SELECTOR_NODE) {
          currentNode.child_nodes = [{
            node_type: type,
            key: randomString(),
            lineNodes: [
              generalSelectorNode(defaultChild),
              generalSelectorNode(list, '默认条件', `优先级2`, true)
            ]
          }]
        } else {
          approvalFlowData.splice(index + 1, list.length, {
            node_type: type,
            key: randomString(),
            lineNodes: [
              generalSelectorNode(defaultChild),
              generalSelectorNode(list, '默认条件', `优先级2`, true)
            ]
          })
        }
        break;
    }
    // 跟新模板到dom
    this.setState({
      approvalFlowData: this.state.approvalFlowData
    })
    console.log(this.state.approvalFlowData)
    // let a = reverseData(JSON.parse(JSON.stringify(this.state.approvalFlowData)))
    // console.log(JSON.stringify(a))
    // console.log(formatData(JSON.parse(JSON.stringify(a))))
  }

  // 防抖
  onShowDrawer = (node, lineNodesConfig = null) => {
    // 对象引用暂存数据
    DRAWER_NODE = node;
    if (lineNodesConfig) {
      LINENODES_CONFIG = lineNodesConfig
    }
    if (node.default) {
      return
    }
    this.setState({
      drawerVisible: true,
    })
  }
  // 打开抽屉
  showDrawer = (e, node, lineNodesConfig = null) => {
    this.onShowDrawer(node, lineNodesConfig)
  }

  // 关闭抽屉
  onCloseDrawer = () => {
    this.setState({
      drawerVisible: false
    })
  }

  // 生成抽屉内容
  generateDrawerContent = () => {
    switch (DRAWER_NODE.node_type) {
      case APPROVAL_NODE:
        return <ApprovalDrawer drawerData={DRAWER_NODE} onCloseDrawer={this.onCloseDrawer} onSubmit={this.onDrawerSubmit} />
      case SELECTOR_NODE:
        return <ConditionDrawer
          drawerData={DRAWER_NODE}
          onChangePriority={this.onChangePriority}
          lineNodesConfig={LINENODES_CONFIG}
          onCloseDrawer={this.onCloseDrawer}
          onSubmit={this.onDrawerSubmit}
          conditionLabelMap={this.state.conditionLabelMap}
        />
      case FINANCIAL_NODE:
        return <FinancialDrawer drawerData={DRAWER_NODE} onCloseDrawer={this.onCloseDrawer} onSubmit={this.onDrawerSubmit} />
      case PAYMENT_NODE:
        return <PaymentDrawer drawerData={DRAWER_NODE} onCloseDrawer={this.onCloseDrawer} onSubmit={this.onDrawerSubmit} />
      case NOTIFY_NODE:
        return <NotifyDrawer drawerData={DRAWER_NODE} onCloseDrawer={this.onCloseDrawer} onSubmit={this.onDrawerSubmit} />
      default:
        break;
    }
  }

  // 切换条件优先级
  onChangePriority = (pre, now) => {
    console.log(LINENODES_CONFIG);
    // 数组结构、元素换位
    [LINENODES_CONFIG.currentNodes.lineNodes[pre], LINENODES_CONFIG.currentNodes.lineNodes[now]] = [LINENODES_CONFIG.currentNodes.lineNodes[now], LINENODES_CONFIG.currentNodes.lineNodes[pre]]
    resetPriority(LINENODES_CONFIG.currentNodes.lineNodes)
    this.setState({
      approvalFlowData: this.state.approvalFlowData
    })
  }

  // 抽屉配置检查成功回调
  onDrawerSubmit = (data) => {
    // 直接修改引用对象的值，然后重新setstate更新视图
    DRAWER_NODE.node_value = data.node_value
    DRAWER_NODE.node_name = data.node_name
    this.setState({
      approvalFlowData: this.state.approvalFlowData,
      drawerVisible: false
    })
  }

  // 放大缩小
  scaleContent = (type) => {
    let { scale, scaleStyle } = this.state
    if (type == '-') {
      if (scale <= 0.5) {
        return
      }
      scale -= 0.1
      scale = +scale.toFixed(1)
    } else {
      if (scale == 1) {
        return;
      }
      scale += 0.1
      scale = +scale.toFixed(1)
    }
    scaleStyle = {
      MsTransform: `scale(${scale})`,
      MozTransform: `scale(${scale})`,
      WebkitTransform: `scale(${scale})`,
      transform: `scale(${scale})`
    }
    this.setState({
      scale,
      scaleStyle
    })
  }

  // 修改模板标题
  setTempTitleEdit = () => {
    this.setState({
      tempTitleEdit: true
    }, () => {
      this.tempTitleRef.current.focus()
    })
  }

  onTempTitleChange = (e) => {
    this.setState({
      template_name: e.target.value
    })
  }

  onTempTitleBlur = () => {
    this.setState({
      tempTitleEdit: false
    })
  }

  // 点击取消
  onCancel = () => {
    Modal.confirm({
      title: '提示',
      content: '取消后配置的内容将不会保存，确定取消吗？',
      onOk: () => {
        this.goBack()
      }
    })
  }

  afterVisibleChange = (visible) => {
    if (!visible) {
      setTimeout(() => {
        document.querySelector('body').setAttribute('style', 'overflow-y: auto')
      }, 0)
      return
    }
    setTimeout(() => {
      document.querySelector('body').setAttribute('style', 'overflow-y: hidden; touch-action: none;')
    })
  }

  goBack = () => {
    sessionStorage.setItem('echo_selected_custom_doc_tmpl', JSON.stringify({
      type: Number(this.state.template_type),
      currTab: '1'
    }))
    history.back()
  }

  render() {
    const { tempTitleEdit, template_name, submitLoading } = this.state
    return (
      <div className="approvalFlow_frame">
        <div className="scale-bar">
          <span className="ctrl-btn" onClick={() => { this.scaleContent('-') }}>-</span>
          <span>{this.state.scale * 100}%</span>
          <span className="ctrl-btn" onClick={() => { this.scaleContent('+') }}>+</span>
        </div>
        <div className="approvalFlow_header">
          <span className="back" onClick={this.goBack}><LeftOutlined /></span>
          <span className="title">
            <Hidden visible={!tempTitleEdit}>
              <div className="temp-title" onClick={this.setTempTitleEdit}><span className="text" style={{ fontSize: 16 }}>{template_name}</span><span className="edit-icon"></span></div>
            </Hidden>
            <Hidden visible={tempTitleEdit}>
              <Input maxLength={20} value={template_name} onChange={this.onTempTitleChange} onBlur={this.onTempTitleBlur} ref={this.tempTitleRef} style={{ width: '50%' }} />
            </Hidden>
          </span>
          <span className="approvalFlow_header_btn_bar">
            <Button type="text" onClick={() => { this.onCancel() }}>取消</Button>
            <Button type="primary" loading={submitLoading} onClick={this.onSaveTemp}>保存</Button>
          </span>
        </div>
        <div id="approvalFlow">
          <div className="approvalFlow-content-outer">
            <div className="approvalFlow-content" style={this.state.scaleStyle}>
              {this.generateNodeContainer(this.state.approvalFlowData)}
            </div>
          </div>
        </div>
        <Drawer
          width="60%"
          placement="right"
          onClose={this.onCloseDrawer}
          visible={this.state.drawerVisible}
          id="approval-flow-drawer"
          destroyOnClose
          afterVisibleChange={this.afterVisibleChange}
          closable={false}
        >
          {this.generateDrawerContent()}
        </Drawer>
      </div >
    )
  }
}
