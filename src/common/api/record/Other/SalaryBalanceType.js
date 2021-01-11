export default ({ req, reqMask }) => {
  return {
    getSalaryBalanceType (data, type = false) {
      const send = ['da/cxjsfsda', data]
      return type ? req(...send) : reqMask(...send)
    },
    addSalaryBalanceType (data) {
      return reqMask('da/tjjsfsda', data)
    },
    updateSalaryBalanceType (data) {
      return reqMask('da/xgjsfsda', data)
    },
    delSalaryBalanceType (data) {
      return reqMask('da/scjsfsda', data)
    }
  }
}
