export default ({ req, reqMask }) => {
  return {
    getDisbursementRegister (data) {
      return reqMask('gz/cxzkdj', data)
    },
    addDisbursementRegister (data) {
      return reqMask('gz/tjzkdj', data)
    },
    updateDisbursementRegister (data) {
      return reqMask('gz/xgzkdj', data)
    },
    getDisbursementRegisterByDh (data) {
      return reqMask('gz/cxzkdjBydh', data)
    },
    delDisbursementRegister (data) {
      return reqMask('gz/sczkdj', data)
    }
  }
}
