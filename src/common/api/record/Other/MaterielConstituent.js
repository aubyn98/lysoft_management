export default ({ req, reqMask }) => {
  return {
    getMaterialConstituent (data, type = false) {
      const send = ['da/cxwlcf', data]
      return type ? req(...send) : reqMask(...send)
    },
    addMaterialConstituent (data) {
      return reqMask('da/tjwlcf', data)
    },
    updateMaterialConstituent (data) {
      return reqMask('da/xgwlcf', data)
    },
    delMaterialConstituent (data) {
      return reqMask('da/scwlcf', data)
    }
  }
}
