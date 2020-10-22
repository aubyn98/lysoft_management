export default ({ req, reqMask }) => {
  return {
    getColorNumber (data, type = false) {
      const send = ['da/cxshda', data]
      return type ? req(...send) : reqMask(...send)
    },
    addColorNumber (data) {
      return reqMask('da/tjshda', data)
    },
    updateColorNumber (data) {
      return reqMask('da/xgshda', data)
    },
    delColorNumber (data) {
      return reqMask('da/scshda', data)
    }
  }
}
