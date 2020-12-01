export default ({ req, reqMask }) => {
  return {
    getUser (data, type = false) {
      const send = ['da/cxyh', data]
      return type ? req(...send) : reqMask(...send)
    },
    addUser (data) {
      return reqMask('da/tjyh', data)
    },
    updateUser (data) {
      return reqMask('da/xgyh', data)
    },
    delUser (data) {
      return reqMask('da/scyh', data)
    },
    updatePassword (data) {
      return reqMask('da/xgdqyhmm', data)
    },
    getAuthByUser (data) {
      return reqMask('index/cxqxBymz', data)
    },
    getAllAuth () {
      return reqMask('index/cxglqx')
    },
    getUserAll (data, type = false) {
      const send = ['index/cxyh', data]
      return type ? req(...send) : reqMask(...send)
    }
  }
}
