import React from "react";
import ReactDOM from "react-dom";
import { PageHeader, Tag, Tabs, Button, Statistic, Row, Col } from "antd";
import { getLoginStatus } from "../common/js/utils";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginStatus: getLoginStatus()
    };
  }
  switchToLoginOrRegister() {
    let { loginStatus } = this.state;
    if (loginStatus.route === "/" || loginStatus.route === "/login") {
      location.pathname = "/register";
      this.setState({
        loginStatus: {
          route: "/register",
          status: "注册"
        }
      });
    } else {
      location.pathname = "/login";
      this.setState({
        loginStatus: {
          route: "/login",
          status: "登录"
        }
      });
    }
  }
  render() {
    return (
      <PageHeader
        onBack={() => console.log(this)}
        title="事务管家"
        subTitle=""
        backIcon = {false}
        extra={
          <Button
            key="1"
            onClick={() => {
              this.switchToLoginOrRegister();
            }}
          >
            {this.state.loginStatus.status}
          </Button>
        }
      />
    );
  }
}

module.exports = Header;
