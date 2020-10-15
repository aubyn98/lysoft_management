export default ({ req, reqMask }) => {
  return {
    // 备忘录
    getMemorandum (data, type = false) {
      const send = ['da/cxkhbwl', data]
      return type ? req(...send) : reqMask(...send)
    },
    addMemorandum (data) {
      return reqMask('da/tjkhbwl', data)
    },
    updateMemorandum (data) {
      return reqMask('da/xgkhbwl', data)
    },
    delMemorandum (data) {
      return reqMask('da/sckhbwl', data)
    }
  }
}
