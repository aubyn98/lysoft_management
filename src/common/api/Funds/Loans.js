export default ({ req, reqMask }) => {
  return {
    getLoans (data) {
      return reqMask('cwkj/cxjdk', data)
    },
    addLoans (data) {
      return reqMask('cwkj/tjjdk', data)
    },
    updateLoans (data) {
      return reqMask('cwkj/xgjdk', data)
    },
    getLoansByDh (data) {
      return reqMask('cwkj/cxjdkBydh', data)
    },
    delLoans (data) {
      return reqMask('cwkj/scjdk', data)
    }
  }
}
