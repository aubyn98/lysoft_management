export default ({ req, reqMask }) => {
  return {
    getGears (data, type = false) {
      const send = ['da/cxckdwda', data]
      return type ? req(...send) : reqMask(...send)
    },
    addGears (data) {
      return reqMask('da/tjckdwda', data)
    },
    updateGears (data) {
      return reqMask('da/xgckdwda', data)
    },
    delGears (data) {
      return reqMask('da/scckdwda', data)
    }
  }
}
