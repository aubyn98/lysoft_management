export default ({ req, reqMask }) => {
  return {
    getMaterial (data, type = false) {
      const send = ['da/cxwlda', data]
      return type ? req(...send) : reqMask(...send)
    },
    getMaterialAlarm (data) {
      return reqMask('da/cxwlbjsz', data)
    },
    updateMaterialAlarm (data) {
      return reqMask('da/xgwlbjsz', data)
    },
    addMaterial (data) {
      return reqMask('da/tjwlda', data)
    },
    updateMaterial (data) {
      return reqMask('da/xgwlda', data)
    },
    delMaterial (data) {
      return reqMask('da/scwlda', data)
    },
    addMaterialys (data) {
      return reqMask('da/tjwldays', data)
    },
    addMaterialsh (data) {
      return reqMask('da/tjwldash', data)
    },
    addMaterialgg (data) {
      return reqMask('da/tjwldagg', data)
    },
    addMaterialcf (data) {
      return reqMask('da/tjwldacf', data)
    },
    delMaterialys (data) {
      return reqMask('da/scwldays', data)
    },
    delMaterialsh (data) {
      return reqMask('da/scwldash', data)
    },
    delMaterialgg (data) {
      return reqMask('da/scwldagg', data)
    },
    delMaterialcf (data) {
      return reqMask('da/scwldacf', data)
    },
    // 物料类型
    getMaterialType (data) {
      return req('index/cxwllx', data)
    },
    addMaterialType (data) {
      return reqMask('index/tjwllx', data)
    },
    updateMaterialType (data) {
      return reqMask('index/xgwllx', data)
    },
    delMaterialType (data) {
      return reqMask('index/scwllx', data)
    }
  }
}
