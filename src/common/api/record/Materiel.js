export default ({ req, reqMask }) => {
  return {
    getMateriel (data, type = false) {
      const send = ['da/cxwlda', data]
      return type ? req(...send) : reqMask(...send)
    },
    getMaterielAlarm (data) {
      return reqMask('da/cxwlbjsz', data)
    },
    getMaterielType (data) {
      return req('index/cxwllx', data)
    },
    updateMaterielAlarm (data) {
      return reqMask('da/xgwlbjsz', data)
    },
    addMateriel (data) {
      return reqMask('da/tjwlda', data)
    },
    updateMateriel (data) {
      return reqMask('da/xgwlda', data)
    },
    delMateriel (data) {
      return reqMask('da/scwlda', data)
    },
    addMaterielys (data) {
      return reqMask('da/tjwldays', data)
    },
    addMaterielsh (data) {
      return reqMask('da/tjwldash', data)
    },
    addMaterielgg (data) {
      return reqMask('da/tjwldagg', data)
    },
    addMaterielcf (data) {
      return reqMask('da/tjwldacf', data)
    },
    delMaterielys (data) {
      return reqMask('da/scwldays', data)
    },
    delMaterielsh (data) {
      return reqMask('da/scwldash', data)
    },
    delMaterielgg (data) {
      return reqMask('da/scwldagg', data)
    },
    delMaterielcf (data) {
      return reqMask('da/scwldacf', data)
    }
  }
}
