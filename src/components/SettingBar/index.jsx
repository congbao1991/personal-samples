import React from 'react'
import { Tabs } from 'antd';

import './index.less'
import AttrList from './AttrList'

const { TabPane } = Tabs;

function SettingBar(props) {

  return (
    <div className="setting-bar">
      <Tabs defaultActiveKey="1">
        <TabPane tab="属性" key="1">
          <AttrList />
        </TabPane>
        <TabPane tab="动画" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="事件" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  )
}

export default SettingBar