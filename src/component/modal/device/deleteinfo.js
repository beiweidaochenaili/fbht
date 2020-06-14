import React, { Component } from 'react'
import { Modal, message, Spin } from 'antd'
import { deleteshebei } from "../../../api/login"
import { observer, inject } from "mobx-react";
@inject("device")
@observer
class Deleteinfo extends Component {
    constructor(props) {
        super(props)  
    }
    onOk = () => {
        const {deletemodalonok} = this.props.device
        const {getcom} = this.props;
        deletemodalonok(getcom)
    }
    render() {
        const { deletemodal, closedeletemodal,deletemodalonok } = this.props.device
        return (
            <div>
                <Modal
                    title="提示"
                    okText="确定"
                    cancelText="取消"
                    onOk={this.onOk}
                    // confirmLoading={this.state.loading}
                    visible={deletemodal}
                    onCancel={closedeletemodal}
                >
                    确定要删除这条数据吗?
                    </Modal>
            </div>
        )
    }
}
export default Deleteinfo