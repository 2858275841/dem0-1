import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/Home.vue'
import Uaer from '@/views/User.vue'
import Main from '@/views/main.vue'
import Mall from '@/views/Mall.vue'
import Page1 from '@/views/Page1.vue'
import Page2 from '@/views/Page2.vue'
import Login from '@/views/login.vue'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
// 重定向
  {
    path: '/',
    redirect: '/login'
  },
  // 登录路由
  { path: '/login', name: 'login', component: Login },
  // 主路由
  {
    path: '/home',
    component: Main,
    children: [
      { path: '/home', name: 'home', component: Home }, // 首页
      { path: 'user', name: 'user', component: Uaer }, // 用户管理
      { path: 'mall', name: 'mall', component: Mall }, // 商品管理
      { path: 'page1', name: 'page1', component: Page1 }, // 页面1
      { path: 'page2', name: 'page2', component: Page2 } // 页面2
    ]
  }
]

const router = new VueRouter({
  routes
})

// 全局前置路由守卫
router.beforeEach((to, from, next) => {
  const cookie = localStorage.getItem('aa_cookie')
  if (!cookie && to.name !== 'login') {
    next({ name: 'login' })
  } else if (cookie && to.name === 'login') {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
