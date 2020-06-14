import React, { Component } from 'react'
import ParticlesBg from 'particles-bg'
import { Form, Input, Button, message } from 'antd'
import {  UserOutlined,LockOutlined } from '@ant-design/icons';
import { login } from "../../api/login"
import "./Login.less"
const { Item } =Form
export default class Login extends Component {
    onFinish=(val)=>{
        login(val).then(res=>{
            console.log(res)
            if(res.code==200){
                message.success("登录成功")
                localStorage.setItem("token",res.user.token)
                sessionStorage.setItem("menulist",JSON.stringify(res.user.permision))
                sessionStorage.setItem("user",JSON.stringify(res.user))
                this.props.history.push("/index")
            }else{
                message.error("登录失败,账号或密码错误")
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    render() {
        return (
            <div className="login">
                <div className="login-form">
                    <div className="title">欢迎登录</div>
                    <Form
                     onFinish={this.onFinish}
                    >
                        <Item
                         label=""
                         name="user_name"
                         rules={[
                           {
                             required: true,
                             message: 'Please input your password!',
                           },
                         ]}
                        >
                            <Input className="input" prefix={<UserOutlined/>} placeholder="请输入用户名"/>
                        </Item>
                        <Item
                         label=""
                         name="pwd"
                         rules={[
                           {
                             required: true,
                             message: 'Please input your password!',
                           },
                         ]}
                        >
                            <Input type="password" className="input" prefix={<LockOutlined/>} placeholder="请输入密码"/>
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit">登录</Button>
                        </Item>
                    </Form>
                </div>
                <ParticlesBg type="circle" bg={true} />
            </div>
        )
    }
}
