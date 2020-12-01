export default ({ req, reqMask }) => {
  return {
    getMaterialSpec (data, type = false) {
      const send = ['da/cxwlgg', data]
      return type ? req(...send) : reqMask(...send)
    },
    addMaterialSpec (data) {
      return reqMask('da/tjwlgg', data)
    },
    updateMaterialSpec (data) {
      return reqMask('da/xgwlgg', data)
    },
    delMaterialSpec (data) {
      return reqMask('da/scwlgg', data)
    }
  }
}
