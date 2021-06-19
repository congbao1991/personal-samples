/*eslint-disable */
const randomString = (len) => {
  len = len || 32;
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  var maxPos = $chars.length;
  var str = '';
  for (let i = 0; i < len; i++) {
    str += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return str;
}

export const APPLICANT_NODE = 'APPLICANT_NODE';   // 申请人节点
export const ROUTER_NODE = 'ROUTER_NODE';         // 路由节点
export const END_NODE = 'END'                     // 流程结束节点
export const APPROVAL_NODE = 1;                   // 审批节点
export const FINANCIAL_NODE = 3;                  // 财务审核节点
export const PAYMENT_NODE = 4;                    // 出纳支付节点
export const NOTIFY_NODE = 5                      // 抄送节点
export const SELECTOR_NODE = 6;                   // 分支节点

export const APPOINT_SUPERIOR = 1; // 指定主管
export const APPOINT_MEMBERS = 3; // 指定成员
export const SERIES_SUPERIOR = 2; // 指定连续上级
export const APPOINT_ROLE = 4 // 指定角色

export const SHOW_SIGN_METHOD_TYPES = [APPOINT_SUPERIOR, SERIES_SUPERIOR, APPOINT_ROLE]

/**
 * 生成默认审批人节点
 * level_type： 1-直到发起人第N级主管  2-通讯录第N级主管
 * level_num: 第N级主管
 */
export const generalApprovalNode = (user_type = APPOINT_MEMBERS) => {
  // eslint-disable-next-line prefer-const
  let node_value = {
    user_type
  }
  if (user_type === SERIES_SUPERIOR) {
    node_value.level_num = '3';
    node_value.level_type = 1
  }
  return {
    node_type: APPROVAL_NODE,
    key: randomString(),
    node_name: '主管审批',
    child_nodes: [],
    node_option: '',
    node_value: JSON.stringify(node_value)
  }
}

/**
 * 生成默认财务节点
 * user_type: 1-全部财务 2-部分财务， 3-指定人员
 * sign_method: 1-会签  2-或签
 */
export const generalFinacialNode = () => {
  return {
    node_type: FINANCIAL_NODE,
    key: randomString(),
    node_name: '财务审核',
    child_nodes: [],
    node_option: '',
    node_value: JSON.stringify({ user_type: 1, sign_method: 2 })
  }
}

/**
 * 生成默认抄送节点
 */
export const generalNotifyNode = () => {
  return {
    node_type: NOTIFY_NODE,
    key: randomString(),
    node_name: '抄送人',
    child_nodes: [],
    node_option: '',
    node_value: JSON.stringify({}),
  }
}

/**
 * 生成默认出纳支付节点
 * user_ype: 1-全部出纳， 2-部分出纳， 3-指定人员
 * pay_status: 节点启用开关 1-开， 2-关
 */
export const generalPaymentNode = () => {
  return {
    node_type: PAYMENT_NODE,
    key: randomString(),
    node_name: '出纳支付',
    child_nodes: [],
    node_option: '',
    node_value: JSON.stringify({ user_type: 1, pay_status: 1 })
  }
}

/**
 * 生成默认条件分支节点
 */
export const generalSelectorNode = (child_nodes = [], node_name = '条件1', node_option = '优先级1', default_flag = false) => {
  const node_value = ''
  // if (default_flag) {
  //   node_value = JSON.stringify({ default: true })
  // }
  return {
    node_type: SELECTOR_NODE,
    child_nodes,
    key: randomString(),
    node_name,
    node_option,
    node_value,
    default: default_flag
  }
}
/**
 * 主管层级
 */
export const LEADER_OPTIONS = [
  {
    label: '直接主管',
    value: '1'
  },
  {
    label: '第2级主管',
    value: '2'
  },
  {
    label: '第3级主管',
    value: '3'
  },
  {
    label: '第4级主管',
    value: '4'
  },
  {
    label: '第5级主管',
    value: '5'
  },
  {
    label: '第6级主管',
    value: '6'
  },
  {
    label: '第7级主管',
    value: '7'
  },
  {
    label: '第8级主管',
    value: '8'
  },
]

export const ORGANIZATION_LEADER_OPTIONS = [
  {
    label: '最高层级主管',
    value: '1'
  },
  {
    label: '第2个层级主管',
    value: '2'
  },
  {
    label: '第3个层级主管',
    value: '3'
  },
  {
    label: '第4个层级主管',
    value: '4'
  },
  {
    label: '第5个层级主管',
    value: '5'
  },
  {
    label: '第6个层级主管',
    value: '6'
  },
  {
    label: '第7个层级主管',
    value: '7'
  },
  {
    label: '第8个层级主管',
    value: '8'
  },
]

/**
 * 出行方式
 */
export const TRAVEL_TYPE_OPTIONS = [
  {
    label: '外地出差',
    value: '外地出差'
  },
  {
    label: '本地出差',
    value: '本地出差'
  }
]

/**
 * 出行类型
 */
export const TRAVEL_MODE_OPTIONS = [
  {
    label: '打车',
    value: '打车'
  },
  {
    label: '飞机',
    value: '飞机'
  },
  {
    label: '火车',
    value: '火车'
  },
  {
    label: '轮船',
    value: '轮船'
  },
  {
    label: '其他',
    value: '其他'
  },
]

/**
 * 条件配置
 */
export const APPLICIANT_CONDITION = 1; // 申请人/部门
export const APPLICIANT_DEPART_CONDITION = 2; // 费用部门
export const COMPANY_TITLE_CONDITION = 3; // 公司抬头
export const AMOUNT_CONDITION = 4; // 金额
export const FEE_TYPE_CONDITION = 5; // 费用类型
export const TRAVEL_MODE_CONDITION = 6; // 出行方式
export const TRAVEL_TYPE_CONDITION = 7; // 出行类型
export const OFFICE_LOCATION_CONDITION = 8; // 办公地点
export const TRAVLE_TIME_CONDITION = 9; // 出差时长
export const ROLE_CONDITION = 10; // 角色

export const REIMBURSEMENT = 1; // 报销单
export const BUSINESS_APPLICATION_FORM = 2; // 申请单
export const PAYMENT_APPLICATION_FORM = 4; // 付款申请单
export const LOAN_APPLICATION_FORM = 3; // 借款申请单

export const CONDITION_OPTIONS = [
  {
    label: '申请人',
    value: APPLICIANT_CONDITION,
    template_types: 'ALL',
    field: 'commiter'
  },
  {
    label: '费用部门',
    value: APPLICIANT_DEPART_CONDITION,
    template_types: 'ALL',
    field: 'department'
  },
  {
    label: '公司抬头',
    value: COMPANY_TITLE_CONDITION,
    template_types: 'ALL',
    field: 'title'
  },
  {
    label: '报销金额',
    value: AMOUNT_CONDITION,
    template_types: [REIMBURSEMENT],
    field: 'amount'
  },
  {
    label: '招待金额',
    value: AMOUNT_CONDITION,
    template_types: [BUSINESS_APPLICATION_FORM],
    field: 'amount'
  },
  {
    label: '付款金额',
    value: AMOUNT_CONDITION,
    template_types: [PAYMENT_APPLICATION_FORM]
  },
  {
    label: '借款金额',
    value: AMOUNT_CONDITION,
    template_types: [LOAN_APPLICATION_FORM],
    field: 'amount'
  },
  {
    label: '出行方式',
    value: TRAVEL_MODE_CONDITION,
    template_types: [BUSINESS_APPLICATION_FORM],
    field: 'trans_way'
  },
  {
    label: '出行类型',
    value: TRAVEL_TYPE_CONDITION,
    template_types: [BUSINESS_APPLICATION_FORM],
    field: 'travel_type'
  },
  {
    label: '费用类型',
    value: FEE_TYPE_CONDITION,
    template_types: [REIMBURSEMENT, PAYMENT_APPLICATION_FORM]
  },
  {
    label: '办公地点',
    value: OFFICE_LOCATION_CONDITION,
    template_types: 'ALL'
  },
  {
    label: '出差时长',
    value: TRAVLE_TIME_CONDITION,
    template_types: [BUSINESS_APPLICATION_FORM]
  },
  {
    label: '用户组',
    value: ROLE_CONDITION,
    template_types: 'ALL'
  }
]

/**
 * 申请人/部门、公司抬头、出行类型、办公地点关系选项
 */
export const CONDITION_RELATION_OPTIONS = [
  {
    label: '属于',
    value: 1,
  },
  {
    label: '不属于',
    value: 2
  }
]

/**
 * 费用类型， 出行方式关系选项
 */
export const FEETYPE_CONDITION_RELATION_OPTIONS = [
  {
    label: '包含',
    value: 9,
  },
  {
    label: '不包含',
    value: 10
  }
]

/**
 * 报销金额、借款金额、付款金额、招待金额关系选项
 */
export const AMOUNT_BETWEEN = 8;
export const AMOUNT_RELATION_OPTIONS = [
  {
    label: '大于',
    value: 3
  },
  {
    label: '大于等于',
    value: 4
  },
  {
    label: '等于',
    value: 5
  },
  {
    label: '小于',
    value: 7
  },
  {
    label: '小于等于',
    value: 6
  },
  {
    label: '介于',
    value: AMOUNT_BETWEEN
  },
]