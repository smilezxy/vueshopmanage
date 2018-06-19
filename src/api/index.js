import axios from 'axios'
// const baseURL = 'http://47.96.21.88:8082/api/private/v1/'
const baseURL = 'https://demo.proudsmart.com/api/rest/post'
axios.defaults.baseURL = baseURL
// 登录验证
export const checkUser = params => {
  return axios.post('/userLoginUIService/login', params).then(res => res.data)
}
