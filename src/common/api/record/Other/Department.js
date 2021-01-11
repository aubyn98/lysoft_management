export default ({ req, reqMask }) => {
  return {
    getDepartment (data, type = false) {
      const send = ['da/cxbmda', data]
      return type ? req(...send) : reqMask(...send)
    },
    addDepartment (data) {
      return reqMask('da/tjbmda', data)
    },
    updateDepartment (data) {
      return reqMask('da/xgbmda', data)
    },
    delDepartment (data) {
      return reqMask('da/scbmda', data)
    }
  }
}
