import React from "react";
import ReactDOM from "react-dom";
import Login from "./src/components/login";
import Register from './src/components/register'
import Header from "./src/components/header";
import Main from "./src/components/main";
import api from './src/common/js/api';
import { getLoginStatus } from "./src/common/js/utils";
import { Modal, Button, message } from 'antd';
import zhCN from "antd/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import "antd/dist/antd.css";
import "./src/common/css/common.css"
moment.locale("zh-cn");

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: getLoginStatus(),
      visible: false
    }
  }
  getStatus() {
    if(this.state.status.route === '/main') return;
    switch (location.pathname) {
      case '/':
      case '/login':
        history.pushState({ register: 'register' }, "", "register");
        this.setState({
          status: {
            route: '/register',
            text: '去登录'
          }
        });
        break;
      case '/register':
        history.pushState({ login: 'login' }, "", "login")
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
            text: '用户名'
          }
        })
        break;
    }
  }
  onSubmit(params) {
    api.post('login', params, data => {
      if (data.code === '01') {
        message.success('登录成功，正前往主页');
        history.pushState({ main: 'main' }, "", "main");
        this.setState({
          status: {
            route: '/main',
            text: data.user.userName
          }
        });
        localStorage.setItem('user', JSON.stringify(data.user)); 
      } else {
        message.error('用户名或密码错误');
      }
    }, err => console.log(err));
  }
  handleOk() {
    this.setState({
      visible: false,
      status: {
        route: '/login',
        text: '去注册'
      }
    })
    message.info('正在前往登录...');
  }

  handleCancel() {
    message.info('取消前往登录')
  }

  doRegister(params) {
    api.post('register', params, data => {
      if (data.code === '01') {
        this.setState({
          visible: true
        })
      }
    }, error => console.log(error))
  }
  getComponentByRoute() {
    let Component;
    switch (this.state.status.route) {
      case '/':
      case '/login':
        Component = <Login onSubmit={this.onSubmit.bind(this)} />
        break;
      case '/register':
        Component = <Register register={this.doRegister.bind(this)} />
        break;
      case '/main':
        Component = <Main />
    }
    return Component;
  }
  render() {
    return (
      <div>
        <Modal
          title="注册成功"
          visible={this.state.visible}
          onOk={() => this.handleOk()}
          onCancel={() => this.handleCancel()}
        >
          <p>去登录？</p>
        </Modal>
        <Header getStatus={this.getStatus.bind(this)} status={this.state.status} />
        {this.getComponentByRoute()}
        <span id="pop"></span>
      </div>
    );
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<Page />, mountNode);
