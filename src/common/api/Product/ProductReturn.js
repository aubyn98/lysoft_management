export default ({ req, reqMask }) => {
  return {
    getProductReturn (data) {
      return reqMask('cp/cxcpth', data)
    },
    addProductReturn (data) {
      return reqMask('cp/tjcpth', data)
    },
    updateProductReturn (data) {
      return reqMask('cp/xgcpth', data)
    },
    delProductReturn (data) {
      return reqMask('cp/sccpth', data)
    },
    examineProductReturn (data) {
      return reqMask('cp/cpthsh', data)
    },
    nullifyProductReturn (data) {
      return reqMask('cp/cpthch', data)
    },
    getProductReturnByDh (data) {
      return reqMask('cp/cxcpthBydh', data)
    }
  }
}
