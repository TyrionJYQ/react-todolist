const {
  getToDosByUserId,
  getUserTodosByStatus,
  addNewTodo,
  findTodoByUserIdAndTodoId,
  updateTodoByParam,
  deleteTodoBytodoId } = require('../models/todoModel');
const errObj = {
  code: '0  2',
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
      let { userId, todo } = ctx.request.body;
      console.log(ctx.request.body)
      // 判断用户是否存在
      let _todo = [userId, todo.todoDesc, todo.status, todo.time]
      let result = await addNewTodo(_todo);
      if (result.insertId !== undefined) {
        log(`用户 ${userId}的待办事项${_todo.todoDesc}插入成功`);
        return ctx.body = { code: '01' };
      }
    } catch (e) {
      console.log(e)
      ctx.body = errObj;
    }
  },
  updateTodos: async (ctx, next) => {
	console.log(ctx.request.body);
	let { userId, todo: {todoDesc, time, status, todoId} } = ctx.request.body;
    // 根据用户ID和userId查找到对应的待办事项，如果不存在code:002
    let findResults = await findTodoByUserIdAndTodoId([userId, todoId]);
    if (findResults.length === 0) return ctx.body = { code: '002', msg: '待办事项不存在' };
    log('查询需要修改的待办事项todoId为:', findResults[0].todoId);
    // 查找到修改的待办事项进行更新操作，返回code: 001
    let updateResult = await updateTodoByParam([todoDesc, status, time,todoId]);
    if (updateResult.affectedRows) return ctx.body = {code: '001', msg:'更新成功!'};
    ctx.body = {code: '002', msg: '修改失败'};
  },
  deleteTodosByTodoId: async (ctx, next) => {
    let {todoId, userId} = ctx.query;
    let findResults = await findTodoByUserIdAndTodoId([userId, todoId]);
    if (findResults.length === 0) return ctx.body = { code: '002', msg: '待办事项不存在' };
    let result = await deleteTodoBytodoId(todoId);
    if (result.affectedRows === 1) return ctx.body = {code: '001', msg: '删除成功'};
    ctx.body = errObj;
  } 
};