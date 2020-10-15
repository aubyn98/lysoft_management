export default ({ req, reqMask }) => {
  return {
    getBand (data, type = false) {
      const send = ['da/cxppda', data]
      return type ? req(...send) : reqMask(...send)
    },
    addBand (data) {
      return reqMask('da/tjppda', data)
    },
    updateBand (data) {
      return reqMask('da/xgppda', data)
    },
    delBand (data) {
      return reqMask('da/scppda', data)
    }
  }
}
