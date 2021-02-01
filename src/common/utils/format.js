const moment = require('moment')
function getDate (params, format = 'YYYY-MM-DD') {
  return moment(params).format(format)
}
function getDateDict () {
  const dayTime = 86400000
  const dateObj = new Date()
  const year = dateObj.getFullYear()
  const month = dateObj.getMonth()
  // const date = dateObj.getDate()
  let day = dateObj.getDay()
  day = day === 0 ? 7 : day
  const today = getDate(dateObj)
  const yesterday = getDate(new Date(dateObj.getTime() - dayTime))
  return {
    近期: {
      startDate: getDate(new Date(dateObj.getTime() - 2592000000)),
      endDate: today
    },
    昨天: {
      startDate: yesterday,
      endDate: yesterday
    },
    今天: {
      startDate: today,
      endDate: today
    },
    本周: {
      startDate: getDate(new Date(dateObj.getTime() - dayTime * (day - 1))),
      endDate: getDate(new Date(dateObj.getTime() + dayTime * (7 - day)))
    },
    上周: {
      startDate: getDate(new Date(dateObj.getTime() - dayTime * (day + 6))),
      endDate: getDate(new Date(dateObj.getTime() - dayTime * day))
    },
    本月: {
      startDate: getDate(new Date(year, month, 1)),
      endDate: getDate(new Date(year, month + 1, 0))
    },
    上月: {
      startDate: getDate(new Date(year, month - 1, 1)),
      endDate: getDate(new Date(year, month, 0))
    },
    本年: {
      startDate: getDate(new Date(year, 0, 1)),
      endDate: getDate(new Date(year + 1, 0, 0))
    },
    上年: {
      startDate: getDate(new Date(year - 1, 0, 1)),
      endDate: getDate(new Date(year, 0, 0))
    }
  }
}
function compose (...fns) {
  return fns.reduce(
    (l, r) =>
      function (...argv) {
        return r.call(this, () => l.apply(this, argv), ...argv)
      }
  )
}
module.exports = {
  toRawType: (function () {
    const _toString = Object.prototype.toString
    return function (val) {
      return _toString.call(val).slice(8, -1)
    }
  })(),
  compose,
  copy: function (params) {
    return JSON.parse(JSON.stringify(params))
  },
  dateDict: getDateDict(),
  getDateDict,
  getDate,
  obj_sortKeys (data) {
    if (typeof data === 'object') {
      const temp = {}
      Object.keys(data).sort().forEach(k => {
        temp[k] = data[k]
      })
      return temp
    } else {
      console.error(new Error('data is not an object'))
      return null
    }
  },
  arr_sortKeys (data, { initKeys, delKeys } = { initKeys: null, delKeys: null }) {
    if (data instanceof Array) {
      return data.reduce((total, item) => {
        initKeys && initKeys instanceof Array && initKeys.forEach(k => {
          // eslint-disable-next-line no-prototype-builtins
          !item.hasOwnProperty(k) && (item[k] = '')
        })
        delKeys && delKeys instanceof Array && delKeys.forEach(k => {
          // eslint-disable-next-line no-prototype-builtins
          item.hasOwnProperty(k) && (delete item[k])
        })
        total.push(this.obj_sortKeys(item))
        return total
      }, [])
    } else {
      console.error(new Error('data is not an array'))
      return null
    }
  }
}
