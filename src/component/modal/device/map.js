import React, { Component } from 'react'
import "./map.less"
export default class Map extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){
        const { BMap, BMAP_STATUS_SUCCESS } = window
        var map = new BMap.Map("allmap"); // 创建Map实例
        let attrs=this.props.text.split(",")
        let attr = new BMap.Point(Number(attrs[0]),Number(attrs[1]))
        map.centerAndZoom(attr, 11); // 初始化地图,设置中心点坐标和地图级别
        var marker= new BMap.Marker(attr)
        map.addOverlay(marker)
        var circle = new BMap.Circle(attr,{
            strokeColor:"Red",
            strokeWeight:6,
            strokeOpacity:1,
            Color:"Red",
            fillColor:"#f03"
        })
        map.addOverlay(circle)
        // var p1 = new BMap.Point(text);
        map.addControl(new BMap.MapTypeControl());
        map.enableScrollWheelZoom(true); 
    }
    render() {
        return (
            <div>           
                    <div id="allmap" style={{width:655,height:500}}></div>
            </div>
        )
    }
}
