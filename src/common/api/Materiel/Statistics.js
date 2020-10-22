export default ({ req, reqMask }) => {
  return {
    getMaterialPurchaseStatistics (data) {
      return reqMask('wljxc/cxwlcgtj', data)
    },
    getMaterialEnterStatistics (data) {
      return reqMask('wljxc/cxwlrktj', data)
    },
    getMaterialReturnStatistics (data) {
      return reqMask('wljxc/cxwlthtj', data)
    },
    getMaterialSalesBillingStatistics (data) {
      return reqMask('wljxc/cxwlxskdtj', data)
    },
    getMaterialSalesReturnStatistics (data) {
      return reqMask('wljxc/cxwlxsthtj', data)
    },
    getMaterialCheckStatistics (data) {
      return reqMask('wljxc/cxwlpdtj', data)
    }
  }
}
