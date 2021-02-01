export default ({ req, reqMask }) => {
  return {
    getProductInventoryAdjust (data) {
      return reqMask('cp/cxkctz', data)
    },
    addProductInventoryAdjust (data) {
      return reqMask('cp/tjkctz', data)
    }
  }
}
