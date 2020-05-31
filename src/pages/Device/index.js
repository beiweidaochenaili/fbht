import React, { Component } from 'react'
import { Input, Button, Table, notification, Popover } from "antd"
import "./index.less"
import { getdevice } from "../../api/login"
import moment from "moment"
import { EditOutlined,CodepenOutlined,DeleteOutlined }  from '@ant-design/icons';
const { Search } = Input
class Device extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: []
        }
    }
    componentDidMount() {
        getdevice({ curPage: 1, pageSize: 10 }).then(res => {
            console.log(res)
            if (res.code == 200) {
                res.data.forEach(element => {
                    element.key = element.pid
                });
                this.setState({
                    dataSource: res.data
                })
            }
        }).catch(err => {
            console.log(err)
        })
     }
    // openNotification = (text) => {
    //     notification.open({
    //         message: '地图位置',
    //         placement: "bottom",
    //         top: 100,
    //         duration: null,
    //         description: (
    //             <div id="allmap" style={{ width: 350, height: 300 }}></div>
    //         )
    //     });
    //     const { BMap, BMAP_STATUS_SUCCESS } = window
    //     // debugger;
    //     var map = new BMap.Map("allmap"); // 创建Map实例
    //     let attr = new BMap.Point(120.997492,14.521225)
    //     map.centerAndZoom(attr, 11); // 初始化地图,设置中心点坐标和地图级别
    //     // var marker= new BMap.Marker(120.997492,14.521225)
    //     // map.addOverlay(marker)
    //     // var circle = new BMap.Circle(120.997492,14.521225,6,{
    //     //     strokeColor:"Red",
    //     //     strokeWeight:6,
    //     //     strokeOpacity:1,
    //     //     Color:"Red",
    //     //     fillColor:"#f03"
    //     // })
    //     // map.addOverlay(circle)
    //     // var p1 = new BMap.Point(text);
    //     map.addControl(new BMap.MapTypeControl());
    //     map.enableScrollWheelZoom(true);
    // }
openmap=(text)=>{
    const { BMap, BMAP_STATUS_SUCCESS } = window
        var map = new BMap.Map("allmap"); // 创建Map实例
        let attr = new BMap.Point(120.997492,14.521225)
        map.centerAndZoom(attr, 11); // 初始化地图,设置中心点坐标和地图级别
        // var marker= new BMap.Marker(120.997492,14.521225)
        // map.addOverlay(marker)
        // var circle = new BMap.Circle(120.997492,14.521225,6,{
        //     strokeColor:"Red",
        //     strokeWeight:6,
        //     strokeOpacity:1,
        //     Color:"Red",
        //     fillColor:"#f03"
        // })
        // map.addOverlay(circle)
        // var p1 = new BMap.Point(text);
        map.addControl(new BMap.MapTypeControl());
        map.enableScrollWheelZoom(true); 
}

    render() {

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
                    console.log(text)
                    return <a onClick={() => { this.openmap(text) }}>显示位置</a>
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
                render:()=>{
                    return (
                        <div className="deal">
                            <a href=""> <EditOutlined />查看短信</a>
                            <a href=""> <EditOutlined />查看通讯录</a>
                            <a href=""> <CodepenOutlined />导出通讯录</a>
                            <a href=""> <CodepenOutlined />导出短信</a>
                            <a href=""> <DeleteOutlined />删除</a>
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
                    placeholder="请输入手机号或者邀请码"
                ></Search>
                <Button type="primary">清空所有设备</Button>
                <Button type="primary">导出excel表</Button>
                <Table
                    columns={columns}
                    dataSource={this.state.dataSource}
                    pagination={false}
                >

                </Table>
                <div className="map">
                     <div id="allmap" ></div>
                </div>
               
            </div>
        )
    }
}
export default Device