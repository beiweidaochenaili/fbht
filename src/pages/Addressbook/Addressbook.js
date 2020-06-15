import React, { Component } from 'react'
import { Table, Popconfirm, Button, message, Spin } from 'antd'
import { DeleteOutlined } from '@ant-design/icons';
import { getcom, deletetongxunluall,deletetongxunlu,tongxunlulist } from "../../api/login"
import moment from "moment"
import "./Addressbook.less"
import  Addressbooks  from "../../store/addressbooks"
import ExportJsonExcel from 'js-export-excel';
import { observer, inject } from "mobx-react";
import Deleteinfo from '../../component/modal/device/deleteinfo';
@inject("device")
@observer
 class Addressbook extends Component {
    Addressbook = new Addressbooks();
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.Addressbook.getcom();
    }
    render() {
        const { datasource,addouttongxunluexcel,loading } =this.Addressbook
        const { deletemodalshow } = this.props.device
        const columns = [
            {
                title: '通讯录号码',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: '联系人',
                dataIndex: 'contact',
                key: 'contact',
            },
            {
                title: '上传时间',
                dataIndex: 'time',
                key: 'time',
                render: (text) => {
                    return <div style={{ textAlign: "center" }}>{moment(Number(text)*1000).format("YYYY-MM-DD HH:mm:ss")}</div>
                }
            },
            {
                title: '操作',
                dataIndex: 'position',
                key: 'position',
                render: (text, record) => {
                    return (
                        <a className="deleteduanxin" style={{padding:"5px 10px"}} onClick={()=>{deletemodalshow({type:"deletetongxunlu",id:record.uid})}}>                           
                                <DeleteOutlined />
                           删除        
                        </a >
                    )
                }
            },
        ]
        return (
            <div>
                <Button type="primary" onClick={()=>{deletemodalshow({type:"deletealltongxunlu"})}}>   
                        清空所有通讯录       
                </Button>
                <Button type="primary" style={{ marginLeft: 15 }} onClick={addouttongxunluexcel}>导出excel表</Button>
                <Spin spinning={loading}>
                <Table
                    columns={columns}
                    dataSource={datasource}
                    pagination={false}
                >
                </Table>
                </Spin>
                <Deleteinfo getcom={this.Addressbook.getcom}></Deleteinfo>
            </div>
        )
    }
}
export default Addressbook
