import React from 'react';
import logo from './logo.svg';
import './App.less';
import { Button } from 'antd';
import Router from "./router"

function App() {
  return (
    <div className="app">
     {/* <Button type="primary" className="btn">确定</Button> */}
     <Router></Router>
    </div>
  );
}

export default App;
