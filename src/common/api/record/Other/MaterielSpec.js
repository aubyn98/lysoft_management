export default ({ req, reqMask }) => {
  return {
    getMaterielSpec (data, type = false) {
      const send = ['da/cxwlgg', data]
      return type ? req(...send) : reqMask(...send)
    },
    addMaterielSpec (data) {
      return reqMask('da/tjwlgg', data)
    },
    updateMaterielSpec (data) {
      return reqMask('da/xgwlgg', data)
    },
    delMaterielSpec (data) {
      return reqMask('da/scwlgg', data)
    }
  }
}
