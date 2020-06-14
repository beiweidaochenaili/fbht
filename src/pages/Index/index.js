import React, { Component } from 'react'
import { Row, Col, Avatar } from 'antd'
import moment from "moment"
import "./Index.less"
import indexpage from "../../store/index/index"
import { observer, inject } from "mobx-react";
@inject("device")
@observer
class Index extends Component {
    indexpage = new indexpage();
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        this.indexpage.getuser();
    }
    componentDidMount() {
        this.indexpage.gethome1()
        this.indexpage.gethome2()   
    }
    render() {
        const { user,data } = this.indexpage
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
                                    <div className="name">{user.username}</div>
                                </Row>
                                <Row>
                                    <div className="role">
                                        {user.role.rolename}
                                    </div>
                                </Row>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 25, marginBottom: 15 }}>
                            <span>上次登录地址:</span><span style={{marginLeft:30}}>{user.loginIP}</span>
                        </Row>
                        <Row>
                            <span>上次登录时间:</span><span style={{marginLeft:30}}>{moment(Number(user.logintime) * 1000).format("YYYY-MM-DD HH:mm:ss")}</span>
                        </Row>
                    </Col>
                    <Col span={4} >
                        <span className="shuju">
                            <div className="shuju_1">{data.user}</div>
                            <div>设备</div>
                        </span>
                    </Col>
                    <Col span={4}>
                        <span className="shuju">
                            <div className="shuju_2">{data.sms}</div>
                            <div>短信</div>
                        </span>
                    </Col>
                    <Col span={4}>
                        <span className="shuju">
                            <div className="shuju_3">{data.phone}</div>
                            <div>通讯录</div>
                        </span>
                    </Col>
                    <Col span={4}>
                        <span className="shuju">
                            <div className="shuju_4">{data.statistics}</div>
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
export default Index;
