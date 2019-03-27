import React from "react";
import ReactDOM from "react-dom";
import { PageHeader, Tag, Tabs, Button, Statistic, Row, Col } from "antd";


class Header extends React.Component {
  constructor(props) {
    super(props);
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
              this.props.getStatus();
            }}
          >
            {this.props.status.text}
          </Button>
        }
      />
    );
  }
}

module.exports = Header;
