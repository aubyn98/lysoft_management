/*eslint-disable */
const sourceTree = {
  Record: {
    label: '基础档案',
    icon: 'el-icon-folder-opened',
    children: {
      Customer: {
        label: '客户档案',
        closable: true,
        dialog: true
      },
      Vendor: {
        label: '供货商档案',
        closable: true,
        dialog: true
      },
      Material: {
        label: '物料档案',
        closable: true,
        dialog: true
      },
      Company: {
        label: '公司档案',
        closable: true,
        dialog: true
      },
      other: {
        label: '其他档案',
        icon: 'el-icon-folder',
        children: {
          Color: {
            label: '颜色档案',
            closable: true,
            dialog: true
          },
          MaterialColor: {
            label: '物料颜色',
            closable: true,
            dialog: true
          },
          MaterialConstituent: {
            label: '物料成分',
            closable: true,
            dialog: true
          },
          MaterialSpec: {
            label: '物料规格',
            closable: true,
            dialog: true
          }
        }
      },
      User: {
        label: '用户管理',
        closable: true
      }
    }
  },
  Material: {
    label: '物料',
    icon: 'el-icon-box',
    children: {
      MaterialStatistics: {
        label: '物料统计',
        icon: 'el-icon-tickets',
        children: {
          MaterialPurchaseStatistics: {
            label: '物料采购统计',
            closable: true
          },
          MaterialEnterStatistics: {
            label: '物料入库统计',
            closable: true
          },
          MaterialReturnStatistics: {
            label: '物料退货统计',
            closable: true
          },
          MaterialSalesBillingStatistics: {
            label: '物料销售开单统计',
            closable: true
          },
          MaterialSalesReturnStatistics: {
            label: '物料销售退货统计',
            closable: true
          },
          MaterialCheckStatistics: {
            label: '物料盘点统计',
            closable: true
          }
        }
      },
      MaterialPurchase: {
        label: '物料采购',
        closable: true
      },
      MaterialEnterStore: {
        label: '物料入库',
        closable: true
      },
      MaterialReturn: {
        label: '物料退货',
        closable: true
      },
      MaterialSalesBilling: {
        label: '物料销售开单',
        closable: true
      },
      MaterialSalesReturn: {
        label: '物料销售退货',
        closable: true
      },
      MaterialCheck: {
        label: '物料盘点',
        closable: true
      },
      MaterialOrderDelivery: {
        label: '物料订单发货情况',
        closable: true
      },
      MaterialPurchaseDelivery: {
        label: '物料采购来货情况',
        closable: true
      },
      MaterialActivityTable: {
        label: '物料活动表',
        closable: true
      }
    }
  },
  Finance: {
    label: '资金',
    icon: 'el-icon-s-finance',
    children: {
      CompanyExpenses: {
        label: '公司开支',
        closable: true
      },
      CapitaFlow: {
        label: '资金往来',
        closable: true
      },
      MonthlyStatusTable: {
        label: '月状况表',
        closable: true
      },
      CashBankReconciliation: {
        label: '现金银行对账表',
        closable: true
      },
      SalesReconciliation: {
        label: '销售对账表',
        closable: true
      },
      MaterialReconciliation: {
        label: '物料对账表',
        closable: true
      }
    }
  }
}
function getTreeData (source) {
  const tabs = {}
  const labelDict = {}
  const keyDict = {}
  const menus = []
  const stack = [source]
  while (stack.length > 0) {
    const pop = stack.pop()
    Object.keys(pop).forEach(d => {
      const temp = pop[d]
      const { children, closable, ...res } = temp
      const item = { ...res, index: d }
      if (children) {
        item.children = []
        Object.keys(children).forEach(c => (children[c].parent = item))
        stack.push(children)
      } else {
        tabs[d] = temp
        keyDict[d] = temp.label
        labelDict[temp.label] = d
      }
      if (temp.parent) {
        temp.parent.children.push(item)
      } else {
        menus.push(item)
      }
    })
  }
  return {
    tabs,
    menus,
    keyDict,
    labelDict
  }
}
/* function getTreeData2 (source) {
  const tabs = {}
  const labelDict = {}
  const keyDict = {}
  const stack = [source]
  while (stack.length > 0) {
    const pop = stack.pop()
    Object.keys(pop).forEach(d => {
      const temp = pop[d]
      const { children } = temp
      if (children) {
        stack.push(children)
      } else {
        tabs[d] = temp
        keyDict[d] = temp.label
        labelDict[temp.label] = d
      }
    })
  }
  return {
    tabs,
    keyDict,
    labelDict
  }
}
function getMenus (source) {
  return Object.keys(source).reduce((t, d) => {
    const { children, closable, ...res } = source[d]
    if (children) {
      t.push({ ...res, index: d, children: getMenus(children) })
    } else {
      t.push({ ...res, index: d })
    }
    return t
  }, [])
}
function getTabs (source) {
  return Object.keys(source).reduce((t, d) => {
    const tempData = source[d]
    if (tempData.children) {
      return { ...t, ...getTabs(tempData.children) }
    } else {
      return { ...t, [d]: tempData }
    }
  }, {})
}
function getLabelDict (source) {
  return Object.keys(source).reduce((t, d) => {
    const tempData = source[d]
    if (tempData.children) {
      return { ...t, ...getLabelDict(tempData.children) }
    } else {
      return { ...t, [tempData.label]: d }
    }
  }, {})
}
function getKeyDict (source) {
  return Object.keys(source).reduce((t, d) => {
    const tempData = source[d]
    if (tempData.children) {
      return { ...t, ...getKeyDict(tempData.children) }
    } else {
      return { ...t, [d]: tempData.label }
    }
  }, {})
} */

export const { tabs, menus, keyDict, labelDict } = getTreeData(sourceTree)
