export default ({ req, reqMask }) => {
  return {
    getSize (data, type = false) {
      const send = ['da/cxmsda', data]
      return type ? req(...send) : reqMask(...send)
    },
    addSize (data) {
      return reqMask('da/tjmsda', data)
    },
    updateSize (data) {
      return reqMask('da/xgmsda', data)
    },
    delSize (data) {
      return reqMask('da/scmsda', data)
    }
  }
}
