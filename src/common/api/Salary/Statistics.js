export default ({ req, reqMask }) => {
  return {
    getPieceWage (data) {
      return reqMask('gz/cxjjgz', data)
    },
    getMonthlySalary (data) {
      return reqMask('gz/cxjygz', data)
    },
    getStaffOutputQuery (data) {
      return reqMask('gz/ygclcx', data)
    },
    getProductionStatement (data) {
      return reqMask('gz/cxsczkb', data)
    },
    getPieceHistory (data) {
      return reqMask('gz/cxjjgzls', data)
    },
    getMonthlyHistory (data) {
      return reqMask('gz/cxjygzls', data)
    },
    getTicketUnusualTable (data) {
      return reqMask('gz/cxgpycb', data)
    },
    getProductionStatistics (data) {
      return reqMask('gz/cxsctj', data)
    },
    getNoDeliveryNumStatistics (data) {
      return reqMask('gz/cxwjsl', data)
    },
    getRecycleCard (data) {
      return reqMask('gz/cxckhs', data)
    },
    getWagesAnalysis (data) {
      return reqMask('gz/cxgzfx', data)
    },
    getCuttingNumQuery (data) {
      return reqMask('gz/cxccmx', data)
    },
    getScanTicketQuery (data) {
      return reqMask('gz/cxgpsmjhcx', data)
    }
  }
}
