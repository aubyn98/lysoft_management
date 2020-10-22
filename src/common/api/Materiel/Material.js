export default ({ req, reqMask }) => {
  return {
    getMaterialOrderDelivery (data) {
      return reqMask('wljxc/cxwlddfhqk', data)
    },
    getMaterielPurchaseDelivery (data) {
      return reqMask('wljxc/cxwlcglhqk', data)
    },
    getMaterialActivityTable (data) {
      return reqMask('wljxc/cxwlhdb', data)
    }
  }
}
