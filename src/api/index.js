import axios from 'axios'
const baseURL = 'http://47.96.21.88:8082/api/private/v1/'
axios.defaults.baseURL = baseURL
// 登录验证
export const checkUser = params => {
  return axios.post('login', params).then(res => res.data)
}
