export default ({ req, reqMask }) => {
  return {
    getProductPurchase (data) {
      return reqMask('cp/cxcpcg', data)
    },
    addProductPurchase (data) {
      return reqMask('cp/tjcpcg', data)
    },
    updateProductPurchase (data) {
      return reqMask('cp/xgcpcg', data)
    },
    delProductPurchase (data) {
      return reqMask('cp/sccpcg', data)
    },
    statementProductPurchase (data) {
      return reqMask('cp/cpcgjd', data)
    },
    getProductPurchaseByDh (data) {
      return reqMask('cp/cxcpcgBydh', data)
    }
  }
}
