/**
 * 容器套件
 */
import React from 'react'
import PropTypes from 'prop-types'
import { ReactSortable } from 'react-sortablejs'
// eslint-disable-next-line import/no-cycle
import RenderComponents from '../render-components'

function CombinationSortableKit(props) {
  const { componentData, updateContainerData, tab, styles } = props
  const { idx, ...rest } = props
  return (
    <ReactSortable group="formItem"
      style={{
        position: 'relative',
        zIndex: 2,
        ...styles
      }}
      list={componentData.children}
      setList={children => updateContainerData(children, componentData, tab)}
      ghostClass="ghost-class" animation={150} filter=".placeholder-view" disabled={props.disabled} className="sortable-kit">
      {componentData.children.map((componentData_, index) => <RenderComponents key={componentData_.id} {...rest} idx={index} componentData={componentData_} />)}
    </ReactSortable>
  )
}

CombinationSortableKit.propTypes = {
  componentData: PropTypes.object,
  tab: PropTypes.string,
  updateContainerData: PropTypes.func,
  styles: PropTypes.object
}
CombinationSortableKit.defaultProps = {
  componentData: { children: [] },
  tab: '1',
  updateContainerData: () => { },
  styles: {
    minHeight: 100,
  }
}

export default CombinationSortableKit
