export default ({ req, reqMask }) => {
  return {
    getMaterielConstituent (data, type = false) {
      const send = ['da/cxwlcf', data]
      return type ? req(...send) : reqMask(...send)
    },
    addMaterielConstituent (data) {
      return reqMask('da/tjwlcf', data)
    },
    updateMaterielConstituent (data) {
      return reqMask('da/xgwlcf', data)
    },
    delMaterielConstituent (data) {
      return reqMask('da/scwlcf', data)
    }
  }
}
