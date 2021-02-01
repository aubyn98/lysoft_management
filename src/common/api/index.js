const router = require('@/router').default
const store = require('@/store').default
const { createRequest, createReqInstance } = require('../utils/request')
const { apiPath } = require('@/config')
const baseURL = apiPath
const { Loading, Message, MessageBox } = require('element-ui')
const qs = require('qs')
const baseConfig = {
  baseURL: baseURL,
  timeout: 60000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
}

let loadingInstance = null
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
    loadingInstance && loadingInstance.close()
    try {
      return JSON.parse(data)
    } catch (e) {
      return data
    }
  }
}

const errorCode = {
  401: '登陆已过期，请重新登陆！',
  404: '服务器暂无响应！',
  500: '服务器数据出错！'
}
const errorMsg = { status: -998, msg: '服务器返回的数据类型错误！' }

const interceptors = {
  request: [function (config) {
    const token = localStorage.getItem('x-token')
    if (token && config.url !== 'Login/login' && config.url !== 'Login/cxzb') {
      config.headers['x-token'] = token
    }
    const data = qs.parse(config.data) || {}
    // eslint-disable-next-line no-prototype-builtins
    if (/\w+\/[c|w]\w+/.test(config.url) && (data && !data.hasOwnProperty('pageSize'))) {
      const pageSize = store.state.company ? store.state.company.mysj : 60
      data.pageSize = pageSize
    } else if (data.pageSize === '') {
      delete data.pageSize
    }
    config.data = qs.stringify(data)
    return config
  }, function (error) {
    return Promise.reject(error)
  }],
  response: [function (response) {
    const token = response.headers['x-token']
    if (token) {
      localStorage.setItem('x-token', token)
    }
    if (response.status === 200) {
      const data = response.data
      /* eslint-disable-next-line */
      if (data === null || typeof data !== 'object' || (typeof data === 'object' && data.hasOwnProperty('res') && !data.res)) throw errorMsg
      if (!data.status || data.status !== 1) {
        const nError = { ...errorMsg, ...data }
        throw nError
      }
      data.msg && Message.success(data.msg)
      return response
    } else {
      loadingInstance && loadingInstance.close()
      throw errorMsg
    }
  }, function (e) {
    if (e.response.status === 401) {
      localStorage.removeItem('x-token')
      router.push({ name: 'login' })
    }
    return Promise.reject(e)
  }]
}

function withError (req, mask) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      req(...args).then(res => {
        resolve(res.data)
      }).catch(e => {
        loadingInstance && loadingInstance.close()
        if (mask && e.response && errorCode[e.response.status] && e.response.status !== 200) {
          e.status = -999
          MessageBox.alert(errorCode[e.response.status])
        } else if (mask) {
          // console.log(e)
          e.msg && MessageBox.alert(e.msg)
        }
        reject(e)
      })
    })
  }
}

const Instance = createReqInstance(baseConfig)
Instance.interceptors.request.use(...interceptors.request)
Instance.interceptors.response.use(...interceptors.response)
const rq = createRequest(Instance)
const req = withError(rq)

const InstanceMask = createReqInstance({ ...baseConfig, ...baseConfigTransform })
InstanceMask.interceptors.request.use(...interceptors.request)
InstanceMask.interceptors.response.use(...interceptors.response)
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
