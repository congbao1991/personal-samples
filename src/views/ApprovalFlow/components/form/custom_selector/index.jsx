import React, {Component, Fragment} from 'react'
import {Modal, Checkbox, Button} from 'antd'

class InvoiceTitleSelector extends Component {
    constructor(props) {
        super(props)
        this.state = {
            plainOptions: [],
            checkedList: []
        }
    }
    
    setChecked = (data) => {
        console.log('默认选中', data)
        this.state.plainOptions.forEach(item => {
            if (data.some(checked => checked.value == item.value)) {
                item.checked = true;
            } else {
                item.checked = false;
            }
            this.setState({
                plainOptions: this.state.plainOptions,
                checkedList: data
            })
        })
    }
    
    componentDidMount() {
        const plainOptions = this.props.data.map(item => {
            return {
                label: item.label,
                value: item.value,
                checked: false
            }
        })
        const checkedList = plainOptions.filter(item => {
            return item.checked
        })
        this.setState({
            plainOptions,
            checkedList
        })
    }
    
    onCheckboxChange = (target, e) => {
        target.checked = e.target.checked;
        const checkedList = this.state.plainOptions.filter(item => {
            return item.checked
        })
        this.setState({
            plainOptions: this.state.plainOptions,
            checkedList
        })
    }
    
    deleteItem = (item, index) => {
        const target = this.state.plainOptions.find(option => option.value == item.value)
        target.checked = false;
        this.state.checkedList.splice(index, 1)
        this.setState({
            plainOptions: this.state.plainOptions,
            checkedList: this.state.checkedList
        })
    }
    
    deleteAll = () => {
        this.state.plainOptions.forEach(item => {
            if (this.state.checkedList.some(checked => checked.value == item.value)) {
                item.checked = false;
            }
        })
        this.setState({
            plainOptions: this.state.plainOptions,
            checkedList: []
        })
    }
    
    handleOk = () => {
        this.props.onSelected(this.state.checkedList);
        this.props.onCancel();
    }
    
    render() {
        const {plainOptions, checkedList} = this.state;
        return (
            <Fragment>
                <Modal
                    title={this.props.title || '选择公司抬头'}
                    visible={this.props.visible}
                    footer={null}
                    onCancel={this.props.onCancel}
                    className="condition-edit-modal-wrapper"
                >
                    <div className='condition-edit-modal-container'>
                        <div className="left-box">
                            {plainOptions.map(item => {
                                return (
                                    <div className="checkbox-wrapper" key={item.value}>
                                        <Checkbox onChange={(e) => {
                                            this.onCheckboxChange(item, e)
                                        }} checked={item.checked}>
                                            {item.label}
                                        </Checkbox>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="right-box">
                            <div className="selected-bar">
                                <div className="title">
                                    <span className="selected">已选 {checkedList.length} 个</span>
                                    <span className="delete" onClick={this.deleteAll}>全部删除</span>
                                </div>
                                {checkedList.map((item, index) => {
                                    return (
                                        <div className="checkbox-wrapper selected-box" key={item.value}>
                                            <span className="selected-name">{item.label}</span>
                                            <span className="close-btn" onClick={() => {
                                                this.deleteItem(item, index)
                                            }}></span>
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

export default InvoiceTitleSelector
