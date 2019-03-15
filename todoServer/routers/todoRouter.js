// 1:引入 Koa-router
const Router = require('koa-router');
const todoController = require('../controllers/todoController')
// 2: 创建路由对象
let router = new Router();
module.exports = router;
// 3:配置路由规则

router.get('/', todoController.test)
.get('/todolist/userTodos', todoController.getUserTodos)
  .get('/todolist/userTodos/status', todoController.getUserTodosByStatus)
// 导出给app。进行配置中间件
