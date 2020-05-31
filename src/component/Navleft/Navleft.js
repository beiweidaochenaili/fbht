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
const { Header, Content, Footer, Sider } = Layout;
// const { Item } = Menu;
export default class Navleft extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            collapsed: false,
            SelectedKeys:["1"]
        }
    }
    componentWillMount(){
        if(sessionStorage.getItem("SelectedKeys")&&sessionStorage.getItem("SelectedKeys").length>0){
            let SelectedKeys=JSON.parse(sessionStorage.getItem("SelectedKeys")) 
            this.setState({
                SelectedKeys
            })
        }
    }
    componentDidMount() {
        const menulist = JSON.parse(sessionStorage.getItem("menulist"))
        this.setState({
            list: menulist
        })
        
    }
    onCollapse = collapsed => {
        this.setState({ collapsed });
    };
    onSelect=(item,key)=>{
        this.setState({
            SelectedKeys:item.selectedKeys
        })
        sessionStorage.setItem("SelectedKeys",JSON.stringify(item.selectedKeys))
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
        return (
            <Layout style={{ height: "91vh" }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    {/* <div className="logo" /> */}
                    <Menu theme="dark" selectedKeys={this.state.SelectedKeys}  mode="inline"  onSelect={this.onSelect}>
                        {
                            this.state.list.map((item, i) => {
                                // console.log(item)
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
                    {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>系统</Breadcrumb.Item>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Copyright©2019-2020 《后台管理系统》 蜀ICP备88888888号</Footer>
                </Layout>
            </Layout>
        )
    }
}
