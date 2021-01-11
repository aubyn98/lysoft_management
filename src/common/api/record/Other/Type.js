export default ({ req, reqMask }) => {
  return {
    getType (data, type = false) {
      const send = ['da/cxlxda', data]
      return type ? req(...send) : reqMask(...send)
    },
    addType (data) {
      return reqMask('da/tjlxda', data)
    },
    updateType (data) {
      return reqMask('da/xglxda', data)
    },
    delType (data) {
      return reqMask('da/sclxda', data)
    }
  }
}
