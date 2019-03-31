const server = {
  dev: 'http://localhost:9000',
  product: ''
}
const currentServer = server.dev;
module.exports = {
  register: currentServer + '/todolist/users/userRegister',
  login: currentServer + '/todolist/users/userLogin',
  createTodo: currentServer + '/todolist/newTodos',
  getTodos: currentServer + '/todolist/userTodos',
  deleteUserTodo: currentServer + '/todolist/Todos',
  updateTodo: currentServer + '/todolist/newTodo'
};