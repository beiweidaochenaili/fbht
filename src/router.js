import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect } from "react-router-dom"
import Login from "./pages/Login/login"
import Home from "./component/Home/Home"
import Index from "./pages/Index"
import Device from "./pages/Device"
import Addressbook from './pages/Addressbook/Addressbook'
import Smslist from './pages/smslist/Smslist'
import Admin from './pages/Admin/Admin'
export default class Irouter extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/" render={()=>(
                        <Redirect to="/login" ></Redirect>
                    )}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/" render={() => (
                        <Home>
                            <Switch>
                                <Route path="/index" component={Index}></Route>
                                <Route path="/device" component={Device}></Route>
                                <Route path="/addressbook" component={Addressbook}></Route>
                                <Route path="/smslist" component={Smslist}></Route>
                                <Route path="/admin" component={Admin}></Route>
                            </Switch>
                        </Home>
                     )}></Route>
                </Switch>
            </HashRouter>
        )
    }
}
