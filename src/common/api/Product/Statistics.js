export default ({ req, reqMask }) => {
  return {
    getSalesCustomer (data) {
      return req('cp/cxxskh', data)
    },
    getMultipleSizeMultiplePrices (data) {
      return reqMask('cp/dmdjlr', data)
    },
    // 条码查看
    getTicketView (data) {
      return reqMask('cp/cxtmck', data)
    },
    // 产品仓库
    getProductStore (data) {
      return reqMask('cp/cxcpck', data)
    },
    getProductStore_cmhxck (data) {
      return reqMask('cp/cxcmhxck', data)
    },
    getProductStore_zsck (data) {
      return reqMask('cp/cxzsck', data)
    },
    getProductStore_shck (data) {
      return reqMask('cp/cxshck', data)
    },
    updateProductStore_qcslwldk (data) {
      return reqMask('cp/qcslwldk', data)
    },
    getProductStore_scpdd (data) {
      return reqMask('cp/scpdd', data)
    },
    updateProductStore_qkck (data) {
      return reqMask('cp/qkck', data)
    },
    // 产品记录统计
    getProductRecord_xstj (data) {
      return reqMask('cp/cxxstj', data)
    },
    getProductRecord_rktj (data) {
      return reqMask('cp/cxrktj', data)
    },
    getProductRecord_pdtj (data) {
      return reqMask('cp/cxpdtj', data)
    },
    // -----------------------------------------
    getProductCheckStatistics (data) {
      return reqMask('cp/cxcppdtj', data)
    },
    getProductAllotStatistics (data) {
      return reqMask('cp/cxcptbtj', data)
    },
    getProductEnterStatistics (data) {
      return reqMask('cp/cxcprktj', data)
    },
    getProductInventoryAdjustStatistics (data) {
      return reqMask('cp/cxkctztj', data)
    },
    getProductOrderStatistics (data) {
      return reqMask('cp/cxxsddtj', data)
    },
    getProductPurchaseStatistics (data) {
      return reqMask('cp/cxcpcgtj', data)
    },
    getProductReturnStatistics (data) {
      return reqMask('cp/cxcpthtj', data)
    },
    getProductSalesBillingStatistics (data) {
      return reqMask('cp/cxxskdtj', data)
    },
    getProductSalesReturnStatistics (data) {
      return reqMask('cp/cxxsthtj', data)
    },
    getProductShipmentsStatistics (data) {
      return reqMask('cp/cxxsfhtj', data)
    },
    getProductPurchaseDelivery (data) {
      return reqMask('cp/cxcpcglhqk', data)
    },
    // 订单发货情况
    getOrderShipments_khdd (data) {
      return reqMask('cp/cxkhddqkb', data)
    },
    getOrderShipments_ddfhmx (data) {
      return reqMask('cp/cxddfhmxqk', data)
    },
    getOrderShipments_fhd (data) {
      return reqMask('cp/cxfhd', data)
    },
    getOrderShipments_ddfhcmxs (data) {
      return reqMask('cp/cxddfhqkcmxs', data)
    },
    getTicketShipments (data) {
      return reqMask('cp/cxtmfhqk', data)
    },
    // 产品档位查询
    getProductStallQuery_ckdwmx (data) {
      return reqMask('cp/cxckdwmx', data)
    },
    getProductStallQuery_ckdwhz (data) {
      return reqMask('cp/cxckdwhz', data)
    },
    /* updateProductStallQuery_ckdwhz (data) {
      return reqMask('cp/cxckdwmx', data)
    }, */
    getCustomerSales (data) {
      return reqMask('cp/cxkhxsqk', data)
    },
    getProductRecycleBin (data) {
      return reqMask('cp/cxcphsz', data)
    },
    getProductNewStyleQuery (data) {
      return reqMask('cp/cxcpxkcx', data)
    },
    getLastSalesTime (data) {
      return reqMask('cp/cxzhxssj', data)
    },
    getProductActivityTable (data) {
      return reqMask('cp/cxcphdb', data)
    },
    getProductTicketActivityTable (data) {
      return reqMask('cp/cxcptmhdb', data)
    }
  }
}
