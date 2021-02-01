export default ({ req, reqMask }) => {
  return {
    getProductOrder (data) {
      return reqMask('cp/cxxsdd', data)
    },
    addProductOrder (data) {
      return reqMask('cp/tjxsdd', data)
    },
    updateProductOrder (data) {
      return reqMask('cp/xgxsdd', data)
    },
    delProductOrder (data) {
      return reqMask('cp/scxsdd', data)
    },
    statementProductOrder (data) {
      return reqMask('cp/xsddjd', data)
    },
    getProductOrderByDh (data) {
      return reqMask('cp/cxxsddBydh', data)
    },
    getQuoteProductOrder (data) {
      return reqMask('cp/cxxsddyydj', data)
    },
    getProductOrderCustomer (data) {
      return reqMask('cp/cxxsddkh', data)
    }
  }
}
