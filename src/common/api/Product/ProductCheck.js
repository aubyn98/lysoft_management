export default ({ req, reqMask }) => {
  return {
    getProductCheck (data) {
      return reqMask('cp/cxcppd', data)
    },
    addProductCheck (data) {
      return reqMask('cp/tjcppd', data)
    },
    updateProductCheck (data) {
      return reqMask('cp/xgcppd', data)
    },
    delProductCheck (data) {
      return reqMask('cp/sccppd', data)
    },
    examineProductCheck (data) {
      return reqMask('cp/cppdsh', data)
    },
    getProductCheckByDh (data) {
      return reqMask('cp/cxcppdBydh', data)
    },
    getQuoteProductCheck (data) {
      return reqMask('cp/cxcppdyydj', data)
    }
  }
}
