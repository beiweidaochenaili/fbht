import React, { Component } from 'react'
import Header from '../Header'
import Navleft from '../Navleft/Navleft'


export default class Home extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div>
                {/* 首页 */}
                <Header></Header>
                <Navleft children={this.props.children}></Navleft>
            </div>
        )
    }
}
