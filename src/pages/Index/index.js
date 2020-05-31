import React, { Component } from 'react'
import { Row, Col, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import moment from "moment"
import "./Index.less"
import { gethome,getStatistics } from "../../api/login"
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';

export default class Index extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {},
            data: {}
        }
    }
    componentWillMount() {
        const user = JSON.parse(sessionStorage.getItem("user"))
        // debugger
        this.setState({
            user
        })

        // console.log(user)
        
    }
    componentDidMount() {
        
        gethome().then(res => {
            if (res.code == 200) {
                this.setState({
                    data: res.data
                })
            }
        }).catch(err => {
            console.log(err)
        })
        getStatistics().then(res=>{
            if(res.code==200){
                console.log(res)
                var myChart = echarts.init(document.getElementById('main'));
                const option={}
                option.xAxis={data:res.date,boundaryGap:false}
                 option.yAxis= {
                    type: 'value'
                } 
                // option.series=[ {
                        //     name:res.datasets[i].label,
                        //     type:"line",
                        //     data:res.datasets[i].data
                        // }]
                 var a=[]
                 var b=[]
                for (var i=0;i<res.datasets.length;i++){
                    a.push({name:res.datasets[i].label,type:'line',data:res.datasets[i].data})
                     b.push(res.datasets[i].label)  
                    } 
                    option.series=a 
                option.legend={data:b}
                myChart.setOption(option)
            }
        }).catch(err=>{
            console.log(err)
        })
    }
    render() {
        return (
            <div className='index'>
                <Row>
                    <Col span={8}>
                        <Row style={{ borderBottom: "2px solid #aaa", padding: "20px 0" }}>
                            <Col span={12}>
                                <Avatar src={require("../../component/img.2814a590.jpg")} size={105} 
                                style={{ marginLeft: 15 }} />
                            </Col>
                            <Col span={12} style={{ paddingTop: 20 }}>
                                <Row>
                                    <div className="name">{this.state.user.username}</div>
                                </Row>
                                <Row>
                                    <div className="role">
                                        {this.state.user.role.rolename}
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 25, marginBottom: 15 }}>
                            <span>上次登录地址:{this.state.user.loginIP}</span>
                        </Row>
                        <Row>
                            <span>上次登录时间:{moment(Number(this.state.user.logintime)*1000).format("YYYY-MM-DD HH:mm:ss")}</span>
                        </Row>
                    </Col>
                    <Col span={4} >
                        <span className="shuju">
                            <div className="shuju_1">{this.state.data.user}</div>
                            <div>设备</div>
                        </span>
                    </Col>
                    <Col span={4}>
                        <span className="shuju">
                            <div className="shuju_2">{this.state.data.sms}</div>
                            <div>短信</div>
                        </span>
                    </Col>
                    <Col span={4}>
                        <span className="shuju">
                            <div className="shuju_3">{this.state.data.phone}</div>
                            <div>通讯录</div>
                        </span>
                    </Col>
                    <Col span={4}>
                        <span className="shuju">
                            <div className="shuju_4">{this.state.data.statistics}</div>
                            <div>访问量</div>
                        </span>
                    </Col>
                </Row>
                <div className='linetitle'>最近一周下载趋势图</div>
                <div id="main" style={{ width: "75rem", height: 400 }}></div>
            </div>
        )
    }
}
