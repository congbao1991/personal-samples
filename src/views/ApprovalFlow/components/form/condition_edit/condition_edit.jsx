import React, { useState, useEffect } from 'react'
import { Input, Select, TreeSelect } from 'antd'
import Hidden from '@/components/Hidden'
import '../index.less'
import qs from 'qs'
import {
  CONDITION_OPTIONS, CONDITION_RELATION_OPTIONS, AMOUNT_RELATION_OPTIONS, APPLICIANT_DEPART_CONDITION, FEETYPE_CONDITION_RELATION_OPTIONS,
  APPLICIANT_CONDITION, COMPANY_TITLE_CONDITION, AMOUNT_CONDITION, FEE_TYPE_CONDITION, AMOUNT_BETWEEN, TRAVEL_MODE_CONDITION,
  TRAVEL_TYPE_CONDITION, OFFICE_LOCATION_CONDITION, TRAVLE_TIME_CONDITION, ROLE_CONDITION
} from '../../../constant'


const { TreeNode } = TreeSelect

function isEmpty(target) {
  if (target === null || target === undefined) {
    return true
  }
}

const { Option } = Select

const ConditionEdit = ({ value = {}, onChange, showMemberSelector, index, showRoleSelector, showInvoiceSelector, parentFields,
  showFeeTypeSelector, showDepartSelector, showTravelTypeSelector, showTravelModeSelector, cityConfigList, conditionLabelMap }) => {

  const [relation, setRelation] = useState(value.relation)
  const [conditionType, setConditionType] = useState(value.conditionType)
  const [startAmount, setStartAmount] = useState(value.startAmount)
  const [endAmount, setEndAmount] = useState(value.endAmount)
  const [officeLocationData, setOfficeLocationData] = useState(value.officeLocationData)
  let option = []
  switch (value.conditionType) {
    case APPLICIANT_CONDITION:
    case APPLICIANT_DEPART_CONDITION:
    case COMPANY_TITLE_CONDITION:
    case OFFICE_LOCATION_CONDITION:
    case TRAVEL_TYPE_CONDITION:
    case ROLE_CONDITION:
      option = CONDITION_RELATION_OPTIONS
      break
    case FEE_TYPE_CONDITION:
    case TRAVEL_MODE_CONDITION:
      option = FEETYPE_CONDITION_RELATION_OPTIONS
      break
    case TRAVLE_TIME_CONDITION:
    default:
      option = AMOUNT_RELATION_OPTIONS
      break
  }
  const [relationOptions, setRelationOptions] = useState(option)
  const { members = [] } = value
  const { roles = [] } = value
  const { departs = [] } = value
  const { titles = [] } = value
  const { feeData = [] } = value
  const { travelModeData = [] } = value
  const { travelTypeData = [] } = value
  const { doc_tmpl_type } = qs.parse(window.location.search, { ignoreQueryPrefix: true })
  const conditionOptions = CONDITION_OPTIONS.filter(item => {
    return item.template_types === 'ALL' || item.template_types.includes(+doc_tmpl_type)
  })

  const triggerChange = changedValue => {
    if (onChange) {
      onChange({ conditionType, relation, ...value, ...changedValue })
    }
  }

  useEffect(() => {
    if (!isEmpty(conditionType)) {
      triggerChange({ conditionType, relation, officeLocationData, startAmount, endAmount })
    }
  }, [conditionType, relation, officeLocationData, startAmount, endAmount])

  /* 条件更改，重新设置关系options */
  const onConditionTypeChange = val => {
    setConditionType(val)
    switch (val) {
      case APPLICIANT_CONDITION:
      case APPLICIANT_DEPART_CONDITION:
      case COMPANY_TITLE_CONDITION:
      case OFFICE_LOCATION_CONDITION:
      case TRAVEL_TYPE_CONDITION:
      case ROLE_CONDITION:
        setRelationOptions(CONDITION_RELATION_OPTIONS)
        setRelation(CONDITION_RELATION_OPTIONS[0].value)
        break
      case FEE_TYPE_CONDITION:
      case TRAVEL_MODE_CONDITION:
        setRelationOptions(FEETYPE_CONDITION_RELATION_OPTIONS)
        setRelation(FEETYPE_CONDITION_RELATION_OPTIONS[0].value)
        break
      case TRAVLE_TIME_CONDITION:
      default:
        setRelationOptions(AMOUNT_RELATION_OPTIONS)
        setRelation(AMOUNT_RELATION_OPTIONS[0].value)
        break
    }
    setStartAmount(null)
    setEndAmount(null)
  }

  const onRelationChange = val => {
    setRelation(val)
  }

  const onStartAmountChange = e => {
    setStartAmount(e.target.value)
  }

  const onEndAmountChange = e => {
    setEndAmount(e.target.value)
  }

  const onOfficeLocationChange = (val, label, extra) => {
    setOfficeLocationData(val)
    console.log(officeLocationData)
    console.log(val, label, extra)
  }

  /* 是否显示输入框 */
  const showInput = val => {
    switch (val) {
      case AMOUNT_CONDITION:
      case TRAVLE_TIME_CONDITION:
        return true
      default:
        return false
    }
  }

  /* 生成筛选记录 */
  const renderTreeNode = (list, parentName = '') => {
    const $list = []
    list.length > 0 && list.forEach(item => {
      if (item.child) {
        $list.push(<TreeNode isLeaf={false} selectable={false} value={`${parentName}|${item.name}`} key={`${item.name}parent`} title={item.name}>{renderTreeNode(item.child, item.name)}</TreeNode>)
      } else {
        $list.push(<TreeNode isLeaf value={`${parentName}|${item.name}`} key={`${item.name}child`} title={item.name} />)
      }
    })
    return $list
  }
  // const parentFields = getParentFields() || []
  // const conditionTypes = parentFields.map(i => i && i.conditionType)
  const treeNodes = renderTreeNode(cityConfigList)
  return (
    <span className="condition-edit-wrap" style={{ display: 'flex' }}>
      <Select
        value={value.conditionType || conditionType}
        placeholder="请选择条件"
        onChange={onConditionTypeChange}
        className="condition-type-select"
      >
        {
          conditionOptions.map(item => (
            <Option
              value={item.value}
              key={item.value}
              disabled={parentFields.includes(item.value)}
            >
              {conditionLabelMap[item.field] || item.label}
            </Option>
          ))
        }
      </Select>
      <Hidden visible={value.conditionType !== undefined && value.conditionType !== null}>
        <Select
          value={value.relation || relation}
          className="condition-relation-select"
          onChange={onRelationChange}
        >
          {
            relationOptions.map(item => {
              return <Option value={item.value} key={item.value}>{item.label}</Option>
            })
          }
        </Select>
      </Hidden>
      <Hidden visible={value.conditionType === APPLICIANT_CONDITION}>
        <div className="condition-edit-mem-sel" onClick={() => { showMemberSelector(members, index) }}>
          <Hidden visible={members.length > 0}>
            <div>
              {
                members.map(item => {
                  return <span className="condition-edit-member-styl" key={item.id}><span className={`condition-edit-item-content ${item.leave ? 'quit' : ''}`}>{`${item.name}${item.leave ? '(已离职)' : ''}`}</span></span>
                })
              }
            </div>
          </Hidden>
          <Hidden visible={members.length === 0}>
            添加成员+
          </Hidden>
        </div>
      </Hidden>
      <Hidden visible={value.conditionType === ROLE_CONDITION}>
        <div className="condition-edit-mem-sel" onClick={() => { showRoleSelector(index) }}>
          <Hidden visible={roles.length > 0}>
            <div>
              {
                roles.map(item => {
                  return <span className="condition-edit-member-styl" key={item.role_id}><span className={`condition-edit-item-content ${item.is_del ? 'quit' : ''}`}>{`${item.role_name}${item.is_del ? '(已删除)' : ''}`}</span></span>
                })
              }
            </div>
          </Hidden>
          <Hidden visible={roles.length === 0}>
            添加+
          </Hidden>
        </div>
      </Hidden>
      <Hidden visible={value.conditionType === APPLICIANT_DEPART_CONDITION}>
        <div className="condition-edit-mem-sel" onClick={() => { showDepartSelector(departs, index) }}>
          <Hidden visible={departs.length > 0}>
            <div>
              {
                departs.map(item => {
                  return <span className="condition-edit-member-styl" key={item.id}>{item.name}</span>
                })
              }
            </div>
          </Hidden>
          <Hidden visible={departs.length === 0}>
            添加部门+
          </Hidden>
        </div>
      </Hidden>
      <Hidden visible={value.conditionType === COMPANY_TITLE_CONDITION}>
        <div className="condition-edit-mem-sel" onClick={() => { showInvoiceSelector(titles, index) }}>
          <Hidden visible={titles.length > 0}>
            <div>
              {
                titles.map(item => {
                  return <span className="condition-edit-member-styl" key={item.enterprise_title_id}>{item.enterprise_name}</span>
                })
              }
            </div>
          </Hidden>
          <Hidden visible={titles.length === 0}>
            选择公司抬头+
          </Hidden>
        </div>
      </Hidden>
      <Hidden visible={value.conditionType === FEE_TYPE_CONDITION}>
        <div className="condition-edit-mem-sel" onClick={() => { showFeeTypeSelector(feeData, index) }}>
          <Hidden visible={feeData.length > 0}>
            <div>
              {
                feeData.map(item => {
                  return <span className="condition-edit-member-styl" key={item.fee_type}>{item.fee_name}</span>
                })
              }
            </div>
          </Hidden>
          <Hidden visible={feeData.length === 0}>
            选择费用类型+
          </Hidden>
        </div>
      </Hidden>
      <Hidden visible={value.conditionType === TRAVEL_MODE_CONDITION}>
        <div className="condition-edit-mem-sel" onClick={() => { showTravelModeSelector(travelModeData, index) }}>
          <Hidden visible={travelModeData.length > 0}>
            <div>
              {
                travelModeData.map(item => {
                  return <span className="condition-edit-member-styl" key={item.value}>{item.label}</span>
                })
              }
            </div>
          </Hidden>
          <Hidden visible={travelModeData.length === 0}>
            选择出行方式+
          </Hidden>
        </div>
      </Hidden>
      <Hidden visible={value.conditionType === TRAVEL_TYPE_CONDITION}>
        <div className="condition-edit-mem-sel" onClick={() => { showTravelTypeSelector(travelTypeData, index) }}>
          <Hidden visible={travelTypeData.length > 0}>
            <div>
              {
                travelTypeData.map(item => {
                  return <span className="condition-edit-member-styl" key={item.value}>{item.label}</span>
                })
              }
            </div>
          </Hidden>
          <Hidden visible={travelTypeData.length === 0}>
            选择出行类型+
          </Hidden>
        </div>
      </Hidden>
      <Hidden visible={value.conditionType === OFFICE_LOCATION_CONDITION}>
        <TreeSelect
          placeholder="请选择办公地点"
          multiple
          style={{ flex: 1 }}
          value={officeLocationData}
          onChange={onOfficeLocationChange}>
          {treeNodes}
        </TreeSelect>
      </Hidden>
      <Hidden visible={showInput(value.conditionType)}>
        <div style={{ flex: 1 }}>
          <Hidden visible={value.relation !== AMOUNT_BETWEEN}>
            <Input className="single-input" placeholder={value.conditionType === TRAVLE_TIME_CONDITION ? '出差时长（小时）' : null} type="number" value={value.startAmount || startAmount} onChange={onStartAmountChange} />
          </Hidden>
          <Hidden visible={value.relation === AMOUNT_BETWEEN}>
            <Input className="double-input-inline" placeholder={value.conditionType === TRAVLE_TIME_CONDITION ? '出差时长（小时）' : null} type="number" value={value.startAmount || startAmount} onChange={onStartAmountChange} />
            <span className="input-split">-</span>
            <Input className="double-input-inline" placeholder={value.conditionType === TRAVLE_TIME_CONDITION ? '出差时长（小时）' : null} type="number" value={value.endAmount || endAmount} onChange={onEndAmountChange} />
          </Hidden>
        </div>
      </Hidden>
    </span>
  )
}

export default ConditionEdit
