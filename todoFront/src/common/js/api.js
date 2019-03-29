import axios from 'axios';
import apiConfig from './apiConfig';
module.exports = {
  post: (method, params, success, fail) => {
    axios.post(apiConfig[method], params).then(res => {
      success(res.data);
    }).catch(err => {
      fail(err);
    })
  },
  get: (method, reqParams, success, fail) => {
    axios.get(apiConfig[method], {
      params: Object.assign({}, reqParams)
    })
      .then(res => success(res.data))
      .catch(err => fail(err));
  }
}