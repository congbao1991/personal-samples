import CustomInput from './custom-input'
import CustomDetailed from './custom-detailed'
import CustomSelect from './custom-select'
import CustomDuration from './custom-duration'
import PaymentInfo from './payment-info'
import CustomDate from './custom-date'
import CustomColumns from './custom-columns'
import CustomAttach from './custom-attach'
import CollectionAccount from './collection-account'
import RelateInsideApply from './relate-inside-apply'
import RelateOutsideApply from './relate-outside-apply'
import RelatePerson from './relate-person'
import CustomArchivesLob from './custom-archives-lob'
import TravelItinerary from './travel-itinerary'
import RelatedCustomers from './relate-customer'
import RelateContract from './relate_contract'
import RelateSupplier from './relate-supplier'
import LendInfo from './lend-info'
import Commiter from './commiter'
import Expromissor from './expromissor'
import Summary from './remark'
import AssumeTitle from './assume-title'
import AssumeDepartment from './assume-department'

export default {
  // CustomArchivesLob, // 自定义档案 这期不做

  department: AssumeDepartment, // 部门
  bank: CollectionAccount, // 收款账户
  title: AssumeTitle, // 承担主体
  rel_person: RelatePerson, // 相关人
  child_list: CustomDetailed, // 报销清单
  apply_list: RelateInsideApply, // 关联申请单
  fee_info: CustomColumns, // 费用明细
  attach_list: CustomAttach, // 附件列表
  oa_flows: RelateOutsideApply, // 关联外部单据
  summary: Summary, // 事由
  commiter: Commiter, // 提单人
  reimburseer: Expromissor, // 承担人

  custom_input: CustomInput, // 单行文本
  custom_area: CustomInput, // 多行文本
  custom_check_box: CustomSelect, // 多选框
  custom_radio: CustomSelect, // 单选框
  custom_duration: CustomDuration, // 时长
  custom_detailed: CustomDetailed, // 明细
  custom_number: CustomInput, // 数字
  custom_amount: CustomInput, // 金额
  custom_columns: CustomColumns, // 分栏
  custom_date: CustomDate, // 日期
  custom_attach: CustomAttach, // 附件
  travel_type: CustomSelect, // 出差类型
  travel_list: CustomDetailed, // 出差明细
  clbrt_enterprise: RelateSupplier, // 供应商
  amount: CustomInput, // 付款金额
  date: CustomDate, // 付款日期
  payment_info: PaymentInfo, // 付款信息
  guest: RelatedCustomers, // 相关客户
  contract: RelateContract, // 关联合同
  trans_list: TravelItinerary, // 行程清单
  lend_info: LendInfo, // 核销借款
  trans_way: CustomSelect, // 出行方式
}
