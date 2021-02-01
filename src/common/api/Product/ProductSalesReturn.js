export default ({ req, reqMask }) => {
  return {
    getProductSalesReturn (data) {
      return reqMask('cp/cxxsth', data)
    },
    addProductSalesReturn (data) {
      return reqMask('cp/tjxsth', data)
    },
    updateProductSalesReturn (data) {
      return reqMask('cp/xgxsth', data)
    },
    delProductSalesReturn (data) {
      return reqMask('cp/scxsth', data)
    },
    nullifyProductSalesReturn (data) {
      return reqMask('cp/xsthch', data)
    },
    examineProductSalesReturn (data) {
      return reqMask('cp/xsthsh', data)
    },
    getProductSalesReturnByDh (data) {
      return reqMask('cp/cxxsthBydh', data)
    },
    getQuoteProductSalesReturn (data) {
      return reqMask('cp/cxxsthyydj', data)
    },
    getProductSalesReturnCustomer (data) {
      return reqMask('cp/cxxsthghs', data)
    },
    getQuoteProductCheckEnter (data) {
      return reqMask('cp/cxxsthyycppdrk', data)
    }
  }
}
