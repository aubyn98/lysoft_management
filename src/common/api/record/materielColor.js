export default ({ req, reqMask }) => {
  return {
    getMaterielColor (data, type = false) {
      const send = ['da/cxwlys', data]
      return type ? req(...send) : reqMask(...send)
    },
    addMaterielColor (data) {
      return reqMask('da/tjwlys', data)
    },
    updateMaterielColor (data) {
      return reqMask('da/xgwlys', data)
    },
    delMaterielColor (data) {
      return reqMask('da/scwlys', data)
    }
  }
}
