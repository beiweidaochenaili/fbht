import React, { Component } from 'react'
import { Button, Table, Spin } from 'antd'
import momnet from "moment"
import Adduser from '../../component/modal/admim/adduser'
import Admins from "../../store/admin"
import { observer, inject } from "mobx-react";
import Deleteinfo from '../../component/modal/device/deleteinfo';
@inject("device")
@observer
class Admin extends Component {
    Admins = new Admins();
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.Admins.getuserlist()
    }
    render() {
        const { dataSource, getuserlist, addusermodalshow,loading } = this.Admins
        const { deletemodalshow } = this.props.device
        const columns = [
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: '创建时间',
                dataIndex: 'time',
                key: 'time',
                render: (text, record) => {
                    return <div>{momnet(Number(text) * 1000).format("YYYY-MM-DD HH:mm:ss")}</div>
                }
            },
            {
                title: '上次登录时间',
                dataIndex: 'logintime',
                key: 'logintime',
                // width: "30%"
                render: (text, record) => {
                    return <div>{momnet(Number(text) * 1000).format("YYYY-MM-DD HH:mm:ss")}</div>
                }
            },
            {
                title: '上次登录ip',
                dataIndex: 'loginIP',
                key: 'loginIP',
            },
            {
                title: '权限',
                dataIndex: 'rolename',
                key: 'rolename',
            },
            {
                title: '操作',
                dataIndex: 'position',
                key: 'position',
                render: (text, record) => {
                    if (record.username == "admin") {
                        return <Button disabled >删除</Button>
                    } else {
                        return (
                            <a className="deleteduanxin" style={{padding:"8px 20px"}} onClick={() => { deletemodalshow({ type: "deleteuser", id: record.uid }) }}>
                                删除
                            </a >
                        )
                    }
                }
            },
        ]
        return (
            <div>
                <Button type="primary" onClick={addusermodalshow}>添加用户</Button>
                <Spin spinning={loading}>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                ></Table>
                </Spin>
                <Deleteinfo getcom={getuserlist}></Deleteinfo>
                <Adduser admin={this.Admins}></Adduser>
            </div>
        )
    }
}
export default Admin
