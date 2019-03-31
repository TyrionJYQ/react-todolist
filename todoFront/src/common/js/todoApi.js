/*
*待办事项相关接口请求管理 
 */
import api from './api';
const userId = JSON.parse(localStorage.getItem('user')).userId

module.exports = {
  getAllTodos: () => new Promise((resolve, reject) => {
    api.get('getTodos', { userId }, data => {
      console.log(data);  
      resolve(data);
    }, err => reject(err))
  }),

  createNewTodo: todo => new Promise((resolve, reject) => {
    api.post('createTodo', {userId, todo}, data => {
      resolve(data);
    }, err => reject(err));
  }),

  deleteUserTodo: todoObj => new Promise((resolve, reject) => {
    api.delete('deleteUserTodo',todoObj, data => {
      resolve(data)
    },
    err => reject(err));
  }),

  updateTodo: todo => new Promise((resolve, reject) => {
    api.post('updateTodo', {userId, todo}, data => resolve(data), err => reject(err));
  })
}