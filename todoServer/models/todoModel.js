const DB = require('../db');
module.exports = {
  getToDosByUserId: userId => DB.q('SELECT * FROM USERTODOS WHERE USERID = ?', [userId])
}