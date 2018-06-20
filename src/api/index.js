import axios from 'axios'
// const baseURL = 'http://47.96.21.88:8082/api/private/v1/'
const baseURL = 'https://demo.proudsmart.com/api/rest/post'
axios.defaults.baseURL = baseURL
// 我们这个接口暂时不需要拦截功能
// 添加请求拦截器
// axios.interceptors.request.use(function (config) {
// 将token给到一个前后台约定好的key中，作为请求发送
//   let token = localStorage.getItem('mytoken')
//   if (token) {
//     config.headers['Authorization'] = token
//   }
//   return config
// }, function (error) {
// Do something with request error
//   return Promise.reject(error)
// })

// 登录验证
export const checkUser = params => {
  // return axios.post('/login', params).then(res => res.data)
  return axios.post('/userLoginUIService/login', params).then(res => res.data)
}
