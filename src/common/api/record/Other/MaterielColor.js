export default ({ req, reqMask }) => {
  return {
    getMaterialColor (data, type = false) {
      const send = ['da/cxwlys', data]
      return type ? req(...send) : reqMask(...send)
    },
    addMaterialColor (data) {
      return reqMask('da/tjwlys', data)
    },
    updateMaterialColor (data) {
      return reqMask('da/xgwlys', data)
    },
    delMaterialColor (data) {
      return reqMask('da/scwlys', data)
    }
  }
}
