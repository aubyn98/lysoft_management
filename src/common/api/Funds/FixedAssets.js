export default ({ req, reqMask }) => {
  return {
    getFixedAssets (data) {
      return reqMask('cwkj/cxgdzc', data)
    },
    addFixedAssets (data) {
      return reqMask('cwkj/tjgdzc', data)
    },
    updateFixedAssets (data) {
      return reqMask('cwkj/xggdzc', data)
    },
    getFixedAssetsByDh (data) {
      return reqMask('cwkj/cxgdzcBydh', data)
    },
    delFixedAssets (data) {
      return reqMask('cwkj/scgdzc', data)
    }
  }
}
