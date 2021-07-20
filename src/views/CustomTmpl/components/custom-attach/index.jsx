import React from 'react'
import PropTypes from 'prop-types'
import './index.less'

function CustomAttach(props) {
  return (
    <div className="custom-attach">
      <div className="custom-attach-container">
        <div className="custom-attach-title">
          <span>{props.componentData.form.label}</span>
        </div>
        <div className="attach-wrapper">
          <img className="ico"
            src="https://apg-1258944054.cos.ap-guangzhou.myqcloud.com/apg/wxapp-micro-reimburse/apply/common/upload.svg" />
          <div className="text">上传附件</div>
        </div>
      </div>
    </div>
  )
}

CustomAttach.propTypes = {
  componentData: PropTypes.object
}

CustomAttach.defaultProps = {
  componentData: {}
}
export default CustomAttach
