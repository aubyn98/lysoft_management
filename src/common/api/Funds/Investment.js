export default ({ req, reqMask }) => {
  return {
    getInvestment (data) {
      return reqMask('cwkj/cxtz', data)
    },
    addInvestment (data) {
      return reqMask('cwkj/tjtz', data)
    },
    updateInvestment (data) {
      return reqMask('cwkj/xgtz', data)
    },
    getInvestmentByDh (data) {
      return reqMask('cwkj/cxtzBydh', data)
    },
    delInvestment (data) {
      return reqMask('cwkj/sctz', data)
    }
  }
}
