import React, { Component } from 'react'


import ToolBar from '@/components/ToolBar'
import ComponentBar from '@/components/ComponentBar'
import Editor from '@/components/Editor'

import './index.less'

export default class Workbench extends Component {
  render() {
    return (
      <div id="workbench">
        <ToolBar />
        <main>
          <section className="left">
            <ComponentBar />
          </section>
          <section className="center">
            <Editor />
          </section>
          <section className="right"></section>
        </main>
      </div>
    )
  }
}
