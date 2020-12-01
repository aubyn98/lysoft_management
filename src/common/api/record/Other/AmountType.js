export default ({ req, reqMask }) => {
  return {
    getAmountType (data, type = false) {
      const send = ['index/cxjelx', data]
      return type ? req(...send) : reqMask(...send)
    },
    addAmountType (data) {
      return reqMask('index/tjjelx', data)
    },
    updateAmountType (data) {
      return reqMask('index/xgjelx', data)
    },
    delAmountType (data) {
      return reqMask('index/scjelx', data)
    }
  }
}
