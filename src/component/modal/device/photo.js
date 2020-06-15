import React, { Component } from 'react'
import { Modal, Button, Table, Spin } from 'antd'
import { observer, inject } from "mobx-react";
import { DeleteOutlined } from '@ant-design/icons';
import moment from "moment"
import Zmage from 'react-zmage'  
@inject("device")
@observer
class Photo extends Component {
    componentDidMount(){
        this.props.device.getphoto()
    }
    render() {
        const { visible2, closephotomodal,photodatasource,deletemodalshow,loading } = this.props.device
        const columns = [
            {
                title: '照片名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '大小',
                dataIndex: 'size',
                key: 'size',
                render:(text)=>{
                return <>{`${(text/1024/1024).toFixed(2)}MB`}</>
                }
            },
            {
                title: '上传时间',
                dataIndex: 'time',
                key: 'time',
                render: (text) => (
                    <div>{moment(text * 1000).format("YYYY-MM-DD HH:mm:ss")}</div>
                )
            },
            {
                title: '查看照片',
                dataIndex: 'picpath',
                key: 'picpath',
                width:100,
                render:(text)=>{
                    return <Zmage src={`${React.$url}${text}`} style={{width:100,height:50}}></Zmage>
                }
            },
            {
                title: '操作',
                dataIndex: 'deal',
                key: 'deal',
                render:(text,record)=>{
                    return  <a className="deleteduanxin" style={{padding:"5px 10px"}} onClick={()=>{deletemodalshow({type:"deletepic",id:record.sid})}}> <DeleteOutlined />删除</a>
                }
            },
        ]
        return (
            <div>
                <Modal
                    title="相册列表"
                    okText="确认"
                    cancelText="取消"
                    visible={visible2}
                    onCancel={closephotomodal}
                    width={1000}
                >
                    <Button type="primary" onClick={()=>{deletemodalshow({type:"deleteallphoto"})}}>清空相册</Button>
                    <Spin spinning={loading}>
                    <Table
                    columns={columns}
                    dataSource={ photodatasource }
                    pagination={false}
                    >
                    </Table>
                    </Spin>
                </Modal>
            </div>
        )
    }
}
export default Photo 