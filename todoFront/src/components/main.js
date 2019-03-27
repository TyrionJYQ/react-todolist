import React from 'react';
import ReactDom from 'react-dom';


import { Table, Divider, Tag, Button } from 'antd';

const columns = [{
  title: '序号',
  dataIndex: 'key',
  key: 'key',

}, {
  title: '描述',
  dataIndex: 'todoDesc',
  key: 'todoDesc',
}, {
  title: '状态',
  key: 'tags',
  dataIndex: 'tags',
  render: tags => (
    <span>
      {tags.map(tag => {
        let color = tag.length > 5 ? 'geekblue' : 'green';
        if (tag === '已完成') {
          color = 'volcano';
        }
        return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>;
      })}
    </span>
  ),
}, {
  title: '操作',
  key: 'action',
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
},];

const data = [{
  key: '1',
  time: '2019/03/02',
  todoDesc: '吃饭睡觉',
  tags: ['已完成'],
}, {
  key: '2',
  time: '2019/03/02',
  todoDesc: '做作业',
  tags: ['未完成'],
}, {
  key: '3',
  time: '2019/03/02',
  todoDesc: '钓鱼',
  tags: ['未完成'],
}];

class Main extends React.Component {
  render() {
    return (
      <div>
        <Table columns={columns} dataSource={data} />
        <Button type="primary" size="large">新建</Button>
      </div>
    )
  }
}

module.exports = Main;