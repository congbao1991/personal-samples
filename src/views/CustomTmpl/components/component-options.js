/**
 * 所有组件
 */
import CustomInput from './custom-input'
// eslint-disable-next-line import/no-cycle
import CustomColumns from './custom-columns'
import CustomSelect from './custom-select'
import CustomDuration from './custom-duration'
import PaymentInfo from './payment_info'
import CustomAttach from './custom-attach'
import ReimbursementList from './reimbursement-list'
import TravelItinerary from './travel-itinerary'
import FeeInfo from './fee-info'

export default {

  RelatePurchaseApply: CustomSelect,

  department: CustomSelect, // 部门
  bank: CustomSelect, // 收款账户
  title: CustomSelect, // 承担主体
  rel_person: CustomSelect, // 相关人
  child_list: ReimbursementList, // 报销清单
  apply_list: CustomSelect, // 关联申请单
  fee_info: FeeInfo, // 费用明细
  attach_list: CustomAttach, // 附件列表
  oa_flows: CustomSelect, // 关联外部单据
  summary: CustomInput, // 事由
  commiter: CustomSelect, // 提单人
  reimburseer: CustomSelect, // 承担人

  custom_input: CustomInput, // 单行文本
  custom_area: CustomInput, // 多行文本
  custom_check_box: CustomSelect, // 多选框
  custom_radio: CustomSelect, // 单选框
  custom_duration: CustomDuration, // 时长
  custom_detailed: CustomColumns, // 明细
  custom_number: CustomInput, // 数字
  custom_amount: CustomInput, // 金额
  custom_columns: CustomColumns, // 分栏
  custom_attach: CustomAttach, // 附件
  custom_date: CustomSelect, // 日期
  travel_type: CustomSelect, // 出差类型
  travel_list: CustomColumns, // 出差明细
  clbrt_enterprise: CustomSelect, // 供应商
  amount: CustomInput, // 付款金额
  date: CustomSelect, // 付款日期
  payment_info: ReimbursementList, // 付款信息
  guest: CustomSelect, // 相关客户
  contract: CustomSelect, // 关联合同
  trans_list: TravelItinerary, // 行程清单
  lend_info: CustomSelect, // 核销借款
  trans_way: CustomSelect, // 出行方式
}
