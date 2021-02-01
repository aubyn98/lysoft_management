export default ({ req, reqMask }) => {
  return {
    getProductEnterStore (data) {
      return reqMask('cp/cxcprk', data)
    },
    addProductEnterStore (data) {
      return reqMask('cp/tjcprk', data)
    },
    updateProductEnterStore (data) {
      return reqMask('cp/xgcprk', data)
    },
    delProductEnterStore (data) {
      return reqMask('cp/sccprk', data)
    },
    nullifyProductEnterStore (data) {
      return reqMask('cp/cprkch', data)
    },
    examineProductEnterStore (data) {
      return reqMask('cp/cprksh', data)
    },
    getProductEnterStoreByDh (data) {
      return reqMask('cp/cxcprkBydh', data)
    },
    getQuoteProductPurchase (data) {
      return reqMask('cp/cxcprkyydj', data)
    },
    getProductEnterStoreVendor (data) {
      return reqMask('cp/cxcprkghs', data)
    }
  }
}
