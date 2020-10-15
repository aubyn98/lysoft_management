export default ({ req, reqMask }) => {
  return {
    getVendor (data, type = false) {
      const send = ['da/cxghsda', data]
      return type ? req(...send) : reqMask(...send)
    },
    addVendor (data) {
      return reqMask('da/tjghsda', data)
    },
    updateVendor (data) {
      return reqMask('da/xgghsda', data)
    },
    delVendor (data) {
      return reqMask('da/scghsda', data)
    }
  }
}
