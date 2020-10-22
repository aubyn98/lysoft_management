export default ({ req, reqMask }) => {
  return {
    getMonthlyStatusTable (data) {
      return reqMask('cw/cxyzk', data)
    },
    getCashBankReconciliation (data) {
      return reqMask('cw/cxxjyhdzb', data)
    }
  }
}
