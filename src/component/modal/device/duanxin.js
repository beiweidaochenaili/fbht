import React, { Component } from 'react'
import { Modal, Table, Button, Popconfirm, message, Spin } from 'antd'
import "./duanxin.less"
import { DeleteOutlined } from '@ant-design/icons';
import { inject, observer } from "mobx-react"
import Deleteinfo from './deleteinfo';
@inject("device")
@observer
class Duanxin extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.device.getshebeiduanxinlist()
    }
    render() {
        const { visible, dataSource_duanxinmodal, loading } = this.props.device
        const columns = [
            {
                title: '短信号码',
                dataIndex: 'PhoneNumber',
                key: 'PhoneNumber',
            },
            {
                title: '短信发送时间',
                dataIndex: 'Dates',
                key: 'Dates',
            },
            {
                title: '短信内容',
                dataIndex: 'Smsbody',
                key: 'Smsbody',
                width: 200,
                render: (text) => {
                    return <div >{text}</div>
                }

            },
            {
                title: '操作',
                dataIndex: 'position',
                key: 'position',
                render: (text, record) => {
                    return (
                        <a className="deleteduanxin" style={{padding:"5px 10px"}} onClick={() => { this.props.device.deletemodalshow({ type: "deleteduanxin", id: record.sid }) }}>
                            <DeleteOutlined />
                           删除
                        </a >
                    )
                }

            },
        ]
        return (
            <div className="duanxin">
                <Modal
                    title="短信列表"
                    visible={visible}
                    onCancel={this.props.device.closemodal}
                    okText="确定"
                    cancelText="取消"
                    width={800}
                >
                    <Button type="primary" onClick={() => { this.props.device.deletemodalshow({ type: "deleteshebeiduanxin" }) }}>
                        清空全部短信
                    </Button>
                    <Spin spinning={loading}>
                        <Table
                            columns={columns}
                            dataSource={dataSource_duanxinmodal}
                            pagination={false}
                        >
                        </Table>
                    </Spin>
                </Modal>
                <Deleteinfo></Deleteinfo>
            </div>
        )
    }
}
export default Duanxin;
