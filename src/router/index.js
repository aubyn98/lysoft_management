import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import { routePath } from '../config'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/views/login'
  },
  {
    path: '/views/home',
    name: 'home',
    component: Home,
    meta: { isLogin: true }
  },
  {
    path: '/views/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: routePath,
  routes
})
router.beforeEach((to, from, next) => {
  const needLogin = to.matched.some(item => item.meta.isLogin)
  const isLogin = localStorage.getItem('x-token')
  if (needLogin && !isLogin) {
    next({ name: 'login' })
    window.location.reload()
    return
  }
  if (to.name === 'login' && isLogin) {
    next({ name: 'home' })
    return
  }
  next()
})
export default router
