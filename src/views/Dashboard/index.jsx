import React from 'react'
import { Layout, Divider, Tag } from 'antd'
import Avatar from '@/assets/images/avatar.jpg'
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
          </div>
        </div>
      </Sider>
      <Layout className="site-layout-background right-content-wrapper">
        <Header className="site-layout-header" />
        <Content className="site-layout-content">
          <div>
            123
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default Dashboard
