import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Layout, Divider, Tag } from 'antd'
import loadableComponent from '@/utils/loadable'
import Avatar from '@/assets/images/avatar.jpg'
import NavMenu from './nav'
import './index.less'

const { Header, Content, Sider } = Layout

function Dashboard(props) {

  return (
    <Layout id="Dashboard">
      <Sider
        className="site-layout-background left-content-wrapper"
      >
        <div className="logo">小葱Blog</div>
        <div className="card">
          <img className="avatar" src={Avatar} alt="" />
          <div className="name">O L</div>
          <Divider orientation="left">文章标签</Divider>
          <div className="tags-wrapper">
            <Tag color="geekblue">React</Tag>
            <Tag color="green">Vue</Tag>
          </div>
        </div>
      </Sider>
      <Layout className="site-layout-background right-content-wrapper">
        <Header className="site-layout-header">
          <NavMenu />
        </Header>
        <Content className="site-layout-content">
          <Switch>
            <Route path="/" exact component={loadableComponent('/Dashboard/Timeline/index')}></Route>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  )
}

export default Dashboard
