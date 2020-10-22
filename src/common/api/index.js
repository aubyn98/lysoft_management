const { createRequest, createReqInstance } = require('../utils/request')
const baseURL = process.env.NODE_ENV !== 'production' ? 'http://192.168.0.178/web/home/' : './'
const { Loading, Message, MessageBox } = require('element-ui')
function withError (req, mask) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      req(...args).then(res => {
        const error = { status: -998, msg: '服务器出错！' }
        if (typeof res !== 'object') throw error
        /* eslint-disable-next-line */
        if (typeof res === 'object' && res.hasOwnProperty('res') && !res.res) throw error
        if (!res.status || res.status !== 1) throw res
        res.msg && Message.success(res.msg)
        resolve(res)
      }).catch(e => {
        if (mask && e.response && e.response.status === 404) {
          e.status = -999
          Message.error('服务器暂无响应！')
        } else if (mask) {
          e.msg && MessageBox.alert(e.msg)
        }
        reject(e)
      })
    })
  }
}

let loadingInstance = null
const baseConfig = {
  baseURL: baseURL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
}
const baseConfigTransform = {
  transformRequest: (data) => {
    loadingInstance = Loading.service({
      fullscreen: true,
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)',
      text: '拼命加载中...'
    })
    return data
  },
  transformResponse: (data) => {
    loadingInstance.close()
    try {
      return JSON.parse(data)
    } catch (e) {
      return data
    }
  }
}

const Instance = createReqInstance(baseConfig)
const rq = createRequest(Instance)
const req = withError(rq)
const InstanceMask = createReqInstance({ ...baseConfig, ...baseConfigTransform })
const rqm = createRequest(InstanceMask)
const reqMask = withError(rqm, 'm')

const apiReq = require.context('./', true, /\.js$/)
module.exports = apiReq.keys().reduce((t, r) => {
  const name = r.match(/.*\/(.*)\.js$/)[1]
  if (name !== 'index') {
    return { ...t, ...apiReq(r).default({ req, reqMask }) }
  } else {
    return t
  }
}, {})
