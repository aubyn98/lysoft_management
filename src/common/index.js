import utils from './utils'
import api from './api'
import { arr, str, math } from 'aubyn-common'
export default {
  install (Vue) {
    Object.keys(utils).forEach(key => {
      Vue.prototype['$' + key] = utils[key]
    })
    Vue.prototype.$api = api
    Vue.prototype.$arr = arr
    Vue.prototype.$str = str
    Vue.prototype.$math = math
  }
}
