import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
import Welcome from '@/views/welcome/welcome.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: {path: '/welcome'},
      children: [
        {
          name: 'Welcome',
          path: 'welcome',
          component: Welcome
        }
      ]

    }
  ]
})
