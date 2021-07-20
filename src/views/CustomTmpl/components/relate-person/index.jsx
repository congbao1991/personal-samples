import React from 'react'
import './index.less'
import {Avatar} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import CustomSelect from '../custom-select'

function RelatePerson(props) {
  return (
    <div className="relate-person">
      <CustomSelect {...props}/>
      <div className="person-avatar">
        <Avatar icon={<PlusOutlined />} />
      </div>
    </div>
  )
}
export default RelatePerson
