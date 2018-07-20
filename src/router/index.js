import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
import Welcome from '@/views/welcome/welcome.vue'
import User from '@/views/user/user.vue'
import Rights from '@/views/right/rights.vue'
import Roles from '@/views/right/roles.vue'
import Category from '@/views/category/category.vue'
import Goods from '@/views/goods/goods.vue'
import AddGoods from '@/views/goods/addgoods.vue'
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
        }, {
          name: 'Users',
          path: 'users',
          component: User
        }, {
          name: 'Rights',
          path: 'rights',
          component: Rights
        }, {
          name: 'Roles',
          path: 'roles',
          component: Roles
        }, {
          name: 'Category',
          path: 'categories',
          component: Category
        }, {
          name: 'Goods',
          path: 'goods',
          component: Goods
        }, {
          name: 'AddGoods',
          path: 'toadd',
          component: AddGoods
        }
      ]

    }
  ]
})
