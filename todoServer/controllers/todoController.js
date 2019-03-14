const { getToDosByUserId } = require('../models/todoModel');

module.exports = {
  test: async (ctx, next) => {
    let result = await getToDosByUserId(1);
    ctx.body = result;
  }
};