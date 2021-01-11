export default ({ req, reqMask }) => {
  return {
    getTrademark (data, type = false) {
      const send = ['da/cxsbda', data]
      return type ? req(...send) : reqMask(...send)
    },
    addTrademark (data) {
      return reqMask('da/tjsbda', data)
    },
    updateTrademark (data) {
      return reqMask('da/xgsbda', data)
    },
    delTrademark (data) {
      return reqMask('da/scsbda', data)
    }
  }
}
