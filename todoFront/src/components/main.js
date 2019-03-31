import React from 'react';
import ReactDom from 'react-dom';
import { Table, Divider, Tag, Button, Modal, Input, message, Popconfirm, Form } from 'antd';
import { getAllTodos, createNewTodo, deleteUserTodo, updateTodo } from '../common/js/todoApi'

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      todoDesc: '',
      tableData: [],
      operationType: 'add'
    },
      this.columns = [{
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
        render: row => (
          <span>
            <a onClick={e => this.openModal(e, row)}>修改</a>
            <Popconfirm title="确定删除当前待办事务吗?" onConfirm={() => this.deleteTodo(row)} onCancel={console.log('')} okText="是" cancelText="否">
              <a href="#">删除</a>
            </Popconfirm>
          </span>
        ),
      },
      {
        title: '创建时间',
        dataIndex: 'time',
        key: 'time',
        width: '20%'
      }];
    this.todoId = '';
  }
  setModalVisible(modalVisible) {
    this.setState({ modalVisible, operationType: 'add' });
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
    let _this = this;
    getAllTodos().then(
      data => _this.setState({ tableData: data.todos })
      , err => console.log(err)
    )
  }

  // 删除待办事项
  deleteTodo(row) {
    console.log(row);
    let { userId, todoId } = row;
    deleteUserTodo({ userId, todoId }).then(data => {
      if (data.code === '002') return message.warning(data.msg);
      message.success('删除成功');
      let index = this.state.tableData.findIndex(data => data.todoId === todoId);
      this.state.tableData.splice(index, 1);
      this.setState({ tableData: this.state.tableData });
    }, err => message.error('出错了，无法删除'));
  }
  openModal(e, row) {
    e.preventDefault();
    this.setState({
      modalVisible: true,
      operationType: 'update',
      todoDesc: row.todoDesc
    });
    this.todoId = row.todoId;
  }

  updateTodo() {
    let todoId = this.todoId;
    let todo = {
        todoDesc: this.state.todoDesc,
        time: Date.now(),
        status: 'NEW',
        todoId: todoId
      };
   
    updateTodo(todo).then(data => console.log(data), err => console.log(err));
  }

  // 修改待办事项状态
  updateTodoStatus() {

  }

  // 新建待办事项
  addNewTodo() {
    try {
      let todo = { todoDesc: this.state.todoDesc, time: Date.now(), status: 'NEW' };
      createNewTodo(todo).then(data => {
        if (data.code === '02') return message.error('新建待办事项失败');
        message.success('新建成功!');
        let tempData = this.state.tableData.concat(todo);
        this.setState({ tableData: tempData, modalVisible: false });
      }, err => console.log(err));
    } catch (err) {
      console.log(err);
    }
  }

  confirm() {
    if (!this.state.todoDesc) return message.warning('请输入待办事项!');
    switch (this.state.operationType) {
      case 'add':
        this.addNewTodo();
        break;
      case 'update':
        this.updateTodo();
        break;
      default:
        break;
    }

  }
  render() {
    const title = this.state.operationType === 'add' ? '新建待办事项' : '修改待办事项';
    return (
      <div>
        {/*新建和修改待办事项弹出框*/}
        <Modal
          title={title}
          centered
          visible={this.state.modalVisible}
          okText="确定"
          cancelText="取消"
          onOk={() => this.confirm()}
          onCancel={() => this.setModalVisible(false)}>
          <Input placeholder="请输入待办事项" value={this.state.todoDesc} onChange={e => this.changeValue(e)} />
        </Modal>
        <Table columns={this.columns} dataSource={this.state.tableData} rowKey={(r, i) => (i)} scroll={{ y: 250 }} />
        <Button type="primary" size="large" onClick={() => this.setModalVisible(true)}>新建</Button>
      </div>
    )
  }
}

module.exports = Main;