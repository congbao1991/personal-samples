/**
 * 公共api
 1、共存
 notCoexist: [
   ['Columns', 'CustomDetailed'],
   ...
 ]，//二维数组，Columns与CustomDetailed组件不能同时存在，可以添加多项

 * 组件api
 1、限制tab容器【选填】
 includedContainer: {
          container: '1',//【必填】只能存在于在container1上
          msg: '该组件不只能添加到报销清单,只能添加到首页中',//【必填】拖拽不符合提示信息
          orIn: 'CustomDetailed' //【选填】 额外条件，可以不在当前container1中，但是要在其他container的指定控件CustomDetailed中
          mustIn: { // 【选填】
            c: 'CustomDetailed', // 必须在CustomDetailed中
            msg: '该组件只能在明细组件中',// 提示文案
            template_type: 4 // 生效时机，只有template_type为4才生效
          }
        }，// 提示：并未考虑A组件有includedContainer且没有orIn属性，A组件存在C组件里面，且C组件没有做includedContainer限制，进行拖拽到别的container的情况

 2、是否默认控件属性
 fixed: true,//【选填，默认false】为true的时候只能在当前tab拖动，且没有删除按钮

 3、当前组件个数
 count: 0，//有了这个属性表示当前组件会被限制个数，目前只有限制最多1个 只用在业务组件中

 4、限制套件容器里面排除控件
 exclude:[],//数组里面的控件将不能拖入套件中,只对套件容器生效


 */

// 不能放入出差明细中的组件
const basicsSpecial = ['custom_detailed', 'custom_columns', 'attach_list', 'custom_attach', 'date', 'amount', 'travel_type']

