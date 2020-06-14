import React, { Component } from 'react'
import { Modal, Form, Input, Switch, message } from 'antd'
import { observer, inject } from "mobx-react";
const { Item } = Form

@inject("device")
@observer
class Adduser extends Component {
    formRef = React.createRef()
    constructor(props) {
        super(props)
    }
    render() {
        const { visible, addusermodalhide, hanldeswitch, onFinish } = this.props.admin
        return (
            <div>
                <Modal
                    title="添加用户"
                    okText="确认"
                    cancelText="取消"
                    visible={visible}
                    onCancel={addusermodalhide}
                    onOk={() => { this.formRef.current.submit() }}
                >
                    <Form
                        onFinish={onFinish}
                        ref={this.formRef}
                        layout="vertical"
                    >
                        <Item
                            label="用户名"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input />
                        </Item>
                        <Item
                            label="密码"
                            name="pwd"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input />
                        </Item>
                        <Item
                            label="管理员"
                        >
                            <Switch onClick={hanldeswitch}></Switch>
                        </Item>
                    </Form>
                </Modal>
            </div>
        )
    }
}
export default Adduser