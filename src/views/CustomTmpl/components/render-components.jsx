/**
 * 匹配指定组件
 */
import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classname'
// eslint-disable-next-line import/no-cycle
import options from './component-options'
import {localFixedMap, NO_SPLIT_MAP} from '../data'

function RenderComponents(props) {
  const {componentData, currentComponent, tab, checkComponentForm, componentsNameMap, template_type} = props
  const {noBorder, ...reset} = props
  const RenderC = options[componentData.name]

  /**
   * 设置选中
   * @param e
   */
  function setCurrent(e) {
    if (props.disabled) {
      return
    }
    props.setCurrent(tab, componentData)
    e.stopPropagation()
  }

  /**
   * 删除
   * @param e
   */
  function deleteComponent(e) {
    props.deleteComponent(tab, componentData.id)
    e.stopPropagation()
  }

  return (
    <div className={
      cx({
        'layer-item': true,
        'layer-select': currentComponent && currentComponent.id === componentData.id,
        fixed: currentComponent && ((componentsNameMap[currentComponent.name] && componentsNameMap[currentComponent.name].fixed) || localFixedMap[`${currentComponent.name}_${template_type}`]),
        error: checkComponentForm && checkComponentForm[`${componentData.name}_${componentData.id}`],
        split: !NO_SPLIT_MAP[componentData.name],
        [props.idx]: true,
        [componentData.name]: true
      })} onClick={setCurrent}
    >
      <img className="layer-close-btn" onClick={deleteComponent} src="https://apg-1258944054.cos.ap-guangzhou.myqcloud.com/apg/pc-micro-reimburse/custom-doc-tmpl/close.svg" />
      <RenderC noBorder={props.idx === 0 || !NO_SPLIT_MAP[componentData.name]} {...reset}/>
    </div>
  )
}

RenderComponents.propTypes = {
  componentData: PropTypes.object,
  currentComponent: PropTypes.object,
  setCurrent: PropTypes.func,
  tab: PropTypes.string,
  deleteComponent: PropTypes.func
}
RenderComponents.defaultProps = {
  componentData: {children: []},
  currentComponent: null,
  setCurrent: () => {},
  deleteComponent: () => {},
  tab: '1'
}
export default RenderComponents
