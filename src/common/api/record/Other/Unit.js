export default ({ req, reqMask }) => {
  return {
    getUnit (data, type = false) {
      const send = ['index/cxjldw', data]
      return type ? req(...send) : reqMask(...send)
    },
    addUnit (data) {
      return reqMask('index/tjjldw', data)
    },
    updateUnit (data) {
      return reqMask('index/xgjldw', data)
    },
    delUnit (data) {
      return reqMask('index/scjldw', data)
    }
  }
}
