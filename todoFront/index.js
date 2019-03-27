import React from "react";
import ReactDOM from "react-dom";
import Login from "./src/components/login";
import Register from './src/components/register'
import Header from "./src/components/header";
import Main from "./src/components/main"
import zhCN from "antd/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import "antd/dist/antd.css";
import "./src/common/css/common.css"
moment.locale("zh-cn");


import { getLoginStatus } from "./src/common/js/utils";
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: getLoginStatus()
    }
  }
  getStatus() {
    switch (location.pathname) {
      case '/':
      case '/login':
        history.pushState({register: 'register'},"", "register");
        this.setState({
          status: {
            route: '/register',
            text: '去登录'
          }
        });
        break;
      case '/register':
        history.pushState({ login: 'login' },"", "login")
        this.setState({
          status: {
            route: '/login',
            text: '去注册'
          }
        })
        break;
      case '/main':
        history.pushState({ main: 'main' }, "", "main")
        this.setState({
          status: {
            route: '/main',
            text: '主页'
          }
        })
        break;
    }
  }
  onSubmit(param) {
    console.log(param)
    history.pushState({ main: 'main' }, "", "main")
    this.setState({
      status: {
        route: '/main',
        text: '欢迎' + param.userName
      }
    })
  }
  getComponentByRoute() {
    let Component;
    switch(this.state.status.route) {
      case '/':
      case '/login':
        Component = <Login onSubmit = {this.onSubmit.bind(this)}/>
        break;
      case '/register':
        Component = <Register/>
        break;
      case '/main':
        Component = <Main/>
    }
    return Component;
  }
  render() {
    return (
      <div>
        <Header getStatus={this.getStatus.bind(this)} status={this.state.status}/>
        { this.getComponentByRoute()}
       
      </div>
    );
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<Page />, mountNode);
