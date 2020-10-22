export default ({ req, reqMask }) => {
  return {
    getColor (data, type = false) {
      const send = ['da/cxysda', data]
      return type ? req(...send) : reqMask(...send)
    },
    addColor (data) {
      return reqMask('da/tjysda', data)
    },
    updateColor (data) {
      return reqMask('da/xgysda', data)
    },
    delColor (data) {
      return reqMask('da/scysda', data)
    }
  }
}
