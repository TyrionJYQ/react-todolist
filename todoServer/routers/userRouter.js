// 1:引入 Koa-router
const Router = require('koa-router');
const userController = require('../controllers/userController')
// 2: 创建路由对象
let router = new Router();
module.exports = router;
// 3:配置路由规则

router.post('/todolist/users/userRegister', userController.register)
  .post('/todolist/users/userLogin', userController.login)

