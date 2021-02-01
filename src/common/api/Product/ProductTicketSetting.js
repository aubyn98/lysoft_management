export default ({ req, reqMask }) => {
  return {
    getProductTicketSetting (data) {
      return reqMask('cp/cxcptmsz', data)
    },
    disassembleTicket (data) {
      return reqMask('cp/tmcj', data)
    },
    nullifyTicket (data) {
      return reqMask('cp/zftm', data)
    },
    cancelNullifyTicket (data) {
      return reqMask('cp/qxzftm', data)
    },
    getCheckGoodsTicket (data) {
      return reqMask('cp/cxhwtmpd', data)
    },
    filterCheckGoodsTicket (data) {
      return reqMask('cp/cxhwtmpdgl', data)
    },
    nullifyCheckGoodsTicket (data) {
      return reqMask('cp/hwtmpdzf', data)
    }
  }
}
