import React from "react";
import ReactDOM from "react-dom";
import Login from './src/components/login';
// antd
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import "./src/common/css/common.css"
import "antd/dist/antd.css";

moment.locale('zh-cn');


class Page extends React.Component {
  render() {
    return <Login />
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<Page />, mountNode);
