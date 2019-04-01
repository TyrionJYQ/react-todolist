import React from 'react';
import ReactDom from 'react-dom';
import { Table, Divider, Tag, Button, Modal, Input, message, Popconfirm, Form, Radio } from 'antd';
import { getAllTodos, createNewTodo, deleteUserTodo, updateTodo } from '../common/js/todoApi'
import { formatTimesmap } from '../common/js/utils'
class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      todoDesc: '',
      tableData: [],
      originTableData: [],
      operationType: 'add'
    },
      this.columns = [{
        title: '描述',
        key: 'todoDesc',
        width: '40%',
        render: row => {
          {/*当前事务状态为待完成，单击radio弹出提示是否修改状态为已完成。如果状态为已完成，单选框disabled*/}
          return (
            <span>
              <Popconfirm title="状态变为已完成?" onConfirm={this.setStausCompleted.bind(this, row)} onCancel={() => {return;}} okText="是" cancelText="否">
                <Radio checked={row.status !== 'NEW'} disabled = {row.status !== 'NEW'}>{row.todoDesc}</Radio>
              </Popconfirm>
            </span>
          )
        }
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
            <Popconfirm title="确定删除当前待办事务吗?" onConfirm={() => this.deleteTodo(row)} onCancel={() => {return}} okText="是" cancelText="否">
              <a href="#">删除</a>
            </Popconfirm>
            <a onClick={e => this.openModal(e, row)} className={row.status === 'COMPLETED' ? 'hide' : ''}>修改</a>
          </span>
        ),
      },
      {
        title: '创建时间',
        dataIndex: 'time',
        key: 'time',
        width: '20%',
        render: time => (
          <span>{formatTimesmap(time)}</span>
        )
      }];
    this.todoId = '';
  }

  filterTableDataByStatus(status) {
    let { originTableData } = this.state;
    let _this = this;
    let _getTempData = function() {
      let tempData = originTableData.filter(data => data.status === status);
      _this.setState({tableData: tempData});
    }
    switch(status) {
      case 'ALL':
        this.setState({ tableData: originTableData});
        break;
      case 'COMPLETED':
        _getTempData();
        break;
      case 'NEW':
        _getTempData();
        break;
      default:
        break;
        
    }
  }
 
  setModalVisible(modalVisible) {
    this.setState({ modalVisible, operationType: 'add' });
    if (!modalVisible) this.state.todoDesc = '';
  }
  changeValue(e) {
    this.setState({
      todoDesc: e.target.value
    })
  }
  componentDidMount() {
    let _this = this;
    getAllTodos().then(
      data => _this.setState({ tableData: data.todos, originTableData: data.todos})
      , err => console.log(err)
    )
  }
  getIndexByTodoId(todoId) {
    return this.state.tableData.findIndex(data => data.todoId === todoId);
  }

  deleteTodo(row) {
    let { userId, todoId } = row;
    deleteUserTodo({ userId, todoId }).then(data => {
      if (data.code === '002') return message.warning(data.msg);
      message.success('删除成功');
      let index = this.getIndexByTodoId(todoId);
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
    updateTodo(todo).then(data => {
      if(data.code === '002') return message.info(data.message);
      message.success('修改待办事项成功');
      let index = this.getIndexByTodoId(todo.todoId);
      this.state.tableData[index] = todo;
      this.setState({
        tableData: this.state.tableData
      })
      this.setModalVisible(false);
    }, err => console.log(err));
  }

  setStausCompleted(todo) {
    let _todo = Object.assign(todo, {status: 'COMPLETED', time: Date.now()});
    updateTodo(_todo).then(data => {
      if (data.code === '002') return message.info('状态变更失败');
      let index = this.getIndexByTodoId(todo.todoId);
      let {tableData} = this.state;
      tableData[index].status = 'COMPLETED';
      message.success('状态修改成功!')
      this.setState({ tableData});
    })
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
        <Table columns={this.columns} pagination={{ pageSize: 15}} dataSource={this.state.tableData} rowKey={(r, i) => (i)} scroll={{ y: 300 }} />
        <div className="button-wrapper">
          <Button type="primary"  onClick={() => this.setModalVisible(true)}>新建</Button>
          <Button type="primary"  onClick={() => this.filterTableDataByStatus('NEW')}>待完成</Button>
          <Button type="primary"  onClick={() => this.filterTableDataByStatus('COMPLETED')}>已完成</Button>
          <Button type="primary"  onClick={() => this.filterTableDataByStatus('ALL')}>所有</Button>
        </div>
      </div>
    )
  }
}

module.exports = Main;