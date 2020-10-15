export default ({ req }) => {
  return {
    getProvince (data) {
      return req('index/cxsf', data)
    },
    getCityProper (data) {
      return req('index/cxsq', data)
    },
    getCounty (data) {
      return req('index/cxxq', data)
    }
  }
}
