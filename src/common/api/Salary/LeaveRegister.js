export default ({ req, reqMask }) => {
  return {
    getLeaveRegister (data) {
      return reqMask('gz/cxqjdj', data)
    },
    addLeaveRegister (data) {
      return reqMask('gz/tjqjdj', data)
    },
    updateLeaveRegister (data) {
      return reqMask('gz/xgqjdj', data)
    },
    getLeaveRegisterByDh (data) {
      return reqMask('gz/cxqjdjBydh', data)
    },
    delLeaveRegister (data) {
      return reqMask('gz/scqjdj', data)
    }
  }
}
