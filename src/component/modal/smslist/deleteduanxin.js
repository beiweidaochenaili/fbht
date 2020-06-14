import React, { Component } from 'react'
import { Modal, message } from "antd"
import "./index.less"
import { deleteduanxin } from "../../../api/login"
export default class Deleteduanxin extends Component {
    constructor(props){
        super(props)
    }
    onOk=()=>{
        deleteduanxin({sid:this.props.sid}).then(res=>{
            console.log(res)
            if(res.code==200){
                message.success("删除成功")
                this.props.closemodal()
                this.props.getduanxinlist()
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    render() {
        return (
            <div className="tan">
                <Modal
                title="提示"
                okText="确定"
                cancelText="取消"
                visible={this.props.isShow}
                onCancel={this.props.closemodal}
                bodyStyle={{width:400}}
                onOk={this.onOk}
                >
                    确定删除这条数据?
                </Modal>
            </div>
        )
    }
}
