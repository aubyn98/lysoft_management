import utils from './utils'
import api from './api'
import { arr, str, math } from 'aubyn-common'
import directives from './directives'
// import Cookie from 'js-cookie'
import store from '../store'
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
    Vue.prototype.$authentication = function (arr) {
      return new Promise((resolve, reject) => {
        this.$prompt('请输入密码', '验证', {
          inputType: 'password',
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /.+/,
          inputErrorMessage: '请输入密码',
          closeOnClickModal: false
        }).then(({ value: mm }) => {
          this.$api.validateAuth({ mm }).then(() => {
            resolve(true)
          }).catch(e => {
            reject(e)
          })
        }).catch(e => {
          reject(e)
        })
      })
    }
    Vue.prototype.$permission = function (arr) {
      const qx = store.state.qx
      return arr.every(({ mc, ...auth }) => {
        if (qx[mc]) {
          return Object.keys(auth).every(k => {
            return qx[mc][k]
          })
        } else {
          return false
        }
      })
    }
    Vue.prototype.c2eFormat = function (c) {
      return c.reduce((t, c) => {
        t[c.prop] = c.label
        return t
      }, {})
    }
    Vue.prototype.localforage = localforage
    Vue.use(directives)
  }
}
