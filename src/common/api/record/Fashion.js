export default ({ req, reqMask }) => {
  return {
    getFashion (data, type = false) {
      const send = ['da/cxksda', data]
      return type ? req(...send) : reqMask(...send)
    },
    getFashion2 (data) {
      const send = ['da/cxkskhda', data]
      return req(...send)
    },
    addFashion (data) {
      return reqMask('da/tjksda', data)
    },
    updateFashion (data) {
      return reqMask('da/xgksda', data)
    },
    delFashion (data) {
      return reqMask('da/scksda', data)
    },
    getFashionAlarm (data) {
      return reqMask('da/cxcpkcbjsz', data)
    },
    updateFashionAlarm (data) {
      return reqMask('da/tjcpkcbjsz', data)
    },
    updateProcessWages (data) {
      return reqMask('da/gjsz', data)
    }
  }
}
