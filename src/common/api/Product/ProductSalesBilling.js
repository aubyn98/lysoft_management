export default ({ req, reqMask }) => {
  return {
    getProductSalesBilling (data) {
      return reqMask('cp/cxxskd', data)
    },
    addProductSalesBilling (data) {
      return reqMask('cp/tjxskd', data)
    },
    updateProductSalesBilling (data) {
      return reqMask('cp/xgxskd', data)
    },
    delProductSalesBilling (data) {
      return reqMask('cp/scxskd', data)
    },
    nullifyProductSalesBilling (data) {
      return reqMask('cp/xskdch', data)
    },
    examineProductSalesBilling (data) {
      return reqMask('cp/xskdsh', data)
    },
    getProductSalesBillingByDh (data) {
      return reqMask('cp/cxxskdBydh', data)
    },
    getQuoteProductSalesBilling (data) {
      return reqMask('cp/cxxskdyydj', data)
    },
    getProductSalesBillingCustomer (data) {
      return reqMask('cp/cxxskdkh', data)
    },
    getQuoteProductShipments (data) {
      return reqMask('cp/cxxskdyyxsfh', data)
    }
  }
}
