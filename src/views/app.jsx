import React, { PureComponent } from 'react'
import zhCN from 'antd/lib/locale/zh_CN'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import { ConfigProvider } from 'antd'
import loadableComponent from '@/utils/loadable'

export default class App extends PureComponent {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Router>
          <Switch>
            <Route path="/workbench" component={loadableComponent('/Workbench/index')}></Route>
            <Route path="/" component={loadableComponent('/Dashboard/index')}></Route>
          </Switch>
        </Router>
      </ConfigProvider>
    )
  }
}
