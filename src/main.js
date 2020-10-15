import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './styles.scss'
import common from './common'
import components from './components'
const scssReq = require.context('./common/scss', false, /.scss$/)
scssReq.keys().map(scssReq)
Vue.use(common)
Vue.use(ElementUI)
Vue.use(components)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  a: 1,
  render: h => h(App)
}).$mount('#app')
