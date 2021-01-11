export default ({ req, reqMask }) => {
  return {
    getPrizeBuckleRegister (data) {
      return reqMask('gz/cxjkdj', data)
    },
    addPrizeBuckleRegister (data) {
      return reqMask('gz/tjjkdj', data)
    },
    updatePrizeBuckleRegister (data) {
      return reqMask('gz/xgjkdj', data)
    },
    getPrizeBuckleRegisterByDh (data) {
      return reqMask('gz/cxjkdjBydh', data)
    },
    delPrizeBuckleRegister (data) {
      return reqMask('gz/scjkdj', data)
    }
  }
}
