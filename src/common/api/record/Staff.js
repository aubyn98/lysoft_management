export default ({ req, reqMask }) => {
  return {
    // 客户
    getStaff (data, type = false) {
      const send = ['da/cxygda', data]
      return type ? req(...send) : reqMask(...send)
    },
    addStaff (data) {
      return reqMask('da/tjygda', data)
    },
    updateStaff (data) {
      return reqMask('da/xgygda', data)
    },
    delStaff (data) {
      return reqMask('da/scygda', data)
    },
    getStaffByTz (data) {
      return reqMask('da/cxtzlbda', data)
    }
  }
}
