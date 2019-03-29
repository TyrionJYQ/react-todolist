import React from 'react';
import ReactDom from 'react-dom';
import { Table, Divider, Tag, Button, Modal, Input, message } from 'antd';
import api from '../common/js/api'
const userId = JSON.parse(localStorage.getItem('user')).userId
const columns = [{
  title: '描述',
  dataIndex: 'todoDesc',
  key: 'todoDesc',
  width: '40%'
}, {
  title: '状态',
  key: 'status',
  dataIndex: 'status',
  width: '20%',
  render: text => {
    let color = text === 'NEW' ? 'red' : 'green'
    return (
      <span><Tag color={color}>{text === 'NEW' ? '待完成' : '已完成'}</Tag></span>
    )
  }
}, {
  title: '操作',
  key: 'action',
  width: '20%',
  render: () => (
    <span>
      <a href="javascript:;">修改</a>
      <a href="javascript:;">删除</a>
    </span>
  ),
},
{
  title: '创建时间',
  dataIndex: 'time',
  key: 'time',
  width: '20%'
},];

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      todoDesc: '',
      tableData: []
    }
  }
  setModalVisible(modalVisible) {
    this.setState({ modalVisible })
    // 关闭modal清空上次输入的值
    if (!modalVisible) this.state.todoDesc = '';
  }
  changeValue(e) {
    this.setState({
      todoDesc: e.target.value
    })
  }
  componentDidMount() {
    // 获取所有待办事项
    api.get('getTodos', {userId}, data => {
      this.setState({
        tableData: data.todos
      })
    }, err=> console.log(err))
    
  }
  confirm() {
    // 非空校验
    if(!this.state.todoDesc) return message.warning('请输入待办事项!');
    // 组装参数
    try {
      let todo = {todoDesc: this.state.todoDesc,time: Date.now(), status: 'NEW'}
      let todoParam = {
        userId,
        todo: todo
      };
      // 发送请求
      api.post('createTodo', todoParam, data => {
        if(data.code === '02') return message.error('新建待办事项失败');
        message.success('新建成功!');
          // 请求成功后更新视图
        todo.key = this.state.tableData.length + 1 + ''
        todo.tags = ['11111']
        let tempData = this.state.tableData.concat(todo);
        this.setState({
          tableData: tempData
        });
        this.setModalVisible(false);
      }, err => console.log(err))

    } catch(err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        {/*新建待办事项弹出框*/}
        <Modal
          title="新建待办事项"
          centered
          visible={this.state.modalVisible}
          okText="确定"
          cancelText="取消"
          onOk={() => this.confirm()}
          onCancel={() => this.setModalVisible(false)}
        >
          <Input placeholder="请输入待办事项" value={this.state.todoDesc} onChange={e => this.changeValue(e)} />
        </Modal>
        <Table columns={columns} dataSource={this.state.tableData} rowKey={(r, i) => (i)} scroll={{ y: 250 }}/>
        <Button type="primary" size="large" onClick={() => this.setModalVisible(true)}>新建</Button>
      </div>
    )
  }
}

module.exports = Main;