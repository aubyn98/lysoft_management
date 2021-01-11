export default ({ req, reqMask }) => {
  return {
    getProductionRegister (data) {
      return reqMask('gz/cxcldj', data)
    },
    addProductionRegister (data) {
      return reqMask('gz/tjcldj', data)
    },
    updateProductionRegister (data) {
      return reqMask('gz/xgcldj', data)
    },
    delProductionRegister (data) {
      return reqMask('gz/sccldj', data)
    },
    getProductionRegisterFashion (data) {
      return req('index/cxcldjkh', data)
    },
    getFashionSize (data) {
      return req('index/cxksms', data)
    },
    getFashionProcess (data) {
      return req('index/cxksgx', data)
    },
    getFashionColor (data) {
      return req('index/cxksys', data)
    },
    scanTicket (data) {
      return reqMask('gz/gpsmjhdj', data)
    }
  }
}
