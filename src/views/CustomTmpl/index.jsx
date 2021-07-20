import React, { useState, useRef, useEffect, useMemo } from 'react'
import { ReactSortable } from 'react-sortablejs'
import { Button, message, Modal } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import cx from 'classname'
import { deepCopy } from '@/utils'
import Container from './components/container'
import './index.less'
import FormPanel from './forms/form-panel/index'
import { notCoexist, componentNameMap, componentsTypeTitleMap, reimburseTypeNameMap, getDefaultValue, arrToMap, businessHiddenInList, VIRTUAL_DATA, NOT_IN_CHILD_BILL_COMPONENTS } from './data'
// import TP from './招待申请单-初始化.json'
import { CategoryListContext } from './context-manager'
import { res0, res1, res2 } from './res'

const lodash = require('lodash/object')

export default function CustomDocTmpl(props) {
  const formRef = useRef()

  const template_type = 2 // 1报销,2申请单,3借款单,4付款单
  const form_type = 2

  const [componentsNameMap, setComponentsNameMap] = useState({})
  const [layoutTab, setLayoutTab] = useState(1)
  // 用于存储校验表单错误的组件
  const [checkComponentForm, setCheckComponentForm] = useState({})
  const [tabsKey, setTabsKey] = useState('mobile')
  // 当前选中控件
  const [currentComponent, setCurrentComponent] = useState(null)
  // 当前选中控件所在的容器
  const [currentContainer, setCurrentContainer] = useState(null)
  // tab容器数据
  const [containerData, setContainerData] = useState([])
  const [containerData2, setContainerData2] = useState([])
  // 基础组件
  const [basicsComponents, setBasicsComponents] = useState([])
  // 业务组件
  const [businessComponents, setBusinessComponents] = useState([])

  const [submitLoading, setSubmitLoading] = useState(false)

  const [categoryList, setCategoryList] = useState([])

  // PC预览
  const [pcModelMap, setPcModelMap] = useState({})
  const [parentDetailInfo, setParentDetailInfo] = useState({})
  const [expenseChildList, setExpenseChildList] = useState([])

  // 处理控件列表
  const processingComponentList = (res, cCountMap, optionsDataMap) => {
    const basicsArr = []
    const businessArr = []
    for (let i = 0; i < res.length; i++) {
      // 合并{res[i]本地,res[i]远程}, 合并{res[i].form本地,res[i].form远程}, 合并{res[i].form.option本地,res[i].form.option远程}
      const options = optionsDataMap[res[i].name]
      let newResI = Object.assign(componentsNameMap[res[i].name], res[i], { form: Object.assign({}, componentsNameMap[res[i].name].form, res[i].model, options ? { options: options.sort((a, b) => a.order - b.order) } : {}) })
      delete newResI.id
      const name_type = `${newResI.name}_${template_type}`
      // 特殊逻辑 同一个组件不同type的title与desc展示不一样
      const mapTitle = componentsTypeTitleMap[name_type]
      mapTitle && (newResI = Object.assign({}, newResI, mapTitle, { form: Object.assign(newResI.form, mapTitle.form) }))
      // 处理count
      if (cCountMap[newResI.name] && typeof newResI.count !== 'undefined') {
        newResI.count = cCountMap[newResI.name]
      }
      // 特殊逻辑：map里面的组件, 而且是报销单模板，则加入限制控件不能拖入子单配置
      if (NOT_IN_CHILD_BILL_COMPONENTS[newResI.name] && template_type === 1) {
        newResI.includedContainer = {
          container: '1',
          msg: '该组件不能添加到报销清单中，只能添加首页',
        }
      }

      // 特殊逻辑：行程清单组件在申请单里面打印和必填要打勾 且不能编辑
      if (newResI.name === 'trans_list' && template_type === 2) {
        newResI.required_fixed = true;
        newResI.print_fixed = true;
      }
      // 区分基础组件和业务组件
      if (res[i].type === 1) {
        delete newResI.form.field
        basicsArr.push(newResI)
      } else if (res[i].type === 2 && !businessHiddenInList[newResI.name]) {
        // 特殊逻辑，报销单的行程清单提交必须提交两个model，travel_list和trans_list。且travel_list不在列表展示
        if (template_type === 1 && newResI.name === 'travel_list') {
          componentsNameMap.travel_list.model = newResI.model
        } else {
          // 特殊逻辑,不同type的不同固定控件,有的需要展示在控件列表,有fixed属性再通过name_type匹配
          businessArr.push(newResI)
        }
      }
    }
    setComponentsNameMap(componentsNameMap)
    setBasicsComponents(basicsArr)
    setBusinessComponents(businessArr)
  }
  // 获取默认控件列表
  const processingDefaultTemplate = (data, optionsDataMap, callback) => {
    const { view, model } = data
    const modelMap = model.reduce((m, i) => {
      m[i.id] = i
      m[i.field] = i
      return m
    }, {})
    // 用来统计个数，更新给列表数据
    const cCountMap = {}
    const componentsMain = []
    const componentsChild = []
    // 初始化匹配map
    const vMap = view.reduce((m, item) => {
      item.children = []
      m[item.id] = item
      return m
    }, {})
    console.log('optionsDataMapoptionsDataMap', optionsDataMap)
    for (let i = 0; i < view.length; i++) {
      // 顺序注入 本地规则->view->form 结果以接口数据为主，本地为辅, 合并{view[i]本地,view[i]远程}, 合并{view[i].form本地,view[i].form远程}, 合并{view[i].form.option本地,view[i].form.option远程}
      const options = modelMap[view[i].id] && optionsDataMap[modelMap[view[i].id].field]
      const VI = Object.assign({}, componentsNameMap[view[i].component], view[i],
        {
          form: Object.assign({}, componentsNameMap[view[i].component].form,
            modelMap[view[i].id],
            options ? { options: options.sort((a, b) => a.order - b.order) } : {})
        })
      // 特殊逻辑：如果是附件component, 而且是报销单模板，则加入限制控件不能拖入子单配置
      if (NOT_IN_CHILD_BILL_COMPONENTS[VI.name] && template_type === 1) {
        VI.includedContainer = {
          container: '1',
          msg: '该组件不能添加到报销清单中，只能添加首页',
        }
      }
      // 特殊逻辑：行程清单组件在申请单里面打印和必填要打勾 且不能编辑
      if (VI.name === 'trans_list' && template_type === 2) {
        VI.required_fixed = true;
        VI.print_fixed = true;
      }
      // 统计组件个数
      cCountMap[VI.component] = cCountMap[VI.component] ? cCountMap[VI.component] + 1 : 1
      // 报销清单(子单)或者各类申请单(主单)
      if (vMap[VI.pid]) {
        vMap[VI.pid].children.push(VI)
        vMap[VI.pid].children = vMap[VI.pid].children.sort((a, b) => a.order - b.order)
      } else if (modelMap[VI.id] && modelMap[VI.id].belong === 'main') {
        // 报销主单
        componentsMain.push(VI)
      } else {
        componentsChild.push(VI)
      }
    }
    setContainerData(componentsMain.sort((a, b) => a.order - b.order))
    setContainerData2(componentsChild.sort((a, b) => a.order - b.order))
    callback(cCountMap)
  }
  useMemo(() => {
    const newComponentsNameMap = deepCopy(componentNameMap)
    // template_3默认为commiter，其他默认为proxy_range
    if (template_type === 3 || template_type === 4) {
      newComponentsNameMap.reimburseer.form.source = 'commiter'
    }

    setComponentsNameMap(newComponentsNameMap)
  }, [])
  useEffect(() => {
    // 修改模板
    // modTemplate({
    //   form_type,
    //   view: JSON.stringify(TP.view),
    //   model: JSON.stringify(TP.model)
    // })
    // 获取组件列表->获取模板数据->获取options
    // Promise.all([getComponents(template_type), getTemplateLatest(form_type), getOptionsLatest(form_type), getCategoryList()])
    //   .then(res => {
    //     processingDefaultTemplate(res[1], res[2], cCountMap => processingComponentList(res[0], cCountMap, res[2]))
    //     setCategoryList(res[3] || [])
    //   })
    processingDefaultTemplate(res1, res2, cCountMap => processingComponentList(res0, cCountMap, res2))
    setCategoryList([])
  }, [])

  /**
   * 返回上一页，需要在上一页定位
   */
  const goBack = () => {
    sessionStorage.setItem('echo_selected_custom_doc_tmpl', JSON.stringify({
      type: form_type,
      currTab: '2'
    }))
    props.history.goBack()
  }

  /**
   * 保存模板
   */
  const saveTemplate = get_view_model => {
    const view = []
    const model = []

    // 通用处理，支持N级嵌套(目前业务只有2级)
    function extractData(arr, pid, belong) {
      let order = 1
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].children) {
          extractData(arr[i].children, arr[i].id, belong)
        }
        view.push({
          id: arr[i].id,
          pid,
          component: arr[i].name,
          order: order++,
          type: arr[i].type,
          fixed: arr[i].fixed
        })
        arr[i].form.options && (delete arr[i].form.options)// 提交时去掉options,通过接口返回再去匹配
        const belongObj = template_type === 1 ? { belong } : {}
        model.push({
          ...arr[i].form,
          ...belongObj,
          id: arr[i].id,
          pid,
          component: arr[i].name,
          field: arr[i].type === 1 ? (arr[i].form.field || `${arr[i].name}_${arr[i].id}`) : arr[i].name,
          componentType: get_view_model ? arr[i].type : undefined // 特殊逻辑，预览PC端模板的时候需要在model上区分是基础组件还是业务组件
        })
      }
    }

    extractData(JSON.parse(JSON.stringify(containerData)), 0, 'main')
    extractData(JSON.parse(JSON.stringify(containerData2)), 0, 'child')
    // 特殊逻辑，报销单的行程清单提交必须提交两个model，travel_list和trans_list。
    if (template_type === 1) {
      const transListModel = model.find(i => i.field === 'trans_list')
      if (transListModel) {
        const id = new Date().getTime()
        model.push({
          ...componentsNameMap.travel_list.form,
          required: transListModel.required,
          component: 'travel_list',
          id,
          pid: 0,
          belong: transListModel.belong
        })
        transListModel.pid = id
      }
    }
    console.log(JSON.stringify({ view, model }))
    console.log({ view, model })
    if (get_view_model) {
      return { view, model }
    }
    message.success('已保存')
  }

  /**
   * 校验options
   */
  const getError = () => {
    // 检查单选框、多选框、出行方式、出行类型的options长度是否为空
    const hasOptionComponentsMap = {
      custom_check_box: true,
      custom_radio: true,
      trans_way: true,
      travel_type: true
    }
    function checkData(data) {
      data.forEach(i => {
        if (i.children && i.children.length > 0) {
          checkData(i.children)
        }
        if (hasOptionComponentsMap[i.name] && i.form.options) {
          // eslint-disable-next-line no-prototype-builtins
          if (i.form.options.length === 0 || !i.form.options[0].hasOwnProperty('id')) {
            checkComponentForm[`${i.name}_${i.id}`] = true
          } else if (i.form.options.some(it => !it.label || !it.label.trim())) {
            checkComponentForm[`${i.name}_${i.id}`] = true
          } else {
            // 检查options的label是否重复
            const labels = i.form.options.map(op => op.label) || []
            const newSetLabels = Array.from(new Set(labels))
            if (newSetLabels.length < i.form.options.length) {
              checkComponentForm[`${i.name}_${i.id}`] = true
            }
          }
        }
        // 检查明细或者分栏组件是否没配子组件
        if (i.name === 'custom_detailed' || i.name === 'custom_columns') {
          if (!i.children || i.children.length === 0) {
            checkComponentForm[`${i.name}_${i.id}`] = true
          }
        }
      })
    }
    checkData(containerData)
    checkData(containerData2)
  }

  /**
   * 校验模板组件表单
   */
  const checkedSaveTemplate = () => {
    setSubmitLoading(true)
    if (currentComponent) {
      formRef.current.submit()
    } else {
      getError()
    }
    setTimeout(() => {
      const errorLen = Object.keys(checkComponentForm).length
      if (errorLen > 0) {
        message.error(`发现${errorLen}个未完善的组件表单，请完善后提交`)
        setSubmitLoading(false)
        return
      }
      saveTemplate()
    }, 100)
  }
  /**
   * 寻找组件所在下标
   */
  const findComponentIndex = (tab, id, arr) => {
    let data
    if (arr) {
      data = arr
    } else if (tab === '1') {
      data = containerData
    } else {
      data = containerData2
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        return [i]
      }
      if (data[i].children) {
        for (let j = 0; j < data[i].children.length; j++) {
          if (data[i].children[j].id === id) {
            return [i, j]
          }
        }
      }
    }
    return []
  }

  /**
   * 更新当前选中的控件所在tab
   */
  const updateCurrentComponent = (arr, tab) => {
    if (currentComponent) {
      const tIndex = findComponentIndex(tab, currentComponent.id, arr)
      setCurrentContainer(tIndex.length > 0 ? tab : (tab === '1' ? '2' : '1'))
    }
  }

  /**
   * 恢复数据 & 提示
   */
  const recoverContainerData = errorContent => {
    if (errorContent) {
      Modal.destroyAll()
      Modal.error({
        title: '提示',
        content: errorContent
      })
    }
    const oldState = JSON.parse(JSON.stringify(containerData))
    const oldState2 = JSON.parse(JSON.stringify(containerData2))
    setTimeout(() => {
      setContainerData(oldState)
      setContainerData2(oldState2)
    })
  }

  /**
   * 校验组件不能共存，校验放置tab
   */
  const checkNotCoexist = (data, tab) => {
    const allData = data.concat(tab === '1' ? containerData2 : containerData)
    const cMap = {}
    // 考虑了嵌套组件(其实可以不考虑,因为先校验了是否可拖入)
    for (let i = 0; i < allData.length; i++) {
      if (cMap[allData[i].name]) {
        cMap[allData[i].name] += 1
      } else {
        cMap[allData[i].name] = 1
      }
      if (allData[i].children) {
        for (let j = 0; j < allData[i].children.length; j++) {
          if (cMap[allData[i].children[j].name]) {
            cMap[allData[i].children[j].name] += 1
          } else {
            cMap[allData[i].children[j].name] = 1
          }
        }
      }
    }
    for (let i = 0; i < notCoexist.length; i++) {
      const isConflict = notCoexist[i].filter(name => cMap[name])
      if (isConflict.length === notCoexist[i].length) {
        const notCoexistNames = notCoexist[i].reduce((str, c, idx) => {
          str += `【${componentsNameMap[c].title}${componentsNameMap[c].desc ? `-${componentsNameMap[c].desc}` : ''}】${idx < notCoexist[i].length - 1 ? '与' : ''}`
          return str
        }, '')
        recoverContainerData(`${notCoexistNames}只能存在其中一个`)
        return
      }
    }
    // 更新count 统计
    for (let i = 0; i < businessComponents.length; i++) {
      if (cMap[businessComponents[i].name] && typeof businessComponents[i].count !== 'undefined') {
        businessComponents[i].count = cMap[businessComponents[i].name]
      }
    }
    setBusinessComponents(businessComponents)
    for (let i = 0; i < basicsComponents.length; i++) {
      if (cMap[basicsComponents[i].name] && typeof basicsComponents[i].count !== 'undefined') {
        basicsComponents[i].count = cMap[basicsComponents[i].name]
      }
    }
    setBasicsComponents(basicsComponents)
  }

  /**
   * 主要用于容器套件交互
   */
  const updateContainerData = (children = [], cItem, tab) => {
    // Columns嵌套Columns的情况
    const exclude = (cItem.exclude || []).reduce((m, i) => {
      m[i] = true
      return m
    }, {})
    // 旧数据map，用于匹配新增项
    const oldChildrenMap = cItem.children.reduce((map, i) => {
      map[i.name] = true
      return map
    }, {})
    // 取新增的控件name
    let addItemName = null
    for (let i = 0; i < children.length; i++) {
      const includedContainer = children[i].includedContainer
      const eqTab = includedContainer && includedContainer.container === tab
      const isMustIn = eqTab && includedContainer.mustIn && includedContainer.mustIn.c === cItem.name && includedContainer.mustIn.template_type === template_type
      // 此处限制配置：组件不能放置在指定组件中，组件一定要在指定组件中的优先级高【如果 一定要在 存在，那 不能放置 无效】
      if (exclude[children[i].name] && !isMustIn) {
        recoverContainerData('该组件不能添加到套件中')
        return
      }
      // 判断旧数据没有的，表示新增
      if (!oldChildrenMap[children[i].name]) {
        addItemName = children[i].name
      }
      // 处理唯一id
      if (!children[i].id) {
        children[i].id = new Date().getTime()
      }
      // 此处限制配置：一级控件不能放置在非指定的container中的特定组件容器中，
      // 有配置项且当前tab不是当前能在的容器，需要校验
      if (eqTab) {
        // 当前组件必须在mustIn组件内
        if (includedContainer.mustIn) {
          // 当前子项是属于特定容器的
          if (includedContainer.mustIn.c !== cItem.name && includedContainer.mustIn.template_type === template_type) {
            recoverContainerData(includedContainer.mustIn.msg)
            return
          }
        }
      } else if (includedContainer && includedContainer.container !== tab) {
        // 有额外条件，需要校验当前组件是否可以所在的组件
        if (includedContainer.orIn) {
          // 当前的组件不满足额外条件，不能放置
          if (cItem.name !== includedContainer.orIn) {
            recoverContainerData(includedContainer.msg)
            return
          }
        } else {
          // 不在当前容器且没有额外条件，也不能放置
          recoverContainerData(includedContainer.msg)
          return
        }
      }
    }
    let newState
    if (tab === '1') {
      newState = JSON.parse(JSON.stringify(containerData))
    } else {
      newState = JSON.parse(JSON.stringify(containerData2))
    }
    const target = newState.find(item => cItem.id === item.id)
    target.children = children
    // 如果存在之前有检查过children为空的错误，则把标记位删除
    if (checkComponentForm[`${target.name}_${target.id}`]) {
      delete checkComponentForm[`${target.name}_${target.id}`]
      setCheckComponentForm(checkComponentForm)
    }
    // 更新count 加
    for (let i = 0; i < businessComponents.length; i++) {
      if (businessComponents[i].name === addItemName && typeof businessComponents[i].count !== 'undefined') {
        businessComponents[i].count += 1
        break
      }
    }
    setBusinessComponents(businessComponents)
    for (let i = 0; i < basicsComponents.length; i++) {
      if (basicsComponents[i].name === addItemName && typeof basicsComponents[i].count !== 'undefined') {
        basicsComponents[i].count += 1
        break
      }
    }
    setBasicsComponents(basicsComponents)
    if (tab === '1') {
      setContainerData(newState)
    } else {
      setContainerData2(newState)
    }
    updateCurrentComponent(newState, tab)
  }

  /**
   * 主要用于窗口容器一级交互
   */
  const setList = (e, tab) => {
    for (let i = 0; i < e.length; i++) {
      // 此处限制配置：一级控件不能放在指定一级tab容器中
      const includedContainer = e[i].includedContainer
      if (includedContainer && includedContainer.container !== tab) {
        recoverContainerData(includedContainer.msg)
        return
      }
      // 此处限制：控件只能放在特定容器中，不能放在一级
      if (includedContainer && includedContainer.mustIn && includedContainer.mustIn.template_type === template_type) {
        recoverContainerData(includedContainer.mustIn.msg)
        return
      }
      if (!e[i].id) {
        e[i].id = new Date().getTime()
      }
      // 特殊逻辑，新增出差明细里面包行程清单和出行方式
      if (e[i].name === 'travel_list') {
        if (e[i].children.length === 0) {
          e[i].children = [
            {
              ...componentsNameMap.trans_way,
              type: 2,
              id: new Date().getTime() + 100,
              order: -2,
              fixed: true,
              required_fixed: true,
              print_fixed: true,
            },
            {
              ...componentsNameMap.trans_list,
              id: new Date().getTime() + 300,
              order: -1,
              type: 2,
              fixed: true,
              required_fixed: true,
              print_fixed: true
            },
          ]
        }
      }
    }


    if (tab === '1') {
      setContainerData(e)
    } else {
      setContainerData2(e)
    }
    updateCurrentComponent(e, tab)
    checkNotCoexist(e, tab)
  }

  /**
   * 设置选中
   * @param tab
   * @param componentData_
   */
  const setCurrent = (tab, componentData_) => {
    if (currentComponent) {
      if (componentData_.id === currentComponent.id) {
        return
      }
      formRef.current.submit()
    }
    const componentData = JSON.parse(JSON.stringify(componentData_))
    setTimeout(() => {
      setCurrentContainer(tab)
      setCurrentComponent(componentData)
      formRef.current.setFieldsValue(componentData.form)
      formRef.current.validateFields()
    })
  }
  /**
   * 隐藏form
   */
  const onHiddenForm = () => {
    if (currentComponent) {
      formRef.current.submit()
      setTimeout(() => {
        setCurrentComponent(null)
      })
    }
  }
  /**
   * 通过表单提交、获取校验失败的表单
   * @param type
   */
  const onFormFinish = type => {
    if (type === 'success') {
      if (checkComponentForm[`${currentComponent.name}_${currentComponent.id}`]) {
        delete checkComponentForm[`${currentComponent.name}_${currentComponent.id}`]
      }
    } else {
      checkComponentForm[`${currentComponent.name}_${currentComponent.id}`] = true
    }
    getError()
    setCheckComponentForm(checkComponentForm)
    console.log(checkComponentForm)
  }

  /**
   * 删除
   */
  const deleteComponent = (tab, id) => {
    const cIndex = findComponentIndex(tab, id)
    let dItem = []
    function filterData(data) {
      if (cIndex.length === 1) {
        dItem = data.splice(cIndex[0], 1)
      } else if (cIndex.length === 2) {
        dItem = data[cIndex[0]].children.splice(cIndex[1], 1)
      }
      return JSON.parse(JSON.stringify(data))
    }
    if (cIndex.length !== 0) {
      if (tab === '1') {
        setContainerData(filterData(containerData))
      } else {
        setContainerData2(filterData(containerData2))
      }
    }
    // 如果删除的是当前选中的
    if (id === (currentComponent && currentComponent.id)) {
      setCurrentComponent(null)
    }
    if (dItem.length > 0) {
      console.log(dItem)
      // 扁平化删除的控件
      const delCMap = {}
      const flat = c => {
        for (let i = 0; i < c.length; i++) {
          const field = `${c[i].name}_${c[i].id}`
          delCMap[field] = true
          delCMap[c[i].name] = true
          // 更新错误信息
          checkComponentForm[field] && (delete checkComponentForm[field])
          if (c[i].children && c[i].children.length > 0) {
            flat(c[i].children)
          }
        }
      }
      flat(dItem)
      setCheckComponentForm(checkComponentForm)
      // 更新count 减
      const updateCount = components => {
        for (let i = 0; i < components.length; i++) {
          if (delCMap[components[i].name] && typeof components[i].count !== 'undefined') {
            if (components[i].count > 0) {
              components[i].count -= 1
              // eslint-disable-next-line no-continue
              continue
            }
          }
        }
        return components
      }
      setBusinessComponents(updateCount(businessComponents))
      setBasicsComponents(updateCount(basicsComponents))
    }
  }

  /**
   * 更新表单
   */
  const updateComponentForm = newForm => {
    const cIndex = findComponentIndex(currentContainer, currentComponent.id)
    function updateData(data_) {
      const data = JSON.parse(JSON.stringify(data_))
      if (cIndex.length === 1) {
        data[cIndex[0]].form = Object.assign(data[cIndex[0]].form, newForm)
      } else if (cIndex.length === 2) {
        data[cIndex[0]].children[cIndex[1]].form = Object.assign(data[cIndex[0]].children[cIndex[1]].form, newForm)
      }
      return data
    }

    formRef.current && formRef.current.validateFields()

    if (cIndex.length !== 0) {
      if (currentContainer === '1') {
        setContainerData(updateData(containerData))
      } else {
        setContainerData2(updateData(containerData2))
      }
    }
  }

  /* 切换到PC端 */
  const changePC = () => {

    // 切换tab
    let analogData_main = {} // 主单数据
    const analogData_child = {} // 子单数据
    const { model } = saveTemplate(true)
    const modelIdMap = arrToMap(model)
    const modelFieldMap = arrToMap(model, 'field')

    // 组装数据
    function assembleData(belong, path, data, componentType) {
      if (componentType === 2) { // 如果是业务组件，生成数据则组装在对象外层
        belong === 'child'
          ? !lodash.get(analogData_child, path) && lodash.update(analogData_child, path, () => data) :
          !lodash.get(analogData_main, path) && lodash.update(analogData_main, path, () => data)
      } else { // 如果是基础组件，数据放在对象下的extra下面
        belong === 'child'
          ? !lodash.get(analogData_child, `extra.${path}`) && lodash.update(analogData_child, `extra.${path}`, () => data) :
          !lodash.get(analogData_main, `extra.${path}`) && lodash.update(analogData_main, `extra.${path}`, () => data)
      }
    }

    model.forEach(i => {
      // 父级字段
      if (i.pid === 0 && !analogData_main[i.field] && !analogData_child[i.field]) {
        assembleData(i.belong, i.field, getDefaultValue(i.type, i.field), i.componentType)
      }

      // 子层字段
      if (i.pid !== 0) {
        // 特殊逻辑
        if (modelIdMap[i.pid].field === 'travel_list') {
          assembleData(i.belong, `travel_list[0].${i.field}`, getDefaultValue(i.type, i.field), i.componentType)
          i.componentType === 2 && assembleData(i.belong, 'travel_list[0].trans_time', { start_time: null, end_time: null, duration: null }, i.componentType)
        } else if (modelIdMap[i.pid].type === 'Array') { // 判断是对象还是数组
          assembleData(i.belong, `${modelIdMap[i.pid].field}[0].${i.field}`, getDefaultValue(i.type, i.field), i.componentType)
        } else {
          assembleData(i.belong, `${modelIdMap[i.pid].field}.${i.field}`, getDefaultValue(i.type, i.field), i.componentType)
        }
      }
    })
    analogData_main.extra = JSON.stringify(analogData_main.extra)
    analogData_child.extra = JSON.stringify(analogData_child.extra)

    // 特殊逻辑，不同单据类型添加不同预设默认数据
    analogData_main = Object.assign({}, analogData_main, VIRTUAL_DATA[template_type], { name: '111' })

    // 特殊逻辑 如果有oa_flows数据，创建虚拟数据
    analogData_main.oa_flows && (analogData_main.oa_flows = [{ flow_id: 'xxx', flow_name: 'xxx' }])
    analogData_child.oa_flows && (analogData_child.oa_flows = [{ flow_id: 'xxx', flow_name: 'xxx' }])

    setParentDetailInfo(analogData_main)
    setExpenseChildList([analogData_child])
    setPcModelMap(modelFieldMap)
    console.log('main', JSON.parse(JSON.stringify(analogData_main)))
    console.log('child', JSON.parse(JSON.stringify(analogData_child)))
    console.log('modelFieldMap', modelFieldMap)
    onHiddenForm()
    setTabsKey('pc')
  }

  return (
    <div className="custom-doc-tmpl-layout">
      <div className="custom-doc-tmpl-header">
        <div className="back">
          <LeftOutlined style={{
            fontSize: '20px',
            cursor: 'pointer'
          }} onClick={goBack} title="返回" /> <span className="title">自定义模板</span>
        </div>
        <div className="layout-tab">
          <div className={cx({ active: layoutTab === 1 })} >表单设计</div>
        </div>
        <div className="btn-bar">
          <Button type="text" className="btn" style={{ width: 'auto', padding: '4px 10px' }} onClick={goBack}>取消</Button>
          <Button type="primary" className="btn" onClick={checkedSaveTemplate} loading={submitLoading}>保存</Button>
        </div>
      </div>
      <div className="custom-doc-tmpl">
        <div className={cx({ 'components-kit-view': true, show: tabsKey === 'mobile' })} >
          <p className="list-group-title">基础控件</p>
          <ReactSortable group={{
            name: 'formItem',
            pull: 'clone',
            put: false
          }} list={basicsComponents} setList={setBasicsComponents} sort={false} animation={0} filter=".disabled" className="components-kit-list">
            {/* eslint-disable-next-line no-undef */}
            {basicsComponents && basicsComponents.map((item, index) => (
              <div className={cx({ 'components-kit-item': true, basics: true, disabled: item.count >= 1 })} key={index}>
                {/* eslint-disable-next-line no-undef */}
                <img className="icon-default" src={`https://apg-1258944054.cos.ap-guangzhou.myqcloud.com/apg/pc-micro-reimburse/custom-doc-tmpl/icon-default/${item.name}.svg`} alt="" />
                {/* eslint-disable-next-line no-undef */}
                <img className="icon-hover" src={`https://apg-1258944054.cos.ap-guangzhou.myqcloud.com/apg/pc-micro-reimburse/custom-doc-tmpl/icon-hover/${item.name}.svg`} alt="" />
                {/* eslint-disable-next-line no-undef */}
                {item.title}
              </div>
            ))}
          </ReactSortable>
          <p className="list-group-title">业务控件</p>
          <ReactSortable group={{
            name: 'formItem',
            pull: 'clone',
            put: false
          }} list={businessComponents} setList={setBusinessComponents} sort={false} animation={0} filter=".disabled" className="components-kit-list"
          >
            {/* eslint-disable-next-line no-undef */}
            {businessComponents && businessComponents.map((item, index) => (
              <div key={index} className={cx({ 'components-kit-item': true, business: true, disabled: item.count >= 1 })}>
                <p className="main-title">
                  {/* eslint-disable-next-line no-undef */}
                  <img className="icon-default" src={`https://apg-1258944054.cos.ap-guangzhou.myqcloud.com/apg/pc-micro-reimburse/custom-doc-tmpl/icon-default/${item.name}.svg`} alt="" />
                  {/* eslint-disable-next-line no-undef */}
                  <img className="icon-hover" src={`https://apg-1258944054.cos.ap-guangzhou.myqcloud.com/apg/pc-micro-reimburse/custom-doc-tmpl/icon-hover/${item.name}.svg`} alt="" />
                  {/* eslint-disable-next-line no-undef */}
                  {item.title}</p>
                {/* eslint-disable-next-line no-undef */}
                <p className="desc">{item.desc}</p>
                <div>
                </div>
              </div>
            ))}
          </ReactSortable>
        </div>
        <div className="container-view" onClick={onHiddenForm}>
          <div className="container-view-main">
            <div className="container-view-main">
              {/* <Container
                containerData={containerData}
                setList={setList}
                updateContainerData={updateContainerData}
                currentComponent={currentComponent}
                setCurrent={setCurrent}
                deleteComponent={deleteComponent}
                tab="1"
                title="报销单-首页"
                checkComponentForm={checkComponentForm}
                componentsNameMap={componentsNameMap}
                template_type={template_type}
              /> */}
              <Container
                containerData={containerData2}
                template_type={template_type}
                setList={setList}
                updateContainerData={updateContainerData}
                currentComponent={currentComponent}
                setCurrent={setCurrent}
                deleteComponent={deleteComponent}
                tab="2"
                title={reimburseTypeNameMap[template_type].containerTitle}
                checkComponentForm={checkComponentForm}
                componentsNameMap={componentsNameMap}
              />
            </div>
          </div>
        </div>
        {/* 表单 */}
        <div className="form-container-panel">
          <CategoryListContext.Provider value={categoryList}>
            <FormPanel currentComponent={currentComponent} open={!!currentComponent} form_type={form_type} updateComponentForm={updateComponentForm} formRef={formRef} template_type={template_type} onFormFinish={onFormFinish} />
          </CategoryListContext.Provider>
        </div>
      </div>
      {/* <div r-if={layoutTab === 2} className="pdf-view" id="pdfPrintView" /> */}
    </div>
  )
}
