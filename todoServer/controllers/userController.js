const { getRandom } = require('../utils');
const { doLogin, doRegister, checkUserIsExits } = require('../models/userModel');
module.exports = {
  register: async (ctx, next) => {
    try {
      // 参数非空校验
      let { userName, email, password } = ctx.request.body;
      ctx.body = { code: '02', msg: '' };
      if (!userName) return ctx.body = { code: '02', msg: '用户名不能为空' };
      if (!email) return ctx.body = { code: '02', msg: '邮箱不能为空' };
      if (!password) return ctx.body = { code: '02', msg: '密码不能为空' };
      // userName是否存在校验
      let userCheckResults = await checkUserIsExits(userName);
      if (userCheckResults.length > 0) return ctx.body = { code: '02', msg: '用户名已存在' };
      // 生成userId
      let userId = getRandom(5) + '';
      // 当前用户信息插入到数据库中
      let params = [userName, userId, email, password]
      let addUserResult = await doRegister(params);
      let user = { userId: userId, userName: userName }
      if (addUserResult.affectedRows === 1) return ctx.body = { code: '01', msg: '注册成功', user: user };
    } catch (e) {
      console.log('用户注册失败,' + JSON.stringify(e));
      ctx.body = {
        code: '02',
        msg: '出错了,程序员正在坐火箭赶来解决'
      }
    }
  },
  login: async (ctx, next) => {
    try {
      // 非空校验
      let { userName, password } = ctx.request.body;
      if (!userName) return ctx.body = { code: '02', msg: '用户名不能为空' };
      if (!password) return ctx.body = { code: '02', msg: '密码不能为空' };
      // 用户名和密码一致性校验
      let userObj = await doLogin(userName);
      if (userObj[0].password !== password) return ctx.body = { code: '02', msg: '用户名或密码不正确' };
      ctx.body = { code: '01', msg: '登录成功', user: {userName: userName, userId: userObj[0].userId}}
    } catch (e) {
      console.log(e);
      ctx.body = {
        code: '02',
        msg: '出错了,程序员正在坐火箭赶来解决'
      }
    }
  }
}