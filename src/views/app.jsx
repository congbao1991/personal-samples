import React, { PureComponent } from 'react'
import zhCN from 'antd/lib/locale/zh_CN'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import { ConfigProvider } from 'antd'
import loadableComponent from '@/utils/loadable'

export default class App extends PureComponent {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Router>
          <Switch>
            <Route path="/workbench" exact component={loadableComponent('/Workbench/index')}></Route>
            <Route path="/react-sortable" exact component={loadableComponent('/ReactSortable/index')}></Route>
            <Route path="/approval-flow" exact component={loadableComponent('/ApprovalFlow/index')}></Route>
            <Route path="/time-selector" exact component={loadableComponent('/TimeSelector/index')}></Route>
            <Route path="/custom-tmpl" exact component={loadableComponent('/CustomTmpl/index')}></Route>
            <Route path="/" exact component={loadableComponent('/Dashboard/index')}></Route>
          </Switch>
        </Router>
      </ConfigProvider>
    )
  }
}
