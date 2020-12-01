export default ({ req, reqMask }) => {
  return {
    getStore (data, type = false) {
      const send = ['index/cxck', data]
      return type ? req(...send) : reqMask(...send)
    },
    addStore (data) {
      return reqMask('index/tjck', data)
    },
    updateStore (data) {
      return reqMask('index/xgck', data)
    },
    delStore (data) {
      return reqMask('index/scck', data)
    }
  }
}
