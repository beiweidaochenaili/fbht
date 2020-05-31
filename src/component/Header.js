import React, { Component } from 'react'
import { Dropdown, Menu, Row, Col, Avatar } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import "./Header.less"
import Updatepass from './modal/index/updatepass';
import {createHashHistory} from 'history';
const history = createHashHistory();
export default class Header extends Component {
    constructor(props){
        super(props)
        this.state={
            visible:false
        }
    }
    render() {
        const menu = (
            <Menu>
                <Menu.Item key="0">
                    <a onClick={()=>{this.setState({visible:true})}}>修改密码</a>
                </Menu.Item>
                <Menu.Item key="1">
                    <a onClick={()=>{history.push("/login")}}>退出登录</a>
                </Menu.Item>

            </Menu>
        );
        return (
            <div className="header">
                <Row>
                    <Col span={21}>
                        <img className="img" src="./logo192.png" alt="" />
                        <span className="title">通讯录管理系统</span>
                    </Col>
                    <Col span={3} className="dropdown">
                        <Avatar size="large" src={require("./img.2814a590.jpg")}  />
                        <Dropdown overlay={menu} trigger={['click']}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                admin<DownOutlined />
                            </a>
                        </Dropdown>
                    </Col>

                </Row>
                <Updatepass 
                isShow={this.state.visible} 
                closemodal={()=>{this.setState({visible:false})}}
                ></Updatepass>
            </div>
        )
    }
}
