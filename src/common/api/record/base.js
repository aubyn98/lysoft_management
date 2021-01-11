export default ({ req, reqMask }) => {
  return {
    validateAuth (data) {
      return reqMask('index/pwdYz', data)
    },
    getProvince (data) {
      return req('index/cxsf', data)
    },
    getCityProper (data) {
      return req('index/cxsq', data)
    },
    getCounty (data) {
      return req('index/cxxq', data)
    },
    getDepartment (data) {
      return req('index/cxbm', data)
    },
    getStaffByDepartment (data) {
      return req('index/cxygBybm', data)
    },
    getBedNum (data) {
      return req('index/cxch', data)
    },
    getBedNum2 (data) {
      return req('index/cxzdch', data)
    }
  }
}