// 业务组件
const businessComponentsData = [
  {
    name: 'trans_list',
    title: '行程清单',
    desc: '时间与地点',
    form: {
      date_type: 'YY-MM-DD-hh-mm',
      required: true,
      print: true,
      type: 'Array',
      items: {
        end_point: {
          field: 'end_point',
          label: '目的地点',
          required: true,
          type: 'String'
        },
        start_point: {
          field: 'start_point',
          label: '开始地点',
          required: true,
          type: 'String'
        }
      }
    },
    count: 0,
    includedContainer: {
      container: '2',
      msg: '该组件不能添加到首页中，只能添加到报销清单中',
      mustIn: {
        c: 'travel_list',
        msg: '该组件只能在出差明细中',
        template_type: 2
      }
    }
  },
  {
    name: 'department',
    title: '承担部门',
    form: {
      label: '承担部门',
      tip: '请选择承担部门',
      required: true,
      print: true,
      default_type: 'target_department',
      source: 'target_department',
    },
    print_fixed: true,
    required_fixed: true,
    count: 0
  },
  {
    name: 'bank',
    title: '收款账户',
    desc: '个人账户',
    form: {
      label: '收款账号',
      tip: '请选择',
      default_type: 'empty',
      write_req: 'any_individual',
      source: 'sys_account',
      required: true,
      print: true
    },
    required_fixed: true,
    print_fixed: true,
    count: 0
  },
  {
    name: 'title',
    title: '承担主体',
    form: {
      label: '承担主体',
      tip: '请选择抬头',
      required: true,
      print: true,
      default_type: 'empty',
      source: 'all'
    },
    print_fixed: true,
    required_fixed: true,
    count: 0
  },
  {
    name: 'rel_person',
    title: '相关人',
    desc: '参与人',
    form: {
      label: '相关人',
      tip: '请选择',
      safety_control: '0',
      required: false,
      print: true
    },
    count: 0,
    includedContainer: {
      container: '2',
      msg: '该组件不能添加到首页中，只能添加到报销清单中',
      mustIn: {
        c: 'travel_list',
        msg: '该组件只能在出差明细中',
        template_type: 2
      }
    }
  },
  {
    name: 'child_list',
    title: '报销清单',
    desc: '报销清单',
    fixed: true,
    form: {
      label: '报销清单',
      tip: '添加一笔报销',
      required: true,
      print: true
    },
    print_fixed: true,
    required_fixed: true,
    count: 0,
    includedContainer: {
      container: '1',
      msg: '该组件不能添加到报销清单中,只能添加到首页中',
    }
  },
  {
    name: 'apply_list',
    title: '关联单据',
    desc: '关联内部申请单',
    exclude: [],
    bill_type: 'reimburse', // reimburse: 报销 payment:付款
    form: {
      label: '关联申请单',
      tip: '请选择',
      apply_type: null,
      limit_apply_range: ['bear_reimburse_apply'],
      required: false,
      print: true,
      relation_apply_type: [],
      limit_apply_number: 'multiple'
    },
    count: 0,
    includedContainer: {
      container: '2',
      msg: '该组件不能添加到首页中，只能添加到报销清单中'
    }
  },
  {
    name: 'fee_info',
    title: '费用明细',
    desc: '费用明细',
    exclude: [],
    form: {
      label: '费用明细',
      tip: '添加发票',
      required: true,
      print: true
    },
    print_fixed: true,
    required_fixed: true,
    count: 0,
    includedContainer: {
      container: '2',
      msg: '该组件不能添加到首页中，只能添加到报销清单中'
    }
  },
  {
    name: 'oa_flows',
    title: '关联单据',
    desc: '关联外部单据',
    form: {
      label: '关联单据',
      tip: '请选择',
      bill_type: 1,
      limit_number: 1,
      relation_limit: 'multiple',
      runtime: ['qwh5', 'wxapp'],
      limit_range: 'outside',
      required: false,
      print: false
    },
    count: 0,
    includedContainer: {
      container: '2',
      msg: '该组件不能添加到首页中，只能添加到报销清单中'
    }
  },
  {
    name: 'summary',
    title: '事由',
    inputType: 'textarea',
    form: {
      label: '事由',
      tip: '请输入事由',
      length_limit: 1024,
      required: true,
      print: true
    },
    print_fixed: true,
    required_fixed: true,
    count: 0,
    includedContainer: {
      container: '2',
      msg: '该组件不能添加到首页中，只能添加到报销清单中'
    }
  },
  {
    name: 'commiter',
    title: '提单人',
    form: {
      label: '提单人',
      required: true,
      print: true,
      default_type: 'commiter',
    },
    print_fixed: true,
    required_fixed: true,
    count: 0
  },
  {
    name: 'reimburseer',
    title: '承担人',
    form: {
      label: '承担人',
      required: true,
      print: true,
      default_type: 'commiter',
      source: 'proxy_range', // template_type 3|4默认为commiter，其他默认为proxy_range
      tip: '请选择承担人'
    },
    count: 0,
    print_fixed: true,
    required_fixed: true,
  },
  {
    name: 'travel_type',
    title: '出差类型',
    desc: '本地/外地出差',
    exclude: [],
    form: {
      label: '出行类型',
      tip: '请先择',
      options: [{}],
      required: true,
      print: true
    },
    print_fixed: true,
    count: 0
  },
  {
    name: 'travel_list',
    title: '出差明细',
    desc: '行程明细',
    children: [],
    form: {
      label: '出差明细',
      tip: '增加行程',
      required: true,
      print: true
    },
    required_fixed: true,
    print_fixed: true,
    count: 0,
    exclude: basicsSpecial
  },
  {
    name: 'clbrt_enterprise',
    title: '供应商',
    desc: '付款供应商',
    form: {
      label: '供应商',
      tip: '请选择',
      staff_create: 'supplier_bank',
      supplier_scope: 'all',
      required: true,
      print: true,
    },
    count: 0,
    print_fixed: true,
    required_fixed: true,
    includedContainer: {
      container: '2',
      msg: '该组件不能添加到首页中，只能添加到报销清单中',
    }
  },
  {
    name: 'amount',
    title: '付款金额',
    desc: '付款金额',
    inputType: 'number',
    form: {
      label: '付款金额',
      tip: '请输入金额',
      decimal_length: 2,
      // value_rules: true,
      required: true,
      print: true
    },
    required_fixed: true,
    print_fixed: true,
    count: 0
  },
  {
    name: 'date',
    title: '付款日期',
    form: {
      label: '付款日期',
      tip: '请选择',
      date_type: 'YY-MM-DD-hh-mm',
      default_type: 'empty',
      required: true,
      print: true
    },
    required_fixed: true,
    print_fixed: true,
    count: 0
  },
  {
    name: 'payment_info',
    title: '付款信息',
    desc: '选择付款方式',
    form: {
      label: '付款信息',
      tip: '添加付款',
      pay_type: 'pay_arrival',
      required: true,
      print: true
    },
    pay_arrival_fixed: true,
    print_fixed: true,
    required_fixed: true,
    count: 0,
    includedContainer: {
      container: '2',
      msg: '该组件不能添加到首页中，只能添加到报销清单中',
    }
  },
  {
    name: 'guest',
    title: '相关客户',
    desc: '关联客户',
    form: {
      label: '相关客户',
      tip: '请选择',
      relate_type: 'external_data', // 关联
      // order_type: null, // 内部档案
      order_url: '', // 外部数据地址
      required: false,
      print: false,
      runtime: ['qwh5', 'wxapp']
    },
    count: 0,
    includedContainer: {
      container: '2',
      msg: '该组件不能添加到首页中，只能添加到报销清单中',
      mustIn: {
        c: 'travel_list',
        msg: '该组件只能在出差明细中',
        template_type: 2
      }
    }
  },
  {
    name: 'contract',
    title: '关联合同',
    desc: '关联合同',
    form: {
      label: '关联合同',
      tip: '请手动填写',
      default_type: 'manual_input',
      order_url: '',
      runtime: ['qwh5', 'wxapp'],
      required: false,
      print: false
    },
    count: 0,
    includedContainer: {
      container: '2',
      msg: '该组件不能添加到首页中，只能添加到报销清单中',
    }
  },
  {
    name: 'lend_info',
    title: '核销借款',
    desc: '核销借款',
    form: {
      label: '核销借款',
      tip: '请选择',
      des_apply_type: 'all',
      required: false,
      print: true
    },
    count: 0,
    includedContainer: {
      container: '1',
      msg: '该组件不能添加到报销清单中，只能添加首页',
    }
  },
  {
    name: 'trans_way',
    title: '出行方式',
    desc: '出行方式',
    form: {
      field: 'trans_way',
      label: '出行方式',
      tip: '请选择',
      required: true,
      print: true,
      type: 'String',
      options: [{}],
    },
    count: 0,
    required_fixed: true,
    print_fixed: true,
    includedContainer: {
      container: '2',
      msg: '该组件不能添加到首页中，只能添加到报销清单中',
      mustIn: {
        c: 'travel_list',
        msg: '该组件只能在出差明细中',
        template_type: 2
      }
    }
  }
]

