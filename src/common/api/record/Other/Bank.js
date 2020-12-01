export default ({ req, reqMask }) => {
  return {
    getBank (data, type = false) {
      const send = ['da/cxyhda', data]
      return type ? req(...send) : reqMask(...send)
    },
    addBank (data) {
      return reqMask('da/tjyhda', data)
    },
    updateBank (data) {
      return reqMask('da/xgyhda', data)
    },
    delBank (data) {
      return reqMask('da/scyhda', data)
    }
  }
}
