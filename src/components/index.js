const compReq = require.context('./', true, /.vue$/)
const c = compReq.keys().reduce((t, c) => {
  const name = c.match(/.*\/(.*)\.vue$/)[1]
  t[name] = compReq(c).default
  return t
}, {})
const compReq2 = require.context('../views/work', true, /.vue$/)
const c2 = compReq2.keys().reduce((t, c) => {
  const name = c.match(/.*\/(.*)\.vue$/)[1]
  t[name] = compReq2(c).default
  return t
}, {})
export default {
  install (Vue) {
    Object.keys(c).forEach(key => {
      Vue.component(key, c[key])
    })
    Object.keys(c2).forEach(key => {
      Vue.component(key, c2[key])
    })
  }
}
