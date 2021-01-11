export default ({ req, reqMask }) => {
  return {
    getGeneratesTicket (data) {
      return reqMask('gz/cxscgp', data)
    },
    getGeneratesTicketByDh (data) {
      return reqMask('gz/cxgpjlBydh', data)
    },
    getGeneratesTicketByXh (data) {
      return reqMask('gz/cxgpmxBydh', data)
    },
    addGeneratesTicket (data) {
      return reqMask('gz/tjscgp', data)
    },
    updateGeneratesTicket (data) {
      return reqMask('gz/xgscgp', data)
    },
    delGeneratesTicket (data) {
      return reqMask('gz/scscgp', data)
    },
    statementGeneratesTicket (data) {
      return reqMask('gz/scgpjd', data)
    },
    examineGeneratesTicket (data) {
      return reqMask('gz/scgpsh', data)
    },
    getQuoteCutBedOrder (data) {
      return reqMask('gz/cxyyccd', data)
    }
  }
}
