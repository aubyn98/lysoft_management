export default ({ req, reqMask }) => {
  return {
    getBalanceSheet (data) {
      return reqMask('cwkj/zcfzb', data)
    },
    getProfitStatement (data) {
      return reqMask('cwkj/lrb', data)
    }
  }
}