// 不能被明细和分栏嵌套的组件
const excludeBasics = basicsSpecial.concat(
  businessComponentsData.reduce((l, i) => {
    l.push(i.name)
    return l
  }, [])
)

// 处理特殊的出差明细
for (let i = 0; i < businessComponentsData.length; i++) {
  if (businessComponentsData[i].name === 'TravelDetailed') {
    businessComponentsData[i].exclude = excludeBasics
    break
  }
}

// 基础组件
const basicsComponentsData = [
  {
    name: 'custom_input',
    title: '单行文本',
    inputType: 'text',
    form: {
      label: '单行文本',
      tip: '请输入',
      default_type: 'empty',
      default_value: '',
      length_limit: 200,
      required: false,
      print: true
    }
  },
  {
    name: 'custom_area',
    title: '多行文本',
    inputType: 'textarea',
    form: {
      label: '多行文本',
      tip: '请输入',
      default_type: 'empty',
      default_value: '',
      length_limit: 200,
      required: false,
      print: true
    }
  },
  {
    name: 'custom_check_box',
    title: '多选框',
    form: {
      label: '多选框',
      tip: '请选择',
      required: false,
      print: true,
      options: [{}]
    }
  },
  {
    name: 'custom_radio',
    title: '单选框',
    form: {
      label: '单选框',
      tip: '请选择',
      required: false,
      print: true,
      options: [{}]
    }
  },
  {
    name: 'custom_duration',
    title: '时长',
    form: {
      start_time_label: '开始时间',
      end_time_label: '结束时间',
      tip: '选择',
      date_type: 'YY-MM-DD-hh-mm',
      default_type: 'empty',
      default_value: '',
      required: true,
      print: true,
    }
  },
  {
    name: 'custom_detailed',
    title: '明细',
    children: [],
    exclude: excludeBasics,
    form: {
      label: '明细',
      tip: '添加明细',
      required: false,
      print: true
    }
  },
  {
    name: 'custom_number',
    title: '数字',
    inputType: 'number',
    form: {
      label: '数字',
      tip: '请输入数字',
      decimal_length: 0,
      // value_rules: false,
      required: false,
      print: true
    }
  },
  {
    name: 'custom_amount',
    title: '金额',
    inputType: 'number',
    form: {
      label: '金额',
      tip: '请输入金额',
      decimal_length: 2,
      // value_rules: true,
      required: true,
      print: true
    }
  },
  {
    name: 'custom_columns',
    title: '分栏',
    children: [],
    form: {
      label: '分栏',
      required: false,
      print: true
    },
    exclude: excludeBasics
  },
  {
    name: 'custom_date',
    title: '日期',
    form: {
      label: '日期',
      tip: '请选择',
      date_type: 'YY-MM-DD-hh-mm',
      default_type: 'empty',
      required: true,
      print: true
    }
  },
  {
    name: 'custom_attach',
    title: '附件',
    form: {
      field: 'custom_attach',
      label: '附件',
      // file_size: 200,
      required: false,
      print: false
    },
    count: 0
  },
]

// 组件不共存,多个组件不能同时出现,【行程清单】与【关联单据-关联内部申请单】只能二选一，不能同时存在
const notCoexist = [
  ['apply_list', 'trans_list']
]

// 通过控件name获取控件
const componentNameMap = (basicsComponentsData.concat(businessComponentsData)).reduce((m, i) => {
  m[i.name] = i
  return m
}, {})

