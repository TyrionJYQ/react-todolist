const userDB = require('../db');

module.exports = {
  doRegister: params => userDB.q('INSERT INTO users(USERNAME, USERID, EMAIL, PASSWORD) VALUES(?,?,?,?)', params),
  doLogin: userName => userDB.q('SELECT USERID AS userId, PASSWORD AS password FROM users WHERE USERNAME = ?', [userName])
  
}