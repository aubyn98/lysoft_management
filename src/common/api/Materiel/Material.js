export default ({ req, reqMask }) => {
  return {
    getComer (data) {
      return req('index/cxlhs', data)
    },
    // 物料订单发货情况
    getMaterialOrderDelivery (data) {
      return reqMask('wljxc/cxwlddfhqk', data)
    },
    // 物料采购来货情况
    getMaterialPurchaseDelivery (data) {
      return reqMask('wljxc/cxwlcglhqk', data)
    },
    // 物料活动表
    getMaterialActivityTable (data) {
      return reqMask('wljxc/cxwlhdb', data)
    },
    // 物料采购
    getMaterialPurchase (data) {
      return reqMask('wljxc/cxwlcg', data)
    },
    getMaterialPurchaseByDh (data) {
      return reqMask('wljxc/cxwlcgBydh', data)
    },
    addMaterialPurchase (data) {
      return reqMask('wljxc/tjwlcg', data)
    },
    updateMaterialPurchase (data) {
      return reqMask('wljxc/xgwlcg', data)
    },
    delMaterialPurchase (data) {
      return reqMask('wljxc/scwlcg', data)
    },
    statementMaterialPurchase (data) {
      return reqMask('wljxc/xgwlcgjd', data)
    },
    copyMaterialPurchase (data) {
      return reqMask('wljxc/wlcgfzcd', data)
    },
    // 物料入库
    getMaterialEnterStoreVendor (data) {
      return req('wljxc/cxwlrkghs', data)
    },
    getMaterialEnterStore (data) {
      return reqMask('wljxc/cxwlrk', data)
    },
    addMaterialEnterStore (data) {
      return reqMask('wljxc/tjwlrk', data)
    },
    updateMaterialEnterStore (data) {
      return reqMask('wljxc/xgwlrk', data)
    },
    delMaterialEnterStore (data) {
      return reqMask('wljxc/scwlrk', data)
    },
    getMaterialEnterStoreByDh (data) {
      return reqMask('wljxc/cxwlrkBydh', data)
    },
    nullifyMaterialEnterStore (data) {
      return reqMask('wljxc/xgwlrkch', data)
    },
    examineMaterialEnterStore (data) {
      return reqMask('wljxc/xgwlrksh', data)
    },
    getQuoteMaterialPurchase (data) {
      return reqMask('wljxc/cxwlrkyydj', data)
    },
    // 物料退货
    getMaterialReturn (data) {
      return reqMask('wljxc/cxwlth', data)
    },
    addMaterialReturn (data) {
      return reqMask('wljxc/tjwlth', data)
    },
    updateMaterialReturn (data) {
      return reqMask('wljxc/xgwlth', data)
    },
    delMaterialReturn (data) {
      return reqMask('wljxc/scwlth', data)
    },
    getMaterialReturnByDh (data) {
      return reqMask('wljxc/cxwlthBydh', data)
    },
    nullifyMaterialReturn (data) {
      return reqMask('wljxc/xgwlthch', data)
    },
    examineMaterialReturn (data) {
      return reqMask('wljxc/xgwlthsh', data)
    },
    // 物料销售开单
    getMaterialSalesBilling (data) {
      return reqMask('wljxc/cxwlxskd', data)
    },
    addMaterialSalesBilling (data) {
      return reqMask('wljxc/tjwlxskd', data)
    },
    updateMaterialSalesBilling (data) {
      return reqMask('wljxc/xgwlxskd', data)
    },
    delMaterialSalesBilling (data) {
      return reqMask('wljxc/scwlxskd', data)
    },
    getMaterialSalesBillingByDh (data) {
      return reqMask('wljxc/cxwlxskdBydh', data)
    },
    nullifyMaterialSalesBilling (data) {
      return reqMask('wljxc/xgwlxskdch', data)
    },
    examineMaterialSalesBilling (data) {
      return reqMask('wljxc/xgwlxskdsh', data)
    },
    getMaterialSalesBillingCustomer (data) {
      return reqMask('wljxc/cxwlxskdBybh', data)
    },
    // 物料销售退货
    getMaterialSalesReturn (data) {
      return reqMask('wljxc/cxwlxsth', data)
    },
    addMaterialSalesReturn (data) {
      return reqMask('wljxc/tjwlxsth', data)
    },
    updateMaterialSalesReturn (data) {
      return reqMask('wljxc/xgwlxsth', data)
    },
    delMaterialSalesReturn (data) {
      return reqMask('wljxc/scwlxsth', data)
    },
    getMaterialSalesReturnByDh (data) {
      return reqMask('wljxc/cxwlxsthBydh', data)
    },
    nullifyMaterialSalesReturn (data) {
      return reqMask('wljxc/xgwlxsthch', data)
    },
    examineMaterialSalesReturn (data) {
      return reqMask('wljxc/xgwlxsthsh', data)
    },
    getMaterialSalesReturnCustomer (data) {
      return reqMask('wljxc/cxwlxsthBybh', data)
    },
    // 物料盘点
    getMaterialCheck (data) {
      return reqMask('wljxc/cxwlpd', data)
    },
    addMaterialCheck (data) {
      return reqMask('wljxc/tjwlpd', data)
    },
    updateMaterialCheck (data) {
      return reqMask('wljxc/xgwlpd', data)
    },
    delMaterialCheck (data) {
      return reqMask('wljxc/scwlpd', data)
    },
    getMaterialCheckByDh (data) {
      return reqMask('wljxc/cxwlpdBydh', data)
    },
    examineMaterialCheck (data) {
      return reqMask('wljxc/xgwlpdsh', data)
    },
    // -----------------------
    bill_allAttach (msg, url, key) {
      return new Promise((resolve, reject) => {
        req(url, msg).then(data => {
          data.res = data.res.filter(it => it[key].includes(msg[key]))
          resolve(data)
        }).catch(e => {
          reject(e)
        })
      })
    },
    getMaterialSpec_Bill (msg) {
      return new Promise((resolve, reject) => {
        if (msg.wlbh && msg.wlmc) {
          req('da/cxwlda', msg).then(data => {
            if (data.res.length > 0 && data.res[0].gg.length > 0) {
              resolve({ res: data.res[0].gg.filter(it => it.gg.includes(msg.gg)) })
            } else {
              this.bill_allAttach(msg, 'da/cxwlgg', 'gg').then(res => {
                resolve(res)
              })
            }
          }).catch(e => {
            reject(e)
          })
        } else {
          this.bill_allAttach(msg, 'da/cxwlgg', 'gg').then(res => {
            resolve(res)
          })
        }
      })
    },
    getMaterialColor_Bill (msg) {
      return new Promise((resolve, reject) => {
        if (msg.wlbh && msg.wlmc) {
          req('da/cxwlda', msg).then(data => {
            if (data.res.length > 0 && data.res[0].ys.length > 0) {
              resolve({ res: data.res[0].ys.filter(it => it.ysmc.includes(msg.ysmc)) })
            } else {
              this.bill_allAttach(msg, 'da/cxwlys', 'ysmc').then(res => {
                resolve(res)
              })
            }
          }).catch(e => {
            reject(e)
          })
        } else {
          this.bill_allAttach(msg, 'da/cxwlys', 'ysmc').then(res => {
            resolve(res)
          })
        }
      })
    }
  }
}
