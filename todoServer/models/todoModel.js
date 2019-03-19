const DB = require('../db');
module.exports = {
  getToDosByUserId: userId => DB.q('SELECT TODOID AS todoId, USERID AS userId, TODODESC AS todoDesc, Time as time FROM USERTODOS WHERE USERID = ?', [userId]),
  getUserTodosByStatus: (userId, status) => DB.q('SELECT TODOID AS todoId, USERID AS userId, TODODESC AS todoDesc, Time as time FROM USERTODOS WHERE USERID = ? AND STATUS = ?', [userId, status]),
  addNewTodo: todo => DB.q('INSERT INTO usertodos(USERID, TODODESC, STATUS, TIME) VALUES (?,?,?,?) ', todo),
  findTodoByUserIdAndTodoId: param => DB.q('SELECT * FROM usertodos WHERE USERID= ? AND TODOID = ?', param),
  updateTodoByParam: param => DB.q('UPDATE usertodos SET TODODESC = ?,STATUS = ?, TIME = ? WHERE TODOID = ?', param)
  
}