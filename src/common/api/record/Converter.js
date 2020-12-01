export default ({ req, reqMask }) => {
  return {
    getConverter (data, type = false) {
      const send = ['da/cxjgsda', data]
      return type ? req(...send) : reqMask(...send)
    },
    addConverter (data) {
      return reqMask('da/tjjgsda', data)
    },
    updateConverter (data) {
      return reqMask('da/xgjgsda', data)
    },
    delConverter (data) {
      return reqMask('da/scjgsda', data)
    }
  }
}
