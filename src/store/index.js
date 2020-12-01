import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const { qx, ...account } = JSON.parse(localStorage.getItem('account') || JSON.stringify({}))
export default new Vuex.Store({
  state: {
    account: account || {},
    qx: qx || [],
    company: null
  },
  mutations: {
    changeCompany (state, value) {
      state.company = value
    },
    changeAccount (state, { account = {}, qx = [] }) {
      state.account = account
      state.qx = qx
    }
  },
  actions: {
  },
  modules: {
  }
})
