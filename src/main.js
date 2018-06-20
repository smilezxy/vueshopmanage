// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss'

Vue.use(ElementUI)
Vue.config.productionTip = false
// 注册一个全局守卫  作用是路由调整前，对路由进行判断，防止未登录的用户跳转到其他需要登录的页面
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('mytoken')
  if (token) {
    // 已经登录直接跳转
    next()
  } else {
    // 如果没有登录，就去登录页面
    if (to.path !== '/login') {
      next({path: '/login'})
    } else {
    // 正好访问的login页面
      next()
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
