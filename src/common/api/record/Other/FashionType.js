export default ({ req, reqMask }) => {
  return {
    getFashionType (data, type = false) {
      const send = ['da/cxkslxda', data]
      return type ? req(...send) : reqMask(...send)
    },
    addFashionType (data) {
      return reqMask('da/tjkslxda', data)
    },
    updateFashionType (data) {
      return reqMask('da/xgkslxda', data)
    },
    delFashionType (data) {
      return reqMask('da/sckslxda', data)
    }
  }
}
