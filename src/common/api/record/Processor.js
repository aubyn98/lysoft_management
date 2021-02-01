export default ({ req, reqMask }) => {
  return {
    getProcessor (data, type = false) {
      const send = ['da/cxjgsda', data]
      return type ? req(...send) : reqMask(...send)
    },
    addProcessor (data) {
      return reqMask('da/tjjgsda', data)
    },
    updateProcessor (data) {
      return reqMask('da/xgjgsda', data)
    },
    delProcessor (data) {
      return reqMask('da/scjgsda', data)
    }
  }
}
