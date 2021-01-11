export default ({ req, reqMask }) => {
  return {
    getJob (data, type = false) {
      const send = ['da/cxzwda', data]
      return type ? req(...send) : reqMask(...send)
    },
    addJob (data) {
      return reqMask('da/tjzwda', data)
    },
    updateJob (data) {
      return reqMask('da/xgzwda', data)
    },
    delJob (data) {
      return reqMask('da/sczwda', data)
    }
  }
}
