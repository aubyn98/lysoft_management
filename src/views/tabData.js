const sourceTree = {
  Record: {
    label: '基础档案',
    icon: 'el-icon-folder-opened',
    children: {
      Customer: {
        label: '客户档案',
        closable: true
      },
      Vendor: {
        label: '供货商档案',
        closable: true
      },
      Materiel: {
        label: '物料档案',
        closable: true
      },
      other: {
        label: '其他档案',
        icon: 'el-icon-folder',
        children: {
          Color: {
            label: '颜色档案',
            closable: true
          },
          MaterielColor: {
            label: '物料颜色',
            closable: true
          },
          MaterielConstituent: {
            label: '物料成分',
            closable: true
          },
          MaterielSpec: {
            label: '物料规格',
            closable: true
          }
        }
      }
    }
  },
  Materiel: {
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
      MaterielPurchase: {
        label: '物料采购',
        closable: true
      },
      MaterielEnterStore: {
        label: '物料入库',
        closable: true
      },
      MaterielReturn: {
        label: '物料退货',
        closable: true
      },
      MaterielSalesBilling: {
        label: '物料销售开单',
        closable: true
      },
      MaterielSalesReturn: {
        label: '物料销售退货',
        closable: true
      },
      MaterielCheck: {
        label: '物料盘点',
        closable: true
      },
      MaterialOrderDelivery: {
        label: '物料订单发货情况',
        closable: true
      },
      MaterielPurchaseDelivery: {
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
      MaterielReconciliation: {
        label: '物料对账表',
        closable: true
      }
    }
  }
}
function getTab (source) {
  return Object.keys(source).reduce((t, d) => {
    const tempData = source[d]
    if (tempData.children) {
      return { ...t, ...getTab(tempData.children) }
    } else {
      return { ...t, [d]: tempData }
    }
  }, {})
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

export const tabs = getTab(sourceTree)
export const menus = getMenus(sourceTree)
