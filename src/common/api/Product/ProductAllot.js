export default ({ req, reqMask }) => {
  return {
    getProductAllot (data) {
      return reqMask('cp/cxcpdb', data)
    },
    addProductAllot (data) {
      return reqMask('cp/tjcpdb', data)
    },
    updateProductAllot (data) {
      return reqMask('cp/xgcpdb', data)
    },
    delProductAllot (data) {
      return reqMask('cp/sccpdb', data)
    },
    examineProductAllot (data) {
      return reqMask('cp/cpdbsh', data)
    },
    getProductAllotByDh (data) {
      return reqMask('cp/cxcpdbBydh', data)
    }
  }
}
