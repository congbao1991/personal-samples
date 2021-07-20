/**
 * 每一个表单容器
 */

import React from 'react'
import propTypes from 'prop-types'
import cx from 'classname'
import { ReactSortable } from 'react-sortablejs'
import RenderComponents from './render-components'
import './container.less'
import '../index.less'

function Container(props) {
  return (
    <div className="container-view-mobile" onClick={e => e.stopPropagation()}>
      <div className="wrapper-view-mobile">
        <div className="phone-title">{props.title}</div>
        <div className="tmpl-container-box">
          <ReactSortable group="formItem" invertSwap list={props.containerData} setList={e => props.setList(e, props.tab)} ghostClass="ghost-class" animation={150}
            className={cx({ 'tmpl-container': true, disabled: props.disabled })} disabled={props.disabled}>
            {props.containerData.map((componentData, index) => <RenderComponents key={componentData.id} idx={index} {...props} componentData={componentData} />)}
          </ReactSortable>
        </div>
      </div>
    </div>
  )
}

Container.propTypes = {
  containerData: propTypes.array,
  tab: propTypes.string,
  setList: propTypes.func
}
Container.defaultProps = {
  containerData: [],
  tab: '1',
  setList: () => { }
}
export default Container
