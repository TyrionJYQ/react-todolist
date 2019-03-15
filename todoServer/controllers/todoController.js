const { getToDosByUserId, getUserTodosByStatus } = require('../models/todoModel');
const errObj = {
  code: '002',
  msg: '出错了，程序员正在赶来的路上。。。'
};
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
      ctx.body = errorObj;
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
  }
};