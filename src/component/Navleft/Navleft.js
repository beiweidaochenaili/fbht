import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { Link } from "react-router-dom"
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { observer, inject } from "mobx-react";
const { Header, Content, Footer, Sider } = Layout;
@inject("device")
@observer
class Navleft extends Component {
    constructor(props) {
        super(props)
        
    }
    componentWillMount() {
       
        this.props.device.searchkey()
    }
    componentDidMount() {
       
        this.props.device.getmenulist()
    }
   
    geticon = (id) => {
        switch (id) {
            case 1:
                return <DesktopOutlined />;
            case 2:
                return <PieChartOutlined />;
            case 3:
                return <FileOutlined />;
            case 4:
                return <TeamOutlined />;
            case 5:
                return <UserOutlined />;
            default:
                return;
        }
    }
    render() {
        const { list, collapsed, SelectedKeys, onCollapse, onSelect } = this.props.device
        return (
            <Layout style={{ height: "91vh" }}>
                <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                    <Menu theme="dark" selectedKeys={SelectedKeys} mode="inline" onSelect={onSelect}>
                        {
                            list.map((item, i) => {
                                return <Menu.Item key={item.pmid}>
                                    <Link to={item.path}>
                                        {this.geticon(item.pmid)}<span style={{ marginLeft: 5 }}>{item.title}</span>
                                    </Link>
                                </Menu.Item>
                            })
                        }
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>通讯录系统</Breadcrumb.Item>
                            <Breadcrumb.Item>{ SelectedKeys== "1"?" 首页": SelectedKeys=="2"?"设备管理":SelectedKeys=="3"?"通讯查看":SelectedKeys=="4"?"短信查看":SelectedKeys=="5"?"用户管理":null}</Breadcrumb.Item>
                            {/* <Breadcrumb.Item>{ SelectedKeys}</Breadcrumb.Item> */}
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            {this.props.children}
                        </div>
                    </Content>
                    {/* <Footer style={{ textAlign: 'center' }}>Copyright©2019-2020 《后台管理系统》 蜀ICP备88888888号</Footer> */}
                </Layout>
            </Layout>
        )
    }
}
export default Navleft;