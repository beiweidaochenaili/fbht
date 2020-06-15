import React, { Component } from 'react'
import { Modal, Button, Table, Popconfirm, message, Spin } from "antd"
import { getcoms, deletealltongxunlu, deletetongxunlu } from "../../../api/login"
import { DeleteOutlined } from '@ant-design/icons';
import "./tongxunlu.less"
import { observer, inject } from "mobx-react";
import Deleteinfo from './deleteinfo';
@inject("device")
@observer
class Tongxunlu extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
       
        this.props.device.getshebeitongxunlulist()
    }
    
    render() {
        const { visible1, closetongxunlumodal, dataSource_tongxunlumodal,deletemodalshow,loading } = this.props.device
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


            },
            {
                title: '操作',
                dataIndex: 'deal',
                key: 'deal',
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
                <Modal
                    title="通讯录列表"
                    visible={visible1}
                    onCancel={closetongxunlumodal}
                    okText="确认"
                    cancelText="取消"
                    width={800}
                >
                    <Button type="primary" onClick={() => { deletemodalshow({type:"deleteshebeitongxunlu"}) }}>清空通讯录</Button>
                    <Spin spinning={loading}>
                        <Table
                            columns={columns}
                            dataSource={dataSource_tongxunlumodal}
                            pagination={false}
                        ></Table>
                    </Spin>
                </Modal>
               
                <Deleteinfo></Deleteinfo>
            </div>
        )
    }
}
export default Tongxunlu