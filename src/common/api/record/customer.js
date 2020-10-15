export default ({ req, reqMask }) => {
  return {
    // 客户
    getCustomer (data, type = false) {
      const send = ['da/cxkhda', data]
      return type ? req(...send) : reqMask(...send)
    },
    addCustomer (data) {
      return reqMask('da/tjkhda', data)
    },
    updateCustomer (data) {
      return reqMask('da/xgkhda', data)
    },
    delCustomer (data) {
      return reqMask('da/sckhda', data)
    },
    // 品牌
    getKhPp (data) {
      return reqMask('da/cxkhpp', data)
    },
    addKhPp (data) {
      return reqMask('da/tjkhpp', data)
    },
    delKhPp (data) {
      return reqMask('da/sckhpp', data)
    },
    // 客户类型
    getCustomerType (data) {
      return req('index/cxkhlx', data)
    },
    addCustomerType (data) {
      return req('index/tjkhlx', data)
    },
    updateCustomerType (data) {
      return req('index/xgkhlx', data)
    },
    delCustomerType (data) {
      return req('index/sckhlx', data)
    },
    // 常用记录
    // 类型2
    getCustomerType2 () {
      return req('index/cxkhdalx')
    },
    // 信用级别
    getXyjb () {
      return req('index/cxkhxyjb')
    },
    // 质量档次
    getZldc () {
      return req('index/cxkhzldc')
    },
    // 经营规模
    getJygm () {
      return req('index/cxkhjygm')
    },
    // 客户代号
    getKhdh () {
      return req('index/cxkhdh')
    }
  }
}
