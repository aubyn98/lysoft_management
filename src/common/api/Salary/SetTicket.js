export default ({ req, reqMask }) => {
  return {
    getTicket (data) {
      return reqMask('gz/cxgpsz', data)
    },
    getTicketQuery (data) {
      return reqMask('gz/cxgpcx', data)
    },
    getTicketBedNum (data) {
      return req('gz/cxgpszchByck', data)
    },
    getTicketProcess (data) {
      return req('gz/cxgpszgxBych', data)
    },
    getProcessByTicket (data) {
      return reqMask('gz/cxglgx', data)
    },
    updateProcessByTicket (data) {
      return reqMask('gz/xgglgx', data)
    },
    update_pk_SetTicket (data) {
      return reqMask('gz/wczpk', data)
    },
    invalid_cz_SetTicket (data) {
      return reqMask('gz/czzf', data)
    },
    invalid_cdgx_SetTicket (data) {
      return reqMask('gz/cdgxzf', data)
    },
    invalid_cgx_SetTicket (data) {
      return reqMask('gz/cgxzf', data)
    },
    invalid_czwsgx_SetTicket (data) {
      return reqMask('gz/zfczwsgx', data)
    },
    invalid_wsgx_SetTicket (data) {
      return reqMask('gz/yjzfwsgx', data)
    },
    clear_czjhxx_SetTicket (data) {
      return reqMask('gz/qcczjhxx', data)
    },
    clear_dqgxxx_SetTicket (data) {
      return reqMask('gz/scdqgxxx', data)
    },
    update_czsl_SetTicket (data) {
      return reqMask('gz/xgczsl', data)
    },
    update_jhsl_SetTicket (data) {
      return reqMask('gz/xgjhsl', data)
    },
    update_gxsl_SetTicket (data) {
      return reqMask('gz/xggxsl', data)
    },
    update_cgxwjsl_SetTicket (data) {
      return reqMask('gz/xgcgxwjsl', data)
    },
    update_jhrq_SetTicket (data) {
      return reqMask('gz/xgjhrq', data)
    },
    update_cj_SetTicket (data) {
      return reqMask('gz/gpszcj', data)
    },
    update_qxcj_SetTicket (data) {
      return reqMask('gz/gpszqxcj', data)
    }
  }
}
