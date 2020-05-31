import React, { Component } from 'react'
import { Modal, Form, Input, message } from 'antd'
import { updatepass } from "../../../api/login"
import {createHashHistory} from 'history';
const history = createHashHistory();
const { Item } = Form
export default class Updatepass extends Component {
    formRef = React.createRef();
    constructor(props) {
        super(props)
        this.state={
            initval:""
        }
    }
    onFinish=(val)=>{
        console.log(val)
        if(val.setpwd==val.setpwd2){
            updatepass(val).then(res=>{
                // console.log(res)
                if(res.code==200){
                    message.success("修改成功")
                    this.props.closemodal()
                    history.push("/login")
                }
            }).catch(err=>{
                console.log(err)
            })
        }else{
            message.error("两次输入的密码不一致,请重新输入")
            this.formRef.current.setFieldsValue({
                pwd:"",
                setpwd:"",
                setpwd2:""
            })
        }
    }
    onOk=()=>{
       this.formRef.current.submit()
    }
    
    render() {
        return (
            <div>
                <Modal
                    title="修改密码"
                    visible={this.props.isShow}
                    onCancel={this.props.closemodal}
                    okText="确认"
                    cancelText="取消"
                    onOk={this.onOk}
                >
                    <Form ref={this.formRef} onFinish={this.onFinish} layout="vertical" >
                        <Item
                            label="原登录密码"
                            name="pwd"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入你的原登录密码',
                                },
                            ]}
                        >
                            <Input placeholder='请输入原登录密码' />
                        </Item>
                        <Item
                            label="新登录密码"
                            name="setpwd"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入你的新登录密码',
                                },
                            ]}
                        >
                            <Input  placeholder="请输入新登录密码"/>
                        </Item>
                        <Item
                            label="确认密码"
                            name="setpwd2"
                            rules={[
                                {
                                    required: true,
                                    message: '请确认你的新登录密码',
                                },
                            ]}
                        >
                            <Input placeholder="请确认新登录密码"/>
                        </Item>
                    </Form>
                    
                </Modal>
            </div>
        )
    }
}
