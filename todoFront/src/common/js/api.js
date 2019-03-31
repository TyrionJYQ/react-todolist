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
  },
  delete: (method, reqParams, success, fail) => {
    axios.delete(apiConfig[method], {
      params: Object.assign({}, reqParams)
    })
      .then(res => success(res.data))
      .catch(err => fail(err));
  },

  put: (method, params, success, fail) => {
    axios.put(apiConfig[method], params).then(res => {
      success(res.data);
    }).catch(err => {
      fail(err);
    })
  }
}
