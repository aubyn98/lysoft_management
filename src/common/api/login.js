export default ({ req, reqMask }) => {
  return {
    sign_in (data) {
      return reqMask('Login/login', data)
    },
    getAccountBooks (data) {
      return req('Login/cxzb', data)
    },
    logout (data) {
      return reqMask('Login/logout', data)
    },
    changePassword (data) {
      return reqMask('Login/xgmm', data)
    }
  }
}
