export default ({ req, reqMask }) => {
  return {
    getMonthlyStatusTable (data) {
      return reqMask('cw/cxyzk', data)
    },
    getCashBankReconciliation () {
      return reqMask('cw/cxyhzh')
    },
    getCashBankReconciliationDetail (data) {
      return reqMask('cw/cxxjyhdzb', data)
    },
    getSalesReconciliation (data) {
      return reqMask('cw/cxxsdzb', data)
    },
    getMaterialReconciliationPurchase (data) {
      return reqMask('cw/cxwlcgdzb', data)
    },
    getMaterialReconciliationMachining (data) {
      return reqMask('cw/cxwljgdzb', data)
    },
    // 公司开支
    getCompanyExpensesList (data) {
      return reqMask('cw/cxgskz', data)
    },
    getCompanyExpensesListDetail (data) {
      return reqMask('cw/cxgskzMx', data)
    },
    examineCompanyExpenses (data) {
      return reqMask('cw/xggskzsh', data)
    },
    nullifyCompanyExpenses (data) {
      return reqMask('cw/xggskzch', data)
    },
    addCompanyExpenses (data) {
      return reqMask('cw/tjgskz', data)
    },
    updateCompanyExpenses (data) {
      return reqMask('cw/xggskz', data)
    },
    delCompanyExpenses (data) {
      return reqMask('cw/scgskz', data)
    },
    getCompanyExpensesByDh (data) {
      return req('cw/cxgskzBydh', data)
    },
    getExpenditure (data) {
      return req('index/cxkzmc', data)
    },
    // 资金往来
    getCapitaFlow_khmc (data) {
      return reqMask('cw/cxzjwlkhBybh', data)
    },
    getCapitaFlow_jgsmc (data) {
      return reqMask('cw/cxzjwljgsBybh', data)
    },
    getCapitaFlow_ghsmc (data) {
      return reqMask('cw/cxzjwlghsBybh', data)
    },
    getCapitaFlow (data) {
      return reqMask('cw/cxzjwl', data)
    },
    addCapitaFlowCustomer (data) {
      return reqMask('cw/tjzjwlkhlk', data)
    },
    updateCapitaFlow (data) {
      return reqMask('cw/xgzjwl', data)
    },
    delCapitaFlow (data) {
      return reqMask('cw/sczjwl', data)
    },
    addCapitaFlowVendor (data) {
      return reqMask('cw/tjzjwlghshk', data)
    },
    addCapitaFlowConverter (data) {
      return reqMask('cw/tjzjwljgshk', data)
    },
    examineCapitaFlow (data) {
      return reqMask('cw/xgzjwlsh', data)
    },
    nullifyCapitaFlow (data) {
      return reqMask('cw/xgzjwlch', data)
    }
  }
}
