import utils from './utils'
import api from './api'
import { arr, str, math } from 'aubyn-common'
import directives from './directives'
import project from './project'
// import Cookie from 'js-cookie'
import localforage from 'localforage'
localforage.config({
  driver: localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
  name: 'lysoft',
  version: 1.0,
  storeName: 'BasicSetting', // Should be alphanumeric, with underscores.
  description: 'lysoft BasicSetting'
})
export default {
  install (Vue) {
    Object.keys(utils).forEach(key => {
      Vue.prototype['$' + key] = utils[key]
    })
    Vue.prototype.$api = api
    Vue.prototype.$arr = arr
    Vue.prototype.$str = str
    Vue.prototype.$math = math
    // Vue.prototype.$cookie = Cookie
    Vue.prototype.localforage = localforage
    Vue.use(directives)
    Vue.use(project)
  }
}
