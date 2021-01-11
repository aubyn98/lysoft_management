export default ({ req, reqMask }) => {
  return {
    // 客户
    getProcess (data, type = false) {
      const send = ['da/cxgxda', data]
      return type ? req(...send) : reqMask(...send)
    },
    addProcess (data) {
      return reqMask('da/tjgxda', data)
    },
    updateProcess (data) {
      return reqMask('da/xggxda', data)
    },
    delProcess (data) {
      return reqMask('da/scgxda', data)
    },
    getStaffByProcess (data) {
      return req('da/cxgxdaByxh', data)
    },
    changeProductionProcessWages (data) {
      return reqMask('da/gxsxzgxgj', data)
    }
  }
}
