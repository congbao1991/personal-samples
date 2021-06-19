import React, { Component, Fragment } from 'react'
import { Modal, Checkbox, Button } from 'antd'
import { CSSTransition } from 'react-transition-group'

class FeeTypeSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      feeTypeData: [],
      checkedList: []
    }
  }

  onCheckboxChange = (target, e) => {
    target.checked = e.target.checked;
    let checkedList = []
    this.state.feeTypeData.forEach(group => {
      const list = group.item && group.item.filter(item => item.checked) || []
      checkedList = [...checkedList, ...list]
    })
    this.setState({
      feeTypeData: this.state.feeTypeData,
      checkedList
    })
  }

  onCollapse = (group) => {
    group.collapsed = !group.collapsed;
    this.setState({
      feeTypeData: this.state.feeTypeData
    })
  }

  deleteItem = (item, index) => {
    let target = null

    for (let i = 0; i < this.state.feeTypeData.length; i++) {
      let group = this.state.feeTypeData[i];
      target = group.item && group.item.find(x => x.fee_type == item.fee_type)
      if (target) {
        break;
      }
    }
    target.checked = false;
    this.state.checkedList.splice(index, 1)
    this.setState({
      feeTypeData: this.state.feeTypeData,
      checkedList: this.state.checkedList
    })
  }

  deleteAll = () => {
    this.state.feeTypeData.forEach(group => {
      group.item && group.item.forEach(child => {
        if (this.state.checkedList.some(checked => checked.fee_type == child.fee_type)) {
          child.checked = false;
        }
      })
    })
    this.setState({
      feeTypeData: this.state.feeTypeData,
      checkedList: []
    })
  }

  handleOk = () => {
    this.props.onSelected(this.state.checkedList);
    this.props.onCancel();
  }

  setChecked = data => {
    this.state.feeTypeData.forEach(group => {
      group.item && group.item.forEach(child => {
        if (data.some(checked => checked.fee_type == child.fee_type)) {
          child.checked = true;
        } else {
          child.checked = false;
        }
      })
    })
    this.setState({
      checkedList: data,
      feeTypeData: this.state.feeTypeData
    })
  }

  componentDidMount() {
    const feeTypeData = this.props.feeTypeData
    this.setState({
      feeTypeData
    })
  }

  render() {
    const { feeTypeData, checkedList } = this.state
    return (
      <Fragment>
        <Modal
          title="选择费用类型"
          visible={this.props.visible}
          footer={null}
          onCancel={this.props.onCancel}
          className="condition-edit-modal-wrapper"
        >
          <div className='condition-edit-modal-container'>
            <div className="left-box">
              {
                feeTypeData.map((group) => {
                  return (
                    <div key={group.fee_type}>
                      <div className="condition-edit-fee-group" onClick={() => { this.onCollapse(group) }}>
                        <CSSTransition
                          in={!group.collapsed}
                          timeout={300}
                          classNames='condition-edit-deg'
                        >
                          <div className="line-end-arrow"></div>
                        </CSSTransition>
                        {group.fee_name}
                      </div>
                      <CSSTransition
                        in={!group.collapsed}
                        timeout={1000}
                        classNames='condition-edit-slide-down'
                      >
                        <div>
                          {group.item && group.item.map(item => {
                            return (
                              <div className="checkbox-wrapper" key={item.fee_type}>
                                <Checkbox onChange={(e) => { this.onCheckboxChange(item, e) }} checked={item.checked} >
                                  {item.fee_name}
                                </Checkbox>
                              </div>
                            )
                          })}
                        </div>
                      </CSSTransition>
                    </div>
                  )
                })
              }
            </div>
            <div className="right-box">
              <div className="selected-bar">
                <div className="title">
                  <span className="selected">已选 {checkedList.length} 个</span>
                  <span className="delete" onClick={this.deleteAll}>全部删除</span>
                </div>
                {checkedList.map((item, index) => {
                  return (
                    <div className="checkbox-wrapper selected-box" key={item.fee_type}>
                      <span className="selected-name">{item.fee_name}</span>
                      <span className="close-btn" onClick={() => { this.deleteItem(item, index) }}></span>
                    </div>
                  )
                })}
              </div>
              <div className="btn-bar">
                <Button type="primary" onClick={this.handleOk}>确定</Button>
                <Button type="text" onClick={this.props.onCancel}>取消</Button>
              </div>
            </div>
          </div>
        </Modal>
      </Fragment>
    )
  }
}

export default FeeTypeSelector