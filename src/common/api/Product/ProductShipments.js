export default ({ req, reqMask }) => {
  return {
    getProductShipments (data) {
      return reqMask('cp/cxxsfh', data)
    },
    addProductShipments (data) {
      return reqMask('cp/tjxsfh', data)
    },
    updateProductShipments (data) {
      return reqMask('cp/xgxsfh', data)
    },
    delProductShipments (data) {
      return reqMask('cp/scxsfh', data)
    },
    nullifyProductShipments (data) {
      return reqMask('cp/xsfhch', data)
    },
    examineProductShipments (data) {
      return reqMask('cp/xsfhsh', data)
    },
    getProductShipmentsByDh (data) {
      return reqMask('cp/cxxsfhBydh', data)
    },
    getQuoteProductOrder (data) {
      return reqMask('cp/cxxsfhyydj', data)
    },
    getProductShipmentsCustomer (data) {
      return reqMask('cp/cxxsfhkh', data)
    }
  }
}
