const {
  getToDosByUserId,
  getUserTodosByStatus,
  addNewTodo,
  findTodoByUserIdAndTodoId,
  updateTodoByParam } = require('../models/todoModel');
const errObj = {
  code: '002',
  msg: '出错了，程序员正在赶来的路上。。。'
};
const { log } = console;
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
      let { userId, status } = ctx.query;
      let result = await getUserTodosByStatus(userId, status);
      ctx.body = {
        code: '001',
        todos: result,
        userId: userId
      }
    } catch (e) {
      ctx.body = errorObj;
    }
  },
  addNewTodos: async (ctx, next) => {
    console.log('进入了11');
    try {
      let { userId, todos } = ctx.request.body;
      console.log(ctx.request.body)
      // 判断用户是否存在
      let todo = [userId, todos.todoDesc, todos.status, todos.time]
      let result = await addNewTodo(todo);
      if (result.insertId !== undefined) {
        log(`用户 ${userId}的待办事项${todos.todoDesc}插入成功`);
        return ctx.body = { code: '001' };
      }



    } catch (e) {
      console.log(e)
      ctx.body = errObj;
    }
  },
  updateTodos: async (ctx, next) => {
    let userId = ctx.query.userId;
    let { todoDesc, time, status, todoId } = JSON.parse(ctx.query.todo);
    // 根据用户ID和userId查找到对应的待办事项，如果不存在code:002
    let result = await findTodoByUserIdAndTodoId([userId, todoId]);
    log('查询需要修改的待办事项id为:', result, typeof result);
    if (!result.todoId) {
      console.log(result)
      ctx.body = { code: '002', msg: '待办事项不存在' };
    }
    // 查找到修改的待办事项进行更新操作，返回code: 001
    let updateResult = await updateTodoByParam([todoDesc, status, time,todoId]);
    if (updateResult.affectedRows) return ctx.body = {code: '001', msg:'更新成功!'};
    ctx.body = {code: '002', msg: '修改失败'};

  }
};