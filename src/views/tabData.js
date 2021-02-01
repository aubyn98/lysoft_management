/*eslint-disable */
const sourceTree = {
  Record: {
    label: "基础档案",
    icon: "el-icon-folder-opened",
    show: false,
    children: {
      Staff: {
        label: "员工档案",
        closable: true,
        dialog: true
      },
      Fashion: {
        label: "款式档案",
        closable: true,
        dialog: true
      },
      Customer: {
        label: "客户档案",
        closable: true,
        dialog: true
      },
      Vendor: {
        label: "供货商档案",
        closable: true,
        dialog: true
      },
      Processor: {
        label: "加工商档案",
        closable: true,
        dialog: true
      },
      Material: {
        label: "物料档案",
        closable: true,
        dialog: true
      },
      Company: {
        label: "公司档案",
        closable: true,
        dialog: true
      },
      /* ListOfFashionMaterials:{
        label: "款式用料清单",
        closable: true,
        dialog: true
      }, */
      other: {
        label: "其他档案",
        icon: "el-icon-folder",
        show: false,
        children: {
          Trademark: {
            label: "商标档案",
            closable: true,
            dialog: true
          },
          Color: {
            label: "颜色档案",
            closable: true,
            dialog: true
          },
          Size: {
            label: "尺码档案",
            closable: true,
            dialog: true
          },
          Gears: {
            label: "档位档案",
            closable: true,
            dialog: true
          },
          Process: {
            label: "工序档案",
            closable: true,
            dialog: true
          },
          MaterialColor: {
            label: "物料颜色",
            closable: true,
            dialog: true
          },
          MaterialConstituent: {
            label: "物料成分",
            closable: true,
            dialog: true
          },
          MaterialSpec: {
            label: "物料规格",
            closable: true,
            dialog: true
          },
          Department: {
            label: "部门档案",
            closable: true,
            dialog: true
          }
        }
      },
      User: {
        label: "用户管理",
        closable: true
      }
    }
  },
  Product:{
    label: "产品", // 36
    icon:'el-icon-shopping-bag-2',
    show: false,
    children: {
      ProductPurchase: {
        label: "产品采购",
        closable: true
      },
      ProductEnterStore: {
        label: "产品入库",
        closable: true
      },
      ProductReturn: {
        label: "产品退货",
        closable: true
      },
      ProductOrder: {
        label: "销售订单",
        closable: true
      },
      ProductShipments: {
        label: "销售发货",
        closable: true
      },
      ProductSalesBilling: {
        label: "销售开单",
        closable: true
      },
      ProductSalesReturn: {
        label: "销售退货",
        closable: true
      },
      ProductTicketSetting: {
        label: "产品条码设置",
        closable: true
      },
      TicketView: {
        label: "条码查看",
        closable: true
      },
      ProductStore: {
        label: "产品仓库",
        closable: true
      },
      ProductCheck: {
        label: "产品盘点",
        closable: true
      },
      ProductAllot: {
        label: "产品调拨",
        closable: true
      },
      ProductInventoryAdjust: {
        label: "库存调整",
        closable: true
      },
      ProductOffer: {
        label: "产品报价",
        closable: true
      },
      ProductRecordStatistics: {
        label: "产品记录统计",
        closable: true
      },
      ProductStatistics: {
        label: "产品统计",
        icon: "el-icon-tickets",
        show: false,
        children: {
          ProductPurchaseStatistics: {
            label: "产品采购统计",
            closable: true
          },
          ProductEnterStatistics: {
            label: "产品入库统计",
            closable: true
          },
          ProductReturnStatistics: {
            label: "产品退货统计",
            closable: true
          },
          ProductOrderStatistics: {
            label: "销售订单统计",
            closable: true
          },
          ProductShipmentsStatistics: {
            label: "销售发货统计",
            closable: true
          },
          ProductSalesBillingStatistics: {
            label: "销售开单统计",
            closable: true
          },
          ProductSalesReturnStatistics: {
            label: "销售退货统计",
            closable: true
          },
          ProductCheckStatistics: {
            label: "产品盘点统计",
            closable: true
          },
          ProductAllotStatistics: {
            label: "产品调拨统计",
            closable: true
          },
          ProductInventoryAdjustStatistics: {
            label: "库存调整统计",
            closable: true
          },
        }
      },
      ProductPurchaseDelivery: {
        label: "产品采购来货情况",
        closable: true
      },
      OrderShipments: {
        label: "订单发货情况",
        closable: true
      },
      TicketShipments: {
        label: "条码发货情况表",
        closable: true
      },
      ProductStallQuery: {
        label: "产品档位查询",
        closable: true
      },
      CustomerSales: {
        label: "客户销售情况",
        closable: true
      },
      ProductRecycleBin: {
        label: "产品回收站",
        closable: true
      },
      ProductNewStyleQuery: {
        label: "产品新款查询",
        closable: true
      },
      LastSalesTime: {
        label: "最后销售时间",
        closable: true
      },
      ProductActivityTable: {
        label: "产品活动表",
        closable: true
      },
      ProductTicketActivityTable: {
        label: "产品条码活动表",
        closable: true
      },
      SalesPriceAlarmTip: {
        label: "销售价报警提示",
        closable: true,
        dialog: true
      }
    }
  },
  MaterialAll: {
    label: "物料",
    icon: "el-icon-box",
    show: false,
    children: {
      MaterialStatistics: {
        label: "物料统计",
        icon: "el-icon-tickets",
        show: false,
        children: {
          MaterialPurchaseStatistics: {
            label: "物料采购统计",
            closable: true
          },
          MaterialEnterStatistics: {
            label: "物料入库统计",
            closable: true
          },
          MaterialReturnStatistics: {
            label: "物料退货统计",
            closable: true
          },
          MaterialSalesBillingStatistics: {
            label: "物料销售开单统计",
            closable: true
          },
          MaterialSalesReturnStatistics: {
            label: "物料销售退货统计",
            closable: true
          },
          MaterialCheckStatistics: {
            label: "物料盘点统计",
            closable: true
          }
        }
      },
      MaterialPurchase: {
        label: "物料采购",
        closable: true
      },
      MaterialEnterStore: {
        label: "物料入库",
        closable: true
      },
      MaterialReturn: {
        label: "物料退货",
        closable: true
      },
      MaterialSalesBilling: {
        label: "物料销售开单",
        closable: true
      },
      MaterialSalesReturn: {
        label: "物料销售退货",
        closable: true
      },
      MaterialCheck: {
        label: "物料盘点",
        closable: true
      },
      MaterialOrderDelivery: {
        label: "物料订单发货情况",
        closable: true
      },
      MaterialPurchaseDelivery: {
        label: "物料采购来货情况",
        closable: true
      },
      MaterialActivityTable: {
        label: "物料活动表",
        closable: true
      }
    }
  },
  Salary: {
    label: "工资",
    icon: "el-icon-coin",
    show: false,
    children: {
      GeneratesTicket: {
        label: "生成工票",
        closable: true
      },
      ScanTicket: {
        label: "工票扫描",
        closable: true
      },
      SetTicket: {
        label: "工票设置",
        closable: true
      },
      LeaveRegister: {
        label: "请假登记",
        closable: true
      },
      PrizeBuckleRegister: {
        label: "奖扣登记",
        closable: true
      },
      DisbursementRegister: {
        label: "支款登记",
        closable: true
      },
      PieceWage: {
        label: "计件工资",
        closable: true
      },
      MonthlySalary: {
        label: "计月工资",
        closable: true
      },
      StaffOutputQuery: {
        label: "员工产量查询",
        closable: true
      },
      SummaryProductionTable: {
        label: "生产进度汇总表-*",
        closable: true
      },
      ProductionStatement: {
        label: "生产状况表",
        closable: true
      },
      WorkshopSchedule: {
        label: "车间进度-*",
        closable: true
      },
      TicketQuery: {
        label: "工票查询",
        closable: true
      },
      PieceHistory: {
        label: "计件历史",
        closable: true
      },
      MonthlyHistory: {
        label: "计月历史",
        closable: true
      },
      TicketUnusualTable: {
        label: "工票异常表",
        closable: true
      },
      ProductionStatistics: {
        label: "生产统计",
        closable: true
      },
      WagesAnalysis: {
        label: "工资分析",
        closable: true
      },
      NoDeliveryNum: {
        label: "未交数量",
        closable: true
      },
      RecycleCard: {
        label: "磁卡回收",
        closable: true
      },
      WorkshopSchedule: {
        label: "车间进度",
        closable: true
      },
      CuttingNumQuery: {
        label: "裁床数查询",
        closable: true
      },
      ProductionConvergence: {
        label: "产量汇合",
        closable: true
      },
      ProductionRegister: {
        label: "产量登记",
        closable: true
      }
    }
  },
  Finance: {
    label: "财务",
    icon: "el-icon-s-finance",
    show: false,
    children: {
      CompanyExpenses: {
        label: "公司开支",
        closable: true
      },
      CapitaFlow: {
        label: "资金往来",
        closable: true
      },
      MonthlyStatusTable: {
        label: "月状况表",
        closable: true
      },
      CashBankReconciliation: {
        label: "现金银行对账表",
        closable: true
      },
      SalesReconciliation: {
        label: "销售对账表",
        closable: true
      },
      MaterialReconciliation: {
        label: "物料对账表",
        closable: true
      }
    }
  },
  Funds:{
    label: "财务会计",
    icon: "el-icon-money",
    show: false,
    children: {
      BalanceSheet: {
        label: "资产负债表",
        closable: true
      },
      ProfitStatement : {
        label: "利润表",
        closable: true
      },
      Loans:{
        label: "借贷",
        closable: true
      },
      FixedAssets:{
        label: "固定资产",
        closable: true
      },
      Investment:{
        label: "投资",
        closable: true
      }
    }
  }
};
function getTreeData(source) {
  const tabs = {};
  const labelDict = {};
  const keyDict = {};
  const menus = [];
  const stack = [source];
  while (stack.length > 0) {
    const pop = stack.pop();
    Object.keys(pop).forEach(d => {
      const temp = pop[d];
      const { children, closable, dialog, ...res } = temp;
      const item = { ...res, index: d, active: false };
      if (children) {
        item.children = [];
        Object.keys(children).forEach(c => (children[c].parent = item));
        stack.push(children);
      } else {
        tabs[d] = temp;
        keyDict[d] = temp.label;
        labelDict[temp.label] = d;
      }
      if (temp.parent) {
        temp.parent.children.push(item);
      } else {
        menus.push(item);
      }
    });
  }
  return {
    tabs,
    menus,
    keyDict,
    labelDict
  };
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

export const { tabs, menus, keyDict, labelDict } = getTreeData(sourceTree);
