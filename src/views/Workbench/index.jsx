import React, { Component } from 'react'
import { connect } from 'react-redux'

import ToolBar from '@/components/ToolBar'
import ComponentBar from '@/components/ComponentBar'
import Editor from '@/components/Editor'
import { setCurComponentID } from '@/store/actions'
import SettingBar from '@/components/SettingBar'

import './index.less'

const mapStateToProps = state => {
  const { crud } = state
  return crud
}

const mapDispatchToProps = dispatch => ({
  setCurComponentID: payload => dispatch(setCurComponentID(payload))
})

@connect(mapStateToProps, mapDispatchToProps)
class Workbench extends Component {

  onEditorMouseDown = () => {
    this.props.setCurComponentID({ id: null })
  }

  render() {
    return (
      <div id="workbench">
        <ToolBar />
        <main>
          <section className="left">
            <ComponentBar />
          </section>
          <section className="center">
            <div onMouseDown={this.onEditorMouseDown}>
              <Editor />
            </div>
          </section>
          <section className="right">
            <SettingBar />
          </section>
        </main>
      </div>
    )
  }
}

export default Workbench
