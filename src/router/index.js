import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: { isLogin: true }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
/* router.beforeEach((to, from, next) => {
  const needLogin = to.matched.some(item => item.meta.isLogin)
  const isLogin = JSON.parse(sessionStorage.getItem('account')) && JSON.parse(sessionStorage.getItem('account')).isLogin
  if (needLogin && !isLogin) {
    next({ name: 'login' })
    return
  }
  if (to.path === '/login' && isLogin) {
    next({ name: 'home' })
    return
  }
  next()
}) */
export default router
