const server = {
  dev: 'http://localhost:9000',
  product: ''
}
const currentServer = server.dev;
module.exports = {
  register: currentServer + '/todolist/users/userRegister'
};