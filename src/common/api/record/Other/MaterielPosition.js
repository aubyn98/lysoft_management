export default ({ req, reqMask }) => {
  return {
    getMaterialPosition (data, type = false) {
      const send = ['index/cxwlylbw', data]
      return type ? req(...send) : reqMask(...send)
    },
    addMaterialPosition (data) {
      return reqMask('index/tjwlylbw', data)
    },
    updateMaterialPosition (data) {
      return reqMask('index/xgwlylbw', data)
    },
    delMaterialPosition (data) {
      return reqMask('index/scwlylbw', data)
    }
  }
}
