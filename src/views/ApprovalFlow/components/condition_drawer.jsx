/* eslint-disable */
import React, { Component, createRef } from 'react'
import { deepCopy, generalOptionFilter } from '@/utils'
import Hidden from '@/components/Hidden'
import { Input, Button, Select, Form, message as Message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import HoverTips from '@/components/hover-tips'
import { FEE_TYPE_CONDITION, APPLICIANT_CONDITION, TRAVEL_MODE_CONDITION, TRAVEL_TYPE_CONDITION, COMPANY_TITLE_CONDITION, AMOUNT_BETWEEN, APPLICIANT_DEPART_CONDITION, OFFICE_LOCATION_CONDITION, TRAVLE_TIME_CONDITION, ROLE_CONDITION } from '../constant'
import ConditionEdit from './form/condition_edit/condition_edit'

const { Option } = Select

// 格式化前端数据，转成后台可用格式
const formatJson = (item) => {
  if (item.conditionType === APPLICIANT_CONDITION) {
    let valueJson = item.members.filter(i => !i.leave).map(i => {
      return `${i.id}#${i.name}`
    })
    return {
      type: item.conditionType,
      compare: item.relation,
      value: valueJson.join(',')
    }
  } else if (item.conditionType === APPLICIANT_DEPART_CONDITION) {
    let valueJson = item.departs.map(i => {
      return `${i.id}#${i.name}`
    })
    return {
      type: item.conditionType,
      compare: item.relation,
      value: valueJson.join(',')
    }
  } else if (item.conditionType === COMPANY_TITLE_CONDITION) {
    let valueJson = item.titles.map(i => {
      return `${i.enterprise_title_id}#${i.enterprise_name}`
    })
    return {
      type: item.conditionType,
      compare: item.relation,
      value: valueJson.join(',')
    }
  } else if (item.conditionType === FEE_TYPE_CONDITION) {
    let valueJson = item.feeData.map(i => {
      return `${i.fee_type}#${i.fee_name}`
    })
    return {
      type: item.conditionType,
      compare: item.relation,
      value: valueJson.join(',')
    }
  } else if (item.conditionType === TRAVEL_MODE_CONDITION) {
    let valueJson = item.travelModeData.map(i => {
      return `${i.value}`
    })
    return {
      type: item.conditionType,
      compare: item.relation,
      value: valueJson.join(',')
    }
  } else if (item.conditionType === TRAVEL_TYPE_CONDITION) {
    let valueJson = item.travelTypeData.map(i => {
      return `${i.value}`
    })
    return {
      type: item.conditionType,
      compare: item.relation,
      value: valueJson.join(',')
    }
  } else if (item.conditionType === OFFICE_LOCATION_CONDITION) {
    let valueJson = item.officeLocationData
    return {
      type: item.conditionType,
      compare: item.relation,
      value: valueJson.join(',')
    }
  } else if (item.conditionType === TRAVLE_TIME_CONDITION) {
    let valueJson = item.relation == AMOUNT_BETWEEN ? `${(+item.startAmount)},${(+item.endAmount)}` : `${(+item.startAmount)}`
    return {
      type: item.conditionType,
      compare: item.relation,
      value: valueJson
    }
  } else if (item.conditionType === ROLE_CONDITION) {
    let valueJson = item.roles.map(i => {
      return `${i.role_id}#${i.role_name}`
    })
    return {
      type: item.conditionType,
      compare: item.relation,
      value: valueJson.join(',')
    }
  } else {
    let valueJson = item.relation == AMOUNT_BETWEEN ? `${(+item.startAmount).mul(100)},${(+item.endAmount).mul(100)}` : `${(+item.startAmount).mul(100)}`
    return {
      type: item.conditionType,
      compare: item.relation,
      value: valueJson
    }
  }
}

class ConditionDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerModel: deepCopy(this.props.drawerData),
      titleEditable: false,
      lineNodesConfig: deepCopy(this.props.lineNodesConfig),
      conditions: [],
      memberSelectorVisible: false,
      departSelectorVisible: false,
      invoiceTitleSelectorVisible: false,
      travelTypeSelectorVisible: false,
      travelModeSelectorVisible: false,
      roleSelectorVisible: false,
      treeData: [],
      conditionIndex: -1,
      invoiceTitleData: [],
      feeTypeData: [],
      cityConfigData: [],
      roles: [],
      parentFields: [],
      feeTypeSelectorVisible: false,
      priority: this.props.drawerData.node_option
    }
    const optionFilter = generalOptionFilter([], '已删除')
    if (this.state.drawerModel.node_value) {
      const cons = JSON.parse(this.state.drawerModel.node_value).conditions || []

      let conditions = cons.map(con => {
        if (con.type == APPLICIANT_CONDITION) { // 申请人/部门数据初始化
          let members = con.value.split(',');
          members = members.map(i => {
            const [id, name, leave] = i.split('#')
            return {
              id,
              name,
              leave
            }
          })
          return {
            conditionType: con.type,
            relation: con.compare,
            members
          }
        } else if (con.type === ROLE_CONDITION) { // 角色数据初始化
          let roles = con.value.split(',');
          roles = roles.map(i => {
            const [role_id, role_name, is_del] = i.split('#')
            return {
              role_id,
              role_name,
              is_del: is_del === 'true' ? true : undefined
            }
          })
          this.state.roles = roles;
          return {
            conditionType: con.type,
            relation: con.compare,
            roles
          }
        } else if (con.type == APPLICIANT_DEPART_CONDITION) { // 费用部门数据初始化
          let departs = con.value.split(',');
          departs = departs.map(i => {
            const [id, name] = i.split('#')
            return {
              type: 2,
              id,
              name
            }
          })
          return {
            conditionType: con.type,
            relation: con.compare,
            departs
          }
        } else if (con.type == COMPANY_TITLE_CONDITION) { // 发票抬头数据初始化
          let titles = con.value.split(',');
          titles = titles.map(i => {
            const [enterprise_title_id, enterprise_name] = i.split('#')
            return {
              enterprise_title_id,
              enterprise_name
            }
          })
          return {
            conditionType: con.type,
            relation: con.compare,
            titles
          }
        } else if (con.type == FEE_TYPE_CONDITION) { // 费用类型数据初始化
          let feeData = con.value.split(',');
          feeData = feeData.map(i => {
            const [fee_type, fee_name] = i.split('#')
            return {
              fee_type,
              fee_name
            }
          })
          return {
            conditionType: con.type,
            relation: con.compare,
            feeData
          }
        } else if (con.type == TRAVEL_MODE_CONDITION) { // 费用类型数据初始化
          let travelModeData = con.value.split(',');
          travelModeData = travelModeData.map(i => {
            return {
              label: optionFilter(i),
              value: i
            }
          })
          return {
            conditionType: con.type,
            relation: con.compare,
            travelModeData
          }
        } else if (con.type == TRAVEL_TYPE_CONDITION) { // 费用类型数据初始化
          let travelTypeData = con.value.split(',');
          travelTypeData = travelTypeData.map(i => {
            return {
              label: optionFilter(i),
              value: i
            }
          })
          return {
            conditionType: con.type,
            relation: con.compare,
            travelTypeData
          }
        } else if (con.type == OFFICE_LOCATION_CONDITION) { // 办公地点数据初始化
          let officeLocationData = con.value.split(',');
          return {
            conditionType: con.type,
            relation: con.compare,
            officeLocationData
          }
        } else if (con.type == TRAVLE_TIME_CONDITION) { // 出差时长数据初始化
          const [startAmount, endAmount] = con.value && con.value.split(',');
          return {
            conditionType: con.type,
            relation: con.compare,
            startAmount: startAmount ? (+startAmount) : null,
            endAmount: endAmount ? (+endAmount) : null,
          }
        } else { // 金额数据初始化
          const [startAmount, endAmount] = con.value && con.value.split(',');
          return {
            conditionType: con.type,
            relation: con.compare,
            startAmount: startAmount ? (+startAmount).div(100) : null,
            endAmount: endAmount ? (+endAmount).div(100) : null,
          }
        }
      })
      console.log('初始化后conditions列表', conditions)
      this.state.conditions = conditions
    }
  }

  inputRef = createRef();
  formRef = React.createRef();
  editMemberRef = React.createRef();
  editDepartRef = React.createRef();
  invoiceTitleSelectorRef = React.createRef();
  feeTypeSelectorRef = React.createRef();
  travelTypeRef = React.createRef();
  travelModeRef = React.createRef();

  // 保存节点
  submit = () => {
    let conditions = this.formRef.current.getFieldsValue().conditions
    const spec_type = [APPLICIANT_DEPART_CONDITION, APPLICIANT_CONDITION, FEE_TYPE_CONDITION, COMPANY_TITLE_CONDITION, TRAVEL_MODE_CONDITION, TRAVEL_TYPE_CONDITION, OFFICE_LOCATION_CONDITION, ROLE_CONDITION];
    console.log(conditions)
    if (!conditions || conditions.length == 0) {
      Message.warn('请添加条件')
      return;
    }
    let submitFlag = true
    // 检查表单
    for (let i = 0; i < conditions.length; i++) {
      if (!conditions[i]) {
        submitFlag = false
        Message.warn('请选择条件')
        break
      }
      // 申请人/部门条件   
      conditions[i].conditionType == APPLICIANT_CONDITION && (conditions[i].members = (conditions[i].members || []).filter(item => !item.leave))
      if (conditions[i].conditionType == APPLICIANT_CONDITION && (!conditions[i].members || conditions[i].members.length == 0)) {
        submitFlag = false
        Message.warn('请选择申请人')
        break
      }
      if (conditions[i].conditionType == APPLICIANT_DEPART_CONDITION && (!conditions[i].departs || conditions[i].departs.length == 0)) {
        submitFlag = false
        Message.warn('请选择费用部门')
        break
      }
      // 费用类型条件
      else if (conditions[i].conditionType == FEE_TYPE_CONDITION && (!conditions[i].feeData || conditions[i].feeData.length == 0)) {
        submitFlag = false
        Message.warn('请选择费用类型')
        break
      }
      // 费用类型条件
      else if (conditions[i].conditionType == ROLE_CONDITION && (!conditions[i].roles || conditions[i].roles.length == 0)) {
        submitFlag = false
        Message.warn('请选择角色')
        break
      }
      // 有已删除角色，未做修改
      else if (conditions[i].conditionType == ROLE_CONDITION && conditions[i].roles.some(role => role.is_del)) {
        submitFlag = false
        Message.warn('有已删除角色配置，请作更改')
        break
      }
      // 公司抬头条件
      else if (conditions[i].conditionType == COMPANY_TITLE_CONDITION && (!conditions[i].titles || conditions[i].titles.length == 0)) {
        submitFlag = false
        Message.warn('请选择公司抬头')
        break
      }
      // 出行方式
      else if (conditions[i].conditionType == TRAVEL_MODE_CONDITION && (!conditions[i].travelModeData || conditions[i].travelModeData.length == 0)) {
        submitFlag = false
        Message.warn('请选择出行方式')
        break
      }
      // 出行类型
      else if (conditions[i].conditionType == TRAVEL_TYPE_CONDITION && (!conditions[i].travelTypeData || conditions[i].travelTypeData.length == 0)) {
        submitFlag = false
        Message.warn('请选择出行类型')
        break
      }
      // 办公地点
      else if (conditions[i].conditionType == OFFICE_LOCATION_CONDITION && (!conditions[i].officeLocationData || conditions[i].officeLocationData.length == 0)) {
        submitFlag = false
        Message.warn('请选择办公地点')
        break
      }
      // 出差时长
      else if (conditions[i].conditionType == TRAVLE_TIME_CONDITION) {
        if (!conditions[i].startAmount || (conditions[i].relation == AMOUNT_BETWEEN && !conditions[i].endAmount)) {
          submitFlag = false
          Message.warn('请输入出差时长')
          break
        }
        if (conditions[i].relation == AMOUNT_BETWEEN && (conditions[i].startAmount <= 0 || conditions[i].endAmount <= 0)) {
          submitFlag = false
          Message.warn('请输入大于0整数')
          break
        }

        if (conditions[i].relation != AMOUNT_BETWEEN && conditions[i].startAmount <= 0) {
          submitFlag = false
          Message.warn('请输入大于0整数')
          break
        }

        // 输入时长格式不正确
        const reg = /^[0-9]+$/
        if (conditions[i].relation == AMOUNT_BETWEEN && (!reg.test(conditions[i].startAmount) || !reg.test(conditions[i].endAmount))) {
          submitFlag = false
          Message.warn('请输入大于0整数')
          break
        }
        if (conditions[i].relation != AMOUNT_BETWEEN && !reg.test(conditions[i].startAmount)) {
          submitFlag = false
          Message.warn('请输入大于0整数')
          break
        }
        // 输入金额超出长度
        if (conditions[i].relation == AMOUNT_BETWEEN && (conditions[i].startAmount.toString().length > 15 || conditions[i].endAmount.length > 15)) {
          submitFlag = false
          Message.warn('时长输入长度不能大于15位')
          break
        }
        if (conditions[i].relation != AMOUNT_BETWEEN && conditions[i].startAmount.toString().length > 15) {
          submitFlag = false
          Message.warn('时长输入长度不能大于15位')
          break
        }
      }
      // 其余金额条件
      else if (!spec_type.includes(conditions[i].conditionType)) {
        if (!conditions[i].startAmount || (conditions[i].relation == AMOUNT_BETWEEN && !conditions[i].endAmount)) {
          submitFlag = false
          Message.warn('请输入金额')
          break
        }
        if (conditions[i].relation == AMOUNT_BETWEEN && (conditions[i].startAmount <= 0 || conditions[i].endAmount <= 0)) {
          submitFlag = false
          Message.warn('请输入大于0的金额')
          break
        }
        if (conditions[i].relation != AMOUNT_BETWEEN && conditions[i].startAmount <= 0) {
          submitFlag = false
          Message.warn('请输入大于0的金额')
          break
        }
        // 输入金额格式不正确
        const reg = /(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/
        if (conditions[i].relation == AMOUNT_BETWEEN && (!reg.test(conditions[i].startAmount) || !reg.test(conditions[i].endAmount))) {
          submitFlag = false
          Message.warn('请输入正确的金额')
          break
        }
        if (conditions[i].relation != AMOUNT_BETWEEN && !reg.test(conditions[i].startAmount)) {
          submitFlag = false
          Message.warn('请输入正确的金额')
          break
        }
        // 输入金额超出长度
        if (conditions[i].relation == AMOUNT_BETWEEN && (conditions[i].startAmount.toString().length > 15 || conditions[i].endAmount.length > 15)) {
          submitFlag = false
          Message.warn('金额输入长度不能大于15位')
          break
        }
        if (conditions[i].relation != AMOUNT_BETWEEN && conditions[i].startAmount.toString().length > 15) {
          submitFlag = false
          Message.warn('金额输入长度不能大于15位')
          break
        }
      }
    }
    if (!submitFlag) {
      return
    }

    let node_value = {
      conditions: conditions.map(item => formatJson(item))
    }
    this.state.drawerModel.node_value = JSON.stringify(node_value)
    console.log('更新后节点数据', this.state.drawerModel)
    if (this.state.priority != this.state.drawerModel.node_option) {
      const pre = this.state.drawerModel.node_option.replace('优先级', '') - 1
      const now = this.state.priority.replace('优先级', '') - 1
      this.props.onChangePriority(pre, now);
    }
    this.props.onSubmit(this.state.drawerModel)
  }

  // 条件title修改失焦事件
  onTitleBlur = () => {
    this.setState({
      titleEditable: false
    })
  }

  // 点击启用条件title修改
  onTitleEdit = () => {
    this.setState({
      titleEditable: true
    }, () => {
      this.inputRef.current.focus()
    })
  }

  // title值变更
  onTitleChange = (e) => {
    this.state.drawerModel.node_name = e.target.value
    this.setState({
      drawerModel: this.state.drawerModel
    })
  }

  // 关闭抽屉
  onCloseDrawer = () => {
    this.props.onCloseDrawer()
  }

  // 优先级变更
  onPriorityChange = (val) => {
    this.setState({
      priority: val
    })
  }

  /* 关闭人员选择框 */
  closeMember = () => {
    this.setState({
      memberSelectorVisible: false
    })
  }

  /* 关闭部门选择框 */
  closeDepartSelector = () => {
    this.setState({
      departSelectorVisible: false
    })
  }

  /* 关闭抬头择框 */
  closeInvoiceTitleSelector = () => {
    this.setState({
      invoiceTitleSelectorVisible: false
    })
  }

  /* 关闭费用类型选择框 */
  closeFeeTypeSelector = () => {
    this.setState({
      feeTypeSelectorVisible: false
    })
  }

  /* 关闭出行类型选择框 */
  closeTravelTypeSelector = () => {
    this.setState({
      travelTypeSelectorVisible: false
    })
  }

  /* 关闭出行方式选择框 */
  closeTravelModeSelector = () => {
    this.setState({
      travelModeSelectorVisible: false
    })
  }

  /* 打开申请人/部门选择框 */
  showMemberSelector = (data = [], index) => {
    this.setState({
      memberSelectorVisible: true,
      conditionIndex: index
    })
    this.editMemberRef.current.wrappedInstance.setCheck(data.filter(i => !i.leave))
  }

  /* 打开部门选择框 */
  showDepartSelector = (data = [], index) => {
    this.setState({
      departSelectorVisible: true,
      conditionIndex: index
    })
    this.editDepartRef.current.wrappedInstance.setCheck(data)
  }

  /* 打开公司抬头选择框 */
  showInvoiceSelector = (data = [], index) => {
    this.setState({
      invoiceTitleSelectorVisible: true,
      conditionIndex: index
    })
    this.invoiceTitleSelectorRef.current.setChecked(data)
  }

  /* 打开出行类型选择框 */
  showTravelTypeSelector = (data = [], index) => {
    this.setState({
      travelTypeSelectorVisible: true,
      conditionIndex: index
    })
    const all_tmpl_options = []

    const travelTypeOpitons = all_tmpl_options.filter(i => i.field === 'travel_type').map(i => ({ label: i.label, value: i.value }))
    
    this.travelTypeRef.current.setChecked(data.filter(i => travelTypeOpitons.some(op => op.value === i.value)))
  }

  /* 打开出行方式选择框 */
  showTravelModeSelector = (data = [], index) => {
    this.setState({
      travelModeSelectorVisible: true,
      conditionIndex: index
    })
    const all_tmpl_options = []

    const travelWayOptions = all_tmpl_options.filter(i => i.field === 'travel_way').map(i => ({ label: i.label, value: i.value }))
    this.travelModeRef.current.setChecked(data.filter(i => travelWayOptions.some(op => op.value === i.value)))
  }

  /* 打开费用类型选择框 */
  showFeeTypeSelector = (data = [], index) => {
    this.setState({
      feeTypeSelectorVisible: true,
      conditionIndex: index
    })
    this.feeTypeSelectorRef.current.setChecked(data)
  }

  /* 选择申请人/部门后回调 */
  memberSelectorCallback = val => {
    if (val.length > 20) {
      Message.warn('最多可添加20个成员')
      return;
    }
    const { conditionIndex } = this.state
    const fields = this.formRef.current.getFieldsValue().conditions;
    fields[conditionIndex].members = val.map(item => {
      return {
        type: item.type,
        id: item.id.toString(),
        name: typeof item.name == 'string' ? item.name : item.name.props.children
      }
    })
    this.setState({
      memberSelectorVisible: false
    })
  }

  /* 选择部门后回调 */
  departSelectorCallback = val => {
    const { conditionIndex } = this.state
    const fields = this.formRef.current.getFieldsValue().conditions;
    fields[conditionIndex].departs = val.map(item => {
      return {
        type: item.type,
        id: item.id,
        name: typeof item.name == 'string' ? item.name : item.name.props.children
      }
    })
    this.setState({
      departSelectorVisible: false
    })
  }

  /* 选择公司抬头后回调 */
  invoiceTitleSelectedCallback = val => {
    const { conditionIndex } = this.state
    const fields = this.formRef.current.getFieldsValue().conditions;
    fields[conditionIndex].titles = val.map(item => {
      return {
        enterprise_title_id: item.enterprise_title_id,
        enterprise_name: item.enterprise_name
      }
    })
  }

  /* 选择费用类型后回调 */
  feeTypeSelectedCallback = (val) => {
    const { conditionIndex } = this.state
    console.log(val);
    const fields = this.formRef.current.getFieldsValue().conditions;
    fields[conditionIndex].feeData = val.map(item => {
      return {
        fee_type: item.fee_type,
        fee_name: item.fee_name
      }
    })
  }

  /* 选择出行类型后回调 */
  travelTypeSelectorCallback = (val) => {
    const { conditionIndex } = this.state
    console.log(val);
    const fields = this.formRef.current.getFieldsValue().conditions;
    fields[conditionIndex].travelTypeData = val
  }

  /* 选择出行方式回调 */
  travelModeSelectorCallback = (val) => {
    const { conditionIndex } = this.state
    console.log(val);
    const fields = this.formRef.current.getFieldsValue().conditions;
    fields[conditionIndex].travelModeData = val
  }

  /**打开角色selector */
  showRoleSelector = index => {
    this.setState({
      conditionIndex: index,
      roleSelectorVisible: true
    })
  }

  /**关闭角色selector */
  onHideRolePicker = () => {
    this.setState({
      roleSelectorVisible: false
    })
  }

  /**选择角色后回调 */
  roleSelectorCallback = async (val) => {
    if (!val) {
      return;
    }
    const { conditionIndex } = this.state
    const fields = this.formRef.current.getFieldsValue().conditions;
    fields[conditionIndex].roles = val.map(item => {
      return {
        role_id: item.role_id,
        role_name: typeof item.role_name == 'string' ? item.role_name : item.role_name.props.children
      }
    })
    this.setState({
      roleSelectorVisible: false,
      roles: fields[conditionIndex].roles
    })
  }


  /* 初始化 */
  initData = () => {

    this.formRef.current.setFieldsValue({
      conditions: this.state.conditions
    })
  }

  componentDidMount() {
    this.initData();
  }

  getCurrFields = () => {
    return this.formRef.current.getFieldsValue()['conditions'] || []
  }

  onFormValuesChange = (e, allValues) => {
    const { conditions = [] } = allValues
    const parentFields = conditions.map(i => i && i.conditionType)

    this.setState({
      parentFields
    })
  }
  generateConfList = () => {
    return (
      <Form name="dynamic_form_nest_item" ref={this.formRef} onValuesChange={this.onFormValuesChange} onFinish={this.onFinish} autoComplete="off">
        <Form.List name="conditions">
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <span style={{ display: 'flex' }} key={field.key}>
                    <Form.Item
                      {...field}
                      style={{ flex: 1 }}
                    >
                      <ConditionEdit
                        index={index}
                        showMemberSelector={this.showMemberSelector}
                        showInvoiceSelector={this.showInvoiceSelector}
                        showFeeTypeSelector={this.showFeeTypeSelector}
                        showDepartSelector={this.showDepartSelector}
                        getParentFields={this.getCurrFields}
                        parentFields={this.state.parentFields}
                        showTravelModeSelector={this.showTravelModeSelector}
                        showTravelTypeSelector={this.showTravelTypeSelector}
                        showRoleSelector={this.showRoleSelector}
                        cityConfigList={this.state.cityConfigData}
                        conditionLabelMap={this.props.conditionLabelMap}
                      ></ConditionEdit>
                    </Form.Item>
                    <span className="condition-edit-close" onClick={() => { remove(field.name); }}></span>
                  </span>
                ))}

                <Form.Item>
                  <Button
                    onClick={() => {
                      add();
                    }}
                    block
                    type="primary"
                    className="add-condition"
                  >
                    <PlusOutlined /> 添加条件
                    </Button>
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
      </Form>
    )
  }

  render() {
    const { titleEditable, drawerModel, lineNodesConfig, treeData, memberSelectorVisible, departSelectorVisible,
      invoiceTitleData, feeTypeData, priority, roles = [], roleSelectorVisible } = this.state

    const all_tmpl_options = []

    const travelTypeOpitons = all_tmpl_options.filter(i => i.field === 'travel_type').map(i => ({ label: i.label, value: i.value }))
    const transWayOpitons = all_tmpl_options.filter(i => i.field === 'travel_way').map(i => ({ label: i.label, value: i.value }))
    console.log(travelTypeOpitons)
    const selectedRoles = roles.map(item => {
      return {
        ...item,
        key: item.role_id,
        title: item.role_name
      }
    })
    return (
      <div className="condition-edit-drawer_contailer">
        <div className="drawer-header">
          <div className="left-header">
            <Hidden visible={!titleEditable}>
              <span className="edit-title">{drawerModel.node_name}</span>
              <span className="edit-icon" onClick={this.onTitleEdit} style={{ marginLeft: 10 }}></span>
            </Hidden>
            <Hidden visible={titleEditable}>
              <Input maxLength={20} value={drawerModel.node_name} ref={this.inputRef} onChange={this.onTitleChange} onBlur={this.onTitleBlur} style={{ width: 300 }}></Input>
            </Hidden>
          </div>
          <Select className="priority" onChange={this.onPriorityChange} value={priority}>
            {lineNodesConfig.currentNodes.lineNodes.slice(0, -1).map(item => {
              return <Option value={item.node_option} key={item.node_option}>{item.node_option}</Option>
            })}
          </Select>
          <HoverTips placement="bottomLeft">
            <span>首先匹配“优先级1”的条件。如果匹配成功则审批单发送给该条件下的审批人和抄送人；如果匹配不成功则继续进行匹配下一优先级的条件。</span>
          </HoverTips>
        </div>
        <div className="drawer-content-wrapper">
          <h1 style={{ fontSize: 16 }}>同时满足以下条件</h1>
          {this.generateConfList()}
        </div>
        <div className="button-bar">
          <Button type="primary" onClick={() => { this.submit() }}>确定</Button>
          <Button onClick={this.onCloseDrawer}>取消</Button>
        </div>      
      </div>
    )
  }
}

export default ConditionDrawer
