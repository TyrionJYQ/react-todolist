const userDB = require('../db');

module.exports = {
  doRegister: params => userDB.q('INSERT INTO users(USERNAME, USERID, EMAIL, PASSWORD) VALUES(?,?,?,?)', params),
  doLogin: password => userDB.q('SELECT USERID AS userId WHERE PASSWORD = ?', [password]),
  checkUserIsExits: userId => userDB.q('SELECT PASSWORD AS password FROM users WHERE USERID = ?', [userId])
}