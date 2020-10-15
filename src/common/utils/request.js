const axios = require('axios')
const qs = require('qs')

function createReqInstance (baseConfig = { timeout: 15000, header: { 'Content-Type': 'application/x-www-form-urlencoded' } }) {
  return axios.create(baseConfig)
}
function createRequest (instance) {
  return function (url, data, options, type) {
    return new Promise((resolve, reject) => {
      instance(getConfig(url, data, options, type)).then(res => {
        resolve(res.data)
      }).catch((e) => {
        reject(e)
      })
    })
  }
}
function getConfig (url, data = {}, options = {}, type = null) {
  const config = {
    method: 'post',
    url: url,
    ...options
  }
  config.method === 'post' ? config.data = qs.stringify(data) : config.params = data
  switch (type) {
    case 'form': {
      config.headers = { ...config.headers, 'Content-Type': 'multipart/form-data' }
      const formData = new FormData()
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
      config.data = formData
    }
      break
  }
  return config
}

module.exports = {
  createReqInstance,
  createRequest
}
