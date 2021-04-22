import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd'

import { updatePreviewStatus } from '@/store/actions'
import './index.less'

function ToolBar() {

  const previewStatus = useSelector(state => state.crud.previewStatus)
  const dispatch = useDispatch()

  const onUpdatePreviewStatus = () => {
    dispatch(updatePreviewStatus({ status: !previewStatus }))
  }

  return (
    <div className="tool-bar">
      <Button onClick={onUpdatePreviewStatus}>{previewStatus ? '撤销预览' : '预览'}</Button>
    </div>
  )
}

export default ToolBar