// 特殊逻辑,同一个组件不同type的title与desc展示不一样,通过name_type匹配
const componentsTypeTitleMap = {
  amount_2: {
    title: '招待金额',
    desc: '招待金额',
    form: {
      label: '招待金额'
    }
  },
  amount_4: {
    title: '付款金额',
    desc: '付款金额',
    form: {
      label: '付款金额'
    }
  },
  amount_3: {
    title: '借款金额',
    desc: '借款金额',
    form: {
      label: '借款金额'
    }
  },
  date_2: {
    title: '接待日期',
    desc: '接待日期',
    form: {
      label: '接待日期'
    }
  },
  date_4: {
    title: '付款日期',
    desc: '付款日期',
    form: {
      label: '付款日期'
    }
  },
  date_3: {
    title: '预计还款日期',
    desc: '还款日期',
    form: {
      label: '预计还款日期'
    }
  }
}

// 单据类型枚举
const reimburseTypeNameMap = {
  1: {
    navTitle: '报销单',
    containerTitle: '报销单-报销清单'
  },
  2: {
    navTitle: '申请单',
    containerTitle: '申请单'
  },
  3: {
    navTitle: '借款单',
    containerTitle: '借款单'
  },
  4: {
    navTitle: '付款单',
    containerTitle: '付款单'
  }
}

// 不能放入报销子单的组件
const NOT_IN_CHILD_BILL_COMPONENTS = {
  commiter: true,
  custom_attach: true,
  reimburseer: true,
  title: true,
  department: true,
  bank: true,
}

// 特殊逻辑,除了【提单人】【承担人】【承担部门】【费用主体】【事由】不展示，其他都要展示，在map的不展示
const businessHiddenInList = {
  commiter: true,
  reimburseer: true,
  department: true,
  title: true,
  summary: true,
  trans_way: true,
  fee_info: true,
}

// 把model转成key为id的map结构
function arrToMap(arr, field = 'id') {
  const map = {}
  arr.forEach(i => {
    map[i[field]] = i
  })
  return map
}

/**
 * 预览PC端获取模拟数据
 * @param {String} type 数据类型
 * @param {*} field 传进来的字段名称，做特殊逻辑处理
 * @param {*} extra 是否需要包裹extra
 */

const default_value_map = {
  bank: {
    province: ''
  },
  guest: {
    name: ' '
  }
}

function getDefaultValue(type, field) {
  const specialFields = ['fee_info']
  if (type === 'Object') {
    if (default_value_map[field]) {
      return default_value_map[field]
    }
    return {}
  }
  // 特殊逻辑，当field === fee_info的是否返回空数组展示
  if (specialFields.includes(field)) {
    return []
  }

  // 特殊逻辑，给行程地点默认预览数据
  if (type === 'Array' && field.includes('trans_list')) {
    return [
      {
        start_point: 'xxx',
        end_point: 'xxx'
      }
    ]
  }

  // 特殊逻辑，给附件展示默认数据
  if (type === 'Array' && field.includes('custom_attach')) {
    return [
      {
        attach_url: 'https://apg-1258944054.cos.ap-guangzhou.myqcloud.com/apg/pc-micro-reimburse/custom-doc-tmpl/attach_preview.svg',
        attach_name: '示例',
        thumbnail_url: 'https://apg-1258944054.cos.ap-guangzhou.myqcloud.com/apg/pc-micro-reimburse/custom-doc-tmpl/attach_preview.svg'
      }
    ]
  }

  if (type === 'Array') {
    return [{}]
  }
  return ''
}

// 特殊逻辑：不同template_type下的控件属性为fixed
const localFixedMap = {
  trans_list_1: false,
  trans_list_2: true,
  trans_way_2: true,
}

// 特殊逻辑： 预览PC端的时候要不同单据要预设不同数据
export const VIRTUAL_DATA = {
  1: {
    amount: '',
    fee_info: [],
    template_type: 1,
    created_at: ''
  },
  2: {
    template_type: 2,
    created_at: ''
  },
  3: {
    template_type: 3,
    created_at: ''
  },
  4: {
    // pay_info: { pay_status: 1 },
    template_type: 4,
    fee_info: [],
    bank: {province: ''},
    date: null,
    amount: null,
    pay_way: '',
    created_at: '',
  }
}

const NO_SPLIT_MAP = {
  custom_input: true,
  custom_area: true,
  custom_check_box: true,
  custom_radio: true,
  custom_duration: true,
  custom_number: true,
  custom_amount: true,
  custom_date: true,
  commiter: true,
  reimburseer: true,
  department: true,
  title: true,
  trans_way: true
}

export {
  notCoexist,
  componentNameMap,
  componentsTypeTitleMap,
  reimburseTypeNameMap,
  businessHiddenInList,
  getDefaultValue,
  arrToMap,
  NOT_IN_CHILD_BILL_COMPONENTS,
  localFixedMap,
  NO_SPLIT_MAP
}
