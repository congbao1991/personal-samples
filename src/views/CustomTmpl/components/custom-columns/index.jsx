/**
 * 基础控件-明细
*/
import React from 'react'
import PropTypes from 'prop-types'
import { PlusOutlined } from '@ant-design/icons'
import Hidden from '@/components/Hidden'
// eslint-disable-next-line import/no-cycle
import CombinationSortableKit from '../combination-sortable-kit'
import './index.less'

function PlaceholderView() {
  return (
    <div className="placeholder-view">
      <p style={{ marginBottom: 5 }}>可拖入多个控件</p>
      <p>（不包括明细控件、业务组件、说明文字及分割条）</p>
    </div>
  )
}

const styles = {
  minHeight: 108,
  paddingBottom: 10
}

function CustomColumns(props) {
  return (
    <div className="custom-detailed">
      <div className="custom-detailed-title">
        <span>{props.componentData.form.label}
          <Hidden visible={props.componentData.form.required}>
            <span style={{ color: '#FF3B30' }}>*</span>
          </Hidden>
        </span>
      </div>
      <div className="custom-detailed-container" style={styles}>
        <Hidden visible={props.componentData.children.length === 0}>
          <PlaceholderView />
        </Hidden>
        <CombinationSortableKit {...props} />
      </div>
      <Hidden visible={typeof props.componentData.form.tip !== 'undefined'}>
        <div className="custom-detailed-footer">
          <PlusOutlined />{props.componentData.form.tip}
        </div>
      </Hidden>
    </div>
  )
}
CustomColumns.propTypes = {
  componentData: PropTypes.object
}

CustomColumns.defaultProps = {
  componentData: {}
}

export default CustomColumns
