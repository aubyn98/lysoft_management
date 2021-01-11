export default ({ req, reqMask }) => {
  return {
    getProductionConvergence (data) {
      return reqMask('gz/cxclhh', data)
    },
    getProductionConvergence2 (data) {
      return reqMask('gz/cxclhhxxxx', data)
    },
    addProductionConvergence (data) {
      return reqMask('gz/tjclhh', data)
    },
    updateProductionConvergence (data) {
      return reqMask('gz/xgclhh', data)
    },
    getProductionConvergenceByDh (data) {
      return reqMask('gz/cxclhhBydh', data)
    },
    delProductionConvergence (data) {
      return reqMask('gz/scclhh', data)
    }
  }
}
