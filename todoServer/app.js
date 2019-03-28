const Koa = require('koa');
const {
  port,
  rewriteUrlArray,
  sessionConfig,
  sessionKey,
  routeList,
  renderRootDir,
  staticDir,
  uploadDir } = require('./config');
let app = new Koa();
app.listen(port, () => {
  console.log(`服务器成功启动，端口号为${port}`);
});
// 处理跨域
app.use(require('koa2-cors')());
// 解析请求体数据
app.use(require('koa-bodyparser')());

// 引入各个路由对象，并配置中间件
const todoRouter = require('./routers/todoRouter');
const userRouter = require('./routers/userRouter')

// 处理静态资源,path.resolve将相对路径变为绝对路径
app.use(require('koa-static')(staticDir));


// 路由
app.use(todoRouter.routes());
app.use(userRouter.routes());

// 原本配置了/a 的get请求方式,但你用了post请求方式, 返回404, 
// 以下配置可以返回405  方法不匹配
// 如果客户端使用了元·服务器不能支持的请求方式 比如copy, 返回404
// 以下配置可以返回501  方法未实现
app.use(todoRouter.allowedMethods());








