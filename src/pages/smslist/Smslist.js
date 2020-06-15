import React, { Component } from 'react'
import { Button, Table, Popconfirm, Spin } from 'antd'
import { DeleteOutlined } from '@ant-design/icons';
import smslist from "../../store/smslist"
import { observer, inject } from "mobx-react";
import Deleteinfo from '../../component/modal/device/deleteinfo';
@inject("device")
@observer
 class Smslist extends Component {
    smslist = new smslist()
    constructor(props) {
        super(props)      
    }
    componentDidMount() { 
        this.smslist.getduanxinlist()
    }
    render() {
        const { datasource,addoutduanxin,getduanxinlist,loading } =this.smslist
        const { deletemodalshow }=this.props.device
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
                width: "30%"


            },
            {
                title: '操作',
                dataIndex: 'position',
                key: 'position',
                render: (text, record) => {
                    return (
                        <a className="deleteduanxin" style={{padding:"5px 10px"}} onClick={()=>{ deletemodalshow({type:"deleteduanxin",id:record.sid})}}>

                            <DeleteOutlined />
                           删除

                        </a >
                    )
                }

            },
        ]
        return (
            <div>
                <Button type="primary" onClick={()=>{deletemodalshow({type:"deleteallduanxin"})}}>清空所有短信</Button>
                <Button type="primary" onClick={addoutduanxin} style={{marginLeft:25}}>导出excel表</Button>
                <Spin spinning={loading}>
                <Table
                    columns={columns}
                    dataSource={ datasource }
                    pagination={false}
                ></Table>
                <Deleteinfo getcom={getduanxinlist}></Deleteinfo>
                </Spin>     
            </div>
        )
    }

}
export default Smslist
