import React, { PureComponent } from 'react'
import zhCN from 'antd/lib/locale/zh_CN'
import { ConfigProvider } from 'antd'

import Workbench from '@/views/Workbench'

export default class App extends PureComponent {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Workbench />
      </ConfigProvider>
    )
  }
}
