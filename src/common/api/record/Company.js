export default ({ req, reqMask }) => {
  return {
    getCompany (data, type = false) {
      const send = ['da/cxgsda', data]
      return type ? req(...send) : reqMask(...send)
    },
    updateCompany (data) {
      return reqMask('da/xggsda', data)
    }
  }
}
