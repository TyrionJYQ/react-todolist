const { getToDosByUserId, getUserTodosByStatus,addNewTodo } = require('../models/todoModel');
const errObj = {
  code: '002',
  msg: '出错了，程序员正在赶来的路上。。。'
};
const {log} = console;
module.exports = {
  test: async (ctx, next) => {
    ctx.body = '最贴心的事务管家';
  },
  getUserTodos: async (ctx, next) => {
    try {
      let { userId } = ctx.query;
      let result = await getToDosByUserId(userId);
      ctx.body = {
        code: '001',
        todos: result,
        userId: userId
      };
    } catch (e) {
      ctx.body = errObj;
    }
  },
  getUserTodosByStatus: async (ctx, next) => {
    try {
      let {userId, status} = ctx.query;
      let result = await getUserTodosByStatus(userId, status);
      ctx.body = {
        code: '001',
        todos: result,
        userId: userId
      }
    }catch(e) {
      ctx.body = errorObj;
    }
  },
  addNewTodos: async(ctx, next) => {
    console.log('进入了11');
    try {
      let {userId,todos} = ctx.request.body;
      console.log(ctx.request.body)
      // 判断用户是否存在
      let todo = [userId, todos.todoDesc,todos.status, todos.time]
      let result = await addNewTodo(todo);
      if (result.insertId !== undefined) {
        log(`用户 ${userId}的待办事项${todos.todoDesc}插入成功`);
        return ctx.body = { code: '001'};
      }


    } catch (e) {
      console.log(e)
      ctx.body = errObj;
    }
  }
};