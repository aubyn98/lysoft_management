export default ({ req, reqMask }) => {
  return {
    getSalesPriceAlarmTip (data) {
      return reqMask('cp/cxxsjbjts', data)
    },
    updateProductReturn (data) {
      return reqMask('cp/xgxsjbjts', data)
    }
  }
}
