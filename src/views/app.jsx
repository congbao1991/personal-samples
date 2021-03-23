import React, { Component } from 'react'
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';

import Workbench from '@/views/Workbench'

export default class App extends Component {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Workbench />
      </ConfigProvider>
    )
  }
}
